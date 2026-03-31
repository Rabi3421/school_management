'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import Icon from '@/components/ui/AppIcon';

const stats = [
  { label: 'Schools Enrolled', value: '500+', icon: 'BuildingLibraryIcon', color: 'text-primary' },
  { label: 'Students Managed', value: '50K+', icon: 'AcademicCapIcon', color: 'text-accent' },
  { label: 'Uptime Guarantee', value: '99.9%', icon: 'ShieldCheckIcon', color: 'text-success' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll('.reveal-hidden');
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
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-20"
      aria-label="SchoolSync — Smart School Management System for Indian Schools"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/6 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Badge */}
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Trusted by 500+ Schools Across India
            </div>

            {/* Headline */}
            <h1 className="reveal-hidden font-display text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-800 text-foreground leading-[1.1] tracking-tight mb-6" style={{ transitionDelay: '0.1s' }}>
              Smart School{' '}
              <span className="gradient-text">Management</span>{' '}
              System
            </h1>

            {/* Subheading */}
            <p className="reveal-hidden text-base sm:text-lg text-muted font-normal leading-relaxed mb-8 max-w-lg" style={{ transitionDelay: '0.2s' }}>
              Manage students, fees, attendance, and results in one powerful platform. Built for Indian schools — affordable, fast, and easy to use.
            </p>

            {/* CTAs */}
            <div className="reveal-hidden flex flex-col sm:flex-row gap-3 mb-10" style={{ transitionDelay: '0.3s' }}>
              <a
                href="#pricing"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-blue hover:shadow-lifted group"
              >
                Get Free Demo
                <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/demo-dashboard"
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary text-sm font-semibold rounded-xl border border-primary/20 hover:bg-primary/5 transition-all duration-200 shadow-soft"
              >
                <Icon name="ComputerDesktopIcon" size={16} />
                View Dashboard
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="reveal-hidden flex flex-wrap gap-4" style={{ transitionDelay: '0.4s' }}>
              {['No credit card required', 'Free for 2 months', 'Setup in 10 minutes'].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs font-medium text-muted">
                  <Icon name="CheckCircleIcon" size={14} variant="solid" className="text-success" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            {/* Main dashboard card */}
            <div className="reveal-hidden relative" style={{ transitionDelay: '0.2s' }}>
              <div className="relative rounded-2xl shadow-lifted overflow-hidden border border-border/60 bg-white animate-float">
                {/* Browser chrome */}
                <div className="bg-border-light px-4 py-2.5 flex items-center gap-2 border-b border-border/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-danger/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="flex-1 mx-4 bg-white rounded-md px-3 py-1 text-xs text-muted border border-border/60 text-center">
                    app.schoolsync.in/dashboard
                  </div>
                </div>
                {/* Dashboard preview */}
                <div className="bg-background p-3">
                  {/* Mini stat row */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[
                      { label: 'Students', val: '1,248', color: 'bg-primary/10 text-primary' },
                      { label: 'Teachers', val: '64', color: 'bg-accent/10 text-accent' },
                      { label: 'Attendance', val: '94%', color: 'bg-success/10 text-success' },
                      { label: 'Fees Due', val: '₹2.4L', color: 'bg-warning/10 text-warning' },
                    ].map((s) => (
                      <div key={s.label} className="bg-white rounded-xl p-2.5 border border-border/50 shadow-soft">
                        <div className={`text-base font-700 font-display ${s.color.split(' ')[1]}`}>{s.val}</div>
                        <div className="text-2xs text-muted-light mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  {/* Chart area mock */}
                  <div className="bg-white rounded-xl border border-border/50 p-3 mb-3">
                    <div className="text-xs font-semibold text-foreground mb-2">Attendance Overview</div>
                    <div className="flex items-end gap-1 h-16">
                      {[70, 85, 60, 90, 78, 92, 88, 75, 95, 82, 87, 91].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all"
                          style={{
                            height: `${h}%`,
                            background: i === 11 ? '#1C4ED8' : i % 3 === 0 ? '#0EA5E9' : '#E0E7FF',
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-2xs text-muted-light mt-1">
                      <span>Apr</span><span>May</span><span>Jun</span><span>Mar</span>
                    </div>
                  </div>
                  {/* Student list mock */}
                  <div className="bg-white rounded-xl border border-border/50 p-3">
                    <div className="text-xs font-semibold text-foreground mb-2">Recent Students</div>
                    {[
                      { name: 'Priya Sharma', class: 'Grade 8A', status: 'Present' },
                      { name: 'Rahul Verma', class: 'Grade 6B', status: 'Absent' },
                      { name: 'Ananya Singh', class: 'Grade 10A', status: 'Present' },
                    ].map((s) => (
                      <div key={s.name} className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-2xs font-bold text-primary">
                            {s.name[0]}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-foreground">{s.name}</div>
                            <div className="text-2xs text-muted-light">{s.class}</div>
                          </div>
                        </div>
                        <span className={s.status === 'Present' ? 'badge-success text-xs' : 'badge-danger text-xs'}>
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-4 sm:-left-8 top-1/4 glass rounded-2xl px-4 py-3 shadow-card border border-white/80 hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-success/10 flex items-center justify-center">
                    <Icon name="CheckBadgeIcon" size={18} className="text-success" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">Fee Collected</div>
                    <div className="text-sm font-700 font-display text-foreground">₹12.6L this month</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 sm:-right-8 bottom-1/4 glass rounded-2xl px-4 py-3 shadow-card border border-white/80 hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name="UserGroupIcon" size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">New Admissions</div>
                    <div className="text-sm font-700 font-display text-foreground">+24 this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-16 pt-10 border-t border-border/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="reveal-hidden flex items-center gap-4 p-5 bg-white rounded-2xl border border-border/50 shadow-soft card-lift"
                style={{ transitionDelay: `${0.1 * i}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Icon name={stat.icon as 'BuildingLibraryIcon'} size={22} className={stat.color} />
                </div>
                <div>
                  <div className="text-2xl font-800 font-display text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}