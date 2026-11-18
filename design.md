# Design: Jay Chaudhary portfolio

The shared system for the homepage, case studies and resume.

## System
- Genre: editorial.
- Shape: name-led opening followed by an open index of selected work.
- Theme: the portfolio's existing brand, with composition informed by the supplied Dennis Snellenberg reference.
- Tone: confident, direct, spacious, personal.
- Hero: portrait-led Poster on the homepage; compact Banner on reading pages.
- Signature: the owner's supplied portrait centered on a grey field, with white nameplate typography across the lower hero and an MBA education badge alongside.

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
The homepage name moves continuously right to left using a transform-only loop, as requested by the owner. A visible pause control, hover/focus pause, offscreen pause and reduced-motion static fallback keep it accessible. With JavaScript disabled the name is static and all navigation works. Other feedback is transform-only. No custom cursor, parallax or preloader.

## Material
The owner's supplied transparent portrait is used unchanged, framed through CSS to remove empty transparent margins from the visible composition. Existing factual diagrams and logos are retained.
Company colors identify experience, not affiliation or endorsement.

## Exports
tokens.css and base.css are shared by all four pages through style.css.
