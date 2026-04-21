'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { MapRegion } from '@/content/terminal/terminal.types';
import { getTerritoryLabel } from '@/content/terminal/territory-profiles';

type Props = {
    regions: MapRegion[];
    activeRegionIds: string[];
    selectedTerritoryId: string | null;
    onSelectTerritory: (territoryId: string) => void;
};

const SVG_PATH = '/maps/world-stage1.svg';
const VIEWBOX = '430 280 150 100';
const TERRITORY_SELECTOR = 'path[id], polygon[id], rect[id], circle[id], ellipse[id]';
const HIDDEN_HELPER_IDS = new Set(['IT_N', 'IT_S', 'IT_Sic', 'RU_W', 'RU_E']);

function normalizeId(id: string) {
    return id.trim();
}

function isInteractiveTerritory(id: string) {
    return id.length > 0 && !HIDDEN_HELPER_IDS.has(id);
}

function setTerritoryStyle(
    node: SVGElement,
    {
        fill,
        stroke,
        strokeWidth,
        opacity = '1',
        pointerEvents = 'auto',
    }: {
        fill: string;
        stroke: string;
        strokeWidth: string;
        opacity?: string;
        pointerEvents?: string;
    },
) {
    node.setAttribute('fill', fill);
    node.setAttribute('stroke', stroke);
    node.setAttribute('stroke-width', strokeWidth);
    node.setAttribute('opacity', opacity);
    node.setAttribute('pointer-events', pointerEvents);
    node.setAttribute('vector-effect', 'non-scaling-stroke');
    node.setAttribute('stroke-linejoin', 'round');
    node.setAttribute('stroke-linecap', 'round');
}

export default function CartographyMap({
    regions,
    activeRegionIds,
    selectedTerritoryId,
    onSelectTerritory,
}: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);
    const cleanupRef = useRef<(() => void) | null>(null);
    const [hoveredTerritoryId, setHoveredTerritoryId] = useState<string | null>(null);
    const [svgReady, setSvgReady] = useState(false);

    const activeSvgIds = useMemo(() => {
        const ids = new Set<string>();

        activeRegionIds.forEach((regionId) => {
            const region = regions.find((item) => item.id === regionId);
            region?.svgIds.forEach((svgId) => ids.add(normalizeId(svgId)));
        });

        if (activeRegionIds.includes('italy')) {
            ids.add('IT');
        }

        return ids;
    }, [activeRegionIds, regions]);

    useEffect(() => {
        let cancelled = false;
        const controller = new AbortController();
        const container = containerRef.current;

        async function mountSvg() {
            if (!container) return;

            const response = await fetch(SVG_PATH, { signal: controller.signal });
            const svgText = await response.text();

            if (cancelled || !container.isConnected) return;

            const parsed = new DOMParser().parseFromString(svgText, 'image/svg+xml');
            const svg = parsed.querySelector('svg');

            if (!svg) return;

            svg.setAttribute('viewBox', VIEWBOX);
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.setAttribute('class', 'h-auto w-full');

            const cleanupCallbacks: Array<() => void> = [];
            const nodes = Array.from(svg.querySelectorAll<SVGElement>(TERRITORY_SELECTOR));

            nodes.forEach((node) => {
                node.removeAttribute('class');
                node.removeAttribute('style');

                const id = normalizeId(node.id);

                if (!id || !isInteractiveTerritory(id)) {
                    return;
                }

                node.setAttribute('tabindex', '0');
                node.setAttribute('role', 'button');
                node.setAttribute('aria-label', `Inspect ${getTerritoryLabel(id)}`);
                node.style.cursor = 'pointer';

                const handlePointerEnter = () => {
                    setHoveredTerritoryId(id);
                };

                const handlePointerLeave = () => {
                    setHoveredTerritoryId((current) => (current === id ? null : current));
                };

                const handleClick = () => {
                    onSelectTerritory(id);
                };

                const handleKeyDown = (event: KeyboardEvent) => {
                    if (event.key !== 'Enter' && event.key !== ' ') {
                        return;
                    }

                    event.preventDefault();
                    onSelectTerritory(id);
                };

                node.addEventListener('pointerenter', handlePointerEnter);
                node.addEventListener('pointerleave', handlePointerLeave);
                node.addEventListener('click', handleClick);
                node.addEventListener('keydown', handleKeyDown);

                cleanupCallbacks.push(() => {
                    node.removeEventListener('pointerenter', handlePointerEnter);
                    node.removeEventListener('pointerleave', handlePointerLeave);
                    node.removeEventListener('click', handleClick);
                    node.removeEventListener('keydown', handleKeyDown);
                });
            });

            container.replaceChildren(svg);
            svgRef.current = svg as unknown as SVGSVGElement;
            cleanupRef.current = () => {
                cleanupCallbacks.forEach((cleanup) => cleanup());
            };
            setSvgReady(true);
        }

        mountSvg().catch((error) => {
            if (error instanceof DOMException && error.name === 'AbortError') {
                return;
            }

            console.error('Failed to load terminal map SVG.', error);
        });

        return () => {
            cancelled = true;
            controller.abort();
            cleanupRef.current?.();
            cleanupRef.current = null;
            svgRef.current = null;
            setSvgReady(false);
            setHoveredTerritoryId(null);

            if (container) {
                container.replaceChildren();
            }
        };
    }, [onSelectTerritory]);

    useEffect(() => {
        const svg = svgRef.current;

        if (!svg || !svgReady) return;

        const nodes = Array.from(svg.querySelectorAll<SVGElement>(TERRITORY_SELECTOR));

        nodes.forEach((node) => {
            const id = normalizeId(node.id);

            if (!id) {
                return;
            }

            if (HIDDEN_HELPER_IDS.has(id)) {
                setTerritoryStyle(node, {
                    fill: 'rgba(255,255,255,0.045)',
                    stroke: 'rgba(255,255,255,0.18)',
                    strokeWidth: '0.8',
                    opacity: '0',
                    pointerEvents: 'none',
                });
                node.setAttribute('aria-hidden', 'true');
                return;
            }

            setTerritoryStyle(node, {
                fill: 'rgba(255,255,255,0.045)',
                stroke: 'rgba(255,255,255,0.18)',
                strokeWidth: '0.8',
            });

            if (isInteractiveTerritory(id)) {
                node.setAttribute('aria-hidden', 'false');
                node.setAttribute('aria-pressed', selectedTerritoryId === id ? 'true' : 'false');
            }
        });

        activeSvgIds.forEach((id) => {
            const node = svg.getElementById(id);

            if (!(node instanceof SVGElement) || !isInteractiveTerritory(id)) {
                return;
            }

            setTerritoryStyle(node, {
                fill: 'rgba(239,68,68,0.16)',
                stroke: 'rgba(248,113,113,0.95)',
                strokeWidth: '1.6',
            });
        });

        if (hoveredTerritoryId && hoveredTerritoryId !== selectedTerritoryId) {
            const hoveredNode = svg.getElementById(hoveredTerritoryId);

            if (hoveredNode instanceof SVGElement && isInteractiveTerritory(hoveredTerritoryId)) {
                setTerritoryStyle(hoveredNode, {
                    fill: 'rgba(251,191,36,0.12)',
                    stroke: 'rgba(252,211,77,0.82)',
                    strokeWidth: '1.3',
                });
            }
        }

        if (selectedTerritoryId) {
            const selectedNode = svg.getElementById(selectedTerritoryId);

            if (selectedNode instanceof SVGElement && isInteractiveTerritory(selectedTerritoryId)) {
                setTerritoryStyle(selectedNode, {
                    fill: 'rgba(251,191,36,0.18)',
                    stroke: 'rgba(253,224,71,0.98)',
                    strokeWidth: '1.7',
                });
            }
        }
    }, [activeSvgIds, hoveredTerritoryId, selectedTerritoryId, svgReady]);

    const baselineMode = activeRegionIds.length === 0;
    const focusTerritory = hoveredTerritoryId ?? selectedTerritoryId;

    return (
        <div className="border border-white/15 bg-black p-4 lg:p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    <span className="block h-1.5 w-1.5 bg-zinc-500"></span>
                    Archive Cartography Layer
                </div>

                {baselineMode ? (
                    <div className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
                        Reality A baseline visible
                    </div>
                ) : (
                    <div className="animate-pulse border border-red-500/30 bg-red-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-red-500">
                        Divergence active
                    </div>
                )}
            </div>

            <div className="group relative overflow-hidden border border-white/10 bg-[#030303]">
                <div
                    className="pointer-events-none absolute inset-0 opacity-50 transition-opacity group-hover:opacity-100"
                    style={{
                        backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                        backgroundSize: '30px 30px',
                    }}
                ></div>

                <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]"></div>

                <div className="pointer-events-none absolute left-0 top-1/2 z-10 h-[1px] w-full bg-red-500/10 transition-colors group-hover:bg-red-500/20"></div>
                <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-full w-[1px] bg-red-500/10 transition-colors group-hover:bg-red-500/20"></div>

                <div className="pointer-events-none absolute bottom-3 left-3 z-20 flex flex-col gap-1 text-[9px] font-mono text-zinc-600">
                    <span>LAT 43.12 LON 12.35</span>
                    <span className="text-zinc-700">
                        SCALE: {baselineMode ? '1:10M' : '1:COMPUTING'}
                    </span>
                    <span className="text-amber-200/70">
                        FOCUS: {focusTerritory ? getTerritoryLabel(focusTerritory) : 'Awaiting selection'}
                    </span>
                </div>

                <div className="pointer-events-none absolute right-3 top-3 z-20 flex flex-col items-end gap-1 text-[9px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        MAP SAT
                    </span>
                    <span className="border-b border-zinc-700 pb-0.5 text-zinc-600">
                        TRACKING...
                    </span>
                </div>

                <div
                    ref={containerRef}
                    className="relative z-0 min-h-[300px] w-full md:min-h-[450px]"
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
                        ].includes(region.id),
                    )
                    .map((region) => {
                        const active = activeRegionIds.includes(region.id);

                        return (
                            <span
                                key={region.id}
                                className={`inline-flex items-center border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                                    active
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
