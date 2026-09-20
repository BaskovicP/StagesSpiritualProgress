const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const window={};
for(const file of ['assessment-config.js','assessment-engine.js','locales/hr.js','locales/en.js','questions/hr.js','questions/en.js','growth-guidance.js','result-presentation.js','next-stage.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../dist',file),'utf8'),{window},{filename:file});
}
const config=window.spiritualAssessment;
const evaluate=window.spiritualAssessmentEngine.evaluate;
const next=window.spiritualNextStage;
const clone=value=>JSON.parse(JSON.stringify(value));
function strong() {
  const answers=Object.fromEntries(config.questionBlueprints.map(q=>[q.id,q.requirements[Math.max(...Object.keys(q.requirements).map(Number))].accepted[0]]));
  for(const q of config.questionBlueprints)if(q.exemptWhen?.bidirectional&&q.exemptWhen.accepted.includes(answers[q.exemptWhen.questionId]))answers[q.id]=q.exemptWhen.optionIndex;
  return answers;
}
function plan(answers,language='hr') {
  const result=evaluate(config,answers),copy=window.spiritualLocales[language],questions=window.spiritualQuestions[language];
  return {result,copy,questions,model:next.describe(config,result,questions,copy,language)};
}

test('summary uses the next OVERALL threshold, not distant independent domain targets',()=>{
  const answers={...strong(),'prayer-pattern-v6':1,'examen-pattern-v6':0,'venial-pattern-v6':0,'mortal-occasions-v4':1,'imperfections-pattern-v6':0};
  const {result,model,copy}=plan(answers);
  assert.equal(result.stage,1);
  assert.equal(model.targetStage,2);
  assert.deepEqual(clone(model.areas.map(a=>a.domain)),['seriousSin','venialSin','prayer','examen']);
  assert.deepEqual(clone(model.notAssessed),['imperfections']);
  assert.equal(result.domainProfiles.find(p=>p.domain==='imperfections').targetStage,4);
  assert.ok(model.areas.every(a=>a.items.every(item=>item.ruleStage<=2)));
  const html=next.render(model,copy);
  assert.match(html,/Što još treba za II\. stupanj/);
  assert.doesNotMatch(html,/data-next-domain="imperfections"|data-next-criteria="[3-7]"/);
});

test('every answer option exposes exactly all unresolved next-threshold checks with the correct advice',()=>{
  for(const language of ['hr','en'])for(const q of config.questionBlueprints)for(const answer of [...Array(q.optionCount).keys(),'skip',undefined,99]) {
    const answers={...strong(),[q.id]:answer};
    const {result,model,copy,questions}=plan(answers,language);
    const before=JSON.stringify({result,answers,config,questions});
    if(model.ceiling){assert.equal(result.stage,6);continue;}
    const pending=result.targetChecks.filter(c=>['notMet','unknown'].includes(c.status));
    const actual=model.areas.flatMap(a=>a.items);
    assert.deepEqual(clone(actual.map(i=>i.id).sort()),clone(pending.map(i=>i.id).sort()),q.id+':'+answer);
    assert.equal(new Set(actual.map(i=>i.id)).size,actual.length);
    assert.equal(model.targetStage,result.stage===null?1:result.stage+1);
    for(const item of actual) {
      const check=pending.find(c=>c.id===item.id);
      assert.equal(item.expectation,questions[item.index].expectations[check.ruleStage]);
      assert.equal(item.status,check.status);
      if(check.status==='unknown')assert.equal(item.action,copy.growth.unknownAction);
      else {
        const tips=window.spiritualGrowthGuidance.tips[language][check.id];
        assert.equal(item.action,typeof tips==='string'?tips:tips[check.ruleStage]);
      }
      assert.ok(item.action.length>20);
      assert.equal(item.selected,Number.isInteger(check.selected)?questions[item.index].options[check.selected]??copy.notAnswered:check.selected==='skip'?copy.preferNot:copy.notAnswered);
    }
    const allDomains=[...model.areas.map(a=>a.domain),...model.supported,...model.exempt,...model.notAssessed];
    assert.deepEqual(clone(allDomains.sort()),clone(config.domainOrder).sort());
    const html=next.render(model,copy);
    assert.equal((html.match(/data-next-domain=/g)||[]).length,model.areas.length);
    assert.equal((html.match(/data-next-question=/g)||[]).length,actual.length);
    assert.doesNotMatch(html,/NaN|>undefined</);
    assert.equal(JSON.stringify({result,answers,config,questions}),before);
  }
});

test('uncertainty is clarification, not a recommendation for stricter practice',()=>{
  const {model,copy}=plan({...strong(),'mortal-occasions-v4':'skip','mortal-pattern-v6':0});
  const area=model.areas.find(a=>a.domain==='seriousSin');
  assert.equal(area.kind,'mixed');
  assert.ok(area.items.some(i=>i.status==='notMet'));
  assert.ok(area.items.some(i=>i.status==='unknown'&&i.action===copy.growth.unknownAction));
  const skipped=Object.fromEntries(config.questionBlueprints.map(q=>[q.id,'skip']));
  const initial=plan(skipped);
  assert.equal(initial.model.initial,true);
  assert.equal(initial.model.targetStage,1);
  assert.ok(initial.model.areas.every(a=>a.kind==='clarify'));
  assert.ok(next.render(initial.model,copy).includes(copy.nextStageSummary.initialTitle));
  assert.ok(initial.model.areas.flatMap(a=>a.items).every(i=>i.action===copy.growth.unknownAction));
});

test('inapplicable areas are distinct from supported or missing-source areas',()=>{
  const custom={domainOrder:['sacraments','prayer','imperfections'],highestAssessedStage:2,questionBlueprints:[
    {id:'sacraments-weekly-mass-v4',domain:'sacraments',optionCount:2,requirements:{1:{accepted:[0],exempt:[1]}}},
    {id:'prayer-pattern-v6',domain:'prayer',optionCount:3,requirements:{1:{accepted:[0,1]},2:{accepted:[1]}}}
  ]};
  const result=evaluate(custom,{'sacraments-weekly-mass-v4':1,'prayer-pattern-v6':0});
  const copy=window.spiritualLocales.hr,questions=window.spiritualQuestions.hr;
  const model=next.describe(custom,result,questions,copy,'hr');
  assert.deepEqual(clone(model.exempt),['sacraments']);
  assert.deepEqual(clone(model.notAssessed),['imperfections']);
  assert.deepEqual(clone(model.areas.map(a=>a.domain)),['prayer']);
  assert.equal(model.supported.length,0);
  const html=next.render(model,copy);
  assert.match(html,/data-next-settled="exempt"/);
  assert.match(html,/data-next-settled="notAssessed"/);
  assert.doesNotMatch(html,/data-next-domain="sacraments"/);
});

test('V–VI remain practical comparisons, and VI never invents a route or requirements for VII',()=>{
  for(const language of ['hr','en']) {
    for(const [stage,change] of [[4,{'imperfections-consent-v5':1}],[5,{'prayer-self-forgetfulness-v5':1}],[6,{}]]) {
      const {model,result,copy}=plan({...strong(),...change},language);
      assert.equal(result.stage,stage);
      const html=next.render(model,copy);
      if(stage===6) {
        assert.equal(model.ceiling,true);
        assert.equal(model.targetStage,null);
        assert.equal(model.areas.length,0);
        assert.ok(html.includes(copy.nextStageSummary.ceilingBody));
        assert.doesNotMatch(html,/data-next-domain|data-next-question|data-next-criteria/);
      } else assert.ok(html.includes(copy.nextStageSummary.advanced));
      assert.doesNotMatch(html,/data-next-criteria="7"/);
    }
  }
});

test('summary is bilingual, HTML-safe and keyboard-accessible without score fields',()=>{
  const hr=window.spiritualLocales.hr,en=window.spiritualLocales.en;
  assert.deepEqual(Object.keys(hr.nextStageSummary),Object.keys(en.nextStageSummary));
  const {model}=plan({...strong(),'prayer-pattern-v6':1});
  const evil='<img src=x onerror="attack()"> & <script>';
  const copy=clone(hr),edited=clone(model);
  edited.areas[0].items[0].expectation=evil;
  edited.areas[0].items[0].action=evil;
  edited.areas[0].items[0].selected=evil;
  edited.areas[0].items[0].question=evil;
  copy.domains.prayer=evil;
  const html=next.render(edited,copy);
  assert.doesNotMatch(html,/<img|<script>/);
  assert.match(html,/&lt;img/);
  assert.match(html,/<button type="button"/);
  assert.match(html,/aria-label=/);
  assert.doesNotMatch(html,/<progress|<meter|data-score|\d+%/);
  assert.equal(typeof hr.nextStage,'string','existing stage-dialog label must not be overwritten');
});

