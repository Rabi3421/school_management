'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function EventsCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  const quickLinks = [
    { icon: 'CalendarDaysIcon', label: 'Full Calendar', href: '#calendar', color: 'from-blue-500 to-cyan-400' },
    { icon: 'TrophyIcon', label: 'Sports Events', href: '#calendar', color: 'from-emerald-500 to-teal-400' },
    { icon: 'AcademicCapIcon', label: 'Academic Events', href: '#calendar', color: 'from-violet-500 to-purple-400' },
    { icon: 'MusicalNoteIcon', label: 'Cultural Shows', href: '#calendar', color: 'from-rose-500 to-pink-400' },
  ];

  return (
    <>
      {/* Quick links bar */}
      <section ref={ref} className="py-10 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="reveal-hidden flex items-center gap-3 p-4 rounded-2xl border border-border hover:border-primary/25 hover:shadow-soft bg-background transition-all duration-200 card-lift group"
                style={{ transitionDelay: `${0.06 * i}s` }}
              >
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                  <Icon name={link.icon as 'CalendarDaysIcon'} size={17} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Dark gradient CTA */}
      <section
        className="relative py-16 sm:py-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 40%, #1C4ED8 70%, #0EA5E9 100%)' }}
      >
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: newsletter signup */}
            <div>
              <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <Icon name="BellIcon" size={13} className="text-white/80" />
                <span className="text-white/80 text-xs font-semibold">Never Miss an Event</span>
              </div>
              <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-white leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
                Stay Updated on{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8, #818CF8, #38BDF8)', backgroundSize: '200% auto', animation: 'gradientShift 3s linear infinite' }}
                >
                  Every Event
                </span>
              </h2>
              <p className="reveal-hidden text-white/65 leading-relaxed mb-8 max-w-md" style={{ transitionDelay: '0.1s' }}>
                Subscribe to our events newsletter and get advance notice of all upcoming school events, PTMs, sports days, and cultural programmes delivered to your inbox.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubscribe} className="reveal-hidden flex flex-col sm:flex-row gap-3 max-w-md" style={{ transitionDelay: '0.15s' }}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-soft flex-shrink-0 disabled:opacity-70"
                  >
                    {loading ? (
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                    ) : (
                      <>
                        Subscribe <Icon name="ArrowRightIcon" size={14} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div
                  className="reveal-hidden flex items-center gap-3 px-5 py-4 rounded-xl max-w-md"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                >
                  <Icon name="CheckCircleIcon" size={20} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-white font-semibold text-sm">You're subscribed!</div>
                    <div className="text-white/60 text-xs mt-0.5">We'll send you updates for all upcoming events at Greenwood.</div>
                  </div>
                </div>
              )}
              <p className="reveal-hidden text-white/40 text-xs mt-3" style={{ transitionDelay: '0.2s' }}>
                No spam, ever. Unsubscribe at any time.
              </p>
            </div>

            {/* Right: contact + admissions block */}
            <div className="space-y-4">
              {/* Event enquiry */}
              <div
                className="reveal-hidden p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <Icon name="ChatBubbleBottomCenterTextIcon" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-display font-700 text-sm">Event Queries</div>
                    <div className="text-white/55 text-xs">Have a question about an upcoming event?</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <a href="tel:+911126543210" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                    <Icon name="PhoneIcon" size={14} className="text-cyan-400 flex-shrink-0" />
                    +91 11 2654 3210
                  </a>
                  <a href="mailto:events@greenwoodacademy.edu.in" className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
                    <Icon name="EnvelopeIcon" size={14} className="text-cyan-400 flex-shrink-0" />
                    events@greenwoodacademy.edu.in
                  </a>
                </div>
              </div>

              {/* Admissions nudge */}
              <div
                className="reveal-hidden p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', transitionDelay: '0.08s' }}
              >
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Ready to be part of these incredible moments? Join the Greenwood family for 2025–26.
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-soft"
                  >
                    <Icon name="AcademicCapIcon" size={15} />
                    Apply Now
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                  >
                    About Us
                    <Icon name="ArrowRightIcon" size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
