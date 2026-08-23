/**
 * lazyload.js — Best Treks Nepal Image Lazy Loading
 * Version: 1.0 | August 2026
 *
 * Strategy:
 *  1. Native loading="lazy" is set on all below-the-fold images in HTML.
 *  2. This module provides an IntersectionObserver fallback for browsers
 *     that do not support native lazy loading, and handles data-src images.
 *
 * Usage in HTML:
 *  <img src="placeholder.webp" data-src="real-image.webp"
 *       alt="..." loading="lazy" class="lazy">
 */

'use strict';

import { $$, addClass, removeClass } from './utils.js';

/**
 * Load an image from data-src
 * @param {Element} img
 */
const loadImage = (img) => {
  const src    = img.getAttribute('data-src');
  const srcset = img.getAttribute('data-srcset');

  if (src) {
    img.src = src;
    img.removeAttribute('data-src');
  }

  if (srcset) {
    img.srcset = srcset;
    img.removeAttribute('data-srcset');
  }

  img.addEventListener('load', () => {
    addClass(img, 'is-loaded');
    removeClass(img, 'lazy');
  }, { once: true });

  img.addEventListener('error', () => {
    addClass(img, 'is-error');
  }, { once: true });
};

/**
 * Initialize lazy loading
 */
export const initLazyLoad = () => {
  const lazyImages = $$('img.lazy[data-src], img[data-src]');
  if (lazyImages.length === 0) return;

  // Use native lazy loading if supported
  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(img => {
      if (!img.getAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      loadImage(img);
    });
    return;
  }

  // Fallback: IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          loadImage(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '200px 0px' } // Start loading 200px before visible
    );

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Ultimate fallback — load all immediately
    lazyImages.forEach(loadImage);
  }
};
