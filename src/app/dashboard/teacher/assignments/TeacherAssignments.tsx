'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

// ─── Types ───────────────────────────────────────────────────────────────────
type AssignmentStatus = 'active' | 'grading' | 'graded' | 'draft';
type Priority        = 'high' | 'medium' | 'low';
type SubmissionStatus = 'submitted' | 'pending' | 'late' | 'missing';

interface Submission {
  roll: string;
  name: string;
  status: SubmissionStatus;
  submittedAt: string;   // date string or ''
  marks: number | null;  // null = not graded
  outOf: number;
  remarks: string;
}

interface Assignment {
  id: string;
  title: string;
  classId: string;
  className: string;
  subject: string;
  dueDate: string;
  assignedDate: string;
  status: AssignmentStatus;
  priority: Priority;
  totalMarks: number;
  description: string;
  topic: string;
  submissions: Submission[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CLASS_COLORS: Record<string, string> = {
  '10a': '#1C4ED8',
  '10b': '#10B981',
  '9a':  '#8B5CF6',
  '9b':  '#F59E0B',
};

const ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    title: 'Quadratic Equations — Problem Set',
    classId: '10a', className: 'Grade 10A', subject: 'Mathematics',
    dueDate: 'Apr 3, 2026', assignedDate: 'Mar 27, 2026',
    status: 'active', priority: 'high', totalMarks: 20,
    description: 'Solve the given set of 10 quadratic equations using both factorisation and the quadratic formula. Show all working steps clearly.',
    topic: 'Algebra',
    submissions: [
      { roll: 'SR-0101', name: 'Ananya Singh',   status: 'submitted', submittedAt: 'Mar 30', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0102', name: 'Rohit Verma',    status: 'submitted', submittedAt: 'Mar 31', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0103', name: 'Priya Sharma',   status: 'submitted', submittedAt: 'Mar 28', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0104', name: 'Aryan Kapoor',   status: 'pending',   submittedAt: '',       marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0105', name: 'Meera Pillai',   status: 'submitted', submittedAt: 'Mar 29', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0106', name: 'Karan Malhotra', status: 'pending',   submittedAt: '',       marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0107', name: 'Sita Reddy',     status: 'submitted', submittedAt: 'Mar 30', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0108', name: 'Dev Nair',        status: 'missing',  submittedAt: '',       marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0109', name: 'Pooja Joshi',    status: 'submitted', submittedAt: 'Mar 31', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0110', name: 'Aditya Kumar',   status: 'late',      submittedAt: 'Apr 1',  marks: null, outOf: 20, remarks: '' },
    ],
  },
  {
    id: 'a2',
    title: 'Trigonometry — Identities Worksheet',
    classId: '10b', className: 'Grade 10B', subject: 'Mathematics',
    dueDate: 'Mar 28, 2026', assignedDate: 'Mar 21, 2026',
    status: 'grading', priority: 'high', totalMarks: 25,
    description: 'Prove the given 8 trigonometric identities and solve 5 application-based problems. Use standard notation throughout.',
    topic: 'Trigonometry',
    submissions: [
      { roll: 'SR-0201', name: 'Neha Gupta',     status: 'submitted', submittedAt: 'Mar 26', marks: 22,   outOf: 25, remarks: 'Excellent work' },
      { roll: 'SR-0202', name: 'Sameer Khan',    status: 'submitted', submittedAt: 'Mar 27', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0203', name: 'Isha Mehta',     status: 'submitted', submittedAt: 'Mar 25', marks: 24,   outOf: 25, remarks: 'Near perfect' },
      { roll: 'SR-0204', name: 'Rahul Bose',     status: 'late',      submittedAt: 'Mar 29', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0205', name: 'Tanya Singh',    status: 'submitted', submittedAt: 'Mar 27', marks: 19,   outOf: 25, remarks: 'Good attempt' },
      { roll: 'SR-0206', name: 'Vivek Rao',      status: 'submitted', submittedAt: 'Mar 26', marks: 21,   outOf: 25, remarks: '' },
      { roll: 'SR-0207', name: 'Divya Iyer',     status: 'submitted', submittedAt: 'Mar 28', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0208', name: 'Suraj Patel',    status: 'missing',   submittedAt: '',       marks: null, outOf: 25, remarks: '' },
    ],
  },
  {
    id: 'a3',
    title: 'Coordinate Geometry — Distance & Section Formula',
    classId: '9a', className: 'Grade 9A', subject: 'Mathematics',
    dueDate: 'Apr 5, 2026', assignedDate: 'Mar 29, 2026',
    status: 'active', priority: 'medium', totalMarks: 15,
    description: 'Complete the 12-question exercise on distance formula and section formula with clearly drawn diagrams on graph paper.',
    topic: 'Coordinate Geometry',
    submissions: [
      { roll: 'SR-0301', name: 'Aarav Sharma',   status: 'submitted', submittedAt: 'Apr 1',  marks: null, outOf: 15, remarks: '' },
      { roll: 'SR-0302', name: 'Riya Nair',      status: 'pending',   submittedAt: '',       marks: null, outOf: 15, remarks: '' },
      { roll: 'SR-0303', name: 'Kabir Menon',    status: 'pending',   submittedAt: '',       marks: null, outOf: 15, remarks: '' },
      { roll: 'SR-0304', name: 'Anushka Rao',    status: 'submitted', submittedAt: 'Mar 31', marks: null, outOf: 15, remarks: '' },
      { roll: 'SR-0305', name: 'Ishaan Dutta',   status: 'pending',   submittedAt: '',       marks: null, outOf: 15, remarks: '' },
      { roll: 'SR-0306', name: 'Fatima Sheikh',  status: 'submitted', submittedAt: 'Mar 31', marks: null, outOf: 15, remarks: '' },
      { roll: 'SR-0307', name: 'Yash Agarwal',   status: 'pending',   submittedAt: '',       marks: null, outOf: 15, remarks: '' },
    ],
  },
  {
    id: 'a4',
    title: 'Polynomials — Zeroes & Factorisation',
    classId: '9b', className: 'Grade 9B', subject: 'Mathematics',
    dueDate: 'Mar 25, 2026', assignedDate: 'Mar 17, 2026',
    status: 'graded', priority: 'medium', totalMarks: 20,
    description: 'Find the zeroes of the given polynomials and verify the relationship between zeroes and coefficients.',
    topic: 'Algebra',
    submissions: [
      { roll: 'SR-0401', name: 'Pooja Reddy',    status: 'submitted', submittedAt: 'Mar 23', marks: 17,   outOf: 20, remarks: 'Good work' },
      { roll: 'SR-0402', name: 'Nikhil Das',     status: 'submitted', submittedAt: 'Mar 24', marks: 14,   outOf: 20, remarks: 'Needs to show steps' },
      { roll: 'SR-0403', name: 'Shruti Pillai',  status: 'submitted', submittedAt: 'Mar 22', marks: 19,   outOf: 20, remarks: 'Excellent' },
      { roll: 'SR-0404', name: 'Omar Siddiqui',  status: 'late',      submittedAt: 'Mar 27', marks: 11,   outOf: 20, remarks: 'Late submission' },
      { roll: 'SR-0405', name: 'Kavya Jain',     status: 'submitted', submittedAt: 'Mar 23', marks: 18,   outOf: 20, remarks: '' },
      { roll: 'SR-0406', name: 'Rohan Bhatt',    status: 'submitted', submittedAt: 'Mar 24', marks: 15,   outOf: 20, remarks: '' },
    ],
  },
  {
    id: 'a5',
    title: 'Statistics — Mean, Median, Mode Practice',
    classId: '10a', className: 'Grade 10A', subject: 'Mathematics',
    dueDate: 'Mar 20, 2026', assignedDate: 'Mar 12, 2026',
    status: 'graded', priority: 'low', totalMarks: 30,
    description: 'Solve all three sections: ungrouped data (10 qs), grouped data with assumed mean (5 qs), and ogive construction (2 graphs).',
    topic: 'Statistics',
    submissions: [
      { roll: 'SR-0101', name: 'Ananya Singh',   status: 'submitted', submittedAt: 'Mar 18', marks: 28,   outOf: 30, remarks: '' },
      { roll: 'SR-0102', name: 'Rohit Verma',    status: 'submitted', submittedAt: 'Mar 19', marks: 22,   outOf: 30, remarks: 'Average' },
      { roll: 'SR-0103', name: 'Priya Sharma',   status: 'submitted', submittedAt: 'Mar 17', marks: 27,   outOf: 30, remarks: '' },
      { roll: 'SR-0104', name: 'Aryan Kapoor',   status: 'late',      submittedAt: 'Mar 22', marks: 18,   outOf: 30, remarks: 'Late; deducted 2' },
      { roll: 'SR-0105', name: 'Meera Pillai',   status: 'submitted', submittedAt: 'Mar 18', marks: 30,   outOf: 30, remarks: 'Perfect!' },
      { roll: 'SR-0106', name: 'Karan Malhotra', status: 'submitted', submittedAt: 'Mar 19', marks: 24,   outOf: 30, remarks: '' },
      { roll: 'SR-0107', name: 'Sita Reddy',     status: 'submitted', submittedAt: 'Mar 18', marks: 26,   outOf: 30, remarks: '' },
      { roll: 'SR-0108', name: 'Dev Nair',        status: 'missing',  submittedAt: '',       marks: 0,    outOf: 30, remarks: 'Not submitted' },
      { roll: 'SR-0109', name: 'Pooja Joshi',    status: 'submitted', submittedAt: 'Mar 19', marks: 25,   outOf: 30, remarks: '' },
      { roll: 'SR-0110', name: 'Aditya Kumar',   status: 'submitted', submittedAt: 'Mar 20', marks: 23,   outOf: 30, remarks: '' },
    ],
  },
  {
    id: 'a6',
    title: 'Linear Equations — Word Problems',
    classId: '9a', className: 'Grade 9A', subject: 'Mathematics',
    dueDate: 'Apr 10, 2026', assignedDate: 'Apr 1, 2026',
    status: 'draft', priority: 'low', totalMarks: 10,
    description: 'Draft assignment: solve 5 real-life word problems using linear equations in two variables. Will be published after review.',
    topic: 'Algebra',
    submissions: [],
  },
  {
    id: 'a7',
    title: 'Circles — Tangent Properties',
    classId: '10b', className: 'Grade 10B', subject: 'Mathematics',
    dueDate: 'Apr 7, 2026', assignedDate: 'Mar 31, 2026',
    status: 'active', priority: 'medium', totalMarks: 20,
    description: 'Prove the four theorems on tangents to a circle and apply them to 6 construction-based problems.',
    topic: 'Geometry',
    submissions: [
      { roll: 'SR-0201', name: 'Neha Gupta',     status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0202', name: 'Sameer Khan',    status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0203', name: 'Isha Mehta',     status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0204', name: 'Rahul Bose',     status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0205', name: 'Tanya Singh',    status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0206', name: 'Vivek Rao',      status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0207', name: 'Divya Iyer',     status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
      { roll: 'SR-0208', name: 'Suraj Patel',    status: 'pending', submittedAt: '', marks: null, outOf: 20, remarks: '' },
    ],
  },
  {
    id: 'a8',
    title: 'Surface Area & Volume — Combinations',
    classId: '9b', className: 'Grade 9B', subject: 'Mathematics',
    dueDate: 'Apr 8, 2026', assignedDate: 'Apr 1, 2026',
    status: 'active', priority: 'high', totalMarks: 25,
    description: 'Solve 8 problems on combined solid figures (cone + cylinder, hemisphere + cone, etc.) with formula derivation.',
    topic: 'Mensuration',
    submissions: [
      { roll: 'SR-0401', name: 'Pooja Reddy',    status: 'pending', submittedAt: '', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0402', name: 'Nikhil Das',     status: 'pending', submittedAt: '', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0403', name: 'Shruti Pillai',  status: 'pending', submittedAt: '', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0404', name: 'Omar Siddiqui',  status: 'pending', submittedAt: '', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0405', name: 'Kavya Jain',     status: 'pending', submittedAt: '', marks: null, outOf: 25, remarks: '' },
      { roll: 'SR-0406', name: 'Rohan Bhatt',    status: 'pending', submittedAt: '', marks: null, outOf: 25, remarks: '' },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<AssignmentStatus, { label: string; bg: string; text: string; border: string; dot: string }> = {
  active:  { label: 'Active',   bg: 'bg-primary/8',  text: 'text-primary', border: 'border-primary/20',  dot: 'bg-primary'  },
  grading: { label: 'Grading',  bg: 'bg-warning/8',  text: 'text-warning', border: 'border-warning/20',  dot: 'bg-warning'  },
  graded:  { label: 'Graded',   bg: 'bg-success/8',  text: 'text-success', border: 'border-success/20',  dot: 'bg-success'  },
  draft:   { label: 'Draft',    bg: 'bg-background', text: 'text-muted',   border: 'border-border/60',   dot: 'bg-muted-light' },
};

const PRIORITY_CONFIG: Record<Priority, { label: string; bg: string; text: string }> = {
  high:   { label: 'High',   bg: 'bg-danger/8',   text: 'text-danger'  },
  medium: { label: 'Medium', bg: 'bg-warning/8',  text: 'text-warning' },
  low:    { label: 'Low',    bg: 'bg-success/8',  text: 'text-success' },
};

const SUB_STATUS_CONFIG: Record<SubmissionStatus, { label: string; bg: string; text: string; icon: string }> = {
  submitted: { label: 'Submitted', bg: 'bg-success/8',  text: 'text-success', icon: 'CheckCircleIcon'    },
  pending:   { label: 'Pending',   bg: 'bg-background', text: 'text-muted',   icon: 'ClockIcon'          },
  late:      { label: 'Late',      bg: 'bg-warning/8',  text: 'text-warning', icon: 'ExclamationCircleIcon' },
  missing:   { label: 'Missing',   bg: 'bg-danger/8',   text: 'text-danger',  icon: 'XCircleIcon'        },
};

const CLASS_FILTERS = [
  { id: 'all', label: 'All Classes' },
  { id: '10a', label: 'Grade 10A' },
  { id: '10b', label: 'Grade 10B' },
  { id: '9a',  label: 'Grade 9A'  },
  { id: '9b',  label: 'Grade 9B'  },
];

const STATUS_FILTERS: { id: AssignmentStatus | 'all'; label: string }[] = [
  { id: 'all',     label: 'All'     },
  { id: 'active',  label: 'Active'  },
  { id: 'grading', label: 'Grading' },
  { id: 'graded',  label: 'Graded'  },
  { id: 'draft',   label: 'Draft'   },
];

function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  return (
    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-2xs font-800 flex-shrink-0"
      style={{ backgroundColor: `${color}18`, color }}>
      {initials}
    </div>
  );
}

// ─── Grade input component ────────────────────────────────────────────────────
function GradeInput({
  submission, outOf, onChange,
}: { submission: Submission; outOf: number; onChange: (roll: string, marks: number | null) => void }) {
  const [val, setVal] = useState(submission.marks !== null ? String(submission.marks) : '');

  const commit = () => {
    const n = parseFloat(val);
    if (!isNaN(n) && n >= 0 && n <= outOf) onChange(submission.roll, n);
    else if (val === '') onChange(submission.roll, null);
    else setVal(submission.marks !== null ? String(submission.marks) : '');
  };

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="number"
        min={0}
        max={outOf}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onBlur={commit}
        placeholder="—"
        className="w-14 px-2 py-1 text-center text-xs font-700 bg-white border border-border/60 rounded-lg focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
      />
      <span className="text-2xs text-muted">/{outOf}</span>
    </div>
  );
}

// ─── Assignment Card ──────────────────────────────────────────────────────────
function AssignmentCard({
  assignment, selected, onClick,
}: { assignment: Assignment; selected: boolean; onClick: () => void }) {
  const color = CLASS_COLORS[assignment.classId];
  const sc = STATUS_CONFIG[assignment.status];
  const pc = PRIORITY_CONFIG[assignment.priority];
  const submitted = assignment.submissions.filter((s) => s.status === 'submitted' || s.status === 'late').length;
  const total = assignment.submissions.length;
  const graded = assignment.submissions.filter((s) => s.marks !== null).length;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border transition-all shadow-soft hover:shadow-card ${
        selected ? 'bg-primary/4 border-primary/30 ring-2 ring-primary/15' : 'bg-white border-border/60 hover:border-border'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-800 font-display text-xs flex-shrink-0"
          style={{ backgroundColor: color }}>
          {assignment.className.replace('Grade ', '').replace(' ', '')}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="font-700 text-sm text-foreground leading-tight line-clamp-2">{assignment.title}</div>
            <span className={`text-2xs font-700 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${sc.bg} ${sc.text} border ${sc.border}`}>
              {sc.label}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-2xs font-600 px-2 py-0.5 rounded-md" style={{ backgroundColor: `${color}18`, color }}>{assignment.className}</span>
            <span className={`text-2xs font-600 px-2 py-0.5 rounded-md ${pc.bg} ${pc.text}`}>{pc.label}</span>
            <span className="text-2xs text-muted-light px-1.5 py-0.5 rounded-md bg-background border border-border/40">{assignment.topic}</span>
          </div>

          <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-2xs text-muted">
              <Icon name="CalendarDaysIcon" size={11} className="text-muted-light" />
              Due {assignment.dueDate}
            </div>
            {assignment.status !== 'draft' && (
              <div className="flex items-center gap-1.5 text-2xs text-muted">
                <Icon name="DocumentTextIcon" size={11} className="text-muted-light" />
                {submitted}/{total} submitted
                {assignment.status === 'grading' || assignment.status === 'graded' ? ` · ${graded} graded` : ''}
              </div>
            )}
          </div>

          {assignment.status !== 'draft' && total > 0 && (
            <div className="mt-2.5 h-1.5 bg-border-light rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${(submitted / total) * 100}%`, backgroundColor: color }} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ assignment, onClose, onUpdateMarks }: {
  assignment: Assignment;
  onClose: () => void;
  onUpdateMarks: (assignmentId: string, roll: string, marks: number | null) => void;
}) {
  const [detailTab, setDetailTab] = useState<'overview' | 'submissions' | 'grade'>('overview');
  const color = CLASS_COLORS[assignment.classId];
  const sc = STATUS_CONFIG[assignment.status];
  const pc = PRIORITY_CONFIG[assignment.priority];
  const submitted = assignment.submissions.filter((s) => s.status === 'submitted' || s.status === 'late').length;
  const graded    = assignment.submissions.filter((s) => s.marks !== null).length;
  const missing   = assignment.submissions.filter((s) => s.status === 'missing').length;
  const avgScore  = (() => {
    const scored = assignment.submissions.filter((s) => s.marks !== null);
    if (!scored.length) return null;
    return Math.round(scored.reduce((s, sub) => s + (sub.marks! / sub.outOf) * 100, 0) / scored.length);
  })();

  const submissionBarData = [
    { label: 'Submitted', value: assignment.submissions.filter((s) => s.status === 'submitted').length, color: '#10B981' },
    { label: 'Late',      value: assignment.submissions.filter((s) => s.status === 'late').length,      color: '#F59E0B' },
    { label: 'Pending',   value: assignment.submissions.filter((s) => s.status === 'pending').length,   color: '#94A3B8' },
    { label: 'Missing',   value: assignment.submissions.filter((s) => s.status === 'missing').length,   color: '#EF4444' },
  ].filter((d) => d.value > 0);

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden lg:sticky lg:top-0 lg:max-h-[calc(100vh-10rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border/50 flex-shrink-0"
        style={{ borderLeftWidth: 4, borderLeftColor: color }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-2xs font-700 px-2 py-0.5 rounded-full flex items-center gap-1 ${sc.bg} ${sc.text} border ${sc.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />{sc.label}
            </span>
            <span className={`text-2xs font-600 px-2 py-0.5 rounded-md ${pc.bg} ${pc.text}`}>{pc.label} Priority</span>
          </div>
          <h2 className="font-display font-700 text-sm text-foreground leading-snug">{assignment.title}</h2>
          <p className="text-2xs text-muted mt-0.5">{assignment.className} · {assignment.subject} · {assignment.topic}</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:bg-background hover:text-foreground transition-colors flex-shrink-0">
          <Icon name="XMarkIcon" size={16} />
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 p-2 border-b border-border/40 flex-shrink-0">
        {(['overview', 'submissions', 'grade'] as const).map((t) => (
          <button key={t} onClick={() => setDetailTab(t)}
            className={`px-3 py-1.5 rounded-lg text-2xs font-600 capitalize transition-all flex-1 ${
              detailTab === t ? 'bg-primary/8 text-primary' : 'text-muted hover:text-foreground'
            }`}>
            {t === 'grade' ? 'Grade' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* ── Overview ── */}
        {detailTab === 'overview' && (
          <>
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Submitted',   value: submitted,                         icon: 'DocumentTextIcon',          color: '#10B981', bg: 'bg-success/8'  },
                { label: 'Graded',      value: graded,                            icon: 'CheckCircleIcon',            color: '#1C4ED8', bg: 'bg-primary/8'  },
                { label: 'Missing',     value: missing,                           icon: 'XCircleIcon',               color: '#EF4444', bg: 'bg-danger/8'   },
                { label: 'Avg Score',   value: avgScore !== null ? `${avgScore}%` : '—', icon: 'ChartBarIcon',     color: '#8B5CF6', bg: 'bg-purple-50'  },
              ].map((s) => (
                <div key={s.label} className="p-3 bg-background rounded-xl border border-border/50">
                  <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                    <Icon name={s.icon as 'DocumentTextIcon'} size={13} style={{ color: s.color }} />
                  </div>
                  <div className="font-display text-lg font-800 text-foreground leading-none">{s.value}</div>
                  <div className="text-2xs text-muted mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="p-3.5 bg-background rounded-xl border border-border/50">
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Description</div>
              <p className="text-xs text-foreground leading-relaxed">{assignment.description}</p>
            </div>

            {/* Meta */}
            <div className="space-y-2">
              {[
                { icon: 'CalendarDaysIcon', label: 'Assigned', value: assignment.assignedDate },
                { icon: 'ClockIcon',        label: 'Due Date',  value: assignment.dueDate      },
                { icon: 'StarIcon',         label: 'Total Marks', value: `${assignment.totalMarks} marks` },
                { icon: 'AcademicCapIcon',  label: 'Class',     value: `${assignment.className} · ${assignment.subject}` },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-background border border-border/50 flex items-center justify-center flex-shrink-0">
                    <Icon name={m.icon as 'CalendarDaysIcon'} size={13} className="text-muted" />
                  </div>
                  <div>
                    <div className="text-2xs text-muted-light">{m.label}</div>
                    <div className="text-xs font-600 text-foreground">{m.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submission breakdown bar chart */}
            {submissionBarData.length > 0 && (
              <div className="bg-background rounded-xl border border-border/50 p-3">
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Submission Breakdown</div>
                <div className="space-y-2">
                  {submissionBarData.map((d) => (
                    <div key={d.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xs text-muted">{d.label}</span>
                        <span className="text-2xs font-700" style={{ color: d.color }}>{d.value}</span>
                      </div>
                      <div className="h-1.5 bg-border-light rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(d.value / assignment.submissions.length) * 100}%`, backgroundColor: d.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── Submissions ── */}
        {detailTab === 'submissions' && (
          <div className="space-y-2.5">
            {assignment.submissions.length === 0 ? (
              <div className="py-8 flex flex-col items-center gap-2 text-center">
                <Icon name="DocumentTextIcon" size={22} className="text-muted-light" />
                <div className="text-xs font-600 text-muted">No students assigned yet (draft)</div>
              </div>
            ) : (
              assignment.submissions.map((sub) => {
                const ssc = SUB_STATUS_CONFIG[sub.status];
                return (
                  <div key={sub.roll} className={`flex items-center gap-3 p-3 rounded-xl border ${ssc.bg} ${ssc.text === 'text-success' ? 'border-success/20' : ssc.text === 'text-warning' ? 'border-warning/20' : ssc.text === 'text-danger' ? 'border-danger/20' : 'border-border/50'}`}>
                    <Avatar name={sub.name} color={color} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-700 text-foreground leading-tight">{sub.name}</div>
                      <div className="text-2xs text-muted mt-0.5">{sub.roll}</div>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-1">
                      <div className={`flex items-center gap-1 text-2xs font-600 ${ssc.text}`}>
                        <Icon name={ssc.icon as 'CheckCircleIcon'} size={11} />
                        {ssc.label}
                      </div>
                      {sub.submittedAt && (
                        <div className="text-2xs text-muted-light">{sub.submittedAt}</div>
                      )}
                      {sub.marks !== null && (
                        <div className="text-2xs font-700 text-foreground">{sub.marks}/{sub.outOf}</div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── Grade ── */}
        {detailTab === 'grade' && (
          <div className="space-y-3">
            {assignment.status === 'draft' || assignment.status === 'active' ? (
              <div className="py-6 flex flex-col items-center gap-2 text-center">
                <Icon name="ClockIcon" size={22} className="text-muted-light" />
                <div className="text-xs font-600 text-muted">Grading available after submissions close</div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-2xs text-muted">Enter marks out of <span className="font-700 text-foreground">{assignment.totalMarks}</span></p>
                  <span className="text-2xs text-success font-600">{graded}/{assignment.submissions.filter(s => s.status !== 'missing' && s.status !== 'pending').length} graded</span>
                </div>
                {assignment.submissions.filter(s => s.status !== 'pending').map((sub) => {
                  const ssc = SUB_STATUS_CONFIG[sub.status];
                  return (
                    <div key={sub.roll} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border/50">
                      <Avatar name={sub.name} color={color} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-700 text-foreground">{sub.name}</div>
                        <div className={`text-2xs font-600 mt-0.5 ${ssc.text}`}>{ssc.label}{sub.submittedAt ? ` · ${sub.submittedAt}` : ''}</div>
                        {sub.remarks && <div className="text-2xs text-muted italic mt-0.5">"{sub.remarks}"</div>}
                      </div>
                      {sub.status === 'missing' ? (
                        <span className="text-2xs text-danger font-600">Not submitted</span>
                      ) : (
                        <GradeInput
                          submission={sub}
                          outOf={assignment.totalMarks}
                          onChange={(roll, marks) => onUpdateMarks(assignment.id, roll, marks)}
                        />
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TeacherAssignments() {
  const [selectedId,    setSelectedId]    = useState<string | null>('a1');
  const [classFilter,   setClassFilter]   = useState<string>('all');
  const [statusFilter,  setStatusFilter]  = useState<string>('all');
  const [search,        setSearch]        = useState('');
  const [assignments,   setAssignments]   = useState<Assignment[]>(ASSIGNMENTS);

  const filtered = useMemo(() =>
    assignments.filter((a) => {
      const matchClass  = classFilter  === 'all' || a.classId === classFilter;
      const matchStatus = statusFilter === 'all' || a.status  === statusFilter;
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                          a.className.toLowerCase().includes(search.toLowerCase()) ||
                          a.topic.toLowerCase().includes(search.toLowerCase());
      return matchClass && matchStatus && matchSearch;
    }), [assignments, classFilter, statusFilter, search]);

  const selected = assignments.find((a) => a.id === selectedId) ?? null;

  const handleUpdateMarks = (assignmentId: string, roll: string, marks: number | null) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId
          ? { ...a, submissions: a.submissions.map((s) => s.roll === roll ? { ...s, marks } : s) }
          : a
      )
    );
  };

  // Stat counts
  const totalActive  = assignments.filter((a) => a.status === 'active').length;
  const totalGrading = assignments.filter((a) => a.status === 'grading').length;
  const totalGraded  = assignments.filter((a) => a.status === 'graded').length;
  const totalDraft   = assignments.filter((a) => a.status === 'draft').length;

  const submissionsBarData = [
    { class: '10A', submitted: 8, pending: 2 },
    { class: '10B', submitted: 5, pending: 3 },
    { class: '9A',  submitted: 3, pending: 4 },
    { class: '9B',  submitted: 6, pending: 0 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Assignments</h1>
          <p className="text-sm text-muted mt-0.5">Mathematics · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <button className="flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-all shadow-soft">
          <Icon name="PlusIcon" size={16} />
          New Assignment
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active',   value: totalActive,  icon: 'DocumentTextIcon',  color: '#1C4ED8', bg: 'bg-primary/8'  },
          { label: 'Grading',  value: totalGrading, icon: 'PencilSquareIcon',  color: '#F59E0B', bg: 'bg-warning/8'  },
          { label: 'Graded',   value: totalGraded,  icon: 'CheckCircleIcon',   color: '#10B981', bg: 'bg-success/8'  },
          { label: 'Drafts',   value: totalDraft,   icon: 'FolderOpenIcon',    color: '#8B5CF6', bg: 'bg-purple-50'  },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'DocumentTextIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label} Assignments</div>
          </div>
        ))}
      </div>

      {/* ── Main split layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Left: list */}
        <div className="lg:col-span-3 space-y-4">

          {/* Filters */}
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, class, or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 bg-white border border-border/60 rounded-xl text-xs text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            {/* Class + Status filter pills */}
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl">
                {CLASS_FILTERS.map((f) => (
                  <button key={f.id} onClick={() => setClassFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-2xs font-600 transition-all ${
                      classFilter === f.id
                        ? 'bg-white text-primary shadow-soft border border-border/60'
                        : 'text-muted hover:text-foreground'
                    }`}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl self-start">
              {STATUS_FILTERS.map((f) => (
                <button key={f.id} onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-2xs font-600 transition-all ${
                    statusFilter === f.id
                      ? 'bg-white text-primary shadow-soft border border-border/60'
                      : 'text-muted hover:text-foreground'
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assignment cards */}
          {filtered.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-center bg-white rounded-2xl border border-border/60">
              <Icon name="DocumentTextIcon" size={28} className="text-muted-light" />
              <div className="text-sm font-700 text-muted">No assignments found</div>
              <div className="text-xs text-muted-light">Try adjusting your filters or search</div>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  selected={selectedId === a.id}
                  onClick={() => setSelectedId(selectedId === a.id ? null : a.id)}
                />
              ))}
            </div>
          )}

          {/* Submissions overview chart */}
          <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-700 text-xs text-foreground">Pending vs Submitted — All Classes</h3>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-2xs text-muted"><span className="w-2.5 h-2.5 rounded-full bg-primary" />Submitted</span>
                <span className="flex items-center gap-1 text-2xs text-muted"><span className="w-2.5 h-2.5 rounded-full bg-border-light" />Pending</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={submissionsBarData} barGap={4} barSize={18} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="class" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }} />
                <Bar dataKey="submitted" name="Submitted" stackId="a" fill="#1C4ED8" radius={[0, 0, 0, 0]}>
                  {submissionsBarData.map((_, i) => (
                    <Cell key={i} fill={Object.values(CLASS_COLORS)[i]} />
                  ))}
                </Bar>
                <Bar dataKey="pending" name="Pending" stackId="a" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: detail panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <DetailPanel
              assignment={selected}
              onClose={() => setSelectedId(null)}
              onUpdateMarks={handleUpdateMarks}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-8 flex flex-col items-center justify-center text-center gap-3 min-h-[320px]">
              <div className="w-14 h-14 rounded-2xl bg-background border border-border/60 flex items-center justify-center">
                <Icon name="DocumentTextIcon" size={24} className="text-muted-light" />
              </div>
              <div className="text-sm font-700 text-muted">Select an assignment</div>
              <div className="text-xs text-muted-light max-w-[180px]">Click any card on the left to view details, submissions, and grade students</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
