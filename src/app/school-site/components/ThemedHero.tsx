'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { PublicSchoolData } from '@/lib/schoolRegistry';

interface ThemedHeroProps {
  school: PublicSchoolData;
}

function HeroSplit({ school }: ThemedHeroProps) {
  const { theme } = useTheme();
  return (
    <div
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      {/* Background subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, var(--theme-accent) 0, var(--theme-accent) 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-28 lg:py-20 relative z-10">
        {/* Left content */}
        <div className="space-y-6">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              borderColor: 'var(--theme-accent)',
              color: 'var(--theme-accent)',
              backgroundColor: 'rgba(255,255,255,0.05)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-accent)' }} />
            {school.board} Affiliated · Est. {school.established}
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ color: 'var(--theme-text-light)' }}
          >
            {school.name}
          </h1>

          {school.tagline && (
            <p className="text-base sm:text-lg max-w-xl leading-relaxed" style={{ color: 'var(--theme-text-muted)' }}>
              {school.tagline}
            </p>
          )}

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 pt-2">
            {[
              { label: 'Students', value: school.students.toLocaleString() },
              { label: 'Teachers', value: school.teachers.toString() },
              { label: 'Board', value: school.board },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold" style={{ color: 'var(--theme-accent)' }}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--theme-text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              className="px-6 py-3 rounded-xl font-semibold text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform"
              style={{
                background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                color: 'var(--theme-primary)',
              }}
              onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply for Admission
            </button>
            <button
              className="px-6 py-3 rounded-xl font-semibold text-sm border hover:bg-white/10 transition-colors"
              style={{
                borderColor: 'var(--theme-text-muted)',
                color: 'var(--theme-text-light)',
              }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Right decorative block */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-80 h-80">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border-2 opacity-20 animate-spin"
              style={{ borderColor: 'var(--theme-accent)', animationDuration: '20s' }}
            />
            {/* Middle ring */}
            <div
              className="absolute inset-8 rounded-full border opacity-30"
              style={{ borderColor: 'var(--theme-secondary)' }}
            />
            {/* Center */}
            <div
              className="absolute inset-16 rounded-full flex items-center justify-center text-6xl font-black shadow-2xl"
              style={{
                background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                color: 'var(--theme-primary)',
              }}
            >
              {school.name.charAt(0)}
            </div>
            {/* Floating dots */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: i % 2 === 0 ? 'var(--theme-accent)' : 'var(--theme-secondary)',
                  top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 140}px - 6px)`,
                  left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 140}px - 6px)`,
                  opacity: 0.7,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="text-xs text-white">Scroll</span>
        <svg className="w-4 h-4 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function HeroMinimal({ school }: ThemedHeroProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--theme-bg)' }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{ background: `radial-gradient(circle at 50% 40%, var(--theme-primary), transparent 70%)` }}
      />
      <div className="max-w-3xl mx-auto px-6 py-32 relative z-10 space-y-6">
        <div
          className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2"
          style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
        >
          {school.board} · {school.city}
        </div>
        <h1 className="text-5xl sm:text-7xl font-black leading-none tracking-tight" style={{ color: 'var(--theme-primary)' }}>
          {school.name}
        </h1>
        {school.tagline && (
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">{school.tagline}</p>
        )}
        <div className="flex justify-center gap-4 pt-4">
          <button
            className="px-8 py-3 rounded-xl font-semibold text-sm shadow-lg hover:scale-105 transition-transform"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
            onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Apply Now →
          </button>
        </div>
      </div>
    </div>
  );
}

function HeroGradient({ school }: ThemedHeroProps) {
  return (
    <div
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 50%, var(--theme-accent) 100%)`,
      }}
    >
      {/* Geometric overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <polygon points="0,0 400,0 200,300" fill="white" opacity="0.3" />
          <polygon points="800,0 800,400 400,600" fill="white" opacity="0.2" />
          <circle cx="650" cy="100" r="200" fill="white" opacity="0.1" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-28 relative z-10 max-w-2xl">
        <span
          className="inline-block px-3 py-1 rounded-lg text-xs font-bold mb-6 uppercase tracking-widest"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
        >
          Est. {school.established}
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
          {school.name}
        </h1>
        {school.tagline && (
          <p className="text-lg text-white/75 mb-8 leading-relaxed">{school.tagline}</p>
        )}
        <div className="flex flex-wrap gap-6 mb-8">
          {[
            { v: school.students.toLocaleString(), l: 'Students' },
            { v: school.teachers.toString(), l: 'Teachers' },
            { v: school.board, l: 'Board' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-black text-white">{s.v}</div>
              <div className="text-xs text-white/60 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
        <button
          className="px-8 py-3.5 rounded-xl bg-white font-bold text-sm hover:scale-105 transition-transform shadow-xl"
          style={{ color: 'var(--theme-primary)' }}
          onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Apply for Admission
        </button>
      </div>
    </div>
  );
}

export default function ThemedHero({ school }: ThemedHeroProps) {
  const { theme } = useTheme();
  const style = theme.heroStyle;

  if (style === 'minimal') return <HeroMinimal school={school} />;
  if (style === 'gradient' || style === 'geometric' || style === 'image-overlay') {
    return <HeroGradient school={school} />;
  }
  return <HeroSplit school={school} />;
}
