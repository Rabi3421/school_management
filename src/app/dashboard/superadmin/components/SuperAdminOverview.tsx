'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ─── Data ─────────────────────────────────────────────────────────────────────
const loginActivity = [
  { day: 'Mon', students: 312, teachers: 38, admins: 4 },
  { day: 'Tue', students: 290, teachers: 42, admins: 3 },
  { day: 'Wed', students: 345, teachers: 40, admins: 5 },
  { day: 'Thu', students: 275, teachers: 35, admins: 4 },
  { day: 'Fri', students: 360, teachers: 44, admins: 6 },
  { day: 'Sat', students: 80,  teachers: 12, admins: 2 },
  { day: 'Sun', students: 40,  teachers: 5,  admins: 1 },
];

const signupTrend = [
  { month: 'Oct', users: 12 },
  { month: 'Nov', users: 18 },
  { month: 'Dec', users: 8  },
  { month: 'Jan', users: 22 },
  { month: 'Feb', users: 31 },
  { month: 'Mar', users: 27 },
  { month: 'Apr', users: 5  },
];

const recentActivity = [
  { user: 'student@demo.com',    role: 'student',    action: 'Logged in',                  time: '2 min ago',    icon: 'LogIn'       },
  { user: 'teacher@demo.com',    role: 'teacher',    action: 'Updated attendance record',  time: '8 min ago',    icon: 'ClipboardCheck' },
  { user: 'principal@demo.com',  role: 'principal',  action: 'Published notice: PTM',      time: '22 min ago',   icon: 'Megaphone'   },
  { user: 'schoolsuperadmin@gmail.com', role: 'superadmin', action: 'Reset password for user #42',time: '1 hr ago',     icon: 'KeyRound'    },
  { user: 'meera.iyer@school.in',role: 'teacher',    action: 'Created 3 assignments',      time: '2 hr ago',     icon: 'FilePlus'    },
  { user: 'arjun.s@school.in',   role: 'student',    action: 'Submitted assignment',       time: '3 hr ago',     icon: 'Upload'      },
  { user: 'principal@demo.com',  role: 'principal',  action: 'Exported attendance report', time: 'Yesterday',    icon: 'Download'    },
];

const ROLE_COLORS: Record<string, string> = {
  student:    'bg-primary/8 text-primary',
  teacher:    'bg-emerald-50 text-emerald-700',
  principal:  'bg-amber-50 text-amber-700',
  superadmin: 'bg-rose-50 text-rose-600',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function SuperAdminOverview() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshKey(k => k + 1);
    }, 1200);
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">System Overview</h1>
          <p className="text-sm text-muted mt-0.5">Platform-wide metrics and live activity</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-success/8 border border-success/20 text-success text-xs font-700 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            All systems operational
          </span>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-background transition-colors shadow-soft disabled:opacity-60"
          >
            <Icon name="RefreshCw" size={13} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Stat cards — key forces re-mount (fresh animation) on refresh */}
      <div key={`stats-${refreshKey}`} className={`grid grid-cols-2 lg:grid-cols-4 gap-3 transition-opacity duration-300 ${refreshing ? 'opacity-40' : 'opacity-100'}`}>
        {[
          { icon: 'Users',       label: 'Total Users',       value: '1,284', sub: '+5 this week',      iconBg: 'bg-primary/10',   iconColor: 'text-primary'     },
          { icon: 'GraduationCap',label:'Students',          value: '620',   sub: '47 active today',   iconBg: 'bg-primary/8',    iconColor: 'text-primary'     },
          { icon: 'BookOpen',    label: 'Teachers',          value: '58',    sub: '42 active today',   iconBg: 'bg-emerald-50',   iconColor: 'text-emerald-600' },
          { icon: 'Building2',   label: 'Schools',           value: '1',     sub: 'Greenwood Academy', iconBg: 'bg-amber-50',     iconColor: 'text-amber-600'   },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon name={s.icon} size={18} className={s.iconColor} />
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">{s.label}</p>
              <p className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</p>
              <p className="text-2xs text-muted mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Second row stats */}
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 transition-opacity duration-300 ${refreshing ? 'opacity-40' : 'opacity-100'}`}>
        {[
          { icon: 'ShieldCheck',  label: 'Active Sessions',   value: '143',  sub: 'Right now',             iconBg: 'bg-rose-50',      iconColor: 'text-rose-600'    },
          { icon: 'AlertTriangle',label: 'Failed Logins',     value: '7',    sub: 'Last 24h',              iconBg: 'bg-warning/10',   iconColor: 'text-warning'     },
          { icon: 'KeyRound',     label: 'Password Resets',   value: '3',    sub: 'This week',             iconBg: 'bg-border/40',    iconColor: 'text-muted'       },
          { icon: 'UserX',        label: 'Inactive Accounts', value: '12',   sub: 'Not logged in 30d',     iconBg: 'bg-border/40',    iconColor: 'text-muted'       },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon name={s.icon} size={18} className={s.iconColor} />
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">{s.label}</p>
              <p className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</p>
              <p className="text-2xs text-muted mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Login activity */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border/60 shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-800 text-foreground font-display">Daily Login Activity</p>
              <p className="text-xs text-muted">This week by role</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={loginActivity} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="gTeachers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10B981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Area type="monotone" dataKey="students" stroke="#6366F1" strokeWidth={2} fill="url(#gStudents)" name="Students" />
              <Area type="monotone" dataKey="teachers" stroke="#10B981" strokeWidth={2} fill="url(#gTeachers)" name="Teachers" />
              <Area type="monotone" dataKey="admins"   stroke="#F59E0B" strokeWidth={2} fill="none"            name="Admins"   />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 justify-center">
            {[{ color: 'bg-primary', label: 'Students' }, { color: 'bg-emerald-500', label: 'Teachers' }, { color: 'bg-amber-500', label: 'Admins' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                <span className="text-xs text-muted">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signup trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-soft p-5">
          <div className="mb-4">
            <p className="text-sm font-800 text-foreground font-display">New Signups</p>
            <p className="text-xs text-muted">Monthly new user registrations</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={signupTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }} />
              <Bar dataKey="users" fill="#f43f5e" radius={[6, 6, 0, 0]} name="New Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User distribution + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* User distribution */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-soft p-5">
          <p className="text-sm font-800 text-foreground font-display mb-4">User Distribution</p>
          <div className="space-y-3">
            {[
              { label: 'Students',    count: 620,  pct: 48, color: 'bg-primary'       },
              { label: 'Parents',     count: 580,  pct: 45, color: 'bg-accent'        },
              { label: 'Teachers',    count: 58,   pct:  5, color: 'bg-emerald-500'   },
              { label: 'Principals',  count: 4,    pct:  0.5, color: 'bg-amber-500'   },
              { label: 'Super Admins',count: 2,    pct:  0.5, color: 'bg-rose-500'    },
            ].map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-700 text-foreground">{r.label}</span>
                  <span className="text-muted">{r.count} users</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${r.color}`} style={{ width: `${Math.max(r.pct, 3)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border/60 shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-800 text-foreground font-display">Recent Activity</p>
            <button
              onClick={() => router.push('/dashboard/superadmin/activity')}
              className="text-xs text-primary font-700 hover:text-primary/70 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-1">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0">
                <div className="w-8 h-8 rounded-xl bg-background flex items-center justify-center flex-shrink-0">
                  <Icon name={a.icon} size={14} className="text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-700 text-foreground truncate">{a.action}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-2xs font-700 px-1.5 py-0.5 rounded-full ${ROLE_COLORS[a.role]}`}>
                      {a.role}
                    </span>
                    <span className="text-2xs text-muted truncate">{a.user}</span>
                  </div>
                </div>
                <span className="text-2xs text-muted flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
