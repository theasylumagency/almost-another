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
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    File Browser
                </div>

                <input
                    type="text"
                    placeholder="Search dossiers..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="mb-4 w-full border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500"
                />

                <div className="mb-4 flex flex-wrap gap-2">
                    {FILTERS.map((item) => {
                        const active = item === filter;

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setFilter(item)}
                                className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${active
                                        ? 'border-red-500/40 bg-red-500/10 text-red-200'
                                        : 'border-white/10 bg-white/[0.03] text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>

                <div className="space-y-3">
                    {filtered.map((item) => {
                        const active = item.slug === selected?.slug;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => onSelectDossier(item.slug)}
                                className={`w-full border p-4 text-left transition-colors ${active
                                        ? 'border-red-500/40 bg-red-500/10'
                                        : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                                    }`}
                            >
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                        {item.id}
                                    </span>
                                    <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                        {item.type}
                                    </span>
                                    <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                        {item.status}
                                    </span>
                                </div>

                                <div className="mb-2 text-sm font-medium text-white">
                                    {item.title}
                                </div>

                                <div className="text-xs leading-6 text-zinc-400">
                                    {item.summary}
                                </div>
                            </button>
                        );
                    })}

                    {filtered.length === 0 && (
                        <div className="border border-dashed border-white/10 p-4 text-sm text-zinc-500">
                            No matching files.
                        </div>
                    )}
                </div>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-6">
                {selected ? (
                    <>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-300/80">
                                {selected.id}
                            </span>
                            <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                {selected.type}
                            </span>
                            <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                {selected.status}
                            </span>
                        </div>

                        <h2 className="mb-3 text-2xl font-medium text-white">
                            {selected.title}
                        </h2>

                        <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                            Logged {selected.date}
                        </div>

                        <p className="mb-6 text-sm leading-7 text-zinc-300">
                            {selected.summary}
                        </p>

                        <div className="mb-6 border-l border-red-500/30 pl-4 text-sm leading-7 text-zinc-400">
                            {selected.excerpt}
                        </div>

                        <div className="mb-6 flex flex-wrap gap-2">
                            {selected.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div>
                            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                                Related Routes
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selected.related.map((item) => (
                                    <Link
                                        key={`${item.href}-${item.label}`}
                                        href={item.href}
                                        className="border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-sm text-zinc-500">No dossier selected.</div>
                )}
            </div>
        </section>
    );
}