import { NextResponse } from 'next/server';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/jwt';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out.' }, { status: 200 });

  // Clear both cookies
  res.cookies.set(ACCESS_COOKIE, '', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge:   0,
  });
  res.cookies.set(REFRESH_COOKIE, '', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/api/auth',
    maxAge:   0,
  });

  return res;
}
