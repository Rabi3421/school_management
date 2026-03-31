'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function GalleryCTA() {
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
    <section ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Quick share bar */}
        <div className="reveal-hidden grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { icon: 'ShareIcon', label: 'Share Gallery', sub: 'Send the gallery link to friends & family', color: 'text-blue-600 bg-blue-50' },
            { icon: 'ArrowDownTrayIcon', label: 'Download Photos', sub: 'Request high-resolution downloads', color: 'text-violet-600 bg-violet-50' },
            { icon: 'EnvelopeIcon', label: 'Subscribe for Updates', sub: 'Get notified when new albums are added', color: 'text-emerald-600 bg-emerald-50' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 bg-white rounded-2xl border border-border px-5 py-4 shadow-sm hover:shadow-card card-lift transition-all duration-300 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                <Icon name={item.icon as 'ShareIcon'} size={18} />
              </div>
              <div>
                <div className="font-display font-700 text-sm text-foreground">{item.label}</div>
                <div className="text-2xs text-muted leading-snug mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA block */}
        <div
          className="reveal-hidden relative rounded-3xl overflow-hidden text-white"
          style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 80%, #0EA5E9 100%)' }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-12 sm:px-12 sm:py-14">
            <div className="text-center lg:text-left max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-4">
                <Icon name="CameraIcon" size={13} />
                Capture Your Story
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-800 leading-tight mb-4">
                Want Your Child&apos;s{' '}
                <span style={{ background: 'linear-gradient(90deg, #38BDF8, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Moments Here?
                </span>
              </h2>
              <p className="text-white/75 leading-relaxed text-sm sm:text-base">
                Join Greenwood Academy and become part of a vibrant community where every achievement, performance, and milestone is celebrated and preserved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              >
                <Icon name="ArrowRightCircleIcon" size={17} />
                Apply for Admission
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                <Icon name="EnvelopeIcon" size={17} />
                Contact School
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
