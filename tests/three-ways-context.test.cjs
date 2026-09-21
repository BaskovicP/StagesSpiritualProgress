const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'..');
const window = {};
for(const file of ['questions/hr.js','questions/en.js','locales/hr.js','locales/en.js','assessment-config.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),{window});
}
const source = fs.readFileSync(path.join(root,'three-ways.md'),'utf8');
const map = fs.readFileSync(path.join(root,'QUESTIONNAIRE-SOURCE-MAP.hr.md'),'utf8');
const review = fs.readFileSync(path.join(root,'THREE-WAYS-REVIEW.md'),'utf8');

test('twenty bilingual contextual refinements cite real passages without replacing the original scoring references', () => {
  const hr=window.spiritualQuestions.hr, en=window.spiritualQuestions.en;
  assert.equal(hr.length,39);
  assert.equal(hr.filter(q=>q.contextSources).length,20);
  assert.equal(en.filter(q=>q.contextSources).length,20);
  assert.equal(window.spiritualAssessment.questionnaireVersion,7);
  for(const [i,q] of hr.entries()) {
    assert.deepEqual(Array.from(q.contextSources||[]),Array.from(en[i].contextSources||[]));
    assert.equal(q.id,en[i].id);
    for(const reference of q.contextSources||[]) {
      assert.ok(reference.startsWith('three-ways.md: '));
      const section=reference.slice('three-ways.md: '.length);
      const direction=section.match(/^Directions \(([1-4])\)$/);
      assert.ok(direction
        ? source.includes('\nDirections\n') && source.includes('\n('+direction[1]+') ')
        : source.includes('\n'+section+'\n'),reference);
      assert.ok(map.includes(reference));
      assert.ok(review.includes(q.id));
    }
    // Supplemental theological context is not a new gate or mystical input.
    assert.ok(window.spiritualAssessment.questionBlueprints[i].sources.every(ref=>!ref.includes('three-ways')));
  }
});

test('reader safeguards cover overlapping ways, feeling versus choice, ordinary life and Communion', () => {
  const pair=(id)=>['hr','en'].map(lang=>window.spiritualQuestions[lang].find(q=>q.id===id));
  const [hrDry,enDry]=pair('prayer-dryness-v4');
  assert.match(hrDry.clarification,/nazadovanje/);
  assert.match(enDry.clarification,/regression/);
  assert.match(hrDry.clarification,/različitih razloga/);
  assert.match(enDry.clarification,/different reasons/);
  const [hrAffect,enAffect]=pair('prayer-loving-response-v4');
  assert.match(hrAffect.example,/Ne osjeća posebnu toplinu/);
  assert.match(enAffect.example,/no special warmth/);
  const [hrLife,enLife]=pair('prayer-daily-life-v5');
  assert.match(hrLife.clarification,/rekreacija/);
  assert.match(enLife.clarification,/recreation/);
  const [hrMass,enMass]=pair('sacraments-daily-mass-v4');
  assert.match(hrMass.clarification,/ne odlučuje/);
  assert.match(enMass.clarification,/does not decide/);
  for(const lang of ['hr','en']) {
    const copy=window.spiritualLocales[lang];
    assert.ok(copy.threeWaysTitle.length>10 && copy.threeWaysBody.length>100);
    assert.match(copy.resultCaution,lang==='hr'?/preklapaju/:/overlap/);
    assert.match(copy.advancedPracticalNote,lang==='hr'?/izostanak nije razlog za niži rezultat/:/absence is not a reason for a lower result/);
    assert.match(copy.domainHelp.sacraments,lang==='hr'?/ne određuje/:/does not determine/);
  }
});
