'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

type FormData = {
  name: string;
  phone: string;
  email: string;
  subject: string;
  grade: string;
  message: string;
};

const initialForm: FormData = { name: '', phone: '', email: '', subject: '', grade: '', message: '' };

const subjectOptions = [
  'Admission Enquiry',
  'Fee Structure',
  'Academic Query',
  'Transport / Bus Route',
  'Scholarships',
  'General Enquiry',
  'Other',
];

const gradeOptions = [
  'Nursery', 'LKG', 'UKG',
  'Grade I', 'Grade II', 'Grade III', 'Grade IV', 'Grade V',
  'Grade VI', 'Grade VII', 'Grade VIII', 'Grade IX', 'Grade X',
  'Grade XI', 'Grade XII',
  'Not Applicable',
];

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[+\d\s\-()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.subject) e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 transition-all bg-white ${
      errors[field]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
        : 'border-border focus:border-primary focus:ring-primary/10'
    }`;

  return (
    <section id="contact-form" ref={ref} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* Left: context panel */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="reveal-hidden inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                <Icon name="PaperAirplaneIcon" size={13} />
                Send a Message
              </div>
              <h2 className="reveal-hidden font-display text-3xl sm:text-4xl font-800 text-foreground leading-tight mb-3" style={{ transitionDelay: '0.05s' }}>
                We'd Love to{' '}
                <span className="gradient-text">Hear From You</span>
              </h2>
              <p className="reveal-hidden text-muted leading-relaxed" style={{ transitionDelay: '0.1s' }}>
                Fill in the form and our team will get back to you within 1 business day. For urgent queries, call us directly.
              </p>
            </div>

            {/* Response time promise */}
            <div className="reveal-hidden flex gap-4 p-5 rounded-2xl bg-background border border-border" style={{ transitionDelay: '0.12s' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Icon name="BoltIcon" size={18} className="text-emerald-600" />
              </div>
              <div>
                <div className="font-display font-700 text-sm text-foreground mb-1">Quick Response Guarantee</div>
                <div className="text-xs text-muted leading-relaxed">We respond to all enquiries within 24 hours on working days (Mon–Sat).</div>
              </div>
            </div>

            {/* Social links */}
            <div className="reveal-hidden p-5 rounded-2xl bg-background border border-border" style={{ transitionDelay: '0.16s' }}>
              <div className="font-display font-700 text-sm text-foreground mb-3">Find Us Online</div>
              <div className="flex gap-3">
                {[
                  { icon: 'GlobeAltIcon', label: 'Website', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
                  { icon: 'VideoCameraIcon', label: 'YouTube', color: 'bg-red-50 text-red-600 hover:bg-red-100' },
                  { icon: 'ChatBubbleLeftRightIcon', label: 'WhatsApp', color: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' },
                ].map((s) => (
                  <button key={s.label} className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl transition-colors ${s.color}`}>
                    <Icon name={s.icon as 'GlobeAltIcon'} size={18} />
                    <span className="text-xs font-semibold">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct call strip */}
            <div className="reveal-hidden flex items-center gap-3 p-4 rounded-2xl border border-border bg-primary/5" style={{ transitionDelay: '0.2s' }}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="PhoneIcon" size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted mb-0.5">Prefer to call directly?</div>
                <a href="tel:+911126543210" className="font-display font-700 text-sm text-primary hover:underline">+91 11 2654 3210</a>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 reveal-hidden">
            <div className="p-6 sm:p-8 rounded-2xl bg-background border border-border">
              {!submitted ? (
                <>
                  <h3 className="font-display font-700 text-lg text-foreground mb-6 flex items-center gap-2">
                    <Icon name="PencilSquareIcon" size={18} className="text-primary" />
                    Contact Form
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Ramesh Kumar"
                          className={inputClass('name')}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={inputClass('phone')}
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass('email')}
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className={inputClass('subject')}
                        >
                          <option value="">Select a topic</option>
                          {subjectOptions.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1.5">Grade of Interest</label>
                        <select
                          name="grade"
                          value={form.grade}
                          onChange={handleChange}
                          className={inputClass('grade')}
                        >
                          <option value="">Select grade (optional)</option>
                          {gradeOptions.map((g) => <option key={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Write your message here..."
                        className={`${inputClass('message')} resize-none`}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70"
                    >
                      {loading ? (
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                      ) : (
                        <Icon name="PaperAirplaneIcon" size={16} />
                      )}
                      {loading ? 'Sending…' : 'Send Message'}
                    </button>

                    <p className="text-xs text-muted text-center">
                      <Icon name="LockClosedIcon" size={11} className="inline mr-1" />
                      Your information is safe with us and will never be shared with third parties.
                    </p>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                    <Icon name="CheckCircleIcon" size={34} className="text-emerald-500" />
                  </div>
                  <h3 className="font-display font-800 text-xl text-foreground">Message Sent!</h3>
                  <p className="text-sm text-muted max-w-xs leading-relaxed">
                    Thank you, <strong>{form.name}</strong>! Our team will get back to you within 1 business day.
                  </p>
                  <button
                    onClick={() => { setForm(initialForm); setSubmitted(false); }}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white text-sm font-semibold text-foreground hover:border-primary/30 transition-all"
                  >
                    <Icon name="ArrowPathIcon" size={14} />
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
