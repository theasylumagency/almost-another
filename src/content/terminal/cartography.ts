import type { TimelineEntry } from './terminal.types';

export const timelineEntries: TimelineEntry[] = [
    {
        year: 1791,
        era: 'Shared Horizon',
        title: 'Last Common Historical Line',
        summary:
            'Up to 1791, Reality B develops in the same way as Reality A. The archive treats this year as the last stable common horizon before durable divergence.',
        events: [
            'No territorial divergence is yet registered by the archive.',
            'The political map remains identical to Reality A.',
            'Later records read 1791 as the threshold beyond which shared history can no longer be assumed.',
        ],
        affectedRegions: [],
        related: [
            { label: 'Open monitor', href: '/' },
            { label: 'Read essays', href: '/articles' },
        ],
    },
    {
        year: 1802,
        era: 'Second Republic',
        title: 'Proclamation of the Second Republic',
        summary:
            'The Second Republic is proclaimed. Its territory consists of all France and Spain, and Christianity is formally declared a hostile ideology.',
        events: [
            'Republican sovereignty consolidates over France and Spain.',
            'Christianity is recoded from legacy belief to hostile ideological force.',
            'This is the first fully explicit political divergence from Reality A.',
        ],
        affectedRegions: ['france', 'spain'],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers' },
            { label: 'Read dialogues', href: '/dialogues' },
        ],
    },
    {
        year: 1807,
        era: 'Third Republic',
        title: 'Third Republic and the Anti-Clerical Break',
        summary:
            'The Third Republic extends across France, Spain, Portugal, and northern Italy. The Catholic Church is abolished, and the Vatican is handed to the Academy of Sciences.',
        events: [
            'Portugal and northern Italy enter the republican structure.',
            'The Catholic Church is formally abolished.',
            'The Vatican is transferred to the Academy of Sciences for research and the promotion of free thought.',
        ],
        affectedRegions: ['france', 'spain', 'portugal', 'italy-north'],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers' },
            { label: 'Read chronicle', href: '/novel' },
        ],
    },
    {
        year: 1817,
        era: 'First Empire',
        title: 'Military Coup and the First Empire',
        summary:
            'Three republican generals stage a coup and found the First Empire. A thirteen-year-old becomes the first emperor; his family name is redacted in the chronicles.',
        events: [
            'The republic is replaced by an imperial structure through military seizure.',
            'The first emperor is thirteen years old.',
            'The transition preserves imperial territory without immediate loss.',
        ],
        affectedRegions: ['france', 'spain', 'portugal', 'italy-north'],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=first-empire-succession' },
            { label: 'Read chronicle', href: '/novel' },
        ],
    },
    {
        year: 1835,
        era: 'First Empire',
        title: 'Gaius Fabius Seizes the Throne',
        summary:
            'By 1835 the First Empire includes France, Spain, Portugal, Belgium, and all of Italy. Gaius Fabius kills the emperor and becomes emperor himself.',
        events: [
            'Belgium and all of Italy are incorporated into the imperial space.',
            'Gaius Fabius assassinates the reigning emperor.',
            'The Fabius line enters imperial history through regicide and seizure.',
        ],
        affectedRegions: ['france', 'spain', 'portugal', 'belgium', 'italy'],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=gaius-fabius' },
            { label: 'Read dialogues', href: '/dialogues' },
        ],
    },
    {
        year: 1839,
        era: 'Fourth Republic',
        title: 'Collapse of the First Empire',
        summary:
            'After the assassination crisis, the empire deteriorates sharply. Economic decline is followed by provincial unrest, military fracture, and civil war. Gaius Fabius is declared an enemy of the state and is killed.',
        events: [
            'The empire loses control over Portugal, Italy, Belgium, and northern France.',
            'The army splits into two hostile camps.',
            'Civil war ends with the death of Emperor Fabius and the proclamation of the Fourth Republic.',
        ],
        affectedRegions: ['france', 'spain'],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=gaius-fabius' },
            { label: 'Read essays', href: '/articles' },
        ],
    },
    {
        year: 1861,
        era: 'Fragmentation',
        title: 'Total Fragmentation and the Sicilian Starting Point',
        summary:
            'By 1861 the former imperial-republican space is fully fragmented. The son of Gaius Fabius begins building a new imperial structure from Sicily.',
        events: [
            'The old territorial system no longer exists as a coherent block.',
            'Political legitimacy is rebuilt from the margins rather than the center.',
            'The Fabius line returns through Sicily, not through Rome or Paris.',
        ],
        affectedRegions: ['italy'],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=gaius-fabius-the-younger' },
            { label: 'Read chronicle', href: '/novel' },
        ],
    },
    {
        year: 1863,
        era: 'Second Empire',
        title: 'Proclamation of the Second Empire',
        summary:
            'Gaius Fabius the Younger is proclaimed emperor of the Second Empire. Its territory includes Italy, France, Austria, Germany, Spain, and Portugal.',
        events: [
            'Imperial restoration succeeds within two years of systemic fragmentation.',
            'Austria and Germany are integrated into the new imperial body.',
            'The Fabius restoration now operates on a continental scale.',
        ],
        affectedRegions: ['italy', 'france', 'austria', 'germany', 'spain', 'portugal'],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=gaius-fabius-the-younger' },
            { label: 'Read dialogues', href: '/dialogues' },
        ],
    },
    {
        year: 1869,
        era: 'Second Empire',
        title: 'Maximum Expansion and the Republican Coup',
        summary:
            'The Second Empire expands into North Africa, all Europe to the Urals, the Middle East, western India, and Britain. When the emperor seeks to invade the Final Empire in Asia, the elite turns against him.',
        events: [
            'The empire reaches its maximum territorial extent.',
            'A republican coup is carried out by the elite against continued expansion.',
            'The emperor is declared a traitor and dies by Senate order; one counter-version claims he was killed by a slave.',
        ],
        affectedRegions: [
            'britain',
            'belgium',
            'france',
            'spain',
            'portugal',
            'italy',
            'austria',
            'germany',
            'europe-ural',
            'north-africa',
            'middle-east',
            'western-india',
        ],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=republican-coup-1869' },
            { label: 'Read essays', href: '/articles' },
        ],
    },
    {
        year: 1870,
        era: 'Fifth Republic',
        title: 'Rome as Capital of the Fifth Republic',
        summary:
            'The Fifth Republic is proclaimed after the fall of the Second Empire. The immense territorial body is preserved, and Rome becomes the capital.',
        events: [
            'The republican form returns without major territorial rollback.',
            'Rome replaces earlier imperial-republican centers as capital.',
            'The archive records continuity of scale despite rupture of regime form.',
        ],
        affectedRegions: [
            'britain',
            'belgium',
            'france',
            'spain',
            'portugal',
            'italy',
            'austria',
            'germany',
            'europe-ural',
            'north-africa',
            'middle-east',
            'western-india',
        ],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=fifth-republic' },
            { label: 'Read chronicle', href: '/novel' },
        ],
    },
    {
        year: 1894,
        era: 'Age of Chaos',
        title: 'Crisis of Power',
        summary:
            'Between 1894 and 1903 the state passes through a severe constitutional and territorial crisis. Several provinces declare independence. The chronicles refer to this period as the Age of Chaos.',
        events: [
            'Central authority weakens dramatically.',
            'Multiple provinces move toward open separation.',
            'The archive treats this period as a crisis of structure, not merely of leadership.',
        ],
        affectedRegions: [
            'france',
            'spain',
            'portugal',
            'italy',
            'austria',
            'germany',
            'europe-ural',
        ],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=age-of-chaos' },
            { label: 'Read dialogues', href: '/dialogues' },
        ],
    },
    {
        year: 1904,
        era: 'Sixth Republic',
        title: 'Holy Academy and Constitutional Reordering',
        summary:
            'In 1904 the Academy of Sciences is renamed the Holy Academy. The constitutional structure is revised, the Sixth Republic is proclaimed, and punitive expeditions begin against rebel provinces.',
        events: [
            'The Academy of Sciences becomes the Holy Academy.',
            'The republic is constitutionally refounded as the Sixth Republic.',
            'Punitive expeditions are launched against rebellious provinces.',
        ],
        affectedRegions: [
            'france',
            'spain',
            'portugal',
            'italy',
            'austria',
            'germany',
            'europe-ural',
            'north-africa',
            'middle-east',
        ],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Read essays', href: '/articles' },
        ],
    },
    {
        year: 1974,
        era: 'First World War',
        title: 'Final Empire and the Indian Trigger',
        summary:
            'The Final Empire declares the Indian subcontinent part of its vital sphere of interest. This triggers the First World War.',
        events: [
            'India becomes the fault line of world-system competition.',
            'The conflict is no longer regional or continental, but civilizational.',
            'The war formally begins in a world already dominated by three great states.',
        ],
        affectedRegions: [
            'britain',
            'belgium',
            'france',
            'spain',
            'portugal',
            'italy',
            'austria',
            'germany',
            'europe-ural',
            'north-africa',
            'middle-east',
            'western-india',
        ],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=final-empire' },
            { label: 'Read essays', href: '/articles' },
        ],
    },
    {
        year: 1982,
        era: 'Postwar Settlement',
        title: 'Permanent Act on Peace and Mutual Understanding',
        summary:
            'After the First World War, the three great states — the Seventh Republic, the Final Empire, and the Great Theocracy — agree not to wage large-scale military operations against one another.',
        events: [
            'The Permanent Act on Peace and Mutual Understanding is signed.',
            'The archive names the western superstate the Seventh Republic by this point.',
            'Open total war between the three great powers is formally suspended.',
        ],
        affectedRegions: [
            'britain',
            'belgium',
            'france',
            'spain',
            'portugal',
            'italy',
            'austria',
            'germany',
            'europe-ural',
            'north-africa',
            'middle-east',
            'western-india',
        ],
        related: [
            { label: 'Open dossiers', href: '/terminal?tab=dossiers&file=permanent-act-of-peace' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },
];

export const defaultTimelineYear = timelineEntries[0]?.year ?? 1791;