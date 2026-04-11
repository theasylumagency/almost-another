'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Terminal } from 'lucide-react';

export default function SystemDirectory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 border border-white/20 bg-black p-3 font-mono text-xs uppercase tracking-widest text-white shadow-2xl transition-colors hover:bg-white hover:text-black"
        title="Open System Directory"
      >
        <Terminal className="h-4 w-4" />
        SYS.DIR
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 text-white backdrop-blur-sm">
          <div className="flex h-full flex-col p-6 sm:p-8">
            <div className="mb-8 flex items-start justify-between">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500">
                  Global Struct. Navigation
                </div>
                <div className="mt-2 serif-display text-2xl text-white sm:text-3xl">
                  System Directory
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 transition-colors hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="font-mono text-sm leading-8 sm:text-base">
              <div>
                [/] ROOT{' '}
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="ml-4 text-xs tracking-widest text-zinc-600 transition-colors hover:text-white"
                >
                  [MONITOR - HOME]
                </Link>
              </div>

              <div className="mt-4">
                ┣━━ REALITY A
                <div className="ml-8">
                  ┗━━{' '}
                  <Link
                    href="/articles"
                    onClick={() => setIsOpen(false)}
                    className="border-b border-transparent pb-0.5 text-zinc-300 transition-colors hover:border-accent hover:text-accent hover:underline"
                  >
                    [INSIGHTS / ESSAYS]
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                ┣━━ REALITY B
                <div className="ml-8">
                  ┗━━{' '}
                  <Link
                    href="/novel"
                    onClick={() => setIsOpen(false)}
                    className="border-b border-transparent pb-0.5 text-zinc-300 transition-colors hover:border-accent hover:text-accent hover:underline"
                  >
                    [BREAKING THE PARADIGM]
                  </Link>
                </div>
              </div>

              <div className="mt-4">
                ┗━━ DIALOGUES
                <div className="ml-8">
                  ┗━━{' '}
                  <Link
                    href="/dialogues"
                    onClick={() => setIsOpen(false)}
                    className="border-b border-transparent pb-0.5 text-zinc-300 transition-colors hover:border-accent hover:text-accent hover:underline"
                  >
                    [ENTER DIALOGUES]
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10 font-mono text-xs uppercase tracking-[0.24em] text-zinc-600">
              _ awaiting input...
            </div>
          </div>
        </div>
      )}
    </>
  );
}