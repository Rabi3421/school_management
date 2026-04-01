'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { month: 'Oct', pct: 96 }, { month: 'Nov', pct: 92 }, { month: 'Dec', pct: 88 },
  { month: 'Jan', pct: 94 }, { month: 'Feb', pct: 97 }, { month: 'Mar', pct: 95 },
];

const subjects = [
  { name: 'Mathematics', marks: 88, max: 100, grade: 'A', color: '#1C4ED8' },
  { name: 'Science', marks: 92, max: 100, grade: 'A+', color: '#10B981' },
  { name: 'English', marks: 79, max: 100, grade: 'B+', color: '#0EA5E9' },
  { name: 'Social Studies', marks: 85, max: 100, grade: 'A', color: '#8B5CF6' },
  { name: 'Hindi', marks: 90, max: 100, grade: 'A+', color: '#F59E0B' },
];

const timetableToday = [
  { time: '8:00–8:45', subject: 'Mathematics', teacher: 'Mrs. Meera Iyer', room: 'C-204' },
  { time: '8:45–9:30', subject: 'English', teacher: 'Mr. Anil Kapoor', room: 'C-101' },
  { time: '9:30–10:15', subject: 'Science', teacher: 'Mrs. Priya Nair', room: 'Lab-1' },
  { time: '10:30–11:15', subject: 'Social Studies', teacher: 'Mr. Ramesh Kumar', room: 'C-205' },
  { time: '11:15–12:00', subject: 'Hindi', teacher: 'Mrs. Sunita Devi', room: 'C-203' },
  { time: '1:00–1:45', subject: 'Physical Education', teacher: 'Mr. Suresh Rao', room: 'Ground' },
];

const assignments = [
  { subject: 'Science', title: 'Research: Photosynthesis process', due: 'Today', status: 'pending' },
  { subject: 'Mathematics', title: 'Chapter 12 Exercise — Probability', due: 'Apr 2', status: 'pending' },
  { subject: 'English', title: 'Essay: My Favourite Season', due: 'Apr 4', status: 'submitted' },
  { subject: 'Hindi', title: 'निबंध: मेरा प्रिय त्योहार', due: 'Apr 5', status: 'pending' },
];

const notices = [
  { title: 'Annual Sports Day — April 10, 2026', tag: 'Event', color: 'text-primary bg-primary/8' },
  { title: 'Term 3 Exam Schedule Released', tag: 'Exam', color: 'text-warning bg-warning/8' },
  { title: 'Parent-Teacher Meeting — April 5', tag: 'Meeting', color: 'text-accent bg-accent/8' },
  { title: 'School closed on April 14 (Holiday)', tag: 'Holiday', color: 'text-success bg-success/8' },
];

export default function StudentOverview() {
  const { user } = useAuth();
  const displayName = user?.name;
  const displayGrade = user?.grade ? `Grade ${user.grade}${user.section ?? ''}` : 'Student';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">
            My Dashboard
          </h1>
          <p className="text-sm text-muted mt-0.5">{displayGrade} · Greenwood Academy · Tue, 31 Mar 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success text-xs font-600 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            School in session
          </span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Attendance', value: '95.2%', sub: 'This term', icon: 'CalendarDaysIcon', color: '#10B981', bg: 'bg-success/8' },
          { label: 'Overall Grade', value: 'A', sub: 'Term 2 average', icon: 'ChartBarIcon', color: '#1C4ED8', bg: 'bg-primary/8' },
          { label: 'Assignments Due', value: '3', sub: '2 this week', icon: 'DocumentTextIcon', color: '#F59E0B', bg: 'bg-warning/8' },
          { label: 'Fee Status', value: 'Paid', sub: 'Term 2 · ₹12,000', icon: 'BanknotesIcon', color: '#10B981', bg: 'bg-success/8' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'CalendarDaysIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance chart */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Attendance Trend</h3>
            <span className="text-2xs text-muted">Oct 2025 – Mar 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1C4ED8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1C4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="pct" stroke="#1C4ED8" strokeWidth={2} fill="url(#attendGrad)" name="Attendance %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <h3 className="font-display font-700 text-sm text-foreground mb-4">Notices & Events</h3>
          <div className="space-y-2.5">
            {notices.map((n) => (
              <div key={n.title} className="flex items-start gap-2.5">
                <span className={`shrink-0 text-2xs font-700 px-2 py-0.5 rounded-full mt-0.5 ${n.color}`}>{n.tag}</span>
                <p className="text-xs text-foreground leading-snug">{n.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject grades */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <h3 className="font-display font-700 text-sm text-foreground mb-4">Subject Performance</h3>
          <div className="space-y-3">
            {subjects.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-600 text-foreground">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted">{s.marks}/{s.max}</span>
                    <span className="text-2xs font-700 px-1.5 py-0.5 rounded-md bg-primary/8 text-primary">{s.grade}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-border-light rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.marks}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Assignments</h3>
            <span className="text-2xs text-muted">4 total</span>
          </div>
          <div className="space-y-2.5">
            {assignments.map((a) => (
              <div key={a.title} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.status === 'submitted' ? 'bg-success' : 'bg-warning'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-600 text-foreground leading-snug">{a.title}</p>
                  <p className="text-2xs text-muted mt-0.5">{a.subject} · Due: {a.due}</p>
                </div>
                <span className={`shrink-0 text-2xs font-600 px-2 py-0.5 rounded-full capitalize ${a.status === 'submitted' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's timetable */}
      <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-700 text-sm text-foreground">Today&apos;s Timetable</h3>
          <span className="text-2xs text-muted">Tuesday, 31 Mar 2026</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {timetableToday.map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border/50 hover:border-primary/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-xs font-700 text-primary shrink-0">{i + 1}</div>
              <div className="min-w-0">
                <div className="text-xs font-700 text-foreground truncate">{p.subject}</div>
                <div className="text-2xs text-muted">{p.time}</div>
                <div className="text-2xs text-muted-light truncate">{p.teacher} · {p.room}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
