"use client";

import React, { ReactNode } from 'react';

// Use a context to detect if we're in Lounge or Observatory mode
import { useAABCMode } from './AABCModeContext';

export default function AABCDialogue({ speaker, children }: { speaker: string; children: ReactNode }) {
    const { mode } = useAABCMode();
    const isLounge = mode === 'lounge';

    const isSystem = speaker.toLowerCase().includes('interviewer') || speaker.toLowerCase().includes('host') || speaker.toLowerCase().includes('system');

    // System/Interviewer styling
    if (isSystem) {
        return (
            <div className={`my-8 flex flex-col md:flex-row gap-2 md:gap-8 max-w-4xl border-l-[3px] pl-4 md:pl-6 transition-colors duration-500 ${
                isLounge ? 'border-zinc-800' : 'border-zinc-300'
            }`}>
                <div className="md:w-32 flex-shrink-0 pt-1 text-right md:text-left">
                    <span className={`font-mono text-xs tracking-widest uppercase font-bold 
                        ${isLounge ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {speaker}
                    </span>
                </div>
                <div className={`flex-1 font-sans text-lg md:text-xl font-medium tracking-wide ${
                    isLounge ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                    {children}
                </div>
            </div>
        );
    }

    // Subject/Character styling
    return (
        <div className={`my-12 flex flex-col md:flex-row gap-2 md:gap-8 max-w-4xl transition-colors duration-500 p-6 md:p-8 rounded-r-xl border-l-4 ${
            isLounge ? 'bg-[#0A0A0A]/80 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5' : 'bg-white border-black shadow-xl shadow-black/5'
        }`}>
            <div className="md:w-32 flex-shrink-0 pt-1 text-right md:text-left">
                <span className={`font-serif text-sm tracking-widest uppercase font-black
                    ${isLounge ? 'text-[#D4AF37]' : 'text-black'}`}>
                    {speaker}
                </span>
            </div>
            <div className={`flex-1 font-serif text-xl md:text-2xl leading-relaxed ${
                isLounge ? 'text-zinc-100' : 'text-black'
            }`}>
                {children}
            </div>
        </div>
    );
}
