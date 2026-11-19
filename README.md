# Jay Chaudhary — Product management portfolio

A responsive static portfolio built with HTML, CSS and optional vanilla JavaScript. No build, backend, API keys or package installation is needed to publish it.

Live site: https://jayc09.github.io/
Repository: https://github.com/JayC09/jayc09.github.io

## Pages and assets

- `index.html`: Micro Slats hero, compact Myntra/Oracle work experience, Groww study in progress, About, skills and contact.
- `projects/myntra.html`, `projects/oracle.html`: detailed case studies with native anchor navigation.
- `resume.html`: compact PM-focused web resume, designed to fit a desktop screen at normal zoom. Smaller screens and enlarged text reflow naturally, keeping everything readable.
- `assets/JayChaudhary_PM_Resume.pdf`: the exact one-page PDF supplied by the owner. “Download resume” downloads this file directly, without invoking browser printing or generating a web-page PDF.
- `resume.css`: dense two-column resume layout and mobile reflow.
- `style.css`, `tokens.css`, `base.css`, `refinements.css`: shared styling, typography, employer branding and compact page spacing.
- `script.js`, `motion.css`, `motion.js`: optional motion, keyboard pause, automatic sourcing visual, reading progress and magnetic buttons.
- `scroll.js`: Lenis 1.3.27 setup, smooth wheel/keyboard/anchor scrolling and native fallbacks. Its browser bundle and recommended CSS are pinned under `assets/vendor/`.
- `slats.css`, `micro-slats.js`: interactive hero background, adapted from the owner's React Bits reference.
- `assets/vendor/`: pinned local GSAP 3.15.1 and OGL 1.0.11 browser bundles and license notices. Fonts and logos are also hosted locally.
- `design.md`, `MOTION.md`: current design and interaction notes.

## Editing

Edit HTML directly; relative asset paths work both locally and on GitHub Pages. Main navigation and download links work without JavaScript.

Keep professional claims grounded in owner-supplied facts. Resume experience and metrics also draw from the supplied PDF. Groww research is ongoing; do not describe planned interviews as completed. Contact details and public publication are authorized by the owner.

Update the web resume in `resume.html`. To replace the downloadable resume, upload the new approved PDF at the same asset path. Keep the native `download` attribute and the “Download resume” label. The website does not modify or regenerate the PDF.

The About disclosure includes coffee, badminton, gym time, technology and gaming interests. The education records show MBA/IIM Raipur and B.Tech/NMIMS without a redundant Education sublabel beneath MBA.

All pill actions share the main Email button's dark/lime styling, radial sunrise fill and gentler 22px desktop magnetic cap. Use `.pill-action.hero-sun-action` inside `.pill-magnetic-zone`, with one accessible label and an aria-hidden duplicate in `.hero-sun-fill`. Contact pills are equal-width and form a 2×2 grid on phones. Hero circles retain their stronger 38px response.

Edit appearance in `refinements.css` and magnetic settings in `motion.js`. Magnets are disabled on touch, for reduced motion, and while a group action has keyboard focus. Escape pauses motion. Update shared-file version queries in all four HTML pages when changing CSS/JavaScript.

Scrolling uses locally hosted Lenis with a .12 wheel lerp. Native touch momentum is retained; Page Up/Down, arrows, Space and Home/End ease when they are not being used by controls or nested scrollers. Same-page anchors preserve their URL and move focus on arrival. Browser history and the PDF download remain native.

Content blocks reveal again whenever they re-enter from above or below: a 600ms fade with a 20px directional shift and a small batch stagger. Blocks reset only outside a 48px viewport buffer, so small direction changes do not restart visible content. Navigation, resume and footer blocks fade without shifting, preserving their geometry. Reveals use independent CSS translate variables so magnetic transforms, the name loop and sourcing diagrams can keep running. No build or ScrollTrigger dependency is added.

Reduced motion, Escape and printing restore immediately visible content and native scrolling. Missing JavaScript/Lenis/GSAP preserves usable content and navigation. Change the smooth-scroll settings in `scroll.js` and reveal targets/timing in `motion.js`; `motion.css` contains the CSS glue and print/reduced-motion fallbacks.

## Preview and verification

Open `index.html` directly, or serve the folder with any static HTTP server. There is no build command. Check:

1. Desktop and mobile navigation, anchor targets, native disclosures, contact links and resume download.
2. Desktop resume fit, readable mobile reflow, keyboard focus and reduced motion.
3. Repeated reveal entries and wheel reversals in both directions, anchor/history alignment, native touch and horizontal table scrolling.
4. Company identities, reported outcomes, assets and factual wording.
5. That the downloadable PDF matches the approved original, including a real browser download.

## Deployment and backups

GitHub Pages deploys automatically from `main` at repository root. Keep `index.html` at root and commit approved source/assets to `main`. Inspect the Pages build/deployment in Actions, then open the public URL to verify the result.

Earlier versions remain in Git history and backup branches, including `codex/backup-before-micro-slats-2026-11-18` and `codex/backup-before-compact-experience-2026-11-18`. Restore through a new commit rather than rewriting history. Local `.hallmark` QA scripts and screenshots are development artifacts and are not website dependencies.

## Licenses

Micro Slats derives from React Bits, revision `d01aa914dcbe76da8b2923ebf872b5c8b1066e4c`; its MIT + Commons Clause notice is in `assets/vendor/REACT-BITS-LICENSE.md`. OGL uses the Unlicense. GSAP's original header and license link remain. See `assets/vendor/NOTICE.md`.

Lenis 1.3.27 is MIT licensed by darkroom.engineering. Its full license is retained in `assets/vendor/LENIS-LICENSE.txt`; its distribution files are unchanged.
