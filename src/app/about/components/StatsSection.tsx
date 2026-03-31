'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { label: 'Years of Excellence', value: 26, suffix: '+', icon: 'CalendarIcon', color: 'from-blue-500 to-cyan-400', desc: 'Since 1998' },
  { label: 'Students Enrolled', value: 2400, suffix: '+', icon: 'AcademicCapIcon', color: 'from-violet-500 to-purple-400', desc: 'Across all classes' },
  { label: 'Qualified Faculty', value: 120, suffix: '+', icon: 'UserGroupIcon', color: 'from-emerald-500 to-teal-400', desc: 'Across 6 departments' },
  { label: 'Board Pass Rate', value: 100, suffix: '%', icon: 'TrophyIcon', color: 'from-amber-500 to-orange-400', desc: '8 consecutive years' },
  { label: 'Alumni Network', value: 15000, suffix: '+', icon: 'GlobeAltIcon', color: 'from-rose-500 to-pink-400', desc: 'Across India & abroad' },
  { label: 'Co-curricular Clubs', value: 20, suffix: '+', icon: 'SparklesIcon', color: 'from-indigo-500 to-blue-400', desc: 'Sports, arts & more' },
];

const awards = [
  { icon: 'TrophyIcon', title: 'Top Rated School', body: 'Delhi NCR 2024 — Ranked #1 for Board Examination Results', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { icon: 'ShieldCheckIcon', title: 'ISO 9001:2015', body: 'Certified for Quality Management Systems in Education', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { icon: 'StarIcon', title: 'Best Infrastructure', body: 'Ministry of Education Award for Smart Campus 2023', color: 'bg-violet-50 border-violet-200 text-violet-700' },
  { icon: 'AcademicCapIcon', title: 'Excellence in STEM', body: 'National STEM Education Award — Runner Up 2023', color: 'bg-blue-50 border-blue-200 text-blue-700' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
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
    <section id="stats" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="ChartBarIcon" size={13} />
            By the Numbers
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Greenwood in{' '}
            <span className="gradient-text">Numbers</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Decades of commitment to excellence, measured in the lives we've shaped and the milestones we've achieved together.
          </p>
        </div>

        {/* Stats grid — dark gradient cards matching homepage hero style */}
        <div
          className="reveal-hidden rounded-3xl p-8 sm:p-12 mb-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8"
          style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 100%)' }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal-hidden flex flex-col items-center text-center"
              style={{ transitionDelay: `${0.07 * i}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon name={s.icon as 'TrophyIcon'} size={22} className="text-white" />
              </div>
              <div className="font-display font-800 text-2xl sm:text-3xl text-white mb-0.5">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/80 text-xs font-semibold mb-0.5">{s.label}</div>
              <div className="text-white/40 text-2xs">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div>
          <div className="text-center mb-8">
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="TrophyIcon" size={13} />
              Recognition
            </div>
            <h2 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight" style={{ transitionDelay: '0.05s' }}>
              Awards & Accreditations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map((award, i) => (
              <div
                key={award.title}
                className={`reveal-hidden flex gap-4 p-5 rounded-2xl border ${award.color} card-lift`}
                style={{ transitionDelay: `${0.08 * i}s` }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <Icon name={award.icon as 'TrophyIcon'} size={20} />
                </div>
                <div>
                  <div className="font-display font-700 text-sm mb-1">{award.title}</div>
                  <p className="text-xs leading-relaxed opacity-80">{award.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
