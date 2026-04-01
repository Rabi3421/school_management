'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, LineChart, Line, Legend,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
type LetterGrade = 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';

interface Assessment {
  id: string;
  label: string;       // e.g. "Unit Test 1"
  shortLabel: string;  // e.g. "UT1"
  outOf: number;
  type: 'unit-test' | 'mid-term' | 'terminal' | 'assignment' | 'practical';
  weight: number;      // percentage weight in final
}

interface StudentRow {
  roll: string;
  name: string;
  scores: Record<string, number | null>; // assessmentId → marks
}

interface ClassGradeData {
  id: string;
  name: string;
  color: string;
  assessments: Assessment[];
  students: StudentRow[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const GRADE_CONFIG: Record<LetterGrade, { bg: string; text: string; border: string }> = {
  'A+': { bg: 'bg-success/10',  text: 'text-success',  border: 'border-success/20'  },
  'A':  { bg: 'bg-primary/8',   text: 'text-primary',  border: 'border-primary/20'  },
  'B+': { bg: 'bg-accent/8',    text: 'text-accent',   border: 'border-accent/20'   },
  'B':  { bg: 'bg-warning/8',   text: 'text-warning',  border: 'border-warning/20'  },
  'C':  { bg: 'bg-orange-50',   text: 'text-orange-500', border: 'border-orange-200' },
  'D':  { bg: 'bg-danger/8',    text: 'text-danger',   border: 'border-danger/20'   },
  'F':  { bg: 'bg-danger/15',   text: 'text-danger',   border: 'border-danger/30'   },
};

function toLetterGrade(pct: number): LetterGrade {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 40) return 'D';
  return 'F';
}

function weightedScore(scores: Record<string, number | null>, assessments: Assessment[]): number | null {
  let totalWeight = 0, totalWeighted = 0;
  for (const a of assessments) {
    const s = scores[a.id];
    if (s !== null && s !== undefined) {
      totalWeighted += (s / a.outOf) * 100 * a.weight;
      totalWeight += a.weight;
    }
  }
  if (totalWeight === 0) return null;
  return Math.round(totalWeighted / totalWeight);
}

function GradeBadge({ grade }: { grade: LetterGrade }) {
  const c = GRADE_CONFIG[grade];
  return (
    <span className={`inline-flex items-center justify-center text-2xs font-800 px-2 py-0.5 rounded-md border ${c.bg} ${c.text} ${c.border}`}>
      {grade}
    </span>
  );
}

function ScoreCell({ score, outOf, isEditing, onChange }: {
  score: number | null; outOf: number; isEditing: boolean;
  onChange: (v: number | null) => void;
}) {
  const [val, setVal] = useState(score !== null ? String(score) : '');

  if (!isEditing) {
    if (score === null) return <span className="text-muted-light text-xs">—</span>;
    const pct = Math.round((score / outOf) * 100);
    const color = pct >= 80 ? 'text-success' : pct >= 60 ? 'text-warning' : 'text-danger';
    return <span className={`text-xs font-700 ${color}`}>{score}<span className="text-muted font-400 text-2xs">/{outOf}</span></span>;
  }

  return (
    <input
      type="number" min={0} max={outOf}
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => {
        const n = parseFloat(val);
        if (!isNaN(n) && n >= 0 && n <= outOf) onChange(n);
        else if (val === '') { onChange(null); setVal(''); }
        else setVal(score !== null ? String(score) : '');
      }}
      className="w-14 px-1.5 py-1 text-center text-xs font-700 bg-white border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const ASSESSMENTS_TEMPLATE: Assessment[] = [
  { id: 'ut1',  label: 'Unit Test 1',   shortLabel: 'UT1',  outOf: 25,  type: 'unit-test',  weight: 10 },
  { id: 'ut2',  label: 'Unit Test 2',   shortLabel: 'UT2',  outOf: 25,  type: 'unit-test',  weight: 10 },
  { id: 'mid',  label: 'Mid-Term Exam', shortLabel: 'MID',  outOf: 50,  type: 'mid-term',   weight: 20 },
  { id: 'a1',   label: 'Assignment 1',  shortLabel: 'AS1',  outOf: 20,  type: 'assignment', weight: 5  },
  { id: 'a2',   label: 'Assignment 2',  shortLabel: 'AS2',  outOf: 20,  type: 'assignment', weight: 5  },
  { id: 'prac', label: 'Practical',     shortLabel: 'PRC',  outOf: 30,  type: 'practical',  weight: 10 },
  { id: 'term', label: 'Terminal Exam', shortLabel: 'TRM',  outOf: 100, type: 'terminal',   weight: 40 },
];

const CLASS_DATA: ClassGradeData[] = [
  {
    id: '10a', name: 'Grade 10A', color: '#1C4ED8',
    assessments: ASSESSMENTS_TEMPLATE,
    students: [
      { roll: 'SR-0101', name: 'Ananya Singh',   scores: { ut1: 23, ut2: 22, mid: 44, a1: 18, a2: 19, prac: 27, term: 88 } },
      { roll: 'SR-0102', name: 'Rohit Verma',    scores: { ut1: 18, ut2: 17, mid: 35, a1: 15, a2: 14, prac: 22, term: 71 } },
      { roll: 'SR-0103', name: 'Priya Sharma',   scores: { ut1: 24, ut2: 23, mid: 46, a1: 19, a2: 20, prac: 28, term: 91 } },
      { roll: 'SR-0104', name: 'Aryan Kapoor',   scores: { ut1: 14, ut2: 15, mid: 28, a1: 12, a2: 11, prac: 18, term: 62 } },
      { roll: 'SR-0105', name: 'Meera Pillai',   scores: { ut1: 25, ut2: 24, mid: 48, a1: 20, a2: 20, prac: 29, term: 94 } },
      { roll: 'SR-0106', name: 'Karan Malhotra', scores: { ut1: 20, ut2: 19, mid: 38, a1: 16, a2: 17, prac: 24, term: 77 } },
      { roll: 'SR-0107', name: 'Sita Reddy',     scores: { ut1: 22, ut2: 21, mid: 42, a1: 17, a2: 18, prac: 26, term: 85 } },
      { roll: 'SR-0108', name: 'Dev Nair',        scores: { ut1: 11, ut2: 12, mid: 24, a1: 9,  a2: 10, prac: 15, term: 55 } },
      { roll: 'SR-0109', name: 'Pooja Joshi',    scores: { ut1: 21, ut2: 22, mid: 41, a1: 17, a2: 16, prac: 25, term: 83 } },
      { roll: 'SR-0110', name: 'Aditya Kumar',   scores: { ut1: 19, ut2: 20, mid: 37, a1: 15, a2: 16, prac: 23, term: 78 } },
    ],
  },
  {
    id: '10b', name: 'Grade 10B', color: '#10B981',
    assessments: ASSESSMENTS_TEMPLATE,
    students: [
      { roll: 'SR-0201', name: 'Neha Gupta',     scores: { ut1: 21, ut2: 20, mid: 40, a1: 16, a2: 17, prac: 25, term: 79 } },
      { roll: 'SR-0202', name: 'Sameer Khan',    scores: { ut1: 17, ut2: 16, mid: 33, a1: 13, a2: 14, prac: 21, term: 69 } },
      { roll: 'SR-0203', name: 'Isha Mehta',     scores: { ut1: 24, ut2: 23, mid: 46, a1: 19, a2: 20, prac: 28, term: 90 } },
      { roll: 'SR-0204', name: 'Rahul Bose',     scores: { ut1: 13, ut2: 14, mid: 26, a1: 10, a2: 11, prac: 17, term: 59 } },
      { roll: 'SR-0205', name: 'Tanya Singh',    scores: { ut1: 20, ut2: 19, mid: 37, a1: 15, a2: 16, prac: 23, term: 74 } },
      { roll: 'SR-0206', name: 'Vivek Rao',      scores: { ut1: 22, ut2: 21, mid: 41, a1: 17, a2: 18, prac: 26, term: 81 } },
      { roll: 'SR-0207', name: 'Divya Iyer',     scores: { ut1: 19, ut2: 20, mid: 38, a1: 15, a2: 16, prac: 24, term: 75 } },
      { roll: 'SR-0208', name: 'Suraj Patel',    scores: { ut1: 15, ut2: 14, mid: 30, a1: 11, a2: 12, prac: 19, term: 63 } },
    ],
  },
  {
    id: '9a', name: 'Grade 9A', color: '#8B5CF6',
    assessments: ASSESSMENTS_TEMPLATE,
    students: [
      { roll: 'SR-0301', name: 'Aarav Sharma',   scores: { ut1: 24, ut2: 25, mid: 47, a1: 19, a2: 20, prac: 28, term: 92 } },
      { roll: 'SR-0302', name: 'Riya Nair',      scores: { ut1: 22, ut2: 21, mid: 43, a1: 18, a2: 17, prac: 26, term: 86 } },
      { roll: 'SR-0303', name: 'Kabir Menon',    scores: { ut1: 20, ut2: 19, mid: 39, a1: 16, a2: 16, prac: 24, term: 80 } },
      { roll: 'SR-0304', name: 'Anushka Rao',    scores: { ut1: 23, ut2: 22, mid: 44, a1: 18, a2: 19, prac: 27, term: 88 } },
      { roll: 'SR-0305', name: 'Ishaan Dutta',   scores: { ut1: 21, ut2: 22, mid: 42, a1: 17, a2: 17, prac: 25, term: 84 } },
      { roll: 'SR-0306', name: 'Fatima Sheikh',  scores: { ut1: 25, ut2: 25, mid: 49, a1: 20, a2: 20, prac: 30, term: 96 } },
      { roll: 'SR-0307', name: 'Yash Agarwal',   scores: { ut1: 18, ut2: 18, mid: 36, a1: 14, a2: 15, prac: 22, term: 76 } },
    ],
  },
  {
    id: '9b', name: 'Grade 9B', color: '#F59E0B',
    assessments: ASSESSMENTS_TEMPLATE,
    students: [
      { roll: 'SR-0401', name: 'Pooja Reddy',    scores: { ut1: 21, ut2: 20, mid: 40, a1: 16, a2: 17, prac: 24, term: 81 } },
      { roll: 'SR-0402', name: 'Nikhil Das',     scores: { ut1: 18, ut2: 17, mid: 34, a1: 14, a2: 13, prac: 21, term: 72 } },
      { roll: 'SR-0403', name: 'Shruti Pillai',  scores: { ut1: 22, ut2: 23, mid: 43, a1: 18, a2: 19, prac: 26, term: 86 } },
      { roll: 'SR-0404', name: 'Omar Siddiqui',  scores: { ut1: 14, ut2: 15, mid: 28, a1: 10, a2: 11, prac: 17, term: 61 } },
      { roll: 'SR-0405', name: 'Kavya Jain',     scores: { ut1: 23, ut2: 22, mid: 44, a1: 18, a2: 18, prac: 27, term: 88 } },
      { roll: 'SR-0406', name: 'Rohan Bhatt',    scores: { ut1: 17, ut2: 18, mid: 34, a1: 13, a2: 14, prac: 20, term: 70 } },
    ],
  },
];

const TYPE_COLORS: Record<Assessment['type'], string> = {
  'unit-test':  '#1C4ED8',
  'mid-term':   '#8B5CF6',
  'terminal':   '#EF4444',
  'assignment': '#10B981',
  'practical':  '#F59E0B',
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TeacherGradebook() {
  const [activeClassId, setActiveClassId] = useState('10a');
  const [activeTab, setActiveTab] = useState<'gradebook' | 'analytics' | 'report'>('gradebook');
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [classData, setClassData] = useState<ClassGradeData[]>(CLASS_DATA);

  const cls = classData.find((c) => c.id === activeClassId)!;

  const handleScoreChange = (roll: string, assessmentId: string, value: number | null) => {
    setClassData((prev) =>
      prev.map((c) =>
        c.id === activeClassId
          ? { ...c, students: c.students.map((s) => s.roll === roll ? { ...s, scores: { ...s.scores, [assessmentId]: value } } : s) }
          : c
      )
    );
  };

  const filteredStudents = useMemo(() =>
    cls.students.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase())
    ), [cls, search]);

  // Stats
  const classStats = useMemo(() => {
    const totals = cls.students.map((s) => weightedScore(s.scores, cls.assessments));
    const valid = totals.filter((t): t is number => t !== null);
    const avg = valid.length ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length) : 0;
    const highest = valid.length ? Math.max(...valid) : 0;
    const lowest  = valid.length ? Math.min(...valid) : 0;
    const passing = valid.filter((t) => t >= 40).length;
    return { avg, highest, lowest, passing, total: cls.students.length };
  }, [cls]);

  // Grade distribution
  const gradeDist = useMemo(() => {
    const dist: Record<LetterGrade, number> = { 'A+': 0, A: 0, 'B+': 0, B: 0, C: 0, D: 0, F: 0 };
    cls.students.forEach((s) => {
      const score = weightedScore(s.scores, cls.assessments);
      if (score !== null) dist[toLetterGrade(score)]++;
    });
    return Object.entries(dist).map(([grade, count]) => ({ grade, count })).filter((d) => d.count > 0);
  }, [cls]);

  // Assessment averages for radar
  const radarData = useMemo(() =>
    cls.assessments.map((a) => {
      const scores = cls.students.map((s) => s.scores[a.id]).filter((v): v is number => v !== null);
      const avg = scores.length ? Math.round(scores.reduce((x, y) => x + y, 0) / scores.length) : 0;
      return { subject: a.shortLabel, avg: Math.round((avg / a.outOf) * 100), fullMark: 100 };
    }), [cls]);

  // Per-class average for cross-class line
  const crossClassData = useMemo(() =>
    cls.assessments.map((a) => {
      const entry: Record<string, string | number> = { name: a.shortLabel };
      classData.forEach((c) => {
        const scores = c.students.map((s) => s.scores[a.id]).filter((v): v is number => v !== null);
        entry[c.name.replace('Grade ', '')] = scores.length
          ? Math.round((scores.reduce((x, y) => x + y, 0) / scores.length / a.outOf) * 100)
          : 0;
      });
      return entry;
    }), [classData, cls.assessments]);

  // Top & bottom performers
  const ranked = useMemo(() =>
    [...cls.students]
      .map((s) => ({ ...s, total: weightedScore(s.scores, cls.assessments) ?? 0 }))
      .sort((a, b) => b.total - a.total),
    [cls]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Gradebook</h1>
          <p className="text-sm text-muted mt-0.5">Mathematics · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsEditing((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-700 transition-all shadow-soft ${
              isEditing
                ? 'bg-success text-white hover:bg-success/90'
                : 'bg-white border border-border/60 text-foreground hover:bg-background'
            }`}
          >
            <Icon name={isEditing ? 'CheckIcon' : 'PencilSquareIcon'} size={16} />
            {isEditing ? 'Save Changes' : 'Edit Scores'}
          </button>
        </div>
      </div>

      {/* ── Class selector ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {classData.map((c) => {
          const avg = Math.round(
            c.students
              .map((s) => weightedScore(s.scores, c.assessments))
              .filter((v): v is number => v !== null)
              .reduce((a, b, _, arr) => a + b / arr.length, 0)
          );
          const isActive = activeClassId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveClassId(c.id)}
              className={`text-left p-4 rounded-2xl border shadow-soft transition-all hover:shadow-card ${
                isActive ? 'ring-2 ring-offset-1' : 'bg-white border-border/60 hover:border-border'
              }`}
              style={isActive ? { borderColor: c.color, backgroundColor: `${c.color}06` } : {}}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-800 font-display text-white text-sm"
                  style={{ backgroundColor: c.color }}>
                  {c.name.replace('Grade ', '').replace(' ', '')}
                </div>
                <GradeBadge grade={toLetterGrade(avg)} />
              </div>
              <div className="font-700 text-xs text-foreground">{c.name}</div>
              <div className="font-display text-xl font-800 mt-1" style={{ color: c.color }}>{avg}<span className="text-sm font-600 text-muted">%</span></div>
              <div className="text-2xs text-muted mt-0.5">{c.students.length} students · class avg</div>
            </button>
          );
        })}
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Class Average', value: `${classStats.avg}%`,   icon: 'ChartBarIcon',       color: cls.color,   bg: 'bg-primary/8'  },
          { label: 'Highest Score', value: `${classStats.highest}%`, icon: 'TrophyIcon',        color: '#10B981',   bg: 'bg-success/8'  },
          { label: 'Lowest Score',  value: `${classStats.lowest}%`,  icon: 'ArrowTrendingDownIcon', color: '#EF4444', bg: 'bg-danger/8' },
          { label: 'Passing',       value: `${classStats.passing}/${classStats.total}`, icon: 'UserGroupIcon', color: '#8B5CF6', bg: 'bg-purple-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'ChartBarIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{cls.name}</div>
          </div>
        ))}
      </div>

      {/* ── Main panel ── */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">

        {/* Class header + tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-border/50"
          style={{ borderLeftWidth: 4, borderLeftColor: cls.color }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-800 text-base text-white"
              style={{ backgroundColor: cls.color }}>
              {cls.name.replace('Grade ', '').replace(' ', '')}
            </div>
            <div>
              <h2 className="font-display font-700 text-base text-foreground">{cls.name} — Mathematics</h2>
              <p className="text-2xs text-muted mt-0.5">{cls.students.length} students · {cls.assessments.length} assessments</p>
            </div>
          </div>
          <div className="flex items-center gap-1 p-1 bg-background border border-border/60 rounded-xl self-start sm:self-auto">
            {(['gradebook', 'analytics', 'report'] as const).map((t) => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-3 py-1.5 rounded-lg text-2xs font-600 capitalize transition-all ${
                  activeTab === t
                    ? 'bg-white text-primary shadow-soft border border-border/60'
                    : 'text-muted hover:text-foreground'
                }`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">

          {/* ═══════════ GRADEBOOK TAB ═══════════ */}
          {activeTab === 'gradebook' && (
            <div className="space-y-4">

              {/* Assessment weight legend */}
              <div className="flex flex-wrap gap-2">
                {cls.assessments.map((a) => (
                  <div key={a.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-background border border-border/40">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[a.type] }} />
                    <span className="text-2xs text-foreground font-600">{a.shortLabel}</span>
                    <span className="text-2xs text-muted-light">{a.outOf}m · {a.weight}%</span>
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-primary/6 border border-primary/20 rounded-xl text-xs text-primary font-600">
                  <Icon name="PencilSquareIcon" size={14} />
                  Editing mode — click any score cell to update marks. Changes are saved locally.
                </div>
              )}

              {/* Search */}
              <div className="relative max-w-sm">
                <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
                <input type="text" placeholder="Search students..." value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 bg-white border border-border/60 rounded-xl text-xs text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>

              {/* Gradebook table */}
              <div className="overflow-x-auto rounded-2xl border border-border/50">
                <table className="w-full min-w-[860px] text-xs">
                  <thead>
                    <tr className="bg-background border-b border-border/40">
                      <th className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider sticky left-0 bg-background z-10 min-w-[180px]">Student</th>
                      {cls.assessments.map((a) => (
                        <th key={a.id} className="px-3 py-3 text-center text-2xs font-700 uppercase tracking-wider whitespace-nowrap" style={{ color: TYPE_COLORS[a.type] }}>
                          {a.shortLabel}
                          <div className="text-muted-light font-500 normal-case tracking-normal">/{a.outOf}</div>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider whitespace-nowrap">Weighted %</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Grade</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, idx) => {
                      const total = weightedScore(student.scores, cls.assessments);
                      const grade = total !== null ? toLetterGrade(total) : null;
                      const rank  = ranked.findIndex((r) => r.roll === student.roll) + 1;
                      const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-background/40';
                      return (
                        <tr key={student.roll} className={`border-b border-border/30 hover:bg-primary/3 transition-colors ${rowBg}`}>
                          <td className={`px-4 py-3 sticky left-0 z-10 ${rowBg}`}>
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-2xs font-800 flex-shrink-0"
                                style={{ backgroundColor: `${cls.color}18`, color: cls.color }}>
                                {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <div className="font-700 text-foreground leading-tight">{student.name}</div>
                                <div className="text-2xs text-muted">{student.roll}</div>
                              </div>
                            </div>
                          </td>
                          {cls.assessments.map((a) => (
                            <td key={a.id} className="px-3 py-3 text-center">
                              <ScoreCell
                                score={student.scores[a.id] ?? null}
                                outOf={a.outOf}
                                isEditing={isEditing}
                                onChange={(v) => handleScoreChange(student.roll, a.id, v)}
                              />
                            </td>
                          ))}
                          <td className="px-4 py-3 text-center">
                            {total !== null ? (
                              <span className={`font-800 text-sm ${total >= 80 ? 'text-success' : total >= 60 ? 'text-warning' : 'text-danger'}`}>
                                {total}%
                              </span>
                            ) : <span className="text-muted-light">—</span>}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {grade ? <GradeBadge grade={grade} /> : <span className="text-muted-light">—</span>}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-700 ${rank <= 3 ? 'text-warning' : 'text-muted'}`}>
                              {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {/* Class average footer row */}
                    <tr className="bg-primary/4 border-t-2 border-primary/20">
                      <td className="px-4 py-3 sticky left-0 bg-primary/4 z-10 font-700 text-primary text-xs">Class Average</td>
                      {cls.assessments.map((a) => {
                        const scores = cls.students.map((s) => s.scores[a.id]).filter((v): v is number => v !== null);
                        const avg = scores.length ? Math.round(scores.reduce((x, y) => x + y, 0) / scores.length * 10) / 10 : null;
                        return (
                          <td key={a.id} className="px-3 py-3 text-center font-700 text-foreground text-xs">
                            {avg !== null ? avg : '—'}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center font-800 text-primary text-sm">{classStats.avg}%</td>
                      <td className="px-4 py-3 text-center"><GradeBadge grade={toLetterGrade(classStats.avg)} /></td>
                      <td className="px-4 py-3" />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ═══════════ ANALYTICS TAB ═══════════ */}
          {activeTab === 'analytics' && (
            <div className="space-y-5">

              {/* Grade distribution + radar side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* Grade distribution */}
                <div className="bg-background rounded-2xl border border-border/50 p-4">
                  <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-4">Grade Distribution — {cls.name}</div>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={gradeDist} barSize={28} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                      <XAxis dataKey="grade" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {gradeDist.map((d, i) => {
                          const c = GRADE_CONFIG[d.grade as LetterGrade];
                          const fill = d.grade === 'A+' ? '#10B981' : d.grade === 'A' ? '#1C4ED8' : d.grade === 'B+' ? '#0EA5E9' : d.grade === 'B' ? '#F59E0B' : d.grade === 'C' ? '#F97316' : '#EF4444';
                          return <rect key={i} fill={fill} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {gradeDist.map((d) => {
                      const c = GRADE_CONFIG[d.grade as LetterGrade];
                      return (
                        <div key={d.grade} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${c.bg} ${c.border}`}>
                          <span className={`font-800 text-xs ${c.text}`}>{d.grade}</span>
                          <span className="text-2xs text-muted">{d.count} student{d.count !== 1 ? 's' : ''}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Assessment performance radar */}
                <div className="bg-background rounded-2xl border border-border/50 p-4">
                  <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Assessment Averages</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#E2E8F0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94A3B8' }} />
                      <Radar name="Class Avg" dataKey="avg" stroke={cls.color} fill={cls.color} fillOpacity={0.2} strokeWidth={2} dot />
                      <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} formatter={(v: number) => [`${v}%`, 'Avg']} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cross-class comparison line chart */}
              <div className="bg-background rounded-2xl border border-border/50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xs font-700 text-muted-light uppercase tracking-widest">All Classes — Assessment-wise Avg (%)</div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {classData.map((c) => (
                      <span key={c.id} className="flex items-center gap-1 text-2xs text-muted">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name.replace('Grade ', '')}
                      </span>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={crossClassData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} formatter={(v: number) => [`${v}%`]} />
                    {classData.map((c) => (
                      <Line key={c.id} type="monotone" dataKey={c.name.replace('Grade ', '')} stroke={c.color} strokeWidth={2.5} dot={{ r: 4, fill: c.color, strokeWidth: 0 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Top 3 + bottom 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Top Performers',  students: ranked.slice(0, 3),   dot: 'bg-success', badge: ['🥇', '🥈', '🥉'] },
                  { label: 'Needs Support',   students: ranked.slice(-3).reverse(), dot: 'bg-danger',  badge: null },
                ].map((group) => (
                  <div key={group.label} className="bg-background rounded-2xl border border-border/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${group.dot}`} />
                      <span className="text-2xs font-700 text-muted-light uppercase tracking-widest">{group.label}</span>
                    </div>
                    <div className="space-y-2.5">
                      {group.students.map((s, i) => {
                        const grade = toLetterGrade(s.total);
                        return (
                          <div key={s.roll} className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-2xs font-800"
                              style={{ backgroundColor: `${cls.color}18`, color: cls.color }}>
                              {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-700 text-foreground truncate">{s.name}</div>
                              <div className="text-2xs text-muted">{s.total}% weighted</div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {group.badge ? (
                                <span className="text-base">{group.badge[i]}</span>
                              ) : (
                                <Icon name="ExclamationTriangleIcon" size={13} className="text-danger" />
                              )}
                              <GradeBadge grade={grade} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════ REPORT TAB ═══════════ */}
          {activeTab === 'report' && (
            <div className="space-y-5">
              <p className="text-xs text-muted">Printable report card summary for <span className="font-700 text-foreground">{cls.name}</span></p>

              {/* Report table */}
              <div className="overflow-x-auto rounded-2xl border border-border/50">
                <table className="w-full min-w-[640px] text-xs">
                  <thead>
                    <tr className="bg-background border-b border-border/40">
                      <th className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider">Student</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Tests Avg</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Assignments</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Mid-Term</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Terminal</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Final %</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Grade</th>
                      <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ranked.map((student, idx) => {
                      const s = student.scores;
                      const testsAvg = [s.ut1, s.ut2].filter((v): v is number => v !== null);
                      const tAvgPct = testsAvg.length ? Math.round((testsAvg.reduce((a, b) => a + b, 0) / testsAvg.length / 25) * 100) : null;
                      const assnPct = [s.a1, s.a2].filter((v): v is number => v !== null);
                      const aPct = assnPct.length ? Math.round((assnPct.reduce((a, b) => a + b, 0) / assnPct.length / 20) * 100) : null;
                      const midPct = s.mid !== null && s.mid !== undefined ? Math.round((s.mid / 50) * 100) : null;
                      const termPct = s.term !== null && s.term !== undefined ? s.term : null;
                      const finalPct = weightedScore(s, cls.assessments);
                      const grade = finalPct !== null ? toLetterGrade(finalPct) : null;
                      const rank = idx + 1;
                      return (
                        <tr key={student.roll} className={`border-b border-border/30 hover:bg-background/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-background/30'}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-2xs font-800"
                                style={{ backgroundColor: `${cls.color}18`, color: cls.color }}>
                                {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <div className="font-700 text-foreground">{student.name}</div>
                                <div className="text-2xs text-muted">{student.roll}</div>
                              </div>
                            </div>
                          </td>
                          {[tAvgPct, aPct, midPct, termPct].map((v, i) => (
                            <td key={i} className="px-4 py-3 text-center">
                              {v !== null ? (
                                <span className={`font-700 ${v >= 80 ? 'text-success' : v >= 60 ? 'text-warning' : 'text-danger'}`}>{v}%</span>
                              ) : <span className="text-muted-light">—</span>}
                            </td>
                          ))}
                          <td className="px-4 py-3 text-center">
                            {finalPct !== null ? (
                              <span className={`font-800 text-sm ${finalPct >= 80 ? 'text-success' : finalPct >= 60 ? 'text-warning' : 'text-danger'}`}>{finalPct}%</span>
                            ) : <span className="text-muted-light">—</span>}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {grade ? <GradeBadge grade={grade} /> : <span className="text-muted-light">—</span>}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-700 ${rank <= 3 ? 'text-warning' : 'text-muted'}`}>
                              {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-primary/4 border-t-2 border-primary/20">
                      <td className="px-4 py-3 font-700 text-primary text-xs">Class Average</td>
                      {[null, null, null, null].map((_, i) => <td key={i} />)}
                      <td className="px-4 py-3 text-center font-800 text-primary text-sm">{classStats.avg}%</td>
                      <td className="px-4 py-3 text-center"><GradeBadge grade={toLetterGrade(classStats.avg)} /></td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Print button */}
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-background transition-all shadow-soft">
                  <Icon name="PrinterIcon" size={16} className="text-muted" />
                  Print Report Cards
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
