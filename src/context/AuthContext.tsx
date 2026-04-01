'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';

// ── Types ─────────────────────────────────────────────────────────────────────

export type UserRole = 'student' | 'teacher' | 'principal';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Student
  grade?: string;
  section?: string;
  rollNumber?: string;
  // Teacher / Principal
  subject?: string;
  department?: string;
  phone?: string;
}

export const ROLE_REDIRECTS: Record<UserRole, string> = {
  student:   '/dashboard/student',
  teacher:   '/dashboard/teacher',
  principal: '/dashboard/admin',
};

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login:  (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// Access token: 2h. Refresh 5 min before expiry = every 115 min
const REFRESH_INTERVAL_MS = (2 * 60 - 5) * 60 * 1000;

// ── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router                = useRouter();
  const refreshTimerRef       = useRef<ReturnType<typeof setTimeout> | null>(null);

  const silentRefresh = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const res = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
      if (!res.ok) return null;
      const data = await res.json();
      return data.user as AuthUser;
    } catch {
      return null;
    }
  }, []);

  const scheduleRefresh = useCallback((refresh: () => Promise<AuthUser | null>) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(async () => {
      const refreshed = await refresh();
      if (refreshed) {
        setUser(refreshed);
        scheduleRefresh(refresh);
      } else {
        setUser(null);
      }
    }, REFRESH_INTERVAL_MS);
  }, []);

  const cancelRefresh = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  // Bootstrap on mount
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user as AuthUser);
          scheduleRefresh(silentRefresh);
          setLoading(false);
          return;
        }
      } catch {}

      // Access token gone — try refresh token
      const refreshed = await silentRefresh();
      if (refreshed) {
        setUser(refreshed);
        scheduleRefresh(silentRefresh);
      }
      setLoading(false);
    };

    bootstrap();
    return cancelRefresh;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await fetch('/api/auth/login', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email, password }),
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) return { success: false, error: data.error ?? 'Login failed.' };
        const loggedInUser = data.user as AuthUser;
        setUser(loggedInUser);
        scheduleRefresh(silentRefresh);
        router.push(ROLE_REDIRECTS[loggedInUser.role]);
        return { success: true };
      } catch {
        return { success: false, error: 'Network error. Please try again.' };
      }
    },
    [router, scheduleRefresh, silentRefresh]
  );

  const logout = useCallback(async () => {
    cancelRefresh();
    try { await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }); } catch {}
    setUser(null);
    router.push('/login');
  }, [cancelRefresh, router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
  return ctx;
}
