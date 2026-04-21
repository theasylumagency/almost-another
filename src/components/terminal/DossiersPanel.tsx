'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Dossier } from '@/content/terminal/terminal.types';

type Props = {
    dossiers: Dossier[];
    selectedSlug: string;
    onSelectDossier: (slug: string) => void;
};

const FILTERS = [
    'all',
    'person',
    'incident',
    'place',
    'institution',
    'operation',
    'observation',
    'threat',
    'doctrine',
] as const;

export default function DossiersPanel({
    dossiers,
    selectedSlug,
    onSelectDossier,
}: Props) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');

    const filtered = useMemo(() => {
        return dossiers.filter((item) => {
            const matchesFilter = filter === 'all' ? true : item.type === filter;
            const haystack = [
                item.id,
                item.title,
                item.summary,
                item.excerpt,
                ...item.tags,
            ]
                .join(' ')
                .toLowerCase();

            const matchesSearch = haystack.includes(search.toLowerCase());

            return matchesFilter && matchesSearch;
        });
    }, [dossiers, filter, search]);

    const selected =
        filtered.find((item) => item.slug === selectedSlug) ??
        dossiers.find((item) => item.slug === selectedSlug) ??
        filtered[0] ??
        dossiers[0];

    return (
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col border border-white/15 bg-[#050505]">
                <div className="border-b border-white/10 p-4 pb-0 bg-white/[0.02]">
                    <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-zinc-600 block"></span> DATABASE DIR</span>
                        <span>{filtered.length} RECORDS</span>
                    </div>

                    <div className="relative mb-4 group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-xs hidden sm:block">&gt;</span>
                        <input
                            type="text"
                            placeholder="QUERY RECORDS..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full border border-white/20 bg-black pl-8 pr-3 py-2.5 font-mono text-xs uppercase text-white outline-none placeholder:text-zinc-600 focus:border-red-500/50 transition-colors"
                        />
                    </div>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {FILTERS.map((item) => {
                            const active = item === filter;

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setFilter(item)}
                                    className={`border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors ${active
                                        ? 'border-red-500 bg-red-500/10 text-red-100'
                                        : 'border-white/10 bg-transparent text-zinc-500 hover:text-zinc-300 hover:border-white/20'
                                        }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[600px] p-2 space-y-1.5 custom-scrollbar">
                    {filtered.map((item) => {
                        const active = item.slug === selected?.slug;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => onSelectDossier(item.slug)}
                                className={`group relative w-full border p-3 text-left transition-all ${active
                                    ? 'border-red-500/40 bg-red-500/5'
                                    : 'border-transparent hover:border-white/15 bg-transparent hover:bg-white/[0.02]'
                                    }`}
                            >
                                {active && <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-500"></span>}
                                
                                <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
                                    <span className={`font-mono text-[9px] uppercase tracking-[0.24em] ${active ? 'text-red-400' : 'text-zinc-500'}`}>
                                        {item.id}
                                    </span>
                                    <span className="border border-white/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400 bg-black">
                                        {item.type}
                                    </span>
                                </div>

                                <div className="mb-1 text-sm font-medium tracking-wide text-white group-hover:text-red-100 transition-colors">
                                    {item.title}
                                </div>

                                <div className="line-clamp-2 text-xs leading-5 text-zinc-500 font-mono">
                                    {item.summary}
                                </div>
                            </button>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="border border-dashed border-red-500/30 p-8 text-center font-mono text-xs uppercase tracking-widest text-red-500/70">
                            No matching records found.
                        </div>
                    )}
                </div>
            </div>

            <div className="relative border border-white/15 bg-[#030303] px-6 py-8 md:px-8 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
                {/* Decorative brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20"></div>

                {selected ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="mb-6 flex flex-col sm:flex-row pb-4 border-b border-white/10 items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-red-500">
                                    {selected.id}
                                </span>
                                <span className="border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                                    {selected.type}
                                </span>
                                <span className="border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                                    {selected.status}
                                </span>
                            </div>
                            <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
                                LOGGED: <span className="text-zinc-300">{selected.date}</span>
                            </div>
                        </div>

                        <h2 className="mb-6 text-2xl md:text-3xl font-medium tracking-wide text-white">
                            {selected.title}
                        </h2>

                        <div className="mb-8 p-4 border border-white/5 bg-white/[0.02] relative">
                            <div className="absolute -top-2 left-3 bg-[#030303] px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                                SUMMARY
                            </div>
                            <p className="text-sm leading-7 text-zinc-300 font-mono">
                                {selected.summary}
                            </p>
                        </div>

                        <div className="mb-8 border-l-2 border-red-500/50 pl-5 pr-2 py-1 text-sm leading-8 text-zinc-400">
                            {selected.excerpt}
                        </div>

                        <div className="mb-10 flex flex-wrap gap-2">
                            {selected.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="border border-white/15 bg-black px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {(selected.related && selected.related.length > 0) && (
                            <div className="pt-6 border-t border-white/10">
                                <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                                    CROSS-REFERENCES
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {selected.related.map((item) => (
                                        <Link
                                            key={`${item.href}-${item.label}`}
                                            href={item.href}
                                            className="group flex items-center gap-2 border border-white/15 bg-black px-4 py-2 text-xs uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-200"
                                        >
                                            <span className="w-1.5 h-1.5 bg-zinc-600 transition-colors group-hover:bg-red-500"></span>
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center font-mono text-sm text-zinc-600 tracking-widest uppercase">
                        AWAITING SELECTION...
                    </div>
                )}
            </div>
        </section>
    );
}