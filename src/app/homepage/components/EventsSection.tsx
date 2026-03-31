'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const events = [
  {
    date: { day: '12', month: 'Apr' },
    title: 'Annual Sports Day 2026',
    time: '7:30 AM – 1:00 PM',
    venue: 'School Ground',
    category: 'Sports',
    categoryColor: 'bg-success/10 text-success',
    desc: 'A day of athletic events, team sports, and prize distribution. All parents are invited.',
  },
  {
    date: { day: '20', month: 'Apr' },
    title: 'Science & Technology Fair',
    time: '9:00 AM – 4:00 PM',
    venue: 'School Auditorium',
    category: 'Academic',
    categoryColor: 'bg-primary/10 text-primary',
    desc: 'Students from Grade VI–XII showcase innovative science projects and working models.',
  },
  {
    date: { day: '25', month: 'Apr' },
    title: 'Parent-Teacher Meeting',
    time: '10:00 AM – 1:00 PM',
    venue: 'Respective Classrooms',
    category: 'Meeting',
    categoryColor: 'bg-warning/10 text-warning',
    desc: 'Quarterly PTM for Grade I–XII. Parents are requested to carry the report card.',
  },
  {
    date: { day: '05', month: 'May' },
    title: 'Annual Cultural Night',
    time: '5:00 PM – 9:00 PM',
    venue: 'School Auditorium',
    category: 'Cultural',
    categoryColor: 'bg-accent/10 text-accent',
    desc: 'An evening of dance, drama, music, and art performances by students of all grades.',
  },
];

export default function EventsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref?.current?.querySelectorAll('.reveal-hidden');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('reveal-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="events" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="CalendarDaysIcon" size={13} />
              Upcoming Events
            </div>
            <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight" style={{ transitionDelay: '0.1s' }}>
              What's Happening at Greenwood
            </h2>
          </div>
          <a href="#" className="reveal-hidden text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors" style={{ transitionDelay: '0.1s' }}>
            Full Calendar <Icon name="ArrowRightIcon" size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {events?.map((event, i) => (
            <div
              key={event?.title}
              className="reveal-hidden flex gap-5 p-5 rounded-2xl bg-white border border-border hover:shadow-card hover:border-primary/20 transition-all duration-200 group"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              {/* Date block */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary flex flex-col items-center justify-center text-white">
                <span className="font-display font-800 text-xl leading-none">{event?.date?.day}</span>
                <span className="text-2xs font-semibold uppercase tracking-wider opacity-80">{event?.date?.month}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-2xs font-semibold px-2 py-0.5 rounded-md ${event?.categoryColor}`}>
                    {event?.category}
                  </span>
                </div>
                <h3 className="font-display font-700 text-sm text-foreground group-hover:text-primary transition-colors mb-1 leading-snug">
                  {event?.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-2">{event?.desc}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1 text-xs text-muted-light">
                    <Icon name="ClockIcon" size={12} />
                    {event?.time}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-light">
                    <Icon name="MapPinIcon" size={12} />
                    {event?.venue}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
