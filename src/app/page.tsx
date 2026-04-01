"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

export default function AABCHomePage() {
  const [mode, setMode] = useState<'lounge' | 'observatory'>('lounge');
  const [time, setTime] = useState('');
  const isLounge = mode === 'lounge';

  // საათი სინქრონიზაციის ეფექტისთვის
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(`${now.getUTCHours().toString().padStart(2, '0')}:${now.getUTCMinutes().toString().padStart(2, '0')}:${now.getUTCSeconds().toString().padStart(2, '0')} UTC`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeed = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 font-sans ${isLounge
        ? 'bg-[#050505] text-zinc-400 selection:bg-[#D4AF37]/30'
        : 'bg-[#F2F2F2] text-zinc-600 selection:bg-black/20'
      }`}>

      {/* 1. TOP NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center transition-colors duration-1000 bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isLounge ? 'bg-[#D4AF37]' : 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'}`}></div>
          <span className="font-serif font-black text-xl tracking-widest text-white drop-shadow-md">
            AABC
          </span>
        </div>

        {/* The God-Tier Toggle */}
        <div className={`flex p-1 rounded-full border ${isLounge ? 'border-[#D4AF37]/30 bg-black/50' : 'border-white/30 bg-white/20'} backdrop-blur-md`}>
          <button
            onClick={() => setMode('lounge')}
            className={`px-4 py-1.5 md:px-5 md:py-2 text-[8px] md:text-[10px] tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${isLounge ? 'bg-[#D4AF37] text-black' : 'text-white/70 hover:text-white'
              }`}
          >
            Executive Lounge
          </button>
          <button
            onClick={() => setMode('observatory')}
            className={`px-4 py-1.5 md:px-5 md:py-2 text-[8px] md:text-[10px] tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${!isLounge ? 'bg-white text-black shadow-lg' : 'text-[#D4AF37]/50 hover:text-[#D4AF37]'
              }`}
          >
            Clinical Observatory
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION (MONUMENTAL) */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/monumental-portal.jpg"
          alt="AABC Monumental Headquarters"
          fill
          className={`object-cover transition-all duration-1000 ${isLounge ? 'brightness-[0.4] saturate-50' : 'brightness-[0.6] grayscale'
            }`}
          priority
        />

        {/* Gradient Overlay for smooth transition to the feed */}
        <div className={`absolute inset-0 transition-colors duration-1000 ${isLounge
            ? 'bg-gradient-to-b from-black/20 via-transparent to-[#050505]'
            : 'bg-gradient-to-b from-black/20 via-transparent to-[#F2F2F2]'
          }`}></div>

        {/* Hero Text */}
        <div className="relative z-10 text-center px-4 flex flex-col items-center mt-12">
          <h1 className={`text-7xl md:text-9xl lg:text-[14rem] font-serif font-black tracking-tighter leading-none mb-6 drop-shadow-2xl ${isLounge ? 'text-white' : 'text-white'
            }`}>
            AABC
          </h1>

          <div className="overflow-hidden">
            <p className={`text-xs md:text-sm lg:text-base font-mono tracking-[0.4em] uppercase max-w-3xl mx-auto drop-shadow-lg ${isLounge ? 'text-[#D4AF37]' : 'text-white font-bold'
              }`}>
              We watch the multiverse burn.<br />
              <span className={`mt-6 block text-[8px] md:text-[10px] tracking-[0.5em] opacity-80 ${isLounge ? 'text-zinc-400' : 'text-zinc-200'}`}>
                So you don't have to.
              </span>
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToFeed}
          className={`absolute bottom-12 flex flex-col items-center gap-3 font-mono text-[10px] tracking-widest uppercase transition-colors hover:opacity-100 z-20 ${isLounge ? 'text-[#D4AF37]/70 hover:text-[#D4AF37]' : 'text-white/70 hover:text-white'
            }`}
        >
          <span>Access Feed</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>

      {/* 3. MONITORING PANEL (THE FEED) */}
      <main className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto relative z-20">

        <header className={`mb-16 flex justify-between items-end pb-4 border-b ${isLounge ? 'border-white/10' : 'border-black/10'}`}>
          <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${isLounge ? 'text-white/50' : 'text-black/50'}`}>
            Global Monitoring Feed // Level 0
          </span>
          <span className={`font-mono text-[10px] tracking-[0.3em] uppercase ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>
            SYNC: {time || 'CONNECTING...'}
          </span>
        </header>

        {/* REALITY A: THE AUTHOR's DESK */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1 ${isLounge ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}>Reality A</span>
            <span className={`font-serif italic text-sm ${isLounge ? 'text-zinc-500' : 'text-zinc-500'}`}>Earth / The Author's Desk</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <Link href="/article/7_05_2024" className="group md:col-span-8 relative overflow-hidden flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
              <Image
                src="/images/evil_clowns_1200.webp"
                alt="Evil Clowns in Office"
                fill
                className={`object-cover transition-transform duration-1000 group-hover:scale-105 ${isLounge ? 'opacity-60 brightness-75 mix-blend-luminosity' : 'opacity-90 grayscale-[50%]'}`}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${isLounge ? 'from-[#050505] via-[#050505]/40' : 'from-[#F2F2F2] via-[#F2F2F2]/20'} to-transparent`}></div>

              <div className="relative z-10 p-8 w-full md:w-3/4">
                <span className={`font-mono text-[10px] tracking-widest uppercase mb-3 block ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>Editorial // Jul 05, 2024</span>
                <h2 className={`text-4xl md:text-5xl font-serif font-bold leading-tight mb-4 ${isLounge ? 'text-white' : 'text-black'}`}>
                  Evil Clowns in Office
                </h2>
                <p className={`line-clamp-2 ${isLounge ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  Is it possible that we choose such people as our representatives because they reflect our own hopes and aspirations?
                </p>
              </div>
            </Link>

            <Link href="/article/4_17_2024" className={`group md:col-span-4 p-8 flex flex-col justify-between border transition-colors ${isLounge ? 'bg-[#0A0A0A] border-white/5 hover:border-[#D4AF37]/30' : 'bg-white border-black/5 hover:border-black/30 shadow-sm hover:shadow-md'
              }`}>
              <div>
                <span className={`font-mono text-[10px] tracking-widest uppercase mb-6 block ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>Editorial // Apr 17, 2024</span>
                <h3 className={`text-2xl md:text-3xl font-serif font-bold leading-snug mb-4 ${isLounge ? 'text-zinc-200 group-hover:text-white' : 'text-black'}`}>
                  From Burgundy to Warfare
                </h3>
                <p className={`text-sm leading-relaxed ${isLounge ? 'text-zinc-500' : 'text-zinc-600'}`}>
                  Does anyone really believe that the forceful subjugation of one small island can actually make a meaningful difference to the greatness of a civilization?
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center mt-8 transition-colors ${isLounge ? 'border-white/10 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]' : 'border-black/20 group-hover:border-black group-hover:bg-black group-hover:text-white text-black'
                }`}>
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </div>
        </section>

        {/* REALITY B: THE CHRONICLES */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-8">
            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1 ${isLounge ? 'bg-cyan-900/30 text-cyan-400' : 'bg-black text-white'}`}>Reality B</span>
            <span className={`font-serif italic text-sm ${isLounge ? 'text-zinc-500' : 'text-zinc-500'}`}>7th Republic / The Leaked Chronicles</span>
          </div>

          <Link href="/novel/chapter-1" className={`group block w-full relative overflow-hidden border ${isLounge ? 'border-white/5' : 'border-black/10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-[300px] md:h-[450px]">
                <Image
                  src="/novel_images/the-awakening.jpg"
                  alt="The Awakening"
                  fill
                  className={`object-cover transition-transform duration-1000 group-hover:scale-105 ${isLounge ? 'brightness-75 mix-blend-luminosity' : 'grayscale-[30%]'}`}
                />
              </div>
              <div className={`p-8 md:p-16 flex flex-col justify-center ${isLounge ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
                <span className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block ${isLounge ? 'text-cyan-500' : 'text-black font-bold'}`}>FILE #001 // DECRYPTED</span>
                <h2 className={`text-4xl md:text-6xl font-serif font-black mb-6 ${isLounge ? 'text-white' : 'text-black'}`}>
                  Chapter 1.<br />The Awakening
                </h2>
                <p className={`text-lg leading-relaxed mb-8 ${isLounge ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Through the torrential rain and the suffocating midnight heat, the silhouette of the former St. Peter’s Basilica loomed over the city. Now the impregnable headquarters of the Holy Academy...
                </p>
                <span className={`font-mono text-xs tracking-widest uppercase font-bold inline-flex items-center gap-2 ${isLounge ? 'text-white group-hover:text-cyan-400' : 'text-black'}`}>
                  Access Archive <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* AABC INTERCEPTS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1 ${isLounge ? 'bg-red-500/10 text-red-500' : 'bg-red-600 text-white'}`}>AABC INTERCEPTS</span>
            <span className={`font-serif italic text-sm ${isLounge ? 'text-zinc-500' : 'text-zinc-500'}`}>Cross-Dimensional Signals</span>
          </div>

          <div className={`flex flex-col border-t ${isLounge ? 'border-white/5' : 'border-black/5'}`}>
            {[
              { title: "Interview with AA Trump", desc: "The leader of Reality A responds to George Orbeladze's critique.", id: "aa-trump" },
              { title: "Poco's Last Audio", desc: "The doomed scientist justifies the very system that is about to incinerate him.", id: "poco-last-flight" },
              { title: "The Creator's Delusion", desc: "We spoke with the man who thinks he invented the multiverse.", id: "creator-delusion" }
            ].map((broadcast, index) => (
              <Link
                href={`/aabc/${broadcast.id}`}
                key={index}
                className={`group grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 border-b transition-colors ${isLounge ? 'border-white/5 hover:bg-white/[0.02]' : 'border-black/5 hover:bg-black/[0.02]'
                  }`}
              >
                <div className="md:col-span-4 lg:col-span-3">
                  <h3 className={`text-xl font-serif font-bold ${isLounge ? 'text-zinc-200 group-hover:text-white' : 'text-black'}`}>
                    {broadcast.title}
                  </h3>
                </div>
                <div className="md:col-span-7 lg:col-span-8">
                  <p className={`text-sm ${isLounge ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    {broadcast.desc}
                  </p>
                </div>
                <div className={`md:col-span-1 flex justify-end font-mono text-[10px] tracking-widest uppercase ${isLounge ? 'text-[#D4AF37]/50 group-hover:text-[#D4AF37]' : 'text-black/40 group-hover:text-black font-bold'
                  }`}>
                  PLAY_AUDIO
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <footer className={`text-center py-12 font-mono text-[10px] tracking-[0.3em] uppercase border-t relative z-20 ${isLounge ? 'border-white/5 text-zinc-700 bg-[#050505]' : 'border-black/5 text-zinc-400 bg-[#F2F2F2]'
        }`}>
        &copy; {new Date().getFullYear()} AABC // OMNISCIENT PROTOCOL ACTIVE
      </footer>
    </div>
  );
}