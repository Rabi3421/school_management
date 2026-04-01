'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth, UserRole } from '@/context/AuthContext';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const roles: { value: UserRole; label: string; icon: string; color: string; bg: string; demoEmail: string }[] = [
  { value: 'student',   label: 'Student',          icon: 'AcademicCapIcon',      color: 'text-primary',      bg: 'bg-primary/10 border-primary/30',    demoEmail: 'student@demo.com' },
  { value: 'teacher',   label: 'Teacher',           icon: 'UserGroupIcon',        color: 'text-emerald-600',  bg: 'bg-emerald-50 border-emerald-200',   demoEmail: 'teacher@demo.com' },
  { value: 'principal', label: 'Principal / Admin', icon: 'BuildingLibraryIcon',  color: 'text-amber-600',    bg: 'bg-amber-50 border-amber-200',       demoEmail: 'principal@demo.com' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email,    setEmail]    = useState('student@demo.com');
  const [password, setPassword] = useState('Demo@1234');
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleRoleSelect = (role: UserRole) => {
    const r = roles.find((r) => r.value === role)!;
    setSelectedRole(role);
    setEmail(r.demoEmail);
    setPassword('Demo@1234');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error ?? 'Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #0A0F2E 0%, #0F2A7A 50%, #1C4ED8 80%, #0EA5E9 100%)' }}>
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] shrink-0 p-12 text-white">
        <div className="flex items-center gap-3">
          <AppLogo size={40} />
          <div>
            <div className="font-display font-700 text-lg tracking-tight">Greenwood Academy</div>
            <div className="text-xs text-white/60 uppercase tracking-wider">SchoolSync Portal</div>
          </div>
        </div>

        <div>
          <h1 className="font-display text-4xl font-800 leading-tight mb-4">
            Welcome to the<br />
            <span style={{ background: 'linear-gradient(90deg, #38BDF8, #818CF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              School Portal
            </span>
          </h1>
          <p className="text-white/70 leading-relaxed mb-10 text-sm">
            A unified platform for students, teachers, and administrators to stay connected with school life.
          </p>
          <div className="space-y-4">
            {[
              { icon: 'AcademicCapIcon',     text: 'Students — view grades, timetable & attendance' },
              { icon: 'UserGroupIcon',        text: 'Teachers — manage classes & assessments' },
              { icon: 'BuildingLibraryIcon',  text: 'Principal — complete school oversight & reports' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <Icon name={item.icon as 'AcademicCapIcon'} size={16} className="text-white/80" />
                </div>
                <span className="text-sm text-white/70">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/40">
          © 2026 Greenwood Academy ·{' '}
          <Link href="/privacy-policy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <AppLogo size={36} />
            <div>
              <div className="font-display font-700 text-base text-foreground">Greenwood Academy</div>
              <div className="text-xs text-muted uppercase tracking-wider">SchoolSync Portal</div>
            </div>
          </div>

          <h2 className="font-display text-2xl font-800 text-foreground mb-1">Sign In</h2>
          <p className="text-sm text-muted mb-6">Select your role and enter your credentials.</p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => handleRoleSelect(r.value)}
                className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-center transition-all duration-150 ${
                  selectedRole === r.value ? r.bg : 'bg-background border-border hover:border-border'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedRole === r.value ? r.bg : 'bg-white border border-border'}`}>
                  <Icon name={r.icon as 'AcademicCapIcon'} size={16} className={selectedRole === r.value ? r.color : 'text-muted'} />
                </div>
                <span className={`text-2xs font-600 leading-tight ${selectedRole === r.value ? r.color : 'text-muted'}`}>{r.label}</span>
              </button>
            ))}
          </div>

          {/* Demo hint */}
          <div className="flex items-start gap-2 px-3 py-2.5 bg-primary/5 rounded-xl border border-primary/15 text-xs text-muted mb-5">
            <Icon name="InformationCircleIcon" size={14} className="text-primary mt-0.5 shrink-0" />
            <span>Demo credentials are pre-filled. Just click <strong className="text-foreground">Sign In</strong>.</span>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-danger/8 rounded-xl border border-danger/20 text-xs text-danger mb-4">
              <Icon name="ExclamationCircleIcon" size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-600 text-foreground mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                placeholder="you@school.edu.in"
              />
            </div>
            <div>
              <label className="block text-xs font-600 text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                  className="w-full px-4 py-3 pr-10 bg-background border border-border rounded-xl text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors">
                  <Icon name={showPass ? 'EyeSlashIcon' : 'EyeIcon'} size={16} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white text-sm font-600 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in…
                </>
              ) : (
                <>Sign In <Icon name="ArrowRightIcon" size={15} /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors">
              <Icon name="ArrowLeftIcon" size={12} />
              Back to School Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
