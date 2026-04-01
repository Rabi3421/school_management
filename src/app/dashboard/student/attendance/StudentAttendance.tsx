'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
type DayStatus = 'present' | 'absent' | 'late' | 'holiday' | 'sunday' | 'empty';

interface CalendarDay {
  day: number | null;
  status: DayStatus;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const termTrendData = [
  { month: 'Oct', pct: 96 },
  { month: 'Nov', pct: 92 },
  { month: 'Dec', pct: 88 },
  { month: 'Jan', pct: 94 },
  { month: 'Feb', pct: 97 },
  { month: 'Mar', pct: 95 },
];

const subjectAttendance = [
  { subject: 'Mathematics',        present: 22, total: 24, pct: 92, color: '#1C4ED8' },
  { subject: 'Science',            present: 23, total: 24, pct: 96, color: '#10B981' },
  { subject: 'English',            present: 21, total: 24, pct: 88, color: '#0EA5E9' },
  { subject: 'Social Studies',     present: 20, total: 24, pct: 83, color: '#8B5CF6' },
  { subject: 'Hindi',              present: 22, total: 24, pct: 92, color: '#F59E0B' },
  { subject: 'Physical Education', present: 18, total: 20, pct: 90, color: '#EF4444' },
  { subject: 'Computer Science',   present: 19, total: 20, pct: 95, color: '#0D9488' },
  { subject: 'Art',                present: 14, total: 15, pct: 93, color: '#EC4899' },
];

// March 2026 — starts on Sunday (idx 0)
// S  M  T  W  T  F  S
const marchCalendar: CalendarDay[] = [
  { day: null, status: 'empty' }, // pad
  { day: 1,  status: 'sunday'  },
  { day: 2,  status: 'present' },
  { day: 3,  status: 'present' },
  { day: 4,  status: 'present' },
  { day: 5,  status: 'present' },
  { day: 6,  status: 'present' },
  { day: 7,  status: 'present' },
  { day: 8,  status: 'sunday'  },
  { day: 9,  status: 'present' },
  { day: 10, status: 'present' },
  { day: 11, status: 'absent'  },
  { day: 12, status: 'present' },
  { day: 13, status: 'present' },
  { day: 14, status: 'present' },
  { day: 15, status: 'sunday'  },
  { day: 16, status: 'present' },
  { day: 17, status: 'present' },
  { day: 18, status: 'late'    },
  { day: 19, status: 'present' },
  { day: 20, status: 'present' },
  { day: 21, status: 'holiday' },
  { day: 22, status: 'sunday'  },
  { day: 23, status: 'present' },
  { day: 24, status: 'present' },
  { day: 25, status: 'present' },
  { day: 26, status: 'absent'  },
  { day: 27, status: 'present' },
  { day: 28, status: 'present' },
  { day: 29, status: 'sunday'  },
  { day: 30, status: 'present' },
  { day: 31, status: 'present' },
];

// April 2026 — starts on Wednesday (idx 3)
const aprilCalendar: CalendarDay[] = [
  { day: null, status: 'empty' },
  { day: null, status: 'empty' },
  { day: null, status: 'empty' },
  { day: 1,  status: 'present' }, // today
  { day: 2,  status: 'empty'   },
  { day: 3,  status: 'empty'   },
  { day: 4,  status: 'empty'   },
  { day: 5,  status: 'sunday'  },
  { day: 6,  status: 'empty'   },
  { day: 7,  status: 'empty'   },
  { day: 8,  status: 'empty'   },
  { day: 9,  status: 'empty'   },
  { day: 10, status: 'empty'   },
  { day: 11, status: 'empty'   },
  { day: 12, status: 'sunday'  },
  { day: 13, status: 'holiday' },
  { day: 14, status: 'holiday' },
  { day: 15, status: 'empty'   },
  { day: 16, status: 'empty'   },
  { day: 17, status: 'empty'   },
  { day: 18, status: 'empty'   },
  { day: 19, status: 'sunday'  },
  { day: 20, status: 'empty'   },
  { day: 21, status: 'empty'   },
  { day: 22, status: 'empty'   },
  { day: 23, status: 'empty'   },
  { day: 24, status: 'empty'   },
  { day: 25, status: 'empty'   },
  { day: 26, status: 'sunday'  },
  { day: 27, status: 'empty'   },
  { day: 28, status: 'empty'   },
  { day: 29, status: 'empty'   },
  { day: 30, status: 'empty'   },
];

const absentLog = [
  { date: 'Wed, 26 Mar 2026', reason: 'Medical leave', subjects: ['Mathematics', 'Science', 'English'], approved: true },
  { date: 'Wed, 11 Mar 2026', reason: 'Family function', subjects: ['Social Studies', 'Hindi', 'Computer Science'], approved: true },
];

const lateLog = [
  { date: 'Wed, 18 Mar 2026', reason: 'Traffic delay', missedPeriods: 1, approved: true },
];

const months = [
  { label: 'March 2026', data: marchCalendar, present: 22, absent: 2, late: 1, holidays: 1, sundays: 5, total: 26 },
  { label: 'April 2026', data: aprilCalendar, present: 1,  absent: 0, late: 0, holidays: 2, sundays: 4, total: 1 },
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const statusMeta: Record<DayStatus, { bg: string; text: string; ring?: string }> = {
  present: { bg: 'bg-success',        text: 'text-white',           ring: 'ring-success/30' },
  absent:  { bg: 'bg-danger',         text: 'text-white',           ring: 'ring-danger/30' },
  late:    { bg: 'bg-warning',        text: 'text-white',           ring: 'ring-warning/30' },
  holiday: { bg: 'bg-accent/20',      text: 'text-accent',          ring: 'ring-accent/20' },
  sunday:  { bg: 'bg-border-light',   text: 'text-muted-light' },
  empty:   { bg: 'bg-transparent',    text: 'text-transparent' },
};

function getPct(p: number, t: number) {
  return t === 0 ? 0 : Math.round((p / t) * 100);
}

function PctBadge({ pct }: { pct: number }) {
  const color =
    pct >= 90 ? 'bg-success/10 text-success'
    : pct >= 75 ? 'bg-warning/10 text-warning'
    : 'bg-danger/10 text-danger';
  return <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${color}`}>{pct}%</span>;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function StudentAttendance() {
  const [activeMonth, setActiveMonth] = useState(0); // 0 = March, 1 = April
  const month = months[activeMonth];

  const overallPresent = months.reduce((s, m) => s + m.present, 0);
  const overallTotal   = months.reduce((s, m) => s + m.total,   0);
  const overallPct     = getPct(overallPresent, overallTotal);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Attendance</h1>
          <p className="text-sm text-muted mt-0.5">Grade 10A · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-600 ${
          overallPct >= 90 ? 'bg-success/10 text-success' : overallPct >= 75 ? 'bg-warning/10 text-warning' : 'bg-danger/10 text-danger'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${overallPct >= 90 ? 'bg-success' : overallPct >= 75 ? 'bg-warning' : 'bg-danger'} animate-pulse`} />
          Overall {overallPct}% this term
        </span>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Days Present',  value: String(overallPresent), sub: 'This term',      icon: 'CheckCircleIcon',          color: '#10B981', bg: 'bg-success/8' },
          { label: 'Days Absent',   value: '2',                    sub: 'This term',      icon: 'XCircleIcon',              color: '#EF4444', bg: 'bg-danger/8'  },
          { label: 'Late Arrivals', value: '1',                    sub: 'This term',      icon: 'ClockIcon',                color: '#F59E0B', bg: 'bg-warning/8' },
          { label: 'Overall %',     value: `${overallPct}%`,       sub: 'Min required 75%', icon: 'ChartBarIcon',           color: '#1C4ED8', bg: 'bg-primary/8' },
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

      {/* ── Trend + Subject bar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Trend chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Monthly Attendance Trend</h3>
            <span className="text-2xs text-muted">Oct 2025 – Mar 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={termTrendData}>
              <defs>
                <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1C4ED8" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1C4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}
                formatter={(v: number) => [`${v}%`, 'Attendance']}
              />
              <Area type="monotone" dataKey="pct" stroke="#1C4ED8" strokeWidth={2.5} fill="url(#attendGrad)" dot={{ r: 4, fill: '#1C4ED8', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance summary card */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft flex flex-col gap-4">
          <h3 className="font-display font-700 text-sm text-foreground">Term Summary</h3>
          {/* Circular-ish progress */}
          <div className="flex items-center justify-center py-2">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke={overallPct >= 90 ? '#10B981' : overallPct >= 75 ? '#F59E0B' : '#EF4444'}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42 * overallPct / 100} ${2 * Math.PI * 42}`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-800 text-foreground">{overallPct}%</span>
                <span className="text-2xs text-muted">Attended</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Present',  value: overallPresent, color: 'bg-success' },
              { label: 'Absent',   value: 2,               color: 'bg-danger'  },
              { label: 'Late',     value: 1,               color: 'bg-warning' },
              { label: 'Holidays', value: 3,               color: 'bg-accent/40' },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${r.color}`} />
                  <span className="text-muted">{r.label}</span>
                </div>
                <span className="font-600 text-foreground">{r.value} days</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Calendar + Absent log ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          {/* Month tabs */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Attendance Calendar</h3>
            <div className="flex items-center gap-1 p-1 bg-background border border-border/60 rounded-xl">
              {months.map((m, i) => (
                <button
                  key={m.label}
                  onClick={() => setActiveMonth(i)}
                  className={`px-3 py-1 rounded-lg text-2xs font-600 transition-all ${
                    activeMonth === i
                      ? 'bg-white text-primary shadow-soft border border-border/60'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {m.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Month stats row */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {[
              { label: 'Present',  value: month.present,  color: 'text-success', dot: 'bg-success' },
              { label: 'Absent',   value: month.absent,   color: 'text-danger',  dot: 'bg-danger'  },
              { label: 'Late',     value: month.late,     color: 'text-warning', dot: 'bg-warning' },
              { label: 'Holidays', value: month.holidays, color: 'text-accent',  dot: 'bg-accent/50' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-2xs">
                <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                <span className="text-muted">{s.label}:</span>
                <span className={`font-700 ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Week header */}
          <div className="grid grid-cols-7 mb-1">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-2xs font-700 text-muted-light py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {month.data.map((cell, idx) => {
              const meta = statusMeta[cell.status];
              const isToday = activeMonth === 1 && cell.day === 1;
              return (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center rounded-xl text-xs font-600 transition-all
                    ${cell.status === 'empty' ? '' : `${meta.bg} ${meta.text}`}
                    ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}
                    ${cell.status !== 'empty' && cell.status !== 'sunday' ? 'hover:opacity-80 cursor-default' : ''}
                  `}
                >
                  {cell.day !== null ? cell.day : ''}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-border/40">
            {[
              { label: 'Present',  bg: 'bg-success' },
              { label: 'Absent',   bg: 'bg-danger'  },
              { label: 'Late',     bg: 'bg-warning' },
              { label: 'Holiday',  bg: 'bg-accent/40' },
              { label: 'Sunday',   bg: 'bg-border-light' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-md ${l.bg}`} />
                <span className="text-2xs text-muted">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Absent / Late log */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft space-y-5">
          <h3 className="font-display font-700 text-sm text-foreground">Absence &amp; Late Log</h3>

          {/* Absent entries */}
          <div className="space-y-3">
            <div className="text-2xs font-700 text-muted-light uppercase tracking-widest">Absent Days</div>
            {absentLog.map((a) => (
              <div key={a.date} className="p-3 rounded-xl bg-danger/5 border border-danger/15 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-700 text-foreground">{a.date}</span>
                  <span className={`text-2xs font-600 px-2 py-0.5 rounded-full ${a.approved ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {a.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="text-2xs text-muted">{a.reason}</p>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {a.subjects.map((s) => (
                    <span key={s} className="text-2xs bg-white border border-border/60 text-foreground px-1.5 py-0.5 rounded-md">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Late entries */}
          <div className="space-y-3">
            <div className="text-2xs font-700 text-muted-light uppercase tracking-widest">Late Arrivals</div>
            {lateLog.map((l) => (
              <div key={l.date} className="p-3 rounded-xl bg-warning/5 border border-warning/15 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-700 text-foreground">{l.date}</span>
                  <span className={`text-2xs font-600 px-2 py-0.5 rounded-full ${l.approved ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {l.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <p className="text-2xs text-muted">{l.reason}</p>
                <p className="text-2xs text-muted-light">{l.missedPeriods} period(s) missed</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Subject-wise attendance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Subject-wise Attendance</h3>
            <span className="text-2xs text-muted">Term 2 · Apr 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjectAttendance} barSize={26} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false}
                tickFormatter={(v: string) => v.split(' ')[0]} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}
                formatter={(v: number) => [`${v}%`, 'Attendance']}
              />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                {subjectAttendance.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject list */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <h3 className="font-display font-700 text-sm text-foreground mb-4">Per-Subject Detail</h3>
          <div className="space-y-3">
            {subjectAttendance.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-xs font-600 text-foreground truncate">{s.subject}</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <span className="text-2xs text-muted">{s.present}/{s.total}</span>
                    <PctBadge pct={s.pct} />
                  </div>
                </div>
                <div className="h-1.5 bg-border-light rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
