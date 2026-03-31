'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const reasons = [
  { icon: 'TrophyIcon', title: '100% Board Pass Rate', desc: '8 consecutive years of 100% CBSE Board pass rate with 40+ students scoring above 95%.' , color: 'from-amber-500 to-orange-400' },
  { icon: 'UserGroupIcon', title: '20:1 Student-Teacher Ratio', desc: 'Personalised attention for every child — our low ratio ensures no student is left behind.', color: 'from-blue-500 to-cyan-400' },
  { icon: 'ComputerDesktopIcon', title: 'Smart Campus', desc: 'Fully digital classrooms, science labs, robotics studio, and a 10,000-book library.', color: 'from-violet-500 to-purple-400' },
  { icon: 'ShieldCheckIcon', title: 'Safe & Secure', desc: '200+ CCTV cameras, biometric entry, and trained security — your child is always safe.', color: 'from-emerald-500 to-teal-400' },
  { icon: 'GlobeAltIcon', title: 'Holistic Development', desc: '20+ clubs, sports teams, and cultural programmes build well-rounded individuals.', color: 'from-rose-500 to-pink-400' },
  { icon: 'HeartIcon', title: 'Dedicated Counselling', desc: 'In-house counsellors support academic and emotional wellbeing for every student.', color: 'from-indigo-500 to-blue-400' },
];

const testimonials = [
  {
    name: 'Pooja Verma',
    role: 'Parent of Grade V student',
    quote: 'The teachers here genuinely care. My daughter has gone from a shy child to a confident speaker — all because of how Greenwood nurtures every child individually.',
    rating: 5,
    icon: 'UserCircleIcon',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    name: 'Amit Khanna',
    role: 'Parent of Grade X student',
    quote: 'The faculty preparation for Board exams is exceptional. My son scored 94% and got into his dream college. The counselling team was incredibly supportive throughout.',
    rating: 5,
    icon: 'UserCircleIcon',
    color: 'from-violet-500 to-purple-400',
  },
  {
    name: 'Sunita Rathi',
    role: 'Parent of Grade II & V students',
    quote: 'Both my children are at Greenwood and I couldn\'t be happier. The school truly balances academics with activities — my kids love coming to school every morning!',
    rating: 5,
    icon: 'UserCircleIcon',
    color: 'from-emerald-500 to-teal-400',
  },
];

export default function WhySection() {
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
    <>
      {/* Why Greenwood */}
      <section id="why" ref={ref} className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="SparklesIcon" size={13} />
              Why Choose Us
            </div>
            <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
              Why Families Choose{' '}
              <span className="gradient-text">Greenwood</span>
            </h2>
            <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
              Over 2,400 students and 15,000+ alumni can't be wrong. Here's why Greenwood Academy has been Delhi's first choice for 26 years.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="reveal-hidden flex gap-4 p-6 rounded-2xl border border-border bg-white hover:border-primary/25 hover:shadow-soft transition-all duration-300 card-lift group"
                style={{ transitionDelay: `${0.07 * i}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                  <Icon name={r.icon as 'TrophyIcon'} size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display font-700 text-sm text-foreground mb-1.5">{r.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="text-center mb-10">
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="ChatBubbleBottomCenterTextIcon" size={13} />
              Parent Voices
            </div>
            <h2 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight" style={{ transitionDelay: '0.05s' }}>
              What Parents{' '}
              <span className="gradient-text">Say About Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="reveal-hidden flex flex-col p-6 rounded-2xl border border-border bg-white hover:border-primary/25 hover:shadow-soft transition-all duration-300 card-lift"
                style={{ transitionDelay: `${0.09 * i}s` }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Icon key={si} name="StarIcon" size={14} variant="solid" className="text-amber-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm text-muted leading-relaxed italic flex-1 mb-5">"{t.quote}"</p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={t.icon as 'UserCircleIcon'} size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-700 text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
