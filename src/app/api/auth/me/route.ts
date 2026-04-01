import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAccessToken,
  ACCESS_COOKIE,
} from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(ACCESS_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);

    return NextResponse.json({
      user: {
        id:    payload.sub,
        email: payload.email,
        role:  payload.role,
        name:  payload.name,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Token expired or invalid.' }, { status: 401 });
  }
}
