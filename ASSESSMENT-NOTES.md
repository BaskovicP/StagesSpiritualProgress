# Assessment design notes — version 4

## What changed and why

The previous model mapped five generic answers onto 1, 2.25, 3.5, 4.75 and 6 and averaged across areas. Selecting the middle answer throughout therefore produced 3.5, rounded up to IV. Strong prayer answers could also offset deliberate venial sin or an absent examination of conscience. That arithmetic did not enforce the source's descriptions.

Version 4 replaces this with explicit, non-compensating checks. It is an independent reflection aid, not a validated test, spiritual diagnosis or declaration of sanctity. A count of supported conditions is not a confidence percentage.

## Source versus application decisions

The supplied markdown names seven stages and describes I–VI. It does not contain a questionnaire, a numerical scale, a cumulative decision algorithm or empirically calibrated thresholds.

The application makes these conservative design decisions explicit:

- It compares only practical expectations associated with I–IV. V and VI include infused prayer and contemplation; ordinary self-reported habits cannot establish those graces. VII has no supplied description.
- Higher candidates retain the positive foundations of lower candidates. Lower-stage deficiencies (weak resistance, superficial sorrow, intermittent examen) are not prerequisites that must be preserved.
- In particular, III's mortal-sin minimum is retained at IV, whose source section has no separate mortal-sin paragraph.
- II's quarterly-confession minimum is retained when III adds an established regular schedule.
- Source terms such as regular, vigilant, often, fervent and constant are operationalized using explicit answer descriptions. They are not validated cutoffs. Daily vocal prayer, where used for constant practice, is an application interpretation rather than a numerical frequency printed in IV's prayer paragraph.
- Most items concern the previous eight weeks. Confession instead concerns an established practice over recent months: an eight-week event count cannot establish or refute a quarterly schedule.
- Absence of a recognized fully knowing and freely chosen grave act is the conservative practical III check. The source's rare surprise/doubt case is not automatically adjudicated by the app; uncertainty remains unknown.

Even complete support for IV practical requirements does not confirm the full spiritual stage. The app cannot authenticate prayer of Quiet, infused contemplation, passive purification, or mystical phenomena. A separate optional module asks directly about self-reported experiences for discussion and discernment; those answers are never passed to the assessment engine and cannot change the practical result. Optional source descriptors (simplicity may emerge, purification often occurs, extraordinary phenomena sometimes occur) are not universal requirements. See `MYSTICAL-REFLECTION-NOTES.md` for the module's source mapping and limits.

## Decision rule

For a question q and a candidate threshold k in I–IV, take the most recent configured requirement for q at or below k. A question not yet required at k is not evaluated for that candidate.

Each required check returns one of four states:

- Supported: the selected answer is explicitly included among the accepted descriptions.
- Unsupported: the selected answer is assessable but does not meet that requirement.
- Unknown: skipped, unanswered, uncertain, invalid, or inconsistent with a linked answer.
- Inapplicable: an explicitly permitted conditional circumstance is established. This is not positive evidence of growth.

A candidate is supported only when every required check is supported or explicitly inapplicable AND all earlier candidates are supported. There is no compensation, sum, mean, rounding, nearest-stage distance, resampling or probability.

The result is the highest consecutively supported practical threshold, or no supported pattern when the baseline cannot be established. It never defaults to I merely because II fails. Source I itself assumes some prayer, regular Mass and confession, with regret and adequate confession after an actual mortal fall.

The results screen first reviews the next unsupported candidate (or IV if all practical candidates pass). A selector lets the reader inspect all four sets of requirements. Each entry displays the expectation, their actual answer, its status, source sections and a way to revisit that question. Counts describe checks only, not spiritual percentages.

## Key practical expectations

### Independent domain profiles

The results also describe each of the seven areas separately. For each I–IV threshold the engine reuses the existing evaluated checks for that domain, including conditional checks against the full set of answers. Every earlier configured threshold for that domain must hold; another area's strong answers cannot compensate. No-domain-rule rows are explicitly unassessed, not evidence of that stage. Permitted exemptions may satisfy conditions but at least one positively supported condition is needed to label a domain level.

The highest supported domain threshold is presented as a practical pattern, never a spiritual verdict. Adjacent thresholds with identical item IDs and accepted/exempt option sets are reported as a range. Currently mortal-sin III and IV cannot be distinguished. If the earliest configured domain threshold is not supported, no lower level is inferred; imperfections have checks only at IV, for example. The card reviews its own first unresolved threshold (or IV when all configured checks pass), independent of the overall result's next threshold. None of these profiles is averaged or used to modify the overall conjunction. The original questions and criteria are unchanged.

### Source-based criteria

| Area | II | III (in addition to retained foundations) | IV (in addition to retained foundations) |
| --- | --- | --- | --- |
| Mortal sin | Habitual avoidance of known near occasions, faithful resistance, repentance and reparative penance after an actual fall | No recognized fully deliberate mortal act; uncertainty is not a pass | Retain III's practical minimum as an application inference |
| Venial sin | Some genuine effort to resist and some sorrow | Not habitual; deliberate consent at most rare; vigilance and serious repentance | No recognized deliberate consent; serious, reasonable reparation |
| Imperfections | No separate advanced requirement | Do not import IV's demands into III | Vigilance, sustained virtue practice for love of God, frequent prudent renunciation, prompt regret after yielding |
| Suffering | Endures unavoidable difficulty | Acceptance with relative peace amid struggle | Acceptance with understanding of benefit, some joy and peace |
| Prayer | Regular vocal prayer | Stable planned meditation and fidelity during dryness; personal loving response | Constant practice, gladly prolonged when duties permit; no demand for manufactured feelings or mystical experiences |
| Examen | Actually practised, at least intermittently | At least daily, concrete and consistent, with a particular focus against a fault | At least twice daily; particular focus on growth in a virtue |
| Sacraments | Weekly Mass when able; confession at least quarterly | Daily Mass when genuinely possible; regular confession schedule | Fervent participation, at least monthly confession, actual devotional confession for growth |

The original detailed descriptions remain visible separately, including the source's weaknesses at lower stages. The criterion matrix does not replace those descriptions.

## Exact distinctions that prevent an easy IV

- Rare deliberate venial sin is not the same answer as no deliberate venial sin.
- One daily examen is not two separate daily examens; most days is not every day.
- An established quarterly confession schedule is not an established monthly one.
- Good intentions about devotional confession are not the same as actual practice.
- Kindness or a single inconvenience does not substitute for acceptance of actual difficulty with meaning, peace and some joy.
- A general intention to improve does not substitute for repeated virtue practice, prudent renunciation and prompt return after a recognized imperfection.
- An average response category has no stage value at all.

The 28 questions are distributed according to these needs rather than forced into four equal items per area. The current complete question, story, option and criterion mapping is in QUESTIONNAIRE-SOURCE-MAP.hr.md.

## Conditional, inaccessible and uncertain situations

Repentance after a mortal fall is inapplicable only when the linked occurrence answer supports no such fall. Venial repentance and reparation use the same relationship, distinguishing no recognized venial sin from no deliberate consent. Both directions are checked: claiming an actual response after a fall while also saying no fall occurred is unresolved, not a pass.

Other links are one-way prerequisites, not equivalent events. No experienced temptation may excuse an actual-resistance check when no deliberate fall is reported. No experienced dryness can excuse the dryness-response check only where established meditation is reported. No fall does not imply no temptation; regular meditation does not imply no dryness.

No realistic opportunity for weekday Mass is an explicit exception to the source's if-able clause. Unavailable confession or no assessable weekly-Mass practice remains unknown rather than wilful failure or positive evidence of advanced practice. No actual difficulty provides no evidence of how a person accepts suffering, so it is unknown rather than an automatic pass. Exemptions are always identified separately.

Illness, emotional pain, unwanted impulses, necessary care, leaving abuse, rest and unavoidable duties are not labelled sins or evidence of poor faith. Stories and clarifications distinguish a chosen response from involuntary feelings. No one should invent a sin, unsafe sacrifice or answer to obtain a result. Uncertainty may be brought to an appropriate confessor or spiritual director; the app does not resolve moral culpability.

## Architecture, privacy and migration

- Locale files contain UI language and source descriptions.
- The two question-bank files contain questions, stories, clarifications, options and plain-language expectations.
- The configuration contains stable question IDs, source references and accepted/exempt/unknown answer indices.
- The pure engine evaluates configured criteria; the application renders results and handles navigation.
- Version 4 has new question IDs and session version. Version 3 answers are never reinterpreted as answers to the new questions.
- Optional mystical self-reports have independent version 1, IDs and allowed string values. They are stored separately and never change completion, criteria, stage or counts in the core assessment. Adding this module preserves current version 4 core answers.
- Current progress and language survive refresh in the same tab through sessionStorage. There is no server, analytics, remote calculation or transmission of answers.
- Static Cloudflare packaging includes all runtime files. No clinical or psychometric validation claim is made.

## Verification and remaining limits

Automated tests exercise each gate independently, unknown and invalid answers, conditional consistency, exact IV requirements, both languages, result text, source coverage, session restoration and migration. They test implementation behavior, not theological or psychometric validity.

Qualified source review, cognitive interviews in both languages, evidence about interpretation and response bias, and empirical validation would still be needed before any accuracy claim. Neither a longer questionnaire nor stricter thresholds alone supplies that evidence.
