'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
type ReportTab   = 'overview' | 'academic' | 'attendance' | 'finance' | 'staff';
type ReportPeriod = 'This Term' | 'Last Term' | 'This Year' | 'Last Year';

// ─── Chart Data ───────────────────────────────────────────────────────────────

// Overview KPI trend (monthly)
const KPI_TREND = [
  { month: 'Oct', attendance: 91, passRate: 88, feeCollection: 87, staffPresent: 94 },
  { month: 'Nov', attendance: 89, passRate: 85, feeCollection: 82, staffPresent: 92 },
  { month: 'Dec', attendance: 84, passRate: 82, feeCollection: 65, staffPresent: 90 },
  { month: 'Jan', attendance: 92, passRate: 89, feeCollection: 94, staffPresent: 96 },
  { month: 'Feb', attendance: 93, passRate: 91, feeCollection: 97, staffPresent: 95 },
  { month: 'Mar', attendance: 91, passRate: 90, feeCollection: 99, staffPresent: 93 },
];

// Academic - grade-wise avg score
const ACADEMIC_GRADE = [
  { grade: 'Gr.6',  term1: 74, term2: 76 },
  { grade: 'Gr.7',  term1: 70, term2: 71 },
  { grade: 'Gr.8',  term1: 72, term2: 74 },
  { grade: 'Gr.9',  term1: 65, term2: 68 },
  { grade: 'Gr.10', term1: 76, term2: 78 },
  { grade: 'Gr.11', term1: 70, term2: 72 },
  { grade: 'Gr.12', term1: 73, term2: 75 },
];

// Academic - subject pass rates
const SUBJECT_PASS = [
  { subject: 'Maths',   pass: 88, fail: 12 },
  { subject: 'Science', pass: 91, fail: 9  },
  { subject: 'English', pass: 94, fail: 6  },
  { subject: 'Social',  pass: 93, fail: 7  },
  { subject: 'Hindi',   pass: 90, fail: 10 },
];

// Attendance - monthly student attendance
const ATTENDANCE_MONTHLY = [
  { month: 'Oct', students: 91, staff: 94 },
  { month: 'Nov', students: 89, staff: 92 },
  { month: 'Dec', students: 84, staff: 90 },
  { month: 'Jan', students: 92, staff: 96 },
  { month: 'Feb', students: 93, staff: 95 },
  { month: 'Mar', students: 91, staff: 93 },
];

// Attendance - grade-wise
const ATTENDANCE_GRADE = [
  { grade: 'Gr.6',  pct: 97 },
  { grade: 'Gr.7',  pct: 92 },
  { grade: 'Gr.8',  pct: 91 },
  { grade: 'Gr.9',  pct: 88 },
  { grade: 'Gr.10', pct: 92 },
  { grade: 'Gr.11', pct: 93 },
  { grade: 'Gr.12', pct: 95 },
];

// Finance - monthly collection
const FINANCE_MONTHLY = [
  { month: 'Oct', collected: 420000, target: 480000, expenses: 310000 },
  { month: 'Nov', collected: 395000, target: 480000, expenses: 295000 },
  { month: 'Dec', collected: 310000, target: 480000, expenses: 320000 },
  { month: 'Jan', collected: 452000, target: 480000, expenses: 298000 },
  { month: 'Feb', collected: 468000, target: 480000, expenses: 305000 },
  { month: 'Mar', collected: 475000, target: 480000, expenses: 290000 },
];

// Finance - fee category
const FEE_CATEGORY = [
  { name: 'Tuition',   amount: 890000, color: '#6366f1' },
  { name: 'Transport', amount: 180000, color: '#f59e0b' },
  { name: 'Exam',      amount: 105000, color: '#10b981' },
  { name: 'Sports',    amount:  65000, color: '#3b82f6' },
  { name: 'Library',   amount:  39000, color: '#8b5cf6' },
  { name: 'Hostel',    amount:  26000, color: '#ec4899' },
];

// Staff - department distribution
const STAFF_DEPT = [
  { dept: 'Maths',    count: 4, present: 4 },
  { dept: 'English',  count: 3, present: 3 },
  { dept: 'Science',  count: 4, present: 3 },
  { dept: 'Social',   count: 3, present: 3 },
  { dept: 'Hindi',    count: 2, present: 2 },
  { dept: 'CS',       count: 2, present: 2 },
  { dept: 'P.Ed',     count: 1, present: 1 },
  { dept: 'Arts',     count: 1, present: 0 },
];

// Staff - monthly attendance
const STAFF_MONTHLY = [
  { month: 'Oct', present: 94, absent: 6  },
  { month: 'Nov', present: 92, absent: 8  },
  { month: 'Dec', present: 90, absent: 10 },
  { month: 'Jan', present: 96, absent: 4  },
  { month: 'Feb', present: 95, absent: 5  },
  { month: 'Mar', present: 93, absent: 7  },
];

// ─── Report cards (downloadable reports list) ─────────────────────────────────
interface ReportCard {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  format: 'PDF' | 'Excel' | 'PDF & Excel';
  lastGenerated: string;
}

const REPORT_CARDS: ReportCard[] = [
  { id: 1,  title: 'Student Academic Report',       description: 'Grade-wise & subject-wise performance summary',    category: 'Academic',   icon: 'GraduationCap',  iconBg: 'bg-primary/10',   iconColor: 'text-primary',  format: 'PDF & Excel', lastGenerated: 'Mar 31, 2026' },
  { id: 2,  title: 'Exam Result Sheet',             description: 'Mid-term & final exam consolidated results',       category: 'Academic',   icon: 'FileText',       iconBg: 'bg-purple-50',    iconColor: 'text-purple-600',format: 'PDF',         lastGenerated: 'Mar 25, 2026' },
  { id: 3,  title: 'Student Attendance Report',     description: 'Monthly & term attendance per student & grade',    category: 'Attendance', icon: 'CalendarCheck',  iconBg: 'bg-success/10',   iconColor: 'text-success',  format: 'PDF & Excel', lastGenerated: 'Apr 1, 2026'  },
  { id: 4,  title: 'Staff Attendance Report',       description: 'Teacher & staff daily & monthly attendance',       category: 'Attendance', icon: 'UserCheck',      iconBg: 'bg-emerald-50',   iconColor: 'text-emerald-600',format: 'Excel',       lastGenerated: 'Apr 1, 2026'  },
  { id: 5,  title: 'Fee Collection Report',         description: 'Term-wise fee collected, pending & defaulters',    category: 'Finance',    icon: 'IndianRupee',    iconBg: 'bg-amber-50',     iconColor: 'text-amber-600', format: 'PDF & Excel', lastGenerated: 'Mar 31, 2026' },
  { id: 6,  title: 'Defaulters List',               description: 'Students with overdue or pending fee payments',    category: 'Finance',    icon: 'AlertCircle',    iconBg: 'bg-error/10',     iconColor: 'text-error',    format: 'PDF',         lastGenerated: 'Apr 1, 2026'  },
  { id: 7,  title: 'Teacher Performance Report',    description: 'Class performance, attendance & assignments',      category: 'Staff',      icon: 'Users',          iconBg: 'bg-blue-50',      iconColor: 'text-blue-600', format: 'PDF',         lastGenerated: 'Mar 28, 2026' },
  { id: 8,  title: 'Annual Progress Report',        description: 'School-wide KPIs, goals & year summary',          category: 'Overview',   icon: 'TrendingUp',     iconBg: 'bg-accent/10',    iconColor: 'text-accent',   format: 'PDF',         lastGenerated: 'Mar 15, 2026' },
  { id: 9,  title: 'Admissions Summary',            description: 'New admissions, withdrawals & grade distribution', category: 'Overview',   icon: 'ClipboardList',  iconBg: 'bg-primary/10',   iconColor: 'text-primary',  format: 'Excel',       lastGenerated: 'Mar 30, 2026' },
  { id: 10, title: 'Subject-wise Analysis',         description: 'Pass/fail ratio and avg score per subject',        category: 'Academic',   icon: 'BarChart2',      iconBg: 'bg-purple-50',    iconColor: 'text-purple-600',format: 'PDF & Excel', lastGenerated: 'Mar 20, 2026' },
  { id: 11, title: 'Low Attendance Alert',          description: 'Students with <75% attendance this term',         category: 'Attendance', icon: 'AlertTriangle',  iconBg: 'bg-warning/10',   iconColor: 'text-warning',  format: 'PDF',         lastGenerated: 'Apr 1, 2026'  },
  { id: 12, title: 'Budget & Expense Report',       description: 'Monthly income, expenses & budget utilisation',   category: 'Finance',    icon: 'PieChart',       iconBg: 'bg-amber-50',     iconColor: 'text-amber-600', format: 'Excel',       lastGenerated: 'Mar 31, 2026' },
];

const CATEGORIES = ['All', 'Academic', 'Attendance', 'Finance', 'Staff', 'Overview'] as const;
type Category = typeof CATEGORIES[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, iconBg, iconColor, trend }: {
  icon: string; label: string; value: string; sub: string;
  iconBg: string; iconColor: string;
  trend?: { up: boolean; label: string };
}) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon name={icon} size={18} className={iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted mb-0.5">{label}</p>
        <p className="font-display text-2xl font-800 text-foreground leading-none">{value}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-2xs text-muted">{sub}</span>
          {trend && (
            <span className={`text-2xs font-700 flex items-center gap-0.5 ${trend.up ? 'text-success' : 'text-error'}`}>
              <Icon name={trend.up ? 'TrendingUp' : 'TrendingDown'} size={10} />
              {trend.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminReports() {
  const [activeTab, setActiveTab]           = useState<ReportTab>('overview');
  const [period, setPeriod]                 = useState<ReportPeriod>('This Term');
  const [categoryFilter, setCategoryFilter] = useState<Category>('All');
  const [reportSearch, setReportSearch]     = useState('');

  const filteredReports = REPORT_CARDS.filter(r => {
    const matchCat = categoryFilter === 'All' || r.category === categoryFilter;
    const q = reportSearch.toLowerCase();
    const matchSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const TABS: { id: ReportTab; label: string; icon: string }[] = [
    { id: 'overview',   label: 'Overview',   icon: 'LayoutDashboard' },
    { id: 'academic',   label: 'Academic',   icon: 'GraduationCap'   },
    { id: 'attendance', label: 'Attendance', icon: 'CalendarCheck'   },
    { id: 'finance',    label: 'Finance',    icon: 'IndianRupee'     },
    { id: 'staff',      label: 'Staff',      icon: 'Users'           },
  ];

  const PERIODS: ReportPeriod[] = ['This Term', 'Last Term', 'This Year', 'Last Year'];

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Reports & Analytics</h1>
          <p className="text-sm text-muted mt-0.5">Greenwood Academy · Academic Year 2025–26</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="flex gap-1 p-1 bg-white border border-border/60 rounded-xl shadow-soft">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-700 transition-all ${
                  period === p
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-background transition-colors shadow-soft">
            <Icon name="Download" size={15} />
            Export All
          </button>
        </div>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon="Users"
          label="Total Students"
          value="584"
          sub="Grades 6–12 enrolled"
          iconBg="bg-primary/10"
          iconColor="text-primary"
          trend={{ up: true, label: '+12 this term' }}
        />
        <StatCard
          icon="CalendarCheck"
          label="Avg Attendance"
          value="91.4%"
          sub="Students this term"
          iconBg="bg-success/10"
          iconColor="text-success"
          trend={{ up: true, label: '+1.2% vs last' }}
        />
        <StatCard
          icon="Award"
          label="Overall Pass Rate"
          value="91%"
          sub="All exams this term"
          iconBg="bg-accent/10"
          iconColor="text-accent"
          trend={{ up: true, label: '+3% vs last term' }}
        />
        <StatCard
          icon="IndianRupee"
          label="Fee Collection"
          value="92%"
          sub={`${fmt(2520000)} of ${fmt(2730000)}`}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          trend={{ up: true, label: '+5% vs last term' }}
        />
      </div>

      {/* ── View Tabs ────────────────────────────────────────────────────── */}
      <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl w-fit">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-700 transition-all ${
              activeTab === t.id
                ? 'bg-white text-primary shadow-soft border border-border/60'
                : 'text-muted hover:text-foreground'
            }`}
          >
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          TAB: OVERVIEW
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-4">

          {/* KPI trend */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-1">Key Performance Indicators — Monthly Trend</p>
            <p className="text-xs text-muted mb-4">Attendance, pass rate, fee collection & staff presence (%)</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={KPI_TREND} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                <defs>
                  {[
                    { id: 'att', color: '#6366f1' },
                    { id: 'pass', color: '#10b981' },
                    { id: 'fee', color: '#f59e0b' },
                    { id: 'staff', color: '#3b82f6' },
                  ].map(g => (
                    <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={g.color} stopOpacity={0.12} />
                      <stop offset="95%" stopColor={g.color} stopOpacity={0}    />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[60, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <Line type="monotone" dataKey="attendance"  stroke="#6366f1" strokeWidth={2} dot={false} name="Student Attendance" />
                <Line type="monotone" dataKey="passRate"    stroke="#10b981" strokeWidth={2} dot={false} name="Pass Rate"          />
                <Line type="monotone" dataKey="feeCollection" stroke="#f59e0b" strokeWidth={2} dot={false} name="Fee Collection"  />
                <Line type="monotone" dataKey="staffPresent"  stroke="#3b82f6" strokeWidth={2} dot={false} name="Staff Present"   />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 3-col summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Grade enrollment */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-3">Grade Enrollment</p>
              <div className="space-y-2.5">
                {[
                  { grade: 'Grade 6',  count: 74,  color: '#6366f1' },
                  { grade: 'Grade 7',  count: 79,  color: '#10b981' },
                  { grade: 'Grade 8',  count: 83,  color: '#f59e0b' },
                  { grade: 'Grade 9',  count: 87,  color: '#3b82f6' },
                  { grade: 'Grade 10', count: 89,  color: '#8b5cf6' },
                  { grade: 'Grade 11', count: 90,  color: '#ec4899' },
                  { grade: 'Grade 12', count: 82,  color: '#14b8a6' },
                ].map(g => (
                  <div key={g.grade}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-foreground">{g.grade}</span>
                      <span className="font-700 text-foreground">{g.count}</span>
                    </div>
                    <div className="w-full bg-border/30 rounded-full h-1.5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(g.count / 90) * 100}%`, backgroundColor: g.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top performers */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-3">Top Performers This Term</p>
              <div className="space-y-2">
                {[
                  { name: 'Priya Patel',    grade: 'Gr.10A', pct: 91, avatar: 'PP' },
                  { name: 'Meera Iyer',     grade: 'Gr.11B', pct: 90, avatar: 'MI' },
                  { name: 'Simran Kaur',    grade: 'Gr.12A', pct: 89, avatar: 'SK' },
                  { name: 'Aditi Mishra',   grade: 'Gr.9B',  pct: 88, avatar: 'AM' },
                  { name: 'Aarav Sharma',   grade: 'Gr.10A', pct: 81, avatar: 'AS' },
                ].map((s, i) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className={`text-xs font-800 w-4 flex-shrink-0 ${i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-orange-500' : 'text-muted'}`}>
                      #{i + 1}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-2xs font-700 text-primary flex-shrink-0">
                      {s.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-700 text-foreground truncate">{s.name}</p>
                      <p className="text-2xs text-muted">{s.grade}</p>
                    </div>
                    <span className="text-xs font-700 text-success">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick alerts */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-3">Attention Required</p>
              <div className="space-y-2.5">
                {[
                  { icon: 'AlertTriangle', color: 'text-error',   bg: 'bg-error/8',   label: '6 students below 75% attendance',     action: 'View' },
                  { icon: 'AlertCircle',   color: 'text-error',   bg: 'bg-error/8',   label: '3 students with overdue fee payment',  action: 'View' },
                  { icon: 'TrendingDown',  color: 'text-warning', bg: 'bg-warning/8', label: 'Grade 9 avg score dropped by 4%',      action: 'Report' },
                  { icon: 'UserMinus',     color: 'text-warning', bg: 'bg-warning/8', label: '1 teacher on leave this week',          action: 'View' },
                  { icon: 'CheckCircle',   color: 'text-success', bg: 'bg-success/8', label: 'All Grade 12 fees cleared',             action: '' },
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className={`w-6 h-6 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon name={a.icon} size={12} className={a.color} />
                    </div>
                    <p className="text-xs text-foreground flex-1">{a.label}</p>
                    {a.action && (
                      <button className="text-2xs text-primary font-700 flex-shrink-0 hover:underline">{a.action}</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Downloadable reports section */}
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-border/40">
              <p className="text-sm font-700 text-foreground flex-1">All Reports</p>
              <div className="relative flex-1 max-w-xs">
                <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search reports…"
                  value={reportSearch}
                  onChange={e => setReportSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-700 border transition-all ${
                      categoryFilter === c
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-background text-muted border-border/60 hover:text-foreground'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
              {filteredReports.map(r => (
                <div key={r.id} className="bg-white p-4 hover:bg-background/60 transition-colors group">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl ${r.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={r.icon} size={16} className={r.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-700 text-foreground">{r.title}</p>
                      <p className="text-2xs text-muted mt-0.5 leading-relaxed">{r.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-2xs text-muted">Last: {r.lastGenerated}</span>
                        <span className={`text-2xs font-700 px-1.5 py-0.5 rounded-md ${
                          r.format === 'PDF' ? 'bg-red-50 text-red-600' :
                          r.format === 'Excel' ? 'bg-emerald-50 text-emerald-600' :
                          'bg-primary/8 text-primary'
                        }`}>{r.format}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 mt-3">
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-primary/8 text-primary text-2xs font-700 rounded-lg hover:bg-primary/15 transition-colors">
                      <Icon name="Download" size={11} />
                      Download
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-background border border-border/60 text-foreground text-2xs font-700 rounded-lg hover:bg-border/20 transition-colors">
                      <Icon name="Eye" size={11} />
                      Preview
                    </button>
                    <button className="p-1.5 bg-background border border-border/60 text-muted hover:text-foreground rounded-lg transition-colors">
                      <Icon name="Share2" size={12} />
                    </button>
                  </div>
                </div>
              ))}
              {filteredReports.length === 0 && (
                <div className="col-span-3 py-12 text-center text-sm text-muted bg-white">
                  No reports match your search.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: ACADEMIC
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'academic' && (
        <div className="space-y-4">

          {/* Grade-wise avg score comparison */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-1">Average Score by Grade — Term Comparison</p>
            <p className="text-xs text-muted mb-4">Term 1 vs Term 2 average scores (%)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ACADEMIC_GRADE} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[50, 100]} tickFormatter={v => `${v}`} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="term1" fill="#c7d2fe" radius={[4, 4, 0, 0]} name="Term 1" maxBarSize={24} />
                <Bar dataKey="term2" fill="#6366f1" radius={[4, 4, 0, 0]} name="Term 2" maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Subject pass rates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-1">Subject Pass Rates</p>
              <p className="text-xs text-muted mb-4">% of students passing per subject</p>
              <div className="space-y-3">
                {SUBJECT_PASS.map(s => (
                  <div key={s.subject}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{s.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-success font-700">{s.pass}% pass</span>
                        <span className="text-error">{s.fail}% fail</span>
                      </div>
                    </div>
                    <div className="w-full bg-error/15 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: `${s.pass}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic highlights */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-3">Academic Highlights</p>
              <div className="space-y-3">
                {[
                  { label: 'Highest scoring grade',   value: 'Grade 10 (78% avg)', icon: 'Trophy',       color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Most improved grade',      value: 'Grade 9 (+3% vs T1)', icon: 'TrendingUp',  color: 'text-success',   bg: 'bg-success/8' },
                  { label: 'Best subject (pass rate)', value: 'English (94%)',       icon: 'BookOpen',    color: 'text-primary',   bg: 'bg-primary/8' },
                  { label: 'Needs attention',          value: 'Grade 9 Maths (65%)', icon: 'AlertTriangle', color: 'text-warning', bg: 'bg-warning/8' },
                  { label: 'Top student',              value: 'Priya Patel, Gr.10A', icon: 'Star',        color: 'text-amber-500', bg: 'bg-amber-50'  },
                  { label: 'Exams completed',          value: '14 of 20 scheduled',  icon: 'CheckCircle', color: 'text-success',   bg: 'bg-success/8' },
                ].map(h => (
                  <div key={h.label} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg ${h.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={h.icon} size={13} className={h.color} />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                      <span className="text-xs text-muted truncate">{h.label}</span>
                      <span className="text-xs font-700 text-foreground flex-shrink-0">{h.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: ATTENDANCE
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">

          {/* Monthly trend */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-1">Monthly Attendance Trend</p>
            <p className="text-xs text-muted mb-4">Students vs staff attendance percentage</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={ATTENDANCE_MONTHLY} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="studGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="staffGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[75, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Area type="monotone" dataKey="students" stroke="#6366f1" strokeWidth={2} fill="url(#studGrad)"  name="Students" />
                <Area type="monotone" dataKey="staff"    stroke="#10b981" strokeWidth={2} fill="url(#staffGrad)" name="Staff"    />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Grade-wise attendance + low-attendance list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-1">Grade-wise Attendance</p>
              <p className="text-xs text-muted mb-4">This term average</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ATTENDANCE_GRADE} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[75, 100]} tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="pct" radius={[6, 6, 0, 0]} name="Attendance %" maxBarSize={36}>
                    {ATTENDANCE_GRADE.map((entry, i) => (
                      <Cell key={i} fill={entry.pct >= 95 ? '#10b981' : entry.pct >= 90 ? '#6366f1' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Low attendance alerts */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-700 text-foreground">Students Below 75%</p>
                <span className="text-2xs font-700 text-error bg-error/8 border border-error/20 px-2 py-0.5 rounded-full">6 students</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Rahul Tiwari',  grade: 'Gr.9A',  pct: 69, roll: 'SR-1013' },
                  { name: 'Vikram Yadav',  grade: 'Gr.12A', pct: 74, roll: 'SR-1009' },
                  { name: 'Rohan Gupta',   grade: 'Gr.10B', pct: 78, roll: 'SR-1003' },
                  { name: 'Nikhil Pandey', grade: 'Gr.7A',  pct: 73, roll: 'SR-1023' },
                  { name: 'Dev Rathore',   grade: 'Gr.11A', pct: 85, roll: 'SR-1005' },
                  { name: 'Aditya Kumar',  grade: 'Gr.11A', pct: 79, roll: 'SR-1019' },
                ].map(s => (
                  <div key={s.roll} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-error/10 flex items-center justify-center text-2xs font-700 text-error flex-shrink-0">
                      {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-700 text-foreground truncate">{s.name}</p>
                      <p className="text-2xs text-muted">{s.roll} · {s.grade}</p>
                    </div>
                    <span className={`text-xs font-800 ${s.pct < 75 ? 'text-error' : 'text-warning'}`}>{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: FINANCE
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'finance' && (
        <div className="space-y-4">

          {/* Monthly collection vs target vs expenses */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-1">Monthly Income vs Expenses</p>
            <p className="text-xs text-muted mb-4">Fee collection vs operational expenses (Oct 2025 – Mar 2026)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={FINANCE_MONTHLY} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
                <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="target"    fill="#e0e7ff" radius={[4, 4, 0, 0]} name="Target"    maxBarSize={24} />
                <Bar dataKey="collected" fill="#6366f1" radius={[4, 4, 0, 0]} name="Collected" maxBarSize={24} />
                <Bar dataKey="expenses"  fill="#fecaca" radius={[4, 4, 0, 0]} name="Expenses"  maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Fee category breakdown */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-1">Revenue by Category</p>
              <p className="text-xs text-muted mb-4">This academic year</p>
              <div className="space-y-3">
                {FEE_CATEGORY.map(cat => {
                  const total = FEE_CATEGORY.reduce((s, c) => s + c.amount, 0);
                  const pct = Math.round((cat.amount / total) * 100);
                  return (
                    <div key={cat.name}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-foreground">{cat.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-700 text-foreground">{fmt(cat.amount)}</span>
                          <span className="text-muted">{pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-border/30 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: cat.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Finance summary cards */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-3">Finance Summary</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Revenue',    value: fmt(2520000), icon: 'TrendingUp',    color: 'text-success',   bg: 'bg-success/8'  },
                  { label: 'Total Expenses',   value: fmt(1818000), icon: 'TrendingDown',  color: 'text-error',     bg: 'bg-error/8'    },
                  { label: 'Net Surplus',      value: fmt(702000),  icon: 'IndianRupee',   color: 'text-primary',   bg: 'bg-primary/10' },
                  { label: 'Pending Dues',     value: fmt(210000),  icon: 'Clock',         color: 'text-warning',   bg: 'bg-warning/8'  },
                  { label: 'Fee Target',       value: fmt(2730000), icon: 'Target',        color: 'text-accent',    bg: 'bg-accent/8'   },
                  { label: 'Collection Rate',  value: '92%',        icon: 'Percent',       color: 'text-success',   bg: 'bg-success/8'  },
                ].map(s => (
                  <div key={s.label} className="bg-background rounded-xl p-3">
                    <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center mb-1.5`}>
                      <Icon name={s.icon} size={13} className={s.color} />
                    </div>
                    <p className="font-display text-base font-800 text-foreground">{s.value}</p>
                    <p className="text-2xs text-muted mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: STAFF
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'staff' && (
        <div className="space-y-4">

          {/* Staff monthly attendance */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-1">Staff Attendance Trend</p>
            <p className="text-xs text-muted mb-4">Monthly present vs absent percentage</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={STAFF_MONTHLY} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="present" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} name="Present %" maxBarSize={40} />
                <Bar dataKey="absent"  stackId="a" fill="#fecaca" radius={[4, 4, 0, 0]} name="Absent %"  maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Department distribution */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-3">Staff by Department</p>
              <div className="space-y-2.5">
                {STAFF_DEPT.map(d => (
                  <div key={d.dept} className="flex items-center gap-3">
                    <span className="text-xs text-muted w-16 flex-shrink-0">{d.dept}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 bg-border/30 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(d.count / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-700 text-foreground w-4">{d.count}</span>
                    </div>
                    <span className={`text-2xs font-700 px-1.5 py-0.5 rounded-md ${
                      d.present === d.count ? 'bg-success/8 text-success' : 'bg-warning/8 text-warning'
                    }`}>
                      {d.present}/{d.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Staff highlights */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-3">Staff Highlights</p>
              <div className="space-y-3">
                {[
                  { label: 'Total Teaching Staff', value: '20 teachers',          icon: 'Users',         color: 'text-primary',   bg: 'bg-primary/10' },
                  { label: 'Present Today',         value: '19 of 20',             icon: 'UserCheck',     color: 'text-success',   bg: 'bg-success/8'  },
                  { label: 'On Leave',              value: '1 teacher',            icon: 'UserMinus',     color: 'text-warning',   bg: 'bg-warning/8'  },
                  { label: 'Best Attendance Dept',  value: 'Maths (100%)',         icon: 'Trophy',        color: 'text-amber-500', bg: 'bg-amber-50'   },
                  { label: 'Avg Classes/Teacher',   value: '5.8 per week',         icon: 'CalendarDays',  color: 'text-accent',    bg: 'bg-accent/8'   },
                  { label: 'Pending Assignments',   value: '12 to be graded',      icon: 'ClipboardList', color: 'text-error',     bg: 'bg-error/8'    },
                ].map(h => (
                  <div key={h.label} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg ${h.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={h.icon} size={13} className={h.color} />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                      <span className="text-xs text-muted truncate">{h.label}</span>
                      <span className="text-xs font-700 text-foreground flex-shrink-0">{h.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
