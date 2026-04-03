'use client';

import React from 'react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { PublicSchoolData } from '@/lib/schoolRegistry';
import ThemedNavbar from './components/ThemedNavbar';
import ThemedHero from './components/ThemedHero';
import ThemedAbout from './components/ThemedAbout';
import ThemedAcademics from './components/ThemedAcademics';
import ThemedAnnouncements from './components/ThemedAnnouncements';
import ThemedEvents from './components/ThemedEvents';
import ThemedGallery from './components/ThemedGallery';
import ThemedAdmissions from './components/ThemedAdmissions';
import ThemedContact from './components/ThemedContact';
import ThemedFooter from './components/ThemedFooter';

interface SchoolWebsiteProps {
  school: PublicSchoolData;
}

export default function SchoolWebsite({ school }: SchoolWebsiteProps) {
  return (
    <ThemeProvider themeId={school.theme}>
      <div className="min-h-screen">
        <ThemedNavbar name={school.name} domain={school.domain} />
        <main>
          <section id="home">
            <ThemedHero school={school} />
          </section>
          <section id="about">
            <ThemedAbout school={school} />
          </section>
          <section id="academics">
            <ThemedAcademics school={school} />
          </section>
          <section id="announcements">
            <ThemedAnnouncements />
          </section>
          <section id="events">
            <ThemedEvents />
          </section>
          <section id="gallery">
            <ThemedGallery />
          </section>
          <section id="admissions">
            <ThemedAdmissions school={school} />
          </section>
          <section id="contact">
            <ThemedContact school={school} />
          </section>
        </main>
        <ThemedFooter school={school} />
      </div>
    </ThemeProvider>
  );
}
