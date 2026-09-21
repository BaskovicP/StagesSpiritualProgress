# Terminologija uz pitanja

## Što je promijenjeno

Svih 39 pitanja ima izričito odabran skup povezanih pojmova. Jezgra sadrži 31 dvojezično objašnjenje: značenje, važnu razliku, autorski primjer i izvore. Tri nova pojma — predduhovno djetinjstvo, nutarnji život i oblikovanje savjesti — prate nova početna pitanja. Cijeli pretraživi pojmovnik dodatno odvaja pet izraza koji se pojavljuju samo u opisima stupnjeva i jednu sigurnosnu napomenu o skrupuloznosti. Tih šest zapisa nisu kriteriji procjene.

Pojmovi nisu dodatna pitanja ni kriteriji. Verzija 7 dodaje tri pitanja i njihove izričite veze s pojmovima; ostale veze ostaju nepromijenjene. Ovo nije psihometrijska validacija ni crkvena procjena osobe.

## Ključne razlike

- **Nutarnja / mentalna molitva** šira je od diskurzivnog razmatranja. **Razmatranje** uključuje osobno molitveno promišljanje i odgovor Bogu; tuđi tekst može biti poticaj, ali samo čitanje nije isto što i razmatranje. Ne treba forsirati nove misli kada molitva postaje jednostavnija. Usp. KKC 2705–2719.
- **Bliska / daleka grešna prigoda**: razlika je u ozbiljnosti opasnosti za konkretnu osobu i njezine okolnosti, ne samo u vremenskoj udaljenosti. Bliska prigoda ne ukida slobodu i ne znači neizbježan pad. Opisi nisu automatska presuda o nečijoj krivnji.
- **Egzamen / eksamen / ispit savjesti** ovdje znači molitven pregled konkretnih odluka pred Bogom, uz zahvalnost, kajanje gdje treba i sljedeći korak. Nije samo prisjećanje dana ili osjećaja. Ignacijanski dnevni egzamen koristan je primjer, ne jedina dopuštena metoda niti tvrdnja da ga izvorna tablica isključivo propisuje. Posebni ispit prati jednu poteškoću ili krepost.
- **Napast i prvi poriv** nisu isto što i slobodan pristanak; osjećaj krivnje nije dokaz smrtnoga grijeha. **Kajanje** nije mjerenje emocionalnog intenziteta.
- **Nesavršenost** nije automatski grijeh. **Nenavezanost** nije odricanje od zdravlja, dostojanstva, prijateljstva ili potrebnog odmora. **Prihvaćanje patnje** nije pasivnost pred zlostavljanjem niti odbijanje pomoći.
- **Misa i pričest** nisu ista radnja; **ispit savjesti i ispovijed** nisu zamjenjivi. Rasporedi u upitniku usporedba su s dostavljenom tablicom, ne nove univerzalne obveze. Rezultat ne odlučuje o pristupu sakramentima.

To su sažeta autorska objašnjenja za ovaj upitnik, ne citati, potpuni teološki priručnik ili dodatne ljestvice svetosti. Nazivi poput „afektivna molitva” i „samozaborav” ovdje su objašnjeni u ograničenom smislu pitanja. Izvori se navode ispod svake definicije; izmišljene priče samo pokazuju razliku i ne presuđuju stvarne slučajeve.

## Arhitektura i privatnost

- `dist/terminology/{hr,en}.js`: tekstovi, oznake i reference po jeziku.
- `dist/terminology.js`: izričita mapa pitanje → pojmovi, kategorije cijelog pojmovnika, bibliografija i sigurni HTML prikaz. Ne čita odgovore ni pohranu, ne računa rezultat i ne šalje mrežne zahtjeve.
- `dist/app.js`: povezuje trenutačno pitanje i jezik s prikazom, otvara pretraživi pojmovnik i omogućuje povratak na označeno pitanje. Čitanje pojmovnika ne mijenja odgovor.
- `dist/styles.css`: stil prikaza i vidljiv fokus; `dist/index.html`: lokalno učitavanje modula.
- Vanjski izvori otvaraju se samo na izričit klik, u novoj kartici bez pristupa izvornoj kartici i bez slanja referrera. Odgovori nisu dio URL-a. Nema automatskog dohvaćanja izvora ni dodatne pohrane. Pritiskom na poveznicu korisnik napušta lokalnu aplikaciju i posjećuje vanjsku stranicu.

## Pokrivenost svih pitanja

Prvi pojam u retku prikazan je odmah; ostali se otvaraju na klik.

| ID pitanja | Pojmovi |
| --- | --- |
| `pre-spiritual-sin-v7` | Predduhovno djetinjstvo; Smrtni grijeh; Savjest i njezino oblikovanje; Napast, svijest i slobodan pristanak |
| `pre-spiritual-prayer-v7` | Predduhovno djetinjstvo; Nutarnji život; Usmena molitva |
| `pre-spiritual-sacraments-v7` | Predduhovno djetinjstvo; Misa, Euharistija i pričest; Ispovijed (sakrament pomirenja) |
| `mortal-occasions-v4` | Bliska i daleka grešna prigoda; Smrtni grijeh; Napast, svijest i slobodan pristanak |
| `mortal-pattern-v6` | Smrtni grijeh; Bliska i daleka grešna prigoda; Napast, svijest i slobodan pristanak |
| `mortal-fall-v4` | Napast, svijest i slobodan pristanak; Smrtni grijeh |
| `mortal-response-v4` | Kajanje; Ispovijed (sakrament pomirenja); Popravak štete, zadovoljština i pokora; Smrtni grijeh |
| `venial-occurrence-v4` | Laki grijeh; Napast, svijest i slobodan pristanak; Prvi poriv i djelomična svijest |
| `venial-pattern-v6` | Laki grijeh; Kajanje; Popravak štete, zadovoljština i pokora |
| `venial-regret-v4` | Kajanje; Laki grijeh |
| `venial-reparation-v4` | Popravak štete, zadovoljština i pokora; Kajanje; Laki grijeh |
| `imperfections-pattern-v6` | Nesavršenost; Prvi poriv i djelomična svijest; Navezanost, nenavezanost i odricanje |
| `imperfections-virtue-v4` | Krepost i vježbanje kreposti; Nesavršenost |
| `imperfections-renunciation-v4` | Navezanost, nenavezanost i odricanje; Nesavršenost; Žrtva i prikazivanje teškoće Bogu |
| `imperfections-prompt-regret-v4` | Kajanje; Nesavršenost; Prvi poriv i djelomična svijest |
| `suffering-endure-v4` | Prihvaćanje patnje; Žrtva i prikazivanje teškoće Bogu; Mir i tiha radost u teškoći |
| `suffering-pattern-v6` | Prihvaćanje patnje; Mir i tiha radost u teškoći; Žrtva i prikazivanje teškoće Bogu |
| `suffering-meaning-joy-v4` | Mir i tiha radost u teškoći; Prihvaćanje patnje |
| `prayer-pattern-v6` | Nutarnja (mentalna) molitva; Usmena molitva; Razmatranje i duhovno čitanje; Suhoća i utjeha u molitvi; Sabranost i život molitve; Kontemplativna molitva |
| `prayer-meditation-v4` | Razmatranje i duhovno čitanje; Nutarnja (mentalna) molitva; Usmena molitva |
| `prayer-dryness-v4` | Suhoća i utjeha u molitvi; Nutarnja (mentalna) molitva |
| `prayer-prolong-v4` | Nutarnja (mentalna) molitva; Sabranost i život molitve |
| `prayer-loving-response-v4` | Afektivna molitva — osobni odgovor Bogu; Razmatranje i duhovno čitanje; Kontemplativna molitva |
| `examen-pattern-v6` | Ispit savjesti (egzamen / eksamen); Posebni (partikularni) ispit savjesti; Krepost i vježbanje kreposti |
| `examen-method-v4` | Ispit savjesti (egzamen / eksamen); Kajanje |
| `examen-particular-v4` | Posebni (partikularni) ispit savjesti; Ispit savjesti (egzamen / eksamen); Krepost i vježbanje kreposti; Laki grijeh |
| `sacraments-weekly-mass-v4` | Misa, Euharistija i pričest |
| `sacraments-daily-mass-v4` | Misa, Euharistija i pričest; Žar i žarko sudjelovanje |
| `sacraments-confession-schedule-v4` | Ispovijed (sakrament pomirenja); Ispit savjesti (egzamen / eksamen) |
| `sacraments-devotional-confession-v4` | Pobožna ispovijed radi rasta; Ispovijed (sakrament pomirenja); Nesavršenost; Laki grijeh |
| `sacraments-pattern-v6` | Misa, Euharistija i pričest; Ispovijed (sakrament pomirenja); Pobožna ispovijed radi rasta; Žar i žarko sudjelovanje |
| `imperfections-consent-v5` | Prvi poriv i djelomična svijest; Nesavršenost; Napast, svijest i slobodan pristanak |
| `imperfections-loving-care-v5` | Nesavršenost; Krepost i vježbanje kreposti; Navezanost, nenavezanost i odricanje |
| `suffering-joyful-acceptance-v5` | Mir i tiha radost u teškoći; Prihvaćanje patnje |
| `suffering-service-v5` | Žrtva i prikazivanje teškoće Bogu; Prihvaćanje patnje; Navezanost, nenavezanost i odricanje |
| `prayer-daily-life-v5` | Sabranost i život molitve; Nutarnja (mentalna) molitva |
| `prayer-detachment-v5` | Navezanost, nenavezanost i odricanje; Žrtva i prikazivanje teškoće Bogu |
| `prayer-desire-v5` | Čežnja za nebom; Misa, Euharistija i pričest; Žar i žarko sudjelovanje |
| `prayer-self-forgetfulness-v5` | Samozaborav; Prvi poriv i djelomična svijest; Kontemplativna molitva |

## Izvori i granice korištenja

Osnovna gradacija ostaje preuzeta iz korisničkog `stages-of-spiritual-progress.md`, a faza prije puta iz odjeljka **Pre-Spiritual Childhood** u `Navitagint.md`; `three-ways.md` daje dodatni kontekst, a `Glossary.md` terminološko polazište. Te se datoteke ne prepisuju nekritički u korisničko sučelje. Suvremeni Katekizam i Kompendij koriste se za opće definicije, a ne za stvaranje novih uvjeta ocjenjivanja. Povijesni enciklopedijski članak koristi se samo za razliku bliske/daleke prigode, ne za uvođenje povijesnih pravila ispovijedanja.

- [CCC 1854–1863](https://www.vatican.va/archive/ENG0015/__P6C.HTM)
- [CCC 1730–1735](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_3/i_freedom_and_responsibility.html)
- [Catholic Encyclopedia: Occasions of Sin](https://www.newadvent.org/cathen/11196a.htm)
- [CCC 1451–1460](https://www.vatican.va/content/catechism/en/part_two/section_two/chapter_two/article_4/vii_the_acts_of_the_penitent.html)
- [CCC 1803](https://www.vatican.va/content/catechism/en/part_three/section_one/chapter_one/article_7.html)
- [CCC 2700–2704](https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_1/expressions_of_prayer.html)
- [CCC 2705–2708](https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_1/ii_meditation.html)
- [CCC 2709–2719](https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_1/iii_contemplative_prayer.html)
- [CCC 2729–2731](https://www.vatican.va/content/catechism/en/part_four/section_one/chapter_three/article_2/ii_humble_vigilance_of_heart.html)
- [Loyola Press: The Daily Examen](https://www.ignatianspirituality.com/ignatian-prayer/the-examen/)
- [Compendium: Eucharist (§§ 271–294)](https://www.vatican.va/archive/compendium_ccc/documents/archive_2005_compendium-ccc_en.html)
- [CCC 1024–1029](https://www.vatican.va/content/catechism/en/part_one/section_two/chapter_three/article_12/ii_heaven.html)
- Korisnički izvor: `stages-of-spiritual-progress.md (I–VI)`.
- Korisnički izvor: `three-ways.md`.
- Korisnički izvor: `Glossary.md`.

## Provjera

Automatizirani testovi provjeravaju svih 36 poveznica, dvojezičnost, 28 definicija uz pitanja, pet neprocjenjivanih izraza iz opisa i jednu sigurnosnu napomenu, sigurnost HTML-a, prikaz bez utjecaja na rezultat i osnovne terminološke razlike. Izolirana provjera u Chromeu obuhvaća oba jezika, cijeli pojmovnik i pretraživanje, sve pojmove na svim pitanjima, uski mobilni i desktop prikaz, otvaranje tipkovnicom, promjenu jezika, odabir odgovora i ponovno učitavanje.
