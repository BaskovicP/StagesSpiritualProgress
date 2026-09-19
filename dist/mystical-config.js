// Optional self-reports for discernment. Deliberately no stage, score, weight,
// requirement or probability: these answers never enter the assessment engine.
window.spiritualMysticalReflection = Object.freeze({
  version: 1,
  questions: [
    { id: "contemplation", options: ["yes", "unsure", "no", "skip"] },
    { id: "purification", options: ["yes", "unsure", "no", "skip"] },
    { id: "phenomena", options: ["yes", "unsure", "no", "skip"] },
    { id: "union", options: ["yes", "unsure", "no", "skip"] },
    { id: "fruits", options: ["lasting", "mixed", "none", "unsure", "notApplicable", "skip"] },
    { id: "discernment", options: ["ongoing", "discussed", "notYet", "notApplicable", "skip"] }
  ]
});
