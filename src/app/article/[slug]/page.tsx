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

  if (!article) {
    return {
      title: 'Article Not Found | THE BRUTALIST SCHOLAR',
    };
  }

  // Using a placeholder URL for the base domain, in production this should ideally be process.env.NEXT_PUBLIC_SITE_URL or similar
  const baseUrl = 'https://almost-another-articles.com';
  const url = `${baseUrl}/article/${article.slug}`;
  const title = `${article.title} | THE BRUTALIST SCHOLAR`;
  const description = article.description || article.subtitle || 'Read the full article';

  // Make image URLs absolute if they are relative paths
  const imagePath = article.imageWide || article.imageSquare || '';
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: article.title }] : [],
      publishedTime: article.date,
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

  if (!article) {
    notFound();
  }

  // Get similar articles (excluding current one)
  const allArticles = getArticles();
  const similarArticles = allArticles.filter(a => a.slug !== article.slug).slice(0, 3);

  let formattedDate = article.date;
  try {
    if (article.date) {
      formattedDate = format(parseISO(article.date), 'MMMM do, yyyy');
    }
  } catch (e) {
    // fallback to original date if parsing fails
  }

  // Extract frontmatter for ArticleFooter
  let frontmatter: any = {};
  let linkedBroadcast = null;
  try {
    const fullPath = path.join(process.cwd(), 'src/app/content', `${resolvedParams.slug}.mdx`);
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

      {/* Top back button */}
      <div className="fixed top-8 left-8 z-40 hidden md:block">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 shadow-lg">
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Back to Articles</span>
        </Link>
      </div>

      <article className="w-full">
        {(article.imageWide || article.imageSquare) && (
          <div className="relative w-full h-[60vh] min-h-[400px] max-h-[700px]">
            {article.imageWide && (
              <Image
                src={article.imageWide}
                alt={article.title}
                fill
                sizes="100vw"
                className="hidden sm:block object-cover grayscale brightness-75 mix-blend-luminosity"
                priority
              />
            )}
            {article.imageSquare && (
              <Image
                src={article.imageSquare}
                alt={article.title}
                fill
                sizes="100vw"
                className="block sm:hidden object-cover grayscale brightness-75 mix-blend-luminosity"
                priority
              />
            )}
            {/* Fade Gradient from Image to Background */}
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
          {/* Social Sharing (Desktop) - Adjusted closer to text */}
          <div className="absolute top-0 -left-6 md:-left-12 lg:-left-20 xl:-left-24 h-full hidden md:block">
            <ShareButtons title={article.title} isDesktop={true} className="sticky top-1/3 flex flex-col items-center gap-6 py-4 w-12 border-l border-white/10" />
          </div>

          {(!article.imageWide && !article.imageSquare) && (
            <header className="mb-12">
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

          {/* დინამიური დასასრული (Related ლოგიკით და AABC შოკით) */}
          <ArticleFooter frontmatter={frontmatter} linkedBroadcast={linkedBroadcast} />

          {/* Social Sharing (Mobile) */}
          <ShareButtons title={article.title} isDesktop={false} className="md:hidden flex items-center justify-center gap-6 mt-16 border-t border-outline-variant/20 pt-8" />

          {/* Donation / Support block */}
          <section className="max-w-3xl mx-auto my-16 p-8 sm:p-10 bg-[#1A1A1A] rounded-2xl border border-white/5 shadow-2xl relative z-20">
            {/* სათაური */}
            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4">
              Support Independent Thought
            </h3>

            {/* "Value-for-Value" ტექსტი */}
            <p className="text-zinc-400 mb-8 text-lg leading-relaxed font-sans">
              If this chapter challenged your perspective or gave you pause, consider supporting the continued exploration of these ideas. No paywalls, no expected returns—just a pure exchange of value.
            </p>

            {/* ღილაკების კონტეინერი */}
            <div className="flex flex-wrap gap-4">

              {/* 1. Buy Me a Coffee (ბარათები, Apple Pay) */}
              <a
                href="https://Ko-fi.com/almostanotheruniverse30822"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-500/30 hover:shadow-lg hover:shadow-red-500/20 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Support the Project
              </a>

              {/* 2. PayPal */}
              <a
                href="https://paypal.me/BreakingTheParadigm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00457C]/10 text-[#0079C1] hover:bg-[#00457C] hover:text-white rounded-xl transition-all duration-300 border border-[#0079C1]/30 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zM8.215 2.667L6.29 14.816h3.382c3.923 0 6.277-1.334 7.188-4.53.6-2.1.202-3.148-1.151-4.14-1.265-.928-3.08-1.5-6.065-1.5H8.215z" /><path d="M21.531 16.326v-.002c-.12.429-.283.834-.486 1.209a7.614 7.614 0 0 1-1.2 1.637 5.86 5.86 0 0 1-1.789 1.272 5.01 5.01 0 0 1-2.115.467h-3.414c-.43 0-.797.31-.861.737l-.988 6.27-.058.38a.526.526 0 0 0 .52.604h3.766c.43 0 .798-.31.86-.736l.942-5.992h.85c3.085 0 5.613-1.026 6.32-4.045.247-.79.314-1.57.243-2.31z" />
                </svg>
                PayPal
              </a>

              {/* 3. Crypto */}
              <button
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-300 border border-white/10 font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm2.257-17.75c-.328-.15-1.282-.54-3.058-.691L10.375 2.37H8.818l.8 3.142c-2.484.288-3.32 1.353-3.32 1.353v1.856s.624-.316 1.378-.291c.712.023 1.298.502 1.375.589l1.464 6.002H8.387l-.768-3.267s-.608-.186-1.517.06l-.608.972s.536 1.096 1.012 1.26v4.611h1.554l.805-3.336c.642.137 1.3.208 1.956.2v3.136h1.565l.775-3.235c3.557-.594 5.253-2.924 5.253-5.26 0-3.135-2.028-4.108-4.16-4.912z" />
                </svg>
                Crypto
              </button>

            </div>
          </section>
        </div>
      </article>

      {/* Similar articles (Read Next) */}
      {similarArticles.length > 0 && (
        <section className="container mx-auto px-6 max-w-screen-2xl mt-32">
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

      {/* Mobile back button moved below similar articles */}
      <div className="block md:hidden container mx-auto px-6 mt-16">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors">
          <ArrowLeft size={18} />
          <span className="font-medium font-sans text-sm tracking-wider uppercase">Back to Articles</span>
        </Link>
      </div>
    </div>
  );
}