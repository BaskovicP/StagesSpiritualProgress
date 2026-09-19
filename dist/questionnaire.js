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

  const copy = {
    en: {
      introLede: "Think about your ordinary life over the past eight weeks. Simple, concrete questions help estimate a pattern—not a verdict.",
      chooseClosest: "Over the past eight weeks, how often has this been true? Choose what was usual, not what you hoped to do.",
      needMore: "For a useful estimate, answer at least 21 questions and at least 2 in every area. This item was previously skipped.",
      methodBody: "The 28 items approach seven areas from different angles. Direct and reverse-keyed answers are converted to a six-point scale, averaged within each area, and then combined with equal area weights. The stability percentage is the share of 1,000 browser-only item-resampling runs that returned the same nearest stage; the displayed interval contains the middle 95% of those resampled scores. This measures internal response stability, not validated diagnostic accuracy.",
      stabilitySummary: "Internal pattern stability: {percent}% of resamples returned Stage {stage}; the 95% response interval spans Stages {lower}–{upper}.",
      confidence: {
        high: "High stability",
        moderate: "Moderate stability",
        low: "Low stability"
      },
      domains: {
        seriousSin: "Serious choices",
        venialSin: "Everyday faults",
        imperfections: "Attachments & habits",
        suffering: "Suffering",
        prayer: "Prayer",
        examen: "Reflection",
        sacraments: "Sacramental life"
      },
      frequencyOptions: [
        "Never or almost never",
        "Rarely",
        "About half the time",
        "Often",
        "Almost always"
      ],
      questions: [
        { kicker: "A usual week", title: "I keep a prayer time I had planned, even on a busy day." },
        { kicker: "When plans change", title: "When plans are disrupted, I regain inner peace without first needing the situation to change." },
        { kicker: "Small choices", title: "When a fault seems small, I put off dealing with it." },
        { kicker: "Weekly priorities", title: "I organize ordinary weekly commitments around Sunday Mass." },
        { kicker: "Recurring habits", title: "I explain away a recurring weakness because it is ‘just how I am.’" },
        { kicker: "Looking back", title: "I pause at a regular time to review the day before God." },
        { kicker: "Known situations", title: "When I recognize a situation that repeatedly weakens my choices, I change or leave that situation." },
        { kicker: "When prayer is dry", title: "When prayer feels dry or unrewarding, I shorten it or skip it." },
        { kicker: "Under pressure", title: "During a difficulty, I spend much of my energy mentally arguing with what has happened." },
        { kicker: "Everyday attention", title: "I notice small choices that make me less patient, honest, or generous." },
        { kicker: "A steady rhythm", title: "I approach confession on a planned rhythm, not only after a crisis." },
        { kicker: "Freedom to love", title: "I work on a habit that is not necessarily sinful but makes me less free to love." },
        { kicker: "After a difficult day", title: "I examine my conduct mainly after something has gone badly." },
        { kicker: "Before a choice", title: "I stay near a known trigger and trust myself to handle it in the moment." },
        { kicker: "Ordinary work", title: "Prayer returns naturally to mind during ordinary work." },
        { kicker: "Giving meaning", title: "I can give an unavoidable difficulty meaning by offering it for someone else." },
        { kicker: "Making amends", title: "After a small deliberate fault, I make a specific act of repair." },
        { kicker: "A real opportunity", title: "When weekday Mass is reasonably possible but requires rearranging a plan, I dismiss the opportunity without considering it." },
        { kicker: "A concrete practice", title: "I choose one concrete virtue to practice against a recurring weakness." },
        { kicker: "The next day", title: "My review of the day leads to one concrete intention for the next day." },
        { kicker: "After a serious failure", title: "After a serious failure, I take a concrete step soon afterward—confession, reparation, or a change in circumstances." },
        { kicker: "Attention in prayer", title: "My prayer is mainly a list of immediate needs, with little time simply attentive to God." },
        { kicker: "For another person", title: "I avoid reasonable sacrifices for another person when they disturb my comfort." },
        { kicker: "Recognizing a pattern", title: "I treat recurring small faults as unrelated incidents rather than looking for a pattern." },
        { kicker: "After confession", title: "After confession, I usually leave my concrete repair or next step undefined." },
        { kicker: "The first impulse", title: "I notice a self-centered impulse only after it has already shaped my actions." },
        { kicker: "Across several days", title: "I treat each fault as isolated rather than looking for a recurring pattern across days." },
        { kicker: "After regret fades", title: "Once regret fades, I tend to return to the same situation or setup as before." }
      ]
    },
    hr: {
      introLede: "Promisli o svojem uobičajenom životu tijekom proteklih osam tjedana. Jednostavna i konkretna pitanja pomažu procijeniti obrazac — ne donijeti presudu.",
      chooseClosest: "Koliko je često tijekom proteklih osam tjedana ovo bilo istinito? Odaberi ono što je bilo uobičajeno, a ne ono što si želio učiniti.",
      needMore: "Za korisnu procjenu odgovori na najmanje 21 pitanje i najmanje 2 pitanja iz svakog područja. Ovo je pitanje prethodno preskočeno.",
      methodBody: "Dvadeset osam tvrdnji pristupa sedam područja iz različitih kutova. Izravno i obrnuto bodovani odgovori pretvaraju se u ljestvicu od šest točaka, prosječno se izračunavaju unutar svakog područja, a zatim se područja jednako ponderiraju. Postotak stabilnosti pokazuje koliko je od 1.000 ponovnih uzorkovanja tvrdnji, izvršenih samo u pregledniku, vratilo isti najbliži stupanj; prikazani raspon obuhvaća srednjih 95% tih ponovno uzorkovanih rezultata. To mjeri unutarnju stabilnost odgovora, a ne potvrđenu dijagnostičku točnost.",
      stabilitySummary: "Unutarnja stabilnost obrasca: {percent}% ponovnih uzorkovanja vratilo je {stage}. stupanj; raspon od 95% odgovora proteže se od {lower}. do {upper}. stupnja.",
      confidence: {
        high: "Visoka stabilnost",
        moderate: "Umjerena stabilnost",
        low: "Niska stabilnost"
      },
      domains: {
        seriousSin: "Ozbiljne odluke",
        venialSin: "Svakodnevni propusti",
        imperfections: "Navezanosti i navike",
        suffering: "Trpljenje",
        prayer: "Molitva",
        examen: "Promišljanje",
        sacraments: "Sakramentalni život"
      },
      frequencyOptions: [
        "Nikada ili gotovo nikada",
        "Rijetko",
        "Otprilike polovicu vremena",
        "Često",
        "Gotovo uvijek"
      ],
      questions: [
        { kicker: "Uobičajen tjedan", title: "Držim se planiranog vremena za molitvu čak i tijekom zaposlenog dana." },
        { kicker: "Kada se planovi promijene", title: "Kada se planovi poremete, ponovno pronalazim unutarnji mir i prije nego što se okolnosti promijene." },
        { kicker: "Male odluke", title: "Kada se neki propust čini malenim, odgađam suočavanje s njim." },
        { kicker: "Tjedni prioriteti", title: "Uobičajene tjedne obveze organiziram oko nedjeljne mise." },
        { kicker: "Ponavljajuće navike", title: "Ponavljajuću slabost opravdavam riječima: ‘Takav sam.’" },
        { kicker: "Pogled unatrag", title: "U redovito vrijeme zastanem kako bih pred Bogom pregledao protekli dan." },
        { kicker: "Poznate situacije", title: "Kada prepoznam situaciju koja opetovano slabi moje odluke, promijenim je ili je napustim." },
        { kicker: "Kada je molitva suha", title: "Kada je molitva suha ili bez osjećaja nagrade, skratim je ili je preskočim." },
        { kicker: "Pod pritiskom", title: "Tijekom poteškoće velik dio svoje energije trošim na unutarnje opiranje onomu što se dogodilo." },
        { kicker: "Svakodnevna pozornost", title: "Primjećujem male odluke zbog kojih postajem manje strpljiv, iskren ili velikodušan." },
        { kicker: "Postojan ritam", title: "Ispovijedi pristupam prema planiranom ritmu, a ne samo nakon krize." },
        { kicker: "Sloboda za ljubav", title: "Radim na navici koja možda nije grijeh, ali me čini manje slobodnim za ljubav." },
        { kicker: "Nakon teškog dana", title: "Svoje ponašanje preispitujem uglavnom tek nakon što nešto pođe loše." },
        { kicker: "Prije odluke", title: "Ostajem blizu poznatog okidača i uzdam se da ću se u trenutku dobro snaći." },
        { kicker: "Uobičajen rad", title: "Molitva mi se prirodno vraća u misli tijekom svakodnevnog rada." },
        { kicker: "Davanje smisla", title: "Neizbježnoj poteškoći mogu dati smisao prikazujući je za drugu osobu." },
        { kicker: "Ispravljanje", title: "Nakon svjesnog manjeg propusta učinim konkretan čin naknade." },
        { kicker: "Stvarna prilika", title: "Kada je misa radnim danom razumno moguća, ali traži promjenu plana, odbacim tu priliku bez razmatranja." },
        { kicker: "Konkretna vježba", title: "Odaberem jednu konkretnu krepost koju ću vježbati protiv ponavljajuće slabosti." },
        { kicker: "Sljedeći dan", title: "Pregled dana vodi me prema jednoj konkretnoj odluci za sljedeći dan." },
        { kicker: "Nakon ozbiljnog pada", title: "Nakon ozbiljnog pada ubrzo poduzmem konkretan korak — ispovijed, naknadu ili promjenu okolnosti." },
        { kicker: "Pozornost u molitvi", title: "Moja je molitva uglavnom popis neposrednih potreba, s malo vremena jednostavno usmjerenog na Boga." },
        { kicker: "Za drugu osobu", title: "Izbjegavam razumnu žrtvu za drugu osobu kada narušava moju udobnost." },
        { kicker: "Prepoznavanje obrasca", title: "Ponavljajuće male propuste tretiram kao nepovezane događaje umjesto da tražim obrazac." },
        { kicker: "Nakon ispovijedi", title: "Nakon ispovijedi obično ne odredim konkretnu naknadu ili sljedeći korak." },
        { kicker: "Prvi poticaj", title: "Sebičan poticaj primijetim tek nakon što je već oblikovao moje postupke." },
        { kicker: "Kroz nekoliko dana", title: "Svaki propust promatram izdvojeno umjesto da kroz više dana tražim obrazac koji se ponavlja." },
        { kicker: "Kada žaljenje oslabi", title: "Kada žaljenje oslabi, sklon sam vratiti se istoj situaciji ili okolnostima kao prije." }
      ]
    }
  };

  window.spiritualAssessment = Object.freeze({ domainOrder, questionBlueprints, copy });
})();
