'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const documents = [
  { doc: 'Birth Certificate', detail: 'Original + photocopy required', icon: 'DocumentTextIcon', required: true },
  { doc: 'Previous Report Card / TC', detail: 'For Grade I and above; Transfer Certificate from previous school', icon: 'AcademicCapIcon', required: true },
  { doc: 'Aadhaar Card', detail: 'Of student and both parents / guardians', icon: 'IdentificationIcon', required: true },
  { doc: 'Passport-size Photos', detail: '4 recent photographs of the student', icon: 'CameraIcon', required: true },
  { doc: 'Proof of Residence', detail: 'Electricity bill, rent agreement, or Aadhaar address', icon: 'HomeIcon', required: true },
  { doc: 'Caste Certificate', detail: 'If applicable — SC / ST / OBC (non-creamy layer)', icon: 'DocumentCheckIcon', required: false },
  { doc: 'Medical / Health Record', detail: 'Vaccination record and any known medical conditions', icon: 'HeartIcon', required: false },
  { doc: 'Sibling School ID', detail: 'If applying for sibling concession', icon: 'UserGroupIcon', required: false },
];

const importantDates = [
  { date: 'April 1, 2025', event: 'Admissions Open', icon: 'CalendarDaysIcon', status: 'done', color: 'text-success' },
  { date: 'April 15, 2026', event: 'Online Applications Close', icon: 'ComputerDesktopIcon', status: 'upcoming', color: 'text-warning' },
  { date: 'April 18–22, 2026', event: 'Interaction & Assessment', icon: 'ChatBubbleLeftRightIcon', status: 'upcoming', color: 'text-primary' },
  { date: 'April 25, 2026', event: 'Merit List Publication', icon: 'ClipboardDocumentListIcon', status: 'upcoming', color: 'text-primary' },
  { date: 'April 30, 2026', event: 'Fee Payment Deadline', icon: 'BanknotesIcon', status: 'deadline', color: 'text-danger' },
  { date: 'June 2, 2026', event: 'Academic Year Begins', icon: 'AcademicCapIcon', status: 'future', color: 'text-muted' },
];

export default function DocumentsSection() {
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
    <section id="documents" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Documents required */}
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="ClipboardDocumentListIcon" size={13} />
              Checklist
            </div>
            <h2 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
              Documents{' '}
              <span className="gradient-text">Required</span>
            </h2>
            <p className="reveal-hidden text-muted text-sm leading-relaxed mb-6" style={{ transitionDelay: '0.1s' }}>
              Please keep all documents ready before submitting your application. Incomplete applications will not be processed.
            </p>

            <div className="space-y-3">
              {documents.map((d, i) => (
                <div
                  key={d.doc}
                  className={`reveal-hidden flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-soft ${d.required ? 'bg-white border-border' : 'bg-background border-dashed border-border'}`}
                  style={{ transitionDelay: `${0.06 * i}s` }}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${d.required ? 'bg-primary/10 text-primary' : 'bg-muted-light/20 text-muted'}`}>
                    <Icon name={d.icon as 'DocumentTextIcon'} size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-700 text-sm text-foreground">{d.doc}</span>
                      {d.required
                        ? <span className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-2xs font-semibold">Required</span>
                        : <span className="px-2 py-0.5 rounded-full bg-muted-light/20 text-muted text-2xs font-semibold">Optional</span>
                      }
                    </div>
                    <p className="text-xs text-muted mt-0.5">{d.detail}</p>
                  </div>
                  <Icon name={d.required ? 'CheckCircleIcon' : 'MinusCircleIcon'} size={16} variant="solid"
                    className={`flex-shrink-0 mt-0.5 ${d.required ? 'text-success' : 'text-muted-light'}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Important dates */}
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="CalendarDaysIcon" size={13} />
              Key Dates
            </div>
            <h2 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
              Important{' '}
              <span className="gradient-text">Deadlines</span>
            </h2>
            <p className="reveal-hidden text-muted text-sm leading-relaxed mb-6" style={{ transitionDelay: '0.1s' }}>
              Mark these dates on your calendar. Missing the fee payment deadline means losing your confirmed seat.
            </p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-4">
                {importantDates.map((item, i) => (
                  <div
                    key={item.date}
                    className="reveal-hidden relative flex items-start gap-4 pl-12"
                    style={{ transitionDelay: `${0.08 * i}s` }}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-white shadow-md z-10 ${item.status === 'done' ? 'bg-success' : item.status === 'deadline' ? 'bg-danger' : item.status === 'upcoming' ? 'bg-primary' : 'bg-border'}`} />

                    <div className={`flex-1 p-4 rounded-2xl border transition-all duration-200 hover:shadow-soft ${item.status === 'deadline' ? 'bg-danger/5 border-danger/25' : item.status === 'done' ? 'bg-success/5 border-success/25' : 'bg-white border-border'}`}>
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <div className="font-display font-700 text-sm text-foreground mb-0.5">{item.event}</div>
                          <div className={`text-xs font-semibold ${item.color}`}>{item.date}</div>
                        </div>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.status === 'done' ? 'bg-success/10 text-success' : item.status === 'deadline' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
                          <Icon name={item.icon as 'CalendarDaysIcon'} size={15} />
                        </div>
                      </div>
                      {item.status === 'deadline' && (
                        <div className="mt-2 flex items-center gap-1.5 text-2xs text-danger font-semibold">
                          <Icon name="ExclamationCircleIcon" size={12} />
                          Missing this deadline forfeits your confirmed seat
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
