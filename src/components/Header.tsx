'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Events', href: '/events' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const handleScroll = () => setMenuOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2.5">
          <AppLogo size={36} />
          <div className="hidden sm:block">
            <div className={`font-display font-700 text-base tracking-tight leading-tight transition-colors duration-300 ${scrolled ? 'text-foreground' : 'text-white'}`}>
              Greenwood Academy
            </div>
            <div className={`text-2xs font-medium tracking-wide uppercase transition-colors duration-300 ${scrolled ? 'text-muted' : 'text-white/70'}`}>Est. 1998 · Excellence in Education</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks?.map((link) => (
            <Link
              key={link?.label}
              href={link?.href}
              className={`text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-muted hover:text-primary' : 'text-white/80 hover:text-white'}`}
            >
              {link?.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${scrolled ? 'text-primary hover:text-primary-dark' : 'text-white/80 hover:text-white'}`}
          >
            <Icon name="LockClosedIcon" size={14} />
            Portal Login
          </Link>
          <a
            href="#admissions"
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-blue"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-muted hover:text-primary hover:bg-primary/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-border shadow-card">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="px-4 py-3 text-sm font-medium text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link?.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2 border-t border-border mt-2">
              <Link
                href="/login"
                className="px-4 py-3 text-sm font-medium text-primary text-center border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Portal Login
              </Link>
              <a
                href="#admissions"
                className="px-4 py-3 bg-primary text-white text-sm font-semibold rounded-xl text-center hover:bg-primary-dark transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}