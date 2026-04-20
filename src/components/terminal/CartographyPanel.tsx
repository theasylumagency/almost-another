'use client';

import Link from 'next/link';
import type { MapRegion, TimelineEntry } from '@/content/terminal/terminal.types';
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
    const activeEntry =
        entries.find((entry) => entry.year === activeYear) ?? entries[0];

    if (!activeEntry) return null;

    return (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
                <CartographyMap
                    regions={regions}
                    activeRegionIds={activeEntry.affectedRegions}
                />
                <TimelineSlider
                    entries={entries}
                    activeYear={activeYear}
                    onYearChange={onYearChange}
                />
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-red-300/80">
                    {activeEntry.era} // {activeEntry.year}
                </div>

                <h2 className="mb-4 text-2xl font-medium text-white">
                    {activeEntry.title}
                </h2>

                <p className="mb-6 text-sm leading-7 text-zinc-300">
                    {activeEntry.summary}
                </p>

                <div className="mb-6">
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                        Key Shifts
                    </div>

                    <ul className="space-y-3 text-sm leading-7 text-zinc-300">
                        {activeEntry.events.map((event) => (
                            <li key={event} className="border-l border-white/10 pl-4">
                                {event}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                        Related Routes
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {activeEntry.related.map((item) => (
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
            </div>
        </section>
    );
}