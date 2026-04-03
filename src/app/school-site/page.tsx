import React from 'react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getSchoolByCode } from '@/lib/schoolRegistry';
import SchoolWebsite from './SchoolWebsite';

// ─── /school-site ──────────────────────────────────────────────────────────────
// This route has NO URL params. It is always accessed via:
//
//   Production:  greenwood.schoolsync.in/   (middleware rewrites → /school-site)
//   Local dev:   localhost:4028?school=gwa-001  (middleware rewrites → /school-site)
//
// The school identity comes from the x-school-code request header set by middleware.

export const dynamic = 'force-dynamic'; // always SSR — school is determined at request time

export async function generateMetadata() {
  const headersList = await headers();
  const code = headersList.get('x-school-code');
  if (!code) return { title: 'School Website' };
  const school = getSchoolByCode(code);
  if (!school) return { title: 'School Not Found' };
  return {
    title: `${school.name} — Official Website`,
    description:
      school.tagline ??
      `${school.name} — ${school.board} school in ${school.city}, ${school.state}`,
    openGraph: {
      title: school.name,
      description: school.tagline,
      type: 'website',
    },
  };
}

export default async function SchoolSitePage() {
  const headersList = await headers();
  const code = headersList.get('x-school-code');

  // No school code → not a school domain and no ?school= param → 404
  if (!code) notFound();

  const school = getSchoolByCode(code);
  if (!school) notFound();

  if (school.status === 'suspended') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm p-8">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-800 text-gray-800 mb-2">{school.name}</h1>
          <p className="text-gray-500 text-sm">
            This school&apos;s website is temporarily unavailable. Please contact the administration.
          </p>
        </div>
      </div>
    );
  }

  return <SchoolWebsite school={school} />;
}
