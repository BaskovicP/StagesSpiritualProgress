(() => {
  "use strict";

  // Overview choices illustrate the source; only the assessment engine awards
  // practical matches after checking all independent requirements.
  const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
  const roman = number => ["I", "II", "III", "IV", "V", "VI"][number - 1];

  function describe(config, answers, profile, questions) {
    const index = config.questionBlueprints.findIndex(q => q.domain === profile.domain && q.gradation);
    if (index < 0) return null;
    const blueprint = config.questionBlueprints[index];
    const question = questions[index];
    const selected = answers[blueprint.id];
    const selectedStep = blueprint.gradation.find(step => step.option === selected);
    const steps = blueprint.gradation.map(step => ({
      ...step,
      label: question.optionHeadings[step.option],
      description: question.options[step.option],
      selected: step === selectedStep,
      supported: profile.stageTo !== null && profile.stageTo >= step.from && profile.stageTo <= step.to
    }));
    return {
      domain: profile.domain, index, steps,
      missing: selected === undefined || selected === null || selected === "skip",
      unmapped: !selectedStep,
      mismatch: Boolean(selectedStep && (profile.stageTo === null || profile.stageTo < selectedStep.from || profile.stageTo > selectedStep.to)),
      ceiling: config.domainStageLimits[profile.domain]
    };
  }

  function render(model, copy) {
    if (!model) return "";
    const labels = copy.gradation;
    const notes = [];
    if (model.domain === "imperfections") notes.push(labels.imperfections);
    if (model.ceiling < 6) notes.push(labels.limit.replace("{stage}", roman(model.ceiling)));
    else notes.push(labels.advanced);
    if (model.missing) notes.push(labels.missing);
    else if (model.unmapped) notes.push(labels.unmapped);
    if (model.mismatch) notes.push(labels.different);
    return `<section class="gradation" aria-label="${escapeHtml(labels.title)}" data-gradation-domain="${escapeHtml(model.domain)}">
      <h4>${escapeHtml(labels.title)}</h4>
      <ol class="gradation-steps">
        ${model.steps.map(step => `<li class="gradation-step${step.supported ? " is-supported" : ""}${step.selected ? " is-selected" : ""}" data-gradation-stage="${step.from}-${step.to}">
          <span class="gradation-number" aria-hidden="true">${roman(step.from)}${step.to !== step.from ? "–" + roman(step.to) : ""}</span>
          <div class="gradation-step-body">
            <details><summary><span class="sr-only">${roman(step.from)}${step.to !== step.from ? "–" + roman(step.to) : ""}. </span>${escapeHtml(step.label)}<span class="gradation-expand" aria-hidden="true"></span></summary><p>${escapeHtml(step.description)}</p></details>
            ${step.selected ? `<span class="gradation-badge selected"><span aria-hidden="true">◇</span> ${escapeHtml(labels.selected)}</span>` : ""}
            ${step.supported ? `<span class="gradation-badge supported"><span aria-hidden="true">●</span> ${escapeHtml(labels.supported)}</span>` : ""}
          </div>
        </li>`).join("")}
      </ol>
      ${notes.map(note => `<p class="gradation-note">${escapeHtml(note)}</p>`).join("")}
      <button type="button" class="text-button growth-review" data-growth-question="${model.index}">${escapeHtml(labels.review)}</button>
    </section>`;
  }

  window.spiritualGradation = Object.freeze({ describe, render });
})();
