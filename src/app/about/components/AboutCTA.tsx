'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const quickLinks = [
  { icon: 'AcademicCapIcon', label: 'View Academic Programs', href: '/homepage#academics', color: 'bg-primary/10 text-primary' },
  { icon: 'CalendarIcon', label: 'Upcoming Events', href: '/homepage#events', color: 'bg-accent/10 text-accent' },
  { icon: 'PhotoIcon', label: 'Photo Gallery', href: '/homepage#gallery', color: 'bg-success/10 text-success' },
  { icon: 'PhoneIcon', label: 'Contact Us', href: '/homepage#contact', color: 'bg-warning/10 text-warning' },
];

export default function AboutCTA() {
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
    <section ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Quick links row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {quickLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              className="reveal-hidden flex items-center gap-3 p-4 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-soft transition-all duration-200 card-lift group"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${link.color}`}>
                <Icon name={link.icon as 'AcademicCapIcon'} size={17} />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">{link.label}</span>
              <Icon name="ChevronRightIcon" size={14} className="text-muted ml-auto group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Main CTA block — dark gradient, same as hero */}
        <div
          className="reveal-hidden relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
          style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 80%, #0EA5E9 100%)' }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #818CF8 0%, transparent 70%)', filter: 'blur(40px)' }} />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-wide">Admissions Open — 2025–26 Session</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
              Begin Your Child's{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8, #818CF8, #38BDF8)', backgroundSize: '200% auto', animation: 'gradientShift 3s linear infinite' }}
              >
                Journey Here
              </span>
            </h2>

            <p className="text-white/65 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
              Join 2,400+ students at Greenwood Academy. Limited seats available for the 2025–26 academic year — apply today and secure your child's future.
            </p>

            {/* Seats progress */}
            <div
              className="max-w-sm mx-auto mb-8 p-4 rounded-2xl text-left"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/70 font-medium">Admission Seats Filling Fast</span>
                <span className="text-white font-bold">72% Filled</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: '72%', background: 'linear-gradient(90deg, #38BDF8, #818CF8)' }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/homepage#admissions"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary text-sm font-bold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-xl group"
              >
                Apply for Admission 2025–26
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/homepage#contact"
                className="flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-semibold rounded-xl transition-all duration-200 group"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)' }}
              >
                <Icon name="PhoneIcon" size={16} />
                Schedule a School Visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
