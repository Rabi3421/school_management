'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const streams = [
  {
    name: 'Science Stream',
    icon: 'BeakerIcon',
    gradient: 'from-blue-600 to-cyan-500',
    badge: 'bg-blue-50 border-blue-200 text-blue-700',
    careers: ['Engineering (IIT/NIT)', 'Medicine (NEET)', 'Research & Academia', 'Architecture', 'Data Science & AI'],
    coreSubjects: [
      { name: 'Physics', icon: 'BoltIcon' },
      { name: 'Chemistry', icon: 'BeakerIcon' },
      { name: 'Mathematics', icon: 'CalculatorIcon' },
      { name: 'Biology (Optional)', icon: 'HeartIcon' },
    ],
    electives: ['Computer Science', 'Physical Education', 'Fine Arts'],
    exams: ['JEE Main & Advanced', 'NEET UG', 'CUET', 'BITSAT'],
    seats: 120,
    desc: 'Designed for students passionate about STEM, the Science stream provides rigorous preparation for engineering, medical, and research careers through advanced labs and expert faculty.',
  },
  {
    name: 'Commerce Stream',
    icon: 'ChartBarIcon',
    gradient: 'from-emerald-600 to-teal-500',
    badge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    careers: ['CA / CMA / CS', 'Business Management (MBA)', 'Banking & Finance', 'Economics', 'Entrepreneurship'],
    coreSubjects: [
      { name: 'Accountancy', icon: 'DocumentTextIcon' },
      { name: 'Business Studies', icon: 'BriefcaseIcon' },
      { name: 'Economics', icon: 'ChartBarIcon' },
      { name: 'Mathematics / IP', icon: 'CalculatorIcon' },
    ],
    electives: ['Entrepreneurship', 'Computer Science', 'Physical Education'],
    exams: ['CA Foundation', 'CUET', 'IPMAT', 'DU Entrance'],
    seats: 100,
    desc: 'The Commerce stream equips students with financial acumen, business strategy, and economics knowledge — preparing them for careers in finance, management, and entrepreneurship.',
  },
  {
    name: 'Humanities Stream',
    icon: 'BookOpenIcon',
    gradient: 'from-violet-600 to-purple-500',
    badge: 'bg-violet-50 border-violet-200 text-violet-700',
    careers: ['Civil Services (IAS/IPS)', 'Law & Judiciary', 'Journalism & Media', 'Psychology', 'Design & Fine Arts'],
    coreSubjects: [
      { name: 'History', icon: 'BuildingLibraryIcon' },
      { name: 'Political Science', icon: 'FlagIcon' },
      { name: 'Geography', icon: 'GlobeAltIcon' },
      { name: 'Psychology / Sociology', icon: 'UserGroupIcon' },
    ],
    electives: ['Fine Arts', 'Music', 'Legal Studies', 'Physical Education'],
    exams: ['CUET', 'CLAT', 'NID', 'Mass Comm. Entrance'],
    seats: 80,
    desc: 'The Humanities stream opens doors to law, civil services, media, psychology, and the arts. Our expert faculty guide students through social sciences, languages, and critical thinking.',
  },
];

export default function StreamsSection() {
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
    <section id="streams" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="FunnelIcon" size={13} />
            Grade 11 & 12
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Choose Your{' '}
            <span className="gradient-text">Stream</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Senior Secondary offers three specialised streams with dedicated faculty, well-equipped labs, and entrance exam coaching — so every student is prepared for what lies ahead.
          </p>
        </div>

        {/* Stream cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {streams.map((stream, i) => (
            <div
              key={stream.name}
              className="reveal-hidden flex flex-col rounded-3xl border border-border overflow-hidden card-lift bg-background"
              style={{ transitionDelay: `${0.1 * i}s` }}
            >
              {/* Card header — dark gradient */}
              <div className={`bg-gradient-to-br ${stream.gradient} p-7`}>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <Icon name={stream.icon as 'BeakerIcon'} size={24} className="text-white" />
                </div>
                <h3 className="font-display font-800 text-xl text-white mb-2">{stream.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{stream.desc}</p>
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Icon name="UserGroupIcon" size={13} />
                  {stream.seats} seats available
                </div>
              </div>

              {/* Card body */}
              <div className="flex-1 p-6 flex flex-col gap-5">
                {/* Core subjects */}
                <div>
                  <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Core Subjects</div>
                  <div className="grid grid-cols-2 gap-2">
                    {stream.coreSubjects.map((s) => (
                      <div key={s.name} className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-white">
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name={s.icon as 'BoltIcon'} size={12} className="text-primary" />
                        </div>
                        <span className="text-xs font-medium text-foreground leading-tight">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Electives */}
                <div>
                  <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Electives</div>
                  <div className="flex flex-wrap gap-1.5">
                    {stream.electives.map((e) => (
                      <span key={e} className="px-2.5 py-1 rounded-full bg-border-light text-muted text-2xs font-medium">{e}</span>
                    ))}
                  </div>
                </div>

                {/* Entrance exams */}
                <div>
                  <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Entrance Exams Covered</div>
                  <div className="flex flex-wrap gap-1.5">
                    {stream.exams.map((e) => (
                      <span key={e} className={`px-2.5 py-1 rounded-full border text-2xs font-semibold ${stream.badge}`}>{e}</span>
                    ))}
                  </div>
                </div>

                {/* Career paths */}
                <div className="mt-auto pt-4 border-t border-border">
                  <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Career Paths</div>
                  <ul className="space-y-1.5">
                    {stream.careers.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-xs text-muted">
                        <Icon name="ChevronRightIcon" size={11} className="text-primary flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
