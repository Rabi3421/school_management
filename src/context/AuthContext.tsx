'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'student' | 'parent' | 'teacher' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  // role-specific
  grade?: string;       // student
  section?: string;     // student
  rollNumber?: string;  // student
  subject?: string;     // teacher
  department?: string;  // teacher / admin
  childName?: string;   // parent
  childGrade?: string;  // parent
}

const DEMO_USERS: Record<string, AuthUser & { password: string }> = {
  'student@demo.com': {
    id: 'std-001', name: 'Arjun Sharma', email: 'student@demo.com', password: 'demo123',
    role: 'student', grade: '10', section: 'A', rollNumber: 'SR-0451',
  },
  'parent@demo.com': {
    id: 'par-001', name: 'Suresh Sharma', email: 'parent@demo.com', password: 'demo123',
    role: 'parent', childName: 'Arjun Sharma', childGrade: 'Grade 10A',
  },
  'teacher@demo.com': {
    id: 'tch-001', name: 'Meera Iyer', email: 'teacher@demo.com', password: 'demo123',
    role: 'teacher', subject: 'Mathematics', department: 'Science & Maths',
  },
  'admin@demo.com': {
    id: 'adm-001', name: 'Rajesh Sharma', email: 'admin@demo.com', password: 'demo123',
    role: 'admin', department: 'Administration',
  },
};

const ROLE_REDIRECTS: Record<UserRole, string> = {
  student: '/dashboard/student',
  parent: '/dashboard/student',
  teacher: '/dashboard/teacher',
  admin: '/dashboard/admin',
};

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('school_auth_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const record = DEMO_USERS[email.toLowerCase()];
    if (!record || record.password !== password) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const { password: _pw, ...authUser } = record;
    setUser(authUser);
    sessionStorage.setItem('school_auth_user', JSON.stringify(authUser));
    router.push(ROLE_REDIRECTS[authUser.role]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('school_auth_user');
    router.push('/login');
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { ROLE_REDIRECTS };
