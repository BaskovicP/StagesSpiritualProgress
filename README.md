# Spiritual Progress Reflection

A private, independent, bilingual (English/Croatian) browser questionnaire for reflecting on six described stages of spiritual progress. It is not an official publication or assessment of any organization.

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

The app automatically chooses Croatian for browsers whose preferred language begins with `hr`; otherwise it uses English. The visitor may switch languages without reloading, and the choice is not stored.

Translations, stage descriptions, interface labels, accessibility text, and question text are kept outside the application logic:

- `dist/locales/en.js` contains the complete English copy;
- `dist/locales/hr.js` contains the complete Croatian copy;
- `dist/assessment-config.js` contains language-independent question IDs, dimensions, and scoring direction;
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

It reports the closest overall stage, an approximate range, a per-dimension profile, and an internal pattern-stability estimate based on 1,000 deterministic item-resampling runs performed in the browser. This percentage describes how consistently the same answers support the same nearest stage; it is not a validated accuracy or diagnostic-confidence claim.

See [`ASSESSMENT-NOTES.md`](./ASSESSMENT-NOTES.md) for the design rationale, interpretation limits, and the validation work required before making psychometric claims.
