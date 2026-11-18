# Design: Jay Chaudhary portfolio

The shared system for the homepage, case studies and resume.

## System
- Genre: editorial.
- Shape: name-led opening, centered employer identities and a compact two-column Work experience overview. Independent research follows separately.
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
- Company identities: use the supplied symbol and brand-text images once per header. The wordmark image supplies the heading's accessible name; do not add a second visible typed company name. CSS frames the original transparent margins without altering the files.
- Canvas: full-width homepage with responsive edge gutters. Employer cards share one desktop viewport and stack on mobile. Reading pages retain the capped 1440px container and 65ch prose measure. Compact overview gap is 24px; reading columns retain their 32px gap.
- Surfaces: whitespace and rules first. No nested cards.
- Prose: 65ch at 16px or larger, with long reading content retained.

## Controls
- One primary recipe: ink fill, paired paper text, pill outline.
- Secondary: transparent surface, ink border.
- Hero actions: lime #D5F478 outline and lettering on dark ink. A bottom-origin radial fill reveals dark lettering with the lime surface, maintaining contrast throughout. Keyboard focus receives the same fill. The two circular actions use a stronger nearest-target desktop magnet, capped at 38px with extra approach range and collision spacing. The rounded MBA badge shares the gentler 22px pill response.
- Contact actions: four equal pill buttons share the hero's lime fill and focus treatment. Attraction is gentler, capped at 22px with a shorter approach range. The footer continues the contact section's dark background across the full screen on the homepage and both case studies.
- Text actions are underlined. Every interactive element has immediate visible focus.
- All pill-shaped actions, including Download resume and case-study buttons, share the Email action's lime fill and gentler 22px magnet. Hero circles retain their stronger response.
- The web resume is a compact two-column PM overview at desktop sizes, with natural mobile/zoom reflow. Download resume is a native link to the owner's exact PDF, not a print action.

## Motion
The homepage name moves continuously right to left using the original transform-only CSS loop. Hover/focus pause, offscreen pause and reduced-motion static fallback remain. Optional GSAP playback-rate easing adds a soft resume and a small desktop scroll-speed response without resetting loop position. With JavaScript disabled the name is static and navigation works. Visible animation controls are removed at the owner's request; Escape toggles motion globally, with screen-reader instructions and status.

Portfolio v3 layers interaction over this system in motion.css and motion.js. Hero magnets settle in 360ms with a 440ms label response and the radial lime fill takes 620ms. Reveals use 650ms with a 90ms stagger; workflow highlighting completes within approximately one second. The MBA badge and circular actions attract the pointer from a larger capture zone; the former portrait and ambient badge drift are removed. Magnets are disabled for touch, reduced motion and focused actions. No custom cursor, scroll interception, preloader, particles or experimental name dragging.

The Micro Slats replacement is adapted from the owner's chosen React Bits reference into plain JavaScript, with locally hosted OGL 1.0.11. slats.css owns the green/charcoal background tokens and text-protection veil. micro-slats.js owns automatic waves, pointer/tap ripples, keyboard pause, visibility scheduling and WebGL cleanup. Rendering is capped at 1.8 million pixels and 1.5 device-pixel ratio, with 45fps desktop and 30fps coarse-pointer limits. Reduced motion renders a still field; missing JavaScript or WebGL retains a CSS slat pattern.

Content stays visible by default. Reveal animations start only at intersection and run once. Myntra's conceptual WhatsApp/email/Excel consolidation loops automatically while visible; Oracle's before/after chart is static. The standalone highlight strip and duplicate experience timeline are removed; metrics are retained in the employer cards and detailed case studies. Replay, organize, compare and animation pause buttons are removed. Reduced motion shows static diagrams. All four pages load the local GSAP core for shared pill interactions. Longer case studies retain a decorative reading-progress line and active native anchor links. refinements.css owns the denser desktop layout and automatic consolidation visual; resume.css owns the compact resume. See MOTION.md for maintenance.

## Material
No portrait is displayed or preloaded on the current homepage. Earlier supplied images remain archived in the repository and backup branch. Existing factual diagrams and logos are retained.
Company colors identify experience, not affiliation or endorsement.

## Exports
tokens.css and base.css are shared by all four pages through style.css.
