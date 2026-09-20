# Audit pojmovnika za upitnik

## Svrha i granice

Ovaj audit određuje koji izrazi trebaju pomoć pri čitanju 36 pitanja, a koji se pojavljuju samo u opisima duhovnih stupnjeva. Pojmovnik objašnjava jezik; ne dodaje pitanje, uvjet, bod ili dokaz duhovnoga stupnja. Pitanja, odgovori, očekivanja, algoritam i verzija pohrane ostaju nepromijenjeni.

Izvorni `Glossary.md` koristi se kao terminološko polazište, ne kao tekst za doslovno prepisivanje. Opće definicije provjeravaju se prema suvremenim crkvenim izvorima navedenima u `TERMINOLOGY-NOTES.md`. Uža značenja potrebna ovom upitniku izričito su označena riječima „ovdje” ili „u ovom upitniku”.

## Pravilo uključivanja

Pojam pripada jezgri uz pitanja ako zadovoljava barem dva uvjeta:

1. pojavljuje se u naslovu, ponuđenom odgovoru, primjeru ili pojašnjenju;
2. pogrešno razumijevanje može promijeniti odabrani odgovor;
3. nestručnom je čitatelju vjerojatno dvosmislen;
4. pogrešno tumačenje nosi pastoralni ili sigurnosni rizik.

Izraz koji se pojavljuje samo u opisu stupnja ide u odvojenu skupinu „ne procjenjuje se”. Sigurnosni izraz može biti dostupan u cijelom pojmovniku bez povezivanja s bodovanjem ili konkretnim pitanjem. Ostali izrazi iz izvornog pojmovnika ne prenose se dok se ne pojave u korisničkom sučelju.

## Jezgra: pojmovi povezani s pitanjima

| Područje | Pojmovi | Urednička odluka |
| --- | --- | --- |
| Smrtni grijeh | Smrtni grijeh; napast, svijest i slobodan pristanak; bliska i daleka grešna prigoda; kajanje; ispovijed; pokora i popravak štete | Razlikovati osjećaj krivnje od uvjeta čina, napast od pristanka te kajanje od emocionalnog intenziteta. |
| Laki grijeh | Laki grijeh; kajanje; prvi poriv i djelomična svijest; popravak štete | „Laki” ne znači nevažan; nenamjerna misao i nesavršenost nisu automatski laki grijeh. |
| Nesavršenosti | Nesavršenost; krepost; navezanost i nenavezanost; odricanje; prvi poriv; žrtva | Nesavršenost se ne proglašava automatski grijehom. Odricanje ne isključuje zdravlje, odnose, odmor i dužnosti. |
| Patnja | Prihvaćanje patnje; mir i tiha radost; žrtva i prikazivanje teškoće | Prihvaćanje nije odobravanje zla, odbijanje pomoći ili ostajanje u zlostavljanju. Mir može postojati uz tugu i strah. |
| Molitva | Usmena molitva; nutarnja molitva; razmatranje; afektivna molitva; suhoća i utjeha; sabranost; kontemplativna molitva | Razlikovati čitanje od osobnoga molitvenog odgovora. Ne izjednačavati ugodu, malo riječi ili suhoću s duhovnim stupnjem. |
| Ispit savjesti | Ispit savjesti; posebni ispit; krepost; kajanje | Molitveni pregled konkretnih odluka nije samo prisjećanje dana niti tjeskobno pretraživanje svake misli. |
| Sakramenti | Misa, Euharistija i pričest; ispovijed; pobožna ispovijed; žar | Razlikovati misu od pričesti i ispit savjesti od ispovijedi. Rasporedi su usporedba s izvorom, ne nove obveze. |
| Viši praktični opisi | Čežnja za nebom; samozaborav; nenavezanost; sabranost; služenje | Čežnja za nebom nije želja za smrću, a samozaborav nije gubitak dostojanstva, potreba ili zdravih granica. |

Ukupno je 28 pojmova u jezgri. Svaki je izričito povezan s barem jednim pitanjem u `dist/terminology.js`; nema automatskog povezivanja po riječima.

## Pojmovi samo iz opisa stupnjeva

| Pojam | Zašto je uključen | Granica |
| --- | --- | --- |
| Pobožnost u nazivima stupnjeva | Potrebna za razumijevanje naziva I–III | Ne označava vrijednost osobe i nije zaseban rezultat. |
| Molitva jednostavnosti | Pojavljuje se u opisima molitvenog razvoja | Ne proizvodi se zaustavljanjem misli i ne dokazuje stupanj. |
| Ulivena molitva | Pojavljuje se u višim izvornim opisima | Prima se kao dar; upitnik je ne mjeri niti potvrđuje. |
| Pasivno čišćenje | Pojavljuje se u višim izvornim opisima | Nije isto što i svaka suhoća, bolest ili kriza; upitnik ga ne utvrđuje. |
| Mistika i izvanredne pojave | Potrebno za razumijevanje ograničenja V–VI | Iskustvo nije ni nužan ni dovoljan dokaz zrelosti i ne utječe na rezultat. |

## Sigurnosni pojam

**Skrupuloznost** je dostupna odvojeno od pitanja. Pojmovnik upozorava da se upitnik ne koristi za ponavljano traženje potpune sigurnosti ili kratkog olakšanja. Nejasan odgovor smije ostati nepoznat. Pobožna ispovijed i iznošenje nesavršenosti ne znače izmišljanje krivnje.

## Izrazi koji se zasad ne prenose

Izvorni izrazi poput asketske teologije, magisterija, pokreta, pravovjerja, crkvenog naučitelja, trećeg reda, pravila života, duhovnog ratovanja i korijenskoga grijeha ne pojavljuju se u pitanjima ni prikazanim kriterijima. Njihovo bi uključivanje povećalo opseg bez pomoći pri odgovaranju. Mogu se ponovno razmotriti samo ako uđu u korisničko sučelje.

## Predložak svake definicije

Svaki zapis ima:

- kratak naziv razumljiv bez stručnog predznanja;
- značenje ograničeno na ovaj upitnik;
- važnu razliku, osobito ono što pojam ne znači;
- svakodnevni autorski primjer;
- pregledane izvore;
- oznaku pitanja u kojima se koristi ili izričitu oznaku da se ne procjenjuje.

## Kriteriji prihvaćanja

- svih 36 pitanja ima barem jedan odabrani pojam;
- svih 28 ključnih pojmova dostupno je uz pitanja i u cijelom pojmovniku;
- pet pojmova iz opisa i jedna sigurnosna napomena odvojeni su od procjene;
- hrvatski i engleski zapisi imaju iste ID-jeve, skupine i izvore;
- otvaranje, pretraživanje ili čitanje pojmovnika ne mijenja odgovore, pohranu ni rezultat;
- pojmovnik je dostupan tipkovnicom, na uskom zaslonu i bez sadržaja dostupnog samo prelaskom miša.
