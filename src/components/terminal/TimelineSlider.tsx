'use client';

import type { TimelineEntry } from '@/content/terminal/terminal.types';

type Props = {
    entries: TimelineEntry[];
    activeYear: number;
    onYearChange: (year: number) => void;
};

export default function TimelineSlider({ entries, activeYear, onYearChange }: Props) {
    const activeIndex = Math.max(
        0,
        entries.findIndex((entry) => entry.year === activeYear)
    );

    return (
        <div className="border border-white/10 bg-white/[0.02] p-4">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                Timeline Control
            </div>

            <input
                type="range"
                min={0}
                max={Math.max(entries.length - 1, 0)}
                step={1}
                value={activeIndex}
                onChange={(event) => {
                    const nextIndex = Number(event.target.value);
                    const nextYear = entries[nextIndex]?.year;

                    if (nextYear) {
                        onYearChange(nextYear);
                    }
                }}
                className="w-full accent-red-500"
            />

            <div className="mt-4 flex flex-wrap gap-2">
                {entries.map((entry) => {
                    const active = entry.year === activeYear;

                    return (
                        <button
                            key={entry.year}
                            type="button"
                            onClick={() => onYearChange(entry.year)}
                            className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${active
                                    ? 'border-red-500/40 bg-red-500/10 text-red-200'
                                    : 'border-white/10 bg-white/[0.03] text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {entry.year}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}