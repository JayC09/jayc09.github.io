/* Lenis smooth scrolling. Native scrolling remains the no-JS/reduced-motion fallback. */
(() => {
  'use strict';
  if (window.portfolioScroll) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const lifecycle = new AbortController();
  const on = (node, event, fn, options = {}) => node.addEventListener(event, fn, { ...options, signal: lifecycle.signal });
  let lenis;
  const enabled = () => !preference.matches && !window.portfolioMotionPaused && !matchMedia('print').matches;
  const sync = () => {
    if (enabled() && window.Lenis) {
      if (!lenis) lenis = new window.Lenis({
        autoRaf: true,
        lerp: .12,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true
      });
    } else if (lenis) {
      lenis.destroy();
      lenis = undefined;
    }
  };
  const focusTarget = target => {
    const added = !target.hasAttribute('tabindex');
    if (added) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (added) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  };
  // Keep native destinations and URL history while easing in-page anchor movement.
  on(document, 'click', event => {
    if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
    if (!target) return;
    event.preventDefault();
    if (location.hash !== url.hash) history.pushState(null, '', url.hash);
    lenis.resize();
    lenis.scrollTo(target, {
      duration: .9,
      easing: value => 1 - (1 - value) ** 4,
      immediate: link.classList.contains('skip-link'),
      onComplete: () => focusTarget(target)
    });
  });
  // Smooth repeated keyboard input, while forms, disclosures and nested scrollers stay native.
  on(document, 'keydown', event => {
    if (!lenis || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (target.closest?.('input,textarea,select,button,summary,[contenteditable]:not([contenteditable="false"]),[role="slider"],[role="listbox"],[role="menu"],[role="tree"],video,audio')) return;
    const step = innerHeight * .82;
    const delta = { ArrowDown: 80, ArrowUp: -80, PageDown: step, PageUp: -step, ' ': event.shiftKey ? -step : step }[event.key];
    if (delta === undefined && !['Home', 'End'].includes(event.key)) return;
    if (event.shiftKey && event.key !== ' ') return;
    for (let node = target; node instanceof HTMLElement && node !== document.body; node = node.parentElement) {
      if (node.scrollHeight > node.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(node).overflowY)) return;
    }
    if (lenis.limit <= 0) return;
    event.preventDefault();
    const destination = event.key === 'Home' ? 0 : event.key === 'End' ? lenis.limit : lenis.targetScroll + delta;
    lenis.scrollTo(destination, { lerp: .16 });
  });
  on(preference, 'change', sync);
  on(window, 'portfolio:motion-pause', sync);
  on(document, 'toggle', () => requestAnimationFrame(() => lenis?.resize()), { capture: true, passive: true });
  on(window, 'pageshow', () => { sync(); lenis?.resize(); lenis?.scrollTo(scrollY, { immediate: true }); });
  const restoredPosition = () => requestAnimationFrame(() => lenis?.scrollTo(scrollY, { immediate: true }));
  on(window, 'popstate', restoredPosition);
  on(window, 'hashchange', restoredPosition);
  on(document, 'visibilitychange', () => {
    lenis?.scrollTo(scrollY, { immediate: true });
    if (!document.hidden) lenis?.resize();
  });
  on(window, 'beforeprint', () => { lenis?.destroy(); lenis = undefined; });
  on(window, 'afterprint', sync);
  const destroy = () => { lifecycle.abort(); lenis?.destroy(); lenis = undefined; };
  on(window, 'pagehide', event => { if (!event.persisted) destroy(); });
  window.portfolioScroll = { get lenis() { return lenis; }, sync, destroy };
  sync();
})();
