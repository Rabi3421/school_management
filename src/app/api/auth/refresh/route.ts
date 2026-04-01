import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  accessCookieOptions,
  refreshCookieOptions,
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  TokenPayload,
} from '@/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token.' }, { status: 401 });
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      return NextResponse.json({ error: 'Refresh token expired or invalid.' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'User not found or inactive.' }, { status: 401 });
    }

    const accessPayload: TokenPayload = {
      sub:   user._id.toString(),
      email: user.email,
      role:  user.role,
      name:  user.name,
    };

    const newAccessToken  = signAccessToken(accessPayload);
    const newRefreshToken = signRefreshToken(user._id.toString(), (payload.version ?? 0) + 1);

    const safeUser = {
      id:           user._id.toString(),
      name:         user.name,
      email:        user.email,
      role:         user.role,
      grade:        user.grade,
      section:      user.section,
      rollNumber:   user.rollNumber,
      subject:      user.subject,
      department:   user.department,
      phone:        user.phone,
    };

    const res = NextResponse.json({ user: safeUser }, { status: 200 });
    res.cookies.set(ACCESS_COOKIE,  newAccessToken,  accessCookieOptions());
    res.cookies.set(REFRESH_COOKIE, newRefreshToken, refreshCookieOptions());

    return res;
  } catch (err) {
    console.error('[/api/auth/refresh]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
