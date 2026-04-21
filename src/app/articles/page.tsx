import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, BookOpenText, RadioTower, Rss } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { getArticles } from '@/lib/articles';
import { getAllBroadcasts } from '@/lib/mdx';
import { getNovelChapters } from '@/lib/novels';

const description =
  'Browse the editorial archive of essays, then move laterally into related dialogues and chapters.';

export const metadata: Metadata = {
  title: 'Essays',
  description,
  alternates: {
    canonical: '/articles',
  },
};

export default function ArticlesPage() {
  const articles = getArticles();

  if (articles.length === 0) {
    return (
      <div className="min-h-screen bg-background text-on-background flex items-center justify-center">
        No articles found.
      </div>
    );
  }

  const latestArticle = articles[0];
  const remainingArticles = articles.slice(1);
  const latestDialogue = getAllBroadcasts()[0] || null;
  const latestChapter = [...getNovelChapters()].reverse()[0] || null;

  return (
    <div className="bg-background text-on-background selection:bg-primary-container selection:text-white pb-20">
      <main className="mx-auto max-w-screen-2xl px-6 pt-28 sm:px-8 lg:px-12">
        <header className="grid gap-8 border-b border-white/10 pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-label text-[10px] uppercase tracking-[0.35em] text-primary-container">
              Editorial Archive // Reality A
            </p>
            <h1 className="serif-display mt-6 text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
              Essays for readers who arrived through one link and want the rest of the system.
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base lg:col-span-4 lg:justify-self-end">
            Start with an essay, branch into dialogues, then cross into the chronicle. The archive works
            best when the reader keeps moving.
          </p>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-12">
          <Link
            href={`/articles/${latestArticle.slug}`}
            className="group overflow-hidden border border-white/10 bg-surface-container-lowest lg:col-span-7"
          >
            <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
              {(latestArticle.imageWide || latestArticle.imageSquare) && (
                <Image
                  src={latestArticle.imageWide || latestArticle.imageSquare!}
                  alt={latestArticle.title}
                  fill
                  priority
                  className="object-cover brightness-75 transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
                />
              )}
            </div>
            <div className="p-8">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Start With The Latest Essay
              </p>
              <h2 className="serif-display mt-4 text-4xl leading-tight text-white sm:text-5xl">
                {latestArticle.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                {latestArticle.description || latestArticle.subtitle}
              </p>
              <div className="mt-6 flex items-center gap-4 font-label text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                <span>{latestArticle.readingTime}</span>
                <span className="inline-flex items-center gap-2 text-zinc-200">
                  Open Essay <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>

          <div className="grid gap-6 lg:col-span-5">
            {latestDialogue && (
              <Link
                href={`/dialogues/${latestDialogue.slug}`}
                className="group border border-white/10 bg-black p-7 transition-colors hover:border-white/25 hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Cross Into Dialogue
                  </p>
                  <RadioTower size={18} className="text-zinc-500 transition-colors group-hover:text-white" />
                </div>
                <h3 className="serif-display mt-4 text-2xl leading-tight text-white">
                  {latestDialogue.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {latestDialogue.description || 'The archive answers the essays with a second voice.'}
                </p>
              </Link>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <Link
                href={latestChapter ? `/novel/${latestChapter.slug}` : '/novel'}
                className="group border border-white/10 bg-black p-7 transition-colors hover:border-white/25 hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Chronicle
                  </p>
                  <BookOpenText size={18} className="text-zinc-500 transition-colors group-hover:text-white" />
                </div>
                <h3 className="serif-display mt-4 text-2xl leading-tight text-white">
                  {latestChapter ? latestChapter.title : 'Enter The Chronicle'}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Reality B extends the same concerns into narrative form.
                </p>
              </Link>

              <a
                href="/feed.xml"
                className="group border border-white/10 bg-black p-7 transition-colors hover:border-white/25 hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Follow
                  </p>
                  <Rss size={18} className="text-zinc-500 transition-colors group-hover:text-white" />
                </div>
                <h3 className="serif-display mt-4 text-2xl leading-tight text-white">
                  RSS Feed
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  Follow new essays, dialogues, and chapters without waiting for another social referral.
                </p>
              </a>
            </div>
          </div>
        </section>

        <section className="mt-20 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
          {remainingArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </section>

        <section className="mt-24 border border-white/10 bg-[linear-gradient(135deg,#0f0f10_0%,#171111_48%,#090909_100%)] p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-label text-[10px] uppercase tracking-[0.35em] text-primary-container">
                Return Mechanics
              </p>
              <h2 className="serif-display mt-5 text-3xl text-white sm:text-4xl lg:text-5xl">
                Do not leave your next visit to chance.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                If the work matters, make the return path explicit. The feed covers every release, and the
                archive lets you scan the whole editorial run in one pass.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-5 py-3 font-label text-[10px] uppercase tracking-[0.3em] text-white transition-colors hover:border-red-400 hover:bg-red-500/20"
              >
                Open RSS Feed
                <ArrowRight size={14} />
              </a>
              <Link
                href="/dialogues"
                className="inline-flex items-center gap-2 border border-white/10 px-5 py-3 font-label text-[10px] uppercase tracking-[0.3em] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Browse Dialogues
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-black/5 py-12 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
        &copy; {new Date().getFullYear()} Almost Another // Omniscient Protocol
      </footer>
    </div>
  );
}
