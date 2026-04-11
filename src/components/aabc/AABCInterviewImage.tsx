'use client';

import Image from 'next/image';

export default function AABCInterviewImage({
    src,
    layout,
    alt
}: {
    src: string;
    layout: string;
    alt?: string
}) {
    // Layout-specific styling
    let layoutClasses = "";
    if (layout === 'c') {
        layoutClasses = "w-full aspect-video my-12 clear-both mx-auto";
    } else if (layout === 'l') {
        layoutClasses = "w-full md:w-[40%] md:float-left md:mr-10 md:mb-8 mb-8 mt-4 aspect-[3/4] clear-left";
    } else if (layout === 'r') {
        layoutClasses = "w-full md:w-[40%] md:float-right md:ml-10 md:mb-8 mb-8 mt-4 aspect-[3/4] clear-right";
    } else {
        layoutClasses = "w-full aspect-video my-12 clear-both"; // fallback
    }

    return (
        <figure className={`relative overflow-hidden ${layoutClasses} bg-[#050505] outline outline-1 outline-white/10 shadow-2xl shadow-black`}>
            <Image
                src={src}
                alt={alt || 'Intercept Image Archive'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none" />
        </figure>
    );
}
