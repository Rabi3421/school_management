'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

// Bento grid audit (4-col grid):
// Row 1: [Student Mgmt col-span-2] + [Attendance col-span-1] + [Fee Mgmt col-span-1] = 2+1+1 = 4 ✓
// Row 2: [Exam & Results col-span-1] + [Notices col-span-1] + [Parent Portal col-span-2] = 1+1+2 = 4 ✓

const features = [
  {
    id: 'student',
    title: 'Student Management',
    description: 'Complete student profiles with admission records, academic history, documents, and parent contact — all in one searchable database.',
    icon: 'AcademicCapIcon',
    colSpan: 'md:col-span-2',
    accent: '#1C4ED8',
    accentBg: 'bg-primary/6',
    tag: 'Core Module',
    stats: '1,248 students managed',
  },
  {
    id: 'attendance',
    title: 'Attendance Tracking',
    description: 'Mark daily attendance class-wise with automated SMS alerts to parents for absent students.',
    icon: 'CalendarDaysIcon',
    colSpan: 'md:col-span-1',
    accent: '#0EA5E9',
    accentBg: 'bg-accent/6',
    tag: 'Daily Use',
    stats: '94.2% avg attendance',
  },
  {
    id: 'fees',
    title: 'Fee Management',
    description: 'Collect fees, generate receipts, track pending dues, and send payment reminders automatically.',
    icon: 'BanknotesIcon',
    colSpan: 'md:col-span-1',
    accent: '#10B981',
    accentBg: 'bg-success/6',
    tag: 'Finance',
    stats: '₹2.4L collected this month',
  },
  {
    id: 'exams',
    title: 'Exam & Results',
    description: 'Schedule exams, enter marks, auto-generate report cards, and publish results to the parent portal.',
    icon: 'ClipboardDocumentCheckIcon',
    colSpan: 'md:col-span-1',
    accent: '#F59E0B',
    accentBg: 'bg-warning/6',
    tag: 'Academic',
    stats: 'Report cards in 1 click',
  },
  {
    id: 'notices',
    title: 'Notice & Announcements',
    description: 'Broadcast notices to all parents, specific classes, or teachers via SMS and in-app notifications.',
    icon: 'MegaphoneIcon',
    colSpan: 'md:col-span-1',
    accent: '#8B5CF6',
    accentBg: 'bg-purple-50',
    tag: 'Communication',
    stats: 'Instant delivery',
  },
  {
    id: 'portal',
    title: 'Parent & Student Portal',
    description: 'Dedicated portal for parents to track attendance, fee receipts, exam results, and school notices — anytime, anywhere.',
    icon: 'DevicePhoneMobileIcon',
    colSpan: 'md:col-span-2',
    accent: '#EC4899',
    accentBg: 'bg-pink-50',
    tag: 'Self-Service',
    stats: '3,500+ active parents',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-hidden');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12 reveal-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-4">
            <Icon name="SparklesIcon" size={12} variant="solid" className="text-primary" />
            Everything You Need
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-4">
            All-in-One School Administration
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Replace scattered spreadsheets and manual registers with a single platform designed specifically for Indian schools.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              className={`reveal-hidden ${feature.colSpan} group bg-white border border-border/60 rounded-2xl p-5 sm:p-6 card-lift hover:border-primary/20 transition-all duration-300 overflow-hidden relative`}
              style={{ transitionDelay: `${i * 0.06}s` }}
            >
              {/* Subtle bg accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full ${feature.accentBg} blur-2xl pointer-events-none opacity-60`} />

              {/* Tag */}
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-2xs font-600 mb-4"
                style={{ background: `${feature.accent}12`, color: feature.accent }}>
                {feature.tag}
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feature.accent}12` }}>
                <Icon name={feature.icon as 'AcademicCapIcon'} size={22} style={{ color: feature.accent }} />
              </div>

              {/* Content */}
              <h3 className="font-display text-base sm:text-lg font-700 text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{feature.description}</p>

              {/* Stat */}
              <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: feature.accent }}>
                <Icon name="ArrowTrendingUpIcon" size={13} style={{ color: feature.accent }} />
                {feature.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}