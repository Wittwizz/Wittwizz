/**
 * Analytics utility functions for Wittwizz Digital
 * Provides centralized tracking for user interactions and deep link sharing
 */

export interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

/**
 * Track an analytics event
 * Supports multiple analytics providers and fallback to console logging
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>): void => {
  const event: AnalyticsEvent = {
    eventName,
    properties,
    timestamp: Date.now()
  };

  // Console logging for development (always active)
  console.log('📊 Analytics Event:', event);

  // Google Analytics 4 (if available)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', eventName, {
        ...properties,
        event_timestamp: event.timestamp
      });
    } catch (error) {
      console.warn('Failed to send to Google Analytics:', error);
    }
  }

  // Google Tag Manager (if available)
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    try {
      (window as any).dataLayer.push({
        event: eventName,
        ...properties,
        event_timestamp: event.timestamp
      });
    } catch (error) {
      console.warn('Failed to send to Google Tag Manager:', error);
    }
  }

  // Custom analytics endpoint (if configured)
  if (typeof window !== 'undefined' && (window as any).WITTWIZZ_ANALYTICS_ENDPOINT) {
    try {
      fetch((window as any).WITTWIZZ_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).catch(error => {
        console.warn('Failed to send to custom analytics endpoint:', error);
      });
    } catch (error) {
      console.warn('Failed to send to custom analytics endpoint:', error);
    }
  }
};

/**
 * Track deep link related events
 */
export const trackDeepLinkEvent = {
  /**
   * Track when a deep link is opened
   */
  opened: (type: 'preset' | 'custom' | 'mode_only', properties?: Record<string, any>) => {
    trackEvent('deep_link_open', {
      type,
      ...properties
    });
  },

  /**
   * Track when a link is copied
   */
  copied: (url: string, mode: string, itemsCount: number, items: string[]) => {
    trackEvent('link_copied', {
      url,
      mode,
      items_count: itemsCount,
      items
    });
  },

  /**
   * Track when link copying fails
   */
  copyFailed: (error: string, mode: string, itemsCount: number) => {
    trackEvent('link_copy_failed', {
      error,
      mode,
      items_count: itemsCount
    });
  }
};

/**
 * Track calculator interactions
 */
export const trackCalculatorEvent = {
  /**
   * Track preset selection
   */
  presetSelected: (presetId: string, presetName: string, itemsCount: number) => {
    trackEvent('preset_selected', {
      preset_id: presetId,
      preset_name: presetName,
      items_count: itemsCount
    });
  },

  /**
   * Track item toggle (add/remove)
   */
  itemToggled: (itemId: string, itemName: string, action: 'added' | 'removed', totalItems: number) => {
    trackEvent('item_toggled', {
      item_id: itemId,
      item_name: itemName,
      action,
      total_items: totalItems
    });
  },

  /**
   * Track mode change
   */
  modeChanged: (fromMode: string, toMode: string) => {
    trackEvent('mode_changed', {
      from_mode: fromMode,
      to_mode: toMode
    });
  }
};

/**
 * Initialize analytics (call this early in your app)
 */
export const initializeAnalytics = (): void => {
  // Set up any global analytics configuration
  if (typeof window !== 'undefined') {
    // Example: Set custom analytics endpoint
    // (window as any).WITTWIZZ_ANALYTICS_ENDPOINT = 'https://api.wittwizz.com/analytics';
    
    console.log('📊 Analytics initialized');
  }
};

/**
 * Get analytics status for debugging
 */
export const getAnalyticsStatus = (): Record<string, boolean> => {
  if (typeof window === 'undefined') {
    return { available: false, reason: 'Server-side rendering' };
  }

  return {
    available: true,
    googleAnalytics: !!(window as any).gtag,
    googleTagManager: !!(window as any).dataLayer,
    customEndpoint: !!(window as any).WITTWIZZ_ANALYTICS_ENDPOINT
  };
};
