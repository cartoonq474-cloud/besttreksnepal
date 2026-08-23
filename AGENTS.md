# Best Treks Nepal — AGENTS.md

## Quickstart

- **Dev server**: `npm run dev` (or `npx serve . --listen 3000 --no-clipboard`)
- Open http://localhost:3000
- No build step. Edit HTML/CSS/JS files directly; changes are live immediately.

## Project structure

- `/` — root HTML: `index.html`, `about.html`, `contact.html`, `blog.html`, `destinations.html`, `treks.html`
- `/treks/` — 33 trek package pages (e.g. `everest-base-camp.html`)
- `/destinations/` — 8 region pages (e.g. `everest.html`)
- `/assets/css/` — 9 partials: `reset.css`, `variables.css`, `typography.css`, `layout.css`, `components.css`, `animations.css`, `utilities.css`, `responsive.css`, `style.css` (all included on every page)
- `/assets/js/` — 13 scripts: `main.js`, `booking.js`, `counter.js`, `destinations.js`, `faq.js`, `filter.js`, `gallery.js`, `lazyload.js`, `navbar.js`, `search.js`, `slider.js`, `utils.js`, `animation.js`
- `/assets/images/` — hero images, destination thumbnails, trek images, social icons

## Adding a new trek page

1. Copy an existing trek HTML (e.g. `treks/everest-base-camp.html`) to `treks/new-trek.html`
2. Update `<title>`, meta description, and og tags at the top of `<head>`
3. Update the trek card data attributes in the body:
   - `data-region`, `data-difficulty`, `data-duration`, `data-price`, `data-season`
   - Image: `src="/assets/images/treks/NEW-TREK.jpg"`
4. Update page-specific styles in the `<style>` block (colors, dimensions)
5. Update structured data `@type`/`@graph` if needed (see existing pages for pattern)
6. Add/remove trek-card entries in the Popular Treks section of `index.html` and `treks.html` if you want it featured

## Adding a new destination page

1. Copy an existing destination HTML (e.g. `destinations/everest.html`) to `destinations/new-region.html`
2. Update `<title>`, meta description, and og tags
3. Update the mega menu reference in `index.html` / `treks.html` navbar if you want it in the Destinations menu
4. Update destination thumbnails in the mega menu grid (images at `/assets/images/destinations/`)

## CSS stylesheet inclusion

Every page links all 9 CSS files in this order:

```
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

Do NOT reorder or remove any of these. `style.css` may contain overrides; the partials are the foundation.

## Structured Data (JSON-LD)

Each page includes a `<script type="application/ld+json">` block in `<head>`. The pattern is:

- **Home/index**: Organization + WebSite + FAQPage schema — `@graph` array with 3 entries
- **Trek pages**: `TouristTrip` as single `@type` — no `@graph`, no `@context` reordering
- **Destination pages**: `TouristDestination` as single `@type` — no `@graph`, no `@context` reordering
- **About page**: `LocalBusiness` as single `@type`

Do not mix `@graph` with single `@type` pages. Each page type uses its own distinct schema structure.

## Navigation consistency

- The navbar (`/assets/js/navbar.js`) and mobile menu (`/assets/js/navbar.js`) are shared across all pages.
- The mega menu for Destinations is built in `index.html` / `treks.html`. If adding a new destination region, add a `<a>` entry in the mega menu grid (under `.mega-menu__regions-section`) with `href="/destinations/NEW-REGION.html"`.
- The Popular Treks dropdown in the navbar lists trek packages. Add/remove `<a class="dropdown__item">` entries in `index.html` / `treks.html` to match the treks directory.

## Images

- Hero background images: placed at root level, referenced as `26f4c9c059a14b185b70a8e66f6ea60f.jpg` etc. in `index.html`.
- Trek destination images: `/assets/images/treks/XXXX.jpg`
- Destination thumbnails: `/assets/images/destinations/XXXX.jpg`
- All `<img>` tags should include `alt` and `loading="lazy"` (per existing convention).
- Favicon: `/assets/images/icons/favicon.ico` (root-level), also `/assets/images/icons/favicon-32.png`, `/assets/images/icons/apple-touch-icon.png`