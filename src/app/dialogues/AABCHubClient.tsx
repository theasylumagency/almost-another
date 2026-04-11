"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ShieldAlert, FileText, Fingerprint } from 'lucide-react';
import LiveClock from '@/components/aabc/LiveClock';

interface BroadcastData {
  slug: string;
  id?: string;
  reality?: string;
  research_reality?: string;
  status?: string;
  title?: string;
  subject?: string;
  description?: string;
  date?: string;
  format?: string;
}

export default function AABCHubClient({ broadcasts }: { broadcasts: BroadcastData[] }) {
  return (
    <div className="min-h-screen font-sans bg-[#050505] text-zinc-400 selection:bg-red-900 selection:text-white">

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="inline-flex items-center gap-4 text-zinc-500 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase hidden sm:block">Disconnect</span>
        </Link>

        {/* Global Metadata */}
        <div className="flex p-1 rounded-sm border border-white/10 bg-black/50 backdrop-blur">
          <div className="px-4 py-2 font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
            SYS_SEVERITY: NOMINAL
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-32 px-6 sm:px-12 lg:px-24 xl:pr-36 max-w-[1800px] mx-auto">

        {/* Hero Section - Asymmetrical */}
        <header className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative border-b border-white/10 pb-24">
          <div className="lg:col-span-8 relative z-10 flex flex-col items-start">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-red-700/80 mb-8 border border-white/10 px-4 py-2">
              Omniscient Protocol
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.8] text-white lowercase">
              Intercepts
            </h1>
            <div className="mt-12 font-mono text-xs tracking-[0.4em] uppercase flex items-center gap-6 text-zinc-500 border border-white/5 px-6 py-4 bg-black/50">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_red]"></span>
              Live surveillance net active
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end lg:pt-32 z-10">
            <div className="border-l border-white/20 pl-8 lg:pl-12 py-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-8 text-zinc-600">
                <span className="opacity-50 inline-block mr-2">[SYS.TIME]</span> <LiveClock />
              </p>
              <p className="text-xl leading-relaxed text-zinc-400 font-light">
                We watch the multiverse burn. We observe the spectacle of ambition, dogma, and ruin.
                <span className="font-serif italic mt-6 block text-3xl text-zinc-300">
                  So you don't have to get your hands dirty.
                </span>
              </p>
            </div>
          </div>
        </header>

        {/* The Dossier List */}
        <section className="w-full relative z-10">
          <div className="flex justify-between items-end pb-8 border-b border-white/10 mb-12">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase flex items-center gap-4 text-zinc-500">
              Decrypted Signal Archive
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase hidden md:inline-block text-zinc-700">Classification</span>
          </div>

          <div className="flex flex-col gap-8">
            {broadcasts.map((broadcast) => {
              const id = broadcast.slug;
              const title = broadcast.title || "Unknown Intercept";
              const reality = broadcast.reality || broadcast.research_reality || "UNKNOWN M-DIMENSION";
              const subject = broadcast.subject || "CLASSIFIED";
              const date = broadcast.date || "UNKNOWN DATE";
              const format = broadcast.format || "interview";
              const isDiscussion = format === 'discussion';

              return (
                <Link
                  href={`/dialogues/${id}`}
                  key={id}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-8 px-6 bg-black border border-white/5 transition-all duration-700 hover:border-white/20 hover:bg-white/[0.02]"
                >
                  {/* Metadata Column */}
                  <div className="lg:col-span-2 flex flex-col gap-4">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-600">
                      R-{reality}
                    </span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-red-800/80">
                      {date}
                    </span>
                  </div>

                  {/* Title & Desc Column */}
                  <div className="lg:col-span-8 flex flex-col gap-3 pr-8 lg:border-l lg:border-r border-white/10 lg:px-12">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`font-mono text-[9px] tracking-widest uppercase px-3 py-1 border ${isDiscussion ? 'border-zinc-800 text-zinc-500' : 'border-[#D4AF37]/30 text-[#D4AF37]/80'}`}>
                        {isDiscussion ? 'THEORY' : 'INTERCEPT'}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif leading-[1.1] transition-colors duration-700 text-zinc-300 group-hover:text-white">
                      {title}
                    </h2>
                    <p className="text-sm md:text-base max-w-xl transition-colors duration-700 text-zinc-600 font-light mt-4 leading-relaxed group-hover:text-zinc-400">
                      {broadcast.description || "The structure is observed and logged."}
                    </p>
                  </div>

                  {/* Action Column */}
                  <div className="lg:col-span-2 flex flex-col justify-between items-end h-full">
                    <span className="font-mono text-[9px] tracking-widest uppercase opacity-40 text-right">
                      SUB: {subject}
                    </span>
                    <div className="w-12 h-12 mt-8 lg:mt-0 rounded-none border border-white/10 flex items-center justify-center transition-all duration-700 group-hover:border-white text-zinc-600 group-hover:bg-white group-hover:text-black">
                      <ArrowUpRight className="transition-transform duration-700 group-hover:rotate-45" size={20} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

      </main>

      <footer className="py-12 border-t mt-32 text-center font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-700 border-white/5">
        &copy; {new Date().getFullYear()} Almost Another // OMNISCIENT PROTOCOL
      </footer>
    </div>
  );
}
