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
};

export default function TerminalPage() {
    const timelineEntries = getTimelineEntries();
    const dossiers = getDossiers();
    const signalBlocks = getSignalBlocks();
    const mapRegions = getMapRegions();
    const defaultYear = getDefaultTimelineYear();

    return (
        <TerminalClient
            timelineEntries={timelineEntries}
            dossiers={dossiers}
            signalBlocks={signalBlocks}
            mapRegions={mapRegions}
            defaultYear={defaultYear}
        />
    );
}