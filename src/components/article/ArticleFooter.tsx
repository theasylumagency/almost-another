// components/article/ArticleFooter.tsx
import Link from 'next/link';

interface ArticleFooterProps {
    frontmatter: any;
    linkedBroadcast: any | null;
}

export default function ArticleFooter({ frontmatter, linkedBroadcast }: ArticleFooterProps) {
    return (
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">

            {/* (Related Content) */}
            <div className="mb-12">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">
                    Related Editorials
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {/* We will write the logic here later that will bring out articles with similar tags */}
                    More essays exploring {frontmatter.tags?.join(', ')}...
                </p>
            </div>

            {/* (AABC Intercept) */}
            {linkedBroadcast && (
                <div className="mt-16 bg-zinc-950 border border-red-500/30 p-6 md:p-8 rounded-sm relative overflow-hidden font-mono text-zinc-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent"></div>

                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-red-500 tracking-widest uppercase">
                            [ WARNING: INCOMING AABC TRANSMISSION ]
                        </span>
                    </div>

                    <h4 className="text-xl md:text-2xl font-black text-white mb-3">
                        {linkedBroadcast.title}
                    </h4>

                    <p className="text-sm text-zinc-400 mb-6">
                        {linkedBroadcast.description || "We are detecting a signal that is beyond the control of the author of this article."}
                    </p>

                    <Link
                        href={`/broadcasts/${linkedBroadcast.slug}`}
                        className="inline-block text-emerald-400 border border-emerald-400/50 px-6 py-2 hover:bg-emerald-400/10 transition-all uppercase tracking-widest text-xs font-bold"
                    >
                        Decrypt Transmission &rarr;
                    </Link>
                </div>
            )}

        </div>
    );
}