'use client';

import type { TerminalTab } from '@/content/terminal/terminal.types';

type Props = {
    activeTab: TerminalTab;
    onTabChange: (tab: TerminalTab) => void;
};

const TAB_ITEMS: Array<{
    id: TerminalTab;
    label: string;
    title: string;
    description: string;
}> = [
        {
            id: 'cartography',
            label: 'Cartography',
            title: 'Historical Divergence Map',
            description: 'Trace the split, territorial drift, and archive horizon from 1791 to 2026.',
        },
        {
            id: 'dossiers',
            label: 'Prefecture Dossiers',
            title: 'Classified File Browser',
            description: 'Browse institutional, incident, doctrine, and threat records.',
        },
        {
            id: 'signal',
            label: 'The Signal',
            title: 'Meta-Narrative Access Layer',
            description: 'Read why these materials arrive in different forms and with different clarity.',
        },
    ];

export default function TerminalTabs({ activeTab, onTabChange }: Props) {
    return (
        <section className="grid gap-4 md:grid-cols-3">
            {TAB_ITEMS.map((item) => {
                const active = item.id === activeTab;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onTabChange(item.id)}
                        className={`group relative text-left border p-5 transition-all outline-none ${active
                                ? 'border-red-500/50 bg-red-500-[0.03] shadow-[inset_0_0_20px_rgba(239,68,68,0.1)]'
                                : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                    >
                        {/* Target Reticle Corners for active state */}
                        {active && (
                            <>
                                <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-red-500"></span>
                                <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-red-500"></span>
                                <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-red-500"></span>
                                <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-red-500"></span>
                            </>
                        )}

                        {/* Non-active pseudo corners on hover */}
                        {!active && (
                            <>
                                <span className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t-[1px] border-l-[1px] border-white/0 transition-colors group-hover:border-white/40"></span>
                                <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 border-t-[1px] border-r-[1px] border-white/0 transition-colors group-hover:border-white/40"></span>
                                <span className="absolute -bottom-[1px] -left-[1px] w-1.5 h-1.5 border-b-[1px] border-l-[1px] border-white/0 transition-colors group-hover:border-white/40"></span>
                                <span className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b-[1px] border-r-[1px] border-white/0 transition-colors group-hover:border-white/40"></span>
                            </>
                        )}

                        <div className={`mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] ${active ? 'text-red-400' : 'text-zinc-500 group-hover:text-zinc-400 transition-colors'}`}>
                            <span>{item.label}</span>
                            {active && <span className="hidden sm:block text-[8px] tracking-[0.3em] opacity-80">ACTV</span>}
                        </div>

                        <h2 className="mb-3 text-lg font-medium tracking-wide text-white">{item.title}</h2>

                        <p className={`text-sm leading-relaxed ${active ? 'text-zinc-300' : 'text-zinc-400'}`}>{item.description}</p>
                    </button>
                );
            })}
        </section>
    );
}