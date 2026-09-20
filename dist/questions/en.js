(() => {
  "use strict";

  // Display copy is separated from the criterion rules and application behavior.
  window.spiritualQuestions = window.spiritualQuestions || {};
  window.spiritualQuestions.en = Object.freeze([
  {
    "id": "mortal-occasions-v4",
    "kicker": "Avoiding occasions",
    "title": "How do I respond to known proximate occasions of mortal sin?",
    "example": "Mark knows that certain business partners draw him into serious fraud. He decides in advance not to take part in those deals.",
    "clarification": "Think of a specific situation posing a serious danger of falling for you, not every temptation or disturbing thought. Proximate and remote occasions differ in danger in your circumstances, not simply in how quickly sin might follow. If you cannot reasonably avoid a situation, allow for safeguards and seek advice. Consider your actual practice over the past eight weeks.",
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
    "id": "mortal-pattern-v6",
    "kicker": "From weak to steady resistance",
    "title": "Which description best fits my struggle against recognized mortal sin?",
    "example": "Mark knows certain business deals lead him into serious fraud. At first he puts up little resistance; later he refuses such deals. In time this becomes steady and he no longer recognizes a deliberate, freely chosen grave fall. Choose what fits you now, not the end of Mark’s story.",
    "clarification": "Consider the past eight weeks and your free choices, not the intensity of temptation. Resistance to sin remains part of every way. Mortal sin requires grave matter, full knowledge and free consent. At III the original source also mentions a rare, unexpected event whose gravity is doubtful: doubt counts here as neither a confirmed fall nor proof of a higher stage. Discuss it with a confessor.",
    "optionHeadings": [
      "Weak resistance",
      "Steady resistance",
      "Steady resistance, no recognized fall",
      "Unsure"
    ],
    "options": [
      "I want to avoid sin, but my resistance is weak and I rarely avoid known dangerous situations.",
      "I usually resist firmly and avoid known occasions, but there have still been recognized deliberate and freely chosen grave falls.",
      "I usually resist firmly and avoid known occasions. In this period I recognize no deliberate, freely chosen consent to mortal sin.",
      "I cannot assess my resistance, or I am unsure whether an event was mortal sin."
    ],
    "expectations": {
      "1": "Recognize my actual response to temptation; repentance and confession are checked separately.",
      "2": "Resist steadily and habitually avoid known near occasions of mortal sin.",
      "3": "Alongside steady resistance, recognize no deliberate, freely chosen grave fall; leave doubts to discernment."
    },
    "contextSources": [
      "three-ways.md: The purgative way",
      "three-ways.md: Directions (1)"
    ]
  },
  {
    "id": "mortal-fall-v4",
    "kicker": "A knowing and free act",
    "title": "In the past eight weeks, did I do something I then knew was gravely sinful and freely chose to do?",
    "example": "Luke knows that false testimony would seriously harm an innocent person. He nevertheless knowingly and freely chooses to lie. The question concerns the act he consented to, not a thought that occurred to him.",
    "clarification": "Mortal sin requires grave matter, full knowledge and free consent together. Unwanted thoughts or temptations, even disturbing and recurring ones, are not the same as free consent. If unsure, do not guess or pass judgment on yourself; choose uncertainty and discuss it with a confessor.",
    "options": [
      "Yes, more than once.",
      "Yes, once.",
      "I am not sure whether all those conditions were present.",
      "No, I do not recognize such a knowing and free act."
    ],
    "expectations": {
      "3": "Recognize no knowing, freely chosen mortal sin in the period considered; uncertainty calls for discernment, not an automatic higher assessment."
    },
    "contextSources": [
      "three-ways.md: Desolation"
    ]
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
    "id": "venial-pattern-v6",
    "kicker": "How I struggle against venial sin",
    "title": "How do I usually respond to venial sins that I recognize?",
    "example": "Anna tends to make cutting remarks to a colleague. She might say “it is nothing,” try to stop but often give in, or watch her words beforehand. If she does hurt her colleague, it also matters whether she sincerely regrets it and tries to repair the harm.",
    "clarification": "Choose the whole description that usually fitted the past eight weeks. Rarely deliberate is not the same as never deliberate. An unwanted thought is not consent, and sincere repentance is not measured by the intensity of guilt.",
    "optionHeadings": [
      "I dismiss it",
      "I struggle weakly",
      "I struggle vigilantly",
      "No deliberate consent; repair",
      "Unsure"
    ],
    "options": [
      "I often tell myself it does not matter and do little to change.",
      "I know it is wrong and try to struggle, but often give in; regret usually remains superficial.",
      "I vigilantly try to avoid venial sin. It is not habitual, is rarely deliberate, and I sincerely repent, but often do little to repair the harm.",
      "I recognize no deliberate consent to venial sin. If a fault happens unexpectedly or with incomplete awareness, I seriously repent and reasonably repair the harm.",
      "I cannot reliably choose a description."
    ],
    "expectations": {
      "1": "Recognize my actual attitude to venial sin, including any tendency to dismiss it.",
      "2": "At least attempt to struggle against venial sin rather than treating it as unimportant.",
      "3": "Struggle vigilantly against non-habitual, rarely deliberate venial sin, with sincere repentance.",
      "4": "Give no deliberate consent to venial sin and, after an actual fault, seriously repent and reasonably repair the harm."
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
    "id": "imperfections-pattern-v6",
    "kicker": "From excuses to the first impulse",
    "title": "When I notice an imperfection, how much room do I knowingly give it?",
    "example": "Peter wants everyone to notice his help. He may excuse that need for praise, deliberately resist it, or realize afterwards that he sought recognition with only partial awareness. The first brief impulse “I want praise” differs from choosing to keep feeding it.",
    "clarification": "This concerns a recognized attachment that diminishes love, not every feeling or temptation. Consider your usual pattern over eight weeks. The original source starts here at III, with no separate I–II descriptions. The aim is not to have no inner struggle, but to love God and others more freely. The last description does not establish sanctity or mean there is no further room to grow.",
    "optionHeadings": [
      "Excuses, little change",
      "A real struggle from love",
      "Faults with partial awareness",
      "Only the first impulse",
      "Unsure"
    ],
    "options": [
      "I see what I could change but often excuse or postpone it; I make little actual effort.",
      "I watch and struggle out of love for God. Sometimes I still knowingly give in, but immediately regret it and return to the good.",
      "I struggle carefully and lovingly. Recognized faults occur only with partial awareness, not with knowing acceptance.",
      "I recognize only the first spontaneous impulse: I do not knowingly keep feeding it or act on it.",
      "I cannot distinguish these descriptions in my experience."
    ],
    "expectations": {
      "3": "Recognize my response to imperfections; here the source allows excuses and little actual effort.",
      "4": "Watch and genuinely struggle against imperfections out of love, immediately regretting any knowing acceptance.",
      "5": "Alongside careful, loving vigilance, recognize faults only with partial awareness, not deliberate consent.",
      "6": "Recognize only the first spontaneous impulse, without knowingly feeding it or acting on it."
    },
    "contextSources": [
      "three-ways.md: The unitive way",
      "three-ways.md: Directions (1)"
    ]
  },
  {
    "id": "imperfections-virtue-v4",
    "kicker": "Practicing a virtue",
    "title": "Do I regularly practise a particular virtue to love God and others more?",
    "example": "Mary asks God for patience. When her husband speaks, she does not interrupt to prove herself right; she listens to the end. She repeats that small choice over the following days.",
    "clarification": "This asks about repeated practice, not only wanting to be a better person. A virtue takes concrete form, such as patient listening, honesty or generosity. Spiritual growth involves God's grace and our response, not a competition in self-improvement. It does not require the absence of every fall.",
    "options": [
      "I do not have such a practical habit.",
      "I try occasionally, but without regular, sustained effort.",
      "I regularly and persistently practice a specific virtue, seeking to please God."
    ],
    "expectations": {
      "4": "Practice a specific virtue courageously and diligently out of greater love for God."
    },
    "contextSources": [
      "three-ways.md: Division of the states or ways",
      "three-ways.md: The illuminative way"
    ]
  },
  {
    "id": "imperfections-renunciation-v4",
    "kicker": "Frequent small renunciations",
    "title": "How present is actual, voluntary renunciation of things to which I am excessively attached?",
    "example": "Peter has enough time to rest but finds it hard to put his phone down. He regularly sets it aside to talk calmly with his family, even though he would rather keep watching.",
    "clarification": "This means frequent small acts of freedom from an attachment that interferes with love and duties. Healthy recreation and enjoyment of good things are not themselves attachments. Do not deprive yourself of sleep, food, treatment or necessary rest. Planning self-denial is not the same as actually practising it.",
    "options": [
      "I mostly think about it but do not act.",
      "I make an occasional renunciation, but rarely.",
      "I frequently make concrete, prudent renunciations of my attachments."
    ],
    "expectations": {
      "4": "Frequently make concrete, prudent acts of renunciation of recognized attachments."
    },
    "contextSources": [
      "three-ways.md: The purgative way",
      "three-ways.md: The illuminative way"
    ]
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
    "id": "suffering-pattern-v6",
    "kicker": "My response to a real difficulty",
    "title": "What best describes my usual response to a difficulty I could not avoid?",
    "example": "Mary’s plans fall apart just when a family member needs her help. She might evade the responsibility, help while complaining, or accept the effort despite an inner struggle. In time she may find meaning, peace and quiet joy in doing good.",
    "clarification": "Answer about actual difficulties over eight weeks. Peace and quiet joy can coexist with sadness and distress; pleasant feelings or a smile are not required. A lack of consolation is not itself evidence of spiritual regression. Acceptance does not mean tolerating abuse, creating suffering or refusing help. V–VI share an overview here; steadiness in service is checked separately.",
    "optionHeadings": [
      "Avoidance and lost peace",
      "Endurance with complaints",
      "Acceptance amid struggle",
      "Meaning, peace and some joy",
      "Joyful acceptance and service",
      "No opportunity / unsure"
    ],
    "options": [
      "I try to escape the difficulty, and when I cannot, it completely disrupts my peace.",
      "I bear what I must, but mainly with complaints and little peace.",
      "I accept it with relative peace, although it is hard and I still struggle inwardly.",
      "I accept it, recognize possible good, and find peace and some quiet joy.",
      "I habitually accept it with peace and quiet joy, and freely accept reasonable effort for others’ good.",
      "I had no comparable difficulty or cannot assess this."
    ],
    "expectations": {
      "1": "Reflect on an actual difficulty, including any avoidance or loss of peace.",
      "2": "Endure an actual difficulty, even with complaints and little peace.",
      "3": "Accept difficulty with relative peace despite an inner struggle.",
      "4": "Accept difficulty with an understanding of possible good, peace and some joy.",
      "5": "Habitually accept existing difficulty with peace and quiet joy, and reasonable effort for others."
    },
    "contextSources": [
      "three-ways.md: The illuminative way",
      "three-ways.md: Consolation",
      "three-ways.md: Desolation"
    ]
  },
  {
    "id": "suffering-meaning-joy-v4",
    "kicker": "Meaning, peace, and some joy",
    "title": "In real difficulty, did I recognize good and accept it with peace and at least quiet joy in being able to love?",
    "example": "Mary cares for her ill sister. She cries and wants her sister to recover. Yet she does not see the care as pointless: she recognizes its good and a quiet joy that her sister is not alone. This does not erase her pain.",
    "clarification": "This does not ask whether you enjoy pain or another person's misfortune. The original source describes acceptance with an understanding of good, peace and some joy. Deeper trust can coexist with painful feelings. Wanting relief and seeking help do not contradict acceptance. Do not assume peace or joy if you do not recognize them.",
    "options": [
      "I generally only wanted the difficulty to end and did not recognize such meaning.",
      "I could believe there was good, but accepting it with peace and joy was not my actual practice.",
      "I clearly recognized the good that could come from it and accepted the difficulty with peace and some joy.",
      "There was no such real difficulty during this period."
    ],
    "expectations": {
      "4": "Accept real difficulty with a clear understanding of possible good, peace, and at least some joy."
    },
    "contextSources": [
      "three-ways.md: The illuminative way",
      "three-ways.md: Consolation",
      "three-ways.md: Desolation"
    ]
  },
  {
    "id": "prayer-pattern-v6",
    "kicker": "From occasional prayer to a life of prayer",
    "title": "Which description best fits my actual prayer practice?",
    "example": "John initially prays only when he needs something. Later he establishes regular prayer, then time for the Gospel and a personal response to God even without pleasant feelings. Gradually that relationship also enters his work and relationships. You need not be at the end of this story.",
    "clarification": "Consider your usual practice over eight weeks. Meditation involves your own prayerful reflection and response to God, not just pages read. Interior prayer is broader than meditation; vocal prayer can also be deeply personal. Comfort and dryness alone do not determine a stage. Allow for illness and duties. These questions consider habits and fruits, not mystical gifts.",
    "optionHeadings": [
      "No practice yet",
      "Occasional prayer",
      "Regular vocal prayer",
      "Steady meditation",
      "Persevering, gladly prolonged prayer",
      "Prayer throughout daily life",
      "Unsure"
    ],
    "options": [
      "I have hardly prayed at all in this period.",
      "I pray occasionally, often when I need something; I have no established practice yet.",
      "I regularly pray in words but readily abandon meditation when consolation is absent or I have other business.",
      "I steadily pray in words and meditate at an appointed time; I continue in dryness even when it is hard.",
      "I steadily practise vocal and mental prayer, continue in dryness, and gladly extend prayer when duties allow.",
      "Alongside that steady practice, my relationship with God habitually permeates work and relationships, orienting me toward love and detachment.",
      "I cannot reliably choose a description."
    ],
    "expectations": {
      "1": "Actually pray at least occasionally and value prayer.",
      "2": "Have a regular practice of vocal prayer.",
      "3": "Maintain steady vocal prayer and meditation, persevering through dryness.",
      "4": "Practise vocal and mental prayer steadily and gladly prolong it when duties allow.",
      "5": "Alongside steady prayer, live a relationship with God during work, with a practical orientation toward love and detachment."
    },
    "contextSources": [
      "three-ways.md: The illuminative way",
      "three-ways.md: Spiritual states of consolation and desolation",
      "three-ways.md: Directions (3)"
    ]
  },
  {
    "id": "prayer-meditation-v4",
    "kicker": "A set time for meditation",
    "title": "Do I have an established time and approach to personal prayer that includes my own meditation?",
    "example": "Anna reads a short, prepared meditation on Jesus' forgiveness. She does not stop at reading: she pauses over one thought, recalls an argument and says to God: “Help me forgive.” She regularly sets aside time for this prayer.",
    "clarification": "Someone else's text, the Gospel or a truth of faith can be a starting point. Personal meditation means prayerfully reflecting on its meaning and responding to God, not simply reading or listening to the text. Interior prayer may become simpler, with less reasoning and fewer words; you need not force new thoughts. No exact duration or separate topic for each stage is required. A genuine necessity may change the schedule.",
    "options": [
      "I have no set time or actual practice of meditation.",
      "I sometimes meditate, but the time and approach are not yet stable.",
      "I faithfully maintain a set time and approach to prayer that includes meditation."
    ],
    "expectations": {
      "3": "Be consistently faithful to a set time and approach to prayer that includes meditation."
    },
    "contextSources": [
      "three-ways.md: The illuminative way",
      "three-ways.md: The unitive way"
    ]
  },
  {
    "id": "prayer-dryness-v4",
    "kicker": "Faithfulness without pleasant feelings",
    "title": "What do I do with my planned prayer time when there is no pleasant feeling or consolation?",
    "example": "John feels empty in prayer and struggles to gather his thoughts. Rather than immediately reading this as rejection by God, he says briefly, “God, I am here.” He gently returns his attention and keeps the reasonable time he planned, even if his feelings do not change.",
    "clarification": "Dryness can occur on different ways and for different reasons; by itself it establishes neither progress, regression nor a 'dark night.' Feeling that God is distant does not prove abandonment. This asks only about faithfulness to prayer without pleasant feelings. Illness and urgent duties are not failures; you may seek help and relief.",
    "options": [
      "I usually shorten or abandon prayer precisely because there is no consolation.",
      "I sometimes remain, but often give up because of the dryness.",
      "I remain faithful to the prayer I planned, even when it is dry and difficult.",
      "I have an established prayer practice but did not experience such dryness during this period."
    ],
    "expectations": {
      "3": "Remain faithful to prayer through actual dryness instead of abandoning it for lack of consolation."
    },
    "contextSources": [
      "three-ways.md: Spiritual states of consolation and desolation",
      "three-ways.md: Desolation"
    ]
  },
  {
    "id": "prayer-prolong-v4",
    "kicker": "Gladly remaining in prayer",
    "title": "When my responsibilities genuinely allow it, how do I respond to extending prayer?",
    "example": "Mary has a free evening and is not exhausted. After regular prayer, she freely chooses to stay a little longer with God. Another evening she needs rest and peacefully finishes prayer; that is not the same as fleeing it.",
    "clarification": "This asks about an actual, repeated willingness to remain gladly in prayer when reasonably possible. More minutes do not by themselves mean more love. Do not neglect family, work, sleep, health or needed rest; healthy recreation is compatible with recollection. One occasion of not extending prayer does not describe your whole practice.",
    "options": [
      "I generally want to finish as soon as possible, even when I could stay.",
      "I generally keep only my usual time; extending it is rare.",
      "I gladly extend prayer in practice when my actual responsibilities allow it."
    ],
    "expectations": {
      "4": "Continually cultivate prayer and gladly prolong it when responsibilities and health reasonably allow."
    },
    "contextSources": [
      "three-ways.md: The illuminative way"
    ]
  },
  {
    "id": "prayer-loving-response-v4",
    "kicker": "A personal response to God",
    "title": "Does my meditation often become a personal response of love, trust, or self-giving to God?",
    "example": "Anna reflects on how Jesus forgives. She feels no special warmth, but sincerely says, “I want to trust you. Help me forgive.” A personal response is present even without a pleasant feeling.",
    "clarification": "Affective prayer here means a personal act of the will: love, trust or self-giving to God. It does not require emotional warmth. This asks about your actual response, even in dryness, not unusual experiences, prayer of Quiet or an ability to identify contemplative graces.",
    "options": [
      "My prayer generally remains at words or reflection without such a personal response.",
      "Such a personal response occurs sometimes, but not often.",
      "My meditation often naturally becomes a personal response of love, trust, or self-giving to God."
    ],
    "expectations": {
      "3": "Meditation often becomes a personal response of love, trust, or self-giving to God; intense feelings are not required.",
      "4": "Prayer often becomes a personal response of love to God rather than reflection alone; special feelings are not required."
    },
    "contextSources": [
      "three-ways.md: Consolation"
    ]
  },
  {
    "id": "examen-pattern-v6",
    "kicker": "How I review my day",
    "title": "How do I usually practise an examination of conscience (examen)?",
    "example": "In the evening Anna pauses before God: she gives thanks, recalls how she spoke to her child, and decides to listen more patiently tomorrow. Later she adds a brief midday review of the same virtue. These are two short, concrete moments, not constant self-checking.",
    "clarification": "Think of a regular, prayerful review of specific choices before God over the past eight weeks, not just remembering the day's events or preparing for confession. The final description requires both two separate daily reviews and work on a specific virtue. This compares with the source; it is not a universal obligation.",
    "optionHeadings": [
      "No practice",
      "Occasionally",
      "At least daily",
      "Twice daily and a particular virtue",
      "Unsure"
    ],
    "options": [
      "I do not practise an examination of conscience.",
      "I occasionally review my actions, without a daily rhythm or clear method.",
      "At least once a day I concretely review my actions and a recurring difficulty, mainly to avoid sin.",
      "At least twice a day I briefly and concretely review my day and growth in a particular virtue, not only avoidance of sin.",
      "I cannot assess my usual practice."
    ],
    "expectations": {
      "1": "Recognize my actual examen practice; the description at I includes having none.",
      "2": "Practise an examen at least occasionally.",
      "3": "Concretely examine my conscience at least daily and attend to a recurring difficulty.",
      "4": "Concretely examine my conscience at least twice daily and work on a particular virtue."
    }
  },
  {
    "id": "examen-method-v4",
    "kicker": "A concrete, orderly review",
    "title": "What is my examination of conscience like when I practice it?",
    "example": "Peter thanks God for help during the day. He recalls a conversation in which he did not listen to a friend, sincerely asks forgiveness and help, and decides to listen without interrupting tomorrow. He does not finish merely by rating himself 'good' or 'bad.'",
    "clarification": "An examen is not just asking “how was my day?”. Before God I consider specific free choices, give thanks for good, repent where needed and ask for help with a next step. No single compulsory method or fault found at all costs is required. Humility is not self-contempt.",
    "options": [
      "It generally remains a vague impression of the day.",
      "I recall an occasional event, but the review has no stable approach or clear conclusion.",
      "I have a stable way of reviewing concrete choices, repenting where needed, and identifying a clear next step."
    ],
    "expectations": {
      "3": "Practice examen consistently and concretely, with a recognizable approach to review and response."
    },
    "contextSources": [
      "three-ways.md: The purgative way",
      "three-ways.md: Directions (1)"
    ]
  },
  {
    "id": "examen-particular-v4",
    "kicker": "A particular focus in examen",
    "title": "Do I follow one concrete difficulty or virtue in my examen over several days?",
    "example": "Mary regularly reviews her patience. She asks not only whether she snapped today, but also whether she deliberately listened to others and practiced a patient response.",
    "clarification": "A particular examen focuses on one specific difficulty or virtue, with prayer and God's help. For example, over several days I follow whether I listen without interrupting. The source distinguishes tracking avoidance of venial sin from actively growing in virtue; it does not require constant monitoring of every thought.",
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
    "clarification": "The original source says 'daily Mass if able.' Allow for distance, health, rest and duties; inability is not refusal. Daily Mass is not reserved for a particular spiritual stage. This compares your practice with the original description; it does not decide whether you should or may receive Communion.",
    "options": [
      "I have genuine opportunities but generally do not use them.",
      "I use an occasional opportunity but often pass up others without a real obstacle.",
      "I attend daily Mass on the days when it is reasonably possible.",
      "My circumstances did not allow daily Mass during this period."
    ],
    "expectations": {
      "3": "Alongside Sunday Mass, attend daily Mass when actual circumstances allow."
    },
    "contextSources": [
      "three-ways.md: Directions (4)",
      "three-ways.md: The illuminative way"
    ]
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
    "id": "sacraments-pattern-v6",
    "kicker": "Rhythm and manner of participation",
    "title": "Which description best fits my practice of Mass and confession?",
    "example": "Luke starts attending Mass and confession regularly. Then he protects Sunday Mass and establishes a rhythm of confession. When possible he also attends daily Mass. In time he participates more attentively and lovingly, and seeks help with known attachments in confession.",
    "clarification": "For confession schedules, consider actual practice over recent months, not future intentions. Daily Mass means when possible alongside health, rest and duties. Fervor is not an intense feeling, and an imperfection is not automatically sin. These schedules compare practice with the original chart; they do not determine eligibility for Communion or establish holiness.",
    "optionHeadings": [
      "Not regular yet",
      "Regular participation",
      "Weekly Mass, quarterly confession",
      "Steady schedule, daily Mass if possible",
      "Fervent participation, monthly confession",
      "Unable / unsure"
    ],
    "options": [
      "Even when available, Mass and confession do not have a regular place in my life.",
      "I regularly attend Mass and seek confession, but do not yet live the whole next description.",
      "I attend Mass weekly and confess at least once every three months, without a more settled schedule yet.",
      "I maintain weekly Mass, attend daily when genuinely able, and follow a steady confession schedule.",
      "I participate attentively and lovingly, maintain weekly and possible daily Mass, and confess at least monthly. I also mention known imperfections to seek help and growth.",
      "Genuine inability or lack of access prevents choosing a description, or I am unsure."
    ],
    "expectations": {
      "1": "Attend Mass regularly and seek confession when available.",
      "2": "Attend weekly Mass and confess at least quarterly.",
      "3": "Keep a steady confession schedule, weekly Mass and daily Mass when genuinely possible.",
      "4": "Participate fervently in Mass, with weekly and possible daily attendance and at least monthly confession including imperfections for growth."
    },
    "contextSources": [
      "three-ways.md: Directions (4)",
      "three-ways.md: The illuminative way"
    ]
  },
  {
    "id": "imperfections-consent-v5",
    "kicker": "Impulse and consent",
    "title": "When a known imperfection arises, how far do I knowingly let it continue?",
    "example": "Peter feels an impulse to turn the conversation back to himself. On one occasion he deliberately continues. On another he notices halfway through speaking. On a third he notices the first impulse but does not follow it. These are the situations this question distinguishes.",
    "clarification": "Think of a known imperfection, not every feeling or unwanted thought. A first involuntary impulse is not free consent. Quickly regretting deliberate consent is different from never going beyond the impulse. Choose uncertainty if you cannot distinguish these situations.",
    "options": [
      "I recognize the imperfection but often deliberately continue.",
      "I sometimes knowingly consent, although I soon regret it.",
      "I recognize no fully deliberate consent; sometimes I become aware only after it has begun.",
      "I recognize only the first spontaneous impulse, without accepting it further.",
      "I cannot reliably distinguish impulse, partial awareness and consent."
    ],
    "expectations": {
      "5": "Known imperfections occur only with partial awareness, without recognized fully deliberate consent.",
      "6": "Known imperfections go no further than the first spontaneous impulse, without further acceptance."
    }
  },
  {
    "id": "imperfections-loving-care-v5",
    "kicker": "Care motivated by love",
    "title": "How do I attend to a known imperfection during an ordinary day?",
    "example": "Anna knows she seeks praise. Before a conversation she remembers that she wants to listen sincerely. She does this out of love, not to prove her perfection, and works at it carefully even when nobody notices.",
    "clarification": "This does not mean constantly checking every thought or becoming anxious about mistakes. It asks about careful, sustained practice motivated by love, rather than occasional effort or protecting a good image of yourself.",
    "options": [
      "I usually pay little attention beforehand and remember only afterward.",
      "I make an effort in some situations, but my attention is not sustained.",
      "I carefully and consistently attend to the known imperfection out of love for God and others."
    ],
    "expectations": {
      "5": "Guard against known imperfections energetically, carefully and with love."
    }
  },
  {
    "id": "suffering-joyful-acceptance-v5",
    "kicker": "Love within real difficulty",
    "title": "In real difficulties, was acceptance with peace and quiet joy my usual response?",
    "example": "John helps an ill family member for weeks. Sometimes he cries and prays for the difficulty to end. Yet he habitually returns to trust and care for that person; alongside pain, he recognizes quiet joy in love. This is not a permanently cheerful mood.",
    "clarification": "At V the original source describes habitual joyful acceptance with peace, not merely endurance. Deeper peace is distinct from pleasant feelings: sadness, fear or spiritual dryness may remain. Do not manufacture or assume joy; its absence does not let this questionnaire judge your love or sanctity. You may seek help and relief.",
    "options": [
      "I endured the difficulty, but this acceptance was not usual.",
      "There were moments of peace and quiet joy, but not a sustained pattern.",
      "Acceptance with peace and the quiet joy of love was usual, even with pain and struggle.",
      "There was no such situation, or I cannot assess it."
    ],
    "expectations": {
      "5": "Usually embrace real difficulty joyfully and with peace, rather than only occasionally recognizing meaning."
    },
    "contextSources": [
      "three-ways.md: Consolation",
      "three-ways.md: Desolation"
    ]
  },
  {
    "id": "suffering-service-v5",
    "kicker": "Another person's good and my comfort",
    "title": "When reasonable help for someone required giving up some comfort, what did I actually choose?",
    "example": "Mary can spend an evening with a lonely neighbor without neglecting her family or health. She freely accepts the effort because it genuinely helps, not because discomfort is good in itself. The question distinguishes occasional choices from a sustained willingness.",
    "clarification": "A voluntary sacrifice means prudent help, not seeking danger, injury, sleep deprivation or abuse. The source sets no number of sacrifices. Distinguishing occasional from sustained practice is this application's interpretation, not proof of holiness.",
    "options": [
      "I usually choose my comfort even when I could reasonably help.",
      "Sometimes I freely and gladly accept that effort for another person's good.",
      "I consistently and gladly choose another person's genuine good even when it requires a reasonable personal sacrifice.",
      "There were no such opportunities, or I cannot assess it."
    ],
    "expectations": {
      "5": "Sometimes freely and gladly accept a reasonable sacrifice for others.",
      "6": "Show a sustained, joyful willingness to make prudent sacrifices for others, not to seek pain."
    }
  },
  {
    "id": "prayer-daily-life-v5",
    "kicker": "Prayer beyond prayer time",
    "title": "Does my relationship with God remain present while I carry out everyday work?",
    "example": "Before work, Peter briefly offers his day to God. He then does his job attentively, responds honestly to a colleague and relaxes with his family in the evening. Sometimes he explicitly gives thanks to God. He need not constantly repeat prayers or monitor his thoughts.",
    "clarification": "This asks about a habitual orientation toward God and love in work and relationships. Recollection does not mean constantly thinking religious words, feeling God's presence or neglecting work. Healthy recreation and rest are compatible with that relationship too. No mystical experience is being assessed.",
    "options": [
      "Prayer is mostly limited to time set aside for it.",
      "I sometimes turn to God during work, but this is not yet habitual.",
      "My relationship with God habitually permeates my work and relationships while I attend carefully to my duties."
    ],
    "expectations": {
      "5": "Live a habitual life of prayer during external work without neglecting duties."
    },
    "contextSources": [
      "three-ways.md: The illuminative way",
      "three-ways.md: The unitive way"
    ]
  },
  {
    "id": "prayer-detachment-v5",
    "kicker": "Freedom from my own preferences",
    "title": "How does my desire to love God affect my attachment to preferences, praise and comfort?",
    "example": "Anna wants the last word in a discussion. She sees it is unnecessary and freely lets the other person speak. Another time she lets go of seeking praise. She repeats such choices out of love, not self-hatred.",
    "clarification": "Detachment means greater freedom for love, not less value for yourself or others. Healthy enjoyment, friendship, recreation and self-care are not obstacles to union with God. This asks about a steady desire not to let selfish attachment govern your choices, expressed in prudent actions.",
    "options": [
      "The desire mostly remains an idea; I rarely change my choices.",
      "I sometimes give up a preference, but often put it before love and duties again.",
      "I consistently desire greater freedom to love and show it in concrete, prudent acts of self-renunciation."
    ],
    "expectations": {
      "5": "Show a sustained desire for detachment, prudent self-renunciation and love of God."
    },
    "contextSources": [
      "three-ways.md: The illuminative way",
      "three-ways.md: The unitive way"
    ]
  },
  {
    "id": "prayer-desire-v5",
    "kicker": "A longing that shapes life",
    "title": "Is longing for the Eucharist and full communion with God a lasting orientation of my life?",
    "example": "John prepares for Mass with a short prayer even when he feels no particular enthusiasm. Hope of communion with God encourages him to love his family more patiently today. He does not want to escape life or his responsibilities.",
    "clarification": "Longing can be a steady intention and orientation even without pleasant feelings. Emotional excitement or Communion as proof of a stage is not required; this result does not determine access to the sacraments. Hope for Heaven here is not a wish for death, but for communion with God while faithfully living the present life.",
    "options": [
      "This is not yet a real orientation of my life.",
      "This desire arises occasionally, but is not sustained.",
      "Longing for the Eucharist and communion with God consistently shapes my prayer and everyday life."
    ],
    "expectations": {
      "5": "Nurture a sustained longing for the Eucharist and full communion with God while living present duties."
    },
    "contextSources": [
      "three-ways.md: Consolation",
      "three-ways.md: The unitive way",
      "three-ways.md: Directions (4)"
    ]
  },
  {
    "id": "prayer-self-forgetfulness-v5",
    "kicker": "Love without recognition",
    "title": "When the good I do goes unnoticed, how much does seeking recognition direct my next choices?",
    "example": "Mary has helped for a long time, but someone else receives the thanks. She may feel an initial sting of disappointment. She does not turn helping into a search for recognition: she continues to love, with healthy boundaries and care for her own needs.",
    "clarification": "The original source's 'self-forgetfulness' is considered here only through a practical fruit: love less dependent on recognition. It is not loss of dignity, suppression of feelings or tolerating exploitation. One act is not a sustained pattern. Charity is central: an extraordinary experience does not establish maturity, and its absence does not mean a lack of love. This answer cannot confirm contemplation.",
    "options": [
      "Recognition strongly determines how much I keep helping.",
      "I return to the other person's good, but the desire for recognition still often directs me.",
      "The good of God and my neighbor consistently matters more than recognition; I do not nurture the first impulse to put myself forward."
    ],
    "expectations": {
      "6": "Show sustained freedom from seeking personal recognition in serving God and neighbor; this is a limited practical indicator, not confirmation of mystical self-forgetfulness."
    },
    "contextSources": [
      "three-ways.md: The unitive way",
      "three-ways.md: Directions (1)",
      "three-ways.md: Directions (3)"
    ]
  }
]);
})();
