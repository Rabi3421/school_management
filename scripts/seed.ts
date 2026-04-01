/**
 * Seed script — populates MongoDB with 3 demo users (one per role).
 *
 * Run with:
 *   npx tsx scripts/seed.ts
 *   (or: npx ts-node -r tsconfig-paths/register scripts/seed.ts)
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.NEXT_MONGODB_URI!;

if (!MONGODB_URI) {
  console.error('❌  NEXT_MONGODB_URI not found in .env');
  process.exit(1);
}

// ── Inline schema (avoids Next.js module resolution issues outside the app) ──

const UserSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true },
    email:         { type: String, required: true, unique: true, lowercase: true },
    passwordHash:  { type: String, required: true },
    role:          { type: String, enum: ['student', 'teacher', 'principal'], required: true },
    grade:         String,
    section:       String,
    rollNumber:    String,
    subject:       String,
    department:    String,
    phone:         String,
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// ── Demo users ────────────────────────────────────────────────────────────────

const DEMO_PASSWORD = 'Demo@1234';

const demoUsers = [
  {
    name:        'Arjun Sharma',
    email:       'student@demo.com',
    role:        'student',
    grade:       '10',
    section:     'A',
    rollNumber:  'SR-0451',
    phone:       '+91 99001 10001',
  },
  {
    name:        'Meera Iyer',
    email:       'teacher@demo.com',
    role:        'teacher',
    subject:     'Mathematics',
    department:  'Science & Maths',
    phone:       '+91 99001 10002',
  },
  {
    name:        'Rajesh Sharma',
    email:       'principal@demo.com',
    role:        'principal',
    department:  'Administration',
    phone:       '+91 99001 10003',
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('🔌  Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected\n');

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  for (const u of demoUsers) {
    const existing = await User.findOne({ email: u.email });
    if (existing) {
      console.log(`⏭   ${u.role.padEnd(10)} ${u.email} — already exists, skipping`);
      continue;
    }

    await User.create({ ...u, passwordHash, isActive: true });
    console.log(`✅  ${u.role.padEnd(10)} ${u.email} — created`);
  }

  console.log('\n🌱  Seed complete!');
  console.log(`\nDemo credentials (all roles):`);
  console.log(`  student@demo.com   / Demo@1234`);
  console.log(`  teacher@demo.com   / Demo@1234`);
  console.log(`  principal@demo.com / Demo@1234`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
