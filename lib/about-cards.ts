export type AboutCard = {
  id: string;
  wordmark: string;
  group: "Background" | "Interests";
  title: string;
  paragraphs: string[];
  image: string;
  position?: string;
  link?: { href: string; label: string };
};

export const ABOUT_CARDS: AboutCard[] = [
  {
    id: "education", wordmark: "Education", group: "Background",
    title: "A business lens. An engineering base.",
    paragraphs: ["MBA, IIM Raipur. B.Tech in Computer Science, NMIMS University, Mumbai. Certified Scrum Product Owner (CSPO)."],
    image: "assets/about/education.webp",
    link: { href: "resume.html", label: "View resume" }
  },
  {
    id: "myntra", wordmark: "Myntra", group: "Background",
    title: "Product thinking in fast fashion.",
    paragraphs: ["Two months with FWD: sourcing intelligence, vendor quotes and AI-assisted cost estimation. Reported about one day saved per designer design cycle."],
    image: "assets/about/myntra.webp",
    link: { href: "projects/myntra.html", label: "View case study" }
  },
  {
    id: "oracle", wordmark: "Oracle", group: "Background",
    title: "Making banking workflows work better.",
    paragraphs: ["About 26 months as an Associate Consultant in enterprise banking. Helped shorten a migration process from roughly three hours to under 30 minutes."],
    image: "assets/about/oracle.webp",
    link: { href: "projects/oracle.html", label: "View case study" }
  },
  {
    id: "coffee", wordmark: "Coffee", group: "Interests",
    title: "Always brewing a new idea.",
    paragraphs: ["Drinking it, making it, exploring it. There’s usually another coffee I’m curious about."],
    image: "assets/about/coffee.webp", position: "50% 55%"
  },
  {
    id: "active", wordmark: "Active", group: "Interests",
    title: "A rally. A workout. A reset.",
    paragraphs: ["Badminton and gym time are my favourite ways to step away from a screen."],
    image: "assets/about/active.webp"
  },
  {
    id: "tech", wordmark: "Tech", group: "Interests",
    title: "Curious, from phones to cars.",
    paragraphs: ["I love exploring the tech behind everyday devices and the machines that move us."],
    image: "assets/about/tech.webp", position: "50% 40%"
  },
  {
    id: "gaming", wordmark: "Gaming", group: "Interests",
    title: "Usually on a side quest.",
    paragraphs: ["GTA, Assassin’s Creed and BioShock have kept me busy. Red Dead Redemption 2 and The Witcher 3 are my favourites."],
    image: "assets/about/gaming.webp"
  }
];
