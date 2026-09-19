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
      textContent: '', innerHTML: '', dataset: {}, attributes: {}, listeners: {}, hidden: false, open: false,
      setAttribute(k, v) { this.attributes[k] = String(v); },
      addEventListener(k, fn) { this.listeners[k] = fn; },
      querySelector() { return { textContent: '', focus() {} }; },
      showModal() { this.open = true; },
      close() { this.open = false; this.listeners.close?.(); },
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
  class HTMLInputElement {}
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
      setItem(k, v) { storage.set(k, v); },
      removeItem(k) { storage.delete(k); }
    },
    AbortController, console, performance,
    HTMLInputElement,
    requestAnimationFrame(fn) { fn(0); return 1; },
    cancelAnimationFrame() {}
  });
  for (const [, file] of html.matchAll(/<script\b[^>]*\bsrc="\.\/([^"]+)"[^>]*><\/script>/g)) {
    vm.runInContext(fs.readFileSync(path.join(root, 'dist', file), 'utf8'), context, { filename: file });
  }
  return {
    window, nodes, storage, element, HTMLInputElement,
    call(name, input) { return registered.get(name).execute(input); }
  };
}

function strongAnswers(app) {
  const answers={};
  for(const q of app.window.spiritualAssessment.questionBlueprints) {
    const rule=q.requirements[Math.max(...Object.keys(q.requirements).map(Number))];
    answers[q.id]=rule.accepted[0];
  }
  for(const q of app.window.spiritualAssessment.questionBlueprints) {
    const condition=q.exemptWhen;
    if(condition?.bidirectional && condition.accepted.includes(answers[condition.questionId]))answers[q.id]=condition.optionIndex;
  }
  return answers;
}

function setAnswers(app,answers) {
  app.call('set_spiritual_reflection_answers',{answers:Object.entries(answers).map(([questionId,value])=>value==='skip'?{questionId,skip:true}:{questionId,optionIndex:value})});
}

function resultFor(app,answers) {
  setAnswers(app,answers);
  return app.call('calculate_spiritual_reflection_result');
}

function testBank() {
  for(const lang of ['hr','en']) {
    const app=boot(lang);
    const copy=app.window.spiritualLocales[lang];
    const questions=app.call('get_spiritual_reflection_questions').questions;
    const bank=app.window.spiritualQuestions[lang];
    const config=app.window.spiritualAssessment;
    assert.equal(config.questionnaireVersion,5);
    assert.equal(config.highestAssessedStage,6);
    assert.equal(questions.length,36);
    assert.equal(new Set(questions.map(q=>q.id)).size,36);
    assert.equal(copy.stages.length,7);
    assert.match(app.element('#stage-path').innerHTML,/VII\./);
    assert.ok(app.element('#advanced-source-guide').innerHTML.includes(copy.stages[5].name));
    for(const [i,q] of questions.entries()) {
      const blueprint=config.questionBlueprints[i];
      assert.equal(bank[i].id,blueprint.id);
      assert.equal(q.options.length,blueprint.optionCount);
      assert.deepEqual(Object.keys(bank[i].expectations),Object.keys(blueprint.requirements));
      assert.ok(blueprint.sources.length>0);
      app.call('set_spiritual_reflection_answers',{answers:[{questionId:q.id,optionIndex:0}]});
      assert.equal(app.element('#question-title').textContent,q.prompt);
      assert.equal(app.element('#question-example-text').textContent,q.example);
      assert.equal(app.element('#question-clarification').textContent,q.clarification);
      assert.equal(app.element('#question-context-text').textContent,q.domainHelp);
      assert.ok(q.example.length>20 && q.clarification.length>20);
      assert.throws(()=>app.call('set_spiritual_reflection_answers',{answers:[{questionId:q.id,optionIndex:blueprint.optionCount}]}));
    }
    for(const [,key] of html.matchAll(/data-i18n="([^"]+)"/g))assert.equal(typeof copy[key],'string',`${lang}.${key}`);
  }
}

function testPatterns() {
  for(const lang of ['hr','en']) {
    const app=boot(lang);
    const strong=strongAnswers(app);
    const mutations=[[null,{'prayer-vocal-v4':0}],[1,{'prayer-vocal-v4':1}],[2,{'examen-frequency-v4':1}],[3,{'examen-frequency-v4':2}],[4,{'imperfections-consent-v5':1}],[5,{'prayer-self-forgetfulness-v5':1}],[6,{}]];
    for(const [stage,change] of mutations) {
      const result=resultFor(app,{...strong,...change});
      assert.equal(result.stage,stage);
      assert.equal(app.element('#result-view').hidden,false);
      assert.equal(app.element('#result-number').textContent,stage?['I','II','III','IV','V','VI'][stage-1]:'—');
      assert.equal(app.element('#result-heading').textContent,stage?app.window.spiritualLocales[lang].stages[stage-1].name:app.window.spiritualLocales[lang].mixedTitle);
      assert.equal(app.element('#result-ascent-marker').attributes.visibility,stage?'visible':'hidden');
      assert.ok(app.element('#criteria-checks').innerHTML.length>100);
      for(const key of ['approximateScore','patternStabilityPercent','range','confidence'])assert.equal(result[key],undefined);
      assert.ok(result.sourceDescription.areas.length>0);
    }
    const middle=Object.fromEntries(app.window.spiritualAssessment.questionBlueprints.map(q=>[q.id,Math.floor((q.optionCount-1)/2)]));
    assert.notEqual(resultFor(app,middle).stage,4,'Middle answers cannot automatically become IV');
    const allSkipped=Object.fromEntries(app.window.spiritualAssessment.questionBlueprints.map(q=>[q.id,'skip']));
    const unknown=resultFor(app,allSkipped);
    assert.equal(unknown.stage,null);
    assert.equal(unknown.skipped,36);
    assert.ok(unknown.stageChecks[0].checks.every(c=>c.status==='unknown'));
  }
}

function testEveryGate() {
  const app=boot();
  const strong=strongAnswers(app);
  assert.equal(resultFor(app,strong).stage,6);
  for(const q of app.window.spiritualAssessment.questionBlueprints) {
    const latest=Math.max(...Object.keys(q.requirements).map(Number));
    const rule=q.requirements[latest];
    const failedOption=Array.from({length:q.optionCount},(_,i)=>i).find(i=>!rule.accepted.includes(i) && !(rule.exempt||[]).includes(i) && !(q.unknownOptions||[]).includes(i));
    assert.notEqual(failedOption,undefined,`${q.id} has a contradictory choice`);
    assert.notEqual(resultFor(app,{...strong,[q.id]:failedOption}).stage,6,`${q.id} cannot be compensated`);
    const skipped=resultFor(app,{...strong,[q.id]:'skip'});
    assert.notEqual(skipped.stage,6,`${q.id} skip cannot pass`);
    assert.equal(skipped.stageChecks[5].checks.find(c=>c.id===q.id).status,'unknown');
  }
}

function testExactThresholds() {
  const app=boot();
  const strong=strongAnswers(app);
  for(const [id,answer] of [['venial-occurrence-v4',2],['examen-frequency-v4',2],['sacraments-confession-schedule-v4',3],['prayer-vocal-v4',2]]) {
    const result=resultFor(app,{...strong,[id]:answer});
    assert.equal(result.stage,3,id);
    assert.equal(result.targetStage,4);
    const check=result.stageChecks[3].checks.find(c=>c.id===id);
    assert.equal(check.status,'notMet');
    assert.ok(app.element('#criteria-checks').innerHTML.includes('Odgovor ne podupire uvjet'));
    const index=app.window.spiritualAssessment.questionBlueprints.findIndex(q=>q.id===id);
    const expectation = app.window.spiritualQuestions.hr[index].expectations[4]
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    assert.ok(app.element('#criteria-checks').innerHTML.includes(expectation));
  }
  assert.equal(resultFor(app,{...strong,'examen-frequency-v4':1}).stage,2);
  const habitual = resultFor(app,{...strong,'venial-occurrence-v4':0});
  assert.equal(habitual.stage,2, 'Habitual venial falls are not promoted merely because consent is not deliberate');
  assert.match(app.window.spiritualQuestions.hr.find(q => q.id === 'venial-occurrence-v4').options[3], /bez ustaljene navike/);
  assert.equal(resultFor(app,{...strong,'sacraments-confession-schedule-v4':2}).stage,2);
}

function testCircumstances() {
  const app=boot();
  const strong=strongAnswers(app);
  const none=resultFor(app,{...strong,'venial-occurrence-v4':4,'venial-regret-v4':3,'venial-reparation-v4':3});
  assert.equal(none.stage,6);
  assert.equal(none.stageChecks[3].checks.find(c=>c.id==='venial-reparation-v4').status,'notTriggered');
  const contradictory=resultFor(app,{...strong,'mortal-fall-v4':3,'mortal-response-v4':2});
  assert.equal(contradictory.stage,null);
  assert.equal(contradictory.stageChecks[0].checks.find(c=>c.id==='mortal-response-v4').reason,'contradictoryAnswer');
  const noWeekday=resultFor(app,{...strong,'sacraments-daily-mass-v4':3});
  assert.equal(noWeekday.stage,6);
  assert.equal(noWeekday.stageChecks[3].checks.find(c=>c.id==='sacraments-daily-mass-v4').status,'notTriggered');
  const noConfession=resultFor(app,{...strong,'sacraments-confession-schedule-v4':5});
  assert.equal(noConfession.stage,null);
  assert.equal(noConfession.stageChecks[0].checks.find(c=>c.id==='sacraments-confession-schedule-v4').status,'unknown');
  const noDifficulty=resultFor(app,{...strong,'suffering-endure-v4':3,'suffering-peace-v4':3,'suffering-meaning-joy-v4':3});
  assert.equal(noDifficulty.stage,1);
  assert.equal(noDifficulty.stageChecks[1].checks.find(c=>c.id==='suffering-endure-v4').status,'unknown');
}

function testPersistence() {
  const storage=new Map([['spiritual-progress-reflection:v3',JSON.stringify({version:3,language:'en',view:'result',answers:{'examen-daily':4}})]]);
  const app=boot('hr',storage);
  const key='spiritual-progress-reflection:v5';
  assert.equal(app.element('#intro-view').hidden,false);
  assert.deepEqual(JSON.parse(storage.get(key)).answers,{});
  const before=resultFor(app,{...strongAnswers(app),'examen-frequency-v4':2});
  const saved=JSON.parse(storage.get(key)).answers;
  app.element('#language-select').listeners.change({target:{value:'en'}});
  assert.ok(app.element('#criteria-checks').innerHTML.includes('Answer does not support it'));
  assert.ok(!app.element('#criteria-checks').innerHTML.includes('Odgovor ne podupire'));
  const reloaded=boot('hr',storage);
  assert.equal(reloaded.element('#result-view').hidden,false);
  assert.equal(reloaded.call('calculate_spiritual_reflection_result').stage,before.stage);
  assert.deepEqual(JSON.parse(storage.get(key)).answers,saved);
  reloaded.element('#criteria-stage-select').listeners.change({target:{value:'2'}});
  assert.equal(reloaded.element('#criteria-heading').textContent,'Requirements for Stage II');
  const index=reloaded.window.spiritualAssessment.questionBlueprints.findIndex(q=>q.id==='examen-frequency-v4');
  reloaded.element('#criteria-checks').listeners.click({target:{closest(){return{dataset:{reviewQuestion:String(index)}};}}});
  assert.equal(reloaded.element('#question-view').hidden,false);
  assert.equal(reloaded.element('#question-title').textContent,reloaded.window.spiritualQuestions.en[index].title);
  reloaded.element('#retake-button').listeners.click();
  assert.deepEqual(JSON.parse(storage.get(key)).answers,{});
}

test("both languages have aligned explicit question options, stories and requirements", testBank);
test("null and I–VI practical patterns render without numerical scores or a VII result", testPatterns);
test("each real-bank required condition fails closed on a contrary or skipped answer", testEveryGate);
test("rare deliberate venial sin, daily examen, quarterly confession or merely regular prayer cannot pass IV", testExactThresholds);
test("actual-event exemptions, contradictions, inaccessible sacraments and no suffering evidence are distinct", testCircumstances);
test("v5 answers survive refresh, translation, criterion review and restart; v3 is not reused", testPersistence);

test('the maintained source map matches every current Croatian question, story, option and expectation', () => {
  const app = boot('hr');
  const review = fs.readFileSync(path.join(root, 'QUESTIONNAIRE-SOURCE-MAP.hr.md'), 'utf8');
  const sourceFile = path.resolve(root, '../stages-of-spiritual-progress.md');
  const validReferences = new Set();
  if (fs.existsSync(sourceFile)) {
    let section;
    for (const line of fs.readFileSync(sourceFile, 'utf8').split('\n')) {
      const heading = line.match(/^## ([IVX]+)\. /);
      if (heading) section = heading[1];
      const topic = line.match(/^- \*\*([^:]+):\*\*/);
      if (section && topic) validReferences.add(`${section}. ${topic[1]}`);
    }
  }
  for (const [index, question] of app.window.spiritualQuestions.hr.entries()) {
    for (const text of [question.title, question.example, question.clarification,
      ...question.options, ...Object.values(question.expectations)]) {
      assert.ok(review.includes(text), question.id);
    }
    for (const reference of app.window.spiritualAssessment.questionBlueprints[index].sources) {
      assert.ok(review.includes(reference));
      if (validReferences.size) assert.ok(validReferences.has(reference), `Original markdown section: ${reference}`);
    }
  }
});

const reflectionStorageKey = 'spiritual-progress-reflection:v5';

function stored(app) {
  return JSON.parse(app.storage.get(reflectionStorageKey));
}

function escaped(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function openStage(app, index) {
  app.element('#stage-path').listeners.click({
    target: {
      closest(selector) {
        assert.equal(selector, '[data-stage-index]');
        return { dataset: { stageIndex: String(index) }, focus() {} };
      }
    }
  });
}

function assertStageDialog(app, language, index) {
  const copy = app.window.spiritualLocales[language];
  const stage = copy.stages[index];
  const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][index];
  assert.equal(app.element('#stage-dialog').open, true);
  assert.equal(app.element('#stage-dialog-heading').textContent, `${roman}. ${stage.name}`);
  const expectedDescription = stage.sourceDescription.length
    ? stage.sourceDescription.map(({ domain, text }) => `<p><strong>${escaped(copy.domains[domain])}:</strong> ${escaped(text)}</p>`).join('')
    : `<p>${escaped(stage.summary)}</p>`;
  assert.equal(app.element('#stage-dialog-description').innerHTML, expectedDescription,
    `${language} ${roman}: educational dialog uses the supplied source, not an invented score description`);
  if (stage.assessmentNote) {
    assert.ok(app.element('#stage-dialog-note').textContent.includes(stage.assessmentNote));
    assert.equal(app.element('#stage-dialog-note').hidden, false);
  }
  assert.equal(app.element('#stage-dialog-reference').textContent,
    copy.sourceDescriptionReference.replaceAll('{stage}', roman));
  assert.equal(app.element('#stage-dialog-previous').disabled, index === 0);
  assert.equal(app.element('#stage-dialog-next').disabled, index === 6);
}

test('all seven source stages are browsable from the start without answering or calculating', () => {
  for (const language of ['hr', 'en']) {
    const app = boot(language);
    const stageButtons = [...app.element('#stage-path').innerHTML.matchAll(/<button\b[^>]*data-stage-index="(\d)"[^>]*>/g)];
    assert.deepEqual(stageButtons.map(match => Number(match[1])), [0, 1, 2, 3, 4, 5, 6]);
    assert.equal(app.element('#intro-view').hidden, false);
    const before = stored(app);
    for (let index = 0; index < 7; index++) {
      openStage(app, index);
      assertStageDialog(app, language, index);
      assert.equal(app.element('#intro-view').hidden, false);
      assert.equal(app.element('#result-view').hidden, true);
      app.element('#stage-dialog-close').listeners.click();
      assert.equal(app.element('#stage-dialog').open, false);
      assert.deepEqual(stored(app).answers, before.answers);
      assert.equal(stored(app).view, 'intro');
    }
    assert.equal(app.window.spiritualLocales[language].stages[6].sourceDescription.length, 0,
      'VII stays named but no source requirements are invented');
  }
});

test('stage dialog paging stops at I and VII and follows an in-place language switch', () => {
  const app = boot('hr');
  openStage(app, 0);
  app.element('#stage-dialog-previous').listeners.click();
  assertStageDialog(app, 'hr', 0);
  for (let index = 1; index < 7; index++) {
    app.element('#stage-dialog-next').listeners.click();
    assertStageDialog(app, 'hr', index);
  }
  app.element('#stage-dialog-next').listeners.click();
  assertStageDialog(app, 'hr', 6);
  app.element('#language-select').listeners.change({ target: { value: 'en' } });
  assertStageDialog(app, 'en', 6);
  assert.equal(stored(app).language, 'en');
  for (let index = 5; index >= 0; index--) {
    app.element('#stage-dialog-previous').listeners.click();
    assertStageDialog(app, 'en', index);
  }
  app.element('#stage-dialog-close').listeners.click();
  assert.equal(app.element('#stage-dialog').open, false);
  assert.deepEqual(stored(app).answers, {});
});

function assertResultLinks(app, available) {
  for (const selector of ['#intro-results-button', '#question-results-button']) {
    assert.equal(app.element(selector).hidden, !available, `${selector}: only a completed questionnaire can return to results`);
  }
}

test('result return becomes available only after the last answer or explicit skip, and reset removes it', () => {
  const app = boot('hr');
  assertResultLinks(app, false);
  const questions = app.window.spiritualAssessment.questionBlueprints;
  setAnswers(app, Object.fromEntries(questions.slice(0, -1).map(question => [question.id, 'skip'])));
  assertResultLinks(app, false);
  app.element('#next-button').listeners.click();
  const input = new app.HTMLInputElement();
  input.value = 'skip';
  app.element('#answer-options').listeners.change({ target: input });
  assertResultLinks(app, true);
  app.element('#question-results-button').listeners.click();
  assert.equal(app.element('#result-view').hidden, false);
  assert.equal(app.element('#result-number').textContent, '—', 'All skips produce an unknown result, not a stage');
  app.element('#result-home-button').listeners.click();
  assert.equal(app.element('#intro-view').hidden, false);
  assertResultLinks(app, true);
  app.element('#intro-results-button').listeners.click();
  assert.equal(app.element('#result-view').hidden, false);
  assert.equal(app.element('#result-number').textContent, '—');
  app.element('#retake-button').listeners.click();
  assertResultLinks(app, false);
  assert.deepEqual(stored(app).answers, {});
});

test('returning to results recalculates edits and preserves all practical answers through home, refresh and translation', () => {
  const app = boot('hr');
  const answers = { ...strongAnswers(app), 'examen-frequency-v4': 2 };
  assert.equal(resultFor(app, answers).stage, 3);
  app.element('#result-home-button').listeners.click();
  assert.equal(app.element('#intro-view').hidden, false);
  assert.deepEqual(stored(app).answers, answers);
  openStage(app, 5);
  app.element('#stage-dialog-close').listeners.click();
  assert.deepEqual(stored(app).answers, answers, 'Learning about a stage cannot change questionnaire choices');

  const fromHome = boot('hr', app.storage);
  assert.equal(fromHome.element('#intro-view').hidden, false);
  assertResultLinks(fromHome, true);
  fromHome.element('#intro-results-button').listeners.click();
  assert.equal(fromHome.element('#result-number').textContent, 'III');
  const index = fromHome.window.spiritualAssessment.questionBlueprints.findIndex(question => question.id === 'examen-frequency-v4');
  fromHome.element('#criteria-checks').listeners.click({ target: { closest() { return { dataset: { reviewQuestion: String(index) } }; } } });
  assert.equal(fromHome.element('#question-view').hidden, false);
  const input = new fromHome.HTMLInputElement();
  input.value = '1';
  fromHome.element('#answer-options').listeners.change({ target: input });
  assert.equal(stored(fromHome).answers['examen-frequency-v4'], 1);

  const fromQuestion = boot('hr', fromHome.storage);
  assert.equal(fromQuestion.element('#question-view').hidden, false);
  assertResultLinks(fromQuestion, true);
  fromQuestion.element('#language-select').listeners.change({ target: { value: 'en' } });
  assertResultLinks(fromQuestion, true);
  fromQuestion.element('#question-results-button').listeners.click();
  assert.equal(fromQuestion.element('#result-view').hidden, false);
  assert.equal(fromQuestion.element('#result-number').textContent, 'II', 'Return recomputes the changed criterion, not a cached III');
  assert.equal(fromQuestion.element('#result-heading').textContent, fromQuestion.window.spiritualLocales.en.stages[1].name);
  assert.deepEqual(stored(fromQuestion).answers, { ...answers, 'examen-frequency-v4': 1 });

  let prevented = false;
  fromQuestion.element('.brand').listeners.click({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true, 'Home link must not navigate away and erase view context');
  assert.equal(fromQuestion.element('#intro-view').hidden, false);
  fromQuestion.element('#restart-button').listeners.click();
  assertResultLinks(fromQuestion, false);
  assert.deepEqual(stored(fromQuestion).answers, {});
});

test('all-stages buttons expose all seven source descriptions without changing answers', () => {
  for (const lang of ['hr','en']) {
    const app=boot(lang);
    for (const id of ['#all-stages-button','#result-stages-button']) {
      app.element(id).listeners.click();
      assert.equal(app.element('#stage-dialog').open,true);
      assert.equal(app.element('#stage-single-content').hidden,true);
      assert.equal(app.element('#stage-dialog-navigation').hidden,true);
      const content=app.element('#stage-all-descriptions').innerHTML;
      assert.equal([...content.matchAll(/class="all-stage-entry"/g)].length,7);
      for(const stage of app.window.spiritualLocales[lang].stages) assert.ok(content.includes(escaped(stage.name)));
      app.element('#stage-dialog-close').listeners.click();
    }
    openStage(app,4);
    assert.equal(app.element('#stage-single-content').hidden,false);
    assert.equal(app.element('#stage-dialog-navigation').hidden,false);
    assert.equal(app.element('#stage-all-descriptions').hidden,true);
    assert.deepEqual(stored(app).answers,{});
  }
});

test('v4 practical answers migrate unchanged, removed experience reports are discarded, new answers are not invented', () => {
  const initial=boot('hr');
  const answers=Object.fromEntries(Object.entries(strongAnswers(initial)).filter(([id])=>id.endsWith('-v4')));
  assert.equal(Object.keys(answers).length,28);
  const storage=new Map([['spiritual-progress-reflection:v4',JSON.stringify({
    version:4,language:'en',currentIndex:27,view:'result',answers,
    mysticalVersion:1,mysticalOpen:true,mysticalAnswers:{contemplation:'yes'}
  })]]);
  const app=boot('hr',storage);
  assert.deepEqual(stored(app).answers,answers);
  assert.equal(stored(app).language,'en');
  assert.equal(stored(app).currentIndex,28);
  assert.equal(app.element('#question-view').hidden,false);
  assert.equal(stored(app).mysticalAnswers,undefined);
  assert.equal(storage.has('spiritual-progress-reflection:v4'),false);
  assert.equal(app.window.spiritualAssessmentEngine.evaluate(app.window.spiritualAssessment,answers).stage,4);
  assert.throws(()=>app.call('calculate_spiritual_reflection_result'));
  assert.doesNotMatch(html,/mystical-section|mystical-config|questions\/mystical/);
  assert.equal(app.window.spiritualMysticalReflection,undefined);
  app.element('#restart-button').listeners.click();
  assert.deepEqual(stored(app).answers,{});
  assert.deepEqual(stored(boot('hr',storage)).answers,{});
});

test('V and VI require every additional gate, keep all IV foundations and never become VII', () => {
  const app=boot();
  const answers=strongAnswers(app);
  assert.equal(resultFor(app,answers).stage,6);
  assert.equal(app.element('#result-scope').hidden,false);
  const config=app.window.spiritualAssessment;
  for(const q of config.questionBlueprints.filter(q=>q.id.endsWith('-v5'))) {
    const first=Math.min(...Object.keys(q.requirements).map(Number));
    assert.equal(resultFor(app,{...answers,[q.id]:'skip'}).stage,first-1,q.id);
    assert.equal(resultFor(app,{...answers,[q.id]:0}).stage,first-1,q.id);
  }
  assert.equal(resultFor(app,{...answers,'imperfections-consent-v5':2}).stage,5);
  assert.equal(resultFor(app,{...answers,'suffering-service-v5':1}).stage,5);
  assert.equal(resultFor(app,{...answers,'prayer-self-forgetfulness-v5':1}).stage,5);
  assert.equal(resultFor(app,{...answers,'suffering-service-v5':3}).stage,4);
  assert.equal(app.element('#result-scope').hidden,true);
  assert.equal(resultFor(app,{...answers,'examen-frequency-v4':2}).stage,3);
  assert.ok(!config.questionBlueprints.some(q=>Object.hasOwn(q.requirements,7)));
});

test('every applicable criterion has bilingual practical guidance, including skipped and mixed profiles', () => {
  for (const language of ['hr','en']) {
    const app=boot(language), config=app.window.spiritualAssessment, copy=app.window.spiritualLocales[language];
    const bank=app.window.spiritualQuestions[language], guide=app.window.spiritualGrowthGuidance;
    for(const q of config.questionBlueprints) {
      for(const stage of Object.keys(q.requirements)) {
        const action=guide.tips[language][q.id];
        assert.ok((typeof action==='string'?action:action[stage]).length>30,q.id+':'+stage);
      }
    }
    const strong=strongAnswers(app);
    for(const q of config.questionBlueprints) {
      for(const selected of [...Array(q.optionCount).keys(),'skip']) {
        const result=app.window.spiritualAssessmentEngine.evaluate(config,{...strong,[q.id]:selected});
        for(const profile of result.domainProfiles) {
          const plan=guide.describe(profile,bank,copy,language);
          assert.ok(plan.maintenance.length>30);
          for(const item of plan.items) {
            const check=profile.targetChecks.find(check=>check.id===item.id);
            assert.ok(['unknown','notMet'].includes(check.status));
            assert.equal(item.expectation,bank[item.index].expectations[check.ruleStage]);
            if(check.status==='unknown')assert.equal(item.action,copy.growth.unknownAction);
            assert.ok(item.action.length>30);
          }
        }
      }
    }
    resultFor(app,{...strong,'examen-frequency-v4':1,'prayer-vocal-v4':1});
    const markup=app.element('#domain-profile').innerHTML;
    assert.equal([...markup.matchAll(/class="domain-growth"/g)].length,7);
    assert.ok(markup.includes(escaped(copy.growth.maintainTitle)));
    assert.doesNotMatch(markup,/undefined|NaN/);
  }
});
