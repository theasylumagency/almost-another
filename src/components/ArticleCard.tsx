import Link from 'next/link';
import Image from 'next/image';
import { ArticleData } from '@/lib/articles';
import { format, parseISO } from 'date-fns';

export default function ArticleCard({ article }: { article: ArticleData }) {
  let formattedDate = article.date;
  try {
    if (article.date) {
      formattedDate = format(parseISO(article.date), 'MMM dd, yyyy');
    }
  } catch {
    // Fallback to raw date string if parsing fails
  }

  return (
    <article className="flex flex-col group h-full">
      <Link href={`/articles/${article.slug}`} className="flex flex-col h-full cursor-pointer">
        <div className="aspect-[4/3] bg-surface-container-lowest overflow-hidden mb-8 relative border border-white/5">
          {(article.imageWide || article.imageSquare) && (
            <Image
              src={article.imageWide || article.imageSquare!}
              alt={article.title}
              fill
              className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
              sizes="(min-width: 640px) 50vw, 33vw"
            />
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="font-label text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
            {formattedDate}
          </span>
          <span className="font-label text-[10px] tracking-[0.2em] text-zinc-700 uppercase">
            {article.readingTime}
          </span>
        </div>

        <h3 className="serif-display text-2xl text-white mb-4 leading-tight group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="font-sans text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {article.description || article.subtitle}
        </p>

        {article.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border border-white/10 px-2 py-1 font-label text-[10px] uppercase tracking-[0.2em] text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-auto font-label text-[10px] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-primary-container transition-colors flex items-center gap-2">
          Continue Reading <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}
