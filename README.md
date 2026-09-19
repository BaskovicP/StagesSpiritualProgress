# Spiritual Progress Reflection

A private, independent, bilingual (English/Croatian) browser questionnaire for reflecting on the seven named stages of spiritual progress. Version 4 checks explicit practical expectations associated with I–IV, without averaging or assigning mystical states. V–VI remain educational descriptions and VII is named only in the source. It is not an official publication or assessment of any organization.

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
- `dist/questions/mystical-en.js` and `mystical-hr.js` contain the separate optional mystical-experience module and its UI copy;
- `dist/mystical-config.js` contains its stable IDs and allowed values, with no scoring rules;
- `dist/assessment-config.js` contains versioned IDs, source references and accepted, exempt or unknown options for each threshold;
- `dist/assessment-engine.js` is the pure all-required-criteria evaluator;
- `dist/app.js` contains rendering, navigation, temporary session handling and browser-tool integration.

To add a language, copy its locale, question-bank and mystical-module files, register the language on `window.spiritualLocales`, `window.spiritualQuestions` and `window.spiritualMysticalContent`, load them before `app.js`, and add the language to the selector in `dist/index.html`. Core question IDs, order, option indices and expectation keys must stay aligned with `questionBlueprints`; optional IDs and values must match `spiritualMysticalReflection.questions`.

## Questionnaire model

The questionnaire contains 28 concrete questions across seven areas. Each has its own answer descriptions rather than a generic frequency scale:

1. serious sin;
2. venial sin;
3. imperfections;
4. suffering;
5. prayer;
6. examen;
7. sacraments.

Every question includes an always-visible short fictional story and clarification in both languages. Answer about actual practice during the past eight weeks, except where a question explicitly asks about an established schedule (quarterly confession cannot be judged from an eight-week event count). Skipping is always possible; unknown evidence cannot support a required criterion.

See [the complete question–story–source review](QUESTIONNAIRE-SOURCE-MAP.hr.md) for the current Croatian items, answer descriptions, criteria and exact source sections. Version 4 uses new item identifiers and a new session version, so earlier answers are not silently reused.

No average, fractional stage, confidence percentage or bootstrap interval is calculated. The result reports the highest consecutive set of practical requirements supported, or no sufficiently supported pattern. Each condition is supported, unsupported, unknown or explicitly inapplicable. Strong answers elsewhere cannot compensate for a failed condition. The result includes a selectable I–IV criterion review with the exact expectation, chosen answer and a link back to that question. Even fully supported IV practical criteria do not establish every spiritual characteristic or mystical experience of that stage. V–VII are not automatically assigned.

See [`ASSESSMENT-NOTES.md`](./ASSESSMENT-NOTES.md) for the design rationale, interpretation limits, and the validation work required before making psychometric claims.

## Source descriptions on the result page

### Optional mystical-experience questions

An always-visible card on the result page offers six optional questions about contemplative prayer, inner purification, unusual phenomena, a reported sense of union with God, lasting everyday changes, and spiritual direction. Opening the card is optional, regardless of the practical result. Each question has a story, clarification, neutral answer choices and a source note. These are self-reports for discernment, not tests of supernatural authenticity or evidence assigning VI or VII. The supplied source only names VII; the union question is explicitly supplemental, not an invented VII criterion.

The module is not restricted to eight weeks, is not required to obtain a result, and cannot raise or lower that result. The summary repeats only selected answers. It can be printed with the result, even when the form is closed. No blank optional form is printed. Optional answers remain separate from core answers in the same tab's temporary `sessionStorage`; there is a separate clear button, and restarting clears both. Version 1 of this module does not invalidate existing version 4 core progress. Changing the module version drops only its optional answers.

See [the optional-module source notes](MYSTICAL-REFLECTION-NOTES.md) for the theological scope and source distinctions.

### Stage descriptions

Each supported practical pattern includes a separate, always-visible plain-language description from the original markdown. If none is supported, I is shown explicitly as a reference for comparison, not an assigned result. Descriptions of V–VII can be read in a separate expandable section. The bilingual paragraphs are kept in `stages[].sourceDescription`; they are also included in printed results and the WebMCP response.

Source descriptions preserve their original coverage: I and II have six areas, III seven, IV six, and V and VI only imperfections, suffering and prayer. The application's cumulative positive requirements are documented separately as an implementation interpretation, not a scoring system supplied by the source.

## Verification

Run `node --test tests/*.test.cjs`. Tests cover individual gate failures, unknown/conditional answers, source and translation alignment, exact IV requirements, result explanations, language changes, session restoration and version migration. No real user answers are used.
