# Portfolio v3 motion

This is an optional interaction layer over the existing portfolio. Professional content, typography, contact destinations, section IDs, diagrams and print handler remain in place. The portrait was subsequently replaced by the owner's requested Micro Slats background.

## Implementation map

| Effect | Existing target | Implementation |
| --- | --- | --- |
| Magnetic actions | .portrait-actions a | Stable .magnetic-zone wrappers, maximum 8px tracking, labels at 30% of that displacement, 440ms soft return and 150–200ms compression |
| Hero depth | .portrait-hero, .education-badge | Desktop badge depth up to 5px; the former portrait and background-highlight elements are removed |
| Interactive slat field | .slats-hero, .slats-field | React Bits Micro Slats adapted to vanilla JavaScript, green slats on charcoal, cursor/tap fluid response and independent background pause/play |
| Name polish | .name-track | Original CSS animation remains; Web Animations playback-rate updates ease resume and desktop scrolling from base speed to at most 1.35× |
| Scroll reveals | Highlights, work heading and introductions, experience, about, skills, contact, study impact and next project | IntersectionObserver once, 18px rise, 650ms duration, 90ms sibling stagger; default content is visible |
| Myntra comparison | Homepage .project-body, case-study .interface-demo | Three generic quotation tiles settle into shared fields; native button toggles/replays and desktop tile hover previews the organization |
| Oracle timing | Homepage .project-body, #results | A conceptual bar changes from the approximate 3+ hour baseline to an illustrative under-30-minute representation; labels never count to an exact result |
| Groww question | Homepage .project-body | Two explicitly conceptual equity/debt cards approach, highlight different characteristics and ask for context; the study remains independent and in progress |
| Myntra workflows | .study-figure[data-workflow] | Logical step-line highlighting with a 150ms stagger; replay buttons; AI sequence ends in the existing human-review/approval stages |
| Architecture | .architecture | Native buttons inside the original headings support hover, focus and pinned relationships; Escape clears selection; text remains readable |
| Vendor table | .interface-demo tbody tr | Hover and keyboard-focus row highlighting, native table semantics preserved |
| Oracle workflows | #before .workflow-switch | Native Before/After button group switches the existing generalized diagrams; inactive panel is inert and excluded from the accessibility tree; both are visible without JavaScript |
| Reading progress | Both .study-body pages | Passive scroll listener schedules one animation frame, uses cached section bounds, updates a 3px decorative line and aria-current on the existing table of contents |
| Shared feedback | Navigation, links, buttons, details | Underline and arrow feedback, press compression and progressive native details-content opacity transitions |

## Dependencies and editing

GSAP core 3.15.1 is pinned at assets/vendor/gsap-3.15.1.min.js and served by the same origin. It is used for retargetable springs, short sequences and interrupted-state transitions. Its original header is retained. Source and the GSAP Standard No Charge License are linked in assets/vendor/NOTICE.md. This is not MIT-licensed GSAP. No code from free-gsap-effects is copied.

ScrollTrigger is unnecessary for these one-time intersections and reading progress; IntersectionObserver and a passive, frame-scheduled listener cover them. Draggable and inertia are deliberately omitted to preserve the existing marquee's pause/focus/offscreen behavior and reliable looping. There is no scroll-jacking or delayed page navigation.

Keep .name-is-running, the native name pause button and script.js as the source of truth for marquee playback. motion.js listens to the portfolio:marquee-motion event; it changes rate through updatePlaybackRate without changing currentTime or reinitializing the loop. If that API is unavailable, the original constant-speed loop continues.

motion.css owns motion timing tokens. motion.js keeps each feature scoped, registers listeners once through AbortController, unobserves completed one-time entrances and cleans up on a non-persisted page exit. Native browser back/forward cache is retained. GSAP pointer contexts revert when touch, viewport or motion preferences change. Stopped/interrupted tweens are removed from the owned-animation registry.

## Accessibility and failure behavior

- Reduced motion disables pointer effects and the continuous name, completes active finite effects, and makes diagram state changes instant. The slat field renders once without continuous animation. Essential text is never animated out of view.
- Controls use real buttons, visible focus, state attributes and native activation. New controls hidden in source are shown only after their handlers are registered. The architecture's source buttons are disabled until they become functional.
- Hover is optional. Quote organization, fund comparisons, Oracle diagrams and workflow replays work with keyboard or touch. Conceptual labels remain visible.
- Without GSAP, diagram controls and reading progress still work instantly; reveals and pointer effects are skipped. Without any JavaScript, the original static name, original diagrams, routes, contacts and native details remain accessible; both Oracle workflows are visible.
- Native details opening/closing uses opacity and discrete content-visibility where supported. Other browsers retain the native immediate toggle. No height interpolation is forced.
- Print styles hide motion-only controls and progress indicators and restore readable workflow panels. The resume uses its original print handler and does not load GSAP.

## Verification scope

Local checks cover preserved professional copy/links/IDs, all four routes at 320px, 390px, 834px and 1440px, pointer limits and reset, stable portrait framing, marquee pause/resume, touch controls, keyboard states, workflow replay, reading progress, active sections, direct refresh/history, reduced motion, blocked GSAP, no JavaScript and resume printing. Axe WCAG A/AA checks and unthrottled Chrome lab performance observations are recorded locally in .hallmark/motion-v3/. These are lab observations, not field Core Web Vitals or a cross-browser certification.

The pre-upgrade public version is on codex/backup-before-motion-v3-2026-11-18 at commit 67156fa72ebb2152153e8166f9369974e1356324. No force-push is needed to restore it.

## Micro Slats replacement

The current homepage loads slats.css, assets/vendor/ogl-1.0.11.min.js and micro-slats.js after the existing motion layer. These are static browser assets; no React, installation, server-side rendering or build step is required. The local preparation bundle keeps only the six OGL exports used by the effect. The website makes no third-party library requests.

Colors are --slats-background, --slats-color and --slats-glint in slats.css. The overlay veil protects white navigation, action and name text. Dimensions, speed and interaction intensity are in the settings object in micro-slats.js. CSS provides the static slat fallback. The background control is only revealed after the renderer initializes, and is hidden if WebGL becomes unavailable. Context restoration remounts the renderer. Listeners, frame requests, observers and GPU resources are released on a non-persisted page exit.

The React Bits shader and fluid logic are adapted under its MIT + Commons Clause license, with the full license retained at assets/vendor/REACT-BITS-LICENSE.md. This port is embedded as part of this portfolio, not distributed as a component product. OGL is Unlicense/public-domain software; its terms are included in assets/vendor/OGL-LICENSE.txt. Source revision and dependency details are in assets/vendor/NOTICE.md.

The previous portrait version is preserved on codex/backup-before-micro-slats-2026-11-18 at commit 132552565aab8d41adf02f9c595200723d788f66. Original photo files remain in the repository but are no longer requested by the homepage.
