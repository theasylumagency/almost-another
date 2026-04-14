import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getNovelChapterBySlug, getNovelChapters } from '@/lib/novels';
import { getLinkedBroadcast } from '@/lib/articles';
import { mdxComponents } from '@/components/MDXComponents';
import NovelClientWrapper from './NovelClientWrapper';
import Link from 'next/link';
import Image from 'next/image';
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

  const imagePath = chapter.ogImage || chapter.coverImage || '';
  const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/novel_images/archive/${imagePath.replace(/^\//, '')}`}`) : '';

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

  const prevChapter = allChapters.find(c => c.chapterNumber === chapter.chapterNumber - 1);
  const nextChapter = allChapters.find(c => c.chapterNumber === chapter.chapterNumber + 1);
  const novelMdxComponents = {
    ...mdxComponents,
    SketchImage: () => (
      <div className="w-full my-12 relative bg-zinc-950 border border-white/10 p-3 shadow-2xl">
        <div className="border border-white/5 relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={`/novel_images/sketch/${chapter.coverImage}`}
            alt={`Sketch for ${chapter.title}`}
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
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

        <div className="absolute top-0 -left-6 md:-left-12 lg:-left-16 xl:-left-24 h-full hidden md:block">
          <ShareButtons title={`Chapter ${chapter.chapterNumber}: ${chapter.title}`} description={chapter.description} isDesktop={true} className="sticky top-32 flex flex-col items-center gap-6 py-4 w-12 border-l border-white/10" />
        </div>

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

        {/* Mobile Dossier */}
        <div className="xl:hidden mt-16 border border-white/10 bg-zinc-950/50 p-6 sm:p-8 flex flex-col gap-12 relative z-20 shadow-xl">
          {/* Archive Block */}
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6 border-b border-white/10 pb-3">
              Security Prefecture Archive
            </span>
            <div className="bg-zinc-900 border border-white/5 relative p-2 shadow-xl">
              <Image
                src={`/novel_images/archive/${chapter.coverImage}`}
                alt="Decrypted Archive"
                width={1200}
                height={630}
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
                  href={`/dialogues/${linkedBroadcast.slug}`}
                  className="inline-flex font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors mt-4"
                >
                  [ DECRYPT AUDIO ]
                </Link>
              </div>
            </div>
          )}
        </div>

        <ShareButtons title={`Chapter ${chapter.chapterNumber}: ${chapter.title}`} description={chapter.description} isDesktop={false} className="md:hidden flex items-center justify-center gap-6 mt-16 mb-8 border-t border-white/10 pt-8 w-full relative z-20" />

        {/* End of chapter marker & Navigation (ჩამოვიდა სულ ბოლოში) */}
        <div className="mt-20 border-t border-white/10 pt-12 flex flex-col items-center justify-center w-full relative z-20">

          {/* ვიზუალური ინდიკატორი */}
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mb-6 border border-red-900 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>

          <p className="font-mono text-xs text-[#A3B1A9] uppercase tracking-widest text-center mb-12">
            End of Chapter {String(chapter.chapterNumber).padStart(2, '0')}
            {!nextChapter && (
              <>
                <br /><br />
                <span className="text-red-500/70 mt-4 block">Awaiting further transmission...</span>
              </>
            )}
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* წინა თავის ღილაკი */}
            {prevChapter ? (
              <Link
                href={`/novel/${prevChapter.slug}`}
                className="group p-5 border border-white/5 bg-[#111915]/50 hover:bg-[#111915] hover:border-[#2D3A33] transition-all flex flex-col items-start relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-[#2D3A33] transition-colors"></div>
                <span className="font-mono text-[10px] text-zinc-500 mb-3 uppercase tracking-widest pl-3">
                  [ Access Previous ]
                </span>
                <span className="font-serif text-lg text-zinc-400 group-hover:text-white transition-colors pl-3">
                  CH.{String(prevChapter.chapterNumber).padStart(2, '0')} — {prevChapter.title}
                </span>
              </Link>
            ) : <div className="hidden md:block"></div>}

            {/* შემდეგი თავის ღილაკი */}
            {nextChapter ? (
              <Link
                href={`/novel/${nextChapter.slug}`}
                className="group p-5 border border-[#2D3A33]/50 bg-[#1A2520]/30 hover:bg-[#1A2520] hover:border-red-900 transition-all flex flex-col items-end text-right relative overflow-hidden"
              >
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-900/30 group-hover:bg-red-600 transition-colors"></div>
                <span className="font-mono text-[10px] text-accent/70 mb-3 uppercase tracking-widest pr-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                  [ Decrypt Next Record ]
                </span>
                <span className="font-serif text-lg text-white group-hover:text-accent transition-colors pr-3">
                  CH.{String(nextChapter.chapterNumber).padStart(2, '0')} — {nextChapter.title}
                </span>
              </Link>
            ) : <div className="hidden md:block"></div>}
          </div>
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
              <Image
                src={`/novel_images/archive/${chapter.coverImage}`}
                alt="Decrypted Archive"
                width={1200}
                height={630}
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
                  href={`/dialogues/${linkedBroadcast.slug}`}
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
