/**
 * slider.js — Best Treks Nepal Image Slider Module
 * Version: 1.0 | August 2026
 *
 * Responsibilities:
 *  - Hero image slider (auto-play, pause on hover, prev/next, dot indicators)
 *  - Testimonial card slider (responsive items-per-view)
 *  - Keyboard navigation (Arrow keys)
 *  - Touch/swipe support
 *  - Respects prefers-reduced-motion
 */

'use strict';

import { $, $$, addClass, removeClass, hasClass, prefersReducedMotion } from './utils.js';

/**
 * Create a hero slider instance
 * @param {Element} container — .hero element
 * @returns {{ destroy: Function }}
 */
const createHeroSlider = (container) => {
  const slides    = $$('.hero__slide', container);
  const dots      = $$('.hero__dot',   container);
  const prevBtn   = $('.hero__arrow--prev', container);
  const nextBtn   = $('.hero__arrow--next', container);

  if (slides.length < 2) return { destroy: () => {} };

  let current      = 0;
  let timer        = null;
  const INTERVAL   = 5000;
  const reduced    = prefersReducedMotion();

  // Set initial ARIA
  slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', i !== 0 ? 'true' : 'false');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Slide ${i + 1} of ${slides.length}`);
  });

  const goTo = (index) => {
    // Clamp index
    const next = (index + slides.length) % slides.length;

    // Remove active from current
    removeClass(slides[current], 'is-active');
    slides[current].setAttribute('aria-hidden', 'true');
    if (dots[current]) removeClass(dots[current], 'is-active');

    // Add active to next
    current = next;
    addClass(slides[current], 'is-active');
    slides[current].setAttribute('aria-hidden', 'false');
    if (dots[current]) addClass(dots[current], 'is-active');

    // Update dot aria
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAutoplay = () => {
    if (reduced) return;
    stopAutoplay();
    timer = setInterval(next, INTERVAL);
  };

  const stopAutoplay = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  // Init first slide
  addClass(slides[0], 'is-active');
  if (dots[0]) addClass(dots[0], 'is-active');

  // Controls
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

  // Dot navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAutoplay(); });
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
  });

  // Keyboard navigation on container
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { prev(); startAutoplay(); }
    if (e.key === 'ArrowRight') { next(); startAutoplay(); }
  });

  // Pause on hover
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX   = 0;
  const SWIPE_THRESHOLD = 50;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      diff > 0 ? next() : prev();
      startAutoplay();
    }
  }, { passive: true });

  // Start autoplay
  startAutoplay();

  return {
    destroy: () => {
      stopAutoplay();
    }
  };
};

/**
 * Create a generic card slider (testimonials, treks)
 * @param {Element} container — slider root element
 * @param {Object} options
 * @returns {{ destroy: Function }}
 */
const createCardSlider = (container, options = {}) => {
  const track   = $('.testimonials-track, [data-track]', container);
  const items   = $$('[data-slide]', container);
  const prevBtn = $('.testimonials-arrow:first-of-type, [data-prev]', container);
  const nextBtn = $('.testimonials-arrow:last-of-type,  [data-next]', container);
  const dotsContainer = $('.testimonials-dots', container);

  if (!track || items.length === 0) return { destroy: () => {} };

  const getItemsPerView = () => {
    if (window.innerWidth >= 992) return options.lg || 3;
    if (window.innerWidth >= 768) return options.md || 2;
    return options.sm || 1;
  };

  let current = 0;
  let perView = getItemsPerView();

  const totalPages = () => Math.max(0, items.length - perView);

  // Build dots
  const buildDots = () => {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const pages = totalPages() + 1;

    for (let i = 0; i <= totalPages(); i++) {
      const dot = document.createElement('button');
      dot.className = `testimonials-dot${i === 0 ? ' is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to page ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  };

  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = $$('.testimonials-dot', dotsContainer);
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
  };

  const updateButtons = () => {
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current >= totalPages();
  };

  const goTo = (index) => {
    current = Math.max(0, Math.min(index, totalPages()));

    // Calculate item width including gap
    const itemWidth = items[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 32;
    const offset = current * (itemWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
    updateButtons();
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  // Touch support
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }, { passive: true });

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Recalculate on resize
  const handleResize = () => {
    const newPerView = getItemsPerView();
    if (newPerView !== perView) {
      perView  = newPerView;
      current  = 0;
      buildDots();
      goTo(0);
    }
  };

  window.addEventListener('resize', handleResize, { passive: true });

  // Init
  buildDots();
  updateButtons();

  return {
    destroy: () => {
      window.removeEventListener('resize', handleResize);
    }
  };
};

/**
 * Initialize all sliders on the page
 */
export const initSliders = () => {
  // Hero slider
  const heroEl = $('.hero');
  if (heroEl && $$('.hero__slide', heroEl).length > 0) {
    createHeroSlider(heroEl);
  }

  // Testimonial slider
  const testimonialEl = $('.testimonials-slider');
  if (testimonialEl) {
    createCardSlider(testimonialEl, { sm: 1, md: 2, lg: 3 });
  }

  // Testimonial Pill Tabs Toggle
  const tabBtns = $$('.testimonial-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });

  // Platform Subtabs Toggle
  const platformBtns = $$('.platform-subtab');
  platformBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      platformBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
    });
  });
};
