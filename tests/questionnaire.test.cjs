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
