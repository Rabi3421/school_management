'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const galleryItems = [
  { label: 'Annual Sports Day 2025', category: 'Sports', color: 'from-success/30 to-success/10', icon: 'TrophyIcon', span: 'lg:col-span-2 lg:row-span-2' },
  { label: 'Science Fair Projects', category: 'Academic', color: 'from-primary/30 to-primary/10', icon: 'BeakerIcon', span: '' },
  { label: 'Cultural Night Performance', category: 'Cultural', color: 'from-accent/30 to-accent/10', icon: 'MusicalNoteIcon', span: '' },
  { label: 'Robotics Club Workshop', category: 'Technology', color: 'from-warning/30 to-warning/10', icon: 'CpuChipIcon', span: '' },
  { label: 'Independence Day Celebration', category: 'Event', color: 'from-danger/30 to-danger/10', icon: 'FlagIcon', span: '' },
  { label: 'Graduation Ceremony 2025', category: 'Milestone', color: 'from-primary/20 to-accent/20', icon: 'AcademicCapIcon', span: 'sm:col-span-2' },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal-hidden');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('reveal-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="PhotoIcon" size={13} />
            Photo Gallery
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.1s' }}>
            Life at Greenwood Academy
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto" style={{ transitionDelay: '0.15s' }}>
            A glimpse into the vibrant, active, and joyful school life our students experience every day.
          </p>
        </div>

        {/* Bento gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[160px]">
          {galleryItems.map((item, i) => (
            <div
              key={item.label}
              className={`reveal-hidden relative rounded-2xl overflow-hidden bg-gradient-to-br ${item.color} border border-border group cursor-pointer ${item.span}`}
              style={{ transitionDelay: `${0.07 * i}s` }}
            >
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-xl bg-white/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={item.icon as 'TrophyIcon'} size={24} className="text-foreground/60" />
                </div>
                <span className="text-xs font-semibold text-foreground/70 text-center leading-tight">{item.label}</span>
                <span className="text-2xs text-foreground/40 mt-1">{item.category}</span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <Icon name="MagnifyingGlassPlusIcon" size={28} className="mx-auto mb-2" />
                  <div className="text-sm font-semibold">{item.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="reveal-hidden inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/20 text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
          >
            <Icon name="PhotoIcon" size={16} />
            View Full Gallery
          </a>
        </div>
      </div>
    </section>
  );
}
