'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    step: '01',
    icon: 'DocumentArrowDownIcon',
    title: 'Download Prospectus',
    desc: 'Download the school prospectus and admission form from our website or collect it in person from the school office — free of charge.',
    duration: '5 minutes',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    step: '02',
    icon: 'ClipboardDocumentListIcon',
    title: 'Submit Application',
    desc: 'Fill in the application form and submit it along with all required documents at the school office or via our online portal.',
    duration: '1–2 days',
    color: 'from-violet-500 to-purple-400',
  },
  {
    step: '03',
    icon: 'ChatBubbleLeftRightIcon',
    title: 'Interaction & Assessment',
    desc: 'Attend a brief parent–child interaction session. For Grade I and above, a simple written assessment may be conducted.',
    duration: '1 hour',
    color: 'from-emerald-500 to-teal-400',
  },
  {
    step: '04',
    icon: 'CheckBadgeIcon',
    title: 'Confirmation',
    desc: 'Receive your admission confirmation letter and complete the fee payment to officially secure your child\'s seat at Greenwood.',
    duration: '1–2 days',
    color: 'from-amber-500 to-orange-400',
  },
];

const faqs = [
  { q: 'What is the age criteria for Nursery admission?', a: 'The child must be 3 years old by April 1 of the academic year. For KG, the minimum age is 4 years.' },
  { q: 'Is there an entrance exam for Junior classes?', a: 'For Pre-Primary and Nursery, there is no entrance exam — only a brief parent–child interaction. For Grade I and above, a simple written assessment is conducted.' },
  { q: 'Can I apply online?', a: 'Yes. You can submit the application form online through this page. Physical forms are also available at the school office.' },
  { q: 'Are there any sibling concessions?', a: 'Yes. Siblings of currently enrolled students get a 10% concession on the annual fee. Please mention sibling details in the form.' },
  { q: 'What is the medium of instruction?', a: 'The primary medium of instruction is English. Hindi is taught as a compulsory second language from Nursery onwards.' },
  { q: 'Is transport facility available?', a: 'Yes. School buses cover most areas in Delhi NCR. Transport charges are billed separately based on the pickup zone.' },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

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
    <section id="process" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="ListBulletIcon" size={13} />
            How to Apply
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Admission Process,{' '}
            <span className="gradient-text">Step by Step</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Our admission process is simple, transparent, and stress-free. Here's exactly what to expect from start to finish.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="reveal-hidden relative flex flex-col p-6 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-soft transition-all duration-300 card-lift group"
              style={{ transitionDelay: `${0.09 * i}s` }}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px bg-border z-10" />
              )}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-md transition-transform duration-300 group-hover:scale-110`}>
                <Icon name={s.icon as 'DocumentArrowDownIcon'} size={22} className="text-white" />
              </div>
              <div className="absolute top-4 right-4 font-display font-800 text-4xl text-border select-none">{s.step}</div>
              <h3 className="font-display font-700 text-base text-foreground mb-2 pr-6">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">{s.desc}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Icon name="ClockIcon" size={12} className="text-primary" />
                {s.duration}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="QuestionMarkCircleIcon" size={13} />
              FAQs
            </div>
            <h2 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="reveal-hidden text-muted leading-relaxed" style={{ transitionDelay: '0.1s' }}>
              Have more questions? Call us at <a href="tel:+911123456789" className="text-primary font-semibold hover:underline">+91 11 2345 6789</a> or email <a href="mailto:admissions@greenwoodacademy.edu.in" className="text-primary font-semibold hover:underline">admissions@greenwoodacademy.edu.in</a>.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`reveal-hidden rounded-2xl border transition-all duration-200 overflow-hidden ${openFaq === i ? 'border-primary/30 shadow-soft' : 'border-border'} bg-white`}
                style={{ transitionDelay: `${0.06 * i}s` }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-display font-700 text-sm text-foreground leading-snug">{faq.q}</span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${openFaq === i ? 'bg-primary text-white rotate-180' : 'bg-border text-muted'}`}>
                    <Icon name="ChevronDownIcon" size={13} />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
