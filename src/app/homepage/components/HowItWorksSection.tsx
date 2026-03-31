'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    step: '01',
    title: 'Register Your School',
    description: 'Sign up in 2 minutes. Enter your school name, board type, and admin details. No technical knowledge required.',
    icon: 'BuildingLibraryIcon',
    detail: 'Takes less than 2 minutes',
    color: '#1C4ED8',
  },
  {
    step: '02',
    title: 'Setup Your Dashboard',
    description: 'Add classes, subjects, teachers, and import your student data via Excel. Our onboarding wizard guides every step.',
    icon: 'Cog6ToothIcon',
    detail: 'Import data from Excel',
    color: '#0EA5E9',
  },
  {
    step: '03',
    title: 'Manage Everything Easily',
    description: 'Start marking attendance, collecting fees, publishing results, and communicating with parents — all from one screen.',
    icon: 'RocketLaunchIcon',
    detail: 'Go live on day one',
    color: '#10B981',
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-hidden');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('reveal-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 reveal-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-4">
            <Icon name="BoltIcon" size={12} variant="solid" className="text-primary" />
            Simple Onboarding
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-4">
            Up and Running in{' '}
            <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            No IT team needed. Any school admin can set up SchoolSync and go live on the same day.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-primary/20 via-accent/40 to-success/20 pointer-events-none" style={{ top: '3.5rem', left: '20%', right: '20%' }} />

          {steps.map((step, i) => (
            <div
              key={step.step}
              className="reveal-hidden relative"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="bg-white rounded-2xl border border-border/60 p-6 sm:p-8 card-lift hover:border-primary/20 h-full flex flex-col">
                {/* Step number + icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft"
                    style={{ background: `${step.color}12` }}
                  >
                    <Icon name={step.icon as 'BuildingLibraryIcon'} size={26} style={{ color: step.color }} />
                  </div>
                  <span
                    className="text-4xl font-800 font-display leading-none"
                    style={{ color: `${step.color}20` }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-700 text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-5">{step.description}</p>

                {/* Detail tag */}
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: `${step.color}10`, color: step.color }}
                >
                  <Icon name="CheckCircleIcon" size={12} variant="solid" style={{ color: step.color }} />
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below */}
        <div className="text-center mt-10 reveal-hidden">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-blue hover:shadow-lifted group"
          >
            Start Setting Up Your School
            <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}