'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const stats = [
  { label: 'Board Pass Rate', value: 100, suffix: '%', icon: 'TrophyIcon', color: 'from-amber-500 to-orange-400', desc: '8 consecutive years' },
  { label: 'Scored Above 90%', value: 68, suffix: '%', icon: 'StarIcon', color: 'from-blue-500 to-cyan-400', desc: 'In CBSE 2024' },
  { label: 'Distinctions', value: 40, suffix: '+', icon: 'AcademicCapIcon', color: 'from-violet-500 to-purple-400', desc: 'Scored 95% and above' },
  { label: 'University Placements', value: 98, suffix: '%', icon: 'BuildingLibraryIcon', color: 'from-emerald-500 to-teal-400', desc: 'Into top colleges' },
];

const toppers = [
  { name: 'Ananya Sharma', stream: 'Science', score: '98.6%', rank: '1st in School', icon: 'AcademicCapIcon', color: 'from-blue-500 to-cyan-400' },
  { name: 'Rohan Mehta', stream: 'Commerce', score: '97.2%', rank: '1st in School', icon: 'ChartBarIcon', color: 'from-emerald-500 to-teal-400' },
  { name: 'Priya Nair', stream: 'Humanities', score: '96.8%', rank: '1st in School', icon: 'BookOpenIcon', color: 'from-violet-500 to-purple-400' },
  { name: 'Arjun Patel', stream: 'Science', score: '96.4%', rank: 'JEE Advanced AIR 312', icon: 'BeakerIcon', color: 'from-rose-500 to-pink-400' },
];

const milestones = [
  { year: '2024', title: '100% Board Pass Rate', desc: '40+ students scored above 95% in CBSE Board Exams.' },
  { year: '2023', title: 'Best STEM Results', desc: 'National STEM Education Award — Runner Up for outstanding science scores.' },
  { year: '2022', title: 'JEE & NEET Success', desc: '28 students cleared JEE Main; 14 students qualified NEET UG.' },
  { year: '2021', title: 'Top Ranked School', desc: 'Ranked #1 in Delhi NCR for Board Examination Results by Education Today.' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1600;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ResultsSection() {
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
    <section id="results" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="TrophyIcon" size={13} />
            Academic Results
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Results That Speak{' '}
            <span className="gradient-text">for Themselves</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Year after year, Greenwood Academy students achieve outstanding CBSE Board results and secure seats at India's top universities.
          </p>
        </div>

        {/* Stats banner */}
        <div
          className="reveal-hidden rounded-3xl p-8 sm:p-12 mb-14 grid grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 100%)' }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="reveal-hidden flex flex-col items-center text-center" style={{ transitionDelay: `${0.08 * i}s` }}>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon name={s.icon as 'TrophyIcon'} size={22} className="text-white" />
              </div>
              <div className="font-display font-800 text-3xl text-white mb-0.5">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/80 text-xs font-semibold mb-0.5">{s.label}</div>
              <div className="text-white/40 text-2xs">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Toppers */}
          <div className="reveal-hidden">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="StarIcon" size={16} className="text-primary" />
              </div>
              <h3 className="font-display font-700 text-lg text-foreground">Board Toppers 2024</h3>
            </div>
            <div className="space-y-3">
              {toppers.map((t, i) => (
                <div key={t.name}
                  className="reveal-hidden flex items-center gap-4 p-4 rounded-2xl border border-border bg-background hover:border-primary/25 hover:shadow-soft transition-all duration-200"
                  style={{ transitionDelay: `${0.08 * i}s` }}>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={t.icon as 'AcademicCapIcon'} size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-700 text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted">{t.stream} Stream · {t.rank}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display font-800 text-lg text-primary">{t.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="reveal-hidden">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="CalendarIcon" size={16} className="text-primary" />
              </div>
              <h3 className="font-display font-700 text-lg text-foreground">Academic Milestones</h3>
            </div>
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div key={m.year}
                  className="reveal-hidden flex gap-4 p-4 rounded-2xl border border-border bg-background hover:border-primary/25 hover:shadow-soft transition-all duration-200"
                  style={{ transitionDelay: `${0.08 * i}s` }}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{m.year}</span>
                  </div>
                  <div>
                    <div className="font-display font-700 text-sm text-foreground mb-1">{m.title}</div>
                    <p className="text-xs text-muted leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
