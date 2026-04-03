"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import LiveClock from '@/components/aabc/LiveClock';

const broadcasts = [
  {
    id: 'aa-trump',
    reality: 'REALITY A',
    status: 'DECRYPTED',
    title: "The Author is Afraid of His Own Mirror",
    subject: "AA TRUMP",
    description: "The leader of Reality A responds to the critique, exposing the hypocrisies of the so-called 'Republic' and the bloodlust of the masses.",
    date: "2026.07.06"
  },
  {
    id: 'poco-last-flight',
    reality: 'REALITY B',
    status: 'FINAL TRANSMISSION',
    title: "Father Polycarp's Flight to the End",
    subject: "POCO",
    description: "A leaked audio transmission. The doomed scientist uses his last moments to justify the very system that is about to incinerate him.",
    date: "2026.03.27"
  },
  {
    id: 'creator-delusion',
    reality: 'THE META-DESK',
    status: 'LIVE INTERROGATION',
    title: "The Creator's Delusion",
    subject: "GEORGE O.",
    description: "We spoke with the man who thinks he invented the multiverse. He still believes the 283 dead passengers are just an 'allegory'.",
    date: "2026.04.01"
  }
];

export default function AABCHub() {
  const [mode, setMode] = useState<'lounge' | 'observatory'>('lounge');
  const isLounge = mode === 'lounge';

  return (
    <div className={`min-h-screen transition-colors duration-1000 font-sans ${isLounge
        ? 'bg-[#050505] text-zinc-400 selection:bg-[#D4AF37]/30'
        : 'bg-[#F2F2F2] text-zinc-600 selection:bg-black/20'
      }`}>

      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-colors duration-1000 ${isLounge ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5' : 'bg-[#F2F2F2]/80 backdrop-blur-md border-b border-black/5'
        }`}>
        <Link href="/" className={`inline-flex items-center gap-3 transition-colors ${isLounge ? 'text-zinc-500 hover:text-[#D4AF37]' : 'text-zinc-500 hover:text-black'
          }`}>
          <ArrowLeft size={16} />
          <span className="font-mono text-xs tracking-[0.2em] uppercase">Disconnect</span>
        </Link>

        {/* The God-Tier Mode Switch */}
        <div className={`flex p-1 rounded-full border ${isLounge ? 'border-[#D4AF37]/20 bg-black' : 'border-black/10 bg-white'
          }`}>
          <button
            onClick={() => setMode('lounge')}
            className={`px-5 py-2 text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${isLounge ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-zinc-400 hover:text-black'
              }`}
          >
            The Executive Lounge
          </button>
          <button
            onClick={() => setMode('observatory')}
            className={`px-5 py-2 text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${!isLounge ? 'bg-black text-white shadow-lg' : 'text-zinc-400 hover:text-[#D4AF37]'
              }`}
          >
            Clinical Observatory
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8 md:px-16 max-w-[1400px] mx-auto">

        {/* Hero Section - Asymmetrical */}
        <header className="mb-32 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 relative">
            <div className={`absolute -left-8 top-4 w-1 h-20 ${isLounge ? 'bg-[#D4AF37]' : 'bg-black'}`}></div>
            <h1 className={`text-6xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.85] ${isLounge ? 'text-white' : 'text-black'
              }`}>
              AABC
            </h1>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end pb-4">
            <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-4 ${isLounge ? 'text-[#D4AF37]/70' : 'text-black/50'
              }`}>
              Live Feed // <LiveClock />
            </p>
            <p className={`text-lg leading-relaxed ${isLounge ? 'text-zinc-400' : 'text-zinc-700'
              }`}>
              We watch the multiverse burn. We observe the spectacle of ambition, dogma, and ruin.<br />
              <span className={`font-serif italic mt-2 block ${isLounge ? 'text-[#D4AF37]' : 'font-bold text-black'}`}>
                So you don't have to get your hands dirty.
              </span>
            </p>
          </div>
        </header>

        {/* The Dossier List (List Layout instead of Grid) */}
        <section className="w-full">
          <div className={`flex justify-between items-end pb-4 border-b ${isLounge ? 'border-white/10' : 'border-black/10'
            }`}>
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Intercepted Transmissions</span>
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Action</span>
          </div>

          <div className="flex flex-col">
            {broadcasts.map((broadcast) => (
              <Link
                href={`/aabc/${broadcast.id}`}
                key={broadcast.id}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-10 border-b transition-all duration-500 ${isLounge
                    ? 'border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/[0.02]'
                    : 'border-black/5 hover:border-black/40 hover:bg-black/[0.02]'
                  }`}
              >
                {/* Metadata Column */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                  <span className={`font-mono text-xs tracking-[0.2em] uppercase ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'
                    }`}>
                    {broadcast.reality}
                  </span>
                  <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                    {broadcast.status} // {broadcast.date}
                  </span>
                </div>

                {/* Title & Desc Column */}
                <div className="lg:col-span-7 flex flex-col gap-3 pr-8">
                  <span className={`font-sans text-xs tracking-widest uppercase opacity-50 ${isLounge ? 'text-white' : 'text-black'
                    }`}>
                    SUBJECT: {broadcast.subject}
                  </span>
                  <h2 className={`text-3xl md:text-5xl font-serif font-bold leading-tight transition-transform duration-500 group-hover:translate-x-2 ${isLounge ? 'text-zinc-200' : 'text-black'
                    }`}>
                    {broadcast.title}
                  </h2>
                  <p className={`text-sm max-w-xl transition-opacity duration-500 ${isLounge ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-zinc-500 group-hover:text-zinc-800'
                    }`}>
                    {broadcast.description}
                  </p>
                </div>

                {/* Action Column */}
                <div className="lg:col-span-2 flex justify-end">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isLounge
                      ? 'border-white/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black text-white'
                      : 'border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white text-black'
                    }`}>
                    <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <footer className={`py-8 text-center font-mono text-xs tracking-[0.2em] uppercase mt-20 ${isLounge ? 'text-zinc-500' : 'text-zinc-500'
        }`}>
        &copy; {new Date().getFullYear()} AABC // OMNISCIENT PROTOCOL
      </footer>
    </div>
  );
}