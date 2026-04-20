import type { Dossier } from './terminal.types';

export const dossiers: Dossier[] = [
    {
        id: 'PREF-002',
        slug: 'second-republic',
        title: 'Second Republic',
        type: 'institution',
        status: 'archived',
        date: '1802',
        summary:
            'The first clearly divergent republican formation: France and Spain under a regime that formally classifies Christianity as a hostile ideology.',
        excerpt:
            'The Second Republic matters not only because it redraws sovereignty, but because it redefines civilizational enemies in ideological terms. Here the archive stops speaking the language of old Europe and begins speaking in the language of engineered order.',
        tags: ['republic', 'france', 'spain', 'christianity'],
        related: [
            { label: 'Cartography 1802', href: '/terminal?tab=cartography&year=1802' },
            { label: 'Essays', href: '/articles' },
        ],
    },
    {
        id: 'PREF-007',
        slug: 'first-empire-succession',
        title: 'First Empire Succession File',
        type: 'incident',
        status: 'redacted',
        date: '1817',
        summary:
            'Military overthrow of the republican system and accession of the first emperor at age thirteen.',
        excerpt:
            'The chronicles preserve the structure of the transfer but suppress the surname of the first emperor. Redaction here is not an accident. It suggests that origin itself became politically dangerous.',
        tags: ['empire', 'coup', 'redaction', 'succession'],
        related: [
            { label: 'Cartography 1817', href: '/terminal?tab=cartography&year=1817' },
            { label: 'Chronicle', href: '/novel' },
        ],
    },
    {
        id: 'PREF-011',
        slug: 'gaius-fabius',
        title: 'Gaius Fabius',
        type: 'person',
        status: 'archived',
        date: '1835',
        summary:
            'The Fabius figure who kills the emperor, takes the throne, and forces the first great imperial breakdown.',
        excerpt:
            'In official memory Gaius Fabius is both usurper and catalyst. He does not merely inherit imperial crisis; he accelerates it, and in doing so turns the Fabius line into a permanent historical force.',
        tags: ['fabius', 'emperor', 'regicide', 'civil-war'],
        related: [
            { label: 'Cartography 1835', href: '/terminal?tab=cartography&year=1835' },
            { label: 'Cartography 1839', href: '/terminal?tab=cartography&year=1839' },
        ],
    },
    {
        id: 'PREF-014',
        slug: 'gaius-fabius-the-younger',
        title: 'Gaius Fabius the Younger',
        type: 'person',
        status: 'archived',
        date: '1863',
        summary:
            'Restorer of imperial scale after total fragmentation; begins from Sicily and rebuilds power into the Second Empire.',
        excerpt:
            'The younger Fabius transforms dynastic residue into continental architecture. His achievement is not survival of a line, but reconstruction of imperial legitimacy after systemic collapse.',
        tags: ['fabius', 'sicily', 'second-empire', 'restoration'],
        related: [
            { label: 'Cartography 1861', href: '/terminal?tab=cartography&year=1861' },
            { label: 'Cartography 1863', href: '/terminal?tab=cartography&year=1863' },
        ],
    },
    {
        id: 'PREF-018',
        slug: 'republican-coup-1869',
        title: 'Republican Coup of 1869',
        type: 'incident',
        status: 'leaked',
        date: '1869',
        summary:
            'Elite seizure of the imperial center after opposition to further eastern expansion and invasion of the Final Empire.',
        excerpt:
            'The coup is called republican not because it restores civic virtue, but because it restores elite veto over imperial excess. The emperor dies by Senate order — unless the slave-version is true.',
        tags: ['coup', 'senate', 'final-empire', 'elite'],
        related: [
            { label: 'Cartography 1869', href: '/terminal?tab=cartography&year=1869' },
            { label: 'Cartography 1870', href: '/terminal?tab=cartography&year=1870' },
        ],
    },
    {
        id: 'PREF-021',
        slug: 'fifth-republic',
        title: 'Fifth Republic',
        type: 'institution',
        status: 'archived',
        date: '1870',
        summary:
            'Republican refoundation that preserves imperial scale and relocates the capital to Rome.',
        excerpt:
            'The Fifth Republic is one of the archive’s clearest proofs that regime labels can change while territorial logic remains intact. Empire and republic stop functioning as opposites and begin acting as masks.',
        tags: ['republic', 'rome', 'continuity', 'territory'],
        related: [
            { label: 'Cartography 1870', href: '/terminal?tab=cartography&year=1870' },
            { label: 'Essays', href: '/articles' },
        ],
    },
    {
        id: 'PREF-026',
        slug: 'age-of-chaos',
        title: 'Age of Chaos',
        type: 'incident',
        status: 'archived',
        date: '1894',
        summary:
            'Constitutional and territorial crisis stretching from 1894 to 1903, marked by provincial fragmentation and weakened central control.',
        excerpt:
            'The Age of Chaos is not random disorder. It is what happens when imperial scale survives longer than the structure capable of carrying it. Provinces do not merely revolt; they test whether distance can become sovereignty.',
        tags: ['chaos', 'crisis', 'provinces', 'fragmentation'],
        related: [
            { label: 'Cartography 1894', href: '/terminal?tab=cartography&year=1894' },
            { label: 'Dialogues', href: '/dialogues' },
        ],
    },
    {
        id: 'PREF-031',
        slug: 'holy-academy',
        title: 'Holy Academy',
        type: 'institution',
        status: 'active',
        date: '1904',
        summary:
            'Renamed successor to the Academy of Sciences and one of the decisive pillars of the Sixth Republic.',
        excerpt:
            'The renaming is not cosmetic. Once the Academy becomes Holy, knowledge is no longer merely authoritative. It becomes sanctified, and therefore harder to oppose without being cast as a civilizational threat.',
        tags: ['academy', 'holy', 'science', 'doctrine'],
        related: [
            { label: 'Cartography 1904', href: '/terminal?tab=cartography&year=1904' },
            { label: 'Dialogues', href: '/dialogues' },
        ],
    },
    {
        id: 'PREF-039',
        slug: 'final-empire',
        title: 'Final Empire',
        type: 'institution',
        status: 'active',
        date: '1974',
        summary:
            'One of the three great world powers of the late archive period; its Indian claim triggers the First World War.',
        excerpt:
            'The Final Empire enters this archive not as background scenery but as strategic pressure. Once it marks India as a vital zone, world conflict shifts from possible to inevitable.',
        tags: ['final-empire', 'world-war', 'india', 'power'],
        related: [
            { label: 'Cartography 1974', href: '/terminal?tab=cartography&year=1974' },
            { label: 'Signal', href: '/terminal?tab=signal' },
        ],
    },
    {
        id: 'PREF-044',
        slug: 'great-theocracy',
        title: 'Great Theocracy',
        type: 'institution',
        status: 'active',
        date: '1982',
        summary:
            'The great transatlantic power occupying the geographical zone corresponding to North America and the northern part of South America in Reality A.',
        excerpt:
            'By the postwar settlement, the Great Theocracy stands alongside the Seventh Republic and the Final Empire as one of the three accepted centers of global force.',
        tags: ['theocracy', 'america', 'great-power', 'postwar'],
        related: [
            { label: 'Cartography 1982', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Signal', href: '/terminal?tab=signal' },
        ],
    },
    {
        id: 'PREF-048',
        slug: 'permanent-act-of-peace',
        title: 'Permanent Act on Peace and Mutual Understanding',
        type: 'doctrine',
        status: 'active',
        date: '1982',
        summary:
            'The postwar act through which the Seventh Republic, the Final Empire, and the Great Theocracy agree not to wage large-scale war against each other.',
        excerpt:
            'The Act does not abolish rivalry. It formalizes its limits. Total war is suspended, not trustlessly transcended. The great powers stop trying to destroy one another openly and begin managing conflict at lower intensities.',
        tags: ['peace', 'treaty', 'seventh-republic', 'world-order'],
        related: [
            { label: 'Cartography 1982', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Signal', href: '/terminal?tab=signal' },
        ],
    },
];