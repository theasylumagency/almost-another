import { getArticles } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const articles = getArticles();

  if (articles.length === 0) {
    return <div className="min-h-screen bg-background text-on-background flex items-center justify-center">No articles found.</div>;
  }

  const latestArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="bg-background text-on-background selection:bg-primary-container selection:text-white pb-20">
      <main className="pt-32 px-8 max-w-screen-2xl mx-auto">
        {/* Page Header */}
        <header className="mb-24 border-l-4 border-accent border-primary-container pl-8">
          <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container mb-4">SYSTEM_STATUS: OPERATIONAL // LOG_TRANSCRIPT_ID: 882</p>
          <h1 className="serif-display text-2xl md:text-4xl tracking-tighter text-white leading-none">
            Perspectives <br /> &amp; Insights
          </h1>
        </header>

        {/* Featured Section (Asymmetric) */}
        {latestArticle && (
          <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 group overflow-hidden bg-surface-container-lowest relative">
              <Link href={`/articles/${latestArticle.slug}`} className="block">
                <div className="aspect-[21/9] overflow-hidden relative">
                  {(latestArticle.imageWide || latestArticle.imageSquare) && (
                    <Image
                      src={latestArticle.imageWide || latestArticle.imageSquare!}
                      alt={latestArticle.title}
                      fill
                      priority
                      className="w-full h-full object-cover brightness-75 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-in-out"
                    />
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-label text-[10px] tracking-widest text-zinc-500 uppercase">
                      {new Date(latestArticle.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                    </span>
                    <span className="w-12 h-[1px] bg-outline-variant opacity-20"></span>
                    <span className="font-label text-[10px] text-accent tracking-widest text-primary-container uppercase">FEATURED_ENTRY</span>
                  </div>
                  <h2 className="serif-display text-4xl md:text-5xl text-white mb-6 group-hover:text-primary transition-colors cursor-pointer">
                    {latestArticle.title}
                  </h2>
                  <p className="font-sans text-zinc-400 text-lg max-w-2xl leading-relaxed mb-8">
                    {latestArticle.description || latestArticle.subtitle}
                  </p>
                  <span className="inline-block font-label text-[10px] tracking-[0.2em] uppercase text-white border-b border-primary-container pb-1 hover:text-primary-container transition-all">
                    DECODE_PROTOCOL
                  </span>
                </div>
              </Link>
            </div>

            <div className="lg:col-span-4 bg-surface-container-low p-10 h-full flex flex-col justify-center">
              <h3 className="serif-display text-2xl text-white mb-4 italic">&quot;Exploring Perspectives:Thought-Provoking Articles on Society and Civilization.&quot;</h3>
              <p className="font-label text-[10px] tracking-widest text-zinc-500 uppercase">— FRAGMENT_404</p>
            </div>
          </section>
        )}

        {/* Article Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {remainingArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </section>

        {/* Newsletter / Redacted Section */}
        <section className="mt-32 p-16 bg-surface-container-lowest border-t-2 border-primary-container relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-label text-[8px] opacity-10 uppercase leading-none">
            ENCRYPTED_HEADER_V4 // NO_REPRODUCTION_ALLOWED // 00101101 00101101
          </div>
          <div className="max-w-xl">
            <h4 className="serif-display text-4xl text-white mb-6">Receive the Transmission.</h4>
            <p className="font-sans text-zinc-500 mb-8 leading-relaxed">Join our clandestine network of scholars. No spam, just pure philosophy and architectural critique delivered directly to your terminal.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input className="flex-1 bg-transparent border-b-2 border-outline-variant py-3 px-2 font-label text-xs tracking-widest focus:outline-none focus:border-primary transition-colors placeholder:text-zinc-700 uppercase" placeholder="USER_EMAIL@DOMAIN" type="email" />
              <button className="bg-primary-container text-white px-10 py-3 font-label text-[10px] tracking-[0.3em] uppercase hover:bg-red-800 transition-all active:scale-95">SUBSCRIBE</button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 dark:bg-black w-full py-16 px-8 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <div className="font-serif text-lg font-bold text-white mb-2 uppercase">THE BRUTALIST SCHOLAR</div>
            <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-500">© 2024 THE BRUTALIST SCHOLAR // ALL RIGHTS REDACTED</div>
          </div>
          <div className="flex gap-12 font-sans text-[10px] tracking-[0.2em] uppercase text-zinc-600">
            <Link href="#" className="hover:text-red-600 transition-colors hover:underline decoration-red-600">Privacy Protocol</Link>
            <Link href="#" className="hover:text-red-600 transition-colors hover:underline decoration-red-600">Transmission Log</Link>
            <Link href="#" className="hover:text-red-600 transition-colors hover:underline decoration-red-600">Terminal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
