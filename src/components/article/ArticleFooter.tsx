import Link from 'next/link';

export default function ArticleFooter({ frontmatter, linkedBroadcast }: any) {
    return (
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800">

            <div className="mb-12">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">
                    Related Editorials
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    More essays exploring: <span className="text-emerald-500">{frontmatter.tags?.join(', ')}</span>
                </p>
            </div>

            {linkedBroadcast && (
                <div className="mt-16 bg-zinc-950 border border-red-500/30 p-6 md:p-8 rounded relative overflow-hidden font-mono text-zinc-300 shadow-2xl">
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
                        className="inline-flex items-center space-x-2 text-red-400 border border-red-500/50 px-6 py-3 hover:bg-red-500/10 transition-all uppercase tracking-widest text-xs font-bold"
                    >
                        <span>Decrypt Transmission</span>
                        <span>&rarr;</span>
                    </Link>
                </div>
            )}

        </div>
    );
}