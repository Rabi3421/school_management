'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type CategoryKey = 'All' | 'Sports' | 'Academic' | 'Cultural' | 'Meeting' | 'Workshop' | 'Trip';

const categories: { label: CategoryKey; icon: string; color: string }[] = [
  { label: 'All', icon: 'Squares2X2Icon', color: 'text-foreground' },
  { label: 'Sports', icon: 'TrophyIcon', color: 'text-emerald-600' },
  { label: 'Academic', icon: 'AcademicCapIcon', color: 'text-blue-600' },
  { label: 'Cultural', icon: 'MusicalNoteIcon', color: 'text-violet-600' },
  { label: 'Meeting', icon: 'UsersIcon', color: 'text-amber-600' },
  { label: 'Workshop', icon: 'WrenchScrewdriverIcon', color: 'text-rose-600' },
  { label: 'Trip', icon: 'MapIcon', color: 'text-teal-600' },
];

const categoryStyles: Record<CategoryKey, { badge: string; dot: string }> = {
  All: { badge: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
  Sports: { badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500' },
  Academic: { badge: 'bg-blue-50 text-blue-700 border border-blue-200', dot: 'bg-blue-500' },
  Cultural: { badge: 'bg-violet-50 text-violet-700 border border-violet-200', dot: 'bg-violet-500' },
  Meeting: { badge: 'bg-amber-50 text-amber-700 border border-amber-200', dot: 'bg-amber-500' },
  Workshop: { badge: 'bg-rose-50 text-rose-700 border border-rose-200', dot: 'bg-rose-500' },
  Trip: { badge: 'bg-teal-50 text-teal-700 border border-teal-200', dot: 'bg-teal-500' },
};

const allEvents: {
  title: string; date: { day: string; month: string }; time: string; venue: string;
  category: CategoryKey; desc: string; grade: string;
}[] = [
  { title: 'Annual Sports Day 2026', date: { day: '12', month: 'Apr' }, time: '7:30 AM', venue: 'School Ground', category: 'Sports', desc: 'Athletics, team sports, relay races, and prize distribution.', grade: 'All Grades' },
  { title: 'Quarterly PTM – Term 3', date: { day: '18', month: 'Apr' }, time: '10:00 AM', venue: 'Classrooms', category: 'Meeting', desc: 'Parent-teacher meeting for Grade I–XII. Carry the progress report.', grade: 'Grade I–XII' },
  { title: 'Science & Technology Fair', date: { day: '20', month: 'Apr' }, time: '9:00 AM', venue: 'Auditorium & Labs', category: 'Academic', desc: 'Students showcase science projects judged by IIT Delhi faculty.', grade: 'Grade VI–XII' },
  { title: 'Robotics Workshop', date: { day: '26', month: 'Apr' }, time: '10:00 AM', venue: 'Robotics Studio', category: 'Workshop', desc: 'Hands-on Lego Mindstorms & Arduino workshop for aspiring engineers.', grade: 'Grade VII–X' },
  { title: 'Annual Cultural Night', date: { day: '05', month: 'May' }, time: '5:00 PM', venue: 'Auditorium', category: 'Cultural', desc: 'Dance, drama, music, and art performances by all grades.', grade: 'All Grades' },
  { title: 'Mathematics Olympiad', date: { day: '10', month: 'May' }, time: '9:00 AM', venue: 'Examination Hall', category: 'Academic', desc: 'Inter-school Maths Olympiad for top 50 students from Grade VIII–X.', grade: 'Grade VIII–X' },
  { title: 'Heritage Walk – Lodi Garden', date: { day: '15', month: 'May' }, time: '6:30 AM', venue: 'Lodi Garden, Delhi', category: 'Trip', desc: 'History and culture field trip to Lodi Garden monuments.', grade: 'Grade VI–VIII' },
  { title: 'Debate Championship', date: { day: '22', month: 'May' }, time: '11:00 AM', venue: 'Auditorium', category: 'Academic', desc: 'Annual inter-house debate competition. Theme: Technology & Society.', grade: 'Grade IX–XII' },
  { title: 'Yoga & Wellness Day', date: { day: '28', month: 'May' }, time: '7:00 AM', venue: 'School Ground', category: 'Workshop', desc: 'International Yoga Day celebration with meditation and wellness talks.', grade: 'All Grades' },
  { title: 'Basketball Tournament', date: { day: '02', month: 'Jun' }, time: '8:00 AM', venue: 'Basketball Court', category: 'Sports', desc: 'Inter-school basketball tournament hosted by Greenwood Academy.', grade: 'Grade VI–XII' },
  { title: 'Art & Craft Exhibition', date: { day: '08', month: 'Jun' }, time: '10:00 AM', venue: 'Art Room & Corridor', category: 'Cultural', desc: 'End-of-year art showcase — paintings, sculptures, and craft projects.', grade: 'Grade I–VIII' },
  { title: 'Alumni Meet 2026', date: { day: '15', month: 'Jun' }, time: '4:00 PM', venue: 'Auditorium & Ground', category: 'Cultural', desc: 'Annual reunion for Greenwood alumni. Open to all passing-out batches.', grade: 'Alumni & Grade XII' },
];

export default function EventsCalendar() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('All');

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

  const filtered = activeCategory === 'All' ? allEvents : allEvents.filter((e) => e.category === activeCategory);

  return (
    <section id="calendar" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="CalendarDaysIcon" size={13} />
            Full Calendar
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
            All Events{' '}
            <span className="gradient-text">Apr – Jun 2026</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Filter by category to find events relevant to your child's grade and interests.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="reveal-hidden flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeCategory === cat.label
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-muted border-border hover:border-primary/30 hover:text-primary'
              }`}
            >
              <Icon name={cat.icon as 'TrophyIcon'} size={12} />
              {cat.label}
              {cat.label !== 'All' && (
                <span className={`ml-0.5 text-2xs ${activeCategory === cat.label ? 'text-white/70' : 'text-muted-light'}`}>
                  ({allEvents.filter((e) => e.category === cat.label).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event, i) => {
            const style = categoryStyles[event.category];
            return (
              <div
                key={`${event.title}-${i}`}
                className="flex flex-col p-5 rounded-2xl bg-background border border-border hover:border-primary/25 hover:shadow-card transition-all duration-200 group card-lift"
              >
                {/* Date + category row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex flex-col items-center justify-center text-white flex-shrink-0">
                    <span className="font-display font-800 text-xl leading-none">{event.date.day}</span>
                    <span className="text-2xs font-semibold uppercase tracking-wider opacity-80">{event.date.month}</span>
                  </div>
                  <span className={`text-2xs font-semibold px-2.5 py-1 rounded-full ${style.badge}`}>
                    {event.category}
                  </span>
                </div>

                {/* Title + desc */}
                <h3 className="font-display font-700 text-sm text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                  {event.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed flex-1 mb-4">{event.desc}</p>

                {/* Meta */}
                <div className="space-y-1.5 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Icon name="ClockIcon" size={12} />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Icon name="MapPinIcon" size={12} />
                    {event.venue}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Icon name="AcademicCapIcon" size={12} />
                    {event.grade}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted">
            <Icon name="CalendarDaysIcon" size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-display font-600 text-sm">No events found in this category.</p>
          </div>
        )}

        {/* Count note */}
        <p className="text-center text-xs text-muted mt-8">
          Showing <strong className="text-foreground">{filtered.length}</strong> event{filtered.length !== 1 ? 's' : ''}{activeCategory !== 'All' ? ` in ${activeCategory}` : ''}. More events will be added as they are scheduled.
        </p>
      </div>
    </section>
  );
}
