/**
 * whatsapp.js — Floating WhatsApp Contact Widget
 * Version: 1.1 | August 2026
 *
 * Injects and manages the floating WhatsApp quick-help button on the bottom left.
 */

'use strict';

export const initWhatsAppWidget = () => {
  if (document.getElementById('floatingWhatsAppBtn')) return;

  const btn = document.createElement('a');
  btn.id = 'floatingWhatsAppBtn';
  btn.className = 'floating-whatsapp';
  btn.href = 'https://wa.me/9779748343015?text=Hello%20Best%20Treks%20Nepal,%20I\'m%20planning%20a%20trek%20in%20Nepal%20and%20would%20like%20more%20information!';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.setAttribute('aria-label', 'Chat with our Himalayan Trek Expert on WhatsApp');

  btn.innerHTML = `
    <span class="floating-whatsapp__badge">Need Help?</span>
    <div class="floating-whatsapp__icon-wrap">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="#ffffff" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15ZM16.57 14.37C16.32 14.24 15.1 13.64 14.87 13.56C14.64 13.47 14.48 13.43 14.31 13.68C14.15 13.93 13.67 14.5 13.52 14.67C13.38 14.84 13.23 14.86 12.98 14.73C12.73 14.61 11.93 14.34 10.97 13.49C10.23 12.83 9.72 12.01 9.58 11.76C9.43 11.51 9.56 11.38 9.69 11.25C9.8 11.14 9.94 10.96 10.06 10.82C10.19 10.67 10.23 10.57 10.31 10.4C10.4 10.24 10.35 10.09 10.29 9.97C10.23 9.84 9.73 8.62 9.53 8.11C9.33 7.62 9.12 7.69 8.97 7.68C8.82 7.67 8.65 7.67 8.49 7.67C8.32 7.67 8.05 7.73 7.82 7.98C7.6 8.23 6.95 8.84 6.95 10.08C6.95 11.32 7.85 12.52 7.98 12.69C8.1 12.86 9.76 15.42 12.3 16.51C12.9 16.77 13.37 16.93 13.74 17.05C14.34 17.24 14.89 17.21 15.33 17.15C15.81 17.08 16.82 16.54 17.03 15.95C17.24 15.36 17.24 14.86 17.18 14.75C17.11 14.65 16.82 14.5 16.57 14.37Z"/>
      </svg>
    </div>
  `;

  document.body.appendChild(btn);
};
