'use client';

import type { SignalBlock } from '@/content/terminal/terminal.types';

type Props = {
    blocks: SignalBlock[];
};

export default function SignalPanel({ blocks }: Props) {
    return (
        <section className="grid gap-6">
            {blocks.map((block) => (
                <article
                    key={block.id}
                    className="relative border border-white/15 bg-black p-6 md:p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]"
                >
                    {/* Decorative Header Bar */}
                    <div className="absolute top-0 left-0 w-full flex justify-between pointer-events-none">
                        <div className="h-[2px] w-1/3 bg-red-500/50"></div>
                        <div className="h-[2px] w-4 bg-white/20"></div>
                        <div className="h-[2px] w-8 bg-white/20"></div>
                        <div className="flex-1 border-t-[2px] border-white/10 border-dotted mx-2"></div>
                        <div className="h-[2px] w-16 bg-white/20"></div>
                    </div>

                    <div className="mb-6 flex flex-col sm:flex-row pb-4 border-b border-white/10 items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-500 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                                {block.id}
                            </span>
                            <span className="border border-white/15 bg-[#030303] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                                {block.classification}
                            </span>
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                            <span className="w-3 h-[1px] bg-zinc-600 block"></span>
                            SIG.INT DECODE
                        </div>
                    </div>

                    <h2 className="mb-6 text-xl md:text-2xl font-medium tracking-wide text-white uppercase">{block.title}</h2>

                    <div className="relative">
                        <div className="absolute top-1 left-0 bottom-1 w-[2px] bg-red-500/30"></div>
                        <p className="pl-5 max-w-4xl text-[13px] leading-relaxed tracking-wide text-zinc-300 font-mono whitespace-pre-wrap">
                            {block.body}
                        </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                        <div className="font-mono text-[8px] tracking-[0.4em] text-zinc-700">
                            ///////////
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                            END OF TRANSMISSION
                        </div>
                    </div>
                </article>
            ))}
        </section>
    );
}