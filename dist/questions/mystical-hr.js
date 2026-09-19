(() => {
  "use strict";

  window.spiritualMysticalContent = window.spiritualMysticalContent || {};
  window.spiritualMysticalContent.hr = Object.freeze({
    kicker: "Neobvezno · bez bodovanja",
    title: "Mistična iskustva i razlučivanje",
    intro: "Ova pitanja prate teme VI. stupnja i otvaraju razgovor o VII. stupnju. Odgovori ne potvrđuju nijedan od njih i ne mijenjaju tvoj rezultat. Izvor opisuje VI., ali VII. samo imenuje. Neobično iskustvo nije dokaz svetosti; njegov izostanak nije nedostatak.",
    timeframe: "Ovdje možeš uzeti u obzir i ranija iskustva, ne samo posljednjih osam tjedana. Opiši što si doživio, bez obveze da znaš njegovo podrijetlo. Slobodno odaberi nesigurnost ili preskoči pitanje.",
    privacy: "Ovi se odgovori ne šalju na poslužitelj. Privremeno se čuvaju u ovoj kartici i ostaju nakon osvježavanja. Možeš ih zasebno obrisati; briše ih i ponovni početak upitnika.",
    startButton: "Otvori pitanja o mističnim iskustvima",
    hideButton: "Sakrij pitanja",
    clearButton: "Obriši odgovore o iskustvima",
    progress: "Odgovoreno ili preskočeno: {answered}/{total}",
    answerSaved: "Odgovor je zadržan samo u ovoj kartici.",
    summaryTitle: "Bilješke za razgovor, ne potvrda stupnja",
    summaryEmpty: "Još nema odgovora o iskustvima. Ovaj je dio potpuno neobvezan.",
    summaryNote: "Ovo je sažetak tvojih odgovora, ne procjena nadnaravnoga podrijetla iskustava. Broj odgovora „da” ne povećava duhovni stupanj. Izvor ne daje kriterije VII. stupnja, a iz ovih se odgovora ne može potvrditi ni VI. ni VII. O iskustvima i njihovim trajnim plodovima možeš razgovarati s razboritim duhovnikom.",
    sourceLabel: "Veza s izvorom",
    questions: [
      {
        id: "contemplation",
        title: "Jesi li u molitvi doživio duboku usmjerenost na Boga koju nisi stvarao razmišljanjem, nego si je doživio kao primljeni dar?",
        example: "Ana započne moliti uz evanđelje. Nakon nekog vremena ne razvija nove misli, nego ostaje tiho i s ljubavlju okrenuta Bogu. To doživljava kao nešto primljeno, a ne kao stanje koje je sama proizvela.",
        clarification: "Pita se za tvoj doživljaj, ne za potvrdu ulivene kontemplacije. Obična smirenost, ugoda, snažan osjećaj ili prestanak razmišljanja sami po sebi ne dokazuju takvu milost. Nije potrebno pokušavati proizvesti ovo iskustvo.",
        sourceNote: "VI. · Molitva: milosti kontemplacije. V. spominje ulivenu molitvu, a III. i IV. jednostavnu i tihu molitvu; zato sam opis tišine ne određuje stupanj.",
        options: [
          { value: "yes", label: "Da, prepoznajem takav doživljaj." },
          { value: "unsure", label: "Možda; nisam siguran kako ga opisati." },
          { value: "no", label: "Ne prepoznajem takav doživljaj." },
          { value: "skip", label: "Preskačem ovo pitanje." }
        ]
      },
      {
        id: "purification",
        title: "Jesi li prolazio kroz dulje razdoblje molitvene suhoće i nutarnjih kušnji koje si smatrao mogućim duhovnim pročišćenjem?",
        example: "Ivan mjesecima ne nalazi prijašnju utjehu u molitvi. I dalje moli, ali ne zna radi li se o duhovnoj kušnji, iscrpljenosti ili nečemu drugome. Ne pokušava sam donijeti konačan zaključak.",
        clarification: "Izvor spominje pasivna pročišćenja, ali suhoća ili patnja same po sebi nisu dokaz takva pročišćenja niti višeg stupnja. Mogu imati različite uzroke. Brigu za zdravlje i potrebnu pomoć ne treba odgađati zbog duhovnog tumačenja.",
        sourceNote: "VI. · Molitva: izražena pasivna pročišćenja. V. također spominje pročišćenje, a III. molitvenu suhoću; iskustvo nije jedinstven znak VI.",
        options: [
          { value: "yes", label: "Da, imao sam takvo razdoblje i tako sam ga razumio." },
          { value: "unsure", label: "Imao sam teško razdoblje, ali ne znam kako ga razumjeti." },
          { value: "no", label: "Ne prepoznajem takvo razdoblje." },
          { value: "skip", label: "Preskačem ovo pitanje." }
        ]
      },
      {
        id: "phenomena",
        title: "Jesi li doživio nešto neobično što si povezao s molitvom ili Bogom — primjerice doživljaj viđenja, riječi ili zanosa?",
        example: "Mariji se tijekom molitve učini da je čula kratku rečenicu. Može opisati što je doživjela, ali ne zaključuje odmah da joj je Bog govorio. O tome mirno razgovara s duhovnikom.",
        clarification: "Možeš prijaviti doživljaj bez tvrdnje odakle dolazi. Izvor kaže da se izvanredne pojave javljaju samo ponekad: nisu nužne za VI., niti potvrđuju VI. ili VII. Ne treba ih tražiti ili izazivati, niti postupati po poruci koja nalaže štetu sebi ili drugima.",
        sourceNote: "VI. · Molitva: izvanredne pojave ponekad prate kontemplaciju. Viđenja, doživljaji riječi i zanosa ovdje su ilustracije toga općeg pojma, a ne zasebni kriteriji iz markdowna.",
        options: [
          { value: "yes", label: "Da, imao sam neobičan doživljaj koji sam tako povezao." },
          { value: "unsure", label: "Možda; nisam siguran kako opisati ono što se dogodilo." },
          { value: "no", label: "Ne, nisam imao takav doživljaj." },
          { value: "skip", label: "Preskačem ovo pitanje." }
        ]
      },
      {
        id: "union",
        title: "Jesi li doživio ono što bi opisao kao duboko sjedinjenje s Bogom?",
        example: "U molitvi Petar doživi iznimnu blizinu Bogu. Kada to poslije opisuje, kaže: „Osjećao sam se duboko sjedinjen s Bogom.” Time opisuje svoj doživljaj, a ne dokazuje kojem stupnju pripada.",
        clarification: "Pitanje namjerno traži tvoj opis. Takav odgovor ne potvrđuje trajno mistično sjedinjenje, duhovnu ženidbu ni VII. stupanj. Prolazan doživljaj i trajno duhovno stanje nisu isto.",
        sourceNote: "Dodatno pitanje za razgovor, ne kriterij preuzet iz izvora. Markdown VII. naziva „Potpuna svetost”, ali ne opisuje njegove osobine ni iskustva po kojima bi se mogao prepoznati.",
        options: [
          { value: "yes", label: "Da, tako bih opisao jedno ili više svojih iskustava." },
          { value: "unsure", label: "Možda; nisam siguran je li to dobar opis." },
          { value: "no", label: "Ne bih tako opisao svoja iskustva." },
          { value: "skip", label: "Preskačem ovo pitanje." }
        ]
      },
      {
        id: "fruits",
        title: "Ako si imao takva iskustva, što se nakon njih trajno promijenilo u tvojem odnosu prema drugim ljudima?",
        example: "Nakon snažne molitve Petar se ne pita samo što je osjetio. Tijekom sljedećih mjeseci primjećuje je li strpljiviji kod kuće i spremniji pomoći kada za to ne dobiva priznanje.",
        clarification: "Pita se za konkretne, trajnije plodove, ne za intenzitet doživljaja ili dokaz njegova podrijetla. Nesebičnost ne znači samoprezir, zanemarivanje zdravlja ili prihvaćanje zlostavljanja. Ako nije bilo takvih iskustava, odaberi tu mogućnost.",
        sourceNote: "VI. · Nesavršenosti, patnja i molitva: nesebičnost i odnos prema drugima. Ovo je pitanje o mogućim plodovima, a ne zasebna potvrda VI. ili VII.",
        options: [
          { value: "lasting", label: "Primjećujem trajniju strpljivost i nesebičnu brigu za druge." },
          { value: "mixed", label: "Promjene su male ili neujednačene." },
          { value: "none", label: "Ne primjećujem trajnu promjenu u tome." },
          { value: "unsure", label: "Još je prerano ili ne mogu procijeniti." },
          { value: "notApplicable", label: "Nisam imao takva iskustva." },
          { value: "skip", label: "Preskačem ovo pitanje." }
        ]
      },
      {
        id: "discernment",
        title: "Jesi li o tim iskustvima razgovarao s ispovjednikom ili iskusnim duhovnikom, ostajući otvoren mogućnosti da nisu nadnaravna?",
        example: "Ana duhovniku jednostavno opiše što se dogodilo. Ne traži potvrdu posebnog stupnja, nego pomoć da ostane razborita u molitvi i svakodnevnom životu. Razgovor može ostati otvoren bez konačnog zaključka.",
        clarification: "Razgovor s duhovnikom nije automatska potvrda podrijetla iskustva ni duhovnog stupnja. Ako još nisi imao priliku razgovarati, to nije negativan bod. Ovdje se uopće ne boduje.",
        sourceNote: "Dodatno pitanje za razlučivanje i odgovorno tumačenje odgovora; nije kriterij VI. ili VII. naveden u priloženom markdownu.",
        options: [
          { value: "ongoing", label: "Da, razgovor i razlučivanje još traju." },
          { value: "discussed", label: "Da, razgovarao sam, bez zahtjeva za konačnom potvrdom." },
          { value: "notYet", label: "Još nisam o tome razgovarao." },
          { value: "notApplicable", label: "Nisam imao takva iskustva za razgovor." },
          { value: "skip", label: "Preskačem ovo pitanje." }
        ]
      }
    ]
  });
})();
