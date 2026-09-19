const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');

// Run the shipped scripts with a small DOM adapter and use the app's actual
// WebMCP entry points. No alternate scoring implementation or user data.
function boot(language = 'hr', storage = new Map()) {
  const nodes = new Map();
  function element(selector) {
    if (selector.startsWith('#')) assert.ok(html.includes(`id="${selector.slice(1)}"`), selector);
    if (!nodes.has(selector)) nodes.set(selector, {
      textContent: '', innerHTML: '', dataset: {}, attributes: {}, listeners: {}, hidden: false,
      setAttribute(k, v) { this.attributes[k] = String(v); },
      addEventListener(k, fn) { this.listeners[k] = fn; },
      querySelector() { return { textContent: '' }; },
      focus() {}
    });
    return nodes.get(selector);
  }
  const i18n = [...html.matchAll(/data-i18n="([^"]+)"/g)].map((m) => ({ dataset: { i18n: m[1] } }));
  const registered = new Map();
  const window = {
    scrollTo() {}, addEventListener() {}, print() {}, confirm() { return true; },
    matchMedia() { return { matches: true }; }
  };
  const context = vm.createContext({
    window,
    document: {
      documentElement: {},
      querySelector: element,
      querySelectorAll(selector) { assert.equal(selector, '[data-i18n]'); return i18n; },
      modelContext: { registerTool(tool) { registered.set(tool.name, tool); } }
    },
    navigator: { languages: [language] },
    sessionStorage: {
      getItem(k) { return storage.get(k) ?? null; },
      setItem(k, v) { storage.set(k, v); }
    },
    AbortController, console, performance,
    HTMLInputElement: class {},
    requestAnimationFrame(fn) { fn(0); return 1; },
    cancelAnimationFrame() {}
  });
  for (const file of ['locales/en.js', 'locales/hr.js', 'assessment-config.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'dist', file), 'utf8'), context, { filename: file });
  }
  return {
    window, nodes, storage, element,
    call(name, input) { return registered.get(name).execute(input); }
  };
}

test('all revised questions and stories render in both languages, including conditional guidance', () => {
  for (const lang of ['hr', 'en']) {
    const app = boot(lang);
    const questions = app.call('get_spiritual_reflection_questions').questions;
    assert.equal(questions.length, 28);
    assert.equal(new Set(questions.map((q) => q.id)).size, 28);
    assert.equal(app.window.spiritualLocales[lang].stages.length, 7);
    assert.match(app.element('#stage-path').innerHTML, /VII\./);
    for (const [index, q] of questions.entries()) {
      app.call('set_spiritual_reflection_answers', { answers: [{ questionId: q.id, optionIndex: 2 }] });
      assert.equal(app.element('#question-title').textContent, q.prompt);
      assert.equal(app.element('#question-example-text').textContent, q.example);
      assert.equal(app.element('#question-context-text').textContent, q.domainHelp);
      assert.equal(app.element('#question-clarification').hidden, !q.clarification);
      assert.equal(app.element('#question-clarification').textContent, q.clarification || '');
      assert.ok(q.example.length > 0 && q.domainHelp.length > 0);
      assert.ok(app.window.spiritualAssessment.questionBlueprints[index].sources.length > 0);
    }
  }
});

test('no post-sin event can be skipped without lowering that area; insufficient coverage stays unavailable', () => {
  const app = boot();
  const items = app.window.spiritualAssessment.questionBlueprints;
  app.call('set_spiritual_reflection_answers', {
    answers: items.map((q) => ({ questionId: q.id, optionIndex: q.reverse ? 0 : 4 }))
  });
  const complete = app.call('calculate_spiritual_reflection_result');
  assert.equal(complete.approximateScore, 6);
  assert.equal(complete.stage, 6);
  app.call('set_spiritual_reflection_answers', { answers: [
    { questionId: 'mortal-repentance-reparation', skip: true },
    { questionId: 'mortal-weak-resistance', skip: true }
  ] });
  const partial = app.call('calculate_spiritual_reflection_result');
  assert.equal(partial.answered, 26);
  assert.equal(partial.approximateScore, 6);
  assert.equal(partial.stage, 6);
  assert.match(app.element('#result-ascent-labels').innerHTML, /VII/);
  app.call('set_spiritual_reflection_answers', { answers: [{ questionId: 'mortal-avoid-occasions', skip: true }] });
  assert.throws(() => app.call('calculate_spiritual_reflection_result'));
  app.call('set_spiritual_reflection_answers', {
    answers: items.map((q) => ({ questionId: q.id, optionIndex: q.reverse ? 4 : 0 }))
  });
  assert.equal(app.call('calculate_spiritual_reflection_result').approximateScore, 1);
});

test('current progress survives refresh and language changes; prior wording is not silently restored', () => {
  const storage = new Map([['spiritual-progress-reflection:v2', JSON.stringify({
    version: 2, language: 'en', currentIndex: 20, view: 'question',
    answers: { 'serious-concrete-response': 4 }
  })]]);
  const fresh = boot('hr', storage);
  assert.equal(fresh.element('#intro-view').hidden, false);
  const key = 'spiritual-progress-reflection:v3';
  assert.deepEqual(JSON.parse(storage.get(key)).answers, {});
  fresh.call('set_spiritual_reflection_answers', { answers: [
    { questionId: 'prayer-planned-meditation', optionIndex: 3 },
    { questionId: 'mortal-repentance-reparation', skip: true }
  ] });
  fresh.element('#language-select').listeners.change({ target: { value: 'en' } });
  const reloaded = boot('hr', storage);
  const saved = JSON.parse(storage.get(key));
  assert.equal(saved.language, 'en');
  assert.equal(saved.answers['prayer-planned-meditation'], 3);
  assert.equal(saved.answers['mortal-repentance-reparation'], 'skip');
  assert.equal(reloaded.element('#question-title').textContent,
    reloaded.window.spiritualLocales.en.questions[20].title);
  reloaded.element('#retake-button').listeners.click();
  assert.deepEqual(JSON.parse(storage.get(key)).answers, {});
});

// Exact area order in the supplied markdown, not a seven-area template applied
// to every stage. In particular, V/VI do not invent confession/examen criteria.
const sourceDomains = [
  ['seriousSin', 'venialSin', 'suffering', 'prayer', 'examen', 'sacraments'],
  ['seriousSin', 'venialSin', 'suffering', 'prayer', 'examen', 'sacraments'],
  ['seriousSin', 'venialSin', 'imperfections', 'suffering', 'prayer', 'examen', 'sacraments'],
  ['venialSin', 'imperfections', 'prayer', 'examen', 'suffering', 'sacraments'],
  ['imperfections', 'suffering', 'prayer'],
  ['imperfections', 'suffering', 'prayer']
];

function answerAtStage(app, stage) {
  const categories = [[0, 0, 0, 0], [1, 1, 1, 1], [1, 1, 2, 2], [2, 2, 2, 2], [3, 3, 3, 3], [4, 4, 4, 4]][stage - 1];
  const counts = {};
  app.call('set_spiritual_reflection_answers', {
    answers: app.window.spiritualAssessment.questionBlueprints.map((q) => {
      const index = counts[q.domain] || 0;
      counts[q.domain] = index + 1;
      const category = categories[index];
      return { questionId: q.id, optionIndex: q.reverse ? 4 - category : category };
    })
  });
  return app.call('calculate_spiritual_reflection_result');
}

function escapeHtml(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

test('all six result descriptions follow their source areas in both languages; VII has no invented description', () => {
  for (const lang of ['hr', 'en']) {
    const app = boot(lang);
    const copy = app.window.spiritualLocales[lang];
    for (let stage = 1; stage <= 6; stage += 1) {
      const result = answerAtStage(app, stage);
      assert.equal(result.stage, stage);
      const expected = copy.stages[stage - 1];
      assert.deepEqual(Array.from(expected.sourceDescription, (area) => area.domain), sourceDomains[stage - 1]);
      assert.equal(result.sourceDescription.areas.length, sourceDomains[stage - 1].length);
      assert.equal(result.sourceDescription.note, copy.sourceDescriptionIntro);
      assert.equal(result.sourceDescription.caution, copy.sourceDescriptionCaution);
      assert.equal(result.sourceDescription.interpretation, copy.resultSummary);
      assert.ok(app.element('#source-description-heading').textContent.endsWith(expected.name));
      assert.equal(app.element('#result-summary').textContent, copy.resultSummary);
      assert.equal(app.element('#source-description-reference').textContent, result.sourceDescription.reference);
      const body = app.element('#source-description-body').innerHTML;
      assert.equal((body.match(/<p>/g) || []).length, sourceDomains[stage - 1].length);
      for (const [i, { domain, text }] of expected.sourceDescription.entries()) {
        assert.ok(text.length > 20);
        assert.ok(body.includes(`<strong>${escapeHtml(copy.domains[domain])}:</strong> ${escapeHtml(text)}`));
        assert.equal(result.sourceDescription.areas[i].text, text);
        assert.equal(result.sourceDescription.areas[i].label, copy.domains[domain]);
      }
    }
    assert.equal(copy.stages[6].sourceDescription.length, 0);
    assert.ok(copy.stages[6].assessmentNote);
    assert.equal(app.window.spiritualAssessment.questionnaireVersion, 3);
    for (const [, key] of html.matchAll(/data-i18n="([^"]+)"/g)) {
      assert.equal(typeof copy[key], 'string', `${lang}.${key}`);
    }
  }
});

test('a result description changes language and survives refresh without changing existing answers or score', () => {
  const app = boot('hr');
  const before = answerAtStage(app, 5);
  const savedAnswers = JSON.parse(app.storage.get('spiritual-progress-reflection:v3')).answers;
  app.element('#language-select').listeners.change({ target: { value: 'en' } });
  assert.equal(app.element('#source-description-heading').textContent, 'V. Relative Perfection');
  assert.ok(app.element('#source-description-body').innerHTML.includes('Imperfections'));
  assert.ok(!app.element('#source-description-body').innerHTML.includes('Nesavršenosti'));
  const reloaded = boot('hr', app.storage);
  assert.equal(reloaded.element('#result-view').hidden, false);
  assert.equal(reloaded.element('#source-description-heading').textContent, 'V. Relative Perfection');
  const after = reloaded.call('calculate_spiritual_reflection_result');
  assert.equal(after.stage, before.stage);
  assert.equal(after.approximateScore, before.approximateScore);
  assert.equal(after.patternStabilityPercent, before.patternStabilityPercent);
  assert.deepEqual(JSON.parse(app.storage.get('spiritual-progress-reflection:v3')).answers, savedAnswers);
});
