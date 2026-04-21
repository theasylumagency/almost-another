import type { MapRegion, TerritoryGroup } from './terminal.types';

export const mapRegions: MapRegion[] = [
    { id: 'britain', label: 'Britain', svgIds: ['GB'] },
    { id: 'belgium', label: 'Belgium', svgIds: ['BE'] },
    { id: 'france', label: 'France', svgIds: ['FR'] },
    { id: 'spain', label: 'Spain', svgIds: ['ES'] },
    { id: 'portugal', label: 'Portugal', svgIds: ['PT'] },
    { id: 'austria', label: 'Austria', svgIds: ['AT'] },
    { id: 'germany', label: 'Germany', svgIds: ['DE'] },

    // full country shell
    { id: 'italy', label: 'Italy', svgIds: ['IT'] },

    // historical overlays
    { id: 'italy-north', label: 'North Italy', svgIds: ['IT_N'] },
    { id: 'italy-south', label: 'South Italy', svgIds: ['IT_S'] },
    { id: 'sicily', label: 'Sicily', svgIds: ['IT_Sic'] },

    // later stage, not used in stage 1 map rendering yet
    { id: 'russia-west', label: 'West Russia', svgIds: ['RU_W'] },
    { id: 'russia-east', label: 'East Russia', svgIds: ['RU_E'] },

    // macro overlays for stage 1
    { id: 'north-africa', label: 'North Africa', svgIds: ['MA', 'DZ', 'TN', 'LY', 'EG'] },
    { id: 'middle-east', label: 'Middle East', svgIds: ['TR', 'SY', 'LB', 'IL', 'JO', 'IQ'] },
    { id: 'western-india', label: 'Western India', svgIds: ['IN'] },

    // Europe & Ural scale
    {
        id: 'europe-ural',
        label: 'Europe & Urals',
        svgIds: [
            'RU', 'VA', 'UA', 'TR', 'SM', 'SK', 'SI', 'RS', 'RO',
            'PL', 'NL', 'MK', 'ME', 'MD', 'MC', 'LU', 'LT', 'LI', 'XK',
            'HU', 'HR', 'GR', 'GE', 'DE', 'CZ', 'CH', 'BY', 'BG', 'BE',
            'BA', 'AT', 'AM', 'AL'
        ]
    },
];

export const territoryGroups: TerritoryGroup[] = [
    {
        id: 'ITALY_ALL',
        members: ['IT_N', 'IT_S', 'IT_Sic'],
    },
];