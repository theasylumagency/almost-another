import Link from 'next/link';

export default function AabcHub() {
  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-white pb-20">
      <main className="pt-32 px-8 max-w-screen-2xl mx-auto">
        <header className="mb-24 border-l-4 border-accent border-primary-container pl-8">
          <p className="font-label text-[10px] tracking-[0.3em] uppercase text-primary-container mb-4">AABC // BROADCAST_STATION</p>
          <h1 className="serif-display text-4xl md:text-6xl tracking-tighter text-white leading-none mb-6">
            Almost Another <br /> Broadcasting Company
          </h1>
          <p className="font-sans text-zinc-400 max-w-2xl leading-relaxed text-lg">
            Journalistic reports from the event horizon. An inquiry into the facts taking place in our and the parallel world.
          </p>
        </header>

        {/* Placeholder for MDX list */}
        <section className="border border-outline-variant/30 bg-surface-container-lowest p-16 text-center rounded-sm">
          <h2 className="serif-display text-3xl text-zinc-500 mb-4 opacity-50">Signal Lost...</h2>
          <p className="font-label text-xs uppercase tracking-widest text-zinc-600">Awaiting encrypted transmissions.</p>
        </section>
      </main>
    </div>
  );
}
