'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const pastEvents = [
  {
    title: 'Annual Sports Day 2025',
    date: 'March 2025',
    category: 'Sports',
    achievement: '1st place: House Indus',
    gradient: 'from-emerald-500 to-teal-400',
    icon: 'TrophyIcon',
    stats: [
      { label: 'Participants', value: '800+' },
      { label: 'Events Held', value: '22' },
    ],
    quote: 'An electrifying day of athletics, sportsmanship, and team spirit.',
  },
  {
    title: 'Science Expo 2025',
    date: 'February 2025',
    category: 'Academic',
    achievement: 'Best Project: AI Plant Monitor',
    gradient: 'from-blue-500 to-cyan-400',
    icon: 'BeakerIcon',
    stats: [
      { label: 'Projects', value: '90+' },
      { label: 'Visitors', value: '500+' },
    ],
    quote: 'Young innovators presented solutions to real-world problems.',
  },
  {
    title: 'Cultural Night 2025',
    date: 'January 2025',
    category: 'Cultural',
    achievement: 'Best Act: Classical Dance Troupe',
    gradient: 'from-violet-500 to-purple-400',
    icon: 'MusicalNoteIcon',
    stats: [
      { label: 'Performances', value: '24' },
      { label: 'Audience', value: '350+' },
    ],
    quote: 'An unforgettable evening of creativity, colour, and culture.',
  },
  {
    title: 'Inter-School Debate 2025',
    date: 'December 2024',
    category: 'Academic',
    achievement: 'Winners: Greenwood Team A',
    gradient: 'from-amber-500 to-orange-400',
    icon: 'MicrophoneIcon',
    stats: [
      { label: 'Schools', value: '12' },
      { label: 'Debaters', value: '60+' },
    ],
    quote: 'Sharp minds, bold ideas, and compelling arguments filled the hall.',
  },
  {
    title: 'Eco Club Drive 2024',
    date: 'November 2024',
    category: 'Workshop',
    achievement: '500 saplings planted',
    gradient: 'from-lime-500 to-green-500',
    icon: 'GlobeAltIcon',
    stats: [
      { label: 'Volunteers', value: '200+' },
      { label: 'Trees Planted', value: '500' },
    ],
    quote: 'Students led a city-wide plantation drive for a greener tomorrow.',
  },
  {
    title: 'Agra Heritage Trip 2024',
    date: 'October 2024',
    category: 'Trip',
    achievement: 'Best Photo: Riya Sharma, Grade VIII',
    gradient: 'from-rose-500 to-pink-400',
    icon: 'MapIcon',
    stats: [
      { label: 'Students', value: '120' },
      { label: 'Monuments', value: '4 visited' },
    ],
    quote: 'History came alive as students walked through the Taj and Agra Fort.',
  },
];

const categoryBadge: Record<string, string> = {
  Sports: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Academic: 'bg-blue-50 text-blue-700 border border-blue-200',
  Cultural: 'bg-violet-50 text-violet-700 border border-violet-200',
  Workshop: 'bg-rose-50 text-rose-700 border border-rose-200',
  Trip: 'bg-teal-50 text-teal-700 border border-teal-200',
};

export default function PastHighlights() {
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
    <section id="highlights" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="PhotoIcon" size={13} />
            Past Highlights
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
            Memories We{' '}
            <span className="gradient-text">Cherish</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            A look back at some of our most memorable events from the past year — moments that define the Greenwood spirit.
          </p>
        </div>

        {/* Past event cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pastEvents.map((ev, i) => (
            <div
              key={ev.title}
              className="reveal-hidden flex flex-col rounded-2xl border border-border bg-white overflow-hidden hover:shadow-card hover:border-primary/20 transition-all duration-300 card-lift group"
              style={{ transitionDelay: `${0.06 * i}s` }}
            >
              {/* Gradient image area */}
              <div className={`relative h-36 bg-gradient-to-br ${ev.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <div className="w-40 h-40 rounded-full border-2 border-white" />
                  <div className="absolute w-56 h-56 rounded-full border border-white" />
                </div>
                <div className="relative z-10 flex flex-col items-center text-white gap-2">
                  <div className="w-14 h-14 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                    <Icon name={ev.icon as 'TrophyIcon'} size={28} className="text-white" />
                  </div>
                </div>
                {/* Date tag */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/25 text-white text-xs font-semibold backdrop-blur-sm">
                  {ev.date}
                </div>
                {/* Category */}
                <div className="absolute bottom-3 left-3">
                  <span className={`text-2xs font-semibold px-2.5 py-1 rounded-full ${categoryBadge[ev.category] ?? 'bg-white/20 text-white border border-white/30'}`}>
                    {ev.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-display font-700 text-sm text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">{ev.title}</h3>
                <p className="text-xs text-muted italic leading-relaxed mb-4 flex-1">"{ev.quote}"</p>

                {/* Stats row */}
                <div className="flex gap-4 mb-3">
                  {ev.stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-display font-800 text-base text-foreground leading-tight">{s.value}</div>
                      <div className="text-2xs text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Achievement */}
                <div className="flex items-center gap-2 pt-3 border-t border-border text-xs text-muted">
                  <Icon name="TrophyIcon" size={12} className="text-amber-500 flex-shrink-0" variant="solid" />
                  {ev.achievement}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View full gallery nudge */}
        <div className="text-center mt-10">
          <p className="text-sm text-muted mb-4">Want to relive all the memories?</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-white text-foreground text-sm font-semibold hover:border-primary/30 hover:shadow-soft transition-all duration-200 card-lift">
            <Icon name="PhotoIcon" size={16} className="text-primary" />
            View Full Photo Gallery
            <Icon name="ArrowRightIcon" size={14} className="text-muted" />
          </button>
        </div>
      </div>
    </section>
  );
}
