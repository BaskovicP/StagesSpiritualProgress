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
  for (const file of ['locales/en.js', 'locales/hr.js', 'questions/en.js', 'questions/hr.js', 'assessment-config.js', 'assessment-engine.js', 'app.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, 'dist', file), 'utf8'), context, { filename: file });
  }
  return {
    window, nodes, storage, element,
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
    assert.equal(config.questionnaireVersion,4);
    assert.equal(config.highestAssessedStage,4);
    assert.equal(questions.length,28);
    assert.equal(new Set(questions.map(q=>q.id)).size,28);
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
    const mutations=[[null,{'prayer-vocal-v4':0}],[1,{'prayer-vocal-v4':1}],[2,{'examen-frequency-v4':1}],[3,{'examen-frequency-v4':2}],[4,{}]];
    for(const [stage,change] of mutations) {
      const result=resultFor(app,{...strong,...change});
      assert.equal(result.stage,stage);
      assert.equal(app.element('#result-view').hidden,false);
      assert.equal(app.element('#result-number').textContent,stage?['I','II','III','IV'][stage-1]:'—');
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
    assert.equal(unknown.skipped,28);
    assert.ok(unknown.stageChecks[0].checks.every(c=>c.status==='unknown'));
  }
}

function testEveryGate() {
  const app=boot();
  const strong=strongAnswers(app);
  assert.equal(resultFor(app,strong).stage,4);
  for(const q of app.window.spiritualAssessment.questionBlueprints) {
    const latest=Math.max(...Object.keys(q.requirements).map(Number));
    const rule=q.requirements[latest];
    const failedOption=Array.from({length:q.optionCount},(_,i)=>i).find(i=>!rule.accepted.includes(i) && !(rule.exempt||[]).includes(i) && !(q.unknownOptions||[]).includes(i));
    assert.notEqual(failedOption,undefined,`${q.id} has a contradictory choice`);
    assert.notEqual(resultFor(app,{...strong,[q.id]:failedOption}).stage,4,`${q.id} cannot be compensated`);
    const skipped=resultFor(app,{...strong,[q.id]:'skip'});
    assert.notEqual(skipped.stage,4,`${q.id} skip cannot pass`);
    assert.equal(skipped.stageChecks[3].checks.find(c=>c.id===q.id).status,'unknown');
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
  assert.equal(none.stage,4);
  assert.equal(none.stageChecks[3].checks.find(c=>c.id==='venial-reparation-v4').status,'notTriggered');
  const contradictory=resultFor(app,{...strong,'mortal-fall-v4':3,'mortal-response-v4':2});
  assert.equal(contradictory.stage,null);
  assert.equal(contradictory.stageChecks[0].checks.find(c=>c.id==='mortal-response-v4').reason,'contradictoryAnswer');
  const noWeekday=resultFor(app,{...strong,'sacraments-daily-mass-v4':3});
  assert.equal(noWeekday.stage,4);
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
  const key='spiritual-progress-reflection:v4';
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
test("null and I–IV patterns render without numerical scoring or invented V–VII results", testPatterns);
test("each real-bank required condition fails closed on a contrary or skipped answer", testEveryGate);
test("rare deliberate venial sin, daily examen, quarterly confession or merely regular prayer cannot pass IV", testExactThresholds);
test("actual-event exemptions, contradictions, inaccessible sacraments and no suffering evidence are distinct", testCircumstances);
test("v4 answers survive refresh, translation, criterion review and restart; v3 is not reused", testPersistence);

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
