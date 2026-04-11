import React, { ReactNode } from 'react';

export default function AABCDialogue({ speaker, format, children }: { speaker: string; format?: string; children: ReactNode }) {
    const isSystem = speaker.toLowerCase().includes('interviewer') || speaker.toLowerCase().includes('host') || speaker.toLowerCase().includes('system');
    
    // Philosophical Discussion Format
    if (format === 'discussion') {
        return (
            <div className="my-16 md:my-24 pl-6 md:pl-12 border-l border-white/10 group hover:border-white/30 transition-colors duration-700">
                <div className="font-serif italic text-2xl md:text-3xl tracking-wide text-zinc-500 mb-6 font-light group-hover:text-zinc-300 transition-colors duration-700">
                    {speaker}
                </div>
                <div className="font-serif text-lg md:text-2xl leading-loose text-zinc-400 selection:bg-red-900 group-hover:text-zinc-300 transition-colors duration-700 whitespace-pre-wrap">
                    {children}
                </div>
            </div>
        )
    }

    // Interview Format
    if (isSystem) {
        return (
            <div className="my-10 md:my-16 flex flex-col md:flex-row gap-4 md:gap-8 max-w-4xl border-l-[1px] border-zinc-800 pl-4 md:pl-8 group">
                <div className="md:w-32 flex-shrink-0 pt-2 text-left">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-600 block group-hover:text-zinc-400 transition-colors duration-700">
                        {speaker}
                    </span>
                </div>
                <div className="flex-1 font-sans text-base md:text-lg font-light tracking-wide text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-700 whitespace-pre-wrap">
                    {children}
                </div>
            </div>
        );
    }

    // Subject/Character styling (Interview Format)
    return (
        <div className="my-12 md:my-20 flex flex-col md:flex-row gap-4 md:gap-8 max-w-4xl border-l-[1px] border-[#D4AF37]/30 pl-4 md:pl-8 group relative overflow-hidden bg-gradient-to-r from-[#D4AF37]/[0.02] to-transparent py-4">
            <div className="absolute left-0 top-0 w-[1px] h-full bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-700"></div>
            <div className="md:w-32 flex-shrink-0 pt-2 text-left relative z-10">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/80 group-hover:text-[#D4AF37] transition-colors duration-700">
                    {speaker}
                </span>
            </div>
            <div className="flex-1 font-serif text-xl md:text-3xl leading-[1.6] text-zinc-200 relative z-10 group-hover:text-white transition-colors duration-700 whitespace-pre-wrap">
                {children}
            </div>
        </div>
    );
}
