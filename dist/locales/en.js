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
      "kicker": "Prayer · keeping a time",
      "title": "I begin my planned prayer time even when the day is busy.",
      "example": "Your usual prayer time arrives while messages or chores are unfinished; the question is whether you begin as planned or keep postponing it."
    },
    {
      "kicker": "Difficulty · acceptance",
      "title": "After an ordinary disappointment, I return to what needs to be done instead of remaining caught in protest.",
      "example": "A plan is cancelled and cannot be restored. After acknowledging the disappointment, you begin using the remaining time well rather than repeatedly thinking that it should not have happened."
    },
    {
      "kicker": "Small faults · response",
      "title": "When I know that a small action was wrong, I dismiss it because it seems unimportant.",
      "example": "You make an unkind joke, see that it hurt someone, and decide it is too small to address."
    },
    {
      "kicker": "Eucharist · Sunday",
      "title": "When making weekend plans, I make room for Sunday Mass unless a serious reason prevents me.",
      "example": "Before confirming a trip or event, you check when and where Sunday Mass is available; illness or an unavoidable duty is a different situation."
    },
    {
      "kicker": "Habits · excuses",
      "title": "I excuse a recurring weakness by telling myself, “That is just my personality.”",
      "example": "The same impatient tone returns at home, and you treat it as fixed temperament rather than something that can change."
    },
    {
      "kicker": "Daily review · regularity",
      "title": "I set aside a specific moment to review my day before God.",
      "example": "At a chosen time, you briefly recall something you are grateful for, one way you responded well, and one place where you need mercy."
    },
    {
      "kicker": "Serious choices · prevention",
      "title": "When a situation repeatedly leads me toward something seriously wrong, I make a concrete change to reduce the risk.",
      "example": "A certain app, conversation, or setting has preceded several choices you believe were seriously wrong; a concrete change could involve access, timing, or company."
    },
    {
      "kicker": "Prayer · dryness",
      "title": "When prayer feels dry or empty, I cut it short or skip it.",
      "example": "No comfort or insight comes during prayer and nothing seems to happen; you end early mainly for that reason."
    },
    {
      "kicker": "Difficulty · inner resistance",
      "title": "After doing what I reasonably can about a difficulty, I stay mentally stuck on how unfair or unacceptable it is.",
      "example": "You address what can be changed after criticism, delay, or disappointment, but the same inner protest continues to occupy your attention for a long time."
    },
    {
      "kicker": "Small faults · awareness",
      "title": "During the day, I notice small acts of impatience, dishonesty, or selfishness instead of overlooking them.",
      "example": "You recognize a slight exaggeration, a dismissive reply, or choosing convenience at someone else’s expense."
    },
    {
      "kicker": "Confession · rhythm",
      "title": "When confession is reasonably available, I plan to go at an approximate interval instead of waiting for a crisis.",
      "example": "For example, you decide to go about once a month and make room for it even when no grave sin has occurred."
    },
    {
      "kicker": "Habits · freedom",
      "title": "I deliberately limit a habit that is not wrong in itself when it takes attention from God or other people.",
      "example": "Phone checking, seeking praise, or insisting on having plans your way begins to reduce your attention to prayer or to someone present."
    },
    {
      "kicker": "Daily review · only after failure",
      "title": "I examine my motives only after something has obviously gone wrong.",
      "example": "You examine yourself after an argument, but not on ordinary days when no visible conflict occurs."
    },
    {
      "kicker": "Serious choices · risk",
      "title": "I remain in a situation that has repeatedly brought me close to serious sin because I assume I will control myself this time.",
      "example": "You keep unrestricted access to harmful content or continue a predictable late-night exchange, trusting the next outcome will be different."
    },
    {
      "kicker": "Prayer · recollection",
      "title": "During ordinary tasks, I briefly turn my attention to God.",
      "example": "While commuting, cooking, or answering messages, you make a short act of gratitude, trust, or awareness of God’s presence."
    },
    {
      "kicker": "Difficulty · offering",
      "title": "When an ordinary difficulty cannot be avoided, I consciously offer it to God for another person’s good.",
      "example": "While enduring illness, delay, or necessary duty—not abuse or preventable harm—you name a person and entrust the trial to God for them."
    },
    {
      "kicker": "Small faults · repair",
      "title": "After a deliberate small fault, I make a concrete repair when possible.",
      "example": "After speaking harshly, you apologize or correct the practical harm instead of stopping at private regret."
    },
    {
      "kicker": "Eucharist · weekday opportunity",
      "title": "When weekday Mass can fit without neglecting my duties, I rule it out without considering a small change of plan.",
      "example": "A nearby Mass would fit if a nonessential errand or leisure plan were moved, but you dismiss it automatically. Work, caregiving, health, and necessary rest do not count as refusal."
    },
    {
      "kicker": "Virtue · concrete practice",
      "title": "I choose one specific virtue to practice against a recurring weakness.",
      "example": "If impatience keeps returning, you choose one daily act—such as pausing before replying—to practice gentleness."
    },
    {
      "kicker": "Daily review · next step",
      "title": "My review of the day leads to one specific intention for the next day.",
      "example": "After noticing that you rushed a family member, you decide when and how you will listen more patiently tomorrow."
    },
    {
      "kicker": "Serious choices · response",
      "title": "After a choice I believe was seriously wrong, I take at least one concrete step to prevent a repeat.",
      "example": "You arrange confession, remove access to the occasion, seek support from a trusted person, or repair harm instead of relying only on regret."
    },
    {
      "kicker": "Prayer · attention",
      "title": "My prayer is mostly asking God to solve immediate problems, with little time for quiet attention to him.",
      "example": "Prayer becomes a list of requests and ends when the list is finished, without time simply to remain before God."
    },
    {
      "kicker": "Charity · sacrifice",
      "title": "When I can help someone without neglecting a real duty, I avoid doing so mainly because it would inconvenience me.",
      "example": "Someone needs a little time or practical help that you can reasonably give, but you decline chiefly because it would interrupt your comfort."
    },
    {
      "kicker": "Small faults · pattern",
      "title": "When the same small fault recurs, I treat each occurrence as unrelated.",
      "example": "The same unkind joke or small lie appears several times, but you do not ask what desire or situation keeps feeding it."
    },
    {
      "kicker": "Confession · next step",
      "title": "When I confess a recurring fault, I usually leave without deciding what practical step I will take next.",
      "example": "You confess the same fault but do not decide to apologize, avoid a particular occasion, or practice a specific virtue afterward."
    },
    {
      "kicker": "Motives · awareness",
      "title": "When a wish for praise or control influences my behavior, I usually notice it only afterward.",
      "example": "Only after speaking do you recognize that wanting to impress others influenced what you said."
    },
    {
      "kicker": "Daily review · patterns",
      "title": "In reviewing my days, I treat each failure separately instead of looking for recurring circumstances.",
      "example": "Several evenings show that fatigue and unplanned screen time come before neglected prayer, but you review each evening without connecting them."
    },
    {
      "kicker": "Serious choices · safeguards",
      "title": "Once my initial regret fades, I return without safeguards to the situation linked to a seriously wrong choice.",
      "example": "If a seriously wrong choice was connected with an app, relationship pattern, or setting, you resume the same access and routine without changing anything."
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
