import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AcademicsHero from './components/AcademicsHero';
import ProgramsSection from './components/ProgramsSection';
import StreamsSection from './components/StreamsSection';
import TeachingSection from './components/TeachingSection';
import ResultsSection from './components/ResultsSection';
import CocurricularSection from './components/CoricularSection';
import AcademicsCTA from './components/AcademicsCTA';

export const metadata: Metadata = {
  title: 'Academics — Greenwood Academy | CBSE Curriculum Nursery to Grade XII',
  description:
    'Explore Greenwood Academy\'s academic programs — from play-based Pre-Primary to competitive Senior Secondary streams. CBSE affiliated, 100% board pass rate, 120+ faculty.',
};

export default function AcademicsPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <AcademicsHero />
      <ProgramsSection />
      <StreamsSection />
      <TeachingSection />
      <ResultsSection />
      <CocurricularSection />
      <AcademicsCTA />
      <Footer />
    </main>
  );
}
