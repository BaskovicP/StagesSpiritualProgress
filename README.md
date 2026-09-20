# Spiritual Progress Reflection

A private, independent, bilingual (English/Croatian) browser questionnaire for reflecting on the seven named stages of spiritual progress. Version 5 compares practical expectations associated with I–VI, without averaging or authenticating spiritual or mystical states. V–VI use explicitly limited practical proxies, not the full source descriptions; VII is named only in the source. It is not an official publication or assessment of any organization.

## Privacy

The application is completely static. It uses `sessionStorage` only to preserve the current questionnaire state across refreshes in the same browser tab. That temporary state is cleared when the tab's page session ends.

It does not use:

- a backend or database;
- cookies or local storage;
- analytics, trackers, accounts, or identifiers;
- network requests after the page assets load.

Answers, the current question, result view, and language choice are saved only in that tab's temporary session storage. They are never transmitted to a server.

## Cloudflare Pages deployment

### Cloudflare Workers with Git integration

The included `wrangler.jsonc` deploys the static `dist` directory through Cloudflare Workers Static Assets. Use these build settings:

- Production branch: `main`
- Build command: leave blank
- Deploy command: `npx wrangler deploy`
- Non-production branch deploy command: `npx wrangler versions upload`
- Root directory: `/`

The Worker name is `stagesspiritualprogress` and must match the project name in Cloudflare.

### Recommended: Git integration

1. Push this directory to a GitHub or GitLab repository.
2. In Cloudflare, open **Workers & Pages**.
3. Choose **Create application → Pages → Connect to Git**.
4. Select the repository and use:

   - Production branch: `main`
   - Framework preset: `None`
   - Build command: leave blank
   - Build output directory: `dist`

5. Select **Save and Deploy**.

### Fastest: direct upload

Upload `spiritual-progress-questionnaire-cloudflare.zip` through **Workers & Pages → Create application → Get started → Drag and drop your files**. The ZIP already contains `index.html` and every required asset at its root.

Cloudflare does not let an existing Direct Upload project switch to Git integration later. Use the Git option above if you want every future code change to deploy automatically.

The included `dist/_headers` file adds restrictive security and privacy headers on Cloudflare Pages.

## Local preview

Serve the `dist` directory with any static file server. For example:

```sh
python3 -m http.server 4173 --directory dist
```

Then open `http://localhost:4173`.

## Languages

The app chooses the first supported language in the browser's language preferences, falling back to English. The visitor may switch languages without reloading; the choice is kept only in the current tab's session storage.

Translations, stage descriptions, interface labels, accessibility text, and question text are kept outside the application logic:

- `dist/locales/en.js` and `hr.js` contain interface copy and source descriptions;
- `dist/questions/en.js` and `hr.js` contain questions, answer descriptions, stories, clarifications and criterion explanations;
- `dist/terminology/en.js` and `hr.js` contain a bilingual glossary; `dist/terminology.js` owns the explicit per-question associations, bibliography and presentation-only renderer;
- `dist/growth-guidance.js` contains bilingual practical next steps and selects them from unresolved criteria;
- `dist/assessment-config.js` contains versioned IDs, source references and accepted, exempt or unknown options for each threshold;
- `dist/assessment-engine.js` is the pure all-required-criteria evaluator;
- `dist/result-presentation.js` and `.css` render accessible icon-and-label requirement summaries, with their text in the locale files;
- `dist/app.js` contains rendering, navigation, temporary session handling and browser-tool integration.

To add a language, provide its locale, question bank, terminology and growth guidance, load them before `app.js`, and add it to the language selector. Question IDs, order, option indices and expectation keys must match `questionBlueprints`. Glossary term IDs and source associations must also match the existing languages.

## Gradation presentation

`dist/gradation.js` is a presentation-only module: it maps the seven explicit overview choices to source ranges and renders accessible, expandable ladders. `assessment-config.js` owns the source associations and independent requirements; `questions/{hr,en}.js` owns answer headings, stories and wording; `locales/{hr,en}.js` owns interface labels. `result-presentation.css` styles the native radio cards and ladders. No external libraries or services are required.

## Questionnaire model

### Seven blocks for each area's practical thresholds

Each domain card has seven square blocks below its supported pattern. Gold checkmarks mark only thresholds whose **domain-specific** engine status is `supported`; hollow blocks are not yet supported, `?` means clarification is needed, and a slash marks wholly inapplicable criteria. Grey dashes mean no separate assessment, never a failed requirement. The source ceilings and missing lower rules are preserved (for example, imperfections I–II); VII is always unassessed.

This is an accessible labelled list, not a percentage or a holiness score. `result-presentation.js` reads `domainProfiles[].stages` without changing answers, scoring or storage. Its bilingual labels live under `stageBlocks` in the locale files. Symbols and a visible legend keep the meaning readable without colour, including when printed.

### What is still needed for the next overall stage?

The main result includes an immediate, bilingual next-step overview. It groups every unsupported or unclear condition for the engine's **next overall threshold** by area. Each area shows an exact expectation, the current answer, one existing practical suggestion and a direct question-review button; further unresolved conditions expand in place. A separate disclosure identifies already-supported areas, inapplicable circumstances and areas with no source requirements at that threshold.

`dist/next-stage.js` is presentation-only. It reuses the engine's `targetChecks` and the existing `growth-guidance.js` actions; it does not use each area's independently higher target to block the overall next step. Unknown or contradictory answers receive clarification guidance, not demands for stricter practice. With no supported initial stage the target is I; at VI it displays maintenance and the source limit, never invented VII criteria. Strings live in `locales/{hr,en}.js` under `nextStageSummary`. Answer indices, scoring, questionnaire version and session storage are unchanged.

### Terms beside every question

All 36 questions have curated terminology from 28 bilingual question-linked definitions. A searchable full glossary is available before, during and after the questionnaire. It separately includes five expressions used only in stage descriptions and one safety note on scrupulosity; those six entries are explicitly not assessment criteria. Beside a question, the main meaning and important distinction remain visible while related terms are grouped in one keyboard-accessible disclosure. Definitions distinguish interior prayer from meditation and reading, proximate from remote occasions of sin, examen from merely recalling the day, temptation from consent, and Mass from Communion. Read the [terminology implementation and sources](TERMINOLOGY-NOTES.md) and the [Croatian inclusion audit](GLOSSARY-AUDIT.hr.md).

These explanations do not change the answer options, criteria, version-6 storage or scoring. Definitions are available offline after local assets load. Optional source links open only when clicked, in a separate tab with no referrer or answer data; there is no source fetching or telemetry.

### Supplementary three-ways review

`three-ways.md` supplies context for overlapping spiritual ways, grace and charity, consolation/desolation, ordinary duties, recreation and sacramental practice. All 36 questions were reviewed; 20 have refined titles, stories or clarifications in HR and EN. Options, IDs and scoring remain unchanged, so saved version-6 answers are preserved. Each revised item carries non-scoring `contextSources` references; see [the review audit](THREE-WAYS-REVIEW.md) and [the full question/source map](QUESTIONNAIRE-SOURCE-MAP.hr.md). The introduction and results clarify that the checklist cannot establish a person's actual spiritual way or eligibility for Communion.

### Exploring stages and returning to results

All seven home-page stages have visible buttons, arrows and “Read description” labels. “Explore all stages” opens a single dialog with seven expandable descriptions, also available from results. Individual stages open their own descriptions with previous/next controls. Escape and Close return focus to the opener; browsing changes no answers. VII retains its missing-source notice.

After all 36 questions have an answer or explicit skip, **View results** appears on the home page and **Back to results** appears while reviewing answers. Returning always recalculates from the current answers. Home navigation and refresh preserve practical answers; restarting clears them and hides the result shortcuts.

Result overview cards show only nonzero condition counts with four distinct icons and text labels: supported, unsupported, unclear, and inapplicable. A legend explains these meanings; each area links to its exact expanded requirements. Exemptions are not counted as supported, and the UI introduces no score or percentage. No mystical-experience questionnaire is loaded or displayed.

Every card reports its independently supported practical threshold and its own next unresolved requirements. Source ceilings are III for mortal sin, IV for venial sin/examen/sacraments and VI for imperfections/suffering/prayer. Merely inheriting a foundation does not relabel a domain as V or VI. Unknown lower levels are not invented, and exemptions alone do not establish a level. Domain profiles do not feed back into the overall conjunction.

Each area includes tailored next-step suggestions for its unresolved checks. One is immediately visible; additional suggestions expand in place. Unknown evidence receives clarification guidance, never an instruction to increase austerity. At the source ceiling, maintenance advice replaces a fictitious higher threshold. Links return to the exact question, and new results recalculate after edits. All criterion/answer combinations are handled by the same rule-based selector, not an average or a generic stage slogan.

The [seven-area gradation guide](GRADATION-PROPOSAL.hr.md) documents the implemented source ladders. Each area has one overview question with short answer headings and an everyday story. Results distinguish the selected description from the pattern supported by all detailed questions; expanding a ladder row explains it. This visual mapping never supplies points or overrides a failed requirement.

### Core questions

The questionnaire contains 36 concrete questions across seven areas. Each has its own answer descriptions rather than a generic frequency scale:

1. serious sin;
2. venial sin;
3. imperfections;
4. suffering;
5. prayer;
6. examen;
7. sacraments.

Every question includes an always-visible short fictional story and clarification in both languages. Answer about actual practice during the past eight weeks, except where a question explicitly asks about an established schedule (quarterly confession cannot be judged from an eight-week event count). Skipping is always possible; unknown evidence cannot support a required criterion.

See [the complete question–story–source review](QUESTIONNAIRE-SOURCE-MAP.hr.md) for the current Croatian items, answer descriptions, criteria and exact source sections. Version 6 replaces seven overview questions, one per area, and retains the other 29 questions. New IDs prevent reuse of old option indices. Same-tab v5 answers preserve those 29 unchanged items; v4 preserves 21. A bilingual update notice asks for the rewritten answers, resuming opens the first unanswered item, and incomplete results cannot be reopened. After a successful v6 save, old v4/v5 records are removed. Refresh preserves progress; restart clears it. Removed experience reports and incompatible v3 answers are not reused.

No average, fractional stage, confidence percentage or bootstrap interval is calculated. The result reports the highest consecutive set of practical requirements supported, or no sufficiently supported pattern. Each condition is supported, unsupported, unknown or explicitly inapplicable. Strong answers elsewhere cannot compensate for a failed condition. The result includes a selectable I–VI criterion review with the exact expectation, chosen answer and a link back to that question. Even fully supported VI practical criteria do not establish the full spiritual stage or any mystical grace. A conspicuous V–VI result notice explains this limitation. VII is never assigned.

See [`ASSESSMENT-NOTES.md`](./ASSESSMENT-NOTES.md) for the design rationale, interpretation limits, and the validation work required before making psychometric claims.

## Source descriptions on the result page

The former optional experience questionnaire, its runtime files and its persisted reports have been removed. New V–VI questions concern ordinary choices, love, prayerful habits and prudent service only.

### Stage descriptions

Each supported practical pattern includes a separate, always-visible plain-language description from the original markdown. If none is supported, I is shown explicitly as a reference for comparison, not an assigned result. Descriptions of V–VII can be read in a separate expandable section. The bilingual paragraphs are kept in `stages[].sourceDescription`; they are also included in printed results and the WebMCP response.

Source descriptions preserve their original coverage: I and II have six areas, III seven, IV six, and V and VI only imperfections, suffering and prayer. The application's cumulative positive requirements are documented separately as an implementation interpretation, not a scoring system supplied by the source.

## Verification

Run `node --test tests/*.test.cjs`. Tests cover individual gate failures, unknown/conditional answers, source and translation alignment, exact IV requirements, result explanations, language changes, session restoration and version migration. They also check stage exploration, recalculation via result shortcuts, removal of experience reports, v4/v5-to-v6 migration, seven graduated answer patterns and selected-versus-supported result markers, per-criterion next-step coverage, strict V/VI requirements and icon/count presentation. No real user answers are used.

`node tests/browser-smoke.cjs` uses an isolated local Chrome profile to verify desktop/mobile layouts, native dialog Escape and focus behavior, requirement-detail links, radios, refresh and print rendering.
