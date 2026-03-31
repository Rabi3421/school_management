'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const featured = [
  {
    id: 1,
    title: 'Annual Sports Day 2026',
    date: { day: '12', month: 'Apr', year: '2026' },
    time: '7:30 AM – 1:00 PM',
    venue: 'School Ground, Main Campus',
    category: 'Sports',
    categoryIcon: 'TrophyIcon',
    gradient: 'from-emerald-600 to-teal-500',
    accentColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-600 border-emerald-200',
    desc: 'Our flagship annual sports extravaganza! Track-and-field events, team sports, relay races, and a grand prize distribution ceremony. All parents and guardians are warmly invited to cheer on their champions.',
    highlights: ['100m, 200m, 400m sprint events', 'Football & Basketball finals', 'Prize distribution by Chief Guest', 'Open to all grade levels'],
    registrationOpen: true,
    seats: '—',
    icon: 'TrophyIcon',
  },
  {
    id: 2,
    title: 'Science & Technology Fair',
    date: { day: '20', month: 'Apr', year: '2026' },
    time: '9:00 AM – 4:00 PM',
    venue: 'School Auditorium & Labs',
    category: 'Academic',
    categoryIcon: 'BeakerIcon',
    gradient: 'from-blue-600 to-cyan-500',
    accentColor: 'text-blue-400',
    badgeBg: 'bg-blue-500/15 text-blue-700 border-blue-200',
    desc: 'Students from Grade VI–XII present cutting-edge science projects, working models, and technology innovations. A panel of judges from IIT Delhi and industry will evaluate and award top projects.',
    highlights: ['100+ student projects on display', 'IIT Delhi judge panel', 'Best Project cash prizes', 'Open to public — free entry'],
    registrationOpen: true,
    seats: '120 visitor passes',
    icon: 'BeakerIcon',
  },
  {
    id: 3,
    title: 'Annual Cultural Night 2026',
    date: { day: '05', month: 'May', year: '2026' },
    time: '5:00 PM – 9:00 PM',
    venue: 'School Auditorium',
    category: 'Cultural',
    categoryIcon: 'MusicalNoteIcon',
    gradient: 'from-violet-600 to-purple-500',
    accentColor: 'text-violet-400',
    badgeBg: 'bg-violet-500/15 text-violet-700 border-violet-200',
    desc: 'An enchanting evening of dance, drama, music, and art performances by students across all grades. Our cultural showcase features over 20 acts spanning classical, contemporary, and folk art forms.',
    highlights: ['20+ performances across genres', 'Classical dance & Bollywood', 'Drama & one-act plays', 'Art exhibition in the foyer'],
    registrationOpen: false,
    seats: '300 parent passes',
    icon: 'MusicalNoteIcon',
  },
];

export default function FeaturedEvents() {
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
    <section id="upcoming" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="StarIcon" size={13} variant="solid" />
            Featured Events
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
            Upcoming{' '}
            <span className="gradient-text">Highlights</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Mark your calendars — these are the big events every Greenwood family looks forward to each year.
          </p>
        </div>

        {/* Featured event cards */}
        <div className="flex flex-col gap-6">
          {featured.map((event, i) => (
            <div
              key={event.id}
              className="reveal-hidden rounded-2xl border border-border bg-white overflow-hidden hover:shadow-card transition-all duration-300 card-lift"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              <div className="flex flex-col lg:flex-row">

                {/* Left: gradient date panel */}
                <div className={`bg-gradient-to-br ${event.gradient} lg:w-52 flex-shrink-0 p-6 flex flex-col items-center justify-center text-white text-center gap-2`}>
                  <div className="font-display font-900 text-6xl leading-none">{event.date.day}</div>
                  <div className="text-lg font-semibold opacity-90">{event.date.month} {event.date.year}</div>
                  <div className="mt-2 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                    <Icon name={event.icon as 'TrophyIcon'} size={20} className="text-white" />
                  </div>
                  <span className={`mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 border border-white/25`}>
                    {event.category}
                  </span>
                </div>

                {/* Right: content */}
                <div className="flex-1 p-6 lg:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-display font-800 text-xl text-foreground leading-tight mb-1">{event.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted">
                        <span className="flex items-center gap-1.5">
                          <Icon name="ClockIcon" size={13} />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Icon name="MapPinIcon" size={13} />
                          {event.venue}
                        </span>
                      </div>
                    </div>
                    {event.registrationOpen ? (
                      <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Registration Open
                      </span>
                    ) : (
                      <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        <Icon name="ClockIcon" size={11} />
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-5">{event.desc}</p>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    {event.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-sm text-foreground">
                        <Icon name="CheckCircleIcon" size={14} className="text-primary flex-shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
                    <span className="text-xs text-muted flex items-center gap-1.5">
                      <Icon name="TicketIcon" size={13} />
                      {event.seats !== '—' ? `Capacity: ${event.seats}` : 'Open to all students & parents'}
                    </span>
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                      Learn More <Icon name="ArrowRightIcon" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
