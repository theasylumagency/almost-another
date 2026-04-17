"use client";

import { useEffect, useEffectEvent, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface ArticleEngagementTrackerProps {
  slug: string;
  title: string;
}

const DEPTH_MARKERS = [25, 50, 75, 90];

export default function ArticleEngagementTracker({
  slug,
  title,
}: ArticleEngagementTrackerProps) {
  const sentMarkers = useRef(new Set<number>());

  const handleScroll = useEffectEvent(() => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

    DEPTH_MARKERS.forEach((marker) => {
      if (progress >= marker && !sentMarkers.current.has(marker)) {
        sentMarkers.current.add(marker);
        trackEvent('article_scroll_depth', {
          article_slug: slug,
          article_title: title,
          depth: marker,
        });
      }
    });
  });

  useEffect(() => {
    trackEvent('article_viewed', {
      article_slug: slug,
      article_title: title,
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug, title]);

  return null;
}
