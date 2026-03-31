'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type Category = 'All' | 'Sports' | 'Academic' | 'Cultural' | 'Technology' | 'Events' | 'Milestones';

const categories: { label: Category; icon: string }[] = [
  { label: 'All', icon: 'Squares2X2Icon' },
  { label: 'Sports', icon: 'TrophyIcon' },
  { label: 'Academic', icon: 'AcademicCapIcon' },
  { label: 'Cultural', icon: 'MusicalNoteIcon' },
  { label: 'Technology', icon: 'CpuChipIcon' },
  { label: 'Events', icon: 'CalendarDaysIcon' },
  { label: 'Milestones', icon: 'StarIcon' },
];

const allPhotos: {
  label: string;
  category: Category;
  year: string;
  gradient: string;
  icon: string;
  span?: string;
  count: number;
}[] = [
  { label: 'Annual Sports Day 2025', category: 'Sports', year: '2025', gradient: 'from-emerald-500/40 to-teal-400/20', icon: 'TrophyIcon', span: 'lg:col-span-2 lg:row-span-2', count: 48 },
  { label: 'Science Fair 2025', category: 'Academic', year: '2025', gradient: 'from-blue-500/40 to-cyan-400/20', icon: 'BeakerIcon', count: 32 },
  { label: 'Cultural Night 2025', category: 'Cultural', year: '2025', gradient: 'from-violet-500/40 to-purple-400/20', icon: 'MusicalNoteIcon', count: 56 },
  { label: 'Robotics Workshop', category: 'Technology', year: '2025', gradient: 'from-amber-500/40 to-orange-400/20', icon: 'CpuChipIcon', count: 24 },
  { label: 'Republic Day 2026', category: 'Events', year: '2026', gradient: 'from-rose-500/40 to-pink-400/20', icon: 'FlagIcon', span: 'sm:col-span-2', count: 38 },
  { label: 'Graduation 2025', category: 'Milestones', year: '2025', gradient: 'from-indigo-500/40 to-blue-400/20', icon: 'AcademicCapIcon', count: 62 },
  { label: 'Inter-School Debate', category: 'Academic', year: '2025', gradient: 'from-sky-500/40 to-blue-300/20', icon: 'MicrophoneIcon', count: 18 },
  { label: 'Basketball Tournament', category: 'Sports', year: '2026', gradient: 'from-green-500/40 to-emerald-300/20', icon: 'TrophyIcon', count: 29 },
  { label: 'Art Exhibition', category: 'Cultural', year: '2025', gradient: 'from-fuchsia-500/40 to-pink-400/20', icon: 'PaintBrushIcon', count: 44 },
  { label: 'STEM Olympiad', category: 'Technology', year: '2026', gradient: 'from-cyan-500/40 to-blue-400/20', icon: 'CpuChipIcon', count: 21 },
  { label: 'Annual Day 2025', category: 'Events', year: '2025', gradient: 'from-yellow-500/40 to-amber-300/20', icon: 'CalendarDaysIcon', span: 'lg:col-span-2', count: 75 },
  { label: 'First Day of School 2025', category: 'Milestones', year: '2025', gradient: 'from-teal-500/40 to-cyan-300/20', icon: 'StarIcon', count: 30 },
];

export default function GalleryGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<null | typeof allPhotos[0]>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal-hidden');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('reveal-visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = active === 'All' ? allPhotos : allPhotos.filter((p) => p.category === active);

  return (
    <section id="gallery-grid" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="PhotoIcon" size={13} />
            Browse by Category
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
            Our{' '}
            <span className="gradient-text">Photo Albums</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Browse through moments from sports, academics, cultural programmes, and more.
          </p>
        </div>

        {/* Filter pills */}
        <div className="reveal-hidden flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActive(cat.label)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                active === cat.label
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-muted border-border hover:border-primary/30 hover:text-primary'
              }`}
            >
              <Icon name={cat.icon as 'TrophyIcon'} size={12} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[170px]">
          {filtered.map((item, i) => (
            <div
              key={item.label}
              onClick={() => setLightbox(item)}
              className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-border group cursor-pointer hover:shadow-card transition-all duration-300 ${item.span ?? ''}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-xl bg-white/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow">
                  <Icon name={item.icon as 'TrophyIcon'} size={24} className="text-foreground/70" />
                </div>
                <span className="text-xs font-semibold text-foreground/80 text-center leading-tight">{item.label}</span>
                <span className="text-2xs text-foreground/50 mt-1">{item.year} · {item.count} photos</span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <Icon name="MagnifyingGlassPlusIcon" size={28} className="mx-auto mb-2" />
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-white/70 mt-1">{item.count} photos</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            <Icon name="PhotoIcon" size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">No photos in this category yet.</p>
          </div>
        )}

        <p className="text-center text-xs text-muted mt-8">
          Showing <strong className="text-foreground">{filtered.length}</strong> album{filtered.length !== 1 ? 's' : ''}{active !== 'All' ? ` in ${active}` : ''}.
          More photos are added after every event.
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className={`relative w-full max-w-lg rounded-3xl overflow-hidden bg-gradient-to-br ${lightbox.gradient} border border-white/20 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors"
            >
              <Icon name="XMarkIcon" size={18} />
            </button>
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-white/30 flex items-center justify-center shadow-lg">
                <Icon name={lightbox.icon as 'TrophyIcon'} size={36} className="text-foreground/70" />
              </div>
              <div className="text-center px-6">
                <div className="font-display font-800 text-xl text-foreground mb-1">{lightbox.label}</div>
                <div className="text-sm text-foreground/60">{lightbox.category} · {lightbox.year}</div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-6 py-5 flex items-center justify-between">
              <div>
                <div className="font-display font-700 text-sm text-foreground">{lightbox.count} Photos</div>
                <div className="text-xs text-muted">Click photos to view full size</div>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                <Icon name="ArrowDownTrayIcon" size={14} />
                Download Album
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
