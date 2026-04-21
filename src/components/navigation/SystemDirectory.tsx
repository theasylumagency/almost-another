'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rss, Terminal, X } from 'lucide-react';

const NAV_ITEMS = [
  {
    href: '/',
    label: 'Monitor',
    title: 'Home',
    description: 'The project map and cross-content entry point.',
  },
  {
    href: '/terminal',
    label: 'Terminal',
    title: 'Restricted Archive',
    description: 'Cartography, prefecture files, and signal protocol fragments.',
  },
  {
    href: '/articles',
    label: 'Reality A',
    title: 'Essays',
    description: 'The editorial archive and the fastest way into the system.',
  },
  {
    href: '/dialogues',
    label: 'AABC',
    title: 'Dialogues',
    description: 'Attached counter-voices and companion transmissions.',
  },
  {
    href: '/novel',
    label: 'Reality B',
    title: 'Chronicle',
    description: 'The narrative branch that lives beyond the essays.',
  },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default function SystemDirectory() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 border border-white/15 bg-black/90 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white shadow-2xl backdrop-blur transition-colors hover:bg-white hover:text-black sm:bottom-6 sm:right-6"
        title="Open system directory"
      >
        <Terminal className="h-4 w-4" />
        Index
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 text-white backdrop-blur-sm">
          <div className="mx-auto flex h-full max-w-6xl flex-col px-6 py-6 sm:px-8 sm:py-8">
            <div className="mb-10 flex items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Archive Navigation
                </div>
                <div className="serif-display mt-3 text-3xl text-white sm:text-4xl">
                  System Directory
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Most readers arrive through a single essay. Use this index to move laterally across the
                  archive instead of treating one page as the whole site.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 transition-colors hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group border p-6 transition-colors ${active
                        ? 'border-red-500/40 bg-red-500/10'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                          {item.label}
                        </p>
                        <h3 className="serif-display mt-3 text-2xl text-white">{item.title}</h3>
                      </div>
                      {active && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-300">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                      {item.description}
                    </p>
                  </Link>
                );
              })}

              <a
                href="/feed.xml"
                className="group border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.04] lg:col-span-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                      Follow
                    </p>
                    <h3 className="serif-display mt-3 text-2xl text-white">RSS Feed</h3>
                  </div>
                  <Rss className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-white" />
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400">
                  Add the feed to your reader and you no longer need to rediscover the project through
                  someone else&apos;s thread.
                </p>
              </a>
            </div>

            <div className="mt-auto pt-10 font-mono text-xs uppercase tracking-[0.24em] text-zinc-600">
              _ archive map online
            </div>
          </div>
        </div>
      )}
    </>
  );
}
