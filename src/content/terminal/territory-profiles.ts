import type { TerritoryProfile } from './terminal.types';

const territoryIndex: Record<string, TerritoryProfile> = {
    FR: {
        id: 'FR',
        label: 'France',
        capital: 'Paris',
        republicSince: 1802,
        status: 'Metropolitan core province',
        summary:
            'France is one of the founding territorial cores of the divergent republican order and remains the political center of its western structure.',
        strategicRole:
            'Original republican core; later imperial and republican continuity zone.',
        timelineYears: [1802, 1807, 1817, 1835, 1839, 1863, 1869, 1870, 1894, 1904],
        relatedDossiers: [
            { label: 'Second Republic', href: '/terminal?tab=dossiers&file=second-republic' },
            { label: 'Fifth Republic', href: '/terminal?tab=dossiers&file=fifth-republic' },
        ],
        relatedRoutes: [
            { label: '1802 cartography', href: '/terminal?tab=cartography&year=1802' },
            { label: '1839 cartography', href: '/terminal?tab=cartography&year=1839' },
        ],
    },

    ES: {
        id: 'ES',
        label: 'Spain',
        capital: 'Madrid',
        republicSince: 1802,
        status: 'Foundational Iberian province',
        summary:
            'Spain enters the archive together with France in the earliest republican phase and remains one of the oldest provinces in the western bloc.',
        strategicRole:
            'Founding western province; stable component across regime changes.',
        timelineYears: [1802, 1807, 1817, 1835, 1839, 1863, 1869, 1870, 1894, 1904],
        relatedDossiers: [
            { label: 'Second Republic', href: '/terminal?tab=dossiers&file=second-republic' },
        ],
        relatedRoutes: [
            { label: '1802 cartography', href: '/terminal?tab=cartography&year=1802' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
        ],
    },

    PT: {
        id: 'PT',
        label: 'Portugal',
        capital: 'Lisbon',
        republicSince: 1807,
        status: 'Atlantic littoral province',
        summary:
            'Portugal joins in the third republican phase and functions as the ocean-facing threshold of the western structure.',
        strategicRole:
            'Atlantic gateway and western maritime edge.',
        timelineYears: [1807, 1817, 1835, 1863, 1869, 1870, 1894, 1904],
        relatedDossiers: [
            { label: 'Second Republic', href: '/terminal?tab=dossiers&file=second-republic' },
            { label: 'Fifth Republic', href: '/terminal?tab=dossiers&file=fifth-republic' },
        ],
        relatedRoutes: [
            { label: '1807 cartography', href: '/terminal?tab=cartography&year=1807' },
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
        ],
    },

    BE: {
        id: 'BE',
        label: 'Belgium',
        capital: 'Brussels',
        republicSince: 1835,
        status: 'Low Countries province',
        summary:
            'Belgium appears in the archive during the late First Empire phase and remains an important administrative and logistics corridor.',
        strategicRole:
            'Northern corridor and administrative density zone.',
        timelineYears: [1835, 1869, 1870],
        relatedDossiers: [
            { label: 'Gaius Fabius', href: '/terminal?tab=dossiers&file=gaius-fabius' },
        ],
        relatedRoutes: [
            { label: '1835 cartography', href: '/terminal?tab=cartography&year=1835' },
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
        ],
    },

    GB: {
        id: 'GB',
        label: 'Britain',
        capital: 'London',
        republicSince: 1869,
        status: 'Atlantic province',
        summary:
            'Britain enters the archive as part of the great late-expansion phase and operates as the Atlantic naval hinge of the enlarged state.',
        strategicRole:
            'Oceanic hinge and naval flank.',
        timelineYears: [1869, 1870],
        relatedDossiers: [
            { label: 'Republican Coup of 1869', href: '/terminal?tab=dossiers&file=republican-coup-1869' },
        ],
        relatedRoutes: [
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
        ],
    },

    DE: {
        id: 'DE',
        label: 'Germany',
        capital: 'Berlin',
        republicSince: 1863,
        status: 'Central European province',
        summary:
            'Germany becomes part of the Second Empire restoration and remains central to the continental industrial and command depth of the system.',
        strategicRole:
            'Manufacturing and continental command depth.',
        timelineYears: [1863, 1869, 1870, 1894, 1904],
        relatedDossiers: [
            { label: 'Gaius Fabius the Younger', href: '/terminal?tab=dossiers&file=gaius-fabius-the-younger' },
        ],
        relatedRoutes: [
            { label: '1863 cartography', href: '/terminal?tab=cartography&year=1863' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
        ],
    },

    AT: {
        id: 'AT',
        label: 'Austria',
        capital: 'Vienna',
        republicSince: 1863,
        status: 'Alpine-central province',
        summary:
            'Austria appears inside the reconstructed continental order of the Second Empire and remains part of the central European core thereafter.',
        strategicRole:
            'Alpine-central connector zone.',
        timelineYears: [1863, 1869, 1870, 1894, 1904],
        relatedDossiers: [
            { label: 'Gaius Fabius the Younger', href: '/terminal?tab=dossiers&file=gaius-fabius-the-younger' },
        ],
        relatedRoutes: [
            { label: '1863 cartography', href: '/terminal?tab=cartography&year=1863' },
        ],
    },

    IT: {
        id: 'IT',
        label: 'Italy',
        capital: 'Rome',
        republicSince: 1835,
        status: 'Peninsular core province',
        summary:
            'Italy is one of the most structurally important territories in the archive: first partially absorbed, later fully incorporated, then symbolically elevated when Rome becomes capital.',
        strategicRole:
            'Roman symbolic center and peninsular hinge.',
        timelineYears: [1835, 1863, 1869, 1870, 1894, 1904],
        relatedDossiers: [
            { label: 'Fifth Republic', href: '/terminal?tab=dossiers&file=fifth-republic' },
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
        ],
        relatedRoutes: [
            { label: '1835 cartography', href: '/terminal?tab=cartography&year=1835' },
            { label: '1870 cartography', href: '/terminal?tab=cartography&year=1870' },
        ],
    },

    IT_N: {
        id: 'IT_N',
        label: 'North Italy',
        capital: 'Milan',
        republicSince: 1807,
        status: 'Split historical overlay',
        summary:
            'North Italy exists in the archive as a specifically indexed early territorial layer, reflecting the period before the whole peninsula is absorbed.',
        strategicRole:
            'Early penetration zone before total Italian incorporation.',
        timelineYears: [1807, 1817],
        relatedDossiers: [
            { label: 'Second Republic', href: '/terminal?tab=dossiers&file=second-republic' },
        ],
        relatedRoutes: [
            { label: '1807 cartography', href: '/terminal?tab=cartography&year=1807' },
            { label: '1817 cartography', href: '/terminal?tab=cartography&year=1817' },
        ],
    },

    IT_S: {
        id: 'IT_S',
        label: 'South Italy',
        capital: 'Naples',
        republicSince: null,
        status: 'Split historical overlay',
        summary:
            'South Italy is preserved as a cartographic sub-layer so the terminal can distinguish early northern incorporation from later full Italian control.',
        strategicRole:
            'Supplementary peninsular layer for split-state rendering.',
        timelineYears: [],
        relatedDossiers: [
            { label: 'Fifth Republic', href: '/terminal?tab=dossiers&file=fifth-republic' },
        ],
        relatedRoutes: [
            { label: '1835 cartography', href: '/terminal?tab=cartography&year=1835' },
        ],
    },

    IT_Sic: {
        id: 'IT_Sic',
        label: 'Sicily',
        capital: 'Palermo',
        republicSince: 1861,
        status: 'Restoration origin point',
        summary:
            'Sicily is the point from which Gaius Fabius the Younger begins rebuilding imperial scale after total fragmentation.',
        strategicRole:
            'Restoration seed territory.',
        timelineYears: [1861],
        relatedDossiers: [
            { label: 'Gaius Fabius the Younger', href: '/terminal?tab=dossiers&file=gaius-fabius-the-younger' },
        ],
        relatedRoutes: [
            { label: '1861 cartography', href: '/terminal?tab=cartography&year=1861' },
            { label: '1863 cartography', href: '/terminal?tab=cartography&year=1863' },
        ],
    },

    RU: {
        id: 'RU',
        label: 'European Russia & Urals',
        capital: 'Moscow',
        republicSince: 1869,
        status: 'Eastern expansion belt',
        summary:
            'In the archive, the Russian west and the Ural belt function less as a classic nation-state and more as a strategic eastern depth-zone of the enlarged imperial-republican order.',
        strategicRole:
            'Eastern depth and frontier belt.',
        timelineYears: [1869, 1870],
        relatedDossiers: [
            { label: 'Republican Coup of 1869', href: '/terminal?tab=dossiers&file=republican-coup-1869' },
        ],
        relatedRoutes: [
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
        ],
    },

    MA: {
        id: 'MA',
        label: 'Morocco',
        capital: 'Rabat',
        republicSince: 1869,
        status: 'Maghreb littoral province',
        summary:
            'Morocco belongs to the North African layer that marks the transition from continental Europe to Mediterranean imperial depth.',
        strategicRole:
            'Western Maghreb littoral.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Republican Coup of 1869', href: '/terminal?tab=dossiers&file=republican-coup-1869' },
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
        ],
    },

    DZ: {
        id: 'DZ',
        label: 'Algeria',
        capital: 'Algiers',
        republicSince: 1869,
        status: 'Maghreb central province',
        summary:
            'Algeria anchors the central Maghreb sector of the North African expansion band.',
        strategicRole:
            'Central Maghreb anchor.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Republican Coup of 1869', href: '/terminal?tab=dossiers&file=republican-coup-1869' },
        ],
        relatedRoutes: [
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
        ],
    },

    TN: {
        id: 'TN',
        label: 'Tunisia',
        capital: 'Tunis',
        republicSince: 1869,
        status: 'Maghreb littoral province',
        summary:
            'Tunisia sits in the compressed center of the North African Mediterranean corridor.',
        strategicRole:
            'Littoral corridor node.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Republican Coup of 1869', href: '/terminal?tab=dossiers&file=republican-coup-1869' },
        ],
        relatedRoutes: [
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
        ],
    },

    LY: {
        id: 'LY',
        label: 'Libya',
        capital: 'Tripoli',
        republicSince: 1869,
        status: 'African frontier province',
        summary:
            'Libya marks the eastern continuation of the North African band and the westward approach to the Middle Eastern theatre.',
        strategicRole:
            'African frontier continuation.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Republican Coup of 1869', href: '/terminal?tab=dossiers&file=republican-coup-1869' },
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
        ],
    },

    EG: {
        id: 'EG',
        label: 'Egypt',
        capital: 'Cairo',
        republicSince: 1869,
        status: 'Nile hinge province',
        summary:
            'Egypt connects the North African and eastern Mediterranean arcs and becomes strategically essential in any late imperial reading.',
        strategicRole:
            'Nile hinge between Africa and the eastern sea.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
        ],
    },

    TR: {
        id: 'TR',
        label: 'Turkey',
        capital: 'Ankara',
        republicSince: 1869,
        status: 'Anatolian frontier province',
        summary:
            'Turkey serves as the Anatolian hinge between Balkan and Levantine space and becomes one of the most important frontier connectors in the eastern theatre.',
        strategicRole:
            'Anatolian hinge.',
        timelineYears: [1869, 1870, 1904, 1974, 1982],
        relatedDossiers: [
            { label: 'Final Empire', href: '/terminal?tab=dossiers&file=final-empire' },
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1974 cartography', href: '/terminal?tab=cartography&year=1974' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
        ],
    },

    SY: {
        id: 'SY',
        label: 'Syria',
        capital: 'Damascus',
        republicSince: 1869,
        status: 'Levant frontier province',
        summary:
            'Syria belongs to the Levantine frontier layer through which eastern conflict zones become administratively legible.',
        strategicRole:
            'Levant frontier node.',
        timelineYears: [1869, 1870, 1904, 1974, 1982],
        relatedDossiers: [
            { label: 'Final Empire', href: '/terminal?tab=dossiers&file=final-empire' },
        ],
        relatedRoutes: [
            { label: '1974 cartography', href: '/terminal?tab=cartography&year=1974' },
        ],
    },

    LB: {
        id: 'LB',
        label: 'Lebanon',
        capital: 'Beirut',
        republicSince: 1869,
        status: 'Levant littoral province',
        summary:
            'Lebanon represents the maritime edge of the Levantine frontier system.',
        strategicRole:
            'Levantine port corridor.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
        ],
    },

    IL: {
        id: 'IL',
        label: 'Israel',
        capital: 'Jerusalem',
        republicSince: 1869,
        status: 'Levant frontier province',
        summary:
            'The archive treats this zone as part of the wider Levantine frontier rather than an isolated national unit.',
        strategicRole:
            'Levant interior pressure zone.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
        ],
    },

    JO: {
        id: 'JO',
        label: 'Jordan',
        capital: 'Amman',
        republicSince: 1869,
        status: 'Levant frontier province',
        summary:
            'Jordan belongs to the overland connective tissue between the Mediterranean Levant and deeper eastern theatres.',
        strategicRole:
            'Levant overland connector.',
        timelineYears: [1869, 1870, 1904, 1982],
        relatedDossiers: [
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
        ],
    },

    IQ: {
        id: 'IQ',
        label: 'Iraq',
        capital: 'Baghdad',
        republicSince: 1869,
        status: 'Mesopotamian frontier province',
        summary:
            'Iraq marks the deeper Mesopotamian extension of the eastern frontier belt.',
        strategicRole:
            'Mesopotamian depth corridor.',
        timelineYears: [1869, 1870, 1904, 1974, 1982],
        relatedDossiers: [
            { label: 'Final Empire', href: '/terminal?tab=dossiers&file=final-empire' },
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1974 cartography', href: '/terminal?tab=cartography&year=1974' },
        ],
    },

    IN: {
        id: 'IN',
        label: 'Western India',
        capital: 'Mumbai',
        republicSince: 1869,
        status: 'Frontier protectorate',
        summary:
            'Western India becomes critical once the Final Empire declares the subcontinent part of its vital sphere, triggering world conflict.',
        strategicRole:
            'Indian trigger zone of the First World War.',
        timelineYears: [1869, 1870, 1974, 1982],
        relatedDossiers: [
            { label: 'Final Empire', href: '/terminal?tab=dossiers&file=final-empire' },
            { label: 'Permanent Act on Peace', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
        ],
        relatedRoutes: [
            { label: '1974 cartography', href: '/terminal?tab=cartography&year=1974' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
        ],
    },
};

function fallbackLabel(id: string) {
    return id.replace(/_/g, ' ');
}

export function getTerritoryLabel(id: string) {
    return territoryIndex[id]?.label ?? fallbackLabel(id);
}

export function getTerritoryProfile(id: string): TerritoryProfile {
    return (
        territoryIndex[id] ?? {
            id,
            label: fallbackLabel(id),
            capital: 'Not indexed',
            republicSince: null,
            status: 'Unindexed cartographic territory',
            summary:
                'This territory appears on the cartographic layer, but its dedicated archival dossier has not yet been written.',
            strategicRole: 'No strategic role has been indexed for this territory yet.',
            timelineYears: [],
            relatedDossiers: [],
            relatedRoutes: [],
        }
    );
}