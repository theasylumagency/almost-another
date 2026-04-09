import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { getBroadcastBySlug, getAllBroadcasts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/MDXComponents';
import AABCClientWrapper from './AABCClientWrapper';
import AABCDialogue from '@/components/aabc/AABCDialogue';
import AABCInterviewImage from '@/components/aabc/AABCInterviewImage';

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

    // Read associated images from public/aabc_images/<slug>
    let availableImages: string[] = [];
    try {
        const imagesPath = path.join(process.cwd(), 'public', 'aabc_images', resolvedParams.slug);
        if (fs.existsSync(imagesPath)) {
            availableImages = fs.readdirSync(imagesPath);
        }
    } catch (e) {
        console.error("Error reading images:", e);
    }

    const InterviewImage = ({ index }: { index: number | string }) => {
        const regexStr = `_${index}_[clr]\\.[a-zA-Z0-9]+$`;
        const filename = availableImages.find(f => {
            const regex = new RegExp(regexStr, 'i');
            return regex.test(f);
        });

        if (!filename) return null;

        const match = filename.match(/_([clr])\.[a-zA-Z0-9]+$/i);
        const layout = match ? match[1].toLowerCase() : 'c';
        
        return <AABCInterviewImage src={`/aabc_images/${resolvedParams.slug}/${filename}`} layout={layout} alt={`Interview Image ${index}`} />;
    };

    // Smart dialogue parsing + handle next-mdx-remote dropping evaluated JSX props
    const contentStringifiedProps = broadcast.content.replace(/<InterviewImage\s+index=\{([0-9]+)\}\s*\/>/g, '<InterviewImage index="$1" />');
    const transformedContent = contentStringifiedProps.split('\n\n').map(block => {
        const dialogueMatch = block.match(/^([A-Za-z0-9\s]+):\s+([\s\S]+)$/);
        // Exclude things like "http: //" or "Note: " by making sure speaker name isn't too long
        if (dialogueMatch && dialogueMatch[1].length < 25) {
            return `<Dialogue speaker="${dialogueMatch[1].trim()}">\n\n${dialogueMatch[2].trim()}\n\n</Dialogue>`;
        }
        return block;
    }).join('\n\n');

    return (
        <AABCClientWrapper
            frontmatter={broadcast.frontmatter}
            relatedBroadcasts={relatedBroadcasts}
            content={<MDXRemote source={transformedContent} components={{ ...mdxComponents, Dialogue: AABCDialogue, InterviewImage }} />}
        />
    );
}