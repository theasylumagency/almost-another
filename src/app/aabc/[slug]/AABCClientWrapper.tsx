import { ReactNode } from 'react';
import { AABCModeProvider } from '@/components/aabc/AABCModeContext';
import AABCInnerLayout from './AABCInnerLayout';

export default function AABCClientWrapper({
    frontmatter,
    content,
    relatedBroadcasts,
}: {
    frontmatter: any;
    content: ReactNode;
    relatedBroadcasts: any[];
}) {
    return (
        <AABCModeProvider>
            <AABCInnerLayout
                frontmatter={frontmatter}
                content={content}
                relatedBroadcasts={relatedBroadcasts}
            />
        </AABCModeProvider>
    );
}