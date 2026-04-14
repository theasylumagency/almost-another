"use client";

import { useState, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, PlaySquare, Pause } from 'lucide-react';
import LiveClock from '@/components/aabc/LiveClock';
import ShareButtons from '@/components/ShareButtons';

export default function AABCInnerLayout({
    frontmatter,
    content,
    relatedBroadcasts,
}: {
    frontmatter: any;
    content: ReactNode;
    relatedBroadcasts: any[];
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const format = frontmatter.format || 'interview';
    const isDiscussion = format === 'discussion';

    return (
        <div className="min-h-screen font-sans bg-[#050505] text-zinc-400 selection:bg-red-900 selection:text-white">

            {/* TOP NAVIGATION */}
            <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center transition-all duration-1000 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black'
                : 'bg-transparent border-transparent'
                }`}>
                <Link href="/dialogues" className="inline-flex items-center gap-4 text-zinc-500 hover:text-white transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform duration-500" />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase hidden sm:block">Return</span>
                </Link>

                <div className="flex p-1 rounded-sm border border-white/10 bg-black/50 backdrop-blur">
                    <div className="px-4 py-2 font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                        AABC // {isDiscussion ? 'THEORY' : 'INTERCEPT'}
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-32 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT COLUMN: CONTENT */}
                <div className="lg:col-span-8 relative">
                    <div className="absolute top-0 -left-4 md:-left-8 lg:-left-12 h-full hidden md:block">
                        <ShareButtons title={frontmatter.title} description={frontmatter.description} isDesktop={true} className="sticky top-32 flex flex-col items-center gap-6 py-4 w-12 border-l border-white/10" />
                    </div>

                    {/* HEADER & PLAYER */}
                    <header className="mb-24 border-b border-white/10 pb-16">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8 block text-red-700/80">
                                    Reality {frontmatter.research_reality || 'UNKNOWN'} // {isDiscussion ? 'Discussion' : 'Interview'}
                                </span>
                                <h1 className="font-didot text-3xl md:text-4xl lg:text-5xl italic font-thin mb-8 text-white">
                                    {frontmatter.title}
                                </h1>
                                <div className="font-mono text-[9px] tracking-widest uppercase mb-12 text-zinc-500">
                                    TARGET REALITY: {frontmatter.research_reality || 'UNKNOWN'} | {frontmatter.date}
                                </div>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl font-light mb-16 text-zinc-400 max-w-2xl leading-relaxed">
                            {frontmatter.description}
                        </p>

                        {/* Player */}
                        <div className="flex items-center gap-6 p-8 border outline outline-1 outline-white/10 bg-black group relative overflow-hidden">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 rounded-none flex items-center justify-center transition-all bg-[#0a0a0a] border border-white/10 hover:bg-white text-zinc-500 hover:text-black z-10"
                            >
                                {isPlaying ? <Pause size={24} /> : <PlaySquare size={24} className="ml-1" />}
                            </button>
                            <div className="flex-1 z-10">
                                <div className="flex justify-between mb-2">
                                    <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                        {isPlaying ? 'DECRYPTING MEDIA...' : 'SIGNAL READY'}
                                    </span>
                                    <span className="font-mono text-[10px] text-zinc-600 tracking-widest"><LiveClock /></span>
                                </div>
                                <div className="flex items-end gap-1 h-10">
                                    {[...Array(60)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-t-sm transition-all duration-100 bg-zinc-800"
                                            style={{
                                                height: isPlaying ? `${Math.random() * 100}%` : '5%',
                                                animation: isPlaying ? `pulse ${0.3 + Math.random()}s infinite` : 'none',
                                                backgroundColor: isPlaying ? 'rgba(255,0,0,0.4)' : 'rgba(255,255,255,0.05)'
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* THE TRANSCRIPT / TEXT */}
                    <article className="prose prose-lg max-w-none font-sans leading-relaxed mb-32 prose-invert prose-p:text-zinc-400 prose-headings:text-white prose-strong:text-zinc-200 prose-a:text-white">
                        {/* We add conditional styling class for blockquote/p modifications depending on format */}
                        <div className={isDiscussion ? 'discussion-format' : 'interview-format'}>
                            {content}
                        </div>
                    </article>

                    {/* CONTEXT EDITORIAL */}
                    {frontmatter.target_editorial && (
                        <div className="p-8 md:p-12 border border-white/5 bg-[#0a0a0a] mb-24 outline outline-2 outline-transparent hover:outline-red-900/50 transition-all duration-700">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 block text-red-600/50">
                                [ CONTEXT: REALITY A EXTRACT ]
                            </span>
                            <p className="mb-6 text-zinc-400 font-light text-sm">
                                Review the corresponding essay that stands alongside this intercept in the broader chronology.
                            </p>
                            <Link
                                href={`/articles/${frontmatter.target_editorial}`}
                                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-colors text-white hover:text-red-500"
                            >
                                Frame The Narrative <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    )}

                    <ShareButtons title={frontmatter.title} description={frontmatter.description} isDesktop={false} className="md:hidden flex items-center justify-center gap-6 mb-24 border-t border-white/10 pt-8" />
                </div>

                {/* RIGHT COLUMN: SURVEILLANCE DOSSIER */}
                <aside className="lg:col-span-4 space-y-12 pl-0 lg:pl-12 lg:border-l border-white/10">

                    {/* UP NEXT */}
                    {relatedBroadcasts && relatedBroadcasts.length > 0 && (
                        <div className="sticky top-32">
                            <span className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8 block text-zinc-600">
                                Adjacent Records
                            </span>
                            <div className="flex flex-col gap-6">
                                {relatedBroadcasts.map((broadcast) => (
                                    <Link
                                        href={`/dialogues/${broadcast.slug}`}
                                        key={broadcast.slug}
                                        className="group p-6 border border-white/5 bg-black transition-all duration-500 hover:border-white/20"
                                    >
                                        <h3 className="text-xl font-serif leading-tight text-zinc-300 group-hover:text-white mb-4">
                                            {broadcast.title}
                                        </h3>
                                        <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                                            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                                                {broadcast.research_reality ? `Reality ${broadcast.research_reality}` : 'Unknown'}
                                            </span>
                                            <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-white" />
                                        </div>
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
