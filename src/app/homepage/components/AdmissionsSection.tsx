'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  { step: '01', title: 'Download Prospectus', desc: 'Download the school prospectus and admission form from our website or collect it from the school office.' },
  { step: '02', title: 'Submit Application', desc: 'Fill in the application form and submit it along with required documents at the school office or online.' },
  { step: '03', title: 'Interaction & Assessment', desc: 'Attend a brief interaction session. For Grade I and above, a simple written assessment may be conducted.' },
  { step: '04', title: 'Confirmation & Fee Payment', desc: 'Receive your admission confirmation letter and complete the fee payment to secure your child\'s seat.' },
];

const documents = [
  'Birth Certificate (original + photocopy)',
  'Previous class Report Card / Transfer Certificate',
  'Aadhaar Card of student and parents',
  '4 recent passport-size photographs',
  'Proof of residence (electricity bill / rent agreement)',
  'Caste certificate (if applicable)',
];

export default function AdmissionsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref?.current?.querySelectorAll('.reveal-hidden');
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('reveal-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="admissions" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="DocumentTextIcon" size={13} />
            Admissions 2025–26
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.1s' }}>
            Join the Greenwood Family
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.15s' }}>
            Admissions are open for the 2025–26 academic session for Nursery to Grade IX. Seats are limited — apply early to secure your child's future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Process */}
          <div>
            <h3 className="reveal-hidden font-display font-700 text-lg text-foreground mb-6">Admission Process</h3>
            <div className="space-y-4">
              {steps?.map((s, i) => (
                <div
                  key={s?.step}
                  className="reveal-hidden flex gap-4 p-5 rounded-2xl bg-white border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-200"
                  style={{ transitionDelay: `${0.1 * i}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 text-white font-display font-800 text-sm">
                    {s?.step}
                  </div>
                  <div>
                    <h4 className="font-display font-700 text-sm text-foreground mb-1">{s?.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{s?.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Documents + CTA */}
          <div className="space-y-6">
            {/* Documents */}
            <div className="reveal-hidden p-6 rounded-2xl bg-white border border-border">
              <h3 className="font-display font-700 text-base text-foreground mb-4 flex items-center gap-2">
                <Icon name="ClipboardDocumentListIcon" size={18} className="text-primary" />
                Documents Required
              </h3>
              <ul className="space-y-2.5">
                {documents?.map((doc) => (
                  <li key={doc} className="flex items-start gap-2.5 text-sm text-muted">
                    <Icon name="CheckCircleIcon" size={15} variant="solid" className="text-success mt-0.5 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA card */}
            <div
              className="reveal-hidden p-6 rounded-2xl text-white"
              style={{ background: 'linear-gradient(135deg, #1C4ED8 0%, #0EA5E9 100%)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon name="CalendarDaysIcon" size={18} className="text-white/80" />
                <span className="text-sm font-semibold text-white/80">Last Date to Apply</span>
              </div>
              <div className="font-display font-800 text-2xl text-white mb-1">April 30, 2026</div>
              <p className="text-sm text-white/70 mb-5">Don't miss the deadline. Seats fill up fast every year.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:admissions@greenwoodacademy.edu.in"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors"
                >
                  <Icon name="EnvelopeIcon" size={15} />
                  Email Us
                </a>
                <a
                  href="tel:+911123456789"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white/15 text-white text-sm font-semibold rounded-xl border border-white/20 hover:bg-white/25 transition-colors"
                >
                  <Icon name="PhoneIcon" size={15} />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
