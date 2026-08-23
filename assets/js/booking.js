/**
 * booking.js — Best Treks Nepal Booking & Contact Form Validation + Quick Booking Engine
 * Version: 2.0 | August 2026
 *
 * Responsibilities:
 *  - Validate required fields, email, and phone
 *  - Interactive 4-step Quick Booking Portal controller (Trek -> Travelers -> Add-ons -> Payment)
 *  - Real-time dynamic expedition price & 15% deposit calculator
 *  - URL Query parameter synchronization (?trek=...&tier=...&pax=...&date=...)
 *  - Live summary sidebar rendering
 *  - Success modal and dispatch confirmation
 */

'use strict';

import {
  $, $$, addClass, removeClass, hasClass,
  isValidEmail, isValidPhone
} from './utils.js';

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
  const panels = [
    $('#bookPanel1'),
    $('#bookPanel2'),
    $('#bookPanel3'),
    $('#bookPanel4')
  ];

  // Sidebar Summary DOM Elements
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
  const finalTotalDisplay = $('#finalTotalDisplay');
  const finalDepositDisplay = $('#finalDepositDisplay');
  const finalBalanceDisplay = $('#finalBalanceDisplay');

  // Tier names map
  const tierLabels = {
    standard: 'Standard Teahouse',
    comfort: 'Comfort Plus',
    luxury: 'Luxury VIP & Heli'
  };

  /**
   * Set minimum date to +3 days from today
   */
  const setDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    const dateStr = d.toISOString().split('T')[0];
    if (dateInput && !dateInput.value) {
      dateInput.value = dateStr;
      dateInput.min = new Date().toISOString().split('T')[0];
    }
  };

  /**
   * Parse URL search parameters on load
   */
  const parseUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const paramTrek = params.get('trek');
    const paramTier = params.get('tier');
    const paramPax = parseInt(params.get('pax'), 10);
    const paramDate = params.get('date');

    if (paramTrek && trekSelect) {
      const opt = trekSelect.querySelector(`option[value="${paramTrek}"]`);
      if (opt) {
        trekSelect.value = paramTrek;
      }
    }

    if (paramTier) {
      const targetCard = Array.from(tierCards).find(c => c.dataset.tier === paramTier);
      if (targetCard) {
        tierCards.forEach(c => removeClass(c, 'is-selected'));
        addClass(targetCard, 'is-selected');
        const radio = targetCard.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
        selectedTier = paramTier;
        tierMultiplier = parseFloat(targetCard.dataset.multiplier) || 1.0;
      }
    }

    if (paramPax && !isNaN(paramPax) && paramPax >= 1) {
      paxCount = Math.min(24, Math.max(1, paramPax));
    }

    if (paramDate && dateInput) {
      dateInput.value = paramDate;
    }
  };

  /**
   * Recalculate all pricing and update summary sidebar
   */
  const updateCalculation = () => {
    // 1. Read Trek data
    const selectedOption = trekSelect ? trekSelect.options[trekSelect.selectedIndex] : null;
    if (selectedOption) {
      selectedTrekSlug = selectedOption.value;
      baseRatePerPax = parseFloat(selectedOption.dataset.base) || 1390;
      const days = selectedOption.dataset.days || 14;
      const alt = selectedOption.dataset.alt || '5,364m';
      const img = selectedOption.dataset.img || '/assets/images/destinations/everest.jpg';

      if (summaryTitle) summaryTitle.textContent = selectedOption.text.split('(')[0].trim();
      if (summaryDuration) summaryDuration.textContent = `${days} Days`;
      if (summaryAltitude) summaryAltitude.textContent = `Max: ${alt}`;
      if (summaryThumb) summaryThumb.src = img;
    }

    // 2. Update Tier Price Displays
    const standardRate = Math.round(baseRatePerPax * 1.0);
    const comfortRate = Math.round(baseRatePerPax * 1.35);
    const luxuryRate = Math.round(baseRatePerPax * 2.4);

    const elPriceStd = $('#tierPriceStandard');
    const elPriceComf = $('#tierPriceComfort');
    const elPriceLux = $('#tierPriceLuxury');

    if (elPriceStd) elPriceStd.innerHTML = `$${standardRate.toLocaleString()} <small>USD/pax</small>`;
    if (elPriceComf) elPriceComf.innerHTML = `$${comfortRate.toLocaleString()} <small>USD/pax</small>`;
    if (elPriceLux) elPriceLux.innerHTML = `$${luxuryRate.toLocaleString()} <small>USD/pax</small>`;

    // 3. Compute Current Tier Rate
    const currentRatePerPax = Math.round(baseRatePerPax * tierMultiplier);

    // 4. Calculate Add-ons
    let addonsTotal = 0;
    addonCards.forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        const cost = parseFloat(checkbox.dataset.cost) || 0;
        const isPerPax = checkbox.dataset.perPax === 'true';
        addonsTotal += isPerPax ? (cost * paxCount) : cost;
        addClass(card, 'is-selected');
      } else {
        removeClass(card, 'is-selected');
      }
    });

    // 5. Total and 15% Deposit
    const trekBaseTotal = currentRatePerPax * paxCount;
    const grandTotal = trekBaseTotal + addonsTotal;
    const depositAmount = Math.round(grandTotal * 0.15);
    const balanceAmount = grandTotal - depositAmount;

    // 6. Update Sidebar & Review Elements
    if (paxText) paxText.textContent = `${paxCount} Trekker${paxCount > 1 ? 's' : ''}`;
    if (summaryPaxVal) summaryPaxVal.textContent = `${paxCount} Trekker${paxCount > 1 ? 's' : ''}`;
    if (summaryTierVal) summaryTierVal.textContent = tierLabels[selectedTier] || 'Standard Teahouse';
    if (summaryRateVal) summaryRateVal.textContent = `$${currentRatePerPax.toLocaleString()} USD`;
    if (summaryDateVal) {
      summaryDateVal.textContent = dateInput && dateInput.value ? dateInput.value : 'Select a date';
    }

    if (summaryAddonRow && summaryAddonVal) {
      if (addonsTotal > 0) {
        summaryAddonRow.style.display = 'flex';
        summaryAddonVal.textContent = `+$${addonsTotal.toLocaleString()} USD`;
      } else {
        summaryAddonRow.style.display = 'none';
      }
    }

    if (summaryTotalVal) summaryTotalVal.textContent = `$${grandTotal.toLocaleString()} USD`;
    if (summaryDepositVal) summaryDepositVal.textContent = `$${depositAmount.toLocaleString()} USD`;
    if (summaryBalanceVal) summaryBalanceVal.textContent = `$${balanceAmount.toLocaleString()} USD`;

    if (finalTotalDisplay) finalTotalDisplay.textContent = `$${grandTotal.toLocaleString()} USD`;
    if (finalDepositDisplay) finalDepositDisplay.textContent = `$${depositAmount.toLocaleString()} USD`;
    if (finalBalanceDisplay) finalBalanceDisplay.textContent = `$${balanceAmount.toLocaleString()} USD`;
  };

  /**
   * Set current active step in 4-step wizard
   * @param {number} step
   */
  const setStep = (step) => {
    if (step < 1 || step > 4) return;
    currentStep = step;

    // Update Panels
    panels.forEach((panel, idx) => {
      if (panel) {
        if (idx + 1 === currentStep) {
          addClass(panel, 'is-active');
        } else {
          removeClass(panel, 'is-active');
        }
      }
    });

    // Update Stepper Tabs
    stepTabs.forEach((tab, idx) => {
      if (tab) {
        const stepNum = idx + 1;
        removeClass(tab, 'is-active', 'is-completed');
        if (stepNum === currentStep) {
          addClass(tab, 'is-active');
        } else if (stepNum < currentStep) {
          addClass(tab, 'is-completed');
        }
      }
    });

    // Scroll smoothly to top of form card on mobile
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

  // 6. Payment method pills
  const paymentPills = $$('.payment-method-pill');
  paymentPills.forEach(pill => {
    pill.addEventListener('click', () => {
      paymentPills.forEach(p => removeClass(p, 'is-selected'));
      addClass(pill, 'is-selected');
    });
  });

  // 7. Navigation buttons
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

  // 8. Stepper tab direct clicks
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

  // 9. Booking Form Submit Handler
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
      submitBtn.innerHTML = '<span>Processing Secure Reservation…</span>';
    }

    // Simulate SSL Reservation processing
    await new Promise(resolve => setTimeout(resolve, 1500));

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

