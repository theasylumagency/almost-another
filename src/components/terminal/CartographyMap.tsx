'use client';

import { useEffect, useMemo, useRef } from 'react';
import type { MapRegion } from '@/content/terminal/terminal.types';

type Props = {
    regions: MapRegion[];
    activeRegionIds: string[];
};

const SVG_PATH = '/maps/world-stage1.svg';

// Europe + Mediterranean + North Africa frame
const VIEWBOX = '430 280 150 100';

function normalizeId(id: string) {
    return id.trim();
}

export default function CartographyMap({ regions, activeRegionIds }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const activeSvgIds = useMemo(() => {
        const ids = new Set<string>();

        activeRegionIds.forEach((regionId) => {
            const region = regions.find((item) => item.id === regionId);
            region?.svgIds.forEach((svgId) => ids.add(normalizeId(svgId)));
        });

        // when whole Italy is active, use IT shell
        if (activeRegionIds.includes('italy')) {
            ids.add('IT');
        }

        return ids;
    }, [activeRegionIds, regions]);

    useEffect(() => {
        let cancelled = false;

        async function mountSvg() {
            if (!containerRef.current) return;

            const response = await fetch(SVG_PATH);
            const svgText = await response.text();

            if (cancelled || !containerRef.current) return;

            containerRef.current.innerHTML = svgText;

            const svg = containerRef.current.querySelector('svg');
            if (!svg) return;

            svg.setAttribute('viewBox', VIEWBOX);
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.setAttribute('class', 'h-auto w-full');

            // global styling reset
            const allPaths = svg.querySelectorAll('path, polygon, rect, circle, ellipse');

            allPaths.forEach((node) => {
                const el = node as SVGElement;
                el.setAttribute('fill', 'rgba(255,255,255,0.045)');
                el.setAttribute('stroke', 'rgba(255,255,255,0.18)');
                el.setAttribute('stroke-width', '0.8');
                el.setAttribute('vector-effect', 'non-scaling-stroke');
                el.removeAttribute('class');
                el.removeAttribute('style');
            });

            // stage-1: hide split helpers unless explicitly activated
            ['IT_N', 'IT_S', 'IT_Sic', 'RU_W', 'RU_E'].forEach((id) => {
                const node = svg.getElementById(id);
                if (node) {
                    (node as SVGElement).setAttribute('opacity', '0');
                    (node as SVGElement).setAttribute('pointer-events', 'none');
                }
            });

            // hide full Russia from stage-1 crop emphasis
            const ru = svg.getElementById('RU');
            if (ru) {
                (ru as SVGElement).setAttribute('opacity', '1');
                (ru as SVGElement).setAttribute('pointer-events', 'none');
            }

            // if Italy split is active, hide full IT shell and show only split pieces
            const splitItalyActive =
                activeSvgIds.has('IT_N') || activeSvgIds.has('IT_S') || activeSvgIds.has('IT_Sic');

            const italyFull = svg.getElementById('IT');
            if (italyFull) {
                (italyFull as SVGElement).setAttribute('opacity', splitItalyActive ? '0' : '1');
            }

            if (splitItalyActive) {
                ['IT_N', 'IT_S', 'IT_Sic'].forEach((id) => {
                    const node = svg.getElementById(id);
                    if (node) {
                        (node as SVGElement).setAttribute('opacity', '1');
                    }
                });
            }

            // activate highlighted territories
            activeSvgIds.forEach((id) => {
                const node = svg.getElementById(id);
                if (!node) return;

                const el = node as SVGElement;
                el.setAttribute('opacity', '1');
                el.setAttribute('fill', 'rgba(239,68,68,0.16)');
                el.setAttribute('stroke', 'rgba(248,113,113,0.95)');
                el.setAttribute('stroke-width', '1.6');
            });
        }

        mountSvg();

        return () => {
            cancelled = true;
        };
    }, [activeSvgIds]);

    const baselineMode = activeRegionIds.length === 0;

    return (
        <div className="border border-white/15 bg-black p-4 lg:p-6">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    <span className="block w-1.5 h-1.5 bg-zinc-500"></span>
                    Archive Cartography Layer
                </div>

                {baselineMode ? (
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 border border-white/10 px-2 py-1">
                        Reality A baseline visible
                    </div>
                ) : (
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-500 border border-red-500/30 bg-red-500/10 px-2 py-1 animate-pulse">
                        Divergence active
                    </div>
                )}
            </div>

            <div className="relative overflow-hidden border border-white/10 bg-[#030303] group">
                {/* Radar Grid Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-50 transition-opacity group-hover:opacity-100" style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px'
                }}></div>

                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.95)] z-10"></div>

                {/* HUD Crosshairs */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/10 pointer-events-none z-10 transition-colors group-hover:bg-red-500/20"></div>
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-500/10 pointer-events-none z-10 transition-colors group-hover:bg-red-500/20"></div>

                {/* Coordinate Readout */}
                <div className="absolute bottom-3 left-3 text-[9px] font-mono text-zinc-600 pointer-events-none z-20 flex flex-col gap-1">
                    <span>LAT 43.12 LON 12.35</span>
                    <span className="text-zinc-700">SCALE: {baselineMode ? '1:10M' : '1:COMPUTING'}</span>
                </div>

                <div className="absolute top-3 right-3 text-[9px] font-mono text-zinc-500 pointer-events-none z-20 flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span> MAP SAT</span>
                    <span className="text-zinc-600 border-b border-zinc-700 pb-0.5">TRACKING...</span>
                </div>

                {/* Map SVG injection point */}
                <div
                    ref={containerRef}
                    className="relative z-0 w-full min-h-[300px] md:min-h-[450px]"
                />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {regions
                    .filter((region) =>
                        [
                            'britain',
                            'belgium',
                            'france',
                            'spain',
                            'portugal',
                            'austria',
                            'germany',
                            'europe-ural',
                            'italy',
                            'italy-north',
                            'italy-south',
                            'sicily',
                            'north-africa',
                            'middle-east',
                            'western-india',
                        ].includes(region.id)
                    )
                    .map((region) => {
                        const active = activeRegionIds.includes(region.id);

                        return (
                            <span
                                key={region.id}
                                className={`inline-flex items-center border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${active
                                    ? 'border-red-500 bg-red-500/10 text-red-100 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                                    : 'border-white/10 bg-black text-zinc-500'
                                    }`}
                            >
                                {region.label}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
}