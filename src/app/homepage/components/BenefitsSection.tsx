'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';


const benefits = [
  {
    icon: 'ClockIcon',
    title: 'Save 3+ Hours Daily',
    description: 'Automate attendance marking, fee reminders, and report generation. What took hours now takes minutes.',
    metric: '3+ hrs',
    metricLabel: 'saved per day',
    color: '#1C4ED8',
  },
  {
    icon: 'DocumentMinusIcon',
    title: 'Reduce Manual Work by 80%',
    description: 'Eliminate paper registers, manual calculations, and duplicate data entry across different systems.',
    metric: '80%',
    metricLabel: 'less manual work',
    color: '#0EA5E9',
  },
  {
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Better Parent Communication',
    description: 'Automatic SMS/app notifications for attendance, fees, and results keep parents informed without extra effort.',
    metric: '4.8/5',
    metricLabel: 'parent satisfaction',
    color: '#10B981',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Increase School Efficiency',
    description: 'Real-time dashboards and analytics help principals make data-driven decisions faster.',
    metric: '2x',
    metricLabel: 'faster decisions',
    color: '#F59E0B',
  },
];

const metrics = [
  { label: 'Fee Collection Rate', before: '72%', after: '96%', pct: 96 },
  { label: 'Attendance Accuracy', before: '85%', after: '99.1%', pct: 99 },
  { label: 'Parent Engagement', before: '40%', after: '87%', pct: 87 },
];

export default function BenefitsSection() {
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
    <section id="benefits" ref={sectionRef} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-4">
            <Icon name="TrophyIcon" size={12} variant="solid" className="text-primary" />
            Real Results
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-4">
            Why Schools Love SchoolSync
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Schools using SchoolSync report measurable improvements within the first month.
          </p>
        </div>

        {/* Split layout: benefits grid + metrics panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="reveal-hidden bg-background rounded-2xl border border-border/50 p-5 card-lift hover:border-primary/20"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${b.color}12` }}>
                    <Icon name={b.icon as 'ClockIcon'} size={20} style={{ color: b.color }} />
                  </div>
                  <div>
                    <div className="text-xl font-800 font-display leading-none" style={{ color: b.color }}>{b.metric}</div>
                    <div className="text-xs text-muted-light">{b.metricLabel}</div>
                  </div>
                </div>
                <h3 className="font-display text-sm font-700 text-foreground mb-1.5">{b.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>

          {/* Right: Metrics panel + testimonial */}
          <div className="reveal-hidden flex flex-col gap-5" style={{ transitionDelay: '0.1s' }}>
            {/* Before/After metrics */}
            <div className="bg-background rounded-2xl border border-border/50 p-6">
              <h3 className="font-display text-base font-700 text-foreground mb-6">Before vs. After SchoolSync</h3>
              <div className="flex flex-col gap-6">
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted">{m.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-light line-through">{m.before}</span>
                        <span className="text-lg font-700 font-display text-primary">{m.after}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                        style={{ width: `${m.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Icon key={s} name="StarIcon" size={14} variant="solid" className="text-warning" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                "SchoolSync transformed how we run our school. Fee collection improved by 30%, and parents now get instant updates. Our staff saves at least 2 hours every day."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center font-700 font-display text-primary text-sm">
                  RS
                </div>
                <div>
                  <div className="text-sm font-600 text-foreground">Rajesh Sharma</div>
                  <div className="text-xs text-muted">Principal, Sunrise Public School, Jaipur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}