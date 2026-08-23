/**
 * animation.js — Best Treks Nepal Scroll Reveal Animations
 * Version: 1.0 | August 2026
 *
 * Uses IntersectionObserver to trigger CSS class-based animations
 * on elements with class .reveal as they enter the viewport.
 * Respects prefers-reduced-motion.
 */

'use strict';

import { $$, addClass, prefersReducedMotion } from './utils.js';

/**
 * Initialize scroll-reveal animations.
 *
 * Elements must have class `reveal` (base class, set to opacity:0 in CSS).
 * Optional modifier classes control direction:
 *   .reveal--left   — slide from left
 *   .reveal--right  — slide from right
 *   .reveal--scale  — scale in
 *
 * Staggered groups: wrap reveal elements in .reveal-group
 * for automatic delay on nth-child.
 *
 * data-delay attribute overrides the automatic delay (ms).
 */
export const initAnimations = () => {
  const elements = $$('.reveal');
  if (elements.length === 0) return;

  // If reduced motion is preferred, skip animation — make all immediately visible
  if (prefersReducedMotion()) {
    elements.forEach(el => addClass(el, 'is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el    = entry.target;
        const delay = el.getAttribute('data-delay');

        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }

        // Trigger CSS transition
        addClass(el, 'is-visible');

        // Stop observing once revealed
        observer.unobserve(el);
      });
    },
    {
      threshold:   0.12,
      rootMargin: '0px 0px -40px 0px' // Trigger slightly before fully in view
    }
  );

  elements.forEach(el => observer.observe(el));
};
