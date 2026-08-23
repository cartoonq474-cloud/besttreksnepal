/**
 * faq.js — Best Treks Nepal FAQ Accordion & Search/Filter
 * Version: 1.1 | August 2026
 *
 * Responsibilities:
 *  - Accordion open/close with smooth CSS max-height transition
 *  - Single-open mode (closing others when one opens)
 *  - Category pill filter & real-time search
 *  - Full keyboard navigation (Enter/Space to toggle, Arrow keys to navigate)
 *  - Correct ARIA attributes (aria-expanded, aria-controls, role)
 */

'use strict';

import { $$, addClass, removeClass, hasClass } from './utils.js';

/**
 * Initialize a single FAQ list
 * @param {Element} list — .faq-list element
 * @param {boolean} allowMultiple — allow multiple items open simultaneously
 */
const initFaqList = (list, allowMultiple = false) => {
  const items = $$('.faq-item', list);
  if (items.length === 0) return;

  const closeItem = (item) => {
    const body    = item.querySelector('.faq-item__body');
    const trigger = item.querySelector('.faq-item__trigger');

    removeClass(item, 'is-open');
    if (item.hasAttribute('open')) item.removeAttribute('open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (body) body.style.maxHeight = '0px';
  };

  const openItem = (item) => {
    const body    = item.querySelector('.faq-item__body');
    const trigger = item.querySelector('.faq-item__trigger');

    // Close all others if not multiple mode
    if (!allowMultiple) {
      items.forEach(other => {
        if (other !== item) closeItem(other);
      });
    }

    addClass(item, 'is-open');
    item.setAttribute('open', '');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    // Set max-height to actual scrollHeight + padding buffer
    if (body) {
      const scrollH = body.scrollHeight || 400;
      body.style.maxHeight = `${scrollH + 60}px`;
    }
  };

  const toggleItem = (item) => {
    (hasClass(item, 'is-open') || item.hasAttribute('open')) ? closeItem(item) : openItem(item);
  };

  items.forEach((item, index) => {
    const trigger = item.querySelector('.faq-item__trigger');
    const body    = item.querySelector('.faq-item__body');

    if (!trigger || !body) return;

    // Set initial ARIA
    const answerId  = `faq-answer-${index}`;
    const triggerId = `faq-trigger-${index}`;

    trigger.setAttribute('id',             triggerId);
    trigger.setAttribute('aria-controls',  answerId);
    trigger.setAttribute('aria-expanded',  'false');

    body.setAttribute('id',              answerId);
    body.setAttribute('role',            'region');
    body.setAttribute('aria-labelledby', triggerId);
    body.style.maxHeight = '0px';

    // Click handler
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleItem(item);
    });

    // Keyboard — Enter/Space
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(item);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[index + 1]?.querySelector('.faq-item__trigger')?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[index - 1]?.querySelector('.faq-item__trigger')?.focus();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.querySelector('.faq-item__trigger')?.focus();
      }
      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.querySelector('.faq-item__trigger')?.focus();
      }
    });
  });
};

/**
 * Initialize FAQ Search and Category Filters
 */
const initFaqFilter = () => {
  const faqItems    = $$('.faq-item');
  const faqPills    = $$('.faq-pill-btn');
  const searchInput = document.getElementById('faqSearchInput');

  if (faqItems.length === 0) return;

  let currentCategory = 'all';
  let searchQuery = '';

  const filterFAQ = () => {
    faqItems.forEach(item => {
      const itemCat      = item.dataset.category || '';
      const questionText = item.querySelector('.faq-item__question')?.textContent.toLowerCase() || '';
      const answerText   = item.querySelector('.faq-item__answer')?.textContent.toLowerCase() || '';

      const matchesCat    = (currentCategory === 'all' || itemCat === currentCategory);
      const matchesSearch = !searchQuery || questionText.includes(searchQuery) || answerText.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        item.classList.remove('faq-item--hidden');
      } else {
        item.classList.add('faq-item--hidden');
      }
    });
  };

  faqPills.forEach(pill => {
    pill.addEventListener('click', () => {
      faqPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      currentCategory = pill.dataset.faqCat || 'all';
      filterFAQ();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterFAQ();
    });
  }
};

/**
 * Initialize all FAQ lists on the page
 */
export const initFaq = () => {
  const faqLists = $$('.faq-list');
  faqLists.forEach(list => {
    const allowMultiple = list.hasAttribute('data-multiple');
    initFaqList(list, allowMultiple);
  });
  initFaqFilter();
};
