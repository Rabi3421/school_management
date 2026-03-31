'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactSection() {
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
    <section id="contact" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="PhoneIcon" size={13} />
            Get in Touch
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.1s' }}>
            We'd Love to Hear From You
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto" style={{ transitionDelay: '0.15s' }}>
            Have questions about admissions, academics, or school life? Reach out to us — our team is happy to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: 'MapPinIcon',
                title: 'School Address',
                lines: ['12, Greenwood Road, Sector 14,', 'New Delhi – 110001, India'],
              },
              {
                icon: 'PhoneIcon',
                title: 'Phone Numbers',
                lines: ['+91 11 2345 6789 (Office)', '+91 98765 43210 (Admissions)'],
              },
              {
                icon: 'EnvelopeIcon',
                title: 'Email',
                lines: ['info@greenwoodacademy.edu.in', 'admissions@greenwoodacademy.edu.in'],
              },
              {
                icon: 'ClockIcon',
                title: 'Office Hours',
                lines: ['Monday – Saturday: 8:00 AM – 4:00 PM', 'Sunday & Public Holidays: Closed'],
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="reveal-hidden flex gap-4 p-5 rounded-2xl bg-background border border-border"
                style={{ transitionDelay: `${0.08 * i}s` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon as 'MapPinIcon'} size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-display font-700 text-sm text-foreground mb-1">{item.title}</div>
                  {item.lines.map((line) => (
                    <div key={line} className="text-xs text-muted leading-relaxed">{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 reveal-hidden">
            <div className="p-6 sm:p-8 rounded-2xl bg-background border border-border">
              <h3 className="font-display font-700 text-lg text-foreground mb-6">Send Us a Message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all">
                    <option value="">Select a topic</option>
                    <option>Admission Enquiry</option>
                    <option>Fee Structure</option>
                    <option>Academic Query</option>
                    <option>Transport / Bus Route</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-blue"
                >
                  <Icon name="PaperAirplaneIcon" size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
