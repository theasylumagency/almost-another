"use client";

import Link from 'next/link';
import { useEffect, useRef, useState, useEffectEvent } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface ReaderPathDockProps {
  articleSlug: string;
  title: string;
  href: string;
  description: string;
}

export default function ReaderPathDock({
  articleSlug,
  title,
  href,
  description,
}: ReaderPathDockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const hasTrackedView = useRef(false);

  const handleScroll = useEffectEvent(() => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    const nextVisibility = progress >= 32 && !isDismissed;

    setIsVisible(nextVisibility);

    if (nextVisibility && !hasTrackedView.current) {
      hasTrackedView.current = true;
      trackEvent('reader_path_dock_viewed', {
        article_slug: articleSlug,
        target_href: href,
      });
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-4 bottom-20 z-[65] md:hidden">
      <div className="overflow-hidden border border-white/10 bg-zinc-950/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary-container">
              Continue Reading
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsDismissed(true);
              setIsVisible(false);
              trackEvent('reader_path_dock_dismissed', {
                article_slug: articleSlug,
                target_href: href,
              });
            }}
            className="shrink-0 text-zinc-500 transition-colors hover:text-white"
            aria-label="Dismiss reading suggestion"
          >
            <X size={18} />
          </button>
        </div>

        <Link
          href={href}
          onClick={() =>
            trackEvent('reader_path_dock_clicked', {
              article_slug: articleSlug,
              target_href: href,
            })
          }
          className="flex items-center justify-between gap-4 px-4 py-4"
        >
          <div>
            <p className="serif-display text-xl leading-tight text-white">{title}</p>
            <p className="mt-2 font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Open Next Path
            </p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-200">
            <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
}
