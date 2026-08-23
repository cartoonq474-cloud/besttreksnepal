---
name: destination-page-builder
description: >-
  Standardized architecture, workflow, and component templates for creating
  world-class Himalayan destination regional hub landing pages (e.g. Annapurna,
  Langtang, Manaslu, Mustang, Dolpo, Kanchenjunga) based on the Everest gold standard.
---

# Destination Page Builder Skill (`destination-page-builder`)

This skill provides the comprehensive design system, component hierarchy, technical requirements, and regional blueprints for building world-class Destination Regional Hub pages (e.g. `destinations/annapurna.html`, `destinations/langtang.html`, `destinations/manaslu.html`, `destinations/mustang.html`, etc.) for **Best Treks Nepal**.

---

## 1. Core Principles & Standards

Every destination regional page must adhere to these non-negotiable quality rules:
1. **Gold Standard Parity**: Follow the complete 12-section architecture of [`destinations/everest.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/destinations/everest.html).
2. **Unified Navigation & Header**: Include the full top-bar, site header, mega-menu (with active state for the current region), search modal, and mobile menu drawer from [`treks.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/treks.html).
3. **Master Footer**: Use the exact master footer layout and back-to-top button from [`index.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/index.html).
4. **Hero Architecture**:
   - 3-slide panoramic carousel (`.hero__slides`, `.hero__slide`) with dark mountain overlay.
   - Breadcrumb navigation (`Home > Destinations > Region Name`).
   - Google Review rating pill with verified trekker counts.
   - Regional badge + bold headline.
   - Action row with preview thumbnail and floating trust pill (+avatars, count, CTA).
   - Regional route finder search widget.
   - **Full-width horizontal 5-column Key Regional Metrics Card** (`.region-stats-strip`).
   - Continuous 6-pill moving marquee strip (`.hero__bottom-strip`).
5. **Interactive Sub-Navigation**: Sticky sub-nav (`.region-subnav-sticky`) linking smoothly to all 9 on-page sections.
6. **Interactive FAQ System**: Real-time search (`#faqSearchInput`), category pills (`.faq-category-pills`), structured `.faq-item` accordions with badges/callouts, and 24/7 Sherpa WhatsApp support card.
7. **Clean Typography**: Zero broken character codes or emojis. Always use high-precision SVGs or semantic HTML entities.

---

## 2. 12-Section Architecture Checklist

Every destination page must contain the following sections in exact sequence:

1. **Document Head & SEO**: Custom `<title>`, `<meta name="description">`, OpenGraph tags, canonical link, and regional CSS variables.
2. **Top Bar & Site Header Navigation**: `.skip-link`, `.page-loader`, `#navbar-progress`, `.site-header` with `.top-bar`, mega-menu, search modal, and `#mobile-menu`.
3. **Hero Carousel Section (`.hero`)**: Multi-slide carousel, rating badge, headline, action row, route finder, horizontal 5-column metric card, and moving marquee.
4. **Sticky Sub-Navigation (`.region-subnav-sticky`)**: Quick jump links with active scrollspy tracking.
5. **Section 1: Macro-Geography & Zoning (`#overview`)**: Regional geography, altitudinal zones, rivers, passes, and mountain peaks.
6. **Section 2: Curated Trek Routes Portfolio (`#routes`)**: Complete grid of all regional trekking packages with duration, elevation, difficulty badges, highlights, and booking links.
7. **Section 3: Mandatory Permits, Regulations & Fees (`#permits`)**: National park fees, conservation permits, rural municipality charges, and restricted area clearances (2026/2027 statutory rates).
8. **Section 4: Elevation Profile, Acclimatization & Mountain Safety (`#elevation`)**: Acclimatization schedules, pulse oximetry protocols, and 24/7 helicopter evacuation dispatch.
9. **Section 5: Seasonal Climate, Temperatures & Best Seasons (`#seasons`)**: Comprehensive Spring, Autumn, Monsoon, and Winter comparison table.
10. **Section 6: Indigenous Sherpa / Ethnic Heritage & Culture (`#culture`)**: Local monasteries, festivals, cultural etiquette, and traditions.
11. **Section 7: Teahouse Lodging Standards & Trail Nutrition (`#lodging`)**: Teahouse room standards, heating, power/charging, WiFi, and 3 daily meals.
12. **Section 8: Gear & Essential Packing Checklist (`#packing`)**: Layering system, footwear, optics/hardware, and weight allowances.
13. **Section 9: Interactive FAQ Accordion (`#faq`)**: Live search bar, category pills, structured Q&A accordions, and WhatsApp support banner.
14. **Section 10: Expedition Consultation & Booking CTA**: High-impact banner with "Book Trek" and "Talk with a Sherpa Expert" CTAs.
15. **Master Footer & Back-to-Top**: Universal footer with dynamic year, social links, quick links, and back-to-top button.

---

## 3. Regional Theme Tokens & Color Palettes

Define the CSS tokens in the `<style>` block of the new destination page:

### Everest & Khumbu
```css
:root {
  --region-primary: #0f5257;
  --region-accent: #059669;
  --region-gold: #c8a96b;
  --region-dark: #0b2d30;
  --region-ice: #e0f2fe;
}
```

### Annapurna Region
```css
:root {
  --region-primary: #1e3a5f;
  --region-accent: #d97706;
  --region-gold: #fbbf24;
  --region-dark: #0f172a;
  --region-ice: #f0fdf4;
}
```

### Langtang Valley
```css
:root {
  --region-primary: #134e4a;
  --region-accent: #0d9488;
  --region-gold: #f59e0b;
  --region-dark: #042f2e;
  --region-ice: #ccfbf1;
}
```

### Manaslu Region
```css
:root {
  --region-primary: #312e81;
  --region-accent: #6366f1;
  --region-gold: #eab308;
  --region-dark: #1e1b4b;
  --region-ice: #e0e7ff;
}
```

### Upper Mustang
```css
:root {
  --region-primary: #78350f;
  --region-accent: #b45309;
  --region-gold: #f59e0b;
  --region-dark: #451a03;
  --region-ice: #fef3c7;
}
```

### Upper Dolpo
```css
:root {
  --region-primary: #064e3b;
  --region-accent: #059669;
  --region-gold: #10b981;
  --region-dark: #022c22;
  --region-ice: #d1fae5;
}
```

---

## 4. Key Component Templates

### Component A: Hero Section
```html
<section class="hero hero--region" aria-label="Hero — {Region Name}" aria-roledescription="carousel">
  <div class="hero__slides" aria-live="off">
    <!-- Slide 1 -->
    <div class="hero__slide is-active" role="group" aria-roledescription="slide" aria-label="Slide 1 of 3">
      <img class="hero__slide-bg" src="{image_url_1}" alt="{alt_1}" aria-hidden="true" loading="eager" fetchpriority="high" width="1920" height="1080">
      <div class="hero__overlay"></div>
    </div>
    <!-- Slide 2 -->
    <div class="hero__slide" role="group" aria-roledescription="slide" aria-label="Slide 2 of 3">
      <img class="hero__slide-bg" src="{image_url_2}" alt="{alt_2}" aria-hidden="true" loading="lazy" width="1920" height="1080">
      <div class="hero__overlay"></div>
    </div>
    <!-- Slide 3 -->
    <div class="hero__slide" role="group" aria-roledescription="slide" aria-label="Slide 3 of 3">
      <img class="hero__slide-bg" src="{image_url_3}" alt="{alt_3}" aria-hidden="true" loading="lazy" width="1920" height="1080">
      <div class="hero__overlay"></div>
    </div>
  </div>

  <!-- Carousel Controls -->
  <button class="hero__arrow hero__arrow--prev" aria-label="Previous slide" type="button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <button class="hero__arrow hero__arrow--next" aria-label="Next slide" type="button">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
  </button>

  <div class="container">
    <div class="hero__content reveal-group">
      <!-- Breadcrumb -->
      <nav aria-label="Breadcrumb" class="hero__breadcrumb reveal" style="margin-bottom: 1.25rem;">
        <ol style="display: inline-flex; align-items: center; gap: 0.5rem; list-style: none; padding: 0.4rem 1rem; margin: 0; font-size: 0.82rem; background: rgba(15,82,87,0.35); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.18); border-radius: 9999px; color: rgba(255,255,255,0.85);">
          <li><a href="/" style="color: #ffffff; text-decoration: none; font-weight: 500;">Home</a></li>
          <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></li>
          <li><a href="/destinations.html" style="color: #ffffff; text-decoration: none; font-weight: 500;">Destinations</a></li>
          <li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></li>
          <li style="color: #38bdf8; font-weight: 700;" aria-current="page">{Region Name}</li>
        </ol>
      </nav>

      <!-- Rating Badge -->
      <div class="hero__rating-badge reveal">
        <div class="hero__rating-box">
          <svg class="hero__google-icon" width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <div class="hero__rating-text-group">
            <span class="hero__rating-brand">{Region Focus}</span>
            <span class="hero__stars-mini">★★★★★</span>
          </div>
        </div>
        <div class="hero__rating-divider"></div>
        <div class="hero__rating-info">
          <span>Verified <strong>4.97</strong> (1,500+ Trekkers)</span>
          <div class="hero__stars-yellow">★★★★★</div>
        </div>
      </div>

      <!-- Title & Headline -->
      <h1 class="hero__title reveal">
        <span class="hero__title-badge">{Sub-region / Biosphere}</span><br>
        {Region Name} Expeditions
      </h1>

      <p class="hero__subtitle reveal">
        {Compelling 2-sentence geographical and cultural overview.}
        <a href="#overview" class="hero__subtitle-link">Explore Geography &rarr;</a>
      </p>

      <!-- Action Row -->
      <div class="hero__action-row reveal">
        <a href="#routes" class="hero__play-thumb" aria-label="Explore regional routes">
          <img src="{thumb_url}" alt="Regional preview">
          <div class="hero__play-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </a>
        <div class="hero__trust-pill">
          <div class="hero__avatars">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Trekker" class="hero__avatar">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Trekker" class="hero__avatar">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80" alt="Trekker" class="hero__avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" alt="Trekker" class="hero__avatar">
          </div>
          <span class="hero__trust-text">Guided <strong>+{trekker_count} Climbers</strong></span>
          <a href="#routes" class="btn hero__trust-btn">Explore {route_count} Routes</a>
        </div>
      </div>

      <!-- Route Finder Widget -->
      <div class="hero__search-widget reveal" role="search" aria-label="Route Finder">
        <div class="hero__search-input-group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <input class="hero__search-input" type="search" placeholder="Search {Region Name} treks..." aria-label="Search routes" autocomplete="off">
        </div>
        <a href="#routes" class="btn hero__search-submit" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem;">
          <span>Find Route</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>

      <!-- Horizontal 5-Column Metrics Strip -->
      <div class="region-stats-strip reveal" style="margin-top: 2rem;">
        <div class="region-stat-item">
          <span class="region-stat-item__label">Summit Elevation</span>
          <span class="region-stat-item__value">{Peak Elevation}</span>
          <span class="region-stat-item__hint">{Peak Name}</span>
        </div>
        <div class="region-stat-item">
          <span class="region-stat-item__label">Max Trekking Pass</span>
          <span class="region-stat-item__value">{Pass Elevation}</span>
          <span class="region-stat-item__hint">{Pass Name}</span>
        </div>
        <div class="region-stat-item">
          <span class="region-stat-item__label">Gateway Hub</span>
          <span class="region-stat-item__value">{Gateway Name}</span>
          <span class="region-stat-item__hint">{Access Method}</span>
        </div>
        <div class="region-stat-item">
          <span class="region-stat-item__label">Governing Park</span>
          <span class="region-stat-item__value">{Area km²}</span>
          <span class="region-stat-item__hint">{Park / Conservation Name}</span>
        </div>
        <div class="region-stat-item">
          <span class="region-stat-item__label">Route Portfolio</span>
          <span class="region-stat-item__value">{Count} Curated Routes</span>
          <span class="region-stat-item__hint">{Duration Range}</span>
        </div>
      </div>

    </div>
  </div>

  <!-- Marquee Bottom Strip -->
  <div class="hero__bottom-strip">
    <div class="hero__feature-marquee">
      <div class="hero__feature-track">
        <!-- 6 Feature Pills (Repeated twice for seamless loop) -->
        <div class="hero__feature-pill"><span class="hero__feature-check">✓</span><span>UNESCO / Protected Biosphere</span><span class="hero__feature-info">ⓘ</span></div>
        <div class="hero__feature-pill"><span class="hero__feature-check">✓</span><span>100% Certified Native Sherpa Guides</span><span class="hero__feature-info">ⓘ</span></div>
        <div class="hero__feature-pill"><span class="hero__feature-check">✓</span><span>24/7 Helicopter Evacuation Dispatch</span><span class="hero__feature-info">ⓘ</span></div>
        <div class="hero__feature-pill"><span class="hero__feature-check">✓</span><span>Twice-Daily Pulse Oximetry Checks</span><span class="hero__feature-info">ⓘ</span></div>
        <div class="hero__feature-pill"><span class="hero__feature-check">✓</span><span>2026/2027 Mandatory Permits Handled</span><span class="hero__feature-info">ⓘ</span></div>
        <div class="hero__feature-pill"><span class="hero__feature-check">✓</span><span>Guaranteed Small Group Departures</span><span class="hero__feature-info">ⓘ</span></div>
      </div>
    </div>
  </div>
</section>
```

### Component B: Sticky Sub-Navigation
```css
.region-subnav-sticky {
  position: sticky;
  top: 0;
  z-index: 95;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
```

```html
<div class="region-subnav-sticky">
  <div class="container">
    <nav class="region-subnav-list" aria-label="{Region Name} Sections">
      <a href="#overview" class="region-subnav-link is-active">Overview &amp; Geography</a>
      <a href="#routes" class="region-subnav-link">Trek Routes</a>
      <a href="#permits" class="region-subnav-link">Permits &amp; Rules</a>
      <a href="#elevation" class="region-subnav-link">Elevation &amp; Safety</a>
      <a href="#seasons" class="region-subnav-link">Best Seasons</a>
      <a href="#culture" class="region-subnav-link">Local Culture</a>
      <a href="#lodging" class="region-subnav-link">Lodges &amp; Food</a>
      <a href="#packing" class="region-subnav-link">Packing Checklist</a>
      <a href="#faq" class="region-subnav-link">FAQ</a>
    </nav>
  </div>
</div>
```

### Component C: Interactive FAQ Section
```html
<section id="faq" class="section section--light faq-section" aria-labelledby="faq-heading">
  <div class="container container--narrow">
    <div class="section-heading section-heading--center reveal">
      <span class="section-heading__eyebrow">Answers from Certified Lead Guides</span>
      <h2 class="section-heading__title" id="faq-heading">Frequently Asked Questions: {Region Name}</h2>
      <p class="section-heading__subtitle">Everything you need to know regarding travel logistics, permits, elevation safety, teahouse lodges, and booking terms.</p>
    </div>

    <!-- Search & Category Filters -->
    <div class="faq-filter-bar reveal">
      <div class="faq-search-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="faqSearchInput" placeholder="Search {Region Name} questions..." aria-label="Search FAQ">
      </div>
      <div class="faq-category-pills" role="tablist">
        <button class="faq-pill-btn is-active" data-faq-cat="all" role="tab">All Questions</button>
        <button class="faq-pill-btn" data-faq-cat="planning" role="tab">Planning &amp; Seasons</button>
        <button class="faq-pill-btn" data-faq-cat="permits" role="tab">Permits &amp; Fees</button>
        <button class="faq-pill-btn" data-faq-cat="safety" role="tab">Altitude &amp; Safety</button>
        <button class="faq-pill-btn" data-faq-cat="lodging" role="tab">Lodges &amp; Food</button>
        <button class="faq-pill-btn" data-faq-cat="booking" role="tab">Booking &amp; Cost</button>
      </div>
    </div>

    <!-- Accordion List -->
    <div class="faq-list reveal-group" id="faqAccordionList">
      <details class="faq-item reveal" data-category="planning">
        <summary class="faq-item__trigger">
          <div class="faq-item__question-group">
            <span class="faq-item__badge faq-item__badge--teal">Planning</span>
            <h3 class="faq-item__question">What is the best season for trekking {Region Name}?</h3>
          </div>
          <div class="faq-item__toggle-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        </summary>
        <div class="faq-item__body">
          <div class="faq-item__content">
            <p class="faq-item__answer">Detailed explanation text with highlighted points...</p>
          </div>
        </div>
      </details>
    </div>

    <!-- Support Banner Card -->
    <div class="faq-support-card reveal">
      <div class="faq-support-card__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>
      <div class="faq-support-card__info">
        <h3 class="faq-support-card__title">Still have questions about your {Region Name} trek?</h3>
        <p class="faq-support-card__text">Our Kathmandu operations team and lead Sherpa guides are available 24/7.</p>
      </div>
      <div class="faq-support-card__actions">
        <a href="https://wa.me/9771234567890" target="_blank" rel="noopener" class="btn btn--whatsapp">WhatsApp Support</a>
        <a href="/contact.html" class="btn btn--secondary">Talk with a Sherpa Expert</a>
      </div>
    </div>
  </div>
</section>
```

---

## 5. Regional Reference Fact Sheets

When generating pages for other regions, use these verified figures:

| Region | Summit Peak | Max Trekking Pass | Gateway Hub | Governing Conservation Area | Typical Routes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Annapurna** | Annapurna I (8,091m) | Thorong La (5,416m) | Pokhara (Flight / Drive) | ACAP (7,629 km²) | Annapurna Circuit, ABC Sanctuary, Mardi Himal, Poon Hill, Khopra Danda, Nar Phu |
| **Langtang** | Langtang Lirung (7,227m) | Lauribina / Ganja La (5,122m) | Syabrubesi (7h drive from KTM) | Langtang National Park (1,710 km²) | Langtang Valley, Gosaikunda Lakes, Helambu Heritage, Tamang Heritage Trail |
| **Manaslu** | Mt. Manaslu (8,163m) | Larkya La Pass (5,106m) | Machha Khola / Soti Khola | MCAP & ACAP (1,663 km²) | Manaslu Circuit, Tsum Valley Hidden Kingdom, Manaslu & Annapurna Combo |
| **Upper Mustang**| Mount Nilgiri / Dhaulagiri | Marang La (4,230m) | Jomsom (Flight from Pokhara) | ACAP Restricted Area | Lo Manthang Walled City, Tiji Festival Expedition, Mustang Caves & Damodar Kunda |
| **Upper Dolpo** | Dhaulagiri II (7,751m) | Kang La Pass (5,350m) | Juphal Airport (via Nepalgunj) | Shey Phoksundo National Park (3,555 km²) | Upper Dolpo Circuit, Shey Phoksundo Lake Trek, Lower Dolpo Loop |
| **Kanchenjunga**| Mt. Kanchenjunga (8,586m) | Sele La Pass (4,480m) | Suketar / Bhadrapur | Kanchenjunga Conservation Area (2,035 km²) | Kanchenjunga North Base Camp, South Base Camp, Full Circuit |

---

## 6. Execution Workflow for New Destination Pages

When requested to create a new destination page:
1. **File Location**: Place new destination pages inside `/destinations/` directory (e.g. `destinations/annapurna.html`, `destinations/langtang.html`, `destinations/manaslu.html`).
2. **Hero Images**: Select high-resolution imagery from `assets/images/destinations/`, `assets/images/treks/`, or generate high-quality mountain photography assets.
3. **Route Links**: Connect routes to corresponding package landing pages in `/treks/` and booking CTA to `/booking.html`.
4. **Cross-Linking**: Ensure the new page is linked in the main navbar destinations megamenu (`destinations.html`, `treks.html`, `index.html`) and footer destination lists.
5. **Local Validation**: Test locally on `http://localhost:3000/destinations/{name}.html` to verify layout responsiveness, slider transitions, and FAQ accordion interactivity.
