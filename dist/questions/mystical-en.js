(() => {
  "use strict";

  window.spiritualMysticalContent = window.spiritualMysticalContent || {};
  window.spiritualMysticalContent.en = Object.freeze({
    kicker: "Optional · not scored",
    title: "Mystical experiences and discernment",
    intro: "These questions explore themes associated with Stage VI and open a conversation about Stage VII. Your answers establish neither stage and do not change your result. The source describes VI but only names VII. An unusual experience does not prove holiness; its absence is not a deficiency.",
    timeframe: "You may include earlier experiences here, not only the past eight weeks. Describe what you experienced without having to know its origin. You may choose uncertainty or skip any question.",
    privacy: "These answers are not sent to a server. They are stored temporarily in this tab and survive a refresh. You can clear them separately; restarting the questionnaire also clears them.",
    startButton: "Open questions about mystical experiences",
    hideButton: "Hide questions",
    clearButton: "Clear experience answers",
    progress: "Answered or skipped: {answered}/{total}",
    answerSaved: "Your answer is retained only in this tab.",
    summaryTitle: "Notes for discussion, not confirmation of a stage",
    summaryEmpty: "There are no experience answers yet. This section is entirely optional.",
    summaryNote: "This is a summary of your answers, not an assessment of whether an experience is supernatural. More “yes” answers do not raise your spiritual stage. The source gives no criteria for VII, and these answers cannot establish either VI or VII. You may discuss experiences and their lasting fruits with a prudent spiritual director.",
    sourceLabel: "Connection to the source",
    questions: [
      {
        id: "contemplation",
        title: "Have you experienced a deep attentiveness to God in prayer that you did not produce through reflection, but experienced as a gift received?",
        example: "Ana begins praying with a Gospel passage. After a while, she is no longer developing new thoughts but remains quietly and lovingly attentive to God. She experiences this as something received rather than a state she has produced.",
        clarification: "This asks about your experience, not confirmation of infused contemplation. Ordinary calm, pleasure, strong emotion, or an absence of thoughts does not by itself establish such a grace. You do not need to try to produce this experience.",
        sourceNote: "VI · Prayer: graces of contemplation. V mentions infused prayer, while III and IV describe simple and quiet prayer; describing silence alone therefore does not identify a stage.",
        options: [
          { value: "yes", label: "Yes, I recognize an experience like this." },
          { value: "unsure", label: "Perhaps; I am unsure how to describe it." },
          { value: "no", label: "I do not recognize an experience like this." },
          { value: "skip", label: "I choose to skip this question." }
        ]
      },
      {
        id: "purification",
        title: "Have you gone through a prolonged period of dryness in prayer and inner trials that you understood as possible spiritual purification?",
        example: "For months, Ivan no longer finds his former consolation in prayer. He continues praying but does not know whether this is a spiritual trial, exhaustion, or something else. He does not try to reach a final conclusion on his own.",
        clarification: "The source mentions passive purification, but dryness or suffering alone does not establish such purification or a higher stage. They can have different causes. A spiritual interpretation should not delay care for your health or needed support.",
        sourceNote: "VI · Prayer: pronounced passive purifications. V also mentions purification, and III describes dryness in prayer; this experience is not unique to VI.",
        options: [
          { value: "yes", label: "Yes, I had such a period and understood it that way." },
          { value: "unsure", label: "I had a difficult period but do not know how to understand it." },
          { value: "no", label: "I do not recognize such a period." },
          { value: "skip", label: "I choose to skip this question." }
        ]
      },
      {
        id: "phenomena",
        title: "Have you had an unusual experience that you associated with prayer or God—for example, an experience of a vision, words, or ecstasy?",
        example: "During prayer, Marija has the impression that she has heard a short sentence. She can describe what she experienced without immediately concluding that God spoke to her. She calmly discusses it with a spiritual director.",
        clarification: "You may report an experience without claiming to know its origin. The source says extraordinary phenomena occur only sometimes: they are not required for VI and do not establish VI or VII. They should not be sought or induced, and a message calling for harm to yourself or others should not be acted on.",
        sourceNote: "VI · Prayer: extraordinary phenomena sometimes accompany contemplation. Visions, experiences of words, and ecstasy illustrate that general term here; they are not separate criteria listed in the markdown.",
        options: [
          { value: "yes", label: "Yes, I had an unusual experience that I associated in this way." },
          { value: "unsure", label: "Perhaps; I am unsure how to describe what happened." },
          { value: "no", label: "No, I have not had such an experience." },
          { value: "skip", label: "I choose to skip this question." }
        ]
      },
      {
        id: "union",
        title: "Have you experienced what you would describe as a deep union with God?",
        example: "In prayer, Petar experiences an exceptional closeness to God. Afterwards, he describes it by saying, “I felt deeply united with God.” This describes his experience; it does not establish which stage he belongs to.",
        clarification: "This question deliberately asks for your own description. Such an answer does not confirm lasting mystical union, spiritual marriage, or Stage VII. A passing experience and an enduring spiritual state are not the same thing.",
        sourceNote: "An additional question for discussion, not a criterion taken from the source. The markdown calls VII “Complete Sanctity” but does not describe its characteristics or experiences by which it could be identified.",
        options: [
          { value: "yes", label: "Yes, I would describe one or more experiences that way." },
          { value: "unsure", label: "Perhaps; I am unsure whether that is a fitting description." },
          { value: "no", label: "I would not describe my experiences that way." },
          { value: "skip", label: "I choose to skip this question." }
        ]
      },
      {
        id: "fruits",
        title: "If you have had such experiences, what lasting changes followed in the way you relate to other people?",
        example: "After a powerful experience in prayer, Petar considers more than what he felt. Over the following months, he notices whether he is more patient at home and more willing to help when he receives no recognition.",
        clarification: "This asks about concrete, lasting fruits, not the intensity of an experience or proof of its origin. Selflessness does not mean self-hatred, neglecting your health, or accepting abuse. If you have not had such experiences, select that option.",
        sourceNote: "VI · Imperfections, Suffering, and Prayer: selflessness and concern for others. This question explores possible fruits; it does not independently confirm VI or VII.",
        options: [
          { value: "lasting", label: "I notice more lasting patience and selfless concern for others." },
          { value: "mixed", label: "Changes are small or inconsistent." },
          { value: "none", label: "I do not notice a lasting change in this area." },
          { value: "unsure", label: "It is too early or I cannot assess this." },
          { value: "notApplicable", label: "I have not had such experiences." },
          { value: "skip", label: "I choose to skip this question." }
        ]
      },
      {
        id: "discernment",
        title: "Have you discussed these experiences with a confessor or an experienced spiritual director, remaining open to the possibility that they are not supernatural?",
        example: "Ana simply describes what happened to her spiritual director. She does not seek confirmation of a special stage, but help to remain prudent in prayer and daily life. The discussion may remain open without a final conclusion.",
        clarification: "Speaking with a spiritual director does not automatically establish an experience's origin or a spiritual stage. Not yet having had an opportunity to speak is not a negative point. This section is not scored at all.",
        sourceNote: "An additional question to support discernment and responsible interpretation of answers; it is not a criterion for VI or VII stated in the supplied markdown.",
        options: [
          { value: "ongoing", label: "Yes, discussion and discernment are ongoing." },
          { value: "discussed", label: "Yes, I have discussed them without requiring a final confirmation." },
          { value: "notYet", label: "I have not discussed them yet." },
          { value: "notApplicable", label: "I have not had such experiences to discuss." },
          { value: "skip", label: "I choose to skip this question." }
        ]
      }
    ]
  });
})();
