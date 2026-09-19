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
  "introLede": "Compare your actual practice with the source descriptions. Each important requirement is checked separately: strength in one area cannot compensate for another. This is a reflection aid, not confirmation of a spiritual stage.",
  "dimensions": "dimensions",
  "minutes": "minutes",
  "private": "private",
  "start": "Begin reflection",
  "continue": "Continue reflection",
  "restart": "Start over",
  "restartConfirm": "Start over and clear all saved answers?",
  "privacyNote": "Your answers stay in this tab and disappear when you close it.",
  "pathEyebrow": "Seven stages",
  "pathTitle": "A path, not a rank",
  "pathAssessmentNote": "All seven stages remain visible. The questionnaire checks only practical expectations associated with I–IV. V and VI include mystical graces that answers about habits cannot establish; the source gives only a name for VII.",
  "backToIntro": "Back",
  "yourProgress": "Your progress",
  "chooseClosest": "Think about the past eight weeks, unless a question explicitly asks about your established schedule. Choose what actually happened, not your intentions or your best day. Skip if no description fits or you are unsure. The story only explains the question.",
  "previous": "Previous",
  "next": "Next",
  "seeResult": "See result",
  "preferNot": "I cannot assess this / I choose to skip",
  "needMore": "Visit every question. Choose skip for anything you cannot assess; its requirement will remain unknown rather than be treated as met.",
  "footerNote": "For personal reflection; not a substitute for spiritual direction or confession.",
  "footerIdentity": "Stages of Spiritual Progress",
  "resultEyebrow": "Practical expectations supported by your answers",
  "ascentTitle": "Comparison with the source",
  "ascentUnassessedNote": "I–IV: practical requirements. V–VII: source descriptions only, not assigned.",
  "ascentPosition": "Your answers support the practical requirements associated with Stage {stage}. This does not confirm your spiritual stage.",
  "calculatedLocally": "Calculated on this device",
  "resultRangeLabel": "Limit of this review",
  "resultCaution": "Treat this as a prompt for prayerful reflection, not as a spiritual verdict.",
  "resultSummary": "Your answers support all practical requirements this questionnaire associates with the displayed stage, allowing for explicitly identified inapplicable circumstances. This does not confirm the full spiritual stage, sanctity, or mystical graces. This review is stricter than an average, but is not a validated test.",
  "sourceDescriptionEyebrow": "Description from the source",
  "sourceDescriptionIntro": "What characterizes this stage according to the source? This is a plain-language description, not a new set of requirements or an additional score. Only the areas discussed in the source for this stage are included.",
  "sourceDescriptionReference": "Paraphrased from Stages of Spiritual Progress, section {stage}.",
  "sourceDescriptionCaution": "Reading note: accepting suffering and practising self-denial are not invitations to self-harm, remain in abuse, or neglect health and duties. The questionnaire cannot establish infused prayer, passive purification, or extraordinary mystical phenomena.",
  "profileEyebrow": "Individual requirements",
  "profileTitle": "Practical requirements",
  "reviewAnswers": "Review answers",
  "printResult": "Print result",
  "retake": "Clear & retake",
  "methodTitle": "How the requirements are checked",
  "methodBody": "There is no sum, average, or rounding. Each question has concrete answer descriptions that support a particular threshold. Every practical requirement of a higher threshold, together with the positive foundations of lower thresholds, must be supported. One unsupported or unknown mandatory requirement prevents that comparison. Explicitly conditional requirements may be inapplicable; they are reported separately and are not evidence of progress. Not every sentence of lower stages is inherited literally: deficiencies such as superficial remorse are not prerequisites for growth. The source does not supply this algorithm; the rules are a conservative, app-authored operationalization of its descriptions. Inheriting positive requirements, including retaining III's mortal-sin criteria at IV and II's quarterly confession minimum at III, is an application design decision. Mystical graces, prayer of Quiet, and passive purification cannot be established here; the output therefore concerns only practical requirements associated with I–IV. V–VII are not assigned. There is no percentage of accuracy or confidence in sanctity.",
  "methodPrivacy": "Answers, progress, result, and language are kept only in this tab’s temporary session storage so they survive a refresh. They are never transmitted and are cleared when the tab is closed. No cookies, analytics, or identifiers are used.",
  "notAnswered": "Not answered",
  "answeredSummary": "{answered} of {total} answers selected · {skipped} skipped. An explicit uncertain answer also remains unknown for the relevant check.",
  "families": {
    "purgative": "Purgative way",
    "illuminative": "Illuminative way",
    "unitive": "Unitive way"
  },
  "domains": {
    "seriousSin": "Mortal sin",
    "venialSin": "Venial sin",
    "imperfections": "Imperfections",
    "suffering": "Suffering",
    "prayer": "Prayer",
    "examen": "Examination of conscience",
    "sacraments": "Sacraments"
  },
  "stages": [
    {
      "name": "Mediocre Piety",
      "family": "purgative",
      "sourceDescription": [
        {
          "domain": "seriousSin",
          "text": "Resistance to mortal sin is still weak, and near occasions of sin are rarely avoided. Yet a fall is seriously regretted and followed by an adequate confession."
        },
        {
          "domain": "venialSin",
          "text": "Venial sin is treated as unimportant, and is sometimes even welcomed or desired. Little or nothing is done to prevent it, recognize its less obvious forms, or uproot it."
        },
        {
          "domain": "suffering",
          "text": "Suffering is avoided. When it comes, it completely disrupts inner peace."
        },
        {
          "domain": "prayer",
          "text": "Prayer is valued but is not yet habitual. It may sometimes be good and attentive, but fervor is short-lived. It is usually vocal prayer with intermittent attention or petitions focused on everyday needs and desires."
        },
        {
          "domain": "examen",
          "text": "The examination of conscience is not practised."
        },
        {
          "domain": "sacraments",
          "text": "Mass is attended regularly and confession is sought more frequently. This section does not give an exact interval between confessions."
        }
      ]
    },
    {
      "name": "Intermittent Piety",
      "family": "purgative",
      "sourceDescription": [
        {
          "domain": "seriousSin",
          "text": "Mortal sin is faithfully resisted, and its near occasions are habitually avoided. Recognizing a sin leads to deep regret and penance to make reparation for what was done."
        },
        {
          "domain": "venialSin",
          "text": "Venial sin is sometimes deliberate. The effort to resist it remains weak and sorrow is superficial. Conscience is examined, but without a clear method, preparation, or coherence."
        },
        {
          "domain": "suffering",
          "text": "Difficulties are tolerated, but with complaints and little inner peace."
        },
        {
          "domain": "prayer",
          "text": "Vocal prayer is regular, but commitment to meditation with a set time, place, and material is not yet firm. It is often abandoned as soon as dryness or other business arises."
        },
        {
          "domain": "examen",
          "text": "The examination of conscience is practised intermittently rather than consistently."
        },
        {
          "domain": "sacraments",
          "text": "Mass is attended weekly and confession is sought at least once every three months."
        }
      ]
    },
    {
      "name": "Sustained Piety",
      "family": "purgative",
      "sourceDescription": [
        {
          "domain": "seriousSin",
          "text": "The source describes no mortal sin, or at most an extremely rare fall in a sudden situation, often with doubt about whether it was mortal. A fall is followed by deep remorse and a desire for penance."
        },
        {
          "domain": "venialSin",
          "text": "Venial sin is no longer habitual and is rarely deliberate. It is vigilantly resisted and deeply regretted, though little reparation follows. A consistent particular examen focuses on a specific weakness, chiefly to avoid venial sin."
        },
        {
          "domain": "imperfections",
          "text": "Imperfections are still readily excused or left unexamined to avoid having to fight them. There is a desire to renounce them, but little actual effort."
        },
        {
          "domain": "suffering",
          "text": "Suffering is accepted and endured with relative peace, although the inner struggle remains."
        },
        {
          "domain": "prayer",
          "text": "There is consistent fidelity to a set time and approach to prayer. Vocal prayer accompanies meditation that often becomes a loving conversation with God. Prayer of simplicity may emerge. Consolation and dryness alternate, with dryness still hard to endure; the source also places contemplative aridity here or at the next stage."
        },
        {
          "domain": "examen",
          "text": "The examination of conscience is practised at least once a day, often more than once."
        },
        {
          "domain": "sacraments",
          "text": "Mass is attended weekly and, when possible, daily. Confession follows a regular schedule."
        }
      ]
    },
    {
      "name": "Fervor",
      "family": "illuminative",
      "sourceDescription": [
        {
          "domain": "venialSin",
          "text": "Venial sin is not deliberate. It may occur by surprise or with incomplete awareness, but is deeply regretted and followed by serious efforts at reparation."
        },
        {
          "domain": "imperfections",
          "text": "Imperfections are fought courageously and diligently out of a desire to please God more. Any yielding is immediately regretted. Acts of renunciation are frequent, and a particular examen aims at growth in a specific virtue."
        },
        {
          "domain": "prayer",
          "text": "Vocal and mental prayer are practised consistently and gladly extended. Prayer often becomes a loving conversation with God; the source also mentions prayer of simplicity or prayer of Quiet. Strong consolations alternate with severe trials."
        },
        {
          "domain": "examen",
          "text": "The examination of conscience is practised at least twice daily."
        },
        {
          "domain": "suffering",
          "text": "Suffering is accepted with a clearer understanding of its spiritual benefit, with peace and some joy."
        },
        {
          "domain": "sacraments",
          "text": "Participation in weekly Mass is fervent, and daily Mass is attended when possible. Confession is sought at least monthly. Imperfections are also brought to devotional confession to seek the grace to overcome them."
        }
      ]
    },
    {
      "name": "Relative Perfection",
      "family": "illuminative",
      "sourceDescription": [
        {
          "domain": "imperfections",
          "text": "Imperfections are guarded against energetically, with care and love. They occur only with partial awareness, rather than with fully conscious consent."
        },
        {
          "domain": "suffering",
          "text": "Suffering is accepted joyfully and peacefully. At times, a sacrifice or difficulty is willingly undertaken for the good of others."
        },
        {
          "domain": "prayer",
          "text": "Prayer becomes a habitual way of life, even during everyday work. There is a strong desire for self-renunciation, complete surrender to God, detachment, and divine love, together with a longing for the Eucharist and Heaven. The source mentions different degrees of infused prayer, received as God's gift, and often passive purification: God's purifying work in the soul."
        }
      ],
      "assessmentNote": "Described, not assigned"
    },
    {
      "name": "Heroic Perfection",
      "family": "unitive",
      "sourceDescription": [
        {
          "domain": "imperfections",
          "text": "Imperfections remain only as an initial, spontaneous impulse, without deliberate consent to it."
        },
        {
          "domain": "suffering",
          "text": "Suffering is joyfully accepted, and sacrifice is willingly undertaken for the good of others."
        },
        {
          "domain": "prayer",
          "text": "The source describes supernatural graces of contemplation, sometimes accompanied by extraordinary phenomena, and profound passive purifications. In strong ascetical language, it speaks of disregard for self to the point of complete self-forgetfulness and a preference for suffering over joys. This is the text's description, not confirmation of these experiences in the person completing the questionnaire."
        }
      ],
      "assessmentNote": "Described, not assigned"
    },
    {
      "name": "Complete Sanctity",
      "family": "unitive",
      "assessmentNote": "Shown, not assessed",
      "sourceDescription": [],
      "summary": "The source diagram names this final stage but the supplied pages provide no description or assessment criteria. It is therefore shown on the path but is not assigned as a questionnaire result."
    }
  ],
  "webMcp": {
    "questionsTitle": "Read reflection questions",
    "questionsDescription": "Return the spiritual reflection questions and choices in the language currently visible in the app.",
    "answersTitle": "Set reflection answers",
    "answersDescription": "Set one or more answers in the current spiritual reflection and show the visible questionnaire.",
    "resultTitle": "Calculate reflection result",
    "resultDescription": "Show the criterion-based comparison once every question is answered or explicitly skipped.",
    "answerRequired": "At least one answer is required.",
    "unknownQuestion": "Unknown questionId: {id}",
    "invalidOption": "Invalid optionIndex for {id}",
    "coverageRequired": "Visit every question. Choose skip for anything you cannot assess; its requirement will remain unknown rather than be treated as met."
  },
  "exampleLabel": "A short story to explain",
  "domainHelp": {
    "seriousSin": "Mortal sin involves grave matter, full knowledge that it is gravely sinful, and free consent. A temptation or unwanted thought alone is not such consent. If you are unsure how to assess your situation, you may skip.",
    "venialSin": "Venial sin can involve a less serious matter, or a grave matter without full knowledge or complete consent. These stories illustrate small failures in charity; the gravity of a real act depends on its circumstances.",
    "imperfections": "These questions concern attachments and weaknesses that need not be sins in themselves. What matters is your response once you recognize them; an unwanted first impulse is different from deliberate consent.",
    "suffering": "Think of difficulties you can endure with appropriate help and care for yourself. Sadness and pain alone do not mean a lack of faith. Treatment, asking for help and protection from abuse do not count as avoiding the cross.",
    "prayer": "Meditation means staying before God with a Gospel passage, spiritual reading or a subject of faith. Spoken prayers and petitions also have their place. A lack of comforting feelings in prayer is often called dryness.",
    "examen": "An examination of conscience (examen) is a brief review of the day before God: giving thanks, considering your actions and asking for forgiveness and help. A particular examen focuses on one weakness or virtue.",
    "sacraments": "Allow for access to Mass and confession, health, work, caregiving and necessary rest. Weekday Mass and confession of venial sins are practices for growth here, not additional obligations."
  },
  "contextLabel": "Understanding the terms",
  "mixedFamily": "Incomplete or mixed pattern",
  "mixedTitle": "No sufficiently supported pattern",
  "mixedSummary": "Your answers do not yet support all initial requirements for comparison with a stage. Some may be unmet, unknown, or inconsistent with another answer. This is not a judgment about your faith or worth; the review below explains what remains unresolved.",
  "sourceDescriptionFallback": "This is the initial source description for comparison, not a stage assigned to you. Even this description assumes some prayer, Mass attendance, and confession; it is not assigned automatically when other thresholds are unsupported.",
  "ruleBased": "No averaging",
  "criteriaTitle": "Requirements for Stage {stage}",
  "criteriaCounts": "Supported {met} · unsupported {notMet} · unknown {unknown} · inapplicable {notTriggered}",
  "criteriaSummary": "These are counts of checks, not a percentage of spiritual progress or reliability. A single unsupported or unknown mandatory requirement prevents support for a higher threshold.",
  "criteriaEyebrow": "Each requirement is checked",
  "criteriaHelp": "See the exact expectation alongside your answer. You can review any threshold I–IV. “Inapplicable” is reserved for explicit circumstances such as no fall or no realistic opportunity for Mass; it is not additional evidence of maturity. Supported practical requirements do not confirm a mystical state.",
  "criteriaSelectLabel": "Review the requirements for",
  "criterionStatuses": {
    "met": "Answer supports the requirement",
    "notMet": "Answer does not support it",
    "unknown": "Cannot be assessed",
    "notTriggered": "Not applicable"
  },
  "criterionUnknownNote": "An assessable answer is missing, or answers about the same situation are inconsistent. This cannot support the requirement, but does not mean personal failure. Do not invent an answer if you cannot assess it.",
  "criterionExemptNote": "This requirement does not apply in the circumstances given. It is not counted as evidence of greater spiritual maturity.",
  "criterionSource": "Source sections:",
  "yourAnswer": "Your answer:",
  "reviewThisAnswer": "Review this question",
  "nextThreshold": "Not every requirement for threshold {stage} is supported. Review the specific expectations and answers below; this is not an average score.",
  "upperLimitNote": "IV is the highest threshold of practical requirements compared here. Even when all are supported, not every spiritual characteristic of Stage IV has been established. V and VI include graces of infused prayer and contemplation; ordinary habits do not prove them. The supplied source has no description for VII. All remain visible as part of the source's path.",
  "advancedSourceTitle": "Why V–VII are not assigned — source descriptions"
});
})();
