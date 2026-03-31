'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export default function CtaSection() {
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
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="reveal-hidden relative overflow-hidden rounded-3xl bg-blue-gradient p-10 sm:p-16 text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-semibold mb-6">
              <Icon name="RocketLaunchIcon" size={12} variant="solid" className="text-white" />
              No Credit Card Required
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-800 text-white tracking-tight mb-5 leading-tight">
              Start Your Free Trial Today
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Join 500+ schools already managing their institutions with SchoolSync. Free for 2 months — no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#pricing"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary text-sm font-700 rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lifted group"
              >
                Start Free 2-Month Trial
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/demo-dashboard"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white text-sm font-600 rounded-xl border border-white/25 hover:bg-white/20 transition-all duration-200"
              >
                <Icon name="ComputerDesktopIcon" size={16} />
                Explore Live Demo
              </Link>
            </div>

            {/* Trust micro-copy */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: 'ShieldCheckIcon', text: 'Data secured & encrypted' },
                { icon: 'PhoneIcon', text: 'Hindi & English support' },
                { icon: 'ArrowPathIcon', text: 'Cancel anytime' },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                  <Icon name={item.icon as 'ShieldCheckIcon'} size={13} className="text-white/60" />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}