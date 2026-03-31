'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const programs = [
  {
    level: 'Pre-Primary',
    grades: 'Nursery · LKG · UKG',
    icon: 'StarIcon',
    color: 'bg-warning/10 text-warning border-warning/20',
    desc: 'Play-based learning that builds curiosity, creativity, and early literacy through structured activities.',
    subjects: ['Phonics & Reading', 'Number Sense', 'Art & Craft', 'Music & Movement'],
  },
  {
    level: 'Primary School',
    grades: 'Grade 1 – 5',
    icon: 'BookOpenIcon',
    color: 'bg-success/10 text-success border-success/20',
    desc: 'Strong foundational skills in core subjects with emphasis on conceptual understanding and curiosity.',
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Computer'],
  },
  {
    level: 'Middle School',
    grades: 'Grade 6 – 8',
    icon: 'BeakerIcon',
    color: 'bg-accent/10 text-accent border-accent/20',
    desc: 'Deeper subject exploration with project-based learning, labs, and critical thinking workshops.',
    subjects: ['Science Labs', 'Mathematics', 'Languages', 'Social Science', 'IT & Coding'],
  },
  {
    level: 'Secondary',
    grades: 'Grade 9 – 10',
    icon: 'AcademicCapIcon',
    color: 'bg-primary/10 text-primary border-primary/20',
    desc: 'CBSE Board preparation with focused academics, career counselling, and skill development.',
    subjects: ['Science / Commerce / Arts', 'Mathematics', 'English', 'Hindi', 'Electives'],
  },
  {
    level: 'Senior Secondary',
    grades: 'Grade 11 – 12',
    icon: 'TrophyIcon',
    color: 'bg-danger/10 text-danger border-danger/20',
    desc: 'Specialised streams with expert faculty, mock boards, and university entrance preparation.',
    subjects: ['Science Stream', 'Commerce Stream', 'Humanities Stream', 'Entrance Coaching'],
  },
  {
    level: 'Co-Curricular',
    grades: 'All Grades',
    icon: 'MusicalNoteIcon',
    color: 'bg-primary/10 text-primary border-primary/20',
    desc: 'Sports, performing arts, debate, robotics, and 20+ clubs that develop well-rounded individuals.',
    subjects: ['Cricket & Football', 'Dance & Music', 'Robotics Club', 'Debate Society'],
  },
];

export default function AcademicsSection() {
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
    <section id="academics" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="AcademicCapIcon" size={13} />
            Academic Programs
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.1s' }}>
            Education for Every Stage of Growth
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.15s' }}>
            From the first day of Nursery to the final board exam, our structured curriculum ensures every student is challenged, supported, and inspired.
          </p>
        </div>

        {/* Programs grid — asymmetric bento */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((prog, i) => (
            <div
              key={prog.level}
              className={`reveal-hidden p-6 rounded-2xl bg-white border ${prog.color.split(' ')[2]} hover:shadow-card transition-all duration-200 group`}
              style={{ transitionDelay: `${0.08 * i}s` }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${prog.color.split(' ')[0]} ${prog.color.split(' ')[2]}`}>
                <Icon name={prog.icon as 'StarIcon'} size={22} className={prog.color.split(' ')[1]} />
              </div>
              <div className="mb-1">
                <h3 className="font-display font-700 text-base text-foreground">{prog.level}</h3>
                <span className="text-xs text-muted font-medium">{prog.grades}</span>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-4">{prog.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {prog.subjects.map((s) => (
                  <span key={s} className="text-2xs font-medium px-2 py-1 rounded-lg bg-border-light text-muted">
                    {s}
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
