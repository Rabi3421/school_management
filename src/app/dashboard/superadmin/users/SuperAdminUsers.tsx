'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type UserRole = 'student' | 'teacher' | 'principal' | 'superadmin';
type UserStatus = 'active' | 'inactive';

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  grade?: string | null;
  section?: string | null;
  rollNumber?: string | null;
  subject?: string | null;
  department?: string | null;
  phone?: string | null;
  createdAt: string;
  lastLogin: string;
}

const ROLE_CONFIG: Record<UserRole, { bg: string; text: string; label: string }> = {
  student:    { bg: 'bg-primary/8',  text: 'text-primary',     label: 'Student'     },
  teacher:    { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Teacher'     },
  principal:  { bg: 'bg-amber-50',   text: 'text-amber-700',   label: 'Principal'   },
  superadmin: { bg: 'bg-rose-50',    text: 'text-rose-600',    label: 'Super Admin' },
};

const EMPTY_FORM = {
  name: '', email: '', role: 'student' as UserRole, status: 'active' as UserStatus,
  grade: '', section: '', rollNumber: '', subject: '', department: '', phone: '',
  password: '',
};

// ─── Toast helper ─────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-2 px-4 py-3 rounded-2xl shadow-card text-sm font-700 text-white
      ${type === 'success' ? 'bg-success' : 'bg-error'}`}>
      <Icon name={type === 'success' ? 'CheckCircle' : 'XCircle'} size={16} />
      {msg}
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="border-b border-border/30 animate-pulse">
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-border/40 flex-shrink-0" />
          <div className="space-y-1.5">
            <div className="h-2.5 w-28 bg-border/40 rounded-full" />
            <div className="h-2 w-36 bg-border/30 rounded-full" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><div className="h-5 w-16 bg-border/40 rounded-full" /></td>
      <td className="px-4 py-3 hidden md:table-cell"><div className="h-2.5 w-32 bg-border/30 rounded-full" /></td>
      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-5 w-14 bg-border/40 rounded-full" /></td>
      <td className="px-4 py-3 hidden lg:table-cell"><div className="h-2.5 w-16 bg-border/30 rounded-full" /></td>
      <td className="px-4 py-3 hidden xl:table-cell"><div className="h-2.5 w-20 bg-border/30 rounded-full" /></td>
      <td className="px-5 py-3"><div className="h-6 w-14 bg-border/30 rounded-lg ml-auto" /></td>
    </tr>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SuperAdminUsers() {
  const [users, setUsers]             = useState<AppUser[]>([]);
  const [loading, setLoading]         = useState(true);
  const [fetchError, setFetchError]   = useState<string | null>(null);
  const [search, setSearch]           = useState('');
  const [roleFilter, setRoleFilter]   = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [selected, setSelected]       = useState<AppUser | null>(null);
  const [showModal, setShowModal]     = useState<'create' | 'edit' | 'delete' | null>(null);
  const [form, setForm]               = useState({ ...EMPTY_FORM });
  const [saving, setSaving]           = useState(false);
  const [toast, setToast]             = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Fetch users on mount ───────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/superadmin/users');
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? `Server error ${res.status}`);
        }
        const data = await res.json();
        setUsers(data.users);
      } catch (err: unknown) {
        setFetchError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const hasPrincipal = useMemo(() => users.some(u => u.role === 'principal'), [users]);

  const filtered = useMemo(() => {
    return users.filter(u => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole   = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const openEdit = (user: AppUser) => {
    setSelected(user);
    setForm({
      name: user.name, email: user.email, role: user.role, status: user.status,
      grade: user.grade ?? '', section: user.section ?? '', rollNumber: user.rollNumber ?? '',
      subject: user.subject ?? '', department: user.department ?? '', phone: user.phone ?? '',
      password: '',
    });
    setShowModal('edit');
  };

  const openCreate = () => {
    setSelected(null);
    setForm({ ...EMPTY_FORM });
    setShowModal('create');
  };

  const openDelete = (user: AppUser) => {
    setSelected(user);
    setShowModal('delete');
  };

  const handleCreate = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      showToast('Name and email are required', 'error');
      return;
    }
    if (!form.password || form.password.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/superadmin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: form.role,
          status: form.status,
          grade: form.grade || undefined,
          section: form.section || undefined,
          rollNumber: form.rollNumber || undefined,
          subject: form.subject || undefined,
          department: form.department || undefined,
          phone: form.phone || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data.error ?? 'Failed to create user', 'error'); return; }
      setUsers(prev => [data.user, ...prev]);
      setShowModal(null);
      showToast(`User "${data.user.name}" created successfully`);
    } catch {
      showToast('Network error — please try again', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!selected) return;
    if (!form.name.trim() || !form.email.trim()) {
      showToast('Name and email are required', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/superadmin/users/${selected.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          role: form.role,
          status: form.status,
          grade: form.grade || undefined,
          section: form.section || undefined,
          rollNumber: form.rollNumber || undefined,
          subject: form.subject || undefined,
          department: form.department || undefined,
          phone: form.phone || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data.error ?? 'Failed to update user', 'error'); return; }
      setUsers(prev => prev.map(u => u.id === selected.id ? data.user : u));
      setShowModal(null);
      showToast(`User "${data.user.name}" updated successfully`);
    } catch {
      showToast('Network error — please try again', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/superadmin/users/${selected.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { showToast(data.error ?? 'Failed to delete user', 'error'); return; }
      setUsers(prev => prev.filter(u => u.id !== selected.id));
      setShowModal(null);
      showToast(`User "${selected.name}" deleted`);
    } catch {
      showToast('Network error — please try again', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (user: AppUser) => {
    try {
      const res = await fetch(`/api/superadmin/users/${user.id}`, { method: 'PATCH' });
      const data = await res.json();
      if (!res.ok) { showToast(data.error ?? 'Failed to update status', 'error'); return; }
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: data.status } : u));
      showToast(`${user.name} ${data.status === 'active' ? 'activated' : 'deactivated'}`);
    } catch {
      showToast('Network error — please try again', 'error');
    }
  };

  // ── Error screen ────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="p-4 lg:p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-2xl bg-error/8 flex items-center justify-center">
          <Icon name="AlertTriangle" size={28} className="text-error" />
        </div>
        <p className="font-display text-base font-800 text-foreground">Failed to load users</p>
        <p className="text-sm text-muted">{fetchError}</p>
        <button
          onClick={() => { setFetchError(null); setLoading(true); window.location.reload(); }}
          className="px-4 py-2 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Users</h1>
          <p className="text-sm text-muted mt-0.5">Manage all platform users across every role</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors"
        >
          <Icon name="UserPlus" size={15} />
          Add User
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {([
          { role: 'all',        label: 'Total Users',  count: users.length,                                                 bg: 'bg-rose-50',    text: 'text-rose-600',    icon: 'Users'          },
          { role: 'student',    label: 'Students',     count: users.filter(u => u.role === 'student').length,               bg: 'bg-primary/8',  text: 'text-primary',     icon: 'GraduationCap'  },
          { role: 'teacher',    label: 'Teachers',     count: users.filter(u => u.role === 'teacher').length,               bg: 'bg-emerald-50', text: 'text-emerald-600', icon: 'BookOpen'       },
          { role: 'principal',  label: 'Admins',       count: users.filter(u => u.role === 'principal' || u.role === 'superadmin').length, bg: 'bg-amber-50', text: 'text-amber-600', icon: 'ShieldCheck' },
        ] as const).map(s => (
          <button
            key={s.role}
            onClick={() => setRoleFilter(s.role === 'all' ? 'all' : s.role as UserRole)}
            className={`bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3 text-left hover:border-rose-200 transition-colors ${
              roleFilter === s.role ? 'border-rose-200 bg-rose-50/30' : ''
            }`}
          >
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <Icon name={s.icon} size={18} className={s.text} />
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">{s.label}</p>
              <p className="font-display text-2xl font-800 text-foreground leading-none">{s.count}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'student', 'teacher', 'principal', 'superadmin'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-xl text-xs font-700 border transition-all capitalize ${
                roleFilter === r
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-background text-muted border-border/60 hover:text-foreground'
              }`}
            >
              {r === 'all' ? 'All Roles' : r === 'superadmin' ? 'Super Admin' : r === 'principal' ? 'Principal' : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
          <button
            onClick={() => setStatusFilter(statusFilter === 'inactive' ? 'all' : 'inactive')}
            className={`px-3 py-2 rounded-xl text-xs font-700 border transition-all ${
              statusFilter === 'inactive'
                ? 'bg-error/10 text-error border-error/20'
                : 'bg-background text-muted border-border/60 hover:text-foreground'
            }`}
          >
            Inactive Only
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-background">
                <th className="text-left text-xs font-700 text-muted px-5 py-3">User</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3">Role</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden md:table-cell">Details</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden lg:table-cell">Status</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden lg:table-cell">Last Login</th>
                <th className="text-left text-xs font-700 text-muted px-4 py-3 hidden xl:table-cell">Created</th>
                <th className="text-right text-xs font-700 text-muted px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                : filtered.length === 0
                ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <Icon name="Users" size={28} className="text-muted mx-auto mb-2" />
                      <p className="text-sm text-muted">No users match your filters</p>
                    </td>
                  </tr>
                )
                : filtered.map(user => {
                const rc = ROLE_CONFIG[user.role];
                return (
                  <tr key={user.id} className="hover:bg-background/60 transition-colors group">
                    {/* User */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl ${rc.bg} flex items-center justify-center font-700 text-xs flex-shrink-0 ${rc.text}`}>
                          {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-700 text-foreground truncate">{user.name}</p>
                          <p className="text-2xs text-muted truncate">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-2xs font-700 ${rc.bg} ${rc.text}`}>
                        {rc.label}
                      </span>
                    </td>
                    {/* Details */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-xs text-muted">
                        {user.role === 'student'
                          ? `Grade ${user.grade}-${user.section} · ${user.rollNumber}`
                          : user.role === 'teacher'
                          ? `${user.subject} · ${user.department}`
                          : user.department}
                      </p>
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className={`px-2 py-0.5 rounded-full text-2xs font-700 ${
                        user.status === 'active'
                          ? 'bg-success/8 text-success'
                          : 'bg-border/40 text-muted'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    {/* Last Login */}
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-xs text-muted">{user.lastLogin}</p>
                    </td>
                    {/* Created */}
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <p className="text-xs text-muted">{user.createdAt}</p>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3">
                      {(user.role === 'superadmin' || user.role === 'principal') ? (
                        <div className="flex justify-end">
                          <span className={`px-2 py-1 rounded-lg text-2xs font-700 border ${
                            user.role === 'superadmin'
                              ? 'bg-rose-50 text-rose-400 border-rose-200'
                              : 'bg-amber-50 text-amber-500 border-amber-200'
                          }`}>
                            Protected
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEdit(user)}
                            title="Edit user"
                            className="p-1.5 text-muted hover:text-primary hover:bg-primary/8 rounded-lg transition-colors"
                          >
                            <Icon name="Edit" size={14} />
                          </button>
                          <button
                            title={user.status === 'active' ? 'Deactivate' : 'Activate'}
                            onClick={() => toggleStatus(user)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              user.status === 'active'
                                ? 'text-muted hover:text-warning hover:bg-warning/8'
                                : 'text-muted hover:text-success hover:bg-success/8'
                            }`}
                          >
                            <Icon name={user.status === 'active' ? 'UserX' : 'UserCheck'} size={14} />
                          </button>
                          <button
                            onClick={() => openDelete(user)}
                            title="Delete user"
                            className="p-1.5 text-muted hover:text-error hover:bg-error/8 rounded-lg transition-colors"
                          >
                            <Icon name="Trash2" size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border/40 bg-background flex items-center justify-between">
          <p className="text-xs text-muted">{filtered.length} of {users.length} users</p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-xs font-700 text-muted bg-white border border-border/60 rounded-lg hover:bg-background transition-colors">← Prev</button>
            <button className="px-3 py-1.5 text-xs font-700 text-foreground bg-white border border-border/60 rounded-lg">1</button>
            <button className="px-3 py-1.5 text-xs font-700 text-muted bg-white border border-border/60 rounded-lg hover:bg-background transition-colors">Next →</button>
          </div>
        </div>
      </div>

      {/* ── Create / Edit Modal ────────────────────────────────────────────── */}
      {(showModal === 'create' || showModal === 'edit') && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-lg max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/40 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-display text-base font-800 text-foreground">
                  {showModal === 'create' ? 'Add New User' : `Edit — ${selected?.name}`}
                </h3>
                <p className="text-xs text-muted mt-0.5">Fill in the user details below</p>
              </div>
              <button onClick={() => setShowModal(null)} className="text-muted hover:text-foreground p-1">
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Full Name *</label>
                  <input
                    type="text" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Email Address *</label>
                  <input
                    type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="user@school.edu.in"
                    className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300"
                  />
                </div>
              </div>

              {/* Role + Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Role *</label>
                  <select
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value as UserRole }))}
                    className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-rose-300"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option
                      value="principal"
                      disabled={hasPrincipal && selected?.role !== 'principal'}
                    >
                      Principal{hasPrincipal && selected?.role !== 'principal' ? ' (already assigned)' : ''}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Status</label>
                  <div className="flex gap-2">
                    {(['active', 'inactive'] as UserStatus[]).map(s => (
                      <button
                        key={s} type="button"
                        onClick={() => setForm(f => ({ ...f, status: s }))}
                        className={`flex-1 py-2 rounded-xl text-xs font-700 border capitalize transition-all ${
                          form.status === s
                            ? s === 'active'
                              ? 'bg-success/8 text-success border-success/20'
                              : 'bg-error/8 text-error border-error/20'
                            : 'bg-background text-muted border-border/60'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Role-specific fields */}
              {form.role === 'student' && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-700 text-foreground mb-1.5">Grade</label>
                    <select value={form.grade} onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
                      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-rose-300">
                      {['6','7','8','9','10','11','12'].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-700 text-foreground mb-1.5">Section</label>
                    <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))}
                      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-rose-300">
                      {['A','B','C','D'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-700 text-foreground mb-1.5">Roll No.</label>
                    <input type="text" value={form.rollNumber} placeholder="SR-XXXX"
                      onChange={e => setForm(f => ({ ...f, rollNumber: e.target.value }))}
                      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300" />
                  </div>
                </div>
              )}

              {(form.role === 'teacher' || form.role === 'principal') && (
                <div className="grid grid-cols-2 gap-3">
                  {form.role === 'teacher' && (
                    <div>
                      <label className="block text-xs font-700 text-foreground mb-1.5">Subject</label>
                      <input type="text" value={form.subject} placeholder="e.g. Mathematics"
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300" />
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-700 text-foreground mb-1.5">Department</label>
                    <input type="text" value={form.department} placeholder="e.g. Science & Maths"
                      onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300" />
                  </div>
                </div>
              )}

              {/* Phone + Password (create only) */}
              <div className={`grid gap-3 ${showModal === 'create' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} placeholder="+91 XXXXX XXXXX"
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300" />
                </div>
                {showModal === 'create' && (
                  <div>
                    <label className="block text-xs font-700 text-foreground mb-1.5">Initial Password *</label>
                    <input type="password" value={form.password} placeholder="Min. 8 characters"
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-rose-300" />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button onClick={() => setShowModal(null)}
                  className="px-4 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={showModal === 'create' ? handleCreate : handleEdit}
                  disabled={saving}
                  className="flex-1 py-2 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {saving && <Icon name="Loader" size={14} className="animate-spin" />}
                  {showModal === 'create' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────────────────── */}
      {showModal === 'delete' && selected && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-sm p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-error/8 flex items-center justify-center mx-auto mb-4">
              <Icon name="UserX" size={26} className="text-error" />
            </div>
            <h3 className="font-display text-base font-800 text-foreground mb-2">Delete User?</h3>
            <p className="text-sm text-muted mb-5">
              This will permanently delete <strong className="text-foreground">{selected.name}</strong> ({selected.email}). This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowModal(null)}
                className="flex-1 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="flex-1 py-2.5 bg-error text-white text-sm font-700 rounded-xl hover:bg-error/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                {saving && <Icon name="Loader" size={14} className="animate-spin" />}
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}

    </div>
  );
}
