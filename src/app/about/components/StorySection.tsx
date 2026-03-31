'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const timeline = [
  { year: '1998', title: 'Founded', desc: 'Greenwood Academy opened its doors with 120 students and a vision to provide world-class education in New Delhi.' },
  { year: '2003', title: 'CBSE Affiliation', desc: 'Officially affiliated with the Central Board of Secondary Education, expanding from Nursery to Grade X.' },
  { year: '2008', title: 'Senior Secondary Wing', desc: 'Launched Grade XI & XII streams in Science, Commerce, and Humanities with state-of-the-art laboratories.' },
  { year: '2012', title: 'ISO 9001:2015 Certified', desc: 'Became one of the first schools in Delhi NCR to receive ISO certification for quality management systems.' },
  { year: '2018', title: 'Smart Campus', desc: 'Fully digitised classrooms, biometric attendance, and launch of our proprietary e-learning portal.' },
  { year: '2024', title: 'Top Rated School', desc: 'Ranked #1 in Delhi NCR for Board results, with 100% pass rate and 40+ students scoring above 95%.' },
];

const pillars = [
  {
    icon: 'EyeIcon',
    title: 'Our Vision',
    desc: 'To be a globally recognised institution that produces compassionate, creative, and critical thinkers — citizens who lead with integrity.',
    color: 'bg-primary/10 text-primary border-primary/20',
    gradient: 'from-primary/5 to-primary/0',
  },
  {
    icon: 'FlagIcon',
    title: 'Our Mission',
    desc: 'To deliver holistic, student-centric education by combining rigorous academics with values, sport, arts, and technology.',
    color: 'bg-accent/10 text-accent border-accent/20',
    gradient: 'from-accent/5 to-accent/0',
  },
  {
    icon: 'SparklesIcon',
    title: 'Our Values',
    desc: 'Excellence · Integrity · Inclusivity · Innovation · Empathy. These five values form the backbone of everything we do at Greenwood.',
    color: 'bg-success/10 text-success border-success/20',
    gradient: 'from-success/5 to-success/0',
  },
];

export default function StorySection() {
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
    <>
      {/* ── Mission / Vision / Values ── */}
      <section id="story" ref={ref} className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Section header */}
          <div className="text-center mb-12">
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="BuildingLibraryIcon" size={13} />
              Who We Are
            </div>
            <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
              Rooted in Values,{' '}
              <span className="gradient-text">Driven by Purpose</span>
            </h2>
            <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
              Greenwood Academy was built on the belief that every child deserves an education that goes beyond textbooks — one that shapes character, builds resilience, and ignites curiosity.
            </p>
          </div>

          {/* Vision / Mission / Values cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className={`reveal-hidden relative p-7 rounded-2xl border bg-gradient-to-br ${p.gradient} ${p.color.split(' ').find(c => c.startsWith('border')) ?? 'border-border'} card-lift overflow-hidden`}
                style={{ transitionDelay: `${0.1 * i}s` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${p.color}`}>
                  <Icon name={p.icon as 'EyeIcon'} size={22} />
                </div>
                <h3 className="font-display font-700 text-lg text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mb-4">
            <div className="text-center mb-10">
              <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Icon name="ClockIcon" size={13} />
                Our Journey
              </div>
              <h2 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight" style={{ transitionDelay: '0.05s' }}>
                26 Years of Milestones
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" style={{ transform: 'translateX(-50%)' }} />

              <div className="space-y-10">
                {timeline.map((item, i) => {
                  const isRight = i % 2 === 0;
                  return (
                    <div
                      key={item.year}
                      className={`reveal-hidden relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center`}
                      style={{ transitionDelay: `${0.08 * i}s` }}
                    >
                      {/* Content */}
                      <div className={`${isRight ? 'md:text-right md:pr-10' : 'md:order-last md:pl-10'}`}>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2`}>
                          <Icon name="CalendarIcon" size={12} />
                          {item.year}
                        </div>
                        <h3 className="font-display font-700 text-lg text-foreground mb-1.5">{item.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                      </div>

                      {/* Timeline dot */}
                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md" />
                      </div>

                      {/* Empty spacer on opposite side */}
                      <div className={`hidden md:block ${isRight ? 'md:order-last md:pl-10' : 'md:pr-10'}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
