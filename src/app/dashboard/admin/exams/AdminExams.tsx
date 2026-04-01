'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewTab      = 'schedule' | 'results' | 'gradebook' | 'analytics';
type ExamType     = 'Unit Test' | 'Mid Term' | 'Final' | 'Pre-Board' | 'Practice';
type ExamStatus   = 'Upcoming' | 'Ongoing' | 'Completed' | 'Rescheduled';
type ResultStatus = 'Pass' | 'Fail' | 'Absent' | 'Pending';
type Grade        = 'All' | 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

interface Exam {
  id: number;
  name: string;
  type: ExamType;
  grade: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  room: string;
  invigilator: string;
  maxMarks: number;
  status: ExamStatus;
  totalStudents: number;
}

interface Result {
  id: number;
  rollNo: string;
  studentName: string;
  grade: string;
  section: string;
  examName: string;
  subject: string;
  maxMarks: number;
  obtained: number;
  grade_letter: string;
  status: ResultStatus;
  percentile: number;
}

interface GradebookRow {
  rollNo: string;
  studentName: string;
  grade: string;
  section: string;
  maths: number | null;
  science: number | null;
  english: number | null;
  social: number | null;
  hindi: number | null;
  total: number | null;
  pct: number | null;
  rank: number | null;
  resultStatus: ResultStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXAMS: Exam[] = [
  { id: 1,  name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 10', subject: 'Mathematics',       date: 'Apr 5, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Hall A',   invigilator: 'Mr. Ramesh Iyer',    maxMarks: 100, status: 'Upcoming',  totalStudents: 89  },
  { id: 2,  name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 10', subject: 'Science',            date: 'Apr 7, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Hall A',   invigilator: 'Mrs. Priya Nair',    maxMarks: 100, status: 'Upcoming',  totalStudents: 89  },
  { id: 3,  name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 10', subject: 'English',            date: 'Apr 9, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Hall A',   invigilator: 'Mrs. Lata Bose',     maxMarks: 100, status: 'Upcoming',  totalStudents: 89  },
  { id: 4,  name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 12', subject: 'Mathematics',       date: 'Apr 4, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Hall B',   invigilator: 'Mr. Arvind Sharma',  maxMarks: 100, status: 'Upcoming',  totalStudents: 82  },
  { id: 5,  name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 12', subject: 'Physics',            date: 'Apr 6, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Hall B',   invigilator: 'Mr. Naveen Chopra',  maxMarks: 100, status: 'Upcoming',  totalStudents: 82  },
  { id: 6,  name: 'Pre-Board Exam',      type: 'Pre-Board', grade: 'Grade 12', subject: 'Chemistry',          date: 'Mar 20, 2026', time: '9:00 AM',  duration: '3 hrs', room: 'Hall B',   invigilator: 'Mrs. Sunita Verma',  maxMarks: 100, status: 'Completed', totalStudents: 82  },
  { id: 7,  name: 'Pre-Board Exam',      type: 'Pre-Board', grade: 'Grade 12', subject: 'English',            date: 'Mar 22, 2026', time: '9:00 AM',  duration: '3 hrs', room: 'Hall B',   invigilator: 'Mrs. Lata Bose',     maxMarks: 100, status: 'Completed', totalStudents: 82  },
  { id: 8,  name: 'Mid Term Exam',       type: 'Mid Term',  grade: 'Grade 9',  subject: 'Mathematics',       date: 'Mar 15, 2026', time: '10:00 AM', duration: '2 hrs', room: 'Room 301', invigilator: 'Mrs. Geeta Tiwari',  maxMarks: 80,  status: 'Completed', totalStudents: 87  },
  { id: 9,  name: 'Mid Term Exam',       type: 'Mid Term',  grade: 'Grade 9',  subject: 'Science',            date: 'Mar 17, 2026', time: '10:00 AM', duration: '2 hrs', room: 'Room 301', invigilator: 'Mr. Kiran Pillai',   maxMarks: 80,  status: 'Completed', totalStudents: 87  },
  { id: 10, name: 'Unit Test 3',         type: 'Unit Test', grade: 'Grade 8',  subject: 'English',            date: 'Mar 28, 2026', time: '11:00 AM', duration: '1 hr',  room: 'Room 205', invigilator: 'Mr. Anil Kapoor',    maxMarks: 50,  status: 'Completed', totalStudents: 83  },
  { id: 11, name: 'Unit Test 3',         type: 'Unit Test', grade: 'Grade 8',  subject: 'Social Studies',    date: 'Mar 30, 2026', time: '11:00 AM', duration: '1 hr',  room: 'Room 205', invigilator: 'Mrs. Deepa Pillai',  maxMarks: 50,  status: 'Completed', totalStudents: 83  },
  { id: 12, name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 11', subject: 'Mathematics',       date: 'Apr 5, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Room 401', invigilator: 'Mr. Rajiv Mehta',    maxMarks: 100, status: 'Upcoming',  totalStudents: 90  },
  { id: 13, name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 11', subject: 'Physics',            date: 'Apr 8, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Room 401', invigilator: 'Mr. Naveen Chopra',  maxMarks: 100, status: 'Upcoming',  totalStudents: 90  },
  { id: 14, name: 'Unit Test 3',         type: 'Unit Test', grade: 'Grade 6',  subject: 'Mathematics',       date: 'Apr 2, 2026',  time: '11:00 AM', duration: '1 hr',  room: 'Room 101', invigilator: 'Mrs. Sunita Verma',  maxMarks: 50,  status: 'Ongoing',   totalStudents: 74  },
  { id: 15, name: 'Practice Test',       type: 'Practice',  grade: 'Grade 7',  subject: 'Hindi',              date: 'Apr 3, 2026',  time: '11:00 AM', duration: '1 hr',  room: 'Room 202', invigilator: 'Mrs. Geeta Tiwari',  maxMarks: 40,  status: 'Upcoming',  totalStudents: 79  },
  { id: 16, name: 'Mid Term Exam',       type: 'Mid Term',  grade: 'Grade 11', subject: 'Chemistry',          date: 'Feb 20, 2026', time: '9:00 AM',  duration: '2 hrs', room: 'Room 401', invigilator: 'Mrs. Priya Nair',    maxMarks: 80,  status: 'Completed', totalStudents: 90  },
  { id: 17, name: 'Mid Term Exam',       type: 'Mid Term',  grade: 'Grade 6',  subject: 'English',            date: 'Feb 18, 2026', time: '10:00 AM', duration: '2 hrs', room: 'Room 101', invigilator: 'Mr. Kiran Pillai',   maxMarks: 80,  status: 'Completed', totalStudents: 74  },
  { id: 18, name: 'Term 2 Final Exam',   type: 'Final',     grade: 'Grade 9',  subject: 'Mathematics',       date: 'Apr 6, 2026',  time: '9:00 AM',  duration: '3 hrs', room: 'Room 301', invigilator: 'Mrs. Geeta Tiwari',  maxMarks: 100, status: 'Upcoming',  totalStudents: 87  },
  { id: 19, name: 'Unit Test 3',         type: 'Unit Test', grade: 'Grade 7',  subject: 'Science',            date: 'Apr 1, 2026',  time: '11:00 AM', duration: '1 hr',  room: 'Room 202', invigilator: 'Mr. Anil Kapoor',    maxMarks: 50,  status: 'Ongoing',   totalStudents: 79  },
  { id: 20, name: 'Pre-Board Exam',      type: 'Pre-Board', grade: 'Grade 10', subject: 'Social Studies',    date: 'Mar 25, 2026', time: '9:00 AM',  duration: '2.5 hrs', room: 'Hall A', invigilator: 'Mrs. Deepa Pillai',  maxMarks: 100, status: 'Completed', totalStudents: 89  },
];

const RESULTS: Result[] = [
  { id: 1,  rollNo: 'SR-1001', studentName: 'Aarav Sharma',    grade: 'Grade 10', section: 'A', examName: 'Pre-Board Exam', subject: 'Social Studies', maxMarks: 100, obtained: 88,  grade_letter: 'A+', status: 'Pass',    percentile: 92 },
  { id: 2,  rollNo: 'SR-1002', studentName: 'Priya Patel',     grade: 'Grade 10', section: 'A', examName: 'Pre-Board Exam', subject: 'Social Studies', maxMarks: 100, obtained: 95,  grade_letter: 'A+', status: 'Pass',    percentile: 98 },
  { id: 3,  rollNo: 'SR-1003', studentName: 'Rohan Gupta',     grade: 'Grade 10', section: 'B', examName: 'Pre-Board Exam', subject: 'Social Studies', maxMarks: 100, obtained: 61,  grade_letter: 'B',  status: 'Pass',    percentile: 55 },
  { id: 4,  rollNo: 'SR-1004', studentName: 'Anjali Singh',    grade: 'Grade 10', section: 'B', examName: 'Pre-Board Exam', subject: 'Social Studies', maxMarks: 100, obtained: 74,  grade_letter: 'B+', status: 'Pass',    percentile: 72 },
  { id: 5,  rollNo: 'SR-1017', studentName: 'Ishaan Chopra',   grade: 'Grade 10', section: 'A', examName: 'Pre-Board Exam', subject: 'Social Studies', maxMarks: 100, obtained: 82,  grade_letter: 'A',  status: 'Pass',    percentile: 85 },
  { id: 6,  rollNo: 'SR-1025', studentName: 'Yash Saxena',     grade: 'Grade 10', section: 'B', examName: 'Pre-Board Exam', subject: 'Social Studies', maxMarks: 100, obtained: 79,  grade_letter: 'B+', status: 'Pass',    percentile: 80 },
  { id: 7,  rollNo: 'SR-1006', studentName: 'Kavya Nair',      grade: 'Grade 9',  section: 'A', examName: 'Mid Term Exam',  subject: 'Mathematics',   maxMarks: 80,  obtained: 72,  grade_letter: 'A',  status: 'Pass',    percentile: 90 },
  { id: 8,  rollNo: 'SR-1007', studentName: 'Arjun Mehta',     grade: 'Grade 9',  section: 'B', examName: 'Mid Term Exam',  subject: 'Mathematics',   maxMarks: 80,  obtained: 45,  grade_letter: 'C',  status: 'Pass',    percentile: 40 },
  { id: 9,  rollNo: 'SR-1013', studentName: 'Rahul Tiwari',    grade: 'Grade 9',  section: 'A', examName: 'Mid Term Exam',  subject: 'Mathematics',   maxMarks: 80,  obtained: 28,  grade_letter: 'F',  status: 'Fail',    percentile: 12 },
  { id: 10, rollNo: 'SR-1022', studentName: 'Aditi Mishra',    grade: 'Grade 9',  section: 'B', examName: 'Mid Term Exam',  subject: 'Mathematics',   maxMarks: 80,  obtained: 76,  grade_letter: 'A+', status: 'Pass',    percentile: 95 },
  { id: 11, rollNo: 'SR-1029', studentName: 'Lakshya Dixit',   grade: 'Grade 9',  section: 'A', examName: 'Mid Term Exam',  subject: 'Mathematics',   maxMarks: 80,  obtained: 68,  grade_letter: 'A',  status: 'Pass',    percentile: 82 },
  { id: 12, rollNo: 'SR-1010', studentName: 'Riya Kapoor',     grade: 'Grade 8',  section: 'B', examName: 'Unit Test 3',    subject: 'English',       maxMarks: 50,  obtained: 44,  grade_letter: 'A+', status: 'Pass',    percentile: 94 },
  { id: 13, rollNo: 'SR-1014', studentName: 'Nisha Malhotra',  grade: 'Grade 8',  section: 'A', examName: 'Unit Test 3',    subject: 'English',       maxMarks: 50,  obtained: 38,  grade_letter: 'A',  status: 'Pass',    percentile: 78 },
  { id: 14, rollNo: 'SR-1021', studentName: 'Harsh Agarwal',   grade: 'Grade 8',  section: 'A', examName: 'Unit Test 3',    subject: 'English',       maxMarks: 50,  obtained: 32,  grade_letter: 'B+', status: 'Pass',    percentile: 60 },
  { id: 15, rollNo: 'SR-1028', studentName: 'Poornima Rao',    grade: 'Grade 8',  section: 'B', examName: 'Unit Test 3',    subject: 'English',       maxMarks: 50,  obtained: 0,   grade_letter: '—',  status: 'Absent',  percentile: 0  },
  { id: 16, rollNo: 'SR-1009', studentName: 'Vikram Yadav',    grade: 'Grade 12', section: 'A', examName: 'Pre-Board Exam', subject: 'Chemistry',     maxMarks: 100, obtained: 71,  grade_letter: 'B+', status: 'Pass',    percentile: 68 },
  { id: 17, rollNo: 'SR-1015', studentName: 'Siddharth Bose',  grade: 'Grade 12', section: 'B', examName: 'Pre-Board Exam', subject: 'Chemistry',     maxMarks: 100, obtained: 85,  grade_letter: 'A',  status: 'Pass',    percentile: 88 },
  { id: 18, rollNo: 'SR-1020', studentName: 'Simran Kaur',     grade: 'Grade 12', section: 'A', examName: 'Pre-Board Exam', subject: 'Chemistry',     maxMarks: 100, obtained: 90,  grade_letter: 'A+', status: 'Pass',    percentile: 96 },
  { id: 19, rollNo: 'SR-1027', studentName: 'Sameer Khan',     grade: 'Grade 12', section: 'B', examName: 'Pre-Board Exam', subject: 'Chemistry',     maxMarks: 100, obtained: 42,  grade_letter: 'F',  status: 'Fail',    percentile: 18 },
  { id: 20, rollNo: 'SR-1012', studentName: 'Meera Iyer',      grade: 'Grade 11', section: 'B', examName: 'Mid Term Exam',  subject: 'Chemistry',     maxMarks: 80,  obtained: 78,  grade_letter: 'A+', status: 'Pass',    percentile: 99 },
];

const GRADEBOOK: GradebookRow[] = [
  { rollNo: 'SR-1001', studentName: 'Aarav Sharma',   grade: 'Grade 10', section: 'A', maths: 82, science: 76, english: 88, social: 88, hindi: 72, total: 406, pct: 81, rank: 3,  resultStatus: 'Pass' },
  { rollNo: 'SR-1002', studentName: 'Priya Patel',    grade: 'Grade 10', section: 'A', maths: 91, science: 88, english: 95, social: 95, hindi: 87, total: 456, pct: 91, rank: 1,  resultStatus: 'Pass' },
  { rollNo: 'SR-1003', studentName: 'Rohan Gupta',    grade: 'Grade 10', section: 'B', maths: 55, science: 60, english: 65, social: 61, hindi: 58, total: 299, pct: 60, rank: 12, resultStatus: 'Pass' },
  { rollNo: 'SR-1004', studentName: 'Anjali Singh',   grade: 'Grade 10', section: 'B', maths: 72, science: 70, english: 78, social: 74, hindi: 68, total: 362, pct: 72, rank: 7,  resultStatus: 'Pass' },
  { rollNo: 'SR-1017', studentName: 'Ishaan Chopra',  grade: 'Grade 10', section: 'A', maths: 80, science: 75, english: 82, social: 82, hindi: 74, total: 393, pct: 79, rank: 4,  resultStatus: 'Pass' },
  { rollNo: 'SR-1025', studentName: 'Yash Saxena',    grade: 'Grade 10', section: 'B', maths: 77, science: 74, english: 80, social: 79, hindi: 71, total: 381, pct: 76, rank: 5,  resultStatus: 'Pass' },
  { rollNo: 'SR-1006', studentName: 'Kavya Nair',     grade: 'Grade 9',  section: 'A', maths: 90, science: 85, english: 92, social: null, hindi: 80, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1007', studentName: 'Arjun Mehta',    grade: 'Grade 9',  section: 'B', maths: 56, science: 50, english: 62, social: null, hindi: 55, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1013', studentName: 'Rahul Tiwari',   grade: 'Grade 9',  section: 'A', maths: 35, science: 42, english: 48, social: null, hindi: 38, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1022', studentName: 'Aditi Mishra',   grade: 'Grade 9',  section: 'B', maths: 95, science: 90, english: 93, social: null, hindi: 88, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1029', studentName: 'Lakshya Dixit',  grade: 'Grade 9',  section: 'A', maths: 85, science: 80, english: 84, social: null, hindi: 76, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1009', studentName: 'Vikram Yadav',   grade: 'Grade 12', section: 'A', maths: 68, science: 71, english: 74, social: null, hindi: 62, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1015', studentName: 'Siddharth Bose', grade: 'Grade 12', section: 'B', maths: 82, science: 85, english: 88, social: null, hindi: null, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1020', studentName: 'Simran Kaur',    grade: 'Grade 12', section: 'A', maths: 90, science: 90, english: 92, social: null, hindi: null, total: null, pct: null, rank: null, resultStatus: 'Pending' },
  { rollNo: 'SR-1027', studentName: 'Sameer Khan',    grade: 'Grade 12', section: 'B', maths: 44, science: 42, english: 55, social: null, hindi: null, total: null, pct: null, rank: null, resultStatus: 'Fail'    },
];

const GRADE_PERFORMANCE = [
  { grade: 'Gr.6',  avg: 76, pass: 96, fail: 4  },
  { grade: 'Gr.7',  avg: 71, pass: 92, fail: 8  },
  { grade: 'Gr.8',  avg: 74, pass: 94, fail: 6  },
  { grade: 'Gr.9',  avg: 68, pass: 88, fail: 12 },
  { grade: 'Gr.10', avg: 78, pass: 95, fail: 5  },
  { grade: 'Gr.11', avg: 72, pass: 90, fail: 10 },
  { grade: 'Gr.12', avg: 75, pass: 91, fail: 9  },
];

const SUBJECT_PERFORMANCE = [
  { subject: 'Maths',   avg: 68, top: 95, lowest: 28 },
  { subject: 'Science', avg: 72, top: 92, lowest: 35 },
  { subject: 'English', avg: 78, top: 96, lowest: 42 },
  { subject: 'Social',  avg: 75, top: 95, lowest: 38 },
  { subject: 'Hindi',   avg: 70, top: 90, lowest: 30 },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const EXAM_STATUS_CONFIG: Record<ExamStatus, { bg: string; text: string; border: string; dot: string }> = {
  Upcoming:    { bg: 'bg-primary/8',   text: 'text-primary',  border: 'border-primary/20',  dot: 'bg-primary'  },
  Ongoing:     { bg: 'bg-success/8',   text: 'text-success',  border: 'border-success/20',  dot: 'bg-success'  },
  Completed:   { bg: 'bg-border/40',   text: 'text-muted',    border: 'border-border/60',   dot: 'bg-muted'    },
  Rescheduled: { bg: 'bg-warning/8',   text: 'text-warning',  border: 'border-warning/20',  dot: 'bg-warning'  },
};

const RESULT_STATUS_CONFIG: Record<ResultStatus, { bg: string; text: string; border: string }> = {
  Pass:    { bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20' },
  Fail:    { bg: 'bg-error/10',   text: 'text-error',    border: 'border-error/20'   },
  Absent:  { bg: 'bg-warning/8',  text: 'text-warning',  border: 'border-warning/20' },
  Pending: { bg: 'bg-border/30',  text: 'text-muted',    border: 'border-border/60'  },
};

const TYPE_CONFIG: Record<ExamType, { bg: string; text: string }> = {
  'Unit Test':  { bg: 'bg-blue-50',    text: 'text-blue-700'   },
  'Mid Term':   { bg: 'bg-purple-50',  text: 'text-purple-700' },
  'Final':      { bg: 'bg-primary/8',  text: 'text-primary'    },
  'Pre-Board':  { bg: 'bg-amber-50',   text: 'text-amber-700'  },
  'Practice':   { bg: 'bg-emerald-50', text: 'text-emerald-700'},
};

const GRADE_LETTERS = ['A+', 'A', 'B+', 'B', 'C', 'F'] as const;
const GRADE_LETTER_CONFIG: Record<string, { bg: string; text: string }> = {
  'A+': { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'A':  { bg: 'bg-success/8',  text: 'text-success'     },
  'B+': { bg: 'bg-blue-50',    text: 'text-blue-700'    },
  'B':  { bg: 'bg-primary/8',  text: 'text-primary'     },
  'C':  { bg: 'bg-warning/8',  text: 'text-warning'     },
  'F':  { bg: 'bg-error/10',   text: 'text-error'       },
  '—':  { bg: 'bg-border/30',  text: 'text-muted'       },
};

const GRADES: Grade[] = ['All', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
  icon, label, value, sub, iconBg, iconColor,
}: {
  icon: string; label: string; value: string; sub: string;
  iconBg: string; iconColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon name={icon} size={18} className={iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted mb-0.5">{label}</p>
        <p className="font-display text-2xl font-800 text-foreground leading-none">{value}</p>
        <p className="text-2xs text-muted mt-1">{sub}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminExams() {
  const [activeTab, setActiveTab]         = useState<ViewTab>('schedule');
  const [gradeFilter, setGradeFilter]     = useState<Grade>('All');
  const [statusFilter, setStatusFilter]   = useState<ExamStatus | 'All'>('All');
  const [typeFilter, setTypeFilter]       = useState<ExamType | 'All'>('All');
  const [search, setSearch]               = useState('');
  const [selectedExam, setSelectedExam]   = useState<Exam | null>(null);
  const [resultGrade, setResultGrade]     = useState<Grade>('All');
  const [resultSearch, setResultSearch]   = useState('');
  const [gradebookGrade, setGradebookGrade] = useState<Grade>('Grade 10');
  const [showAddModal, setShowAddModal]   = useState(false);

  // ── Derived stats ────────────────────────────────────────────────────────
  const upcomingCount  = EXAMS.filter(e => e.status === 'Upcoming').length;
  const ongoingCount   = EXAMS.filter(e => e.status === 'Ongoing').length;
  const completedCount = EXAMS.filter(e => e.status === 'Completed').length;
  const totalStudentsExamined = EXAMS.filter(e => e.status === 'Completed')
    .reduce((s, e) => s + e.totalStudents, 0);

  // ── Filtered exams ───────────────────────────────────────────────────────
  const filteredExams = useMemo(() => {
    return EXAMS.filter(e => {
      const matchGrade  = gradeFilter === 'All' || e.grade === gradeFilter;
      const matchStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchType   = typeFilter === 'All' || e.type === typeFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || e.name.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.invigilator.toLowerCase().includes(q);
      return matchGrade && matchStatus && matchType && matchSearch;
    });
  }, [gradeFilter, statusFilter, typeFilter, search]);

  // ── Filtered results ─────────────────────────────────────────────────────
  const filteredResults = useMemo(() => {
    return RESULTS.filter(r => {
      const matchGrade = resultGrade === 'All' || r.grade === resultGrade;
      const q = resultSearch.toLowerCase();
      const matchSearch = !q || r.studentName.toLowerCase().includes(q) || r.rollNo.toLowerCase().includes(q);
      return matchGrade && matchSearch;
    });
  }, [resultGrade, resultSearch]);

  // ── Gradebook rows ───────────────────────────────────────────────────────
  const gradebookRows = useMemo(() =>
    GRADEBOOK.filter(r => gradebookGrade === 'All' || r.grade === gradebookGrade),
    [gradebookGrade]
  );

  const TABS: { id: ViewTab; label: string; icon: string }[] = [
    { id: 'schedule',  label: 'Schedule',  icon: 'CalendarDays' },
    { id: 'results',   label: 'Results',   icon: 'Award'        },
    { id: 'gradebook', label: 'Gradebook', icon: 'BookOpen'     },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart2'    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Examinations</h1>
          <p className="text-sm text-muted mt-0.5">Academic Year 2025–26 · Term 2</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={15} />
            Schedule Exam
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-background transition-colors shadow-soft">
            <Icon name="Download" size={15} />
            Export
          </button>
        </div>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon="CalendarClock"
          label="Upcoming Exams"
          value={String(upcomingCount)}
          sub="Scheduled this term"
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon="PenLine"
          label="Ongoing Today"
          value={String(ongoingCount)}
          sub="Currently in progress"
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          icon="CheckCircle"
          label="Completed"
          value={String(completedCount)}
          sub="Results available"
          iconBg="bg-border/40"
          iconColor="text-muted"
        />
        <StatCard
          icon="Users"
          label="Students Examined"
          value={totalStudentsExamined.toLocaleString()}
          sub="Cumulative this term"
          iconBg="bg-accent/10"
          iconColor="text-accent"
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
          TAB: SCHEDULE
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── Exam list ──────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-3">

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-border/60 p-3 shadow-soft space-y-3">
              <div className="relative">
                <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search exam, subject or invigilator…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
                />
              </div>
              {/* Status filter */}
              <div className="flex gap-1.5 flex-wrap">
                {(['All', 'Upcoming', 'Ongoing', 'Completed', 'Rescheduled'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-700 border transition-all ${
                      statusFilter === s
                        ? 'bg-primary text-white border-primary'
                        : 'bg-background text-muted border-border/60 hover:text-foreground'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {/* Type filter */}
              <div className="flex gap-1.5 flex-wrap">
                {(['All', 'Unit Test', 'Mid Term', 'Final', 'Pre-Board', 'Practice'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-700 border transition-all ${
                      typeFilter === t
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-background text-muted border-border/60 hover:text-foreground'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {/* Grade filter */}
              <div className="flex gap-1 flex-wrap">
                {GRADES.map(g => (
                  <button
                    key={g}
                    onClick={() => setGradeFilter(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-700 border transition-all ${
                      gradeFilter === g
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-background text-muted border-border/60 hover:text-foreground'
                    }`}
                  >
                    {g === 'All' ? 'All Grades' : g.replace('Grade ', 'Gr.')}
                  </button>
                ))}
              </div>
            </div>

            {/* Exam cards */}
            <div className="space-y-2">
              {filteredExams.map(exam => {
                const sc = EXAM_STATUS_CONFIG[exam.status];
                const tc = TYPE_CONFIG[exam.type];
                const isSelected = selectedExam?.id === exam.id;
                return (
                  <div
                    key={exam.id}
                    onClick={() => setSelectedExam(isSelected ? null : exam)}
                    className={`bg-white rounded-2xl border shadow-soft p-4 cursor-pointer transition-all hover:border-primary/30 ${
                      isSelected ? 'border-primary/40 bg-primary/2' : 'border-border/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                          <Icon name="FileText" size={18} className="text-primary" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-700 text-sm text-foreground">{exam.subject}</p>
                            <span className={`px-2 py-0.5 rounded-full text-2xs font-700 ${tc.bg} ${tc.text}`}>
                              {exam.type}
                            </span>
                          </div>
                          <p className="text-xs text-muted mt-0.5">{exam.name} · {exam.grade}</p>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <span className="flex items-center gap-1 text-2xs text-muted">
                              <Icon name="Calendar" size={10} />
                              {exam.date}
                            </span>
                            <span className="flex items-center gap-1 text-2xs text-muted">
                              <Icon name="Clock" size={10} />
                              {exam.time} · {exam.duration}
                            </span>
                            <span className="flex items-center gap-1 text-2xs text-muted">
                              <Icon name="MapPin" size={10} />
                              {exam.room}
                            </span>
                            <span className="flex items-center gap-1 text-2xs text-muted">
                              <Icon name="Users" size={10} />
                              {exam.totalStudents}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-700 border flex-shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        {exam.status}
                      </span>
                    </div>
                  </div>
                );
              })}
              {filteredExams.length === 0 && (
                <div className="bg-white rounded-2xl border border-border/60 p-10 text-center shadow-soft">
                  <p className="text-sm text-muted">No exams match your filters.</p>
                </div>
              )}
            </div>
            <p className="text-xs text-muted px-1">{filteredExams.length} of {EXAMS.length} exams</p>
          </div>

          {/* ── Detail panel ───────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {selectedExam ? (
              <div className="bg-white rounded-2xl border border-border/60 shadow-soft lg:sticky lg:top-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-border/40">
                  <div>
                    <p className="font-display text-base font-800 text-foreground">{selectedExam.subject}</p>
                    <p className="text-xs text-muted mt-0.5">{selectedExam.name} · {selectedExam.grade}</p>
                  </div>
                  <button onClick={() => setSelectedExam(null)} className="text-muted hover:text-foreground p-1">
                    <Icon name="X" size={16} />
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Status + type */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-700 border ${EXAM_STATUS_CONFIG[selectedExam.status].bg} ${EXAM_STATUS_CONFIG[selectedExam.status].text} ${EXAM_STATUS_CONFIG[selectedExam.status].border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${EXAM_STATUS_CONFIG[selectedExam.status].dot}`} />
                      {selectedExam.status}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-700 ${TYPE_CONFIG[selectedExam.type].bg} ${TYPE_CONFIG[selectedExam.type].text}`}>
                      {selectedExam.type}
                    </span>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Date',        value: selectedExam.date,         icon: 'Calendar'  },
                      { label: 'Time',        value: selectedExam.time,         icon: 'Clock'     },
                      { label: 'Duration',    value: selectedExam.duration,     icon: 'Timer'     },
                      { label: 'Room',        value: selectedExam.room,         icon: 'MapPin'    },
                      { label: 'Max Marks',   value: String(selectedExam.maxMarks), icon: 'Target' },
                      { label: 'Students',    value: String(selectedExam.totalStudents), icon: 'Users' },
                    ].map(row => (
                      <div key={row.label} className="bg-background rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <Icon name={row.icon} size={11} className="text-muted" />
                          <p className="text-2xs text-muted">{row.label}</p>
                        </div>
                        <p className="text-sm font-700 text-foreground">{row.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Invigilator */}
                  <div className="flex items-center justify-between bg-background rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-2xs font-700 text-primary">
                        {selectedExam.invigilator.split(' ').filter((_,i) => i > 0).map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <p className="text-2xs text-muted">Invigilator</p>
                        <p className="text-xs font-700 text-foreground">{selectedExam.invigilator}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary/90 transition-colors">
                      <Icon name="Edit" size={13} />
                      Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-background border border-border/60 text-xs font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
                      <Icon name="Printer" size={13} />
                      Print Timetable
                    </button>
                    {selectedExam.status === 'Completed' && (
                      <button
                        onClick={() => { setActiveTab('results'); }}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-success/8 border border-success/20 text-xs font-700 text-success rounded-xl hover:bg-success/15 transition-colors"
                      >
                        <Icon name="Award" size={13} />
                        Results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-10 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-3">
                  <Icon name="CalendarDays" size={22} className="text-primary/50" />
                </div>
                <p className="text-sm font-700 text-foreground">Select an exam</p>
                <p className="text-xs text-muted mt-1">Click any exam card to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: RESULTS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-2xl border border-border/60 p-3 shadow-soft flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search student or roll no…"
                value={resultSearch}
                onChange={e => setResultSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {GRADES.map(g => (
                <button
                  key={g}
                  onClick={() => setResultGrade(g)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-700 border transition-all ${
                    resultGrade === g
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-background text-muted border-border/60 hover:text-foreground'
                  }`}
                >
                  {g === 'All' ? 'All' : g.replace('Grade ', 'Gr.')}
                </button>
              ))}
            </div>
          </div>

          {/* Results table */}
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-background">
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Exam</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Subject</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Marks</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Grade</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Percentile</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredResults.map(r => {
                    const rs = RESULT_STATUS_CONFIG[r.status];
                    const gl = GRADE_LETTER_CONFIG[r.grade_letter] ?? GRADE_LETTER_CONFIG['—'];
                    const pct = r.maxMarks > 0 ? Math.round((r.obtained / r.maxMarks) * 100) : 0;
                    return (
                      <tr key={r.id} className="hover:bg-background/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-2xs font-700 text-primary flex-shrink-0">
                              {r.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-700 text-foreground text-xs">{r.studentName}</p>
                              <p className="text-2xs text-muted">{r.rollNo} · {r.grade} {r.section}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted">{r.examName}</td>
                        <td className="px-4 py-3 text-xs text-foreground">{r.subject}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-xs font-700 text-foreground">{r.obtained}</span>
                          <span className="text-2xs text-muted">/{r.maxMarks}</span>
                          <div className="w-full bg-border/30 rounded-full h-1 mt-1 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${pct}%`, backgroundColor: pct >= 75 ? '#10b981' : pct >= 50 ? '#6366f1' : '#ef4444' }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-700 ${gl.bg} ${gl.text}`}>
                            {r.grade_letter}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-xs font-700 text-foreground">
                          {r.status !== 'Absent' ? `${r.percentile}th` : '—'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-700 border ${rs.bg} ${rs.text} ${rs.border}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredResults.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted">No results match your filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-border/40">
              <p className="text-xs text-muted">{filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: GRADEBOOK
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'gradebook' && (
        <div className="space-y-4">
          {/* Grade selector */}
          <div className="bg-white rounded-2xl border border-border/60 p-3 shadow-soft">
            <div className="flex gap-1.5 flex-wrap items-center">
              <span className="text-xs font-700 text-muted mr-1">Grade:</span>
              {GRADES.filter(g => g !== 'All').map(g => (
                <button
                  key={g}
                  onClick={() => setGradebookGrade(g)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-700 border transition-all ${
                    gradebookGrade === g
                      ? 'bg-primary text-white border-primary'
                      : 'bg-background text-muted border-border/60 hover:text-foreground'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Gradebook table */}
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="px-5 py-3 border-b border-border/40 flex items-center justify-between">
              <p className="text-sm font-700 text-foreground">
                {gradebookGrade} · Mid-Term / Pre-Board Scores
              </p>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border/60 text-xs font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
                <Icon name="Download" size={13} />
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-background">
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Student</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">Maths</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">Science</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">English</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">Social</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">Hindi</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">Total</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">%</th>
                    <th className="text-center px-3 py-3 text-xs font-700 text-muted">Rank</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {gradebookRows.map(r => {
                    const rs = RESULT_STATUS_CONFIG[r.resultStatus];
                    return (
                      <tr key={r.rollNo} className="hover:bg-background/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-2xs font-700 text-primary flex-shrink-0">
                              {r.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-700 text-foreground text-xs">{r.studentName}</p>
                              <p className="text-2xs text-muted">{r.rollNo} · {r.grade} {r.section}</p>
                            </div>
                          </div>
                        </td>
                        {[r.maths, r.science, r.english, r.social, r.hindi].map((mark, i) => (
                          <td key={i} className="px-3 py-3 text-center">
                            {mark !== null ? (
                              <span className={`text-xs font-700 ${mark >= 75 ? 'text-success' : mark >= 50 ? 'text-foreground' : 'text-error'}`}>
                                {mark}
                              </span>
                            ) : (
                              <span className="text-2xs text-muted">—</span>
                            )}
                          </td>
                        ))}
                        <td className="px-3 py-3 text-center text-xs font-800 text-foreground">
                          {r.total !== null ? r.total : '—'}
                        </td>
                        <td className="px-3 py-3 text-center">
                          {r.pct !== null ? (
                            <span className={`text-xs font-700 ${r.pct >= 75 ? 'text-success' : r.pct >= 50 ? 'text-foreground' : 'text-error'}`}>
                              {r.pct}%
                            </span>
                          ) : <span className="text-2xs text-muted">—</span>}
                        </td>
                        <td className="px-3 py-3 text-center">
                          {r.rank !== null ? (
                            <span className={`text-xs font-800 ${r.rank === 1 ? 'text-amber-600' : r.rank === 2 ? 'text-slate-500' : r.rank === 3 ? 'text-orange-600' : 'text-foreground'}`}>
                              #{r.rank}
                            </span>
                          ) : <span className="text-2xs text-muted">—</span>}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-700 border ${rs.bg} ${rs.text} ${rs.border}`}>
                            {r.resultStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {gradebookRows.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-10 text-center text-sm text-muted">No students for selected grade.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-border/40">
              <p className="text-xs text-muted">{gradebookRows.length} student{gradebookRows.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: ANALYTICS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">

          {/* Grade performance chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-1">Average Score by Grade</p>
              <p className="text-xs text-muted mb-4">Mid-term & completed exams this term</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={GRADE_PERFORMANCE} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}`} />
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="avg" radius={[6, 6, 0, 0]} name="Avg Score %" maxBarSize={40}>
                    {GRADE_PERFORMANCE.map((entry, i) => (
                      <Cell key={i} fill={entry.avg >= 75 ? '#10b981' : entry.avg >= 65 ? '#6366f1' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pass/fail ratio */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-1">Pass Rate by Grade</p>
              <p className="text-xs text-muted mb-4">Percentage of students passing</p>
              <div className="space-y-3">
                {GRADE_PERFORMANCE.map(g => (
                  <div key={g.grade}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-foreground">{g.grade}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-700 text-success">{g.pass}% pass</span>
                        <span className="text-xs text-error">{g.fail}% fail</span>
                      </div>
                    </div>
                    <div className="w-full bg-error/15 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-success rounded-full"
                        style={{ width: `${g.pass}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject performance */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-1">Subject-wise Performance</p>
            <p className="text-xs text-muted mb-4">Average, top & lowest scores across all completed exams</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={SUBJECT_PERFORMANCE} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Bar dataKey="top"     fill="#d1fae5" radius={[4, 4, 0, 0]} name="Top Score"   maxBarSize={36} />
                <Bar dataKey="avg"     fill="#6366f1" radius={[4, 4, 0, 0]} name="Average"     maxBarSize={36} />
                <Bar dataKey="lowest"  fill="#fecaca" radius={[4, 4, 0, 0]} name="Lowest Score" maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Grade letter distribution */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-4">Grade Letter Distribution</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {GRADE_LETTERS.map((letter, i) => {
                const counts = [4, 5, 3, 3, 2, 2];
                const gl = GRADE_LETTER_CONFIG[letter];
                return (
                  <div key={letter} className={`rounded-2xl p-4 text-center ${gl.bg}`}>
                    <p className={`font-display text-2xl font-800 ${gl.text}`}>{letter}</p>
                    <p className={`text-xs font-700 ${gl.text} mt-1`}>{counts[i]}</p>
                    <p className="text-2xs text-muted">students</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          SCHEDULE EXAM MODAL
      ════════════════════════════════════════════════════════════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40 sticky top-0 bg-white z-10">
              <h3 className="font-display text-base font-800 text-foreground">Schedule New Exam</h3>
              <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-foreground p-1">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-700 text-foreground mb-1.5">Exam Name</label>
                  <input type="text" placeholder="e.g. Term 2 Final Exam" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Exam Type</label>
                  <select className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50">
                    {['Unit Test', 'Mid Term', 'Final', 'Pre-Board', 'Practice'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Grade</label>
                  <select className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50">
                    {GRADES.filter(g => g !== 'All').map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Subject</label>
                  <input type="text" placeholder="e.g. Mathematics" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Max Marks</label>
                  <input type="number" placeholder="100" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Date</label>
                  <input type="date" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Start Time</label>
                  <input type="time" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Duration</label>
                  <input type="text" placeholder="e.g. 3 hrs" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50" />
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Room / Hall</label>
                  <input type="text" placeholder="e.g. Hall A" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-700 text-foreground mb-1.5">Invigilator</label>
                  <input type="text" placeholder="Teacher name" className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50" />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-2 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors">
                  Schedule Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
