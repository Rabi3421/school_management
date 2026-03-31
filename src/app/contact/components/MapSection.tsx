'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const landmarks = [
  { icon: 'TruckIcon', label: 'By Metro', desc: 'Hauz Khas Metro Station (Yellow Line) — 5-min auto ride to the school gate.' },
  { icon: 'MapIcon', label: 'By Car / Bus', desc: 'Take Outer Ring Road towards Sector 14. Greenwood Road is off Gate No. 3.' },
  { icon: 'BuildingOffice2Icon', label: 'Nearest Landmark', desc: 'Adjacent to Sector 14 Community Centre, New Delhi – 110001.' },
];

export default function MapSection() {
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
    <section id="map" ref={ref} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="MapPinIcon" size={13} />
            Find Us
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
            Visit{' '}
            <span className="gradient-text">Our Campus</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            We're located in Sector 14, New Delhi — easily accessible by metro, car, or school bus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Map embed placeholder */}
          <div className="lg:col-span-2 reveal-hidden">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-card h-80 sm:h-96 bg-gradient-to-br from-slate-100 to-slate-200">
              {/* Simulated map background */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(30,64,175,0.4) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(30,64,175,0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }} />
              {/* Diagonal roads */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 400" fill="none">
                <line x1="0" y1="200" x2="600" y2="200" stroke="#1C4ED8" strokeWidth="8" />
                <line x1="300" y1="0" x2="300" y2="400" stroke="#1C4ED8" strokeWidth="8" />
                <line x1="0" y1="133" x2="600" y2="133" stroke="#64748B" strokeWidth="3" />
                <line x1="0" y1="267" x2="600" y2="267" stroke="#64748B" strokeWidth="3" />
                <line x1="200" y1="0" x2="200" y2="400" stroke="#64748B" strokeWidth="3" />
                <line x1="400" y1="0" x2="400" y2="400" stroke="#64748B" strokeWidth="3" />
                <rect x="240" y="160" width="120" height="80" rx="8" fill="#DBEAFE" stroke="#1C4ED8" strokeWidth="2" />
              </svg>
              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-primary shadow-2xl flex items-center justify-center border-4 border-white">
                  <Icon name="AcademicCapIcon" size={24} className="text-white" />
                </div>
                <div className="mt-2 px-3 py-1 bg-white rounded-xl shadow-md text-xs font-semibold text-foreground border border-border whitespace-nowrap">
                  Greenwood Academy
                </div>
                <div className="w-1 h-3 bg-primary mt-0.5" />
              </div>
              {/* Open in Google Maps CTA */}
              <a
                href="https://maps.google.com/?q=Greenwood+Academy+Sector+14+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-md border border-border text-xs font-semibold text-foreground hover:shadow-card hover:border-primary/30 transition-all z-20"
              >
                <Icon name="MapPinIcon" size={13} className="text-primary" />
                Open in Google Maps
                <Icon name="ArrowTopRightOnSquareIcon" size={12} className="text-muted" />
              </a>
            </div>
          </div>

          {/* How to reach */}
          <div className="space-y-4">
            <div className="reveal-hidden font-display font-700 text-base text-foreground">How to Reach Us</div>
            {landmarks.map((lm, i) => (
              <div
                key={lm.label}
                className="reveal-hidden flex gap-4 p-4 rounded-2xl border border-border bg-white hover:border-primary/20 hover:shadow-soft transition-all duration-200"
                style={{ transitionDelay: `${0.07 * i}s` }}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={lm.icon as 'TruckIcon'} size={17} className="text-primary" />
                </div>
                <div>
                  <div className="font-display font-700 text-xs text-foreground mb-1">{lm.label}</div>
                  <div className="text-xs text-muted leading-relaxed">{lm.desc}</div>
                </div>
              </div>
            ))}

            {/* Address card */}
            <div className="reveal-hidden p-4 rounded-2xl border border-primary/20 bg-primary/5" style={{ transitionDelay: '0.2s' }}>
              <div className="flex items-start gap-3">
                <Icon name="MapPinIcon" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-700 text-xs text-foreground mb-1">Full Address</div>
                  <div className="text-xs text-muted leading-relaxed">
                    12, Greenwood Road, Sector 14,<br />New Delhi – 110001, India
                  </div>
                  <a
                    href="https://maps.google.com/?q=Greenwood+Academy+Sector+14+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Get Directions <Icon name="ArrowRightIcon" size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
