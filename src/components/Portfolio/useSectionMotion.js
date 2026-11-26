import { useEffect } from 'react';

const targetSelector = '[data-chapter], [data-motion-target]';
const properties = ['--section-enter', '--section-progress', '--section-exit'];

function clamp(value) {
  return Math.min(1, Math.max(0, value));
}

export default function useSectionMotion(ref, enabled = true) {
  useEffect(() => {
    const root = ref.current;
    if (!enabled || !root || !window.matchMedia) return;

    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const targets = new Map();
    let active = false;
    let frame = null;
    let needsTargets = true;
    let needsMeasure = true;
    let viewport = 1;

    function clear(node) {
      properties.forEach((property) => node.style.removeProperty(property));
    }

    function refreshTargets() {
      const next = new Set(root.querySelectorAll(targetSelector));
      for (const node of targets.keys()) {
        if (next.has(node)) continue;
        clear(node);
        resizeObserver?.unobserve(node);
        targets.delete(node);
      }

      for (const node of next) {
        if (targets.has(node)) continue;
        targets.set(node, { values: [] });
        resizeObserver?.observe(node);
      }

      needsTargets = false;
    }

    function measure(scroll) {
      viewport = Math.max(window.innerHeight, 1);
      for (const [node, target] of targets) {
        const bounds = node.getBoundingClientRect();
        const sticky = node.hasAttribute('data-sticky-scene');
        const stage = sticky && node.querySelector('[data-sticky-stage]');
        const pinnedHeight = stage ? stage.getBoundingClientRect().height : viewport;
        const pinSpan = sticky ? bounds.height - pinnedHeight : 0;
        target.top = bounds.top + scroll;
        target.bottom = bounds.bottom + scroll;
        target.pinSpan = Math.max(0, pinSpan);
      }
      needsMeasure = false;
    }

    function draw() {
      frame = null;
      if (!active || document.hidden) return;

      const scroll = window.scrollY;
      if (needsTargets) refreshTargets();
      if (needsMeasure) measure(scroll);

      for (const [node, target] of targets) {
        const { top, bottom, pinSpan } = target;
        const lead = scroll + viewport - top;
        const trail = bottom - scroll;
        const values = [
          clamp(lead / (viewport * .78)),
          clamp(pinSpan ? (scroll - top) / pinSpan : lead / (bottom - top + viewport)),
          clamp(1 - trail / (viewport * .35)),
        ];

        values.forEach((value, index) => {
          const next = value.toFixed(4);
          if (target.values[index] === next) return;
          node.style.setProperty(properties[index], next);
          target.values[index] = next;
        });
      }
    }

    function schedule() {
      if (active && frame === null) frame = window.requestAnimationFrame(draw);
    }

    function invalidateLayout() {
      needsMeasure = true;
      schedule();
    }

    const resizeObserver = typeof ResizeObserver === 'function'
      ? new ResizeObserver(invalidateLayout)
      : null;
    const mutationObserver = typeof MutationObserver === 'function'
      ? new MutationObserver(() => {
        needsTargets = true;
        invalidateLayout();
      })
      : null;

    function disable() {
      active = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', invalidateLayout);
      document.removeEventListener('visibilitychange', invalidateLayout);
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      for (const node of targets.keys()) clear(node);
      targets.clear();
      root.removeAttribute('data-section-motion');
    }

    function updatePreference() {
      if (!motion.matches) {
        disable();
        return;
      }
      if (active) return;

      active = true;
      root.setAttribute('data-section-motion', '');
      needsTargets = true;
      needsMeasure = true;
      resizeObserver?.observe(root);
      mutationObserver?.observe(root, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['data-chapter', 'data-motion-target', 'data-sticky-scene', 'data-sticky-stage'],
      });
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', invalidateLayout);
      document.addEventListener('visibilitychange', invalidateLayout);
      schedule();
    }

    motion.addEventListener?.('change', updatePreference);
    updatePreference();

    return () => {
      motion.removeEventListener?.('change', updatePreference);
      disable();
    };
  }, [ref, enabled]);
}
