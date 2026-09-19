(() => {
  "use strict";

  const assessment = window.spiritualAssessment;
  const domainOrder = assessment.domainOrder;
  const questionBlueprints = assessment.questionBlueprints;
  const minimumAnswers = 21;
  const minimumItemsPerDomain = 2;

  const translations = {
    en: {
      metaTitle: "Spiritual Progress Reflection",
      privacyPill: "No data collected",
      languageLabel: "Language",
      eyebrow: "A private reflection",
      introTitle: "Where are you on the path?",
      introLede: "Reflect on prayer, conscience, suffering, and sacramental life. Receive a gentle estimate—not a verdict.",
      dimensions: "dimensions",
      minutes: "minutes",
      private: "private",
      start: "Begin reflection",
      continue: "Continue reflection",
      privacyNote: "Your answers stay in this tab and disappear when you close it.",
      pathEyebrow: "Six movements",
      pathTitle: "A path, not a rank",
      backToIntro: "Back",
      yourProgress: "Your progress",
      chooseClosest: "Choose the description that comes closest to your usual experience.",
      previous: "Previous",
      next: "Next",
      seeResult: "See result",
      preferNot: "I prefer not to answer this question.",
      needMore: "Please answer at least 7 questions to receive a meaningful estimate. This question was previously skipped.",
      footerNote: "For personal reflection; not a substitute for spiritual direction or confession.",
      footerIdentity: "Stages of Spiritual Progress",
      resultEyebrow: "Your closest pattern",
      ascentTitle: "Your place on the path",
      ascentPosition: "Approximate position: {score} of 6, closest to Stage {stage}.",
      calculatedLocally: "Calculated on this device",
      resultRangeLabel: "Your likely range",
      resultCaution: "Treat this as a prompt for prayerful reflection, not as a spiritual verdict.",
      profileEyebrow: "Seven dimensions",
      profileTitle: "Your reflection profile",
      reviewAnswers: "Review answers",
      printResult: "Print result",
      retake: "Clear & retake",
      methodTitle: "How this estimate is calculated",
      methodBody: "Each answer is compared with the descriptions for the six stages. The seven dimensions receive equal weight, and the closest overall pattern is selected. Adjacent stages are shown as a range when your answers differ across dimensions.",
      methodPrivacy: "No answers, result, language choice, cookies, analytics, or identifiers are stored or transmitted.",
      notAnswered: "Not answered",
      answeredSummary: "{answered} of {total} questions answered · {domains} of 7 dimensions represented",
      rangeSingle: "Your answers gather most closely around Stage {stage}.",
      rangeMultiple: "Your answers most often fall between Stages {lower} and {upper}.",
      confidence: {
        high: "Clear pattern",
        moderate: "Mixed pattern",
        low: "Tentative pattern"
      },
      families: {
        purgative: "Purgative way",
        illuminative: "Illuminative way",
        unitive: "Unitive way"
      },
      domains: {
        seriousSin: "Serious sin",
        venialSin: "Venial sin",
        imperfections: "Imperfections",
        suffering: "Suffering",
        prayer: "Prayer",
        examen: "Examen",
        sacraments: "Sacraments"
      },
      stages: [
        {
          name: "Mediocre Piety",
          family: "purgative",
          summary: "Your answers resemble a beginning marked by sincere desire but inconsistent practice. The central invitation is to establish a steady rhythm, take avoidable occasions seriously, and begin again without discouragement."
        },
        {
          name: "Intermittent Piety",
          family: "purgative",
          summary: "Your answers suggest real resistance to serious sin and a growing spiritual routine, though fidelity may still weaken with dryness, distraction, or pressure. Consistency is likely the next fruitful step."
        },
        {
          name: "Sustained Piety",
          family: "purgative",
          summary: "Your answers point toward a stable pattern of prayer, vigilance, examen, and sacramental life. Consolation and dryness may alternate, while imperfections and suffering still require patient, deliberate work."
        },
        {
          name: "Fervor",
          family: "illuminative",
          summary: "Your answers resemble a life increasingly shaped by willing prayer, serious reparation, courageous work on imperfections, and a clearer understanding of suffering’s spiritual benefit."
        },
        {
          name: "Relative Perfection",
          family: "illuminative",
          summary: "Your answers suggest a habitual life of prayer, careful love in confronting imperfections, and greater peace in sacrifice. Desire for detachment, the Eucharist, and divine love becomes more pervasive."
        },
        {
          name: "Heroic Perfection",
          family: "unitive",
          summary: "Your answers resemble the source’s highest described pattern: deep self-forgetfulness, generous acceptance of suffering for others, and contemplative prayer shaped by profound purification."
        }
      ],
      questions: [
        {
          kicker: "Conscience · resistance",
          title: "When you recognize a serious temptation or a near occasion of serious sin, what usually happens?",
          options: [
            "My resistance is weak, and I rarely avoid the occasion even though I later regret it.",
            "I resist loyally and usually avoid the occasion once I recognize it.",
            "I vigilantly avoid such occasions; a serious fall is absent or extremely rare."
          ]
        },
        {
          kicker: "Conscience · response",
          title: "If you become aware of a serious fall, how do you ordinarily respond?",
          options: [
            "I regret it seriously and make an adequate confession.",
            "I regret it deeply, seek confession, and undertake penance or reparation.",
            "Such a fall is absent or very rare; if it surprises me, it brings immediate, ardent sorrow and a desire for penance."
          ]
        },
        {
          kicker: "Venial sin · intention",
          title: "How do you relate to deliberate venial sin?",
          options: [
            "I can treat it as insignificant and sometimes knowingly welcome or desire it.",
            "It is sometimes deliberate, and my resistance is weak.",
            "It is not habitual; I am vigilant, and deliberate consent is rare.",
            "It is not deliberate; it occurs only by surprise or with incomplete awareness."
          ]
        },
        {
          kicker: "Venial sin · reparation",
          title: "After recognizing a venial sin, what best describes your sorrow and response?",
          options: [
            "I give it little attention and make little effort to prevent or uproot it.",
            "My sorrow is often superficial, with little coherent preparation or repair.",
            "My sorrow is intense, though I still do little by way of reparation.",
            "I regret it keenly and make serious reparation."
          ]
        },
        {
          kicker: "Imperfections · honesty",
          title: "How do you approach imperfections that are not necessarily sins but hinder love?",
          options: [
            "I tend not to uncover them, or I excuse them easily and make little effort to change.",
            "I want nothing to do with them and fight them with courage and diligence.",
            "I guard against them energetically, with much care and love; they occur mainly with incomplete awareness.",
            "What remains is ordinarily only the first spontaneous impulse."
          ]
        },
        {
          kicker: "Imperfections · renunciation",
          title: "When you notice a recurring imperfection, what follows?",
          options: [
            "I approve the idea of renouncing it but make little concrete effort.",
            "I make frequent acts of renunciation and work on a specific virtue.",
            "I respond with steady, loving vigilance before the pattern takes hold.",
            "Renunciation is prompt; the imperfection rarely moves beyond its first impulse."
          ]
        },
        {
          kicker: "Suffering · first response",
          title: "What is your usual first response when suffering enters your life?",
          options: [
            "I avoid it, and my peace is seriously disrupted.",
            "I tolerate it with complaint and little peace.",
            "I endure it with relative peace, though I still struggle.",
            "I can embrace it with a clear sense of benefit, some joy, and peace.",
            "I embrace it joyfully and sometimes accept it for the sake of others.",
            "I embrace it joyfully and willingly pursue sacrifice for the sake of others."
          ]
        },
        {
          kicker: "Suffering · inner meaning",
          title: "When unavoidable suffering continues, which description comes closest?",
          options: [
            "My main concern is escape, and I lose inner peace.",
            "I accept that it must be endured, but complaint remains dominant.",
            "I can remain relatively peaceful while honestly acknowledging the struggle.",
            "I recognize spiritual benefit and can receive the trial with some joy.",
            "Peace and joy are increasingly present, and I can offer the trial for others.",
            "Love of others makes sacrifice more desirable than personal ease."
          ]
        },
        {
          kicker: "Prayer · rhythm",
          title: "How stable is your regular time for prayer?",
          options: [
            "I pray from time to time, without a stable pattern.",
            "I pray regularly, but often stop when I feel dry or become busy.",
            "I keep a specific time and approach, even when prayer is difficult.",
            "Prayer is constant, and I gladly remain in it longer.",
            "Prayer increasingly shapes my whole day, including ordinary work.",
            "Contemplative prayer and deep self-forgetfulness characterize my life."
          ]
        },
        {
          kicker: "Prayer · depth",
          title: "Which description best matches the usual character of your prayer?",
          options: [
            "Mostly intermittent vocal prayer or petitions focused on temporal needs.",
            "Regular vocal prayer with attempts at structured meditation.",
            "Faithful vocal prayer and often affective meditation; prayer of simplicity may emerge.",
            "Vocal and mental prayer are gladly prolonged, often becoming affective, simple, or quiet.",
            "Prayer is habitual even during work, with thirst for detachment, the Eucharist, Heaven, and divine love.",
            "Contemplation, profound purification, and complete self-forgetfulness are prominent."
          ]
        },
        {
          kicker: "Examen · frequency",
          title: "How regularly do you practice an examination of conscience?",
          options: [
            "I do not practice it.",
            "I practice it intermittently.",
            "I practice it at least once daily, often more than once.",
            "I practice it at least twice daily as part of a stable spiritual rhythm."
          ]
        },
        {
          kicker: "Examen · purpose",
          title: "What is the usual purpose and form of your examen?",
          options: [
            "I do not yet give deliberate attention to this practice.",
            "It is an unstructured review without a stable method or preparation.",
            "My particular examen consistently aims at avoiding venial sin.",
            "My particular examen aims at growth toward perfection in a specific virtue."
          ]
        },
        {
          kicker: "Sacraments · Eucharist",
          title: "Which description best matches your participation in Mass?",
          options: [
            "I attend with some regularity and desire greater consistency.",
            "I attend Mass weekly.",
            "I am always faithful to weekly Mass and attend daily when reasonably able.",
            "I participate fervently in weekly and, when able, daily Mass."
          ]
        },
        {
          kicker: "Sacraments · confession",
          title: "Which description best matches your present rhythm of confession?",
          options: [
            "I make adequate confessions after serious falls but do not yet have a stable rhythm.",
            "I pursue confession at least quarterly.",
            "I pursue confession on a regular schedule.",
            "I pursue confession at least monthly and may bring imperfections devotionally to seek grace for overcoming them."
          ]
        }
      ]
    },
    hr: {
      metaTitle: "Promišljanje o duhovnom napretku",
      privacyPill: "Bez prikupljanja podataka",
      languageLabel: "Jezik",
      eyebrow: "Privatno promišljanje",
      introTitle: "Gdje se nalaziš na putu?",
      introLede: "Promisli o molitvi, savjesti, trpljenju i sakramentalnom životu. Primi blagu procjenu — ne presudu.",
      dimensions: "područja",
      minutes: "minuta",
      private: "privatno",
      start: "Započni promišljanje",
      continue: "Nastavi promišljanje",
      privacyNote: "Tvoji odgovori ostaju u ovoj kartici i nestaju kada je zatvoriš.",
      pathEyebrow: "Šest koraka",
      pathTitle: "Put, a ne rang-lista",
      backToIntro: "Natrag",
      yourProgress: "Tvoj napredak",
      chooseClosest: "Odaberi opis koji je najbliži tvojem uobičajenom iskustvu.",
      previous: "Prethodno",
      next: "Dalje",
      seeResult: "Prikaži rezultat",
      preferNot: "Ne želim odgovoriti na ovo pitanje.",
      needMore: "Odgovori na najmanje 7 pitanja kako bi procjena bila smislena. Ovo je pitanje prethodno preskočeno.",
      footerNote: "Za osobno promišljanje; ne zamjenjuje duhovno vodstvo ni ispovijed.",
      footerIdentity: "Stupnjevi duhovnog napretka",
      resultEyebrow: "Tvoj najbliži obrazac",
      ascentTitle: "Tvoje mjesto na putu",
      ascentPosition: "Približan položaj: {score} od 6, najbliže {stage}. stupnju.",
      calculatedLocally: "Izračunato na ovom uređaju",
      resultRangeLabel: "Tvoj vjerojatni raspon",
      resultCaution: "Prihvati ovo kao poticaj za molitveno promišljanje, a ne kao duhovnu presudu.",
      profileEyebrow: "Sedam područja",
      profileTitle: "Tvoj profil promišljanja",
      reviewAnswers: "Pregledaj odgovore",
      printResult: "Ispiši rezultat",
      retake: "Izbriši i ponovi",
      methodTitle: "Kako se izračunava procjena",
      methodBody: "Svaki se odgovor uspoređuje s opisima šest stupnjeva. Sedam područja imaju jednaku težinu te se odabire najbliži cjelokupni obrazac. Susjedni stupnjevi prikazuju se kao raspon kada se odgovori razlikuju po područjima.",
      methodPrivacy: "Ne spremaju se niti šalju odgovori, rezultat, odabrani jezik, kolačići, analitika ni identifikatori.",
      notAnswered: "Bez odgovora",
      answeredSummary: "Odgovoreno na {answered} od {total} pitanja · zastupljeno {domains} od 7 područja",
      rangeSingle: "Tvoji se odgovori najviše okupljaju oko {stage}. stupnja.",
      rangeMultiple: "Tvoji se odgovori najčešće nalaze između {lower}. i {upper}. stupnja.",
      confidence: {
        high: "Jasan obrazac",
        moderate: "Mješovit obrazac",
        low: "Okviran obrazac"
      },
      families: {
        purgative: "Put čišćenja",
        illuminative: "Put prosvjetljenja",
        unitive: "Put sjedinjenja"
      },
      domains: {
        seriousSin: "Teški grijeh",
        venialSin: "Laki grijeh",
        imperfections: "Nesavršenosti",
        suffering: "Trpljenje",
        prayer: "Molitva",
        examen: "Ispit savjesti",
        sacraments: "Sakramenti"
      },
      stages: [
        {
          name: "Osrednja pobožnost",
          family: "purgative",
          summary: "Tvoji odgovori nalikuju početku obilježenom iskrenom željom, ali još nedosljednom praksom. Središnji je poziv uspostaviti postojan ritam, ozbiljno shvatiti izbježive prigode i bez obeshrabrenja uvijek ponovno započinjati."
        },
        {
          name: "Povremena pobožnost",
          family: "purgative",
          summary: "Tvoji odgovori upućuju na stvaran otpor teškom grijehu i rastući duhovni ritam, premda vjernost još može oslabjeti zbog suhoće, rastresenosti ili pritiska. Dosljednost je vjerojatno sljedeći plodan korak."
        },
        {
          name: "Postojana pobožnost",
          family: "purgative",
          summary: "Tvoji odgovori upućuju na postojan obrazac molitve, budnosti, ispita savjesti i sakramentalnog života. Utjeha i suhoća mogu se izmjenjivati, dok nesavršenosti i trpljenje još traže strpljiv i odlučan rad."
        },
        {
          name: "Žar",
          family: "illuminative",
          summary: "Tvoji odgovori nalikuju životu koji sve više oblikuju dragovoljna molitva, ozbiljna naknada, hrabar rad na nesavršenostima i jasnije razumijevanje duhovne koristi trpljenja."
        },
        {
          name: "Relativna savršenost",
          family: "illuminative",
          summary: "Tvoji odgovori upućuju na trajan život molitve, brižnu ljubav u suočavanju s nesavršenostima i veći mir u žrtvi. Želja za nenavezanošću, Euharistijom i božanskom ljubavlju postaje sve prožimajuća."
        },
        {
          name: "Herojska savršenost",
          family: "unitive",
          summary: "Tvoji odgovori nalikuju najvišem opisanom obrascu izvora: dubokom samozaboravu, velikodušnom prihvaćanju trpljenja za druge i kontemplativnoj molitvi oblikovanoj dubokim čišćenjem."
        }
      ],
      questions: [
        {
          kicker: "Savjest · otpor",
          title: "Kada prepoznaš ozbiljnu napast ili bližu prigodu za teški grijeh, što se najčešće događa?",
          options: [
            "Moj je otpor slab i rijetko izbjegavam prigodu, premda mi je poslije žao.",
            "Odano se opirem i obično izbjegnem prigodu čim je prepoznam.",
            "Budno izbjegavam takve prigode; teški pad izostaje ili je iznimno rijedak."
          ]
        },
        {
          kicker: "Savjest · odgovor",
          title: "Ako postaneš svjestan teškog pada, kako obično odgovaraš?",
          options: [
            "Ozbiljno mi je žao i valjano se ispovjedim.",
            "Duboko mi je žao, tražim ispovijed te činim pokoru ili naknadu.",
            "Takav pad izostaje ili je vrlo rijedak; ako me iznenadi, odmah se žarko kajem i želim činiti pokoru."
          ]
        },
        {
          kicker: "Laki grijeh · namjera",
          title: "Kako se odnosiš prema svjesnom lakom grijehu?",
          options: [
            "Mogu ga smatrati nevažnim te ga ponekad svjesno prihvatiti ili poželjeti.",
            "Ponekad je namjeran, a moj je otpor slab.",
            "Nije uobičajen; budno ga izbjegavam, a namjerni je pristanak rijedak.",
            "Nije namjeran; događa se samo zbog iznenađenja ili nepotpune svjesnosti."
          ]
        },
        {
          kicker: "Laki grijeh · naknada",
          title: "Nakon što prepoznaš laki grijeh, što najbolje opisuje tvoju žalost i odgovor?",
          options: [
            "Posvećujem mu malo pažnje i slabo nastojim spriječiti ga ili iskorijeniti.",
            "Moja je žalost često površna, bez dosljedne pripreme ili naknade.",
            "Moja je žalost snažna, premda još malo činim na području naknade.",
            "Duboko mi je žao i činim ozbiljnu naknadu."
          ]
        },
        {
          kicker: "Nesavršenosti · iskrenost",
          title: "Kako pristupaš nesavršenostima koje nisu nužno grijesi, ali ometaju ljubav?",
          options: [
            "Sklon sam ih ne otkrivati ili ih lako opravdavati te ulažem malo truda u promjenu.",
            "Ne želim imati ništa s njima i borim se hrabro i marljivo.",
            "Energično ih se čuvam, s velikom pažnjom i ljubavlju; događaju se uglavnom uz nepotpunu svjesnost.",
            "U pravilu preostaje samo prvi spontani pokret."
          ]
        },
        {
          kicker: "Nesavršenosti · odricanje",
          title: "Kada uočiš nesavršenost koja se ponavlja, što slijedi?",
          options: [
            "Prihvaćam zamisao da je se odreknem, ali ulažem malo konkretnog truda.",
            "Često činim djela odricanja i radim na određenoj kreposti.",
            "Odgovaram postojanom budnošću i ljubavlju prije nego što se obrazac učvrsti.",
            "Odricanje je brzo; nesavršenost rijetko prijeđe prvi poticaj."
          ]
        },
        {
          kicker: "Trpljenje · prvi odgovor",
          title: "Koji je tvoj uobičajeni prvi odgovor kada trpljenje uđe u tvoj život?",
          options: [
            "Izbjegavam ga i moj je mir ozbiljno poremećen.",
            "Podnosim ga uz prigovaranje i s malo mira.",
            "Podnosim ga s relativnim mirom, premda se još borim.",
            "Mogu ga prihvatiti s jasnim razumijevanjem koristi, ponešto radosti i mira.",
            "Radosno ga prihvaćam i ponekad primam radi drugih.",
            "Radosno ga prihvaćam i dragovoljno biram žrtvu radi drugih."
          ]
        },
        {
          kicker: "Trpljenje · unutarnji smisao",
          title: "Kada neizbježno trpljenje potraje, koji ti je opis najbliži?",
          options: [
            "Najvažnije mi je pobjeći i gubim nutarnji mir.",
            "Prihvaćam da ga moram podnijeti, ali prigovaranje ostaje glavno.",
            "Mogu sačuvati relativan mir i istodobno iskreno priznati borbu.",
            "Prepoznajem duhovnu korist i mogu primiti kušnju s ponešto radosti.",
            "Mir i radost sve su prisutniji te kušnju mogu prikazati za druge.",
            "Ljubav prema drugima čini žrtvu poželjnijom od osobne ugode."
          ]
        },
        {
          kicker: "Molitva · ritam",
          title: "Koliko je postojano tvoje redovito vrijeme za molitvu?",
          options: [
            "Molim s vremena na vrijeme, bez stalnog ritma.",
            "Molim redovito, ali često odustanem kad osjetim suhoću ili kad se pojave obveze.",
            "Držim se određenog vremena i načina molitve, čak i kada je teško.",
            "Molitva je postojana i rado je produžujem.",
            "Molitva sve više prožima cijeli moj dan, uključujući svakodnevni rad.",
            "Kontemplativna molitva i duboki samozaborav obilježavaju moj život."
          ]
        },
        {
          kicker: "Molitva · dubina",
          title: "Koji opis najbolje odgovara uobičajenom obilježju tvoje molitve?",
          options: [
            "Uglavnom povremena usmena molitva ili prošnje usmjerene na vremenite potrebe.",
            "Redovita usmena molitva uz pokušaje strukturiranog razmatranja.",
            "Vjerna usmena molitva i često čuvstveno razmatranje; može se pojaviti molitva jednostavnosti.",
            "Usmena i misaona molitva rado se produžuju te često postaju čuvstvene, jednostavne ili mirne.",
            "Molitva je trajna i za vrijeme rada, uz žeđ za nenavezanošću, Euharistijom, Nebom i božanskom ljubavlju.",
            "Ističu se kontemplacija, duboko čišćenje i potpuni samozaborav."
          ]
        },
        {
          kicker: "Ispit savjesti · učestalost",
          title: "Koliko redovito obavljaš ispit savjesti?",
          options: [
            "Ne prakticiram ga.",
            "Prakticiram ga povremeno.",
            "Prakticiram ga najmanje jednom dnevno, često i više puta.",
            "Prakticiram ga najmanje dvaput dnevno kao dio postojanog duhovnog ritma."
          ]
        },
        {
          kicker: "Ispit savjesti · svrha",
          title: "Koja je uobičajena svrha i forma tvojeg ispita savjesti?",
          options: [
            "Još ne posvećujem namjernu pažnju ovoj praksi.",
            "To je nestrukturiran pregled bez stalne metode ili pripreme.",
            "Moj je posebni ispit savjesti dosljedno usmjeren na izbjegavanje lakoga grijeha.",
            "Moj je posebni ispit savjesti usmjeren na rast prema savršenosti u određenoj kreposti."
          ]
        },
        {
          kicker: "Sakramenti · Euharistija",
          title: "Koji opis najbolje odgovara tvojem sudjelovanju na misi?",
          options: [
            "Sudjelujem s određenom redovitošću i želim biti dosljedniji.",
            "Sudjelujem na misi nedjeljom.",
            "Uvijek sam vjeran nedjeljnoj misi, a svakodnevno sudjelujem kada razumno mogu.",
            "Revno sudjelujem na nedjeljnoj i, kada mogu, svakodnevnoj misi."
          ]
        },
        {
          kicker: "Sakramenti · ispovijed",
          title: "Koji opis najbolje odgovara tvojem sadašnjem ritmu ispovijedi?",
          options: [
            "Valjano se ispovjedim nakon teških padova, ali još nemam postojan ritam.",
            "Nastojim se ispovjediti najmanje svaka tri mjeseca.",
            "Ispovijedam se prema redovitom rasporedu.",
            "Nastojim se ispovjediti najmanje mjesečno te ponekad pobožno iznosim nesavršenosti kako bih zadobio milost za njihovo nadvladavanje."
          ]
        }
      ]
    }
  };

  Object.entries(assessment.copy).forEach(([language, revisedCopy]) => {
    Object.assign(translations[language], revisedCopy);
  });

  const elements = {
    languageSelect: document.querySelector("#language-select"),
    introView: document.querySelector("#intro-view"),
    questionView: document.querySelector("#question-view"),
    resultView: document.querySelector("#result-view"),
    startButton: document.querySelector("#start-button"),
    exitButton: document.querySelector("#exit-button"),
    previousButton: document.querySelector("#previous-button"),
    nextButton: document.querySelector("#next-button"),
    nextButtonLabel: document.querySelector("#next-button-label"),
    questionProgress: document.querySelector("#question-progress"),
    stagePath: document.querySelector("#stage-path"),
    optionsRoot: document.querySelector("#answer-options"),
    assessmentMessage: document.querySelector("#assessment-message"),
    reviewButton: document.querySelector("#review-button"),
    printButton: document.querySelector("#print-button"),
    retakeButton: document.querySelector("#retake-button")
  };

  const state = {
    language: detectLanguage(),
    currentIndex: 0,
    answers: {},
    view: "intro"
  };

  let ascentAnimationFrame = 0;

  function detectLanguage() {
    const supported = Object.keys(translations);
    const requested = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
    for (const entry of requested) {
      const base = String(entry).toLowerCase().split("-")[0];
      if (supported.includes(base)) return base;
    }
    return "en";
  }

  function applyLanguage() {
    const copy = translations[state.language];
    document.documentElement.lang = state.language;
    document.title = copy.metaTitle;
    elements.languageSelect.value = state.language;
    elements.languageSelect.setAttribute("aria-label", copy.languageLabel);
    elements.questionProgress.setAttribute("aria-label", copy.yourProgress);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = copy[element.dataset.i18n];
      if (typeof value === "string") element.textContent = value;
    });

    renderStagePath();
    updateStartLabel();
    if (state.view === "question") renderQuestion();
    if (state.view === "result") renderResult();
  }

  function renderStagePath() {
    const copy = translations[state.language];
    elements.stagePath.innerHTML = copy.stages
      .map((stage, index) => `
        <li>
          <span class="stage-dot" aria-hidden="true"></span>
          <span class="stage-copy">
            <strong>${toRoman(index + 1)}. ${escapeHtml(stage.name)}</strong>
            <span>${escapeHtml(copy.families[stage.family])}</span>
          </span>
        </li>
      `)
      .join("");
  }

  function renderQuestion() {
    const copy = translations[state.language];
    const blueprint = questionBlueprints[state.currentIndex];
    const question = copy.questions[state.currentIndex];
    const selected = state.answers[blueprint.id];
    const isLast = state.currentIndex === questionBlueprints.length - 1;

    document.querySelector("#question-number").textContent = String(state.currentIndex + 1);
    document.querySelector("#question-total").textContent = String(questionBlueprints.length);
    document.querySelector("#progress-domain").textContent = copy.domains[blueprint.domain];
    document.querySelector("#question-kicker").textContent = question.kicker;
    document.querySelector("#question-title").textContent = question.title;
    elements.questionProgress.value = state.currentIndex + 1;
    elements.questionProgress.max = questionBlueprints.length;
    elements.previousButton.disabled = state.currentIndex === 0;
    elements.nextButton.disabled = selected === undefined;
    elements.nextButtonLabel.textContent = isLast ? copy.seeResult : copy.next;
    elements.assessmentMessage.hidden = true;

    const choices = getQuestionOptions(copy, state.currentIndex)
      .map((label, index) => ({ label, value: String(index) }));
    choices.push({ label: copy.preferNot, value: "skip" });
    elements.optionsRoot.innerHTML = choices
      .map((choice) => `
        <label class="answer-option">
          <input
            type="radio"
            name="answer"
            value="${choice.value}"
            ${String(selected) === choice.value ? "checked" : ""}
          />
          <span class="answer-content">${escapeHtml(choice.label)}</span>
        </label>
      `)
      .join("");
  }

  function showView(view) {
    state.view = view;
    elements.introView.hidden = view !== "intro";
    elements.questionView.hidden = view !== "question";
    elements.resultView.hidden = view !== "result";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openQuestionnaire() {
    showView("question");
    renderQuestion();
    requestAnimationFrame(() => document.querySelector("#question-title").focus());
  }

  function returnToIntro() {
    showView("intro");
    updateStartLabel();
    requestAnimationFrame(() => elements.startButton.focus());
  }

  function movePrevious() {
    if (state.currentIndex === 0) return;
    state.currentIndex -= 1;
    renderQuestion();
    requestAnimationFrame(() => document.querySelector("#question-title").focus());
  }

  function moveNext() {
    const blueprint = questionBlueprints[state.currentIndex];
    if (state.answers[blueprint.id] === undefined) return;

    if (state.currentIndex < questionBlueprints.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
      requestAnimationFrame(() => document.querySelector("#question-title").focus());
      return;
    }

    const answered = getAnsweredEntries();
    if (!hasMinimumCoverage(answered)) {
      const counts = countAnsweredByDomain(answered);
      const firstSkipped = questionBlueprints.findIndex((question) =>
        state.answers[question.id] === "skip" && counts[question.domain] < minimumItemsPerDomain
      );
      const anySkipped = questionBlueprints.findIndex((question) => state.answers[question.id] === "skip");
      state.currentIndex = firstSkipped >= 0 ? firstSkipped : (anySkipped >= 0 ? anySkipped : 0);
      renderQuestion();
      elements.assessmentMessage.textContent = translations[state.language].needMore;
      elements.assessmentMessage.hidden = false;
      return;
    }

    showView("result");
    renderResult();
    requestAnimationFrame(() => document.querySelector("#result-heading").focus());
  }

  function renderResult() {
    const copy = translations[state.language];
    const result = calculateResult();
    const stage = copy.stages[result.stage - 1];

    renderAscent(result, copy);

    document.querySelector("#result-number").textContent = toRoman(result.stage);
    document.querySelector("#result-family").textContent = copy.families[stage.family];
    document.querySelector("#result-heading").textContent = stage.name;
    document.querySelector("#result-summary").textContent = stage.summary;
    document.querySelector("#confidence-badge").textContent = `${result.stabilityPercent}% · ${copy.confidence[result.confidence]}`;

    const rangeText = result.lower === result.upper
      ? format(copy.rangeSingle, { stage: toRoman(result.stage) })
      : format(copy.rangeMultiple, { lower: toRoman(result.lower), upper: toRoman(result.upper) });
    document.querySelector("#result-range").textContent = rangeText;

    document.querySelector("#domain-profile").innerHTML = domainOrder
      .map((domain) => {
        const score = result.domainScores[domain];
        if (score === null) {
          return `
            <div class="domain-row">
              <div class="domain-row-head">
                <span>${escapeHtml(copy.domains[domain])}</span>
                <span class="domain-unanswered">${escapeHtml(copy.notAnswered)}</span>
              </div>
              <progress
                class="domain-track"
                value="0"
                max="6"
                aria-label="${escapeHtml(copy.domains[domain])}"
                aria-valuetext="${escapeHtml(copy.notAnswered)}"
              ></progress>
            </div>
          `;
        }
        const stageNumber = clamp(Math.round(score), 1, 6);
        const stageName = copy.stages[stageNumber - 1].name;
        return `
          <div class="domain-row">
            <div class="domain-row-head">
              <span>${escapeHtml(copy.domains[domain])}</span>
              <span class="domain-stage">${toRoman(stageNumber)} · ${escapeHtml(stageName)}</span>
            </div>
            <progress
              class="domain-track"
              value="${score.toFixed(1)}"
              max="6"
              aria-label="${escapeHtml(copy.domains[domain])}"
              aria-valuetext="${toRoman(stageNumber)} · ${escapeHtml(stageName)}"
            ></progress>
          </div>
        `;
      })
      .join("");

    document.querySelector("#answered-summary").textContent = format(copy.answeredSummary, {
      answered: result.answeredCount,
      total: questionBlueprints.length,
      domains: result.domainCount
    });
    document.querySelector("#confidence-summary").textContent = format(copy.stabilitySummary, {
      percent: result.stabilityPercent,
      stage: toRoman(result.stage),
      lower: toRoman(result.lower),
      upper: toRoman(result.upper)
    });
  }

  function renderAscent(result, copy) {
    const stagePoints = [
      { x: 30, y: 510 },
      { x: 38, y: 418 },
      { x: 42, y: 326 },
      { x: 52, y: 234 },
      { x: 48, y: 142 },
      { x: 46, y: 50 }
    ];
    const score = clamp(result.overallScore, 1, 6);
    const lowerIndex = Math.min(Math.floor(score) - 1, stagePoints.length - 2);
    const fraction = score >= 6 ? 1 : score - Math.floor(score);
    const start = stagePoints[lowerIndex];
    const end = stagePoints[Math.min(lowerIndex + 1, stagePoints.length - 1)];
    const markerX = start.x + (end.x - start.x) * fraction;
    const markerY = start.y + (end.y - start.y) * fraction;

    positionAscentMarker(
      document.querySelector("#result-ascent-marker"),
      markerX,
      markerY
    );

    const ascent = document.querySelector("#result-ascent");
    ascent.setAttribute("aria-valuenow", score.toFixed(1));
    ascent.setAttribute("aria-valuetext", format(copy.ascentPosition, {
      score: score.toFixed(1),
      stage: toRoman(result.stage)
    }));

    document.querySelector("#result-ascent-labels").innerHTML = stagePoints
      .map((point, index) => {
        const stageNumber = index + 1;
        const item = copy.stages[index];
        const classes = ["ascent-stage"];
        if (stageNumber === result.stage) classes.push("is-closest");
        if (stageNumber >= result.lower && stageNumber <= result.upper) classes.push("is-in-range");
        return `
          <li class="${classes.join(" ")} ascent-stage-${stageNumber}">
            <strong><span>${toRoman(stageNumber)}</span>${escapeHtml(item.name)}</strong>
            <small>${escapeHtml(copy.families[item.family])}</small>
          </li>
        `;
      })
      .join("");
  }

  function positionAscentMarker(marker, targetX, targetY) {
    const startX = Number(marker.dataset.x ?? 30);
    const startY = Number(marker.dataset.y ?? 510);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cancelAnimationFrame(ascentAnimationFrame);
    marker.dataset.x = String(targetX);
    marker.dataset.y = String(targetY);

    if (reducedMotion || (Math.abs(startX - targetX) < 0.1 && Math.abs(startY - targetY) < 0.1)) {
      marker.setAttribute("transform", `translate(${targetX.toFixed(1)} ${targetY.toFixed(1)})`);
      return;
    }

    const startedAt = performance.now();
    const duration = 820;
    const animate = (timestamp) => {
      const elapsed = clamp((timestamp - startedAt) / duration, 0, 1);
      const eased = 1 - (1 - elapsed) ** 3;
      const x = startX + (targetX - startX) * eased;
      const y = startY + (targetY - startY) * eased;
      marker.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      if (elapsed < 1) ascentAnimationFrame = requestAnimationFrame(animate);
    };
    ascentAnimationFrame = requestAnimationFrame(animate);
  }

  function calculateResult() {
    const answered = getAnsweredEntries();
    const grouped = Object.fromEntries(domainOrder.map((domain) => [domain, []]));
    answered.forEach(({ blueprint, score }) => grouped[blueprint.domain].push(score));

    const domainScores = Object.fromEntries(domainOrder.map((domain) => {
      const values = grouped[domain];
      return [domain, values.length ? average(values) : null];
    }));

    const representedScores = Object.values(domainScores).filter((score) => score !== null);
    const overallScore = clamp(average(representedScores), 1, 6);
    const stage = clamp(Math.round(overallScore), 1, 6);
    const stability = estimatePatternStability(grouped, stage);
    const lower = Math.min(stage, clamp(Math.round(stability.lowerScore), 1, 6));
    const upper = Math.max(stage, clamp(Math.round(stability.upperScore), 1, 6));
    const domainCount = representedScores.length;
    const counts = countAnsweredByDomain(answered);
    const minimumDomainItems = Math.min(...Object.values(counts));
    const intervalWidth = stability.upperScore - stability.lowerScore;
    let confidence = "low";
    if (answered.length >= 26 && minimumDomainItems >= 3 && stability.support >= 0.8 && intervalWidth <= 1) {
      confidence = "high";
    } else if (answered.length >= minimumAnswers && minimumDomainItems >= minimumItemsPerDomain && stability.support >= 0.6 && intervalWidth <= 1.8) {
      confidence = "moderate";
    }

    return {
      stage,
      overallScore,
      lower,
      upper,
      confidence,
      stabilityPercent: Math.round(stability.support * 100),
      domainScores,
      domainCount,
      answeredCount: answered.length
    };
  }

  function getAnsweredEntries() {
    const scale = [1, 2.25, 3.5, 4.75, 6];
    return questionBlueprints.flatMap((blueprint) => {
      const selected = state.answers[blueprint.id];
      if (selected === undefined || selected === "skip") return [];
      const directScore = scale[selected];
      const score = blueprint.reverse ? 7 - directScore : directScore;
      return [{ blueprint, score }];
    });
  }

  function getQuestionOptions(copy, index) {
    return copy.questions[index].options || copy.frequencyOptions;
  }

  function countAnsweredByDomain(answered) {
    const counts = Object.fromEntries(domainOrder.map((domain) => [domain, 0]));
    answered.forEach(({ blueprint }) => { counts[blueprint.domain] += 1; });
    return counts;
  }

  function hasMinimumCoverage(answered) {
    const counts = countAnsweredByDomain(answered);
    return answered.length >= minimumAnswers
      && domainOrder.every((domain) => counts[domain] >= minimumItemsPerDomain);
  }

  function estimatePatternStability(grouped, stage) {
    const signature = questionBlueprints
      .map((question) => `${question.id}:${state.answers[question.id] ?? "x"}`)
      .join("|");
    const random = seededRandom(signature);
    const sampleScores = [];
    let stageMatches = 0;

    for (let iteration = 0; iteration < 1000; iteration += 1) {
      const sampledDomains = domainOrder.flatMap((domain) => {
        const values = grouped[domain];
        if (!values.length) return [];
        const resampled = Array.from(
          { length: values.length },
          () => values[Math.floor(random() * values.length)]
        );
        return [average(resampled)];
      });
      const sampleScore = clamp(average(sampledDomains), 1, 6);
      sampleScores.push(sampleScore);
      if (clamp(Math.round(sampleScore), 1, 6) === stage) stageMatches += 1;
    }

    return {
      support: stageMatches / sampleScores.length,
      lowerScore: percentile(sampleScores, 0.025),
      upperScore: percentile(sampleScores, 0.975)
    };
  }

  function seededRandom(text) {
    let seed = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      seed ^= text.charCodeAt(index);
      seed = Math.imul(seed, 16777619);
    }
    return () => {
      seed += 0x6d2b79f5;
      let value = seed;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clearAndRetake() {
    state.answers = {};
    state.currentIndex = 0;
    showView("question");
    renderQuestion();
    requestAnimationFrame(() => document.querySelector("#question-title").focus());
  }

  function updateStartLabel() {
    const label = Object.keys(state.answers).length
      ? translations[state.language].continue
      : translations[state.language].start;
    const span = elements.startButton.querySelector("span");
    if (span) span.textContent = label;
  }

  function average(values) {
    if (!values.length) return 0;
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  function percentile(values, ratio) {
    if (!values.length) return 1;
    const sorted = [...values].sort((a, b) => a - b);
    const position = (sorted.length - 1) * ratio;
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    if (lower === upper) return sorted[lower];
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (position - lower);
  }

  function standardDeviation(values) {
    const mean = average(values);
    return Math.sqrt(average(values.map((value) => (value - mean) ** 2)));
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function format(template, values) {
    return Object.entries(values).reduce(
      (output, [key, value]) => output.replaceAll(`{${key}}`, String(value)),
      template
    );
  }

  function toRoman(number) {
    return ["I", "II", "III", "IV", "V", "VI"][number - 1] || String(number);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function registerWebMcpTools() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();

    const reportRegistrationError = (error) => {
      console.warn("WebMCP tool registration was unavailable.", error);
    };

    const register = (tool) => {
      try {
        void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal }))
          .catch(reportRegistrationError);
      } catch (error) {
        reportRegistrationError(error);
      }
    };

    register({
      name: "get_spiritual_reflection_questions",
      title: "Read reflection questions",
      description: "Return the spiritual reflection questions and choices in the language currently visible in the app.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        const copy = translations[state.language];
        return {
          language: state.language,
          questions: questionBlueprints.map((question, index) => ({
            id: question.id,
            domain: copy.domains[question.domain],
            prompt: copy.questions[index].title,
            options: getQuestionOptions(copy, index).map((label, optionIndex) => ({ optionIndex, label }))
          }))
        };
      }
    });

    register({
      name: "set_spiritual_reflection_answers",
      title: "Set reflection answers",
      description: "Set one or more answers in the current spiritual reflection and show the visible questionnaire.",
      inputSchema: {
        type: "object",
        properties: {
          answers: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              properties: {
                questionId: { type: "string" },
                optionIndex: { type: "integer", minimum: 0 },
                skip: { type: "boolean" }
              },
              required: ["questionId"],
              additionalProperties: false
            }
          }
        },
        required: ["answers"],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !Array.isArray(input.answers) || input.answers.length === 0) {
          throw new Error("At least one answer is required.");
        }
        let lastIndex = state.currentIndex;
        input.answers.forEach((answer) => {
          const index = questionBlueprints.findIndex((question) => question.id === answer.questionId);
          if (index < 0) throw new Error(`Unknown questionId: ${answer.questionId}`);
          const blueprint = questionBlueprints[index];
          if (answer.skip === true) {
            state.answers[blueprint.id] = "skip";
          } else {
            const optionCount = getQuestionOptions(translations[state.language], index).length;
            if (!Number.isInteger(answer.optionIndex) || answer.optionIndex < 0 || answer.optionIndex >= optionCount) {
              throw new Error(`Invalid optionIndex for ${answer.questionId}`);
            }
            state.answers[blueprint.id] = answer.optionIndex;
          }
          lastIndex = index;
        });
        state.currentIndex = lastIndex;
        showView("question");
        renderQuestion();
        return {
          updated: input.answers.length,
          answered: getAnsweredEntries().length,
          currentQuestionId: questionBlueprints[state.currentIndex].id
        };
      }
    });

    register({
      name: "calculate_spiritual_reflection_result",
      title: "Calculate reflection result",
      description: "Calculate and display the result after at least 21 questions have been answered with coverage across all seven areas.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute() {
        const answered = getAnsweredEntries();
        if (!hasMinimumCoverage(answered)) {
          throw new Error("At least 21 answered questions and two answers in every area are required.");
        }
        const result = calculateResult();
        const copy = translations[state.language];
        showView("result");
        renderResult();
        return {
          stage: result.stage,
          stageName: copy.stages[result.stage - 1].name,
          approximateScore: Number(result.overallScore.toFixed(1)),
          range: { lower: result.lower, upper: result.upper },
          patternStabilityPercent: result.stabilityPercent,
          answered: result.answeredCount,
          representedDomains: result.domainCount
        };
      }
    });

    window.addEventListener("pagehide", () => lifecycle.abort(), { once: true });
  }

  elements.languageSelect.addEventListener("change", (event) => {
    state.language = event.target.value;
    applyLanguage();
  });

  elements.startButton.addEventListener("click", openQuestionnaire);
  elements.exitButton.addEventListener("click", returnToIntro);
  elements.previousButton.addEventListener("click", movePrevious);
  elements.nextButton.addEventListener("click", moveNext);
  elements.reviewButton.addEventListener("click", () => {
    state.currentIndex = 0;
    openQuestionnaire();
  });
  elements.printButton.addEventListener("click", () => window.print());
  elements.retakeButton.addEventListener("click", clearAndRetake);
  elements.optionsRoot.addEventListener("change", (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;
    const blueprint = questionBlueprints[state.currentIndex];
    state.answers[blueprint.id] = event.target.value === "skip" ? "skip" : Number(event.target.value);
    elements.nextButton.disabled = false;
    elements.assessmentMessage.hidden = true;
  });

  applyLanguage();
  registerWebMcpTools();
})();
