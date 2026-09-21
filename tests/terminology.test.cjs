const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function boot() {
  const window={};
  for(const file of ['assessment-config.js','assessment-engine.js','questions/hr.js','questions/en.js','terminology/hr.js','terminology/en.js','terminology.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(root,'dist',file),'utf8'),{window},{filename:file});
  }
  return window;
}
const clone=value=>JSON.parse(JSON.stringify(value));

test('every question has an explicit, bilingual, source-backed set of terms',()=>{
  const w=boot(), glossary=w.spiritualTerminology;
  const ids=w.spiritualAssessment.questionBlueprints.map(q=>q.id);
  assert.deepEqual(Object.keys(glossary.questionTerms).sort(),Array.from(ids).sort());
  assert.equal(ids.length,39);
  const used=new Set();
  const hr=w.spiritualTerminologyCopy.hr,en=w.spiritualTerminologyCopy.en;
  assert.deepEqual(Object.keys(hr.terms).sort(),Object.keys(en.terms).sort());
  assert.equal(Object.keys(hr.terms).length,37);
  assert.deepEqual(Object.keys(hr.labels).sort(),Object.keys(en.labels).sort());
  for(const id of ids) {
    const mapping=glossary.questionTerms[id];
    assert.ok(mapping.length>=1&&mapping.length<=6,id);
    assert.equal(new Set(mapping).size,mapping.length);
    mapping.forEach(term=>used.add(term));
    for(const lang of ['hr','en']) {
      const model=glossary.describe(lang,id);
      assert.equal(model.terms.length,mapping.length);
      for(const term of model.terms) {
        for(const key of ['title','meaning','distinction','example']) assert.ok(typeof term[key]==='string'&&term[key].length>5,lang+':'+term.id+':'+key);
        assert.ok(term.sources.length>0);
        assert.deepEqual(Array.from(hr.terms[term.id].sources),Array.from(en.terms[term.id].sources));
        for(const source of term.sources) {
          assert.ok(glossary.sources[source.id],source.id);
          assert.equal(source.label,glossary.sources[source.id].label);
          if(source.url) assert.match(source.url,/^https:\/\/(www\.)?(vatican\.va|newadvent\.org|ignatianspirituality\.com)\//);
        }
      }
    }
  }
  assert.equal(used.size,31,'the question glossary keeps 31 explicitly used entries');
  assert.equal(Object.keys(hr.terms).length,37);
  const allHr=glossary.describeAll('hr'),allEn=glossary.describeAll('en');
  assert.equal(allHr.groups.core.length,31);
  assert.equal(allHr.groups.context.length,5);
  assert.equal(allHr.groups.safety.length,1);
  assert.deepEqual(allHr.groups.core.map(term=>term.id),allEn.groups.core.map(term=>term.id));
  for(const term of [...allHr.groups.context,...allHr.groups.safety,...allEn.groups.context,...allEn.groups.safety]) {
    for(const key of ['title','meaning','distinction','example']) assert.ok(typeof term[key]==='string'&&term[key].length>5,term.id+':'+key);
    assert.ok(term.sources.length>0,term.id);
    assert.equal(term.questionUses.length,0,term.id);
  }
});

test('primary meanings stay visible; related definitions and sources use native disclosures',()=>{
  const w=boot();
  for(const lang of ['hr','en']) for(const id of Object.keys(w.spiritualTerminology.questionTerms)) {
    const model=w.spiritualTerminology.describe(lang,id);
    const html=w.spiritualTerminology.render(lang,id);
    assert.equal((html.match(/class="term-primary"/g)||[]).length,1);
    assert.equal((html.match(/class="term-related"/g)||[]).length,model.terms.length-1);
    assert.equal((html.match(/class="term-related-group"/g)||[]).length,model.terms.length>1?1:0);
    const opening=html.slice(0,html.indexOf('<details'));
    const escaped=model.terms[0].meaning.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
    assert.ok(opening.includes(escaped));
    assert.ok(opening.includes(model.labels.distinction));
    assert.doesNotMatch(html,/\b(?:onclick|onmouseover|data-stage|data-score)=|<script|<iframe|<img/);
    assert.doesNotMatch(html,/>undefined</);
    for(const link of html.matchAll(/<a\b[^>]*>/g)) assert.match(link[0],/rel="noopener noreferrer"/);
  }
});

test('full glossary separates answer-critical, source-only and safety terms',()=>{
  const w=boot(),t=w.spiritualTerminology;
  for(const lang of ['hr','en']) {
    const all=t.describeAll(lang);
    assert.ok(all.groups.core.every(term=>term.questionUses.length>0));
    assert.ok(all.groups.context.every(term=>term.category==='context'));
    assert.ok(all.groups.safety.every(term=>term.category==='safety'));
    assert.equal(all.groups.safety[0].id,'scrupulosity');
  }
  assert.equal(t.describe('hr','suffering-pattern-v6').terms[0].id,'acceptance');
  assert.equal(t.describe('hr','imperfections-prompt-regret-v4').terms[0].id,'contrition');
});

test('mental prayer, meditation, reading and occasions retain the essential distinctions in both languages',()=>{
  const w=boot();
  const hr=w.spiritualTerminologyCopy.hr.terms,en=w.spiritualTerminologyCopy.en.terms;
  assert.match(hr.mentalPrayer.meaning,/kontemplativnu/);
  assert.match(en.mentalPrayer.meaning,/contemplative/);
  assert.match(hr.mentalPrayer.distinction,/nije uvijek/);
  assert.match(en.mentalPrayer.distinction,/not always/);
  assert.match(hr.meditation.distinction,/tuđe razmatranje/);
  assert.match(en.meditation.distinction,/someone else's meditation/);
  assert.match(hr.occasions.distinction,/neizbježan.*ne samo u vremenu/);
  assert.match(en.occasions.distinction,/inevitable.*not simply the timing/);
  assert.match(hr.examen.meaning,/molitven.*konkretne postupke/);
  assert.match(en.examen.meaning,/prayerful.*specific actions/);
  assert.match(hr.examen.distinction,/nije samo prisjećanje/i);
  assert.match(en.examen.distinction,/not merely recalling/);
  for(const lang of ['hr','en']) {
    const map=w.spiritualTerminology;
    assert.equal(map.describe(lang,'mortal-occasions-v4').terms[0].id,'occasions');
    assert.equal(map.describe(lang,'prayer-meditation-v4').terms[0].id,'meditation');
    assert.equal(map.describe(lang,'examen-method-v4').terms[0].id,'examen');
  }
});

test('definitions are escaped and unsupported language or question requests are safe',()=>{
  const w=boot(),t=w.spiritualTerminology;
  assert.deepEqual(clone(t.describe('unsupported','prayer-meditation-v4')),clone(t.describe('en','prayer-meditation-v4')));
  assert.equal(t.render('en','missing-question'),'');
  const term=w.spiritualTerminologyCopy.en.terms.meditation;
  const original={...term};
  for(const key of ['title','meaning','distinction','example']) term[key]='<img src=x onerror="attack()"> & <script>';
  const html=t.render('en','prayer-meditation-v4');
  assert.doesNotMatch(html,/<img|<script>/);
  assert.ok(html.includes('&lt;img')&&html.includes('&amp;'));
  Object.assign(term,original);
});

test('opening or describing terminology cannot change criteria, question options or a computed result',()=>{
  const w=boot(),config=w.spiritualAssessment;
  const answers=Object.fromEntries(config.questionBlueprints.map(q=>[q.id,q.requirements[Math.max(...Object.keys(q.requirements).map(Number))].accepted[0]]));
  for(const q of config.questionBlueprints) if(q.exemptWhen?.bidirectional&&q.exemptWhen.accepted.includes(answers[q.exemptWhen.questionId]))answers[q.id]=q.exemptWhen.optionIndex;
  const before=JSON.stringify({config,answers,questions:w.spiritualQuestions,result:w.spiritualAssessmentEngine.evaluate(config,answers)});
  for(const lang of ['hr','en']) for(const q of config.questionBlueprints) {
    w.spiritualTerminology.render(lang,q.id);
    w.spiritualTerminology.describe(lang,q.id);
  }
  const after=JSON.stringify({config,answers,questions:w.spiritualQuestions,result:w.spiritualAssessmentEngine.evaluate(config,answers)});
  assert.equal(after,before);
  assert.equal(config.questionnaireVersion,7);
  assert.equal(w.spiritualAssessmentEngine.evaluate(config,answers).stage,6);
});

test('term metadata and its audit are distinct from assessment requirements',()=>{
  const w=boot(),doc=fs.readFileSync(path.join(root,'TERMINOLOGY-NOTES.md'),'utf8');
  for(const id of Object.keys(w.spiritualTerminology.questionTerms))assert.ok(doc.includes(id),id);
  for(const source of Object.values(w.spiritualTerminology.sources)) {
    if(source.url)assert.ok(doc.includes(source.url),source.label);
  }
  const code=fs.readFileSync(path.join(root,'dist/terminology.js'),'utf8');
  assert.doesNotMatch(code,/sessionStorage|localStorage|fetch\(|XMLHttpRequest|spiritualAssessmentEngine|answers\[/);
});
