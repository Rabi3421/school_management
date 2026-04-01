import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'student' | 'teacher' | 'principal';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  // Student fields
  grade?: string;
  section?: string;
  rollNumber?: string;
  // Teacher fields
  subject?: string;
  department?: string;
  // Shared
  phone?: string;
  profilePicture?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name:          { type: String, required: true, trim: true },
    email:         { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash:  { type: String, required: true },
    role:          { type: String, enum: ['student', 'teacher', 'principal'], required: true },
    // Student
    grade:         { type: String },
    section:       { type: String },
    rollNumber:    { type: String },
    // Teacher
    subject:       { type: String },
    department:    { type: String },
    // Shared
    phone:         { type: String },
    profilePicture:{ type: String },
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError in dev with hot-reload
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
