'use client';

export default function TerminalHero() {
    return (
        <section className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-red-300/80">
                Restricted Archive // Signal Index Online
            </div>

            <h1 className="mb-4 text-4xl font-light tracking-[0.04em] text-white sm:text-5xl">
                Terminal
            </h1>

            <p className="max-w-3xl text-sm leading-7 text-zinc-300 sm:text-base">
                This is not a world page. It is a controlled access layer: historical drift,
                prefecture files, and the meta-narrative explaining how these fragments reach us.
            </p>
        </section>
    );
}