'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const announcements = [
  {
    type: 'Important',
    typeColor: 'bg-danger/10 text-danger',
    icon: 'MegaphoneIcon',
    title: 'Admission Open for 2025–26 Academic Session',
    date: 'March 28, 2026',
    desc: 'Applications are now open for Nursery to Grade IX. Limited seats available. Apply before April 30, 2026.',
  },
  {
    type: 'Exam',
    typeColor: 'bg-warning/10 text-warning',
    icon: 'DocumentTextIcon',
    title: 'Annual Examination Schedule Released',
    date: 'March 25, 2026',
    desc: 'The timetable for Annual Examinations (Grade I–VIII) has been uploaded on the school portal. Parents are requested to download and note the dates.',
  },
  {
    type: 'Holiday',
    typeColor: 'bg-success/10 text-success',
    icon: 'CalendarDaysIcon',
    title: 'Summer Vacation: May 15 – June 20, 2026',
    date: 'March 20, 2026',
    desc: 'School will remain closed for summer vacation from May 15 to June 20. New session begins June 23, 2026.',
  },
  {
    type: 'Event',
    typeColor: 'bg-primary/10 text-primary',
    icon: 'SparklesIcon',
    title: 'Annual Sports Day — April 12, 2026',
    date: 'March 18, 2026',
    desc: 'All students are requested to report in sports uniform by 7:30 AM. Parents are cordially invited to attend.',
  },
  {
    type: 'Notice',
    typeColor: 'bg-accent/10 text-accent',
    icon: 'BellAlertIcon',
    title: 'Fee Payment Deadline: March 31, 2026',
    date: 'March 15, 2026',
    desc: 'Q4 fee payment is due by March 31. Late payments will attract a fine of ₹100 per day. Pay via school portal or office.',
  },
  {
    type: 'Achievement',
    typeColor: 'bg-success/10 text-success',
    icon: 'TrophyIcon',
    title: 'Students Win State Science Olympiad',
    date: 'March 10, 2026',
    desc: 'Congratulations to Aryan Mehta (Grade X) and Priya Sharma (Grade IX) for winning Gold and Silver at the State Science Olympiad.',
  },
];

export default function AnnouncementsSection() {
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
    <section id="announcements" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="MegaphoneIcon" size={13} />
              Announcements & Notices
            </div>
            <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight" style={{ transitionDelay: '0.1s' }}>
              Stay Up to Date
            </h2>
          </div>
          <a href="#" className="reveal-hidden text-sm font-semibold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors" style={{ transitionDelay: '0.1s' }}>
            View All Notices <Icon name="ArrowRightIcon" size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements.map((item, i) => (
            <div
              key={item.title}
              className="reveal-hidden p-5 rounded-2xl border border-border bg-background hover:shadow-soft hover:border-primary/20 transition-all duration-200 cursor-pointer group"
              style={{ transitionDelay: `${0.07 * i}s` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${item.typeColor}`}>
                  <Icon name={item.icon as 'MegaphoneIcon'} size={12} />
                  {item.type}
                </span>
                <span className="text-xs text-muted-light flex-shrink-0">{item.date}</span>
              </div>
              <h3 className="font-display font-700 text-sm text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
