import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { format, parseISO } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';
import ArticleFooter from '@/components/article/ArticleFooter';
import ArticleEngagementTracker from '@/components/article/ArticleEngagementTracker';
import ReaderPathDock from '@/components/article/ReaderPathDock';
import { mdxComponents } from '@/components/MDXComponents';
import { getArticleBySlug, getArticles, getRelatedArticles } from '@/lib/articles';
import { getLinkedBroadcast } from '@/lib/mdx';
import { getNovelChapterBySlug } from '@/lib/novels';

export async function generateStaticParams() {
  const articles = getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) return { title: 'Article Not Found' };

  const baseUrl = 'https://almostanother.com';
  const url = `${baseUrl}/articles/${article.slug}`;
  const title = `${article.title} | Breaking The Paradigm`;
  const description = article.description || article.subtitle || 'Read the full article';
  const imagePath = article.ogImage || article.imageWide || article.imageSquare || '';
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function buildMetaPills(article: ReturnType<typeof getArticleBySlug>) {
  if (!article) return [];

  return [
    article.date,
    article.author,
    article.readingTime,
    ...article.tags.slice(0, 3),
  ].filter(Boolean);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) notFound();

  const relatedArticles = getRelatedArticles(article, 4);
  const featuredRelated = relatedArticles[0] || null;
  const exploreFurther = relatedArticles.slice(featuredRelated ? 1 : 0, 4);
  const linkedBroadcast = article.linked_broadcast ? getLinkedBroadcast(article.linked_broadcast) : null;
  const linkedChapter =
    linkedBroadcast?.target_chapter ? getNovelChapterBySlug(linkedBroadcast.target_chapter as string) : null;

  let formattedDate = article.date;
  try {
    if (article.date) formattedDate = format(parseISO(article.date), 'MMMM do, yyyy');
  } catch {
    formattedDate = article.date;
  }

  const guideLinks = [
    {
      href: '/articles',
      label: 'Archive',
      title: 'Read laterally across the essay archive.',
    },
    {
      href: linkedBroadcast ? `/dialogues/${linkedBroadcast.slug}` : '/dialogues',
      label: linkedBroadcast ? 'Attached Dialogue' : 'Dialogues',
      title: linkedBroadcast?.title || 'Open the parallel dialogue archive.',
    },
    {
      href: linkedChapter ? `/novel/${linkedChapter.slug}` : '/novel',
      label: linkedChapter ? 'Connected Chronicle' : 'Chronicle',
      title: linkedChapter?.title || 'Enter the narrative branch of the project.',
    },
  ];

  const dockTarget = linkedBroadcast
    ? {
        href: `/dialogues/${linkedBroadcast.slug}`,
        title: linkedBroadcast.title || 'Open the linked dialogue',
        description: 'This essay has a direct companion dialogue attached to it.',
      }
    : featuredRelated
      ? {
          href: `/articles/${featuredRelated.slug}`,
          title: featuredRelated.title,
          description: 'Stay inside the archive with a related essay instead of dropping out after one page.',
        }
      : {
          href: '/dialogues',
          title: 'Open the dialogue archive',
          description: 'Move laterally through the site instead of ending on a single editorial.',
        };

  const metaPills = buildMetaPills(article);

  return (
    <div className="relative min-h-screen bg-background pb-20">
      <ProgressBar />
      <ArticleEngagementTracker slug={article.slug} title={article.title} />
      <ReaderPathDock
        articleSlug={article.slug}
        href={dockTarget.href}
        title={dockTarget.title}
        description={dockTarget.description}
      />

      <div className="fixed left-8 top-8 z-40 hidden md:block">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-background/50 px-4 py-2 text-foreground/60 shadow-lg backdrop-blur-sm transition-colors hover:text-accent"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Articles</span>
        </Link>
      </div>

      <article className="w-full">
        {(article.imageWide || article.imageSquare) && (
          <div className="relative h-[60vh] max-h-[720px] min-h-[400px] w-full">
            {article.imageWide && (
              <Image
                src={article.imageWide}
                alt={article.title}
                fill
                sizes="100vw"
                className="hidden object-cover grayscale brightness-75 mix-blend-luminosity sm:block"
                priority
              />
            )}
            {article.imageSquare && (
              <Image
                src={article.imageSquare}
                alt={article.title}
                fill
                sizes="100vw"
                className="block object-cover grayscale brightness-75 mix-blend-luminosity sm:hidden"
                priority
              />
            )}
            <div className="absolute inset-0 h-full bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute bottom-0 left-0 z-10 w-full p-6 md:p-12 lg:px-0">
              <div className="container mx-auto max-w-4xl">
                <div className="mb-5 flex flex-wrap gap-2">
                  {metaPills.map((pill, index) => (
                    <span
                      key={`${pill}-${index}`}
                      className="border border-white/10 bg-black/30 px-3 py-2 font-label text-[10px] uppercase tracking-[0.28em] text-zinc-300 backdrop-blur-sm"
                    >
                      {pill === article.date ? formattedDate : pill}
                    </span>
                  ))}
                </div>
                <h1 className="font-serif text-4xl font-black leading-tight text-white drop-shadow-lg md:text-6xl">
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p className="mt-5 max-w-2xl text-xl text-zinc-300 drop-shadow-md md:text-2xl">
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="container relative z-20 mx-auto mt-12 max-w-4xl px-6">
          <div className="absolute top-0 hidden h-full md:block md:-left-12 lg:-left-20 xl:-left-24">
            <ShareButtons
              title={article.title}
              isDesktop={true}
              className="sticky top-1/3 flex w-12 flex-col items-center gap-6 border-l border-white/10 py-4"
            />
          </div>

          {(!article.imageWide && !article.imageSquare) && (
            <header className="mt-12 mb-12">
              <div className="mb-5 flex flex-wrap gap-2">
                {metaPills.map((pill, index) => (
                  <span
                    key={`${pill}-${index}`}
                    className="border border-white/10 px-3 py-2 font-label text-[10px] uppercase tracking-[0.28em] text-zinc-400"
                  >
                    {pill === article.date ? formattedDate : pill}
                  </span>
                ))}
              </div>
              <h1 className="font-serif text-4xl font-black leading-tight tracking-tighter text-white md:text-6xl">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="mt-5 max-w-2xl text-xl text-zinc-400 md:text-2xl">{article.subtitle}</p>
              )}
            </header>
          )}

          <section className="mb-12 grid gap-3 border border-white/10 bg-zinc-950/60 p-4 sm:grid-cols-3 sm:p-5">
            {guideLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group border border-white/10 p-4 transition-colors hover:border-white/25 hover:bg-white/[0.03]"
              >
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-zinc-500">{link.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-200">{link.title}</p>
              </Link>
            ))}
          </section>

          <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-sans">
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>

          <ShareButtons
            title={article.title}
            isDesktop={false}
            className="mt-16 flex items-center justify-center gap-6 border-t border-outline-variant/20 pt-8 md:hidden"
          />

          <ArticleFooter
            article={article}
            featuredRelated={featuredRelated}
            linkedBroadcast={linkedBroadcast}
            linkedChapter={linkedChapter}
          />

          <section className="mx-auto my-16 max-w-4xl rounded-2xl border border-white/5 bg-[#1A1A1A] p-8 shadow-2xl sm:p-10">
            <h3 className="font-serif text-2xl text-white sm:text-3xl">Support Independent Thought</h3>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400 font-sans">
              If this essay challenged your perspective or gave you pause, support the continued production
              of work that stays open, direct, and outside platform logic.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://Ko-fi.com/almostanotheruniverse30822"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 font-medium text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20"
              >
                Support the Project
              </a>
              <a
                href="https://paypal.me/BreakingTheParadigm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-[#0079C1]/30 bg-[#00457C]/10 px-6 py-3 font-medium text-[#0079C1] transition-all duration-300 hover:bg-[#00457C] hover:text-white"
              >
                PayPal
              </a>
            </div>
          </section>
        </div>
      </article>

      {exploreFurther.length > 0 && (
        <section className="container relative z-20 mx-auto mt-10 max-w-screen-2xl px-6">
          <header className="mb-12 border-l-4 border-primary-container pl-8">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary-container">
              Correlated Editorials
            </p>
            <h2 className="serif-display mt-4 text-4xl font-black leading-none text-white md:text-5xl">
              Explore Further
            </h2>
          </header>
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
            {exploreFurther.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}

      <div className="container mx-auto mt-16 block px-6 md:hidden">
        <Link href="/articles" className="inline-flex items-center gap-2 text-zinc-500 transition-colors hover:text-primary">
          <ArrowLeft size={18} />
          <span className="font-sans text-sm font-medium uppercase tracking-wider">Back to Articles</span>
        </Link>
      </div>
    </div>
  );
}
