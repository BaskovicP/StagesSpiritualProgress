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
  "resultSummary": "Under the approximate calculation, your answers fall closest to this stage. Read its source description below and compare it with your experience. The result does not confirm that you have every characteristic or grace described.",
  "sourceDescriptionEyebrow": "Description from the source",
  "sourceDescriptionIntro": "What characterizes this stage according to the source? This is a plain-language description, not a new set of requirements or an additional score. Only the areas discussed in the source for this stage are included.",
  "sourceDescriptionReference": "Paraphrased from Stages of Spiritual Progress, section {stage}.",
  "sourceDescriptionCaution": "Reading note: accepting suffering and practising self-denial are not invitations to self-harm, remain in abuse, or neglect health and duties. The questionnaire cannot establish infused prayer, passive purification, or extraordinary mystical phenomena.",
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
      "sourceDescription": [
        { "domain": "seriousSin", "text": "Resistance to mortal sin is still weak, and near occasions of sin are rarely avoided. Yet a fall is seriously regretted and followed by an adequate confession." },
        { "domain": "venialSin", "text": "Venial sin is treated as unimportant, and is sometimes even welcomed or desired. Little or nothing is done to prevent it, recognize its less obvious forms, or uproot it." },
        { "domain": "suffering", "text": "Suffering is avoided. When it comes, it completely disrupts inner peace." },
        { "domain": "prayer", "text": "Prayer is valued but is not yet habitual. It may sometimes be good and attentive, but fervor is short-lived. It is usually vocal prayer with intermittent attention or petitions focused on everyday needs and desires." },
        { "domain": "examen", "text": "The examination of conscience is not practised." },
        { "domain": "sacraments", "text": "Mass is attended regularly and confession is sought more frequently. This section does not give an exact interval between confessions." }
      ]
    },
    {
      "name": "Intermittent Piety",
      "family": "purgative",
      "sourceDescription": [
        { "domain": "seriousSin", "text": "Mortal sin is faithfully resisted, and its near occasions are habitually avoided. Recognizing a sin leads to deep regret and penance to make reparation for what was done." },
        { "domain": "venialSin", "text": "Venial sin is sometimes deliberate. The effort to resist it remains weak and sorrow is superficial. Conscience is examined, but without a clear method, preparation, or coherence." },
        { "domain": "suffering", "text": "Difficulties are tolerated, but with complaints and little inner peace." },
        { "domain": "prayer", "text": "Vocal prayer is regular, but commitment to meditation with a set time, place, and material is not yet firm. It is often abandoned as soon as dryness or other business arises." },
        { "domain": "examen", "text": "The examination of conscience is practised intermittently rather than consistently." },
        { "domain": "sacraments", "text": "Mass is attended weekly and confession is sought at least once every three months." }
      ]
    },
    {
      "name": "Sustained Piety",
      "family": "purgative",
      "sourceDescription": [
        { "domain": "seriousSin", "text": "The source describes no mortal sin, or at most an extremely rare fall in a sudden situation, often with doubt about whether it was mortal. A fall is followed by deep remorse and a desire for penance." },
        { "domain": "venialSin", "text": "Venial sin is no longer habitual and is rarely deliberate. It is vigilantly resisted and deeply regretted, though little reparation follows. A consistent particular examen focuses on a specific weakness, chiefly to avoid venial sin." },
        { "domain": "imperfections", "text": "Imperfections are still readily excused or left unexamined to avoid having to fight them. There is a desire to renounce them, but little actual effort." },
        { "domain": "suffering", "text": "Suffering is accepted and endured with relative peace, although the inner struggle remains." },
        { "domain": "prayer", "text": "There is consistent fidelity to a set time and approach to prayer. Vocal prayer accompanies meditation that often becomes a loving conversation with God. Prayer of simplicity may emerge. Consolation and dryness alternate, with dryness still hard to endure; the source also places contemplative aridity here or at the next stage." },
        { "domain": "examen", "text": "The examination of conscience is practised at least once a day, often more than once." },
        { "domain": "sacraments", "text": "Mass is attended weekly and, when possible, daily. Confession follows a regular schedule." }
      ]
    },
    {
      "name": "Fervor",
      "family": "illuminative",
      "sourceDescription": [
        { "domain": "venialSin", "text": "Venial sin is not deliberate. It may occur by surprise or with incomplete awareness, but is deeply regretted and followed by serious efforts at reparation." },
        { "domain": "imperfections", "text": "Imperfections are fought courageously and diligently out of a desire to please God more. Any yielding is immediately regretted. Acts of renunciation are frequent, and a particular examen aims at growth in a specific virtue." },
        { "domain": "prayer", "text": "Vocal and mental prayer are practised consistently and gladly extended. Prayer often becomes a loving conversation with God; the source also mentions prayer of simplicity or prayer of Quiet. Strong consolations alternate with severe trials." },
        { "domain": "examen", "text": "The examination of conscience is practised at least twice daily." },
        { "domain": "suffering", "text": "Suffering is accepted with a clearer understanding of its spiritual benefit, with peace and some joy." },
        { "domain": "sacraments", "text": "Participation in weekly Mass is fervent, and daily Mass is attended when possible. Confession is sought at least monthly. Imperfections are also brought to devotional confession to seek the grace to overcome them." }
      ]
    },
    {
      "name": "Relative Perfection",
      "family": "illuminative",
      "sourceDescription": [
        { "domain": "imperfections", "text": "Imperfections are guarded against energetically, with care and love. They occur only with partial awareness, rather than with fully conscious consent." },
        { "domain": "suffering", "text": "Suffering is accepted joyfully and peacefully. At times, a sacrifice or difficulty is willingly undertaken for the good of others." },
        { "domain": "prayer", "text": "Prayer becomes a habitual way of life, even during everyday work. There is a strong desire for self-renunciation, complete surrender to God, detachment, and divine love, together with a longing for the Eucharist and Heaven. The source mentions different degrees of infused prayer, received as God's gift, and often passive purification: God's purifying work in the soul." }
      ]
    },
    {
      "name": "Heroic Perfection",
      "family": "unitive",
      "sourceDescription": [
        { "domain": "imperfections", "text": "Imperfections remain only as an initial, spontaneous impulse, without deliberate consent to it." },
        { "domain": "suffering", "text": "Suffering is joyfully accepted, and sacrifice is willingly undertaken for the good of others." },
        { "domain": "prayer", "text": "The source describes supernatural graces of contemplation, sometimes accompanied by extraordinary phenomena, and profound passive purifications. In strong ascetical language, it speaks of disregard for self to the point of complete self-forgetfulness and a preference for suffering over joys. This is the text's description, not confirmation of these experiences in the person completing the questionnaire." }
      ]
    },
    {
      "name": "Complete Sanctity",
      "family": "unitive",
      "assessmentNote": "Shown, not assessed",
      "sourceDescription": [],
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
