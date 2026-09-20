(() => {
  "use strict";

  const unresolved = check => ["notMet", "unknown"].includes(check.status);
  const roman = number => ["I", "II", "III", "IV", "V", "VI"][number - 1];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));

  // This is a view of the ENGINE'S NEXT OVERALL threshold, not each area's
  // independent next level. It never supplies new rules, points or diagnoses.
  function describe(assessment, result, questions, copy, language) {
    if (result.stage === assessment.highestAssessedStage) {
      return {ceiling: true, initial: false, targetStage: null, areas: [], supported: [], exempt: [], notAssessed: []};
    }
    const targetStage = result.targetStage;
    const areas = [], supported = [], exempt = [], notAssessed = [];
    for (const domain of assessment.domainOrder) {
      const checks = result.targetChecks.filter(check => check.domain === domain);
      const pending = checks.filter(unresolved);
      if (!checks.length) {
        notAssessed.push(domain);
      } else if (pending.length) {
        const guidance = window.spiritualGrowthGuidance.describe({domain, targetStage, targetChecks: checks}, questions, copy, language);
        const hasPractice = pending.some(check => check.status === "notMet");
        const hasUnknown = pending.some(check => check.status === "unknown");
        areas.push({
          domain,
          kind: hasPractice && hasUnknown ? "mixed" : hasPractice ? "practice" : "clarify",
          items: guidance.items.map(item => {
            const question = questions[item.index];
            const check = pending.find(entry => entry.id === item.id);
            return {...item, question: question.title,
              selected: Number.isInteger(check.selected) ? question.options[check.selected] ?? copy.notAnswered
                : check.selected === "skip" ? copy.preferNot : copy.notAnswered};
          })
        });
      } else if (checks.every(check => check.status === "notTriggered")) {
        exempt.push(domain);
      } else {
        supported.push(domain);
      }
    }
    return {ceiling: false, initial: result.stage === null, targetStage, areas, supported, exempt, notAssessed};
  }

  function render(model, copy) {
    const text = copy.nextStageSummary;
    if (model.ceiling) {
      return `<div class="next-stage-header"><p class="eyebrow">${escapeHtml(text.eyebrow)}</p>
        <h3 id="next-stage-heading" tabindex="-1">${escapeHtml(text.ceilingTitle)}</h3></div>
        <p class="next-stage-intro">${escapeHtml(text.ceilingBody)}</p>`;
    }
    const stage = roman(model.targetStage);
    const icon = status => window.spiritualResultPresentation.statusIcon(status);
    const item = entry => `<div class="next-stage-item" data-next-item="${escapeHtml(entry.id)}" data-next-status="${escapeHtml(entry.status)}">
        <p class="next-stage-item-status ${entry.status === "unknown" ? "next-stage-clarify" : "next-stage-practice"}">${icon(entry.status)}${escapeHtml(entry.status === "unknown" ? text.clarify : text.practice)}</p>
        <p class="next-stage-expectation"><span>${escapeHtml(text.expectation)}</span><strong>${escapeHtml(entry.expectation)}</strong></p>
        <p class="next-stage-answer"><span>${escapeHtml(text.answer)}:</span> ${escapeHtml(entry.selected)}</p>
        <p class="next-stage-action"><strong>${escapeHtml(entry.status === "unknown" ? copy.growth.unknownTitle : copy.growth.practiceLabel)}:</strong> ${escapeHtml(entry.action)}</p>
        <button type="button" class="text-button next-stage-review" data-next-question="${entry.index}" aria-label="${escapeHtml(format(text.reviewLabel, {question:entry.question}))}">${escapeHtml(text.review)} <span aria-hidden="true">→</span></button>
      </div>`;
    const settled = [
      ["supported", model.supported, "met"],
      ["exempt", model.exempt, "notTriggered"],
      ["notAssessed", model.notAssessed, "notTriggered"]
    ].filter(([, domains]) => domains.length);
    return `<div class="next-stage-header">
        <p class="eyebrow">${escapeHtml(text.eyebrow)}</p>
        <h3 id="next-stage-heading" tabindex="-1">${escapeHtml(model.initial ? text.initialTitle : format(text.title,{stage}))}</h3>
        <p class="next-stage-target">${escapeHtml(stage)}. ${escapeHtml(copy.stages[model.targetStage - 1].name)}</p>
      </div>
      <p class="next-stage-intro">${escapeHtml(model.initial ? text.initialIntro : text.intro)}</p>
      <p class="next-stage-count">${escapeHtml(format(text.count,{count:model.areas.length}))}</p>
      <div class="next-stage-grid">${model.areas.map(area => `<article class="next-stage-area" data-next-domain="${escapeHtml(area.domain)}">
        <h4>${escapeHtml(copy.domains[area.domain])}</h4>
        ${area.kind === "mixed" ? `<p class="next-stage-kind">${escapeHtml(text.mixed)}</p>` : ""}
        ${item(area.items[0])}
        ${area.items.length > 1 ? `<details class="next-stage-more"><summary>${escapeHtml(format(text.more,{count:area.items.length - 1}))}</summary>${area.items.slice(1).map(item).join("")}</details>` : ""}
      </article>`).join("")}</div>
      ${settled.length ? `<details class="next-stage-settled"><summary>${escapeHtml(text.settled)}</summary>
        ${settled.map(([key, domains, status]) => `<div class="next-stage-settled-group" data-next-settled="${key}">
          <p>${icon(status)}<strong>${escapeHtml(text[key])}</strong></p>
          <ul>${domains.map(domain => `<li>${escapeHtml(copy.domains[domain])}</li>`).join("")}</ul>
        </div>`).join("")}<p class="next-stage-footnote">${escapeHtml(text.settledNote)}</p></details>` : ""}
      <p class="next-stage-footnote">${escapeHtml(text.caution)}</p>
      ${model.targetStage >= 5 ? `<p class="next-stage-footnote">${escapeHtml(text.advanced)}</p>` : ""}
      <button type="button" class="secondary-button next-stage-details" data-next-criteria="${model.targetStage}">${escapeHtml(format(text.details,{stage}))}</button>`;
  }

  window.spiritualNextStage = Object.freeze({describe, render});
})();
