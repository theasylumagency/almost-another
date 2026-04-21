import type { TerritoryProfile } from './terminal.types';

type TerritorySeed = Omit<TerritoryProfile, 'id' | 'summary'> & {
    summary?: string;
};

const regionNames =
    typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function'
        ? new Intl.DisplayNames(['en'], { type: 'region' })
        : null;

const territoryIndex: Record<string, TerritorySeed> = {
    AD: {
        label: 'Andorra',
        capital: 'Andorra la Vella',
        republicSince: 1802,
        status: 'Pyrenean enclave district',
    },
    AL: {
        label: 'Albania',
        capital: 'Tirana',
        republicSince: 1870,
        status: 'Adriatic frontier province',
    },
    AM: {
        label: 'Armenia',
        capital: 'Yerevan',
        republicSince: 1870,
        status: 'Caucasus frontier province',
    },
    AT: {
        label: 'Austria',
        capital: 'Vienna',
        republicSince: 1870,
        status: 'Alpine province',
    },
    BA: {
        label: 'Bosnia and Herzegovina',
        capital: 'Sarajevo',
        republicSince: 1870,
        status: 'Balkan frontier province',
    },
    BE: {
        label: 'Belgium',
        capital: 'Brussels',
        republicSince: 1870,
        status: 'Low Countries province',
        summary:
            'Belgium remains one of the archive\'s densest rail and logistics corridors, with Brussels serving as the administrative capital.',
    },
    BG: {
        label: 'Bulgaria',
        capital: 'Sofia',
        republicSince: 1870,
        status: 'Balkan frontier province',
    },
    BY: {
        label: 'Belarus',
        capital: 'Minsk',
        republicSince: 1870,
        status: 'Eastern frontier province',
    },
    CH: {
        label: 'Switzerland',
        capital: 'Bern',
        republicSince: 1870,
        status: 'Alpine province',
    },
    CZ: {
        label: 'Czechia',
        capital: 'Prague',
        republicSince: 1870,
        status: 'Bohemian province',
    },
    DE: {
        label: 'Germany',
        capital: 'Berlin',
        republicSince: 1870,
        status: 'Rhine-Danube province',
        summary:
            'Germany is indexed as a manufacturing and command-depth province inside the western republican core.',
    },
    DZ: {
        label: 'Algeria',
        capital: 'Algiers',
        republicSince: 1870,
        status: 'Maghreb littoral province',
    },
    EG: {
        label: 'Egypt',
        capital: 'Cairo',
        republicSince: 1870,
        status: 'Nile province',
    },
    ES: {
        label: 'Spain',
        capital: 'Madrid',
        republicSince: 1802,
        status: 'Iberian province',
        summary:
            'Spain belongs to the oldest republican tier in the archive and remains one of the foundational western provinces.',
    },
    FR: {
        label: 'France',
        capital: 'Paris',
        republicSince: 1802,
        status: 'Metropolitan core province',
        summary:
            'France is treated as one of the original metropolitan provinces from which the republican order first expanded.',
    },
    GB: {
        label: 'Britain',
        capital: 'London',
        republicSince: 1870,
        status: 'Atlantic province',
        summary:
            'Britain is catalogued as the Atlantic naval hinge of the republic, with London indexed as its capital port.',
    },
    GE: {
        label: 'Georgia',
        capital: 'Tbilisi',
        republicSince: 1870,
        status: 'Caucasus frontier province',
    },
    GR: {
        label: 'Greece',
        capital: 'Athens',
        republicSince: 1870,
        status: 'Aegean province',
    },
    HR: {
        label: 'Croatia',
        capital: 'Zagreb',
        republicSince: 1870,
        status: 'Adriatic province',
    },
    HU: {
        label: 'Hungary',
        capital: 'Budapest',
        republicSince: 1870,
        status: 'Danubian province',
    },
    IL: {
        label: 'Israel',
        capital: 'Jerusalem',
        republicSince: 1870,
        status: 'Levant frontier province',
    },
    IN: {
        label: 'Western India',
        capital: 'Mumbai',
        republicSince: 1870,
        status: 'Western India protectorate',
        summary:
            'The western Indian coast is indexed as a frontier protectorate whose ports remain critical to long-range republican trade.',
    },
    IQ: {
        label: 'Iraq',
        capital: 'Baghdad',
        republicSince: 1870,
        status: 'Mesopotamian frontier province',
    },
    IT: {
        label: 'Italy',
        capital: 'Rome',
        republicSince: 1870,
        status: 'Peninsular core province',
        summary:
            'Italy is catalogued as a peninsular core province, with Rome preserved as the symbolic capital of the republican order.',
    },
    JO: {
        label: 'Jordan',
        capital: 'Amman',
        republicSince: 1870,
        status: 'Levant frontier province',
    },
    LB: {
        label: 'Lebanon',
        capital: 'Beirut',
        republicSince: 1870,
        status: 'Levant frontier province',
    },
    LI: {
        label: 'Liechtenstein',
        capital: 'Vaduz',
        republicSince: 1870,
        status: 'Alpine enclave district',
    },
    LT: {
        label: 'Lithuania',
        capital: 'Vilnius',
        republicSince: 1870,
        status: 'Baltic frontier province',
    },
    LU: {
        label: 'Luxembourg',
        capital: 'Luxembourg',
        republicSince: 1870,
        status: 'Low Countries province',
    },
    LY: {
        label: 'Libya',
        capital: 'Tripoli',
        republicSince: 1870,
        status: 'African frontier province',
    },
    MA: {
        label: 'Morocco',
        capital: 'Rabat',
        republicSince: 1870,
        status: 'Maghreb littoral province',
    },
    MC: {
        label: 'Monaco',
        capital: 'Monaco',
        republicSince: 1870,
        status: 'Riviera enclave district',
    },
    MD: {
        label: 'Moldova',
        capital: 'Chisinau',
        republicSince: 1870,
        status: 'Eastern frontier province',
    },
    ME: {
        label: 'Montenegro',
        capital: 'Podgorica',
        republicSince: 1870,
        status: 'Adriatic frontier province',
    },
    MK: {
        label: 'North Macedonia',
        capital: 'Skopje',
        republicSince: 1870,
        status: 'Balkan frontier province',
    },
    NL: {
        label: 'Netherlands',
        capital: 'Amsterdam',
        republicSince: 1870,
        status: 'Low Countries province',
    },
    PL: {
        label: 'Poland',
        capital: 'Warsaw',
        republicSince: 1870,
        status: 'Vistula province',
    },
    PT: {
        label: 'Portugal',
        capital: 'Lisbon',
        republicSince: 1807,
        status: 'Iberian littoral province',
        summary:
            'Portugal is indexed as the republic\'s western oceanic threshold, anchored by Lisbon and the Atlantic fleet yards.',
    },
    RO: {
        label: 'Romania',
        capital: 'Bucharest',
        republicSince: 1870,
        status: 'Danubian frontier province',
    },
    RS: {
        label: 'Serbia',
        capital: 'Belgrade',
        republicSince: 1870,
        status: 'Balkan interior province',
    },
    RU: {
        label: 'European Russia & Urals',
        capital: 'Moscow',
        republicSince: 1870,
        status: 'Ural frontier province',
        summary:
            'The archive treats European Russia and the Urals as a strategic eastern belt rather than a purely metropolitan province.',
    },
    SI: {
        label: 'Slovenia',
        capital: 'Ljubljana',
        republicSince: 1870,
        status: 'Adriatic-alpine province',
    },
    SK: {
        label: 'Slovakia',
        capital: 'Bratislava',
        republicSince: 1870,
        status: 'Central European province',
    },
    SM: {
        label: 'San Marino',
        capital: 'San Marino',
        republicSince: 1870,
        status: 'Peninsular enclave district',
    },
    SY: {
        label: 'Syria',
        capital: 'Damascus',
        republicSince: 1870,
        status: 'Levant frontier province',
    },
    TN: {
        label: 'Tunisia',
        capital: 'Tunis',
        republicSince: 1870,
        status: 'Maghreb littoral province',
    },
    TR: {
        label: 'Turkey',
        capital: 'Ankara',
        republicSince: 1870,
        status: 'Anatolian frontier province',
        summary:
            'Turkey is indexed as the republic\'s Anatolian hinge, linking the Balkan and Levantine theatres in a single frontier dossier.',
    },
    UA: {
        label: 'Ukraine',
        capital: 'Kyiv',
        republicSince: 1870,
        status: 'Eastern grain province',
    },
    VA: {
        label: 'Vatican City',
        capital: 'Vatican City',
        republicSince: 1870,
        status: 'Roman enclave district',
        summary:
            'The Vatican remains under archive control as a sealed Roman enclave attached to the wider Italian provincial administration.',
    },
    XK: {
        label: 'Kosovo',
        capital: 'Pristina',
        republicSince: 1870,
        status: 'Balkan frontier province',
    },
};

function fallbackLabel(id: string) {
    if (/^[A-Z]{2}$/.test(id)) {
        return regionNames?.of(id) ?? id;
    }

    return id.replace(/_/g, ' ');
}

export function getTerritoryLabel(id: string) {
    return territoryIndex[id]?.label ?? fallbackLabel(id);
}

export function getTerritoryProfile(id: string): TerritoryProfile {
    const territory = territoryIndex[id];
    const label = territory?.label ?? fallbackLabel(id);

    return {
        id,
        label,
        capital: territory?.capital ?? 'Not indexed',
        republicSince: territory?.republicSince ?? null,
        status: territory?.status ?? 'Unindexed cartographic territory',
        summary:
            territory?.summary ??
            `${label} appears on the cartographic layer, but its dedicated archival dossier has not been indexed yet.`,
    };
}
