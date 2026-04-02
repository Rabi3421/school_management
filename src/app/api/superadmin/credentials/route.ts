import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/jwt';

function guardSuperadmin(req: NextRequest) {
  const token = req.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = verifyAccessToken(token);
    return payload.role === 'superadmin' ? payload : null;
  } catch { return null; }
}

function fmt(d?: Date | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function fmtRelative(d?: Date | null) {
  if (!d) return '—';
  const diff = Date.now() - new Date(d).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 2)   return 'Just now';
  if (mins < 60)  return `${mins} min ago`;
  if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  if (days === 1) return 'Yesterday';
  if (days < 30)  return `${days} days ago`;
  return fmt(d);
}

// ── GET /api/superadmin/credentials ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!guardSuperadmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  try {
    await connectDB();
    const users = await User.find({}, '-passwordHash').sort({ createdAt: -1 }).lean();

    const serialized = users.map(u => ({
      id:                 (u._id as { toString(): string }).toString(),
      name:               u.name,
      email:              u.email,
      role:               u.role,
      status:             u.isActive ? 'active' : 'inactive',
      lastLogin:          fmtRelative(u.lastLogin ?? null),
      lastPasswordChange: fmt(u.lastPasswordChange ?? null),
      loginAttempts:      u.loginAttempts ?? 0,
      twoFAEnabled:       u.twoFAEnabled ?? false,
      forceReset:         u.forceReset ?? false,
    }));

    return NextResponse.json({ users: serialized });
  } catch (err) {
    console.error('[GET /api/superadmin/credentials]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
