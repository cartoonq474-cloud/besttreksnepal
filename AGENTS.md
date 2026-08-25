# Best Treks Nepal — Agent Guide

## Quickstart

- Install dependencies with `npm install`.
- Start the site with `npm run dev` or `npm start`, then open `http://localhost:3000`.
- `npm run build` is a no-op confirmation because this is a static site; there is no `npm test` script.
- Use HTTP for testing. Root-absolute URLs and ES modules do not work reliably when opening HTML with `file://`.
- One-off audits live in `scratch/`; inspect scripts before running them because some rewrite HTML files.

## Working Rules

- Make focused edits and preserve the existing static HTML/CSS/ES-module architecture.
- Use `assets/css/style.css` as the shared CSS entry point and `assets/js/main.js` as the shared JavaScript bootstrap.
- Keep page-specific styles and scripts inline when following the existing page template.
- Use root-absolute site and asset URLs such as `/assets/...`, `/treks/...`, and `/destinations/...`.
- Keep `alt` text and `loading="lazy"` on images, following the existing convention.
- Forms are browser-simulated only; there is no backend or API submission.

## Validation

- Run `npm run build` for the baseline static-site check.
- Use targeted Node scripts in `scratch/` for audits, especially `node scratch/audit_urls.js`.
- For visual or interaction checks, run the dev server first and test the page over HTTP.
- There is no stable automated test suite in `package.json`; Puppeteer-based checks may require separate local installation.

## Project structure

- Root HTML contains the home and utility pages such as `index.html`, `treks.html`, and `blog.html`.
- `/treks/` contains trek package pages; use `treks/everest-base-camp.html` as the representative template.
- `/destinations/` contains regional pages; use `destinations/everest.html` as the representative template.
- `/blog/` contains long-form articles; use `blog/everest-base-camp-complete-guide.html` as the representative template.
- `/assets/css/` contains design tokens, reset, typography, layout, components, utilities, animations, and responsive styles. `style.css` imports these in cascade order; do not add styles directly to it.
- `/assets/js/main.js` imports and conditionally initializes shared modules, including `navbar.js`, `booking.js`, `faq.js`, `gallery.js`, `search.js`, `filter.js`, `cookie.js`, and `whatsapp.js`.
- `/assets/images/` is organized into folders such as `treks`, `destinations`, `hero`, `logo`, `icons`, `team`, and `csi`.

## Adding a new trek page

1. Copy an existing trek HTML (e.g. `treks/everest-base-camp.html`) to `treks/new-trek.html`
2. Update `<title>`, meta description, and og tags at the top of `<head>`
3. Update the trek card data attributes in the body:
   - `data-region`, `data-difficulty`, `data-duration`, `data-price`, `data-season`
   - Image: `src="/assets/images/treks/NEW-TREK.jpg"`
5. Update page-specific styles in the `<style>` block when the page needs trek-specific presentation.
6. Preserve the trek page's `TouristTrip` JSON-LD shape; do not convert it to the home page's `@graph` format.
7. Add or remove cards in `index.html` and `treks.html` only when the trek should be featured.

## Adding a new destination page

1. Copy an existing destination HTML (e.g. `destinations/everest.html`) to `destinations/new-region.html`
2. Update `<title>`, meta description, and og tags
3. Update the mega-menu region entry in `index.html` and `treks.html` if it should be discoverable there.
4. Update destination thumbnails in the mega menu grid (images at `/assets/images/destinations/`)

## Page Conventions

- Trek pages combine SEO metadata, `TouristTrip` JSON-LD, inline trek CSS, and shared `main.js`.
- Destination pages use `TouristDestination` JSON-LD and inline region styles.
- Blog pages use article metadata, Article/Breadcrumb/FAQ schemas, long-form inline styles, and shared `main.js`.
- Trek cards use `data-region`, `data-difficulty`, `data-duration`, `data-price`, and `data-season`; filtering is implemented in `assets/js/filter.js`.
- Forms use `data-form`; the booking portal is identified by `#quickBookingForm`.
- Shared navigation, mobile menus, search, active links, dropdowns, and scroll behavior belong to `assets/js/navbar.js`.

## CSS Load Order

Pages commonly link the foundation files directly in this order:

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

Do not reorder or remove these links without checking the page template. `style.css` is the import-only master entry point and should not receive page styles.

## Structured Data (JSON-LD)

Each page includes a `<script type="application/ld+json">` block in `<head>`. The patterns are:

- **Home/index**: Organization + WebSite + FAQPage schema — `@graph` array with 3 entries
- **Trek pages**: `TouristTrip` as single `@type` — no `@graph`, no `@context` reordering
- **Destination pages**: `TouristDestination` as single `@type` — no `@graph`, no `@context` reordering
- **About page**: `LocalBusiness` as single `@type`

Do not mix `@graph` with single `@type` pages. Preserve the schema shape of the page template being edited.

## Navigation consistency

- The navbar and mobile menu are shared across pages through `assets/js/navbar.js`.
- The destination mega menu is maintained in `index.html` and `treks.html`; add a `.mega-menu__regions-section` link when adding a region.
- Keep the Popular Treks dropdown entries in `index.html` and `treks.html` aligned with the trek directory.
- `navbar.js` currently calls `toggleClass()` without importing it from `utils.js`; account for this runtime issue when changing mobile accordion behavior.
- `booking.html` loads both `main.js` and `booking.js`; avoid introducing duplicate booking handlers there.

## Images

- Hero imagery may be referenced from root-level files or `/assets/images/hero/`; inspect nearby pages before adding paths.
- Trek images use `/assets/images/treks/XXXX.jpg`; destination thumbnails use `/assets/images/destinations/XXXX.jpg`.
- Favicon references are inconsistent across legacy pages, so preserve the local template unless standardizing deliberately.

## Documentation

- [package.json](package.json) is authoritative for commands and dependencies.
- [Best_Treks_Nepal_Logo_SKILL.md](Best_Treks_Nepal_Logo_SKILL.md) contains brand and logo constraints.
- [assets/css/style.css](assets/css/style.css) defines the CSS import order.
- [assets/js/main.js](assets/js/main.js) defines the shared JavaScript boundary.