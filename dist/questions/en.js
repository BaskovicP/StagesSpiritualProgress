(() => {
  "use strict";

  // Display copy is separated from the criterion rules and application behavior.
  window.spiritualQuestions = window.spiritualQuestions || {};
  window.spiritualQuestions.en = Object.freeze([
  {
    "id": "mortal-occasions-v4",
    "kicker": "Avoiding occasions",
    "title": "What do I do about situations that experience tells me lead me toward mortal sin?",
    "example": "Mark knows that certain business partners draw him into serious fraud. He decides in advance not to take part in those deals.",
    "clarification": "This means a concrete situation that really brings you close to grave sin, not every discomfort or temptation. Consider your usual practice over the past eight weeks.",
    "options": [
      "I generally do not avoid them, even when I recognize the danger.",
      "I sometimes avoid them, but often return without safeguards.",
      "I habitually avoid them and take practical precautions.",
      "I have not identified such a situation, or cannot assess this."
    ],
    "expectations": {
      "2": "Habitually avoid known near occasions of mortal sin."
    }
  },
  {
    "id": "mortal-resistance-v4",
    "kicker": "Resisting temptation",
    "title": "When I recognize a temptation to grave sin, how do I resist it?",
    "example": "John is offered money to knowingly defraud someone. The offer attracts him, but he refuses and ends the conversation, even though he loses the money.",
    "clarification": "This concerns your free response and resistance, not the strength of the temptation. Temptation itself is not sin.",
    "options": [
      "I usually give up resisting quickly.",
      "I try to resist, but my resistance is often weak.",
      "I resist firmly and take the steps needed not to consent.",
      "I did not recognize such a temptation during this period."
    ],
    "expectations": {
      "2": "Resist recognized temptations to grave sin firmly and faithfully."
    }
  },
  {
    "id": "mortal-fall-v4",
    "kicker": "A knowing and free act",
    "title": "In the past eight weeks, did I do something I then knew was gravely sinful and freely chose to do?",
    "example": "Luke knows that false testimony would seriously harm an innocent person. He nevertheless knowingly and freely chooses to lie. The question concerns the act he consented to, not a thought that occurred to him.",
    "clarification": "Mortal sin requires grave matter, full knowledge, and deliberate consent together. If you are unsure, do not guess or pronounce judgment on yourself; choose uncertainty and speak with a confessor.",
    "options": [
      "Yes, more than once.",
      "Yes, once.",
      "I am not sure whether all those conditions were present.",
      "No, I do not recognize such a knowing and free act."
    ],
    "expectations": {
      "3": "Recognize no knowing, freely chosen mortal sin in the period considered; uncertainty calls for discernment, not an automatic higher assessment."
    }
  },
  {
    "id": "mortal-response-v4",
    "kicker": "Responding after a fall",
    "title": "If such a grave fall occurred, what did I actually do afterward?",
    "example": "Mark knowingly took part in serious fraud. He sincerely repented, confessed honestly, completed his penance, and took the steps he could to return the money unjustly taken.",
    "clarification": "Answer about a real event, not what you imagine you would do. Reparation should be prudent and possible; discuss sensitive situations with a confessor. Not yet having access to confession is different from refusing it.",
    "options": [
      "I did not seriously repent or make an honest confession.",
      "I seriously repented and confessed honestly, but went no further in penance and reparation.",
      "I deeply repented, confessed honestly, completed my penance, and reasonably sought to repair the harm.",
      "No such fall occurred during this period.",
      "I want to confess but have not yet been able to, or cannot assess this."
    ],
    "expectations": {
      "1": "After an actual grave fall, seriously repent and make an honest confession.",
      "2": "After an actual grave fall, deeply repent and, alongside confession, do penance and reasonably seek to repair the harm."
    }
  },
  {
    "id": "venial-occurrence-v4",
    "kicker": "Deliberate venial sin",
    "title": "How did venial sins occur in my life over the past eight weeks?",
    "example": "Peter knows that a spiteful remark is wrong. On one occasion, he deliberately says it to hurt a friend. On another, words slip out before he considers them. Distinguish deliberate consent from an unconsidered reaction.",
    "clarification": "For the fourth stage, the source says venial sin is never deliberate—not merely rarely deliberate. An unwanted thought or temptation alone is not consent. If you are unsure whether something was sinful, choose uncertainty.",
    "options": [
      "Recognized venial sins recur as an established habit, even when I have not decided beforehand to sin.",
      "I sometimes knowingly consent; it is not merely a rare exception.",
      "Venial sins are not an established habit; knowing consent was only a rare exception.",
      "I recognize only occasional unconsidered or partly aware falls, without an established habit or deliberate consent.",
      "I did not recognize any venial sin during this period.",
      "I cannot distinguish or assess this clearly enough."
    ],
    "expectations": {
      "3": "Venial sin is not habitual, and deliberate consent is at most a rare exception.",
      "4": "There is no recognized deliberate consent to venial sin; 'rarely deliberate' is not the same as 'never deliberate'."
    }
  },
  {
    "id": "venial-vigilance-v4",
    "kicker": "Watchfulness in small choices",
    "title": "How do I respond to a venial sin that I can recognize and avoid?",
    "example": "Anna notices that she often belittles a colleague in conversation. She starts watching for that moment and stops before making the unkind remark, instead of saying, 'It is only a small thing.'",
    "clarification": "Watchfulness does not mean constantly searching yourself in fear. This asks about calmly recognizing a concrete wrong and actually trying to avoid it.",
    "options": [
      "I generally consider it too small to bother with.",
      "I want to avoid it, but my effort is weak or occasional.",
      "I regularly watch for recognized venial sins and take practical steps against them."
    ],
    "expectations": {
      "2": "Make at least some actual effort against recognized venial sin, even if resistance is still weak.",
      "3": "Be watchful in avoiding recognized venial sins and genuinely struggle against them."
    }
  },
  {
    "id": "venial-regret-v4",
    "kicker": "Sorrow for venial sin",
    "title": "When I recognize that I have committed a venial sin, how do I repent?",
    "example": "Luke realizes that he unfairly snapped at his brother. He is not sorry merely because he looked unpleasant: before God, he honestly acknowledges the wrong and wants to leave it behind.",
    "clarification": "Deep sorrow need not mean intense feelings, tears, or self-contempt. It means a serious inner decision to reject the sin because it is contrary to love of God and neighbor.",
    "options": [
      "I generally move on without regret.",
      "I feel a little sorry, but do not seriously resolve to change.",
      "I sincerely and seriously repent and want to reject that sin.",
      "I did not recognize any venial sin during this period."
    ],
    "expectations": {
      "2": "Have at least some regret for recognized venial sin, even if still superficial.",
      "3": "Repent sincerely and seriously for recognized venial sin, rather than regretting it only superficially."
    }
  },
  {
    "id": "venial-reparation-v4",
    "kicker": "Making reparation",
    "title": "After a venial sin, what do I actually do to repair what I can?",
    "example": "Peter humiliated a friend in front of others. He apologizes and corrects his unfair statement before the same people. He takes a practical step as well as repenting.",
    "clarification": "Serious reparation does not mean punishing yourself or imprudently disclosing private matters. It means genuine, proportionate repair: for example, an apology, correcting a falsehood, or prudent penance. Not every form of repair is possible in every situation.",
    "options": [
      "I generally stop at feeling sorry.",
      "I sometimes repair something, but my effort is small or inconsistent.",
      "I seriously seek the reasonable, practical reparation that is possible.",
      "I did not recognize any venial sin during this period."
    ],
    "expectations": {
      "4": "Alongside repentance, make serious, reasonable, concrete reparation for recognized venial sins."
    }
  },
  {
    "id": "imperfections-watch-v4",
    "kicker": "Recognizing attachment",
    "title": "What do I do when I recognize an imperfection that I easily excuse?",
    "example": "Luke notices that he becomes upset whenever his family changes his plan. Instead of saying, 'That is just how I am,' he acknowledges how attached he is to having his own way and starts watching that attachment.",
    "clarification": "An imperfection here is not every personal limitation, illness, or involuntary feeling. One example is an excessive attachment to comfort, praise, or your own way that limits a free response of love.",
    "options": [
      "I prefer not to examine it, or generally excuse it.",
      "I acknowledge it, but usually do little beyond wishing to change.",
      "I watch for it, do not excuse it, and genuinely work against it."
    ],
    "expectations": {
      "4": "Do not excuse recognized imperfections; watch for them and struggle firmly against them."
    }
  },
  {
    "id": "imperfections-virtue-v4",
    "kicker": "Practicing a virtue",
    "title": "Do I turn my struggle with imperfections into regular practice of a specific virtue out of love for God?",
    "example": "Mary wants to stop insisting on having the last word. Out of love for God, she practices humility: she hears her husband out and accepts his good suggestion, even though it was not hers.",
    "clarification": "Merely wanting to become a better person is not enough here. This means repeated, concrete choices that practice a virtue such as patience, humility, or generosity. It does not require never falling.",
    "options": [
      "I do not have such a practical habit.",
      "I try occasionally, but without regular, sustained effort.",
      "I regularly and persistently practice a specific virtue, seeking to please God."
    ],
    "expectations": {
      "4": "Practice a specific virtue courageously and diligently out of greater love for God."
    }
  },
  {
    "id": "imperfections-renunciation-v4",
    "kicker": "Frequent small renunciations",
    "title": "How present is actual, voluntary renunciation of things to which I am excessively attached?",
    "example": "Peter has enough time to rest but finds it hard to put his phone down. He regularly sets it aside to talk calmly with his family, even though he would rather keep watching.",
    "clarification": "This means frequent small acts of freedom from attachment, not harmful deprivation of sleep, food, treatment, or needed rest. Planning a renunciation is not the same as carrying it out.",
    "options": [
      "I mostly think about it but do not act.",
      "I make an occasional renunciation, but rarely.",
      "I frequently make concrete, prudent renunciations of my attachments."
    ],
    "expectations": {
      "4": "Frequently make concrete, prudent acts of renunciation of recognized attachments."
    }
  },
  {
    "id": "imperfections-prompt-regret-v4",
    "kicker": "Returning promptly",
    "title": "If I do consent to a recognized imperfection, what do I do as soon as I notice?",
    "example": "Anna notices that she is deliberately extending a story just to receive more praise. As soon as she realizes this, she regrets the attachment and stops drawing attention to herself instead of continuing to seek admiration.",
    "clarification": "This question starts when you recognize something and consent to it. A first involuntary impulse is not the same as free acceptance. 'Promptly' means not knowingly excusing continued consent after recognizing it.",
    "options": [
      "I continue and excuse it, even though I have recognized the attachment.",
      "I regret it later; at the time I generally continue.",
      "As soon as I recognize my consent, I regret it and try to turn back immediately.",
      "I did not recognize such consent during this period."
    ],
    "expectations": {
      "4": "If an imperfection is freely accepted, regret it promptly when recognized and seek to turn back."
    }
  },
  {
    "id": "suffering-endure-v4",
    "kicker": "Staying with what is needed",
    "title": "How did I respond to real difficulties that I could not reasonably avoid?",
    "example": "John needs to accompany his sick father to an appointment. He is tired and finds the waiting difficult, but does not abandon his father merely because it is uncomfortable.",
    "clarification": "This means an unavoidable difficulty or responsible sacrifice, not enduring abuse or refusing help. Seeking treatment, protection, and needed rest is not avoidance of the cross.",
    "options": [
      "Because of the discomfort itself, I generally try to escape even what I need to do.",
      "I endure and do what is needed, although I complain and find acceptance difficult.",
      "I accept what I cannot change and persevere in what needs doing.",
      "There was no such real difficulty during this period."
    ],
    "expectations": {
      "2": "Endure unavoidable difficulties and persevere in responsibilities, even with complaints or little peace."
    }
  },
  {
    "id": "suffering-peace-v4",
    "kicker": "Peace in difficulty",
    "title": "While going through such a difficulty, how much acceptance and inner peace was present?",
    "example": "Anna is waiting for an important medical result. She feels afraid and sometimes cries, but returns to trust in God and calmly does what she can that day.",
    "clarification": "Relative peace does not mean an absence of sadness, fear, or pain. This asks whether real acceptance and trust are present amid the struggle. Physical or mental health difficulties are not proof of weaker faith.",
    "options": [
      "I generally lost all peace and resisted the situation.",
      "I endured it, but with very little peace and much complaining.",
      "I accepted it with relative peace, although I still struggled.",
      "There was no such real difficulty during this period."
    ],
    "expectations": {
      "3": "Accept and endure real difficulty with relative peace, although an inner struggle remains."
    }
  },
  {
    "id": "suffering-meaning-joy-v4",
    "kicker": "Meaning, peace, and some joy",
    "title": "In a real difficulty, was there a clear sense of meaning, peace, and at least some joy in still being able to love God and others?",
    "example": "Mary is temporarily caring for her sick sister. The work is hard, and she is not glad her sister is ill. Yet she sees the value of that care, accepts it peacefully, and finds quiet joy in being able to love in a practical way.",
    "clarification": "This does not ask whether you enjoy pain, illness, or another person's misfortune. The source describes accepting difficulty with a clear understanding of the good God can bring from it, some joy, and peace—not simply enduring it.",
    "options": [
      "I generally only wanted the difficulty to end and did not recognize such meaning.",
      "I could believe there was good, but accepting it with peace and joy was not my actual practice.",
      "I clearly recognized the good that could come from it and accepted the difficulty with peace and some joy.",
      "There was no such real difficulty during this period."
    ],
    "expectations": {
      "4": "Accept real difficulty with a clear understanding of possible good, peace, and at least some joy."
    }
  },
  {
    "id": "prayer-vocal-v4",
    "kicker": "Regular vocal prayer",
    "title": "How present is vocal prayer in my actual life?",
    "example": "Luke says the Our Father in the evening or addresses God in his own words. He does not do this only when a problem arises, but as part of his regular relationship with God.",
    "clarification": "Vocal prayer includes familiar prayers and speaking to God in your own words; it can be said silently. It is not less valuable because it uses words. For this questionnaire, the source's 'constantly practiced' is checked through stable daily practice; the source does not prescribe a number of minutes. If illness or genuine incapacity prevented the practice and makes this period unassessable, skip. This remains unknown, not deliberate neglect.",
    "options": [
      "I hardly pray and have no actual practice of prayer.",
      "I pray occasionally, and prayer still matters to me.",
      "Vocal prayer is a regular part of my life, but not a daily one.",
      "Vocal prayer is a stable part of every day of my life."
    ],
    "expectations": {
      "1": "Value prayer at least to some extent and actually pray, even occasionally.",
      "2": "Practice vocal prayer regularly.",
      "4": "Continually cultivate vocal prayer; this questionnaire checks that as stable daily practice."
    }
  },
  {
    "id": "prayer-meditation-v4",
    "kicker": "A set time for meditation",
    "title": "Do I have an established time and approach to personal prayer that includes meditation?",
    "example": "Anna sets aside time to pray in the morning. She reads a Gospel passage, reflects on it, and speaks to God about what she has understood. She keeps that time even when she feels less inclined to pray.",
    "clarification": "Meditation means prayerfully considering the Gospel, a truth of faith, or a spiritual text and responding to God. No exact duration is required. A genuine necessity may alter your schedule; ordinary reluctance is not the same as necessity.",
    "options": [
      "I have no set time or actual practice of meditation.",
      "I sometimes meditate, but the time and approach are not yet stable.",
      "I faithfully maintain a set time and approach to prayer that includes meditation."
    ],
    "expectations": {
      "3": "Be consistently faithful to a set time and approach to prayer that includes meditation."
    }
  },
  {
    "id": "prayer-dryness-v4",
    "kicker": "Faithfulness without pleasant feelings",
    "title": "What do I do with my planned prayer time when there is no pleasant feeling or consolation?",
    "example": "John sits down to pray, but everything feels dry and his thoughts wander. He does not conclude that prayer is useless. He calmly returns to God and stays for the time he had set aside.",
    "clarification": "Dryness itself is not evidence of a higher stage, and this does not identify a 'dark night.' This asks only about faithfulness to actual prayer without pleasant feelings. Illness or an urgent duty is not a failure in prayer.",
    "options": [
      "I usually shorten or abandon prayer precisely because there is no consolation.",
      "I sometimes remain, but often give up because of the dryness.",
      "I remain faithful to the prayer I planned, even when it is dry and difficult.",
      "I have an established prayer practice but did not experience such dryness during this period."
    ],
    "expectations": {
      "3": "Remain faithful to prayer through actual dryness instead of abandoning it for lack of consolation."
    }
  },
  {
    "id": "prayer-prolong-v4",
    "kicker": "Gladly remaining in prayer",
    "title": "When my responsibilities genuinely allow it, how do I respond to extending prayer?",
    "example": "Mary has finished her responsibilities and has some free time left. After her regular prayer, she gladly remains a little longer with God, without hurrying to finish.",
    "clarification": "This does not require extending prayer at the expense of family, work, sleep, or health. It asks about an actual, repeated willingness to stay gladly in prayer when reasonably possible, not merely a good intention.",
    "options": [
      "I generally want to finish as soon as possible, even when I could stay.",
      "I generally keep only my usual time; extending it is rare.",
      "I gladly extend prayer in practice when my actual responsibilities allow it."
    ],
    "expectations": {
      "4": "Continually cultivate prayer and gladly prolong it when responsibilities and health reasonably allow."
    }
  },
  {
    "id": "prayer-loving-response-v4",
    "kicker": "A personal response to God",
    "title": "Does my meditation often become a personal response of love, trust, or self-giving to God?",
    "example": "Anna meditates on how Jesus forgives. Then she stops merely thinking about the text and simply tells him, 'Thank you. I love you. Help me to forgive too.'",
    "clarification": "This is the simple meaning of affective prayer: the will personally turns to God in love. It does not require intense feelings, unusual experiences, prayer of Quiet, or an ability to identify contemplative graces.",
    "options": [
      "My prayer generally remains at words or reflection without such a personal response.",
      "Such a personal response occurs sometimes, but not often.",
      "My meditation often naturally becomes a personal response of love, trust, or self-giving to God."
    ],
    "expectations": {
      "3": "Meditation often becomes a personal response of love, trust, or self-giving to God; intense feelings are not required.",
      "4": "Prayer often becomes a personal response of love to God rather than reflection alone; special feelings are not required."
    }
  },
  {
    "id": "examen-frequency-v4",
    "kicker": "Actual frequency of examen",
    "title": "How often did I actually practice an examination of conscience over the past eight weeks?",
    "example": "John briefly reviews his day before God each evening. If he does this both at midday and in the evening, those are two separate examinations—not two questions within one evening review.",
    "clarification": "Examen is an intentional, prayerful review of concrete choices, gratitude, failings, and a next step. 'Every day' is not the same as 'most days.' If your practice had gaps, choose the description that honestly reflects them. If illness or genuine incapacity prevented the practice and makes this period unassessable, skip. This remains unknown, not deliberate neglect.",
    "options": [
      "I do not practice an examination of conscience.",
      "I practice it occasionally or most days, but not every day.",
      "I practice it at least once every day, but not at least twice every day.",
      "I practice it at least twice every day."
    ],
    "expectations": {
      "2": "Actually practice an examination of conscience at least intermittently.",
      "3": "Practice an examination of conscience at least once every day.",
      "4": "Practice an examination of conscience at least twice every day."
    }
  },
  {
    "id": "examen-method-v4",
    "kicker": "A concrete, orderly review",
    "title": "What is my examination of conscience like when I practice it?",
    "example": "Peter does not stop at saying, 'The day was so-so.' Before God, he recalls a particular conversation, recognizes how he acted, and decides what to do differently tomorrow.",
    "clarification": "No single compulsory method is required, and you need not find a fault at any cost. The review should be sufficiently orderly and concrete to recognize your actions and your response to God.",
    "options": [
      "It generally remains a vague impression of the day.",
      "I recall an occasional event, but the review has no stable approach or clear conclusion.",
      "I have a stable way of reviewing concrete choices, repenting where needed, and identifying a clear next step."
    ],
    "expectations": {
      "3": "Practice examen consistently and concretely, with a recognizable approach to review and response."
    }
  },
  {
    "id": "examen-particular-v4",
    "kicker": "A particular focus in examen",
    "title": "Do I follow one concrete difficulty or virtue in my examen over several days?",
    "example": "Mary regularly reviews her patience. She asks not only whether she snapped today, but also whether she deliberately listened to others and practiced a patient response.",
    "clarification": "A particular examen has a specific focus. The source distinguishes consistent review aimed at avoiding venial sin from review aimed at growth in a particular virtue.",
    "options": [
      "I have no particular focus that I follow regularly.",
      "I sometimes return to the same difficulty, but without consistent review.",
      "I consistently follow a concrete difficulty in order to avoid a particular venial sin.",
      "I consistently review active practice of a particular virtue, not only avoidance of a fault."
    ],
    "expectations": {
      "3": "Consistently practice a particular examen aimed at avoiding a specific venial sin.",
      "4": "Direct the particular examen toward growth in a specific virtue, not only avoidance of sin."
    }
  },
  {
    "id": "sacraments-weekly-mass-v4",
    "kicker": "Sunday Mass",
    "title": "How do I actually take part in Sunday Mass when I have a reasonable opportunity?",
    "example": "Mary is traveling for the weekend. She finds a Mass in advance and attends. On another occasion she stays home because of illness; that obstacle is not the same as freely choosing not to go.",
    "clarification": "Take account of illness, caring for others, work duties you cannot change, and real access to Mass. This question does not pronounce guilt for an individual absence.",
    "options": [
      "Mass is not a regular part of my life, even though I can attend.",
      "I attend regularly, but miss some Sundays even when I could attend.",
      "I attend every Sunday when I genuinely can.",
      "I had no genuine opportunity to attend during this period, or cannot assess this."
    ],
    "expectations": {
      "1": "Attend Mass regularly when it is available.",
      "2": "Attend Sunday Mass every week when there is a genuine opportunity."
    }
  },
  {
    "id": "sacraments-daily-mass-v4",
    "kicker": "Mass during the week",
    "title": "Do I attend Mass on other days too when it is genuinely possible?",
    "example": "Peter has a nearby Mass before work and can attend without neglecting sleep or family. He regularly uses that opportunity. Anna has no such opportunity because she cares for a child; that alone is not a lack of faithfulness.",
    "clarification": "The source says daily Mass 'if able.' An empty calendar slot alone does not decide ability: consider travel, health, and the duties of your state in life. Inability is different from refusal.",
    "options": [
      "I have genuine opportunities but generally do not use them.",
      "I use an occasional opportunity but often pass up others without a real obstacle.",
      "I attend daily Mass on the days when it is reasonably possible.",
      "My circumstances did not allow daily Mass during this period."
    ],
    "expectations": {
      "3": "Alongside Sunday Mass, attend daily Mass when actual circumstances allow."
    }
  },
  {
    "id": "sacraments-confession-schedule-v4",
    "kicker": "Actual practice of confession",
    "title": "Which description best matches my current, established practice of confession?",
    "example": "John does not merely say that he intends to confess more often. He looks at what has actually happened over recent months: whether he keeps a regular schedule and how long usually passes between confessions.",
    "clarification": "Here consider your current practice over the past several months, not only eight weeks. One recent confession does not by itself establish a monthly schedule. The source distinguishes at least quarterly confession, a regular schedule, and at least monthly confession.",
    "options": [
      "I do not go to confession or seek to do so.",
      "I go to confession, but the gaps are usually longer than three months.",
      "I confess at least every three months, but without a stable schedule.",
      "I keep a regular schedule, at least every three months but not at least monthly.",
      "I keep a regular schedule, at least once a month.",
      "Confession is unavailable to me, or my practice is not yet established enough to assess this."
    ],
    "expectations": {
      "1": "Actually go to confession, rather than only having an unfulfilled intention.",
      "2": "Go to confession at least every three months.",
      "3": "Go to confession on a stable schedule; the at-least-quarterly practice is inherited.",
      "4": "Go to confession on a stable schedule at least once a month."
    }
  },
  {
    "id": "sacraments-devotional-confession-v4",
    "kicker": "Confession for growth",
    "title": "Do I also bring recognized imperfections to confession, seeking grace to overcome them?",
    "example": "Mary has no recognized mortal sin to confess. She still goes to her regular confession, confesses her sins, and mentions the attachment to praise with which she is struggling, seeking grace and guidance for growth.",
    "clarification": "Not every imperfection is a sin, and you should not invent guilt. The source describes devotional confession for growth, respecting what is actually confessed in the sacrament. Discuss appropriate content with your confessor.",
    "options": [
      "I generally seek confession only when I recognize mortal sin.",
      "I also confess venial sins, but bringing recognized imperfections is not yet my actual practice.",
      "In regular confession, I also bring recognized imperfections, seeking grace to overcome them.",
      "Confession is unavailable to me, or I cannot assess this."
    ],
    "expectations": {
      "4": "Bring recognized imperfections to devotional confession to seek grace for overcoming them, without inventing sins."
    }
  },
  {
    "id": "sacraments-fervent-participation-v4",
    "kicker": "How I participate in Mass",
    "title": "What is my usual inward participation in Mass like?",
    "example": "Luke arrives tired and without any special feeling. He nevertheless listens deliberately, brings his attention back when it wanders, and joins in the prayer and Christ's offering instead of simply waiting for the end.",
    "clarification": "Fervent participation is not emotional excitement or a complete absence of distraction. It means a real, sustained intention to participate with faith and love, returning your attention as you are able.",
    "options": [
      "I am generally only present and do not try to participate inwardly.",
      "I sometimes engage deliberately, but often remain merely outwardly present.",
      "I consistently seek to participate with faith, attention, and love, returning when I wander."
    ],
    "expectations": {
      "4": "Participate in Mass consistently and fervently with faith and love, rather than only being physically present."
    }
  }
]);
})();
