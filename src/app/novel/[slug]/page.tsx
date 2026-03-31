import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getNovelChapterBySlug, getNovelChapters } from '@/lib/novels';
import ProgressBar from '@/components/ProgressBar';
import { mdxComponents } from '@/components/MDXComponents';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import ShareButtons from '@/components/ShareButtons';

export async function generateStaticParams() {
  const chapters = getNovelChapters();
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const chapter = getNovelChapterBySlug(resolvedParams.slug);

  if (!chapter) {
    return {
      title: 'Chapter Not Found | Breaking the Paradigm',
    };
  }

  const baseUrl = 'https://almost-another-articles.com';
  const url = `${baseUrl}/novel/${chapter.slug}`;
  const title = `Chapter ${chapter.chapterNumber}: ${chapter.title} | ${chapter.bookTitle}`;
  const description = chapter.description || 'Read the chapter.';
  
  const imagePath = chapter.coverImage || '';
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}/${imagePath.replace(/^\//, '')}`) : '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
      authors: [chapter.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function NovelChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const chapter = getNovelChapterBySlug(resolvedParams.slug);

  if (!chapter) {
    notFound();
  }

  const allChapters = getNovelChapters();
  const currentIndex = allChapters.findIndex(c => c.slug === chapter.slug);
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background relative pb-20 novel-theme">
      <ProgressBar />

      {/* Top back button */}
      <div className="fixed top-8 left-8 z-40 hidden md:block">
        <Link href="/novel" className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 shadow-lg">
          <BookOpen size={18} />
          <span className="font-medium text-sm">Index Arcana</span>
        </Link>
      </div>

      <article className="w-full pt-32">
        <div className="container mx-auto px-6 max-w-3xl relative z-20">
          
          <header className="mb-24 text-center border-b border-outline-variant/20 pb-16">
            <span className="block font-label text-xs tracking-[0.3em] text-accent uppercase mb-6">
              {chapter.bookTitle}
            </span>
            <h1 className="serif-display text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              Chapter {chapter.chapterNumber}
            </h1>
            <h2 className="text-2xl md:text-3xl text-zinc-400 font-serif italic mb-10">
              {chapter.title}
            </h2>
            <div className="w-12 h-[1px] bg-accent mx-auto"></div>
          </header>

          {/* Social Sharing (Desktop) */}
          <div className="absolute top-0 -left-6 md:-left-12 lg:-left-20 xl:-left-24 h-full hidden md:block mt-32">
            <ShareButtons title={`Chapter ${chapter.chapterNumber}: ${chapter.title}`} isDesktop={true} className="sticky top-1/3 flex flex-col items-center gap-6 py-4 w-12 border-l border-white/10" />
          </div>

          <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-300 font-serif leading-relaxed tracking-wide novel-content">
            <MDXRemote source={chapter.content} components={mdxComponents} />
          </div>

          {/* Social Sharing (Mobile) */}
          <ShareButtons title={`Chapter ${chapter.chapterNumber}: ${chapter.title}`} isDesktop={false} className="md:hidden flex items-center justify-center gap-6 mt-24 border-t border-outline-variant/20 pt-8" />

          {/* Chapter Navigation Support block */}
          <nav className="mt-32 pt-12 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-8">
            {prevChapter ? (
              <Link href={`/novel/${prevChapter.slug}`} className="group flex flex-col items-start w-full sm:w-1/2 p-6 border border-white/5 hover:border-accent/50 bg-surface-container-lowest transition-all">
                <span className="font-label text-xs uppercase tracking-[0.2em] text-zinc-500 group-hover:text-accent mb-2 flex items-center gap-2">
                  <ArrowLeft size={14} /> Previous
                </span>
                <span className="serif-display text-xl text-white font-bold block truncate w-full">Chapter {prevChapter.chapterNumber}</span>
              </Link>
            ) : <div className="hidden sm:block w-1/2"></div>}
            
            {nextChapter ? (
              <Link href={`/novel/${nextChapter.slug}`} className="group flex flex-col items-end text-right w-full sm:w-1/2 p-6 border border-white/5 hover:border-accent/50 bg-surface-container-lowest transition-all">
                <span className="font-label text-xs uppercase tracking-[0.2em] text-zinc-500 group-hover:text-accent mb-2 flex items-center gap-2">
                  Next <ArrowRight size={14} />
                </span>
                <span className="serif-display text-xl text-white font-bold block truncate w-full">Chapter {nextChapter.chapterNumber}</span>
              </Link>
            ) : (
                <div className="w-full sm:w-1/2 p-6 border border-white/5 bg-surface-container-lowest text-right">
                    <span className="font-label text-xs uppercase tracking-[0.2em] text-zinc-600 block mb-2">To be continued...</span>
                    <span className="serif-display text-xl text-zinc-500 font-bold block">More chapters coming</span>
                </div>
            )}
          </nav>
        </div>
      </article>

      {/* Mobile back button moved below similar articles */}
      <div className="block md:hidden container mx-auto px-6 mt-16 text-center">
        <Link href="/novel" className="inline-flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors">
          <BookOpen size={18} />
          <span className="font-medium font-sans text-sm tracking-wider uppercase">Index Arcana</span>
        </Link>
      </div>
    </div>
  );
}
