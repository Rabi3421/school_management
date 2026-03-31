'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const grades = [
  'Nursery', 'LKG', 'UKG',
  'Grade I', 'Grade II', 'Grade III',
  'Grade IV', 'Grade V', 'Grade VI',
  'Grade VII', 'Grade VIII', 'Grade IX',
];

const sources = ['Online Search', 'Friend / Family Referral', 'School Event', 'Social Media', 'Newspaper / Magazine', 'Other'];

export default function ApplySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({
    studentName: '', dob: '', grade: '', parentName: '', phone: '', email: '', source: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200';
  const labelCls = 'block text-xs font-semibold text-foreground mb-1.5';

  return (
    <section id="apply" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: info */}
          <div className="lg:col-span-2">
            <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Icon name="PencilSquareIcon" size={13} />
              Online Application
            </div>
            <h2 className="reveal-hidden font-display text-2xl sm:text-3xl font-800 text-foreground leading-tight mb-4" style={{ transitionDelay: '0.05s' }}>
              Apply{' '}
              <span className="gradient-text">Online</span>
              <br />in Minutes
            </h2>
            <p className="reveal-hidden text-muted text-sm leading-relaxed mb-6" style={{ transitionDelay: '0.1s' }}>
              Fill in the form and our admissions team will get back to you within 24 hours to schedule an interaction visit.
            </p>

            {/* Contact info card */}
            <div className="reveal-hidden space-y-4" style={{ transitionDelay: '0.15s' }}>
              {[
                { icon: 'PhoneIcon', label: 'Admissions Helpline', val: '+91 11 2345 6789', href: 'tel:+911123456789' },
                { icon: 'EnvelopeIcon', label: 'Email Us', val: 'admissions@greenwoodacademy.edu.in', href: 'mailto:admissions@greenwoodacademy.edu.in' },
                { icon: 'ClockIcon', label: 'Office Hours', val: 'Mon–Sat · 9:00 AM – 4:00 PM', href: null },
                { icon: 'MapPinIcon', label: 'School Address', val: '12, Greenwood Road, Sector 14, New Delhi – 110001', href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-4 rounded-2xl border border-border bg-background">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as 'PhoneIcon'} size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted mb-0.5">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="text-sm font-medium text-primary hover:underline">{item.val}</a>
                      : <span className="text-sm text-foreground font-medium">{item.val}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div
                className="reveal-hidden flex flex-col items-center justify-center text-center p-12 rounded-3xl"
                style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 100%)' }}
              >
                <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-5">
                  <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-success" />
                </div>
                <h3 className="font-display font-800 text-2xl text-white mb-3">Application Submitted!</h3>
                <p className="text-white/65 text-sm leading-relaxed max-w-sm mb-6">
                  Thank you! Our admissions team will contact you at <strong className="text-white">{form.phone || 'your number'}</strong> within 24 hours to schedule an interaction visit.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-white text-primary text-sm font-bold rounded-xl hover:bg-white/90 transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="reveal-hidden p-7 sm:p-9 rounded-3xl border border-border bg-background shadow-soft"
              >
                <h3 className="font-display font-700 text-lg text-foreground mb-6">Admission Enquiry Form — 2025–26</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className={labelCls}>Student's Full Name <span className="text-danger">*</span></label>
                    <input required name="studentName" value={form.studentName} onChange={handleChange} placeholder="e.g. Arjun Sharma" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Date of Birth <span className="text-danger">*</span></label>
                    <input required type="date" name="dob" value={form.dob} onChange={handleChange} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Applying for Class <span className="text-danger">*</span></label>
                    <select required name="grade" value={form.grade} onChange={handleChange} className={inputCls}>
                      <option value="">Select class</option>
                      {grades.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Parent / Guardian Name <span className="text-danger">*</span></label>
                    <input required name="parentName" value={form.parentName} onChange={handleChange} placeholder="e.g. Rajesh Sharma" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Mobile Number <span className="text-danger">*</span></label>
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="parent@email.com" className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>How did you hear about us?</label>
                    <select name="source" value={form.source} onChange={handleChange} className={inputCls}>
                      <option value="">Select an option</option>
                      {sources.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Any questions or special requirements?</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="E.g. sibling already enrolled, specific medical needs, preferred visit date..." className={`${inputCls} resize-none`} />
                  </div>
                </div>

                {/* Seats filling bar */}
                <div className="mb-5 p-4 rounded-xl border border-warning/25 bg-warning/5 flex items-center gap-3">
                  <Icon name="ExclamationTriangleIcon" size={16} className="text-warning flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground font-semibold">Seats Filling Fast</span>
                      <span className="text-warning font-bold">72% Filled</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full rounded-full bg-warning" style={{ width: '72%' }} />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-blue disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Submitting…</>
                    : <><Icon name="PaperAirplaneIcon" size={16} /> Submit Application</>}
                </button>
                <p className="text-center text-xs text-muted mt-3">
                  By submitting, you agree to our <a href="#" className="text-primary hover:underline">Privacy Policy</a>. We never share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
