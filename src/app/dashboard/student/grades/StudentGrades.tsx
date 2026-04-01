'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SubjectResult {
  subject: string;
  color: string;
  teacher: string;
  term1: number;
  term2: number;
  max: number;
  grade: string;
  rank: number;
  classAvg: number;
}

interface ExamRow {
  subject: string;
  color: string;
  written: number;
  practical: number;
  internal: number;
  total: number;
  max: number;
  grade: string;
  remark: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const subjects: SubjectResult[] = [
  { subject: 'Mathematics',        color: '#1C4ED8', teacher: 'Mrs. Meera Iyer',    term1: 82, term2: 88, max: 100, grade: 'A',  rank: 4,  classAvg: 74 },
  { subject: 'Science',            color: '#10B981', teacher: 'Mrs. Priya Nair',    term1: 89, term2: 92, max: 100, grade: 'A+', rank: 2,  classAvg: 78 },
  { subject: 'English',            color: '#0EA5E9', teacher: 'Mr. Anil Kapoor',    term1: 75, term2: 79, max: 100, grade: 'B+', rank: 9,  classAvg: 71 },
  { subject: 'Social Studies',     color: '#8B5CF6', teacher: 'Mr. Ramesh Kumar',   term1: 80, term2: 85, max: 100, grade: 'A',  rank: 6,  classAvg: 72 },
  { subject: 'Hindi',              color: '#F59E0B', teacher: 'Mrs. Sunita Devi',   term1: 87, term2: 90, max: 100, grade: 'A+', rank: 3,  classAvg: 76 },
  { subject: 'Physical Education', color: '#EF4444', teacher: 'Mr. Suresh Rao',     term1: 91, term2: 94, max: 100, grade: 'A+', rank: 1,  classAvg: 80 },
  { subject: 'Computer Science',   color: '#0D9488', teacher: 'Mr. Rajiv Sharma',   term1: 84, term2: 88, max: 100, grade: 'A',  rank: 5,  classAvg: 75 },
  { subject: 'Art',                color: '#EC4899', teacher: 'Ms. Kavya Menon',    term1: 88, term2: 91, max: 100, grade: 'A+', rank: 2,  classAvg: 79 },
];

const detailedExam: ExamRow[] = [
  { subject: 'Mathematics',        color: '#1C4ED8', written: 72, practical: 0,  internal: 16, total: 88, max: 100, grade: 'A',  remark: 'Good' },
  { subject: 'Science',            color: '#10B981', written: 70, practical: 14, internal: 8,  total: 92, max: 100, grade: 'A+', remark: 'Excellent' },
  { subject: 'English',            color: '#0EA5E9', written: 65, practical: 0,  internal: 14, total: 79, max: 100, grade: 'B+', remark: 'Satisfactory' },
  { subject: 'Social Studies',     color: '#8B5CF6', written: 72, practical: 0,  internal: 13, total: 85, max: 100, grade: 'A',  remark: 'Good' },
  { subject: 'Hindi',              color: '#F59E0B', written: 76, practical: 0,  internal: 14, total: 90, max: 100, grade: 'A+', remark: 'Excellent' },
  { subject: 'Physical Education', color: '#EF4444', written: 0,  practical: 80, internal: 14, total: 94, max: 100, grade: 'A+', remark: 'Outstanding' },
  { subject: 'Computer Science',   color: '#0D9488', written: 68, practical: 12, internal: 8,  total: 88, max: 100, grade: 'A',  remark: 'Good' },
  { subject: 'Art',                color: '#EC4899', written: 0,  practical: 77, internal: 14, total: 91, max: 100, grade: 'A+', remark: 'Excellent' },
];

const comparisonData = subjects.map((s) => ({
  subject: s.subject.split(' ')[0],
  'Your Marks': s.term2,
  'Class Avg':  s.classAvg,
}));

const progressData = subjects.map((s) => ({
  subject: s.subject.split(' ')[0],
  Term1: s.term1,
  Term2: s.term2,
}));

const radarData = subjects.map((s) => ({
  subject: s.subject.split(' ')[0],
  value: s.term2,
}));

const totalMarks   = subjects.reduce((s, x) => s + x.term2, 0);
const totalMax     = subjects.reduce((s, x) => s + x.max,   0);
const overallPct   = Math.round((totalMarks / totalMax) * 100);
const classRankAvg = Math.round(subjects.reduce((s, x) => s + x.rank, 0) / subjects.length);

const gradeMap: Record<string, { bg: string; text: string }> = {
  'A+': { bg: 'bg-success/10', text: 'text-success' },
  'A':  { bg: 'bg-primary/8',  text: 'text-primary' },
  'B+': { bg: 'bg-accent/10',  text: 'text-accent'  },
  'B':  { bg: 'bg-warning/10', text: 'text-warning'  },
  'C':  { bg: 'bg-danger/10',  text: 'text-danger'   },
};

function GradeBadge({ grade }: { grade: string }) {
  const c = gradeMap[grade] ?? gradeMap['B'];
  return <span className={`text-2xs font-800 px-2 py-0.5 rounded-md ${c.bg} ${c.text}`}>{grade}</span>;
}

function RemarkBadge({ remark }: { remark: string }) {
  const map: Record<string, string> = {
    Outstanding:   'bg-success/10 text-success',
    Excellent:     'bg-primary/8  text-primary',
    Good:          'bg-accent/10  text-accent',
    Satisfactory:  'bg-warning/10 text-warning',
  };
  return <span className={`text-2xs font-600 px-2 py-0.5 rounded-full ${map[remark] ?? 'bg-border-light text-muted'}`}>{remark}</span>;
}

const tabs = ['Overview', 'Term Results', 'Detailed Marks', 'Progress'] as const;
type Tab = typeof tabs[number];

// ─── Component ────────────────────────────────────────────────────────────────
export default function StudentGrades() {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Grades &amp; Results</h1>
          <p className="text-sm text-muted mt-0.5">Grade 10A · Greenwood Academy · Term 2 · 2025–26</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success text-xs font-600 rounded-xl">
            <Icon name="TrophyIcon" size={14} />
            Class Rank #3
          </span>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Score',   value: `${totalMarks}/${totalMax}`, sub: 'All subjects combined', icon: 'ChartBarIcon',      color: '#1C4ED8', bg: 'bg-primary/8'  },
          { label: 'Overall %',       value: `${overallPct}%`,            sub: 'Term 2 aggregate',      icon: 'AcademicCapIcon',   color: '#10B981', bg: 'bg-success/8'  },
          { label: 'Best Subject',    value: 'Phys. Ed.',                 sub: '94/100 · A+',           icon: 'StarIcon',          color: '#F59E0B', bg: 'bg-warning/8'  },
          { label: 'Class Rank',      value: '#3',                        sub: 'Out of 42 students',    icon: 'TrophyIcon',        color: '#8B5CF6', bg: 'bg-purple-50'  },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'ChartBarIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl w-full sm:w-fit overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-600 transition-all ${
              activeTab === t
                ? 'bg-white text-primary shadow-soft border border-border/60'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════ OVERVIEW ══════════════════════════════ */}
      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Radar chart */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <h3 className="font-display font-700 text-sm text-foreground mb-1">Performance Radar</h3>
              <p className="text-2xs text-muted mb-4">Term 2 · All subjects</p>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Radar dataKey="value" stroke="#1C4ED8" fill="#1C4ED8" fillOpacity={0.15} strokeWidth={2} dot={{ r: 3, fill: '#1C4ED8' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Subject score cards */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <h3 className="font-display font-700 text-sm text-foreground mb-4">Subject Scores — Term 2</h3>
              <div className="space-y-3">
                {subjects.map((s) => (
                  <div key={s.subject}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                        <span className="text-xs font-600 text-foreground truncate">{s.subject}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className="text-xs text-muted">{s.term2}/{s.max}</span>
                        <GradeBadge grade={s.grade} />
                        <span className="text-2xs text-muted-light hidden sm:inline">Rank #{s.rank}</span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-border-light rounded-full overflow-hidden">
                      {/* Class average marker */}
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-muted-light/60 z-10"
                        style={{ left: `${s.classAvg}%` }}
                      />
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${s.term2}%`, backgroundColor: s.color }}
                      />
                    </div>
                    <div className="flex justify-between mt-0.5">
                      <span className="text-2xs text-muted-light">Class avg: {s.classAvg}%</span>
                      <span className="text-2xs font-600" style={{ color: s.color }}>+{s.term2 - s.classAvg} above avg</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* You vs Class Avg bar chart */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-700 text-sm text-foreground">You vs Class Average</h3>
              <span className="text-2xs text-muted">Term 2 · 2025–26</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={comparisonData} barGap={4} barSize={14} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="Your Marks" fill="#1C4ED8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Class Avg"  fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ══════════════════════════════ TERM RESULTS ═══════════════════════════ */}
      {activeTab === 'Term Results' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(['Term 1', 'Term 2'] as const).map((term) => {
              const isT2 = term === 'Term 2';
              const data = subjects.map((s) => ({ subject: s.subject, marks: isT2 ? s.term2 : s.term1, color: s.color, grade: s.grade, max: s.max }));
              const total = data.reduce((acc, d) => acc + d.marks, 0);
              const pct   = Math.round((total / (subjects.length * 100)) * 100);
              return (
                <div key={term} className={`bg-white rounded-2xl border shadow-soft overflow-hidden ${isT2 ? 'border-primary/20' : 'border-border/60'}`}>
                  {/* Card header */}
                  <div className={`px-5 py-4 border-b flex items-center justify-between ${isT2 ? 'bg-primary/5 border-primary/15' : 'bg-background border-border/40'}`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-700 text-sm text-foreground">{term} Results</h3>
                        {isT2 && <span className="text-2xs bg-primary/10 text-primary font-700 px-2 py-0.5 rounded-full">Latest</span>}
                      </div>
                      <p className="text-2xs text-muted mt-0.5">{isT2 ? 'Nov 2025 – Mar 2026' : 'Apr – Oct 2025'}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-xl font-800 text-foreground">{total}/{subjects.length * 100}</div>
                      <div className={`text-xs font-700 ${pct >= 85 ? 'text-success' : pct >= 70 ? 'text-warning' : 'text-danger'}`}>{pct}%</div>
                    </div>
                  </div>
                  {/* Subject rows */}
                  <div className="divide-y divide-border/30">
                    {data.map((d) => (
                      <div key={d.subject} className="flex items-center gap-3 px-5 py-3 hover:bg-background/60 transition-colors">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                        <span className="flex-1 text-xs font-600 text-foreground min-w-0 truncate">{d.subject}</span>
                        <span className="text-xs text-muted">{d.marks}/{d.max}</span>
                        <div className="w-16 h-1.5 bg-border-light rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${d.marks}%`, backgroundColor: d.color }} />
                        </div>
                        <GradeBadge grade={d.grade} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grade distribution */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <h3 className="font-display font-700 text-sm text-foreground mb-4">Grade Distribution — Term 2</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { grade: 'A+', count: subjects.filter((s) => s.grade === 'A+').length, desc: '90–100 marks', bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20' },
                { grade: 'A',  count: subjects.filter((s) => s.grade === 'A').length,  desc: '80–89 marks',  bg: 'bg-primary/8',  text: 'text-primary',  border: 'border-primary/20' },
                { grade: 'B+', count: subjects.filter((s) => s.grade === 'B+').length, desc: '70–79 marks',  bg: 'bg-accent/8',   text: 'text-accent',   border: 'border-accent/20'  },
                { grade: 'B',  count: subjects.filter((s) => s.grade === 'B').length,  desc: '60–69 marks',  bg: 'bg-warning/8',  text: 'text-warning',  border: 'border-warning/20' },
              ].map((g) => (
                <div key={g.grade} className={`rounded-2xl border p-4 ${g.bg} ${g.border}`}>
                  <div className={`font-display text-3xl font-900 ${g.text}`}>{g.grade}</div>
                  <div className="font-700 text-foreground text-sm mt-1">{g.count} subject{g.count !== 1 ? 's' : ''}</div>
                  <div className="text-2xs text-muted mt-0.5">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════ DETAILED MARKS ═══════════════════════════ */}
      {activeTab === 'Detailed Marks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div>
                <h3 className="font-display font-700 text-sm text-foreground">Detailed Marksheet — Term 2</h3>
                <p className="text-2xs text-muted mt-0.5">Written + Practical + Internal assessment breakdown</p>
              </div>
              <span className="text-2xs bg-primary/8 text-primary font-700 px-2.5 py-1 rounded-lg">Nov 2025 – Mar 2026</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-background">
                    <th className="px-5 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider">Subject</th>
                    <th className="px-3 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Written</th>
                    <th className="px-3 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Practical</th>
                    <th className="px-3 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Internal</th>
                    <th className="px-3 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Total</th>
                    <th className="px-3 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Grade</th>
                    <th className="px-4 py-3 text-center text-2xs font-700 text-muted-light uppercase tracking-wider">Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedExam.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 hover:bg-background/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                          <span className="font-600 text-foreground">{row.subject}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        {row.written > 0 ? (
                          <span className="font-600 text-foreground">{row.written}</span>
                        ) : (
                          <span className="text-muted-light">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        {row.practical > 0 ? (
                          <span className="font-600 text-foreground">{row.practical}</span>
                        ) : (
                          <span className="text-muted-light">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <span className="font-600 text-foreground">{row.internal}</span>
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <span className="font-800 text-foreground">{row.total}/{row.max}</span>
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        <GradeBadge grade={row.grade} />
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <RemarkBadge remark={row.remark} />
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Totals row */}
                <tfoot>
                  <tr className="bg-primary/5 border-t border-primary/15">
                    <td className="px-5 py-3.5 font-700 text-foreground">Grand Total</td>
                    <td colSpan={3} />
                    <td className="px-3 py-3.5 text-center font-800 text-primary text-sm">{totalMarks}/{totalMax}</td>
                    <td className="px-3 py-3.5 text-center">
                      <span className="text-xs font-800 text-primary">{overallPct}%</span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <RemarkBadge remark="Excellent" />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Teacher remarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detailedExam.slice(0, 6).map((row) => (
              <div key={row.subject} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: row.color }} />
                  <span className="text-xs font-700 text-foreground">{row.subject}</span>
                  <GradeBadge grade={row.grade} />
                </div>
                <div className="h-1.5 bg-border-light rounded-full overflow-hidden mb-3">
                  <div className="h-full rounded-full" style={{ width: `${(row.total / row.max) * 100}%`, backgroundColor: row.color }} />
                </div>
                <p className="text-2xs text-muted leading-relaxed">
                  {row.remark === 'Outstanding' && 'Exceptional performance. Keep up the great work!'}
                  {row.remark === 'Excellent'   && 'Very strong performance across all assessments.'}
                  {row.remark === 'Good'        && 'Solid work. Focus on consistent revision for further improvement.'}
                  {row.remark === 'Satisfactory' && 'Adequate performance. Identify weak areas and practise more.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════ PROGRESS ══════════════════════════════ */}
      {activeTab === 'Progress' && (
        <div className="space-y-6">
          {/* Term-over-term line chart */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-700 text-sm text-foreground">Term 1 vs Term 2 Progress</h3>
              <span className="text-2xs text-muted">2025–26 Academic Year</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={progressData} barGap={4} barSize={16} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                <Bar dataKey="Term1" fill="#CBD5E1" radius={[4, 4, 0, 0]} name="Term 1" />
                <Bar dataKey="Term2" fill="#1C4ED8" radius={[4, 4, 0, 0]} name="Term 2" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Per-subject improvement */}
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50">
              <h3 className="font-display font-700 text-sm text-foreground">Subject-wise Improvement</h3>
              <p className="text-2xs text-muted mt-0.5">Term 1 → Term 2 change</p>
            </div>
            <div className="divide-y divide-border/30">
              {subjects.map((s) => {
                const delta = s.term2 - s.term1;
                const improved = delta >= 0;
                return (
                  <div key={s.subject} className="flex items-center gap-4 px-5 py-3.5 hover:bg-background/50 transition-colors">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="flex-1 text-xs font-600 text-foreground min-w-0 truncate">{s.subject}</span>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-2xs text-muted w-8 text-right">{s.term1}</span>
                      <Icon name="ArrowRightIcon" size={12} className="text-muted-light" />
                      <span className="text-xs font-700 text-foreground w-8">{s.term2}</span>
                      <span className={`inline-flex items-center gap-0.5 text-2xs font-700 px-2 py-0.5 rounded-full ${
                        improved ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
                      }`}>
                        <Icon name={improved ? 'ArrowTrendingUpIcon' : 'ArrowTrendingDownIcon'} size={10} />
                        {improved ? '+' : ''}{delta}
                      </span>
                      <GradeBadge grade={s.grade} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational summary */}
          <div className="bg-primary rounded-2xl p-5 text-white shadow-soft">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Icon name="TrophyIcon" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-display font-700 text-base">Great Progress This Term!</h3>
                <p className="text-sm opacity-80 mt-1 leading-relaxed">
                  You improved in <strong className="text-white">
                    {subjects.filter((s) => s.term2 > s.term1).length} out of {subjects.length}
                  </strong> subjects compared to Term 1. Your overall score rose from{' '}
                  <strong className="text-white">{subjects.reduce((a, s) => a + s.term1, 0)}</strong> to{' '}
                  <strong className="text-white">{totalMarks}</strong> — keep it up!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
