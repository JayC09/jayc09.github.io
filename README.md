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

The hero explicitly identifies Jay as an MBA Student at IIM Raipur. Scoped company themes use pink/orange for Myntra and red for Oracle across cards, experience entries, highlights and case-study pages. The neutral portfolio theme remains the default elsewhere.

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

The owner's supplied photo now leads the homepage. assets/jay-chaudhary.png is the original, unchanged 3000 × 4000 transparent PNG. CSS frames its lower portion to avoid the large transparent margin above the subject; no facial features, clothes or background pixels are synthesized or edited.

The hero uses a grey field, a centered portrait, large white name text, an MBA badge and a circular work link, following the supplied reference's composition. A lower scrim improves white-text readability. Mobile has its own crop and compact work control; the resume remains available in navigation. Existing company branding, project pages, disclosures, verified contacts and print behavior remain intact.

The previous name-led design is backed up on codex/backup-before-portrait-2026-11-18 at commit eb8f8ef556f1f2ae5f59a320a55b6335d42c536a. This is in addition to the earlier pre-Hallmark backup.
