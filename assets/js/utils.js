/**
 * utils.js — Best Treks Nepal Shared Utilities
 * Version: 1.0 | August 2026
 *
 * Pure, reusable helper functions used across all JS modules.
 * No DOM side effects — only exports utility functions.
 */

'use strict';

/**
 * Debounce — delay function execution until after wait milliseconds
 * Used for search input handlers.
 * @param {Function} fn
 * @param {number} wait
 * @returns {Function}
 */
export const debounce = (fn, wait = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
};

/**
 * Throttle — limit function execution to once per limit milliseconds
 * Used for scroll event handlers.
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
export const throttle = (fn, limit = 100) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
};

/**
 * Select a single DOM element (shorthand)
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {Element|null}
 */
export const $ = (selector, context = document) =>
  context.querySelector(selector);

/**
 * Select all matching DOM elements
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {NodeList}
 */
export const $$ = (selector, context = document) =>
  context.querySelectorAll(selector);

/**
 * Add event listener with optional delegation
 * @param {Element} element
 * @param {string} event
 * @param {string|Function} selectorOrHandler
 * @param {Function} [handler]
 */
export const on = (element, event, selectorOrHandler, handler) => {
  if (!element) return;

  if (typeof selectorOrHandler === 'function') {
    element.addEventListener(event, selectorOrHandler);
  } else {
    element.addEventListener(event, (e) => {
      const target = e.target.closest(selectorOrHandler);
      if (target && element.contains(target)) {
        handler.call(target, e);
      }
    });
  }
};

/**
 * Toggle a CSS class on an element
 * @param {Element} el
 * @param {string} className
 */
export const toggleClass = (el, className) => {
  if (!el) return;
  el.classList.toggle(className);
};

/**
 * Add a CSS class
 * @param {Element} el
 * @param {...string} classes
 */
export const addClass = (el, ...classes) => {
  if (!el) return;
  el.classList.add(...classes);
};

/**
 * Remove a CSS class
 * @param {Element} el
 * @param {...string} classes
 */
export const removeClass = (el, ...classes) => {
  if (!el) return;
  el.classList.remove(...classes);
};

/**
 * Check if element has a CSS class
 * @param {Element} el
 * @param {string} className
 * @returns {boolean}
 */
export const hasClass = (el, className) => {
  if (!el) return false;
  return el.classList.contains(className);
};

/**
 * Get element's offset from document top
 * @param {Element} el
 * @returns {number}
 */
export const getOffsetTop = (el) => {
  if (!el) return 0;
  return el.getBoundingClientRect().top + window.scrollY;
};

/**
 * Smooth scroll to an element or Y position
 * @param {Element|number} target — element or y value
 * @param {number} [offset=80] — offset from top (for sticky navbar)
 */
export const scrollTo = (target, offset = 80) => {
  const y = typeof target === 'number'
    ? target
    : getOffsetTop(target) - offset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Trap focus within a container (for modals, menus)
 * @param {Element} container
 * @param {KeyboardEvent} e
 */
export const trapFocus = (container, e) => {
  const focusable = container.querySelectorAll(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.key !== 'Tab') return;

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
};

/**
 * Lock body scroll (for modals/menus)
 */
export const lockScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
};

/**
 * Unlock body scroll
 */
export const unlockScroll = () => {
  document.body.style.overflow   = '';
  document.body.style.paddingRight = '';
};

/**
 * Format number with commas
 * @param {number} n
 * @returns {string}
 */
export const formatNumber = (n) =>
  n.toLocaleString('en-US');

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/**
 * Validate phone — allows +, digits, spaces, hyphens, parentheses
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) =>
  /^[+\d][\d\s\-()]{6,19}$/.test(phone.trim());

/**
 * Sanitize a string for safe display (basic XSS prevention)
 * @param {string} str
 * @returns {string}
 */
export const sanitize = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};
