/**
 * navbar.js — Best Treks Nepal Navigation Module
 * Version: 2.0 | August 2026
 *
 * Responsibilities:
 *  - Sticky navbar with scroll-triggered shadow
 *  - Mobile hamburger toggle (slide-in panel)
 *  - Mobile menu accordions (Destinations, Popular Treks)
 *  - Mega menu + dropdown management (desktop + touch devices)
 *  - Active link detection based on current URL
 *  - Search modal open/close
 *  - Close menu on outside click / ESC key / nav link click
 *  - Focus trapping in mobile menu & search modal
 *  - Lock/unlock background scrolling
 */

'use strict';

import {
  $, $$, on, addClass, removeClass, hasClass, toggleClass,
  throttle, lockScroll, unlockScroll, trapFocus
} from './utils.js';

/**
 * Initialize sticky navbar scroll behavior + smart shadow
 */
const initStickyNavbar = () => {
  const navbar = $('.navbar');
  if (!navbar) return;

  const handleScroll = throttle(() => {
    const currentY = window.scrollY;

    // Scrolled class — glassmorphism effect on navbar
    if (currentY > 30) {
      addClass(navbar, 'is-scrolled');
    } else {
      removeClass(navbar, 'is-scrolled');
    }
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
    const pct = docH > 0 ? Math.min((window.scrollY / docH) * 100, 100) : 0;
    bar.style.width = pct + '%';
  }, 40);

  window.addEventListener('scroll', update, { passive: true });
};

/**
 * Set active state on nav link matching current URL
 */
const initActiveNav = () => {
  const navLinks = $$('.navbar__nav-link, .mobile-menu__link, .mobile-menu__sub-link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    try {
      const linkPath = new URL(href, window.location.origin).pathname;

      if (
        linkPath === currentPath ||
        (linkPath !== '/' && currentPath === linkPath)
      ) {
        addClass(link, 'is-active');
        link.setAttribute('aria-current', 'page');
      }
    } catch {
      // Relative or anchor href
      if (href === currentPath) {
        addClass(link, 'is-active');
        link.setAttribute('aria-current', 'page');
      }
    }
  });
};

/**
 * Add the primary directory links to the mobile navigation if missing.
 */
const initMobileDirectoryLinks = () => {
  const menuNav = $('.mobile-menu__nav');
  if (!menuNav || menuNav.querySelector('[data-mobile-directory-links]')) return;

  const existingHrefs = Array.from(menuNav.querySelectorAll('a')).map(a => a.getAttribute('href'));
  const linksToAdd = [];

  if (!existingHrefs.includes('/destinations.html') && !existingHrefs.includes('/destinations/')) {
    linksToAdd.push({ href: '/destinations.html', label: 'Destinations' });
  }
  if (!existingHrefs.includes('/treks.html') && !existingHrefs.includes('/treks')) {
    linksToAdd.push({ href: '/treks.html', label: 'Trek Packages' });
  }

  if (linksToAdd.length === 0) return;

  // Insert after the Home link if present, or at the start
  const homeLink = Array.from(menuNav.querySelectorAll('.mobile-menu__link')).find(
    link => link.getAttribute('href') === '/' || link.textContent.trim().toLowerCase() === 'home'
  );

  linksToAdd.reverse().forEach(({ href, label }) => {
    const link = document.createElement('a');
    link.href = href;
    link.className = 'mobile-menu__link';
    link.textContent = label;
    link.dataset.mobileDirectoryLinks = 'true';
    if (homeLink && homeLink.nextSibling) {
      menuNav.insertBefore(link, homeLink.nextSibling);
    } else {
      menuNav.prepend(link);
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
        top:  ${e.clientY - rect.top - size / 2}px;
      `;
      link.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
};

/**
 * Initialize mobile menu accordions for grouped links (Destinations, Popular Treks)
 */
const initMobileAccordions = () => {
  const groupTitles = $$('.mobile-menu__group-title');

  groupTitles.forEach(title => {
    title.setAttribute('role', 'button');
    title.setAttribute('tabindex', '0');
    title.setAttribute('aria-expanded', 'true');

    // Collect subsequent sub-links belonging to this group
    const subLinks = [];
    let sibling = title.nextElementSibling;
    while (sibling && sibling.classList.contains('mobile-menu__sub-link')) {
      subLinks.push(sibling);
      sibling = sibling.nextElementSibling;
    }

    const toggleGroup = () => {
      const isExpanded = title.getAttribute('aria-expanded') === 'true';
      const nextState = !isExpanded;

      title.setAttribute('aria-expanded', String(nextState));
      toggleClass(title, 'is-collapsed', !nextState);

      subLinks.forEach(subLink => {
        toggleClass(subLink, 'is-hidden', !nextState);
      });
    };

    title.addEventListener('click', toggleGroup);
    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleGroup();
      }
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
    menu.removeAttribute('hidden');
    if (overlay) overlay.removeAttribute('hidden');
    requestAnimationFrame(() => {
      addClass(hamburger, 'is-open');
      addClass(menu, 'is-open');
      if (overlay) addClass(overlay, 'is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      menu.removeAttribute('inert');
      lockScroll();

      setTimeout(() => {
        const firstFocusable = menu.querySelector('a, button');
        if (firstFocusable) firstFocusable.focus();
      }, 150);
    });
  };

  const closeMenu = () => {
    removeClass(hamburger, 'is-open');
    removeClass(menu, 'is-open');
    if (overlay) removeClass(overlay, 'is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    unlockScroll();
    hamburger.focus();
    setTimeout(() => {
      if (!hasClass(menu, 'is-open')) {
        menu.setAttribute('hidden', '');
        if (overlay) overlay.setAttribute('hidden', '');
      }
    }, 350);
  };

  const toggleMenu = () => {
    hasClass(menu, 'is-open') ? closeMenu() : openMenu();
  };

  on(hamburger, 'click', toggleMenu);
  if (closeBtn) on(closeBtn, 'click', closeMenu);
  if (overlay) on(overlay, 'click', closeMenu);

  // Close menu when clicking any link inside the mobile menu
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // ESC key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hasClass(menu, 'is-open')) closeMenu();
  });

  // Focus trap inside mobile menu
  menu.addEventListener('keydown', (e) => {
    if (hasClass(menu, 'is-open')) trapFocus(menu, e);
  });

  // Close mobile menu if window is resized to desktop width (>= 992px)
  const mediaQuery = window.matchMedia('(min-width: 992px)');
  const handleResize = (e) => {
    if (e.matches && hasClass(menu, 'is-open')) {
      closeMenu();
    }
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleResize);
  } else {
    window.addEventListener('resize', throttle(() => {
      if (window.innerWidth >= 992 && hasClass(menu, 'is-open')) {
        closeMenu();
      }
    }, 100));
  }
};

/**
 * Mega menu & dropdown hover/click management (desktop + touch devices)
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
      // Close other open items
      navItems.forEach(otherItem => {
        if (otherItem !== item) {
          removeClass(otherItem, 'is-open');
          const otherLink = otherItem.querySelector('.navbar__nav-link');
          if (otherLink) otherLink.setAttribute('aria-expanded', 'false');
        }
      });

      addClass(item, 'is-open');
      if (link) link.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      removeClass(item, 'is-open');
      if (link) link.setAttribute('aria-expanded', 'false');
    };

    // Hover (desktop pointer)
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);

    // Click / Touch toggle
    if (link) {
      link.addEventListener('click', (e) => {
        const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        const isOpen = hasClass(item, 'is-open');

        // On touch screens: first tap opens the menu, second tap navigates
        if (isTouch && !isOpen) {
          e.preventDefault();
          open();
          return;
        }

        const href = link.getAttribute('href');
        if (href && href !== '#' && href !== 'javascript:void(0)') {
          // Standard URL navigation allowed
          return;
        }

        e.preventDefault();
        isOpen ? close() : open();
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
      navItems.forEach(item => {
        removeClass(item, 'is-open');
        const link = item.querySelector('.navbar__nav-link');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
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
  initMobileDirectoryLinks();
  initNavRipple();
  initMobileAccordions();
  initMobileMenu();
  initDropdowns();
  initSearchModal();
};
