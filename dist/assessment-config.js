(() => {
  "use strict";

  const domainOrder = [
    "seriousSin",
    "venialSin",
    "imperfections",
    "suffering",
    "prayer",
    "examen",
    "sacraments"
  ];

  const questionBlueprints = [
    { id: "prayer-kept-time", domain: "prayer", reverse: false },
    { id: "suffering-regain-peace", domain: "suffering", reverse: false },
    { id: "venial-postpone-small", domain: "venialSin", reverse: true },
    { id: "sacraments-weekly-priority", domain: "sacraments", reverse: false },
    { id: "imperfections-explain-away", domain: "imperfections", reverse: true },
    { id: "examen-regular-pause", domain: "examen", reverse: false },
    { id: "serious-change-situation", domain: "seriousSin", reverse: false },
    { id: "prayer-dryness", domain: "prayer", reverse: true },
    { id: "suffering-inner-argument", domain: "suffering", reverse: true },
    { id: "venial-notice-small", domain: "venialSin", reverse: false },
    { id: "sacraments-confession-rhythm", domain: "sacraments", reverse: false },
    { id: "imperfections-work-on-habit", domain: "imperfections", reverse: false },
    { id: "examen-only-after-failure", domain: "examen", reverse: true },
    { id: "serious-stay-near-trigger", domain: "seriousSin", reverse: true },
    { id: "prayer-through-day", domain: "prayer", reverse: false },
    { id: "suffering-offer-for-others", domain: "suffering", reverse: false },
    { id: "venial-specific-repair", domain: "venialSin", reverse: false },
    { id: "sacraments-dismiss-opportunity", domain: "sacraments", reverse: true },
    { id: "imperfections-practice-virtue", domain: "imperfections", reverse: false },
    { id: "examen-next-intention", domain: "examen", reverse: false },
    { id: "serious-concrete-response", domain: "seriousSin", reverse: false },
    { id: "prayer-list-of-needs", domain: "prayer", reverse: true },
    { id: "suffering-avoid-sacrifice", domain: "suffering", reverse: true },
    { id: "venial-isolated-events", domain: "venialSin", reverse: true },
    { id: "sacraments-no-follow-through", domain: "sacraments", reverse: true },
    { id: "imperfections-notice-afterward", domain: "imperfections", reverse: true },
    { id: "examen-no-pattern", domain: "examen", reverse: true },
    { id: "serious-return-to-setup", domain: "seriousSin", reverse: true }
  ];

  window.spiritualAssessment = Object.freeze({ domainOrder, questionBlueprints });
})();

