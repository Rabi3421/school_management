import { NextRequest, NextResponse } from 'next/server';
import { getSchoolByDomain, getSchoolByCode } from '@/lib/schoolRegistry';

// ─── School Domain Middleware ──────────────────────────────────────────────────
//
// Production flow:
//   Request to greenwood.schoolsync.in/
//   → middleware looks up school by hostname
//   → rewrites to /school-site internally
//   → sets x-school-code header so the page can load school data
//   → URL in browser stays: greenwood.schoolsync.in/  ← clean!
//
// Local dev fallback:
//   localhost:4028/school-site?school=gwa-001
//   → middleware reads ?school= param
//   → same rewrite flow, just via query string

export function middleware(request: NextRequest) {
  const { hostname, pathname, searchParams } = request.nextUrl;

  // ── Skip internal Next.js paths ──────────────────────────────────────────
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/homepage') ||
    pathname.includes('.')    // static files (.ico, .png, etc.)
  ) {
    return NextResponse.next();
  }

  // ── 1. Production: match by domain ───────────────────────────────────────
  const schoolByDomain = getSchoolByDomain(hostname);
  if (schoolByDomain) {
    const url = request.nextUrl.clone();
    url.pathname = '/school-site';
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-school-code', schoolByDomain.code);
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  // ── 2. Local dev: match by ?school= query param ───────────────────────────
  const schoolParam = searchParams.get('school');
  if (schoolParam) {
    const schoolByCode = getSchoolByCode(schoolParam);
    if (schoolByCode) {
      const url = request.nextUrl.clone();
      url.pathname = '/school-site';
      url.searchParams.delete('school');
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-school-code', schoolByCode.code);
      return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }
  }

  // ── 3. Direct /school-site access with x-school-code already set (pass through) ──
  if (pathname === '/school-site') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static assets and api
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
