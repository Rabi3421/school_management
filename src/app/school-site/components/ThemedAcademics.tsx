'use client';

import React, { useState } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { PublicSchoolData } from '@/lib/schoolRegistry';

interface ThemedAcademicsProps {
  school: PublicSchoolData;
}

const STREAMS = [
  {
    name: 'Science & Technology',
    icon: '🔬',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'],
    desc: 'Rigorous science education with modern lab facilities and practical exposure.',
  },
  {
    name: 'Commerce & Economics',
    icon: '📊',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Entrepreneurship'],
    desc: 'Building future business leaders with strong analytical and commercial foundations.',
  },
  {
    name: 'Arts & Humanities',
    icon: '🎭',
    subjects: ['History', 'Geography', 'Political Science', 'Literature', 'Fine Arts'],
    desc: 'A deep dive into culture, society, and human expression.',
  },
];

export default function ThemedAcademics({ school }: ThemedAcademicsProps) {
  const { theme } = useTheme();
  const [activeStream, setActiveStream] = useState(0);

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
          >
            Academics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--theme-text)' }}>
            Academic Programs
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
            Our {school.board}-aligned curriculum covers three core streams, each designed
            to challenge, inspire, and prepare students for their future.
          </p>
        </div>

        {/* Stream tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {STREAMS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveStream(i)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={
                activeStream === i
                  ? {
                      background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                      color: 'var(--theme-text-light)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }
                  : {
                      backgroundColor: 'var(--theme-bg-alt)',
                      color: 'var(--theme-text-muted)',
                      border: '1px solid var(--theme-border)',
                    }
              }
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Active stream detail */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg mb-16"
          style={{ border: '1px solid var(--theme-border)' }}
        >
          <div
            className="p-8 sm:p-10"
            style={{
              background: `linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)`,
            }}
          >
            <div className="text-5xl mb-4">{STREAMS[activeStream].icon}</div>
            <h3 className="text-2xl font-extrabold text-white mb-2">{STREAMS[activeStream].name}</h3>
            <p className="text-white/70 mb-6 max-w-lg">{STREAMS[activeStream].desc}</p>
            <div className="flex flex-wrap gap-2">
              {STREAMS[activeStream].subjects.map(sub => (
                <span
                  key={sub}
                  className="px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: '🏆', title: 'Board Results', stat: '98%', sub: 'Pass rate last year' },
            { icon: '👨‍🏫', title: 'Expert Faculty', stat: `${school.teachers}+`, sub: 'Qualified teachers' },
            { icon: '💡', title: 'Smart Classes', stat: '100%', sub: 'Digital-enabled rooms' },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl text-center border"
              style={{ backgroundColor: 'var(--theme-bg-alt)', borderColor: 'var(--theme-border)' }}
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <div className="text-3xl font-black mb-1" style={{ color: 'var(--theme-accent)' }}>{f.stat}</div>
              <div className="font-semibold text-sm" style={{ color: 'var(--theme-text)' }}>{f.title}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>{f.sub}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
