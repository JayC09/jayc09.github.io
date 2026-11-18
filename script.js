// Optional enhancement; all navigation and case studies work without JavaScript.
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const sections = document.querySelectorAll('main > section[id]');
const navigation = document.querySelectorAll('nav a');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navigation) {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}

// A continuous name marquee with explicit pause and reduced-motion support.
const portraitHero = document.querySelector('.portrait-hero');
if (portraitHero) {
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const marquee = portraitHero.querySelector('.name-marquee');
  const toggle = portraitHero.querySelector('.name-toggle');
  const motion = { visible: true, held: false, hover: false, focus: false };
  const syncNameMotion = () => {
    const reduced = motionPreference.matches;
    portraitHero.classList.toggle('name-enhanced', !reduced);
    marquee.hidden = reduced;
    toggle.hidden = reduced;
    const running = !reduced && motion.visible && !motion.held &&
      !motion.hover && !motion.focus && !document.hidden;
    portraitHero.classList.toggle('name-is-running', running);
    toggle.textContent = motion.held ? 'Play name' : 'Pause name';
    toggle.setAttribute('aria-label', motion.held ? 'Play scrolling name' : 'Pause scrolling name');
    toggle.setAttribute('aria-pressed', String(motion.held));
  };
  toggle.addEventListener('click', () => { motion.held = !motion.held; syncNameMotion(); });
  marquee.addEventListener('pointerenter', () => { motion.hover = true; syncNameMotion(); });
  marquee.addEventListener('pointerleave', () => { motion.hover = false; syncNameMotion(); });
  portraitHero.addEventListener('focusin', () => { motion.focus = true; syncNameMotion(); });
  portraitHero.addEventListener('focusout', event => {
    if (!portraitHero.contains(event.relatedTarget)) { motion.focus = false; syncNameMotion(); }
  });
  document.addEventListener('visibilitychange', syncNameMotion);
  motionPreference.addEventListener('change', syncNameMotion);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      motion.visible = entry.isIntersecting;
      syncNameMotion();
    }).observe(portraitHero);
  }
  syncNameMotion();
}
