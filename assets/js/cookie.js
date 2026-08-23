/**
 * cookie.js — Best Treks Nepal Horizontal Cookie Consent Controller
 * Version: 2.0 | August 2026
 *
 * Implements GDPR & ePrivacy compliant horizontal cookie banner and preference drawer.
 * Stores user preferences in localStorage ('btn_cookie_consent_v1').
 */

'use strict';

const STORAGE_KEY = 'btn_cookie_consent_v1';

export const initCookieConsent = () => {
  // Check if consent has already been recorded
  const savedConsent = localStorage.getItem(STORAGE_KEY);
  if (savedConsent) {
    return; // Already consented
  }

  // Create and inject the Horizontal Cookie Banner HTML
  const banner = document.createElement('aside');
  banner.className = 'cookie-banner';
  banner.id = 'cookieBanner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-labelledby', 'cookieBannerTitle');
  banner.setAttribute('aria-describedby', 'cookieBannerDesc');
  banner.setAttribute('aria-modal', 'false');

  banner.innerHTML = `
    <div class="cookie-banner__inner">
      <div class="cookie-banner__main-row">
        
        <!-- Left: Cookie Icon + Description -->
        <div class="cookie-banner__content">
          <div class="cookie-banner__icon-wrap" aria-hidden="true">
            <span class="cookie-banner__icon">🍪</span>
          </div>
          <div class="cookie-banner__text">
            <h2 class="cookie-banner__title" id="cookieBannerTitle">Cookie &amp; Privacy Preferences</h2>
            <p class="cookie-banner__desc" id="cookieBannerDesc">
              We use essential cookies to power secure booking sessions and analytics to enhance your Himalayan expedition planning. Read our <a href="/privacy-policy.html#section-7" class="cookie-banner__link">Privacy Policy</a>.
            </p>
          </div>
        </div>

        <!-- Right: Action Buttons & Dismiss -->
        <div class="cookie-banner__actions-wrap">
          <div class="cookie-banner__actions">
            <button type="button" class="btn-cookie btn-cookie--primary" id="btnCookieAcceptAll">
              Accept All
            </button>
            <button type="button" class="btn-cookie btn-cookie--secondary" id="btnCookieEssentialOnly">
              Essential Only
            </button>
            <button type="button" class="btn-cookie btn-cookie--ghost" id="btnCookieTogglePrefs">
              Customize
            </button>
            <button type="button" class="btn-cookie btn-cookie--primary" id="btnCookieSavePrefs" style="display:none;">
              Save Preferences
            </button>
          </div>

          <button type="button" class="cookie-banner__close" id="cookieBannerCloseBtn" aria-label="Dismiss cookie notice">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

      </div>

      <!-- Expandable Preference Grid (Hidden by default) -->
      <div class="cookie-prefs" id="cookiePrefsDrawer" hidden>
        <div class="cookie-prefs__grid">
          
          <div class="cookie-pref-item">
            <div class="cookie-pref-info">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.25rem;">
                <span class="cookie-pref-name">Essential &amp; Security</span>
                <span class="cookie-pref-badge">Always Active</span>
              </div>
              <span class="cookie-pref-desc">Required for booking wizards, SSL sessions, and CSRF protection.</span>
            </div>
          </div>

          <div class="cookie-pref-item">
            <div class="cookie-pref-info">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.25rem;">
                <span class="cookie-pref-name">Analytics &amp; Performance</span>
                <label class="cookie-toggle-label">
                  <input type="checkbox" id="cookiePrefAnalytics" checked class="cookie-toggle-input">
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>
              <span class="cookie-pref-desc">Anonymized telemetry to optimize guides and page loading speeds.</span>
            </div>
          </div>

          <div class="cookie-pref-item">
            <div class="cookie-pref-info">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;margin-bottom:0.25rem;">
                <span class="cookie-pref-name">Personalization</span>
                <label class="cookie-toggle-label">
                  <input type="checkbox" id="cookiePrefPersonalization" checked class="cookie-toggle-input">
                  <span class="cookie-toggle-slider"></span>
                </label>
              </div>
              <span class="cookie-pref-desc">Remembers preferred trekking regions and currency preferences.</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  `;

  document.body.appendChild(banner);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    banner.classList.add('is-visible');
  });

  // Event Listeners
  const closeBtn = document.getElementById('cookieBannerCloseBtn');
  const acceptAllBtn = document.getElementById('btnCookieAcceptAll');
  const essentialOnlyBtn = document.getElementById('btnCookieEssentialOnly');
  const togglePrefsBtn = document.getElementById('btnCookieTogglePrefs');
  const savePrefsBtn = document.getElementById('btnCookieSavePrefs');
  const prefsDrawer = document.getElementById('cookiePrefsDrawer');

  const saveAndDismiss = (preferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      timestamp: new Date().toISOString(),
      preferences: preferences
    }));

    banner.classList.remove('is-visible');
    banner.classList.add('is-hidden');
    setTimeout(() => {
      banner.remove();
    }, 350);

    // Dispatch global event for analytics integrations
    window.dispatchEvent(new CustomEvent('btn:cookieConsentUpdated', { detail: preferences }));
  };

  if (acceptAllBtn) {
    acceptAllBtn.addEventListener('click', () => {
      saveAndDismiss({ essential: true, analytics: true, personalization: true });
    });
  }

  if (essentialOnlyBtn) {
    essentialOnlyBtn.addEventListener('click', () => {
      saveAndDismiss({ essential: true, analytics: false, personalization: false });
    });
  }

  if (togglePrefsBtn) {
    togglePrefsBtn.addEventListener('click', () => {
      const isHidden = prefsDrawer.hasAttribute('hidden');
      if (isHidden) {
        prefsDrawer.removeAttribute('hidden');
        togglePrefsBtn.textContent = 'Hide Details';
        acceptAllBtn.style.display = 'none';
        essentialOnlyBtn.style.display = 'none';
        savePrefsBtn.style.display = 'inline-flex';
      } else {
        prefsDrawer.setAttribute('hidden', '');
        togglePrefsBtn.textContent = 'Customize';
        acceptAllBtn.style.display = 'inline-flex';
        essentialOnlyBtn.style.display = 'inline-flex';
        savePrefsBtn.style.display = 'none';
      }
    });
  }

  if (savePrefsBtn) {
    savePrefsBtn.addEventListener('click', () => {
      const analytics = document.getElementById('cookiePrefAnalytics')?.checked ?? true;
      const personalization = document.getElementById('cookiePrefPersonalization')?.checked ?? true;
      saveAndDismiss({ essential: true, analytics, personalization });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      // Dismiss for current session as essential only
      saveAndDismiss({ essential: true, analytics: false, personalization: false });
    });
  }
};
