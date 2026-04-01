import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <AppLogo size={36} />
              <div>
                <div className="font-display font-700 text-base text-white tracking-tight leading-tight">
                  Greenwood Academy
                </div>
                <div className="text-2xs text-white/50 font-medium tracking-wide uppercase">Est. 1998</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Nurturing young minds with quality education, values, and a passion for lifelong learning since 1998.
            </p>
            <div className="flex items-center gap-2">
              {[
                { name: 'Facebook', icon: 'GlobeAltIcon' },
                { name: 'Twitter', icon: 'ChatBubbleLeftRightIcon' },
                { name: 'YouTube', icon: 'PlayIcon' },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 text-white/60 hover:bg-primary hover:text-white transition-colors"
                >
                  <Icon name={s.icon as 'GlobeAltIcon'} size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Academics', href: '/academics' },
                { label: 'Admissions', href: '/admissions' },
                { label: 'Events & News', href: '/events' },
                { label: 'Photo Gallery', href: '/gallery' },
                { label: 'Contact Us', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
                    <Icon name="ChevronRightIcon" size={12} className="text-primary" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Academics</h4>
            <ul className="space-y-2.5">
              {[
                'Pre-Primary (Nursery–KG)',
                'Primary (Grade 1–5)',
                'Middle School (Grade 6–8)',
                'Secondary (Grade 9–10)',
                'Senior Secondary (Grade 11–12)',
                'Co-curricular Activities',
              ].map((item) => (
                <li key={item}>
                  <Link href="/academics" className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1.5">
                    <Icon name="ChevronRightIcon" size={12} className="text-primary" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <Icon name="MapPinIcon" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60 leading-relaxed">
                  12, Greenwood Road, Sector 14,<br />New Delhi – 110001
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="PhoneIcon" size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+911123456789" className="text-sm text-white/60 hover:text-white transition-colors">
                  +91 11 2345 6789
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="EnvelopeIcon" size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:info@greenwoodacademy.edu.in" className="text-sm text-white/60 hover:text-white transition-colors">
                  info@greenwoodacademy.edu.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="ClockIcon" size={16} className="text-primary flex-shrink-0" />
                <span className="text-sm text-white/60">Mon–Sat: 8:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/40">
            © 2026 Greenwood Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="text-sm text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="text-sm text-white/40 hover:text-white/70 transition-colors">Terms of Use</Link>
            <Link href="/login" className="text-sm text-white/40 hover:text-white/70 transition-colors">Student Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}