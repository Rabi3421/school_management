'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const albums = [
  {
    title: 'Sports Day 2025',
    desc: 'Track events, team sports, medals, and closing ceremony highlights.',
    count: 48,
    icon: 'TrophyIcon',
    gradient: 'from-emerald-500 to-teal-600',
    year: '2025',
    tag: 'Sports',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Cultural Night 2025',
    desc: 'Dance, music, drama, and art performances by students across all grades.',
    count: 56,
    icon: 'MusicalNoteIcon',
    gradient: 'from-violet-500 to-purple-700',
    year: '2025',
    tag: 'Cultural',
    tagColor: 'bg-violet-100 text-violet-700',
  },
  {
    title: 'Science & Tech Fair',
    desc: 'Student innovations, robotics demos, and award-winning science projects.',
    count: 53,
    icon: 'BeakerIcon',
    gradient: 'from-blue-500 to-cyan-600',
    year: '2025',
    tag: 'Academic',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Graduation 2025',
    desc: 'Caps, gowns, and heartfelt goodbyes — memories of our graduating class.',
    count: 62,
    icon: 'AcademicCapIcon',
    gradient: 'from-indigo-500 to-blue-700',
    year: '2025',
    tag: 'Milestones',
    tagColor: 'bg-indigo-100 text-indigo-700',
  },
  {
    title: 'Annual Day 2025',
    desc: 'Speeches, awards, and performances at our biggest annual celebration.',
    count: 75,
    icon: 'CalendarDaysIcon',
    gradient: 'from-amber-500 to-orange-600',
    year: '2025',
    tag: 'Events',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Art Exhibition 2025',
    desc: 'Paintings, sculptures, and digital art crafted by our talented students.',
    count: 44,
    icon: 'PaintBrushIcon',
    gradient: 'from-fuchsia-500 to-pink-600',
    year: '2025',
    tag: 'Cultural',
    tagColor: 'bg-fuchsia-100 text-fuchsia-700',
  },
];

export default function GalleryAlbums() {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={ref}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
              <Icon name="FolderOpenIcon" size={13} />
              Featured Albums
            </div>
            <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight" style={{ transitionDelay: '0.05s' }}>
              Handpicked{' '}
              <span className="gradient-text">Collections</span>
            </h2>
          </div>
          <p className="reveal-hidden text-muted text-sm max-w-xs leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Each album captures a unique chapter of school life at Greenwood Academy.
          </p>
        </div>

        {/* Albums grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album, i) => (
            <div
              key={album.title}
              className="reveal-hidden group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-card card-lift transition-all duration-300"
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {/* Cover */}
              <div className={`h-36 bg-gradient-to-br ${album.gradient} relative flex items-center justify-center`}>
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow">
                  <Icon name={album.icon as 'TrophyIcon'} size={30} className="text-white" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold text-white/80 bg-white/20 px-2 py-0.5 rounded-full">{album.year}</span>
                </div>
                {/* Photo strip decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/10 backdrop-blur-sm flex items-center gap-1 px-3">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="flex-1 h-4 rounded-sm bg-white/20" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-display font-700 text-base text-foreground leading-snug">{album.title}</h3>
                  <span className={`shrink-0 text-2xs font-semibold px-2 py-0.5 rounded-full ${album.tagColor}`}>
                    {album.tag}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-4">{album.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <Icon name="PhotoIcon" size={12} />
                    {album.count} photos
                  </span>
                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/70 transition-colors">
                    View Album
                    <Icon name="ArrowRightIcon" size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="reveal-hidden text-center mt-10">
          <button
            onClick={() => document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Icon name="Squares2X2Icon" size={15} />
            View All Photos
          </button>
        </div>
      </div>
    </section>
  );
}
