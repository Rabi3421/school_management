'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';

const ANNOUNCEMENTS = [
  {
    date: 'Dec 15, 2025',
    category: 'Examination',
    title: 'Class X & XII Pre-Board Examination Schedule Released',
    desc: 'Pre-board exams for Classes X and XII will commence from January 10, 2026. Download the detailed timetable from the student portal.',
    urgent: true,
  },
  {
    date: 'Dec 10, 2025',
    category: 'Admissions',
    title: 'Admissions Open for 2026–27 Academic Session',
    desc: 'Applications for Classes I, VI, and IX are now open. Limited seats available — register early to avoid disappointment.',
    urgent: false,
  },
  {
    date: 'Dec 5, 2025',
    category: 'Events',
    title: 'Annual Sports Day — January 25, 2026',
    desc: 'Our Annual Sports Day will be held on the school grounds. All students are encouraged to participate in at least one event.',
    urgent: false,
  },
  {
    date: 'Nov 30, 2025',
    category: 'Holiday',
    title: 'Winter Break Notification',
    desc: 'School will remain closed from December 22 to January 3 for winter vacation. Classes resume on January 4, 2026.',
    urgent: false,
  },
];

export default function ThemedAnnouncements() {
  const { theme } = useTheme();

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--theme-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
              style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
            >
              Notice Board
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: 'var(--theme-text)' }}>
              Announcements
            </h2>
          </div>
          <button
            className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            style={{ color: 'var(--theme-primary)' }}
          >
            View All <span>→</span>
          </button>
        </div>

        {/* Announcements list */}
        <div className="space-y-4">
          {ANNOUNCEMENTS.map((a, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl border flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow cursor-pointer group"
              style={{
                backgroundColor: 'var(--theme-bg)',
                borderColor: a.urgent ? 'var(--theme-accent)' : 'var(--theme-border)',
                borderLeftWidth: a.urgent ? 4 : 1,
              }}
            >
              {/* Date block */}
              <div
                className="hidden sm:flex flex-col items-center justify-center w-16 h-16 rounded-xl shrink-0 text-center"
                style={{ backgroundColor: 'var(--theme-bg-alt)' }}
              >
                <div className="text-xs font-bold" style={{ color: 'var(--theme-text-muted)' }}>
                  {a.date.split(' ')[0]}
                </div>
                <div className="text-2xl font-black" style={{ color: 'var(--theme-primary)' }}>
                  {a.date.split(' ')[1].replace(',', '')}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: a.urgent ? 'var(--theme-accent)' : 'var(--theme-bg-alt)',
                      color: a.urgent ? 'var(--theme-primary)' : 'var(--theme-text-muted)',
                    }}
                  >
                    {a.category}
                  </span>
                  {a.urgent && (
                    <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse inline-block" />
                      Urgent
                    </span>
                  )}
                  <span className="text-xs sm:hidden" style={{ color: 'var(--theme-text-muted)' }}>{a.date}</span>
                </div>
                <h3
                  className="font-bold text-base mb-1 group-hover:underline"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {a.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
