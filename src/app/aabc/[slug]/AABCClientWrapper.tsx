"use client";

import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, PlaySquare, Pause } from 'lucide-react';

export default function AABCClientWrapper({
    frontmatter,
    content,
    relatedBroadcasts
}: {
    frontmatter: any;
    content: ReactNode;
    relatedBroadcasts: any[];
}) {
    const [mode, setMode] = useState<'lounge' | 'observatory'>('lounge');
    const [isPlaying, setIsPlaying] = useState(false);
    const isLounge = mode === 'lounge';

    // ანიმაციური საათი
    const [time, setTime] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(`${now.getUTCHours().toString().padStart(2, '0')}:${now.getUTCMinutes().toString().padStart(2, '0')}:${now.getUTCSeconds().toString().padStart(2, '0')} UTC`);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-1000 font-sans ${isLounge ? 'bg-[#050505] text-zinc-400 selection:bg-[#D4AF37]/30' : 'bg-[#F2F2F2] text-zinc-600 selection:bg-black/20'
            }`}>

            {/* 1. TOP NAVIGATION */}
            <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-colors duration-1000 ${isLounge ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5' : 'bg-[#F2F2F2]/90 backdrop-blur-md border-b border-black/5'
                }`}>
                <Link href="/" className={`inline-flex items-center gap-3 transition-colors ${isLounge ? 'text-zinc-500 hover:text-[#D4AF37]' : 'text-zinc-500 hover:text-black'}`}>
                    <ArrowLeft size={16} />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase hidden sm:block">Back to Monitor</span>
                </Link>

                <div className={`flex p-1 rounded-full border ${isLounge ? 'border-[#D4AF37]/20 bg-black' : 'border-black/10 bg-white'}`}>
                    <button
                        onClick={() => setMode('lounge')}
                        className={`px-4 py-1.5 md:px-5 md:py-2 text-[8px] md:text-[10px] tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${isLounge ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-zinc-400 hover:text-black'}`}
                    >
                        Lounge
                    </button>
                    <button
                        onClick={() => setMode('observatory')}
                        className={`px-4 py-1.5 md:px-5 md:py-2 text-[8px] md:text-[10px] tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${!isLounge ? 'bg-black text-white shadow-lg' : 'text-zinc-400 hover:text-[#D4AF37]'}`}
                    >
                        Observatory
                    </button>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1000px] mx-auto">

                {/* 2. HEADER & PLAYER */}
                <header className="mb-16 border-b pb-12" style={{ borderColor: isLounge ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1 mb-4 inline-block ${isLounge ? 'bg-red-500/10 text-red-500' : 'bg-red-600 text-white'}`}>
                                INTERCEPTED: {frontmatter.type || 'AUDIO LOG'}
                            </span>
                            <h1 className={`text-4xl md:text-6xl font-serif font-black tracking-tighter leading-tight ${isLounge ? 'text-white' : 'text-black'}`}>
                                {frontmatter.title}
                            </h1>
                        </div>
                    </div>

                    <p className={`text-lg md:text-xl font-light mb-12 ${isLounge ? 'text-zinc-500' : 'text-zinc-600'}`}>
                        {frontmatter.description}
                    </p>

                    {/* Fake Audio Player */}
                    <div className={`flex items-center gap-6 p-6 rounded-xl border ${isLounge ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-black/10 shadow-lg'}`}>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isLounge ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-black text-white hover:bg-[#D4AF37]'}`}
                        >
                            {isPlaying ? <Pause size={24} /> : <PlaySquare size={24} className="ml-1" />}
                        </button>
                        <div className="flex-1">
                            <div className="flex justify-between mb-2">
                                <span className={`font-mono text-[10px] tracking-widest uppercase ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>
                                    {isPlaying ? 'DECRYPTING AUDIO...' : 'SIGNAL READY'}
                                </span>
                                <span className="font-mono text-[10px] text-zinc-500 tracking-widest">{time}</span>
                            </div>
                            {/* Visualizer Bars */}
                            <div className="flex items-end gap-1 h-8">
                                {[...Array(30)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-full rounded-t-sm transition-all duration-100 ${isLounge ? 'bg-[#D4AF37]/40' : 'bg-black/30'}`}
                                        style={{
                                            height: isPlaying ? `${Math.random() * 100}%` : '10%',
                                            animation: isPlaying ? `pulse ${0.5 + Math.random()}s infinite` : 'none'
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </header>

                {/* 3. THE TRANSCRIPT (MDX Content) */}
                <article className={`prose prose-lg md:prose-xl max-w-none font-sans leading-relaxed mb-24 transition-colors duration-1000
          ${isLounge
                        ? 'prose-invert prose-p:text-zinc-300 prose-headings:text-white prose-strong:text-[#D4AF37] prose-a:text-[#D4AF37]'
                        : 'prose-p:text-zinc-800 prose-headings:text-black prose-strong:text-black prose-a:text-black'
                    }
        `}>
                    {content}
                </article>
                {/* 4.5 THE CYNICAL DONATION BLOCK (AABC STYLE) */}
                <div className={`p-8 md:p-12 mb-24 border ${isLounge ? 'bg-[#0A0A0A]/50 border-white/5' : 'bg-white border-black/10 shadow-lg'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isLounge ? 'bg-[#D4AF37]' : 'bg-black'}`}></span>
                        <h3 className={`font-mono text-[10px] tracking-[0.3em] uppercase ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>
                            SYSTEM MESSAGE // CURRENCY TRANSFER
                        </h3>
                    </div>

                    <p className={`text-sm md:text-base leading-relaxed mb-8 font-mono ${isLounge ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        <span className={isLounge ? 'text-white font-bold' : 'text-black font-bold'}>AABC DOES NOT REQUIRE YOUR CURRENCY.</span> We are funded by the inevitable collapse of civilizations. However, the primitive author from Reality A who intercepts our signals (George) is constantly complaining about server maintenance and demanding 'Grand Cru' Burgundy wine.
                        <br /><br />
                        If you wish to fund his pathetic earthly delusions, you may drop your digital coins below. We promise not to take a cut.
                    </p>

                    <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-widest uppercase">
                        <a
                            href="https://Ko-fi.com/almostanotheruniverse30822"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-3 border transition-colors flex items-center gap-2 ${isLounge ? 'border-white/10 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]' : 'border-black/20 text-black hover:bg-black hover:text-white'
                                }`}
                        >
                            Fund the Author
                        </a>
                        <a
                            href="https://paypal.me/BreakingTheParadigm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-3 border transition-colors flex items-center gap-2 ${isLounge ? 'border-white/10 text-white hover:border-[#D4AF37] hover:text-[#D4AF37]' : 'border-black/20 text-black hover:bg-black hover:text-white'
                                }`}
                        >
                            PayPal
                        </a>
                    </div>
                </div>
                {/* 4. THE METAVERSE LOOP (Context Editorial) */}
                {frontmatter.target_editorial && (
                    <div className={`p-8 md:p-12 border-l-4 mb-24 ${isLounge ? 'bg-[#0A0A0A] border-[#D4AF37]' : 'bg-white border-black shadow-xl'}`}>
                        <span className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>
                            [ CONTEXT: THE AUTHOR'S DELUSION ]
                        </span>
                        <p className={`mb-6 ${isLounge ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            See what George (the author) originally wrote before this intercept happened. A fascinating look at limited human perception.
                        </p>
                        <Link
                            href={`/article/${frontmatter.target_editorial}`}
                            className={`inline-flex items-center gap-2 text-xs font-bold font-mono tracking-widest uppercase transition-colors ${isLounge ? 'text-white hover:text-[#D4AF37]' : 'text-black hover:text-[#D4AF37]'}`}
                        >
                            Access Editorial <ArrowUpRight size={16} />
                        </Link>
                    </div>
                )}

                {/* 5. UP NEXT ON AABC */}
                <section className={`pt-16 border-t ${isLounge ? 'border-white/10' : 'border-black/10'}`}>
                    <span className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-8 block ${isLounge ? 'text-white/50' : 'text-black/50'}`}>
                        UP NEXT // TRENDING INTERCEPTS
                    </span>
                    <div className="flex flex-col">
                        {relatedBroadcasts.map((broadcast) => (
                            <Link
                                href={`/aabc/${broadcast.slug}`}
                                key={broadcast.slug}
                                className={`group grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 border-b transition-colors ${isLounge ? 'border-white/5 hover:bg-white/[0.02]' : 'border-black/5 hover:bg-black/[0.02]'}`}
                            >
                                <div className="md:col-span-11">
                                    <h3 className={`text-xl font-serif font-bold mb-2 ${isLounge ? 'text-zinc-200 group-hover:text-[#D4AF37]' : 'text-black group-hover:text-[#D4AF37]'}`}>
                                        {broadcast.title}
                                    </h3>
                                    <p className={`text-sm ${isLounge ? 'text-zinc-500' : 'text-zinc-600'}`}>{broadcast.description}</p>
                                </div>
                                <div className="md:col-span-1 flex justify-end">
                                    <ArrowUpRight className={`transition-transform duration-500 group-hover:rotate-45 ${isLounge ? 'text-[#D4AF37]' : 'text-black'}`} size={20} />
                                </div>
                            </Link>
                        ))}

                    </div>
                </section>

            </main>
        </div>
    );
}