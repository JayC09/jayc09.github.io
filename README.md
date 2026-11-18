# Jay Chaudhary — Personal portfolio

A responsive, accessible, single-page portfolio built with HTML, CSS and optional vanilla JavaScript. No build process, package installation, backend, trackers or API keys.

## Files

- `index.html`: homepage, professional highlights, work, and verified contact links.
- `resume.html`: recruiter-friendly web resume with a browser Print / Save as PDF action.
- `style.css`: layout, colors, responsive rules and motion preferences.
- `script.js`: current footer year and active navigation enhancement.
- `assets/favicon.svg`: original initials favicon.
- `.nojekyll`: tells GitHub Pages to serve the static files directly.

## Preview and edit

Open `index.html` in a browser. Edit the HTML for copy and links, and CSS for visual changes. All asset paths are relative, so the site can also run in a project subdirectory. Expandable case studies use native HTML `details` and work without JavaScript.

Only user-supplied professional facts are included. Myntra savings are explicitly reported. Groww is an independent study with planned research, not a validated result. Contact links were drawn from previously supplied recruiter/public details: jay.chaudhary2000@gmail.com and https://www.linkedin.com/in/jay-chaudhary/. The resume is a verified-facts HTML page, not a hosted copy of the older Google APM-targeted resume PDF. No unverified dates or links are introduced.

## GitHub Pages deployment

Verified account: `JayC09`. Repository: `JayC09/jayc09.github.io`. Expected root site: https://jayc09.github.io/ . The originally requested `jaychaudhary.github.io` address requires the corresponding GitHub username or another domain configuration; naming a repository that way under JayC09 does not grant that root address.

1. Upload these files to the repository's `main` branch, keeping `index.html` at the root and the favicon in `assets/`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select **main** and **/ (root)**, then **Save**.
5. Check the **Actions** tab for a successful **pages build and deployment** run, including `resume.html`.
6. Open https://jayc09.github.io/ and check the navigation, case-study disclosures and mobile layout.

For a browser-only upload, use **Add file → Upload files** on the Code tab. Upload the extracted ZIP contents, not the ZIP file or a containing folder. If hidden `.nojekyll` is omitted, create an empty `.nojekyll` using **Add file → Create new file**; the HTML site also works with the default Pages processing.

## Future updates

On GitHub, open a file, choose **Edit**, make the change and commit to `main`. Pages redeploys automatically. Add a verified LinkedIn or email link to Contact and, optionally, a real resume PDF under `assets/` with a relative link. Update both visible copy and metadata when changing the positioning or published URL.

The new homepage includes recruiter-oriented introductory copy, a View resume link, email and LinkedIn pathways, and the original GitHub contact link. The resume page offers Print / Save as PDF using browser print; it does not pretend a downloadable PDF exists. If a separate approved PDF is later added, link to that real file.

Keep confidential employer materials out of this public repository. Publish new research outcomes only once completed and supported.

## Portfolio v2 — P1

Dedicated case studies: projects/myntra.html (T.H.R.E.A.D., discovery, priorities, architecture, AI trust, contribution, outcomes and reflection) and projects/oracle.html (migration workflow, incremental extraction, PL/SQL automation, outcomes and PM relevance). Homepage cards link to both pages. The existing P0 resume, contacts and project disclosures remain available.

All new illustrations use semantic HTML and CSS in style.css; there are no image downloads, external dependencies or additional build requirements. Vendor comparison fields are conceptual and contain no real quotations. Keep reconstruction captions attached to diagrams. Oracle logging and selective reruns are explicitly retrospective analysis because implementation specifics were not established in the available sources.

Source review included the accessible T.H.R.E.A.D. internship report, CV, Oracle project and interview notes, existing website and supplied brief. Raw private source documents are intentionally not copied to this public repository. Reported metrics are distinguished from derived comparisons; no additional adoption, revenue or accuracy claims are published. Groww research remains in progress.

Edit the project HTML files directly to update their narratives. Use ../ paths for shared assets and homepage links. The case-study table of contents uses native anchor links and works without JavaScript. Reuse the .study-figure, .flow and .study-cards components for additional diagrams. Update stylesheet version query strings when changing shared CSS to avoid stale cached assets.

## Company identity update

The hero explicitly identifies Jay as an MBA at IIM Raipur. Scoped company themes use pink/orange for Myntra and red for Oracle across cards, experience entries, highlights and case-study pages. The neutral portfolio theme remains the default elsewhere.

Logo source files (unmodified PNG images embedded in self-contained SVG containers):
- Myntra: https://constant.myntassets.com/www/data/portal/mlogo.png (linked by Myntra's public homepage).
- Oracle: https://www.oracle.com/a/pr/docs/oracle-logo.zip (official Oracle News resources download).

assets/myntra-logo.svg and assets/oracle-logo.svg are served locally. Keep the supplied proportions and white logo panels. Company logos identify past experience; they are not endorsement claims.

## Hallmark redesign, 18 November 2026

The existing four pages now share a name-led editorial system inspired by the supplied Dennis Snellenberg reference. No third-party imagery, source code, or portrait is copied. MBA identity, reported outcomes, company logo assets, brand accents, case studies, contact destinations, section IDs, script selectors and the resume print handler are preserved.

Shared presentation lives in style.css, tokens.css and base.css. The DM Sans font files are self-hosted in assets/ with their SIL Open Font License. The site still needs no build step or backend. design.md records the common system. Project diagrams are available inside the original homepage project-note disclosures and on the dedicated case-study pages. Longer introductory copy remains in the About background disclosure.

The previous public site is preserved on branch codex/backup-before-hallmark-2026-11-17, at commit 4e77d591859f0b8e5b7d8f0c53a3b66188879b29. To restore it, create a new commit on main that restores the files from that branch. Avoid force-pushing; keep later work reviewable.

Hallmark validation records are stored locally in .hallmark/. .hallmark/copy-changes.md lists headline and punctuation adjustments. The local QA packages, source generators and screenshots are excluded from the deployed repository. No development packages are required by the public site.

## Portrait-led update

The owner's supplied photo now leads the homepage. The current file, assets/jay-chaudhary-photoroom.png, is the unchanged 1800 × 2400 transparent PNG supplied on 18 November. CSS frames its lower portion to avoid the large transparent margin above the subject and limits desktop display size for a sharper portrait. No facial features, clothes or background pixels are synthesized or edited. The earlier assets/jay-chaudhary.png remains available in the repository.

The hero fills the viewport edge to edge, with a grey field, a smaller centered portrait, large white scrolling name text, an MBA badge and matching circular work and resume links. A lower scrim improves white-text readability. Mobile has its own crop and controls. The name moves right to left and can be paused; reduced-motion preferences and disabled JavaScript show a static name. Existing company branding, project pages, disclosures, verified contacts and print behavior remain intact.

To change the portrait, replace the image reference and preload in index.html, update its width and height attributes, then adjust .portrait-window img framing in style.css for the new image's transparent margins. Marquee speed is the 28s name-scroll duration in style.css; pause behavior lives in script.js. Update CSS and JavaScript version queries on all four HTML pages when editing shared files.

The version before the smaller portrait and scrolling name is preserved on codex/backup-before-marquee-2026-11-18 at commit a73fad141b64a6988943a24290995199b5b76176.

The previous name-led design is backed up on codex/backup-before-portrait-2026-11-18 at commit eb8f8ef556f1f2ae5f59a320a55b6335d42c536a. This is in addition to the earlier pre-Hallmark backup.

## Portfolio v3 motion upgrade

The site still runs as static HTML, CSS and JavaScript. motion.css and motion.js add optional interaction without a build step. index.html and both project pages load the locally hosted, pinned GSAP 3.15.1 core; resume.html uses CSS feedback and the original print script without loading the animation library. The original license header is intact; see assets/vendor/NOTICE.md for source and license links. No CDN requests, ScrollTrigger, Draggable or third-party effect snippets are required.

MOTION.md maps each effect to its selectors and describes accessibility, fallbacks and editing. Keep the current deferred script order on the homepage and project pages: script.js, pinned GSAP, then motion.js. Change shared version query strings on all four pages when changing shared CSS or JavaScript.

The existing portrait asset, professional claims, diagram captions, contacts, section IDs and routes are preserved. New quote and fund demonstrations are expressly conceptual and use no real vendor, quote, fund-return or client data. Oracle comparisons retain approximate baseline and strict under-30-minute labels without interpolated numeric claims. All original workflows remain readable with JavaScript disabled.

The previous public version is preserved on codex/backup-before-motion-v3-2026-11-18 at commit 67156fa72ebb2152153e8166f9369974e1356324. Restore it with a new commit rather than rewriting main history.

## Micro Slats homepage

The portrait is now replaced by an interactive background adapted from https://reactbits.dev/backgrounds/micro-slats, with the existing name overlaid above it. The hero keeps the MBA badge, navigation and two circular actions. Photo assets stay archived but the portrait image and its preload are removed from index.html.

Edit slats.css for colors and the text-protection veil. Edit the settings object in micro-slats.js for slat size, wave speed or interaction strength. The pinned, locally hosted OGL 1.0.11 browser bundle is assets/vendor/ogl-1.0.11.min.js. React Bits and OGL source/license notices are in assets/vendor/. No React or build process is required to edit, preview or deploy the site. Update the homepage's slats version queries when changing these files.

Background and name have independent pause controls. Rendering stops offscreen and when the document is hidden. Reduced motion gives a still field; missing WebGL or JavaScript gives a CSS slat pattern. The background never intercepts normal links, focus, taps or scrolling. All case-study interactions and resume printing remain available.

The portrait version is backed up on codex/backup-before-micro-slats-2026-11-18 at commit 132552565aab8d41adf02f9c595200723d788f66. Restore through a new commit to preserve history.

## Compact Work experience update

The current homepage centers and enlarges the employer identities, removes the standalone highlight strip and combines Myntra and Oracle into two compact cards under Work experience. They sit side by side on desktop and stack on mobile. Reported time saved, migration runtime and experience duration remain in the cards. The duplicate timeline is removed, with #experience preserved as an anchor alias for #work. Groww remains a separate independent study in progress.

refinements.css controls the denser spacing, card grid, static Oracle chart and automatic conceptual quote-consolidation animation. The Myntra visual illustrates WhatsApp, email and Excel quotes arriving in one shared dashboard; it contains no actual vendor data. Detailed case-study content remains available through the case-study links. Oracle's runtime remains under 30 minutes, not an exact 30-minute claim.

Animation, replay, organize and comparison buttons are removed. Motion runs automatically; Escape pauses or resumes continuous motion, and reduced-motion preferences show static views. The new loop pauses offscreen or when the document is hidden. Native navigation, research/background disclosures and resume printing remain available. MOTION.md describes the current behavior.

The previous public version is preserved on codex/backup-before-compact-experience-2026-11-18 at commit 40e1820522b06ecc3f1ae6f0774c696e0c1669af.

## Supplied brand identities

The work-experience headers and case-study mastheads now use the owner's supplied assets: assets/myntra-symbol.png, assets/myntra-wordmark.png, assets/oracle-symbol.png and assets/oracle-wordmark.png. All four PNG files are copied unchanged. .brand-frame in refinements.css displays their artwork without the surrounding transparent margins. The wordmark image supplies the company heading's accessible name, avoiding a second visible typed name. The previous SVG logo assets remain archived in the repository.

The conceptual sourcing animation no longer includes a persistent connector line. Quote tiles still enter the shared dashboard automatically, and the consolidated phase leaves no line outside the dashboard.

## Lime hero actions

The hero's MBA badge, View work and View resume actions use #D5F478 with a radial sunrise fill on hover and keyboard focus. A matched dark label is revealed with the fill for contrast; the duplicate visual label is aria-hidden. The three actions use stronger nearest-target desktop magnetism with a 38px cap and extra approach range, while the circles retain a minimum gap. Focus, touch and reduced motion disable magnetic tracking. Edit the hero accent tokens and .hero-sun-action rules in refinements.css; the pointer behavior is in motion.js. Displayed education labels use MBA throughout the site, with the existing resume dates preserved.
