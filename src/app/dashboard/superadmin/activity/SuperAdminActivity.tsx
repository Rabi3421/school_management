'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type ActionCategory = 'auth' | 'user' | 'academic' | 'admin' | 'system' | 'security';
type UserRole = 'student' | 'teacher' | 'principal' | 'superadmin';

interface ActivityLog {
  id: number;
  user: string;
  email: string;
  role: UserRole;
  action: string;
  category: ActionCategory;
  detail: string;
  ip: string;
  device: string;
  school: string;
  timestamp: string;
  date: string;   // for grouping
  success: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const LOGS: ActivityLog[] = [
  // Today
  { id: 1,  user: 'School Super Admin',   email: 'schoolsuperadmin@gmail.com',  role: 'superadmin', action: 'Reset password',         category: 'security', detail: 'Password reset for Deepak Nair (teacher)',       ip: '192.168.1.10', device: 'Chrome · macOS',   school: 'Platform',          timestamp: '09:42 AM', date: 'Today', success: true  },
  { id: 2,  user: 'Anita Sharma',         email: 'principal@demo.com',   role: 'principal',  action: 'Published notice',        category: 'academic', detail: 'Notice: "Parent-Teacher Meeting — Apr 10"',      ip: '10.0.0.5',     device: 'Chrome · Windows', school: 'Greenwood Academy', timestamp: '09:31 AM', date: 'Today', success: true  },
  { id: 3,  user: 'Meera Iyer',           email: 'teacher@demo.com',     role: 'teacher',    action: 'Marked attendance',       category: 'academic', detail: 'Attendance marked for Class 10-A (38 present)',  ip: '10.0.0.12',    device: 'Firefox · macOS',  school: 'Greenwood Academy', timestamp: '09:15 AM', date: 'Today', success: true  },
  { id: 4,  user: 'Arjun Sharma',         email: 'student@demo.com',     role: 'student',    action: 'Submitted assignment',    category: 'academic', detail: 'Physics Assignment #4 — Chapter 6 (12 pages)',   ip: '10.0.0.44',    device: 'Chrome · Android', school: 'Greenwood Academy', timestamp: '08:52 AM', date: 'Today', success: true  },
  { id: 5,  user: 'Unknown',              email: 'hacker@test.com',      role: 'student',    action: 'Failed login',            category: 'security', detail: '3 consecutive failed login attempts from same IP', ip: '45.33.32.156', device: 'Unknown',           school: 'N/A',               timestamp: '08:20 AM', date: 'Today', success: false },
  { id: 6,  user: 'Kavya Reddy',          email: 'kavya.r@school.in',    role: 'student',    action: 'Logged in',               category: 'auth',     detail: 'Session started — web browser',                  ip: '10.0.0.88',    device: 'Safari · iOS',     school: 'Greenwood Academy', timestamp: '08:05 AM', date: 'Today', success: true  },
  { id: 7,  user: 'Rajiv Kumar',          email: 'rajiv.k@school.in',    role: 'teacher',    action: 'Created assignment',      category: 'academic', detail: 'Physics Unit Test — Class 11 (due Apr 8)',        ip: '10.0.0.15',    device: 'Chrome · Windows', school: 'Greenwood Academy', timestamp: '07:55 AM', date: 'Today', success: true  },
  { id: 8,  user: 'School Super Admin',   email: 'schoolsuperadmin@gmail.com',  role: 'superadmin', action: 'Added school',            category: 'admin',    detail: 'Lotus Public School (LPS-003) registered on platform', ip: '192.168.1.10', device: 'Chrome · macOS', school: 'Platform',         timestamp: '07:30 AM', date: 'Today', success: true  },

  // Yesterday
  { id: 9,  user: 'School Super Admin',   email: 'schoolsuperadmin@gmail.com',  role: 'superadmin', action: 'Deactivated account',     category: 'admin',    detail: 'Account Deepak Nair set to inactive (policy)',   ip: '192.168.1.10', device: 'Chrome · macOS',   school: 'Platform',          timestamp: '04:15 PM', date: 'Yesterday', success: true  },
  { id: 10, user: 'Vikram Joshi',         email: 'vikram.j@school.in',   role: 'principal',  action: 'Exported report',         category: 'admin',    detail: 'Attendance report — March 2026 (PDF, 14 pages)',  ip: '10.0.1.5',     device: 'Chrome · Windows', school: 'Sunrise International', timestamp: '02:30 PM', date: 'Yesterday', success: true },
  { id: 11, user: 'Sunita Verma',         email: 'sunita.v@school.in',   role: 'teacher',    action: 'Published grades',        category: 'academic', detail: 'English Term-2 grades for Class 9-A (32 students)', ip: '10.0.0.19', device: 'Firefox · Windows', school: 'Greenwood Academy', timestamp: '01:12 PM', date: 'Yesterday', success: true },
  { id: 12, user: 'Priya Mehta',          email: 'priya.m@school.in',    role: 'student',    action: 'Downloaded timetable',    category: 'academic', detail: 'Timetable PDF downloaded — Class 9-B',            ip: '10.0.0.65',    device: 'Chrome · Android', school: 'Greenwood Academy', timestamp: '11:45 AM', date: 'Yesterday', success: true  },
  { id: 13, user: 'School Super Admin',   email: 'schoolsuperadmin@gmail.com', role: 'superadmin', action: 'System config change',    category: 'system',   detail: 'Session timeout changed: 30 min → 60 min',        ip: '192.168.1.10', device: 'Chrome · macOS',   school: 'Platform',          timestamp: '10:00 AM', date: 'Yesterday', success: true  },
  { id: 14, user: 'Rohan Gupta',          email: 'rohan.g@school.in',    role: 'student',    action: 'Logged out',              category: 'auth',     detail: 'Session ended normally',                          ip: '10.0.0.72',    device: 'Chrome · Windows', school: 'Greenwood Academy', timestamp: '09:30 AM', date: 'Yesterday', success: true  },

  // 2 days ago
  { id: 15, user: 'Anita Sharma',         email: 'principal@demo.com',   role: 'principal',  action: 'Created user',            category: 'user',     detail: 'New student account: Kavya Reddy (Class 12-A)',   ip: '10.0.0.5',     device: 'Chrome · Windows', school: 'Greenwood Academy', timestamp: '03:50 PM', date: 'Mar 31, 2026', success: true  },
  { id: 16, user: 'Meera Iyer',           email: 'teacher@demo.com',     role: 'teacher',    action: 'Updated fee record',      category: 'admin',    detail: 'Waiver applied: Arjun Sharma — ₹1,500 sports fee', ip: '10.0.0.12', device: 'Firefox · macOS',  school: 'Greenwood Academy',  timestamp: '02:10 PM', date: 'Mar 31, 2026', success: true },
  { id: 17, user: 'School Super Admin',   email: 'schoolsuperadmin@gmail.com',  role: 'superadmin', action: 'Force password reset',    category: 'security', detail: 'Force-reset flag set for Sneha Patel (student)',  ip: '192.168.1.10', device: 'Chrome · macOS',   school: 'Platform',          timestamp: '11:20 AM', date: 'Mar 31, 2026', success: true  },
  { id: 18, user: 'Deepak Nair',          email: 'deepak.n@school.in',   role: 'teacher',    action: 'Failed login (×5)',       category: 'security', detail: 'Account locked after 5 failed attempts',          ip: '172.16.0.4',   device: 'Chrome · Windows', school: 'Greenwood Academy', timestamp: '08:35 AM', date: 'Mar 31, 2026', success: false },
];

const CATEGORY_CONFIG: Record<ActionCategory, { bg: string; text: string; icon: string; label: string }> = {
  auth:     { bg: 'bg-primary/8',   text: 'text-primary',     icon: 'LogIn',       label: 'Auth'     },
  user:     { bg: 'bg-emerald-50',  text: 'text-emerald-700', icon: 'UserCog',     label: 'User'     },
  academic: { bg: 'bg-amber-50',    text: 'text-amber-700',   icon: 'BookOpen',    label: 'Academic' },
  admin:    { bg: 'bg-violet-50',   text: 'text-violet-700',  icon: 'Settings2',   label: 'Admin'    },
  system:   { bg: 'bg-sky-50',      text: 'text-sky-700',     icon: 'Server',      label: 'System'   },
  security: { bg: 'bg-rose-50',     text: 'text-rose-600',    icon: 'ShieldAlert', label: 'Security' },
};

const ROLE_CONFIG: Record<UserRole, { bg: string; text: string; label: string }> = {
  student:    { bg: 'bg-primary/8',  text: 'text-primary',     label: 'Student'     },
  teacher:    { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Teacher'     },
  principal:  { bg: 'bg-amber-50',   text: 'text-amber-700',   label: 'Principal'   },
  superadmin: { bg: 'bg-rose-50',    text: 'text-rose-600',    label: 'Super Admin' },
};

// ─── Log Detail Modal ─────────────────────────────────────────────────────────
function LogDetailModal({ log, onClose }: { log: ActivityLog; onClose: () => void }) {
  const cat = CATEGORY_CONFIG[log.category];
  const role = ROLE_CONFIG[log.role];
  return (
    <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-md">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/40">
          <div>
            <h3 className="font-display text-base font-800 text-foreground">Event Details</h3>
            <p className="text-xs text-muted mt-0.5">{log.date} at {log.timestamp}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground p-1"><Icon name="X" size={16} /></button>
        </div>

        <div className="p-6 space-y-4">
          {/* User */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${role.bg} flex items-center justify-center font-700 font-display ${role.text} text-sm flex-shrink-0`}>
              {log.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="font-700 text-sm text-foreground">{log.user}</div>
              <div className="text-xs text-muted">{log.email}</div>
            </div>
            <span className={`ml-auto px-2.5 py-1 rounded-lg text-xs font-700 ${role.bg} ${role.text}`}>{role.label}</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Action',   value: log.action,  icon: cat.icon },
              { label: 'Category', value: <span className={`px-2.5 py-1 rounded-lg text-xs font-700 ${cat.bg} ${cat.text}`}>{cat.label}</span>, icon: 'Tag' },
              { label: 'Detail',   value: log.detail,  icon: 'AlignLeft' },
              { label: 'School',   value: log.school,  icon: 'Building2' },
              { label: 'IP',       value: log.ip,      icon: 'Globe' },
              { label: 'Device',   value: log.device,  icon: 'Monitor' },
              { label: 'Result',   value: <span className={`px-2.5 py-1 rounded-lg text-xs font-700 ${log.success ? 'bg-success/8 text-success' : 'bg-danger/8 text-danger'}`}>{log.success ? '✓ Success' : '✕ Failed'}</span>, icon: 'CheckCircle2' },
            ].map(r => (
              <div key={r.label} className="flex items-start gap-3 text-sm">
                <Icon name={r.icon} size={14} className="text-muted flex-shrink-0 mt-0.5" />
                <span className="text-muted min-w-[72px] text-xs pt-0.5">{r.label}</span>
                <span className="text-foreground text-xs font-700 flex-1">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-5">
          <button onClick={onClose} className="w-full py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SuperAdminActivity() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [catFilter, setCatFilter] = useState<ActionCategory | 'all'>('all');
  const [resultFilter, setResultFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [viewLog, setViewLog] = useState<ActivityLog | null>(null);
  const [visibleDates, setVisibleDates] = useState(2); // show 2 date groups initially

  const exportCSV = () => {
    const headers = ['Date', 'Time', 'User', 'Email', 'Role', 'Action', 'Category', 'Detail', 'School', 'IP', 'Device', 'Result'];
    const rows = filtered.map(l => [
      l.date, l.timestamp, l.user, l.email, l.role,
      l.action, l.category, `"${l.detail.replace(/"/g, '""')}"`,
      l.school, l.ip, l.device, l.success ? 'Success' : 'Failed',
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = useMemo(() => {
    setVisibleDates(2); // reset pagination whenever filters change
    return LOGS.filter(l => {
      const q = search.toLowerCase();
      const matchSearch = !q || l.user.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.detail.toLowerCase().includes(q);
      const matchRole   = roleFilter === 'all' || l.role === roleFilter;
      const matchCat    = catFilter  === 'all' || l.category === catFilter;
      const matchResult = resultFilter === 'all' || (resultFilter === 'success' ? l.success : !l.success);
      return matchSearch && matchRole && matchCat && matchResult;
    });
  }, [search, roleFilter, catFilter, resultFilter]);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, ActivityLog[]>();
    for (const log of filtered) {
      if (!map.has(log.date)) map.set(log.date, []);
      map.get(log.date)!.push(log);
    }
    return map;
  }, [filtered]);

  // Slice grouped to only show visibleDates date groups
  const groupedEntries = Array.from(grouped.entries());
  const visibleGroups  = groupedEntries.slice(0, visibleDates);
  const hasMore        = groupedEntries.length > visibleDates;

  // Stats
  const todayAll     = LOGS.filter(l => l.date === 'Today');
  const todayLogins  = todayAll.filter(l => l.category === 'auth' && l.success).length;
  const adminActions = todayAll.filter(l => l.role === 'superadmin' || l.role === 'principal').length;
  const failedAuths  = LOGS.filter(l => !l.success).length;

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Activity Log</h1>
          <p className="text-sm text-muted mt-0.5">Full audit trail of all system events across all users</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-background transition-colors shadow-soft self-start sm:self-auto"
        >
          <Icon name="Download" size={14} />
          Export CSV
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Actions Today',   value: todayAll.length, icon: 'Activity',      bg: 'bg-primary/8',   color: 'text-primary',     sub: 'across all users'     },
          { label: 'Logins Today',    value: todayLogins,     icon: 'LogIn',         bg: 'bg-emerald-50',  color: 'text-emerald-600', sub: 'successful sessions'  },
          { label: 'Admin Actions',   value: adminActions,    icon: 'ShieldCheck',   bg: 'bg-rose-50',     color: 'text-rose-500',    sub: 'principals & superadmin'},
          { label: 'Failed Events',   value: failedAuths,     icon: 'AlertTriangle', bg: 'bg-danger/8',    color: 'text-danger',      sub: 'needs review'         },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Icon name={s.icon} size={16} className={s.color} />
            </div>
            <div>
              <div className="font-display text-xl font-800 text-foreground leading-tight">{s.value}</div>
              <div className="text-xs font-700 text-foreground">{s.label}</div>
              <div className="text-2xs text-muted">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by user, action or detail..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Role filter */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-muted font-700 mr-1">Role:</span>
            {(['all', 'student', 'teacher', 'principal', 'superadmin'] as const).map(r => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-700 capitalize transition-all ${
                  roleFilter === r
                    ? 'bg-rose-500 text-white'
                    : 'bg-background border border-border/60 text-muted hover:text-foreground'
                }`}>
                {r === 'all' ? 'All' : r === 'superadmin' ? 'Super Admin' : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <div className="w-px bg-border/40 self-stretch hidden sm:block" />

          {/* Category filter */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-muted font-700 mr-1">Category:</span>
            {(['all', 'auth', 'academic', 'admin', 'security', 'system', 'user'] as const).map(c => {
              const cfg = c !== 'all' ? CATEGORY_CONFIG[c] : null;
              return (
                <button key={c} onClick={() => setCatFilter(c)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-700 capitalize transition-all ${
                    catFilter === c
                      ? 'bg-rose-500 text-white'
                      : 'bg-background border border-border/60 text-muted hover:text-foreground'
                  }`}>
                  {c === 'all' ? 'All' : cfg?.label}
                </button>
              );
            })}
          </div>

          <div className="w-px bg-border/40 self-stretch hidden sm:block" />

          {/* Result filter */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted font-700 mr-1">Result:</span>
            {([
              { v: 'all',     l: 'All'      },
              { v: 'success', l: '✓ Success' },
              { v: 'failed',  l: '✕ Failed'  },
            ] as const).map(r => (
              <button key={r.v} onClick={() => setResultFilter(r.v)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-700 transition-all ${
                  resultFilter === r.v
                    ? 'bg-rose-500 text-white'
                    : 'bg-background border border-border/60 text-muted hover:text-foreground'
                }`}>
                {r.l}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter count */}
        <div className="flex items-center justify-between pt-1 border-t border-border/30">
          <span className="text-xs text-muted">
            Showing <strong className="text-foreground">{filtered.length}</strong> of <strong className="text-foreground">{LOGS.length}</strong> events
          </span>
          {(search || roleFilter !== 'all' || catFilter !== 'all' || resultFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setRoleFilter('all'); setCatFilter('all'); setResultFilter('all'); }}
              className="text-xs text-rose-600 font-700 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Activity timeline */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-12 text-center">
          <Icon name="SearchX" size={32} className="mx-auto mb-3 text-border" />
          <p className="text-sm text-muted">No activity logs match your filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleGroups.map(([date, logs]) => (
            <div key={date}>
              {/* Date separator */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-background rounded-xl border border-border/60">
                  <Icon name="Calendar" size={12} className="text-muted" />
                  <span className="text-xs font-700 text-foreground">{date}</span>
                </div>
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-xs text-muted">{logs.length} event{logs.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Log entries */}
              <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden divide-y divide-border/30">
                {logs.map((log, idx) => {
                  const cat  = CATEGORY_CONFIG[log.category];
                  const role = ROLE_CONFIG[log.role];
                  return (
                    <button
                      key={log.id}
                      onClick={() => setViewLog(log)}
                      className="w-full flex items-start gap-4 px-5 py-4 hover:bg-background/50 transition-colors text-left group"
                    >
                      {/* Timeline dot */}
                      <div className="flex flex-col items-center flex-shrink-0 mt-1">
                        <div className={`w-8 h-8 rounded-xl ${log.success ? cat.bg : 'bg-danger/8'} flex items-center justify-center`}>
                          <Icon name={log.success ? cat.icon : 'AlertCircle'} size={14} className={log.success ? cat.text : 'text-danger'} />
                        </div>
                        {idx < logs.length - 1 && <div className="w-px h-4 bg-border/30 mt-1" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-700 text-foreground group-hover:text-rose-600 transition-colors">{log.action}</span>
                          {!log.success && (
                            <span className="px-2 py-0.5 rounded-md text-2xs font-700 bg-danger/8 text-danger">Failed</span>
                          )}
                          <span className={`px-2 py-0.5 rounded-md text-2xs font-700 ${cat.bg} ${cat.text} hidden sm:inline`}>{cat.label}</span>
                        </div>
                        <p className="text-xs text-muted line-clamp-1 mb-1.5">{log.detail}</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className={`w-5 h-5 rounded-md ${role.bg} flex items-center justify-center text-2xs font-700 ${role.text}`}>
                              {log.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <span className="text-xs text-muted">{log.user}</span>
                            <span className={`px-1.5 py-0.5 rounded text-2xs font-700 ${role.bg} ${role.text}`}>{role.label}</span>
                          </div>
                          <span className="text-2xs text-border">·</span>
                          <span className="text-2xs text-muted flex items-center gap-1"><Icon name="Globe" size={10} />{log.ip}</span>
                          <span className="text-2xs text-border hidden sm:inline">·</span>
                          <span className="text-2xs text-muted hidden sm:flex items-center gap-1"><Icon name="Monitor" size={10} />{log.device}</span>
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="text-xs text-muted flex-shrink-0 flex items-center gap-1 mt-1">
                        <Icon name="Clock" size={11} />
                        {log.timestamp}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {filtered.length > 0 && hasMore && (
        <div className="flex justify-center pb-4">
          <button
            onClick={() => setVisibleDates(v => v + 2)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border/60 text-sm font-700 text-muted rounded-xl hover:text-foreground hover:bg-background transition-colors shadow-soft"
          >
            <Icon name="ChevronDown" size={14} />
            Load older events ({groupedEntries.length - visibleDates} more group{groupedEntries.length - visibleDates !== 1 ? 's' : ''})
          </button>
        </div>
      )}

      {/* Log detail modal */}
      {viewLog && <LogDetailModal log={viewLog} onClose={() => setViewLog(null)} />}
    </div>
  );
}
