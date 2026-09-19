(() => {
  "use strict";

  window.spiritualLocales = window.spiritualLocales || {};
  window.spiritualLocales.en = Object.freeze({
  "metaTitle": "Spiritual Progress Reflection",
  "metaDescription": "A private, browser-based reflection on the stages of spiritual progress.",
  "brandName": "ASCENT",
  "brandHomeLabel": "Spiritual Progress Reflection home",
  "questionnaireSummaryLabel": "Questionnaire summary",
  "privacyPill": "Saved only in this tab",
  "languageLabel": "Language",
  "eyebrow": "A private reflection",
  "introTitle": "Where are you on the path?",
  "introLede": "Think about your ordinary life over the past eight weeks. Simple, concrete questions help estimate a pattern—not a verdict.",
  "dimensions": "dimensions",
  "minutes": "minutes",
  "private": "private",
  "start": "Begin reflection",
  "continue": "Continue reflection",
  "restart": "Start over",
  "restartConfirm": "Start over and clear all saved answers?",
  "privacyNote": "Your answers stay in this tab and disappear when you close it.",
  "pathEyebrow": "Six movements",
  "pathTitle": "A path, not a rank",
  "backToIntro": "Back",
  "yourProgress": "Your progress",
  "chooseClosest": "Over the past eight weeks, how often has this been true? Choose what was usual, not what you hoped to do. The example clarifies the situation; it is not a suggested answer.",
  "previous": "Previous",
  "next": "Next",
  "seeResult": "See result",
  "preferNot": "I prefer not to answer this question.",
  "needMore": "For a useful estimate, answer at least 21 questions and at least 2 in every area. This item was previously skipped.",
  "footerNote": "For personal reflection; not a substitute for spiritual direction or confession.",
  "footerIdentity": "Stages of Spiritual Progress",
  "resultEyebrow": "Your closest pattern",
  "ascentTitle": "Your place on the path",
  "ascentPosition": "Approximate position: {score} of 6, closest to Stage {stage}.",
  "calculatedLocally": "Calculated on this device",
  "resultRangeLabel": "Your likely range",
  "resultCaution": "Treat this as a prompt for prayerful reflection, not as a spiritual verdict.",
  "profileEyebrow": "Seven dimensions",
  "profileTitle": "Your reflection profile",
  "reviewAnswers": "Review answers",
  "printResult": "Print result",
  "retake": "Clear & retake",
  "methodTitle": "How this estimate is calculated",
  "methodBody": "Responses are mapped evenly onto a six-point continuum: 1, 2.25, 3.5, 4.75, or 6. Reverse-keyed items use the opposite score. Item scores are averaged within each of the seven areas, and those seven area means are then averaged with equal weight. The nearest whole number becomes the displayed stage. Pattern stability is the percentage of 1,000 browser-only within-area resamples that return that same stage; the range contains the middle 95% of resampled overall scores. It measures sensitivity to this answer pattern, not validated diagnostic accuracy.",
  "methodPrivacy": "Answers, progress, result, and language are kept only in this tab’s temporary session storage so they survive a refresh. They are never transmitted and are cleared when the tab is closed. No cookies, analytics, or identifiers are used.",
  "notAnswered": "Not answered",
  "answeredSummary": "{answered} of {total} questions answered · {domains} of 7 dimensions represented",
  "rangeSingle": "Your answers gather most closely around Stage {stage}.",
  "rangeMultiple": "Your answers most often fall between Stages {lower} and {upper}.",
  "confidence": {
    "high": "High stability",
    "moderate": "Moderate stability",
    "low": "Low stability"
  },
  "families": {
    "purgative": "Purgative way",
    "illuminative": "Illuminative way",
    "unitive": "Unitive way"
  },
  "domains": {
    "seriousSin": "Serious choices",
    "venialSin": "Everyday faults",
    "imperfections": "Attachments & habits",
    "suffering": "Suffering",
    "prayer": "Prayer",
    "examen": "Reflection",
    "sacraments": "Sacramental life"
  },
  "stages": [
    {
      "name": "Mediocre Piety",
      "family": "purgative",
      "summary": "Your answers resemble a beginning marked by sincere desire but inconsistent practice. The central invitation is to establish a steady rhythm, take avoidable occasions seriously, and begin again without discouragement."
    },
    {
      "name": "Intermittent Piety",
      "family": "purgative",
      "summary": "Your answers suggest real resistance to serious sin and a growing spiritual routine, though fidelity may still weaken with dryness, distraction, or pressure. Consistency is likely the next fruitful step."
    },
    {
      "name": "Sustained Piety",
      "family": "purgative",
      "summary": "Your answers point toward a stable pattern of prayer, vigilance, examen, and sacramental life. Consolation and dryness may alternate, while imperfections and suffering still require patient, deliberate work."
    },
    {
      "name": "Fervor",
      "family": "illuminative",
      "summary": "Your answers resemble a life increasingly shaped by willing prayer, serious reparation, courageous work on imperfections, and a clearer understanding of suffering’s spiritual benefit."
    },
    {
      "name": "Relative Perfection",
      "family": "illuminative",
      "summary": "Your answers suggest a habitual life of prayer, careful love in confronting imperfections, and greater peace in sacrifice. Desire for detachment, the Eucharist, and divine love becomes more pervasive."
    },
    {
      "name": "Heroic Perfection",
      "family": "unitive",
      "summary": "Your answers resemble the source’s highest described pattern: deep self-forgetfulness, generous acceptance of suffering for others, and contemplative prayer shaped by profound purification."
    }
  ],
  "questions": [
    {
      "kicker": "A usual week",
      "title": "I keep a prayer time I had planned, even on a busy day.",
      "example": "A late meeting runs over, and your usual evening prayer time arrives while unfinished messages or tasks are still waiting."
    },
    {
      "kicker": "When plans change",
      "title": "When plans are disrupted, I regain inner peace without first needing the situation to change.",
      "example": "A cancelled appointment or unexpected delay changes the day, and the situation cannot be corrected immediately."
    },
    {
      "kicker": "Smaller faults",
      "title": "When I notice a small but deliberate fault, I tend to dismiss it instead of acknowledging it and trying to correct it.",
      "example": "You answer someone harshly. You know it was wrong, but you neither apologize nor consider how to respond differently next time because the fault seems unimportant."
    },
    {
      "kicker": "Weekly priorities",
      "title": "I organize ordinary weekly commitments around Sunday Mass.",
      "example": "A weekend trip, sports event, or family visit overlaps with the usual Mass time and requires advance planning."
    },
    {
      "kicker": "Recurring habits",
      "title": "I explain away a recurring weakness because it is ‘just how I am.’",
      "example": "Impatience repeatedly appears at home, and you describe it as simply part of your temperament."
    },
    {
      "kicker": "Looking back",
      "title": "I pause at a regular time to review the day before God.",
      "example": "At a regular time in the evening, you briefly place the day’s gratitude, choices, and failures before God."
    },
    {
      "kicker": "Known situations",
      "title": "When I recognize a situation that repeatedly weakens my choices, I change or leave that situation.",
      "example": "Certain conversations, apps, places, or routines have repeatedly weakened you before a grave choice."
    },
    {
      "kicker": "When prayer is dry",
      "title": "When prayer feels dry or unrewarding, I shorten it or skip it.",
      "example": "You feel no comfort, insight, or emotion in prayer, and the planned time seems empty."
    },
    {
      "kicker": "Under pressure",
      "title": "During a difficulty, I spend much of my energy mentally arguing with what has happened.",
      "example": "After criticism, illness, delay, or disappointment, an inner dialogue keeps insisting that this should not be happening."
    },
    {
      "kicker": "Everyday attention",
      "title": "I notice small choices that make me less patient, honest, or generous.",
      "example": "You notice the moment you exaggerate, answer sharply, or choose convenience over a small act of charity."
    },
    {
      "kicker": "A steady rhythm",
      "title": "I approach confession on a planned rhythm, not only after a crisis.",
      "example": "You choose a recurring time for confession even when no dramatic fall has occurred."
    },
    {
      "kicker": "Freedom to love",
      "title": "I work on a habit that is not necessarily sinful but makes me less free to love.",
      "example": "Checking your phone, seeking praise, controlling details, or avoiding inconvenience makes you less available to love God or another person."
    },
    {
      "kicker": "After a difficult day",
      "title": "I examine my conduct mainly after something has gone badly.",
      "example": "You look back on your motives mainly after an argument, neglected duty, or another visible failure."
    },
    {
      "kicker": "Before a choice",
      "title": "I stay near a known trigger and trust myself to handle it in the moment.",
      "example": "You continue a late-night conversation, keep easy access to harmful content, or remain in a setting that has repeatedly preceded a grave fall."
    },
    {
      "kicker": "Ordinary work",
      "title": "Prayer returns naturally to mind during ordinary work.",
      "example": "While commuting, cooking, or answering messages, your attention quietly returns to God’s presence."
    },
    {
      "kicker": "Giving meaning",
      "title": "I can give an unavoidable difficulty meaning by offering it for someone else.",
      "example": "An ordinary unavoidable illness, delay, or necessary duty—not abuse or preventable harm—cannot be removed, and you intentionally entrust it to God for a particular person."
    },
    {
      "kicker": "Making amends",
      "title": "After a small deliberate fault, I make a specific act of repair.",
      "example": "After speaking impatiently, you apologize, repair the practical harm, or make a contrary act of kindness."
    },
    {
      "kicker": "A real opportunity",
      "title": "When weekday Mass is reasonably possible but requires rearranging a plan, I dismiss the opportunity without considering it.",
      "example": "A weekday Mass is available nearby, but attending would require moving a nonessential errand or leisure plan."
    },
    {
      "kicker": "A concrete practice",
      "title": "I choose one concrete virtue to practice against a recurring weakness.",
      "example": "Against recurring impatience, you deliberately practice one concrete act of gentleness each day."
    },
    {
      "kicker": "The next day",
      "title": "My review of the day leads to one concrete intention for the next day.",
      "example": "After noticing hurried speech, you decide that tomorrow you will pause before answering one difficult person."
    },
    {
      "kicker": "After a serious failure",
      "title": "After a serious failure, I take a concrete step soon afterward—confession, reparation, or a change in circumstances.",
      "example": "After a grave sin, you arrange confession, remove access to the occasion, or repair harm rather than relying on regret alone."
    },
    {
      "kicker": "Attention in prayer",
      "title": "My prayer is mainly a list of immediate needs, with little time simply attentive to God.",
      "example": "Most of your prayer is asking for solutions, with little silence for simply remaining lovingly attentive to God."
    },
    {
      "kicker": "For another person",
      "title": "I avoid reasonable sacrifices for another person when they disturb my comfort.",
      "example": "You could give someone time, attention, or a modest convenience but avoid it mainly because it interrupts your comfort."
    },
    {
      "kicker": "Recognizing a pattern",
      "title": "I treat recurring small faults as unrelated incidents rather than looking for a pattern.",
      "example": "Impatience appears repeatedly, but each episode is treated as a one-off without asking what feeds it."
    },
    {
      "kicker": "After confession",
      "title": "After confession, I usually leave my concrete repair or next step undefined.",
      "example": "You confess a repeated fault but leave without deciding whom to apologize to, what occasion to avoid, or what virtue to practice."
    },
    {
      "kicker": "The first impulse",
      "title": "I notice a self-centered impulse only after it has already shaped my actions.",
      "example": "You recognize a wish to be praised only after it has already shaped what you said or chose."
    },
    {
      "kicker": "Across several days",
      "title": "I treat each fault as isolated rather than looking for a recurring pattern across days.",
      "example": "Several evenings show the same rushed pattern behind neglected prayer or family attention, but you do not connect the incidents."
    },
    {
      "kicker": "After regret fades",
      "title": "Once regret fades, I tend to return to the same situation or setup as before.",
      "example": "After a grave fall linked to a particular app, relationship pattern, or setting, you return to it unchanged once the discomfort passes."
    }
  ],
  "stabilitySummary": "Internal pattern stability: {percent}% of resamples returned Stage {stage}; the 95% response interval spans Stages {lower}–{upper}.",
  "frequencyOptions": [
    "Never or almost never",
    "Rarely",
    "About half the time",
    "Often",
    "Almost always"
  ],
  "webMcp": {
    "questionsTitle": "Read reflection questions",
    "questionsDescription": "Return the spiritual reflection questions and choices in the language currently visible in the app.",
    "answersTitle": "Set reflection answers",
    "answersDescription": "Set one or more answers in the current spiritual reflection and show the visible questionnaire.",
    "resultTitle": "Calculate reflection result",
    "resultDescription": "Calculate and display the result after at least 21 questions have been answered with coverage across all seven areas.",
    "answerRequired": "At least one answer is required.",
    "unknownQuestion": "Unknown questionId: {id}",
    "invalidOption": "Invalid optionIndex for {id}",
    "coverageRequired": "At least 21 answered questions and two answers in every area are required."
  },
  "exampleLabel": "Everyday example"
});
})();
