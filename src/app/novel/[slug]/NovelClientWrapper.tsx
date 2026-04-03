'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import ArchiveDrawer, { ChapterMetaData } from '@/components/novel/ArchiveDrawer';
import ChapterTimeline from '@/components/novel/ChapterTimeline';

interface NovelClientWrapperProps {
  slug: string;
  chapters: ChapterMetaData[];
  currentChapter: number;
}

export default function NovelClientWrapper({ slug, chapters, currentChapter }: NovelClientWrapperProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Save last read
    localStorage.setItem('lastReadNovelChapter', slug);
  }, [slug]);

  return (
    <>
      <ArchiveDrawer 
        chapters={chapters} 
        currentChapter={currentChapter} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      {/* Desktop Surveillance Strip Sidebar */}
      <div className="hidden md:flex flex-col fixed top-0 left-0 h-full w-[50px] bg-zinc-950 border-r border-white/10 z-40 items-center py-8">
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center justify-center w-full py-4 text-zinc-500 hover:text-accent transition-colors mt-4"
          title="Access Archive"
        >
           <Eye size={20} />
        </button>
      </div>

      {/* Desktop Navigation Console */}
      <div className="hidden md:flex fixed bottom-0 left-[50px] w-[calc(100%-50px)] lg:w-[calc(100%-50px-400px)] 2xl:w-[calc(100%-50px-450px)] h-12 bg-zinc-950/90 backdrop-blur border-t border-white/10 z-40 items-center justify-center px-8 pointer-events-auto transition-all">
         <ChapterTimeline chapters={chapters} currentChapter={currentChapter} />
      </div>

      {/* Mobile Navigation Console */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-white/10 z-40 flex flex-col pointer-events-auto">
        <div className="flex h-12 items-center justify-between px-2">
          {/* ToC Toggle */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-12 h-full border-r border-white/10 text-zinc-500 hover:text-accent transition-colors"
            title="Access Archive"
          >
            <Eye size={20} />
          </button>

          {/* Chapter Timeline */}
          <div className="flex-1 flex justify-center items-center px-2">
             <ChapterTimeline chapters={chapters} currentChapter={currentChapter} />
          </div>
        </div>
      </div>
    </>
  );
}
