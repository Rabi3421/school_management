'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const plans = [
  {
    name: 'Free Trial',
    price: '₹0',
    period: 'for 2 months',
    description: 'Try everything — no credit card needed. Perfect for evaluating SchoolSync.',
    features: [
      'Up to 100 students',
      'Student & attendance management',
      'Basic fee tracking',
      'Parent portal (view only)',
      'Email support',
    ],
    cta: 'Start Free Trial',
    popular: false,
    accentColor: '#64748B',
  },
  {
    name: 'Basic',
    price: '₹999',
    period: '/month',
    description: 'For small and medium schools. All core features to run your school digitally.',
    features: [
      'Up to 500 students',
      'Full attendance management',
      'Fee collection + receipts',
      'Exam & result management',
      'SMS notifications (500/month)',
      'Parent & student portal',
      'Priority email support',
    ],
    cta: 'Get Basic Plan',
    popular: false,
    accentColor: '#1C4ED8',
  },
  {
    name: 'Premium',
    price: '₹1,999',
    period: '/month',
    description: 'For large schools and school chains. Advanced analytics and unlimited everything.',
    features: [
      'Unlimited students',
      'Multi-branch support',
      'Advanced analytics & reports',
      'Unlimited SMS notifications',
      'Custom branding',
      'API access',
      'Dedicated account manager',
      'Phone + WhatsApp support',
    ],
    cta: 'Get Premium Plan',
    popular: true,
    accentColor: '#FFFFFF',
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef?.current?.querySelectorAll('.reveal-hidden');
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
      { threshold: 0.08 }
    );
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-4">
            <Icon name="TagIcon" size={12} variant="solid" className="text-primary" />
            Transparent Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-4">
            Affordable Plans for Every School
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            No hidden charges. Cancel anytime. All plans include free onboarding and training.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans?.map((plan, i) => (
            <div
              key={plan?.name}
              className={`reveal-hidden relative rounded-2xl overflow-hidden flex flex-col ${
                plan?.popular
                  ? 'pricing-popular shadow-lifted scale-[1.02]'
                  : 'bg-background border border-border/60 shadow-soft card-lift hover:border-primary/20'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {plan?.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-700 text-white">
                  Most Popular
                </div>
              )}

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Plan name */}
                <div className={`text-xs font-700 uppercase tracking-widest mb-3 ${plan?.popular ? 'text-white/70' : 'text-muted'}`}>
                  {plan?.name}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className={`text-4xl font-800 font-display ${plan?.popular ? 'text-white' : 'text-foreground'}`}>
                    {plan?.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan?.popular ? 'text-white/70' : 'text-muted'}`}>
                    {plan?.period}
                  </span>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-6 ${plan?.popular ? 'text-white/80' : 'text-muted'}`}>
                  {plan?.description}
                </p>

                {/* Divider */}
                <div className={`h-px mb-6 ${plan?.popular ? 'bg-white/20' : 'bg-border'}`} />

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {plan?.features?.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Icon
                        name="CheckCircleIcon"
                        size={16}
                        variant="solid"
                        className={plan?.popular ? 'text-white/80 flex-shrink-0 mt-0.5' : 'text-success flex-shrink-0 mt-0.5'}
                      />
                      <span className={`text-sm ${plan?.popular ? 'text-white/90' : 'text-muted'}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full py-3.5 rounded-xl text-sm font-700 transition-all duration-200 flex items-center justify-center gap-2 group ${
                    plan?.popular
                      ? 'bg-white text-primary hover:bg-white/90 shadow-soft'
                      : 'bg-primary text-white hover:bg-primary-dark shadow-blue hover:shadow-lifted'
                  }`}
                >
                  {plan?.cta}
                  <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-muted mt-8 reveal-hidden">
          All plans include free data migration, onboarding support, and training for your staff.{' '}
          <a href="mailto:hello@schoolsync.in" className="text-primary font-medium hover:underline">
            Contact us
          </a>{' '}
          for custom pricing for school chains.
        </p>
      </div>
    </section>
  );
}