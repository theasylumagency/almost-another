'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Dossier } from '@/content/terminal/terminal.types';

type Props = {
    dossiers: Dossier[];
    selectedSlug: string;
    onSelectDossier: (slug: string) => void;
};

const FILTERS = [
    'all',
    'person',
    'incident',
    'place',
    'institution',
    'state_form',
    'lineage',
    'operation',
    'observation',
    'threat',
    'doctrine',
] as const;

export default function DossiersPanel({
    dossiers,
    selectedSlug,
    onSelectDossier,
}: Props) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');

    const filtered = useMemo(() => {
        return dossiers.filter((item) => {
            const matchesFilter = filter === 'all' ? true : item.type === filter;

            const haystack = [
                item.id,
                item.title,
                item.summary,
                item.classification ?? '',
                item.strategicRole ?? '',
                ...item.tags,
            ]
                .join(' ')
                .toLowerCase();

            return matchesFilter && haystack.includes(search.toLowerCase());
        });
    }, [dossiers, filter, search]);

    const selected =
        filtered.find((item) => item.slug === selectedSlug) ??
        dossiers.find((item) => item.slug === selectedSlug) ??
        filtered[0] ??
        dossiers[0];

    return (
        <section className="flex flex-col lg:flex-row h-[800px] w-full border border-white/15 bg-black font-sans relative overflow-hidden ring-1 ring-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/50 pointer-events-none z-30"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/50 pointer-events-none z-30"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/50 pointer-events-none z-30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/50 pointer-events-none z-30"></div>

            {/* Background Texture */}
            <div 
                className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px'
                }}
            ></div>

            {/* LEFT PANEL: Directory Browser */}
            <div className="w-full lg:w-[360px] flex-none flex flex-col bg-[#050505] border-b lg:border-b-0 lg:border-r border-white/10 relative z-10">
                {/* Header */}
                <div className="p-5 border-b border-white/10 bg-[#080808]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-red-500">
                            <span className="block h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
                            DATABASE_DIR
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                            {filtered.length} RECORDS
                        </div>
                    </div>
                    {/* Search Input */}
                    <div className="relative mb-4">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-zinc-500 text-xs">
                            &gt;
                        </div>
                        <input
                            type="text"
                            placeholder="QUERY RECORDS..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full border border-white/20 bg-[#000] pl-7 pr-3 py-2.5 font-mono text-[11px] uppercase text-white outline-none placeholder:text-zinc-600 focus:border-red-500/50 transition-colors shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                        />
                    </div>
                    {/* Filters */}
                    <div className="flex flex-wrap gap-1.5 hide-scrollbar max-h-24 overflow-y-auto">
                        {FILTERS.map((item) => {
                            const active = item === filter;
                            return (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setFilter(item)}
                                    className={`px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors border ${
                                        active
                                            ? 'border-red-500 text-red-400 bg-red-500/10'
                                            : 'border-white/10 text-zinc-500 bg-black hover:border-white/30 hover:text-zinc-300'
                                    }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1 bg-[#020202]">
                    {filtered.map((item) => {
                        const active = item.slug === selected?.slug;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => onSelectDossier(item.slug)}
                                className={`group w-full text-left p-3 flex flex-col gap-2 transition-colors border-l-2 ${
                                    active
                                        ? 'border-red-500 bg-red-500/5 border-t border-b border-r border-t-white/5 border-r-white/5 border-b-white/5'
                                        : 'border-transparent hover:bg-white/[0.03]'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${active ? 'text-red-400' : 'text-zinc-500 group-hover:text-zinc-400'}`}>
                                        {item.id}
                                    </span>
                                    {item.status && (
                                        <span className={`font-mono text-[8px] uppercase tracking-[0.2em] px-1.5 py-0.5 ${
                                            item.status === 'sealed' ? 'text-red-400 bg-red-500/10 border border-red-500/20' :
                                            item.status === 'restricted' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                                            'text-zinc-500 border border-white/5 bg-white/5'
                                        }`}>
                                            {item.status}
                                        </span>
                                    )}
                                </div>
                                <div className={`text-sm tracking-tight transition-colors ${active ? 'text-white' : 'text-zinc-400 font-normal group-hover:text-zinc-300'}`}>
                                    {item.title}
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-600 bg-black border border-white/5 px-1.5 py-0.5">
                                        {item.type}
                                    </span>
                                    {item.classification && (
                                        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-600 border border-white/5 px-1.5 py-0.5">
                                            {item.classification}
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                    {filtered.length === 0 && (
                        <div className="p-8 text-center font-mono text-[10px] uppercase tracking-widest text-red-500/50">
                            No records found
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT PANEL: Active Dossier View */}
            <div className="flex-1 flex flex-col relative z-10 bg-[#030303] overflow-hidden min-w-0">
                {selected ? (
                    <div className="absolute inset-0 flex flex-col animate-in fade-in duration-500">
                        {/* Header */}
                        <div className="flex-none bg-[#080808]/90 backdrop-blur-sm border-b border-white/10 p-6 lg:p-8 flex flex-col justify-end relative z-20">
                            {/* Decorative background grid in header */}
                            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '16px 100%' }}></div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div className="flex items-start gap-4 sm:gap-6">
                                    <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center bg-red-500/5 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)] relative">
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500"></div>
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500"></div>
                                        <span className="font-mono text-xl font-bold text-red-500/90">
                                            {selected.id.split('-')[1] || selected.id.substring(0, 2)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]">
                                            <span className="text-red-400 bg-red-500/10 px-2.5 py-0.5 border border-red-500/20">{selected.id}</span>
                                            <span className="text-zinc-600">//</span>
                                            <span className="text-zinc-400 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></span>
                                                LOG_DATE: {selected.date}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white uppercase leading-none break-words">
                                            {selected.title}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-5 mt-1 border-t border-white/10 pt-4">
                                            <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.25em] text-zinc-500">
                                                <span className="h-2 w-2 bg-red-500 animate-pulse border border-red-400"></span>
                                                SEVENTH REPUBLIC SECURITY PREFECTURE
                                            </div>
                                            {selected.classification && (
                                                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-500/80 bg-amber-500/10 px-2 py-0.5 border border-amber-500/20">
                                                    CLASS: {selected.classification}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {selected.status && (
                                    <div className="flex-none flex flex-col items-start md:items-end gap-3 mt-4 md:mt-0">
                                        <div className="flex gap-1 opacity-20">
                                            {[...Array(9)].map((_, i) => (
                                                <div key={i} className={`h-6 w-1 ${i % 4 === 0 ? 'bg-red-500' : 'bg-white'}`}></div>
                                            ))}
                                        </div>
                                        <div className={`px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.3em] border relative ${
                                            selected.status === 'sealed' ? 'border-red-500/50 text-red-500 bg-red-500/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                                            selected.status === 'restricted' ? 'border-amber-500/50 text-amber-500 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.2)]' :
                                            selected.status === 'leaked' ? 'border-purple-500/50 text-purple-500 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]' :
                                            'border-zinc-500/50 text-zinc-400 bg-white/5'
                                        }`}>
                                            STATUS: {selected.status}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                            {/* Stamped Watermark */}
                            {selected.status && (
                                <div className="pointer-events-none absolute top-40 left-[50%] -translate-x-[40%] -rotate-12 select-none font-mono text-[12vw] md:text-[80px] font-black tracking-widest text-white/[0.015] z-0 whitespace-nowrap mix-blend-overlay">
                                    {selected.status}
                                </div>
                            )}
                            
                            <div className="p-6 lg:p-8 xl:p-10 flex flex-col xl:flex-row gap-10 xl:gap-16 relative z-10 max-w-[1400px]">
                                
                                {/* Main Content Column */}
                                <div className="flex-1 min-w-0 flex flex-col space-y-10">
                                    
                                    {/* Executive Summary */}
                                    <div className="relative border-l border-red-500/50 bg-gradient-to-r from-red-500/5 to-transparent p-6 xl:p-8 shrink-0">
                                        <div className="absolute -top-3 left-4 flex items-center gap-2 bg-[#050505] px-3 font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-red-400 border border-red-500/20">
                                            <span className="h-1.5 w-1.5 bg-red-500 animate-pulse"></span> OVERVIEW_ANALYTICS
                                        </div>
                                        <p className="text-[14.5px] leading-relaxed text-zinc-300 font-mono mt-1 w-full xl:max-w-prose">
                                            {selected.summary}
                                        </p>
                                    </div>

                                    {/* Strategic Designation */}
                                    {selected.strategicRole && (
                                        <div className="group border border-white/10 bg-white/[0.01] p-6 hover:border-white/20 transition-colors">
                                            <div className="flex items-center gap-3 mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                                <span className="text-red-500">{'//'}</span> STRATEGIC_DESIGNATION
                                            </div>
                                            <div className="text-[15px] leading-relaxed text-white max-w-prose">
                                                {selected.strategicRole}
                                            </div>
                                        </div>
                                    )}

                                    {/* Sections Body */}
                                    <div className="space-y-12 pb-12">
                                        {selected.sections.map((section, index) => (
                                            <section key={section.title} className="relative group pl-5 lg:pl-8 max-w-prose">
                                                {/* Left Accent Line */}
                                                <div className="absolute left-0 top-1 bottom-0 w-[1px] bg-gradient-to-b from-white/10 to-transparent group-hover:from-red-500/40 transition-colors"></div>
                                                <div className="absolute -left-[3px] top-1.5 h-[7px] w-[7px] border border-red-500/50 bg-black group-hover:border-red-400 group-hover:bg-red-500/20 transition-all"></div>
                                                
                                                <div className="mb-4 flex items-baseline gap-3">
                                                    <span className="font-mono text-[10px] text-red-500/60 font-bold shrink-0">0{index + 1}</span>
                                                    <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.25em] text-red-100 group-hover:text-white transition-colors">
                                                        {section.title}
                                                    </h3>
                                                </div>
                                                <div className="text-[15.5px] leading-relaxed text-zinc-300 space-y-5 whitespace-pre-wrap">
                                                    {section.body}
                                                </div>
                                            </section>
                                        ))}
                                    </div>
                                </div>

                                {/* Sidebar / Metadata Index */}
                                <div className="w-full xl:w-[320px] 2xl:w-[360px] shrink-0 space-y-8">
                                    {/* Entity Schema */}
                                    <div className="border border-white/10 bg-[#080808] p-5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/5 m-2 opacity-50"></div>
                                        
                                        <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-zinc-800"></span>
                                            ENTITY_METADATA_SCHEMA
                                        </h4>
                                        
                                        <div className="space-y-4 font-mono">
                                            <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                                <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">TYPE</div>
                                                <div className="text-[11px] text-white uppercase">{selected.type}</div>
                                            </div>
                                            {selected.classification && (
                                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                                    <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">REQ_CLEARANCE</div>
                                                    <div className="text-[11px] text-amber-500 uppercase">{selected.classification}</div>
                                                </div>
                                            )}
                                            {selected.status && (
                                                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                                                    <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">FILE_STATUS</div>
                                                    <div className={`text-[11px] uppercase ${
                                                        selected.status === 'sealed' ? 'text-red-400' :
                                                        selected.status === 'restricted' ? 'text-amber-400' :
                                                        'text-zinc-400'
                                                    }`}>{selected.status}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Timeline Indexes */}
                                    {selected.timelineYears && selected.timelineYears.length > 0 && (
                                        <div className="border border-white/10 bg-[#080808] p-5">
                                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-5 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-zinc-800"></span>
                                                TEMPORAL_INDEXES
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selected.timelineYears.map((year) => (
                                                    <Link
                                                        key={year}
                                                        href={`/terminal?tab=cartography&year=${year}`}
                                                        className="group flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1.5 transition-colors hover:border-red-500/50 hover:bg-red-500/10 shadow-sm"
                                                    >
                                                        <span className="w-1.5 h-1.5 bg-zinc-600 transition-colors group-hover:bg-red-500"></span>
                                                        <span className="font-mono text-[11px] text-zinc-400 group-hover:text-red-200">
                                                            {year}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {selected.tags.length > 0 && (
                                        <div className="border border-white/10 bg-[#080808] p-5">
                                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-5 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-zinc-800"></span>
                                                CLASSIFICATION_TAGS
                                            </h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {selected.tags.map(tag => (
                                                    <span key={tag} className="border border-white/5 bg-white/[0.02] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-zinc-400">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Cross references */}
                                    {((selected.relatedDossiers?.length ?? 0) > 0 || (selected.relatedRoutes?.length ?? 0) > 0) && (
                                        <div className="border border-white/10 bg-[#080808] p-5">
                                            <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-5 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-zinc-800"></span>
                                                CROSS_REFERENCES
                                            </h4>
                                            <div className="flex flex-col gap-2">
                                                {[...(selected.relatedDossiers || []), ...(selected.relatedRoutes || [])].map((item, i) => (
                                                    <Link
                                                        key={`${item.href}-${i}`}
                                                        href={item.href}
                                                        className="group flex items-center justify-between border border-white/5 bg-white/[0.02] p-2.5 transition-colors hover:border-red-500/30 hover:bg-red-500/5"
                                                    >
                                                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                                            <span className="w-1 h-3 bg-zinc-600 transition-colors group-hover:bg-red-500 flex-none"></span>
                                                            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-zinc-400 group-hover:text-white transition-colors truncate">
                                                                {item.label}
                                                            </span>
                                                        </div>
                                                        <span className="font-mono text-[10px] text-zinc-600 group-hover:text-red-500 flex-none">&gt;</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center relative bg-[#020202]">
                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #ef4444 0%, transparent 60%)' }}></div>
                        <div className="font-mono text-sm tracking-[0.5em] text-zinc-600 uppercase animate-pulse mb-6 text-center">
                            AWAITING_QUERY<br/><br/>
                            <span className="text-[10px] text-zinc-700">SELECT DOSSIER TO INITIALIZE RECORD</span>
                        </div>
                        <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                    </div>
                )}
            </div>
        </section>
    );
}