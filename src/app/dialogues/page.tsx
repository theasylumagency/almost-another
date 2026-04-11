import { getAllBroadcasts } from '@/lib/mdx';
import AABCHubClient from './AABCHubClient';

export const metadata = {
  title: 'AABC | The Omniscient Protocol',
  description: 'We watch the multiverse burn. We observe the spectacle of ambition, dogma, and ruin.',
};

export default async function AABCHub() {
  // Fetch broadcasts dynamically on the server
  const tempBroadcasts = getAllBroadcasts();
  
  const broadcasts = tempBroadcasts.map((b: any) => ({
    slug: b.slug,
    title: b.title || b.slug,
    subject: b.subject || 'CLASSIFIED',
    reality: b.reality || 'REALITY MULTIVERSE',
    research_reality: b.research_reality || null,
    status: b.status || 'DECRYPTED LOG',
    description: b.description || 'No summary available.',
    date: b.date || 'UNKNOWN',
    format: b.format || 'interview',
  }));

  return <AABCHubClient broadcasts={broadcasts} />;
}