const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {} });
for (const file of ['locales/en.js', 'locales/hr.js', 'assessment-config.js', 'assessment-engine.js', 'result-presentation.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'dist', file), 'utf8'), context, { filename: file });
}
const presentation = context.window.spiritualResultPresentation;
const locales = context.window.spiritualLocales;
const assessment = context.window.spiritualAssessment;
const evaluate = context.window.spiritualAssessmentEngine.evaluate;
const statuses = ['met', 'notMet', 'unknown', 'notTriggered'];
const escaped = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
const formatted = (template, counts) => template.replace(/\{(\w+)\}/g, (_, key) => String(counts[key]));

function chips(html) {
  return [...html.matchAll(/<span class="status-chip status-chip-(met|notMet|unknown|notTriggered)">([\s\S]*?)<span class="status-chip-count">(\d+)<\/span>/g)]
    .map(([, status, body, count]) => ({ status, body, count: Number(count) }));
}

function strongestAnswers() {
  const answers = {};
  for (const question of assessment.questionBlueprints) {
    const latestStage = Math.max(...Object.keys(question.requirements).map(Number));
    answers[question.id] = question.requirements[latestStage].accepted[0];
  }
  for (const question of assessment.questionBlueprints) {
    const exemption = question.exemptWhen;
    if (exemption?.bidirectional && exemption.accepted.includes(answers[exemption.questionId])) {
      answers[question.id] = exemption.optionIndex;
    }
  }
  return answers;
}

test('presentation exports a frozen API and four distinct decorative, inline status icons', () => {
  assert.equal(Object.isFrozen(presentation), true);
  assert.deepEqual(Object.keys(presentation).sort(), ['renderCounts', 'renderDomain', 'renderLegend', 'statusIcon', 'describeStageBlocks', 'renderStageBlocks'].sort());
  const icons = statuses.map((status) => presentation.statusIcon(status));
  assert.equal(new Set(icons).size, 4);
  for (const icon of icons) {
    assert.match(icon, /^<svg\b/);
    assert.match(icon, /aria-hidden="true"/);
    assert.match(icon, /focusable="false"/);
    assert.doesNotMatch(icon, /<img|<image|<use|https?:|\bon\w+=/i);
  }
  assert.equal(presentation.statusIcon('unexpected-status'), presentation.statusIcon('unknown'));
});

test('all four statuses have localized text, distinct icons and accurate nonzero counts in HR and EN', () => {
  const checks = statuses.flatMap((status, i) => Array.from({ length: i + 1 }, () => ({ status })));
  for (const language of ['hr', 'en']) {
    const copy = locales[language];
    const html = presentation.renderCounts(checks, copy);
    const rendered = chips(html);
    assert.deepEqual(rendered.map(({ status, count }) => ({ status, count })), [
      { status: 'met', count: 1 }, { status: 'notMet', count: 2 },
      { status: 'unknown', count: 3 }, { status: 'notTriggered', count: 4 }
    ]);
    for (const chip of rendered) {
      assert.ok(chip.body.includes(escaped(copy.criteriaVisual.labels[chip.status])));
      assert.ok(chip.body.includes(presentation.statusIcon(chip.status)));
    }
    const legend = presentation.renderLegend(copy);
    assert.match(legend, /^<details class="criteria-visual-legend">/);
    assert.equal((legend.match(/<li>/g) || []).length, 4);
    assert.ok(legend.includes(escaped(copy.criteriaVisual.legendIntro)));
    for (const status of statuses) {
      assert.ok(legend.includes(escaped(copy.criteriaVisual.labels[status])));
      assert.ok(legend.includes(escaped(copy.criteriaVisual.descriptions[status])));
    }
  }
});

test('zero chips disappear, empty domains render nothing, and count markup is safe inside a summary', () => {
  for (const copy of [locales.hr, locales.en]) {
    for (const status of statuses) {
      const html = presentation.renderCounts([{ status }], copy);
      assert.deepEqual(chips(html).map(({ status: renderedStatus, count }) => ({ status: renderedStatus, count })), [{ status, count: 1 }]);
      assert.doesNotMatch(html, /status-chip-count">0</);
      const tags = [...html.matchAll(/<\/?([a-z][a-z\d-]*)\b/gi)].map(([, tag]) => tag);
      assert.ok(tags.every((tag) => ['span', 'svg', 'circle', 'path'].includes(tag)), tags.join(', '));
      assert.doesNotMatch(html, /\b(?:tabindex|role|onclick)=|<(?:a|button|input|div|p|h[1-6])\b/i);
    }
    assert.deepEqual(chips(presentation.renderCounts([], copy)), []);
    assert.equal(presentation.renderDomain('prayer', [], copy), '');
  }
});

test('unmet or unknown checks show zero supported, while exemptions remain separate from support', () => {
  for (const copy of [locales.hr, locales.en]) {
    for (const status of ['notMet', 'unknown']) {
      const html = presentation.renderDomain('prayer', [{ status }], copy);
      assert.ok(html.includes(escaped(formatted(copy.criteriaVisual.supportedCount, { met: 0, total: 1 }))));
      assert.deepEqual(chips(html).map(({ status: renderedStatus, count }) => ({ status: renderedStatus, count })), [{ status, count: 1 }]);
    }
    const exemptOnly = presentation.renderDomain('prayer', [{ status: 'notTriggered' }], copy);
    assert.ok(exemptOnly.includes(escaped(copy.criteriaVisual.noneApplicable)));
    assert.deepEqual(chips(exemptOnly).map(({ status, count }) => ({ status, count })), [{ status: 'notTriggered', count: 1 }]);
    const mixed = presentation.renderDomain('prayer', [{ status: 'met' }, { status: 'notTriggered' }, { status: 'notTriggered' }], copy);
    assert.ok(mixed.includes(escaped(formatted(copy.criteriaVisual.supportedCount, { met: 1, total: 3 }))));
    assert.deepEqual(chips(mixed).map(({ status, count }) => ({ status, count })), [{ status: 'met', count: 1 }, { status: 'notTriggered', count: 2 }]);
  }
});

test('real engine checks render their exact statuses and totals without mutation or progress indicators', () => {
  const answerSets = [strongestAnswers(), {}, Object.fromEntries(assessment.questionBlueprints.map((question) => [question.id, 0]))];
  for (const answers of answerSets) {
    const result = evaluate(assessment, answers);
    const before = JSON.stringify(result);
    for (const stage of result.stageChecks) {
      for (const domain of assessment.domainOrder) {
        const checks = stage.checks.filter((check) => check.domain === domain);
        const expected = statuses.map((status) => ({ status, count: checks.filter((check) => check.status === status).length })).filter(({ count }) => count > 0);
        for (const copy of [locales.hr, locales.en]) {
          const rendered = presentation.renderDomain(domain, checks, copy);
          assert.deepEqual(chips(rendered).map(({ status, count }) => ({ status, count })), expected);
          assert.doesNotMatch(rendered, /%|<progress\b|<meter\b|role="(?:progressbar|meter)"|aria-valuenow=|data-score=|\bstyle=/i);
          if (checks.length) {
            assert.ok(rendered.includes(`data-review-domain="${domain}"`));
            assert.ok(rendered.includes(`aria-label="${escaped(`${copy.criteriaVisual.reviewDomain}: ${copy.domains[domain]}`)}"`));
          }
        }
      }
    }
    assert.equal(JSON.stringify(result), before);
  }
});

test('domain controls, summary chips and legend escape all translated content and attribute values', () => {
  for (const language of ['hr', 'en']) {
    const copy = JSON.parse(JSON.stringify(locales[language]));
    const hostile = '<img src=x onerror="bad()"> & \' <script>bad()</script>';
    const domain = '" onclick="bad()';
    copy.domains[domain] = hostile;
    for (const key of ['supportedCount', 'noneApplicable', 'reviewDomain', 'legendTitle', 'legendIntro']) copy.criteriaVisual[key] = hostile;
    for (const status of statuses) {
      copy.criteriaVisual.labels[status] = hostile;
      copy.criteriaVisual.descriptions[status] = hostile;
    }
    const snippets = [
      presentation.renderDomain(domain, [{ status: 'met' }], copy),
      presentation.renderDomain(domain, [{ status: 'notTriggered' }], copy),
      presentation.renderCounts(statuses.map((status) => ({ status })), copy),
      presentation.renderLegend(copy)
    ];
    for (const html of snippets) {
      assert.ok(html.includes(escaped(hostile)));
      assert.doesNotMatch(html, /<img\b|<script\b|\sonclick="|\sonerror="/i);
    }
    assert.ok(snippets[0].includes(`data-review-domain="${escaped(domain)}"`));
  }
});
