'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ─────────────────────────────────────────────────────────────────────
type Status = 'pending' | 'submitted' | 'graded' | 'overdue';
type Priority = 'high' | 'medium' | 'low';

interface Assignment {
  id: number;
  subject: string;
  color: string;
  title: string;
  description: string;
  teacher: string;
  dueDate: string;
  dueLabel: string;
  status: Status;
  priority: Priority;
  submittedOn?: string;
  marks?: number;
  maxMarks?: number;
  grade?: string;
  feedback?: string;
  attachments: number;
}

// ─── Data ──────────────────────────────────────────────────────────────────────
const assignments: Assignment[] = [
  {
    id: 1,
    subject: 'Science',
    color: '#10B981',
    title: 'Research: Photosynthesis Process',
    description: 'Write a detailed 2-page report on the process of photosynthesis including light and dark reactions. Include labelled diagrams.',
    teacher: 'Mrs. Priya Nair',
    dueDate: '2026-04-01',
    dueLabel: 'Today',
    status: 'pending',
    priority: 'high',
    attachments: 1,
  },
  {
    id: 2,
    subject: 'Mathematics',
    color: '#1C4ED8',
    title: 'Chapter 12 Exercise — Probability',
    description: 'Complete all exercises from Chapter 12 (Probability) pages 234–241. Show all working steps for full marks.',
    teacher: 'Mrs. Meera Iyer',
    dueDate: '2026-04-02',
    dueLabel: 'Apr 2',
    status: 'pending',
    priority: 'high',
    attachments: 0,
  },
  {
    id: 3,
    subject: 'English',
    color: '#0EA5E9',
    title: 'Essay: My Favourite Season',
    description: 'Write a 400-word descriptive essay about your favourite season. Focus on sensory details and figurative language.',
    teacher: 'Mr. Anil Kapoor',
    dueDate: '2026-04-04',
    dueLabel: 'Apr 4',
    status: 'submitted',
    priority: 'medium',
    submittedOn: 'Mar 31, 2026',
    attachments: 1,
  },
  {
    id: 4,
    subject: 'Hindi',
    color: '#F59E0B',
    title: 'निबंध: मेरा प्रिय त्योहार',
    description: '300 शब्दों में अपने प्रिय त्योहार पर निबंध लिखें। उत्सव का महत्व और परिवार के साथ उसकी यादें शामिल करें।',
    teacher: 'Mrs. Sunita Devi',
    dueDate: '2026-04-05',
    dueLabel: 'Apr 5',
    status: 'pending',
    priority: 'medium',
    attachments: 0,
  },
  {
    id: 5,
    subject: 'Social Studies',
    color: '#8B5CF6',
    title: 'Map Work: Indian Rivers',
    description: 'Mark and label all major Indian rivers on the outline map provided. Include drainage basins and origin points.',
    teacher: 'Mr. Ramesh Kumar',
    dueDate: '2026-04-08',
    dueLabel: 'Apr 8',
    status: 'pending',
    priority: 'low',
    attachments: 2,
  },
  {
    id: 6,
    subject: 'Computer Science',
    color: '#0D9488',
    title: 'Python Program: Basic Calculator',
    description: 'Write a Python program that performs addition, subtraction, multiplication and division using functions. Submit the .py file.',
    teacher: 'Mr. Rajiv Sharma',
    dueDate: '2026-04-10',
    dueLabel: 'Apr 10',
    status: 'pending',
    priority: 'medium',
    attachments: 0,
  },
  {
    id: 7,
    subject: 'Mathematics',
    color: '#1C4ED8',
    title: 'Chapter 10 — Circles (Revision)',
    description: 'Solve the revision exercise at the end of Chapter 10. All construction problems must include compass steps.',
    teacher: 'Mrs. Meera Iyer',
    dueDate: '2026-03-25',
    dueLabel: 'Mar 25',
    status: 'graded',
    priority: 'high',
    submittedOn: 'Mar 24, 2026',
    marks: 18,
    maxMarks: 20,
    grade: 'A+',
    feedback: 'Excellent work! Construction steps were very clearly shown. Minor arithmetic error in Q4.',
    attachments: 1,
  },
  {
    id: 8,
    subject: 'Science',
    color: '#10B981',
    title: 'Lab Report: Acid-Base Titration',
    description: 'Write a complete lab report for the acid-base titration experiment performed in class on March 18.',
    teacher: 'Mrs. Priya Nair',
    dueDate: '2026-03-20',
    dueLabel: 'Mar 20',
    status: 'graded',
    priority: 'high',
    submittedOn: 'Mar 19, 2026',
    marks: 24,
    maxMarks: 25,
    grade: 'A+',
    feedback: 'Very thorough report. Observations and calculations are accurate.',
    attachments: 1,
  },
  {
    id: 9,
    subject: 'English',
    color: '#0EA5E9',
    title: 'Grammar Worksheet — Tenses',
    description: 'Complete the grammar worksheet on all 12 tenses with examples.',
    teacher: 'Mr. Anil Kapoor',
    dueDate: '2026-03-15',
    dueLabel: 'Mar 15',
    status: 'overdue',
    priority: 'medium',
    attachments: 1,
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
const statusMeta: Record<Status, { label: string; bg: string; text: string; dot: string }> = {
  pending:   { label: 'Pending',   bg: 'bg-warning/10',  text: 'text-warning',  dot: 'bg-warning'  },
  submitted: { label: 'Submitted', bg: 'bg-accent/10',   text: 'text-accent',   dot: 'bg-accent'   },
  graded:    { label: 'Graded',    bg: 'bg-success/10',  text: 'text-success',  dot: 'bg-success'  },
  overdue:   { label: 'Overdue',   bg: 'bg-danger/10',   text: 'text-danger',   dot: 'bg-danger'   },
};

const priorityMeta: Record<Priority, { label: string; bg: string; text: string }> = {
  high:   { label: 'High',   bg: 'bg-danger/8',   text: 'text-danger'  },
  medium: { label: 'Medium', bg: 'bg-warning/8',  text: 'text-warning' },
  low:    { label: 'Low',    bg: 'bg-success/8',  text: 'text-success' },
};

const gradeColors: Record<string, string> = {
  'A+': 'text-success', A: 'text-primary', 'B+': 'text-accent', B: 'text-warning',
};

const tabs = ['All', 'Pending', 'Submitted', 'Graded', 'Overdue'] as const;
type TabType = typeof tabs[number];

// ─── Sub-components ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Status }) {
  const m = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-2xs font-700 px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const m = priorityMeta[priority];
  return (
    <span className={`text-2xs font-600 px-2 py-0.5 rounded-md ${m.bg} ${m.text}`}>{m.label}</span>
  );
}

interface CardProps {
  a: Assignment;
  onSelect: (a: Assignment) => void;
  selected: boolean;
}

function AssignmentCard({ a, onSelect, selected }: CardProps) {
  const sm = statusMeta[a.status];
  return (
    <div
      onClick={() => onSelect(a)}
      className={`bg-white rounded-2xl border shadow-soft p-5 cursor-pointer transition-all hover:shadow-card ${
        selected ? 'border-primary/40 ring-2 ring-primary/15' : 'border-border/60 hover:border-border'
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${a.color}18` }}>
            <Icon name="DocumentTextIcon" size={16} style={{ color: a.color }} />
          </div>
          <div className="min-w-0">
            <div className="text-2xs font-700 mb-0.5" style={{ color: a.color }}>{a.subject}</div>
            <h4 className="text-xs font-700 text-foreground leading-snug line-clamp-1">{a.title}</h4>
          </div>
        </div>
        <StatusBadge status={a.status} />
      </div>

      {/* Description */}
      <p className="text-2xs text-muted leading-relaxed line-clamp-2 mb-3">{a.description}</p>

      {/* Footer row */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-2xs text-muted">
            <Icon name="CalendarDaysIcon" size={12} className="text-muted-light" />
            <span>Due: <span className={`font-600 ${a.dueLabel === 'Today' ? 'text-danger' : 'text-foreground'}`}>{a.dueLabel}</span></span>
          </div>
          {a.attachments > 0 && (
            <div className="flex items-center gap-1 text-2xs text-muted">
              <Icon name="PaperClipIcon" size={12} className="text-muted-light" />
              <span>{a.attachments}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <PriorityBadge priority={a.priority} />
          {a.status === 'graded' && a.marks !== undefined && (
            <span className={`text-xs font-800 ${gradeColors[a.grade ?? 'A'] ?? 'text-primary'}`}>
              {a.marks}/{a.maxMarks}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel ───────────────────────────────────────────────────────────────
function DetailPanel({ a, onClose }: { a: Assignment; onClose: () => void }) {
  const sm = statusMeta[a.status];
  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/50 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${a.color}18` }}>
            <Icon name="DocumentTextIcon" size={20} style={{ color: a.color }} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-700 mb-0.5" style={{ color: a.color }}>{a.subject}</div>
            <h3 className="font-display text-sm font-700 text-foreground leading-snug">{a.title}</h3>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:bg-border-light transition-colors flex-shrink-0">
          <Icon name="XMarkIcon" size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Status row */}
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={a.status} />
          <PriorityBadge priority={a.priority} />
          {a.status === 'graded' && a.grade && (
            <span className={`text-xs font-800 px-2.5 py-1 rounded-full bg-success/10 ${gradeColors[a.grade] ?? 'text-primary'}`}>
              Grade: {a.grade}
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Description</div>
          <p className="text-xs text-foreground leading-relaxed bg-background border border-border/50 rounded-xl p-3">{a.description}</p>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Teacher',    value: a.teacher,     icon: 'UserIcon'          },
            { label: 'Due Date',   value: a.dueLabel,    icon: 'CalendarDaysIcon'  },
            { label: 'Subject',    value: a.subject,     icon: 'BookOpenIcon'      },
            { label: 'Attachments', value: `${a.attachments} file(s)`, icon: 'PaperClipIcon' },
          ].map((m) => (
            <div key={m.label} className="bg-background rounded-xl border border-border/50 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon name={m.icon as 'UserIcon'} size={12} className="text-muted-light" />
                <span className="text-2xs text-muted-light">{m.label}</span>
              </div>
              <div className="text-xs font-600 text-foreground">{m.value}</div>
            </div>
          ))}
        </div>

        {/* Submission info */}
        {a.submittedOn && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-accent/8 border border-accent/20">
            <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0" />
            <div>
              <div className="text-xs font-700 text-accent">Submitted</div>
              <div className="text-2xs text-muted mt-0.5">{a.submittedOn}</div>
            </div>
          </div>
        )}

        {/* Graded result */}
        {a.status === 'graded' && a.marks !== undefined && (
          <div className="rounded-xl border border-success/20 bg-success/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-700 text-foreground">Result</div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-800 text-success">{a.marks}/{a.maxMarks}</span>
                <span className={`text-sm font-800 ${gradeColors[a.grade ?? 'A'] ?? 'text-primary'}`}>{a.grade}</span>
              </div>
            </div>
            {/* Score bar */}
            <div className="h-2 bg-border-light rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-success transition-all duration-700"
                style={{ width: `${Math.round(((a.marks ?? 0) / (a.maxMarks ?? 1)) * 100)}%` }}
              />
            </div>
            {a.feedback && (
              <div>
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-1">Teacher Feedback</div>
                <p className="text-xs text-foreground leading-relaxed">{a.feedback}</p>
              </div>
            )}
          </div>
        )}

        {/* Overdue warning */}
        {a.status === 'overdue' && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-danger/8 border border-danger/20">
            <Icon name="ExclamationTriangleIcon" size={16} className="text-danger flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-700 text-danger">Assignment Overdue</div>
              <p className="text-2xs text-muted mt-0.5 leading-relaxed">This assignment is past its due date. Please submit immediately or contact your teacher.</p>
            </div>
          </div>
        )}

        {/* Action button */}
        {(a.status === 'pending' || a.status === 'overdue') && (
          <button className={`w-full py-2.5 rounded-xl text-xs font-700 flex items-center justify-center gap-2 transition-all ${
            a.status === 'overdue'
              ? 'bg-danger text-white hover:bg-danger/90'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}>
            <Icon name="ArrowUpTrayIcon" size={14} />
            {a.status === 'overdue' ? 'Submit Late' : 'Submit Assignment'}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function StudentAssignments() {
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const [selected, setSelected] = useState<Assignment | null>(assignments[0]);
  const [search, setSearch]     = useState('');

  const filtered = useMemo(() => {
    let list = assignments;
    if (activeTab !== 'All') list = list.filter((a) => a.status === activeTab.toLowerCase());
    if (search.trim()) list = list.filter((a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.subject.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [activeTab, search]);

  const counts = useMemo(() => ({
    All:       assignments.length,
    Pending:   assignments.filter((a) => a.status === 'pending').length,
    Submitted: assignments.filter((a) => a.status === 'submitted').length,
    Graded:    assignments.filter((a) => a.status === 'graded').length,
    Overdue:   assignments.filter((a) => a.status === 'overdue').length,
  }), []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Assignments</h1>
          <p className="text-sm text-muted mt-0.5">Grade 10A · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 bg-danger/10 text-danger text-xs font-600 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
          {counts.Pending} pending · {counts.Overdue} overdue
        </span>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total',     value: counts.All,       sub: 'All assignments',    icon: 'DocumentTextIcon',         color: '#1C4ED8', bg: 'bg-primary/8'  },
          { label: 'Pending',   value: counts.Pending,   sub: 'Action required',    icon: 'ClockIcon',                color: '#F59E0B', bg: 'bg-warning/8'  },
          { label: 'Submitted', value: counts.Submitted, sub: 'Awaiting grade',     icon: 'ArrowUpTrayIcon',          color: '#0EA5E9', bg: 'bg-accent/8'   },
          { label: 'Graded',    value: counts.Graded,    sub: 'Results available',  icon: 'CheckBadgeIcon',           color: '#10B981', bg: 'bg-success/8'  },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'DocumentTextIcon'} size={18} style={{ color: s.color }} />
              </div>
              {s.label === 'Pending' && counts.Overdue > 0 && (
                <span className="text-2xs bg-danger/10 text-danger font-700 px-1.5 py-0.5 rounded-full">{counts.Overdue} late</span>
              )}
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs + Search ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
                activeTab === t
                  ? 'bg-white text-primary shadow-soft border border-border/60'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {t}
              <span className={`text-2xs font-700 px-1.5 py-0.5 rounded-full ${
                activeTab === t ? 'bg-primary/10 text-primary' : 'bg-border-light text-muted-light'
              }`}>
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 bg-white border border-border/60 rounded-xl text-xs text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* ── Main split layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Left: assignment list */}
        <div className="lg:col-span-3 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border/60 p-10 flex flex-col items-center gap-3 text-center shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-border-light flex items-center justify-center">
                <Icon name="DocumentTextIcon" size={24} className="text-muted-light" />
              </div>
              <div className="text-sm font-600 text-muted">No assignments found</div>
              <div className="text-xs text-muted-light">Try changing the filter or search query</div>
            </div>
          ) : (
            filtered.map((a) => (
              <AssignmentCard
                key={a.id}
                a={a}
                onSelect={setSelected}
                selected={selected?.id === a.id}
              />
            ))
          )}
        </div>

        {/* Right: detail panel */}
        <div className="lg:col-span-2 lg:sticky lg:top-0 lg:max-h-[calc(100vh-10rem)]">
          {selected ? (
            <DetailPanel a={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="bg-white rounded-2xl border border-border/60 p-10 flex flex-col items-center gap-3 text-center shadow-soft h-64">
              <div className="w-12 h-12 rounded-2xl bg-border-light flex items-center justify-center">
                <Icon name="CursorArrowRaysIcon" size={24} className="text-muted-light" />
              </div>
              <div className="text-sm font-600 text-muted">Select an assignment</div>
              <div className="text-xs text-muted-light">Click any card to view details</div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
