import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdmissionsHero from './components/AdmissionsHero';
import ProcessSection from './components/ProcessSection';
import SeatsSection from './components/SeatsSection';
import DocumentsSection from './components/DocumentsSection';
import WhySection from './components/WhySection';
import ApplySection from './components/ApplySection';

export const metadata: Metadata = {
  title: 'Admissions 2025–26 — Greenwood Academy',
  description:
    'Apply for admissions at Greenwood Academy for the 2025–26 academic year. CBSE-affiliated, Nursery to Grade XII. Explore the process, seat availability, documents required, and submit your enquiry online.',
  openGraph: {
    title: 'Admissions 2025–26 — Greenwood Academy',
    description: 'Secure your child\'s future at Greenwood Academy. Limited seats for 2025–26. Apply now.',
    type: 'website',
  },
};

export default function AdmissionsPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Header />
      <AdmissionsHero />
      <ProcessSection />
      <SeatsSection />
      <DocumentsSection />
      <WhySection />
      <ApplySection />
      <Footer />
    </main>
  );
}
