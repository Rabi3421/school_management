import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryHero from './components/GalleryHero';
import GalleryAlbums from './components/GalleryAlbums';
import GalleryGrid from './components/GalleryGrid';
import GalleryCTA from './components/GalleryCTA';

export const metadata: Metadata = {
  title: 'Photo Gallery — Greenwood Academy',
  description:
    'Browse 500+ photos across 30+ albums from sports days, cultural nights, science fairs, graduations, and everyday school life at Greenwood Academy.',
  openGraph: {
    title: 'Photo Gallery — Greenwood Academy',
    description:
      'Explore Greenwood Academy through our photo gallery — capturing every achievement, performance, and milestone.',
  },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <GalleryHero />
        <GalleryAlbums />
        <GalleryGrid />
        <GalleryCTA />
      </main>
      <Footer />
    </>
  );
}
