const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({ window: {} });
for (const file of ['assessment-config.js','assessment-engine.js','result-presentation.js','locales/hr.js','locales/en.js']) {
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist',file),'utf8'),context);
}
const config = context.window.spiritualAssessment;
const evaluate = context.window.spiritualAssessmentEngine.evaluate;
const presentation = context.window.spiritualResultPresentation;
function strong() {
  const answers = {};
  for (const q of config.questionBlueprints) answers[q.id] = q.requirements[Math.max(...Object.keys(q.requirements).map(Number))].accepted[0];
  for (const q of config.questionBlueprints) if (q.exemptWhen?.bidirectional && q.exemptWhen.accepted.includes(answers[q.exemptWhen.questionId])) answers[q.id] = q.exemptWhen.optionIndex;
  return answers;
}
const profile = (result, domain) => result.domainProfiles.find(item => item.domain === domain);

test('all seven areas are described independently without changing the overall conjunction', () => {
  const answers = {...strong(), 'examen-pattern-v6':1};
  const result = evaluate(config,answers);
  assert.equal(result.stage,2);
  assert.equal(result.domainProfiles.length,7);
  assert.equal(profile(result,'examen').stageFrom,2);
  assert.equal(profile(result,'examen').stageTo,2);
  assert.equal(profile(result,'examen').targetStage,3);
  assert.equal(profile(result,'prayer').stageFrom,6);
  assert.equal(profile(result,'prayer').stageTo,6);
  assert.equal(profile(result,'prayer').targetStage,6);
  assert.equal(profile(result,'imperfections').stageTo,6);
  const noOverall = evaluate(config,{...answers,'prayer-pattern-v6':0});
  assert.equal(noOverall.stage,null);
  assert.equal(profile(noOverall,'prayer').stageTo,null);
  assert.equal(profile(noOverall,'sacraments').stageTo,4);
  assert.equal(noOverall.domainProfiles.length,7);
});

test('source ceilings prevent inherited foundations being mislabelled as higher domain stages', () => {
  const result = evaluate(config,strong());
  const area = profile(result,'seriousSin');
  assert.equal(area.stageFrom,3);
  assert.equal(area.stageTo,3);
  assert.equal(area.targetStage,3);
  assert.equal(profile(result,'venialSin').stageFrom,4);
  assert.equal(profile(result,'examen').stageTo,4);
  assert.equal(profile(result,'sacraments').stageTo,4);
  assert.equal(profile(result,'imperfections').stageTo,6);
  assert.equal(profile(result,'suffering').stageTo,6);
  assert.equal(profile(result,'prayer').stageTo,6);
  for (const language of ['hr','en']) {
    const copy = context.window.spiritualLocales[language];
    const html = presentation.renderDomain(area.domain,area.targetChecks,copy,area);
    assert.match(html,/data-domain-level="3-3"/);
    assert.ok(html.includes(copy.stages[2].name));
  }
});

test('missing lower-domain rules are not fabricated and exemptions alone never establish a level', () => {
  const result = evaluate(config,{...strong(),'imperfections-pattern-v6':0,'examen-pattern-v6':0});
  const area = profile(result,'imperfections');
  assert.equal(area.stageFrom,3);
  assert.equal(area.stageTo,3);
  assert.equal(area.firstAssessedStage,3);
  assert.equal(area.targetStage,4);
  assert.ok(area.stages.slice(0,2).every(item => item.status === 'notAssessed'));
  assert.equal(profile(result,'examen').stageTo,1);
  assert.equal(profile(result,'examen').firstAssessedStage,1);
  const exemptOnly = { highestAssessedStage:4, questionBlueprints:[{id:'q',domain:'area',optionCount:2,requirements:{1:{accepted:[0],exempt:[1]}}}] };
  const exempt = evaluate(exemptOnly,{q:1}).domainProfiles[0];
  assert.equal(exempt.stageTo,null);
  assert.ok(exempt.stages.every(item => item.status === 'notTriggered'));
});

test('skipped, uncertain, contradictory and relaxed later rules cannot bypass an earlier domain requirement', () => {
  const allSkipped = evaluate(config,Object.fromEntries(config.questionBlueprints.map(q=>[q.id,'skip'])));
  assert.ok(allSkipped.domainProfiles.every(item=>item.stageTo===null));
  const partial = evaluate(config,{...strong(),'examen-method-v4':'skip'});
  assert.equal(profile(partial,'examen').stageTo,2);
  assert.equal(profile(partial,'examen').targetStage,3);
  const contradiction = evaluate(config,{...strong(),'mortal-response-v4':2});
  assert.equal(profile(contradiction,'seriousSin').stageTo,null);
  const noDifficulty = evaluate(config,{...strong(),'suffering-endure-v4':3,'suffering-pattern-v6':5,'suffering-meaning-joy-v4':3});
  assert.equal(profile(noDifficulty,'suffering').stageTo,null);
  const relaxed = { highestAssessedStage:4, questionBlueprints:[{id:'q',domain:'area',optionCount:2,requirements:{1:{accepted:[0]},2:{accepted:[1]}}}] };
  assert.equal(evaluate(relaxed,{q:1}).domainProfiles[0].stageTo,null);
});

test('domain targets are their own first unresolved threshold and display the correct translated stage name', () => {
  const result = evaluate(config,{...strong(),'examen-pattern-v6':1});
  for (const language of ['hr','en']) {
    const copy = context.window.spiritualLocales[language];
    const before = JSON.stringify(result);
    for (const area of result.domainProfiles) {
      const html = presentation.renderDomain(area.domain,area.targetChecks,copy,area);
      assert.ok(html.includes(`data-review-domain="${area.domain}"`));
      const target = area.stages[area.targetStage-1];
      assert.equal(JSON.stringify(area.targetChecks),JSON.stringify(target.checks));
      if (area.stageTo && area.stageFrom === area.stageTo) assert.ok(html.includes(copy.stages[area.stageTo-1].name));
      assert.doesNotMatch(html,/%|<progress\b|<meter\b/);
      assert.ok(area.stageTo === null || area.stageTo <= 6);
    }
    assert.equal(JSON.stringify(result),before);
  }
});
