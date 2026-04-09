"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ShieldAlert, FileText, Fingerprint } from 'lucide-react';
import LiveClock from '@/components/aabc/LiveClock';

interface BroadcastData {
  slug: string;
  id?: string;
  reality?: string;
  status?: string;
  title?: string;
  subject?: string;
  description?: string;
  date?: string;
}

export default function AABCHubClient({ broadcasts }: { broadcasts: BroadcastData[] }) {
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

        <div className={`hidden md:flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase ${isLounge ? 'text-zinc-600' : 'text-zinc-400'}`}>
          <div className="flex items-center gap-2"><ShieldAlert size={14} className={isLounge ? "text-red-900" : "text-red-500"} /> System secure</div>
          <div className="flex items-center gap-2"><Fingerprint size={14} /> Identity verified</div>
        </div>

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
        <header className="mb-32 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative">
          {/* Background decorative elements */}
          {!isLounge && (
            <div className="absolute -top-32 right-0 w-96 h-96 bg-zinc-300 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          )}
          {isLounge && (
            <div className="absolute -top-32 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
          )}

          <div className="lg:col-span-7 relative z-10">
            <div className={`hidden md:block absolute -left-8 top-4 w-1 h-20 ${isLounge ? 'bg-[#D4AF37]' : 'bg-black'}`}></div>
            <h1 className={`text-6xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.85] ${isLounge ? 'text-white' : 'text-black'
              }`}>
              AABC
            </h1>
            <div className="mt-8 font-mono text-xs tracking-[0.3em] uppercase flex items-center gap-4">
               <span className={`w-2 h-2 rounded-full animate-pulse ${isLounge ? 'bg-red-800' : 'bg-red-500'}`}></span>
               Live Omniscient Protocol Active
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end pb-4 z-10 glass-panel md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none">
            <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-4 ${isLounge ? 'text-[#D4AF37]/80' : 'text-black/60'
              }`}>
              <span className="opacity-50 inline-block mr-2">[SYS.TIME]</span> <LiveClock />
            </p>
            <p className={`text-lg md:text-xl leading-relaxed ${isLounge ? 'text-zinc-400' : 'text-zinc-700'
              }`}>
              We watch the multiverse burn. We observe the spectacle of ambition, dogma, and ruin.<br />
              <span className={`font-serif italic mt-4 block text-2xl ${isLounge ? 'text-[#D4AF37]' : 'font-bold text-black'}`}>
                So you don't have to get your hands dirty.
              </span>
            </p>
          </div>
        </header>

        {/* The Dossier List */}
        <section className="w-full relative z-10">
          <div className={`flex justify-between items-end pb-4 border-b ${isLounge ? 'border-white/10' : 'border-black/10'
            }`}>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase flex items-center gap-2">
              <FileText size={14}/> Intercepted Transmissions
            </span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase hidden md:inline-block">Action</span>
          </div>

          <div className="flex flex-col">
            {broadcasts.map((broadcast) => {
              // Ensure we fallback if frontmatter didn't provide specific fields
              const id = broadcast.slug;
              const title = broadcast.title || "Unknown Intercept";
              const reality = broadcast.reality || "UNKNOWN REALITY";
              const status = broadcast.status || "DECRYPTED";
              const subject = broadcast.subject || "CLASSIFIED";
              const description = broadcast.description || "No description available.";
              const date = broadcast.date || "UNKNOWN DATE";

              return (
              <Link
                href={`/aabc/${id}`}
                key={id}
                className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-10 border-b transition-all duration-500 ${isLounge
                    ? 'border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/[0.02]'
                    : 'border-black/5 hover:border-black/40 hover:bg-black/[0.02]'
                  }`}
              >
                {/* Metadata Column */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                  <span className={`font-mono text-xs tracking-[0.2em] uppercase ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'
                    }`}>
                    {reality}
                  </span>
                  <span className={`font-mono text-[10px] tracking-widest uppercase ${isLounge ? 'text-zinc-600' : 'text-zinc-500'}`}>
                    {status} // {date}
                  </span>
                </div>

                {/* Title & Desc Column */}
                <div className="lg:col-span-7 flex flex-col gap-3 pr-8">
                  <span className={`font-sans text-[10px] tracking-widest uppercase opacity-60 flex items-center gap-2 ${isLounge ? 'text-white' : 'text-black'
                    }`}>
                    SUBJECT: {subject}
                  </span>
                  <h2 className={`text-3xl md:text-5xl font-serif font-bold leading-tight transition-transform duration-500 group-hover:translate-x-2 ${isLounge ? 'text-zinc-200 group-hover:text-white' : 'text-black'
                    }`}>
                    {title}
                  </h2>
                  <p className={`text-sm md:text-base max-w-2xl transition-opacity duration-500 line-clamp-2 md:line-clamp-none ${isLounge ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-zinc-600 group-hover:text-zinc-800'
                    }`}>
                    {description}
                  </p>
                </div>

                {/* Action Column */}
                <div className="lg:col-span-2 flex justify-end mt-4 lg:mt-0">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${isLounge
                      ? 'border-white/10 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black text-white bg-black/50 backdrop-blur'
                      : 'border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white text-black bg-white/50 backdrop-blur'
                    }`}>
                    <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" size={20} />
                  </div>
                </div>
              </Link>
            )})}
          </div>
        </section>

      </main>

      <footer className={`py-12 border-t mt-32 text-center font-mono text-[10px] tracking-[0.3em] uppercase ${isLounge ? 'text-zinc-700 border-white/5' : 'text-zinc-400 border-black/5'
        }`}>
        &copy; {new Date().getFullYear()} AABC // OMNISCIENT PROTOCOL
      </footer>
    </div>
  );
}
