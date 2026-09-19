const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, '../dist/assessment-engine.js'), 'utf8'), context);
const evaluate = context.window.spiritualAssessmentEngine.evaluate;

function question(id, domain, requirements) {
  return { id, domain, optionCount: 6, requirements, unknownOptions: [5] };
}
function fixture() {
  return {
    highestAssessedStage: 4,
    domainOrder: ['sin', 'prayer', 'examen', 'sacraments'],
    questionBlueprints: [
      question('repentance', 'sin', {
        1: { accepted: [1, 2, 3, 4] }, 2: { accepted: [2, 3, 4] },
        3: { accepted: [3, 4] }, 4: { accepted: [4] }
      }),
      question('prayer', 'prayer', {
        1: { accepted: [1, 2, 3, 4] }, 2: { accepted: [2, 3, 4] },
        3: { accepted: [3, 4] }, 4: { accepted: [4] }
      }),
      question('examen', 'examen', { 2: { accepted: [2, 3, 4] }, 3: { accepted: [3, 4] }, 4: { accepted: [4] } }),
      question('confession', 'sacraments', { 1: { accepted: [1, 2, 3, 4] }, 2: { accepted: [2, 3, 4] }, 4: { accepted: [4] } })
    ]
  };
}
const strongAnswers = () => ({ repentance: 4, prayer: 4, examen: 4, confession: 4 });

test('all source-gate profiles are evaluated without averages, randomness or probability fields', () => {
  for (let candidate = 1; candidate <= 4; candidate += 1) {
    const answers = Object.fromEntries(fixture().questionBlueprints.map((item) => [item.id, candidate]));
    const result = evaluate(fixture(), answers);
    assert.equal(result.stage, candidate);
    assert.equal(result.targetStage, Math.min(candidate + 1, 4));
    assert.equal(result.answeredCount, 4);
    assert.equal(result.skippedCount, 0);
    assert.equal(result.stageChecks[candidate - 1].status, 'supported');
    assert.deepEqual(JSON.parse(JSON.stringify(result)), JSON.parse(JSON.stringify(evaluate(fixture(), answers))));
    for (const unsupportedClaim of ['score', 'approximateScore', 'confidence', 'probability', 'accuracy', 'bootstrap']) {
      assert.equal(Object.hasOwn(result, unsupportedClaim), false);
    }
  }
  assert.equal(evaluate(fixture(), strongAnswers()).stage, 4);
  assert.throws(() => evaluate({ ...fixture(), highestAssessedStage: 6 }, strongAnswers()), /I–IV/);
});

test('each individual required gate blocks its candidate; high answers cannot compensate', () => {
  for (let candidate = 1; candidate <= 4; candidate += 1) {
    const baseline = evaluate(fixture(), strongAnswers()).stageChecks[candidate - 1];
    for (const gate of baseline.checks) {
      const result = evaluate(fixture(), { ...strongAnswers(), [gate.id]: 0 });
      assert.equal(result.stageChecks[candidate - 1].status, 'notSupported', `${candidate}: ${gate.id}`);
      assert.ok(result.stage === null || result.stage < candidate);
      assert.equal(result.stageChecks[candidate - 1].checks.find((check) => check.id === gate.id).status, 'notMet');
    }
  }
  assert.equal(evaluate(fixture(), { ...strongAnswers(), repentance: 0 }).stage, null);
  assert.equal(evaluate(fixture(), { ...strongAnswers(), examen: 3 }).stage, 3);
});

test('every required missing, skipped, uncertain or invalid answer blocks support without becoming a failure', () => {
  for (let candidate = 1; candidate <= 4; candidate += 1) {
    for (const gate of evaluate(fixture(), strongAnswers()).stageChecks[candidate - 1].checks) {
      for (const selected of [undefined, null, 'skip', 5, -1, 6, 2.5, '4', true, NaN, Infinity]) {
        const result = evaluate(fixture(), { ...strongAnswers(), [gate.id]: selected });
        const checked = result.stageChecks[candidate - 1];
        assert.equal(checked.status, 'incomplete', `${candidate}: ${gate.id}: ${String(selected)}`);
        assert.ok(result.stage === null || result.stage < candidate);
        const check = checked.checks.find((item) => item.id === gate.id);
        assert.equal(check.status, 'unknown');
        assert.ok(Object.is(check.selected, selected));
      }
    }
  }
  const result = evaluate(fixture(), { repentance: 4, prayer: 5, examen: 'skip', confession: '4' });
  assert.equal(result.answeredCount, 2);
  assert.equal(result.unknownAnswerCount, 1);
  assert.equal(result.skippedCount, 1);
  assert.equal(result.invalidAnswerCount, 1);
  assert.equal(result.completedCount, 3);
  assert.equal(result.unansweredCount, 1);
});

test('new later criteria do not block earlier stages; previous positive expectations are inherited', () => {
  const assessment = fixture();
  assessment.questionBlueprints.push(question('virtue', 'imperfections', { 4: { accepted: [4] } }));
  const result = evaluate(assessment, strongAnswers());
  assert.equal(result.stage, 3);
  assert.equal(result.targetStage, 4);
  assert.equal(result.stageChecks[2].checks.find((check) => check.id === 'confession').ruleStage, 2);
  assert.equal(result.stageChecks[0].checks.some((check) => check.id === 'examen'), false);
  assert.equal(result.domainChecks.find((domain) => domain.domain === 'imperfections').status, 'incomplete');
  assert.equal(result.totals.unknownCount, 1);
});

test('an accidentally relaxed later rule cannot bypass a failed or unknown earlier stage', () => {
  const assessment = fixture();
  assessment.questionBlueprints[0].requirements[1] = { accepted: [1] };
  const result = evaluate(assessment, strongAnswers());
  assert.equal(result.stage, null);
  assert.equal(result.stageChecks[3].criterionStatus, 'supported');
  assert.equal(result.stageChecks[3].status, 'notSupported');
  assert.equal(result.targetStage, 1);
  const emptyFoundation = { ...fixture(), questionBlueprints: [question('later', 'prayer', { 2: { accepted: [4] } })] };
  assert.equal(evaluate(emptyFoundation, { later: 4 }).stage, null);
  assert.equal(evaluate(emptyFoundation, { later: 4 }).stageChecks[1].status, 'incomplete');
});

function conditionalFixture() {
  return {
    highestAssessedStage: 4,
    questionBlueprints: [
      question('event', 'sin', { 3: { accepted: [4] } }),
      {
        ...question('response', 'sin', { 1: { accepted: [2], exempt: [3] } }),
        exemptWhen: { optionIndex: 3, questionId: 'event', accepted: [4], bidirectional: true }
      },
      question('mass', 'sacraments', { 1: { accepted: [2], exempt: [3] } })
    ]
  };
}

test('no-event follow-ups are exempt only with a confirmed matching antecedent, never positive evidence', () => {
  const assessment = conditionalFixture();
  const result = evaluate(assessment, { event: 4, response: 3, mass: 2 });
  assert.equal(result.stage, 4);
  assert.equal(result.stageChecks[0].checks[0].status, 'notTriggered');
  assert.equal(result.stageChecks[0].metCount, 1);
  assert.equal(result.stageChecks[0].notTriggeredCount, 1);
  for (const event of [undefined, null, 'skip', 5, '4', -1, 9]) {
    const uncertain = evaluate(assessment, { event, response: 3, mass: 2 });
    assert.equal(uncertain.stage, null);
    assert.equal(uncertain.stageChecks[0].checks[0].status, 'unknown');
    assert.equal(uncertain.stageChecks[0].checks[0].reason, 'conditionUnconfirmed');
  }
  const contradiction = evaluate(assessment, { event: 0, response: 3, mass: 2 });
  assert.equal(contradiction.stage, null);
  assert.equal(contradiction.stageChecks[0].checks[0].status, 'unknown');
  assert.equal(contradiction.stageChecks[0].checks[0].reason, 'contradictoryAnswer');
  assert.equal(evaluate(assessment, { event: 4, response: 'skip', mass: 2 }).stage, null);
});

test('claimed actual follow-up responses also require a confirmed event and cannot conflict with no event', () => {
  const assessment = conditionalFixture();
  assert.equal(evaluate(assessment, { event: 0, response: 2, mass: 2 }).stage, 2);
  const contradiction = evaluate(assessment, { event: 4, response: 2, mass: 2 });
  assert.equal(contradiction.stage, null);
  assert.equal(contradiction.stageChecks[0].checks[0].status, 'unknown');
  assert.equal(contradiction.stageChecks[0].checks[0].reason, 'contradictoryAnswer');
  for (const event of [undefined, null, 'skip', 5, '4', -1, 9]) {
    const unconfirmed = evaluate(assessment, { event, response: 2, mass: 2 });
    assert.equal(unconfirmed.stage, null);
    assert.equal(unconfirmed.stageChecks[0].checks[0].reason, 'conditionUnconfirmed');
  }
});

test('one-way exemption prerequisites do not invent the converse relationship', () => {
  const assessment = conditionalFixture();
  delete assessment.questionBlueprints[1].exemptWhen.bidirectional;
  // No fall does not mean no temptation: actual resistance can coexist with no
  // fall, whereas saying there was no temptation still requires no actual fall.
  assert.equal(evaluate(assessment, { event: 4, response: 2, mass: 2 }).stage, 4);
  assert.equal(evaluate(assessment, { event: 0, response: 2, mass: 2 }).stage, 2);
  assert.equal(evaluate(assessment, { event: 4, response: 3, mass: 2 }).stage, 4);
  assert.equal(evaluate(assessment, { event: 0, response: 3, mass: 2 }).stage, null);
  const noAntecedent = evaluate(assessment, { response: 2, mass: 2 });
  assert.equal(noAntecedent.stage, 2);
  assert.equal(noAntecedent.stageChecks[0].checks[0].status, 'met');
  assert.equal(evaluate(assessment, { response: 3, mass: 2 }).stage, null);
});

test('genuine unavailable opportunity is neither personal failure nor a positive achievement', () => {
  const result = evaluate(conditionalFixture(), { event: 4, response: 3, mass: 3 });
  assert.equal(result.stage, 4);
  const mass = result.domainChecks.find((domain) => domain.domain === 'sacraments');
  assert.equal(mass.metCount, 0);
  assert.equal(mass.notTriggeredCount, 1);
  assert.equal(mass.notMetCount, 0);
});

test('configuration errors fail closed; evaluation does not mutate configuration or answers', () => {
  const config = fixture();
  const answers = strongAnswers();
  const before = JSON.stringify({ config, answers });
  evaluate(config, answers);
  assert.equal(JSON.stringify({ config, answers }), before);
  assert.throws(() => evaluate({ highestAssessedStage: 4, questionBlueprints: [] }, {}), /non-empty/);
  assert.throws(() => evaluate({ ...config, questionBlueprints: [config.questionBlueprints[0], config.questionBlueprints[0]] }, {}), /IDs/);
  const overlapping = fixture();
  overlapping.questionBlueprints[0].requirements[1].exempt = [1];
  assert.throws(() => evaluate(overlapping, {}), /distinct/);
  const unknownAccepted = fixture();
  unknownAccepted.questionBlueprints[0].requirements[1].accepted = [5];
  assert.throws(() => evaluate(unknownAccepted, {}), /distinct/);
  const missingAntecedent = conditionalFixture();
  missingAntecedent.questionBlueprints[1].exemptWhen.questionId = 'missing';
  assert.throws(() => evaluate(missingAntecedent, {}), /conditional/);
  const inheritedAnswer = Object.create({ repentance: 4 });
  Object.assign(inheritedAnswer, { prayer: 4, examen: 4, confession: 4 });
  assert.equal(evaluate(fixture(), inheritedAnswer).stage, null);
});
