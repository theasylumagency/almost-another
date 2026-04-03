'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, X } from 'lucide-react';

export interface ChapterMetaData {
  slug: string;
  chapterNumber: number;
  title: string;
  wordCount: number;
  readingTime: string;
  ideologicalDeviation: number;
}

export default function ArchiveDrawer({ chapters, currentChapter, isOpen, onClose }: { chapters: ChapterMetaData[], currentChapter: number, isOpen: boolean, onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-full md:w-[450px] bg-zinc-950 border-r border-white/10 z-[101] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Eye className="text-accent" size={24} />
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-400">Security Prefecture Database</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-2"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {chapters.map((chap) => {
            const isCurrent = chap.chapterNumber === currentChapter;
            
            return (
              <Link 
                key={chap.slug}
                href={`/novel/${chap.slug}`}
                onClick={onClose}
                className="block"
              >
                <div className={`p-4 border ${isCurrent ? 'border-accent bg-accent/5' : 'border-white/5 hover:border-white/20 bg-zinc-900'} transition-colors group relative overflow-hidden`} >
                  
                  {isCurrent && (
                    <div className="absolute top-0 right-0 px-2 py-1 bg-accent font-mono text-[9px] uppercase font-bold text-black font-black">
                      Active Target
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <span className="font-mono text-xs text-zinc-500 uppercase block mb-1">
                      CHAPTER {String(chap.chapterNumber).padStart(2, '0')}: {chap.title.toUpperCase()}
                    </span>
                    <span className={`font-mono text-[10px] font-bold ${isCurrent ? 'text-accent' : 'text-zinc-500'}`}>
                      [ STATUS: {isCurrent ? 'COMPROMISED' : 'ARCHIVED'} ]
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">DATA VOLUME:</span>
                      <span className="text-zinc-300">{(chap.wordCount / 1024).toFixed(1)} KB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">REQ. COGNITIVE PROCESSING:</span>
                      <span className="text-zinc-300">{chap.readingTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">IDEOLOGICAL DEVIATION:</span>
                      <span className={`animate-pulse ${chap.ideologicalDeviation > 60 ? 'text-red-500' : 'text-accent'}`}>
                        {chap.ideologicalDeviation}%
                      </span>
                    </div>
                  </div>

                </div>
              </Link>
            )
          })}
        </div>
        
        <div className="p-4 border-t border-white/10 font-mono text-[10px] text-zinc-500 text-center uppercase">
          End of returned records
        </div>
      </div>
    </>
  );
}

