'use client';

import React from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { PublicSchoolData } from '@/lib/schoolRegistry';

interface ThemedAdmissionsProps {
  school: PublicSchoolData;
}

const STEPS = [
  { num: '01', title: 'Fill Application Form', desc: 'Complete the online application with your child\'s details and preferred class.' },
  { num: '02', title: 'Document Submission', desc: 'Submit required documents — birth certificate, previous marksheets, transfer certificate.' },
  { num: '03', title: 'Entrance Assessment', desc: 'Short written test + interaction with our academic team (class-dependent).' },
  { num: '04', title: 'Admission Confirmation', desc: 'Receive offer letter and complete fee payment to confirm your seat.' },
];

const CLASSES = [
  { label: 'Pre-Primary (Nursery – KG)', seats: 30, fee: '₹45,000/yr' },
  { label: 'Primary (I – V)', seats: 40, fee: '₹55,000/yr' },
  { label: 'Middle School (VI – VIII)', seats: 35, fee: '₹65,000/yr' },
  { label: 'Secondary (IX – X)', seats: 30, fee: '₹75,000/yr' },
  { label: 'Senior Secondary (XI – XII)', seats: 25, fee: '₹85,000/yr' },
];

export default function ThemedAdmissions({ school }: ThemedAdmissionsProps) {
  const { theme } = useTheme();

  return (
    <section
      className="py-20 lg:py-28"
      style={{
        background: `linear-gradient(180deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 bg-white/20 text-white"
          >
            Admissions 2026–27
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Join Our School Family
          </h2>
          <p className="text-base text-white/70 max-w-xl mx-auto">
            Admissions for the 2026–27 academic year are now open. Seats are limited — secure yours today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Process steps */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-6">Admission Process</h3>
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-sm">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                    color: 'var(--theme-primary)',
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{step.title}</h4>
                  <p className="text-white/60 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Seats & fees table */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Available Classes & Fees</h3>
            <div className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/10">
              {CLASSES.map((cls, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border-b border-white/10 last:border-0"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{cls.label}</div>
                    <div className="text-xs text-white/50">{cls.seats} seats available</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{cls.fee}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Apply button */}
            <button
              className="w-full mt-6 py-4 rounded-xl font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-transform"
              style={{
                background: `linear-gradient(135deg, var(--theme-accent), var(--theme-secondary))`,
                color: 'var(--theme-primary)',
              }}
            >
              Apply Online Now →
            </button>
            <p className="text-center text-xs text-white/40 mt-3">
              Application takes ~5 minutes · No fees to apply
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
