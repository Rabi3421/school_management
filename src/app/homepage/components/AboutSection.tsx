'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  { icon: 'LightBulbIcon', title: 'Academic Excellence', desc: 'Rigorous curriculum designed to challenge and inspire students at every level.' },
  { icon: 'HeartIcon', title: 'Holistic Development', desc: 'Sports, arts, music, and life skills woven into daily school life.' },
  { icon: 'ShieldCheckIcon', title: 'Safe Environment', desc: 'CCTV-monitored campus, trained staff, and a zero-tolerance bullying policy.' },
  { icon: 'GlobeAltIcon', title: 'Global Perspective', desc: 'Exposure to international events, exchange programs, and global competitions.' },
];

export default function AboutSection() {
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
    <section id="about" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text */}
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-5">
              <Icon name="BuildingLibraryIcon" size={13} />
              About Our School
            </div>
            <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-5" style={{ transitionDelay: '0.1s' }}>
              A Legacy of Learning,<br />A Future of Possibilities
            </h2>
            <p className="reveal-hidden text-muted leading-relaxed mb-4" style={{ transitionDelay: '0.15s' }}>
              Founded in 1998, Greenwood Academy has grown from a small neighbourhood school into one of Delhi's most respected educational institutions. We are affiliated with the Central Board of Secondary Education (CBSE) and offer classes from Nursery through Grade XII.
            </p>
            <p className="reveal-hidden text-muted leading-relaxed mb-8" style={{ transitionDelay: '0.2s' }}>
              Our philosophy is simple: every child is unique, every child can excel. With a student-to-teacher ratio of 20:1, we ensure personalised attention and a supportive learning environment for all.
            </p>

            {/* Principal's message teaser */}
            <div className="reveal-hidden flex items-start gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10" style={{ transitionDelay: '0.25s' }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="UserCircleIcon" size={28} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted italic leading-relaxed mb-2">
                  "Education is not the filling of a pail, but the lighting of a fire. At Greenwood, we ignite that spark in every student."
                </p>
                <div className="text-sm font-semibold text-foreground">Dr. Meena Kapoor</div>
                <div className="text-xs text-muted">Principal, Greenwood Academy</div>
              </div>
            </div>
          </div>

          {/* Right: Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="reveal-hidden p-5 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-soft transition-all duration-200"
                style={{ transitionDelay: `${0.1 * i}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon name={v.icon as 'LightBulbIcon'} size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-700 text-sm text-foreground mb-1.5">{v.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
