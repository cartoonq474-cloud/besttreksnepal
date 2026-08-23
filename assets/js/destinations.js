/**
 * destinations.js — Best Treks Nepal Destinations Page Logic
 * Version: 2.0 | August 2026
 *
 * Handles:
 *  - Real-time live keyword search across regions
 *  - Category pill filtering (High Altitude, Classic, Restricted, Moderate)
 *  - Quick Intel modal with rich dynamic data per region
 *  - Seasonal guide tab switching
 *  - Smooth jump and highlight from region map explorer
 */

'use strict';

import { $, $$, addClass, removeClass } from './utils.js';

// Rich Region Intel Data for Modal
const REGION_INTEL_DATA = {
  everest: {
    title: "Everest & Khumbu Region",
    altitude: "2,800m – 8,848.86m (Passes to 5,545m Kala Patthar / Cho La)",
    duration: "Portfolio of 6 Routes (7 to 19 Days)",
    difficulty: "Moderate to Challenging / Extreme",
    season: "Autumn (Oct–Dec) & Spring (Mar–May)",
    permits: "Sagarmatha NP Permit + Khumbu Pasang Lhamu Rural Fee",
    permitCost: "~NPR 5,000 (~USD $38) per trekker total",
    teahouse: "Luxury Lodges (Yeti Mountain Home), Standard Teahouses & High Alpine Refuges",
    overview: "The world-famous crown jewel of the Himalayas. Preserves the Sagarmatha UNESCO biosphere, dramatic 8,000m giants (Everest, Lhotse, Cho Oyu), sacred high-altitude turquoise glacial lakes, and centuries of Sherpa Buddhist heritage centered around Tengboche and Namche Bazaar.",
    highlights: [
      "Stand under Mt. Everest (8,848.86m), Nuptse, and Ama Dablam",
      "Explore Namche Bazaar — the mountain trade capital of Khumbu",
      "Six Sacred Gokyo Turquoise Lakes and Ngozumpa Glacier",
      "Ancient Tengboche Monastery and monastic chanting ceremonies"
    ],
    gearTip: "A 4-season rated sleeping bag (-15°C to -20°C) and microspikes are mandatory for icy passes like Cho La and Kongma La."
  },
  annapurna: {
    title: "Annapurna Massif & Sanctuary",
    altitude: "820m – 8,091m (Thorong La Pass 5,416m)",
    duration: "Portfolio of 8 Routes (5 to 16 Days)",
    difficulty: "Easy / Moderate to Strenuous",
    season: "Autumn (Oct–Dec) & Spring (Mar–May)",
    permits: "Annapurna Conservation Area Permit (ACAP) + TIMS Card",
    permitCost: "~NPR 3,000 ACAP + NPR 2,000 TIMS (~USD $38 total)",
    teahouse: "Well-developed Eco-Lodges, Gurung homestays & High Sanctuary Base Refuges",
    overview: "Nepal's most biodiverse conservation area, extending across 7,629 km² from tropical river gorges and blooming rhododendron forests to the high arid Tibetan plateau and the 360-degree mountain amphitheater of Annapurna Sanctuary.",
    highlights: [
      "Cross Thorong La Pass (5,416m) — the world's most traversed high pass",
      "Poon Hill sunrise panorama over Dhaulagiri and Annapurna massifs",
      "Stand inside the towering natural amphitheater at Annapurna Base Camp (4,130m)",
      "Explore Kali Gandaki — the deepest river canyon on Earth"
    ],
    gearTip: "Versatile 4-layer system required to handle subtropical heat at Nayapul (28°C) up to freezing pass winds at Thorong La (-10°C)."
  },
  langtang: {
    title: "Langtang Valley & Helambu",
    altitude: "1,400m – 7,227m (Tserko Ri 4,984m / Laurebina Pass 4,610m)",
    duration: "Portfolio of 4 Routes (6 to 14 Days)",
    difficulty: "Moderate to Challenging",
    season: "Spring (Mar–May) & Autumn (Sep–Nov)",
    permits: "Langtang National Park Permit + TIMS Card",
    permitCost: "~NPR 3,000 NP + NPR 2,000 TIMS (~USD $38 total)",
    teahouse: "Comfortable local Tamang Teahouses & Kyanjin Valley Alpine Lodges",
    overview: "The closest high-mountain wilderness to Kathmandu, characterized by dramatic U-shaped glacial valleys carved by Langtang Lirung, traditional Tamang yak-herding settlements, Swiss-designed yak cheese creameries, and the sacred Gosaikunda alpine lake pilgrimage network.",
    highlights: [
      "Summit Kyanjin Ri (4,773m) and Tserko Ri (4,984m) for glacier panoramas",
      "Tour historic Kyanjin Gompa (3,870m) and sample fresh Himalayan yak cheese",
      "Pilgrimage to 108 Sacred High-Altitude Gosaikunda Alpine Lakes (4,380m)",
      "Immerse in indigenous Tamang mountain culture along the Tamang Heritage Trail"
    ],
    gearTip: "Sturdy trekking poles and knee support are critical for the sustained 1,400m descent from Lauribinayak to Dhunche."
  },
  manaslu: {
    title: "Manaslu Conservation Area",
    altitude: "710m – 8,163m (Larkya La Pass 5,106m)",
    duration: "Portfolio of 3 Routes (14 to 20 Days)",
    difficulty: "Strenuous / Restricted High Pass",
    season: "Autumn (Sep–Nov) & Spring (Mar–May)",
    permits: "Manaslu Special RAP ($100/wk in Autumn, $75/wk in Spring) + MCAP + ACAP",
    permitCost: "~USD $140 – $170 per person depending on season & days",
    teahouse: "Authentic rustic tea houses with home-cooked Tibetan meals",
    overview: "A pristine, restricted wilderness circuit encircling Mt. Manaslu (8,163m, the Mountain of the Spirit). Preserves ancient Nubri Tibetan customs, hidden non-violent Buddhist sanctuaries in Tsum Valley, and thrilling canyon suspension bridges with zero commercial congestion.",
    highlights: [
      "Cross the magnificent glaciated Larkya La Pass (5,106m)",
      "Unmatched up-close vantage of Mt. Manaslu (8,163m) and Himlung Himal",
      "Tsum Valley sacred hermit caves, Milarepa sites, and Mu Gompa (1895 AD)",
      "Ancient untouched Tibetan border villages of Samagaon and Samdo"
    ],
    gearTip: "Strict government regulation requires a minimum of 2 licensed trekkers and a certified Nepal guide for RAP issuance."
  },
  mustang: {
    title: "Upper Mustang Walled Kingdom",
    altitude: "2,800m – 3,840m (Lo Manthang Capital / Passes to 4,200m)",
    duration: "Portfolio of 3 Routes (12 to 15 Days)",
    difficulty: "Moderate (Trans-Himalayan Trekking & 4WD)",
    season: "May to November (Absolute Zero-Rain Monsoon Haven!)",
    permits: "Upper Mustang Special Restricted Area Permit (RAP) + ACAP",
    permitCost: "USD $500 per person (covers 10 Days) + ACAP ($30)",
    teahouse: "Historic Tibetan-style Guesthouses & Royal Palace boutique lodges in Lo Manthang",
    overview: "A protected, semi-arid trans-Himalayan Tibetan realm tucked behind the Annapurna-Dhaulagiri rainshadow. World-famous for the 14th-century fortified capital of Lo Manthang, cliffside cave monasteries, ancient Bon traditions, and premier summer dry-season trekking.",
    highlights: [
      "Explore the 600-year-old royal walled capital city of Lo Manthang",
      "Discover 10,000+ prehistoric cliffside sky burial caves of Chhoser",
      "Witness the sacred masked dance ceremonies of the annual Tiji Festival",
      "100% dry trekking condition during peak Himalayan summer monsoon months"
    ],
    gearTip: "Bring UV400 sunglasses, dust-filtering buffs, and high-SPF mineral sunscreen for the arid desert winds."
  },
  dolpo: {
    title: "Upper Dolpo & Shey Phoksundo",
    altitude: "2,000m – 7,625m (Kang La Pass 5,350m / Saldang La 5,100m)",
    duration: "Portfolio of 3 Routes (12 to 21 Days)",
    difficulty: "Strenuous / Wilderness Expedition",
    season: "May to October (Trans-Himalayan Rainshadow)",
    permits: "Upper Dolpo Special RAP ($500/10d) + Shey Phoksundo National Park Permit",
    permitCost: "USD $500 per person (10 Days) + NPR 3,000 NP fee",
    teahouse: "Wilderness Camping Expeditions & Basic Village Homestays",
    overview: "Nepal's most isolated and spiritually pure frontier, immortalized in Peter Matthiessen's masterpiece 'The Snow Leopard'. Features the mystical turquoise waters of Lake Phoksundo, 900-year-old Bon Po monasteries, and prime habitat for the endangered Himalayan Snow Leopard.",
    highlights: [
      "Behold the 145m deep turquoise waters of Sacred Shey Phoksundo Lake",
      "Traverse Kang La Pass (5,350m) and the rugged canyons of Tarap Valley",
      "Visit 900-year-old Shey Gompa at the base of the sacred Crystal Mountain",
      "Experience pre-Buddhist Bon Po spiritual culture and nomadic yak lifestyles"
    ],
    gearTip: "Expeditions must be fully self-contained with complete emergency satellite SOS communication."
  },
  kanchenjunga: {
    title: "Kanchenjunga & Eastern Frontier",
    altitude: "1,200m – 8,586m (Pangpema North Base Camp 5,143m)",
    duration: "Portfolio of 3 Routes (16 to 24 Days)",
    difficulty: "Challenging / Remote Frontier Expedition",
    season: "Spring (March–May) & Autumn (October–November)",
    permits: "Kanchenjunga Restricted Area Permit (RAP) + KCAP Conservation Permit",
    permitCost: "~USD $70 per person per week + Conservation fee",
    teahouse: "Basic Local Teahouses & Wilderness Camping",
    overview: "An epic, wild journey to the base of the world's 3rd highest mountain (Mt. Kanchenjunga, 8,586m) in eastern Nepal. Unspoiled rhododendron cloud forests give way to massive tumbling glaciers, rare red panda habitats, and authentic Rai, Limbu, and Sherpa border communities.",
    highlights: [
      "Reach Pangpema North Base Camp (5,143m) directly facing Kanchenjunga",
      "Witness the colossal granite wall of Jannu Peak (Kumbhakarna 7,711m)",
      "Experience unspoiled Limbu, Rai, and mountain Sherpa hospitality",
      "Pristine biodiversity sanctuary harboring Red Pandas and Snow Leopards"
    ],
    gearTip: "Requires experienced high-altitude endurance and preparedness for primitive teahouse accommodation."
  },
  makalu: {
    title: "Makalu Barun Wilderness",
    altitude: "435m – 8,485m (Makalu Base Camp 4,870m / Shipton La 4,216m)",
    duration: "Portfolio of 2 Routes (16 to 20 Days)",
    difficulty: "Strenuous / Remote Alpine Wilderness",
    season: "Spring (March–May) & Autumn (September–November)",
    permits: "Makalu Barun National Park Permit + TIMS Card",
    permitCost: "~NPR 3,000 NP + NPR 2,000 TIMS (~USD $38 total)",
    teahouse: "Simple Village Teahouses & Wilderness Alpine Refuges",
    overview: "An extraordinary ecological sanctuary enclosing Mt. Makalu (8,485m, the 5th highest mountain). Renowned for vertical granite monoliths rising thousands of meters from the Barun Valley floor, roaring hanging waterfalls, and absolute mountain solitude.",
    highlights: [
      "Stand beneath the awe-inspiring 500-meter sheer granite face of Mt. Makalu",
      "Trek through the lush, pristine Barun River Gorge and hanging waterfalls",
      "Unobstructed views of the rarely seen eastern Kangshung Face of Mt. Everest",
      "Over 3,000 species of rare Himalayan flora and vibrant birdlife"
    ],
    gearTip: "Pack water purification drops and high-capacity solar chargers as power infrastructure is nonexistent in Barun."
  }
};

export const initDestinations = () => {
  const grid = document.getElementById('destinationsPageGrid');
  if (!grid) return;

  const cards = $$('.dest-region-card', grid);
  const filterPills = $$('[data-dest-filter]');
  const heroSearchInput = document.getElementById('heroDestSearchInput');
  const searchInput = document.getElementById('destSearchInput') || heroSearchInput;
  const countEl = document.getElementById('destResultCount');
  const noResults = document.getElementById('destNoResults');
  const mapPills = $$('[data-region-target]');

  let activeCategory = 'all';
  let searchQuery = '';

  /**
   * Filter cards based on search query & active category
   */
  const filterCards = () => {
    let visibleCount = 0;

    cards.forEach(card => {
      const categoryStr = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.dest-region-card__title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.dest-region-card__desc')?.textContent.toLowerCase() || '';
      const cardHighlights = card.querySelector('.dest-region-card__highlights')?.textContent.toLowerCase() || '';

      const matchCategory = activeCategory === 'all' || categoryStr.includes(activeCategory);
      const matchSearch = !searchQuery || 
        cardTitle.includes(searchQuery) || 
        cardDesc.includes(searchQuery) || 
        cardHighlights.includes(searchQuery);

      if (matchCategory && matchSearch) {
        card.style.display = '';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        visibleCount++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          if (!matchCategory || !matchSearch) {
            card.style.display = 'none';
          }
        }, 200);
      }
    });

    if (countEl) {
      countEl.textContent = `Showing ${visibleCount} region${visibleCount !== 1 ? 's' : ''}`;
    }

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  // Category Filter Pill Clicks
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('is-active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('is-active');
      pill.setAttribute('aria-selected', 'true');

      activeCategory = pill.getAttribute('data-dest-filter') || 'all';
      filterCards();
    });
  });

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }

  if (heroSearchInput && heroSearchInput !== searchInput) {
    heroSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }

  // Interactive Map Explorer Pill Jump Links & Pin Sync
  mapPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const targetId = pill.getAttribute('data-region-target');
      if (!targetId) return;

      // Update active pin & sidebar list item
      mapPills.forEach(p => {
        const isTarget = p.getAttribute('data-region-target') === targetId;
        p.classList.toggle('is-active', isTarget);
      });

      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        e.preventDefault();
        // Clear filter if hidden
        activeCategory = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        filterPills.forEach(p => p.classList.toggle('is-active', p.getAttribute('data-dest-filter') === 'all'));
        filterCards();

        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '72', 10);
        const top = targetCard.getBoundingClientRect().top + window.scrollY - navHeight - 30;
        window.scrollTo({ top, behavior: 'smooth' });

        // Flash highlight animation
        targetCard.classList.add('dest-card-highlight');
        setTimeout(() => targetCard.classList.remove('dest-card-highlight'), 1800);
      }
    });
  });

  /* --------------------------------------------------------------------------
     Map Mode Switcher (Satellite View vs Google Map)
     -------------------------------------------------------------------------- */
  const mapToggleBtns = $$('[data-map-mode]');
  const mapSatImg = document.getElementById('mapSatelliteImg');
  const mapIframe = document.getElementById('mapGoogleIframe');

  mapToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-map-mode');
      mapToggleBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      if (mode === 'google') {
        if (mapSatImg) mapSatImg.style.display = 'none';
        if (mapIframe) mapIframe.style.display = 'block';
      } else {
        if (mapSatImg) mapSatImg.style.display = 'block';
        if (mapIframe) mapIframe.style.display = 'none';
      }
    });
  });

  /* --------------------------------------------------------------------------
     Quick Intel Modal Logic
     -------------------------------------------------------------------------- */
  const modal = document.getElementById('regionIntelModal');
  const modalCloseBtns = $$('[data-modal-close]');
  const modalOverlay = modal?.querySelector('.modal-overlay');

  const openIntelModal = (regionKey) => {
    const data = REGION_INTEL_DATA[regionKey];
    if (!data || !modal) return;

    // Populate modal elements
    const titleEl = modal.querySelector('[data-intel-title]');
    const altEl = modal.querySelector('[data-intel-alt]');
    const durEl = modal.querySelector('[data-intel-dur]');
    const diffEl = modal.querySelector('[data-intel-diff]');
    const seasonEl = modal.querySelector('[data-intel-season]');
    const permitsEl = modal.querySelector('[data-intel-permits]');
    const costEl = modal.querySelector('[data-intel-cost]');
    const houseEl = modal.querySelector('[data-intel-house]');
    const overviewEl = modal.querySelector('[data-intel-overview]');
    const highlightsEl = modal.querySelector('[data-intel-highlights]');
    const gearEl = modal.querySelector('[data-intel-gear]');

    if (titleEl) titleEl.textContent = data.title;
    if (altEl) altEl.textContent = data.altitude;
    if (durEl) durEl.textContent = data.duration;
    if (diffEl) diffEl.textContent = data.difficulty;
    if (seasonEl) seasonEl.textContent = data.season;
    if (permitsEl) permitsEl.textContent = data.permits;
    if (costEl) costEl.textContent = data.permitCost;
    if (houseEl) houseEl.textContent = data.teahouse;
    if (overviewEl) overviewEl.textContent = data.overview;
    if (gearEl) gearEl.textContent = data.gearTip;

    if (highlightsEl && data.highlights) {
      highlightsEl.innerHTML = data.highlights
        .map(h => `<li class="intel-highlight-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>${h}</span></li>`)
        .join('');
    }

    addClass(modal, 'is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeIntelModal = () => {
    if (!modal) return;
    removeClass(modal, 'is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach modal trigger click handlers
  $$('[data-intel-trigger]').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-intel-trigger');
      if (key) openIntelModal(key);
    });
  });

  if (modalCloseBtns) {
    modalCloseBtns.forEach(btn => btn.addEventListener('click', closeIntelModal));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeIntelModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
      closeIntelModal();
    }
  });

  /* --------------------------------------------------------------------------
     Seasonal Guide Matrix Tab Switcher
     -------------------------------------------------------------------------- */
  const seasonTabs = $$('[data-season-tab]');
  const seasonPanels = $$('[data-season-panel]');

  seasonTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSeason = tab.getAttribute('data-season-tab');

      seasonTabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      seasonPanels.forEach(panel => {
        const isTarget = panel.getAttribute('data-season-panel') === targetSeason;
        if (isTarget) {
          panel.style.display = 'block';
          panel.style.opacity = '0';
          requestAnimationFrame(() => {
            panel.style.transition = 'opacity 0.3s ease';
            panel.style.opacity = '1';
          });
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });
};
