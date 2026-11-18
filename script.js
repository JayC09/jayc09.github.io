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

// Animation runs automatically. Escape provides a keyboard pause without extra UI.
window.portfolioMotionPaused = false;
const motionHelp = document.createElement('p');
motionHelp.id = 'motion-help';
motionHelp.className = 'visually-hidden';
motionHelp.textContent = 'Animations run automatically. Press Escape to pause or resume animation.';
document.body.prepend(motionHelp);
const motionStatus = document.createElement('span');
motionStatus.className = 'visually-hidden';
motionStatus.setAttribute('role', 'status');
document.body.append(motionStatus);
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || event.defaultPrevented) return;
  window.portfolioMotionPaused = !window.portfolioMotionPaused;
  document.documentElement.classList.toggle('motion-paused', window.portfolioMotionPaused);
  motionStatus.textContent = window.portfolioMotionPaused ? 'Animations paused. Press Escape to resume.' : 'Animations resumed.';
  window.dispatchEvent(new CustomEvent('portfolio:motion-pause'));
});

// The continuous name keeps hover, focus, offscreen and reduced-motion behavior.
const portraitHero = document.querySelector('.portrait-hero');
if (portraitHero) {
  portraitHero.setAttribute('aria-describedby', 'motion-help');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const marquee = portraitHero.querySelector('.name-marquee');
  const motion = { visible: true, hover: false, focus: false };
  const syncNameMotion = () => {
    const reduced = motionPreference.matches;
    portraitHero.classList.toggle('name-enhanced', !reduced);
    marquee.hidden = reduced;
    const running = !reduced && motion.visible && !window.portfolioMotionPaused &&
      !motion.hover && !motion.focus && !document.hidden;
    portraitHero.classList.toggle('name-is-running', running);
    portraitHero.dispatchEvent(new CustomEvent('portfolio:marquee-motion', { detail: { running, reduced } }));
  };
  window.addEventListener('portfolio:motion-pause', syncNameMotion);
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
