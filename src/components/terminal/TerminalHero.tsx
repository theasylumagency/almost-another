'use client';

export default function TerminalHero() {
    return (
        <section className="relative border border-white/15 bg-black p-6 sm:p-8">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <div className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-red-500/80">
                        <span className="block h-1.5 w-1.5 bg-red-500 animate-pulse"></span>
                        Restricted Archive // Signal Index Online
                    </div>

                    <h1 className="mb-4 flex items-center text-4xl font-light tracking-[0.04em] text-white sm:text-5xl">
                        TERMINAL<span className="inline-block h-[0.8em] w-3 bg-white/70 animate-pulse ml-3" aria-hidden="true"></span>
                    </h1>

                    <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 font-mono tracking-wide">
                        <span className="text-white">STATUS:</span> AUTHORIZED ACCESS.
                        <br className="mb-2" />
                        This is not a world page. It is a controlled access layer: historical drift, prefecture files, and the meta-narrative explaining how these fragments reach us.
                    </p>
                </div>

                <div className="flex flex-col gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] w-full lg:w-auto lg:min-w-[200px]">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-zinc-600">SYS.OP</span>
                        <span className="text-white">ONLINE</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="text-zinc-600">ENCRYPTION</span>
                        <span className="text-white">LEVEL 4</span>
                    </div>
                    <div className="flex justify-between pb-1">
                        <span className="text-zinc-600">UPLINK</span>
                        <span className="text-red-400">STABLE</span>
                    </div>
                </div>
            </div>
        </section>
    );
}