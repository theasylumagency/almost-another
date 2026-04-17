import Link from 'next/link';
import type { ArticleData } from '@/lib/articles';
import type { NovelChapterData } from '@/lib/novels';
import { ArrowRight, Rss } from 'lucide-react';

type LinkedBroadcast = {
  slug: string;
  title?: string;
  description?: string;
};

interface ArticleFooterProps {
  article: ArticleData;
  featuredRelated: ArticleData | null;
  linkedBroadcast: LinkedBroadcast | null;
  linkedChapter: NovelChapterData | null;
}

export default function ArticleFooter({
  article,
  featuredRelated,
  linkedBroadcast,
  linkedChapter,
}: ArticleFooterProps) {
  const continueTitle = linkedBroadcast?.title || 'Open the dialogue archive';
  const continueDescription =
    linkedBroadcast?.description ||
    'Every editorial lives beside a second field of thought. Move into the dialogues to see the argument answer back.';
  const continueHref = linkedBroadcast ? `/dialogues/${linkedBroadcast.slug}` : '/dialogues';
  const chapterHref = linkedChapter ? `/novel/${linkedChapter.slug}` : '/novel';

  return (
    <section className="mt-20 mb-16">
      <div className="mb-8 flex flex-col gap-4 border-t border-white/10 pt-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-label text-[10px] uppercase tracking-[0.35em] text-primary-container">
            Reader Continuation Protocol
          </p>
          <h2 className="serif-display mt-4 text-3xl text-white sm:text-4xl">
            One link should open the structure, not end it.
          </h2>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-zinc-400 sm:text-base">
          This piece is part of a larger system. Continue the same tension, branch to a related essay,
          or follow the feed so the next release finds you without another Reddit thread.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="overflow-hidden border border-white/10 bg-[linear-gradient(135deg,#140808_0%,#0f0f10_45%,#090909_100%)] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] lg:col-span-7">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-red-400/80">
            Continue The Same Tension
          </p>
          <h3 className="serif-display mt-5 text-3xl leading-tight text-white sm:text-4xl">
            {continueTitle}
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            {continueDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={continueHref}
              className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-5 py-3 font-label text-[10px] uppercase tracking-[0.3em] text-white transition-colors hover:border-red-400 hover:bg-red-500/20"
            >
              {linkedBroadcast ? 'Open Linked Dialogue' : 'Enter Dialogue Archive'}
              <ArrowRight size={14} />
            </Link>

            <Link
              href={chapterHref}
              className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 font-label text-[10px] uppercase tracking-[0.3em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              {linkedChapter ? `Jump To ${linkedChapter.title}` : 'Enter The Chronicle'}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            <span className="border border-white/10 px-3 py-2">{article.readingTime}</span>
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="border border-white/10 px-3 py-2">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:col-span-5">
          {featuredRelated && (
            <Link
              href={`/articles/${featuredRelated.slug}`}
              className="group border border-white/10 bg-zinc-950 p-7 transition-colors hover:border-white/25 hover:bg-zinc-900"
            >
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Read Next
              </p>
              <h3 className="serif-display mt-4 text-2xl leading-tight text-white transition-colors group-hover:text-primary">
                {featuredRelated.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {featuredRelated.description || featuredRelated.subtitle}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                <span>{featuredRelated.readingTime}</span>
                <span className="inline-flex items-center gap-2 text-zinc-200">
                  Open Essay <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          )}

          <a
            href="/feed.xml"
            className="group border border-white/10 bg-zinc-950 p-7 transition-colors hover:border-white/25 hover:bg-zinc-900"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Return Channel
              </p>
              <Rss size={18} className="text-zinc-500 transition-colors group-hover:text-white" />
            </div>
            <h3 className="serif-display mt-4 text-2xl leading-tight text-white">
              Follow every new essay, dialogue, and chapter by RSS.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              This is the lowest-friction way to turn one visit into a recurring relationship. Drop the
              feed into any reader and the archive becomes a habit instead of a lucky rediscovery.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              <span>/feed.xml</span>
              <span className="inline-flex items-center gap-2 text-zinc-200">
                Open Feed <ArrowRight size={14} />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
