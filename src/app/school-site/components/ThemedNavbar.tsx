'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import Link from 'next/link';

interface ThemedNavbarProps {
  name: string;
  domain: string;
}

const NAV_LINKS = ['Home', 'About', 'Academics', 'Announcements', 'Events', 'Gallery', 'Admissions', 'Contact'];

export default function ThemedNavbar({ name }: ThemedNavbarProps) {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg backdrop-blur-md' : ''
      }`}
      style={{
        backgroundColor: scrolled
          ? `color-mix(in srgb, var(--theme-primary) 95%, transparent)`
          : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-md"
              style={{
                background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                color: 'var(--theme-primary)',
              }}
            >
              {name.charAt(0)}
            </div>
            <span className="font-bold text-white text-sm leading-tight hidden sm:block max-w-[200px] truncate">
              {name}
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo('admissions')}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                color: 'var(--theme-primary)',
              }}
            >
              Apply Now
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t border-white/10"
          style={{ backgroundColor: 'var(--theme-primary)' }}
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                {link}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <button
                onClick={() => scrollTo('admissions')}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                  color: 'var(--theme-primary)',
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
