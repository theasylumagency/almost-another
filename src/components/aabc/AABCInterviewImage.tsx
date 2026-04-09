'use client';

import Image from 'next/image';
import { useAABCMode } from './AABCModeContext';

export default function AABCInterviewImage({ 
    src, 
    layout, 
    alt 
}: { 
    src: string; 
    layout: string; 
    alt?: string 
}) {
    const { mode } = useAABCMode();
    const isLounge = mode === 'lounge';
    
    // Layout-specific styling
    let layoutClasses = "";
    if (layout === 'c') {
        layoutClasses = "w-full aspect-video my-10 clear-both mx-auto";
    } else if (layout === 'l') {
        layoutClasses = "w-full md:w-[40%] md:float-left md:mr-8 md:mb-6 mb-8 mt-4 aspect-[3/4] clear-left";
    } else if (layout === 'r') {
        layoutClasses = "w-full md:w-[40%] md:float-right md:ml-8 md:mb-6 mb-8 mt-4 aspect-[3/4] clear-right";
    } else {
        layoutClasses = "w-full aspect-video my-8 clear-both"; // fallback
    }

    const modeClasses = isLounge 
        ? "border-white/10 shadow-black/50" 
        : "border-black/10 shadow-black/10";
        
    return (
        <figure className={`relative overflow-hidden rounded-xl group border shadow-xl transition-all duration-700 ease-in-out ${layoutClasses} ${modeClasses}`}>
            <Image 
                src={src}
                alt={alt || 'Interview Image'}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {isLounge && (
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none transition-colors duration-1000" />
            )}
        </figure>
    );
}
