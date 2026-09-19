(() => {
  "use strict";

  const questionnaireVersion = 3;
  const domainOrder = [
    "seriousSin",
    "venialSin",
    "imperfections",
    "suffering",
    "prayer",
    "examen",
    "sacraments"
  ];

  // Section names in stages-of-spiritual-progress.md; these are not score thresholds.
  const questionBlueprints = [
    { id: "prayer-planned-meditation", domain: "prayer", reverse: false, sources: ["II. Prayer","III. Prayer"] },
    { id: "suffering-endure-peace", domain: "suffering", reverse: false, sources: ["III. Suffering","IV. Suffering"] },
    { id: "venial-dismiss", domain: "venialSin", reverse: true, sources: ["I. Venial Sin"] },
    { id: "sacraments-sunday-mass", domain: "sacraments", reverse: false, sources: ["II. Sacraments","III. Sacraments","IV. Sacraments"] },
    { id: "imperfections-excuse-attachment", domain: "imperfections", reverse: true, sources: ["III. Imperfections"] },
    { id: "examen-daily", domain: "examen", reverse: false, sources: ["I. Examen","II. Examen","III. Examen"] },
    { id: "mortal-avoid-occasions", domain: "seriousSin", reverse: false, sources: ["I. Mortal Sin","II. Mortal Sin"] },
    { id: "prayer-abandon-dryness", domain: "prayer", reverse: true, sources: ["II. Prayer","III. Prayer"] },
    { id: "suffering-complaining", domain: "suffering", reverse: true, sources: ["II. Suffering"] },
    { id: "venial-resist", domain: "venialSin", reverse: false, sources: ["III. Venial Sin","IV. Venial Sin"] },
    { id: "sacraments-regular-confession", domain: "sacraments", reverse: false, sources: ["II. Sacraments","III. Sacraments","IV. Sacraments"] },
    { id: "imperfections-renounce", domain: "imperfections", reverse: false, sources: ["III. Imperfections","IV. Imperfections","V. Prayer"] },
    { id: "examen-sporadic", domain: "examen", reverse: true, sources: ["I. Examen","II. Examen","III. Examen"] },
    { id: "mortal-weak-resistance", domain: "seriousSin", reverse: true, sources: ["I. Mortal Sin","II. Mortal Sin"] },
    { id: "prayer-during-work", domain: "prayer", reverse: false, sources: ["V. Prayer"] },
    { id: "suffering-for-others", domain: "suffering", reverse: false, sources: ["V. Suffering","VI. Suffering"] },
    { id: "venial-reparation", domain: "venialSin", reverse: false, sources: ["III. Venial Sin","IV. Venial Sin"] },
    { id: "sacraments-weekday-dismissal", domain: "sacraments", reverse: true, sources: ["III. Sacraments","IV. Sacraments"] },
    { id: "imperfections-practice-virtue", domain: "imperfections", reverse: false, sources: ["IV. Imperfections"] },
    { id: "examen-particular-focus", domain: "examen", reverse: false, sources: ["III. Venial Sin","IV. Imperfections"] },
    { id: "mortal-repentance-reparation", domain: "seriousSin", reverse: false, sources: ["I. Mortal Sin","II. Mortal Sin","III. Mortal Sin"] },
    { id: "prayer-temporal-needs", domain: "prayer", reverse: true, sources: ["I. Prayer"] },
    { id: "suffering-avoidance", domain: "suffering", reverse: true, sources: ["I. Suffering","III. Suffering"] },
    { id: "venial-deliberate-consent", domain: "venialSin", reverse: true, sources: ["II. Venial Sin","III. Venial Sin","IV. Venial Sin"] },
    { id: "sacraments-dismiss-devotional-confession", domain: "sacraments", reverse: true, sources: ["III. Sacraments","IV. Sacraments"] },
    { id: "imperfections-continue-attachment", domain: "imperfections", reverse: true, sources: ["III. Imperfections","IV. Imperfections","V. Imperfections","VI. Imperfections"] },
    { id: "examen-without-method", domain: "examen", reverse: true, sources: ["II. Venial Sin"] },
    { id: "mortal-deliberate-fall", domain: "seriousSin", reverse: true, sources: ["I. Mortal Sin","II. Mortal Sin","III. Mortal Sin"] }
  ];

  window.spiritualAssessment = Object.freeze({ questionnaireVersion, domainOrder, questionBlueprints });
})();
