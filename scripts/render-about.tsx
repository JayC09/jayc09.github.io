import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { renderToString } from "react-dom/server";
import CollapsingCards from "../components/ui/cue-collapsing-cards-accordion";
import { ABOUT_CARDS } from "../lib/about-cards";

const markup = renderToString(<CollapsingCards cards={ABOUT_CARDS} />);
let html = readFileSync("index.html", "utf8");
const marker = /<!-- ABOUT_REACT_START -->[\s\S]*?<!-- ABOUT_REACT_END -->/;
if (!marker.test(html)) throw new Error("Missing About component markers in index.html");
html = html.replace(marker, '<!-- ABOUT_REACT_START --><div id="about-cards-root" aria-label="Background and interests" aria-describedby="about-card-help">' + markup + '</div><!-- ABOUT_REACT_END -->');
for (const ext of ["js", "css"]) {
  const hash = createHash("sha256").update(readFileSync("assets/react/about." + ext)).digest("hex").slice(0,10);
  html = html.replace(new RegExp("assets/react/about\\." + ext + "(?:\\?[^\\\"]*)?", "g"), "assets/react/about." + ext + "?v=" + hash);
}
writeFileSync("index.html", html);
const notices = [
  ["React", "node_modules/react/LICENSE"],
  ["React DOM", "node_modules/react-dom/LICENSE"],
  ["Lucide React", "node_modules/lucide-react/LICENSE"],
  ["clsx", "node_modules/clsx/license"],
  ["tailwind-merge", "node_modules/tailwind-merge/LICENSE.md"],
  ["Tailwind CSS", "node_modules/tailwindcss/LICENSE"]
];
writeFileSync("assets/react/THIRD-PARTY-LICENSES.txt", notices.map(([name, file]) => name + "\n" + readFileSync(file, "utf8")).join("\n\n"));
console.log("Rendered seven About cards into index.html with versioned production assets.");
