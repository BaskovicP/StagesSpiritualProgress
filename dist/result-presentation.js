(() => {
  "use strict";

  const statuses = Object.freeze(["met", "notMet", "unknown", "notTriggered"]);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
  const stageBlockSymbols = Object.freeze({ supported: "✓", notSupported: "", incomplete: "?", notTriggered: "∕", notAssessed: "—" });

  // Use each domain's evaluated thresholds, not the overall level or a filled
  // 1..stageTo range: some domains have no lower rules or stop before VI.
  function describeStageBlocks(profile) {
    return Array.from({ length: 7 }, (_, index) => {
      const stage = index + 1;
      const evaluated = profile.stages.find(item => item.stage === stage);
      const status = stage === 7 || stage > profile.sourceCeiling || !evaluated
        ? "notAssessed" : Object.hasOwn(stageBlockSymbols, evaluated.status) ? evaluated.status : "incomplete";
      return { stage, status };
    });
  }

  function renderStageBlocks(profile, copy) {
    const blocks = describeStageBlocks(profile);
    const labels = copy.stageBlocks;
    const roman = ["I", "II", "III", "IV", "V", "VI", "VII"];
    const square = status => `<span class="stage-block-square stage-block-${status}" aria-hidden="true">${stageBlockSymbols[status]}</span>`;
    return `<div class="domain-stage-blocks" data-stage-blocks="${escapeHtml(profile.domain)}">
      <p class="stage-blocks-heading">${escapeHtml(labels.heading)}</p>
      <ol class="stage-blocks-track" role="list" aria-label="${escapeHtml(`${copy.domains[profile.domain]}: ${labels.heading}`)}">
        ${blocks.map(({stage, status}) => {
          const label = format(labels.stageLabel, {stage:roman[stage - 1], name:copy.stages[stage - 1].name, status:labels.statuses[status]});
          return `<li class="stage-block-item" data-stage="${stage}" data-stage-status="${status}"><span class="sr-only">${escapeHtml(label)}</span>${square(status)}<span class="stage-block-numeral" aria-hidden="true">${roman[stage - 1]}</span></li>`;
        }).join("")}
      </ol>
      <ul class="stage-blocks-legend" role="list" aria-label="${escapeHtml(labels.legend)}">${Object.keys(stageBlockSymbols).filter(status => blocks.some(block => block.status === status)).map(status => `<li>${square(status)}<span>${escapeHtml(labels.statuses[status])}</span></li>`).join("")}</ul>
      <p class="stage-blocks-note">${escapeHtml(labels.sourceNote)}</p>
    </div>`;
  }

  function countChecks(checks) {
    const counts = { met: 0, notMet: 0, unknown: 0, notTriggered: 0, total: checks.length };
    checks.forEach((check) => { counts[statuses.includes(check.status) ? check.status : "unknown"] += 1; });
    return counts;
  }

  function statusIcon(status) {
    const paths = {
      met: '<path d="m6.5 12 3.5 3.5 7.5-7.5"/>',
      notMet: '<path d="m8.5 8.5 7 7m0-7-7 7"/>',
      unknown: '<path d="M9.5 9a2.5 2.5 0 0 1 5 .4c0 1.8-2.5 1.9-2.5 3.6"/><path d="M12 16h.01"/>',
      notTriggered: '<path d="M8 12h8"/>'
    };
    return `<svg class="status-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/>${paths[status] || paths.unknown}</svg>`;
  }

  function renderCounts(checks, copy) {
    const counts = countChecks(checks);
    return `<span class="criteria-visual-counts">${statuses.filter((status) => counts[status] > 0).map((status) =>
      `<span class="status-chip status-chip-${status}">${statusIcon(status)}<span class="status-chip-label">${escapeHtml(copy.criteriaVisual.labels[status])}</span><span class="status-chip-count">${counts[status]}</span></span>`
    ).join("")}</span>`;
  }

  function renderGrowth(growth, copy) {
    if (!growth) return "";
    const roman = number => ["I", "II", "III", "IV", "V", "VI"][number - 1];
    const heading = growth.items.length
      ? format(copy.growth.heading, {stage:roman(growth.targetStage)}) : copy.growth.maintainTitle;
    const item = entry => `<div class="growth-item" data-growth-id="${escapeHtml(entry.id)}">
      <p class="growth-expectation">${escapeHtml(entry.status === "unknown" ? copy.growth.unknownTitle : entry.expectation)}</p>
      <p>${escapeHtml(entry.action)}</p>
      <button type="button" class="text-button growth-review" data-growth-question="${entry.index}">${escapeHtml(copy.growth.review)}</button>
    </div>`;
    return `<section class="domain-growth" aria-label="${escapeHtml(heading)}">
      <h4><span aria-hidden="true">↗</span> ${escapeHtml(heading)}</h4>
      ${growth.items.length ? item(growth.items[0]) : `<p>${escapeHtml(growth.maintenance)}</p>`}
      ${growth.items.length > 1 ? `<details class="growth-more"><summary>${escapeHtml(format(copy.growth.more, {count:growth.items.length - 1}))}</summary>${growth.items.slice(1).map(item).join("")}</details>` : ""}
    </section>`;
  }

  function renderDomain(domain, checks, copy, profile = null, growth = null, gradation = null) {
    if (!checks.length) return "";
    const counts = countChecks(checks);
    const summary = counts.notTriggered === counts.total
      ? copy.criteriaVisual.noneApplicable
      : format(copy.criteriaVisual.supportedCount, counts);
    const roman = number => ["I", "II", "III", "IV", "V", "VI"][number - 1];
    let level = "";
    if (profile) {
      const hasStage = profile.stageTo !== null;
      const isRange = hasStage && profile.stageFrom !== profile.stageTo;
      const title = hasStage
        ? isRange ? format(copy.domainLevels.range, {from:roman(profile.stageFrom),to:roman(profile.stageTo)})
          : `${roman(profile.stageTo)}. ${copy.stages[profile.stageTo - 1].name}`
        : copy.domainLevels.notEstablished;
      const note = isRange ? copy.domainLevels.sameCriteria : hasStage ? ""
        : format(copy.domainLevels.noMatch, {stage:roman(profile.firstAssessedStage)});
      level = `<div class="domain-level" data-domain-level="${hasStage ? `${profile.stageFrom}-${profile.stageTo}` : "unresolved"}">
        <p class="domain-level-label">${escapeHtml(copy.domainLevels.label)}</p>
        <p class="domain-level-title">${escapeHtml(title)}</p>
        ${renderStageBlocks(profile, copy)}
        ${note ? `<p class="domain-level-note">${escapeHtml(note)}</p>` : ""}
      </div>`;
    }
    return `<div class="domain-row criteria-visual-domain">
      <div class="domain-row-head"><strong>${escapeHtml(copy.domains[domain])}</strong></div>
      ${level}
      ${gradation && window.spiritualGradation ? window.spiritualGradation.render(gradation, copy) : ""}
      ${profile ? `<p class="domain-target-label">${escapeHtml(format(copy.domainLevels.checking, {stage:roman(profile.targetStage)}))}</p>` : ""}
      <p class="domain-supported-count">${escapeHtml(summary)}</p>
      ${renderCounts(checks, copy)}
      ${renderGrowth(growth, copy)}
      <button class="domain-review-button" type="button" data-review-domain="${escapeHtml(domain)}" aria-label="${escapeHtml(`${copy.criteriaVisual.reviewDomain}: ${copy.domains[domain]}`)}">${escapeHtml(copy.criteriaVisual.reviewDomain)}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14m-5-5 5 5-5 5"/></svg></button>
    </div>`;
  }

  function renderLegend(copy) {
    return `<details class="criteria-visual-legend">
      <summary>${statusIcon("unknown")}<span>${escapeHtml(copy.criteriaVisual.legendTitle)}</span></summary>
      <p>${escapeHtml(copy.criteriaVisual.legendIntro)}</p>
      <ul>${statuses.map((status) => `<li><span class="status-legend-symbol status-chip-${status}">${statusIcon(status)}</span><div><strong>${escapeHtml(copy.criteriaVisual.labels[status])}</strong><p>${escapeHtml(copy.criteriaVisual.descriptions[status])}</p></div></li>`).join("")}</ul>
    </details>`;
  }

  window.spiritualResultPresentation = Object.freeze({ renderLegend, renderDomain, renderCounts, statusIcon, describeStageBlocks, renderStageBlocks });
})();
