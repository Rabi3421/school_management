'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, Cell,
} from 'recharts';

// ─── Types ──────────────────────────────────────────────────────────────────────
interface Student {
  roll: string;
  name: string;
  attendance: number;    // %
  avgMarks: number;      // out of 100
  grade: string;
  assignmentsDue: number;
  lastSeen: string;
}

interface ClassData {
  id: string;
  name: string;
  subject: string;
  room: string;
  section: string;
  color: string;
  bgColor: string;
  students: Student[];
  schedule: { day: string; time: string }[];
  nextClass: string;
  pendingGrading: number;
  avgAttendance: number;
  avgScore: number;
  termTrend: { month: string; avg: number }[];
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const classes: ClassData[] = [
  {
    id: '10a',
    name: 'Grade 10A',
    subject: 'Mathematics',
    room: 'C-204',
    section: 'A',
    color: '#1C4ED8',
    bgColor: 'bg-primary/8',
    nextClass: 'Today · 8:00 AM',
    pendingGrading: 3,
    avgAttendance: 92,
    avgScore: 81,
    schedule: [
      { day: 'Mon', time: '8:00–8:45 AM' },
      { day: 'Wed', time: '8:00–8:45 AM' },
      { day: 'Fri', time: '11:15–12:00 PM' },
    ],
    termTrend: [
      { month: 'Oct', avg: 74 }, { month: 'Nov', avg: 78 }, { month: 'Dec', avg: 76 },
      { month: 'Jan', avg: 80 }, { month: 'Feb', avg: 82 }, { month: 'Mar', avg: 81 },
    ],
    students: [
      { roll: 'SR-0101', name: 'Ananya Singh',    attendance: 96, avgMarks: 88, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0102', name: 'Rohit Verma',     attendance: 84, avgMarks: 72, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'    },
      { roll: 'SR-0103', name: 'Priya Sharma',    attendance: 91, avgMarks: 90, grade: 'A+', assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0104', name: 'Aryan Kapoor',    attendance: 78, avgMarks: 65, grade: 'B',  assignmentsDue: 2, lastSeen: 'Mar 30'   },
      { roll: 'SR-0105', name: 'Meera Pillai',    attendance: 97, avgMarks: 93, grade: 'A+', assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0106', name: 'Karan Malhotra',  attendance: 88, avgMarks: 77, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'    },
      { roll: 'SR-0107', name: 'Sita Reddy',      attendance: 94, avgMarks: 85, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0108', name: 'Dev Nair',        attendance: 71, avgMarks: 60, grade: 'C',  assignmentsDue: 3, lastSeen: 'Mar 28'   },
      { roll: 'SR-0109', name: 'Pooja Joshi',     attendance: 93, avgMarks: 82, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0110', name: 'Aditya Kumar',    attendance: 89, avgMarks: 79, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'    },
    ],
  },
  {
    id: '10b',
    name: 'Grade 10B',
    subject: 'Mathematics',
    room: 'C-205',
    section: 'B',
    color: '#10B981',
    bgColor: 'bg-success/8',
    nextClass: 'Today · 11:15 AM',
    pendingGrading: 5,
    avgAttendance: 88,
    avgScore: 76,
    schedule: [
      { day: 'Mon', time: '11:15–12:00 PM' },
      { day: 'Thu', time: '8:45–9:30 AM'   },
      { day: 'Sat', time: '8:00–8:45 AM'   },
    ],
    termTrend: [
      { month: 'Oct', avg: 70 }, { month: 'Nov', avg: 72 }, { month: 'Dec', avg: 69 },
      { month: 'Jan', avg: 74 }, { month: 'Feb', avg: 75 }, { month: 'Mar', avg: 76 },
    ],
    students: [
      { roll: 'SR-0201', name: 'Neha Gupta',      attendance: 90, avgMarks: 78, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'    },
      { roll: 'SR-0202', name: 'Sameer Khan',      attendance: 82, avgMarks: 70, grade: 'B',  assignmentsDue: 2, lastSeen: 'Today'    },
      { roll: 'SR-0203', name: 'Isha Mehta',       attendance: 95, avgMarks: 88, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0204', name: 'Rahul Bose',       attendance: 76, avgMarks: 62, grade: 'B',  assignmentsDue: 2, lastSeen: 'Mar 29'   },
      { roll: 'SR-0205', name: 'Tanya Singh',      attendance: 88, avgMarks: 74, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'    },
      { roll: 'SR-0206', name: 'Vivek Rao',        attendance: 91, avgMarks: 80, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0207', name: 'Divya Iyer',       attendance: 86, avgMarks: 75, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'    },
      { roll: 'SR-0208', name: 'Suraj Patel',      attendance: 79, avgMarks: 66, grade: 'B',  assignmentsDue: 2, lastSeen: 'Mar 31'   },
    ],
  },
  {
    id: '9a',
    name: 'Grade 9A',
    subject: 'Mathematics',
    room: 'C-301',
    section: 'A',
    color: '#8B5CF6',
    bgColor: 'bg-purple-50',
    nextClass: 'Today · 9:30 AM',
    pendingGrading: 0,
    avgAttendance: 95,
    avgScore: 84,
    schedule: [
      { day: 'Tue', time: '9:30–10:15 AM' },
      { day: 'Thu', time: '10:30–11:15 AM'},
      { day: 'Sat', time: '9:30–10:15 AM' },
    ],
    termTrend: [
      { month: 'Oct', avg: 78 }, { month: 'Nov', avg: 80 }, { month: 'Dec', avg: 79 },
      { month: 'Jan', avg: 82 }, { month: 'Feb', avg: 84 }, { month: 'Mar', avg: 84 },
    ],
    students: [
      { roll: 'SR-0301', name: 'Aarav Sharma',    attendance: 98, avgMarks: 91, grade: 'A+', assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0302', name: 'Riya Nair',       attendance: 94, avgMarks: 86, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0303', name: 'Kabir Menon',     attendance: 90, avgMarks: 80, grade: 'A',  assignmentsDue: 1, lastSeen: 'Today'    },
      { roll: 'SR-0304', name: 'Anushka Rao',     attendance: 96, avgMarks: 88, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0305', name: 'Ishaan Dutta',    attendance: 93, avgMarks: 84, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0306', name: 'Fatima Sheikh',   attendance: 99, avgMarks: 94, grade: 'A+', assignmentsDue: 0, lastSeen: 'Today'    },
      { roll: 'SR-0307', name: 'Yash Agarwal',    attendance: 88, avgMarks: 77, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'    },
    ],
  },
  {
    id: '9b',
    name: 'Grade 9B',
    subject: 'Mathematics',
    room: 'C-302',
    section: 'B',
    color: '#F59E0B',
    bgColor: 'bg-warning/8',
    nextClass: 'Today · 1:45 PM',
    pendingGrading: 0,
    avgAttendance: 90,
    avgScore: 79,
    schedule: [
      { day: 'Mon', time: '1:45–2:30 PM' },
      { day: 'Wed', time: '10:30–11:15 AM'},
      { day: 'Fri', time: '8:45–9:30 AM'  },
    ],
    termTrend: [
      { month: 'Oct', avg: 72 }, { month: 'Nov', avg: 74 }, { month: 'Dec', avg: 73 },
      { month: 'Jan', avg: 76 }, { month: 'Feb', avg: 78 }, { month: 'Mar', avg: 79 },
    ],
    students: [
      { roll: 'SR-0401', name: 'Pooja Reddy',     attendance: 92, avgMarks: 81, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'   },
      { roll: 'SR-0402', name: 'Nikhil Das',      attendance: 86, avgMarks: 74, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'   },
      { roll: 'SR-0403', name: 'Shruti Pillai',   attendance: 91, avgMarks: 82, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'   },
      { roll: 'SR-0404', name: 'Omar Siddiqui',   attendance: 80, avgMarks: 68, grade: 'B',  assignmentsDue: 2, lastSeen: 'Mar 30'  },
      { roll: 'SR-0405', name: 'Kavya Jain',      attendance: 95, avgMarks: 87, grade: 'A',  assignmentsDue: 0, lastSeen: 'Today'   },
      { roll: 'SR-0406', name: 'Rohan Bhatt',     attendance: 83, avgMarks: 71, grade: 'B+', assignmentsDue: 1, lastSeen: 'Today'   },
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
const gradeColors: Record<string, { bg: string; text: string }> = {
  'A+': { bg: 'bg-success/10', text: 'text-success'  },
  'A':  { bg: 'bg-primary/8',  text: 'text-primary'  },
  'B+': { bg: 'bg-accent/10',  text: 'text-accent'   },
  'B':  { bg: 'bg-warning/8',  text: 'text-warning'  },
  'C':  { bg: 'bg-danger/10',  text: 'text-danger'   },
};

function GradeBadge({ grade }: { grade: string }) {
  const c = gradeColors[grade] ?? gradeColors['B'];
  return <span className={`text-2xs font-800 px-2 py-0.5 rounded-md ${c.bg} ${c.text}`}>{grade}</span>;
}

function AttPct({ pct }: { pct: number }) {
  const color = pct >= 90 ? 'text-success' : pct >= 75 ? 'text-warning' : 'text-danger';
  return <span className={`text-xs font-700 ${color}`}>{pct}%</span>;
}

function StudentAvatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  return (
    <div
      className="w-8 h-8 rounded-xl flex items-center justify-center text-2xs font-800 flex-shrink-0"
      style={{ backgroundColor: `${color}18`, color }}
    >
      {initials}
    </div>
  );
}

const totalStudents = classes.reduce((s, c) => s + c.students.length, 0);
const overallAvgAtt = Math.round(classes.reduce((s, c) => s + c.avgAttendance, 0) / classes.length);
const overallAvgScore = Math.round(classes.reduce((s, c) => s + c.avgScore, 0) / classes.length);
const totalPending = classes.reduce((s, c) => s + c.pendingGrading, 0);

// ─── Roster view ────────────────────────────────────────────────────────────────
function ClassRoster({ cls, search }: { cls: ClassData; search: string }) {
  const filtered = cls.students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toLowerCase().includes(search.toLowerCase())
  );

  const atRisk = filtered.filter((s) => s.attendance < 80 || s.avgMarks < 65);

  return (
    <div className="space-y-4">
      {/* Class summary pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Students', value: cls.students.length, icon: 'UsersIcon', color: 'text-primary', bg: 'bg-primary/8' },
          { label: 'Avg Attendance', value: `${cls.avgAttendance}%`, icon: 'ClipboardDocumentCheckIcon', color: cls.avgAttendance >= 90 ? 'text-success' : 'text-warning', bg: cls.avgAttendance >= 90 ? 'bg-success/8' : 'bg-warning/8' },
          { label: 'Avg Score', value: `${cls.avgScore}%`, icon: 'ChartBarIcon', color: cls.avgScore >= 80 ? 'text-success' : 'text-warning', bg: cls.avgScore >= 80 ? 'bg-success/8' : 'bg-warning/8' },
          { label: 'Pending Grading', value: cls.pendingGrading, icon: 'DocumentTextIcon', color: cls.pendingGrading > 0 ? 'text-warning' : 'text-success', bg: cls.pendingGrading > 0 ? 'bg-warning/8' : 'bg-success/8' },
        ].map((p) => (
          <div key={p.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${p.bg}`}>
            <Icon name={p.icon as 'UsersIcon'} size={13} className={p.color} />
            <span className={`text-xs font-700 ${p.color}`}>{p.value}</span>
            <span className="text-2xs text-muted">{p.label}</span>
          </div>
        ))}
      </div>

      {/* At-risk banner */}
      {atRisk.length > 0 && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-danger/6 border border-danger/20">
          <Icon name="ExclamationTriangleIcon" size={15} className="text-danger flex-shrink-0 mt-0.5" />
          <p className="text-2xs text-foreground leading-relaxed">
            <span className="font-700 text-danger">{atRisk.length} student{atRisk.length > 1 ? 's' : ''}</span> need attention — low attendance or below-average scores.
          </p>
        </div>
      )}

      {/* Roster table */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-xs">
            <thead>
              <tr className="border-b border-border/40 bg-background">
                {['Student', 'Roll No.', 'Attendance', 'Avg Score', 'Grade', 'Assignments Due', 'Last Seen'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const atRisk = s.attendance < 80 || s.avgMarks < 65;
                return (
                  <tr key={s.roll} className={`border-b border-border/30 transition-colors ${atRisk ? 'bg-danger/2 hover:bg-danger/4' : 'hover:bg-background/60'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <StudentAvatar name={s.name} color={cls.color} />
                        <div>
                          <div className="font-700 text-foreground leading-tight">{s.name}</div>
                          {atRisk && <div className="text-2xs text-danger font-600 mt-0.5">Needs attention</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted font-500">{s.roll}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-border-light rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${s.attendance}%`,
                              backgroundColor: s.attendance >= 90 ? '#10B981' : s.attendance >= 75 ? '#F59E0B' : '#EF4444',
                            }}
                          />
                        </div>
                        <AttPct pct={s.attendance} />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-700 text-foreground">{s.avgMarks}<span className="text-muted font-400">/100</span></td>
                    <td className="px-4 py-3"><GradeBadge grade={s.grade} /></td>
                    <td className="px-4 py-3">
                      {s.assignmentsDue > 0 ? (
                        <span className="text-2xs font-700 px-2 py-0.5 rounded-full bg-warning/10 text-warning">
                          {s.assignmentsDue} due
                        </span>
                      ) : (
                        <span className="text-2xs font-600 text-success">All clear</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">{s.lastSeen}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 flex flex-col items-center gap-2 text-center">
            <Icon name="MagnifyingGlassIcon" size={22} className="text-muted-light" />
            <div className="text-xs font-600 text-muted">No students match your search</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────────
export default function TeacherClasses() {
  const [activeClass, setActiveClass] = useState<string>(classes[0].id);
  const [activeTab,   setActiveTab]   = useState<'overview' | 'roster' | 'performance'>('overview');
  const [search,      setSearch]      = useState('');

  const cls = classes.find((c) => c.id === activeClass)!;

  const comparisonData = classes.map((c) => ({
    class: c.name.replace('Grade ', ''),
    'Avg Score': c.avgScore,
    'Avg Attendance': c.avgAttendance,
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">My Classes</h1>
          <p className="text-sm text-muted mt-0.5">Mathematics · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 bg-success/10 text-success text-xs font-600 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          School in session
        </span>
      </div>

      {/* ── Top stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes',     value: classes.length,    sub: 'This term',           icon: 'AcademicCapIcon',              color: '#1C4ED8', bg: 'bg-primary/8'  },
          { label: 'Total Students',    value: totalStudents,     sub: 'Across all classes',  icon: 'UsersIcon',                    color: '#10B981', bg: 'bg-success/8'  },
          { label: 'Avg Attendance',    value: `${overallAvgAtt}%`, sub: 'All classes',       icon: 'ClipboardDocumentCheckIcon',   color: '#0EA5E9', bg: 'bg-accent/8'   },
          { label: 'Pending Grading',   value: totalPending,      sub: 'Assignments to grade', icon: 'DocumentCheckIcon',           color: '#F59E0B', bg: 'bg-warning/8'  },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'AcademicCapIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Class selector cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveClass(c.id); setActiveTab('overview'); }}
            className={`text-left p-4 rounded-2xl border shadow-soft transition-all hover:shadow-card ${
              activeClass === c.id
                ? 'border-current ring-2 ring-offset-1'
                : 'bg-white border-border/60 hover:border-border'
            }`}
            style={activeClass === c.id ? { borderColor: c.color, backgroundColor: `${c.color}06` } : {}}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-800 text-sm text-white"
                style={{ backgroundColor: c.color }}
              >
                {c.section}
              </div>
              {c.pendingGrading > 0 && (
                <span className="text-2xs bg-warning/10 text-warning font-700 px-2 py-0.5 rounded-full">{c.pendingGrading} pending</span>
              )}
            </div>

            <div className="font-display font-700 text-sm text-foreground">{c.name}</div>
            <div className="text-2xs text-muted mt-0.5">{c.subject} · Room {c.room}</div>

            <div className="mt-3 pt-3 border-t border-border/40 grid grid-cols-2 gap-2">
              <div>
                <div className="text-2xs text-muted-light">Students</div>
                <div className="text-xs font-700 text-foreground mt-0.5">{c.students.length}</div>
              </div>
              <div>
                <div className="text-2xs text-muted-light">Avg Score</div>
                <div className="text-xs font-700 mt-0.5" style={{ color: c.color }}>{c.avgScore}%</div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-2xs text-muted">
              <Icon name="CalendarDaysIcon" size={11} className="text-muted-light" />
              {c.nextClass}
            </div>
          </button>
        ))}
      </div>

      {/* ── Selected class detail ── */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">

        {/* Class header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border/50"
          style={{ borderLeftWidth: 4, borderLeftColor: cls.color }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-800 text-base text-white flex-shrink-0"
              style={{ backgroundColor: cls.color }}
            >
              {cls.section}
            </div>
            <div>
              <h2 className="font-display font-700 text-base text-foreground">{cls.name} — {cls.subject}</h2>
              <p className="text-2xs text-muted mt-0.5">Room {cls.room} · {cls.students.length} students · Next: {cls.nextClass}</p>
            </div>
          </div>

          {/* Tab toggles */}
          <div className="flex items-center gap-1 p-1 bg-background border border-border/60 rounded-xl self-start sm:self-auto">
            {(['overview', 'roster', 'performance'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-lg text-2xs font-600 capitalize transition-all ${
                  activeTab === t
                    ? 'bg-white text-primary shadow-soft border border-border/60'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Score trend */}
                <div className="lg:col-span-2 bg-background rounded-2xl border border-border/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-700 text-xs text-foreground">Class Average Score Trend</h3>
                    <span className="text-2xs text-muted">Oct 2025 – Mar 2026</span>
                  </div>
                  <ResponsiveContainer width="100%" height={160}>
                    <AreaChart data={cls.termTrend}>
                      <defs>
                        <linearGradient id={`grad-${cls.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={cls.color} stopOpacity={0.2} />
                          <stop offset="95%" stopColor={cls.color} stopOpacity={0}   />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} formatter={(v: number) => [`${v}%`, 'Avg Score']} />
                      <Area type="monotone" dataKey="avg" stroke={cls.color} strokeWidth={2.5} fill={`url(#grad-${cls.id})`} dot={{ r: 4, fill: cls.color, strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Quick stats */}
                <div className="space-y-3">
                  {[
                    { label: 'Avg Attendance', value: `${cls.avgAttendance}%`, icon: 'ClipboardDocumentCheckIcon', color: cls.avgAttendance >= 90 ? '#10B981' : '#F59E0B', bg: cls.avgAttendance >= 90 ? 'bg-success/8' : 'bg-warning/8' },
                    { label: 'Avg Score',       value: `${cls.avgScore}%`,     icon: 'ChartBarIcon',              color: cls.avgScore >= 80 ? '#10B981' : '#F59E0B',       bg: cls.avgScore >= 80 ? 'bg-success/8' : 'bg-warning/8'      },
                    { label: 'At-Risk Students', value: cls.students.filter((s) => s.attendance < 80 || s.avgMarks < 65).length, icon: 'ExclamationTriangleIcon', color: '#EF4444', bg: 'bg-danger/8' },
                    { label: 'Pending Grading', value: cls.pendingGrading,     icon: 'DocumentTextIcon',          color: cls.pendingGrading > 0 ? '#F59E0B' : '#10B981',   bg: cls.pendingGrading > 0 ? 'bg-warning/8' : 'bg-success/8' },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border/50">
                      <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon name={s.icon as 'ChartBarIcon'} size={15} style={{ color: s.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-2xs text-muted">{s.label}</div>
                        <div className="text-sm font-800 text-foreground">{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Weekly Schedule</div>
                <div className="flex flex-wrap gap-2">
                  {cls.schedule.map((sc) => (
                    <div key={sc.day} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background border border-border/50">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-800 text-white" style={{ backgroundColor: cls.color }}>
                        {sc.day}
                      </div>
                      <span className="text-xs font-600 text-foreground">{sc.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top & bottom students */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Top Performers',    students: [...cls.students].sort((a, b) => b.avgMarks - a.avgMarks).slice(0, 3), accent: 'text-success', dotBg: 'bg-success' },
                  { label: 'Needs Attention',   students: [...cls.students].sort((a, b) => a.avgMarks - b.avgMarks).slice(0, 3),  accent: 'text-danger',  dotBg: 'bg-danger'  },
                ].map((group) => (
                  <div key={group.label} className="bg-background rounded-2xl border border-border/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${group.dotBg}`} />
                      <span className="text-2xs font-700 text-muted-light uppercase tracking-widest">{group.label}</span>
                    </div>
                    <div className="space-y-2.5">
                      {group.students.map((s) => (
                        <div key={s.roll} className="flex items-center gap-2.5">
                          <StudentAvatar name={s.name} color={cls.color} />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-600 text-foreground truncate">{s.name}</div>
                            <div className="text-2xs text-muted">{s.avgMarks}/100 · {s.attendance}% att.</div>
                          </div>
                          <GradeBadge grade={s.grade} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ROSTER TAB ── */}
          {activeTab === 'roster' && (
            <div className="space-y-4">
              <div className="relative max-w-sm">
                <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-white border border-border/60 rounded-xl text-xs text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <ClassRoster cls={cls} search={search} />
            </div>
          )}

          {/* ── PERFORMANCE TAB ── */}
          {activeTab === 'performance' && (
            <div className="space-y-5">

              {/* Grade distribution */}
              <div>
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Grade Distribution</div>
                <div className="flex flex-wrap gap-3">
                  {(['A+', 'A', 'B+', 'B', 'C'] as const).map((g) => {
                    const count = cls.students.filter((s) => s.grade === g).length;
                    const c = gradeColors[g];
                    return (
                      <div key={g} className={`flex flex-col items-center gap-1 px-5 py-3 rounded-2xl border ${c.bg} ${g === 'A+' ? 'border-success/20' : g === 'A' ? 'border-primary/20' : g === 'B+' ? 'border-accent/20' : g === 'B' ? 'border-warning/20' : 'border-danger/20'}`}>
                        <span className={`font-display text-2xl font-900 ${c.text}`}>{g}</span>
                        <span className="text-xs font-700 text-foreground">{count} student{count !== 1 ? 's' : ''}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Class comparison bar chart */}
              <div className="bg-background rounded-2xl border border-border/50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-700 text-xs text-foreground">All Classes Comparison</h3>
                  <span className="text-2xs text-muted">Score vs Attendance</span>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={comparisonData} barGap={4} barSize={14} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="class" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} />
                    <Bar dataKey="Avg Score"      fill="#1C4ED8" radius={[4, 4, 0, 0]}>
                      {comparisonData.map((_, i) => (
                        <Cell key={i} fill={classes[i].color} />
                      ))}
                    </Bar>
                    <Bar dataKey="Avg Attendance" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Individual student score bars */}
              <div className="bg-background rounded-2xl border border-border/50 p-4">
                <h3 className="font-700 text-xs text-foreground mb-4">Individual Student Scores</h3>
                <div className="space-y-3">
                  {[...cls.students].sort((a, b) => b.avgMarks - a.avgMarks).map((s) => (
                    <div key={s.roll}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <StudentAvatar name={s.name} color={cls.color} />
                          <span className="text-xs font-600 text-foreground">{s.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted">{s.avgMarks}/100</span>
                          <GradeBadge grade={s.grade} />
                        </div>
                      </div>
                      <div className="h-1.5 bg-border-light rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${s.avgMarks}%`, backgroundColor: cls.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
