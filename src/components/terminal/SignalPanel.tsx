'use client';

import type { SignalBlock } from '@/content/terminal/terminal.types';

type Props = {
    blocks: SignalBlock[];
};

export default function SignalPanel({ blocks }: Props) {
    return (
        <section className="grid gap-4">
            {blocks.map((block) => (
                <article
                    key={block.id}
                    className="border border-white/10 bg-white/[0.02] p-6"
                >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-red-300/80">
                            {block.id}
                        </span>
                        <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                            {block.classification}
                        </span>
                    </div>

                    <h2 className="mb-3 text-xl font-medium text-white">{block.title}</h2>

                    <p className="max-w-4xl text-sm leading-7 text-zinc-300">
                        {block.body}
                    </p>
                </article>
            ))}
        </section>
    );
}