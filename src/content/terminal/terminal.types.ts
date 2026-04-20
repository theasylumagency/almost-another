export type TerminalTab = 'cartography' | 'dossiers' | 'signal';

export type TerminalLink = {
    label: string;
    href: string;
};

export type TimelineEntry = {
    year: number;
    era: string;
    title: string;
    summary: string;
    events: string[];
    affectedRegions: string[];
    related: TerminalLink[];
};

export type DossierType =
    | 'person'
    | 'incident'
    | 'place'
    | 'institution'
    | 'operation'
    | 'observation'
    | 'threat'
    | 'doctrine';

export type DossierStatus =
    | 'active'
    | 'archived'
    | 'redacted'
    | 'leaked'
    | 'sealed';

export type Dossier = {
    id: string;
    slug: string;
    title: string;
    type: DossierType;
    status: DossierStatus;
    date: string;
    summary: string;
    excerpt: string;
    tags: string[];
    related: TerminalLink[];
};

export type SignalClassification = 'open' | 'restricted' | 'uncertain';

export type SignalBlock = {
    id: string;
    title: string;
    classification: SignalClassification;
    body: string;
};

export type MapRegion = {
    id: string;
    label: string;
    path: string;
    labelX: number;
    labelY: number;
};