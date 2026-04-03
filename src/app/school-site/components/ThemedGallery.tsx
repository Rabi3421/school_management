'use client';

import React, { useState } from 'react';
import { useTheme } from '@/themes/ThemeProvider';

const GALLERY_ITEMS = [
  { emoji: '🏫', label: 'Main Building', category: 'Campus' },
  { emoji: '⚽', label: 'Sports Ground', category: 'Sports' },
  { emoji: '🔬', label: 'Science Lab', category: 'Labs' },
  { emoji: '💻', label: 'Computer Lab', category: 'Labs' },
  { emoji: '📚', label: 'Library', category: 'Campus' },
  { emoji: '🎨', label: 'Art Studio', category: 'Arts' },
  { emoji: '🎭', label: 'Auditorium', category: 'Campus' },
  { emoji: '🏊', label: 'Swimming Pool', category: 'Sports' },
  { emoji: '🌿', label: 'School Garden', category: 'Campus' },
];

const CATEGORIES = ['All', 'Campus', 'Sports', 'Labs', 'Arts'];

export default function ThemedGallery() {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.category === activeCategory);

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--theme-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
          >
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--theme-text)' }}>
            Campus Life
          </h2>
          <p className="text-base max-w-xl mx-auto mb-8" style={{ color: 'var(--theme-text-muted)' }}>
            A glimpse into the vibrant world of our school — from modern facilities to memorable moments.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={
                  activeCategory === cat
                    ? { backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }
                    : { backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text-muted)', border: '1px solid var(--theme-border)' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filtered.map((item, i) => (
            <div
              key={`${activeCategory}-${i}`}
              className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-3 border hover:scale-105 transition-transform cursor-pointer group overflow-hidden relative"
              style={{
                background: `linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)`,
                borderColor: 'var(--theme-border)',
              }}
            >
              <div className="text-6xl group-hover:scale-110 transition-transform">
                {item.emoji}
              </div>
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <span
                className="absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-md"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
              >
                {item.category}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            className="px-8 py-3 rounded-xl text-sm font-semibold border hover:scale-105 transition-transform"
            style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
          >
            View Full Gallery →
          </button>
        </div>

      </div>
    </section>
  );
}
