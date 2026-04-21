'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { MapRegion, TimelineEntry } from '@/content/terminal/terminal.types';
import { getTerritoryProfile } from '@/content/terminal/territory-profiles';
import CartographyMap from './CartographyMap';
import TimelineSlider from './TimelineSlider';

type Props = {
    entries: TimelineEntry[];
    regions: MapRegion[];
    activeYear: number;
    onYearChange: (year: number) => void;
};

export default function CartographyPanel({
    entries,
    regions,
    activeYear,
    onYearChange,
}: Props) {
    const [selectedTerritoryId, setSelectedTerritoryId] = useState<string | null>(null);

    const activeEntry =
        entries.find((entry) => entry.year === activeYear) ?? entries[0];
    const selectedTerritory = selectedTerritoryId
        ? getTerritoryProfile(selectedTerritoryId)
        : null;

    if (!activeEntry) return null;

    return (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-0">
                <CartographyMap
                    regions={regions}
                    activeRegionIds={activeEntry.affectedRegions}
                    selectedTerritoryId={selectedTerritoryId}
                    onSelectTerritory={setSelectedTerritoryId}
                />
                <TimelineSlider
                    entries={entries}
                    activeYear={activeYear}
                    onYearChange={onYearChange}
                />
            </div>

            <div className="relative border border-white/15 bg-[#030303] px-6 py-8 md:px-8 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] flex flex-col">
                {/* Decorative brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20"></div>

                <div className="mb-6 flex flex-wrap items-center justify-between pb-4 border-b border-white/10 gap-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-500/90 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 block animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                        {activeEntry.era}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 border border-white/10 bg-black px-2 py-1">
                        TL: {activeEntry.year}
                    </div>
                </div>

                <div className="mb-8 border border-amber-500/20 bg-amber-500/[0.05] p-4 md:p-5 relative">
                    <span className="absolute -top-2 left-3 bg-[#030303] px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-amber-300/70">
                        Territory Dossier
                    </span>

                    {selectedTerritory ? (
                        <>
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <div>
                                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-300/80">
                                        Territory Dossier
                                    </div>
                                    <h3 className="mt-2 text-xl font-medium text-white">
                                        {selectedTerritory.label}
                                    </h3>
                                </div>

                                <span className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                                    {selectedTerritory.status}
                                </span>
                            </div>

                            <div className="mb-5 grid grid-cols-2 gap-3 text-sm text-zinc-300">
                                <div className="border border-white/10 bg-white/[0.02] p-3">
                                    <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                        ID
                                    </div>
                                    <div>{selectedTerritory.id}</div>
                                </div>

                                <div className="border border-white/10 bg-white/[0.02] p-3">
                                    <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                        Capital
                                    </div>
                                    <div>{selectedTerritory.capital}</div>
                                </div>

                                <div className="border border-white/10 bg-white/[0.02] p-3">
                                    <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                        Republic Since
                                    </div>
                                    <div>{selectedTerritory.republicSince ?? 'Not indexed'}</div>
                                </div>

                                <div className="border border-white/10 bg-white/[0.02] p-3">
                                    <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                        Current Timeline Focus
                                    </div>
                                    <div>{activeEntry.year}</div>
                                </div>
                            </div>

                            <p className="mb-4 text-sm leading-7 text-zinc-300">
                                {selectedTerritory.summary}
                            </p>

                            <div className="mb-5 border-l border-red-500/30 pl-4 text-sm leading-7 text-zinc-400">
                                {selectedTerritory.strategicRole}
                            </div>

                            <div className="mb-5">
                                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                    Timeline Years
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {selectedTerritory.timelineYears.length > 0 ? (
                                        selectedTerritory.timelineYears.map((year) => (
                                            <button
                                                key={year}
                                                type="button"
                                                onClick={() => onYearChange(year)}
                                                className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${year === activeEntry.year
                                                        ? 'border-red-500/40 bg-red-500/10 text-red-200'
                                                        : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white'
                                                    }`}
                                            >
                                                {year}
                                            </button>
                                        ))
                                    ) : (
                                        <span className="text-sm text-zinc-500">No indexed years yet.</span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                    Related Dossiers
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {selectedTerritory.relatedDossiers.length > 0 ? (
                                        selectedTerritory.relatedDossiers.map((item) => (
                                            <Link
                                                key={`${item.href}-${item.label}`}
                                                href={item.href}
                                                className="border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                                            >
                                                {item.label}
                                            </Link>
                                        ))
                                    ) : (
                                        <span className="text-sm text-zinc-500">No linked dossiers yet.</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                                    Cross-References
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {selectedTerritory.relatedRoutes.length > 0 ? (
                                        selectedTerritory.relatedRoutes.map((item) => (
                                            <Link
                                                key={`${item.href}-${item.label}`}
                                                href={item.href}
                                                className="border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.18em] text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                                            >
                                                {item.label}
                                            </Link>
                                        ))
                                    ) : (
                                        <span className="text-sm text-zinc-500">No cross-references yet.</span>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-sm leading-7 text-zinc-400">
                            Select any country on the map to inspect its territorial dossier, linked years,
                            and related archive files.
                        </div>
                    )}
                </div>

                <h2 className="mb-6 text-2xl font-medium tracking-wide text-white uppercase">
                    {activeEntry.title}
                </h2>

                <div className="mb-8 p-4 border border-white/5 bg-white/[0.02] relative">
                    <span className="absolute -top-2 left-3 bg-[#030303] px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">EVENT LOG</span>
                    <p className="text-sm leading-relaxed text-zinc-300 font-mono">
                        {activeEntry.summary}
                    </p>
                </div>

                <div className="mb-8 flex-1">
                    <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 flex items-center gap-2">
                        <span className="w-2 h-[1px] bg-zinc-600 block"></span>
                        RECORDED SHIFTS
                    </div>

                    <ul className="space-y-4 text-sm leading-relaxed text-zinc-300">
                        {activeEntry.events.map((event) => (
                            <li key={event} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-red-500/20 before:border before:border-red-500/50">
                                {event}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                        CROSS-REFERENCES
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {activeEntry.related.map((item) => (
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
            </div>
        </section>
    );
}
