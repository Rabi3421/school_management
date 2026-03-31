'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const screenshots = [
{
  title: 'Student Management',
  description: 'Complete student database with profiles, documents, and academic history',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_188a17bd0-1773092134822.png",
  alt: 'School students studying together in a modern classroom environment'
},
{
  title: 'Attendance Dashboard',
  description: 'Real-time attendance tracking with class-wise and student-wise reports',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1859d1683-1768281128704.png",
  alt: 'Teacher marking attendance on a digital tablet in school'
},
{
  title: 'Fee Collection',
  description: 'Online fee collection, receipt generation, and pending fee management',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_12d9720b1-1774975411012.png",
  alt: 'School administrator reviewing financial records and fee collection data'
},
{
  title: 'Exam Results',
  description: 'Automated report cards, grade books, and performance analytics',
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1f508c692-1774975411788.png",
  alt: 'Student reviewing exam results and academic performance report'
}];


export default function ScreenshotsSection() {
  const [active, setActive] = useState(0);
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
      { threshold: 0.1 }
    );
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="screenshots" ref={sectionRef} className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 reveal-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-semibold mb-4">
            <Icon name="PhotoIcon" size={12} variant="solid" className="text-primary" />
            Platform Preview
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-800 text-foreground tracking-tight mb-4">
            See SchoolSync in Action
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto">
            A clean, intuitive interface that your staff will love using every day.
          </p>
        </div>

        {/* Tabs */}
        <div className="reveal-hidden flex flex-wrap justify-center gap-2 mb-8">
          {screenshots?.map((s, i) =>
          <button
            key={s?.title}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            active === i ?
            'bg-primary text-white shadow-blue' :
            'bg-white text-muted border border-border/60 hover:border-primary/30 hover:text-primary'}`
            }>
            
              {s?.title}
            </button>
          )}
        </div>

        {/* Screenshot display */}
        <div className="reveal-hidden">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card overflow-hidden">
            {/* Browser bar */}
            <div className="bg-border-light px-4 py-3 flex items-center gap-3 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-danger/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>
              <div className="flex-1 mx-6 bg-white rounded-lg px-4 py-1.5 text-xs text-muted border border-border/50 text-center max-w-sm">
                app.schoolsync.in/{screenshots?.[active]?.title?.toLowerCase()?.replace(/\s+/g, '-')}
              </div>
            </div>
            <div className="img-zoom h-64 sm:h-80 md:h-96 relative overflow-hidden">
              <AppImage
                src={screenshots?.[active]?.src}
                alt={screenshots?.[active]?.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-xl px-4 py-3 max-w-md">
                  <div className="text-sm font-700 font-display text-foreground">{screenshots?.[active]?.title}</div>
                  <div className="text-xs text-muted mt-0.5">{screenshots?.[active]?.description}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {screenshots?.map((_, i) =>
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-200 ${
              active === i ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-border hover:bg-muted-light'}`
              }
              aria-label={`View screenshot ${i + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

}