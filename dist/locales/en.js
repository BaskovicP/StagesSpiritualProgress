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
  "pathEyebrow": "Seven stages",
  "pathTitle": "A path, not a rank",
  "pathAssessmentNote": "Stage VII appears in the source diagram, but the supplied pages give no criteria for it. It is shown as the horizon of the path and is not assigned by this questionnaire.",
  "backToIntro": "Back",
  "yourProgress": "Your progress",
  "chooseClosest": "Think about the past eight weeks. How often did the statement describe your behavior? The story is a fictional illustration: answer about yourself. If it asks how you responded to a situation that did not occur, skip.",
  "previous": "Previous",
  "next": "Next",
  "seeResult": "See result",
  "preferNot": "I cannot assess this / I choose to skip",
  "needMore": "An estimate needs at least 21 answers and two in each area. This statement was skipped. Answer only if you can assess it; otherwise an estimate is not available yet.",
  "footerNote": "For personal reflection; not a substitute for spiritual direction or confession.",
  "footerIdentity": "Stages of Spiritual Progress",
  "resultEyebrow": "Your closest pattern",
  "ascentTitle": "Your place on the path",
  "ascentPosition": "Approximate position on the assessed I–VI scale: {score} of 6, closest to Stage {stage}.",
  "calculatedLocally": "Calculated on this device",
  "resultRangeLabel": "Your likely range",
  "resultCaution": "Treat this as a prompt for prayerful reflection, not as a spiritual verdict.",
  "profileEyebrow": "Seven dimensions",
  "profileTitle": "Your reflection profile",
  "reviewAnswers": "Review answers",
  "printResult": "Print result",
  "retake": "Clear & retake",
  "methodTitle": "How this estimate is calculated",
  "methodBody": "The questions are adapted from the source descriptions. The numerical scale is a provisional method devised for this app, not a scoring system supplied by the source. The source diagram names seven stages, but the supplied pages describe only Stages I–VI. For that reason, the questionnaire displays all seven while estimating only the six described stages; it does not assign Stage VII. Responses are mapped evenly onto the range from 1 to 6 using five values: 1, 2.25, 3.5, 4.75, or 6. Reverse-keyed items use the opposite score. Item scores are averaged within each of the seven areas, and those seven area means are then averaged with equal weight. The nearest whole number becomes the displayed stage. Pattern stability is the percentage of 1,000 browser-only within-area resamples that return that same stage; the range contains the middle 95% of resampled overall scores. It measures sensitivity to this answer pattern, not validated diagnostic accuracy.",
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
    },
    {
      "name": "Complete Sanctity",
      "family": "unitive",
      "assessmentNote": "Shown, not assessed",
      "summary": "The source diagram names this final stage but the supplied pages provide no description or assessment criteria. It is therefore shown on the path but is not assigned as a questionnaire result."
    }
  ],
  "questions": [
    {
      "kicker": "Prayer · meditation",
      "title": "I set aside planned time for prayerful meditation.",
      "example": "In the evening, Ana reads a few lines from the Gospel. She stays with one saying of Jesus and speaks to him about her day."
    },
    {
      "kicker": "Suffering · peace",
      "title": "In a difficulty I cannot yet resolve, I manage to keep some inner peace.",
      "example": "Ivan is waiting for a medical result that is not ready yet. He is worried, but finds a little peace in prayer while he waits."
    },
    {
      "kicker": "Venial sin · taking it seriously",
      "title": "I brush aside a venial sin because I think, “It is nothing important.”",
      "example": "Petar deliberately makes a mildly unkind reply. Later he tells himself, “It was only a small thing,” and dismisses it."
    },
    {
      "kicker": "Sacraments · Sunday Mass",
      "title": "I attend Sunday Mass when no serious reason prevents me.",
      "example": "Marija is travelling on Sunday, so she finds a Mass at her destination. Being ill would be a different situation."
    },
    {
      "kicker": "Imperfections · making excuses",
      "title": "I make excuses for a habit that I can see ties me too closely to my own comfort.",
      "example": "Luka likes everything to follow his schedule. He sees that he struggles to adapt to others, but says, “That is just how I am.”"
    },
    {
      "kicker": "Examen · each day",
      "title": "At least once a day, I review my actions before God.",
      "example": "Before bed, Ana looks back over her day. She gives thanks for the good and acknowledges to God where she went wrong."
    },
    {
      "kicker": "Mortal sin · avoiding occasions",
      "title": "I avoid situations that I know readily lead me toward mortal sin.",
      "example": "Marko knows that certain meetings draw him toward being unfaithful to his spouse. He stops arranging those meetings."
    },
    {
      "kicker": "Prayer · without comfort",
      "title": "I end prayer before the planned time is over because I feel no comfort in it.",
      "example": "Ivana has set aside time to pray. Because she feels nothing special, she decides there is no point continuing and goes to watch television."
    },
    {
      "kicker": "Suffering · complaining",
      "title": "While enduring a difficulty I cannot avoid, I complain about it.",
      "example": "The bus is late and Petar has to wait. He repeatedly says, “Why does this always happen to me?”"
    },
    {
      "kicker": "Venial sin · resistance",
      "title": "When I notice that I am about to commit a venial sin deliberately, I try to stop.",
      "example": "Ana wants to make a small spiteful comment. Before saying it, she recognizes what she is doing and holds back."
    },
    {
      "kicker": "Sacraments · regular confession",
      "title": "I keep a regular rhythm of confession when it is available to me.",
      "example": "Ivan has a habit of going to confession regularly. When the time comes, he checks the schedule and goes instead of repeatedly putting it off."
    },
    {
      "kicker": "Imperfections · letting go",
      "title": "I practice giving up something permitted when I see that I have become too attached to it.",
      "example": "Petar notices that he keeps checking sports scores. He puts his phone away for part of the evening so he can be more present to his family."
    },
    {
      "kicker": "Examen · missed days",
      "title": "A day goes by without my making an examination of conscience.",
      "example": "Luka goes to bed without looking back over his day before God. The same thing happens on the following evenings."
    },
    {
      "kicker": "Mortal sin · resisting temptation",
      "title": "When tempted toward mortal sin, I quickly give up resisting.",
      "example": "Ivan is offered a part in a serious fraud. He knows it is gravely wrong, but stops resisting as soon as he sees the possible profit."
    },
    {
      "kicker": "Prayer · during the day",
      "title": "During everyday work, I return to God in a brief prayer.",
      "example": "While washing dishes, Marija remembers a sick friend. She quietly says, “Lord, be with her,” and carries on working."
    },
    {
      "kicker": "Suffering · for another person",
      "title": "I willingly accept effort or inconvenience to ease another person's burden.",
      "example": "Ana is free to spend an evening with her elderly neighbour and agrees to stay. The conversation tires her, but she is glad her neighbour is no longer alone."
    },
    {
      "kicker": "Venial sin · making amends",
      "title": "After a venial sin, I try to put right what I have done.",
      "example": "Luka has made a small mocking remark to his brother. Later he goes to him and says, “I am sorry. It was wrong to make fun of you.”"
    },
    {
      "kicker": "Sacraments · weekday Mass",
      "title": "When I can attend weekday Mass, I dismiss the opportunity because I would rather stay comfortable.",
      "example": "Petar has a free morning and Mass is nearby. He has no duty or need for rest, but decides to keep watching a series instead."
    },
    {
      "kicker": "Imperfections · practicing a virtue",
      "title": "I work on one weakness by practicing the opposite virtue.",
      "example": "Marija likes to have the last word. In a minor disagreement, she practices humility by holding back an extra remark that would only give her the final say."
    },
    {
      "kicker": "Examen · a particular weakness",
      "title": "In my examination of conscience, I pay special attention to one weakness I am working on.",
      "example": "Ivan is working on patience. In the evening he recalls the moments when he rushed others and when he listened calmly."
    },
    {
      "kicker": "Mortal sin · after a fall",
      "title": "When I recognize that I have committed mortal sin, repentance moves me to penance or repairing the harm.",
      "example": "Marko repents of a serious fraud he knowingly committed and confesses it. He then begins returning the money he took.",
      "clarification": "If no such fall occurred in the past eight weeks, skip this statement. Here, “never” would mean that you do not take the described step after a fall."
    },
    {
      "kicker": "Prayer · what I pray for",
      "title": "My prayer is limited to asking for my everyday problems to be solved.",
      "example": "Luka prays about work, health and bills. His prayer ends there; he rarely thanks God or asks how to live closer to him today."
    },
    {
      "kicker": "Suffering · avoidance",
      "title": "I give up a duty simply because it is difficult or uncomfortable.",
      "example": "Ivan has agreed to take his father to an appointment and is able to do so. He cancels because he does not want to sit and wait with him."
    },
    {
      "kicker": "Venial sin · deliberate consent",
      "title": "I commit a venial sin even though I know at that moment that it is wrong.",
      "example": "Petar wants to take a small jab at a friend. He knows he could leave the spiteful comment unsaid, but says it anyway."
    },
    {
      "kicker": "Sacraments · confession and growth",
      "title": "I put off confession because I think there is no point going without a mortal sin to confess.",
      "example": "Marija sees that she keeps giving in over small things. Yet she dismisses confession: “I have not done anything grave, so I do not need it.”"
    },
    {
      "kicker": "Imperfections · after noticing",
      "title": "I keep feeding my desire for praise after noticing that it is driving me.",
      "example": "Ana notices that she is talking about her success just to be praised. She keeps adding details so she can hear more compliments."
    },
    {
      "kicker": "Examen · how I review",
      "title": "I make a superficial examination of conscience without recalling specific actions.",
      "example": "Petar begins his examination of conscience but stays with a general impression: “The day was so-so.” He does not recall what he actually said or did."
    },
    {
      "kicker": "Mortal sin · a deliberate act",
      "title": "I freely do something that I fully understand to be a grave sin.",
      "example": "Luka knows that giving false testimony would seriously harm an innocent person. He freely chooses to lie to protect himself.",
      "clarification": "This asks whether the act itself occurred. If it did not, choose “Never or almost never”. A temptation or unwanted thought alone is not such an act."
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
  "contextLabel": "Understanding the terms"
});
})();
