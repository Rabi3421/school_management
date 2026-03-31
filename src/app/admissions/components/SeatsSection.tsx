'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const classes = [
  { grade: 'Nursery', age: '3+ years', seats: 40, filled: 78, fee: '₹85,000', icon: 'StarIcon', color: 'from-amber-500 to-orange-400' },
  { grade: 'LKG', age: '4+ years', seats: 40, filled: 82, fee: '₹85,000', icon: 'StarIcon', color: 'from-amber-500 to-orange-400' },
  { grade: 'UKG', age: '5+ years', seats: 40, filled: 70, fee: '₹90,000', icon: 'StarIcon', color: 'from-amber-500 to-orange-400' },
  { grade: 'Grade I', age: '6+ years', seats: 45, filled: 85, fee: '₹95,000', icon: 'BookOpenIcon', color: 'from-emerald-500 to-teal-400' },
  { grade: 'Grade II', age: '7+ years', seats: 45, filled: 80, fee: '₹95,000', icon: 'BookOpenIcon', color: 'from-emerald-500 to-teal-400' },
  { grade: 'Grade III', age: '8+ years', seats: 45, filled: 75, fee: '₹95,000', icon: 'BookOpenIcon', color: 'from-emerald-500 to-teal-400' },
  { grade: 'Grade IV', age: '9+ years', seats: 45, filled: 65, fee: '₹1,00,000', icon: 'BookOpenIcon', color: 'from-blue-500 to-cyan-400' },
  { grade: 'Grade V', age: '10+ years', seats: 45, filled: 60, fee: '₹1,00,000', icon: 'BookOpenIcon', color: 'from-blue-500 to-cyan-400' },
  { grade: 'Grade VI', age: '11+ years', seats: 45, filled: 72, fee: '₹1,05,000', icon: 'BeakerIcon', color: 'from-violet-500 to-purple-400' },
  { grade: 'Grade VII', age: '12+ years', seats: 45, filled: 68, fee: '₹1,05,000', icon: 'BeakerIcon', color: 'from-violet-500 to-purple-400' },
  { grade: 'Grade VIII', age: '13+ years', seats: 45, filled: 55, fee: '₹1,05,000', icon: 'BeakerIcon', color: 'from-violet-500 to-purple-400' },
  { grade: 'Grade IX', age: '14+ years', seats: 50, filled: 50, fee: '₹1,15,000', icon: 'AcademicCapIcon', color: 'from-rose-500 to-pink-400' },
];

const feeStructure = [
  { item: 'Admission Fee (One-time)', amount: '₹15,000', note: 'Non-refundable' },
  { item: 'Annual Tuition Fee', amount: '₹85,000 – ₹1,15,000', note: 'Varies by class' },
  { item: 'Activity & Lab Fee', amount: '₹8,000', note: 'Per annum' },
  { item: 'Annual Sports Fee', amount: '₹5,000', note: 'Per annum' },
  { item: 'School Diary & Materials', amount: '₹3,500', note: 'Per annum' },
  { item: 'Transport (Optional)', amount: '₹12,000 – ₹18,000', note: 'Based on zone' },
];

export default function SeatsSection() {
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
    <section id="seats" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Icon name="Squares2X2Icon" size={13} />
            Seat Availability
          </div>
          <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
            Class-wise Seats &{' '}
            <span className="gradient-text">Fee Structure</span>
          </h2>
          <p className="reveal-hidden text-muted max-w-2xl mx-auto leading-relaxed" style={{ transitionDelay: '0.1s' }}>
            Seats are limited and fill quickly every year. Check availability for your child's class below.
          </p>
        </div>

        {/* Seats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {classes.map((cls, i) => {
            const pct = cls.filled;
            const available = Math.round(cls.seats * (1 - pct / 100));
            const statusColor = pct >= 85 ? 'text-danger' : pct >= 65 ? 'text-warning' : 'text-success';
            const barColor = pct >= 85 ? 'bg-danger' : pct >= 65 ? 'bg-warning' : 'bg-success';
            return (
              <div
                key={cls.grade}
                className="reveal-hidden p-5 rounded-2xl border border-border bg-background hover:border-primary/25 hover:shadow-soft transition-all duration-200 card-lift"
                style={{ transitionDelay: `${0.05 * i}s` }}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cls.color} flex items-center justify-center mb-3 shadow-md`}>
                  <Icon name={cls.icon as 'StarIcon'} size={18} className="text-white" />
                </div>
                <div className="font-display font-700 text-sm text-foreground mb-0.5">{cls.grade}</div>
                <div className="text-xs text-muted mb-3">{cls.age}</div>

                {/* Fill bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-2xs mb-1">
                    <span className="text-muted">{cls.filled}% filled</span>
                    <span className={`font-semibold ${statusColor}`}>{available} seats left</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${cls.filled}%` }} />
                  </div>
                </div>
                <div className="text-xs font-semibold text-foreground">{cls.fee} <span className="font-normal text-muted">/ yr</span></div>
              </div>
            );
          })}
        </div>

        {/* Fee structure table */}
        <div className="reveal-hidden rounded-2xl border border-border overflow-hidden">
          <div
            className="px-6 py-4 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 60%, #1C4ED8 100%)' }}
          >
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <Icon name="BanknotesIcon" size={16} className="text-white" />
            </div>
            <div>
              <div className="font-display font-700 text-white text-base">Fee Structure 2025–26</div>
              <div className="text-white/55 text-xs">All figures are approximate. Final fee letter issued upon admission.</div>
            </div>
          </div>
          <div className="divide-y divide-border">
            {feeStructure.map((row, i) => (
              <div key={row.item} className={`flex items-center justify-between px-6 py-4 gap-4 ${i % 2 === 0 ? 'bg-white' : 'bg-background'}`}>
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircleIcon" size={15} variant="solid" className="text-success flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{row.item}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-display font-700 text-sm text-foreground">{row.amount}</div>
                  <div className="text-2xs text-muted">{row.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-primary/5 border-t border-primary/15 flex items-center gap-2 text-xs text-muted">
            <Icon name="InformationCircleIcon" size={14} className="text-primary flex-shrink-0" />
            Sibling discount: 10% off annual fee. SC/ST concessions available as per Government norms. Contact the office for scholarship details.
          </div>
        </div>
      </div>
    </section>
  );
}
