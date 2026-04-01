import { notFound } from 'next/navigation';
import { getBroadcastBySlug, getAllBroadcasts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/MDXComponents';
import AABCClientWrapper from './AABCClientWrapper';

export async function generateStaticParams() {
    const broadcasts = getAllBroadcasts();
    return broadcasts.map((b) => ({
        slug: b.slug,
    }));
}

export default async function BroadcastPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;

    const broadcast = getBroadcastBySlug(resolvedParams.slug);

    if (!broadcast) {
        notFound();
    }

    const allBroadcasts = getAllBroadcasts();
    const relatedBroadcasts = allBroadcasts
        .filter((b) => b.slug !== resolvedParams.slug)
        .slice(0, 3);

    return (
        <AABCClientWrapper
            frontmatter={broadcast.frontmatter}
            relatedBroadcasts={relatedBroadcasts}
            content={<MDXRemote source={broadcast.content} components={mdxComponents} />}
        />
    );
}