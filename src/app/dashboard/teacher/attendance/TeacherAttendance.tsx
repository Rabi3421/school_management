'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

// ─── Types ───────────────────────────────────────────────────────────────────
type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused' | null;

interface Student {
  roll: string;
  name: string;
  status: AttendanceStatus;
  monthlyAtt: number; // running % this month
  totalAtt: number;   // overall % this term
  lastAbsent: string;
}

interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  room: string;
  color: string;
  time: string;
  students: Student[];
}

interface HistoryEntry {
  date: string;
  day: string;
  classId: string;
  present: number;
  absent: number;
  late: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CLASSES: ClassInfo[] = [
  {
    id: '10a', name: 'Grade 10A', subject: 'Mathematics', room: 'C-204', color: '#1C4ED8',
    time: '8:00 – 8:45 AM',
    students: [
      { roll: 'SR-0101', name: 'Ananya Singh',   status: null, monthlyAtt: 96, totalAtt: 95, lastAbsent: '—'        },
      { roll: 'SR-0102', name: 'Rohit Verma',    status: null, monthlyAtt: 84, totalAtt: 82, lastAbsent: 'Mar 28'   },
      { roll: 'SR-0103', name: 'Priya Sharma',   status: null, monthlyAtt: 91, totalAtt: 90, lastAbsent: 'Mar 10'   },
      { roll: 'SR-0104', name: 'Aryan Kapoor',   status: null, monthlyAtt: 78, totalAtt: 76, lastAbsent: 'Mar 30'   },
      { roll: 'SR-0105', name: 'Meera Pillai',   status: null, monthlyAtt: 97, totalAtt: 96, lastAbsent: '—'        },
      { roll: 'SR-0106', name: 'Karan Malhotra', status: null, monthlyAtt: 88, totalAtt: 87, lastAbsent: 'Mar 20'   },
      { roll: 'SR-0107', name: 'Sita Reddy',     status: null, monthlyAtt: 94, totalAtt: 93, lastAbsent: 'Mar 5'    },
      { roll: 'SR-0108', name: 'Dev Nair',        status: null, monthlyAtt: 71, totalAtt: 70, lastAbsent: 'Mar 29'  },
      { roll: 'SR-0109', name: 'Pooja Joshi',    status: null, monthlyAtt: 93, totalAtt: 92, lastAbsent: 'Mar 12'   },
      { roll: 'SR-0110', name: 'Aditya Kumar',   status: null, monthlyAtt: 89, totalAtt: 88, lastAbsent: 'Mar 22'   },
    ],
  },
  {
    id: '10b', name: 'Grade 10B', subject: 'Mathematics', room: 'C-205', color: '#10B981',
    time: '11:15 – 12:00 PM',
    students: [
      { roll: 'SR-0201', name: 'Neha Gupta',     status: null, monthlyAtt: 90, totalAtt: 89, lastAbsent: 'Mar 15'   },
      { roll: 'SR-0202', name: 'Sameer Khan',    status: null, monthlyAtt: 82, totalAtt: 80, lastAbsent: 'Mar 27'   },
      { roll: 'SR-0203', name: 'Isha Mehta',     status: null, monthlyAtt: 95, totalAtt: 94, lastAbsent: '—'        },
      { roll: 'SR-0204', name: 'Rahul Bose',     status: null, monthlyAtt: 76, totalAtt: 74, lastAbsent: 'Mar 30'   },
      { roll: 'SR-0205', name: 'Tanya Singh',    status: null, monthlyAtt: 88, totalAtt: 87, lastAbsent: 'Mar 18'   },
      { roll: 'SR-0206', name: 'Vivek Rao',      status: null, monthlyAtt: 91, totalAtt: 90, lastAbsent: 'Mar 8'    },
      { roll: 'SR-0207', name: 'Divya Iyer',     status: null, monthlyAtt: 86, totalAtt: 85, lastAbsent: 'Mar 24'   },
      { roll: 'SR-0208', name: 'Suraj Patel',    status: null, monthlyAtt: 79, totalAtt: 77, lastAbsent: 'Mar 31'   },
    ],
  },
  {
    id: '9a', name: 'Grade 9A', subject: 'Mathematics', room: 'C-301', color: '#8B5CF6',
    time: '9:30 – 10:15 AM',
    students: [
      { roll: 'SR-0301', name: 'Aarav Sharma',   status: null, monthlyAtt: 98, totalAtt: 97, lastAbsent: '—'        },
      { roll: 'SR-0302', name: 'Riya Nair',      status: null, monthlyAtt: 94, totalAtt: 93, lastAbsent: 'Mar 3'    },
      { roll: 'SR-0303', name: 'Kabir Menon',    status: null, monthlyAtt: 90, totalAtt: 89, lastAbsent: 'Mar 19'   },
      { roll: 'SR-0304', name: 'Anushka Rao',    status: null, monthlyAtt: 96, totalAtt: 95, lastAbsent: '—'        },
      { roll: 'SR-0305', name: 'Ishaan Dutta',   status: null, monthlyAtt: 93, totalAtt: 92, lastAbsent: 'Mar 11'   },
      { roll: 'SR-0306', name: 'Fatima Sheikh',  status: null, monthlyAtt: 99, totalAtt: 98, lastAbsent: '—'        },
      { roll: 'SR-0307', name: 'Yash Agarwal',   status: null, monthlyAtt: 88, totalAtt: 86, lastAbsent: 'Mar 26'   },
    ],
  },
  {
    id: '9b', name: 'Grade 9B', subject: 'Mathematics', room: 'C-302', color: '#F59E0B',
    time: '1:45 – 2:30 PM',
    students: [
      { roll: 'SR-0401', name: 'Pooja Reddy',    status: null, monthlyAtt: 92, totalAtt: 91, lastAbsent: 'Mar 13'   },
      { roll: 'SR-0402', name: 'Nikhil Das',     status: null, monthlyAtt: 86, totalAtt: 84, lastAbsent: 'Mar 25'   },
      { roll: 'SR-0403', name: 'Shruti Pillai',  status: null, monthlyAtt: 91, totalAtt: 90, lastAbsent: 'Mar 9'    },
      { roll: 'SR-0404', name: 'Omar Siddiqui',  status: null, monthlyAtt: 80, totalAtt: 78, lastAbsent: 'Mar 30'   },
      { roll: 'SR-0405', name: 'Kavya Jain',     status: null, monthlyAtt: 95, totalAtt: 94, lastAbsent: '—'        },
      { roll: 'SR-0406', name: 'Rohan Bhatt',    status: null, monthlyAtt: 83, totalAtt: 81, lastAbsent: 'Mar 23'   },
    ],
  },
];

const HISTORY: HistoryEntry[] = [
  { date: 'Mar 31', day: 'Mon', classId: '10a', present: 9,  absent: 1, late: 0 },
  { date: 'Mar 31', day: 'Mon', classId: '10b', present: 7,  absent: 1, late: 0 },
  { date: 'Mar 31', day: 'Mon', classId: '9b',  present: 5,  absent: 1, late: 0 },
  { date: 'Mar 29', day: 'Sat', classId: '9a',  present: 6,  absent: 1, late: 0 },
  { date: 'Mar 29', day: 'Sat', classId: '10b', present: 8,  absent: 0, late: 0 },
  { date: 'Mar 28', day: 'Fri', classId: '9b',  present: 5,  absent: 0, late: 1 },
  { date: 'Mar 28', day: 'Fri', classId: '10a', present: 8,  absent: 1, late: 1 },
  { date: 'Mar 27', day: 'Thu', classId: '9a',  present: 7,  absent: 0, late: 0 },
  { date: 'Mar 26', day: 'Wed', classId: '10a', present: 10, absent: 0, late: 0 },
  { date: 'Mar 26', day: 'Wed', classId: '9b',  present: 6,  absent: 0, late: 0 },
  { date: 'Mar 25', day: 'Tue', classId: '9a',  present: 6,  absent: 1, late: 0 },
  { date: 'Mar 24', day: 'Mon', classId: '10b', present: 7,  absent: 0, late: 1 },
];

const weeklyTrend = [
  { week: 'W1 Mar', '10A': 92, '10B': 87, '9A': 96, '9B': 89 },
  { week: 'W2 Mar', '10A': 88, '10B': 85, '9A': 94, '9B': 91 },
  { week: 'W3 Mar', '10A': 94, '10B': 90, '9A': 97, '9B': 88 },
  { week: 'W4 Mar', '10A': 91, '10B': 86, '9A': 95, '9B': 90 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<NonNullable<AttendanceStatus>, { label: string; icon: string; bg: string; border: string; text: string; activeBg: string; dot: string }> = {
  present: { label: 'Present', icon: 'CheckCircleIcon',    bg: 'bg-success/8',  border: 'border-success/30',  text: 'text-success',  activeBg: 'bg-success',  dot: 'bg-success'  },
  absent:  { label: 'Absent',  icon: 'XCircleIcon',        bg: 'bg-danger/8',   border: 'border-danger/30',   text: 'text-danger',   activeBg: 'bg-danger',   dot: 'bg-danger'   },
  late:    { label: 'Late',    icon: 'ClockIcon',           bg: 'bg-warning/8',  border: 'border-warning/30',  text: 'text-warning',  activeBg: 'bg-warning',  dot: 'bg-warning'  },
  excused: { label: 'Excused', icon: 'InformationCircleIcon', bg: 'bg-accent/8', border: 'border-accent/30',   text: 'text-accent',   activeBg: 'bg-accent',   dot: 'bg-accent'   },
};

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-2xs font-800 flex-shrink-0"
      style={{ backgroundColor: `${color}18`, color }}>
      {initials}
    </div>
  );
}

function AttPill({ pct }: { pct: number }) {
  const color = pct >= 90 ? 'text-success bg-success/8' : pct >= 75 ? 'text-warning bg-warning/8' : 'text-danger bg-danger/8';
  return <span className={`text-2xs font-700 px-2 py-0.5 rounded-lg ${color}`}>{pct}%</span>;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TeacherAttendance() {
  const [activeClassId, setActiveClassId] = useState(CLASSES[0].id);
  const [activeTab, setActiveTab] = useState<'mark' | 'history' | 'analytics'>('mark');
  const [date, setDate] = useState('2026-04-01');
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Per-class student status maps
  const [statusMaps, setStatusMaps] = useState<Record<string, Record<string, AttendanceStatus>>>(() => {
    const initial: Record<string, Record<string, AttendanceStatus>> = {};
    CLASSES.forEach((cls) => {
      initial[cls.id] = {};
      cls.students.forEach((s) => { initial[cls.id][s.roll] = null; });
    });
    return initial;
  });

  const cls = CLASSES.find((c) => c.id === activeClassId)!;
  const statusMap = statusMaps[activeClassId];

  const setStatus = (roll: string, status: AttendanceStatus) => {
    setSubmitted(false);
    setStatusMaps((prev) => ({
      ...prev,
      [activeClassId]: { ...prev[activeClassId], [roll]: status },
    }));
  };

  const markAll = (status: NonNullable<AttendanceStatus>) => {
    setSubmitted(false);
    const next: Record<string, AttendanceStatus> = {};
    cls.students.forEach((s) => { next[s.roll] = status; });
    setStatusMaps((prev) => ({ ...prev, [activeClassId]: next }));
  };

  const counts = useMemo(() => {
    const vals = Object.values(statusMap);
    return {
      present: vals.filter((v) => v === 'present').length,
      absent:  vals.filter((v) => v === 'absent').length,
      late:    vals.filter((v) => v === 'late').length,
      excused: vals.filter((v) => v === 'excused').length,
      unmarked: vals.filter((v) => v === null).length,
    };
  }, [statusMap]);

  const filteredStudents = useMemo(() =>
    cls.students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase())
    ), [cls, search]);

  const allMarked = counts.unmarked === 0;
  const presentPct = cls.students.length > 0
    ? Math.round(((counts.present + counts.late) / cls.students.length) * 100)
    : 0;

  const handleSubmit = () => {
    if (!allMarked) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 900);
  };

  const classBarData = CLASSES.map((c) => {
    const map = statusMaps[c.id];
    const vals = Object.values(map);
    const total = c.students.length;
    const presentCount = vals.filter((v) => v === 'present' || v === 'late').length;
    const term = c.students.reduce((s, st) => s + st.totalAtt, 0) / total;
    return { class: c.name.replace('Grade ', ''), today: Math.round((presentCount / total) * 100), term: Math.round(term) };
  });

  const historyForClass = HISTORY.filter((h) => h.classId === activeClassId);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Mark Attendance</h1>
          <p className="text-sm text-muted mt-0.5">Mathematics · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="relative">
            <Icon name="CalendarDaysIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setSubmitted(false); }}
              className="pl-8 pr-3 py-2 bg-white border border-border/60 rounded-xl text-xs text-foreground focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Class selector ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {CLASSES.map((c) => {
          const map = statusMaps[c.id];
          const vals = Object.values(map);
          const markedCount = vals.filter((v) => v !== null).length;
          const isActive = activeClassId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => { setActiveClassId(c.id); setSearch(''); setSubmitted(false); }}
              className={`text-left p-4 rounded-2xl border shadow-soft transition-all hover:shadow-card ${
                isActive ? 'ring-2 ring-offset-1' : 'bg-white border-border/60 hover:border-border'
              }`}
              style={isActive ? { borderColor: c.color, backgroundColor: `${c.color}06`, outlineColor: `${c.color}40` } : {}}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-800 font-display text-white text-sm"
                  style={{ backgroundColor: c.color }}>
                  {c.name.replace('Grade ', '').replace(' ', '')}
                </div>
                {markedCount === c.students.length ? (
                  <Icon name="CheckCircleIcon" size={16} className="text-success" />
                ) : markedCount > 0 ? (
                  <span className="text-2xs text-warning font-600">{markedCount}/{c.students.length}</span>
                ) : (
                  <span className="text-2xs text-muted-light font-500">0/{c.students.length}</span>
                )}
              </div>
              <div className="font-700 text-xs text-foreground">{c.name}</div>
              <div className="text-2xs text-muted mt-0.5">{c.time}</div>
              <div className="mt-2 h-1.5 bg-border-light rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(markedCount / c.students.length) * 100}%`, backgroundColor: c.color }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Detail panel ── */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">

        {/* Class header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border/50"
          style={{ borderLeftWidth: 4, borderLeftColor: cls.color }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-800 text-base text-white flex-shrink-0"
              style={{ backgroundColor: cls.color }}>
              {cls.name.replace('Grade ', '').replace(' ', '')}
            </div>
            <div>
              <h2 className="font-display font-700 text-base text-foreground">{cls.name} — {cls.subject}</h2>
              <p className="text-2xs text-muted mt-0.5">Room {cls.room} · {cls.students.length} students · {cls.time}</p>
            </div>
          </div>
          {/* Tab toggles */}
          <div className="flex items-center gap-1 p-1 bg-background border border-border/60 rounded-xl self-start sm:self-auto">
            {(['mark', 'history', 'analytics'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-lg text-2xs font-600 capitalize transition-all ${
                  activeTab === t
                    ? 'bg-white text-primary shadow-soft border border-border/60'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {t === 'mark' ? 'Mark Attendance' : t === 'history' ? 'History' : 'Analytics'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">

          {/* ═══════════════════════ MARK TAB ═══════════════════════ */}
          {activeTab === 'mark' && (
            <div className="space-y-4">

              {/* Summary pills + quick actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(STATUS_CONFIG) as NonNullable<AttendanceStatus>[]).map((s) => (
                    <div key={s} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].border}`}>
                      <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].dot}`} />
                      <span className={`text-xs font-700 ${STATUS_CONFIG[s].text}`}>{counts[s]}</span>
                      <span className="text-2xs text-muted">{STATUS_CONFIG[s].label}</span>
                    </div>
                  ))}
                  {counts.unmarked > 0 && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-background border-border/50">
                      <span className="w-2 h-2 rounded-full bg-muted-light" />
                      <span className="text-xs font-700 text-muted">{counts.unmarked}</span>
                      <span className="text-2xs text-muted-light">Unmarked</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-2xs text-muted-light mr-1">Quick mark all:</span>
                  {(['present', 'absent'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => markAll(s)}
                      className={`px-3 py-1.5 rounded-xl text-2xs font-700 border transition-all ${STATUS_CONFIG[s].bg} ${STATUS_CONFIG[s].border} ${STATUS_CONFIG[s].text} hover:opacity-80`}
                    >
                      All {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xs text-muted">{cls.students.length - counts.unmarked} / {cls.students.length} marked</span>
                  {allMarked && <span className="text-2xs text-success font-600 flex items-center gap-1"><Icon name="CheckCircleIcon" size={12} />All marked</span>}
                </div>
                <div className="h-2 bg-border-light rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${((cls.students.length - counts.unmarked) / cls.students.length) * 100}%`, backgroundColor: cls.color }} />
                </div>
              </div>

              {/* Search */}
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

              {/* Student roster */}
              <div className="space-y-2.5">
                {filteredStudents.map((student) => {
                  const current = statusMap[student.roll];
                  const lowAtt = student.totalAtt < 80;
                  return (
                    <div
                      key={student.roll}
                      className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-2xl border transition-all ${
                        current ? `${STATUS_CONFIG[current].bg} ${STATUS_CONFIG[current].border}` : 'bg-background border-border/50'
                      }`}
                    >
                      {/* Student info */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Avatar name={student.name} color={cls.color} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-700 text-foreground">{student.name}</span>
                            {lowAtt && (
                              <span className="text-2xs bg-danger/10 text-danger font-600 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                <Icon name="ExclamationTriangleIcon" size={10} />Low att.
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                            <span className="text-2xs text-muted">{student.roll}</span>
                            <span className="text-2xs text-muted-light">·</span>
                            <span className="text-2xs text-muted">Term: </span>
                            <AttPill pct={student.totalAtt} />
                            {student.lastAbsent !== '—' && (
                              <>
                                <span className="text-2xs text-muted-light">·</span>
                                <span className="text-2xs text-muted">Last absent: {student.lastAbsent}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Status buttons */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {(Object.keys(STATUS_CONFIG) as NonNullable<AttendanceStatus>[]).map((s) => (
                          <button
                            key={s}
                            onClick={() => setStatus(student.roll, current === s ? null : s)}
                            title={STATUS_CONFIG[s].label}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                              current === s
                                ? `${STATUS_CONFIG[s].activeBg} border-transparent text-white shadow-soft`
                                : 'bg-white border-border/60 text-muted hover:border-border'
                            }`}
                          >
                            <Icon name={STATUS_CONFIG[s].icon as 'CheckCircleIcon'} size={15} />
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <div className="py-10 flex flex-col items-center gap-2 text-center">
                    <Icon name="MagnifyingGlassIcon" size={22} className="text-muted-light" />
                    <div className="text-xs font-600 text-muted">No students match your search</div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-border/40">
                <div className="text-xs text-muted">
                  {allMarked ? (
                    <span className="flex items-center gap-1.5 text-success font-600">
                      <Icon name="CheckCircleIcon" size={14} />
                      Ready to submit — {counts.present} present, {counts.absent} absent, {counts.late} late, {counts.excused} excused
                    </span>
                  ) : (
                    <span className="text-warning font-600 flex items-center gap-1.5">
                      <Icon name="ExclamationTriangleIcon" size={14} />
                      {counts.unmarked} student{counts.unmarked !== 1 ? 's' : ''} still unmarked
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!allMarked || submitting || submitted}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-700 transition-all ${
                    submitted
                      ? 'bg-success/10 text-success border border-success/20 cursor-default'
                      : allMarked && !submitting
                      ? 'bg-primary text-white hover:bg-primary/90 shadow-soft'
                      : 'bg-background border border-border/60 text-muted-light cursor-not-allowed'
                  }`}
                >
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</>
                  ) : submitted ? (
                    <><Icon name="CheckCircleIcon" size={16} />Attendance Saved</>
                  ) : (
                    <><Icon name="ClipboardDocumentCheckIcon" size={16} />Submit Attendance</>
                  )}
                </button>
              </div>

              {/* Success banner */}
              {submitted && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-success/8 border border-success/20">
                  <Icon name="CheckCircleIcon" size={18} className="text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-700 text-success">Attendance submitted successfully!</div>
                    <div className="text-xs text-muted mt-0.5">
                      {cls.name} · {new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · {counts.present} present, {counts.absent} absent, {counts.late} late, {counts.excused} excused
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════ HISTORY TAB ═══════════════════════ */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <p className="text-xs text-muted">Recent attendance records for <span className="font-700 text-foreground">{cls.name}</span></p>
              {historyForClass.length === 0 ? (
                <div className="py-12 flex flex-col items-center gap-2 text-center">
                  <Icon name="ClipboardDocumentCheckIcon" size={24} className="text-muted-light" />
                  <div className="text-xs font-600 text-muted">No history available yet for this class</div>
                </div>
              ) : (
                <div className="bg-background rounded-2xl border border-border/50 overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border/40">
                        {['Date', 'Day', 'Present', 'Absent', 'Late', 'Attendance %'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {historyForClass.map((row, i) => {
                        const total = row.present + row.absent + row.late;
                        const pct = total > 0 ? Math.round(((row.present + row.late) / total) * 100) : 0;
                        return (
                          <tr key={i} className="border-b border-border/30 hover:bg-white transition-colors">
                            <td className="px-4 py-3 font-700 text-foreground">{row.date}</td>
                            <td className="px-4 py-3 text-muted">{row.day}</td>
                            <td className="px-4 py-3">
                              <span className="flex items-center gap-1.5 text-success font-700">
                                <span className="w-2 h-2 rounded-full bg-success" />{row.present}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {row.absent > 0 ? (
                                <span className="flex items-center gap-1.5 text-danger font-700">
                                  <span className="w-2 h-2 rounded-full bg-danger" />{row.absent}
                                </span>
                              ) : <span className="text-muted">—</span>}
                            </td>
                            <td className="px-4 py-3">
                              {row.late > 0 ? (
                                <span className="flex items-center gap-1.5 text-warning font-700">
                                  <span className="w-2 h-2 rounded-full bg-warning" />{row.late}
                                </span>
                              ) : <span className="text-muted">—</span>}
                            </td>
                            <td className="px-4 py-3">
                              <AttPill pct={pct} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════ ANALYTICS TAB ═══════════════════════ */}
          {activeTab === 'analytics' && (
            <div className="space-y-5">

              {/* Today snapshot */}
              <div>
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Today's Snapshot — All Classes</div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {CLASSES.map((c) => {
                    const map = statusMaps[c.id];
                    const vals = Object.values(map);
                    const p = vals.filter((v) => v === 'present').length;
                    const a = vals.filter((v) => v === 'absent').length;
                    const l = vals.filter((v) => v === 'late').length;
                    const u = vals.filter((v) => v === null).length;
                    const total = c.students.length;
                    const pct = total > 0 ? Math.round(((p + l) / total) * 100) : 0;
                    return (
                      <div key={c.id} className="p-4 bg-background rounded-2xl border border-border/50">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-800 text-white text-xs"
                            style={{ backgroundColor: c.color }}>
                            {c.name.replace('Grade ', '').replace(' ', '')}
                          </div>
                          <span className="text-xs font-700 text-foreground">{c.name}</span>
                        </div>
                        {u === total ? (
                          <div className="text-2xs text-muted-light italic">Not marked yet</div>
                        ) : (
                          <>
                            <div className="font-display text-2xl font-800 text-foreground leading-none">{pct}<span className="text-sm font-600 text-muted">%</span></div>
                            <div className="text-2xs text-muted mt-0.5">Present rate</div>
                            <div className="mt-2 flex gap-1.5 text-2xs flex-wrap">
                              <span className="text-success font-600">{p}P</span>
                              <span className="text-danger font-600">{a}A</span>
                              <span className="text-warning font-600">{l}L</span>
                              {u > 0 && <span className="text-muted">{u}?</span>}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Weekly trend bar chart */}
              <div className="bg-background rounded-2xl border border-border/50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-700 text-xs text-foreground">Weekly Attendance Trend — March</h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    {CLASSES.map((c) => (
                      <span key={c.id} className="flex items-center gap-1 text-2xs text-muted">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name.replace('Grade ', '')}
                      </span>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyTrend} barGap={3} barSize={12} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} formatter={(v: number) => [`${v}%`]} />
                    {CLASSES.map((c) => (
                      <Bar key={c.id} dataKey={c.name.replace('Grade ', '')} fill={c.color} radius={[3, 3, 0, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Per-student low attendance list for selected class */}
              <div className="bg-background rounded-2xl border border-border/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="ExclamationTriangleIcon" size={15} className="text-danger" />
                  <h3 className="font-700 text-xs text-foreground">Students Below 85% Attendance — {cls.name}</h3>
                </div>
                {(() => {
                  const lowStudents = cls.students.filter((s) => s.totalAtt < 85);
                  if (lowStudents.length === 0) {
                    return (
                      <div className="flex items-center gap-2 text-xs text-success font-600">
                        <Icon name="CheckCircleIcon" size={14} />
                        All students are above 85% attendance. Great work!
                      </div>
                    );
                  }
                  return (
                    <div className="space-y-2.5">
                      {lowStudents.sort((a, b) => a.totalAtt - b.totalAtt).map((s) => (
                        <div key={s.roll} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border/50">
                          <Avatar name={s.name} color={cls.color} />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-700 text-foreground">{s.name}</div>
                            <div className="text-2xs text-muted">{s.roll} · Last absent: {s.lastAbsent}</div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <AttPill pct={s.totalAtt} />
                            <div className="text-2xs text-muted-light mt-0.5">{85 - s.totalAtt}% gap</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
