'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, Terminal } from 'lucide-react';

export default function SystemDirectory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] bg-black border border-white/20 text-white p-3 hover:bg-white hover:text-black transition-colors font-mono text-xs tracking-widest uppercase flex items-center gap-2 shadow-2xl"
        title="Open System Directory"
      >
        <Terminal size={16} />
        <span className="hidden md:inline font-bold">SYS.DIR</span>
      </button>

      {/* Fullscreen Overlay */}
      <div 
        className={`fixed inset-0 z-[70] bg-[#050505] text-zinc-400 font-mono transition-all duration-700 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute top-0 left-0 w-full p-6 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-600 animate-pulse border border-black" />
            <span className="text-xs tracking-[0.3em] uppercase text-zinc-500">Global Struct. Navigation</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="h-full flex items-center justify-center p-6">
          <div className="w-full max-w-3xl text-sm md:text-base lg:text-lg leading-loose tracking-[0.2em] uppercase">
            
            {/* The Tree */}
            <div className="group mb-2">
              <span className="text-white font-bold">[/] ROOT</span>
              <Link href="/" onClick={() => setIsOpen(false)} className="ml-4 text-xs tracking-widest text-zinc-600 hover:text-white transition-colors">
                [MONITOR - HOME]
              </Link>
            </div>
            
            <div>&nbsp;┣━━ <span className="text-zinc-500 font-bold">AABC STUDIO</span></div>
            <div>&nbsp;┃&nbsp;&nbsp;&nbsp;&nbsp;┗━━ <Link href="/aabc" onClick={() => setIsOpen(false)} className="text-zinc-300 hover:text-accent transition-colors hover:underline border-b border-transparent hover:border-accent pb-0.5">
              [ACCESS BROADCASTS]
            </Link></div>
            
            <div>&nbsp;┃</div>
            <div>&nbsp;┣━━ <span className="text-zinc-500 font-bold">REALITY A</span></div>
            <div>&nbsp;┃&nbsp;&nbsp;&nbsp;&nbsp;┗━━ <Link href="/articles" onClick={() => setIsOpen(false)} className="text-zinc-300 hover:text-accent transition-colors hover:underline border-b border-transparent hover:border-accent pb-0.5">
              [INSIGHTS / ESSAYS]
            </Link></div>
            
            <div>&nbsp;┃</div>
            <div>&nbsp;┣━━ <span className="text-zinc-500 font-bold">REALITY B</span></div>
            <div>&nbsp;┃&nbsp;&nbsp;&nbsp;&nbsp;┗━━ <Link href="/novel" onClick={() => setIsOpen(false)} className="text-zinc-300 hover:text-accent transition-colors hover:underline border-b border-transparent hover:border-accent pb-0.5">
              [BREAKING THE PARADIGM]
            </Link></div>
            
            <div>&nbsp;┃</div>
            <div>&nbsp;┗━━ <span className="text-zinc-500 font-bold">CONVERSATIONS</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┗━━ <Link href="/interviews" onClick={() => setIsOpen(false)} className="text-zinc-300 hover:text-accent transition-colors hover:underline border-b border-transparent hover:border-accent pb-0.5">
              [INTERVIEWS]
            </Link></div>
            
            <div className="mt-16 pt-8 border-t border-white/5 text-xs text-zinc-700 animate-pulse">
              _ awaiting input...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
