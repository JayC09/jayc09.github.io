# Jay Chaudhary — Product management portfolio

A responsive portfolio served as static files on GitHub Pages. About uses React, TypeScript, Tailwind and shadcn tooling; the rest of the site retains its HTML/CSS/vanilla JavaScript structure. Production assets are committed, with no backend or API keys.

Live site: https://jayc09.github.io/
Repository: https://github.com/JayC09/jayc09.github.io

## Pages and assets

- `index.html`: Micro Slats hero, compact Myntra/Oracle work experience, Groww study in progress, About, skills and contact.
- `projects/myntra.html`, `projects/oracle.html`: detailed case studies with native anchor navigation.
- `resume.html`: compact PM-focused web resume, designed to fit a desktop screen at normal zoom. Smaller screens and enlarged text reflow naturally, keeping everything readable.
- `assets/JayChaudhary_PM_Resume.pdf`: the exact one-page PDF supplied by the owner. “Download resume” downloads this file directly, without invoking browser printing or generating a web-page PDF.
- `resume.css`: dense two-column resume layout and mobile reflow.
- `components/ui/cue-collapsing-cards-accordion.tsx`: the React image accordion adapted from the supplied Cue reference.
- `lib/about-cards.ts`: typed About content; `src/about/accordion.css`: its interaction styles; `about.css`: the preserved section footprint.
- `assets/react/`: compiled React/CSS and bundled third-party notices. `REACT-SETUP.md` covers the installed TypeScript/Tailwind/shadcn setup and build workflow.
- `style.css`, `tokens.css`, `base.css`, `refinements.css`: shared styling, typography, employer branding and compact page spacing.
- `script.js`, `motion.css`, `motion.js`: optional motion, keyboard pause, automatic sourcing visual, reading progress and magnetic buttons.
- `scroll.js`: Lenis 1.3.27 setup, smooth wheel/keyboard/anchor scrolling and native fallbacks. Its browser bundle and recommended CSS are pinned under `assets/vendor/`.
- `slats.css`, `micro-slats.js`: interactive hero background, adapted from the owner's React Bits reference.
- `assets/vendor/`: pinned local GSAP 3.15.1 and OGL 1.0.11 browser bundles and license notices. Fonts and logos are also hosted locally.
- `design.md`, `MOTION.md`: current design and interaction notes.

## Editing

Edit the static sections directly in HTML; relative resource paths work on GitHub Pages. Edit About in the React/data source and run `npm run build`, which updates its pre-rendered HTML and compiled assets. Navigation, native accordion disclosures and download links work without JavaScript. Use `npm run preview` or `npm run dev` for the React preview.

Keep professional claims grounded in owner-supplied facts. Resume experience and metrics also draw from the supplied PDF. Groww research is ongoing; do not describe planned interviews as completed. Contact details and public publication are authorized by the owner.

Update the web resume in `resume.html`. To replace the downloadable resume, upload the new approved PDF at the same asset path. Keep the native `download` attribute and the “Download resume” label. The website does not modify or regenerate the PDF.

About uses seven photographic accordion cards: Education, Myntra, Oracle, Coffee, Active, Tech and Gaming. Hover/focus/tap expands one while the others show compact labels. Desktop uses a horizontal row; phones use a vertical accordion. Education includes the degree and CSPO facts; Active combines badminton and gym. The section keeps its prior measured height. Real case-study/resume links replace placeholder View actions. Photographer credits are in `assets/about/CREDITS.md`.

The hero badge shows MBA/IIM Raipur once. Its decorative circle uses a graduation-cap SVG, with an aria-hidden copy in the radial fill for consistent contrast.

All pill actions share the main Email button's dark/lime styling, radial sunrise fill and gentler 22px desktop magnetic cap. Use `.pill-action.hero-sun-action` inside `.pill-magnetic-zone`, with one accessible label and an aria-hidden duplicate in `.hero-sun-fill`. Contact pills are equal-width and form a 2×2 grid on phones. Hero circles retain their stronger 38px response.

Edit appearance in `refinements.css` and magnetic settings in `motion.js`. Magnets are disabled on touch, for reduced motion, and while a group action has keyboard focus. Escape pauses motion. Update shared-file version queries in all four HTML pages when changing CSS/JavaScript.

Scrolling uses locally hosted Lenis with a .12 wheel lerp. Native touch momentum is retained; Page Up/Down, arrows, Space and Home/End ease when they are not being used by controls or nested scrollers. Same-page anchors preserve their URL and move focus on arrival. Browser history and the PDF download remain native.

Content blocks reveal again whenever they re-enter from above or below: a 600ms fade with a 20px directional shift and a small batch stagger. Blocks reset only outside a 48px viewport buffer, so small direction changes do not restart visible content. Navigation, resume and footer blocks fade without shifting, preserving their geometry. The React accordion's stable container receives the reveal; its children are left to React/CSS, avoiding hydration conflicts. No ScrollTrigger dependency is added.

Reduced motion, Escape and printing restore immediately visible content and native scrolling. Missing JavaScript/Lenis/GSAP preserves usable content and navigation. Change the smooth-scroll settings in `scroll.js` and reveal targets/timing in `motion.js`; `motion.css` contains the CSS glue and print/reduced-motion fallbacks.

## Preview and verification

Use Node.js 24 LTS. Run `npm ci`, `npm run typecheck`, `npm run build`, then `npm run preview`. The generated files are ready for any static host. Direct file opening retains native content/disclosures, while React hydration requires an HTTP preview. Check:

1. Desktop and mobile navigation, anchor targets, native disclosures, contact links and resume download.
2. Desktop resume fit, readable mobile reflow, keyboard focus and reduced motion.
3. Repeated reveal entries and wheel reversals in both directions, anchor/history alignment, native touch and horizontal table scrolling.
4. Company identities, reported outcomes, assets and factual wording.
5. That the downloadable PDF matches the approved original, including a real browser download.
6. Every accordion card, hover/tap/keyboard control, reduced motion and native no-JavaScript disclosure.

## Deployment and backups

GitHub Pages deploys automatically from `main` at repository root. Keep `index.html` at root. For About changes, run the build and commit source, package files, generated `assets/react/` and updated `index.html` together. Pages serves the compiled output without installing npm packages. Inspect the deployment in Actions, then open the public URL.

Earlier versions remain in Git history and backup branches, including `codex/backup-before-micro-slats-2026-11-18` and `codex/backup-before-compact-experience-2026-11-18`. Restore through a new commit rather than rewriting history. Local `.hallmark` QA scripts and screenshots are development artifacts and are not website dependencies.

The version immediately before the React accordion is backed up on `codex/backup-before-react-about-2026-11-19`.

## Licenses

Micro Slats derives from React Bits, revision `d01aa914dcbe76da8b2923ebf872b5c8b1066e4c`; its MIT + Commons Clause notice is in `assets/vendor/REACT-BITS-LICENSE.md`. OGL uses the Unlicense. GSAP's original header and license link remain. See `assets/vendor/NOTICE.md`.

Lenis 1.3.27 is MIT licensed by darkroom.engineering. Its full license is retained in `assets/vendor/LENIS-LICENSE.txt`; its distribution files are unchanged.
