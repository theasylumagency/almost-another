import { Suspense } from 'react';
import type { Metadata } from 'next';
import TerminalClient from './TerminalClient';
import {
    getDefaultTimelineYear,
    getDossiers,
    getMapRegions,
    getSignalBlocks,
    getTimelineEntries,
} from '@/lib/terminal';

export const metadata: Metadata = {
    title: 'Terminal',
    description:
        'Restricted archive for cartography, prefecture dossiers, and signal theory.',
    alternates: {
        canonical: '/terminal',
    },
};

function TerminalFallback() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
                <div className="border border-white/10 bg-[#030303] px-6 py-10 shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                        Loading terminal archive...
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function TerminalPage() {
    const timelineEntries = getTimelineEntries();
    const dossiers = getDossiers();
    const signalBlocks = getSignalBlocks();
    const mapRegions = getMapRegions();
    const defaultYear = getDefaultTimelineYear();

    return (
        <Suspense fallback={<TerminalFallback />}>
            <TerminalClient
                timelineEntries={timelineEntries}
                dossiers={dossiers}
                signalBlocks={signalBlocks}
                mapRegions={mapRegions}
                defaultYear={defaultYear}
            />
        </Suspense>
    );
}
