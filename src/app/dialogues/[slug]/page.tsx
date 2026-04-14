import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBroadcastBySlug, getAllBroadcasts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/MDXComponents';
import AABCInnerLayout from './AABCInnerLayout';
import AABCDialogue from '@/components/aabc/AABCDialogue';
import AABCInterviewImage from '@/components/aabc/AABCInterviewImage';

export async function generateStaticParams() {
    const broadcasts = getAllBroadcasts();
    return broadcasts.map((b) => ({
        slug: b.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const broadcast = getBroadcastBySlug(resolvedParams.slug);

    if (!broadcast) {
        return { title: 'Dialogue Not Found' };
    }

    const baseUrl = 'https://almostanother.com';
    const title = broadcast.frontmatter?.title || 'AABC Dialogues';
    const description = broadcast.frontmatter?.description || 'Read the full dialogue.';
    const url = `${baseUrl}/dialogues/${broadcast.slug}`;
    const imagePath = broadcast.ogImage || broadcast.frontmatter?.ogImage || '';
    const imageUrl = imagePath ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`) : '';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            url,
            images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: imageUrl ? [imageUrl] : [],
        },
    };
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

    const format = broadcast.frontmatter.format || 'interview';

    // Smart dialogue parsing + handle next-mdx-remote dropping evaluated JSX props
    const contentStringifiedProps = broadcast.content.replace(/<InterviewImage\s+index=\{([0-9]+)\}\s*\/>/g, '<InterviewImage index="$1" />');

    // Parse into contiguous dialogue blocks to handle multi-paragraph speeches
    let blocks = contentStringifiedProps.split(/\r?\n\r?\n/);
    let combinedContent = [];
    let currentDialogue: { speaker: string, text: string } | null = null;

    for (let block of blocks) {
        // If it starts with JSX, clear dialogue tracker to prevent wrapping images
        if (block.trim().startsWith('<')) {
            if (currentDialogue) {
                combinedContent.push(`<Dialogue speaker="${currentDialogue.speaker}" format="${format}">\n\n${currentDialogue.text}\n\n</Dialogue>`);
                currentDialogue = null;
            }
            combinedContent.push(block);
            continue;
        }

        const dialogueMatch = block.trim().match(/^([A-Za-z0-9\s]+):\s+([\s\S]+)$/);
        // Exclude things like "http: //" or "Note: " by capping speaker length
        if (dialogueMatch && dialogueMatch[1].length < 25) {
            if (currentDialogue) {
                combinedContent.push(`<Dialogue speaker="${currentDialogue.speaker}" format="${format}">\n\n${currentDialogue.text}\n\n</Dialogue>`);
            }
            currentDialogue = { speaker: dialogueMatch[1].trim(), text: dialogueMatch[2].trim() };
        } else {
            if (currentDialogue) {
                // If we are tracking a speaker, append the text (multi-paragraph response)
                currentDialogue.text += '\n\n' + block;
            } else {
                // Intro paragraphs or text before any speaker speaks
                combinedContent.push(block);
            }
        }
    }
    // Flush any remaining dialogue
    if (currentDialogue) {
        combinedContent.push(`<Dialogue speaker="${currentDialogue.speaker}" format="${format}">\n\n${currentDialogue.text}\n\n</Dialogue>`);
    }

    const transformedContent = combinedContent.join('\n\n');

    return (
        <AABCInnerLayout
            frontmatter={broadcast.frontmatter}
            relatedBroadcasts={relatedBroadcasts}
            content={<MDXRemote source={transformedContent} components={{ ...mdxComponents, Dialogue: AABCDialogue, InterviewImage }} />}
        />
    );
}
