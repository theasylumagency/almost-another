"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', name, params);
}
