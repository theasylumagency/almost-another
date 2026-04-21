import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticles } from '@/lib/articles';
import { getAllBroadcasts } from '@/lib/mdx';
import { getNovelChapters } from '@/lib/novels';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE_DESCRIPTION } from '@/lib/site';

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
};

const ROUTES = {
  essays: '/articles',
  dialogues: '/dialogues',
  novel: '/novel',
};

export default async function Home() {
  const articles = getArticles();
  const featuredArticle = articles.length > 0 ? articles[0] : null;

  const broadcasts = getAllBroadcasts() as any[];
  const featuredDialogue = broadcasts.find(b => b.research_reality === "B") || broadcasts[0] || null;
  const articleDialogue = featuredArticle?.linked_broadcast 
    ? broadcasts.find(b => b.slug === featuredArticle.linked_broadcast) 
    : null;

  const chapters = getNovelChapters();
  const linkedChapter = chapters.length > 0 ? chapters[chapters.length - 1] : null;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-red-900 selection:text-white relative overflow-hidden flex flex-col">
      {/* THE STRANGE ELEMENT - Elitist Neo-Modern touch */}
      <div className="fixed right-0 top-0 h-screen w-12 hidden xl:flex flex-col items-center justify-center z-50 pointer-events-none mix-blend-difference border-l border-white/5">
        <span
          className="font-mono text-[9px] tracking-[0.4em] text-zinc-500 uppercase rotate-180 opacity-70"
          style={{ writingMode: 'vertical-rl' }}
        >
          OMNISCIENT PROTOCOL // AABC INTERCEPT ACTIVE
        </span>
      </div>

      <div className="mx-auto w-full max-w-[1800px] px-6 sm:px-12 lg:px-24 xl:pr-36 pb-32 flex flex-col gap-24 lg:gap-32 relative z-10">

        {/* TOP BRANDING / INSCRIPTION */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-12 w-full gap-8">
          <div className="flex flex-col gap-8">
            <Image
              src="/logo_dark.svg"
              alt="Almost Another Brand Logo"
              width={240}
              height={60}
              className="opacity-90"
              priority
            />
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-500 leading-loose">
              Almost Another Broadcasting Company <br />
              <span className="text-red-700/80 block mt-1">Meta-Dimension Intercept Hub</span>
            </div>
          </div>

          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 text-left lg:text-right flex flex-col gap-2 lg:items-end">
            <span>SYS_STATUS: SECURE_LINK</span>
            <span>PROTOCOL: AABC // ONLINE</span>
            <span className="flex items-center gap-3 text-zinc-300 mt-2">
              REALITY_SYNC
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#ff0000]"></span>
            </span>
          </div>
        </header>

        {/* BLOCK 1: ESSAYS (Reality A) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">

          <div className="lg:col-span-8 flex flex-col group relative">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                Reality A <span className="mx-2 text-zinc-700">|</span> Primary Signal
              </span>
            </div>

            {featuredArticle ? (
              <Link href={`/articles/${featuredArticle.slug}`} className="block relative outline outline-1 outline-white/10 hover:outline-white/40 transition-all duration-700 bg-black group-hover:shadow-[0_0_50px_rgba(255,255,255,0.03)] cursor-pointer">
                {(featuredArticle.imageSquare || featuredArticle.imageWide) && (
                  <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden border-b border-white/10">
                    <Image
                      src={featuredArticle.imageWide || featuredArticle.imageSquare || ''}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-1000 origin-center opacity-80 group-hover:opacity-100"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 opacity-80 group-hover:opacity-40 transition-opacity duration-1000"></div>
                  </div>
                )}

                <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6 flex justify-between items-center">
                    <span>{new Date(featuredArticle.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span>
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 text-white" />
                  </div>

                  <h1 className="serif-display text-4xl sm:text-5xl lg:text-7xl leading-[0.9] text-white tracking-tight mb-8">
                    {featuredArticle.title}
                  </h1>

                  <p className="max-w-2xl text-sm lg:text-base leading-relaxed text-zinc-400 font-sans font-light">
                    {featuredArticle.description}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="h-64 border border-white/10 flex items-center justify-center bg-black">
                <span className="font-mono text-zinc-600 text-xs tracking-widest uppercase">Awaiting Transmission</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 lg:pl-8 lg:pt-32 flex flex-col gap-12 lg:border-l border-white/10">
            <div>
              <p className="font-serif italic text-2xl lg:text-3xl text-zinc-300 leading-snug">
                "This essay does not stand alone."
              </p>
              <div className="h-px w-12 bg-white/30 my-8"></div>
              <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase leading-loose">
                An adjacent dialogue has been logged beside it. Not as commentary, but as an independent verbal structure formed around the exact same tension.
              </p>
            </div>

            {articleDialogue && (
              <Link href={`/dialogues/${articleDialogue.slug}`} className="inline-flex items-center justify-between border border-white/10 p-6 bg-black group hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.02] transition-colors duration-500 relative overflow-hidden mt-auto">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#D4AF37] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500"></div>
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-600 group-hover:text-[#D4AF37] transition-colors">Target Dialogue</span>
                  <span className="serif-display text-xl text-white">{articleDialogue.title || articleDialogue.slug}</span>
                </div>
                <ArrowRight size={18} className="text-zinc-600 group-hover:text-[#D4AF37] transition-colors -translate-x-2 group-hover:translate-x-0" />
              </Link>
            )}
          </div>
        </section>

        {/* BLOCK 2: DIALOGUES -> NOVELLA BRIDGE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 border-t border-b border-white/10 relative">

          {/* Abstract aesthetic box crossing the border */}
          <div className="hidden lg:block absolute left-1/2 -ml-3 -top-3 w-6 h-6 border border-white/20 bg-[#050505] z-20 mix-blend-difference group-hover:rotate-90 transition-transform duration-1000 delay-100"></div>

          <div className="lg:col-span-5 p-8 lg:p-16 xl:p-24 lg:border-r border-white/10 flex flex-col justify-between bg-black/40">
            <div>
              <span className="font-mono text-[10px] tracking-[0.4em] text-red-500 uppercase mb-8 block">
                Second Field Of Thought
              </span>
              <h2 className="serif-display text-4xl lg:text-5xl leading-[1.1] text-white mb-8">
                Not a supplement. A confrontation.
              </h2>
              <p className="text-sm font-sans font-light leading-loose text-zinc-400">
                Dialogue matters here not only because of the essays. It matters because the characters of Reality B are more than characters—they carry ambitions, tensions, and a life beyond the novel itself. The broadcasts bridge the analytical and the fictional.
              </p>
            </div>

            {featuredDialogue && featuredDialogue.target_chapter && (
              <div className="mt-16 border-t border-white/10 pt-8">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-600 mb-4 block">Connected Narrative Segment</span>
                <Link href={`/novel/${featuredDialogue.target_chapter}`} className="inline-flex items-center gap-4 text-sm font-sans text-zinc-300 hover:text-white transition-colors group/chapter">
                  <span className="w-8 h-[1px] bg-red-600 group-hover/chapter:w-16 transition-all duration-500"></span>
                  Inspect Corresponding Chapter
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 bg-[#0a0a0a] relative group overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            {featuredDialogue ? (
              <Link href={`/dialogues/${featuredDialogue.slug}`} className="flex flex-col justify-between h-full p-8 lg:p-16 xl:p-24 relative z-10">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 px-3 py-1 border border-white/10">
                    Featured Broadcast
                  </span>
                  <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-700">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="mt-24 lg:mt-32">
                  <h3 className="serif-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight group-hover:text-zinc-200 transition-colors">
                    {featuredDialogue.title || 'Unknown Subject'}
                  </h3>
                  <p className="max-w-xl text-sm lg:text-base leading-relaxed text-zinc-400 font-light">
                    {featuredDialogue.description || 'The subject continues here — not as explanation, but as confrontation.'}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="p-16 xl:p-24 flex items-center justify-center h-full">
                <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">Awaiting Broadcast Setup</span>
              </div>
            )}
          </div>
        </section>

        {/* BLOCK 3: NOVELLA GATEWAY */}
        <section className="relative px-4 py-32 lg:py-48 flex flex-col items-center justify-center text-center group outline outline-1 outline-white/10 overflow-hidden bg-black cursor-pointer">
          <Link href={ROUTES.novel} className="absolute inset-0 z-20"></Link>

          <div className="absolute inset-0 bg-[url('/images/brutalist_void.png')] bg-cover bg-center opacity-10 group-hover:opacity-20 mix-blend-screen transition-opacity duration-1000 grayscale group-hover:grayscale-0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-black to-black group-hover:from-red-950/40 transition-colors duration-1000"></div>

          <div className="relative z-10 max-w-4xl flex flex-col items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/50 mb-12 border-b border-white/10 pb-4">
              Reality B // The Chronicle
            </span>

            <h2 className="serif-display text-5xl lg:text-7xl xl:text-8xl text-white font-black tracking-tighter leading-[0.85] mb-8 lowercase text-shadow-sm">
              Beyond the essays stands a parallel world.
            </h2>

            <p className="max-w-2xl text-sm lg:text-base leading-loose text-zinc-400 font-light mb-16">
              {linkedChapter ? `Most recent intercept: ${linkedChapter.title}` : 'The novel does not invent it. It records its chronicle. Enter the structure and observe the fallout.'}
            </p>

            <div className="relative flex items-center justify-center overflow-hidden">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white border border-white/20 px-8 py-4 group-hover:bg-white group-hover:text-black transition-all duration-700">
                Access The Novel
              </span>
            </div>
          </div>
        </section>

        {/* BLOCK 4: CLOSING STATEMENT */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-12 opacity-60">
          <p className="serif-display text-2xl lg:text-3xl text-zinc-300">
            Nothing here stands alone.
          </p>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-zinc-500 mt-6 lg:mt-0">
            The rest continues elsewhere.
          </p>
        </section>

      </div>
    </main>
  );
}
