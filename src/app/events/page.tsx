import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventsHero from './components/EventsHero';
import FeaturedEvents from './components/FeaturedEvents';
import EventsCalendar from './components/EventsCalendar';
import PastHighlights from './components/PastHighlights';
import EventsCTA from './components/EventsCTA';

export const metadata: Metadata = {
  title: 'Events & Celebrations — Greenwood Academy',
  description:
    'Explore all upcoming and past events at Greenwood Academy — Annual Sports Day, Science Fairs, Cultural Nights, PTMs, Workshops, and more. Stay updated with our full events calendar for 2025–26.',
  openGraph: {
    title: 'Events & Celebrations — Greenwood Academy',
    description: 'From sports days to cultural nights — life at Greenwood is always buzzing. View the full events calendar for 2025–26.',
    type: 'website',
  },
};

export default function EventsPage() {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Header />
      <EventsHero />
      <FeaturedEvents />
      <EventsCalendar />
      <PastHighlights />
      <EventsCTA />
      <Footer />
    </main>
  );
}
