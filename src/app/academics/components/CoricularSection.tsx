'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const clubs = [
  { icon: 'TrophyIcon', name: 'Cricket & Football', category: 'Sports', color: 'from-emerald-500 to-teal-400', members: 180, achievement: 'State Champions 2023' },
  { icon: 'BoltIcon', name: 'Athletics & Swimming', category: 'Sports', color: 'from-blue-500 to-cyan-400', members: 120, achievement: 'National Qualifier 2024' },
  { icon: 'MusicalNoteIcon', name: 'Music Society', category: 'Performing Arts', color: 'from-violet-500 to-purple-400', members: 90, achievement: 'Annual Cultural Festival' },
  { icon: 'UserGroupIcon', name: 'Dance Troupe', category: 'Performing Arts', color: 'from-rose-500 to-pink-400', members: 75, achievement: 'Zonal Dance Champions' },
  { icon: 'CpuChipIcon', name: 'Robotics & AI Club', category: 'STEM', color: 'from-amber-500 to-orange-400', members: 60, achievement: 'WRO National Finalists' },
  { icon: 'ChatBubbleLeftRightIcon', name: 'Debate & MUN', category: 'Leadership', color: 'from-indigo-500 to-blue-400', members: 80, achievement: 'Best Delegation MUN 2024' },
  { icon: 'CameraIcon', name: 'Photography Club', category: 'Creative Arts', color: 'from-orange-500 to-red-400', members: 50, achievement: 'Annual Photo Exhibition' },
  { icon: 'GlobeAltIcon', name: 'Eco Warriors', category: 'Environment', color: 'from-green-500 to-emerald-400', members: 65, achievement: 'State Green School Award' },
];

const categories = ['All', 'Sports', 'Performing Arts', 'STEM', 'Leadership', 'Creative Arts', 'Environment'];

export default function CocurricularSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filtered = activeCategory === 'All' ? clubs : clubs.filter((c) => c.category === activeCategory);

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
    <section id="cocurricular" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="SparklesIcon" size={13} />
            Beyond Academics
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Clubs &{' '}
            <span className="gradient-text">Co-Curricular</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            20+ clubs, sports teams, and activity groups — because a great education goes far beyond the classroom.
          </p>
        </div>

        {/* Category filter */}
        <div className="reveal-hidden flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-blue'
                  : 'bg-white text-muted border-border hover:border-primary/30 hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clubs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((club, i) => (
            <div
              key={club.name}
              className="reveal-hidden group p-5 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-soft transition-all duration-300 card-lift"
              style={{ transitionDelay: `${0.06 * i}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${club.color} flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                <Icon name={club.icon as 'TrophyIcon'} size={22} className="text-white" />
              </div>
              <div className="text-2xs font-semibold text-muted uppercase tracking-wider mb-1">{club.category}</div>
              <h3 className="font-display font-700 text-sm text-foreground mb-2">{club.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
                <Icon name="UserGroupIcon" size={12} />
                {club.members} members
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-primary/5 border border-primary/10">
                <Icon name="TrophyIcon" size={11} className="text-primary flex-shrink-0" />
                <span className="text-2xs text-primary font-semibold">{club.achievement}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="reveal-hidden mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 p-7 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 100%)' }}
        >
          <div className="text-center sm:text-left">
            <div className="font-display font-700 text-lg text-white mb-1">Interested in joining a club?</div>
            <p className="text-white/60 text-sm">Enrolment opens every April and September. All activities are free for enrolled students.</p>
          </div>
          <a href="/homepage#contact"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white text-primary text-sm font-bold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg">
            <Icon name="EnvelopeIcon" size={15} />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
