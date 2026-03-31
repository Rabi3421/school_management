'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const faqs = [
  {
    q: 'What are the school office hours?',
    a: 'Our office is open Monday to Saturday, 8:00 AM to 4:00 PM. We are closed on Sundays and public holidays. For urgent matters, you can email us anytime.',
  },
  {
    q: 'How can I enquire about admissions?',
    a: 'You can fill out the contact form above, call our Admissions Office at +91 98765 43210, or visit the school in person during office hours. You can also apply directly on our Admissions page.',
  },
  {
    q: 'How long does it take to get a reply?',
    a: 'We respond to all written enquiries within 1 business day. Phone calls are attended during office hours. For urgent admission queries, please call directly.',
  },
  {
    q: 'Is there parking available when I visit?',
    a: 'Yes, we have a dedicated visitor parking area near the main gate. Please inform the security guard that you are visiting the office and they will direct you.',
  },
  {
    q: 'Can I visit the campus before applying?',
    a: 'Absolutely! We welcome campus visits by appointment. Please call or email us to schedule a guided tour. We usually conduct school open days every quarter.',
  },
];

export default function ContactFAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

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
    <>
      {/* FAQ */}
      <section ref={ref} className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Left label */}
            <div className="lg:col-span-2">
              <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Icon name="QuestionMarkCircleIcon" size={13} />
                FAQs
              </div>
              <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
                Common{' '}
                <span className="gradient-text">Questions</span>
              </h2>
              <p className="reveal-hidden text-muted leading-relaxed mb-6" style={{ transitionDelay: '0.1s' }}>
                Can't find your answer here? Use the contact form or call us directly.
              </p>
              <div className="reveal-hidden flex flex-col gap-3" style={{ transitionDelay: '0.15s' }}>
                <Link href="/admissions" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all w-fit">
                  <Icon name="AcademicCapIcon" size={15} />
                  Admissions FAQ
                </Link>
                <a href="#contact-form" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-foreground text-sm font-semibold rounded-xl hover:border-primary/30 hover:shadow-soft transition-all w-fit bg-white">
                  <Icon name="PaperAirplaneIcon" size={15} className="text-primary" />
                  Ask Your Question
                </a>
              </div>
            </div>

            {/* Right: accordion */}
            <div className="lg:col-span-3 space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={faq.q}
                  className="reveal-hidden rounded-2xl border border-border bg-background overflow-hidden transition-all duration-200 hover:border-primary/20"
                  style={{ transitionDelay: `${0.07 * i}s` }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display font-700 text-sm text-foreground leading-snug">{faq.q}</span>
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${openIndex === i ? 'bg-primary text-white rotate-180' : 'bg-border text-muted'}`}>
                      <Icon name="ChevronDownIcon" size={13} />
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-muted leading-relaxed border-t border-border pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dark gradient CTA */}
      <section
        className="relative py-16 sm:py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 40%, #1C4ED8 70%, #0EA5E9 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/80 text-xs font-semibold">Admissions Open · 2025–26</span>
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-white leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Ready to Join the{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8, #818CF8, #38BDF8)', backgroundSize: '200% auto', animation: 'gradientShift 3s linear infinite' }}>
              Greenwood Family?
            </span>
          </h2>
          <p className="reveal-hidden text-white/65 max-w-xl mx-auto leading-relaxed mb-8" style={{ transitionDelay: '0.1s' }}>
            Seats are filling up fast for 2025–26. Apply today or visit us for a campus tour — we'd love to welcome your child to Greenwood Academy.
          </p>
          <div className="reveal-hidden flex flex-col sm:flex-row gap-3 justify-center" style={{ transitionDelay: '0.15s' }}>
            <Link href="/admissions" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-white/90 transition-all shadow-soft">
              <Icon name="AcademicCapIcon" size={16} />
              Apply for Admission
            </Link>
            <Link href="/about" className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
              Learn About Us <Icon name="ArrowRightIcon" size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
