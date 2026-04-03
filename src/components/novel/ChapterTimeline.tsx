'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChapterMetaData } from './ArchiveDrawer';

interface ChapterTimelineProps {
  chapters: ChapterMetaData[];
  currentChapter: number;
}

export default function ChapterTimeline({ chapters, currentChapter }: ChapterTimelineProps) {
  const router = useRouter();
  const [jumpTo, setJumpTo] = useState('');

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const targetInfo = chapters.find(c => c.chapterNumber === parseInt(jumpTo));
    if (targetInfo) {
      router.push(`/novel/${targetInfo.slug}`);
    } else {
      // flash error or just clear if chapter doesn't exist
      setJumpTo('');
    }
  };

  // Find prev and next chapters for the arrows
  const prevChapter = chapters.find(c => c.chapterNumber === currentChapter - 1);
  const nextChapter = chapters.find(c => c.chapterNumber === currentChapter + 1);

  // Generate timeline slots based on availability
  // Render: < | prev-1 | **current** | next1 | >
  const renderSlots = () => {
    let slots = [];
    
    // Previous anchor
    if (prevChapter) {
      slots.push(
        <Link 
          key={`prev-${prevChapter.chapterNumber}`}
          href={`/novel/${prevChapter.slug}`} 
          className="hover:text-white transition-colors"
        >
          {String(prevChapter.chapterNumber).padStart(2, '0')}
        </Link>
      );
    }

    // Current anchor
    slots.push(
      <span key="current" className="text-white font-bold tracking-widest px-2 relative">
         <span className="absolute -left-1 text-accent opacity-50">[</span>
         {String(currentChapter).padStart(2, '0')}
         <span className="absolute -right-1 text-accent opacity-50">]</span>
      </span>
    );

    // Next anchor
    if (nextChapter) {
      slots.push(
        <Link 
          key={`next-${nextChapter.chapterNumber}`}
          href={`/novel/${nextChapter.slug}`} 
          className="hover:text-white transition-colors"
        >
          {String(nextChapter.chapterNumber).padStart(2, '0')}
        </Link>
      );
    }

    return slots.reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, <span key={`sep-${i}`} className="opacity-30">|</span>, curr], [] as React.ReactNode[]);
  };

  return (
    <div className="flex-1 flex justify-center lg:justify-between items-center gap-4 lg:gap-8 font-mono text-zinc-500 text-[10px] sm:text-xs">
       
       <div className="flex items-center gap-3 md:gap-6">
         {prevChapter ? (
           <Link href={`/novel/${prevChapter.slug}`} className="hover:text-accent font-black text-lg transition-transform hover:-translate-x-1">&lt;</Link>
         ) : (
           <span className="opacity-20 font-black text-lg">&lt;</span>
         )}

         <div className="flex items-center gap-3">
           {renderSlots()}
         </div>

         {nextChapter ? (
           <Link href={`/novel/${nextChapter.slug}`} className="hover:text-accent font-black text-lg transition-transform hover:translate-x-1">&gt;</Link>
         ) : (
           <span className="opacity-20 font-black text-lg">&gt;</span>
         )}
       </div>

       {/* Quick Jump Input - hidden on very small mobile, visible on sm+ */}
       <form onSubmit={handleJump} className="hidden sm:flex items-center border border-white/10 bg-black overflow-hidden relative group max-w-[140px]">
          <div className="absolute left-0 bottom-0 top-0 w-[2px] bg-accent transform scale-y-0 group-hover:scale-y-100 transition-transform"></div>
          <span className="px-2 py-1 text-zinc-600 select-none whitespace-nowrap">GOTO CH:</span>
          <input 
            type="number" 
            min="1"
            max={chapters.length}
            placeholder="..."
            value={jumpTo}
            onChange={(e) => setJumpTo(e.target.value)}
            className="w-10 bg-transparent text-white outline-none placeholder:text-zinc-700 py-1"
          />
          <button type="submit" className="hidden"></button>
       </form>
    </div>
  );
}
