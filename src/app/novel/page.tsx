import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getNovelChapters } from '@/lib/novels';

export const metadata = {
  title: 'Novels | Breaking the Paradigm',
  description: 'Explore the alternate universe of Almost Language World, a reality diverging in 1791 where science became religion.',
};

export default function NovelHub() {
  const chapters = getNovelChapters();

  return (
    <div className="min-h-screen bg-background relative pb-20">
      
      {/* Top back button */}
      <div className="fixed top-8 left-8 z-40 hidden md:block">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground/60 hover:text-accent transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 shadow-lg">
          <ArrowLeft size={18} />
          <span className="font-medium text-sm">Back to Articles</span>
        </Link>
      </div>

      <div className="container mx-auto px-6 max-w-screen-xl mt-32">
        
        {/* Header / Lore */}
        <header className="mb-24 border-l-4 border-accent border-primary-container pl-8">
          <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container mb-4">PROJECT: ALMOST_ANOTHER_UNIVERSE // LOG_TRANSCRIPT_ID: 1791</p>
          <h1 className="serif-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none mb-10">
            Breaking the<br />Paradigm
          </h1>
          <div className="prose prose-invert prose-lg max-w-3xl text-zinc-300 font-sans leading-relaxed border-l border-white/10 pl-6 lg:ml-12">
            <p className="text-xl text-zinc-200 font-serif italic mb-6">
              &quot;The Almost Language World is a parallel universe to our own, where everything is just like ours, but slightly different.&quot;
            </p>
            <p>
              The separation between us occurred in 1791. After the French Revolution, the situation there calmed down without Napoleon. They declared direct war on the church and defeated it—but replaced religion with science.
            </p>
            <p>
              Over time, science became dogmatic. Scientists adopted the naming, hierarchy, and strict principles of the Catholic Church. The political elite, endeavoring to build a bridge to the Roman Republic, structured their government identically to the ancient state. The most distinguished families changed their names, declaring themselves descendants of Roman patricians, while ordinary people live with the same surnames as we do.
            </p>
            <p className="text-accent font-medium mt-8 border-t border-white/10 pt-6">
              In this rigid world, three young people mount a resistance against a corrupt and degraded system...
            </p>
          </div>
        </header>

        {/* Characters Section */}
        <section className="mb-32">
          <div className="flex items-center mb-16 border-b border-white/10 pb-6">
            <h2 className="serif-display text-4xl font-black tracking-tight text-white">Dramatis Personae</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Claudia Valeria */}
            <div className="group relative">
              <div className="relative h-[450px] lg:h-[550px] w-full mb-6 overflow-hidden bg-surface-container-low border border-outline-variant/30">
                <Image src="/characters/Clio.webp" alt="Claudia Valeria Irreperta" fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-105" />
              </div>
              <h3 className="serif-display text-2xl font-bold text-white mb-2 leading-tight">Claudia Valeria<br/>Irreperta</h3>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-accent mb-4">Clio • Age 22</p>
              <div className="text-zinc-400 font-sans text-sm leading-relaxed border-t border-white/10 pt-4 space-y-3">
                <p>
                  A prominent member of the esteemed Valeria gens. Her family boasts a lineage of academic excellence, and their contributions to science have earned them recognition as saints.
                </p>
                <p>
                  Renowned as the most accomplished young scientist of her time, possessing a brilliant mind. However, she purposefully chose to distance herself, finding solace in a life of leisure—her rebellious, scandalous behavior acting as a protest against societal norms.
                </p>
              </div>
            </div>

            {/* Aurelia Fabia */}
            <div className="group relative lg:mt-16">
              <div className="relative h-[450px] lg:h-[550px] w-full mb-6 overflow-hidden bg-surface-container-low border border-outline-variant/30">
                <Image src="/characters/Fia.webp" alt="Aurelia Fabia Severina" fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-105" />
              </div>
              <h3 className="serif-display text-2xl font-bold text-white mb-2 leading-tight">Aurelia Fabia<br/>Severina</h3>
              <p className="font-label text-xs uppercase tracking-[0.2em] text-accent mb-4">Fia • Age 27 • Assistant Prefect</p>
              <div className="text-zinc-400 font-sans text-sm leading-relaxed border-t border-white/10 pt-4 space-y-3">
                <p>
                  Possesses a shrewd and purposeful nature with unwavering honesty. Born into the lineage of one of the Republic&apos;s founding families, though two ancestors were considered formidable adversaries—one acting with total impunity, and the other reigning as a tyrant.
                </p>
                <p>
                  Fia harbors an ardent aspiration: to become the Republic&apos;s most exceptional and just consul to redeem her family&apos;s tarnished reputation and restore their honor.
                </p>
              </div>
            </div>

            {/* Lucius Cornelius */}
            <div className="group relative lg:mt-32">
              <div className="relative h-[450px] lg:h-[550px] w-full mb-6 overflow-hidden bg-surface-container-low border border-outline-variant/30">
                <Image src="/characters/Ace.webp" alt="Lucius Cornelius Perturbator" fill className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:scale-105" />
              </div>
              <h3 className="serif-display text-2xl font-bold text-white mb-2 leading-tight">Lucius Cornelius<br/>Perturbator</h3>
              <p className="font-label text-xs uppercase tracking-[0.1em] text-accent mb-4">Ace • Age 27 • Supreme Luminary</p>
              <div className="text-zinc-400 font-sans text-sm leading-relaxed border-t border-white/10 pt-4 space-y-3">
                <p>
                  A scion of the Cornelius gens and a trailblazer in science. At 24, his groundbreaking work &quot;The Bright Nature of Dark Matter&quot; sent shockwaves through the community, overturning enigmas.
                </p>
                <p>
                  Beyond his intellect, Lucius led a daring expedition to the North Pole, where his selfless actions saved three members. Highly respected in the Prime Temple for his dedication to knowledge and society.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Chapter Index */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
            <h2 className="serif-display text-4xl font-black tracking-tight text-white">Index Arcana</h2>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-zinc-500 hidden sm:block">Available Chapters: {chapters.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter) => (
              <Link key={chapter.slug} href={`/novel/${chapter.slug}`} className="group block bg-surface-container-lowest border border-outline-variant/20 p-8 hover:bg-surface-container-low hover:border-accent transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-label text-4xl text-outline-variant group-hover:text-accent transition-colors font-black opacity-30">
                    {String(chapter.chapterNumber).padStart(2, '0')}
                  </span>
                  <p className="font-label text-[10px] uppercase tracking-widest text-zinc-500 text-right w-1/2">{chapter.author}</p>
                </div>
                <h3 className="serif-display text-2xl text-white font-bold mb-4 group-hover:-translate-y-1 transition-transform border-b border-white/5 pb-4">
                  {chapter.title}
                </h3>
                <p className="text-zinc-400 font-sans text-sm line-clamp-3 leading-relaxed mb-8">
                  {chapter.description}
                </p>
                <div className="flex items-center gap-2 text-accent font-label text-xs tracking-widest uppercase mt-auto">
                  <span>Enter Chapter</span>
                  <span className="group-hover:translate-x-2 transition-transform opacity-0 group-hover:opacity-100">→</span>
                </div>
              </Link>
            ))}
            {chapters.length === 0 && (
              <div className="col-span-full py-12 text-center border border-dashed border-outline-variant/30">
                <p className="text-zinc-500 italic font-sans">The archives remain sealed. Check back later.</p>
              </div>
            )}
          </div>
        </section>

      </div>
      
      {/* Mobile back block */}
      <div className="block md:hidden container mx-auto px-6 mt-16 mb-8 border-t border-outline-variant/20 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors">
          <ArrowLeft size={18} />
          <span className="font-medium font-sans text-sm tracking-wider uppercase">Back to Hub</span>
        </Link>
      </div>

    </div>
  );
}
