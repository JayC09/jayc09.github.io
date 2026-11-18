/* Optional Portfolio v3 interactions. Semantic content and links need no script. */
(() => {
  'use strict';
  if (window.portfolioMotion) return;
  const gs = window.gsap;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 961px)');
  const lifecycle = new AbortController();
  const observers = [], animations = new Set(), frames = new Set(), timers = new Set();
  let pointerMedia;
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const on = (node, event, fn, options = {}) => node.addEventListener(event, fn, { ...options, signal: lifecycle.signal });
  const frame = fn => { const id = requestAnimationFrame(() => { frames.delete(id); fn(); }); frames.add(id); return id; };
  const cancelFrame = id => { cancelAnimationFrame(id); frames.delete(id); };
  const later = (fn, delay) => { const id = setTimeout(() => { timers.delete(id); fn(); }, delay); timers.add(id); return id; };
  const cancelLater = id => { clearTimeout(id); timers.delete(id); };
  const nodes = target => typeof target === 'string' ? all(target) : target instanceof Element ? [target] : [...target];
  // Small fallback for stateful diagrams if the optional animation engine fails.
  function set(target, values) {
    if (gs) { gs.set(target, values); return; }
    for (const node of nodes(target)) {
      if ('opacity' in values) node.style.opacity = values.opacity;
      for (const [key, value] of Object.entries(values)) if (key.startsWith('--')) node.style.setProperty(key, value);
      if (['x', 'y', 'rotation', 'scaleX', 'scale'].some(key => key in values)) {
        node.style.transform = `translate(${values.x || 0}px,${values.y || 0}px) rotate(${values.rotation || 0}deg) scale(${values.scaleX ?? values.scale ?? 1},${values.scale ?? 1})`;
      }
    }
  }
  function to(target, options) {
    const { duration, delay, ease, stagger, onComplete, overwrite, ...end } = options;
    if (!gs || preference.matches || window.portfolioMotionPaused) { set(target, end); onComplete?.(); return null; }
    let animation;
    animation = gs.to(target, { ...options, onInterrupt: () => animations.delete(animation), onComplete: () => { animations.delete(animation); onComplete?.(); } });
    animations.add(animation);
    return animation;
  }
  function stop(animation) { if (animation) { animation.kill(); animations.delete(animation); } }
  function onceVisible(node, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting && fn() !== false) observer.unobserve(entry.target);
    }, { threshold: .12 });
    observer.observe(node); observers.push(observer);
  }

  function consolidationLoops() {
    all('.quote-consolidation').forEach(figure => {
      let visible = false;
      const sync = () => figure.classList.toggle('is-suspended', !visible || document.hidden);
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) figure.classList.add('is-looping');
          sync();
        }, { threshold: .1 });
        observer.observe(figure); observers.push(observer);
      } else { visible = true; figure.classList.add('is-looping'); }
      on(document, 'visibilitychange', sync); sync();
    });
  }

  function workflows() {
    all('[data-workflow]').forEach(figure => {
      const steps = all('.flow li', figure);
      let animation;
      const play = () => {
        if (figure.dataset.active === 'false') return false;
        stop(animation);
        set(steps, { '--step-fill': 0 });
        animation = to(steps, { '--step-fill': 1, duration: .35, stagger: .15, ease: 'power2.out', overwrite: true });
      };
      onceVisible(figure, play);
    });
  }

  function reveals() {
    if (!gs) return;
    const groups = [];
    for (const selector of ['.skills', '.study-impact']) {
      const root = document.querySelector(selector); if (root) groups.push([root, [...root.children]]);
    }
    all('.project,#about .about-grid,.contact-section,.study-next').forEach(root => {
      const targets = root.classList.contains('project') ? all('.project-heading,.project-body', root) : [root];
      groups.push([root, targets]);
    });
    groups.forEach(([root, targets]) => {
      targets.forEach(target => target.setAttribute('data-motion-reveal', ''));
      onceVisible(root, () => {
        if (preference.matches || window.portfolioMotionPaused) return;
        set(targets, { opacity: 0, y: 18 });
        to(targets, { opacity: 1, y: 0, duration: .65, stagger: .09, ease: 'power3.out', overwrite: true });
      });
    });
  }

  function pointerDepth() {
    const hero = document.querySelector('.portrait-hero');
    if (!hero || !gs) return;
    pointerMedia = gs.matchMedia();
    pointerMedia.add('(hover: hover) and (pointer: fine) and (min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      const signal = new AbortController(), badge = hero.querySelector('.education-badge'), light = hero.querySelector('.depth-light');
      const bind = (node, event, fn) => node.addEventListener(event, fn, { signal: signal.signal, passive: true });
      hero.classList.add('has-depth');
      const quick = (node, key, duration = .44) => node ? gs.quickTo(node, key, { duration, ease: 'back.out(1.25)' }) : () => {};
      set(badge, { '--depth-x': '0px', '--depth-y': '0px' });
      const badgeX = quick(badge, '--depth-x', .5), badgeY = quick(badge, '--depth-y', .5), lightX = quick(light, 'x', .55), lightY = quick(light, 'y', .55);
      const magnets = all('.magnetic-zone', hero).map(zone => {
        const button = zone.querySelector('a'), label = button.querySelector('.magnetic-label');
        return { zone, button, x: quick(button, 'x'), y: quick(button, 'y'), lx: quick(label, 'x', .5), ly: quick(label, 'y', .5) };
      });
      let rect, point, pending = 0;
      const measure = () => { rect = hero.getBoundingClientRect(); magnets.forEach(magnet => { magnet.rect = magnet.zone.getBoundingClientRect(); }); };
      const reset = () => { badgeX(0); badgeY(0); lightX(0); lightY(0); magnets.forEach(magnet => { magnet.x(0); magnet.y(0); magnet.lx(0); magnet.ly(0); }); };
      const update = () => {
        pending = 0;
        if (window.portfolioMotionPaused) return;
        const nx = Math.max(-1, Math.min(1, (point.x - rect.left) / rect.width * 2 - 1));
        const ny = Math.max(-1, Math.min(1, (point.y - rect.top) / rect.height * 2 - 1));
        badgeX(nx * 5); badgeY(ny * 5); lightX(nx * -9); lightY(ny * -9);
        magnets.forEach(magnet => {
          const r = magnet.rect, dx = point.x - r.left - r.width / 2, dy = point.y - r.top - r.height / 2, radius = r.width / 2 + 32;
          const near = Math.hypot(dx, dy) < radius && document.activeElement !== magnet.button;
          const x = near ? dx / radius * 8 : 0, y = near ? dy / radius * 8 : 0;
          magnet.x(x); magnet.y(y); magnet.lx(x * .3); magnet.ly(y * .3);
        });
      };
      measure(); bind(hero, 'pointerenter', measure); bind(window, 'resize', measure);
      bind(hero, 'pointermove', event => { if (event.pointerType !== 'mouse') return; point = { x: event.clientX, y: event.clientY }; if (!pending) pending = frame(update); });
      bind(hero, 'pointerleave', () => { cancelFrame(pending); pending = 0; reset(); });
      magnets.forEach(magnet => {
        bind(magnet.button, 'focus', reset);
        bind(magnet.button, 'pointerdown', () => to(magnet.button, { scale: .95, duration: .15, ease: 'power2.out', overwrite: 'auto' }));
        bind(magnet.button, 'pointerup', () => to(magnet.button, { scale: 1, duration: .2, ease: 'power2.out', overwrite: 'auto' }));
        bind(magnet.button, 'pointercancel', () => set(magnet.button, { scale: 1 }));
        bind(magnet.button, 'pointerleave', () => to(magnet.button, { scale: 1, duration: .2, ease: 'power2.out', overwrite: 'auto' }));
      });
      return () => { signal.abort(); cancelFrame(pending); hero.classList.remove('has-depth'); };
    });
  }

  function marqueePolish() {
    const hero = document.querySelector('.portrait-hero'), track = hero?.querySelector('.name-track');
    if (!hero || !gs || !track.getAnimations) return;
    const driver = { rate: 1 };
    let animation, settleTimer, previousY = scrollY, previousTime = performance.now();
    const apply = () => {
      const marquee = track.getAnimations().find(item => item.animationName === 'name-scroll');
      marquee?.updatePlaybackRate?.(driver.rate);
    };
    const rate = (value, duration) => { stop(animation); animation = to(driver, { rate: value, duration, ease: 'power2.out', onUpdate: apply }); };
    on(hero, 'portfolio:marquee-motion', event => {
      cancelLater(settleTimer);
      if (event.detail.running && !preference.matches) { driver.rate = .35; apply(); rate(1, .5); }
      else { stop(animation); driver.rate = 1; apply(); }
    });
    on(window, 'scroll', () => {
      const now = performance.now(), elapsed = Math.max(16, now - previousTime), velocity = Math.abs(scrollY - previousY) / elapsed;
      previousY = scrollY; previousTime = now;
      if (!pointer.matches || preference.matches || !hero.classList.contains('name-is-running')) return;
      rate(1 + Math.min(.35, velocity * .12), .2);
      cancelLater(settleTimer); settleTimer = later(() => rate(1, .65), 120);
    }, { passive: true });
  }

  function readingProgress() {
    const body = document.querySelector('.study-body'); if (!body) return;
    const progress = document.createElement('div'); progress.className = 'reading-progress'; progress.setAttribute('aria-hidden', 'true'); document.body.append(progress);
    const sections = all('.study-section', body), links = all('.study-toc a[href^="#"]');
    let bounds = [], start = 0, end = 1, pending = false;
    const draw = () => {
      pending = false;
      const ratio = Math.max(0, Math.min(1, (scrollY - start) / Math.max(1, end - start)));
      progress.style.transform = `scaleX(${ratio})`;
      let active = sections[0]?.id;
      for (const bound of bounds) if (bound.y <= scrollY + innerHeight * .3) active = bound.id;
      links.forEach(link => { if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    };
    const measure = () => {
      bounds = sections.map(section => ({ id: section.id, y: section.getBoundingClientRect().top + scrollY }));
      start = document.querySelector('main').getBoundingClientRect().top + scrollY;
      end = document.querySelector('main').getBoundingClientRect().bottom + scrollY - innerHeight;
      draw();
    };
    on(window, 'scroll', () => { if (!pending) { pending = true; frame(draw); } }, { passive: true });
    on(window, 'resize', measure, { passive: true }); on(window, 'pageshow', measure);
    all('details').forEach(details => on(details, 'toggle', () => frame(measure)));
    document.fonts?.ready.then(measure); measure();
  }

  // Each enhancement fails independently; a missing animation engine never hides content.
  for (const feature of [consolidationLoops, workflows, reveals, pointerDepth, marqueePolish, readingProgress]) {
    try { feature(); } catch (error) { console.warn(`Portfolio enhancement unavailable: ${feature.name}`, error); }
  }
  on(window, 'portfolio:motion-pause', () => {
    if (window.portfolioMotionPaused) {
      for (const animation of [...animations]) { animation.progress(1); animation.kill(); }
      animations.clear();
    }
  });
  on(preference, 'change', () => {
    if (preference.matches) {
      for (const animation of [...animations]) { animation.progress(1); animation.kill(); }
      animations.clear();
    }
  });
  const destroy = () => {
    lifecycle.abort(); observers.forEach(observer => observer.disconnect());
    pointerMedia?.revert(); animations.forEach(animation => animation.kill()); animations.clear();
    frames.forEach(id => cancelAnimationFrame(id)); timers.forEach(id => clearTimeout(id)); frames.clear(); timers.clear();
  };
  window.portfolioMotion = { destroy };
  on(window, 'pagehide', event => { if (!event.persisted) destroy(); });
})();
