/**
 * navbar.js — Best Treks Nepal Navigation Module
 * Version: 1.0 | August 2026
 *
 * Responsibilities:
 *  - Sticky navbar with scroll-triggered shadow
 *  - Mobile hamburger toggle (slide-in panel)
 *  - Mega menu + dropdown management
 *  - Active link detection based on current URL
 *  - Search modal open/close
 *  - Close menu on outside click / ESC key
 *  - Focus trapping in mobile menu
 */

'use strict';

import {
  $, $$, on, addClass, removeClass, hasClass,
  throttle, lockScroll, unlockScroll, trapFocus
} from './utils.js';

/**
 * Initialize sticky navbar scroll behavior + smart hide/reveal
 */
const initStickyNavbar = () => {
  const navbar  = $('.navbar');
  const siteHeader = $('.site-header');
  const mobileMenu = $('.mobile-menu');
  const searchModal = $('.search-modal');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  const handleScroll = throttle(() => {
    const currentY = window.scrollY;
    const diff = currentY - lastScrollY;

    // Scrolled class — glassmorphism effect on navbar
    if (currentY > 40) {
      addClass(navbar, 'is-scrolled');
    } else {
      removeClass(navbar, 'is-scrolled');
    }

    // Do not hide navbar if mobile menu or search modal is open
    const isOverlayOpen = (mobileMenu && hasClass(mobileMenu, 'is-open')) ||
                          (searchModal && hasClass(searchModal, 'is-open'));

    if (siteHeader && !isOverlayOpen) {
      // 1. Always reveal at the top of the page
      if (currentY <= 100) {
        removeClass(siteHeader, 'is-hidden');
      }
      // 2. Hide on fast scroll down past threshold
      else if (diff > 8 && currentY > 150) {
        addClass(siteHeader, 'is-hidden');
      }
      // 3. Reveal on scroll up
      else if (diff < -6) {
        removeClass(siteHeader, 'is-hidden');
      }
    }

    lastScrollY = currentY;
  }, 60);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run once on init
};

/**
 * Animate a scroll-progress bar at the top of the page
 */
const initScrollProgress = () => {
  const bar = $('#navbar-progress');
  if (!bar) return;

  const update = throttle(() => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = docH > 0 ? Math.min((window.scrollY / docH) * 100, 100) : 0;
    bar.style.width = pct + '%';
  }, 40);

  window.addEventListener('scroll', update, { passive: true });
};

/**
 * Set active state on nav link matching current URL
 */
const initActiveNav = () => {
  const navLinks = $$('.navbar__nav-link, .mobile-menu__link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Match exact path or closest parent segment
    const linkPath = new URL(href, window.location.origin).pathname;

    if (
      linkPath === currentPath ||
      (linkPath !== '/' && currentPath.startsWith(linkPath))
    ) {
      addClass(link, 'is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
};

/**
 * Add ripple click micro-animation to nav links
 */
const initNavRipple = () => {
  const navLinks = $$('.navbar__nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'nav-ripple';
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
      `;
      link.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
};

/**
 * Initialize mobile menu (hamburger → slide panel → overlay)
 */
const initMobileMenu = () => {
  const hamburger = $('.navbar__hamburger');
  const menu = $('.mobile-menu');
  const overlay = $('.mobile-menu-overlay');
  const closeBtn = $('.mobile-menu__close');

  if (!hamburger || !menu) return;

  const openMenu = () => {
    addClass(hamburger, 'is-open');
    addClass(menu, 'is-open');
    if (overlay) addClass(overlay, 'is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    lockScroll();

    // Move focus into menu
    setTimeout(() => {
      const firstFocusable = menu.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    }, 350);
  };

  const closeMenu = () => {
    removeClass(hamburger, 'is-open');
    removeClass(menu, 'is-open');
    if (overlay) removeClass(overlay, 'is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    unlockScroll();
    hamburger.focus();
  };

  on(hamburger, 'click', openMenu);
  if (closeBtn) on(closeBtn, 'click', closeMenu);
  if (overlay) on(overlay, 'click', closeMenu);

  // ESC key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hasClass(menu, 'is-open')) closeMenu();
  });

  // Focus trap inside mobile menu
  menu.addEventListener('keydown', (e) => {
    if (hasClass(menu, 'is-open')) trapFocus(menu, e);
  });

  // Mobile accordion sub-menus
  const groupTriggers = $$('.mobile-menu__group-trigger', menu);
  groupTriggers.forEach(trigger => {
    on(trigger, 'click', () => {
      const group = trigger.nextElementSibling;
      if (!group) return;
      const isOpen = hasClass(trigger, 'is-open');
      toggleClass(trigger, 'is-open');
      group.style.maxHeight = isOpen ? '0' : `${group.scrollHeight}px`;
    });
  });
};

/**
 * Mega menu & dropdown hover/click management (desktop)
 */
const initDropdowns = () => {
  const navItems = $$('.navbar__nav-item');

  navItems.forEach(item => {
    const hasMega = item.querySelector('.mega-menu');
    const hasDropdown = item.querySelector('.dropdown');
    if (!hasMega && !hasDropdown) return;

    const link = item.querySelector('.navbar__nav-link');
    if (link) {
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');
    }

    const open = () => {
      addClass(item, 'is-open');
      if (link) link.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      removeClass(item, 'is-open');
      if (link) link.setAttribute('aria-expanded', 'false');
    };

    // Hover (desktop)
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);

    // Click toggle (touch / keyboard)
    if (link) {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && href !== 'javascript:void(0)') {
          // Valid URL present — allow standard page navigation
          return;
        }
        if (hasMega || hasDropdown) {
          e.preventDefault();
          hasClass(item, 'is-open') ? close() : open();
        }
      });
    }
  });

  // Close all dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar__nav-item')) {
      navItems.forEach(item => {
        removeClass(item, 'is-open');
        const link = item.querySelector('.navbar__nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // ESC closes open dropdowns
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navItems.forEach(item => removeClass(item, 'is-open'));
    }
  });
};

/**
 * Search modal open/close
 */
const initSearchModal = () => {
  const openBtns = $$('[data-search-open]');
  const closeBtn = $('[data-search-close]');
  const modal = $('.search-modal');
  const input = $('.search-modal__input');

  if (!modal) return;

  const openModal = () => {
    addClass(modal, 'is-open');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll();
    setTimeout(() => { if (input) input.focus(); }, 150);
  };

  const closeModal = () => {
    removeClass(modal, 'is-open');
    modal.setAttribute('aria-hidden', 'true');
    unlockScroll();
  };

  openBtns.forEach(btn => on(btn, 'click', openModal));
  if (closeBtn) on(closeBtn, 'click', closeModal);

  // Click backdrop closes modal
  on(modal, 'click', (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hasClass(modal, 'is-open')) closeModal();
  });
};

/**
 * Initialize all navbar features
 */
export const initNavbar = () => {
  initStickyNavbar();
  initScrollProgress();
  initActiveNav();
  initNavRipple();
  initMobileMenu();
  initDropdowns();
  initSearchModal();
};
