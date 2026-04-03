'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { PublicSchoolData } from '@/lib/schoolRegistry';

interface ThemedAboutProps {
  school: PublicSchoolData;
}

export default function ThemedAbout({ school }: ThemedAboutProps) {
  const { theme } = useTheme();

  const values = [
    { icon: '📚', title: 'Academic Excellence', desc: 'Rigorous curriculum designed to prepare students for a changing world.' },
    { icon: '🌱', title: 'Holistic Growth', desc: 'Beyond academics — sports, arts, and life skills for every student.' },
    { icon: '🤝', title: 'Community & Values', desc: 'A nurturing environment rooted in respect, integrity, and teamwork.' },
    { icon: '🚀', title: 'Future Ready', desc: 'Technology-integrated learning that keeps students ahead of the curve.' },
  ];

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--theme-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
          >
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--theme-text)' }}>
            Who We Are
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
            {school.name} has been nurturing young minds in {school.city} since {school.established}.
            We are a {school.board}-affiliated institution committed to holistic education.
          </p>
        </div>

        {/* Stats band */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-0 rounded-2xl overflow-hidden mb-16 shadow-lg"
          style={{ background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))` }}
        >
          {[
            { value: school.established, label: 'Established' },
            { value: `${school.students.toLocaleString()}+`, label: 'Students' },
            { value: `${school.teachers}+`, label: 'Teachers' },
            { value: school.board, label: 'Board' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 text-center border-white/10"
              style={{ borderRightWidth: i < 3 ? 1 : 0, borderRightStyle: 'solid' }}
            >
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-white/60 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border group hover:shadow-lg transition-shadow"
              style={{
                backgroundColor: 'var(--theme-bg)',
                borderColor: 'var(--theme-border)',
              }}
            >
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: 'var(--theme-text)' }}>
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Principal quote */}
        <div
          className="mt-16 p-8 rounded-2xl border-l-4 relative"
          style={{
            backgroundColor: 'var(--theme-bg)',
            borderLeftColor: 'var(--theme-accent)',
          }}
        >
          <svg
            className="absolute top-6 right-6 w-12 h-12 opacity-10"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--theme-primary)' }}
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-base italic leading-relaxed mb-4" style={{ color: 'var(--theme-text)' }}>
            &ldquo;At {school.name}, we believe every child carries the spark of brilliance. Our mission is to fan that spark into a flame that lights the path for a lifetime of achievement and purpose.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{
                background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                color: 'var(--theme-primary)',
              }}
            >
              {school.principal.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: 'var(--theme-text)' }}>{school.principal}</div>
              <div className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>Principal, {school.name}</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
