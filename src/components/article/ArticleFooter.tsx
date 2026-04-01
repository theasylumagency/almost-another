import Link from 'next/link';

export default function ArticleFooter({ frontmatter, linkedBroadcast }: any) {
    // თუ სტატიას არ აქვს AABC მიბმული, არაფერს ვარენდერებთ
    if (!linkedBroadcast) return null;

    return (
        <div className="mt-8 mb-16 bg-zinc-950 border border-red-500/30 p-6 md:p-8 rounded-2xl relative overflow-hidden font-mono text-zinc-300 shadow-2xl z-20">
            {/* წითელი ხაზი და ანიმაცია */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent"></div>

            <div className="flex items-center space-x-3 mb-6 border-b border-red-500/20 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
                <span className="text-xs font-bold text-red-500 tracking-widest uppercase">
                    [ WARNING: INCOMING AABC TRANSMISSION ]
                </span>
            </div>

            <h4 className="text-xl md:text-2xl font-black text-white mb-3">
                {linkedBroadcast.title}
            </h4>

            <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                {linkedBroadcast.description}
            </p>

            <Link
                href={`/aabc/${linkedBroadcast.slug}`}
                className="inline-flex items-center space-x-2 text-red-400 border border-red-500/50 px-6 py-3 hover:bg-red-500/10 transition-all uppercase tracking-widest text-xs font-bold rounded-xl"
            >
                <span>Decrypt Transmission</span>
                <span>&rarr;</span>
            </Link>
        </div>
    );
}