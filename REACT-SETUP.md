# React accordion development

The homepage About section now uses React 19, TypeScript 7, Tailwind CSS 4 and a shadcn-compatible project structure. Vite builds a static browser bundle; GitHub Pages still serves the repository root, with no server or API keys.

## First run

Use Node.js 24 LTS and npm:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Development serves `src/about/main.tsx` directly with React refresh. `npm run preview` serves the committed production site at localhost:4173.

The project is already manually initialized for shadcn. Check it with `npx shadcn info`. To add a future component, run e.g. `npx shadcn add button`, import it into your React entry, then rebuild. Re-running `shadcn init` is unnecessary and could overwrite the site's deliberately scoped styles.

## Paths and configuration

- `components/ui/cue-collapsing-cards-accordion.tsx`: the adapted Cue accordion.
- `components/demo.tsx`: the requested reusable demo wrapper.
- `lib/about-cards.ts`: the typed seven-card content model and relative local image paths.
- `lib/utils.ts`: shadcn's `cn` pattern, configured for the `tw:` utility prefix.
- `src/about/main.tsx`: the isolated React entry. Production hydrates the pre-rendered markup.
- `src/about/accordion.css`: photo treatments, expanding flex transitions, vertical phone layout and reduced-motion rules.
- `src/styles/components.css`: Tailwind and component styles. Tailwind uses an explicit source list and `tw:` prefix; Preflight is omitted so it cannot reset the existing portfolio's typography, buttons or containers.
- `about.css`: the section layout and its preserved desktop/tablet/phone height.
- `components.json`: shadcn CLI configuration, with `@/components/ui` as its UI alias.
- `tsconfig.json` and `vite.config.ts`: the same `@` alias points at repository root.

The UI folder is `/components/ui`, as requested. Keeping that path aligned with `components.json` allows shadcn-generated imports and future registry components to resolve consistently. No second `src/components/ui` folder is needed.

## Component data and interaction

`CollapsingCards` accepts optional `cards`, `initialIndex`, `id` and `className` props. Each card has an id, wordmark, Background/Interests group, title, paragraphs, image and optional object position and real link. State is local React state; no provider, router, remote state or backend is required.

Desktop hover, clicking and keyboard focus select one card. Arrow keys cycle cards, Home/End select the first/last, and Enter/Space activate a summary. Keyboard input takes precedence over a stationary mouse. Touch opens cards by tapping. The mobile layout is vertical. Native `details/summary` keeps every card accessible if JavaScript fails or is disabled.

The page retains Lenis, magnetic buttons, the resume download and repeated scroll reveals. The stable React container receives the scroll reveal; its children are excluded from GSAP mutation so hydration remains consistent. Accordion expansion is 750ms, image movement 900ms, and text entrance 450ms. Reduced motion and Escape remove the motion while retaining the controls.

## Production changes and deployment

```sh
npm run typecheck
npm run build
npm run preview
```

Build writes `assets/react/about.js`, `assets/react/about.css` and third-party notices, then uses `react-dom/server` to update the About markup in `index.html`. Asset URLs get content-hash query versions. Keep the `ABOUT_REACT_START` / `ABOUT_REACT_END` markers intact.

Commit the component/data/styles, package files, generated assets, and updated `index.html` together. Pages does not run npm; the committed bundle is ready to serve. Edits outside the React component can still be made directly in the existing HTML/CSS.

All photography is hosted under `assets/about`; authors, verified source links and licensing information are in `assets/about/CREDITS.md`. These are illustrative topic photographs rather than pictures of Jay's employers or campus.

The pre-React version is preserved on branch `codex/backup-before-react-about-2026-11-19` at commit `0b00a4b41cae2884a45939b83467c302a50bb926`. Restore through a new commit, preserving history.

The pinned minimatch override patches a transitive shadcn development dependency. Production dependencies and the full installed dependency tree were checked after installation.
