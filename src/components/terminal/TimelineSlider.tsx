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
        <div className="border border-white/15 bg-[#050505] p-5 lg:p-6 mt-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    <span className="w-1.5 h-1.5 bg-zinc-600 block"></span>
                    TEMPORAL CALIBRATION
                </div>
                <div className="font-mono text-xs text-red-500 tracking-widest border border-red-500/20 bg-red-500/10 px-3 py-1">
                    YEAR: {activeYear}
                </div>
            </div>

            <div className="relative pt-2 pb-6 group">
                 {/* Track base */}
                 <div className="absolute top-[11px] left-0 w-full h-[2px] bg-white/10 pointer-events-none z-0"></div>
                 
                 {/* Decorative ticks */}
                 <div className="absolute top-[8px] left-0 w-full flex justify-between px-1 pointer-events-none z-0">
                     {entries.map((_, i) => (
                         <div key={i} className={`w-[1px] h-2 ${i === activeIndex ? 'bg-red-500 h-3 -mt-0.5' : 'bg-white/30'}`}></div>
                     ))}
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
                    className="relative z-10 w-full appearance-none bg-transparent cursor-ew-resize accent-red-500 focus:outline-none h-6 m-0"
                />
            </div>

            <div className="mt-2 flex flex-wrap gap-1.5">
                {entries.map((entry) => {
                    const active = entry.year === activeYear;

                    return (
                        <button
                            key={entry.year}
                            type="button"
                            onClick={() => onYearChange(entry.year)}
                            className={`flex-1 min-w-[64px] border px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-center transition-colors ${active
                                    ? 'border-red-500 bg-red-500/10 text-red-200 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]'
                                    : 'border-white/15 bg-black text-zinc-500 hover:text-zinc-300 hover:border-white/30 hover:bg-white/[0.02]'
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