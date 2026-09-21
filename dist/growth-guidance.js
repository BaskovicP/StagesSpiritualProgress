(() => {
  "use strict";
  // Pastoral practice suggestions, not extra scoring criteria or quotations.
  // Selection is driven by each area's first unresolved practical threshold.
  const tips = {
  "hr": {
    "pre-spiritual-sin-v7": "Ako prepoznaješ tvrdoglavo ustrajanje ili umanjivanje teškog grijeha, iznesi jedan konkretan obrazac pred Boga i ispovjednika. Prvi korak nije dokazivanje vlastite vrijednosti, nego iskreno priznanje i odluka da ne ostaneš sam u borbi.",
    "pre-spiritual-prayer-v7": "Započni kratkim, iskrenim obraćanjem Bogu svaki dan, primjerice: 'Bože, pomozi mi da ti danas stvarno odgovorim.' Važniji je stvaran odnos i ustrajan mali početak nego mnogo izgovorenih riječi.",
    "pre-spiritual-sacraments-v7": "Provjeri dostupne termine mise i ispovijedi te odaberi jedan konkretan, ostvariv korak. Ako te sprječavaju zdravlje, posao ili skrb za druge, zatraži razborit savjet umjesto da nemogućnost smatraš krivnjom.",
    "mortal-occasions-v4": "Prepoznaj jednu okolnost u kojoj lako pristaneš na poznato teško zlo. Unaprijed odredi razuman način da je izbjegneš ili promijeniš, umjesto da se osloniš samo na snagu volje u tom trenutku.",
    "mortal-fall-v4": "S ispovjednikom razjasni prepoznate svjesne padove i ponavljajuće okolnosti. Ne proglašavaj svaku sumnju smrtnim grijehom; usmjeri se na slobodne izbore koje možeš mijenjati.",
    "mortal-response-v4": {
      "1": "Ako prepoznaš stvaran težak pad, iskreno se pokaj i dogovori ispovijed. Ne odgađaj povratak zbog srama.",
      "2": "Uz kajanje i ispovijed, pitaj koji je razuman popravak učinjene štete. Odaberi konkretan korak, primjerice povrat uzetoga ili iskrenu ispriku, prema savjetu ispovjednika."
    },
    "venial-occurrence-v4": {
      "3": "Odaberi jedan laki grijeh koji se ponavlja. Primijeti što mu prethodi i uvježbaj suprotan postupak, primjerice zastati prije oštre riječi.",
      "4": "Posebno prati trenutak u kojem već znaš da nešto nije dobro, a ipak želiš nastaviti. Tada zastani i izaberi drukčije; kasnije kajanje ne zamjenjuje taj slobodan izbor."
    },
    "venial-regret-v4": {
      "2": "Kad primijetiš vlastiti propust, kratko ga priznaj pred Bogom umjesto da ga opravdaš. Kajanje ne zahtijeva snažan osjećaj krivnje.",
      "3": "Poveži kajanje s osobnim odgovorom Bogu i osobi koju si povrijedio. Bez samookrivljavanja razmotri što želiš učiniti drukčije."
    },
    "venial-reparation-v4": "Nakon stvarnog propusta popravi ono što se razumno može: ispričaj se, ispravi neistinu ili obnovi zanemarenu obvezu. Popravak nije kažnjavanje sebe.",
    "imperfections-virtue-v4": "Imenuj krepost koju želiš vježbati i jedan vidljiv postupak: za strpljivost, saslušaj osobu do kraja. Navečer provjeri taj postupak, ne samo osjećaj o sebi.",
    "imperfections-renunciation-v4": "Odaberi malo, slobodno i razborito odricanje od prohtjeva radi ljubavi. Ne odriči se potrebnog sna, hrane, liječenja ili svojih dužnosti.",
    "imperfections-prompt-regret-v4": "Kad shvatiš da svjesno hraniš poznatu vezanost, prestani je opravdavati i mirno se vrati dobru. Nemoj dugo prebirati po prvom nenamjernom porivu.",
    "suffering-endure-v4": "U stvarnoj teškoći odredi samo sljedeću odgovornu stvar koju možeš učiniti. Traži potrebnu pomoć i odmor; prihvaćanje nije ostajanje bez zaštite.",
    "suffering-meaning-joy-v4": "U postojećoj teškoći pitaj: kome danas mogu iskazati ljubav i što dobro mogu sačuvati? Ne prisiljavaj sebe da osjetiš radost niti traži novu patnju.",
    "prayer-meditation-v4": "Odredi ostvarivo vrijeme i mjesto. Pročitaj kratak evanđeoski odlomak, razmotri jednu misao i osobno odgovori Bogu. Ustaljenost je važnija od velikoga početnog plana.",
    "prayer-dryness-v4": "Kad izostane utjeha, ostani u razumno odabranom vremenu molitve i blago vraćaj pažnju. Ne zaključuj da je molitva beskorisna, ali poštuj bolest i hitne dužnosti.",
    "prayer-prolong-v4": "Kad obveze dopuštaju, ostavi malo prostora da ne završiš molitvu samo zbog nestrpljenja. Ne produljuj je nauštrb obitelji, rada ili zdravlja.",
    "prayer-loving-response-v4": "Nakon razmatranja zastani i reci Bogu jednostavan osobni odgovor, primjerice zahvalu ili molbu za ljubav. Ne pokušavaj proizvesti posebno raspoloženje.",
    "examen-method-v4": "Pregledaj jedan konkretan događaj: što se dogodilo, kako si slobodno odgovorio i što je sljedeći dobar korak. Ne traži pogrešku pod svaku cijenu.",
    "examen-particular-v4": {
      "3": "Nekoliko dana prati jednu poznatu poteškoću umjesto stalnog mijenjanja predmeta. Usporedi namjeru s jednim stvarnim događajem.",
      "4": "Uz pitanje 'što nisam trebao učiniti?' dodaj 'koji čin kreposti jesam učinio?'. Primjerice, prati stvarno slušanje drugih, ne samo odsutnost odbrusivanja."
    },
    "sacraments-weekly-mass-v4": {
      "1": "Provjeri dostupne termine mise i izaberi ostvarivu redovitu praksu. Stvarnu spriječenost razlikuj od slobodnog izostanka.",
      "2": "Nedjeljnu misu planiraj unaprijed, osobito pri putovanju. Ako te spriječe bolest ili skrb za drugoga, razgovaraj o okolnostima bez automatskog pripisivanja krivnje."
    },
    "sacraments-daily-mass-v4": "Provjeri postoji li realna mogućnost mise tijekom tjedna. Uključi je kada ne zanemaruješ obitelj, posao, san i zdravlje; nedostupnost nije osobni neuspjeh.",
    "sacraments-confession-schedule-v4": {
      "1": "Ako je ispovijed dostupna, odredi konkretan termin i pripremi se jednostavno. Za dvojbe i dug prekid zatraži pomoć ispovjednika.",
      "2": "Dogovori ostvariv ritam ispovijedi; opis II. u ovom izvoru navodi barem jednom u tri mjeseca. To nije preporuka čekati toliko nakon prepoznatog teškog pada.",
      "3": "Pretvori povremenu odluku u postojan raspored koji stvarno možeš držati. S ispovjednikom razmotri prikladan ritam.",
      "4": "S ispovjednikom razmotri postojanu barem mjesečnu praksu koju opisuje izvor. Cilj nije povećavati broj iz tjeskobe nego redovit povratak i rast."
    },
    "sacraments-devotional-confession-v4": "Uz stvarne grijehe možeš ispovjedniku spomenuti prepoznatu vezanost i zatražiti savjet za rast. Ne proglašavaj svaku nesavršenost grijehom i ne izmišljaj krivnju.",
    "imperfections-consent-v5": {
      "5": "Uz poznatu nesavršenost prati kada je postaneš svjestan i što tada slobodno izabereš. Ako svjesno pristaneš, mirno se vrati; ne preimenuj svjestan izbor u nesvjesni poriv.",
      "6": "Kad prepoznaš prvi poriv, ne hrani ga daljnjim zamišljanjem ili postupkom. Ovaj obrazac razlučuj s duhovnikom; upitnik ne može dokazati odsutnost svake nesavršenosti."
    },
    "imperfections-loving-care-v5": "Izaberi jednu ponavljajuću situaciju i unaprijed se podsjeti koga želiš ljubiti. Njeguj pažljiv odgovor i kada nema priznanja; ne pretvaraj budnost u stalni nadzor sebe.",
    "suffering-joyful-acceptance-v5": "U teškoći koja već postoji njeguj povjerenje i male čine ljubavi. Tihu radost ne treba glumiti ni zahtijevati od sebe; bol i stručna pomoć imaju svoje mjesto.",
    "suffering-service-v5": {
      "5": "Odaberi jednu stvarnu potrebu druge osobe i malu pomoć koju možeš slobodno pružiti uz zdrave granice. Napor prihvati zbog dobra osobe, ne zbog vrijednosti same neugode.",
      "6": "Nastavi pouzdano služiti i kada nema novosti ili pohvale. S pouzdanom osobom provjeri održivost pomoći; ne povećavaj bol, rizik ili iscrpljenost radi višeg rezultata."
    },
    "prayer-daily-life-v5": "Uz prijelaze u danu kratko zahvali, predaj posao ili zamoli pomoć. Zatim pozorno radi. Tako odnos s Bogom može prožimati običan život bez stalnog prekidanja dužnosti.",
    "prayer-detachment-v5": "Primijeti jedan prohtjev koji smanjuje tvoju slobodu za ljubav. Učini malen suprotan izbor, primjerice prepusti posljednju riječ, i sačuvaj zdravu radost i brigu o sebi.",
    "prayer-desire-v5": "Pripremi se za Euharistiju kratkom molitvom i zahvalom te poveži nadu u zajedništvo s Bogom s jednim današnjim činom ljubavi. Ne traži jači osjećaj kao dokaz.",
    "prayer-self-forgetfulness-v5": "Učini jedno diskretno dobro bez traženja priznanja. Ako zahvala izostane, priznaj osjećaj i vrati se dobru osobe, uz zdrave granice. Razlučivanje takva dugotrajnog obrasca pripada i duhovnom vodstvu.",
    "mortal-pattern-v6": {
      "1": "Pripremi jedan konkretan odgovor za poznatu napast: udaljiti se iz situacije, kratko se pomoliti ili potražiti pouzdanu pomoć. Neželjena misao sama po sebi nije pristanak.",
      "2": "Pripremi jedan konkretan odgovor za poznatu napast: udaljiti se iz situacije, kratko se pomoliti ili potražiti pouzdanu pomoć. Neželjena misao sama po sebi nije pristanak.",
      "3": "S ispovjednikom razjasni prepoznate svjesne padove i ponavljajuće okolnosti. Ne proglašavaj svaku sumnju smrtnim grijehom; usmjeri se na slobodne izbore koje možeš mijenjati."
    },
    "venial-pattern-v6": {
      "1": "Nemoj propust odmah otpisati kao nevažan. Odaberi jednu naviku, primjerice podrugljiv komentar, i za danas smisli drukčiji odgovor.",
      "2": "Nemoj propust odmah otpisati kao nevažan. Odaberi jednu naviku, primjerice podrugljiv komentar, i za danas smisli drukčiji odgovor.",
      "3": "Prije poznate zahtjevne situacije prisjeti se svojega dogovorenog odgovora. Navečer provjeri konkretan događaj i ponovi vježbu sljedećeg dana.",
      "4": "Nakon stvarnog propusta popravi ono što se razumno može: ispričaj se, ispravi neistinu ili obnovi zanemarenu obvezu. Popravak nije kažnjavanje sebe."
    },
    "imperfections-pattern-v6": {
      "3": "Izaberi jednu poznatu vezanost, primjerice potrebu za pohvalom. Primijeti je bez tjeskobnog nadziranja svake misli i jednom dnevno svjesno učini dobro bez isticanja sebe.",
      "4": "Izaberi jednu poznatu vezanost, primjerice potrebu za pohvalom. Primijeti je bez tjeskobnog nadziranja svake misli i jednom dnevno svjesno učini dobro bez isticanja sebe.",
      "5": "Uz poznatu nesavršenost prati kada je postaneš svjestan i što tada slobodno izabereš. Ako svjesno pristaneš, mirno se vrati; ne preimenuj svjestan izbor u nesvjesni poriv.",
      "6": "Kad prepoznaš prvi poriv, ne hrani ga daljnjim zamišljanjem ili postupkom. Ovaj obrazac razlučuj s duhovnikom; upitnik ne može dokazati odsutnost svake nesavršenosti."
    },
    "suffering-pattern-v6": {
      "1": "U stvarnoj teškoći odredi samo sljedeću odgovornu stvar koju možeš učiniti. Traži potrebnu pomoć i odmor; prihvaćanje nije ostajanje bez zaštite.",
      "2": "U stvarnoj teškoći odredi samo sljedeću odgovornu stvar koju možeš učiniti. Traži potrebnu pomoć i odmor; prihvaćanje nije ostajanje bez zaštite.",
      "3": "Kad se uznemiriš, napravi prostor za kratak predah i jednostavnu molitvu povjerenja. Zatim učini ono što danas možeš; mir ne znači da ne smiješ plakati ili tražiti pomoć.",
      "4": "U postojećoj teškoći pitaj: kome danas mogu iskazati ljubav i što dobro mogu sačuvati? Ne prisiljavaj sebe da osjetiš radost niti traži novu patnju.",
      "5": "U teškoći koja već postoji njeguj povjerenje i male čine ljubavi. Tihu radost ne treba glumiti ni zahtijevati od sebe; bol i stručna pomoć imaju svoje mjesto."
    },
    "prayer-pattern-v6": {
      "1": "Veži kratku iskrenu molitvu uz jednu svakodnevnu radnju, primjerice početak dana. Kreni od onoga što stvarno možeš održati.",
      "2": "Odaberi redovito vrijeme za kratku usmenu molitvu i vraćaj mu se i kad nema posebnog poticaja.",
      "3": "Odredi ostvarivo vrijeme i mjesto. Pročitaj kratak evanđeoski odlomak, razmotri jednu misao i osobno odgovori Bogu. Ustaljenost je važnija od velikoga početnog plana.",
      "4": "Kad obveze dopuštaju, ostavi malo prostora da ne završiš molitvu samo zbog nestrpljenja. Ne produljuj je nauštrb obitelji, rada ili zdravlja.",
      "5": "Uz prijelaze u danu kratko zahvali, predaj posao ili zamoli pomoć. Zatim pozorno radi. Tako odnos s Bogom može prožimati običan život bez stalnog prekidanja dužnosti."
    },
    "examen-pattern-v6": {
      "1": "Započni kratkim pregledom jednoga dana: zahvala, konkretan postupak i sljedeći korak. Priključi ga navici koju već imaš.",
      "2": "Započni kratkim pregledom jednoga dana: zahvala, konkretan postupak i sljedeći korak. Priključi ga navici koju već imaš.",
      "3": "Uvedi jedno stalno dnevno vrijeme za kratak ispit savjesti. Ako propustiš, mirno nastavi sljedećeg dana bez nadoknađivanja dugim samoprijekorom.",
      "4": "Uz večernji pregled dodaj kratak odvojeni osvrt, primjerice u podne, ako okolnosti dopuštaju. Neka oba ostanu konkretna i molitvena, ne tjeskobno provjeravanje."
    },
    "sacraments-pattern-v6": {
      "1": "Provjeri dostupne termine mise i izaberi ostvarivu redovitu praksu. Stvarnu spriječenost razlikuj od slobodnog izostanka.",
      "2": "Dogovori ostvariv ritam ispovijedi; opis II. u ovom izvoru navodi barem jednom u tri mjeseca. To nije preporuka čekati toliko nakon prepoznatog teškog pada.",
      "3": "Pretvori povremenu odluku u postojan raspored koji stvarno možeš držati. S ispovjednikom razmotri prikladan ritam.",
      "4": "Prije mise odaberi jednu jednostavnu nakanu. Tijekom slušanja i molitve mirno se vraćaj pažnji; žar nije mjera emocionalnog uzbuđenja."
    }
  },
  "en": {
    "pre-spiritual-sin-v7": "If you recognize stubborn persistence or minimization of grave sin, bring one concrete pattern honestly before God and a confessor. The first step is not proving your worth, but admitting the truth and choosing not to face the struggle alone.",
    "pre-spiritual-prayer-v7": "Begin with one short, sincere turning to God each day, such as: 'God, help me truly respond to you today.' A real relationship and a small persevering beginning matter more than many spoken words.",
    "pre-spiritual-sacraments-v7": "Check available times for Mass and confession and choose one concrete, achievable step. If health, work or care for others prevents access, seek prudent guidance rather than treating inability as guilt.",
    "mortal-occasions-v4": "Identify one circumstance in which you readily consent to known grave wrongdoing. Plan a reasonable way to avoid or change it instead of relying only on willpower in the moment.",
    "mortal-fall-v4": "Discuss recognized deliberate falls and recurring circumstances with your confessor. Do not label every doubt a mortal sin; focus on free choices you can change.",
    "mortal-response-v4": {
      "1": "If you recognize a real grave fall, repent sincerely and arrange confession. Do not let shame postpone your return.",
      "2": "Alongside repentance and confession, ask what reasonable repair of the harm is possible, such as returning something taken or making a sincere apology, with your confessor's guidance."
    },
    "venial-occurrence-v4": {
      "3": "Choose one recurring venial sin. Notice what leads up to it and rehearse an alternative, such as pausing before a harsh word.",
      "4": "Attend especially to the moment when you already know something is wrong but want to continue. Pause and choose differently; later regret does not replace that free choice."
    },
    "venial-regret-v4": {
      "2": "When you notice your own fault, briefly acknowledge it before God rather than excusing it. Repentance does not require intense feelings of guilt.",
      "3": "Connect repentance with a personal response to God and the person harmed. Without self-condemnation, consider what you want to do differently."
    },
    "venial-reparation-v4": "After an actual fault, repair what reasonably can be repaired: apologize, correct a falsehood or restore a neglected duty. Reparation is not self-punishment.",
    "imperfections-virtue-v4": "Name a virtue and one visible action: for patience, listen until the other person finishes. Review the action in the evening, not just how you feel about yourself.",
    "imperfections-renunciation-v4": "Choose a small, free and prudent sacrifice of a preference for love's sake. Do not give up necessary sleep, food, treatment or duties.",
    "imperfections-prompt-regret-v4": "When you realize you are knowingly feeding an attachment, stop excusing it and calmly return to the good. Do not dwell anxiously on the first involuntary impulse.",
    "suffering-endure-v4": "In an actual difficulty, identify just the next responsible thing you can do. Seek needed help and rest; acceptance does not mean going without protection.",
    "suffering-meaning-joy-v4": "Within an existing difficulty, ask whom you can love today and what good you can preserve. Do not force yourself to feel joy or seek new suffering.",
    "prayer-meditation-v4": "Choose an achievable time and place. Read a short Gospel passage, consider one thought and respond personally to God. Consistency matters more than an ambitious initial plan.",
    "prayer-dryness-v4": "When consolation is absent, remain for the reasonable time you chose and gently return your attention. Do not assume prayer is useless, but respect illness and urgent duties.",
    "prayer-prolong-v4": "When duties allow, leave a little room not to end prayer merely out of impatience. Do not extend it at the expense of family, work or health.",
    "prayer-loving-response-v4": "After reflection, pause and offer a simple personal response to God, such as thanks or a request for love. Do not try to produce a special mood.",
    "examen-method-v4": "Review one actual event: what happened, how you freely responded and the next good step. Do not look for a fault at any cost.",
    "examen-particular-v4": {
      "3": "Follow one known difficulty for several days rather than constantly changing focus. Compare your intention with one actual event.",
      "4": "Alongside 'what should I not have done?', ask 'what act of virtue did I do?'. Track genuinely listening, for example, not merely avoiding a sharp reply."
    },
    "sacraments-weekly-mass-v4": {
      "1": "Check available Mass times and choose an achievable regular practice. Distinguish genuine inability from freely choosing not to attend.",
      "2": "Plan Sunday Mass ahead, especially when traveling. If illness or caring duties prevent attendance, discuss the circumstances without automatically assigning blame."
    },
    "sacraments-daily-mass-v4": "Look for a realistic opportunity for weekday Mass without neglecting family, work, sleep or health. Lack of access is not personal failure.",
    "sacraments-confession-schedule-v4": {
      "1": "If confession is available, choose a definite time and prepare simply. Ask a confessor for help with doubts or a long absence.",
      "2": "Arrange an achievable rhythm; this source describes at least quarterly confession at II. This is not advice to wait that long after a recognized grave fall.",
      "3": "Turn occasional intention into a regular schedule you can keep. Discuss an appropriate rhythm with your confessor.",
      "4": "Discuss with your confessor the regular, at-least-monthly practice described in the source. The aim is faithful return and growth, not increasing frequency out of anxiety."
    },
    "sacraments-devotional-confession-v4": "Alongside actual sins, you can mention a known attachment to your confessor and ask for guidance. Do not declare every imperfection sinful or invent guilt.",
    "imperfections-consent-v5": {
      "5": "With one known imperfection, notice when you become aware and what you freely choose then. Calmly return after consent; do not relabel a deliberate choice as an unconscious impulse.",
      "6": "When you recognize the first impulse, do not feed it through further imagining or action. Discern this pattern with a spiritual director; a questionnaire cannot prove the absence of every imperfection."
    },
    "imperfections-loving-care-v5": "Choose one recurring situation and remember whom you want to love. Nurture an attentive response even without recognition; do not turn vigilance into constant self-surveillance.",
    "suffering-joyful-acceptance-v5": "Within an existing difficulty, nurture trust and small acts of love. Quiet joy cannot be forced or performed; pain and professional support have their place.",
    "suffering-service-v5": {
      "5": "Choose an actual need and a small act of help you can freely offer with healthy boundaries. Accept the effort for the person's good, not for discomfort itself.",
      "6": "Continue reliable service without novelty or praise. Review its sustainability with someone trusted; do not increase pain, danger or exhaustion for a higher result."
    },
    "prayer-daily-life-v5": "At transitions in the day, briefly give thanks, offer your work or ask for help. Then work attentively. Relationship with God can permeate ordinary life without constantly interrupting duties.",
    "prayer-detachment-v5": "Notice one preference that reduces your freedom to love. Make a small contrary choice, such as letting go of the last word, while preserving healthy enjoyment and self-care.",
    "prayer-desire-v5": "Prepare for the Eucharist with brief prayer and thanksgiving, and connect hope for communion with God to one loving action today. Do not seek stronger feelings as proof.",
    "prayer-self-forgetfulness-v5": "Do one discreet good deed without seeking recognition. If thanks do not come, acknowledge the feeling and return to the person's good, with healthy boundaries. Discernment of a lasting pattern also belongs in spiritual direction.",
    "mortal-pattern-v6": {
      "1": "Prepare one concrete response to a familiar temptation: leave the situation, pray briefly or seek trusted support. An unwanted thought is not itself consent.",
      "2": "Prepare one concrete response to a familiar temptation: leave the situation, pray briefly or seek trusted support. An unwanted thought is not itself consent.",
      "3": "Discuss recognized deliberate falls and recurring circumstances with your confessor. Do not label every doubt a mortal sin; focus on free choices you can change."
    },
    "venial-pattern-v6": {
      "1": "Do not immediately dismiss a fault as unimportant. Choose one habit, such as a mocking comment, and plan a different response for today.",
      "2": "Do not immediately dismiss a fault as unimportant. Choose one habit, such as a mocking comment, and plan a different response for today.",
      "3": "Before a familiar difficult situation, recall your planned response. In the evening review one actual event and repeat the practice the next day.",
      "4": "After an actual fault, repair what reasonably can be repaired: apologize, correct a falsehood or restore a neglected duty. Reparation is not self-punishment."
    },
    "imperfections-pattern-v6": {
      "3": "Choose one known attachment, such as seeking praise. Notice it without anxiously monitoring every thought, and do a quiet good deed without drawing attention to yourself.",
      "4": "Choose one known attachment, such as seeking praise. Notice it without anxiously monitoring every thought, and do a quiet good deed without drawing attention to yourself.",
      "5": "With one known imperfection, notice when you become aware and what you freely choose then. Calmly return after consent; do not relabel a deliberate choice as an unconscious impulse.",
      "6": "When you recognize the first impulse, do not feed it through further imagining or action. Discern this pattern with a spiritual director; a questionnaire cannot prove the absence of every imperfection."
    },
    "suffering-pattern-v6": {
      "1": "In an actual difficulty, identify just the next responsible thing you can do. Seek needed help and rest; acceptance does not mean going without protection.",
      "2": "In an actual difficulty, identify just the next responsible thing you can do. Seek needed help and rest; acceptance does not mean going without protection.",
      "3": "When distressed, make room for a brief pause and a simple prayer of trust. Then do what is possible today; peace does not forbid tears or seeking help.",
      "4": "Within an existing difficulty, ask whom you can love today and what good you can preserve. Do not force yourself to feel joy or seek new suffering.",
      "5": "Within an existing difficulty, nurture trust and small acts of love. Quiet joy cannot be forced or performed; pain and professional support have their place."
    },
    "prayer-pattern-v6": {
      "1": "Attach a short sincere prayer to an everyday action, such as starting the day. Begin with something you can actually sustain.",
      "2": "Choose a regular time for a short vocal prayer and return to it even without a special impulse.",
      "3": "Choose an achievable time and place. Read a short Gospel passage, consider one thought and respond personally to God. Consistency matters more than an ambitious initial plan.",
      "4": "When duties allow, leave a little room not to end prayer merely out of impatience. Do not extend it at the expense of family, work or health.",
      "5": "At transitions in the day, briefly give thanks, offer your work or ask for help. Then work attentively. Relationship with God can permeate ordinary life without constantly interrupting duties."
    },
    "examen-pattern-v6": {
      "1": "Begin with a brief review of one day: gratitude, a concrete action and a next step. Attach it to a habit you already have.",
      "2": "Begin with a brief review of one day: gratitude, a concrete action and a next step. Attach it to a habit you already have.",
      "3": "Set one regular daily time for a brief examen. If you miss it, calmly resume without making up for it through prolonged self-reproach.",
      "4": "Alongside your evening review, add a short separate review, perhaps at midday, as circumstances allow. Keep both concrete and prayerful rather than anxious checking."
    },
    "sacraments-pattern-v6": {
      "1": "Check available Mass times and choose an achievable regular practice. Distinguish genuine inability from freely choosing not to attend.",
      "2": "Arrange an achievable rhythm; this source describes at least quarterly confession at II. This is not advice to wait that long after a recognized grave fall.",
      "3": "Turn occasional intention into a regular schedule you can keep. Discuss an appropriate rhythm with your confessor.",
      "4": "Before Mass, choose one simple intention. While listening and praying, calmly return your attention; fervor is not measured by emotional excitement."
    }
  }
};
  const maintain = {
  "hr": {
    "seriousSin": "Čuvaj budnost i izbjegavanje poznatih prigoda. Izvor nakon III. ne daje novi zasebni kriterij za smrtni grijeh: ne treba izmišljati stroža pravila ili analizirati svaku misao.",
    "venialSin": "Nastavi izbjegavati namjerni pristanak, vraćati se nakon propusta i razumno popravljati štetu. Za ovo područje izvor nakon IV. ne daje novi zasebni kriterij.",
    "imperfections": "Njeguj ponizan i miran povratak dobru, bez zaokupljenosti vlastitom savršenošću. Daljnje razlučivanje pripada osobnom duhovnom vodstvu; izvor nema uvjete VII.",
    "suffering": "Njeguj slobodnu i razboritu ljubav uz potrebnu pomoć, odmor i granice. Sljedeći korak nije više boli niti traženje opasnosti.",
    "prayer": "Nastavi vjernu molitvu i služenje u svakodnevnim dužnostima. Ne pokušavaj proizvesti kontemplaciju ili posebne doživljaje; razgovaraj o plodovima života s duhovnikom.",
    "examen": "Zadrži kratak, konkretan molitveni pregled i rad na kreposti. Izvor nakon IV. ne traži više dnevnih ispita; cilj nije tjeskobno praćenje sebe.",
    "sacraments": "Čuvaj redovito i pažljivo sudjelovanje prema stvarnim mogućnostima. Izvor nakon IV. ne uvodi stroži raspored; prikladan ritam razlučuj s ispovjednikom."
  },
  "en": {
    "seriousSin": "Preserve vigilance and avoidance of known occasions. The source adds no separate mortal-sin criterion after III: do not invent stricter rules or analyze every thought.",
    "venialSin": "Continue avoiding deliberate consent, returning after faults and reasonably repairing harm. The source adds no separate criterion for this area after IV.",
    "imperfections": "Nurture a humble, calm return to the good without preoccupation with personal perfection. Further discernment belongs in spiritual direction; the source gives no criteria for VII.",
    "suffering": "Nurture free, prudent love with needed help, rest and boundaries. The next step is not more pain or seeking danger.",
    "prayer": "Continue faithful prayer and service within everyday duties. Do not try to produce contemplation or special experiences; discuss the fruits of your life with a spiritual director.",
    "examen": "Keep a brief, concrete prayerful review and work on virtue. The source does not require more daily examinations after IV; the aim is not anxious self-monitoring.",
    "sacraments": "Preserve regular, attentive participation according to real opportunities. The source gives no stricter schedule after IV; discern an appropriate rhythm with your confessor."
  }
};
  function describe(profile, questions, copy, language) {
    const unresolved = profile.targetChecks.filter(check => ["notMet", "unknown"].includes(check.status));
    const items = unresolved.map(check => {
      const index = questions.findIndex(question => question.id === check.id);
      const question = questions[index];
      const tip = tips[language][check.id];
      return { id: check.id, index, status: check.status, ruleStage: check.ruleStage,
        expectation: question.expectations[check.ruleStage],
        action: check.status === "unknown" ? copy.growth.unknownAction
          : typeof tip === "string" ? tip : tip[check.ruleStage] };
    });
    return { domain: profile.domain, targetStage: profile.targetStage, items,
      maintenance: maintain[language][profile.domain] };
  }
  window.spiritualGrowthGuidance = Object.freeze({ describe, tips, maintain });
})();
