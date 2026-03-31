'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const facilities = [
  {
    icon: 'BeakerIcon',
    title: 'Science Laboratories',
    desc: 'Fully equipped Physics, Chemistry, and Biology labs with modern instruments and safety standards for hands-on experiments.',
    tags: ['Physics Lab', 'Chemistry Lab', 'Biology Lab'],
    color: 'from-accent/10 to-accent/0',
    iconColor: 'bg-accent/10 text-accent',
  },
  {
    icon: 'ComputerDesktopIcon',
    title: 'Smart Classrooms',
    desc: 'Interactive smartboards, high-speed Wi-Fi, and digital learning tools in every classroom from Grade 1 to Grade XII.',
    tags: ['Smartboards', 'Wi-Fi Campus', 'E-learning Portal'],
    color: 'from-primary/10 to-primary/0',
    iconColor: 'bg-primary/10 text-primary',
  },
  {
    icon: 'BookOpenIcon',
    title: 'Library & Resource Centre',
    desc: 'A 10,000-book library with digital access to journals, magazines, and e-books for students and teachers alike.',
    tags: ['10,000+ Books', 'Digital Access', 'Reading Lounge'],
    color: 'from-success/10 to-success/0',
    iconColor: 'bg-success/10 text-success',
  },
  {
    icon: 'TrophyIcon',
    title: 'Sports Complex',
    desc: 'Olympic-size swimming pool, indoor gymnasium, cricket ground, football field, basketball & volleyball courts.',
    tags: ['Swimming Pool', 'Cricket Ground', 'Gymnasium'],
    color: 'from-warning/10 to-warning/0',
    iconColor: 'bg-warning/10 text-warning',
  },
  {
    icon: 'MusicalNoteIcon',
    title: 'Performing Arts Studio',
    desc: 'Dedicated spaces for music, dance, drama, and visual arts — with annual productions and state-level competitions.',
    tags: ['Music Room', 'Dance Studio', 'Auditorium'],
    color: 'from-danger/10 to-danger/0',
    iconColor: 'bg-danger/10 text-danger',
  },
  {
    icon: 'CpuChipIcon',
    title: 'Robotics & Coding Lab',
    desc: 'State-of-the-art coding and robotics lab with Arduino kits, 3D printers, and mentors for tech competitions.',
    tags: ['Arduino Kits', '3D Printer', 'AI Workshop'],
    color: 'from-primary/10 to-primary/0',
    iconColor: 'bg-primary/10 text-primary',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Safe & Secure Campus',
    desc: '200+ CCTV cameras, biometric entry, trained security personnel, and a dedicated nurse on campus at all times.',
    tags: ['CCTV Monitoring', 'Biometric Entry', 'Medical Room'],
    color: 'from-emerald-500/10 to-emerald-500/0',
    iconColor: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: 'BuildingLibraryIcon',
    title: 'Cafeteria & Dining',
    desc: 'Hygienic, nutritious meals prepared by trained cooks — with separate menus for different dietary preferences.',
    tags: ['Nutritious Menu', 'Hygienic Kitchen', 'Dietary Options'],
    color: 'from-orange-500/10 to-orange-500/0',
    iconColor: 'bg-orange-500/10 text-orange-600',
  },
];

export default function FacilitiesSection() {
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
    <section id="facilities" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="BuildingLibraryIcon" size={13} />
            Campus Life
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            World-Class{' '}
            <span className="gradient-text">Facilities</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Our campus is designed to foster learning, creativity, and well-being — with modern infrastructure that matches the best schools in the country.
          </p>
        </div>

        {/* Facilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((f, i) => (
            <div
              key={f.title}
              className={`reveal-hidden p-6 rounded-2xl border border-border bg-gradient-to-br ${f.color} hover:border-primary/25 hover:shadow-soft transition-all duration-300 card-lift group`}
              style={{ transitionDelay: `${0.06 * i}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${f.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                <Icon name={f.icon as 'BeakerIcon'} size={22} />
              </div>

              {/* Text */}
              <h3 className="font-display font-700 text-sm text-foreground mb-2 leading-snug">{f.title}</h3>
              <p className="text-xs text-muted leading-relaxed mb-4">{f.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {f.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-white/80 border border-border text-2xs text-muted font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
