---
name: blog-article-builder
description: >-
  Standardized architecture, editorial workflow, and production component templates for creating
  world-class, high-converting Himalayan Trekking & Expedition Blog Guides (e.g. Everest Base Camp Complete Guide,
  Annapurna Circuit Ultimate Guide, Manaslu Circuit Trek Guide, Langtang Valley Guide, Upper Mustang Trek Guide, High Altitude Safety & Acclimatization)
  based on the Everest Base Camp gold standard.
---

# Blog Article Builder Skill (`blog-article-builder`)

This skill provides the comprehensive design system, component hierarchy, technical requirements, code templates, interactive JavaScript controllers, and structured schema blueprints for creating world-class **Himalayan Trekking & Travel Guide Article Pages** for **Best Treks Nepal**, strictly modeled on the gold standards established in [`blog/everest-base-camp-complete-guide.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/blog/everest-base-camp-complete-guide.html), [`blog/annapurna-circuit-complete-guide.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/blog/annapurna-circuit-complete-guide.html), [`blog/manaslu-circuit-trek-guide.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/blog/manaslu-circuit-trek-guide.html), [`blog/langtang-valley-trek-guide.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/blog/langtang-valley-trek-guide.html), and [`blog/upper-mustang-trek-guide.html`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/blog/upper-mustang-trek-guide.html).

---

## 1. Master Page Architecture & Section Hierarchy

Every blog guide article must follow the 10-tier gold standard layout:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Master Header (.site-header)                                        │
│    • Top Bar (.top-bar) with .top-bar__contacts + .top-bar__social    │
│    • Navbar (.navbar) with Brand Logo, Links, Actions & Hamburger      │
│    • Destinations Mega-Menu (6 Regional cards + Guides list)          │
│    • Trek Packages Dropdown (2-Column expedition list)                │
│    • Search Modal Dialog + Mobile Menu Drawer                          │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Article Hero Header (.article-hero)                                  │
│    • Breadcrumb Navigation                                             │
│    • Credibility Badges (SVG Icons: Field Manual, Time, Verified, Rate) │
│    • <h1> Main Title (Poppins 800)                                     │
│    • Author Bar (Avatar + UIAGM/NNMGA Credentials + Share Actions)     │
│    • Editorial Lead Paragraphs (High-Altitude Context & Success Rate)   │
│    • 6-Metric Fact Matrix Card (Distance, Time, Alt, Grade, Cost, Stops)│
│    • Key Elevation Profile Milestones Card (4-Step Vertical Markers)   │
│    • Quick Section Jump Navigation Chips (1 to 9 Section Links)        │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Hero Main Image Figure with Floating Badges (.article-hero-figure)  │
├────────────────────────────────────────────────────────────────────────┤
│ 4. 2-Column Responsive Editorial Grid (.article-layout-grid)           │
│    ┌───────────────────────────────────┬──────────────────────────────┐│
│    │ Left Column: .article-content     │ Right Column: .article-sidebar│
│    │ • Section 1: Expectation vs Reality│ • Collapsible TOC Details    │
│    │ • Section 2: 2026 Permits & Rules │   (Closed by default, SVG ico)│
│    │ • Section 3: 14-Day Itinerary     │ • Quick Booking Widget Card  │
│    │   (Phase Tabs + Accordions + Mtx) │   (#1 Ranked, Specs, Price,  │
│    │ • Section 4: Real 2026 Costs      │    Package CTA Button)       │
│    │   (Tiers + Inflation + Calculator)│                              │
│    │ • Section 5: Difficulty & Altitude│                              │
│    │   (O2 Curve + AMS Triage + Louise)│                              │
│    │ • Section 6: 10 Uncensored Secrets│                              │
│    │ • Section 7: Best Seasons Matrix  │                              │
│    │ • Section 8: 4-Layer Gear System  │                              │
│    │ • Section 9: 10-Item FAQ Accordion│                              │
│    └───────────────────────────────────┴──────────────────────────────┘│
├────────────────────────────────────────────────────────────────────────┤
│ 5. Full-Width Author Bio Section (.article-author-section)             │
│    (Avatar + Bio + "Ask Lead Guide a Question →" Action Button)        │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Related Himalayan Guides Grid (.related-articles-section)           │
│    (3-Card Regional Hub Recommendations)                               │
├────────────────────────────────────────────────────────────────────────┤
│ 7. Grand Article CTA Banner (.article-cta-section)                     │
│    (Gradient Card + Trip Inclusions + Instant Booking CTA)             │
├────────────────────────────────────────────────────────────────────────┤
│ 8. Master 4-Column Footer + Copyright Year + Back-to-Top Button        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Standard CSS & Typography Design System

Every blog article page must link all **9 core CSS partials in exact order** per [`AGENTS.md`](file:///c:/Users/ASUS/Desktop/Best%20Treks%20Nepal/AGENTS.md):

```html
<!-- Google Fonts Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- 9 Mandatory CSS Partials -->
<link rel="stylesheet" href="/assets/css/reset.css">
<link rel="stylesheet" href="/assets/css/variables.css">
<link rel="stylesheet" href="/assets/css/typography.css">
<link rel="stylesheet" href="/assets/css/layout.css">
<link rel="stylesheet" href="/assets/css/components.css">
<link rel="stylesheet" href="/assets/css/animations.css">
<link rel="stylesheet" href="/assets/css/utilities.css">
<link rel="stylesheet" href="/assets/css/responsive.css">
<link rel="stylesheet" href="/assets/css/style.css">
```

### Core Design Tokens & Variables

```css
:root {
  --art-font-heading: var(--font-heading, 'Poppins', sans-serif);
  --art-font-body: var(--font-body, 'Inter', sans-serif);
  --art-teal-dark: #071e20;
  --art-teal: #0f5257;
  --art-teal-light: #16646a;
  --art-gold: #c8a96b;
  --art-gold-light: #fef08a;
  --art-accent: #059669;
  --art-accent-dark: #047857;
  --art-text-dark: #0f172a;
  --art-text-body: #334155;
  --art-text-muted: #64748b;
  --art-bg-alt: #f8fafc;
  --art-border: #e2e8f0;
}
```

---

## 3. Detailed Component Standards & Code Blueprints

### Component 0: Master Site Header, Top Bar & Navigation

> [!IMPORTANT]
> Always use `.top-bar__contacts` (with plural `s`) for the contact information container. Using `.top-bar__contact` breaks the flex alignment and causes SVG icons to distort.

```html
<div class="site-header">
  <!-- Top Bar -->
  <div class="top-bar">
    <div class="container">
      <div class="top-bar__inner">
        <div class="top-bar__contacts">
          <a href="tel:+97714700000" aria-label="Call us at +977 1 470 0000">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +977 1 470 0000
          </a>
          <a href="mailto:info@besttreksnepal.com" aria-label="Email us at info@besttreksnepal.com">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            info@besttreksnepal.com
          </a>
        </div>
        <div class="top-bar__social" aria-label="Follow us on social media">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://wa.me/9771234567890" aria-label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.946 9.946 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Navbar -->
  <header>
    <nav class="navbar" aria-label="Main navigation" id="navbar">
      <div class="container">
        <div class="navbar__inner">
          <a class="navbar__logo" href="/" aria-label="Best Treks Nepal — Homepage">
            <div class="navbar__logo-text">
              Best Treks Nepal
              <span>Adventure Awaits</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <ul class="navbar__nav" role="list">
            <li class="navbar__nav-item"><a href="/" class="navbar__nav-link">Home</a></li>
            <li class="navbar__nav-item">
              <a href="/destinations.html" class="navbar__nav-link" aria-haspopup="true" aria-expanded="false">
                Destinations
                <svg class="navbar__caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <!-- Mega Menu markup -->
            </li>
            <li class="navbar__nav-item">
              <a href="/treks.html" class="navbar__nav-link" aria-haspopup="true" aria-expanded="false">
                Trek Packages
                <svg class="navbar__caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
              </a>
              <!-- Dropdown markup -->
            </li>
            <li class="navbar__nav-item"><a href="/blog.html" class="navbar__nav-link is-active">Blog</a></li>
            <li class="navbar__nav-item"><a href="/about.html" class="navbar__nav-link">About</a></li>
            <li class="navbar__nav-item"><a href="/contact.html" class="navbar__nav-link">Contact</a></li>
          </ul>

          <div class="navbar__actions">
            <button class="navbar__search-btn" aria-label="Open search" data-search-open type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <a href="/booking.html" class="btn btn--primary btn--sm">Book a Trek</a>
          </div>

          <button class="navbar__hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu" type="button">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</div>
```

---

### Component 1: Article Hero Header with Fact Matrix & Elevation Steps

```html
<header class="article-hero" role="banner">
  <div class="container">

    <!-- Breadcrumbs -->
    <nav class="article-breadcrumbs" aria-label="Breadcrumbs">
      <a href="/">Home</a>
      <span class="article-breadcrumbs-sep">/</span>
      <a href="/blog.html">Himalayan Blog</a>
      <span class="article-breadcrumbs-sep">/</span>
      <a href="/destinations/everest.html">Everest Region</a>
      <span class="article-breadcrumbs-sep">/</span>
      <span class="article-breadcrumbs-current">Everest Base Camp 2026 Guide</span>
    </nav>

    <!-- Credibility & Category Badges -->
    <div class="article-badge-row">
      <span class="article-category-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        Khumbu Field Manual · 2026/2027 Edition
      </span>
      <span class="article-meta-pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        14 Min Comprehensive Read
      </span>
      <span class="article-meta-pill">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Updated: August 2026
      </span>
      <span class="article-meta-pill" style="border:1px solid #10b981; color:#047857; background:#ecfdf5;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        Field Verified by IFMGA Guides
      </span>
      <span class="article-meta-pill" style="border:1px solid #fed7aa; color:#c2410c; background:#fff7ed;">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        98.4% Summit Success Rate
      </span>
    </div>

    <!-- Main Headline -->
    <h1 class="article-main-title">
      Everest Base Camp Trek 2026: The Definitive Guide — Itinerary, Cost, Difficulty &amp; What No One Tells You
    </h1>

    <!-- Author Bar & Social Share Actions -->
    <div class="article-author-bar">
      <div class="article-author-info">
        <img src="/assets/images/team/pasang-sherpa.jpg" alt="Pasang Sherpa — Lead Expedition Leader" class="article-author-avatar" width="48" height="48" loading="eager" decoding="async">
        <div>
          <div class="article-author-name">Pasang Sherpa</div>
          <div class="article-author-role">Lead Expedition Leader · 24+ EBC Summits · UIAGM/NNMGA Certified</div>
        </div>
      </div>

      <div class="article-share-actions">
        <button class="share-btn" onclick="copyArticleLink()" type="button" aria-label="Copy Article Link" id="copyLinkBtn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span>Copy Link</span>
        </button>
        <a class="share-btn" href="https://wa.me/?text=Everest%20Base%20Camp%20Trek%202026%20Definitive%20Guide" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
          <span>WhatsApp</span>
        </a>
        <a class="share-btn" href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <span>Facebook</span>
        </a>
      </div>
    </div>

    <!-- Editorial Lead Paragraphs in Hero -->
    <div style="margin-top: 2rem;">
      <p class="article-lead">
        Standing on the frozen gravel of the Khumbu Glacier at 5,364 meters...
      </p>
      <p style="font-size: 1.05rem; line-height: 1.8; color: var(--art-text-body); margin-bottom: 0;">
        Whether you are planning your first Himalayan expedition or seeking updated 2026 regulations...
      </p>
    </div>

    <!-- Hero 6-Metric Fact Matrix Card -->
    <div class="hero-fact-matrix">
      <div class="hero-fact-item">
        <span class="hero-fact-label">TOTAL DISTANCE</span>
        <span class="hero-fact-val">130 km (80.7 mi)</span>
      </div>
      <div class="hero-fact-item">
        <span class="hero-fact-label">IDEAL DURATION</span>
        <span class="hero-fact-val">12–14 Days</span>
      </div>
      <div class="hero-fact-item">
        <span class="hero-fact-label">MAXIMUM ALTITUDE</span>
        <span class="hero-fact-val">5,545m (Kala Patthar)</span>
      </div>
      <div class="hero-fact-item">
        <span class="hero-fact-label">TRAIL GRADE</span>
        <span class="hero-fact-val">Strenuous (4 / 5)</span>
      </div>
      <div class="hero-fact-item">
        <span class="hero-fact-label">2026 REAL BUDGET</span>
        <span class="hero-fact-val">$1,350 – $1,850 USD</span>
      </div>
      <div class="hero-fact-item">
        <span class="hero-fact-label">ACCLIMATIZATION STOPS</span>
        <span class="hero-fact-val">Namche (3,440m) &amp; Dingboche (4,410m)</span>
      </div>
    </div>

    <!-- Hero Elevation Profile Milestone Matrix Card -->
    <div class="elevation-matrix-card">
      <div class="elevation-matrix-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <span>Key Elevation Profile Milestones</span>
      </div>
      <div class="elevation-stepper">
        <div class="elevation-step-box">
          <div class="elevation-step-name">Lukla Entry</div>
          <div class="elevation-step-alt">2,840m</div>
        </div>
        <div class="elevation-step-box">
          <div class="elevation-step-name">Namche Bazaar</div>
          <div class="elevation-step-alt">3,440m</div>
        </div>
        <div class="elevation-step-box">
          <div class="elevation-step-name">Dingboche</div>
          <div class="elevation-step-alt">4,410m</div>
        </div>
        <div class="elevation-step-box">
          <div class="elevation-step-name">Everest Base Camp</div>
          <div class="elevation-step-alt">5,364m</div>
        </div>
      </div>
    </div>

    <!-- Quick Section Jump Navigation Chips -->
    <div class="hero-jump-nav">
      <div class="hero-jump-title">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
        <span>Jump Directly to Section:</span>
      </div>
      <div class="hero-jump-chips">
        <a href="#expectation-vs-reality" class="hero-jump-chip">1. Expectation vs. Reality</a>
        <a href="#permits-and-regulations" class="hero-jump-chip">2. 2026 Permits &amp; Rules</a>
        <a href="#itinerary-breakdown" class="hero-jump-chip">3. 14-Day Itinerary</a>
        <a href="#cost-breakdown" class="hero-jump-chip">4. Real 2026 Costs</a>
        <a href="#difficulty-and-altitude" class="hero-jump-chip">5. Difficulty &amp; Altitude</a>
        <a href="#what-no-one-tells-you" class="hero-jump-chip">6. 10 Uncensored Secrets</a>
        <a href="#best-seasons" class="hero-jump-chip">7. Best Seasons</a>
        <a href="#gear-checklist" class="hero-jump-chip">8. Packing Checklist</a>
        <a href="#frequently-asked-questions" class="hero-jump-chip">9. FAQ</a>
      </div>
    </div>

  </div>
</header>
```

---

### Component 1.5: Section 1 (Expectation vs. Reality, Comparative Cards & Waymarking)

```html
<section id="expectation-vs-reality">
  <div class="evr-section-header">
    <div class="evr-subbadge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
      <span>Unfiltered Himalayan Truths &amp; Road Realities</span>
    </div>
    <h2>1. Expectation vs. Reality: The Truth About the Road &amp; Trails</h2>
    <p class="evr-intro">
      Introductory historical and regional context clarifying terrain realities...
    </p>
  </div>

  <!-- Inline Editorial Photography Figure -->
  <figure class="article-img-figure">
    <img src="/assets/images/destinations/annapurna.jpg" alt="Description" class="article-inline-img" width="800" height="450" loading="lazy" decoding="async">
    <figcaption class="article-img-caption">Descriptive field caption...</figcaption>
  </figure>

  <!-- 6 Core Comparative Cards (2x3 Grid) -->
  <div class="diff-section-header" style="margin-top: 2.5rem;">
    <div class="diff-subbadge" style="background: #fdf4ff; border-color: #f5d0fe; color: #a21caf;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>6 Critical Trail Realities</span>
    </div>
    <h3>Expectation vs. Reality: 6 Things Every Trekker Must Know</h3>
  </div>

  <div class="evr-cards-grid">
    <!-- Card Template -->
    <div class="evr-card">
      <div class="evr-card-header">
        <div class="evr-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="..."/></svg>
        </div>
        <h4 class="evr-card-title">1. Topic Title</h4>
      </div>
      <div class="evr-card-body">
        <div class="evr-block-myth">
          <div class="evr-block-myth-label">❌ Myth / Expectation</div>
          <div>"Common misconception..."</div>
        </div>
        <div class="evr-block-reality">
          <div class="evr-block-reality-label">✓ Actual Field Reality</div>
          <div>Detailed factual reality with bold metrics and trail specifics...</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Waymarking System Breakdown -->
  <div class="natt-waymark-box">
    <div class="natt-waymark-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <span>Trail Waymarking System: How to Stay 100% Off the Road</span>
    </div>
    <div class="natt-grid">
      <div class="natt-card">
        <div class="natt-badge-row">
          <span class="natt-symbol natt-symbol--red">
            <span class="natt-flag-marker natt-flag-marker--red"></span>
            Red &amp; White Stripes
          </span>
          <span style="font-size: 0.75rem; font-weight: 700; color: #991b1b;">Main Walking Trail</span>
        </div>
        <p style="font-size: 0.88rem; color: #475569; margin: 0; line-height: 1.6;">
          Indicates the primary pedestrian walking route...
        </p>
      </div>
      <div class="natt-card">
        <div class="natt-badge-row">
          <span class="natt-symbol natt-symbol--blue">
            <span class="natt-flag-marker natt-flag-marker--blue"></span>
            Blue &amp; White Stripes
          </span>
          <span style="font-size: 0.75rem; font-weight: 700; color: #1e40af;">High Routes &amp; Side Trips</span>
        </div>
        <p style="font-size: 0.88rem; color: #475569; margin: 0; line-height: 1.6;">
          Indicates alternative high-altitude ridge paths and scenic lookouts...
        </p>
      </div>
    </div>
  </div>

  <!-- Sherpa Pro-Tip Box -->
  <div class="sherpa-tip-box">
    <div class="sherpa-tip-header">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <span>Lead Guide Directive: Master Trail Selection</span>
    </div>
    <div class="sherpa-tip-body">
      Actionable pro-tip with altitude profiles, key passes, and acclimatization guidance...
    </div>
  </div>
</section>
```

---

### Component 1.6: Section 2 (2026 Regulations, Permits & Transit Logistics)

```html
<section id="permits-and-regulations">
  <div class="diff-section-header">
    <div class="diff-subbadge" style="background: #f0fdf4; border-color: #bbf7d0; color: #166534;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      <span>Official 2026/2027 Legal Framework &amp; Tariffs</span>
    </div>
    <h2>2. 2026/2027 Regulations, Permits &amp; Mandatory Guide Directives</h2>
    <p class="diff-intro">
      Introductory regulatory context regarding regional conservation authorities (ACAP, SNP, NTNC, NTB)...
    </p>
  </div>

  <!-- Inline Checkpoint Photo Figure -->
  <figure class="article-img-figure">
    <img src="/assets/images/destinations/mustang.jpg" alt="Description" class="article-inline-img" width="800" height="450" loading="lazy" decoding="async">
    <figcaption class="article-img-caption">Field checkpoint verification caption...</figcaption>
  </figure>

  <!-- Permit Tariffs Table -->
  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th scope="col">Permit Name</th>
          <th scope="col">Issuing Authority</th>
          <th scope="col">2026 Official Fee (NPR / USD)</th>
          <th scope="col">Status &amp; Requirement</th>
          <th scope="col">Where Checked / Validated</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Conservation Area Permit (e.g. ACAP / SNP)</strong></td>
          <td>NTNC / DNPWC</td>
          <td><strong>NPR 3,000</strong> (~$23 USD) + VAT</td>
          <td><span class="permit-status-pill status-mandatory">100% Mandatory</span></td>
          <td>Regional entry checkpoints &amp; park gates</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Mandatory Guide Policy Card -->
  <div class="guide-policy-card">
    <div class="guide-policy-header">
      <div class="guide-policy-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div>
        <h3 class="guide-policy-title">2026 Mandatory Guide Directives &amp; Safety Compliance</h3>
        <span style="font-size: 0.8rem; font-weight: 700; color: #0369a1;">Nepal Tourism Board (NTB) Safety Directives</span>
      </div>
    </div>
    <div class="guide-policy-body">
      <p>Explanation of mandatory guide enforcement, solo trekking restrictions, pulse oximetry checks, and lodge priority...</p>
    </div>
  </div>

  <!-- Transit & Overland Logistics Card Grid -->
  <div class="transit-logistics-box">
    <h3 class="transit-logistics-title">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
      2026 Transit &amp; Mountain Flight Logistics
    </h3>
    <div class="transit-route-grid">
      <!-- Route Card -->
      <div class="transit-route-card">
        <div class="transit-route-header">
          <span class="transit-route-name">Trek Entry: Route Name</span>
          <span class="transit-season-pill pill-entry">Circuit Entry</span>
        </div>
        <p class="transit-route-desc">Transit details, drive times, and road conditions...</p>
        <div class="transit-route-specs">
          <span>⏱️ Duration: 8–9 hrs</span>
          <span>🚙 Vehicle: 4WD Scorpio</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### Component 1.7: Section 3 (14-Day Gold Standard Itinerary Architecture)

```html
<section id="itinerary-breakdown">
  <!-- Section Header & Intro -->
  <div class="diff-section-header">
    <div class="diff-subbadge" style="background: #eff6ff; border-color: #bfdbfe; color: #1d4ed8;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
      <span>14-Day Day-by-Day Field Itinerary &amp; Acclimatization Science</span>
    </div>
    <h2>3. 14-Day Gold Standard Acclimatization Itinerary</h2>
    <p class="diff-intro">
      Acclimatization methodology, altitude ascent ceiling rules, and rest checkpoint logic...
    </p>
  </div>

  <!-- 6-Metric Route Overview Strip -->
  <div class="article-fact-strip" style="margin: 1.5rem 0 2rem;">
    <div class="article-fact-item"><span class="article-fact-label">Total Distance</span><span class="article-fact-val">160–210 km</span></div>
    <div class="article-fact-item"><span class="article-fact-label">Cumulative Ascent</span><span class="article-fact-val">+5,850 m / -6,200 m</span></div>
    <div class="article-fact-item"><span class="article-fact-label">Peak Elevation</span><span class="article-fact-val">5,416 m (Pass)</span></div>
    <div class="article-fact-item"><span class="article-fact-label">Max Sleeping Alt</span><span class="article-fact-val">4,880 m (High Camp)</span></div>
    <div class="article-fact-item"><span class="article-fact-label">Acclimatization Hubs</span><span class="article-fact-val">2 Rest Checkpoints</span></div>
    <div class="article-fact-item"><span class="article-fact-label">Pass Success Rate</span><span class="article-fact-val">98.6% Verified</span></div>
  </div>

  <!-- Interactive Phase Filter Tabs & Controls -->
  <div class="itinerary-header-bar">
    <div class="itinerary-filter-bar" role="tablist" aria-label="Filter Itinerary Phases" style="margin: 0;">
      <button type="button" class="if-tab-btn is-active" data-itin-phase="all" role="tab" aria-selected="true">📋 All 14 Days (14)</button>
      <button type="button" class="if-tab-btn" data-itin-phase="ascent" role="tab" aria-selected="false">🚀 Ascent Phase</button>
      <button type="button" class="if-tab-btn" data-itin-phase="pass" role="tab" aria-selected="false">🏔️ Pass Phase</button>
      <button type="button" class="if-tab-btn" data-itin-phase="descent" role="tab" aria-selected="false">📉 Descent Phase</button>
    </div>
    <button type="button" class="itinerary-toggle-btn" id="toggleItineraryBtn" onclick="toggleAllItineraries()">
      Expand All Stages
    </button>
  </div>

  <!-- 14 Individual Accordion Cards -->
  <div class="itinerary-list" id="itineraryAccordionList">
    <!-- Day Item -->
    <details class="itinerary-item" data-itinerary-phase="ascent" open>
      <summary class="itinerary-summary">
        <div class="itin-summary-main">
          <span class="itin-day-badge">Day 1</span>
          <span class="itin-title-text">Stage Title</span>
          <span class="itin-meta-pill">Elevation · Distance · Time</span>
        </div>
        <svg class="itin-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </summary>
      <div class="itinerary-body">
        <p>Comprehensive route description, cultural sights, terrain, and navigational guidance...</p>
        <div class="itin-stats-grid">
          <div><div class="itin-stat-label">Start Elevation</div><div class="itin-stat-val">1,400m</div></div>
          <div><div class="itin-stat-label">Night Elevation</div><div class="itin-stat-val">1,860m</div></div>
          <div><div class="itin-stat-label">Trail Distance</div><div class="itin-stat-val">Scenic Transfer</div></div>
          <div><div class="itin-stat-label">Lodging</div><div class="itin-stat-val">Alpine Teahouse</div></div>
        </div>
        <div style="font-size:0.85rem; color:#047857; background:#ecfdf5; border-left:3px solid #10b981; padding:0.5rem 0.75rem; border-radius:0 6px 6px 0;">
          <strong>💡 Sherpa Trail Note:</strong> Actionable field advice for this stage.
        </div>
      </div>
    </details>
  </div>
</section>
```

---

### Component 1.8: Section 4 (Real 2026 Cost Breakdown & Teahouse Economics)

```html
<section id="costs-and-budget">
  <!-- Section Header & Intro -->
  <div class="diff-section-header">
    <div class="diff-subbadge" style="background: #fffbeb; border-color: #fde68a; color: #b45309;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
      <span>💰 2026/2027 Himalayan Financial Blueprint &amp; Teahouse Economics</span>
    </div>
    <h2>4. Real 2026 Cost Breakdown: Independent vs. Guided Packages</h2>
    <p class="diff-intro">
      Explanation of altitude price escalation, logistics freight overhead, and teahouse economics...
    </p>
  </div>

  <!-- 3-Tier Comparative Pricing Table -->
  <div class="article-table-wrap">
    <table class="article-table cost-tier-table">
      <thead>
        <tr>
          <th scope="col">Expense Component</th>
          <th scope="col">Guide-Only / Budget Independent</th>
          <th scope="col" style="background: #0b3c40;">Best Treks Standard (All-Inclusive)</th>
          <th scope="col">Luxury VIP Expedition</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Base Trip Cost</strong></td>
          <td>$850 – $1,050 USD</td>
          <td style="background: #f0fdfa;"><span class="tier-price-highlight">$1,150 USD</span></td>
          <td>$1,950 – $2,600 USD</td>
        </tr>
        <!-- Comparative rows: Transport, Teahouses, Meals, Drinks, Guide/Porter, Permits, Medical -->
      </tbody>
    </table>
  </div>

  <!-- Altitude Price Escalation Index -->
  <div class="diff-section-header" style="margin-top: 3rem;">
    <div class="diff-subbadge" style="background: #fef3c7; border-color: #fde68a; color: #92400e;">
      <span>📈 Regional Altitude Inflation Index</span>
    </div>
    <h3>How Daily Prices Escalate with Elevation (2026 Averages)</h3>
  </div>

  <div class="article-table-wrap">
    <table class="article-table">
      <thead>
        <tr>
          <th scope="col">Elevation Zone &amp; Trail Hubs</th>
          <th scope="col">Plate of Dal Bhat (Unlimited)</th>
          <th scope="col">1L Boiled Hot Water</th>
          <th scope="col">Medium Pot Ginger Tea</th>
          <th scope="col">Hot Shower</th>
          <th scope="col">Device Charge</th>
        </tr>
      </thead>
      <tbody>
        <!-- Zone 1 to Zone 4 rows -->
      </tbody>
    </table>
  </div>

  <!-- 6 Hidden Incidentals Grid -->
  <div class="hidden-costs-grid">
    <div class="hidden-cost-card">
      <div class="hidden-cost-header">
        <div class="hidden-cost-title-wrap">
          <div class="hidden-cost-icon">🔋</div>
          <h4 class="hidden-cost-title">Device &amp; Camera Charging</h4>
        </div>
        <span class="hidden-cost-price-badge">$3 – $7 / charge</span>
      </div>
      <p class="hidden-cost-desc">Description of solar limitations and charging fees...</p>
      <div class="hidden-cost-tip">
        <strong>💡 Sherpa Money-Saving Hack:</strong> Field advice on power banks, filters, or offline eSIMs.
      </div>
    </div>
  </div>

  <!-- Interactive Budget Calculator Widget -->
  <div class="budget-calc-card">
    <h3 class="calc-title">Interactive 2026 Budget Calculator</h3>
    <!-- Tier radios, optional extras checkboxes, dynamic total display -->
  </div>
</section>
```

---

### Component 1.9: Section 5 (Difficulty, Training & Clinical Altitude Science)

```html
<section id="thorong-la-safety">
  <!-- Section Header & Intro -->
  <div class="diff-section-header">
    <div class="diff-subbadge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span>🩺 Clinical Altitude Science &amp; High-Pass Conditioning</span>
    </div>
    <h2>5. Pass Anatomy &amp; Altitude Safety</h2>
    <p class="diff-intro">
      Hypobaric hypoxia analysis, sub-zero temperatures, and physical demands...
    </p>
  </div>

  <!-- 4 Core Difficulty Pillars (2x2 Matrix) -->
  <div class="diff-pillars-grid">
    <div class="diff-pillar-card">
      <div class="diff-pillar-header">
        <div class="diff-pillar-icon icon-terrain">🥾</div>
        <h3 class="diff-pillar-title">1. Trail Terrain &amp; Biomechanics</h3>
      </div>
      <p class="diff-pillar-desc">Scree, moraine, steep ascents, joint impact...</p>
      <div class="diff-pillar-stats"><span>Pass Elevation Drop</span><span>-1,656m</span></div>
    </div>
    <div class="diff-pillar-card">
      <div class="diff-pillar-header">
        <div class="diff-pillar-icon icon-volume">⏱️</div>
        <h3 class="diff-pillar-title">2. Sustained Endurance &amp; Volume</h3>
      </div>
      <p class="diff-pillar-desc">Multi-day consecutive walking, 3:30 AM starts...</p>
      <div class="diff-pillar-stats"><span>Pass Day Duration</span><span>8–10 hrs</span></div>
    </div>
    <div class="diff-pillar-card">
      <div class="diff-pillar-header">
        <div class="diff-pillar-icon icon-hypoxia">🌬️</div>
        <h3 class="diff-pillar-title">3. Hypobaric Hypoxia (Oxygen Loss)</h3>
      </div>
      <p class="diff-pillar-desc">Barometric pressure drop and effective O2 reduction...</p>
      <div class="diff-pillar-stats"><span>Summit Oxygen Level</span><span>49% Effective O2</span></div>
    </div>
    <div class="diff-pillar-card">
      <div class="diff-pillar-header">
        <div class="diff-pillar-icon icon-thermal">🌡️</div>
        <h3 class="diff-pillar-title">4. Extreme Sub-Zero Thermal Stress</h3>
      </div>
      <p class="diff-pillar-desc">Pre-dawn wind chill and rapid weather shifts...</p>
      <div class="diff-pillar-stats"><span>Pre-Dawn Wind Chill</span><span>-20°C to -25°C</span></div>
    </div>
  </div>

  <!-- Oxygen Elevation Curve & Barometric Table -->
  <div class="alt-oxygen-card">
    <div class="alt-oxygen-card-header">
      <h3 class="alt-oxygen-card-title">Elevation, Barometric Pressure &amp; Oxygen Depletion Curve</h3>
    </div>
    <div class="article-table-wrap">
      <table class="oxygen-table">
        <!-- Trail station rows with bar tracks and SpO2 readings -->
      </table>
    </div>
  </div>

  <!-- Clinical Altitude Illness Triage (AMS vs. HAPE vs. HACE) -->
  <div class="triage-grid">
    <!-- AMS, HAPE, HACE cards with triage tags and actionable protocols -->
  </div>

  <!-- Interactive Lake Louise AMS Self-Assessment Scorecard Widget -->
  <div class="lake-louise-tool" id="lakeLouiseCalculator">
    <div class="ll-tool-header">
      <h3 class="ll-tool-title">Interactive Lake Louise AMS Self-Assessment Scorecard</h3>
      <div class="ll-score-badge status-green" id="llScoreBadge">
        <div class="ll-score-number" id="llScoreNum">0</div>
        <div class="ll-score-status-text" id="llScoreStatusText">Normal Adaptation</div>
      </div>
    </div>
    <!-- 4 Rubrics: Headache, GI, Fatigue, Dizziness -->
    <div id="llAdvisoryBox" class="ll-advisory-box">
      <!-- Real-time assessment message -->
    </div>
  </div>
</section>
```

---

### Component 1.10: Section 6 ("What No One Tells You" — 10 Uncensored Trail Realities)

```html
<section id="what-no-one-tells-you">
  <!-- Section Header & Intro -->
  <div class="realities-section-header">
    <div class="realities-subbadge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span>2026/2027 Himalayan Field Realities &amp; Sherpa Protocols</span>
    </div>
    <h2>6. "What No One Tells You" — 10 Uncensored Trail Realities</h2>
    <p class="realities-intro">
      Unfiltered truths about unheated lodges, livestock right-of-way, battery drain, and trail logistics...
    </p>
  </div>

  <!-- Thematic Filter Tabs -->
  <div class="realities-filter-bar" role="tablist" aria-label="Filter Trail Realities">
    <button type="button" class="rf-tab-btn is-active" data-reality-cat="all" role="tab" aria-selected="true">📋 All 10 Realities (10)</button>
    <button type="button" class="rf-tab-btn" data-reality-cat="health" role="tab" aria-selected="false">🩺 Health &amp; Altitude (3)</button>
    <button type="button" class="rf-tab-btn" data-reality-cat="lodge" role="tab" aria-selected="false">🏡 Teahouse &amp; Lodge Life (3)</button>
    <button type="button" class="rf-tab-btn" data-reality-cat="safety" role="tab" aria-selected="false">🎒 Trail Safety &amp; Gear (4)</button>
  </div>

  <!-- 2-Column Responsive Cards Grid (10 Realities) -->
  <div class="realities-grid">
    <div class="reality-card" data-cat="safety">
      <div class="reality-card-header">
        <div class="reality-badge-group">
          <div class="reality-num-pill">01</div>
          <span class="reality-cat-pill cat-safety">💨 Wind &amp; Weather</span>
        </div>
        <span class="reality-priority-pill pri-critical">Severe Gale Warning</span>
      </div>
      <h3 class="reality-card-title">💨 Reality Title</h3>
      <p class="reality-card-desc">Detailed explanation of the trail reality and common pitfalls...</p>
      <div class="sherpa-protocol-box">
        <strong>💡 Sherpa Protocol:</strong> Actionable, life-saving field instructions.
      </div>
    </div>
    <!-- Realities 02 through 10 -->
  </div>

  <!-- Master Sherpa Trail Code Callout Banner -->
  <div class="sherpa-code-card">
    <div class="scc-header">
      <span class="scc-badge">🏔️ The Himalayan Golden Trinity</span>
      <h3>The 3 Non-Negotiable Sherpa Trail Rules</h3>
    </div>
    <div class="scc-grid">
      <div class="scc-rule">
        <div class="scc-rule-num">Rule #1 · Caravan Safety</div>
        <h4>Always Hug the Mountain Wall</h4>
        <p>When livestock or porter caravans approach, step to the cliff side immediately.</p>
      </div>
      <div class="scc-rule">
        <div class="scc-rule-num">Rule #2 · Thermal Radiator</div>
        <h4>Boiled Nalgene Bed Warmers</h4>
        <p>Fill two 1L Nalgene bottles with boiling water after dinner and place inside sleeping bag footbox.</p>
      </div>
      <div class="scc-rule">
        <div class="scc-rule-num">Rule #3 · Next-Day Fuel</div>
        <h4>Order Breakfast Before Sleeping</h4>
        <p>Write down breakfast order with guide at 8:00 PM to ensure on-time 7:00 AM departures.</p>
      </div>
    </div>
  </div>
</section>
```

---

### Component 1.11: Section 7 (Best Seasons & 12-Month Climate Analysis)

```html
<section id="best-seasons">
  <!-- Section Header & Intro -->
  <div class="season-section-header">
    <div class="season-subbadge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      <span>🗓️ 2026/2027 Meteorological Intel &amp; Climate Windows</span>
    </div>
    <h2>7. Best Seasons &amp; 12-Month Climate Analysis</h2>
    <p class="season-section-intro">
      Dual microclimates, rainshadow dynamics, and seasonal weather patterns...
    </p>
  </div>

  <!-- 4 Primary Seasonal Cards (2x2 Grid) -->
  <div class="season-cards-grid">
    <div class="season-card season-autumn">
      <div class="season-card-top">
        <span class="season-tag-pill tag-autumn">⭐ #1 Peak Season</span>
        <h3 class="season-card-title">🍂 Autumn (Post-Monsoon)</h3>
        <span class="season-months-badge">September, October &amp; November</span>
      </div>
      <div class="season-stats-grid">
        <div class="season-stat-item"><span class="season-stat-label">Day/Night Temp</span><span class="season-stat-value">+12°C / -8°C</span></div>
        <div class="season-stat-item"><span class="season-stat-label">Sky Clarity</span><span class="season-stat-value">99% Panorama</span></div>
      </div>
      <div class="season-card-body">
        <p>Crisp, deep-blue skies and unmatched panoramic clarity...</p>
      </div>
      <div class="season-verdict-bar">
        <span class="verdict-rating">⭐⭐⭐⭐⭐ 10 / 10</span>
        <span class="verdict-tag">Ideal for Photographers &amp; First-Timers</span>
      </div>
    </div>
    <!-- Spring, Winter, Monsoon Cards -->
  </div>

  <!-- Master 12-Month Climate Matrix Table -->
  <div class="climate-matrix-wrapper">
    <div class="climate-matrix-header">
      <div class="cmh-title-box">
        <h3>📊 12-Month Regional Meteorological Matrix</h3>
        <span>Historical weather data recorded at mid and high alpine stations</span>
      </div>
      <div class="climate-tab-btns" role="tablist" aria-label="Filter Months by Season">
        <button type="button" class="cl-month-tab is-active" data-season-filter="all" role="tab" aria-selected="true">All 12 Months</button>
        <button type="button" class="cl-month-tab" data-season-filter="autumn" role="tab" aria-selected="false">🍂 Autumn</button>
        <button type="button" class="cl-month-tab" data-season-filter="spring" role="tab" aria-selected="false">🌸 Spring</button>
        <button type="button" class="cl-month-tab" data-season-filter="winter" role="tab" aria-selected="false">❄️ Winter</button>
        <button type="button" class="cl-month-tab" data-season-filter="monsoon" role="tab" aria-selected="false">🌧️ Monsoon</button>
      </div>
    </div>
    <div class="climate-table-container">
      <table class="climate-12m-table" id="climate12mTable">
        <!-- 12 month rows with data-season attributes -->
      </table>
    </div>
  </div>
</section>
```

---

### Component 1.12: Section 8 (4-Layer Alpine Gear & Interactive Packing Checklist)

```html
<section id="packing-checklist">
  <!-- Section Header & Intro -->
  <div class="gear-section-header">
    <div class="gear-subbadge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      <span>2026/2027 Himalayan Field Packing Blueprint</span>
    </div>
    <h2>8. 4-Layer Gear &amp; Interactive Packing Checklist</h2>
    <p class="gear-section-intro">
      Thermal defense system and trail luggage weight management...
    </p>
  </div>

  <!-- Weight & Luggage Allocation Matrix (2 Cards) -->
  <div class="gear-weight-matrix">
    <div class="weight-card">
      <div class="weight-card-header">
        <div class="weight-icon">🧳</div>
        <div>
          <h4>Main Porter Duffel Bag</h4>
          <span class="weight-tag">Weight Limit: 10 – 12 kg (22 – 26 lbs)</span>
        </div>
      </div>
      <p>Carried between mountain teahouses by Sherpa porters...</p>
    </div>
    <div class="weight-card">
      <div class="weight-card-header">
        <div class="weight-icon">🎒</div>
        <div>
          <h4>Trekker Technical Daypack</h4>
          <span class="weight-tag">Weight Limit: 4 – 5 kg (9 – 11 lbs)</span>
        </div>
      </div>
      <p>Carried on your back continuously with daily essentials...</p>
    </div>
  </div>

  <!-- 4-Layer System Grid -->
  <div class="layer-system-wrap">
    <div class="layers-grid">
      <!-- Layer 1: Merino Base (200-260 gsm) -->
      <!-- Layer 2: Active Mid-Layer (Grid Fleece / Active Synthetic) -->
      <!-- Layer 3: Heavy Expedition Down (-15°C to -20°C Rated) -->
      <!-- Layer 4: Hard Shell Storm Barrier (3-Layer GORE-TEX Pro) -->
    </div>
  </div>

  <!-- Master Interactive Packing Checklist Widget (36 Essentials) -->
  <div class="packing-checklist-container">
    <div class="checklist-header-card">
      <!-- Progress Bar + Counter (e.g. 0/36, 0% Packed) -->
      <!-- Filter Tabs: Clothing (10), Footwear (7), Sleeping (5), Tech (6), Medical (8), All (36) -->
      <!-- Action Buttons: Select All, Reset, Print -->
    </div>
    <div class="checklist-categories-list" id="trekkingGearChecklist">
      <!-- 5 Categorized sections with checkboxes and tags -->
    </div>
  </div>
</section>
```

---

### Component 1.13: Section 9 (Comprehensive FAQ Accordion)

```html
<section id="faqs">
  <!-- Section Header & Intro -->
  <div class="diff-section-header">
    <div class="diff-subbadge" style="background: #f0fdfa; border-color: #99f6e4; color: #0f766e;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <span>Essential Field FAQ · 2026/2027 Intelligence</span>
    </div>
    <h2>9. Frequently Asked Questions (FAQ)</h2>
    <p class="diff-intro">
      Field-tested answers to the 10 most critical logistical and safety questions...
    </p>
  </div>

  <!-- Interactive Header Bar with Expand / Collapse All Button -->
  <div class="itinerary-header-bar" style="margin-top: 1rem;">
    <span style="font-size:0.85rem; font-weight:700; color:var(--art-teal);">💡 Click any question to reveal details</span>
    <button type="button" class="itinerary-toggle-btn" id="toggleFaqBtn" onclick="toggleAllFAQs()">
      Expand All FAQs
    </button>
  </div>

  <!-- 10 Accessible FAQ Accordion Items -->
  <div class="article-faq-list" id="faqAccordionList">
    <details class="article-faq-item" open>
      <summary class="article-faq-question">
        <span>1. Question Title?</span>
        <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </summary>
      <div class="article-faq-answer">
        <strong>Comprehensive Answer:</strong> Clear, actionable, and definitive expert intelligence.
      </div>
    </details>
    <!-- FAQs 2 through 10 -->
  </div>
</section>
```

---

### Component 2: Sticky Companion Sidebar with Collapsible TOC & Booking Widget

```html
<aside class="article-sidebar" aria-label="Article companion sidebar">
  <div class="sidebar-sticky-wrap">

    <!-- Table of Contents Card (Collapsible - Closed by default) -->
    <details class="sidebar-card sidebar-card--collapsible">
      <summary class="sidebar-card-summary">
        <h3 class="sidebar-card-title" style="display:flex; align-items:center; gap:0.45rem;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          <span>In This Field Guide</span>
        </h3>
        <svg class="sidebar-card-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </summary>
      <nav class="toc-list" id="sidebarTocList" aria-label="Table of Contents">
        <a href="#expectation-vs-reality" class="toc-link is-active">1. Expectation vs. Reality</a>
        <a href="#permits-and-regulations" class="toc-link">2. 2026 Permits &amp; Rules</a>
        <a href="#itinerary-breakdown" class="toc-link">3. 14-Day Itinerary</a>
        <a href="#cost-breakdown" class="toc-link">4. Real 2026 Costs</a>
        <a href="#difficulty-and-altitude" class="toc-link">5. Difficulty &amp; Altitude</a>
        <a href="#what-no-one-tells-you" class="toc-link">6. 10 Uncensored Secrets</a>
        <a href="#best-seasons" class="toc-link">7. Best Seasons &amp; Weather</a>
        <a href="#gear-checklist" class="toc-link">8. Gear Checklist</a>
        <a href="#frequently-asked-questions" class="toc-link">9. FAQs</a>
      </nav>
    </details>

    <!-- Quick Booking Widget Card -->
    <div class="trek-booking-widget">
      <span class="tbw-badge">⭐ #1 Ranked Expedition</span>
      <h4 class="tbw-title">Everest Base Camp Trek (14 Days)</h4>
      <p style="font-size:0.84rem; color:#cbd5e1; margin-bottom:0.85rem; line-height:1.6;">
        Lukla Flights · Native Sherpa Guide · All Teahouses &amp; 3 Meals Daily
      </p>

      <div class="tbw-checklist">
        <div class="tbw-check-item"><span>✓</span> 100% Guaranteed Permit Clearances</div>
        <div class="tbw-check-item"><span>✓</span> Mandatory Licensed Guide Included</div>
        <div class="tbw-check-item"><span>✓</span> Free Date Rescheduling Guarantee</div>
        <div class="tbw-check-item"><span>✓</span> 98.4% Summit / Base Camp Success</div>
      </div>

      <div class="tbw-price-box">
        <div class="tbw-price">$1,350</div>
        <div class="tbw-price-sub">USD / person (All-Inclusive)</div>
      </div>

      <a href="/booking.html?trek=everest-base-camp" class="tbw-btn">
        Book All-Inclusive Trek Package →
      </a>
      <a href="https://wa.me/9779851000000?text=Hi%20Best%20Treks%20Nepal,%20I'm%20interested%20in%20the%20Everest%20Base%20Camp%20Trek." class="tbw-btn-whatsapp" target="_blank" rel="noopener noreferrer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.946 9.946 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
        <span>Chat with Lead Guide</span>
      </a>
    </div>

  </div>
</aside>
```

---

### Component 3: Standalone Author Bio Section (Above Related Guides)

```html
<section class="article-author-section container">
  <div class="article-author-box-card">
    <div class="article-author-box-inner">
      <div class="author-avatar-wrap">
        <img src="/assets/images/team/pasang-sherpa.jpg" alt="Lakpa Sherpa" class="author-box-avatar" width="110" height="110" loading="lazy">
        <div class="author-verified-badge" title="Government Certified &amp; Verified Guide">✓</div>
      </div>
      <div class="author-box-content">
        <div class="author-header-top">
          <div class="author-box-name">Lakpa Sherpa</div>
          <span class="author-cert-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            NNMGA &amp; WFR Certified
          </span>
        </div>
        <div class="author-box-role">Lead High-Altitude Expedition Leader · Best Treks Nepal</div>

        <!-- Stats & Experience Row -->
        <div class="author-stats-row">
          <span class="author-stat-pill">🏔️ 16+ Larkya La Crossings</span>
          <span class="author-stat-pill">⏳ 14+ Years in Himalayas</span>
          <span class="author-stat-pill">👥 450+ Safe Clients</span>
          <span class="author-stat-pill">⭐ 5.0 Guide Rating (94 Reviews)</span>
        </div>

        <p class="author-box-bio">
          Lakpa was born and raised in the high Himalayas of Solukhumbu and has led over 35 alpine expeditions across the Manaslu Restricted Area, Sacred Tsum Valley, Nar-Phu, and Everest. Trained in advanced wilderness trauma response, high-altitude pulse oximetry, and speaking fluent Tibetan and local Nupri dialects, Lakpa ensures an authentic, culturally immersive, and medically secure journey.
        </p>

        <!-- Actions Row -->
        <div class="author-actions-row">
          <a href="https://wa.me/9779851000000?text=Hi%20Lakpa,%20I'm%20planning%20a%20trek" target="_blank" rel="noopener noreferrer" class="author-btn-whatsapp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.301-.775.979-.95 1.179-.175.2-.35.226-.65.076-.301-.15-1.27-.468-2.42-1.493-.894-.799-1.5-1.785-1.675-2.086-.175-.3-.019-.462.13-.612.135-.136.301-.351.451-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.675-1.628-.925-2.23-.244-.587-.492-.507-.675-.516-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.301-1.05 1.028-1.05 2.507 0 1.479 1.076 2.908 1.226 3.109.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.713.634.721.229 1.377.197 1.895.12.577-.087 1.78-.727 2.03-1.429.25-.702.25-1.303.175-1.429-.075-.125-.275-.2-.576-.35zM12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.66 1.442 5.174L2 22l4.98-1.396A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
            Ask Lead Guide on WhatsApp
          </a>
          <a href="/booking.html" class="author-btn-plan">
            Plan Your Trek With Lead Guide →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### Component 3.5: Related Himalayan Guides Section

```html
<section class="related-articles-section">
  <div class="container">
    <div class="diff-subbadge" style="background:#eff6ff; border-color:#bfdbfe; color:#1d4ed8;">
      <span>Explore Other Routes</span>
    </div>
    <h2 style="font-size:clamp(1.7rem, 3vw, 2.2rem); font-weight:800; color:#0f172a; margin:0 0 0.5rem;">
      Related Himalayan Field Guides
    </h2>
    <p style="color:#64748b; font-size:0.95rem; margin:0 0 2rem;">
      Dive into detailed breakdowns of other premier trekking destinations across Nepal.
    </p>

    <div class="related-grid">
      <!-- 3 Related Guide Cards -->
    </div>
  </div>
</section>
```

---

### Component 3.6: Grand Article CTA Banner (`.article-cta-banner`)

> [!IMPORTANT]
> To prevent CSS specificity conflicts where generic page typography styles (`p { color: #334155 }`) darken banner text, always enforce explicit high-contrast white/light styling on `.article-cta-banner`, `.article-cta-banner h2`, and `.article-cta-banner p`.

```html
<section style="padding: 4.5rem 1.5rem; max-width: 1100px; margin: 0 auto;" aria-label="Book Trek">
  <div class="article-cta-banner">
    <span class="diff-subbadge" style="background:rgba(200,169,107,0.2); border-color:rgba(200,169,107,0.4); color:#fef08a; margin-bottom:1rem;">
      🏔️ 100% Guaranteed Clearances &amp; Logistics
    </span>
    <h2>
      Ready to Experience the Himalayas in 2026?
    </h2>
    <p>
      Join Best Treks Nepal for an unforgettable all-inclusive expedition. Certified Sherpa guides, guaranteed permits, and 100% financial security.
    </p>

    <!-- 4-Pillar Trust Grid -->
    <div class="cta-trust-grid">
      <div class="cta-trust-card">
        <div class="cta-trust-title">🛡️ 100% Approval Guarantee</div>
        <p class="cta-trust-desc">Government-registered agency #1084 with zero permit rejection rate across 4,200+ trekkers.</p>
      </div>
      <div class="cta-trust-card">
        <div class="cta-trust-title">⏱️ 24-48h Fast-Track</div>
        <p class="cta-trust-desc">Direct daily courier liaison with Department of Immigration and NTB counters in Kathmandu &amp; Pokhara.</p>
      </div>
      <div class="cta-trust-card">
        <div class="cta-trust-title">👨‍✈️ Certified Sherpa Guides</div>
        <p class="cta-trust-desc">Mandatory English-fluent, wilderness first-aid certified local guides assigned to every trek.</p>
      </div>
      <div class="cta-trust-card">
        <div class="cta-trust-title">💰 Zero Hidden Surcharges</div>
        <p class="cta-trust-desc">All government royalties, conservation taxes, insurance, and municipal fees fully included upfront.</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap; align-items:center;">
      <a href="/booking.html?trek=TREK_SLUG" class="cta-btn-primary">
        <span>Book All-Inclusive Trek ($PRICE)</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="https://wa.me/9779851000000?text=Hi%20Best%20Treks%20Nepal,%20I'm%20interested%20in%20trekking."
        class="cta-btn-whatsapp" target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.946 9.946 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
        </svg>
        <span>Chat with Lead Guide</span>
      </a>
      <a href="/contact.html?subject=Custom+Trip+Inquiry" class="cta-btn-secondary">
        <span>Custom Dates &amp; Itinerary</span>
      </a>
    </div>

    <div style="margin-top:2rem; font-size:0.78rem; color:#94a3b8; line-height:1.6;">
      🏛️ Official Licensed Agency #1084 · TAAN &amp; NTB Accredited · 100% Guaranteed Permit Clearances
    </div>
  </div>
</section>
```

---

### Component 4: Standard Global 4-Column Footer

```html
<footer class="footer" role="contentinfo" aria-label="Site footer">
  <div class="container">
    <div class="footer__grid">-stat-pill">⭐ 5.0 Guide Rating (94 Reviews)</span>
          </div>

          <p class="author-box-bio">
            Lakpa was born and raised in the high Himalayas of Solukhumbu and has led over 35 alpine expeditions across the Manaslu Restricted Area, Sacred Tsum Valley, Nar-Phu, and Everest. Trained in advanced wilderness trauma response, high-altitude pulse oximetry, and speaking fluent Tibetan and local Nupri dialects, Lakpa ensures an authentic, culturally immersive, and medically secure journey.
          </p>

          <!-- Actions Row -->
          <div class="author-actions-row">
            <a href="https://wa.me/9771234567890?text=Hi%20Lakpa,%20I'm%20planning%20a%20trek" target="_blank" rel="noopener noreferrer" class="author-btn-whatsapp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.979-.275-.1-.475-.15-.675.15-.2.301-.775.979-.95 1.179-.175.2-.35.226-.65.076-.301-.15-1.27-.468-2.42-1.493-.894-.799-1.5-1.785-1.675-2.086-.175-.3-.019-.462.13-.612.135-.136.301-.351.451-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.675-1.628-.925-2.23-.244-.587-.492-.507-.675-.516-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.301-1.05 1.028-1.05 2.507 0 1.479 1.076 2.908 1.226 3.109.15.2 2.118 3.234 5.132 4.536.717.31 1.277.495 1.713.634.721.229 1.377.197 1.895.12.577-.087 1.78-.727 2.03-1.429.25-.702.25-1.303.175-1.429-.075-.125-.275-.2-.576-.35zM12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.66 1.442 5.174L2 22l4.98-1.396A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
              Ask Lead Guide on WhatsApp
            </a>
            <a href="/booking.html" class="author-btn-plan">
              Plan Your Trek With Lead Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### Component 4: Standard Global 4-Column Footer

```html
<footer class="footer" role="contentinfo" aria-label="Site footer">
  <div class="container">
    <div class="footer__grid">

      <!-- Column 1: Brand -->
      <div class="footer__brand">
        <a class="footer__logo" href="/" aria-label="Best Treks Nepal — Homepage">
          <div class="footer__logo-text">
            Best Treks Nepal
            <span>Adventure Awaits</span>
          </div>
        </a>
        <p class="footer__desc">
          Nepal's trusted trekking company, crafting unforgettable Himalayan
          adventures since 2009. Licensed, expert, and passionate about Nepal.
        </p>
        <div class="footer__social" aria-label="Social media links">
          <a href="https://www.facebook.com/besttreksnepal" class="footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.instagram.com/besttreksnepal" class="footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://youtube.com/besttreksnepal" class="footer__social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="#0F5257" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
          </a>
          <a href="https://wa.me/9771234567890" class="footer__social-link" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.946 9.946 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
          </a>
        </div>
      </div>

      <!-- Column 2: Quick Links -->
      <div>
        <h3 class="footer__col-title">Quick Links</h3>
        <nav class="footer__links" aria-label="Footer quick links">
          <a href="/" class="footer__link">Home</a>
          <a href="/about.html" class="footer__link">About Us</a>
          <a href="/gallery.html" class="footer__link">Gallery</a>
          <a href="/blog.html" class="footer__link">Blog</a>
          <a href="/faq.html" class="footer__link">FAQ</a>
          <a href="/contact.html" class="footer__link">Contact</a>
          <a href="/booking.html" class="footer__link">Book a Trek</a>
        </nav>
      </div>

      <!-- Column 3: Destinations -->
      <div>
        <h3 class="footer__col-title">Destinations</h3>
        <nav class="footer__links" aria-label="Footer destination links">
          <a href="/destinations/everest.html" class="footer__link">Everest Region</a>
          <a href="/destinations/annapurna.html" class="footer__link">Annapurna Region</a>
          <a href="/destinations/langtang.html" class="footer__link">Langtang Region</a>
          <a href="/destinations/manaslu.html" class="footer__link">Manaslu Region</a>
          <a href="/destinations/mustang.html" class="footer__link">Mustang</a>
          <a href="/destinations/dolpo.html" class="footer__link">Dolpo</a>
          <a href="/destinations/kanchenjunga.html" class="footer__link">Kanchenjunga</a>
        </nav>
      </div>

      <!-- Column 4: Contact -->
      <div>
        <h3 class="footer__col-title">Contact Us</h3>
        <address style="font-style:normal;">
          <div class="footer__contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Thamel, Kathmandu, Nepal
          </div>
          <div class="footer__contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.12 1.18l3-.017a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <a href="tel:+97714700000">+977 1 470 0000</a>
          </div>
          <div class="footer__contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:info@besttreksnepal.com">info@besttreksnepal.com</a>
          </div>
          <div class="footer__contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Response within 24 hours
          </div>
        </address>
      </div>

    </div><!-- /footer__grid -->

    <div class="footer__bottom">
      <div class="footer__bottom-inner">
        <p class="footer__copyright">
          &copy; <span data-year></span> Best Treks Nepal. All rights reserved.
          Registered with Nepal Tourism Board.
        </p>
        <nav class="footer__bottom-links" aria-label="Legal links">
          <a href="/privacy-policy.html" class="footer__bottom-link">Privacy Policy</a>
          <a href="/terms.html" class="footer__bottom-link">Terms &amp; Conditions</a>
          <a href="/sitemap.xml" class="footer__bottom-link">Sitemap</a>
        </nav>
      </div>
    </div>
  </div>
</footer>
```

---

### Component 5: Complete JSON-LD Structured Data Schema Graph

Every article guide must embed a `@graph` array containing:
1. `Article`: Headline, description, images, author (`Person`), publisher (`Organization`), word count, and published/modified dates.
2. `BreadcrumbList`: 4-tier hierarchy (`Home` > `Himalayan Blog` > `[Region] Destination` > `[Article Title]`).
3. `FAQPage`: All 10 FAQ questions and accepted answers mirrored directly for Google rich search results.

---

## 4. Interactive JavaScript Modules Summary

Ensure every article includes the complete suite of interactive client modules:
1. **Dynamic Year Updater**: `document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());`
2. **Module Script Import**: `<script type="module" src="/assets/js/main.js"></script>` to power mega-menus, mobile menu drawer, search modal dialog, and dropdown carets.
3. **Reading Progress Bar Tracker**: Listens to window scroll and updates `#readingProgress` width in real-time.
4. **Precision 95px Header Offset Smooth Navigation**: All `.toc-link` and `.hero-jump-chip` anchors use smooth scrolling with exact 95px clearance, immediate active state updates, URL hash sync via `history.pushState`, target section highlight animation (`.section-target-highlight`), and auto-expansion of primary FAQ accordions on click.
5. **Dynamic TOC Scrollspy**: Observes active sections during natural window scrolling and dynamically syncs the active `.toc-link.is-active`.
6. **Copy Link Action**: Copies current page URL to clipboard with fallback `document.execCommand('copy')` and triggers `#copy-toast`.
7. **Interactive 2026 Budget Calculator (Section 4)**: Calculates base package + optional extras in real-time with dynamic cash advice in NPR and USD.
8. **Interactive Lake Louise AMS Scorecard (Section 5)**: Calculates total score (0 to 12) from Headache, GI, Fatigue, and Dizziness ratings with dynamic clinical triage badges.
9. **Interactive Realities Filter Tabs (Section 6)**: Thematic filtering by Category (`all`, `logistics`, `safety`, `culture`, `comfort`, `lodge`, `health`, `gear`).
10. **Interactive 12-Month Climate Filter (Section 7)**: Table row filtering by Season (`all`, `autumn`, `spring`, `winter`, `monsoon`).
11. **Interactive Packing Checklist Controller (Section 8)**: 36-item checklist across 5 categories with real-time percentage progress bar, auto-check styling, and persistent `localStorage` support.
12. **Itinerary & FAQ Expand / Collapse All**: Single-click master toggles for all 14 itinerary stages (`toggleAllItineraries()`) and all 10 FAQ accordions (`toggleAllFAQs()`).

---

## 5. Quality & Compliance Checklist

Before publishing any new article guide, verify:
- [ ] Links all **9 CSS partials in exact sequence** without omission or reordering.
- [ ] Master navigation uses `.top-bar__contacts` (with `s`) and imports `/assets/js/main.js`.
- [ ] Uses **Poppins** for headings and **Inter** for body copy.
- [ ] Hero Header contains the **6-Metric Fact Matrix**, **Elevation Milestones**, and **Jump Navigation Chips**.
- [ ] Section 1 implements the **6-card Comparative Grid (2x3)** with SVG icons, myth (`❌`) vs reality (`✓`) badges, inline editorial photography figure, and trail waymarking system.
- [ ] Subbadges across all 9 sections use crisp **vector SVG icons** instead of raw unicode characters.
- [ ] Sidebar Table of Contents is **collapsible, closed by default**, and opens on click with animated chevron rotation.
- [ ] Companion Sidebar is **sticky** (`align-self: start; position: sticky; top: calc(var(--header-offset, 95px) + 15px);`) with `.tbw-checklist`, `.tbw-price-box`, and dual booking/WhatsApp buttons.
- [ ] Author Bio card includes a **verified lead guide checkmark badge**, **4-metric experience bar**, and **direct WhatsApp + booking CTAs**.
- [ ] Grand Article CTA Banner enforces **high-contrast typography** (`.article-cta-banner p { color: #e2e8f0 !important; }`), a **4-pillar trust grid** (`.cta-trust-grid`), shimmering gold badge, and styled WhatsApp/booking action buttons.
- [ ] Footer follows the **global 4-column layout** (`.footer__brand`, `.footer__desc`, `.footer__social-link`, `.footer__links`, `.footer__contact-item`).
- [ ] JSON-LD `@graph` structured data contains `Article`, `BreadcrumbList`, and `FAQPage` entities.
- [ ] All interactive calculators, filters, checklists, and expand/collapse toggles execute cleanly with zero console errors.

