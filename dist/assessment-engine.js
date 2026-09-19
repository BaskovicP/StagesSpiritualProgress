(() => {
  "use strict";

  const MAXIMUM_ASSESSED_STAGE = 4;
  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const isOption = (value, question) => Number.isInteger(value) && value >= 0 && value < question.optionCount;

  function validateAssessment(assessment) {
    if (!assessment || !Array.isArray(assessment.questionBlueprints) || !assessment.questionBlueprints.length) {
      throw new TypeError("An assessment requires a non-empty question bank.");
    }
    const highest = assessment.highestAssessedStage;
    if (!Number.isInteger(highest) || highest < 1 || highest > MAXIMUM_ASSESSED_STAGE) {
      throw new TypeError("Only practical expectations for Stages I–IV can be assessed.");
    }
    const questions = new Map();
    for (const question of assessment.questionBlueprints) {
      if (!question || typeof question.id !== "string" || !question.id || questions.has(question.id) ||
          typeof question.domain !== "string" || !question.domain ||
          !Number.isInteger(question.optionCount) || question.optionCount < 1 ||
          !question.requirements || typeof question.requirements !== "object" || Array.isArray(question.requirements)) {
        throw new TypeError("Question IDs, domains, option counts and requirements must be valid.");
      }
      questions.set(question.id, question);
      const validateOptions = (options) => Array.isArray(options) && options.every((option) => isOption(option, question));
      if (question.unknownOptions !== undefined && !validateOptions(question.unknownOptions)) {
        throw new TypeError(`Invalid uncertain options for ${question.id}.`);
      }
      for (const [stage, rule] of Object.entries(question.requirements)) {
        if (!/^[1-4]$/.test(stage) || !rule || !validateOptions(rule.accepted) ||
            (rule.exempt !== undefined && !validateOptions(rule.exempt))) {
          throw new TypeError(`Invalid stage requirement for ${question.id}.`);
        }
        const exempt = rule.exempt || [];
        if (rule.accepted.some((option) => exempt.includes(option)) ||
            (question.unknownOptions || []).some((option) => rule.accepted.includes(option) || exempt.includes(option))) {
          throw new TypeError(`Accepted, exempt and uncertain options must be distinct for ${question.id}.`);
        }
      }
    }
    for (const question of questions.values()) {
      const condition = question.exemptWhen;
      if (!condition) continue;
      const antecedent = questions.get(condition.questionId);
      if (!isOption(condition.optionIndex, question) || !antecedent || antecedent === question ||
          !Array.isArray(condition.accepted) || !condition.accepted.length ||
          !condition.accepted.every((option) => isOption(option, antecedent)) ||
          (condition.bidirectional !== undefined && typeof condition.bidirectional !== "boolean") ||
          Object.values(question.requirements).some((rule) => rule.accepted.includes(condition.optionIndex))) {
        throw new TypeError(`Invalid conditional exemption for ${question.id}.`);
      }
    }
    return questions;
  }

  function answerState(question, answers) {
    if (!hasOwn(answers, question.id) || answers[question.id] === undefined || answers[question.id] === null) {
      return { selected: answers[question.id], reason: "unanswered" };
    }
    const selected = answers[question.id];
    if (selected === "skip") return { selected, reason: "skipped" };
    if (!isOption(selected, question)) return { selected, reason: "invalidAnswer" };
    if ((question.unknownOptions || []).includes(selected)) return { selected, reason: "uncertain" };
    return { selected, reason: null };
  }

  function checkRequirement(question, rule, ruleStage, answers, questions) {
    const answer = answerState(question, answers);
    const check = { id: question.id, domain: question.domain, ruleStage, selected: answer.selected };
    if (answer.reason) return { ...check, status: "unknown", reason: answer.reason };

    const condition = question.exemptWhen;
    if (condition && (condition.bidirectional || condition.optionIndex === answer.selected)) {
      const antecedent = answerState(questions.get(condition.questionId), answers);
      if (antecedent.reason) {
        return { ...check, status: "unknown", reason: "conditionUnconfirmed", conditionReason: antecedent.reason };
      }
      // Actual-event follow-ups opt into bidirectional consistency: a no-event
      // answer cannot coexist with a claimed response after that event. Other
      // exemptions are one-way prerequisites (e.g. no fall does not imply no
      // temptation), so only their explicit exempt answer checks the antecedent.
      const eventDidNotOccur = condition.accepted.includes(antecedent.selected);
      const reportsNoEvent = condition.optionIndex === answer.selected;
      if (eventDidNotOccur !== reportsNoEvent) {
        return { ...check, status: "unknown", reason: "contradictoryAnswer" };
      }
    }

    if ((rule.exempt || []).includes(answer.selected)) {
      if (condition && condition.optionIndex === answer.selected) {
        return { ...check, status: "notTriggered", reason: "conditionalRequirementNotTriggered" };
      }
      return { ...check, status: "notTriggered", reason: "exemptOption" };
    }
    return rule.accepted.includes(answer.selected)
      ? { ...check, status: "met" }
      : { ...check, status: "notMet", reason: "criterionNotMet" };
  }

  function summarizeChecks(checks) {
    const counts = { totalCount: checks.length, metCount: 0, notMetCount: 0, unknownCount: 0, notTriggeredCount: 0 };
    for (const check of checks) counts[`${check.status}Count`] += 1;
    return {
      ...counts,
      status: counts.notMetCount > 0 ? "notSupported"
        : counts.unknownCount > 0 || checks.length === 0 ? "incomplete" : "supported"
    };
  }

  // This is a conjunction of explicitly configured practical requirements, not
  // an average, probability, spiritual diagnosis or test of mystical graces.
  // Higher candidates inherit each item's most recent positive minimum. They
  // also require every earlier candidate, guarding against accidentally relaxed
  // later rules. Actual-event follow-ups need a confirmed, matching antecedent;
  // other exemptions require only their configured one-way prerequisite.
  // No unanswered, uncertain or contradictory answer can pass.
  function evaluate(assessment, suppliedAnswers = {}) {
    const questions = validateAssessment(assessment);
    const answers = suppliedAnswers && typeof suppliedAnswers === "object" ? suppliedAnswers : {};
    const stageChecks = [];
    let stage = null;

    for (let candidate = 1; candidate <= assessment.highestAssessedStage; candidate += 1) {
      const checks = [];
      for (const question of questions.values()) {
        let ruleStage = candidate;
        while (ruleStage > 0 && !hasOwn(question.requirements, ruleStage)) ruleStage -= 1;
        if (ruleStage === 0) continue;
        checks.push(checkRequirement(question, question.requirements[ruleStage], ruleStage, answers, questions));
      }
      const summary = summarizeChecks(checks);
      const prior = stageChecks.at(-1);
      const status = summary.status === "notSupported" || prior?.status === "notSupported" ? "notSupported"
        : summary.status === "incomplete" || prior?.status === "incomplete" ? "incomplete" : "supported";
      stageChecks.push({ stage: candidate, checks, ...summary, criterionStatus: summary.status, status });
      if (status === "supported") stage = candidate;
    }

    const target = stageChecks.find((candidate) => candidate.status !== "supported") || stageChecks.at(-1);
    const relevantDomains = new Set(target.checks.map((check) => check.domain));
    const domainOrder = [...new Set([...(assessment.domainOrder || []), ...relevantDomains])];
    const domainChecks = domainOrder.filter((domain) => relevantDomains.has(domain)).map((domain) => {
      const checks = target.checks.filter((check) => check.domain === domain);
      return { domain, checks, ...summarizeChecks(checks) };
    });
    let answeredCount = 0;
    let skippedCount = 0;
    let missingCount = 0;
    let invalidAnswerCount = 0;
    let unknownAnswerCount = 0;
    for (const question of questions.values()) {
      const answer = answerState(question, answers);
      if (answer.reason === "skipped") skippedCount += 1;
      else if (answer.reason === "unanswered") missingCount += 1;
      else if (answer.reason === "invalidAnswer") invalidAnswerCount += 1;
      else {
        answeredCount += 1;
        if (answer.reason === "uncertain") unknownAnswerCount += 1;
      }
    }
    return {
      stage,
      targetStage: target.stage,
      stageChecks,
      domainChecks,
      targetChecks: target.checks,
      totals: summarizeChecks(target.checks),
      totalCount: questions.size,
      answeredCount,
      skippedCount,
      missingCount,
      invalidAnswerCount,
      unknownAnswerCount,
      completedCount: answeredCount + skippedCount,
      unansweredCount: missingCount + invalidAnswerCount
    };
  }

  window.spiritualAssessmentEngine = Object.freeze({ evaluate });
})();
