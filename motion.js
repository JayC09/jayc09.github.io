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
    if (!gs || !('IntersectionObserver' in window)) return;
    const selector = [
      '.site-header .wordmark', '.site-header nav', 'main .back-link',
      'main h1', 'main h2', 'main h3', 'main p', 'main ul', 'main figure', 'main details',
      '.education-badge', '.portrait-actions', '.section-heading', '.work-card-header', '.work-metric',
      '.case-study-link', '.project-meta', '.tags', '.brand-lockup', '.study-impact>*', '.study-cards>article',
      '.flow', '.table-wrap', '.credentials>div', '.skills>div', '.contact-actions', '.study-next>.pill-magnetic-zone',
      '.cv-heading', '.cv-role', '.cv-sidebar>section', '.footer-inner>*', '.cv-footer>*',
      '.about-panel-heading', '.about-mini-card'
    ].join(',');
    const candidates = all(selector).filter(node => !node.closest('[aria-hidden="true"],.study-toc,figcaption'));
    // Animate each independent content block once per entrance, without nesting fades.
    const targets = candidates.filter(node => !candidates.some(parent => parent !== node && parent.contains(node)));
    const states = targets.map((node, index) => {
      node.setAttribute('data-motion-reveal', '');
      node.setAttribute('data-scroll-reveal', '');
      return { node, index, inside: false, side: 1, animation: null };
    });
    const lookup = new Map(states.map(state => [state.node, state]));
    const allowed = () => !preference.matches && !window.portfolioMotionPaused && !matchMedia('print').matches;
    const shift = state => state.node.closest('.resume-page,footer,.site-header') ? 0 : state.side * 20;
    const show = state => {
      stop(state.animation);
      set(state.node, { '--reveal-opacity': 1, '--reveal-y': '0px' });
    };
    const conceal = state => {
      stop(state.animation);
      set(state.node, { '--reveal-opacity': 0, '--reveal-y': shift(state) + 'px' });
    };
    const observer = new IntersectionObserver(entries => {
      let stagger = 0;
      for (const entry of entries) {
        const state = lookup.get(entry.target);
        if (!state) continue;
        state.inside = entry.isIntersecting;
        if (!allowed() || state.node.contains(document.activeElement)) { show(state); continue; }
        if (entry.isIntersecting) {
          stop(state.animation);
          state.node.dataset.revealFrom = state.side > 0 ? 'below' : 'above';
          set(state.node, { '--reveal-opacity': 0, '--reveal-y': shift(state) + 'px' });
          state.animation = to(state.node, {
            '--reveal-opacity': 1, '--reveal-y': '0px',
            duration: .6, delay: Math.min(stagger++ * .035, .105), ease: 'power2.out', overwrite: true
          });
        } else {
          state.side = entry.boundingClientRect.top >= innerHeight ? 1 : -1;
          conceal(state);
        }
      }
    }, { rootMargin: '48px 0px', threshold: 0 });
    states.forEach(state => {
      const rect = state.node.getBoundingClientRect();
      state.side = rect.bottom < 0 ? -1 : 1;
      if (allowed()) conceal(state);
      observer.observe(state.node);
    });
    observers.push(observer);
    const refresh = () => {
      states.forEach(state => {
        const rect = state.node.getBoundingClientRect();
        state.inside = rect.bottom > -48 && rect.top < innerHeight + 48;
        state.side = rect.bottom <= -48 ? -1 : 1;
        if (!allowed() || state.inside || state.node.contains(document.activeElement)) show(state);
        else conceal(state);
      });
    };
    on(document, 'focusin', event => {
      for (const state of states) if (state.node.contains(event.target)) show(state);
    });
    on(preference, 'change', refresh);
    on(window, 'portfolio:motion-pause', refresh);
    on(window, 'beforeprint', () => states.forEach(show));
    on(window, 'afterprint', refresh);
    on(window, 'pageshow', event => { if (event.persisted) refresh(); });
  }

  function pointerDepth() {
    if (!gs) return;
    const groups = [
      { root: document.querySelector('.portrait-hero'), selector: '.magnetic-zone', badge: false, cap: 38, reach: 144, gap: 8, labelPull: .3, press: .95 },
      { root: document.body, selector: '.pill-magnetic-zone', badge: true, cap: 22, reach: 96, gap: 6, labelPull: .22, press: .97 }
    ].filter(group => group.root);
    pointerMedia = gs.matchMedia();
    pointerMedia.add('(hover: hover) and (pointer: fine) and (min-width: 961px) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = groups.map(group => {
        const root = group.root, signal = new AbortController(), badge = group.badge ? root.querySelector('.education-badge') : null;
        const bind = (node, event, fn) => node.addEventListener(event, fn, { signal: signal.signal, passive: true });
        const quick = (node, key, duration = .36) => gs.quickTo(node, key, { duration, ease: 'back.out(1.25)' });
        const magnets = all(group.selector, root).map(zone => {
          return { zone, button: zone.querySelector('a') };
        });
        if (badge) magnets.push({ button: badge });
        magnets.forEach(magnet => {
          const labels = all('.magnetic-label', magnet.button);
          Object.assign(magnet, { x: quick(magnet.button, 'x'), y: quick(magnet.button, 'y'), lx: quick(labels, 'x', .44), ly: quick(labels, 'y', .44) });
        });
        let point, pending = 0;
        const measure = () => magnets.forEach(magnet => {
          const rect = (magnet.zone || magnet.button).getBoundingClientRect();
          const x = magnet.zone ? 0 : Number(gs.getProperty(magnet.button, 'x'));
          const y = magnet.zone ? 0 : Number(gs.getProperty(magnet.button, 'y'));
          magnet.rect = { left: rect.left - x, right: rect.right - x, top: rect.top - y, width: rect.width, height: rect.height };
        });
        const reset = (instant = false) => magnets.forEach(magnet => {
          for (const move of [magnet.x, magnet.y, magnet.lx, magnet.ly]) {
            move(0);
            if (instant) move.tween.progress(1).pause();
          }
        });
        const update = () => {
          pending = 0;
          if (!point || window.portfolioMotionPaused) return;
          if (magnets.some(magnet => document.activeElement === magnet.button)) { reset(true); return; }
          measure();
          let nearest, nearestDistance = Infinity;
          magnets.forEach(magnet => {
            const r = magnet.rect, distance = Math.hypot(point.x - r.left - r.width / 2, point.y - r.top - r.height / 2);
            if (document.activeElement !== magnet.button && distance < Math.max(r.width, r.height) / 2 + group.reach && distance < nearestDistance) { nearest = magnet; nearestDistance = distance; }
          });
          magnets.forEach(magnet => {
            const r = magnet.rect, dx = point.x - r.left - r.width / 2, dy = point.y - r.top - r.height / 2;
            const distance = Math.hypot(dx, dy), radius = Math.max(r.width, r.height) / 2 + group.reach;
            const pull = magnet === nearest ? Math.min(group.cap, distance * .58) * Math.max(0, 1 - (distance / radius) ** 2) : 0;
            let x = distance ? dx / distance * pull : 0;
            const y = distance ? dy / distance * pull : 0;
            // Keep neighboring magnetic targets separated as they attract.
            if (magnet.zone) for (const other of magnets.filter(item => item.zone && item !== magnet)) {
              if (other.rect.top > r.top + r.height + group.cap || r.top > other.rect.top + other.rect.height + group.cap) continue;
              if (other.rect.left >= r.right && x > 0) x = Math.min(x, Math.max(0, other.rect.left - r.right - group.gap));
              if (other.rect.right <= r.left && x < 0) x = Math.max(x, -Math.max(0, r.left - other.rect.right - group.gap));
            }
            magnet.x(x); magnet.y(y); magnet.lx(x * group.labelPull); magnet.ly(y * group.labelPull);
          });
        };
        measure(); bind(window, 'resize', measure);
        bind(root, 'pointermove', event => { if (event.pointerType !== 'mouse') return; point = { x: event.clientX, y: event.clientY }; if (!pending) pending = frame(update); });
        bind(window, 'scroll', () => { if (point && !pending) pending = frame(update); });
        bind(root, 'pointerleave', () => { cancelFrame(pending); pending = 0; point = null; reset(); });
        bind(window, 'portfolio:motion-pause', () => { if (window.portfolioMotionPaused) reset(true); });
        magnets.forEach(magnet => {
          bind(magnet.button, 'focus', () => reset(true));
          bind(magnet.button, 'pointerdown', () => to(magnet.button, { scale: group.press, duration: .15, ease: 'power2.out', overwrite: 'auto' }));
          bind(magnet.button, 'pointerup', () => to(magnet.button, { scale: 1, duration: .2, ease: 'power2.out', overwrite: 'auto' }));
          bind(magnet.button, 'pointercancel', () => set(magnet.button, { scale: 1 }));
          bind(magnet.button, 'pointerleave', () => to(magnet.button, { scale: 1, duration: .2, ease: 'power2.out', overwrite: 'auto' }));
        });
        return () => { signal.abort(); cancelFrame(pending); };
      });
      return () => cleanups.forEach(cleanup => cleanup());
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
