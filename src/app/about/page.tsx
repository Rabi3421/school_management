import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from './components/AboutHero';
import StorySection from './components/StorySection';
import LeadershipSection from './components/LeadershipSection';
import StatsSection from './components/StatsSection';
import FacilitiesSection from './components/FacilitiesSection';
import AboutCTA from './components/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us — Greenwood Academy | Excellence in Education Since 1998',
  description:
    'Learn about Greenwood Academy — our story, mission, leadership, facilities, and 26 years of shaping young minds in New Delhi. CBSE affiliated, ISO certified.',
};

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <AboutHero />
      <StorySection />
      <StatsSection />
      <LeadershipSection />
      <FacilitiesSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}
