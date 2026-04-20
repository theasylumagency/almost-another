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
                        className={`text-left border p-5 transition-colors ${active
                                ? 'border-red-500/40 bg-red-500/10'
                                : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                            }`}
                    >
                        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                            {item.label}
                        </div>

                        <h2 className="mb-3 text-lg font-medium text-white">{item.title}</h2>

                        <p className="text-sm leading-6 text-zinc-300">{item.description}</p>
                    </button>
                );
            })}
        </section>
    );
}