import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/jwt';

// ── Auth guard: only superadmin ───────────────────────────────────────────────
function guardSuperadmin(req: NextRequest) {
  const token = req.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = verifyAccessToken(token);
    return payload.role === 'superadmin' ? payload : null;
  } catch {
    return null;
  }
}

// ── GET /api/superadmin/users — fetch all users ───────────────────────────────
export async function GET(req: NextRequest) {
  if (!guardSuperadmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    await connectDB();

    const users = await User.find({}, '-passwordHash')
      .sort({ createdAt: -1 })
      .lean();

    const serialized = users.map((u) => ({
      id:          (u._id as { toString(): string }).toString(),
      name:        u.name,
      email:       u.email,
      role:        u.role,
      status:      u.isActive ? 'active' : 'inactive',
      grade:       u.grade ?? null,
      section:     u.section ?? null,
      rollNumber:  u.rollNumber ?? null,
      subject:     u.subject ?? null,
      department:  u.department ?? null,
      phone:       u.phone ?? null,
      createdAt:   u.createdAt
        ? new Date(u.createdAt as unknown as string).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })
        : '—',
      lastLogin:   '—', // no session tracking yet; placeholder
    }));

    return NextResponse.json({ users: serialized });
  } catch (err) {
    console.error('[GET /api/superadmin/users]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── POST /api/superadmin/users — create a user ────────────────────────────────
export async function POST(req: NextRequest) {
  if (!guardSuperadmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { name, email, password, role, status, grade, section, rollNumber, subject, department, phone } = body;

    if (!name?.trim() || !email?.trim() || !password || !role) {
      return NextResponse.json({ error: 'name, email, password, and role are required.' }, { status: 400 });
    }

    if (role === 'superadmin') {
      return NextResponse.json({ error: 'Cannot create additional superadmin accounts.' }, { status: 400 });
    }

    await connectDB();

    if (role === 'principal') {
      const existingPrincipal = await User.findOne({ role: 'principal' });
      if (existingPrincipal) {
        return NextResponse.json({ error: 'A principal already exists. Only one principal is allowed per school.' }, { status: 409 });
      }
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name:       name.trim(),
      email:      email.toLowerCase().trim(),
      passwordHash,
      role,
      isActive:   status !== 'inactive',
      grade:      grade || undefined,
      section:    section || undefined,
      rollNumber: rollNumber || undefined,
      subject:    subject || undefined,
      department: department || undefined,
      phone:      phone || undefined,
    });

    return NextResponse.json({
      user: {
        id:         user._id.toString(),
        name:       user.name,
        email:      user.email,
        role:       user.role,
        status:     user.isActive ? 'active' : 'inactive',
        grade:      user.grade ?? null,
        section:    user.section ?? null,
        rollNumber: user.rollNumber ?? null,
        subject:    user.subject ?? null,
        department: user.department ?? null,
        phone:      user.phone ?? null,
        createdAt:  user.createdAt.toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric',
        }),
        lastLogin: '—',
      },
    }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/superadmin/users]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
