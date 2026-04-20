'use client';

import type { MapRegion } from '@/content/terminal/terminal.types';

type Props = {
    regions: MapRegion[];
    activeRegionIds: string[];
};

const SEA_LABELS = [
    { text: 'Atlantic', x: 54, y: 120 },
    { text: 'Mediterranean', x: 246, y: 258 },
    { text: 'Urals', x: 520, y: 102 },
    { text: 'Arabian Sea', x: 536, y: 344 },
];

export default function CartographyMap({ regions, activeRegionIds }: Props) {
    const baselineMode = activeRegionIds.length === 0;

    return (
        <div className="border border-white/10 bg-black/70 p-4">
            <div className="mb-3 flex items-center justify-between gap-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                    Archive Cartography Layer
                </div>

                {baselineMode && (
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600">
                        Reality A baseline visible
                    </div>
                )}
            </div>

            <svg
                viewBox="0 0 600 360"
                className="h-auto w-full border border-white/10 bg-[#050608]"
                role="img"
                aria-label="Stylized macro-geography map for the terminal archive"
            >
                <defs>
                    <linearGradient id="seaFade" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
                    </linearGradient>

                    <radialGradient id="glowA" cx="50%" cy="42%" r="60%">
                        <stop offset="0%" stopColor="rgba(239,68,68,0.15)" />
                        <stop offset="100%" stopColor="rgba(239,68,68,0)" />
                    </radialGradient>

                    <pattern id="cartoGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path
                            d="M 30 0 L 0 0 0 30"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                        />
                    </pattern>

                    <pattern id="cartoGridMajor" width="90" height="90" patternUnits="userSpaceOnUse">
                        <path
                            d="M 90 0 L 0 0 0 90"
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1"
                        />
                    </pattern>

                    <filter id="regionGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect x="0" y="0" width="600" height="360" fill="#040507" />
                <rect x="0" y="0" width="600" height="360" fill="url(#seaFade)" />
                <rect x="0" y="0" width="600" height="360" fill="url(#cartoGrid)" />
                <rect x="0" y="0" width="600" height="360" fill="url(#cartoGridMajor)" />
                <rect x="0" y="0" width="600" height="360" fill="url(#glowA)" />

                <path
                    d="M88 178 C120 156, 154 146, 192 144"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                    fill="none"
                />
                <path
                    d="M210 252 C256 244, 306 246, 360 260"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                    fill="none"
                />
                <path
                    d="M402 214 C452 210, 504 222, 544 248"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                    fill="none"
                />

                {regions.map((region) => {
                    const active = activeRegionIds.includes(region.id);

                    return (
                        <g key={region.id}>
                            {active && (
                                <path
                                    d={region.path}
                                    fill="rgba(239,68,68,0.16)"
                                    stroke="none"
                                    filter="url(#regionGlow)"
                                />
                            )}

                            <path
                                d={region.path}
                                fill={active ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.045)'}
                                stroke={active ? 'rgba(248,113,113,0.95)' : 'rgba(255,255,255,0.22)'}
                                strokeWidth={active ? 2 : 1.2}
                            />

                            <text
                                x={region.labelX}
                                y={region.labelY}
                                textAnchor="middle"
                                className="font-mono"
                                fontSize={active ? '10' : '9'}
                                letterSpacing="2.4"
                                fill={active ? 'rgba(254,202,202,0.95)' : 'rgba(161,161,170,0.72)'}
                            >
                                {region.label.toUpperCase()}
                            </text>
                        </g>
                    );
                })}

                {SEA_LABELS.map((item) => (
                    <text
                        key={item.text}
                        x={item.x}
                        y={item.y}
                        className="font-mono"
                        fontSize="9"
                        letterSpacing="3"
                        fill="rgba(113,113,122,0.68)"
                    >
                        {item.text.toUpperCase()}
                    </text>
                ))}
            </svg>

            <div className="mt-4 flex flex-wrap gap-2">
                {regions.map((region) => {
                    const active = activeRegionIds.includes(region.id);

                    return (
                        <span
                            key={region.id}
                            className={`inline-flex items-center border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${active
                                    ? 'border-red-500/40 bg-red-500/10 text-red-200'
                                    : 'border-white/10 bg-white/[0.03] text-zinc-400'
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