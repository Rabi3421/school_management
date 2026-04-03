'use client';

import React, { useState } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import { PublicSchoolData } from '@/lib/schoolRegistry';

interface ThemedContactProps {
  school: PublicSchoolData;
}

export default function ThemedContact({ school }: ThemedContactProps) {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: 'var(--theme-bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{ backgroundColor: 'var(--theme-primary)', color: 'var(--theme-text-light)' }}
          >
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4" style={{ color: 'var(--theme-text)' }}>
            Get in Touch
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
            Have questions? We&apos;re here to help. Reach out to us and our team will respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold" style={{ color: 'var(--theme-text)' }}>
              School Information
            </h3>

            {[
              {
                icon: '📍',
                title: 'Address',
                lines: [`${school.name}`, `${school.city}, ${school.state}`],
              },
              {
                icon: '📞',
                title: 'Phone',
                lines: [school.phone],
              },
              {
                icon: '✉️',
                title: 'Email',
                lines: [school.email],
              },
              {
                icon: '🕐',
                title: 'Office Hours',
                lines: ['Monday – Friday: 8:00 AM – 4:00 PM', 'Saturday: 9:00 AM – 1:00 PM'],
              },
            ].map((info, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: 'var(--theme-bg-alt)' }}
                >
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--theme-text)' }}>
                    {info.title}
                  </h4>
                  {info.lines.map((line, j) => (
                    <p key={j} className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div
            className="p-6 sm:p-8 rounded-2xl border"
            style={{ backgroundColor: 'var(--theme-bg-alt)', borderColor: 'var(--theme-border)' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--theme-text)' }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: 'var(--theme-text-muted)' }}>
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  className="mt-6 text-sm font-semibold"
                  style={{ color: 'var(--theme-primary)' }}
                  onClick={() => setSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold mb-6" style={{ color: 'var(--theme-text)' }}>
                  Send us a Message
                </h3>
                {[
                  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 00000 00000' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--theme-text-muted)' }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                      required
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-shadow"
                      style={{
                        backgroundColor: 'var(--theme-bg)',
                        border: '1px solid var(--theme-border)',
                        color: 'var(--theme-text)',
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--theme-text-muted)' }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{
                      backgroundColor: 'var(--theme-bg)',
                      border: '1px solid var(--theme-border)',
                      color: 'var(--theme-text)',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-md"
                  style={{
                    background: `linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))`,
                    color: 'var(--theme-text-light)',
                  }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
