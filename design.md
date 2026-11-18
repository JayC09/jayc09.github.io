# Design: Jay Chaudhary portfolio

The shared system for the homepage, case studies and resume.

## System
- Genre: editorial.
- Shape: name-led opening followed by an open index of selected work.
- Theme: the portfolio's existing brand, with composition informed by the supplied Dennis Snellenberg reference.
- Tone: confident, direct, spacious, personal.
- Hero: interactive slat field on the homepage; compact Banner on reading pages.
- Signature: green Micro Slats waves on charcoal, with the scrolling white name above the background and an MBA education badge alongside. The portrait is removed from the hero.

## Tokens
tokens.css owns every color, typeface and scale.
- Paper: cool off-white and a muted grey-green field.
- Ink: deep charcoal tinted toward the existing portfolio green.
- Accent: existing portfolio green. Preserve existing scoped Myntra pink/orange and Oracle red.
- Type: locally hosted DM Sans, 400 and 600. Headers stay one color and one weight.
- Canvas: full-width homepage with responsive edge gutters, as requested by the owner. Reading pages retain the capped 1440px container and 65ch prose measure. Column gap is 32px.
- Surfaces: whitespace and rules first. No nested cards.
- Prose: 65ch at 16px or larger, with long reading content retained.

## Controls
- One primary recipe: ink fill, paired paper text, pill outline.
- Secondary: transparent surface, ink border.
- Text actions are underlined. Every interactive element has immediate visible focus.
- Resume print handler and every existing route and contact destination stay intact.

## Motion
The homepage name moves continuously right to left using the original transform-only CSS loop. Its pause control, hover/focus pause, offscreen pause and reduced-motion static fallback remain authoritative. Optional GSAP playback-rate easing adds a soft resume and a small desktop scroll-speed response without resetting loop position. With JavaScript disabled the name is static and navigation works.

Portfolio v3 layers interaction over this system in motion.css and motion.js. Buttons respond in 150–250ms, magnets return in 440ms, reveals use 650ms with a 90ms stagger, project interactions use 450–750ms, and workflow highlighting completes within approximately one second. Desktop pointer depth affects the MBA badge; the former portrait and background highlight are removed. Magnets and badge depth are disabled for touch and reduced motion. No custom cursor, scroll interception, preloader, particles or experimental name dragging.

The Micro Slats replacement is adapted from the owner's chosen React Bits reference into plain JavaScript, with locally hosted OGL 1.0.11. slats.css owns the green/charcoal background tokens and text-protection veil. micro-slats.js owns waves, pointer/tap ripples, separate pause/play, visibility scheduling and WebGL cleanup. Rendering is capped at 1.8 million pixels and 1.5 device-pixel ratio, with 45fps desktop and 30fps coarse-pointer limits. Reduced motion renders a still field; missing JavaScript or WebGL retains a CSS slat pattern. The existing name controls remain independent.

Content stays visible by default. Reveal animations start only at intersection and run once. Every project interaction has a native button, and all original diagrams and claims remain. Reduced motion makes state changes instant. CSS-only navigation, link, press and native disclosure feedback also apply to the resume, which does not load GSAP. Longer case studies have a decorative reading-progress line and active native anchor links. See MOTION.md for selectors, fallbacks and maintenance.

## Material
No portrait is displayed or preloaded on the current homepage. Earlier supplied images remain archived in the repository and backup branch. Existing factual diagrams and logos are retained.
Company colors identify experience, not affiliation or endorsement.

## Exports
tokens.css and base.css are shared by all four pages through style.css.
