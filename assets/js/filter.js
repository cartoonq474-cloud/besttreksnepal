/**
 * filter.js — Best Treks Nepal Package Filter
 * Version: 1.0 | August 2026
 *
 * Responsibilities:
 *  - Filter trek packages by region, duration, difficulty, price, season
 *  - DOM-based filtering (no server required)
 *  - Reset all filters
 *  - Show "no results" state
 *  - Update count display
 */

'use strict';

import { $, $$, addClass, removeClass } from './utils.js';

/**
 * Initialize package filter
 * Expected HTML structure:
 *
 * <div data-filter-container>
 *   <select data-filter-select="region">...</select>
 *   <select data-filter-select="difficulty">...</select>
 *   <select data-filter-select="duration">...</select>
 *   <button data-filter-reset>Reset Filters</button>
 *   <span data-filter-count></span>
 * </div>
 *
 * <div class="treks-grid" data-filter-grid>
 *   <article class="trek-card"
 *     data-region="everest"
 *     data-difficulty="challenging"
 *     data-duration="14"
 *     data-price="1400"
 *     data-season="autumn,spring">
 *   </article>
 * </div>
 */
export const initFilter = () => {
  const filterContainers = $$('[data-filter-container]');

  filterContainers.forEach(filterContainer => {
    const grid     = document.querySelector('[data-filter-grid]');
    const cards    = grid ? $$('[data-region]', grid) : [];
    const selects  = $$('[data-filter-select]', filterContainer);
    const resetBtn = $('[data-filter-reset]',   filterContainer);
    const countEl  = $('[data-filter-count]',   filterContainer);
    const noResults = $('[data-filter-empty]', grid?.parentElement);

    if (cards.length === 0) return;

    // Current filter state
    const filters = {};

    /**
     * Collect values from all filter selects
     */
    const collectFilters = () => {
      selects.forEach(select => {
        const key   = select.getAttribute('data-filter-select');
        const value = select.value;
        if (value && value !== 'all') {
          filters[key] = value;
        } else {
          delete filters[key];
        }
      });
    };

    /**
     * Check if a card matches all active filters
     * @param {Element} card
     * @returns {boolean}
     */
    const matchesFilters = (card) => {
      // Region
      if (filters.region) {
        if (card.getAttribute('data-region') !== filters.region) return false;
      }
      // Difficulty
      if (filters.difficulty) {
        if (card.getAttribute('data-difficulty') !== filters.difficulty) return false;
      }
      // Duration — card must be <= selected max duration
      if (filters.duration) {
        const cardDuration = parseInt(card.getAttribute('data-duration') || '0', 10);
        const maxDuration  = parseInt(filters.duration, 10);
        if (cardDuration > maxDuration) return false;
      }
      // Price — card price must be <= selected max price
      if (filters.price) {
        const cardPrice = parseInt(card.getAttribute('data-price') || '0', 10);
        const maxPrice  = parseInt(filters.price, 10);
        if (cardPrice > maxPrice) return false;
      }
      // Season — card seasons must include selected season
      if (filters.season) {
        const cardSeasons = card.getAttribute('data-season')?.split(',') || [];
        if (!cardSeasons.includes(filters.season)) return false;
      }
      return true;
    };

    /**
     * Apply filters and update DOM
     */
    const applyFilters = () => {
      let visibleCount = 0;

      cards.forEach(card => {
        const match = matchesFilters(card);

        if (match) {
          card.style.display   = '';
          card.style.opacity   = '1';
          card.style.transform = 'scale(1)';
          visibleCount++;
        } else {
          card.style.opacity   = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            if (!matchesFilters(card)) {
              card.style.display = 'none';
            }
          }, 250);
        }
      });

      // Update count
      if (countEl) {
        countEl.textContent = `${visibleCount} trek${visibleCount !== 1 ? 's' : ''} found`;
      }

      // No results state
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'flex' : 'none';
      }
    };

    // Listen to filter changes
    selects.forEach(select => {
      select.addEventListener('change', () => {
        collectFilters();
        applyFilters();
      });
    });

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        selects.forEach(select => { select.value = 'all'; });
        Object.keys(filters).forEach(k => delete filters[k]);
        applyFilters();
      });
    }

    // Initial run
    applyFilters();
  });
};
