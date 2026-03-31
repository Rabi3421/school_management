import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from './components/ContactHero';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import MapSection from './components/MapSection';
import ContactFAQ from './components/ContactFAQ';

export const metadata: Metadata = {
  title: 'Contact Us — Greenwood Academy, New Delhi',
  description:
    'Get in touch with Greenwood Academy. Find our address, phone numbers, email, office hours, and department directory. Send us a message or visit our campus in Sector 14, New Delhi.',
  openGraph: {
    title: 'Contact Us — Greenwood Academy',
    description: 'Reach out to Greenwood Academy for admissions, academic, or general enquiries. We respond within 1 business day.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Header />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
      <ContactFAQ />
      <Footer />
    </main>
  );
}
