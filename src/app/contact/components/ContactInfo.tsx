'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const contactInfo = [
  {
    icon: 'MapPinIcon',
    title: 'School Address',
    lines: ['12, Greenwood Road, Sector 14,', 'New Delhi – 110001, India'],
    color: 'from-blue-500 to-cyan-400',
    action: { label: 'Get Directions', href: 'https://maps.google.com' },
  },
  {
    icon: 'PhoneIcon',
    title: 'Phone Numbers',
    lines: ['+91 11 2654 3210 (Office)', '+91 98765 43210 (Admissions)'],
    color: 'from-emerald-500 to-teal-400',
    action: { label: 'Call Now', href: 'tel:+911126543210' },
  },
  {
    icon: 'EnvelopeIcon',
    title: 'Email Us',
    lines: ['info@greenwoodacademy.edu.in', 'admissions@greenwoodacademy.edu.in'],
    color: 'from-violet-500 to-purple-400',
    action: { label: 'Send Email', href: 'mailto:info@greenwoodacademy.edu.in' },
  },
  {
    icon: 'ClockIcon',
    title: 'Office Hours',
    lines: ['Monday – Saturday: 8:00 AM – 4:00 PM', 'Sunday & Public Holidays: Closed'],
    color: 'from-amber-500 to-orange-400',
    action: null,
  },
];

const departments = [
  { name: 'Admissions Office', phone: '+91 98765 43210', email: 'admissions@greenwoodacademy.edu.in', icon: 'AcademicCapIcon' },
  { name: "Principal's Office", phone: '+91 11 2654 3211', email: 'principal@greenwoodacademy.edu.in', icon: 'BuildingLibraryIcon' },
  { name: 'Accounts & Fees', phone: '+91 11 2654 3212', email: 'accounts@greenwoodacademy.edu.in', icon: 'BanknotesIcon' },
  { name: 'Transport Desk', phone: '+91 11 2654 3213', email: 'transport@greenwoodacademy.edu.in', icon: 'TruckIcon' },
  { name: 'Library', phone: '+91 11 2654 3214', email: 'library@greenwoodacademy.edu.in', icon: 'BookOpenIcon' },
  { name: 'Student Counselling', phone: '+91 11 2654 3215', email: 'counselling@greenwoodacademy.edu.in', icon: 'HeartIcon' },
];

export default function ContactInfo() {
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
    <section id="info" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="MapPinIcon" size={13} />
            Contact Information
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
            Reach Us{' '}
            <span className="gradient-text">Any Way You Like</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Visit us in person, give us a call, or drop us an email — we are always happy to hear from parents and students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactInfo.map((item, i) => (
            <div
              key={item.title}
              className="reveal-hidden flex flex-col p-6 rounded-2xl border border-border bg-white hover:border-primary/25 hover:shadow-card transition-all duration-300 card-lift group"
              style={{ transitionDelay: `${0.07 * i}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                <Icon name={item.icon as 'MapPinIcon'} size={22} className="text-white" />
              </div>
              <div className="font-display font-700 text-sm text-foreground mb-2">{item.title}</div>
              {item.lines.map((line) => (
                <div key={line} className="text-xs text-muted leading-relaxed">{line}</div>
              ))}
              {item.action && (
                <a
                  href={item.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {item.action.label} <Icon name="ArrowRightIcon" size={12} />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="BuildingOfficeIcon" size={13} />
            Department Directory
          </div>
          <h3 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight" style={{ transitionDelay: '0.05s' }}>
            Reach the Right{' '}
            <span className="gradient-text">Department</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept, i) => (
            <div
              key={dept.name}
              className="reveal-hidden flex gap-4 p-5 rounded-2xl border border-border bg-white hover:border-primary/20 hover:shadow-soft transition-all duration-200 group"
              style={{ transitionDelay: `${0.06 * i}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                <Icon name={dept.icon as 'AcademicCapIcon'} size={18} className="text-primary" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-700 text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">{dept.name}</div>
                <a href={`tel:${dept.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors mb-1">
                  <Icon name="PhoneIcon" size={11} />
                  {dept.phone}
                </a>
                <a href={`mailto:${dept.email}`} className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors truncate">
                  <Icon name="EnvelopeIcon" size={11} />
                  <span className="truncate">{dept.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
