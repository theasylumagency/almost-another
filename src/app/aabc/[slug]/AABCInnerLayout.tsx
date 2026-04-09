"use client";

import { useState, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight, PlaySquare, Pause, Camera, Fingerprint } from 'lucide-react';
import LiveClock from '@/components/aabc/LiveClock';
import { useAABCMode } from '@/components/aabc/AABCModeContext';

export default function AABCInnerLayout({
    frontmatter,
    content,
    relatedBroadcasts,
}: {
    frontmatter: any;
    content: ReactNode;
    relatedBroadcasts: any[];
}) {
    const { mode, setMode } = useAABCMode();
    const [isPlaying, setIsPlaying] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isLounge = mode === 'lounge';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-1000 font-sans ${isLounge ? 'bg-[#050505] text-zinc-400 selection:bg-[#D4AF37]/30' : 'bg-[#F2F2F2] text-zinc-600 selection:bg-black/20'
            }`}>

            {/* TOP NAVIGATION */}
            <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-all duration-1000 ${scrolled ? (isLounge ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/50' : 'bg-[#F2F2F2]/95 backdrop-blur-md border-b border-black/5 shadow-lg shadow-black/5')
                : 'bg-transparent border-transparent'
                }`}>
                <Link href="/aabc" className={`inline-flex items-center gap-3 transition-colors ${isLounge ? 'text-zinc-500 hover:text-[#D4AF37]' : 'text-zinc-500 hover:text-black'}`}>
                    <ArrowLeft size={16} />
                    <span className="font-mono text-xs tracking-[0.3em] uppercase hidden sm:block">Return to Hub</span>
                </Link>

                <div className={`flex p-1 rounded-full border ${isLounge ? 'border-[#D4AF37]/20 bg-black/50 backdrop-blur' : 'border-black/10 bg-white/50 backdrop-blur'}`}>
                    <button
                        onClick={() => setMode('lounge')}
                        className={`px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${isLounge ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-zinc-400 hover:text-black'}`}
                    >
                        Lounge
                    </button>
                    <button
                        onClick={() => setMode('observatory')}
                        className={`px-4 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase rounded-full transition-all duration-500 ${!isLounge ? 'bg-black text-white shadow-lg' : 'text-zinc-400 hover:text-[#D4AF37]'}`}
                    >
                        Observatory
                    </button>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* LEFT COLUMN: INTERVIEW CONTENT */}
                <div className="lg:col-span-8">
                    {/* HEADER & PLAYER */}
                    <header className="mb-16 border-b pb-12" style={{ borderColor: isLounge ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className={`font-mono text-[10px] tracking-[0.3em] uppercase px-3 py-1 mb-4 inline-flex items-center gap-2 rounded border ${isLounge ? 'border-red-500/20 text-red-500 bg-red-500/5' : 'border-red-600/20 text-red-700 bg-red-600/5'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLounge ? 'bg-red-500' : 'bg-red-600'}`}></span>
                                    {frontmatter.status || 'INTERCEPTED LOG'}
                                </span>
                                <h1 className={`text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tighter leading-[0.9] mt-2 mb-4 ${isLounge ? 'text-white' : 'text-black'}`}>
                                    {frontmatter.title}
                                </h1>
                                <div className={`font-mono text-xs tracking-widest uppercase mb-4 ${isLounge ? 'text-[#D4AF37]/80' : 'text-zinc-500'}`}>
                                    TARGET REALITY: {frontmatter.reality || 'UNKNOWN'} // {frontmatter.date}
                                </div>
                            </div>
                        </div>

                        <p className={`text-lg md:text-xl font-light mb-12 ${isLounge ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {frontmatter.description}
                        </p>

                        {/* Player */}
                        <div className={`flex items-center gap-6 p-6 rounded-xl border ${isLounge ? 'bg-[#0A0A0A] border-white/5' : 'bg-white border-black/10 shadow-lg shadow-black/5'}`}>
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isLounge ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-black text-white hover:bg-[#D4AF37]'}`}
                            >
                                {isPlaying ? <Pause size={24} /> : <PlaySquare size={24} className="ml-1" />}
                            </button>
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <span className={`font-mono text-[10px] tracking-widest uppercase ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>
                                        {isPlaying ? 'DECRYPTING MEDIA...' : 'SIGNAL READY'}
                                    </span>
                                    <span className="font-mono text-[10px] text-zinc-500 tracking-widest"><LiveClock /></span>
                                </div>
                                <div className="flex items-end gap-1 h-8">
                                    {[...Array(40)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 rounded-t-sm transition-all duration-100 ${isLounge ? 'bg-[#D4AF37]/40' : 'bg-black/30'}`}
                                            style={{
                                                height: isPlaying ? `${Math.random() * 100}%` : '5%',
                                                animation: isPlaying ? `pulse ${0.3 + Math.random()}s infinite` : 'none'
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* THE TRANSCRIPT */}
                    <article className={`prose prose-lg max-w-none font-sans leading-relaxed mb-24 transition-colors duration-1000
                        ${isLounge
                            ? 'prose-invert prose-p:text-zinc-400 prose-headings:text-white prose-strong:text-[#D4AF37] prose-a:text-[#D4AF37]'
                            : 'prose-p:text-zinc-700 prose-headings:text-black prose-strong:text-black prose-a:text-black'
                        }
                    `}>
                        {content}
                    </article>

                    {/* CONTEXT EDITORIAL */}
                    {frontmatter.target_editorial && (
                        <div className={`p-8 md:p-12 border-l-4 mb-24 ${isLounge ? 'bg-[#0A0A0A] border-[#D4AF37]' : 'bg-white border-black shadow-xl shadow-black/5'}`}>
                            <span className={`font-mono text-xs tracking-[0.3em] uppercase mb-4 block ${isLounge ? 'text-[#D4AF37]' : 'text-black font-bold'}`}>
                                [ CONTEXT: THE AUTHOR'S DELUSION ]
                            </span>
                            <p className={`mb-6 ${isLounge ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                A fascinating look at limited human perception. Review the essay from Reality A that triggered this intercept.
                            </p>
                            <Link
                                href={`/articles/${frontmatter.target_editorial}`}
                                className={`inline-flex items-center gap-2 text-xs font-bold font-mono tracking-widest uppercase transition-colors ${isLounge ? 'text-white hover:text-[#D4AF37]' : 'text-black hover:text-[#D4AF37]'}`}
                            >
                                Access Editorial <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: SURVEILLANCE DOSSIER */}
                <aside className="lg:col-span-4 space-y-8">

                    {/* UP NEXT */}
                    {relatedBroadcasts && relatedBroadcasts.length > 0 && (
                        <div className={`pt-8 ${'mt-8 border-t ' + (isLounge ? 'border-white/10' : 'border-black/10')}`}>
                            <span className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-6 block ${isLounge ? 'text-white/50' : 'text-black/50'}`}>
                                RELATED INTERCEPTS
                            </span>
                            <div className="flex flex-col gap-4">
                                {relatedBroadcasts.map((broadcast) => (
                                    <Link
                                        href={`/aabc/${broadcast.slug}`}
                                        key={broadcast.slug}
                                        className={`group p-4 rounded-xl border transition-all duration-300 ${isLounge ? 'border-white/5 hover:border-[#D4AF37]/50 hover:bg-white/[0.02]' : 'border-black/10 hover:border-black/30 hover:bg-black/[0.02]'}`}
                                    >
                                        <h3 className={`text-base font-serif font-bold mb-1 leading-tight ${isLounge ? 'text-zinc-200 group-hover:text-[#D4AF37]' : 'text-black group-hover:text-[#D4AF37]'}`}>
                                            {broadcast.title}
                                        </h3>
                                        <p className={`text-xs line-clamp-2 ${isLounge ? 'text-zinc-500' : 'text-zinc-600'}`}>{broadcast.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>

            </main>
        </div>
    );
}
