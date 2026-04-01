import jwt, { SignOptions } from 'jsonwebtoken';
import { UserRole } from '@/models/User';

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export interface TokenPayload {
  sub: string;      // user _id
  email: string;
  role: UserRole;
  name: string;
}

export interface RefreshPayload {
  sub: string;      // user _id
  version: number;  // for future token invalidation
}

// ── Sign ──────────────────────────────────────────────────────────────────────

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: '2h',
    algorithm: 'HS256',
  } as SignOptions);
}

export function signRefreshToken(userId: string, version = 0): string {
  return jwt.sign({ sub: userId, version } as RefreshPayload, REFRESH_SECRET, {
    expiresIn: '30d',
    algorithm: 'HS256',
  } as SignOptions);
}

// ── Verify ────────────────────────────────────────────────────────────────────

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): RefreshPayload {
  return jwt.verify(token, REFRESH_SECRET) as RefreshPayload;
}

// ── Cookie helpers ────────────────────────────────────────────────────────────

export const ACCESS_COOKIE  = 'access_token';
export const REFRESH_COOKIE = 'refresh_token';

export const accessCookieOptions = (maxAge = 2 * 60 * 60) => ({
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path:     '/',
  maxAge,   // seconds — 2 hours
});

export const refreshCookieOptions = (maxAge = 30 * 24 * 60 * 60) => ({
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path:     '/api/auth',  // restrict refresh cookie to auth endpoints only
  maxAge,   // seconds — 30 days
});
