# Portfolio motion and compact experience

The current site keeps the slat hero, white scrolling name, company branding and professional facts, with a compact desktop overview and fewer controls.

## Homepage structure

- The introduction is centered; company identities appear once per experience header.
- Work experience uses two employer cards on desktop and a single column on mobile. It replaces the old highlights strip, selected-work index and duplicate experience timeline.
- Reported Myntra time saved, Oracle migration runtime and approximate experience duration are in the cards. The native #experience anchor remains an alias at #work.
- Groww remains separate as an independent study in progress. Original case-study pages, contacts, education and the supplied PDF download remain available.
- refinements.css owns this layout, spacing and the conceptual sourcing visual. Existing style.css, tokens.css, base.css and motion.css retain the shared system.

## Automatic motion

| Target | Behavior |
| --- | --- |
| .slats-field | Locally hosted WebGL waves and pointer/tap ripples; stops offscreen or hidden |
| .name-track | Existing right-to-left loop, hover/focus pause, offscreen pause and soft playback-rate easing |
| .quote-consolidation | Seven-second CSS loop: generic WhatsApp, email and Excel quote tiles enter one shared dashboard; caption is always readable |
| Myntra .flow | One-time sequential highlighting when the diagram enters view, without replay controls |
| Skills and other introductory blocks | One-time 18px/650ms entrance with a 90ms sibling stagger; employer records stay immediately visible |
| Hero circular actions | Nearest-target desktop attraction from half the target size plus 144px, a 38px displacement cap, delayed labels and collision spacing; focused targets stay still |
| All pill actions and rounded MBA badge | Same radial lime fill and nearest-target controller, with a gentler 22px displacement cap, 96px approach range and 6px minimum spacing; static on touch and reduced motion |
| Case-study reading column | Subtle progress line and aria-current on the existing table of contents |
| Navigation, links and details | CSS underline, arrow, press and progressive native disclosure feedback |

Oracle's time comparisons are static. Its original Before and After workflow figures are both readable without a toggle. Architecture headings are plain text. Organize, replay, comparison and visible motion-pause controls are removed at the owner's request.

Escape toggles motion globally through portfolio:motion-pause. script.js supplies screen-reader instructions and status, pauses the name and adds .motion-paused for CSS loops. micro-slats.js listens to the same event and stops frame scheduling. No extra visible button is required. Finite entrances settle to readable end states when motion is paused. Reduced-motion preferences disable continuous motion and show the static sourcing illustration. All content is visible without JavaScript; the slat field has a CSS fallback if WebGL is unavailable.

The hero uses --hero-orange (#D5F478) on --hero-orange-base. Hover and visible focus reveal a lime circle growing from the bottom edge in 620ms. The fill includes an aria-hidden copy of the label in dark ink, so dark text appears only over the lime portion while the original lime label remains over the dark portion. Both label layers share the same magnetic movement. The same treatment applies to the MBA badge, including its decorative seal. Reduced motion makes the fill immediate; touch does not use magnetic tracking.

## Editing

- Employer copy and links: index.html, .work-card.
- Desktop density and card sizing: refinements.css, .experience-grid and .work-card.
- Sourcing channels and caption: .quote-consolidation in index.html and projects/myntra.html. Keep the conceptual disclosure. Animation timing is --consolidation-cycle in refinements.css.
- Oracle chart: .migration-comparison on the homepage and the original .time-chart in projects/oracle.html. Keep the <30 min bound and original explanatory captions.
- Name and keyboard motion state: script.js. Keep hover/focus/offscreen and reduced-motion support.
- Pointer responses, observers and reading progress: motion.js. Features are scoped and listeners/observers are cleaned up on non-persisted exits.
- Lime palette and sunrise fill: --hero-orange tokens and .hero-sun-action/.hero-sun-fill in refinements.css. Keep the fill's label aria-hidden and the original label accessible. MBA labels on the homepage and resume use simply MBA; education dates remain in the resume.
- Background palette: slats.css. Wave settings and GPU budgets: micro-slats.js. Keep the contrast veil, 1.8-million-pixel budget and visibility checks.
- Change shared file query versions in all applicable HTML pages when updating shared assets.
- Contact links: `.contact-actions` on the homepage and both case studies. Keep one accessible label and the aria-hidden fill label in each `.contact-pill`. `.contact-magnetic-zone` supplies its stable anchor; group settings in `motion.js` control attraction independently of the hero. `.contact-footer` and `.footer-inner` in `refinements.css` keep the closing surface continuous and full width. The compact web resume retains its light footer.

## Dependencies and attribution

GSAP core 3.15.1 and the selected OGL 1.0.11 browser bundle are pinned and served locally. The website requires no package installation, React or build process. All four pages load GSAP for the shared pill actions; the resume does not load OGL. Native IntersectionObserver and passive, frame-scheduled scroll listeners avoid a ScrollTrigger dependency.

Micro Slats is adapted from React Bits by David Haz, revision d01aa914dcbe76da8b2923ebf872b5c8b1066e4c, and embedded as part of this portfolio. The MIT + Commons Clause license is retained in assets/vendor/REACT-BITS-LICENSE.md. OGL is Unlicense/public domain, with its terms in assets/vendor/OGL-LICENSE.txt. GSAP's original header and license link remain. See assets/vendor/NOTICE.md.

## Backups and verification

The version before this compact overview is preserved on codex/backup-before-compact-experience-2026-11-18 at commit 40e1820522b06ecc3f1ae6f0774c696e0c1669af. Earlier portrait and motion-upgrade backups remain. Restore through a new commit without rewriting history.

Local verification checks that both employer cards fit one viewport at 1280x800, 1366x768, 1440x900 and 1920x1080, then tests all four routes at 320px, 390px, 834px and 1440px. It also covers automatic looping, static Oracle bars, no extra buttons, keyboard pause, reduced motion, no JavaScript, case-study links, both Oracle workflows, reading progress and the direct PDF download. Axe WCAG A/AA scans supplement those browser checks; these are lab checks, not a cross-browser certification.

## Compact resume and native download

resume.css provides a two-column desktop overview and readable mobile reflow. Resume content is product focused and based on the owner-supplied PDF. The Download resume anchor uses assets/JayChaudhary_PM_Resume.pdf with a native download attribute; it never calls window.print(). All pill actions use .pill-action inside .pill-magnetic-zone, including case-study next links and the download. Their body-scoped group in motion.js shares the Email button settings: 22px cap, 96px approach range, 6px spacing and .22 label pull. Hero circles remain in their independent stronger group. Shared styles stay in refinements.css. The source PDF is preserved byte for byte.
