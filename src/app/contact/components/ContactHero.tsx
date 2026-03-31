'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, r: Math.random() * 2 + 0.5, alpha: Math.random() * 0.5 + 0.1 });
    }
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dist / 100)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

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

  const floatingCards = [
    { icon: 'PhoneIcon', label: '+91 11 2654 3210', sub: 'Office', color: 'from-blue-500 to-cyan-400', delay: '0s', pos: 'top-0 right-12' },
    { icon: 'EnvelopeIcon', label: 'info@greenwood', sub: 'Email Us', color: 'from-violet-500 to-purple-400', delay: '0.8s', pos: 'bottom-0 right-12' },
    { icon: 'ClockIcon', label: 'Mon – Sat', sub: '8 AM – 4 PM', color: 'from-amber-500 to-orange-400', delay: '1.4s', pos: 'top-8 left-4' },
    { icon: 'MapPinIcon', label: 'New Delhi', sub: 'Sector 14', color: 'from-emerald-500 to-teal-400', delay: '2s', pos: 'bottom-8 left-4' },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[72vh] flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 40%, #1C4ED8 70%, #0EA5E9 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #1C4ED8 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <svg className="absolute top-10 right-10 opacity-10 animate-float" width="180" height="180" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="white" strokeWidth="1.5" fill="none" />
          <polygon points="100,30 170,65 170,135 100,170 30,135 30,65" stroke="white" strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-16 left-8 opacity-8 animate-float" style={{ animationDelay: '1.5s' }} width="100" height="100" viewBox="0 0 120 120" fill="none">
          <rect x="10" y="10" width="100" height="100" rx="8" stroke="white" strokeWidth="1" fill="none" transform="rotate(15 60 60)" />
          <rect x="25" y="25" width="70" height="70" rx="6" stroke="white" strokeWidth="0.6" fill="none" transform="rotate(15 60 60)" />
        </svg>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 left-1/2 w-px h-full opacity-10" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)' }} />
        <div className="absolute top-0 left-2/3 w-px h-full opacity-5" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 w-full">
        <nav className="reveal-hidden flex items-center gap-2 mb-8 text-white/50 text-sm">
          <Link href="/homepage" className="hover:text-white/80 transition-colors">Home</Link>
          <Icon name="ChevronRightIcon" size={12} className="text-white/30" />
          <span className="text-white/80 font-medium">Contact Us</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="reveal-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-wide">We're here to help · Mon–Sat, 8 AM – 4 PM</span>
            </div>
            <h1 className="reveal-hidden font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.08] tracking-tight mb-6" style={{ transitionDelay: '0.1s' }}>
              Get in{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8, #818CF8, #38BDF8)', backgroundSize: '200% auto', animation: 'gradientShift 3s linear infinite' }}>
                Touch
              </span>{' '}
              With Us
            </h1>
            <p className="reveal-hidden text-base sm:text-lg text-white/65 leading-relaxed mb-8 max-w-lg" style={{ transitionDelay: '0.2s' }}>
              Have questions about admissions, academics, or school life? Our team is always ready to help families find their way to Greenwood Academy.
            </p>
            <div className="reveal-hidden flex flex-col sm:flex-row gap-3" style={{ transitionDelay: '0.3s' }}>
              <a href="#contact-form" className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 group" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', color: 'white' }}>
                Send a Message
                <Icon name="ArrowDownIcon" size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
              <Link href="/admissions" className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-primary text-sm font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-soft">
                <Icon name="AcademicCapIcon" size={16} />
                Apply for Admission
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center h-80">
            <div className="absolute z-20 w-36 h-36 rounded-full flex flex-col items-center justify-center text-center shadow-2xl" style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(16px)' }}>
              <Icon name="ChatBubbleBottomCenterTextIcon" size={32} className="text-white mb-1" />
              <div className="text-white font-bold text-sm leading-tight">Always<br />Here</div>
            </div>
            {floatingCards.map((card) => (
              <div key={card.label} className={`absolute ${card.pos} flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl animate-float`} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', animationDelay: card.delay }}>
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={card.icon as 'PhoneIcon'} size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-tight">{card.label}</div>
                  <div className="text-white/60 text-xs">{card.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 27.5C840 35 960 40 1080 37.5C1200 35 1320 25 1380 20L1440 15V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#F8FAFF" />
        </svg>
      </div>
    </section>
  );
}
