import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getArticles } from '@/lib/articles';
import ProgressBar from '@/components/ProgressBar';
import { mdxComponents } from '@/components/MDXComponents';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';
import ArticleCard from '@/components/ArticleCard';
import { getLinkedBroadcast } from '@/lib/mdx';
import ArticleFooter from '@/components/article/ArticleFooter';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) notFound();

  const allArticles = getArticles();
  const similarArticles = allArticles.filter(a => a.slug !== article.slug).slice(0, 3);

  let formattedDate = article.date;
  try {
    if (article.date) formattedDate = format(parseISO(article.date), 'MMMM do, yyyy');
  } catch (e) { }

  // Frontmatter-ის ამოკითხვა AABC ფუტერისთვის
  let frontmatter: any = {};
  let linkedBroadcast = null;

  try {
    const fullPath = path.join(process.cwd(), 'src', 'content', 'editorials', `${resolvedParams.slug}.mdx`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      frontmatter = matterResult.data;

      if (frontmatter.linked_broadcast) {
        linkedBroadcast = getLinkedBroadcast(frontmatter.linked_broadcast);
      }
    }
  } catch (e) {
    console.error("Error parsing frontmatter:", e);
  }

  return (
    <div className="min-h-screen bg-background relative pb-20">
      <ProgressBar />

      <div className="fixed top-8 left-8 z-40 hidden md:block">
        <Link href="/articles" className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 shadow-lg">
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Back to Articles</span>
        </Link>
      </div>

      <article className="w-full">
        {(article.imageWide || article.imageSquare) && (
          <div className="relative w-full h-[60vh] min-h-[400px] max-h-[700px]">
            {article.imageWide && (
              <Image src={article.imageWide} alt={article.title} fill sizes="100vw" className="hidden sm:block object-cover grayscale brightness-75 mix-blend-luminosity" priority />
            )}
            {article.imageSquare && (
              <Image src={article.imageSquare} alt={article.title} fill sizes="100vw" className="block sm:hidden object-cover grayscale brightness-75 mix-blend-luminosity" priority />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent bottom-0 h-full" />
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:px-0 z-10">
              <div className="container mx-auto max-w-3xl">
                <time dateTime={article.date} className="block font-label text-[10px] text-accent tracking-widest text-primary-container uppercase mb-4">
                  {formattedDate} • {article.author}
                </time>
                <h1 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight mb-4 drop-shadow-lg">
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p className="text-xl md:text-2xl text-zinc-400 font-sans max-w-2xl drop-shadow-md">
                    {article.subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-6 max-w-3xl mt-12 relative z-20">
          <div className="absolute top-0 -left-6 md:-left-12 lg:-left-20 xl:-left-24 h-full hidden md:block">
            <ShareButtons title={article.title} isDesktop={true} className="sticky top-1/3 flex flex-col items-center gap-6 py-4 w-12 border-l border-white/10" />
          </div>

          {(!article.imageWide && !article.imageSquare) && (
            <header className="mb-12 mt-12">
              <time dateTime={article.date} className="block font-label text-[10px] text-accent tracking-widest text-primary-container uppercase mb-4">
                {formattedDate} • {article.author}
              </time>
              <h1 className="text-4xl md:text-6xl font-serif font-black text-white leading-tight mb-4 tracking-tighter">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="text-xl md:text-2xl text-zinc-400 font-sans max-w-2xl">
                  {article.subtitle}
                </p>
              )}
            </header>
          )}

          <div className="prose prose-invert prose-lg max-w-none text-zinc-300 font-sans">
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>

          <ShareButtons title={article.title} isDesktop={false} className="md:hidden flex items-center justify-center gap-6 mt-16 border-t border-outline-variant/20 pt-8" />

          {/* Donation / Support block */}
          <section className="max-w-3xl mx-auto my-16 p-8 sm:p-10 bg-[#1A1A1A] rounded-2xl border border-white/5 shadow-2xl relative z-20">
            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4">Support Independent Thought</h3>
            <p className="text-zinc-400 mb-8 text-lg leading-relaxed font-sans">
              If this chapter challenged your perspective or gave you pause, consider supporting the continued exploration of these ideas. No paywalls, no expected returns—just a pure exchange of value.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://Ko-fi.com/almostanotheruniverse30822" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 font-medium">
                Support the Project
              </a>
              <a href="https://paypal.me/BreakingTheParadigm" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00457C]/10 text-[#0079C1] hover:bg-[#00457C] hover:text-white rounded-xl transition-all duration-300 border border-[#0079C1]/30 font-medium">
                PayPal
              </a>
            </div>
          </section>

          <ArticleFooter frontmatter={frontmatter} linkedBroadcast={linkedBroadcast} />

        </div>
      </article>

      {/* Similar articles (Read Next) */}
      {similarArticles.length > 0 && (
        <section className="container mx-auto px-6 max-w-screen-2xl mt-16 relative z-20">
          <header className="mb-12 border-l-4 border-primary-container pl-8">
            <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container mb-4">SYSTEM_STATUS: CORRELATED_DATA // LOG_TRANSCRIPT_ID: 883</p>
            <h2 className="serif-display text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">
              Explore Further
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {similarArticles.map((simArticle) => (
              <ArticleCard key={simArticle.slug} article={simArticle} />
            ))}
          </div>
        </section>
      )}

      <div className="block md:hidden container mx-auto px-6 mt-16">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors">
          <ArrowLeft size={18} />
          <span className="font-medium font-sans text-sm tracking-wider uppercase">Back to Articles</span>
        </Link>
      </div>
    </div>
  );
}
