(() => {
  "use strict";

  const statuses = Object.freeze(["met", "notMet", "unknown", "notTriggered"]);
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));

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

  function renderDomain(domain, checks, copy, profile = null, growth = null) {
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
        ${note ? `<p class="domain-level-note">${escapeHtml(note)}</p>` : ""}
      </div><p class="domain-target-label">${escapeHtml(format(copy.domainLevels.checking, {stage:roman(profile.targetStage)}))}</p>`;
    }
    return `<div class="domain-row criteria-visual-domain">
      <div class="domain-row-head"><strong>${escapeHtml(copy.domains[domain])}</strong></div>
      ${level}
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

  window.spiritualResultPresentation = Object.freeze({ renderLegend, renderDomain, renderCounts, statusIcon });
})();
