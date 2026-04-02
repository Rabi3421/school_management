import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/jwt';

// ── Auth guard ────────────────────────────────────────────────────────────────
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

// ── PUT /api/superadmin/users/[id] — update user ─────────────────────────────
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!guardSuperadmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { name, email, role, status, grade, section, rollNumber, subject, department, phone } = body;

    if (!name?.trim() || !email?.trim() || !role) {
      return NextResponse.json({ error: 'name, email, and role are required.' }, { status: 400 });
    }

    await connectDB();

    const existing = await User.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Never allow changing the role away from superadmin (protect the singleton)
    if (existing.role === 'superadmin') {
      return NextResponse.json({ error: 'Superadmin account cannot be modified.' }, { status: 400 });
    }

    // Block assigning principal role to someone else when a principal already exists
    if (role === 'principal' && existing.role !== 'principal') {
      const existingPrincipal = await User.findOne({ role: 'principal', _id: { $ne: id } });
      if (existingPrincipal) {
        return NextResponse.json({ error: 'A principal already exists. Only one principal is allowed per school.' }, { status: 409 });
      }
    }

    // Prevent creating duplicate emails
    const conflict = await User.findOne({ email: email.toLowerCase().trim(), _id: { $ne: id } });
    if (conflict) {
      return NextResponse.json({ error: 'Another user already has this email.' }, { status: 409 });
    }

    const updated = await User.findByIdAndUpdate(
      id,
      {
        name:       name.trim(),
        email:      email.toLowerCase().trim(),
        role,
        isActive:   status !== 'inactive',
        grade:      grade || undefined,
        section:    section || undefined,
        rollNumber: rollNumber || undefined,
        subject:    subject || undefined,
        department: department || undefined,
        phone:      phone || undefined,
      },
      { new: true, select: '-passwordHash' }
    );

    return NextResponse.json({
      user: {
        id:         updated!._id.toString(),
        name:       updated!.name,
        email:      updated!.email,
        role:       updated!.role,
        status:     updated!.isActive ? 'active' : 'inactive',
        grade:      updated!.grade ?? null,
        section:    updated!.section ?? null,
        rollNumber: updated!.rollNumber ?? null,
        subject:    updated!.subject ?? null,
        department: updated!.department ?? null,
        phone:      updated!.phone ?? null,
        createdAt:  updated!.createdAt.toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric',
        }),
        lastLogin: '—',
      },
    });
  } catch (err) {
    console.error('[PUT /api/superadmin/users/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── PATCH /api/superadmin/users/[id] — toggle isActive only ──────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!guardSuperadmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;

  try {
    await connectDB();

    const existing = await User.findById(id);
    if (!existing) return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    if (existing.role === 'superadmin') {
      return NextResponse.json({ error: 'Superadmin cannot be deactivated.' }, { status: 400 });
    }

    existing.isActive = !existing.isActive;
    await existing.save();

    return NextResponse.json({ status: existing.isActive ? 'active' : 'inactive' });
  } catch (err) {
    console.error('[PATCH /api/superadmin/users/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ── DELETE /api/superadmin/users/[id] — remove user ──────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!guardSuperadmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await params;

  try {
    await connectDB();

    const existing = await User.findById(id);
    if (!existing) return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    if (existing.role === 'superadmin') {
      return NextResponse.json({ error: 'Superadmin account cannot be deleted.' }, { status: 400 });
    }

    if (existing.role === 'principal') {
      return NextResponse.json({ error: 'Principal account cannot be deleted directly. Reassign the role first.' }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/superadmin/users/[id]]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
