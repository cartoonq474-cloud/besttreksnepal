/**
 * counter.js — Best Treks Nepal Animated Statistics Counter
 * Version: 1.0 | August 2026
 *
 * Uses IntersectionObserver to trigger count-up animation
 * when the stats section enters the viewport.
 * Respects prefers-reduced-motion.
 */

'use strict';

import { $$, prefersReducedMotion } from './utils.js';

/**
 * Animate a number from 0 to target
 * @param {Element} el — the element whose text content will be updated
 * @param {number} target — final number
 * @param {number} duration — animation duration in ms
 * @param {string} suffix — suffix appended to number (e.g. '+', '%', 'K')
 */
const animateCounter = (el, target, duration, suffix = '') => {
  if (prefersReducedMotion()) {
    el.textContent = target.toLocaleString('en-US') + suffix;
    return;
  }

  const start     = performance.now();
  const startVal  = 0;

  const step = (timestamp) => {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);

    el.textContent = current.toLocaleString('en-US') + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString('en-US') + suffix;
    }
  };

  requestAnimationFrame(step);
};

/**
 * Initialize stat counters using IntersectionObserver
 * Expected HTML: <span class="stat-item__number" data-target="250" data-suffix="+">0</span>
 */
export const initCounters = () => {
  const counters = $$('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = parseInt(el.getAttribute('data-duration') || '2000', 10);

        animateCounter(el, target, duration, suffix);
        obs.unobserve(el); // Only animate once
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach(el => observer.observe(el));
};
