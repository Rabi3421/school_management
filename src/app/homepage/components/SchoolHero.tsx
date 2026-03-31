'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const highlights = [
  { label: 'Years of Excellence', value: '26+', icon: 'AcademicCapIcon', color: 'from-blue-500 to-cyan-400' },
  { label: 'Students Enrolled', value: '2,400+', icon: 'UserGroupIcon', color: 'from-violet-500 to-purple-400' },
  { label: 'Qualified Faculty', value: '120+', icon: 'BookOpenIcon', color: 'from-emerald-500 to-teal-400' },
  { label: 'Board Results 90%+', value: '8 Yrs', icon: 'TrophyIcon', color: 'from-amber-500 to-orange-400' },
];

const floatingBadges = [
  { icon: 'TrophyIcon', label: '100% Pass Rate', sub: 'Board 2024', color: 'bg-amber-50 border-amber-200', iconColor: 'text-amber-500', top: '12%', right: '2%' },
  { icon: 'StarIcon', label: 'Top Rated School', sub: 'Delhi NCR 2024', color: 'bg-violet-50 border-violet-200', iconColor: 'text-violet-500', top: '55%', right: '-2%' },
  { icon: 'ShieldCheckIcon', label: 'ISO Certified', sub: '9001:2015', color: 'bg-emerald-50 border-emerald-200', iconColor: 'text-emerald-500', bottom: '18%', left: '-2%' },
];

export default function SchoolHero() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* Particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal-hidden');
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

  /* Subtle parallax on mouse move */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    });
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 40%, #1C4ED8 70%, #0EA5E9 100%)' }}
      aria-label="Greenwood Academy — Welcome"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Layered background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large glow orbs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #1C4ED8 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Geometric SVG shapes */}
        <svg className="absolute top-10 right-10 opacity-10 animate-float" width="200" height="200" viewBox="0 0 200 200" fill="none">
          <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="white" strokeWidth="1.5" fill="none" />
          <polygon points="100,30 170,65 170,135 100,170 30,135 30,65" stroke="white" strokeWidth="0.8" fill="none" />
          <circle cx="100" cy="100" r="20" stroke="white" strokeWidth="1" fill="none" />
        </svg>

        <svg className="absolute bottom-20 right-1/4 opacity-8 animate-float" style={{ animationDelay: '1.5s' }} width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="10" y="10" width="100" height="100" rx="8" stroke="white" strokeWidth="1" fill="none" transform="rotate(15 60 60)" />
          <rect x="25" y="25" width="70" height="70" rx="6" stroke="white" strokeWidth="0.6" fill="none" transform="rotate(15 60 60)" />
        </svg>

        <svg className="absolute top-1/2 left-8 opacity-10 animate-float" style={{ animationDelay: '2.5s' }} width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="35" stroke="white" strokeWidth="1" fill="none" strokeDasharray="4 4" />
          <circle cx="40" cy="40" r="20" stroke="white" strokeWidth="0.8" fill="none" />
          <circle cx="40" cy="40" r="5" fill="white" fillOpacity="0.4" />
        </svg>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />

        {/* Diagonal light beam */}
        <div className="absolute top-0 left-1/2 w-px h-full opacity-10"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent)' }} />
        <div className="absolute top-0 left-2/3 w-px h-full opacity-5"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left Content ── */}
          <div>
            {/* Pill badge */}
            <div className="reveal-hidden inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 text-xs font-semibold tracking-wide">CBSE Affiliated · Estd. 1998 · New Delhi</span>
            </div>

            <h1 className="reveal-hidden font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.08] tracking-tight mb-6" style={{ transitionDelay: '0.1s' }}>
              Where Every Child{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #38BDF8, #818CF8, #38BDF8)', backgroundSize: '200% auto', animation: 'gradientShift 3s linear infinite' }}>
                  Discovers
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full opacity-60"
                  style={{ background: 'linear-gradient(90deg, #38BDF8, #818CF8)' }} />
              </span>{' '}
              Their Potential
            </h1>

            <p className="reveal-hidden text-base sm:text-lg text-white/65 leading-relaxed mb-8 max-w-lg" style={{ transitionDelay: '0.2s' }}>
              Greenwood Academy blends academic rigour with holistic development — nurturing curious minds, confident leaders, and compassionate citizens since 1998.
            </p>

            {/* CTA Buttons */}
            <div className="reveal-hidden flex flex-col sm:flex-row gap-3 mb-10" style={{ transitionDelay: '0.3s' }}>
              <a href="#admissions"
                className="group relative flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300 shadow-lifted"
                style={{ background: 'linear-gradient(135deg, #ffffff, #e0e7ff)', color: '#1338B0' }}>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)' }} />
                <span className="relative flex items-center gap-2">
                  Apply for Admission 2025–26
                  <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
              <a href="#about"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>
                <Icon name="PlayCircleIcon" size={18} className="text-accent-light" />
                Explore Our School
              </a>
            </div>

            {/* Trust badges */}
            <div className="reveal-hidden flex flex-wrap gap-3" style={{ transitionDelay: '0.4s' }}>
              {[
                { label: 'CBSE Affiliated', icon: 'CheckBadgeIcon' },
                { label: 'ISO 9001:2015', icon: 'ShieldCheckIcon' },
                { label: 'Smart Classrooms', icon: 'ComputerDesktopIcon' },
                { label: 'Sports Complex', icon: 'TrophyIcon' },
              ].map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/80"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Icon name={item.icon as 'CheckBadgeIcon'} size={13} variant="solid" className="text-accent-light" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Rich Visual Card ── */}
          <div className="reveal-hidden relative" style={{ transitionDelay: '0.2s' }}>
            {/* Glow behind card */}
            <div className="absolute inset-0 rounded-3xl opacity-40 blur-2xl -z-10"
              style={{ background: 'linear-gradient(135deg, #1C4ED8, #0EA5E9)', transform: 'scale(0.9) translateY(8%)' }} />

            {/* Main card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.015}deg) rotateX(${-mousePos.y * 0.015}deg)`,
                transition: 'transform 0.3s ease',
              }}>

              {/* School visual header */}
              <div className="relative h-64 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #1C4ED8 60%, #0EA5E9 100%)' }}>

                {/* Animated rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[120, 180, 240].map((size, i) => (
                    <div key={size} className="absolute rounded-full border border-white/10"
                      style={{ width: size, height: size, animation: `pulseRing ${3 + i}s ease-in-out infinite`, animationDelay: `${i * 0.8}s` }} />
                  ))}
                </div>

                {/* SVG school building illustration */}
                <div className="absolute inset-0 flex items-end justify-center pb-0 pointer-events-none">
                  <svg width="320" height="160" viewBox="0 0 320 160" fill="none" className="opacity-20">
                    {/* Main building */}
                    <rect x="60" y="60" width="200" height="100" fill="white" />
                    {/* Roof */}
                    <polygon points="50,60 160,10 270,60" fill="white" />
                    {/* Windows */}
                    <rect x="80" y="80" width="30" height="25" rx="2" fill="#0EA5E9" />
                    <rect x="125" y="80" width="30" height="25" rx="2" fill="#0EA5E9" />
                    <rect x="170" y="80" width="30" height="25" rx="2" fill="#0EA5E9" />
                    <rect x="215" y="80" width="30" height="25" rx="2" fill="#0EA5E9" />
                    {/* Door */}
                    <rect x="135" y="120" width="50" height="40" rx="3" fill="#1C4ED8" />
                    {/* Flag pole */}
                    <line x1="160" y1="10" x2="160" y2="-10" stroke="white" strokeWidth="2" />
                    <rect x="160" y="-10" width="25" height="14" rx="1" fill="#0EA5E9" />
                    {/* Steps */}
                    <rect x="110" y="155" width="100" height="5" fill="white" opacity="0.5" />
                    <rect x="120" y="150" width="80" height="5" fill="white" opacity="0.3" />
                    {/* Trees */}
                    <ellipse cx="30" cy="110" rx="22" ry="28" fill="white" opacity="0.15" />
                    <rect x="27" y="130" width="6" height="20" fill="white" opacity="0.1" />
                    <ellipse cx="290" cy="110" rx="22" ry="28" fill="white" opacity="0.15" />
                    <rect x="287" y="130" width="6" height="20" fill="white" opacity="0.1" />
                  </svg>
                </div>

                {/* School logo center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                      <Icon name="BuildingLibraryIcon" size={32} className="text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
                      <Icon name="CheckIcon" size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="font-display font-extrabold text-xl text-white tracking-wide">Greenwood Academy</div>
                  <div className="text-white/60 text-xs mt-0.5">New Delhi, India · Since 1998</div>
                </div>

                {/* Shimmer overlay */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)', backgroundSize: '200% 100%', animation: 'shimmer 4s ease infinite' }} />
              </div>

              {/* Info grid */}
              <div className="p-5">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: 'School Timing', value: '8:00 AM – 2:30 PM', icon: 'ClockIcon', accent: '#0EA5E9' },
                    { label: 'Admission Open', value: '2025–26 Session', icon: 'DocumentTextIcon', accent: '#818CF8' },
                    { label: 'Classes', value: 'Nursery – Grade XII', icon: 'AcademicCapIcon', accent: '#34D399' },
                    { label: 'Medium', value: 'English & Hindi', icon: 'LanguageIcon', accent: '#F59E0B' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2.5 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${item.accent}20` }}>
                        <Icon name={item.icon as 'ClockIcon'} size={14} style={{ color: item.accent }} />
                      </div>
                      <div>
                        <div className="text-white/45 text-2xs font-medium">{item.label}</div>
                        <div className="text-white text-xs font-semibold mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Admission progress bar */}
                <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-xs font-medium">Admission Seats Filling Fast</span>
                    <span className="text-accent-light text-xs font-bold">72% Filled</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-full rounded-full animate-pulse"
                      style={{ width: '72%', background: 'linear-gradient(90deg, #0EA5E9, #818CF8)' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            {floatingBadges.map((badge, i) => (
              <div key={i}
                className={`absolute hidden sm:flex items-center gap-2.5 px-3 py-2.5 rounded-2xl shadow-card border ${badge.color} animate-float`}
                style={{
                  top: badge.top,
                  right: badge.right,
                  bottom: badge.bottom,
                  left: badge.left,
                  animationDelay: `${i * 0.8}s`,
                  backdropFilter: 'blur(8px)',
                  zIndex: 20,
                }}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${badge.color}`}>
                  <Icon name={badge.icon as 'TrophyIcon'} size={16} className={badge.iconColor} />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 whitespace-nowrap">{badge.label}</div>
                  <div className="text-2xs text-gray-500">{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {highlights.map((stat, i) => (
              <div
                key={stat.label}
                className="reveal-hidden group relative flex flex-col items-center text-center p-5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(12px)',
                  transitionDelay: `${0.1 * i}s`,
                }}>
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${stat.color}`}
                  style={{ opacity: 0.05 }} />
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 bg-gradient-to-br ${stat.color}`}>
                  <Icon name={stat.icon as 'AcademicCapIcon'} size={20} className="text-white" />
                </div>
                <div className="text-2xl font-extrabold font-display text-white">{stat.value}</div>
                <div className="text-xs text-white/55 mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 sm:h-20">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#F8FAFF" />
        </svg>
      </div>
    </section>
  );
}
