'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type UserRole = 'student' | 'teacher' | 'principal' | 'superadmin';

interface CredUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
  lastPasswordChange: string;
  loginAttempts: number;
  twoFAEnabled: boolean;
  forceReset: boolean;
}

const ROLE_CONFIG: Record<UserRole, { bg: string; text: string; label: string }> = {
  student:    { bg: 'bg-primary/8',  text: 'text-primary',     label: 'Student'     },
  teacher:    { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Teacher'     },
  principal:  { bg: 'bg-amber-50',   text: 'text-amber-700',   label: 'Principal'   },
  superadmin: { bg: 'bg-rose-50',    text: 'text-rose-600',    label: 'Super Admin' },
};

// ─── Reset Password Modal ─────────────────────────────────────────────────────
function ResetModal({
  user,
  onClose,
  onDone,
}: {
  user: CredUser;
  onClose: () => void;
  onDone: (updated: Partial<CredUser>) => void;
}) {
  const [mode, setMode]         = useState<'set' | 'generate'>('generate');
  const [newPass, setNewPass]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState('');
  const [generated]             = useState(() => 'Temp@' + Math.random().toString(36).slice(2, 8).toUpperCase());

  const handleReset = async () => {
    const password = mode === 'generate' ? generated : newPass;
    if (mode === 'set' && password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    setSaving(true); setError('');
    try {
      const res = await fetch(`/api/superadmin/credentials/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resetPassword', password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Reset failed'); return; }
      onDone(data.user);
      setDone(true);
    } catch { setError('Network error — please try again.'); }
    finally { setSaving(false); }
  };

  if (done) {
    return (
      <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-sm p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-success/8 flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={28} className="text-success" />
          </div>
          <h3 className="font-display text-base font-800 text-foreground mb-2">Password Reset!</h3>
          <p className="text-sm text-muted mb-2">Password for <strong className="text-foreground">{user.name}</strong> has been reset.</p>
          <p className="text-xs text-muted mb-5">The user will be prompted to change it on next login.</p>
          <button onClick={onClose} className="w-full py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-sm">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/40">
          <div>
            <h3 className="font-display text-base font-800 text-foreground">Reset Password</h3>
            <p className="text-xs text-muted mt-0.5">{user.name} · {user.email}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground p-1"><Icon name="X" size={16} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            {(['generate', 'set'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-xl text-xs font-700 border transition-all ${mode === m ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-background text-muted border-border/60 hover:text-foreground'}`}>
                {m === 'generate' ? '🎲 Auto-generate' : '✏️ Set manually'}
              </button>
            ))}
          </div>
          {mode === 'generate' ? (
            <div className="px-4 py-3 bg-background border border-border/60 rounded-xl">
              <p className="text-2xs text-muted mb-1">Generated password</p>
              <p className="font-display text-sm font-800 text-foreground tracking-wide">{generated}</p>
              <p className="text-2xs text-muted mt-1">User must change this on first login</p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">New Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={newPass} onChange={e => setNewPass(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full px-3 py-2 pr-9 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300" />
                <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                  <Icon name={showPass ? 'EyeOff' : 'Eye'} size={14} />
                </button>
              </div>
            </div>
          )}
          {error && <p className="text-xs text-error font-700">{error}</p>}
          <div className="flex items-center gap-2 px-3 py-2 bg-warning/5 border border-warning/20 rounded-xl">
            <Icon name="AlertTriangle" size={13} className="text-warning flex-shrink-0" />
            <p className="text-2xs text-muted">User will be logged out of all active sessions.</p>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="px-4 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">Cancel</button>
            <button onClick={handleReset} disabled={saving}
              className="flex-1 py-2 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {saving && <Icon name="Loader" size={14} className="animate-spin" />}
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-border/30 animate-pulse">
      <td className="px-5 py-3"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-xl bg-border/40 flex-shrink-0" /><div className="space-y-1.5"><div className="h-2.5 w-28 bg-border/40 rounded-full" /><div className="h-2 w-36 bg-border/30 rounded-full" /></div></div></td>
      <td className="px-4 py-3"><div className="h-5 w-16 bg-border/40 rounded-full" /></td>
      <td className="px-4 py-3 hidden md:table-cell"><div className="h-2.5 w-16 bg-border/30 rounded-full" /></td>
      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-2.5 w-20 bg-border/30 rounded-full" /></td>
      <td className="px-4 py-3 hidden md:table-cell"><div className="h-2.5 w-6 bg-border/30 rounded-full" /></td>
      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-2.5 w-8 bg-border/30 rounded-full" /></td>
      <td className="px-4 py-3"><div className="h-6 w-14 bg-border/40 rounded-full" /></td>
      <td className="px-5 py-3"><div className="h-6 w-16 bg-border/30 rounded-lg ml-auto" /></td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SuperAdminCredentials() {
  const [users, setUsers]           = useState<CredUser[]>([]);
  const [loading, setLoading]       = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch]         = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [showReset, setShowReset]   = useState<CredUser | null>(null);
  const [busyId, setBusyId]         = useState<string | null>(null);
  const [bulkResetState, setBulkReset] = useState<'idle' | 'confirm' | 'done'>('idle');
  const [toast, setToast]           = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const loadUsers = useCallback(async () => {
    setLoading(true); setFetchError(null);
    try {
      const res = await fetch('/api/superadmin/credentials');
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error ?? `Error ${res.status}`); }
      const data = await res.json();
      setUsers(data.users);
    } catch (err: unknown) {
      setFetchError(err instanceof Error ? err.message : 'Failed to load credentials');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const filtered = useMemo(() => users.filter(u => {
    const q = search.toLowerCase();
    return (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
      && (roleFilter === 'all' || u.role === roleFilter);
  }), [users, search, roleFilter]);

  const patch = async (id: string, action: string, extra?: Record<string, unknown>) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/superadmin/credentials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extra }),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data.error ?? 'Action failed'); return; }
      setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data.user } : u));
    } catch { showToast('Network error — please try again'); }
    finally { setBusyId(null); }
  };

  const handleExport = () => {
    const headers = ['Name','Email','Role','Status','Last Login','Pw Changed','Failed Attempts','2FA','Force Reset'];
    const rows = users.map(u => [u.name, u.email, u.role, u.status, u.lastLogin, u.lastPasswordChange, u.loginAttempts, u.twoFAEnabled ? 'Yes' : 'No', u.forceReset ? 'Yes' : 'No']);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `credentials-${new Date().toISOString().split('T')[0]}.csv`; a.click();
    URL.revokeObjectURL(url);
    showToast('Credentials exported');
  };

  const handleBulkReset = async () => {
    if (bulkResetState === 'idle') { setBulkReset('confirm'); return; }
    if (bulkResetState === 'confirm') {
      setBulkReset('done');
      await Promise.all(
        users.filter(u => u.role !== 'superadmin' && !u.forceReset).map(u => patch(u.id, 'toggleForceReset'))
      );
      setUsers(prev => prev.map(u => u.role === 'superadmin' ? u : { ...u, forceReset: true }));
      showToast('All users flagged for password reset on next login');
      setTimeout(() => setBulkReset('idle'), 4000);
    }
  };

  const needsAttention = users.filter(u => u.forceReset || u.loginAttempts >= 3 || u.status === 'inactive');

  if (fetchError) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-2xl bg-error/8 flex items-center justify-center">
          <Icon name="AlertTriangle" size={28} className="text-error" />
        </div>
        <p className="font-display font-800 text-foreground">Failed to load credentials</p>
        <p className="text-sm text-muted">{fetchError}</p>
        <button onClick={loadUsers} className="px-4 py-2 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600">Retry</button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Credentials</h1>
          <p className="text-sm text-muted mt-0.5">Manage account access, passwords, and security flags for all users</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-background transition-colors shadow-soft">
            <Icon name="Download" size={14} /> Export
          </button>
          {bulkResetState === 'confirm' ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-warning font-700">Flag all for reset?</span>
              <button onClick={handleBulkReset} className="flex items-center gap-2 px-3 py-2 bg-error text-white text-sm font-700 rounded-xl hover:bg-error/90 transition-colors">Confirm</button>
              <button onClick={() => setBulkReset('idle')} className="px-3 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">Cancel</button>
            </div>
          ) : (
            <button onClick={handleBulkReset} disabled={bulkResetState === 'done'}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-700 rounded-xl transition-colors ${bulkResetState === 'done' ? 'bg-success/8 text-success border border-success/20' : 'bg-rose-500 text-white hover:bg-rose-600'}`}>
              <Icon name={bulkResetState === 'done' ? 'CheckCircle' : 'RefreshCw'} size={14} />
              {bulkResetState === 'done' ? 'Done!' : 'Bulk Reset'}
            </button>
          )}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: 'Users',         label: 'Total Accounts',     value: String(users.length),                                       iconBg: 'bg-rose-50',    iconColor: 'text-rose-600' },
          { icon: 'ShieldOff',     label: 'Inactive Accounts',  value: String(users.filter(u => u.status === 'inactive').length),   iconBg: 'bg-border/40',  iconColor: 'text-muted'    },
          { icon: 'KeyRound',      label: 'Force Reset Pending',value: String(users.filter(u => u.forceReset).length),              iconBg: 'bg-warning/10', iconColor: 'text-warning'  },
          { icon: 'AlertTriangle', label: 'Locked (3+ fails)',  value: String(users.filter(u => u.loginAttempts >= 3).length),      iconBg: 'bg-error/10',   iconColor: 'text-error'    },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon name={s.icon} size={18} className={s.iconColor} />
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">{s.label}</p>
              <p className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Needs attention banner */}
      {!loading && needsAttention.length > 0 && (
        <div className="bg-warning/5 border border-warning/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="AlertTriangle" size={15} className="text-warning" />
            <p className="text-sm font-700 text-foreground">{needsAttention.length} account{needsAttention.length > 1 ? 's' : ''} need attention</p>
          </div>
          <div className="space-y-1.5">
            {needsAttention.map(u => (
              <div key={u.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-2xs font-700 px-1.5 py-0.5 rounded-full ${ROLE_CONFIG[u.role].bg} ${ROLE_CONFIG[u.role].text}`}>{ROLE_CONFIG[u.role].label}</span>
                  <span className="text-xs text-foreground font-700 truncate">{u.name}</span>
                  <span className="text-2xs text-muted hidden sm:inline truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {u.forceReset        && <span className="text-2xs font-700 px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">Force Reset</span>}
                  {u.loginAttempts >= 3 && <span className="text-2xs font-700 px-2 py-0.5 rounded-full bg-error/8 text-error border border-error/20">{u.loginAttempts} fails</span>}
                  {u.status === 'inactive' && <span className="text-2xs font-700 px-2 py-0.5 rounded-full bg-border/40 text-muted">Inactive</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="text" placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'student', 'teacher', 'principal', 'superadmin'] as const).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-700 border transition-all ${roleFilter === r ? 'bg-rose-500 text-white border-rose-500' : 'bg-background text-muted border-border/60 hover:text-foreground'}`}>
              {r === 'all' ? 'All' : r === 'superadmin' ? 'Super Admin' : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Credentials table */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-background">
                <th className="text-left text-xs font-700 text-muted px-5 py-3">User</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3">Role</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden md:table-cell">Last Login</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden lg:table-cell">Pw Changed</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden md:table-cell">Fails</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden lg:table-cell">2FA</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3">Account</th>
                <th className="text-right text-xs font-700 text-muted px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : filtered.length === 0
                ? (
                  <tr><td colSpan={8} className="py-16 text-center">
                    <Icon name="Users" size={28} className="text-muted mx-auto mb-2" />
                    <p className="text-sm text-muted">No users match your filters</p>
                  </td></tr>
                )
                : filtered.map(user => {
                  const rc = ROLE_CONFIG[user.role];
                  const isBusy = busyId === user.id;
                  return (
                    <tr key={user.id} className={`hover:bg-background/60 transition-colors group ${user.forceReset || user.loginAttempts >= 3 ? 'bg-warning/2' : ''}`}>
                      {/* User */}
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${rc.bg} flex items-center justify-center font-700 text-xs flex-shrink-0 ${rc.text}`}>
                            {user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-700 text-foreground truncate">{user.name}</p>
                              {user.forceReset && <Icon name="AlertTriangle" size={11} className="text-warning flex-shrink-0" />}
                            </div>
                            <p className="text-2xs text-muted truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Role */}
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-2xs font-700 ${rc.bg} ${rc.text}`}>{rc.label}</span>
                      </td>
                      {/* Last login */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-muted">{user.lastLogin}</p>
                      </td>
                      {/* Password changed */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-xs text-muted">{user.lastPasswordChange}</p>
                      </td>
                      {/* Failed attempts */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`text-xs font-700 flex items-center gap-1 ${user.loginAttempts >= 5 ? 'text-error' : user.loginAttempts >= 3 ? 'text-warning' : 'text-muted'}`}>
                          {user.loginAttempts}
                          {user.loginAttempts >= 3 && <Icon name="Lock" size={11} />}
                        </span>
                      </td>
                      {/* 2FA */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {user.twoFAEnabled
                          ? <span className="flex items-center gap-1 text-2xs font-700 text-success"><Icon name="ShieldCheck" size={12} />On</span>
                          : <span className="text-2xs text-muted">Off</span>}
                      </td>
                      {/* Account status toggle */}
                      <td className="px-4 py-3">
                        {user.role === 'superadmin' ? (
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-700 bg-success/8 text-success border border-success/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" /> active
                          </span>
                        ) : (
                          <button onClick={() => patch(user.id, 'toggleStatus')} disabled={isBusy}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-700 border transition-all ${
                              user.status === 'active'
                                ? 'bg-success/8 text-success border-success/20 hover:bg-error/8 hover:text-error hover:border-error/20'
                                : 'bg-border/40 text-muted border-border/60 hover:bg-success/8 hover:text-success hover:border-success/20'
                            } ${isBusy ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}>
                            {isBusy ? <Icon name="Loader" size={10} className="animate-spin" /> : <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-success' : 'bg-muted'}`} />}
                            {user.status}
                          </button>
                        )}
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => setShowReset(user)} title="Reset password" disabled={isBusy}
                            className="p-1.5 text-muted hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-40">
                            <Icon name="KeyRound" size={14} />
                          </button>
                          {user.role !== 'superadmin' && (
                            <button onClick={() => patch(user.id, 'toggleForceReset')} disabled={isBusy}
                              title={user.forceReset ? 'Clear force-reset flag' : 'Flag for forced password reset'}
                              className={`p-1.5 rounded-lg transition-colors disabled:opacity-40 ${user.forceReset ? 'text-warning bg-warning/8 hover:bg-warning/15' : 'text-muted hover:text-warning hover:bg-warning/8'}`}>
                              <Icon name="RefreshCw" size={14} />
                            </button>
                          )}
                          <button onClick={() => patch(user.id, 'clearAttempts')} disabled={isBusy || user.loginAttempts === 0}
                            title="Clear failed login counter"
                            className="p-1.5 text-muted hover:text-success hover:bg-success/8 rounded-lg transition-colors disabled:opacity-30">
                            <Icon name="ShieldOff" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border/40 bg-background">
          <p className="text-xs text-muted">{loading ? 'Loading…' : `${filtered.length} of ${users.length} accounts shown`}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-4">
        <p className="text-xs font-700 text-foreground mb-3">Actions Guide</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { icon: 'KeyRound',  color: 'text-rose-500', label: 'Reset Password',  desc: 'Set a new password or auto-generate one. User is logged out immediately.' },
            { icon: 'RefreshCw', color: 'text-warning',  label: 'Force Reset Flag', desc: 'Force the user to change their password on their next login.' },
            { icon: 'ShieldOff', color: 'text-success',  label: 'Clear Lockout',   desc: 'Reset the failed login counter to re-enable a locked account.' },
          ].map(a => (
            <div key={a.label} className="flex items-start gap-2.5 p-3 bg-background rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-background border border-border/60 flex items-center justify-center flex-shrink-0">
                <Icon name={a.icon} size={13} className={a.color} />
              </div>
              <div>
                <p className="text-xs font-700 text-foreground">{a.label}</p>
                <p className="text-2xs text-muted mt-0.5 leading-snug">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset modal */}
      {showReset && (
        <ResetModal
          user={showReset}
          onClose={() => setShowReset(null)}
          onDone={updated => {
            setUsers(prev => prev.map(u => u.id === showReset.id ? { ...u, ...updated } : u));
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-3 rounded-2xl shadow-card text-sm font-700 text-white bg-success">
          <Icon name="CheckCircle" size={16} /> {toast}
        </div>
      )}
    </div>
  );
}
