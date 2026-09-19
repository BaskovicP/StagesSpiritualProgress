# Spiritual Progress Reflection

A private, independent, bilingual (English/Croatian) browser questionnaire for reflecting on the seven named stages of spiritual progress. The supplied source describes Stages I–VI but only names Stage VII, so the application shows all seven while estimating only the six described stages. It is not an official publication or assessment of any organization.

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

- `dist/locales/en.js` contains the complete English copy;
- `dist/locales/hr.js` contains the complete Croatian copy;
- `dist/assessment-config.js` contains the questionnaire version, language-independent question IDs, dimensions, scoring direction, and source-section references;
- `dist/app.js` contains rendering, navigation, scoring, and stability calculations only.

To add a language, copy one locale file, register its language code on `window.spiritualLocales`, load it before `app.js`, and add the language to the selector in `dist/index.html`. The question order must stay aligned with `questionBlueprints` in `dist/assessment-config.js`.

## Questionnaire model

The questionnaire contains 28 questions across seven equally weighted dimensions, with four questions per dimension. The items are interleaved, use a common five-point frequency scale, and balance direct and reverse-keyed wording:

1. serious sin;
2. venial sin;
3. imperfections;
4. suffering;
5. prayer;
6. examen;
7. sacraments.

Every question includes an always-visible short fictional story in both languages. It illustrates the behavior being asked about; the visitor rates their own experience. Explanations of the terms are available below it, with the distinctions between mortal and venial sin expanded by default. An unscored skip response covers uncertainty, an event that did not occur, and choosing not to answer.

See [the complete question–story–source review](QUESTIONNAIRE-SOURCE-MAP.hr.md) for all 28 Croatian pairs, their precise markdown sections, and the limits of their coverage. Version 3 uses new item identifiers and a new session version, so answers to earlier wording are not silently reused.

It reports the closest overall stage within the described I–VI scale, an approximate range, a per-dimension profile, and an internal pattern-stability estimate based on 1,000 deterministic item-resampling runs performed in the browser. Stage VII (Complete Sanctity / Potpuna svetost) remains visible as the final stage named in the source diagram, but it is not assigned because the supplied pages provide no description or scoring criteria. The stability percentage describes how consistently the same answers support the same nearest stage; it is not a validated accuracy or diagnostic-confidence claim.

See [`ASSESSMENT-NOTES.md`](./ASSESSMENT-NOTES.md) for the design rationale, interpretation limits, and the validation work required before making psychometric claims.

## Source descriptions on the result page

Each estimated stage includes a separate, always-visible plain-language description from the original markdown, with a paragraph for every area actually covered in that stage's section. The bilingual descriptions are kept in each locale's `stages[].sourceDescription`, separate from rendering and scoring. The same content is included in printed results and the WebMCP result response.

Stages I and II have six source areas, III has seven, IV has six, and V and VI have only imperfections, suffering, and prayer. Missing areas are not invented or copied from a different stage. VII has no supplied description and remains unassessed. The result distinguishes the approximate answer-based estimate from the source's description; it does not claim the questionnaire confirms mystical graces. This display-only addition does not change scores, question IDs, or saved version-3 answers.
