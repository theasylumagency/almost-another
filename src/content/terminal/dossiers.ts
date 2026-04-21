import type { Dossier } from './terminal.types';

export const dossiers: Dossier[] = [
    {
        id: 'PREF-001',
        slug: 'seventh-republic',
        title: 'Seventh Republic',
        type: 'state_form',
        status: 'sealed',
        date: '1982',
        classification: 'Foundational / Civilizational Order',
        summary:
            'The Seventh Republic is not merely the current constitutional form of the western superstate. It is a mature civilizational order in which political authority, sanctified knowledge, administrative continuity, and managed obedience have fused into a single durable structure.',
        strategicRole:
            'Integrated western order combining state power, sanctified knowledge, and managed intelligibility.',
        tags: ['republic', 'state', 'civilization', 'academy', 'prefecture'],
        timelineYears: [1904, 1974, 1982],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, the Seventh Republic is presented as the highest and most refined achievement of rational civilization. Its public language emphasizes continuity, order, scientific truth, civic duty, and peace preserved through disciplined strength. It describes itself not as a provisional arrangement, but as the rightful culmination of historical development.',
            },
            {
                title: 'Historical Formation',
                body:
                    'The Seventh Republic cannot be understood in isolation from the preceding sequence of republican, imperial, and restorative forms. The early republics established the anti-clerical and rationalizing impulse. The empires proved that scale, expansion, and concentration of force could not be excluded from the Republic’s historical logic. The later republics absorbed these lessons. By the time the state appears in mature form as the Seventh Republic, it no longer governs merely through law, army, territory, or bureaucracy. It governs through a completed architecture: political continuity, scientific sanctity, security management, and historical self-authorization.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The Seventh Republic is best understood as a total order of managed intelligibility. It does not rely only on fear, only on prestige, only on doctrine, or only on habit. It combines all of them. It is therefore far more stable than a naked dictatorship and far more dangerous than a merely procedural republic. It has solved, at least temporarily, the classical problem of high civilization: how to preserve scale, hierarchy, intellectual achievement, and social obedience without admitting that these things are held together by force and exclusion.',
            },
            {
                title: 'Structural Role',
                body:
                    'The Seventh Republic functions as the central western power of the later archive, but its true significance is larger than geography. It is one of the world’s three great stabilized orders. Its distinctive claim is that sanctified knowledge, disciplined governance, and civilizational maturity have become indistinguishable. It is not simply strong. It is interpretable to itself as justified.',
            },
            {
                title: 'Core Institutional Pillars',
                body:
                    'Holy Academy: the highest epistemic and sacral organ of the order. Security Prefecture: the oldest continuity mechanism of the state. High Governing Houses: lineages such as the Valerii, Cornelii, and Fabii carry memory, legitimacy, contradiction, and succession inside it. Historical Mythology: the Republic continuously rewrites its own emergence so that contingency, ascent, and adaptation appear as necessity, inheritance, and destiny.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official materials present the Seventh Republic as the natural culmination of historical reason. Crude oppositional readings reduce it to hypocrisy, domination, or disguised empire. Both positions are insufficient. The Republic is more formidable than a cynical machine because many of its excellences are real. Its administration is serious. Its scientific accomplishments are real. Its elites are often genuinely capable. Its institutions are not theatrical shells. This is precisely why the order is difficult to oppose.',
            },
        ],
        relatedDossiers: [
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Security Prefecture', href: '/terminal?tab=dossiers&file=security-prefecture' },
            { label: 'Valeria Gens', href: '/terminal?tab=dossiers&file=valeria-gens' },
            { label: 'Cornelius Gens', href: '/terminal?tab=dossiers&file=cornelius-gens' },
            { label: 'Fabius Line', href: '/terminal?tab=dossiers&file=fabius-line' },
        ],
        relatedRoutes: [
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
            { label: '1974 cartography', href: '/terminal?tab=cartography&year=1974' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-031',
        slug: 'holy-academy',
        title: 'Holy Academy',
        type: 'institution',
        status: 'sealed',
        date: '1904',
        classification: 'Sanctified Knowledge Apparatus',
        summary:
            'The Holy Academy is not merely the Republic’s highest scientific institution. It is one of the principal mechanisms through which knowledge is converted into legitimacy, legitimacy into obedience, and obedience into civilizational order.',
        strategicRole:
            'Transforms knowledge into sanctified authority and sanctified authority into governable reality.',
        tags: ['academy', 'holy', 'science', 'doctrine', 'knowledge', 'authority'],
        timelineYears: [1807, 1904, 1974, 1982],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, the Holy Academy is presented as the highest guardian of truth, reason, and scientific continuity in the Seventh Republic. Its public image fuses intellectual prestige with civilizational duty. It is described not only as an institution of research and higher learning, but as the supreme custodian of the principles upon which the Republic’s moral and political order rests. The public record strongly emphasizes continuity: discovery, discipline, sacrifice, and service to the common good. In this form, the Academy appears as the noblest expression of enlightened civilization.',
            },
            {
                title: 'Historical Formation',
                body:
                    'The institution now known as the Holy Academy did not begin under that name. In earlier phases of the archive, it appears as the Academy of Sciences. Its later sanctification marks one of the decisive structural transitions in the history of the Republic. The transfer of the Vatican to the Academy of Sciences in the early anti-clerical phase represented more than symbolic victory over the old religious order. It created the precondition for a deeper inversion: scientific authority ceased to oppose sacral authority and gradually absorbed its position. In 1904, this transition became constitutional. The Academy of Sciences was renamed the Holy Academy, and the shift was not cosmetic. From that point onward, knowledge was no longer simply authoritative. It was sanctified.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The Holy Academy is best understood as a sanctified knowledge apparatus. Its power does not lie in research alone, nor in censorship alone, nor in prestige alone. It lies in the fusion of these elements. The Academy determines what counts as truth, who is authorized to speak it, under what conditions it may circulate, and when deviation becomes intolerable. It does not merely produce knowledge. It regulates the cost of doubt. Once knowledge becomes holy, criticism no longer confronts an argument. It confronts a structure of reverence. At that moment, scientific disagreement can be recoded as moral threat, political disloyalty, or civilizational sabotage.',
            },
            {
                title: 'Structural Role',
                body:
                    'The Holy Academy occupies a central structural role in the Republic because it resolves a problem every durable order must solve: how to transform interpretation into command without appearing merely coercive. The Academy accomplishes this by granting force to truth and sanctity to force. It allows the Republic to say not merely “obey,” but “reality itself compels obedience.” The Republic’s legal, educational, and moral architectures all derive reinforcement from the Academy’s status as the highest interpreter of what is real, natural, permissible, and necessary. The Holy Academy is therefore not an ornament of order. It is one of its engines.',
            },
            {
                title: 'Functional Domains',
                body:
                    'Epistemic Authority: defines valid knowledge and invalidates unsanctioned interpretation. Doctrinal Stabilization: transforms contested conclusions into protected truths. Moral Legibility: determines when error is merely error and when it becomes deviation. Political Reinforcement: provides non-elective legitimacy to the governing order. Civilizational Continuity: presents the Republic as the culmination of disciplined truth rather than one regime among others.',
            },
            {
                title: 'Institutional Logic',
                body:
                    'The Holy Academy does not function through naked repression alone. It functions more efficiently through stratification: recognition for the useful, prestige for the brilliant, reverence for the obedient, silence for the inconvenient, and destruction, when required, for what cannot be domesticated. Its preferred subject is not the fool, but the gifted loyalist. Brilliance is not feared until it begins to interpret beyond its assigned perimeter. For this reason the Academy’s deepest anxiety is not ignorance. It is unsanctioned intelligence.',
            },
            {
                title: 'Behavioral Profile of the Institution',
                body:
                    'Tolerance for Internal Divergence: low. Capacity for Symbolic Absorption: high. Dependence on Prestige: extreme. Dependence on Fear: controlled but real. Adaptability: high at the structural level. Transparency: low. Fragility Under Public Contradiction: high. The Holy Academy appears monumental, but not all monuments are secure. Institutions of this type are often strongest when their authority is ambient and weakest when forced into explicit self-defense. Its greatest vulnerability is not external attack. It is visible contradiction from within its own hierarchy of credibility.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official materials systematically overstate the neutrality of the Academy’s authority. Leaked and oppositional materials sometimes overcorrect by reducing it to mere hypocrisy or conspiracy. Both readings are too simple. The Holy Academy should be understood as a structure whose danger lies precisely in the fact that it is neither wholly false nor wholly cynical. It contains genuine intelligence, genuine achievement, genuine devotion, and genuine discipline. These are not incidental assets; they are the substance from which its legitimacy is made. This is why the institution is difficult to oppose. It cannot be dismantled merely by exposing corruption. Its deeper force comes from the fact that many of its excellences are real.',
            },
        ],
        relatedDossiers: [
            { label: 'Seventh Republic', href: '/terminal?tab=dossiers&file=seventh-republic' },
            { label: 'Security Prefecture', href: '/terminal?tab=dossiers&file=security-prefecture' },
            { label: 'Valeria Gens', href: '/terminal?tab=dossiers&file=valeria-gens' },
            { label: 'Claudia Valeria Irreperta', href: '/terminal?tab=dossiers&file=claudia-valeria-irreperta' },
            { label: 'Lucius Cornelius', href: '/terminal?tab=dossiers&file=lucius-cornelius' },
            { label: 'Aurelia Fabia Severina', href: '/terminal?tab=dossiers&file=aurelia-fabia-severina' },
        ],
        relatedRoutes: [
            { label: '1807 cartography', href: '/terminal?tab=cartography&year=1807' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
            { label: '1974 cartography', href: '/terminal?tab=cartography&year=1974' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-004',
        slug: 'security-prefecture',
        title: 'Security Prefecture',
        type: 'institution',
        status: 'sealed',
        date: '1793',
        classification: 'Continuity / Enforcement Organ',
        summary:
            'The Security Prefecture is the oldest continuously functioning institution in the Republic’s political order. Founded in 1793, it long predates the present constitutional form and survives every major transformation of regime.',
        strategicRole:
            'Transforms danger, ambiguity, and deviation into administratively manageable categories before rupture becomes public.',
        tags: [
            'security',
            'prefecture',
            'surveillance',
            'continuity',
            'analysis',
            'doctrine',
            'faith',
        ],
        timelineYears: [1793, 1863, 1904, 1982],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, the Security Prefecture is presented as a neutral guarantor of internal order, administrative integrity, and state continuity. Its stated function is protective rather than ideological: to guard the Republic against internal destabilization, external penetration, structural disorder, and breaches of civic reliability. In this register, the Prefecture appears as an apolitical mechanism — disciplined, necessary, and permanently vigilant. It is described as serving the state rather than any transient governing arrangement.',
            },
            {
                title: 'Historical Formation',
                body:
                    'The Security Prefecture was founded in 1793 and remains the oldest continuously operating institution in the Republic’s political archive. Its first recorded prefect is listed in official chronicles as Marcus Valerius. This designation is itself significant. The formal Romanization of the name implies a continuity with ancient patrician legitimacy that the internal record does not fully support. The more credible reading is that Marcus Valerius emerged not from an ancient sacral aristocracy, but from the politically active bourgeois strata radicalized by the events of 1789. Some internal reconstructions even place him in proximity to the Estates-General, though the archive does not treat this point as definitively settled.',
            },
            {
                title: 'Dynastic Consolidation Question',
                body:
                    'What matters is not merely who Marcus Valerius “really” was, but what later chronicle-writing required him to become. During his two decades as prefect, the Valerius line appears to have consolidated influence at striking speed. His son and his wife’s mother both rose into the upper layers of republican power. No formal corruption charge ever stabilized around this ascent, and in official history none was ever seriously entertained. Yet the pattern remained sufficiently convenient to leave a sediment of doubt in internal readings. By the time of the Sixth Republic, even that residue had largely disappeared from legitimate discourse. This disappearance is itself meaningful. It suggests not the final resolution of suspicion, but the successful sanctification of an originally questionable ascent.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The official mythology of the Prefecture depends on a crucial fiction: that it remained fundamentally apolitical for most of its existence and only reluctantly entered deeper ideological service when circumstances demanded it. The archive does not support this reading. The more credible interpretation is that the Prefecture originated as a state mechanism and gradually adapted to the logic of whichever order proved durable enough to absorb it. During the Second Empire, this adaptation passed an important threshold. The Prefecture ceased to function merely as an instrument of state continuity and increasingly became an instrument of system continuity.',
            },
            {
                title: 'Structural Role',
                body:
                    'The Security Prefecture is best understood as the Republic’s memory of danger institutionalized. Its function is not limited to detecting enemies. It classifies uncertainty, maps instability, manages proximity to forbidden knowledge, monitors unreliable brilliance, and intervenes before contradiction becomes collective. This is why the Prefecture cannot be reduced to a police organ. Police react to events. The Prefecture works further upstream. It seeks to identify the subject, relation, idea, or deviation before it becomes politically expensive. Its work is anticipatory. It does not merely suppress rebellion. It aims to prevent the conditions under which rebellion becomes intelligible.',
            },
            {
                title: 'Institutional Evolution',
                body:
                    'In its earliest phase, the Prefecture appears closest to what its public language still claims to be: a severe but fundamentally administrative instrument of state preservation. Under the Second Empire, however, a decisive mutation begins. The institution becomes more deeply entwined with the governing logic it was supposedly meant only to protect. It does not merely defend the state. It begins to defend the ruling form of statehood. By the Seventh Republic, this process appears complete. At that point, the Prefecture no longer stands outside doctrine, prestige, and sacralized legitimacy as a neutral guardian. It becomes one of the channels through which these forces are operationalized.',
            },
            {
                title: 'Functional Departments',
                body:
                    'The Security Prefecture consists of six principal departments. Department of Human Resource Management: maintains internal discipline, placement, vetting, and institutional reproduction. Financial Department: oversees material continuity, allocations, covert budgeting, and fiscal opacity where required. Analytical Department: synthesizes reports, maps structural tensions, assesses instability, and converts scattered data into actionable interpretation. Counterintelligence Department: identifies penetration, internal compromise, hostile influence, and concealed factional drift. Intelligence Department: collects external and strategic information relevant to internal stability and wider regime durability. Department for the Protection of the Purity of Faith: the most revealing title in the institutional structure, demonstrating that the Prefecture no longer protects order in purely administrative terms. It protects doctrinal integrity.',
            },
            {
                title: 'Institutional Logic',
                body:
                    'The Prefecture operates through layered visibility. It does not need every subject to fear it equally. It only needs enough uncertainty to ensure that no one can calculate the cost of deviation with confidence. The institution is strongest not when it is maximally visible, but when its reach is assumed to exceed what can be measured. Its preferred outcome is not spectacle. It is adjustment. The ideal subject of the Prefecture is not the broken dissident, but the self-correcting one.',
            },
            {
                title: 'Behavioral Profile of the Institution',
                body:
                    'Tolerance for Ambiguity: low in principle, selective in practice. Adaptability: very high. Dependence on Continuity: extreme. Transparency: minimal. Capacity for Self-Justification: high. Fragility Under Public Exposure: moderate. Danger Under Quiet Conditions: extreme. The Security Prefecture should not be evaluated primarily by visible acts of repression. Its deeper effectiveness lies in institutional patience, anticipatory reading, and the management of thresholds. It is not most dangerous when it moves openly. It is most dangerous when it barely needs to move at all.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official accounts overstate the neutrality of the Prefecture. Simplistic oppositional readings overstate its brutality as if force alone explained its endurance. Both fail to explain the institution’s deeper success. The Security Prefecture appears to have benefited from one of the Republic’s most important retrospective operations: the conversion of contingent revolutionary ascent into noble historical inevitability. The case of Marcus Valerius is exemplary. Whether or not all details can be proven, the pattern is clear enough — a politically active bourgeois founder is gradually absorbed into a myth of Roman-patrician continuity. The institution did not merely survive regime change. It learned how to rewrite its own beginning.',
            },
        ],
        relatedDossiers: [
            { label: 'Seventh Republic', href: '/terminal?tab=dossiers&file=seventh-republic' },
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Valeria Gens', href: '/terminal?tab=dossiers&file=valeria-gens' },
            { label: 'Aurelia Fabia Severina', href: '/terminal?tab=dossiers&file=aurelia-fabia-severina' },
            { label: 'Claudia Valeria Irreperta', href: '/terminal?tab=dossiers&file=claudia-valeria-irreperta' },
            { label: 'Lucius Cornelius', href: '/terminal?tab=dossiers&file=lucius-cornelius' },
        ],
        relatedRoutes: [
            { label: '1793 origin reference', href: '/terminal?tab=cartography&year=1791' },
            { label: '1863 cartography', href: '/terminal?tab=cartography&year=1863' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-061',
        slug: 'valeria-gens',
        title: 'Valeria Gens',
        type: 'lineage',
        status: 'sealed',
        date: '1793',
        classification: 'Dynastic / Sacral Continuity',
        summary:
            'The Valeria gens is one of the most powerful and symbolically saturated lineages in the Republic. In official chronology, it appears as a continuation of ancient Roman patrician legitimacy; in internal archival reading, the picture is less stable.',
        strategicRole:
            'Converts contingent ascent into sanctified continuity and helps fuse security, governance, knowledge, and prestige into hereditary legitimacy.',
        tags: [
            'valeria',
            'lineage',
            'dynasty',
            'academy',
            'prefecture',
            'romanization',
            'continuity',
        ],
        timelineYears: [1793, 1904, 1982],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, the Valeria gens is indexed as one of the Republic’s foundational high houses. Its members are associated across generations with the highest forms of service: prefects, consuls, cardinals, senior academicians, and saints. The public file presents the family as a model of disciplined excellence and inherited duty, a line whose greatness appears both ancient and self-evident. In this register, the Valerii are not merely influential. They are exemplary. Their continuity is meant to signify the continuity of the Republic itself.',
            },
            {
                title: 'Historical Formation',
                body:
                    'The official chronicle situates the Valeria gens within a Roman-patrician horizon of great antiquity. Internal records do not support such simplicity. The more credible archival reading is that the line rose to decisive importance during the revolutionary reordering that began in 1789 and hardened institutionally in the early republican years. The founding figure most closely associated with this ascent is the first prefect, recorded in the chronicles as Marcus Valerius. That name, in its classical form, should not be accepted naively. It appears already shaped by later retrospective legitimization.',
            },
            {
                title: 'Marcus Valerius Problem',
                body:
                    'Internal records suggest a politically active bourgeois origin rather than an already sanctified patrician one. Marcus Valerius appears less as the natural continuation of ancient nobility than as a highly effective participant in the revolutionary opening of 1789, perhaps even in proximity to the Estates-General. During his two decades as prefect, the Valerius line consolidated influence with unusual speed. His son and his wife’s mother both rose into the upper layers of republican power. No formal corruption charge was ever stabilized around this ascent, and official history treats the question as if it barely existed. The archive should not be so certain.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The Valeria gens should be understood as a successful dynastic stabilization project. Its power does not lie only in office-holding or prestige. It lies in the ability to convert service into sanctity, proximity into legitimacy, and repetition into historical inevitability. The house does not merely occupy institutions. It becomes difficult to imagine those institutions without it. This is the decisive feature of the file. Once a lineage reaches that threshold, it ceases to appear partisan or contingent. It begins to present itself as natural.',
            },
            {
                title: 'Structural Role',
                body:
                    'The Valeria gens functions as one of the Republic’s principal continuity lineages. It links security, governance, science, and sanctified authority across generations. Where other houses may dominate one sector, the Valerii are significant because they bridge sectors. Their structural role is therefore not merely aristocratic. It is integrative. They help hold together coercive continuity, epistemic authority, political prestige, and moral elevation. This makes the line unusually valuable to the system. It also makes any deviation within the line unusually dangerous.',
            },
            {
                title: 'Modes of Power',
                body:
                    'Institutional Occupation: the line repeatedly appears in positions where continuity can be preserved across systemic change. Symbolic Capital: the Valerii do not merely hold office; they appear fitted for office in advance. Sacral Conversion: scientific or civic distinction within the line is repeatedly elevated into sanctified memory. Narrative Naturalization: the house benefits from retrospective myth-making that makes its rise appear older, cleaner, and more inevitable than the archive can firmly justify.',
            },
            {
                title: 'Behavioral Profile of the Line',
                body:
                    'Adaptability Across Regime Change: very high. Dependence on Prestige: extreme. Capacity for Self-Legitimation: high. Tolerance for Internal Disorder: low. Symbolic Resilience: high. Danger of Internal Rupture: extreme. The Valeria gens is strongest when it appears serene, ancient, and beyond dispute. It is most vulnerable when forced back into history — that is, when its constructed inevitability becomes visible as construction.',
            },
            {
                title: 'Key Figures and Lines of Force',
                body:
                    'Marcus Valerius: the first prefect and probable founder-figure of the line’s durable ascent. The Valerian Academic Line: generations of academicians, cardinals, and high scientific authorities convert family prestige into civilizational authority. The Head of the Holy Academy: demonstrates the line’s enduring capacity to sit at the summit of sanctified knowledge-power. Claudia Valeria Irreperta: a file of extraordinary significance because she reveals that symbolic continuity does not guarantee obedient succession.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official chronology treats the Valeria gens as if its Roman antiquity were self-evident. Internal records are more cautious. What can be affirmed with confidence is not ancient continuity, but successful retroactive continuity. The house should not be dismissed as fraudulent; such a reading would be too crude. Its members did hold office, accumulate distinction, and shape the Republic in durable ways. Their legitimacy is not fictional. It is layered. The more accurate reading is that the line combines real achievement with retrospective ennoblement. This makes it more formidable than a merely invented myth and more fragile than a truly unquestioned antiquity.',
            },
        ],
        relatedDossiers: [
            { label: 'Security Prefecture', href: '/terminal?tab=dossiers&file=security-prefecture' },
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Seventh Republic', href: '/terminal?tab=dossiers&file=seventh-republic' },
            { label: 'Claudia Valeria Irreperta', href: '/terminal?tab=dossiers&file=claudia-valeria-irreperta' },
            { label: 'Aurelia Fabia Severina', href: '/terminal?tab=dossiers&file=aurelia-fabia-severina' },
        ],
        relatedRoutes: [
            { label: '1791 cartography', href: '/terminal?tab=cartography&year=1791' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-062',
        slug: 'cornelius-gens',
        title: 'Cornelius Gens',
        type: 'lineage',
        status: 'sealed',
        date: '1802',
        classification: 'Governing Continuity Line',
        summary:
            'The Cornelius gens is one of the Republic’s principal governing lineages. Its significance lies not in sanctified distance, but in proximity to the active mechanics of power.',
        strategicRole:
            'Makes power appear responsible, sober, and administratively legitimate while carrying the risk of internal instability once seriousness turns against protected contradiction.',
        tags: [
            'cornelius',
            'lineage',
            'governance',
            'legitimacy',
            'continuity',
            'responsibility',
            'academy',
        ],
        timelineYears: [1802, 1869, 1904, 1982],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, the Cornelius gens is indexed as one of the Republic’s most honorable high houses. Its public profile emphasizes service, duty, sobriety, and institutional seriousness. Members of the line are associated with political office, public trust, and the maintenance of state continuity. Unlike houses whose prestige is primarily sacral or intellectual, the Cornelii are presented as a governing lineage: practical, disciplined, reliable, and fitted to carry the burden of public responsibility.',
            },
            {
                title: 'Historical Formation',
                body:
                    'The Cornelius gens belongs to the upper architecture of the Republic, but its official presentation differs from that of more overtly sacralized lines. The house does not usually appear as a mythic point of origin, nor as an explicitly revolutionary ascent later polished into antiquity. Its public legitimacy is grounded instead in continuity of function: service, office, discipline, and recognizable political seriousness. This makes the line especially effective. A house that rules through visible sanctity invites scrutiny of ritual claims. A house that rules through apparent competence is often harder to isolate as ideology.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The Cornelius gens should be understood as a governing continuity line. Its strength lies in the appearance of disciplined reproducibility. The house seems capable of generating the same type repeatedly: serious, legitimate, high-functioning subjects suited to public responsibility. This is one of the Republic’s preferred aristocratic outcomes. The danger begins when one of those subjects remains serious but ceases to remain governable. This is what gives the file its deeper importance. A trivial or decadent house can be dismissed. A visibly brutal house can be opposed. A house associated with measured competence, public responsibility, and earned legitimacy is harder to challenge because it appears to belong to the Republic’s best self-image.',
            },
            {
                title: 'Structural Role',
                body:
                    'The Cornelius gens functions as one of the Republic’s principal governing lineages. It helps stabilize the political order by making authority appear responsible rather than merely dominant. Its members are associated less with sacred immunity than with burden-bearing legitimacy. Every durable system requires families, institutions, or lineages that make command appear sober, rational, and necessary. The Cornelii help perform that task. They humanize hierarchy without weakening it. They give elite continuity a face that seems serious rather than theatrical. That is why rupture within the line matters so much.',
            },
            {
                title: 'Modes of Power',
                body:
                    'Political Continuity: the line repeatedly appears where the Republic needs serious and credible stewardship. Administrative Legibility: Cornelian authority reads as orderly and intelligible rather than mystical or ornamental. Burdened Legitimacy: the house is associated with duty and responsibility more than display. Internal Credibility: its members are often taken seriously before they are even agreed with. This gives the line unusual weight in moments of stress.',
            },
            {
                title: 'Key Figures and Lines of Force',
                body:
                    'The Cornelian Governing Line: represents the house’s defining public function, the repeated production of credible rulers, senators, and high public figures. Lucius Cornelius: a file of extreme significance because it demonstrates what happens when the Republic’s preferred high-functioning type acquires interpretive independence. The Holy Academy: an institution of major relevance to the line because scientific prestige and public usefulness intersect critically in the Cornelian file. The Fabius and Valeria lines: points of contrast and tension. Where those houses embody rupture-memory and sanctified continuity respectively, the Cornelii embody governing seriousness under strain.',
            },
            {
                title: 'Behavioral Profile of the Line',
                body:
                    'Adaptability Across Regime Change: high. Dependence on Prestige: high. Dependence on Visible Competence: extreme. Tolerance for Internal Divergence: low. Symbolic Resilience: high. Danger of Internal Rupture: very high. The Cornelius gens is strongest when it appears calm, competent, and burden-bearing. It is most vulnerable when one of its own members begins to expose the gap between public seriousness and deeper systemic contradiction. Its greatest strength is that it makes power appear responsible. Its greatest weakness is that responsibility, once taken seriously enough, may cease to obey convenience.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official chronology tends to present the Cornelius gens as stable, disciplined, and fundamentally legible. Internal materials do not refute this reading, but they complicate it. The line’s danger does not lie in hypocrisy, theatrical corruption, or visible decadence. It lies in the possibility that a house formed to reproduce authority may also produce subjects incapable of indefinitely accepting its deeper falsifications. This makes the Cornelian file unusually important. It should not be indexed merely as a record of prestige. It should be read as one of the Republic’s most sensitive tests of whether competent legitimacy can still reproduce itself without fracture.',
            },
        ],
        relatedDossiers: [
            { label: 'Lucius Cornelius', href: '/terminal?tab=dossiers&file=lucius-cornelius' },
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Seventh Republic', href: '/terminal?tab=dossiers&file=seventh-republic' },
            { label: 'Valeria Gens', href: '/terminal?tab=dossiers&file=valeria-gens' },
            { label: 'Fabius Line', href: '/terminal?tab=dossiers&file=fabius-line' },
        ],
        relatedRoutes: [
            { label: '1802 cartography', href: '/terminal?tab=cartography&year=1802' },
            { label: '1869 cartography', href: '/terminal?tab=cartography&year=1869' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-063',
        slug: 'fabius-line',
        title: 'Fabius Line',
        type: 'lineage',
        status: 'sealed',
        date: '1835',
        classification: 'Historical Rupture Line',
        summary:
            'The Fabius Line is one of the Republic’s most volatile hereditary files. Unlike the Valerian continuity model or the Cornelian governing model, the Fabius inheritance is marked above all by rupture.',
        strategicRole:
            'Carries seizure, collapse, restoration, and unfinished consequence across generations, making lineage itself a vector of historical instability.',
        tags: [
            'fabius',
            'lineage',
            'rupture',
            'empire',
            'restoration',
            'collapse',
            'inheritance',
        ],
        timelineYears: [1835, 1839, 1861, 1863],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, the Fabius Line is treated with caution and selective emphasis. The public archive cannot erase it, because the line is tied to decisive imperial and republican transformations. At the same time, it cannot allow the line to stand too clearly as a coherent model, because the Fabius inheritance carries too much association with seizure, collapse, restoration, and structural instability. As a result, the official record is uneven. Some Fabius figures are elevated, some are denounced, some are partially contained by patriotic framing, and some are left suspended between condemnation and necessity.',
            },
            {
                title: 'Historical Formation',
                body:
                    'The Fabius Line enters the higher archive not as a sacral continuity line, but as a historical force line. The decisive early figure is Gaius Fabius, who kills the emperor in 1835 and takes the throne for himself. This act does not merely place a Fabius at the center of power. It binds the line to regicide, usurpation, and the destabilization of imperial succession. Four years later, in 1839, imperial deterioration, military division, and civil war culminate in his death and the proclamation of the Fourth Republic. From that point onward, the line is inseparable from both seizure and collapse.',
            },
            {
                title: 'Restoration Phase',
                body:
                    'The second decisive figure is Gaius Fabius the Younger, who rebuilds power from Sicily after fragmentation and restores imperial scale on a continental level. In his case, the line is no longer associated merely with rupture from above, but with reconstruction from below. He proves that the Fabius inheritance is not exhausted by destruction. It can also become a vehicle of reassembly. This dual inheritance is the essence of the file: the line breaks, the line rebuilds, and in both cases the surrounding order is forced to change.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The Fabius Line should be understood as a hereditary instability vector internal to the political history of the Republic. This does not mean that every Fabius is naturally rebellious, nor that the line is cursed with permanent opposition. The archive should resist romanticization. The more precise reading is that the line repeatedly produces figures whose relation to power is transformative rather than merely custodial. This is what makes the file dangerous. Some houses preserve. Some administer. Some sanctify. The Fabius Line reclassifies. When it appears near the center of the system, the surrounding structure becomes historically less safe.',
            },
            {
                title: 'Structural Role',
                body:
                    'The structural role of the Fabius Line is not continuity in the ordinary sense, but continuity through crisis. The line persists by remaining tied to decisive moments of systemic mutation: seizure of imperial power, collapse of imperial order, reconstruction after fragmentation, and re-entry into the active present through living descendants. This makes the file unusually difficult for the Republic to assimilate. The line cannot be erased, because too much history runs through it. It cannot be fully celebrated, because celebration would normalize rupture as inheritance. It cannot be fully condemned, because some of its figures also restored order on scales the Republic later benefited from.',
            },
            {
                title: 'Modes of Historical Force',
                body:
                    'Seizure: the line enters central history through direct appropriation of power. Collapse: its ascent is tied to systemic deterioration and political fracture. Restoration: the younger Fabius proves that the line can rebuild as well as destroy. Residual Pressure: even when no Fabius stands openly at the center, the line remains historically charged. Living Reactivation: in active descendants, past rupture returns as latent pressure rather than closed memory.',
            },
            {
                title: 'Key Figures and Lines of Force',
                body:
                    'Gaius Fabius: the line’s most direct association with regicide, imperial seizure, and civil collapse. Gaius Fabius the Younger: the restoration figure who converts fragmentation into renewed imperial structure. Aurelia Fabia Severina: a living descendant of major interpretive significance. Through her, the line returns inside the active organs of the state. The Security Prefecture: relevant not by blood but by consequence. Any line associated with recurrent rupture inevitably intersects the Republic’s deepest continuity mechanism. Valeria Gens and Cornelius Gens: points of contrast. Where the Valerii symbolize sanctified continuity and the Cornelii governing legitimacy, the Fabii symbolize continuity under the sign of historical disruption.',
            },
            {
                title: 'Behavioral Profile of the Line',
                body:
                    'Adaptability Across Regime Change: high. Dependence on Prestige: moderate. Dependence on Historical Weight: extreme. Tolerance for Internal Contradiction: high. Symbolic Stability: low. Capacity to Re-enter History: very high. Danger of Dynastic Reactivation: extreme. The Fabius Line is not stable in the same way as other high houses. Its value does not come from serenity, sanctity, or administrative consistency. Its value comes from the fact that it remains historically unfinished. Its greatest strength is that it survives discredit without becoming irrelevant. Its greatest danger is that it can return not despite past rupture, but through it.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official chronology treats the Fabius file inconsistently because consistency would reveal too much. A line that contains both usurpation and restoration cannot be neatly placed inside patriotic morality. It remains useful to history but embarrassing to doctrine. The archive should not simplify the line into traitorous or heroic. Both readings are inadequate. The more accurate interpretation is that the Fabius inheritance carries concentrated historical agency. Its members do not merely inherit names. They inherit unfinished consequences. For this reason, all living descendants of the line should be read with elevated sensitivity. In the Fabius case, ancestry is not a static honor. It is a live voltage.',
            },
        ],
        relatedDossiers: [
            { label: 'Gaius Fabius', href: '/terminal?tab=dossiers&file=gaius-fabius' },
            { label: 'Gaius Fabius the Younger', href: '/terminal?tab=dossiers&file=gaius-fabius-the-younger' },
            { label: 'Aurelia Fabia Severina', href: '/terminal?tab=dossiers&file=aurelia-fabia-severina' },
            { label: 'Security Prefecture', href: '/terminal?tab=dossiers&file=security-prefecture' },
            { label: 'Valeria Gens', href: '/terminal?tab=dossiers&file=valeria-gens' },
            { label: 'Cornelius Gens', href: '/terminal?tab=dossiers&file=cornelius-gens' },
        ],
        relatedRoutes: [
            { label: '1835 cartography', href: '/terminal?tab=cartography&year=1835' },
            { label: '1839 cartography', href: '/terminal?tab=cartography&year=1839' },
            { label: '1861 cartography', href: '/terminal?tab=cartography&year=1861' },
            { label: '1863 cartography', href: '/terminal?tab=cartography&year=1863' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-052',
        slug: 'aurelia-fabia-severina',
        title: 'Aurelia Fabia Severina',
        type: 'person',
        status: 'restricted',
        date: '2026',
        classification: 'Active Person File',
        summary:
            'Aurelia Fabia Severina is an active file of unusual strategic density. Her significance exceeds both her formal rank and her visible administrative function. She belongs to the Fabius line, operates within the Security Prefecture, and stands at a rare point where historical inheritance, institutional proximity, and moral contradiction begin to converge.',
        strategicRole:
            'Bridge under stress between ancestry, institution, and conscience.',
        tags: [
            'fia',
            'fabius',
            'prefecture',
            'active',
            'lineage',
            'security',
            'contradiction',
        ],
        timelineYears: [1835, 1839, 1863],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, Aurelia Fabia Severina is indexed as a disciplined and highly capable functionary associated with the Security Prefecture. Her public profile emphasizes restraint, reliability, intelligence, and procedural integrity. In this register, she appears as a model of controlled service rather than ideological instability. Her visible file is orderly. It is also incomplete.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The public record captures behavior, but not significance. Severina’s true importance lies in the unstable conjunction of three factors: lineage, institutional access, and ethical susceptibility. She is sufficiently integrated to understand the reflexes of the system from within, yet not so fully absorbed as to become indistinguishable from it. This makes her more valuable than a merely obedient official and more dangerous than an obvious dissident. She should not be classified as impulsive. Her risk profile emerges only under conditions in which duty and moral recognition cease to be reconcilable.',
            },
            {
                title: 'Lineage and Historical Relevance',
                body:
                    'House: Fabius. Lineage Status: direct descendant of an already indexed historical line tied to imperial and republican rupture. Archival Relevance: high. Severina is a living continuation of the Fabius inheritance. This is not ornamental information. In her case, ancestry is politically active. The Fabius name remains tied to decisive transformations already indexed elsewhere in the archive. The presence of a Fabius descendant inside the active organs of state power is therefore not a genealogical curiosity but a structural event. Her file reactivates dormant historical material. What appears in one register as family background appears in another as delayed historical pressure.',
            },
            {
                title: 'Institutional Position',
                body:
                    'Affiliation: Security Prefecture. System Proximity: high. Trust Status: conditional. Interpretive Sensitivity: very high. Severina’s position grants her value beyond title. She occupies a space in which surveillance, procedure, obedience, and informal judgment intersect. Her institutional role places her close enough to the mechanism to observe its habits, but not far enough above it to escape contamination. She is neither an external critic nor a neutral servant. She is an internal figure under pressure.',
            },
            {
                title: 'Structural Role',
                body:
                    'Severina represents a rare category within the archive: a historically charged descendant integrated into the very architecture that may eventually force her into contradiction with herself. She is not significant merely because she may rebel. She is not significant merely because she may remain loyal. She is significant because her file demonstrates how the system recruits, disciplines, burdens, and partially deforms subjects whose inherited memory should have made complete assimilation impossible. Her structural role is best understood as a bridge under stress: between ancestry and institution, between conformity and recognition, between private loyalty and public machinery.',
            },
            {
                title: 'Behavioral Vector',
                body:
                    'Discipline: high. Institutional Adaptability: proven. Emotional Restraint: high. Capacity for Sustained Loyalty: high. Moral Shock Vulnerability: high. Rupture Potential: high. Leadership Tendency: indirect but real. Severina does not project instability under ordinary conditions. She is capable of order, patience, and prolonged self-control. For this reason, simplistic readings of her as either safe or subversive are equally inadequate. Her rupture potential does not arise from theatrical opposition. It arises from compression.',
            },
            {
                title: 'Key Relations',
                body:
                    'House Fabius: not background, but pressure. Security Prefecture: primary institutional frame, providing access, discipline, and contamination. Claudia Valeria Irreperta: a relation of high interpretive significance, functioning less as a companion than as a destabilizing mirror. Lucius Cornelius: a pressure point through which private loyalty, ethical recognition, and political consequence begin to overlap. Holy Academy: not a personal relation, but an overriding civilizational force acting on the file from above.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official channels tend to overstate her reliability. Informal readings tend to overstate her revolutionary potential. Both distortions are insufficient. Severina should not be indexed as a file of immediate rebellion. She is a file of delayed contradiction. Some internal summaries appear to deliberately understate the historical significance of the Fabius line in order to contain interpretive escalation. This may be procedural. It may also be defensive. Her dossier should be reviewed together with the indexed materials on the Fabius line, the Security Prefecture, and the broader question of institutional complicity under moral strain.',
            },
        ],
        relatedDossiers: [
            { label: 'Fabius Line', href: '/terminal?tab=dossiers&file=fabius-line' },
            { label: 'Security Prefecture', href: '/terminal?tab=dossiers&file=security-prefecture' },
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Claudia Valeria Irreperta', href: '/terminal?tab=dossiers&file=claudia-valeria-irreperta' },
            { label: 'Lucius Cornelius', href: '/terminal?tab=dossiers&file=lucius-cornelius' },
        ],
        relatedRoutes: [
            { label: '1835 cartography', href: '/terminal?tab=cartography&year=1835' },
            { label: '1839 cartography', href: '/terminal?tab=cartography&year=1839' },
            { label: '1863 cartography', href: '/terminal?tab=cartography&year=1863' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-053',
        slug: 'claudia-valeria-irreperta',
        title: 'Claudia Valeria Irreperta',
        type: 'person',
        status: 'restricted',
        date: '2026',
        classification: 'Active Person File',
        summary:
            'Claudia Valeria Irreperta, commonly known as Clio, is an active file of exceptional symbolic and strategic significance. She belongs to the Valeria line, is indexed as the most accomplished young scientist of her generation, and stands in visible tension with the institutional order that should, by all ordinary expectations, have claimed her fully.',
        strategicRole:
            'Illegible heir inside a sanctified continuity line.',
        tags: [
            'clio',
            'valeria',
            'academy',
            'active',
            'brilliance',
            'refusal',
            'scandal',
        ],
        timelineYears: [1793, 1904, 1982],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, Claudia Valeria Irreperta is recognized as an extraordinary scientific talent born into one of the Republic’s most distinguished academic families. Her file identifies her as a member of the Valeria gens, the daughter of the current head of the Academy, and the inheritor of a lineage that has repeatedly occupied the highest scientific, religious, and political offices of the state. At the same time, her public image has long been marked by irregularity. Rather than moving smoothly into the expected channels of academic prestige and public duty, Irreperta became associated with a life of leisure, excess, and scandal.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'Irreperta’s irregularity should not be interpreted as accidental self-indulgence. The available material strongly suggests that her visible disorder functioned, at least in part, as rejection. She did not simply fail to enter the expected path of service. She resisted it. This distinction is decisive. A subject of her lineage and ability was expected to move naturally into the higher organs of the Republic. Instead, she created distance — not through obscurity, but through scandal, theatrical noncompliance, and refusal of respectable alignment. This behavior should not be dismissed as youthful provocation. It appears to have operated as a mode of negative clarity: a refusal to become usable on ordinary terms.',
            },
            {
                title: 'Lineage and Historical Relevance',
                body:
                    'House: Valeria. Lineage Status: direct descendant of one of the most influential academic-sacral families in the Seventh Republic. Archival Relevance: extreme. The Valeria line occupies a singular place in the symbolic order of the Republic. Across generations, its members have held the offices of prefects, consuls, cardinals, and major academic authorities; their scientific achievements have been canonized into sanctity. For this reason, Claudia Valeria Irreperta must be read as more than a gifted daughter of a powerful house. She is a living contradiction internal to one of the Republic’s foundational lineages. Where the Fabius inheritance carries the memory of rupture, the Valeria inheritance carries the memory of consecrated order. In Irreperta, that order fails to reproduce itself cleanly.',
            },
            {
                title: 'Institutional Position',
                body:
                    'Affiliation: no stable formal integration prior to core narrative events. System Proximity: extreme by birth, unstable by choice. Trust Status: ambiguous. Interpretive Sensitivity: very high. Irreperta’s institutional situation is unusual. Unlike a conventional dissident, she is not external to the system. Unlike a conventional heir, she does not fully inhabit its channels. She exists in a state of suspended incorporation: too central by origin to be ignored, too undisciplined by temperament to be considered safe. This makes her difficult to classify. She cannot be reduced either to asset or to threat without loss of precision.',
            },
            {
                title: 'Structural Role',
                body:
                    'Irreperta represents a category the Republic is structurally poor at handling: the internally illegible heir. She possesses all the attributes that should have made her a perfect continuation of the existing order — lineage, intelligence, prestige, proximity, symbolic capital. Yet instead of stabilizing the system, she introduces friction into it. She reveals that inherited legitimacy does not guarantee obedience, and that intellectual brilliance can just as easily deepen alienation as reinforce doctrine. Her structural role is best understood as a corrupted succession line: not because she lacks the capacity to inherit power, but because she refuses to inherit it in the expected form.',
            },
            {
                title: 'Behavioral Vector',
                body:
                    'Intelligence: exceptional. Scientific Capacity: extraordinary. Institutional Compliance: low. Symbolic Visibility: high. Tolerance for Scandal: high. Predictability: low. Rupture Potential: very high. Leadership Tendency: natural, whether formalized or not. Irreperta does not resemble the obedient high-functioning servant type. She is too visible, too independent, and too structurally gifted to disappear into routine administration. Her scandal profile is not incidental to her behavior; it is one of the forms her resistance takes. She should not be mistaken for a nihilistic hedonist. The archive indicates a more dangerous possibility: that pleasure, excess, and scandal were used as shields against capture by institutional expectation.',
            },
            {
                title: 'Key Relations',
                body:
                    'Valeria Gens: primary symbolic frame, source of legitimacy, burden, expectation, and interpretive danger. Head of the Holy Academy: not merely paternal relation, but direct linkage to the apex of sanctified knowledge-power. Holy Academy: the institutional body that should have claimed her naturally and completely, but did not. Aurelia Fabia Severina: a relation of major interpretive importance, functioning as contrast and complement — one shaped by discipline under pressure, the other by refusal through visible disorder. Lucius Cornelius: a relation through which rebellion, recognition, desire, and strategic consequence become entangled.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Public scandal appears to have obscured the seriousness of the file. This may have benefited Irreperta. Official channels tend to treat her irregularity as moral failure or immaturity. This is an interpretive convenience. Such a reading domesticates what may in fact be a sustained refusal of incorporation. Her dossier should not be indexed under deviance alone. Nor should it be romanticized as simple freedom. The more accurate reading is that Irreperta converted privilege into distance and brilliance into noncompliance. She should be reviewed together with the files on the Valeria line, the Holy Academy, and all materials concerning internal contradictions among elite heirs.',
            },
        ],
        relatedDossiers: [
            { label: 'Valeria Gens', href: '/terminal?tab=dossiers&file=valeria-gens' },
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Security Prefecture', href: '/terminal?tab=dossiers&file=security-prefecture' },
            { label: 'Aurelia Fabia Severina', href: '/terminal?tab=dossiers&file=aurelia-fabia-severina' },
            { label: 'Lucius Cornelius', href: '/terminal?tab=dossiers&file=lucius-cornelius' },
        ],
        relatedRoutes: [
            { label: '1791 cartography', href: '/terminal?tab=cartography&year=1791' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },

    {
        id: 'PREF-054',
        slug: 'lucius-cornelius',
        title: 'Lucius Cornelius',
        type: 'person',
        status: 'restricted',
        date: '2026',
        classification: 'Active Person File',
        summary:
            'Lucius Cornelius, widely known as Ace, is an active file of exceptional scientific, symbolic, and political sensitivity. He belongs to the Cornelius line, yet his significance derives not from ancestry alone but from the unstable convergence of brilliance, legitimacy, public usefulness, and moral independence.',
        strategicRole:
            'Sanctioned brilliance becoming structurally difficult to govern.',
        tags: [
            'ace',
            'cornelius',
            'science',
            'active',
            'academy',
            'expedition',
            'brilliance',
            'rupture',
        ],
        timelineYears: [1802, 1904, 1982],
        sections: [
            {
                title: 'Public Record',
                body:
                    'Officially, Lucius Cornelius is indexed as one of the brightest scientific figures of his generation. At the age of twenty-four, his work The Bright Nature of Dark Matter produced a significant intellectual shock within the scientific community and established his reputation as a thinker of unusual range and force. At twenty-six, he further consolidated his public standing during the North Pole expedition, where he is recorded as having displayed decisive judgment, composure under pressure, and effective leadership in conditions of extreme material risk. In public memory, Cornelius appears as an exemplary synthesis of intellect, courage, and civic usefulness.',
            },
            {
                title: 'Internal Assessment',
                body:
                    'The Republic is structurally well equipped to celebrate brilliance. It is less well equipped to contain brilliance once it acquires ethical independence. Cornelius should not be interpreted as a deviant genius operating outside the system from the beginning. His case is more troubling than that. He was legible, useful, decorated, and, for a time, affirming to the order that elevated him. His later instability therefore cannot be explained away as marginality or resentment. It emerges from within successful incorporation. He possesses not only intelligence, but interpretive seriousness. He appears unable to tolerate contradiction indefinitely once he has recognized it as real.',
            },
            {
                title: 'Lineage and Historical Relevance',
                body:
                    'House: Cornelius. Lineage Status: direct descendant of one of the Republic’s governing aristocratic lines. Archival Relevance: extreme. The Cornelius line belongs not to symbolic prestige alone, but to the active architecture of rule. Its weight is political, institutional, and hereditary. To read Lucius Cornelius as merely an individual scientist is therefore to misread the file. His significance lies in the conjunction of bloodline and merit. He is not an outsider forcing entry into the upper layers of the system. He is a product of one of the houses through which the system reproduces itself. For this reason, any fracture in the Cornelius file must be treated as structurally meaningful.',
            },
            {
                title: 'Institutional Position',
                body:
                    'Affiliation: Holy Academy / scientific field structure. System Proximity: high. Public Legibility: very high. Trust Status: degrading under interpretive strain. Interpretive Sensitivity: extreme. Cornelius stands unusually close to the Republic’s preferred image of itself: learned, courageous, productive, decorated, and useful. His prestige was not accidental, nor was it purely hereditary. It was earned in ways the Republic itself could publicly celebrate. This is precisely what makes his file difficult. A subject of low standing can be discarded. A subject of high usefulness can be rewarded. A subject of high usefulness who begins to reinterpret the foundations is a more serious administrative problem.',
            },
            {
                title: 'Structural Role',
                body:
                    'Cornelius represents a category of internal danger the Republic must always deny while quietly tracking: the sanctioned mind that becomes structurally ungovernable. He has the profile of an ideal inheritor of the order — intelligence, courage, lineage, achievement, public respect. Yet the same configuration produces, under pressure, not stable succession but instability. He does not threaten the system by failing its standards. He threatens it by taking some of them too seriously. His structural role is best understood as a reversal vector: a subject formed to expand the prestige of the Republic, who may instead expose the limits of what that prestige can contain.',
            },
            {
                title: 'Behavioral Vector',
                body:
                    'Intelligence: exceptional. Scientific Capacity: proven at highest level. Field Competence: high. Decision-Making Under Pressure: high. Capacity for Sustained Loyalty: high, but conditional. Tolerance for Cognitive Contradiction: low. Moral Threshold for Compliance: unstable. Rupture Potential: very high. Leadership Tendency: strong under crisis conditions. Cornelius should not be read as erratic. His danger does not lie in volatility. Much of his threat profile emerges from coherence. He can act decisively, think clearly under stress, and sustain commitment under difficult conditions. These are ordinarily stabilizing traits. In his case, however, they are joined to an apparent inability to indefinitely defer serious contradiction once recognized.',
            },
            {
                title: 'North Pole Expedition Record',
                body:
                    'The North Pole expedition is decisive not because it made Cornelius famous, but because it made him difficult to trivialize. In this episode, intelligence, courage, and operational leadership converge under public conditions. Faced with imminent threat to the lives of expedition members, Cornelius is recorded as having acted with speed, clarity, and self-command. This matters because later deviation cannot be dismissed as weakness, vanity, or cowardice. The expedition file protects him symbolically even as it complicates efforts to contain him administratively.',
            },
            {
                title: 'Key Relations',
                body:
                    'House Cornelius: primary political lineage, source of legitimacy, expectation, and interpretive escalation. Holy Academy: the institutional structure that elevated, recognized, and partially sanctified his brilliance. North Pole Expedition Record: a decisive public proof of competence, courage, and operational leadership. Claudia Valeria Irreperta: a relation of high destabilizing significance, functioning not merely as emotional attachment but as a force intensifying recognition, defiance, and structural departure. Aurelia Fabia Severina: a relation of strategic interpretive value through which loyalty, memory, institution, and fracture become mutually legible.',
            },
            {
                title: 'Archive Notes',
                body:
                    'Official channels tend to preserve the useful Cornelius and suppress the interpretive Cornelius. This division is no longer sustainable. His public heroism has likely delayed full recognition of the threat profile. The same record that protects him also magnifies the eventual cost of open rupture. A mediocre dissenter can be isolated. A decorated Cornelius cannot be neutralized without consequence. His file should not be indexed under brilliance alone, nor under dissent alone. It should be read as an unstable convergence of legitimacy, intellect, and moral noncompliance.',
            },
        ],
        relatedDossiers: [
            { label: 'Cornelius Gens', href: '/terminal?tab=dossiers&file=cornelius-gens' },
            { label: 'Holy Academy', href: '/terminal?tab=dossiers&file=holy-academy' },
            { label: 'Aurelia Fabia Severina', href: '/terminal?tab=dossiers&file=aurelia-fabia-severina' },
            { label: 'Claudia Valeria Irreperta', href: '/terminal?tab=dossiers&file=claudia-valeria-irreperta' },
            { label: 'Seventh Republic', href: '/terminal?tab=dossiers&file=seventh-republic' },
        ],
        relatedRoutes: [
            { label: '1802 cartography', href: '/terminal?tab=cartography&year=1802' },
            { label: '1904 cartography', href: '/terminal?tab=cartography&year=1904' },
            { label: '1982 cartography', href: '/terminal?tab=cartography&year=1982' },
            { label: 'Open signal', href: '/terminal?tab=signal' },
        ],
    },
];

/*

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
*/
