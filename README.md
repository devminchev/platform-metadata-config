# Contentful Game Platform Config

A custom [Contentful](https://www.contentful.com/) field app that the Player Services team uses to capture platform-specific configuration and metadata for each game in the Game content model. Editors see a single form that writes a structured JSON object back to the hosting entry, making it easy to store desktop/mobile URLs, loader information, RTP, and richer metadata (aggregator, studio, game type attributes, etc.).

## Project purpose

* Provide a Contentful-native UI for configuring platform overrides (desktop vs. mobile) without asking editors to edit raw JSON.
* Centralise metadata such as game type, themes, features, jackpots, and provider relationships to keep downstream services in sync.
* Validate required data up-front so the entry field can be marked invalid before publishing, reducing manual QA.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | [Create React App](https://create-react-app.dev/) + React 18 |
| UI | Contentful Forma 36 components (`@contentful/f36-*`), `styled-components`, custom hooks |
| Contentful integration | `@contentful/app-sdk`, `@contentful/react-apps-toolkit`, Contentful App Framework locations |
| Tooling | TypeScript, Jest, gh-pages (static deploy), `contentful-app-scripts` for uploading bundles |

_Dependency and script definitions live in [`package.json`](package.json)._【F:package.json†L1-L52】

## How the app works

### Runtime architecture

1. `src/index.tsx` bootstraps the React tree. When the app runs inside Contentful it renders the field UI inside `SDKProvider` and attaches global Forma 36 styles. During standalone local development it instead renders `LocalhostWarning` so developers remember to load the app inside the Contentful UI.【F:src/index.tsx†L1-L23】【F:src/components/LocalhostWarning.tsx†L1-L31】
2. `AppProvider` uses the Contentful `FieldAppSDK` to fetch the existing JSON value for the field and expose it through `AppContext`. It also stores setter helpers (`setContext`, `setFormStatus`) so deeply nested components can update the value and report validation errors.【F:src/AppProvider.tsx†L1-L54】【F:src/AppContext.ts†L1-L71】
3. The `Field` location component wires the Contentful SDK to the form: it starts/stops the auto-resizer, subscribes to context state, marks the field invalid when validation fails, and persists the aggregated JSON back via `field.setValue`. The visible UI is composed of `<PlatformConfigFields />` and `<MetadataFields />`.【F:src/locations/Field.tsx†L1-L44】

### Forms and validation

* Platform configuration fields are generated from static descriptors (`DEFAULT_FIELDS`, `MOBILE_FIELDS`). Editors can toggle a "Override Mobile Fields" checkbox to enable a second set of mobile-specific inputs. Validation runs via `useGamePlatformConfig`, which tracks form errors and handles coercion (e.g., numeric RTP values).【F:src/components/PlatformConfigFields.tsx†L1-L55】【F:src/hooks/useGamePlatformConfig.ts†L5-L145】【F:src/constants/CommonGameConstants.ts†L1-L16】
* Metadata fields combine dropdowns for aggregator, provider, studio, game type, and federal/sub-type options with type-specific subforms. `useMetadataConfig` ensures a game type is always selected before saving.【F:src/components/MetadataFields.tsx†L1-L152】【F:src/hooks/useMetadataConfig.ts†L5-L85】
* `GameTypeMetadataFields` renders either the slot-specific form (`SlotsMetadataFields`) or the generic non-slot config described in `NON_SLOT_GAME_FORM`. Slots capture themes, features, reels, win lines, symbol information, jackpots, etc.; non-slots capture attributes such as volatility, round length, language availability, and other yes/no flags.【F:src/components/GameTypeMetadataFields.tsx†L1-L111】【F:src/components/SlotsMetadataFields.tsx†L1-L236】【F:src/constants/NonSlotsAttrsConfig.ts†L1-L19】
* Hooks such as `useGameTypeMetadataConfig` and `useSlotsMetadataConfig` centralize state updates for nested objects (e.g., toggling jackpot booleans, manipulating multiselect lists). Styled wrappers in `src/styles/forms.js` provide consistent spacing and highlight grouped sections.【F:src/hooks/useGameTypeMetadataConfig.ts†L1-L64】【F:src/hooks/useSlotsMetadataConfig.ts†L1-L58】【F:src/styles/forms.js†L1-L23】

### Data model

The JSON written back to Contentful mirrors the shape described in `AppContext` (`ContextFields`). It includes both platform configuration (`gameSkin`, `realUrl`, `mobile*` overrides, `rtp`) and metadata (`gameProvider`, `gameType` object with nested attributes, `subGameType`, `federalGameType`). Downstream systems can deserialize the single field and obtain everything required for catalogue, regulatory, or integration purposes.【F:src/AppContext.ts†L3-L67】

## Repository layout

```
src/
├── AppContext.ts, AppProvider.tsx – global state container
├── components/ – field groups (platform config, metadata, slots/non-slot forms, helpers)
├── constants/ – option lists and form descriptors
├── hooks/ – shared hooks that wrap the Context API and encode form logic
├── locations/Field.tsx – Contentful “Field” location entry point
├── styles/ – styled-components wrappers
└── index.tsx – CRA entry file
```

## Getting started

1. **Prerequisites**
   * Node.js 18+ and Yarn (recommended by Create React App)
   * Access to the Contentful space where the app will be installed
   * (Optional) Contentful CLI if you plan to upload bundles via `contentful-app-scripts`
2. **Install dependencies**
   ```bash
   yarn install
   ```
3. **Start the development server**
   ```bash
   yarn start
   ```
   The CRA dev server runs on `http://localhost:3000`. Because the app depends on the Contentful SDK, open the Contentful web app, edit the relevant entry, and use the “Open in new tab” dev server URL field to load the local bundle. If you open the dev server directly you will see the built-in `LocalhostWarning` reminding you to embed it inside Contentful.【F:src/index.tsx†L12-L23】【F:src/components/LocalhostWarning.tsx†L1-L31】
4. **Run tests**
   ```bash
   yarn test
   ```
5. **Build for production**
   ```bash
   yarn build
   ```

## Deploying / publishing updates

There are two supported deployment paths (see `package.json` scripts):【F:package.json†L16-L25】

1. **Contentful-hosted upload** – Run `yarn build` followed by `yarn upload` (or `yarn upload-ci` with the required `CONTENTFUL_*` environment variables) to upload the bundle via `contentful-app-scripts`.
2. **Static hosting** – Run `yarn build && yarn deploy` to publish to GitHub Pages (`gh-pages -d build`). Ensure the Contentful app definition points at the resulting static URL (e.g., `https://github.gamesys.co.uk/pages/PlayerServices/contentful-game-platform-config/`).

After uploading, Contentful can take up to ~10 minutes to serve the new bundle to editors.

## Using the form inside Contentful

* Fill in the desktop platform fields (game skin, URLs, loader name). Toggle **Override Mobile Fields** to provide mobile-specific values; switching it off will clear mobile overrides to keep the payload clean.【F:src/components/PlatformConfigFields.tsx†L10-L55】
* Choose the correct metadata from the dropdowns. Selecting a game type dynamically swaps the metadata form so that Slots get reels/win-line controls while other types get the yes/no and select inputs listed in `NON_SLOT_GAME_FORM`.【F:src/components/MetadataFields.tsx†L14-L148】【F:src/components/GameTypeMetadataFields.tsx†L18-L111】
* Validation feedback appears inline; the Contentful field is automatically marked invalid until all required data passes validation, preventing publication until the form is complete.【F:src/hooks/useGamePlatformConfig.ts†L87-L145】【F:src/hooks/useMetadataConfig.ts†L60-L85】【F:src/locations/Field.tsx†L24-L41】

## Contributing

1. Fork or branch from `main`.
2. Run `yarn start` and develop changes. Prefer updating the constants/form descriptors rather than hard-coding new options.
3. Add or update tests in `test/` when altering validation logic.
4. Run `yarn test` and `yarn build` locally before submitting a PR.
5. Describe Contentful migration steps (e.g., if new fields need to be added to the entry JSON) in the PR description.

## Useful links

* [Background on the Contentful Conditional Fields app](https://confluence.gamesys.co.uk/display/UWS/Contentful+Conditional+Fields+Application)
* [Custom Contentful Apps – Implementation Guide](https://confluence.gamesys.co.uk/display/SPS/Custom+Contentful+Apps+-+Implementation+Guide)
