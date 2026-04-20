import { timelineEntries, defaultTimelineYear } from '@/content/terminal/cartography';
import { dossiers } from '@/content/terminal/dossiers';
import { signalBlocks } from '@/content/terminal/signal';
import { mapRegions } from '@/content/terminal/map-regions';

export function getTimelineEntries() {
    return [...timelineEntries].sort((a, b) => a.year - b.year);
}

export function getDefaultTimelineYear() {
    return defaultTimelineYear;
}

export function getDossiers() {
    return [...dossiers].sort((a, b) => b.date.localeCompare(a.date));
}

export function getDossierBySlug(slug: string) {
    return dossiers.find((item) => item.slug === slug) ?? null;
}

export function getSignalBlocks() {
    return [...signalBlocks];
}

export function getMapRegions() {
    return [...mapRegions];
}