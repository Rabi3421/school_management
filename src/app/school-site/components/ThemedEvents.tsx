'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';

const EVENTS = [
  { emoji: '🎭', date: 'Jan 20, 2026', title: 'Annual Day & Cultural Festival', category: 'Cultural', seats: '500+' },
  { emoji: '🏆', date: 'Jan 25, 2026', title: 'Annual Sports Day', category: 'Sports', seats: 'All Students' },
  { emoji: '🔬', date: 'Feb 5, 2026', title: 'Science & Innovation Fair', category: 'Academic', seats: 'Open' },
  { emoji: '🎨', date: 'Feb 14, 2026', title: 'Art Exhibition & Craft Fair', category: 'Arts', seats: 'Open' },
  { emoji: '📖', date: 'Mar 1, 2026', title: 'Inter-School Debate Championship', category: 'Academic', seats: '2 per school' },
  { emoji: '🌳', date: 'Mar 15, 2026', title: 'Eco Awareness & Plantation Drive', category: 'Social', seats: 'All Students' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Cultural: '#8b5cf6',
  Sports: '#f59e0b',
  Academic: '#3b82f6',
  Arts: '#ec4899',
  Social: '#10b981',
};

export default function ThemedEvents() {
  const { theme } = useTheme();

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
          >
            Calendar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--theme-text)' }}>
            Upcoming Events
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
            Stay connected with school life — mark your calendars for these exciting events!
          </p>
        </div>

        {/* Events grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((ev, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer group"
              style={{ backgroundColor: 'var(--theme-bg-alt)', borderColor: 'var(--theme-border)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{ev.emoji}</div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: CATEGORY_COLORS[ev.category] ?? 'var(--theme-primary)' }}
                >
                  {ev.category}
                </span>
              </div>
              <h3
                className="font-bold text-base mb-2 group-hover:underline"
                style={{ color: 'var(--theme-text)' }}
              >
                {ev.title}
              </h3>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {ev.date}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--theme-text-muted)' }}>
                  {ev.seats}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            className="px-8 py-3 rounded-xl text-sm font-semibold border hover:scale-105 transition-transform"
            style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
          >
            View Full Calendar →
          </button>
        </div>

      </div>
    </section>
  );
}
