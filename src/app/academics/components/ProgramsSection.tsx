'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const programs = [
  {
    id: 'pre-primary',
    level: 'Pre-Primary',
    grades: 'Nursery · LKG · UKG',
    ageGroup: 'Ages 3 – 6',
    icon: 'StarIcon',
    color: 'bg-warning/10 text-warning',
    border: 'border-warning/25',
    gradient: 'from-amber-500 to-orange-400',
    desc: 'Our Pre-Primary program nurtures the whole child through play-based, inquiry-led learning. We build strong foundations in language, numeracy, and social skills in a joyful, safe environment.',
    subjects: ['Phonics & Reading', 'Number Sense', 'Art & Craft', 'Music & Movement', 'Environmental Awareness', 'Story Time'],
    highlights: ['Child-centric classrooms', 'Trained Montessori educators', 'Daily outdoor play', 'Parent involvement programme'],
    students: '320+',
  },
  {
    id: 'primary',
    level: 'Primary School',
    grades: 'Grade 1 – 5',
    ageGroup: 'Ages 6 – 11',
    icon: 'BookOpenIcon',
    color: 'bg-success/10 text-success',
    border: 'border-success/25',
    gradient: 'from-emerald-500 to-teal-400',
    desc: 'Primary classes build strong conceptual foundations across all core subjects. A balanced mix of structured lessons, experiential activities, and formative assessments keeps every child engaged.',
    subjects: ['English Language', 'Mathematics', 'Environmental Science', 'Hindi', 'Social Studies', 'Computer Basics'],
    highlights: ['Activity-based learning', 'Smart classroom tools', 'Weekly reading sessions', 'Annual science fair'],
    students: '580+',
  },
  {
    id: 'middle',
    level: 'Middle School',
    grades: 'Grade 6 – 8',
    ageGroup: 'Ages 11 – 14',
    icon: 'BeakerIcon',
    color: 'bg-accent/10 text-accent',
    border: 'border-accent/25',
    gradient: 'from-blue-500 to-cyan-400',
    desc: 'Middle school deepens subject knowledge with dedicated labs for Science, and workshops for critical thinking, coding, and research. Students begin exploring career interests through electives.',
    subjects: ['Science (Physics, Chemistry, Biology)', 'Mathematics', 'English & Literature', 'Hindi / Sanskrit', 'Social Science', 'IT & Coding'],
    highlights: ['Dedicated science labs', 'Project-based learning', 'Coding workshops', 'Debate & MUN clubs'],
    students: '620+',
  },
  {
    id: 'secondary',
    level: 'Secondary',
    grades: 'Grade 9 – 10',
    ageGroup: 'Ages 14 – 16',
    icon: 'AcademicCapIcon',
    color: 'bg-primary/10 text-primary',
    border: 'border-primary/25',
    gradient: 'from-indigo-500 to-blue-400',
    desc: 'CBSE Board preparation with a rigorous yet supportive academic environment. Students receive personalised attention, mock exams, and career counselling to make informed stream choices.',
    subjects: ['Science / Commerce / Arts electives', 'Mathematics', 'English', 'Hindi / Regional Language', 'IT / Painting / Physical Ed.'],
    highlights: ['Board exam coaching', 'Career counselling sessions', 'Mock tests & analysis', 'Remedial batches'],
    students: '510+',
  },
  {
    id: 'senior',
    level: 'Senior Secondary',
    grades: 'Grade 11 – 12',
    ageGroup: 'Ages 16 – 18',
    icon: 'TrophyIcon',
    color: 'bg-danger/10 text-danger',
    border: 'border-danger/25',
    gradient: 'from-rose-500 to-pink-400',
    desc: 'Specialised Science, Commerce, and Humanities streams with expert subject faculty. We prepare students for CBSE board exams and competitive entrance tests with structured doubt sessions and mock boards.',
    subjects: ['Science: Physics, Chemistry, Maths/Bio', 'Commerce: Accounts, Business Studies, Economics', 'Humanities: History, Geography, Political Science, Psychology'],
    highlights: ['Expert stream faculty', 'JEE / NEET / CUET coaching', 'University application support', '100% Board pass rate'],
    students: '380+',
  },
  {
    id: 'cocurricular',
    level: 'Co-Curricular',
    grades: 'All Grades',
    ageGroup: 'Ages 3 – 18',
    icon: 'MusicalNoteIcon',
    color: 'bg-violet-500/10 text-violet-600',
    border: 'border-violet-500/25',
    gradient: 'from-violet-500 to-purple-400',
    desc: 'Beyond academics, Greenwood Academy offers 20+ clubs and activities that build leadership, creativity, teamwork, and resilience — skills essential for a well-rounded life.',
    subjects: ['Cricket, Football & Athletics', 'Classical & Western Music', 'Bharatanatyam & Contemporary Dance', 'Robotics & AI Club', 'Debate & Model UN', 'Visual Arts & Pottery'],
    highlights: ['State & national level competitions', 'Annual cultural festival', 'Sports complex & pool', 'Professional coaches & mentors'],
    students: 'All 2,400+',
  },
];

export default function ProgramsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('pre-primary');

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

  const current = programs.find((p) => p.id === active)!;

  return (
    <section id="programs" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="AcademicCapIcon" size={13} />
            Academic Programs
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Education for Every{' '}
            <span className="gradient-text">Stage of Growth</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            From the first day of Nursery to the final board exam, our structured curriculum ensures every student is challenged, supported, and inspired.
          </p>
        </div>

        {/* Tab bar */}
        <div className="reveal-hidden flex overflow-x-auto gap-2 pb-2 mb-8 scrollbar-none">
          {programs.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                active === p.id
                  ? 'bg-primary text-white border-primary shadow-blue'
                  : 'bg-white text-muted border-border hover:border-primary/30 hover:text-primary'
              }`}
            >
              <Icon name={p.icon as 'StarIcon'} size={15} />
              <span className="hidden sm:inline">{p.level}</span>
              <span className="sm:hidden">{p.grades}</span>
            </button>
          ))}
        </div>

        {/* Active detail panel */}
        <div className="reveal-hidden grid grid-cols-1 lg:grid-cols-5 gap-6 bg-white rounded-3xl border border-border overflow-hidden shadow-soft">

          {/* Left info */}
          <div className="lg:col-span-2 p-7 sm:p-9 flex flex-col justify-between"
            style={{ background: `linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 100%)` }}>
            <div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                <Icon name={current.icon as 'StarIcon'} size={28} className="text-white" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium mb-3">
                <Icon name="UsersIcon" size={11} />
                {current.students} Students
              </div>
              <h3 className="font-display font-800 text-2xl text-white mb-1">{current.level}</h3>
              <div className="text-white/60 text-sm mb-1">{current.grades}</div>
              <div className="text-white/40 text-xs mb-5">{current.ageGroup}</div>
              <p className="text-white/70 text-sm leading-relaxed">{current.desc}</p>
            </div>

            {/* Highlights */}
            <div className="mt-6 space-y-2">
              {current.highlights.map((h) => (
                <div key={h} className="flex items-center gap-2 text-xs text-white/75">
                  <Icon name="CheckCircleIcon" size={14} variant="solid" className="text-emerald-400 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Right subjects */}
          <div className="lg:col-span-3 p-7 sm:p-9">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="BookOpenIcon" size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-display font-700 text-sm text-foreground">Subjects & Activities</div>
                <div className="text-xs text-muted">{current.grades}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {current.subjects.map((s) => (
                <div key={s} className={`flex items-start gap-3 p-3.5 rounded-xl border ${current.border} bg-gradient-to-br`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${current.color}`}>
                    <Icon name="CheckIcon" size={12} />
                  </div>
                  <span className="text-sm text-foreground font-medium leading-snug">{s}</span>
                </div>
              ))}
            </div>

            {/* Programme navigation hint */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-xs text-muted">
                {programs.findIndex((p) => p.id === active) + 1} of {programs.length} programs
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => { const idx = programs.findIndex((p) => p.id === active); if (idx > 0) setActive(programs[idx - 1].id); }}
                  disabled={programs.findIndex((p) => p.id === active) === 0}
                  className="p-2 rounded-lg border border-border text-muted hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-30"
                >
                  <Icon name="ChevronLeftIcon" size={16} />
                </button>
                <button
                  onClick={() => { const idx = programs.findIndex((p) => p.id === active); if (idx < programs.length - 1) setActive(programs[idx + 1].id); }}
                  disabled={programs.findIndex((p) => p.id === active) === programs.length - 1}
                  className="p-2 rounded-lg border border-border text-muted hover:text-primary hover:border-primary/30 transition-colors disabled:opacity-30"
                >
                  <Icon name="ChevronRightIcon" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
