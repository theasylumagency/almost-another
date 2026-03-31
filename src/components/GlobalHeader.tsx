"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function GlobalHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide the header if scrolling down and past 100px.
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Show if scrolling up.
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: '/articles', label: 'ARTICLES' },
    { href: '/novel', label: 'THE NOVEL' },
    { href: '/aabc', label: 'BROADCAST' },
  ];

  // Hide the header entirely on the homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 w-full z-[100] bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl flex justify-between items-center px-8 py-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <Link href="/" className="font-serif text-xl sm:text-2xl font-black tracking-tighter text-white uppercase flex-shrink-0 hover:text-primary transition-colors">
        ALMOST ANOTHER UNIVERSE
      </Link>
      
      <nav className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link 
              key={link.href}
              href={link.href} 
              className={`font-serif tracking-tight leading-none uppercase text-xs transition-colors ${isActive ? 'text-red-500 font-bold border-b border-red-500 pb-1' : 'text-neutral-400 hover:text-white'}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      
      <div className="flex items-center gap-6">
        <button className="material-symbols-outlined text-white hover:text-primary transition-all duration-300 opacity-80 active:scale-95">search</button>
        <button className="material-symbols-outlined text-white hover:text-primary transition-all duration-300 opacity-80 active:scale-95 md:hidden">menu</button>
      </div>
    </header>
  );
}
