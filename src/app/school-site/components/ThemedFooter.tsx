'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { PublicSchoolData } from '@/lib/schoolRegistry';

interface ThemedFooterProps {
  school: PublicSchoolData;
}

const QUICK_LINKS = ['About Us', 'Academics', 'Admissions', 'Events', 'Gallery', 'Contact'];
const SOCIAL = [
  { label: 'Facebook', icon: 'f' },
  { label: 'Instagram', icon: '📷' },
  { label: 'YouTube', icon: '▶' },
  { label: 'Twitter', icon: 'X' },
];

export default function ThemedFooter({ school }: ThemedFooterProps) {
  const { theme } = useTheme();

  return (
    <footer style={{ backgroundColor: 'var(--theme-primary)' }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* School info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl"
                style={{
                  background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                  color: 'var(--theme-primary)',
                }}
              >
                {school.name.charAt(0)}
              </div>
              <div>
                <div className="font-extrabold text-white leading-tight">{school.name}</div>
                <div className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>{school.board} Affiliated · Est. {school.established}</div>
              </div>
            </div>
            {school.tagline && (
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--theme-text-muted)' }}>
                {school.tagline}
              </p>
            )}
            {/* Contact quick */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                <span>📞</span>{school.phone}
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                <span>✉️</span>{school.email}
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                <span>📍</span>{school.city}, {school.state}
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-2 pt-2">
              {SOCIAL.map(s => (
                <button
                  key={s.label}
                  title={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(link => (
                <li key={link}>
                  <button
                    className="text-sm hover:text-white transition-colors text-left"
                    style={{ color: 'var(--theme-text-muted)' }}
                    onClick={() => document.getElementById(link.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-widest">Academics</h4>
            <ul className="space-y-2">
              {['Science & Technology', 'Commerce & Economics', 'Arts & Humanities', 'Co-Curricular', 'Sports & Fitness', 'Library'].map(item => (
                <li key={item}>
                  <span className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-5 px-4 sm:px-6 lg:px-8"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: 'var(--theme-text-muted)' }}>
          <span>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <span>Powered by <span className="font-semibold text-white/60">SchoolSync</span></span>
            <span>·</span>
            <span>{school.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
