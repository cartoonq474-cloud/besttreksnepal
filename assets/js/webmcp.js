/**
 * webmcp.js — Web Model Context Protocol (WebMCP) & AI Agent Tool Declarations
 * Version: 1.1 | Best Treks Nepal
 *
 * Implements WebMCP schemas and tool registration for Chrome AI / Agentic Browsing.
 * Ref: https://developer.chrome.com/docs/ai/webmcp
 */

'use strict';

export const WEBMCP_TOOLS = [
  {
    name: 'bookHimalayanTrek',
    description: 'Calculates all-inclusive package pricing and reserves a guided Himalayan trek in Nepal with $0 advance deposit.',
    inputSchema: {
      type: 'object',
      properties: {
        trek: {
          type: 'string',
          description: 'Trek identifier (e.g. everest-base-camp, annapurna-circuit, manaslu-circuit, langtang-valley, upper-mustang)'
        },
        departureDate: {
          type: 'string',
          format: 'date',
          description: 'Target departure date (YYYY-MM-DD)'
        },
        tier: {
          type: 'string',
          enum: ['standard', 'comfort', 'luxury'],
          description: 'Accommodation and logistics tier'
        },
        pax: {
          type: 'integer',
          minimum: 1,
          maximum: 24,
          description: 'Number of trekkers in the party'
        },
        leadName: {
          type: 'string',
          description: 'Full name of the lead traveler'
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'Contact email address'
        },
        phone: {
          type: 'string',
          description: 'WhatsApp phone number with country code'
        },
        country: {
          type: 'string',
          description: 'Country of residence'
        }
      },
      required: ['trek', 'departureDate', 'tier', 'pax', 'leadName', 'email', 'phone']
    }
  },
  {
    name: 'searchHimalayanTreks',
    description: 'Searches Himalayan trekking routes, permits, elevations, durations, and regional guides.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search keyword (e.g. EBC, high passes, Thorong La, spring blooming, family trek)'
        },
        region: {
          type: 'string',
          enum: ['all', 'everest', 'annapurna', 'langtang', 'manaslu', 'mustang', 'dolpo', 'kanchenjunga', 'makalu'],
          description: 'Filter by geographical mountain region'
        },
        maxDuration: {
          type: 'integer',
          description: 'Maximum trip duration in days'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'submitTrekInquiry',
    description: 'Submits a customized itinerary inquiry or private group question to licensed trekking specialists.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Sender name' },
        email: { type: 'string', format: 'email', description: 'Sender email' },
        phone: { type: 'string', description: 'Phone or WhatsApp number' },
        message: { type: 'string', description: 'Inquiry details, group size, or custom route requirements' }
      },
      required: ['name', 'email', 'message']
    }
  },
  {
    name: 'newsletterSubscription',
    description: 'Subscribes an email to quarterly Himalayan expedition planning guides and trail alerts.',
    inputSchema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email', description: 'Subscriber email address' }
      },
      required: ['email']
    }
  }
];

export const initWebMCP = () => {
  try {
    if (typeof window === 'undefined') return;

    // 1. Expose global tool registry
    window.__WEBMCP_TOOLS__ = WEBMCP_TOOLS;

    // 2. Setup document.modelContext / window.modelContext interface
    const registeredTools = new Map();
    WEBMCP_TOOLS.forEach(t => registeredTools.set(t.name, t));

    const modelContextImpl = {
      registerTool: (tool) => {
        if (tool && tool.name) {
          registeredTools.set(tool.name, tool);
        }
      },
      unregisterTool: (name) => {
        registeredTools.delete(name);
      },
      getTools: () => Array.from(registeredTools.values()),
      tools: Array.from(registeredTools.values())
    };

    // Attach to document, window, and navigator if not already natively defined
    if (typeof document !== 'undefined') {
      if (!document.modelContext) {
        document.modelContext = modelContextImpl;
      } else if (typeof document.modelContext.registerTool === 'function') {
        WEBMCP_TOOLS.forEach(t => {
          try { document.modelContext.registerTool(t); } catch (e) {}
        });
      }
    }

    if (!window.modelContext) {
      window.modelContext = modelContextImpl;
    } else if (typeof window.modelContext.registerTool === 'function') {
      WEBMCP_TOOLS.forEach(t => {
        try { window.modelContext.registerTool(t); } catch (e) {}
      });
    }

    if (typeof navigator !== 'undefined') {
      if (!navigator.modelContext) {
        try {
          Object.defineProperty(navigator, 'modelContext', {
            value: modelContextImpl,
            configurable: true,
            writable: true
          });
        } catch (e) {
          navigator.modelContext = modelContextImpl;
        }
      } else if (typeof navigator.modelContext.registerTool === 'function') {
        WEBMCP_TOOLS.forEach(t => {
          try { navigator.modelContext.registerTool(t); } catch (e) {}
        });
      }
    }

    // 3. Declarative form annotations on DOM
    const bookingForm = document.getElementById('quickBookingForm') || document.querySelector('[data-booking-form]');
    if (bookingForm) {
      if (!bookingForm.hasAttribute('toolname')) {
        bookingForm.setAttribute('toolname', 'bookHimalayanTrek');
        bookingForm.setAttribute('tooldescription', 'Calculates pricing and reserves a guided trekking expedition in Nepal with zero advance deposit.');
      }
    }

    const inquiryForm = document.getElementById('customTrekInquiryForm') || document.getElementById('contactForm');
    if (inquiryForm) {
      if (!inquiryForm.hasAttribute('toolname')) {
        inquiryForm.setAttribute('toolname', 'submitTrekInquiry');
        inquiryForm.setAttribute('tooldescription', 'Submits a customized itinerary inquiry or private group question to licensed trekking specialists.');
      }
    }

    const newsletterForms = document.querySelectorAll('[data-newsletter], .newsletter__form, .newsletter-form');
    newsletterForms.forEach(form => {
      if (!form.hasAttribute('toolname')) {
        form.setAttribute('toolname', 'newsletterSubscription');
        form.setAttribute('tooldescription', 'Subscribe to quarterly Himalayan expedition advice and trail updates.');
      }
    });
  } catch (err) {
    console.debug('WebMCP initialization note:', err);
  }
};
