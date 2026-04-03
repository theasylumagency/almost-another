import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getNovelChapterBySlug, getNovelChapters } from '@/lib/novels';
import { getLinkedBroadcast } from '@/lib/articles';
import { mdxComponents } from '@/components/MDXComponents';
import NovelClientWrapper from './NovelClientWrapper';
import Link from 'next/link';

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
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}/novel_images/archive/${imagePath.replace(/^\//, '')}`) : '';

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
  const linkedBroadcast = chapter.linked_broadcast ? getLinkedBroadcast(chapter.linked_broadcast as string) : null;

  // Custom MDX Components for this specific page injection
  const novelMdxComponents = {
    ...mdxComponents,
    SketchImage: () => (
      <div className="w-full my-12 relative bg-zinc-950 border border-white/10 p-3 shadow-2xl">
        <div className="border border-white/5 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={`/novel_images/sketch/${chapter.coverImage}`} 
            alt={`Sketch for ${chapter.title}`} 
            className="w-full h-auto object-cover opacity-90 transition-opacity hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal"
          />
          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-400 border border-white/10">
            FIELD SKETCH // REF: {chapter.chapterNumber}
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative md:ml-[50px] flex flex-col xl:flex-row pb-24 md:pb-0">
      <NovelClientWrapper 
        slug={chapter.slug} 
        chapters={allChapters}
        currentChapter={chapter.chapterNumber}
      />

      {/* Main Reading Column */}
      <article className="flex-1 w-full max-w-3xl mx-auto px-6 pt-24 md:pt-32 pb-32 relative z-20 xl:mx-auto">
        
        <header className="mb-24 text-center md:text-left border-b border-white/10 pb-16">
          <span className="block font-mono text-[10px] tracking-widest text-accent uppercase mb-6">
            LOG_TRANSCRIPT_ID: 1791 // {chapter.bookTitle}
          </span>
          <h1 className="serif-display text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Chapter {String(chapter.chapterNumber).padStart(2, '0')}
          </h1>
          <h2 className="text-2xl md:text-3xl text-zinc-400 font-serif italic mb-10">
            {chapter.title}
          </h2>
          <div className="w-12 h-[1px] bg-accent mx-auto md:mx-0"></div>
        </header>

        <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-300 font-serif leading-relaxed tracking-wide novel-content relative">
          <MDXRemote source={chapter.content} components={novelMdxComponents} />
        </div>

        {/* End of chapter marker */}
        <div className="mt-24 border-t border-white/10 pt-12 flex flex-col items-center justify-center">
           <div className="w-2 h-2 bg-accent rounded-full animate-pulse mb-8"></div>
           <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest text-center">
             End of Chapter {String(chapter.chapterNumber).padStart(2, '0')}
             <br/>
             Awaiting further transmission...
           </p>
        </div>

        {/* Mobile Dossier (displays below text when xl sidebar is hidden) */}
        <div className="xl:hidden mt-24 border border-white/10 bg-zinc-950/50 p-6 sm:p-8 flex flex-col gap-12">
          {/* Archive Block */}
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/10 pb-3">
              Security Prefecture Archive
            </span>
            <div className="bg-zinc-900 border border-white/5 relative p-2 shadow-xl">
               <img 
                 src={`/novel_images/archive/${chapter.coverImage}`} 
                 alt="Decrypted Archive"
                 className="w-full h-auto object-contain border border-white/5 opacity-80"
               />
               <div className="absolute top-4 right-4 bg-black/60 px-2 py-1 font-mono text-[9px] text-red-500 uppercase tracking-widest border border-red-500/30">
                 RESTRICTED LEVEL 5
               </div>
            </div>
          </div>

          {/* Intercept Relay Block */}
          {linkedBroadcast && (
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/10 pb-3">
                Interceptor Relay // Attached Audio
              </span>
              <div className="bg-zinc-900 border border-white/5 p-6 hover:border-accent transition-colors relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-full h-[2px] bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                 <h3 className="serif-display text-xl text-white font-bold mb-3">{linkedBroadcast.title as string}</h3>
                 {linkedBroadcast.author && (
                   <p className="text-zinc-500 font-mono text-xs uppercase mb-4">Voice: {linkedBroadcast.author as string}</p>
                 )}
                 <Link 
                   href={`/aabc/${linkedBroadcast.slug}`}
                   className="inline-flex font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors mt-4"
                 >
                   [ DECRYPT AUDIO ]
                 </Link>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Right Sidebar Dossier (Desktop XL Only) */}
      <aside className="hidden xl:block w-[400px] 2xl:w-[450px] border-l border-white/10 bg-zinc-950/50 relative shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto p-8 pt-32 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col gap-16">
          
          {/* Archive Block */}
          <div className="group">
            <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/10 pb-4">
              Security Prefecture Archive
            </span>
            <div className="bg-zinc-900 border border-white/5 relative p-2 shadow-2xl transition-transform group-hover:scale-[1.02]">
               <img 
                 src={`/novel_images/archive/${chapter.coverImage}`} 
                 alt="Decrypted Archive"
                 className="w-full h-auto object-contain border border-white/5 opacity-80 group-hover:opacity-100 transition-opacity"
               />
               <div className="absolute top-4 right-4 bg-black/80 px-2 py-1 font-mono text-[9px] text-red-500 uppercase tracking-widest border border-red-500/30">
                 RESTRICTED LEVEL 5
               </div>
            </div>
          </div>

          {/* Intercept Relay Block */}
          {linkedBroadcast && (
            <div className="group">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/10 pb-4">
                Interceptor Relay // Attached Audio
              </span>
              <div className="bg-zinc-900 border border-white/5 p-6 hover:border-accent transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-[2px] bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <h3 className="serif-display text-xl text-white font-bold mb-3">{linkedBroadcast.title as string}</h3>
                {linkedBroadcast.author && (
                  <p className="text-zinc-500 font-mono text-xs uppercase mb-4">Voice: {linkedBroadcast.author as string}</p>
                )}
                {linkedBroadcast.description && (
                  <p className="text-sm text-zinc-400 font-sans leading-relaxed mb-6 line-clamp-4">
                    {linkedBroadcast.description as string}
                  </p>
                )}
                <Link 
                  href={`/aabc/${linkedBroadcast.slug}`}
                  className="inline-flex font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors"
                >
                  [ DECRYPT AUDIO ]
                </Link>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
