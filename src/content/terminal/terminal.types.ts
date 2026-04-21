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
    | 'state_form'
    | 'lineage'
    | 'operation'
    | 'observation'
    | 'threat'
    | 'doctrine';

export type DossierStatus =
    | 'active'
    | 'archived'
    | 'redacted'
    | 'leaked'
    | 'sealed'
    | 'restricted';

export type DossierSection = {
    title: string;
    body: string;
};

export type DossierReference = {
    label: string;
    href: string;
};

export type Dossier = {
    id: string;
    slug: string;
    title: string;
    type: DossierType;
    status: DossierStatus;
    date: string;
    classification?: string;

    summary: string;
    strategicRole?: string;

    tags: string[];
    timelineYears?: number[];

    sections: DossierSection[];

    relatedDossiers?: DossierReference[];
    relatedRoutes?: DossierReference[];
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
    svgIds: string[];
};

export type TerritoryGroup = {
    id: string;
    members: string[];
};

export type TerritoryReference = {
    label: string;
    href: string;
};

export type TerritoryProfile = {
    id: string;
    label: string;
    capital: string;
    republicSince: number | null;
    status: string;
    summary: string;
    strategicRole?: string;
    timelineYears: number[];
    relatedDossiers: TerritoryReference[];
    relatedRoutes: TerritoryReference[];
};
