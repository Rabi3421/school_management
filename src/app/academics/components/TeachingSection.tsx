'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const methods = [
  {
    icon: 'ComputerDesktopIcon',
    title: 'Smart Classrooms',
    desc: 'Every classroom is equipped with interactive smartboards, high-speed Wi-Fi, and digital learning tools that make lessons visual, engaging, and accessible.',
    tags: ['Smartboard', 'Digital Notes', 'Live Quizzes'],
    color: 'bg-primary/10 text-primary',
    gradient: 'from-primary/5 to-transparent',
  },
  {
    icon: 'BeakerIcon',
    title: 'Hands-On Labs',
    desc: 'Dedicated Physics, Chemistry, Biology, and Computer labs with modern instruments for practical learning that reinforces theoretical understanding.',
    tags: ['12 Labs', 'Safety Certified', 'Research Projects'],
    color: 'bg-accent/10 text-accent',
    gradient: 'from-accent/5 to-transparent',
  },
  {
    icon: 'UserGroupIcon',
    title: 'Collaborative Learning',
    desc: 'Group projects, peer teaching, and class debates foster communication, teamwork, and critical thinking — skills valued in every career.',
    tags: ['Group Projects', 'Peer Learning', 'Debates'],
    color: 'bg-success/10 text-success',
    gradient: 'from-success/5 to-transparent',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Continuous Assessment',
    desc: 'Regular formative assessments, unit tests, and detailed progress reports help teachers identify learning gaps early and personalise support for each student.',
    tags: ['Formative Tests', 'Progress Reports', 'Parent Meets'],
    color: 'bg-warning/10 text-warning',
    gradient: 'from-warning/5 to-transparent',
  },
  {
    icon: 'CpuChipIcon',
    title: 'Technology & Coding',
    desc: 'Coding, robotics, and AI workshops from Grade 4 onwards prepare students for a tech-driven world — with annual hackathons and inter-school competitions.',
    tags: ['Python & Scratch', 'Robotics', 'AI Workshops'],
    color: 'bg-violet-500/10 text-violet-600',
    gradient: 'from-violet-500/5 to-transparent',
  },
  {
    icon: 'HeartIcon',
    title: 'Wellbeing & Counselling',
    desc: 'Dedicated counsellors support students\' mental health, manage exam anxiety, and guide career choices — because wellbeing is the foundation of learning.',
    tags: ['Counselling', 'Mindfulness', 'Career Guidance'],
    color: 'bg-rose-500/10 text-rose-600',
    gradient: 'from-rose-500/5 to-transparent',
  },
];

const principles = [
  { icon: 'LightBulbIcon', label: 'Curiosity-Led' },
  { icon: 'PuzzlePieceIcon', label: 'Experiential' },
  { icon: 'ShieldCheckIcon', label: 'Evidence-Based' },
  { icon: 'ArrowTrendingUpIcon', label: 'Growth-Oriented' },
];

export default function TeachingSection() {
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
    <section id="teaching" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="SparklesIcon" size={13} />
            Pedagogy
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            How We{' '}
            <span className="gradient-text">Teach</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Our teaching methodology combines modern technology, research-backed practices, and the warmth of a nurturing community to bring out the best in every student.
          </p>
        </div>

        {/* Teaching principles strip */}
        <div className="reveal-hidden flex flex-wrap justify-center gap-3 mb-12">
          {principles.map((p) => (
            <div key={p.label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <Icon name={p.icon as 'LightBulbIcon'} size={15} className="text-primary" />
              <span className="text-sm font-semibold text-primary">{p.label}</span>
            </div>
          ))}
        </div>

        {/* Methods grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {methods.map((m, i) => (
            <div
              key={m.title}
              className={`reveal-hidden p-6 rounded-2xl border border-border bg-gradient-to-br ${m.gradient} hover:border-primary/25 hover:shadow-soft transition-all duration-300 card-lift group`}
              style={{ transitionDelay: `${0.07 * i}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${m.color} transition-transform duration-300 group-hover:scale-110`}>
                <Icon name={m.icon as 'ComputerDesktopIcon'} size={22} />
              </div>
              <h3 className="font-display font-700 text-base text-foreground mb-2">{m.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4">{m.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {m.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white border border-border text-2xs text-muted font-medium">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quote banner */}
        <div
          className="reveal-hidden mt-14 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left"
          style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 100%)' }}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Icon name="ChatBubbleBottomCenterTextIcon" size={30} className="text-white" />
          </div>
          <div>
            <p className="text-white/80 text-lg italic leading-relaxed mb-2">
              "We don't just teach subjects — we teach students how to think, how to learn, and how to grow as human beings."
            </p>
            <div className="text-white font-semibold text-sm">Dr. Meena Kapoor</div>
            <div className="text-white/50 text-xs">Principal, Greenwood Academy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
