// ─── School Data Registry ─────────────────────────────────────────────────────
// Each school is identified by its own domain name.
// When a request comes in, the middleware reads the hostname, looks up the
// school by domain, then passes the internal code to /school-site via a
// request header — the code never appears in the URL.
//
// Production:  greenwood.schoolsync.in  → renders Greenwood Academy (Royal theme)
// Local dev:   localhost:4028?school=gwa-001  → same render, dev-only fallback

import { ThemeId } from '@/themes';

export interface PublicSchoolData {
  id: number;
  name: string;
  code: string;       // internal identifier — never shown in URL
  domain: string;     // production domain e.g. "greenwood.schoolsync.in"
  city: string;
  state: string;
  board: string;
  status: 'active' | 'suspended' | 'trial';
  principal: string;
  students: number;
  teachers: number;
  established: string;
  subscription: 'basic' | 'pro' | 'enterprise';
  email: string;
  phone: string;
  theme: ThemeId;
  tagline?: string;
}

export const SCHOOL_REGISTRY: PublicSchoolData[] = [
  {
    id: 1,
    name: 'Greenwood Academy',
    code: 'gwa-001',
    domain: 'greenwood.schoolsync.in',
    city: 'Mumbai',
    state: 'Maharashtra',
    board: 'CBSE',
    status: 'active',
    principal: 'Anita Sharma',
    students: 620,
    teachers: 38,
    established: '2024',
    subscription: 'enterprise',
    email: 'info@greenwood.edu.in',
    phone: '+91 22 4001 9900',
    theme: 'royal',
    tagline: 'Where Excellence Meets Opportunity — Shaping Leaders of Tomorrow',
  },
  {
    id: 2,
    name: 'Sunrise International School',
    code: 'sis-002',
    domain: 'sunrise.schoolsync.in',
    city: 'Pune',
    state: 'Maharashtra',
    board: 'ICSE',
    status: 'active',
    principal: 'Ramesh Pillai',
    students: 480,
    teachers: 30,
    established: '2024',
    subscription: 'pro',
    email: 'admin@sunrise.edu',
    phone: '+91 20 2601 4400',
    theme: 'emerald',
    tagline: 'Rising Together — A Global Education Experience in the Heart of Pune',
  },
  {
    id: 3,
    name: 'Lotus Public School',
    code: 'lps-003',
    domain: 'lotus.schoolsync.in',
    city: 'Bangalore',
    state: 'Karnataka',
    board: 'State Board',
    status: 'trial',
    principal: 'Nandita Rao',
    students: 120,
    teachers: 14,
    established: '2026',
    subscription: 'basic',
    email: 'contact@lotus.school',
    phone: '+91 80 3901 5500',
    theme: 'sunrise',
    tagline: 'Bloom Where You Are Planted — Nurturing Young Minds in Bangalore',
  },
  {
    id: 4,
    name: 'Springfield High School',
    code: 'shs-004',
    domain: 'springfield.schoolsync.in',
    city: 'Delhi',
    state: 'Delhi',
    board: 'Cambridge',
    status: 'suspended',
    principal: 'Arvind Mehta',
    students: 310,
    teachers: 22,
    established: '2024',
    subscription: 'pro',
    email: 'info@springfield.edu',
    phone: '+91 11 4501 6600',
    theme: 'midnight',
    tagline: 'Distinction in Every Discipline — A Premium Cambridge Learning Experience',
  },
];

/** Look up school by its domain — used by the middleware */
export function getSchoolByDomain(hostname: string): PublicSchoolData | null {
  // Strip port if present (e.g. "greenwood.schoolsync.in:3000" → "greenwood.schoolsync.in")
  const host = hostname.split(':')[0];
  return SCHOOL_REGISTRY.find(s => s.domain === host) ?? null;
}

/** Look up school by internal code — used by /school-site page */
export function getSchoolByCode(code: string): PublicSchoolData | null {
  return SCHOOL_REGISTRY.find(s => s.code.toLowerCase() === code.toLowerCase()) ?? null;
}

/** Generate a URL-safe slug from school name */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
