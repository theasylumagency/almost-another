import Image from 'next/image';
import Link from 'next/link';
import { getArticles } from '@/lib/articles';

export default function Home() {
  const articles = getArticles();
  const featuredArticle = articles.length > 0 ? articles[0] : null;

  return (
    <main className="min-h-screen bg-black text-white font-mono p-4 md:p-6 lg:p-8 flex flex-col relative overflow-x-hidden pt-24 md:pt-32 selection:bg-red-900 selection:text-white flex-grow">

      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-30"></div>
      <div className="pointer-events-none fixed inset-0 z-50 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]"></div>

      <div className="w-full max-w-[1600px] mx-auto flex flex-col flex-grow gap-6 relative z-10 h-full min-h-[75vh]">

        {/* Header: Meta-Dimension Status */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-white/20 pb-4 mb-2">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-[0.2em] text-red-600 uppercase flex items-center gap-4">
              AABC <span className="text-white">Terminal</span>
              <span className="hidden md:inline-block w-3 h-5 bg-white animate-pulse"></span>
            </h1>
            <p className="text-[10px] md:text-xs text-zinc-500 mt-2 uppercase tracking-[0.3em]">Almost Another Broadcasting Company // Meta-Dimension Link</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-8 text-[10px] md:text-xs font-bold font-mono">
            <div className="flex flex-col items-end">
              <span className="text-zinc-600 uppercase tracking-widest mb-1">Sys_Status</span>
              <span className="text-red-500 flex items-center gap-2 tracking-widest"><span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_#ff0000]"></span> ONLINE_SECURE</span>
            </div>
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-zinc-600 uppercase tracking-widest mb-1">Operator</span>
              <span className="text-white tracking-widest">ADMIN_001</span>
            </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">

          {/* Panel 1: Reality A (Articles) lg:col-span-4 */}
          <section className="lg:col-span-4 flex flex-col border border-white/10 bg-[#0a0a0a] relative group hover:border-white/30 transition-colors">
            {/* Panel Header */}
            <div className="bg-white/5 border-b border-white/10 p-3 flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">Panel_01</span>
              <span className="text-[11px] font-black text-white uppercase tracking-widest mx-2 truncate">Reality A [Earth]</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">Analytics</span>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="mb-8">
                <p className="text-[10px] text-red-500 tracking-widest uppercase mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px]">my_location</span>
                  Source_Intercept: Author "George"
                </p>

              </div>

              <div className="flex-grow flex flex-col">
                {featuredArticle && (
                  <div className="group/item relative flex-grow flex flex-col">
                    <div className="absolute left-[-1.5rem] md:left-[-2rem] top-0 bottom-0 w-[2px] bg-red-600 scale-y-0 group-hover/item:scale-y-100 transition-transform origin-top opacity-0 group-hover/item:opacity-100"></div>
                    <Link href={`/article/${featuredArticle.slug}`} className="block cursor-pointer flex flex-col h-full">
                      {(featuredArticle.imageSquare || featuredArticle.imageWide) && (
                        <div className="w-full aspect-video lg:aspect-square xl:aspect-video relative overflow-hidden mb-6 border border-white/10 group-hover/item:border-red-600/50 transition-colors">
                          <Image
                            src={featuredArticle.imageWide || featuredArticle.imageSquare || ''}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover group-hover/item:grayscale-0 transition-all duration-700 group-hover/item:scale-105"
                          />
                          <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply group-hover/item:opacity-0 transition-opacity duration-500"></div>
                        </div>
                      )}

                      <div className="mt-auto">
                        <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase mb-3 block">
                          {new Date(featuredArticle.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()} // STATUS: RECENT_INTERCEPT
                        </span>
                        <h3 className="serif-display text-2xl md:text-3xl text-white mt-1 group-hover/item:text-red-500 transition-colors leading-tight drop-shadow-md">{featuredArticle.title}</h3>
                        <p className="font-sans text-sm text-zinc-400 mt-4 leading-relaxed opacity-90 line-clamp-3 md:line-clamp-4">{featuredArticle.description}</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/articles" className="inline-flex mt-8 items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-b-white/50 border-b border-transparent pb-1 self-start transition-all">
                [ ACCESS FULL ARCHIVE ]
              </Link>
            </div>
          </section>

          {/* Panel 2: Reality B (Novel) lg:col-span-5 */}
          <section className="lg:col-span-5 flex flex-col border border-red-900 bg-[#050000] relative group">
            <Image
              src="/images/brutalist_void.png"
              width={100}
              height={100}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Reality B"
            />
            {/* Subtle Red glow for reality B */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-black to-red-900/5 pointer-events-none"></div>

            <div className="bg-red-900/40 border-b border-red-900 p-3 flex justify-between items-center relative z-10 backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-widest text-red-300">Panel_02</span>
              <span className="text-[11px] font-black text-red-50 uppercase tracking-widest mx-2 truncate flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
                Reality B [7th Republic]
              </span>
              <span className="text-[10px] text-red-400 animate-pulse tracking-widest">Live_Sync</span>
            </div>

            <div className="p-6 md:p-8 lg:p-10 flex flex-col flex-grow relative z-10 justify-between">
              <div className="mb-auto mt-4">
                <p className="text-[10px] text-red-600 tracking-widest uppercase mb-4 font-bold">Primary_Chronicles_Stream</p>
                <h2 className="serif-display text-xl md:text-2xl lg:text-3xl text-white font-black tracking-tighter leading-[0.9] text-shadow-red drop-shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                  BREAKING<br />THE<br />PARADIGM
                </h2>
              </div>

              <div className="mt-16 space-y-8">
                <div className="p-6 border-l-2 border-red-800 bg-red-950/10 relative">
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-800/50"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-800/50"></div>
                  <span className="block text-[9px] text-red-700/80 uppercase mb-3 tracking-widest">Interception_Snippet // Document: Novella</span>
                  <p className="serif-display italic text-lg text-zinc-300 leading-relaxed font-light">
                    "The sky above the port was the color of a television, tuned to a dead channel, but the ghosts were real enough to touch."
                  </p>
                </div>

                <Link href="/novel" className="block w-full py-5 bg-red-900/20 text-red-100 font-bold text-xs tracking-[0.4em] uppercase text-center border border-red-800/50 flex items-center justify-center gap-3 hover:bg-red-800 hover:text-white transition-all shadow-[0_0_15px_rgba(186,11,11,0.15)] group/btn">
                  OPEN LORE DATABANKS
                  <span className="material-symbols-outlined text-[16px] group-hover/btn:rotate-90 transition-transform">terminal</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Panel 3: AABC Broadcasts lg:col-span-3 */}
          <section className="lg:col-span-3 flex flex-col border border-white/10 bg-[#0a0a0a] relative group hover:border-white/30 transition-colors">
            <div className="bg-white/5 border-b border-white/10 p-3 flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">Panel_03</span>
              <span className="text-[11px] font-black text-white uppercase tracking-widest mx-2 truncate block">Base_Studio</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">Internal</span>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <div className="mb-6">
                <h2 className="text-xl text-white font-black tracking-widest uppercase mb-2">AABC Signal</h2>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Cross-dimensional Frequencies</p>
              </div>

              {/* Frequency Graphic */}
              <div className="w-full h-20 border border-white/10 flex items-center justify-center relative overflow-hidden bg-black mb-8 p-1">
                <div className="w-full h-full relative border border-white/5">
                  <svg className="w-full h-full stroke-red-600/60 fill-none stroke-1" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path d="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50">
                      <animate attributeName="d" dur="4s" repeatCount="indefinite"
                        values="M0,50 Q25,20 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50;
                                M0,50 Q25,80 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50;
                                M0,50 Q25,20 50,50 T100,50 T150,50 T200,50 T250,50 T300,50 T350,50 T400,50" />
                    </path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/80 px-3 py-1 text-[9px] text-white font-bold uppercase tracking-[0.3em] backdrop-blur-sm border border-white/10">Transmitting</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                {[
                  { ep: '042', subject: 'Trump [Reality A]', title: 'The Static Dialogue', tag: 'Interview' },
                  { ep: '041', subject: 'Clio [Reality B]', title: 'Fourth Wall Breach', tag: 'Interview' }
                ].map((feed, i) => (
                  <div key={feed.ep} className="flex flex-col p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer group/feed relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-600/10 -translate-x-full group-hover/feed:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[9px] uppercase tracking-widest font-bold ${feed.tag === 'Alert' ? 'text-red-500' : 'text-zinc-400'}`}>[{feed.tag}]</span>
                        <span className="text-[9px] text-zinc-600 uppercase tracking-widest">FREQ_{feed.ep}</span>
                      </div>
                      <h4 className="text-sm font-sans text-white uppercase tracking-wider mb-2 leading-snug">{feed.title}</h4>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest border-t border-white/5 pt-2 block w-full">Subj: {feed.subject}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/aabc" className="mt-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 hover:text-white transition-colors group/link p-4 border border-dashed border-red-900/50 hover:border-solid hover:border-red-500 hover:bg-red-900/10">
                ACCESS AUDIO TERMINAL
                <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </section>

        </div>

        {/* Footer: George Paradox Log */}
        <footer className="mt-2 border border-white/10 bg-[#080808] p-4 lg:p-6 text-[10px] text-zinc-500 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-800"></div>
          <div className="flex flex-col gap-2 max-w-4xl pl-4">
            <span className="text-red-700 uppercase font-bold tracking-[0.3em]"> SYSTEM NOTATION EX_04 [The George Paradox]</span>
            <p className="font-sans text-xs leading-relaxed text-zinc-400">
              <strong className="text-zinc-300 font-mono tracking-widest">NOTE:</strong> Entity "George" (Reality A) operates under the confirmed illusion of creator-status over Reality B (7th Republic). He believes he is an author of fiction. AABC continues to intercept and catalog his essays (Analytics) and novellas (Chronicles) as objective evidence bridging the dimensions. Character sovereignty maintained via written prompt injection.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0 opacity-70 border border-white/10 p-2 md:p-3">
            <span className="w-2 h-4 bg-red-600 animate-pulse hidden md:block"></span>
            <span className="uppercase tracking-[0.4em] text-[9px] md:text-[10px] text-zinc-400">END_OF_FILE</span>
          </div>
        </footer>

      </div>
    </main>
  );
}

