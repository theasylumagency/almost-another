'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type {
    Dossier,
    MapRegion,
    SignalBlock,
    TerminalTab,
    TimelineEntry,
} from '@/content/terminal/terminal.types';
import TerminalHero from '@/components/terminal/TerminalHero';
import TerminalTabs from '@/components/terminal/TerminalTabs';
import CartographyPanel from '@/components/terminal/CartographyPanel';
import DossiersPanel from '@/components/terminal/DossiersPanel';
import SignalPanel from '@/components/terminal/SignalPanel';

type Props = {
    timelineEntries: TimelineEntry[];
    dossiers: Dossier[];
    signalBlocks: SignalBlock[];
    mapRegions: MapRegion[];
    defaultYear: number;
};

function normalizeTab(value: string | null): TerminalTab {
    if (value === 'dossiers' || value === 'signal') {
        return value;
    }

    return 'cartography';
}

export default function TerminalClient({
    timelineEntries,
    dossiers,
    signalBlocks,
    mapRegions,
    defaultYear,
}: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeTab = normalizeTab(searchParams.get('tab'));

    const activeYear = useMemo(() => {
        const raw = Number(searchParams.get('year'));
        const exists = timelineEntries.some((entry) => entry.year === raw);
        return exists ? raw : defaultYear;
    }, [defaultYear, searchParams, timelineEntries]);

    const selectedDossierSlug = useMemo(() => {
        const raw = searchParams.get('file');
        if (raw && dossiers.some((item) => item.slug === raw)) {
            return raw;
        }

        return dossiers[0]?.slug ?? '';
    }, [dossiers, searchParams]);

    function updateParams(updates: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }

    function handleTabChange(tab: TerminalTab) {
        if (tab === 'cartography') {
            updateParams({
                tab,
                year: String(activeYear),
                file: null,
            });
            return;
        }

        if (tab === 'dossiers') {
            updateParams({
                tab,
                file: selectedDossierSlug || null,
            });
            return;
        }

        updateParams({
            tab,
            file: null,
            year: null,
        });
    }

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
                <TerminalHero />
                <TerminalTabs activeTab={activeTab} onTabChange={handleTabChange} />

                {activeTab === 'cartography' && (
                    <CartographyPanel
                        entries={timelineEntries}
                        regions={mapRegions}
                        activeYear={activeYear}
                        onYearChange={(year) =>
                            updateParams({
                                tab: 'cartography',
                                year: String(year),
                            })
                        }
                    />
                )}

                {activeTab === 'dossiers' && (
                    <DossiersPanel
                        dossiers={dossiers}
                        selectedSlug={selectedDossierSlug}
                        onSelectDossier={(slug) =>
                            updateParams({
                                tab: 'dossiers',
                                file: slug,
                            })
                        }
                    />
                )}

                {activeTab === 'signal' && <SignalPanel blocks={signalBlocks} />}
            </div>
        </main>
    );
}