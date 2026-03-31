import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchoolHero from './components/SchoolHero';
import AboutSection from './components/AboutSection';
import AcademicsSection from './components/AcademicsSection';
import AnnouncementsSection from './components/AnnouncementsSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import AdmissionsSection from './components/AdmissionsSection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <SchoolHero />
      <AboutSection />
      <AcademicsSection />
      <AnnouncementsSection />
      <EventsSection />
      <GallerySection />
      <AdmissionsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}