/**
 * search.js — Best Treks Nepal Instant Search
 * Version: 1.0 | August 2026
 *
 * Responsibilities:
 *  - Instant search with debounce (300ms)
 *  - Searches trek and destination data
 *  - Displays live dropdown results
 *  - Keyboard navigation through results
 *  - Close on ESC or outside click
 */

'use strict';

import { $, $$, debounce, sanitize, addClass, removeClass } from './utils.js';

/**
 * Trek and destination data for search
 * In production, this would be fetched from an API or JSON file.
 */
const SEARCH_DATA = [
  // Trek Packages
  { type: 'Trek', name: 'Everest Base Camp Trek',    url: '/treks/everest-base-camp.html',   duration: '14 Days', difficulty: 'Challenging' },
  { type: 'Trek', name: 'Annapurna Circuit Trek',    url: '/treks/annapurna-circuit.html',   duration: '18 Days', difficulty: 'Challenging' },
  { type: 'Trek', name: 'Annapurna Base Camp Trek',  url: '/treks/annapurna-base-camp.html', duration: '11 Days', difficulty: 'Moderate' },
  { type: 'Trek', name: 'Manaslu Circuit Trek',      url: '/treks/manaslu-circuit.html',     duration: '16 Days', difficulty: 'Challenging' },
  { type: 'Trek', name: 'Langtang Valley Trek',      url: '/treks/langtang-valley.html',     duration: '9 Days',  difficulty: 'Moderate' },
  { type: 'Trek', name: 'Mardi Himal Trek',          url: '/treks/mardi-himal.html',         duration: '7 Days',  difficulty: 'Moderate' },
  { type: 'Trek', name: 'Gokyo Lakes Trek',          url: '/treks/gokyo-lakes.html',         duration: '13 Days', difficulty: 'Challenging' },
  { type: 'Trek', name: 'Upper Mustang Trek',        url: '/treks/upper-mustang.html',       duration: '14 Days', difficulty: 'Moderate' },
  { type: 'Trek', name: 'Kanchenjunga Trek',         url: '/treks/kanchenjunga.html',        duration: '21 Days', difficulty: 'Strenuous' },
  { type: 'Trek', name: 'Dolpo Trek',                url: '/treks/dolpo.html',               duration: '24 Days', difficulty: 'Strenuous' },
  { type: 'Trek', name: 'Everest Three Passes Trek', url: '/treks/three-passes.html',        duration: '19 Days', difficulty: 'Strenuous' },
  // Destinations
  { type: 'Destination', name: 'Everest Region',       url: '/destinations/everest.html' },
  { type: 'Destination', name: 'Annapurna Region',     url: '/destinations/annapurna.html' },
  { type: 'Destination', name: 'Langtang Region',      url: '/destinations/langtang.html' },
  { type: 'Destination', name: 'Manaslu Region',       url: '/destinations/manaslu.html' },
  { type: 'Destination', name: 'Mustang',              url: '/destinations/mustang.html' },
  { type: 'Destination', name: 'Dolpo',                url: '/destinations/dolpo.html' },
  { type: 'Destination', name: 'Kanchenjunga Region',  url: '/destinations/kanchenjunga.html' },
];

/**
 * Filter search data by query string
 * @param {string} query
 * @returns {Array}
 */
const filterResults = (query) => {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  return SEARCH_DATA
    .filter(item => item.name.toLowerCase().includes(q))
    .slice(0, 8); // Limit to 8 results
};

/**
 * Build a result item HTML string
 * @param {Object} item
 * @returns {string}
 */
const buildResultHTML = (item) => {
  const typeIcon = item.type === 'Trek'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         <path d="M3 17l4-8 4 4 4-8 4 8"/>
       </svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
         <circle cx="12" cy="10" r="3"/>
       </svg>`;

  const meta = item.duration
    ? `<span>${sanitize(item.duration)}</span> · <span>${sanitize(item.difficulty || '')}</span>`
    : '';

  return `
    <a href="${sanitize(item.url)}" class="search-result-item" role="option">
      <span class="search-result-item__icon-wrap" aria-hidden="true">${typeIcon}</span>
      <span class="search-result-item__info">
        <span class="search-result-item__name">${sanitize(item.name)}</span>
        <span class="search-result-item__type">${sanitize(item.type)}${meta ? ' · ' + meta : ''}</span>
      </span>
    </a>
  `;
};

/**
 * Initialize search inputs on the page
 * Works for both the search modal and any inline search bar.
 */
export const initSearch = () => {
  const inputs = $$('[data-search-input]');

  inputs.forEach(input => {
    const resultsContainer = document.getElementById(input.getAttribute('aria-controls'))
      || input.closest('[data-search-wrapper]')?.querySelector('.search-modal__results');

    if (!resultsContainer) return;

    // Setup ARIA
    input.setAttribute('role',     'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded',     'false');
    resultsContainer.setAttribute('role', 'listbox');

    let activeIndex = -1;
    let results     = [];

    const showResults = (items) => {
      results = items;

      if (items.length === 0) {
        resultsContainer.innerHTML = '';
        resultsContainer.hidden = true;
        input.setAttribute('aria-expanded', 'false');
        return;
      }

      resultsContainer.innerHTML = items.map(buildResultHTML).join('');
      resultsContainer.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      activeIndex = -1;
    };

    const hideResults = () => {
      resultsContainer.innerHTML = '';
      resultsContainer.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      activeIndex = -1;
    };

    const updateActiveItem = () => {
      const items = $$('.search-result-item', resultsContainer);
      items.forEach((item, i) => {
        item.classList.toggle('is-active', i === activeIndex);
        if (i === activeIndex) {
          item.setAttribute('aria-selected', 'true');
          input.setAttribute('aria-activedescendant', item.id || `result-${i}`);
        } else {
          item.removeAttribute('aria-selected');
        }
      });
    };

    // Input event — search with debounce
    const handleInput = debounce(() => {
      const query = input.value;
      showResults(filterResults(query));
    }, 280);

    input.addEventListener('input', handleInput);

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
      const items = $$('.search-result-item', resultsContainer);
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        updateActiveItem();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, -1);
        updateActiveItem();
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault();
        items[activeIndex]?.click();
      } else if (e.key === 'Escape') {
        hideResults();
      }
    });

    // Hide results on outside click
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        hideResults();
      }
    });
  });
};
