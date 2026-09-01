/**
 * main.js — Best Treks Nepal Application Entry Point
 * Version: 1.0 | August 2026
 *
 * This file imports and initializes all feature modules.
 * Each feature is initialized only if its required DOM elements are present.
 * All initialization happens after DOMContentLoaded.
 */

'use strict';

import { initNavbar }    from './navbar.js';
import { initSliders }   from './slider.js';
import { initCounters }  from './counter.js';
import { initAnimations } from './animation.js';
import { initFaq }       from './faq.js';
import { initGallery }   from './gallery.js';
import { initSearch }    from './search.js';
import { initBooking }   from './booking.js';
import { initLazyLoad }  from './lazyload.js';
import { initFilter }    from './filter.js';
import { initDestinations } from './destinations.js';
import { initCookieConsent } from './cookie.js';
import { initWhatsAppWidget } from './whatsapp.js';
import { initWebMCP } from './webmcp.js';
import { $, addClass, removeClass, throttle } from './utils.js';

/* --------------------------------------------------------------------------
   Back to Top Button
   -------------------------------------------------------------------------- */
const initBackToTop = () => {
  const btn = $('.back-to-top');
  if (!btn) return;

  const toggleVisibility = throttle(() => {
    if (window.scrollY > 500) {
      addClass(btn, 'is-visible');
    } else {
      removeClass(btn, 'is-visible');
    }
  }, 150);

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Keyboard: Enter or Space
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
};

/* --------------------------------------------------------------------------
   Smooth Scroll for anchor links
   -------------------------------------------------------------------------- */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href   = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height') || '72',
        10
      );

      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.getBoundingClientRect().height : navHeight;
      const subnav = link.closest('.trek-subnav-sticky, .region-subnav-sticky');
      const subnavHeight = subnav ? subnav.getBoundingClientRect().height : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - subnavHeight - 16;
      e.stopImmediatePropagation();
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};

/* --------------------------------------------------------------------------
   Page Loader
   -------------------------------------------------------------------------- */
const initPageLoader = () => {
  const loader = $('.page-loader');
  if (loader) loader.remove();
};

/* --------------------------------------------------------------------------
   Newsletter Form (standalone — not a booking form)
   -------------------------------------------------------------------------- */
const initNewsletter = () => {
  const forms = document.querySelectorAll('[data-newsletter]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input  = form.querySelector('input[type="email"]');
      const btn    = form.querySelector('[type="submit"]');
      const msg    = form.querySelector('[data-newsletter-msg]');

      if (!input) return;

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        if (msg) {
          msg.textContent = 'Please enter a valid email address.';
          msg.className   = 'newsletter__msg newsletter__msg--error';
          msg.style.display = 'block';
        }
        input.focus();
        return;
      }

      // Loading state
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Subscribing…';
      }

      // Send direct notification to kotlyan204@gmail.com
      fetch('https://formsubmit.co/ajax/kotlyan204@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `📬 New Blog/Newsletter Subscriber: ${email}`,
          _template: 'table',
          _captcha: 'false',
          'Subscriber Email': email,
          'Subscribed From URL': window.location.href,
          'Timestamp': new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }) + ' (NPT)'
        })
      }).catch(err => console.warn(err));

      setTimeout(() => {
        input.value = '';
        if (btn) {
          btn.disabled    = false;
          btn.textContent = 'Subscribe';
        }
        if (msg) {
          msg.textContent = '✓ Thank you for subscribing! Check your inbox for our latest updates.';
          msg.className   = 'newsletter__msg newsletter__msg--success';
          msg.style.display = 'block';
        }
      }, 800);
    });
  });
};

/* --------------------------------------------------------------------------
   External links — open in new tab with noopener
   -------------------------------------------------------------------------- */
const initExternalLinks = () => {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname || link.hostname === window.location.hostname) return;
    link.setAttribute('target', '_blank');
    link.setAttribute('rel',    'noopener noreferrer');
    // Announce to screen readers
    if (!link.getAttribute('aria-label')) {
      const existingText = link.textContent.trim();
      link.setAttribute('aria-label', `${existingText} (opens in new tab)`);
    }
  });
};

/* --------------------------------------------------------------------------
   Accessibility: Print current year in copyright
   -------------------------------------------------------------------------- */
const initCopyrightYear = () => {
  const yearEls = document.querySelectorAll('[data-year]');
  const year    = new Date().getFullYear();
  yearEls.forEach(el => { el.textContent = year; });
};

/* --------------------------------------------------------------------------
   Application Bootstrap
   -------------------------------------------------------------------------- */
const init = () => {
  initPageLoader();
  initNavbar();
  initSliders();
  initCounters();
  initAnimations();
  initFaq();
  initGallery();
  initSearch();
  initBooking();
  initLazyLoad();
  initFilter();
  initDestinations();
  initBackToTop();
  initSmoothScroll();
  initNewsletter();
  initExternalLinks();
  initCopyrightYear();
  initCookieConsent();
  initWhatsAppWidget();
  initWebMCP();
};

// Wait for DOM to be ready before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init(); // DOM already ready
}
