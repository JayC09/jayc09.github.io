import { createRoot, hydrateRoot } from "react-dom/client";
import CollapsingCards from "@/components/ui/cue-collapsing-cards-accordion";
import { ABOUT_CARDS } from "@/lib/about-cards";
import "../styles/components.css";

const root = document.getElementById("about-cards-root");
if (root) {
  const cards = [...root.querySelectorAll("details")];
  const initialIndex = Math.max(0, cards.findIndex(card => card.open));
  const component = <CollapsingCards cards={ABOUT_CARDS} initialIndex={initialIndex} />;
  if (import.meta.env.DEV) createRoot(root).render(component);
  else hydrateRoot(root, component);
  root.dataset.react = "ready";
}
