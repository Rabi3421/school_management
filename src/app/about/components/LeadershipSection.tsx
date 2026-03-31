'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const leadership = [
  {
    name: 'Dr. Meena Kapoor',
    role: 'Principal',
    exp: '28 Years Experience',
    icon: 'UserCircleIcon',
    color: 'from-blue-500 to-cyan-400',
    quote: '"Education is not the filling of a pail, but the lighting of a fire."',
    speciality: 'Educational Leadership · Curriculum Design · Policy',
  },
  {
    name: 'Mr. Rajiv Sharma',
    role: 'Vice Principal (Academics)',
    exp: '22 Years Experience',
    icon: 'AcademicCapIcon',
    color: 'from-violet-500 to-purple-400',
    quote: '"Every child is a scientist. It\'s our job to keep that curiosity alive."',
    speciality: 'STEM Education · Research · Faculty Development',
  },
  {
    name: 'Mrs. Priya Nair',
    role: 'Head of Co-Curriculars',
    exp: '18 Years Experience',
    icon: 'MusicalNoteIcon',
    color: 'from-emerald-500 to-teal-400',
    quote: '"Arts and sports are not extra — they are essential."',
    speciality: 'Performing Arts · Sports · Student Welfare',
  },
  {
    name: 'Mr. Anil Verma',
    role: 'Head of Technology',
    exp: '15 Years Experience',
    icon: 'ComputerDesktopIcon',
    color: 'from-amber-500 to-orange-400',
    quote: '"Technology must serve learning, not replace it."',
    speciality: 'EdTech · Digital Infrastructure · Coding Labs',
  },
];

const departments = [
  { name: 'Sciences', head: 'Dr. S. Iyer', teachers: 18, icon: 'BeakerIcon', color: 'bg-accent/10 text-accent' },
  { name: 'Mathematics', head: 'Mrs. A. Khan', teachers: 14, icon: 'CalculatorIcon', color: 'bg-primary/10 text-primary' },
  { name: 'Languages', head: 'Mr. R. Das', teachers: 16, icon: 'BookOpenIcon', color: 'bg-success/10 text-success' },
  { name: 'Social Science', head: 'Mrs. P. Joshi', teachers: 12, icon: 'GlobeAltIcon', color: 'bg-warning/10 text-warning' },
  { name: 'Arts & Music', head: 'Ms. T. Roy', teachers: 10, icon: 'MusicalNoteIcon', color: 'bg-danger/10 text-danger' },
  { name: 'Physical Ed.', head: 'Mr. K. Singh', teachers: 8, icon: 'TrophyIcon', color: 'bg-primary/10 text-primary' },
];

export default function LeadershipSection() {
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
    <section id="leadership" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="UserGroupIcon" size={13} />
            Our Team
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Leadership &{' '}
            <span className="gradient-text">Faculty</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Our team of 120+ dedicated educators brings decades of experience, passion for teaching, and an unwavering commitment to every student's success.
          </p>
        </div>

        {/* Leadership cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {leadership.map((person, i) => (
            <div
              key={person.name}
              className="reveal-hidden group p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:shadow-soft transition-all duration-300 card-lift"
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              {/* Avatar */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${person.color} flex items-center justify-center mb-4 shadow-md`}>
                <Icon name={person.icon as 'UserCircleIcon'} size={32} className="text-white" />
              </div>

              {/* Info */}
              <h3 className="font-display font-700 text-base text-foreground mb-0.5">{person.name}</h3>
              <div className="text-xs font-semibold text-primary mb-1">{person.role}</div>
              <div className="flex items-center gap-1 text-xs text-muted mb-3">
                <Icon name="ClockIcon" size={11} />
                {person.exp}
              </div>

              {/* Quote */}
              <p className="text-xs text-muted italic leading-relaxed mb-3 border-l-2 border-primary/30 pl-3">
                {person.quote}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {person.speciality.split(' · ').map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-primary/8 text-primary text-2xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Departments grid */}
        <div className="reveal-hidden p-6 sm:p-8 rounded-2xl border border-border bg-background" style={{ transitionDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="BuildingLibraryIcon" size={17} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display font-700 text-base text-foreground">Academic Departments</h3>
              <p className="text-xs text-muted">120+ faculty members across 6 departments</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {departments.map((dept, i) => (
              <div
                key={dept.name}
                className="reveal-hidden flex flex-col items-center text-center p-4 rounded-xl border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-200"
                style={{ transitionDelay: `${0.06 * i}s` }}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${dept.color}`}>
                  <Icon name={dept.icon as 'BeakerIcon'} size={18} />
                </div>
                <div className="font-display font-700 text-sm text-foreground mb-0.5">{dept.name}</div>
                <div className="text-xs text-muted mb-1">{dept.head}</div>
                <div className="text-xs text-primary font-semibold">{dept.teachers} Teachers</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
