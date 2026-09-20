(() => {
  "use strict";

  // Explicit editorial associations. No inference from words, answers or scores.
  const questionTerms = Object.freeze({
  "mortal-occasions-v4": [
    "occasions",
    "mortalSin",
    "consent"
  ],
  "mortal-pattern-v6": [
    "mortalSin",
    "occasions",
    "consent"
  ],
  "mortal-fall-v4": [
    "consent",
    "mortalSin"
  ],
  "mortal-response-v4": [
    "contrition",
    "confession",
    "reparation",
    "mortalSin"
  ],
  "venial-occurrence-v4": [
    "venialSin",
    "consent",
    "impulse"
  ],
  "venial-pattern-v6": [
    "venialSin",
    "contrition",
    "reparation"
  ],
  "venial-regret-v4": [
    "contrition",
    "venialSin"
  ],
  "venial-reparation-v4": [
    "reparation",
    "contrition",
    "venialSin"
  ],
  "imperfections-pattern-v6": [
    "imperfections",
    "impulse",
    "detachment"
  ],
  "imperfections-virtue-v4": [
    "virtue",
    "imperfections"
  ],
  "imperfections-renunciation-v4": [
    "detachment",
    "imperfections",
    "sacrifice"
  ],
  "imperfections-prompt-regret-v4": [
    "contrition",
    "imperfections",
    "impulse"
  ],
  "suffering-endure-v4": [
    "acceptance",
    "sacrifice",
    "peace"
  ],
  "suffering-pattern-v6": [
    "acceptance",
    "peace",
    "sacrifice"
  ],
  "suffering-meaning-joy-v4": [
    "peace",
    "acceptance"
  ],
  "prayer-pattern-v6": [
    "mentalPrayer",
    "vocalPrayer",
    "meditation",
    "dryness",
    "recollection",
    "contemplation"
  ],
  "prayer-meditation-v4": [
    "meditation",
    "mentalPrayer",
    "vocalPrayer"
  ],
  "prayer-dryness-v4": [
    "dryness",
    "mentalPrayer"
  ],
  "prayer-prolong-v4": [
    "mentalPrayer",
    "recollection"
  ],
  "prayer-loving-response-v4": [
    "affectivePrayer",
    "meditation",
    "contemplation"
  ],
  "examen-pattern-v6": [
    "examen",
    "particularExamen",
    "virtue"
  ],
  "examen-method-v4": [
    "examen",
    "contrition"
  ],
  "examen-particular-v4": [
    "particularExamen",
    "examen",
    "virtue",
    "venialSin"
  ],
  "sacraments-weekly-mass-v4": [
    "mass"
  ],
  "sacraments-daily-mass-v4": [
    "mass",
    "fervor"
  ],
  "sacraments-confession-schedule-v4": [
    "confession",
    "examen"
  ],
  "sacraments-devotional-confession-v4": [
    "devotionalConfession",
    "confession",
    "imperfections",
    "venialSin"
  ],
  "sacraments-pattern-v6": [
    "mass",
    "confession",
    "devotionalConfession",
    "fervor"
  ],
  "imperfections-consent-v5": [
    "impulse",
    "imperfections",
    "consent"
  ],
  "imperfections-loving-care-v5": [
    "imperfections",
    "virtue",
    "detachment"
  ],
  "suffering-joyful-acceptance-v5": [
    "peace",
    "acceptance"
  ],
  "suffering-service-v5": [
    "sacrifice",
    "acceptance",
    "detachment"
  ],
  "prayer-daily-life-v5": [
    "recollection",
    "mentalPrayer"
  ],
  "prayer-detachment-v5": [
    "detachment",
    "sacrifice"
  ],
  "prayer-desire-v5": [
    "hope",
    "mass",
    "fervor"
  ],
  "prayer-self-forgetfulness-v5": [
    "selfForgetfulness",
    "impulse",
    "contemplation"
  ]
});
  Object.values(questionTerms).forEach(Object.freeze);
  const contextTermIds = Object.freeze([
    "piety",
    "prayerSimplicity",
    "infusedPrayer",
    "passivePurification",
    "mysticism"
  ]);
  const safetyTermIds = Object.freeze(["scrupulosity"]);
  const sources = Object.freeze({
  "sin": {
    "label": "CCC 1854–1863",
    "url": "https://www.vatican.va/archive/ENG0015/__P6C.HTM"
  },
  "freedom": {
    "label": "CCC 1730–1735",
    "url": "https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_3/i_freedom_and_responsibility.html"
  },
  "occasions": {
    "label": "Catholic Encyclopedia: Occasions of Sin",
    "url": "https://www.newadvent.org/cathen/11196a.htm"
  },
  "penitent": {
    "label": "CCC 1451–1460",
    "url": "https://www.vatican.va/content/catechism/en/part_two/section_two/chapter_two/article_4/vii_the_acts_of_the_penitent.html"
  },
  "virtue": {
    "label": "CCC 1803",
    "url": "https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_7.html"
  },
  "vocal": {
    "label": "CCC 2700–2704",
    "url": "https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_1/expressions_of_prayer.html"
  },
  "meditation": {
    "label": "CCC 2705–2708",
    "url": "https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_1/ii_meditation.html"
  },
  "contemplation": {
    "label": "CCC 2709–2719",
    "url": "https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_1/iii_contemplative_prayer.html"
  },
  "dryness": {
    "label": "CCC 2729–2731",
    "url": "https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_2/ii_humble_vigilance_of_heart.html"
  },
  "examen": {
    "label": "Loyola Press: The Daily Examen",
    "url": "https://www.ignatianspirituality.com/ignatian-prayer/the-examen/"
  },
  "eucharist": {
    "label": "Compendium: Eucharist (§§ 271–294)",
    "url": "https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html"
  },
  "heaven": {
    "label": "CCC 1024–1029",
    "url": "https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_three/article_12/ii_heaven.html"
  },
  "stages": {
    "label": "stages-of-spiritual-progress.md (I–VI)"
  },
  "ways": {
    "label": "three-ways.md"
  }
});
  Object.values(sources).forEach(Object.freeze);

  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  function describe(language, questionId) {
    const copy = window.spiritualTerminologyCopy[language] || window.spiritualTerminologyCopy.en;
    return {
      labels: copy.labels,
      terms: (questionTerms[questionId] || []).map(id => ({
        id, ...copy.terms[id],
        sources: copy.terms[id].sources.map(key => ({id: key, ...sources[key]}))
      }))
    };
  }

  function describeAll(language) {
    const copy = window.spiritualTerminologyCopy[language] || window.spiritualTerminologyCopy.en;
    const usage = {};
    Object.entries(questionTerms).forEach(([questionId, termIds], index) => {
      termIds.forEach(id => {
        usage[id] = usage[id] || [];
        usage[id].push({questionId, questionNumber: index + 1});
      });
    });
    const enrich = (id, category) => ({
      id,
      category,
      ...copy.terms[id],
      questionUses: usage[id] || [],
      sources: copy.terms[id].sources.map(key => ({id: key, ...sources[key]}))
    });
    const coreIds = Object.keys(copy.terms).filter(id => !contextTermIds.includes(id) && !safetyTermIds.includes(id));
    return {
      labels: copy.labels,
      groups: {
        core: coreIds.map(id => enrich(id, "core")),
        context: contextTermIds.map(id => enrich(id, "context")),
        safety: safetyTermIds.map(id => enrich(id, "safety"))
      }
    };
  }

  function sourceLinks(term) {
    return term.sources.map(source => {
      // All URLs come from the reviewed bibliography, never from user answers.
      return source.url && /^https:\/\//.test(source.url)
        ? `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a>`
        : `<span>${escapeHtml(source.label)}</span>`;
    }).join(" · ");
  }

  function explanation(term, labels) {
    return `<p class="term-meaning">${escapeHtml(term.meaning)}</p>
      <p class="term-distinction"><strong>${escapeHtml(labels.distinction)}:</strong> ${escapeHtml(term.distinction)}</p>`;
  }

  function exampleAndSources(term, labels) {
    return `<p class="term-example"><strong>${escapeHtml(labels.example)}:</strong> ${escapeHtml(term.example)}</p>
      <p class="term-sources"><span>${escapeHtml(labels.sources)}:</span> ${sourceLinks(term)}</p>`;
  }

  function render(language, questionId) {
    const {labels, terms} = describe(language, questionId);
    if (!terms.length) return "";
    const [primary, ...related] = terms;
    const relatedHtml = related.length
      ? `<details class="term-related-group"><summary>${escapeHtml(labels.related)} (${related.length})</summary>
          <div class="term-related-list">${related.map(term => `<details class="term-related" data-term-id="${escapeHtml(term.id)}">
            <summary>${escapeHtml(term.title)}</summary>
            <div class="term-body">${explanation(term, labels)}${exampleAndSources(term, labels)}</div>
          </details>`).join("")}</div>
        </details>`
      : "";
    return `<article class="term-primary" data-term-id="${escapeHtml(primary.id)}">
        <h4>${escapeHtml(primary.title)}</h4>
        ${explanation(primary, labels)}
        <details class="term-extra"><summary>${escapeHtml(labels.more)}</summary>
          ${exampleAndSources(primary, labels)}
        </details>
      </article>${relatedHtml}`;
  }

  window.spiritualTerminology = Object.freeze({describe, describeAll, render, questionTerms, contextTermIds, safetyTermIds, sources});
})();
