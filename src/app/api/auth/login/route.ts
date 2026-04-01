import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import {
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
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase().trim(), isActive: true });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const payload: TokenPayload = {
      sub:   user._id.toString(),
      email: user.email,
      role:  user.role,
      name:  user.name,
    };

    const accessToken  = signAccessToken(payload);
    const refreshToken = signRefreshToken(user._id.toString());

    // Build safe user object to return (no passwordHash)
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

    res.cookies.set(ACCESS_COOKIE,  accessToken,  accessCookieOptions());
    res.cookies.set(REFRESH_COOKIE, refreshToken, refreshCookieOptions());

    return res;
  } catch (err) {
    console.error('[/api/auth/login]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
