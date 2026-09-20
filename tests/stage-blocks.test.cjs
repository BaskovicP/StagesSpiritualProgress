const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({ window: {} });
for (const file of ['assessment-config.js', 'assessment-engine.js', 'result-presentation.js', 'locales/hr.js', 'locales/en.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../dist', file), 'utf8'), context);
}
const config = context.window.spiritualAssessment;
const evaluate = context.window.spiritualAssessmentEngine.evaluate;
const { describeStageBlocks, renderStageBlocks, renderDomain } = context.window.spiritualResultPresentation;
const profile = (result, domain) => result.domainProfiles.find(item => item.domain === domain);
const states = area => Array.from(describeStageBlocks(area), block => block.status);
function strong() {
  const answers = Object.fromEntries(config.questionBlueprints.map(q => [q.id, q.requirements[Math.max(...Object.keys(q.requirements).map(Number))].accepted[0]]));
  for (const q of config.questionBlueprints) {
    if (q.exemptWhen?.bidirectional && q.exemptWhen.accepted.includes(answers[q.exemptWhen.questionId])) answers[q.id] = q.exemptWhen.optionIndex;
  }
  return answers;
}

test('seven blocks fill I–III when supported, leave IV hollow, and remain domain-specific', () => {
  const result = evaluate(config, { ...strong(), 'examen-pattern-v6': 2 });
  assert.equal(result.stage, 3);
  const area = profile(result, 'examen');
  assert.deepEqual(Array.from(describeStageBlocks(area), b => b.stage), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(states(area), ['supported', 'supported', 'supported', 'notSupported', 'notAssessed', 'notAssessed', 'notAssessed']);
  assert.deepEqual(states(profile(result, 'prayer')), [...Array(6).fill('supported'), 'notAssessed']);
});

test('missing lower rules, source ceilings and VII are never filled or shown as failures', () => {
  const result = evaluate(config, strong());
  for (const area of result.domainProfiles) {
    const blocks = describeStageBlocks(area);
    assert.equal(blocks[6].status, 'notAssessed');
    for (const block of blocks) {
      assert.equal(block.status, block.stage > area.sourceCeiling || block.stage < area.firstAssessedStage ? 'notAssessed' : 'supported');
    }
  }
  assert.deepEqual(states(profile(result, 'imperfections')), ['notAssessed', 'notAssessed', 'supported', 'supported', 'supported', 'supported', 'notAssessed']);
  const malformed = { domain: 'prayer', sourceCeiling: 7, stages: [{ stage: 7, status: 'supported' }] };
  assert.equal(describeStageBlocks(malformed)[6].status, 'notAssessed');
});

test('unknown answers and exemptions are distinct and never count as completed blocks', () => {
  const skipped = evaluate(config, Object.fromEntries(config.questionBlueprints.map(q => [q.id, 'skip'])));
  for (const area of skipped.domainProfiles) assert.ok(states(area).every(status => ['incomplete', 'notAssessed'].includes(status)));
  const partial = evaluate(config, { ...strong(), 'examen-method-v4': 'skip' });
  assert.deepEqual(states(profile(partial, 'examen')), ['supported', 'supported', 'incomplete', 'incomplete', 'notAssessed', 'notAssessed', 'notAssessed']);
  const exempt = evaluate({ highestAssessedStage: 4, questionBlueprints: [{ id: 'q', domain: 'area', optionCount: 2, requirements: { 1: { accepted: [0], exempt: [1] } } }] }, { q: 1 }).domainProfiles[0];
  assert.deepEqual(states(exempt), [...Array(4).fill('notTriggered'), ...Array(3).fill('notAssessed')]);
  const contradiction = evaluate(config, { ...strong(), 'mortal-response-v4': 2 });
  assert.ok(!states(profile(contradiction, 'seriousSin')).includes('supported'));
});

test('bilingual blocks have stage names, textual statuses, visible legends, safe HTML and no numeric score', () => {
  const area = profile(evaluate(config, { ...strong(), 'examen-pattern-v6': 2 }), 'examen');
  const before = JSON.stringify(area);
  for (const language of ['hr', 'en']) {
    const copy = context.window.spiritualLocales[language];
    const html = renderDomain(area.domain, area.targetChecks, copy, area);
    assert.equal((html.match(/class="stage-block-item"/g) || []).length, 7);
    assert.ok(html.indexOf('domain-stage-blocks') > html.indexOf('domain-level-title'));
    assert.ok(html.includes(copy.stageBlocks.sourceNote));
    for (const block of describeStageBlocks(area)) {
      assert.ok(html.includes(`data-stage="${block.stage}" data-stage-status="${block.status}"`));
      assert.ok(html.includes(copy.stages[block.stage - 1].name));
      assert.ok(html.includes(copy.stageBlocks.statuses[block.status]));
    }
    assert.doesNotMatch(html, /<progress\b|<meter\b|role="progressbar"|aria-valuenow|\d+%|undefined/);
    const unsafeCopy = JSON.parse(JSON.stringify(copy));
    unsafeCopy.stageBlocks.statuses.supported = '<script>alert("unsafe")</script>';
    unsafeCopy.stageBlocks.heading = '<img src=x onerror=alert(1)>';
    unsafeCopy.stages[0].name = '<svg onload=alert(1)>';
    unsafeCopy.domains.examen = '" onmouseover="bad';
    const unsafe = renderStageBlocks(area, unsafeCopy);
    assert.doesNotMatch(unsafe, /<script|<img|<svg|" onmouseover="/);
    assert.match(unsafe, /&lt;script&gt;/);
  }
  assert.equal(JSON.stringify(area), before);
});

test('every single-answer change maps exactly to evaluated domain thresholds without mutating results', () => {
  const baseline = strong();
  for (const q of config.questionBlueprints) {
    for (const option of [...Array(q.optionCount).keys(), 'skip']) {
      const answers = { ...baseline, [q.id]: option };
      const result = evaluate(config, answers);
      const before = JSON.stringify({ answers, result });
      for (const area of result.domainProfiles) {
        for (const block of describeStageBlocks(area)) {
          assert.equal(block.status, block.stage === 7 || block.stage > area.sourceCeiling ? 'notAssessed' : area.stages.find(item => item.stage === block.stage).status);
        }
      }
      assert.equal(JSON.stringify({ answers, result }), before);
    }
  }
});
