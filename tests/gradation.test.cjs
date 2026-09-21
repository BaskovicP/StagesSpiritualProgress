const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const window = {};
for (const file of ['assessment-config.js','assessment-engine.js','questions/hr.js','questions/en.js','locales/hr.js','locales/en.js','gradation.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../dist',file),'utf8'), {window});
}
const config = window.spiritualAssessment;
const {evaluate} = window.spiritualAssessmentEngine;
const {describe,render} = window.spiritualGradation;
const clone = value => JSON.parse(JSON.stringify(value));
function strong() {
  const answers = Object.fromEntries(config.questionBlueprints.map(q => [q.id,q.requirements[Math.max(...Object.keys(q.requirements).map(Number))].accepted[0]]));
  for (const q of config.questionBlueprints) if (q.exemptWhen?.bidirectional && q.exemptWhen.accepted.includes(answers[q.exemptWhen.questionId])) answers[q.id] = q.exemptWhen.optionIndex;
  return answers;
}

test('seven explicit progressions follow the supplied ranges, without filling source gaps', () => {
  const expected = {
    seriousSin:[[1,1,0],[2,2,1],[3,3,2]],
    venialSin:[[1,1,0],[2,2,1],[3,3,2],[4,4,3]],
    imperfections:[[3,3,0],[4,4,1],[5,5,2],[6,6,3]],
    suffering:[[1,1,0],[2,2,1],[3,3,2],[4,4,3],[5,6,4]],
    prayer:[[1,1,1],[2,2,2],[3,3,3],[4,4,4],[5,6,5]],
    examen:[[1,1,0],[2,2,1],[3,3,2],[4,4,3]],
    sacraments:[[1,1,1],[2,2,2],[3,3,3],[4,4,4]]
  };
  const anchors = config.questionBlueprints.filter(q=>q.gradation);
  assert.equal(anchors.length,7);
  assert.equal(config.questionBlueprints.length,39);
  for (const q of anchors) {
    assert.deepEqual(clone(q.gradation.map(s=>[s.from,s.to,s.option])),expected[q.domain]);
    for (const lang of ['hr','en']) {
      const copy = window.spiritualQuestions[lang].find(item=>item.id===q.id);
      assert.equal(copy.optionHeadings.length,q.optionCount);
      assert.ok(copy.optionHeadings.every(label=>typeof label==='string' && label.length>3));
      // A source association is not an ordinal score; the explicit conjunction still applies.
      for (const s of q.gradation) {
        const answers = {...strong(),[q.id]:s.option};
        const profile = evaluate(config,answers).domainProfiles.find(p=>p.domain===q.domain);
        assert.equal(profile.stageTo,s.to,q.id+':'+s.option);
        const model = describe(config,answers,profile,window.spiritualQuestions[lang]);
        assert.equal(model.steps.filter(step=>step.selected).length,1);
        assert.equal(model.steps.filter(step=>step.supported).length,1);
        assert.equal(model.mismatch,false);
        assert.ok(render(model,window.spiritualLocales[lang]).includes('data-gradation-stage="'+s.from+'-'+s.to+'"'));
      }
    }
  }
});

test('uncertainty, skips and absence of practice are not mapped to an invented low stage', () => {
  for (const q of config.questionBlueprints.filter(q=>q.gradation)) {
    for (const answer of [...q.unknownOptions,'skip',undefined,100]) {
      const answers = {...strong(),[q.id]:answer};
      const profile = evaluate(config,answers).domainProfiles.find(p=>p.domain===q.domain);
      assert.equal(profile.stageTo,null);
      const model = describe(config,answers,profile,window.spiritualQuestions.hr);
      assert.equal(model.steps.filter(s=>s.selected || s.supported).length,0);
      assert.equal(model.unmapped,true);
    }
  }
  for (const id of ['prayer-pattern-v6','sacraments-pattern-v6']) {
    const answers={...strong(),[id]:0};
    assert.equal(evaluate(config,answers).stage,null);
  }
});

test('a high overview choice cannot compensate for a failed detailed check; both markers remain honest', () => {
  for (const [id,option,domain,expected] of [
    ['venial-occurrence-v4',2,'venialSin',3],
    ['imperfections-consent-v5',1,'imperfections',4],
    ['suffering-service-v5',0,'suffering',4],
    ['prayer-meditation-v4',0,'prayer',2],
    ['examen-particular-v4',2,'examen',3],
    ['sacraments-confession-schedule-v4',2,'sacraments',2],
    ['mortal-fall-v4',2,'seriousSin',null]
  ]) {
    const answers = {...strong(),[id]:option};
    const before = JSON.stringify(answers);
    const profile = evaluate(config,answers).domainProfiles.find(p=>p.domain===domain);
    assert.equal(profile.stageTo,expected,id);
    for (const lang of ['hr','en']) {
      const model=describe(config,answers,profile,window.spiritualQuestions[lang]);
      assert.equal(model.mismatch,true,id);
      assert.ok(render(model,window.spiritualLocales[lang]).includes(window.spiritualLocales[lang].gradation.different));
    }
    assert.equal(JSON.stringify(answers),before);
  }
});

test('gradation markup escapes descriptions and labels and discloses mystical limits', () => {
  const answers=strong();
  for (const lang of ['hr','en']) {
    const copy=window.spiritualLocales[lang];
    for(const profile of evaluate(config,answers).domainProfiles) {
      const model=describe(config,answers,profile,window.spiritualQuestions[lang]);
      const html=render(model,copy);
      assert.equal((html.match(/class="gradation-step /g)||[]).length,1);
      assert.doesNotMatch(html,/<progress|<meter|NaN|undefined|VII/);
      if(profile.sourceCeiling===6)assert.ok(html.includes(copy.gradation.advanced));
      model.steps[0].label='<script>alert(1)</script>';
      model.steps[0].description='<img onerror=alert(1)>';
      assert.doesNotMatch(render(model,copy),/<script|<img/);
    }
  }
});
