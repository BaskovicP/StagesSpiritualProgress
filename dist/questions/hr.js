(() => {
  "use strict";

  // Display copy is separated from the criterion rules and application behavior.
  window.spiritualQuestions = window.spiritualQuestions || {};
  window.spiritualQuestions.hr = Object.freeze([
  {
    "id": "mortal-occasions-v4",
    "kicker": "Izbjegavanje prilika",
    "title": "Kako postupam sa situacijama za koje iz iskustva znam da me vode prema smrtnom grijehu?",
    "example": "Marko zna da se u određenom društvu lako upušta u ozbiljnu prijevaru. Zato unaprijed odlučuje da neće sudjelovati u tim poslovima.",
    "clarification": "Ne radi se o svakoj neugodi ili napasti, nego o konkretnoj situaciji koja te stvarno dovodi blizu teškoga grijeha. Procijeni svoju uobičajenu praksu tijekom posljednjih osam tjedana.",
    "options": [
      "Uglavnom ih ne izbjegavam, iako prepoznajem opasnost.",
      "Ponekad ih izbjegnem, ali se često vraćam bez zaštite.",
      "Uobičajeno ih izbjegavam i poduzimam konkretne mjere opreza.",
      "Nisam prepoznao takvu situaciju ili ne mogu procijeniti."
    ],
    "expectations": {
      "2": "Uobičajeno izbjegavati poznate bliske prilike za smrtni grijeh."
    }
  },
  {
    "id": "mortal-resistance-v4",
    "kicker": "Otpor napasti",
    "title": "Kad prepoznam napast na težak grijeh, kakav je moj otpor?",
    "example": "Ivanu nude zaradu ako svjesno prevari drugu osobu. Ponuda ga privlači, ali odbija i prekida razgovor, iako zbog toga gubi novac.",
    "clarification": "Pita se za tvoju slobodnu odluku i otpor, ne za to koliko je napast bila snažna. Sama napast nije grijeh.",
    "options": [
      "Obično brzo odustanem od otpora.",
      "Pokušam se oduprijeti, ali moj je otpor često slab.",
      "Odlučno se opirem i činim ono što je potrebno da ne pristanem.",
      "U ovom razdoblju nisam prepoznao takvu napast."
    ],
    "expectations": {
      "2": "Odlučno i vjerno se opirati prepoznatoj napasti na težak grijeh."
    }
  },
  {
    "id": "mortal-fall-v4",
    "kicker": "Svjestan i slobodan čin",
    "title": "Jesam li u posljednjih osam tjedana učinio nešto za što sam tada znao da je težak grijeh i na što sam slobodno pristao?",
    "example": "Luka zna da bi lažno svjedočenje ozbiljno naštetilo nedužnoj osobi. Ipak svjesno i slobodno odluči lagati. Pitanje nije o misli koja mu je došla, nego o djelu na koje je pristao.",
    "clarification": "Za smrtni grijeh trebaju zajedno biti prisutni teška stvar, puna spoznaja i slobodan pristanak. Ako nisi siguran, nemoj nagađati niti sam sebi donositi presudu; odaberi nesigurnost i razgovaraj s ispovjednikom.",
    "options": [
      "Da, više puta.",
      "Da, jednom.",
      "Nisam siguran jesu li bili prisutni svi ti uvjeti.",
      "Ne, ne prepoznajem takav svjestan i slobodan čin."
    ],
    "expectations": {
      "3": "Ne prepoznavati svjestan i slobodan pristanak na smrtni grijeh u promatranom razdoblju; nesigurnost traži razlučivanje, ne automatsku višu procjenu."
    }
  },
  {
    "id": "mortal-response-v4",
    "kicker": "Odgovor nakon pada",
    "title": "Ako je bilo takvoga teškog pada, što sam nakon njega stvarno učinio?",
    "example": "Marko je svjesno sudjelovao u ozbiljnoj prijevari. Iskreno se pokajao, otvoreno se ispovjedio, izvršio pokoru i poduzeo ono što je mogao da vrati nepravedno uzet novac.",
    "clarification": "Odgovori za stvaran događaj, ne za ono što misliš da bi učinio. Popravak štete treba biti razborit i moguć; o osjetljivim slučajevima razgovaraj s ispovjednikom. Ako ispovijed još nije bila dostupna, to nije isto što i odbijanje ispovijedi.",
    "options": [
      "Nisam se ozbiljno pokajao niti pristupio iskrenoj ispovijedi.",
      "Ozbiljno sam se pokajao i iskreno ispovjedio, ali nisam išao dalje u pokori i popravku.",
      "Duboko sam se pokajao, iskreno ispovjedio, izvršio pokoru i razumno nastojao popraviti štetu.",
      "Nije bilo takvoga pada u ovom razdoblju.",
      "Želim se ispovjediti, ali još nisam mogao, ili ne mogu procijeniti."
    ],
    "expectations": {
      "1": "Nakon stvarnoga pada ozbiljno se pokajati i iskreno ispovjediti.",
      "2": "Nakon stvarnoga pada duboko se pokajati te uz ispovijed činiti pokoru i razumno nastojati popraviti štetu."
    }
  },
  {
    "id": "venial-occurrence-v4",
    "kicker": "Namjerni laki grijeh",
    "title": "Kako su se laki grijesi pojavljivali u mojem životu tijekom posljednjih osam tjedana?",
    "example": "Petar zna da je zajedljiva opaska pogrešna. Jednom je izgovori namjerno kako bi bocnuo prijatelja. Drugi put mu riječi izlete prije nego što ih razmotri. Ovdje razlikuj svjestan pristanak od nepromišljene reakcije.",
    "clarification": "Za opis četvrtoga stupnja izvor kaže da laki grijeh nije namjeran — ne samo da je rijetko namjeran. Neželjena misao ili sama napast nije pristanak. Ako nisi siguran je li nešto bio grijeh, odaberi nesigurnost.",
    "options": [
      "Prepoznati laki grijesi ponavljaju se kao ustaljena navika, čak i kada nisam unaprijed odlučio griješiti.",
      "Ponekad svjesno pristanem; to nije tek rijetka iznimka.",
      "Laki grijesi nisu ustaljena navika; svjestan pristanak bio je tek rijetka iznimka.",
      "Prepoznajem samo povremene nepromišljene ili nepotpuno svjesne padove, bez ustaljene navike i bez namjernoga pristanka.",
      "Nisam prepoznao laki grijeh u ovom razdoblju.",
      "Ne mogu dovoljno jasno razlikovati ili procijeniti."
    ],
    "expectations": {
      "3": "Laki grijeh nije navika, a namjeran pristanak najviše je rijetka iznimka.",
      "4": "Nema prepoznatoga namjernog pristanka na laki grijeh; 'rijetko namjerno' nije isto što i 'nikada namjerno'."
    }
  },
  {
    "id": "venial-vigilance-v4",
    "kicker": "Budnost u malim odlukama",
    "title": "Kako se odnosim prema lakom grijehu koji mogu prepoznati i izbjeći?",
    "example": "Ana primijeti da u razgovoru često omalovažava kolegicu. Počne paziti na taj trenutak i zaustavi se prije ružne rečenice, umjesto da kaže: 'To je samo mala stvar.'",
    "clarification": "Budnost nije stalno pretraživanje sebe u strahu. Pita se za mirno prepoznavanje konkretne pogreške i stvaran trud da je izbjegneš.",
    "options": [
      "Uglavnom ga smatram premalim da bih se njime bavio.",
      "Želim ga izbjeći, ali moj je trud slab ili povremen.",
      "Redovito pazim na prepoznate lake grijehe i konkretno se borim protiv njih."
    ],
    "expectations": {
      "2": "Stvarno se barem donekle boriti protiv prepoznatoga lakog grijeha, iako je otpor još slab.",
      "3": "Budno izbjegavati prepoznate lake grijehe i stvarno se boriti protiv njih."
    }
  },
  {
    "id": "venial-regret-v4",
    "kicker": "Kajanje za laki grijeh",
    "title": "Kad prepoznam da sam učinio laki grijeh, kako se kajem?",
    "example": "Luka shvati da je nepravedno odbrusio bratu. Nije mu žao samo zato što je ispao neugodan: pred Bogom iskreno priznaje pogrešku i želi je napustiti.",
    "clarification": "Duboko kajanje ne mora značiti snažan osjećaj, suze ili samoprezir. Misli se na ozbiljnu unutarnju odluku da odbaciš grijeh zato što nije u skladu s ljubavlju prema Bogu i bližnjemu.",
    "options": [
      "Uglavnom prijeđem preko toga bez žaljenja.",
      "Bude mi malo žao, ali se ne odlučujem ozbiljno promijeniti.",
      "Iskreno i ozbiljno se kajem te želim odbaciti taj grijeh.",
      "Nisam prepoznao laki grijeh u ovom razdoblju."
    ],
    "expectations": {
      "2": "Imati barem neko žaljenje zbog prepoznatoga lakog grijeha, makar još površno.",
      "3": "Ozbiljno i iskreno se kajati za prepoznati laki grijeh, a ne samo površno žaliti."
    }
  },
  {
    "id": "venial-reparation-v4",
    "kicker": "Popravak nakon pogreške",
    "title": "Što nakon lakoga grijeha stvarno učinim da popravim ono što mogu?",
    "example": "Petar je ponizio prijatelja pred drugima. Ispriča mu se i pred istim ljudima ispravi ono što je nepravedno rekao. Uz kajanje poduzme konkretan korak.",
    "clarification": "Ozbiljna naknada nije kažnjavanje sebe niti nerazborito otkrivanje privatnih stvari. To je stvaran i razmjeran popravak: primjerice isprika, ispravak neistine ili razborita pokora. Nije svaki oblik popravka moguć u svakoj situaciji.",
    "options": [
      "Uglavnom ostanem samo na osjećaju da mi je žao.",
      "Ponekad nešto popravim, ali je moj trud malen ili neredovit.",
      "Ozbiljno nastojim učiniti razuman i konkretan popravak koji je moguć.",
      "Nisam prepoznao laki grijeh u ovom razdoblju."
    ],
    "expectations": {
      "4": "Uz kajanje ozbiljno činiti razumnu i konkretnu naknadu za prepoznate lake grijehe."
    }
  },
  {
    "id": "imperfections-watch-v4",
    "kicker": "Prepoznati vezanost",
    "title": "Što činim kad prepoznam nesavršenost koju lako opravdavam?",
    "example": "Luka primijeti da se uzruja svaki put kad obitelj promijeni njegov plan. Umjesto 'Ja sam jednostavno takav', prizna koliko mu je važno da sve bude po njegovu i počne paziti na tu vezanost.",
    "clarification": "Nesavršenost ovdje nije svaka osobna mana, bolest ili nenamjeran osjećaj. Primjer je pretjerana vezanost uz vlastitu udobnost, pohvalu ili način rada koja otežava slobodan odgovor ljubavi.",
    "options": [
      "Radije je ne istražujem ili je uglavnom opravdam.",
      "Priznam je, ali uglavnom ostane samo na želji za promjenom.",
      "Budno je prepoznajem, ne opravdavam je i stvarno se protiv nje borim."
    ],
    "expectations": {
      "4": "Ne opravdavati prepoznate nesavršenosti, nego bdjeti nad njima i odlučno se protiv njih boriti."
    }
  },
  {
    "id": "imperfections-virtue-v4",
    "kicker": "Vježbati krepost",
    "title": "Pretvaram li borbu protiv nesavršenosti u redovito vježbanje konkretne kreposti radi ljubavi prema Bogu?",
    "example": "Marija želi prestati inzistirati da uvijek ima zadnju riječ. Iz ljubavi prema Bogu vježba poniznost: sasluša supruga do kraja i prihvati njegov dobar prijedlog, iako nije njezin.",
    "clarification": "Nije dovoljno samo željeti biti bolja osoba. Misli se na ponavljane, konkretne odluke kojima vježbaš krepost, primjerice strpljivost, poniznost ili velikodušnost. Ne traži se odsutnost svakoga pada.",
    "options": [
      "Nemam takvu konkretnu praksu.",
      "Povremeno pokušam, ali bez redovitog i ustrajnog truda.",
      "Redovito i ustrajno vježbam konkretnu krepost, želeći time biti ugodniji Bogu."
    ],
    "expectations": {
      "4": "Hrabro i marljivo vježbati konkretnu krepost radi veće ljubavi prema Bogu."
    }
  },
  {
    "id": "imperfections-renunciation-v4",
    "kicker": "Česta mala odricanja",
    "title": "Koliko je stvarno prisutno dobrovoljno odricanje od onoga uz što sam pretjerano vezan?",
    "example": "Petar ima dovoljno vremena za odmor, ali se teško odvaja od mobitela. Redovito ga odloži da bi mirno razgovarao s obitelji, iako bi radije nastavio gledati sadržaj.",
    "clarification": "Misli se na česte male čine slobode od vezanosti, ne na štetno uskraćivanje sna, hrane, liječenja ili potrebnog odmora. Samo planiranje odricanja nije isto što i izvršen čin.",
    "options": [
      "Uglavnom samo razmišljam o tome, ali se ne odričem.",
      "Učinim poneko odricanje, ali rijetko.",
      "Često činim konkretna, razborita odricanja od vlastitih vezanosti."
    ],
    "expectations": {
      "4": "Često poduzimati konkretne i razborite čine odricanja od prepoznatih vezanosti."
    }
  },
  {
    "id": "imperfections-prompt-regret-v4",
    "kicker": "Odmah se vratiti",
    "title": "Ako ipak pristanem na prepoznatu nesavršenost, što učinim čim to primijetim?",
    "example": "Ana primijeti da namjerno produžuje priču samo kako bi dobila još pohvala. Čim to shvati, požali zbog te vezanosti i prestane isticati sebe, umjesto da nastavi tražiti divljenje.",
    "clarification": "Pitanje počinje tek kad nešto prepoznaš i na to pristaneš. Prvi nenamjerni poriv nije isto što i slobodno prihvaćanje. 'Odmah' znači ne opravdavati svjesno nastavak nakon što si ga prepoznao.",
    "options": [
      "Nastavim i opravdavam to, iako sam prepoznao vezanost.",
      "Požalim tek kasnije; u tom trenutku uglavnom nastavim.",
      "Čim prepoznam svoj pristanak, požalim i nastojim se odmah vratiti.",
      "Nisam prepoznao takav pristanak u ovom razdoblju."
    ],
    "expectations": {
      "4": "Ako se nesavršenost ipak slobodno prihvati, odmah je požaliti kad se prepozna i nastojati se vratiti."
    }
  },
  {
    "id": "suffering-endure-v4",
    "kicker": "Ostati uz ono što treba učiniti",
    "title": "Kako sam odgovarao na stvarne teškoće koje nisam mogao razumno izbjeći?",
    "example": "Ivan treba pratiti bolesnog oca na pregled. Umoran je i teško mu je čekati, ali ne napušta oca samo zato što mu je neugodno.",
    "clarification": "Misli se na neizbježnu teškoću ili odgovornu žrtvu, ne na trpljenje zlostavljanja niti odbijanje pomoći. Traženje liječenja, zaštite i potrebnog odmora nije izbjegavanje križa.",
    "options": [
      "Zbog same neugode uglavnom pokušam pobjeći i od onoga što trebam učiniti.",
      "Izdržim i učinim što treba, iako se žalim i teško prihvaćam situaciju.",
      "Prihvatim ono što ne mogu promijeniti i ustrajem u onome što treba učiniti.",
      "U ovom razdoblju nije bilo takve stvarne teškoće."
    ],
    "expectations": {
      "2": "Podnositi neizbježne teškoće i ustrajati u odgovornosti, čak i uz prigovaranje ili malo mira."
    }
  },
  {
    "id": "suffering-peace-v4",
    "kicker": "Mir usred teškoće",
    "title": "Dok sam prolazio kroz takvu teškoću, koliko je bilo prihvaćanja i unutarnjeg mira?",
    "example": "Ana čeka važan medicinski nalaz. Osjeća strah i povremeno zaplače, ali se vraća povjerenju u Boga i mirno čini ono što taj dan može.",
    "clarification": "Relativan mir ne znači odsutnost tuge, straha ili boli. Pita se postoji li usred borbe stvarno prihvaćanje i povjerenje. Zdravstvene i psihičke poteškoće nisu dokaz manje vjere.",
    "options": [
      "Uglavnom sam potpuno gubio mir i opirao se situaciji.",
      "Podnosio sam je, ali s vrlo malo mira i mnogo prigovaranja.",
      "Prihvaćao sam je s razmjernim mirom, iako sam se i dalje borio.",
      "U ovom razdoblju nije bilo takve stvarne teškoće."
    ],
    "expectations": {
      "3": "Prihvaćati i podnositi stvarnu teškoću s relativnim mirom, iako unutarnja borba ostaje."
    }
  },
  {
    "id": "suffering-meaning-joy-v4",
    "kicker": "Smisao, mir i nešto radosti",
    "title": "Je li u stvarnoj teškoći bilo jasnog smisla, mira i barem nešto radosti što i tada mogu ljubiti Boga i druge?",
    "example": "Marija privremeno brine za bolesnu sestru. Posao je težak i nije joj drago što je sestra bolesna. Ipak vidi vrijednost te brige, prihvaća je s mirom i osjeća tihu radost što može ljubiti na konkretan način.",
    "clarification": "Ne pita se raduješ li se boli, bolesti ili tuđoj nesreći. Izvor opisuje prihvaćanje teškoće uz jasno razumijevanje dobra koje Bog može iz nje izvesti, nešto radosti i mir — ne samo izdržavanje.",
    "options": [
      "Uglavnom sam samo želio da teškoća prestane; nisam prepoznavao takav smisao.",
      "Mogao sam vjerovati da dobro postoji, ali prihvaćanje s mirom i radošću nije bilo moja stvarna praksa.",
      "Jasno sam prepoznavao dobro koje iz toga može proizaći i prihvaćao teškoću s mirom i nešto radosti.",
      "U ovom razdoblju nije bilo takve stvarne teškoće."
    ],
    "expectations": {
      "4": "Stvarnu teškoću prihvaćati s jasnim razumijevanjem mogućega dobra, mirom i barem nešto radosti."
    }
  },
  {
    "id": "prayer-vocal-v4",
    "kicker": "Redovita izgovorena molitva",
    "title": "Koliko je izgovorena molitva stvarno prisutna u mojem životu?",
    "example": "Luka navečer izgovori Očenaš ili se svojim riječima obrati Bogu. Ne učini to samo kad nastane problem, nego kao dio svojega redovitog odnosa s Bogom.",
    "clarification": "Izgovorena ili usmena molitva uključuje poznate molitve i obraćanje Bogu vlastitim riječima; može se moliti tiho. Nije manje vrijedna zato što koristi riječi. Za potrebe ovog upitnika 'stalno prakticiranje' iz izvora provjeravamo kroz postojanu svakodnevnu praksu; izvor ne određuje broj minuta. Ako su bolest ili stvarna nesposobnost onemogućile praksu i zato ne možeš procijeniti ovo razdoblje, preskoči. To ostaje nepoznato, ne računa se kao svjesno zanemarivanje.",
    "options": [
      "Gotovo je ne molim i nemam stvarnu praksu molitve.",
      "Molim povremeno i molitva mi ipak nešto znači.",
      "Izgovorena molitva redovit je dio mojega života, ali ne svakodnevan.",
      "Izgovorena molitva postojan je dio svakoga mojeg dana."
    ],
    "expectations": {
      "1": "Molitvu barem donekle cijeniti i stvarno moliti, makar povremeno.",
      "2": "Redovito prakticirati izgovorenu molitvu.",
      "4": "Stalno njegovati izgovorenu molitvu; ovaj upitnik to provjerava kao postojanu svakodnevnu praksu."
    }
  },
  {
    "id": "prayer-meditation-v4",
    "kicker": "Određeno vrijeme za razmatranje",
    "title": "Imam li ustaljeno vrijeme i način osobne molitve koji uključuje razmatranje?",
    "example": "Ana ujutro odvoji vrijeme za molitvu. Pročita evanđeoski odlomak, zastane nad njim i razgovara s Bogom o tome što je razumjela. Drži se tog vremena i kad joj se manje moli.",
    "clarification": "Razmatranje znači molitveno promisliti o evanđelju, istini vjere ili duhovnom tekstu i odgovoriti Bogu. Ne traži se točno trajanje. Stvarna nužda može promijeniti raspored; obična nezainteresiranost nije isto što i nužda.",
    "options": [
      "Nemam određeno vrijeme ni stvarnu praksu razmatranja.",
      "Ponekad razmatram, ali raspored i način još nisu postojani.",
      "Postojano čuvam određeno vrijeme i način molitve koji uključuje razmatranje."
    ],
    "expectations": {
      "3": "Biti postojano vjeran određenom vremenu i načinu molitve koji uključuje razmatranje."
    }
  },
  {
    "id": "prayer-dryness-v4",
    "kicker": "Vjernost bez ugodnog osjećaja",
    "title": "Što radim s dogovorenim vremenom molitve kad nema ugodnog osjećaja ili utjehe?",
    "example": "Ivan sjedne na molitvu, ali mu je sve suho i misli lutaju. Ne zaključuje da je molitva beskorisna. Mirno se vraća Bogu i ostane do kraja predviđenog vremena.",
    "clarification": "Suhoća sama po sebi nije dokaz višega stupnja niti se ovdje utvrđuje 'tamna noć'. Pita se samo za vjernost stvarnoj molitvi kad nema ugode. Bolest ili hitna dužnost nisu neuspjeh u molitvi.",
    "options": [
      "Obično skratim ili napustim molitvu upravo zato što nema utjehe.",
      "Ponekad ostanem, ali često zbog suhoće odustanem.",
      "Ostajem vjeran predviđenoj molitvi i kad je suha i teška.",
      "Imam ustaljenu molitvu, ali u ovom razdoblju nisam doživio takvu suhoću."
    ],
    "expectations": {
      "3": "Ostati vjeran molitvi i kroz stvarnu suhoću, umjesto odustati zbog izostanka utjehe."
    }
  },
  {
    "id": "prayer-prolong-v4",
    "kicker": "Rado ostati u molitvi",
    "title": "Kad moje obveze stvarno dopuštaju, kako se odnosim prema produljenju molitve?",
    "example": "Marija je završila svoje obveze i ima još malo slobodnog vremena. Nakon redovite molitve rado ostane još s Bogom, bez požurivanja da što prije završi.",
    "clarification": "Ne traži se produljivati molitvu na štetu obitelji, rada, sna ili zdravlja. Pita se za stvarnu, ponavljanu spremnost rado ostati u molitvi kada je to razumno moguće, ne samo za lijepu želju.",
    "options": [
      "Uglavnom želim završiti što prije, čak i kad mogu ostati.",
      "Uglavnom ostanem samo u redovitom okviru; produljenje je rijetko.",
      "Rado i u praksi produljim molitvu kada to moje stvarne obveze dopuštaju."
    ],
    "expectations": {
      "4": "Stalno njegovati molitvu i rado je produljivati kad to razumno dopuštaju obveze i zdravlje."
    }
  },
  {
    "id": "prayer-loving-response-v4",
    "kicker": "Osobni odgovor Bogu",
    "title": "Prelazi li moje razmatranje često u osoban odgovor ljubavi, povjerenja ili predanja Bogu?",
    "example": "Ana razmatra kako Isus prašta. Zatim prestane samo razmišljati o tekstu i jednostavno mu kaže: 'Hvala ti. Volim te. Pomozi mi da i ja oprostim.'",
    "clarification": "To je jednostavan smisao afektivne molitve: volja se osobno obraća Bogu u ljubavi. Ne traže se snažni osjećaji, posebni doživljaji, molitva mira ili sposobnost procjene kontemplativnih milosti.",
    "options": [
      "Molitva uglavnom ostaje na riječima ili razmišljanju bez takvoga osobnog odgovora.",
      "Takav osobni odgovor pojavi se ponekad, ali ne često.",
      "Razmatranje često prirodno prelazi u osoban odgovor ljubavi, povjerenja ili predanja Bogu."
    ],
    "expectations": {
      "3": "Razmatranje često prelazi u osoban odgovor ljubavi, povjerenja ili predanja Bogu; snažni osjećaji nisu uvjet.",
      "4": "Molitva je često osoban odgovor ljubavi Bogu, a ne samo misaono razmatranje; posebni osjećaji nisu uvjet."
    }
  },
  {
    "id": "examen-frequency-v4",
    "kicker": "Stvarna učestalost ispita savjesti",
    "title": "Koliko sam stvarno često obavljao ispit savjesti tijekom posljednjih osam tjedana?",
    "example": "Ivan se navečer kratko osvrne na dan pred Bogom. Ako to radi i u podne i navečer, to su dva odvojena ispita savjesti — ne dva pitanja unutar istoga večernjeg pregleda.",
    "clarification": "Ispit savjesti je namjeran molitveni osvrt na konkretne odluke, zahvalnost, propuste i sljedeći korak. 'Svaki dan' nije isto što i 'većinu dana'. Ako je praksa prekidana, odaberi opis koji to iskreno pokazuje. Ako su bolest ili stvarna nesposobnost onemogućile praksu i zato ne možeš procijeniti ovo razdoblje, preskoči. To ostaje nepoznato, ne računa se kao svjesno zanemarivanje.",
    "options": [
      "Ne prakticiram ispit savjesti.",
      "Prakticiram ga povremeno ili većinu dana, ali ne svaki dan.",
      "Prakticiram ga barem jednom svaki dan, ali ne najmanje dvaput svaki dan.",
      "Prakticiram ga najmanje dvaput svaki dan."
    ],
    "expectations": {
      "2": "Ispit savjesti stvarno prakticirati barem povremeno.",
      "3": "Prakticirati ispit savjesti najmanje jednom svaki dan.",
      "4": "Prakticirati ispit savjesti najmanje dvaput svaki dan."
    }
  },
  {
    "id": "examen-method-v4",
    "kicker": "Konkretan i uređen pregled",
    "title": "Kako izgleda moj ispit savjesti kada ga obavljam?",
    "example": "Petar ne ostane na zaključku 'Dan je bio tako-tako'. Pred Bogom se prisjeti konkretnog razgovora, prepozna kako je postupio i odluči što sutra treba drukčije.",
    "clarification": "Ne traži se jedna obvezna metoda niti traženje pogreške pod svaku cijenu. Potreban je dovoljno uređen i konkretan pregled da stvarno prepoznaš svoj postupak i odgovor Bogu.",
    "options": [
      "Uglavnom ostane na nejasnom dojmu o danu.",
      "Sjetim se ponekog događaja, ali pregled nema postojan način ni jasan zaključak.",
      "Imam postojan način pregleda konkretnih odluka, kajanja gdje je potrebno i jasnog sljedećeg koraka."
    ],
    "expectations": {
      "3": "Ispit savjesti provoditi postojano i konkretno, s prepoznatljivim načinom pregleda i odgovora."
    }
  },
  {
    "id": "examen-particular-v4",
    "kicker": "Poseban predmet ispita savjesti",
    "title": "Pratim li u ispitu savjesti jednu konkretnu poteškoću ili krepost kroz više dana?",
    "example": "Marija redovito provjerava svoju strpljivost. Ne pita samo je li danas odbrusila, nego i je li svjesno saslušala druge i vježbala strpljiv odgovor.",
    "clarification": "Posebni ispit savjesti ima jedan određen predmet. Izvor razlikuje redovito praćenje radi izbjegavanja lakoga grijeha od praćenja radi rasta u konkretnoj kreposti.",
    "options": [
      "Nemam određen predmet koji redovito pratim.",
      "Ponekad se vratim istoj poteškoći, ali bez postojanog praćenja.",
      "Postojano pratim konkretnu poteškoću kako bih izbjegao određeni laki grijeh.",
      "Postojano pratim i aktivno vježbanje određene kreposti, a ne samo izbjegavanje pogreške."
    ],
    "expectations": {
      "3": "Postojano prakticirati posebni ispit savjesti radi izbjegavanja određenoga lakog grijeha.",
      "4": "Posebni ispit savjesti usmjeravati na rast u konkretnoj kreposti, ne samo na izbjegavanje grijeha."
    }
  },
  {
    "id": "sacraments-weekly-mass-v4",
    "kicker": "Nedjeljna misa",
    "title": "Kako stvarno sudjelujem na nedjeljnoj misi kada za to imam razumnu mogućnost?",
    "example": "Marija putuje preko vikenda. Unaprijed pronađe misu i ode. Drugi put ostane kod kuće zbog bolesti; ta spriječenost nije isto što i slobodan izbor da ne ide.",
    "clarification": "Uzmi u obzir bolest, skrb za druge, radne obveze koje ne možeš promijeniti i stvarnu dostupnost mise. Pitanje ne proglašava krivnju za pojedini izostanak.",
    "options": [
      "Misa nije redovit dio mojega života, iako mogu sudjelovati.",
      "Idem redovito, ali preskačem neke nedjelje i kad mogu sudjelovati.",
      "Sudjelujem svake nedjelje kada stvarno mogu.",
      "Tijekom ovog razdoblja nisam imao stvarnu mogućnost sudjelovati ili ne mogu procijeniti."
    ],
    "expectations": {
      "1": "Redovito sudjelovati na misi kada je ona dostupna.",
      "2": "Sudjelovati na nedjeljnoj misi svaki tjedan kada postoji stvarna mogućnost."
    }
  },
  {
    "id": "sacraments-daily-mass-v4",
    "kicker": "Misa tijekom tjedna",
    "title": "Sudjelujem li na misi i drugim danima kada mi je to stvarno moguće?",
    "example": "Petar ima misu blizu kuće prije posla i može otići bez zanemarivanja sna ili obitelji. Redovito koristi tu mogućnost. Ana takvu mogućnost nema zbog skrbi za dijete; to samo po sebi nije manjak vjernosti.",
    "clarification": "Izvor kaže 'svakodnevna misa ako je moguće'. Ne broji se samo slobodan termin u kalendaru: uzmi u obzir udaljenost, zdravlje i dužnosti svojega staleža. Nemogućnost nije isto što i odbijanje.",
    "options": [
      "Imam stvarne mogućnosti, ali ih uglavnom ne koristim.",
      "Koristim poneku mogućnost, ali druge često preskočim bez stvarne zapreke.",
      "Sudjelujem na dnevnoj misi u danima kada mi je to razumno moguće.",
      "Moje okolnosti u ovom razdoblju nisu dopuštale dnevnu misu."
    ],
    "expectations": {
      "3": "Uz nedjeljnu misu sudjelovati i na dnevnoj misi kada to stvarne okolnosti dopuštaju."
    }
  },
  {
    "id": "sacraments-confession-schedule-v4",
    "kicker": "Stvarna praksa ispovijedi",
    "title": "Koji opis najbolje odgovara mojoj sadašnjoj, ustaljenoj praksi ispovijedi?",
    "example": "Ivan ne kaže samo da se namjerava češće ispovijedati. Pogleda kako je stvarno bilo posljednjih mjeseci: drži li se određenog rasporeda i koliko vremena obično prođe između ispovijedi.",
    "clarification": "Ovdje gledaj sadašnju praksu kroz posljednjih nekoliko mjeseci, ne samo osam tjedana. Jedna nedavna ispovijed nije sama po sebi ustaljen mjesečni raspored. Izvor razlikuje najmanje tromjesečnu, redovito raspoređenu i najmanje mjesečnu ispovijed.",
    "options": [
      "Ne pristupam ispovijedi i ne nastojim joj pristupiti.",
      "Pristupam ispovijedi, ali razmaci su obično dulji od tri mjeseca.",
      "Ispovijedam se najmanje svaka tri mjeseca, ali bez postojanog rasporeda.",
      "Držim se redovitog rasporeda, najmanje svaka tri mjeseca, ali ne najmanje jednom mjesečno.",
      "Držim se redovitog rasporeda, najmanje jednom mjesečno.",
      "Ispovijed mi nije dostupna ili još nemam dovoljno ustaljenu praksu da to procijenim."
    ],
    "expectations": {
      "1": "Stvarno pristupati ispovijedi, a ne samo imati neostvarenu namjeru.",
      "2": "Pristupati ispovijedi najmanje svaka tri mjeseca.",
      "3": "Pristupati ispovijedi prema postojanom rasporedu; nasljeđuje se najmanje tromjesečna praksa.",
      "4": "Pristupati ispovijedi prema postojanom rasporedu najmanje jednom mjesečno."
    }
  },
  {
    "id": "sacraments-devotional-confession-v4",
    "kicker": "Ispovijed radi rasta",
    "title": "Donosim li u ispovijed i prepoznate nesavršenosti, tražeći milost za njihovo nadvladavanje?",
    "example": "Marija nema prepoznat smrtni grijeh za ispovjediti. Ipak pristupa redovitoj ispovijedi, ispovjedi svoje grijehe i spomene vezanost uz pohvale s kojom se bori, tražeći milost i savjet za rast.",
    "clarification": "Nije svaka nesavršenost grijeh i ne treba izmišljati krivnju. Izvor opisuje pobožnu ispovijed radi rasta, uz poštovanje onoga što se u sakramentu stvarno ispovijeda. O primjerenom sadržaju razgovaraj s ispovjednikom.",
    "options": [
      "Ispovijed uglavnom tražim samo kad prepoznam smrtni grijeh.",
      "Ispovijedam i lake grijehe, ali prepoznate nesavršenosti još nisu dio moje stvarne prakse.",
      "U redovitoj ispovijedi donosim i prepoznate nesavršenosti, tražeći milost da ih nadvladam.",
      "Ispovijed mi nije dostupna ili ne mogu procijeniti."
    ],
    "expectations": {
      "4": "U pobožnoj ispovijedi donositi i prepoznate nesavršenosti radi milosti da ih nadvladaš, bez izmišljanja grijeha."
    }
  },
  {
    "id": "sacraments-fervent-participation-v4",
    "kicker": "Kako sudjelujem na misi",
    "title": "Kakvo je moje uobičajeno unutarnje sudjelovanje na misi?",
    "example": "Luka dođe na misu umoran i bez posebnog osjećaja. Ipak svjesno sluša, vraća pažnju kada odluta i pridružuje se molitvi i Kristovu prinosu, umjesto da samo čeka kraj.",
    "clarification": "Žarko sudjelovanje nije emocionalno uzbuđenje niti potpuna odsutnost rastresenosti. Misli se na stvarnu i postojanu namjeru da s vjerom i ljubavlju sudjeluješ, uz vraćanje pažnje koliko možeš.",
    "options": [
      "Uglavnom sam samo prisutan i ne trudim se unutarnje sudjelovati.",
      "Ponekad se svjesno uključim, ali često ostanem samo na vanjskoj prisutnosti.",
      "Postojano nastojim sudjelovati s vjerom, pažnjom i ljubavlju, vraćajući se kada odlutam."
    ],
    "expectations": {
      "4": "Postojano i žarko sudjelovati na misi s vjerom i ljubavlju, ne samo biti fizički prisutan."
    }
  }
]);
})();
