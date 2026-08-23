/**
 * gallery.js — Best Treks Nepal Gallery & Lightbox
 * Version: 1.0 | August 2026
 *
 * Responsibilities:
 *  - Gallery category filter (show/hide items by data-category)
 *  - Lightbox open/close with keyboard navigation (ESC, Arrow keys)
 *  - Image zoom on click
 *  - Focus trap inside lightbox
 *  - Lazy loading integration
 */

'use strict';

import {
  $, $$, addClass, removeClass, hasClass,
  lockScroll, unlockScroll, trapFocus
} from './utils.js';

/* ------------------------------------------------------------------
   Lightbox
   ------------------------------------------------------------------ */

let lightboxImages = []; // All gallery images
let currentIndex   = 0;

/**
 * Build the lightbox DOM (single instance, reused for all images)
 * @returns {Object} { el, imgEl, captionEl, open, close, prev, next }
 */
const buildLightbox = () => {
  const existing = $('.lightbox');
  if (existing) return existing;

  const lightbox = document.createElement('div');
  lightbox.className  = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image viewer');
  lightbox.setAttribute('aria-hidden', 'true');

  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Close image viewer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6"  y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <button class="lightbox__arrow lightbox__arrow--prev" aria-label="Previous image">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>

    <div class="lightbox__content">
      <img class="lightbox__image" src="" alt="" loading="eager">
      <p class="lightbox__caption"></p>
    </div>

    <button class="lightbox__arrow lightbox__arrow--next" aria-label="Next image">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  `;

  document.body.appendChild(lightbox);
  return lightbox;
};

/**
 * Open lightbox at given index
 * @param {number} index
 */
const openLightbox = (index) => {
  const lightbox = buildLightbox();
  const imgEl    = $('.lightbox__image',   lightbox);
  const captionEl = $('.lightbox__caption', lightbox);

  currentIndex = index;
  const item   = lightboxImages[currentIndex];

  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.alt || '';
  }
  if (captionEl) captionEl.textContent = item.caption || item.alt || '';

  addClass(lightbox, 'is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  lockScroll();

  // Focus close button
  setTimeout(() => {
    $('.lightbox__close', lightbox)?.focus();
  }, 150);

  // Update arrows visibility
  updateLightboxArrows(lightbox);
};

/**
 * Close lightbox
 */
const closeLightbox = () => {
  const lightbox = $('.lightbox');
  if (!lightbox) return;

  removeClass(lightbox, 'is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  unlockScroll();

  // Restore focus to the trigger
  if (lightboxImages[currentIndex]?.trigger) {
    lightboxImages[currentIndex].trigger.focus();
  }
};

/**
 * Navigate to adjacent image
 * @param {number} direction — +1 or -1
 */
const navigateLightbox = (direction) => {
  const next = currentIndex + direction;
  if (next < 0 || next >= lightboxImages.length) return;
  openLightbox(next);
};

/**
 * Update prev/next arrow disabled states
 * @param {Element} lightbox
 */
const updateLightboxArrows = (lightbox) => {
  const prevBtn = $('.lightbox__arrow--prev', lightbox);
  const nextBtn = $('.lightbox__arrow--next', lightbox);
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === lightboxImages.length - 1;
};

/**
 * Attach lightbox event listeners (runs once)
 */
const attachLightboxEvents = () => {
  const lightbox = buildLightbox();

  // Close button
  const closeBtn = $('.lightbox__close', lightbox);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  // Click backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Arrows
  const prevBtn = $('.lightbox__arrow--prev', lightbox);
  const nextBtn = $('.lightbox__arrow--next', lightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(+1));

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (!hasClass(lightbox, 'is-open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(+1);
    trapFocus(lightbox, e);
  });
};

/* ------------------------------------------------------------------
   Gallery Filter
   ------------------------------------------------------------------ */

/**
 * Initialize category filter buttons
 * @param {Element} container — filter root
 */
const initFilter = (container) => {
  const filterBtns = $$('[data-filter]', container);
  const items      = $$('[data-category]', container);

  if (filterBtns.length === 0) return;

  const setFilter = (category) => {
    filterBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-filter') === category;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    items.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      const show    = category === 'all' || itemCat === category;

      item.style.opacity   = show ? '1' : '0';
      item.style.transform = show ? 'scale(1)' : 'scale(0.9)';

      setTimeout(() => {
        item.style.display = show ? '' : 'none';
      }, show ? 0 : 280);
    });
  };

  filterBtns.forEach(btn => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-pressed', 'false');

    btn.addEventListener('click', () => {
      setFilter(btn.getAttribute('data-filter'));
    });
  });

  // Set initial "all" active
  const allBtn = container.querySelector('[data-filter="all"]');
  if (allBtn) allBtn.click();
};

/* ------------------------------------------------------------------
   Init
   ------------------------------------------------------------------ */

/**
 * Initialize gallery on the page
 */
export const initGallery = () => {
  const galleryContainers = $$('[data-gallery]');

  galleryContainers.forEach(container => {
    // Collect all gallery items
    const items = $$('.gallery-item', container);

    lightboxImages = Array.from(items).map((item, i) => {
      const img = item.querySelector('img');
      return {
        src:     img?.src || img?.getAttribute('data-src') || '',
        alt:     img?.alt || '',
        caption: item.getAttribute('data-caption') || '',
        trigger: item,
        index:   i
      };
    });

    // Attach click handlers
    items.forEach((item, i) => {
      item.setAttribute('role',         'button');
      item.setAttribute('tabindex',     '0');
      item.setAttribute('aria-label',   `View image ${i + 1} of ${items.length}`);

      item.addEventListener('click',   () => openLightbox(i));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(i);
        }
      });
    });

    // Category filter
    initFilter(container);
  });

  // Build and wire lightbox once
  attachLightboxEvents();
};
