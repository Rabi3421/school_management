import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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

// ── PATCH /api/superadmin/credentials/[id] ───────────────────────────────────
// Body: { action: 'toggleStatus' | 'toggleForceReset' | 'clearAttempts' | 'resetPassword', password?: string }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!guardSuperadmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const { id } = await params;

  try {
    const body = await req.json();
    const { action, password } = body as { action: string; password?: string };

    await connectDB();
    const user = await User.findById(id);
    if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 });

    switch (action) {
      case 'toggleStatus':
        user.isActive = !user.isActive;
        break;

      case 'toggleForceReset':
        user.forceReset = !user.forceReset;
        break;

      case 'clearAttempts':
        user.loginAttempts = 0;
        break;

      case 'resetPassword': {
        if (!password || password.length < 8) {
          return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
        }
        user.passwordHash = await bcrypt.hash(password, 12);
        user.forceReset = true;        // force change on next login
        user.loginAttempts = 0;        // clear any lockout
        user.lastPasswordChange = new Date();
        break;
      }

      default:
        return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
    }

    await user.save();

    return NextResponse.json({
      user: {
        id:                 user._id.toString(),
        status:             user.isActive ? 'active' : 'inactive',
        loginAttempts:      user.loginAttempts,
        forceReset:         user.forceReset,
        twoFAEnabled:       user.twoFAEnabled,
        lastPasswordChange: fmt(user.lastPasswordChange),
      },
    });
  } catch (err) {
    console.error('[PATCH /api/superadmin/credentials/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
