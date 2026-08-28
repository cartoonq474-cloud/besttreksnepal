/**
 * booking.js — Best Treks Nepal Booking & Contact Form Validation + Quick Booking Engine
 * Version: 2.5 | August 2026
 *
 * Responsibilities:
 *  - Validate required fields, email, and phone
 *  - Interactive 4-step Quick Booking Portal controller (Trek -> Travelers -> Add-ons -> Cash on Arrival)
 *  - Real-time dynamic expedition price calculator (100% Cash on Arrival in KTM)
 *  - URL Query parameter synchronization (?trek=...&tier=...&pax=...&date=...)
 *  - Direct Email dispatch to kotlyan204@gmail.com
 *  - Live summary sidebar rendering
 *  - Success modal and dispatch confirmation
 */

'use strict';

import {
  $, $$, addClass, removeClass, hasClass,
  isValidEmail, isValidPhone
} from './utils.js';

/**
 * Direct Email Dispatcher to kotlyan204@gmail.com via FormSubmit AJAX API
 * @param {Object} data - Form key-value pairs
 * @param {string} subject - Email subject line
 * @returns {Promise<boolean>}
 */
export const dispatchToEmail = async (data, subject = 'New Himalayan Trek Booking / Inquiry') => {
  try {
    const payload = {
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      'Submission Timestamp': new Date().toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' }) + ' (NPT)',
      ...data
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch('https://formsubmit.co/ajax/kotlyan204@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const result = await response.json();
    return result.success === 'true' || result.success === true;
  } catch (err) {
    console.warn('Form email dispatch notice (handled):', err);
    return false;
  }
};

/**
 * Validate a single form field
 * @param {Element} input — the input/select/textarea element
 * @returns {boolean} valid
 */
export const validateField = (input) => {
  const group = input.closest('.form-group') || input.closest('.form-group-custom');
  if (!group) return true;

  const errorEl = group.querySelector('.form-error');
  const value   = input.value.trim();
  const type    = input.getAttribute('type') || input.tagName.toLowerCase();
  const required = input.hasAttribute('required');

  let errorMsg = '';

  // Required check
  if (required && value === '') {
    errorMsg = input.getAttribute('data-error-required') || 'This field is required.';
  }
  // Email format
  else if (type === 'email' && value && !isValidEmail(value)) {
    errorMsg = input.getAttribute('data-error-email') || 'Please enter a valid email address.';
  }
  // Phone format
  else if (type === 'tel' && value && !isValidPhone(value)) {
    errorMsg = input.getAttribute('data-error-phone') || 'Please enter a valid phone number.';
  }
  // Min length
  else if (input.hasAttribute('minlength')) {
    const min = parseInt(input.getAttribute('minlength'), 10);
    if (value.length > 0 && value.length < min) {
      errorMsg = `Please enter at least ${min} characters.`;
    }
  }

  if (errorMsg) {
    addClass(group, 'has-error');
    addClass(input, 'is-error');
    removeClass(input, 'is-success');
    if (errorEl) errorEl.textContent = errorMsg;
    return false;
  } else {
    removeClass(group, 'has-error');
    removeClass(input, 'is-error');
    if (value) addClass(input, 'is-success');
    if (errorEl) errorEl.textContent = '';
    return true;
  }
};

/**
 * Quick Booking Engine Controller
 */
const initQuickBookingPortal = () => {
  const portalForm = $('#quickBookingForm');
  if (!portalForm) return;

  // State
  let selectedTrekSlug = 'everest-base-camp';
  let baseRatePerPax = 1390;
  let selectedTier = 'standard';
  let tierMultiplier = 1.0;
  let paxCount = 2;
  let currentStep = 1;

  // DOM Elements
  const trekSelect = $('#bookingTrekSelect');
  const dateInput = $('#bookingDate');
  const paxText = $('#paxCountText');
  const btnPaxMinus = $('#btnPaxMinus');
  const btnPaxPlus = $('#btnPaxPlus');
  const tierCards = $$('.tier-card-option');
  const addonCards = $$('.addon-card');
  const stepTabs = [
    $('#bookStepTab1'),
    $('#bookStepTab2'),
    $('#bookStepTab3'),
    $('#bookStepTab4')
  ];
  const stepPanels = [
    $('#bookPanel1'),
    $('#bookPanel2'),
    $('#bookPanel3'),
    $('#bookPanel4')
  ];

  // Summary Elements
  const summaryThumb = $('#summaryThumb');
  const summaryTitle = $('#summaryTitle');
  const summaryDuration = $('#summaryDuration');
  const summaryAltitude = $('#summaryAltitude');
  const summaryDateVal = $('#summaryDateVal');
  const summaryTierVal = $('#summaryTierVal');
  const summaryRateVal = $('#summaryRateVal');
  const summaryPaxVal = $('#summaryPaxVal');
  const summaryAddonRow = $('#summaryAddonRow');
  const summaryAddonVal = $('#summaryAddonVal');
  const summaryTotalVal = $('#summaryTotalVal');
  const summaryDepositVal = $('#summaryDepositVal');
  const summaryBalanceVal = $('#summaryBalanceVal');

  // Final Step 4 Displays
  const finalTotalDisplay = $('#finalTotalDisplay');
  const finalDepositDisplay = $('#finalDepositDisplay');
  const finalBalanceDisplay = $('#finalBalanceDisplay');

  const tierLabels = {
    standard: 'Standard Teahouse',
    comfort: 'Comfort Plus',
    luxury: 'Luxury VIP & Heli'
  };

  /**
   * Set default departure date to 14 days in future
   */
  const setDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const yyyyMmDd = d.toISOString().split('T')[0];
    if (dateInput && !dateInput.value) {
      dateInput.value = yyyyMmDd;
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  };

  /**
   * Parse URL Query parameters if user came from a trek card
   */
  const parseUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const trekParam = params.get('trek');
    const tierParam = params.get('tier');
    const paxParam = parseInt(params.get('pax'), 10);
    const dateParam = params.get('date');

    if (trekParam && trekSelect) {
      const match = trekSelect.querySelector(`option[value="${trekParam}"]`);
      if (match) trekSelect.value = trekParam;
    }

    if (tierParam) {
      const tierMatch = Array.from(tierCards).find(c => c.dataset.tier === tierParam);
      if (tierMatch) {
        tierCards.forEach(c => removeClass(c, 'is-selected'));
        addClass(tierMatch, 'is-selected');
        const radio = tierMatch.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        selectedTier = tierParam;
        tierMultiplier = parseFloat(tierMatch.dataset.multiplier) || 1.0;
      }
    }

    if (paxParam && !isNaN(paxParam) && paxParam >= 1) {
      paxCount = Math.min(24, Math.max(1, paxParam));
    }

    if (dateParam && dateInput) {
      dateInput.value = dateParam;
    }
  };

  /**
   * Recalculate and update all UI prices & summary
   */
  const updateCalculation = () => {
    // 1. Trek details
    const selOption = trekSelect ? trekSelect.options[trekSelect.selectedIndex] : null;
    if (selOption) {
      selectedTrekSlug = selOption.value;
      baseRatePerPax = parseFloat(selOption.dataset.base) || 1390;
      const days = selOption.dataset.days || 14;
      const alt = selOption.dataset.alt || '5,364m';
      const img = selOption.dataset.img || '/assets/images/destinations/everest.jpg';

      if (summaryTitle) summaryTitle.textContent = selOption.text.split('(')[0].trim();
      if (summaryDuration) summaryDuration.textContent = `${days} Days`;
      if (summaryAltitude) summaryAltitude.textContent = `Max: ${alt}`;
      if (summaryThumb) summaryThumb.src = img;
    }

    // 2. Update tier prices in Step 1 cards
    const stdPrice = Math.round(baseRatePerPax * 1.0);
    const comPrice = Math.round(baseRatePerPax * 1.35);
    const luxPrice = Math.round(baseRatePerPax * 2.4);

    const elStd = $('#tierPriceStandard');
    const elCom = $('#tierPriceComfort');
    const elLux = $('#tierPriceLuxury');

    if (elStd) elStd.innerHTML = `$${stdPrice.toLocaleString()} <small>USD/pax</small>`;
    if (elCom) elCom.innerHTML = `$${comPrice.toLocaleString()} <small>USD/pax</small>`;
    if (elLux) elLux.innerHTML = `$${luxPrice.toLocaleString()} <small>USD/pax</small>`;

    // 3. Current active tier rate
    const currentRatePerPax = Math.round(baseRatePerPax * tierMultiplier);

    // 4. Addons calculation
    let totalAddons = 0;
    addonCards.forEach(card => {
      const chk = card.querySelector('input[type="checkbox"]');
      if (chk && chk.checked) {
        const cost = parseFloat(chk.dataset.cost) || 0;
        const perPax = chk.dataset.perPax === 'true';
        totalAddons += perPax ? cost * paxCount : cost;
        addClass(card, 'is-selected');
      } else {
        removeClass(card, 'is-selected');
      }
    });

    // 5. Total Calculations (100% Cash on Arrival)
    const baseTotal = currentRatePerPax * paxCount;
    const total = baseTotal + totalAddons;

    // 6. Update DOM Summary
    if (paxText) paxText.textContent = `${paxCount} Trekker${paxCount > 1 ? 's' : ''}`;
    if (summaryPaxVal) summaryPaxVal.textContent = `${paxCount} Trekker${paxCount > 1 ? 's' : ''}`;
    if (summaryTierVal) summaryTierVal.textContent = tierLabels[selectedTier] || 'Standard Teahouse';
    if (summaryRateVal) summaryRateVal.textContent = `$${currentRatePerPax.toLocaleString()} USD`;
    if (summaryDateVal) summaryDateVal.textContent = dateInput && dateInput.value ? dateInput.value : 'Select a date';

    if (summaryAddonRow && summaryAddonVal) {
      if (totalAddons > 0) {
        summaryAddonRow.style.display = 'flex';
        summaryAddonVal.textContent = `+$${totalAddons.toLocaleString()} USD`;
      } else {
        summaryAddonRow.style.display = 'none';
      }
    }

    if (summaryTotalVal) summaryTotalVal.textContent = `$${total.toLocaleString()} USD`;
    if (summaryDepositVal) summaryDepositVal.textContent = `$0 Advance`;
    if (summaryBalanceVal) summaryBalanceVal.textContent = `$${total.toLocaleString()} USD`;

    if (finalTotalDisplay) finalTotalDisplay.textContent = `$${total.toLocaleString()} USD`;
    if (finalDepositDisplay) finalDepositDisplay.textContent = `$0 USD (Pay on Arrival)`;
    if (finalBalanceDisplay) finalBalanceDisplay.textContent = `$${total.toLocaleString()} USD`;
  };

  /**
   * Set active step
   * @param {number} step (1-4)
   */
  const setStep = (step) => {
    if (step < 1 || step > 4) return;
    currentStep = step;

    // Panels
    stepPanels.forEach((panel, idx) => {
      if (panel) {
        if (idx + 1 === currentStep) {
          addClass(panel, 'is-active');
        } else {
          removeClass(panel, 'is-active');
        }
      }
    });

    // Step Tabs
    stepTabs.forEach((tab, idx) => {
      if (tab) {
        const tabStep = idx + 1;
        removeClass(tab, 'is-active', 'is-completed');
        if (tabStep === currentStep) {
          addClass(tab, 'is-active');
        } else if (tabStep < currentStep) {
          addClass(tab, 'is-completed');
        }
      }
    });

    // Scroll to top of portal on mobile
    if (window.innerWidth < 1024) {
      portalForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /**
   * Step validation check
   * @param {number} step
   * @returns {boolean}
   */
  const validateStep = (step) => {
    let isValid = true;
    if (step === 1) {
      if (dateInput && !dateInput.value) {
        dateInput.style.borderColor = '#ef4444';
        isValid = false;
      } else if (dateInput) {
        dateInput.style.borderColor = '';
      }
    } else if (step === 2) {
      const nameInput = $('#leadFullName');
      const emailInput = $('#leadEmail');
      const phoneInput = $('#leadPhone');
      const countryInput = $('#leadCountry');

      [nameInput, emailInput, phoneInput, countryInput].forEach(inp => {
        if (inp && !validateField(inp)) {
          isValid = false;
        }
      });
    }
    return isValid;
  };

  // Event Listeners

  // 1. Trek Selector change
  if (trekSelect) {
    trekSelect.addEventListener('change', updateCalculation);
  }

  // 2. Date Input change
  if (dateInput) {
    dateInput.addEventListener('change', updateCalculation);
  }

  // 3. Pax Stepper Buttons
  if (btnPaxMinus) {
    btnPaxMinus.addEventListener('click', () => {
      if (paxCount > 1) {
        paxCount--;
        updateCalculation();
      }
    });
  }

  if (btnPaxPlus) {
    btnPaxPlus.addEventListener('click', () => {
      if (paxCount < 24) {
        paxCount++;
        updateCalculation();
      }
    });
  }

  // 4. Tier Card clicks
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => removeClass(c, 'is-selected'));
      addClass(card, 'is-selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      selectedTier = card.dataset.tier;
      tierMultiplier = parseFloat(card.dataset.multiplier) || 1.0;
      updateCalculation();
    });
  });

  // 5. Add-on Card clicks
  addonCards.forEach(card => {
    const chk = card.querySelector('input[type="checkbox"]');
    if (chk) {
      chk.addEventListener('change', updateCalculation);
    }
  });

  // 6. Navigation buttons
  const btnNext1 = $('#btnNextBook1');
  const btnPrev2 = $('#btnPrevBook2');
  const btnNext2 = $('#btnNextBook2');
  const btnPrev3 = $('#btnPrevBook3');
  const btnNext3 = $('#btnNextBook3');
  const btnPrev4 = $('#btnPrevBook4');

  if (btnNext1) btnNext1.addEventListener('click', () => { if (validateStep(1)) setStep(2); });
  if (btnPrev2) btnPrev2.addEventListener('click', () => setStep(1));
  if (btnNext2) btnNext2.addEventListener('click', () => { if (validateStep(2)) setStep(3); });
  if (btnPrev3) btnPrev3.addEventListener('click', () => setStep(2));
  if (btnNext3) btnNext3.addEventListener('click', () => setStep(4));
  if (btnPrev4) btnPrev4.addEventListener('click', () => setStep(3));

  // 7. Stepper tab direct clicks
  stepTabs.forEach((tab, idx) => {
    if (tab) {
      tab.addEventListener('click', () => {
        const target = idx + 1;
        if (target < currentStep) {
          setStep(target);
        } else if (target > currentStep) {
          if (validateStep(currentStep)) {
            setStep(target);
          }
        }
      });
    }
  });

  // 8. Booking Form Submit Handler
  portalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) {
      setStep(!validateStep(1) ? 1 : 2);
      return;
    }

    const termsCheck = $('#termsCheck');
    if (termsCheck && !termsCheck.checked) {
      alert('Please accept the booking terms and conditions to proceed.');
      return;
    }

    const submitBtn = $('#btnConfirmBooking');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Reservation…</span>';
    }

    // Collect all booking configuration details
    const leadName = $('#leadFullName')?.value?.trim() || 'Valued Trekker';
    const leadEmail = $('#leadEmail')?.value?.trim() || '';
    const leadPhone = $('#leadPhone')?.value?.trim() || '';
    const leadCountry = $('#leadCountry')?.value?.trim() || 'Not specified';
    const trekTitle = summaryTitle ? summaryTitle.textContent.trim() : 'Himalayan Trek';
    const departureDate = dateInput ? dateInput.value : 'Flexible';
    const tierName = tierLabels[selectedTier] || 'Standard Teahouse';
    const totalAmount = summaryTotalVal ? summaryTotalVal.textContent.trim() : '';

    // Collect selected addons
    const selectedAddonsList = [];
    addonCards.forEach(c => {
      const chk = c.querySelector('input[type="checkbox"]');
      if (chk && chk.checked) {
        selectedAddonsList.push(c.querySelector('.addon-card__title')?.textContent?.trim() || chk.name);
      }
    });

    const specialReqs = $('#specialDiet')?.value?.trim() || 'None specified';

    // Dispatch directly to kotlyan204@gmail.com
    await dispatchToEmail({
      'Lead Traveler Name': leadName,
      'Email Address': leadEmail,
      'Phone / WhatsApp': leadPhone,
      'Country of Residence': leadCountry,
      'Trek Package': trekTitle,
      'Accommodation Tier': tierName,
      'Number of Trekkers': paxCount,
      'Target Departure Date': departureDate,
      'Selected Add-ons': selectedAddonsList.length ? selectedAddonsList.join(', ') : 'Standard (No Add-ons)',
      'Total Estimated Package Cost': totalAmount,
      'Payment Method': '100% Cash on Arrival in Kathmandu (Zero Advance Deposit Required)',
      'Advance Deposit': '$0 USD (Zero Advance)',
      'Total Cash Due on Arrival in Kathmandu': totalAmount,
      'Dietary / Special Notes': specialReqs
    }, `🎯 New Trek Booking: ${trekTitle} - ${leadName} (${paxCount} Pax)`);

    // Show Confirmation Modal
    const modal = $('#bookingSuccessModal');
    const successLeadName = $('#successLeadName');
    const successTrekName = $('#successTrekName');
    const leadNameInput = $('#leadFullName');

    if (successLeadName && leadNameInput && leadNameInput.value) {
      successLeadName.textContent = leadNameInput.value.trim();
    }
    if (successTrekName && summaryTitle) {
      successTrekName.textContent = summaryTitle.textContent;
    }

    if (modal) {
      addClass(modal, 'is-active');
      modal.style.display = 'flex';
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Reservation Confirmed ✓</span>';
    }
  });

  // Initialize
  setDefaultDate();
  parseUrlParams();
  updateCalculation();
};

/**
 * Initialize all booking and contact forms
 */
export const initBooking = () => {
  // Initialize standard data-form validations across the site
  const forms = $$('[data-form]');

  forms.forEach(form => {
    const inputs = $$('input, select, textarea', form);

    // Real-time validation on blur
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (hasClass(input, 'is-error')) validateField(input);
      });
    });
  });

  // Initialize Quick Booking Portal engine
  initQuickBookingPortal();
};

// Auto-run if loaded directly as a module
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBooking);
  } else {
    initBooking();
  }
}
