'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
type ViewTab = 'overview' | 'students' | 'staff' | 'history';
type Grade   = 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

interface ClassAttRow {
  grade: Grade;
  section: string;
  classTeacher: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  percent: number;
}

interface StudentRow {
  rollNo: string;
  name: string;
  grade: Grade;
  section: string;
  todayStatus: 'Present' | 'Absent' | 'Late' | 'Excused';
  termAtt: number;    // % this term
  absenceDays: number;
  lastAbsent: string;
}

interface StaffRow {
  empId: string;
  name: string;
  department: string;
  todayStatus: 'Present' | 'Absent' | 'On Leave';
  termAtt: number;
  designation: string;
}

interface HistoryDay {
  date: string;
  day: string;
  studentPresent: number;
  studentAbsent: number;
  staffPresent: number;
  staffAbsent: number;
  studentPct: number;
  staffPct: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const CLASS_ATT: ClassAttRow[] = [
  { grade: 'Grade 6',  section: 'A', classTeacher: 'Mrs. Sunita Verma',  total: 38, present: 36, absent: 1, late: 1, percent: 97 },
  { grade: 'Grade 6',  section: 'B', classTeacher: 'Mr. Kiran Pillai',   total: 36, present: 34, absent: 2, late: 0, percent: 94 },
  { grade: 'Grade 7',  section: 'A', classTeacher: 'Mrs. Deepa Pillai',  total: 40, present: 37, absent: 2, late: 1, percent: 95 },
  { grade: 'Grade 7',  section: 'B', classTeacher: 'Mrs. Geeta Tiwari',  total: 39, present: 35, absent: 3, late: 1, percent: 92 },
  { grade: 'Grade 8',  section: 'A', classTeacher: 'Mr. Anil Kapoor',    total: 42, present: 38, absent: 3, late: 1, percent: 93 },
  { grade: 'Grade 8',  section: 'B', classTeacher: 'Mrs. Geeta Tiwari',  total: 41, present: 36, absent: 4, late: 1, percent: 90 },
  { grade: 'Grade 9',  section: 'A', classTeacher: 'Mrs. Priya Nair',    total: 44, present: 40, absent: 3, late: 1, percent: 93 },
  { grade: 'Grade 9',  section: 'B', classTeacher: 'Mr. Rajiv Mehta',    total: 43, present: 37, absent: 5, late: 1, percent: 88 },
  { grade: 'Grade 10', section: 'A', classTeacher: 'Mr. Ramesh Iyer',    total: 45, present: 41, absent: 3, late: 1, percent: 93 },
  { grade: 'Grade 10', section: 'B', classTeacher: 'Mr. Ramesh Iyer',    total: 44, present: 38, absent: 4, late: 2, percent: 91 },
  { grade: 'Grade 11', section: 'A', classTeacher: 'Mrs. Lata Bose',     total: 46, present: 42, absent: 3, late: 1, percent: 93 },
  { grade: 'Grade 11', section: 'B', classTeacher: 'Mr. Naveen Chopra',  total: 44, present: 40, absent: 3, late: 1, percent: 93 },
  { grade: 'Grade 12', section: 'A', classTeacher: 'Mr. Arvind Sharma',  total: 42, present: 39, absent: 2, late: 1, percent: 95 },
  { grade: 'Grade 12', section: 'B', classTeacher: 'Mrs. Shalini Reddy', total: 40, present: 37, absent: 2, late: 1, percent: 95 },
];

const STUDENTS: StudentRow[] = [
  { rollNo: 'SR-1001', name: 'Aarav Sharma',   grade: 'Grade 10', section: 'A', todayStatus: 'Present', termAtt: 92, absenceDays: 6,  lastAbsent: 'Mar 22' },
  { rollNo: 'SR-1002', name: 'Priya Patel',    grade: 'Grade 10', section: 'A', todayStatus: 'Present', termAtt: 97, absenceDays: 2,  lastAbsent: 'Feb 10' },
  { rollNo: 'SR-1003', name: 'Rohan Gupta',    grade: 'Grade 10', section: 'B', todayStatus: 'Absent',  termAtt: 78, absenceDays: 16, lastAbsent: 'Apr 1'  },
  { rollNo: 'SR-1004', name: 'Anjali Singh',   grade: 'Grade 10', section: 'B', todayStatus: 'Present', termAtt: 88, absenceDays: 9,  lastAbsent: 'Mar 15' },
  { rollNo: 'SR-1005', name: 'Dev Rathore',    grade: 'Grade 11', section: 'A', todayStatus: 'Late',    termAtt: 85, absenceDays: 11, lastAbsent: 'Mar 30' },
  { rollNo: 'SR-1006', name: 'Kavya Nair',     grade: 'Grade 9',  section: 'A', todayStatus: 'Present', termAtt: 95, absenceDays: 3,  lastAbsent: 'Feb 20' },
  { rollNo: 'SR-1007', name: 'Arjun Mehta',    grade: 'Grade 9',  section: 'B', todayStatus: 'Absent',  termAtt: 82, absenceDays: 13, lastAbsent: 'Apr 1'  },
  { rollNo: 'SR-1008', name: 'Sneha Joshi',    grade: 'Grade 6',  section: 'A', todayStatus: 'Present', termAtt: 100,absenceDays: 0,  lastAbsent: '—'      },
  { rollNo: 'SR-1009', name: 'Vikram Yadav',   grade: 'Grade 12', section: 'A', todayStatus: 'Late',    termAtt: 74, absenceDays: 19, lastAbsent: 'Mar 31' },
  { rollNo: 'SR-1010', name: 'Riya Kapoor',    grade: 'Grade 8',  section: 'B', todayStatus: 'Present', termAtt: 90, absenceDays: 7,  lastAbsent: 'Mar 18' },
  { rollNo: 'SR-1011', name: 'Karan Verma',    grade: 'Grade 7',  section: 'A', todayStatus: 'Absent',  termAtt: 88, absenceDays: 9,  lastAbsent: 'Apr 1'  },
  { rollNo: 'SR-1012', name: 'Meera Iyer',     grade: 'Grade 11', section: 'B', todayStatus: 'Present', termAtt: 96, absenceDays: 3,  lastAbsent: 'Feb 5'  },
  { rollNo: 'SR-1013', name: 'Rahul Tiwari',   grade: 'Grade 9',  section: 'A', todayStatus: 'Absent',  termAtt: 69, absenceDays: 23, lastAbsent: 'Apr 1'  },
  { rollNo: 'SR-1014', name: 'Nisha Malhotra', grade: 'Grade 8',  section: 'A', todayStatus: 'Present', termAtt: 93, absenceDays: 5,  lastAbsent: 'Mar 10' },
  { rollNo: 'SR-1015', name: 'Siddharth Bose', grade: 'Grade 12', section: 'B', todayStatus: 'Present', termAtt: 87, absenceDays: 9,  lastAbsent: 'Mar 24' },
  { rollNo: 'SR-1016', name: 'Tanvi Reddy',    grade: 'Grade 6',  section: 'B', todayStatus: 'Present', termAtt: 100,absenceDays: 0,  lastAbsent: '—'      },
  { rollNo: 'SR-1017', name: 'Ishaan Chopra',  grade: 'Grade 10', section: 'A', todayStatus: 'Excused', termAtt: 91, absenceDays: 6,  lastAbsent: 'Apr 1'  },
  { rollNo: 'SR-1018', name: 'Pooja Desai',    grade: 'Grade 7',  section: 'B', todayStatus: 'Present', termAtt: 84, absenceDays: 11, lastAbsent: 'Mar 26' },
  { rollNo: 'SR-1019', name: 'Aditya Kumar',   grade: 'Grade 11', section: 'A', todayStatus: 'Present', termAtt: 79, absenceDays: 15, lastAbsent: 'Mar 28' },
  { rollNo: 'SR-1020', name: 'Simran Kaur',    grade: 'Grade 12', section: 'A', todayStatus: 'Present', termAtt: 94, absenceDays: 4,  lastAbsent: 'Mar 5'  },
];

const STAFF: StaffRow[] = [
  { empId: 'EMP-001', name: 'Mrs. Anita Sharma',  department: 'Administration',     todayStatus: 'Present',  termAtt: 98, designation: 'Principal'         },
  { empId: 'EMP-002', name: 'Mr. Ramesh Iyer',    department: 'Mathematics',        todayStatus: 'Present',  termAtt: 95, designation: 'HOD – Mathematics'  },
  { empId: 'EMP-003', name: 'Mrs. Priya Nair',    department: 'Science',            todayStatus: 'Present',  termAtt: 97, designation: 'Senior Teacher'      },
  { empId: 'EMP-004', name: 'Mr. Anil Kapoor',    department: 'English',            todayStatus: 'Present',  termAtt: 91, designation: 'Teacher'             },
  { empId: 'EMP-005', name: 'Mrs. Kavita Menon',  department: 'Counselling',        todayStatus: 'Present',  termAtt: 96, designation: 'School Counsellor'   },
  { empId: 'EMP-006', name: 'Mr. Suresh Rao',     department: 'Physical Education', todayStatus: 'Present',  termAtt: 94, designation: 'Sports Head'         },
  { empId: 'EMP-007', name: 'Mrs. Lata Bose',     department: 'Mathematics',        todayStatus: 'Present',  termAtt: 93, designation: 'Exam Coordinator'    },
  { empId: 'EMP-008', name: 'Mr. Rajiv Mehta',    department: 'Mathematics',        todayStatus: 'Present',  termAtt: 89, designation: 'Teacher'             },
  { empId: 'EMP-009', name: 'Mrs. Deepa Pillai',  department: 'Hindi',              todayStatus: 'Present',  termAtt: 92, designation: 'Senior Teacher'      },
  { empId: 'EMP-010', name: 'Mr. Dinesh Pillai',  department: 'Library',            todayStatus: 'Present',  termAtt: 96, designation: 'Librarian'           },
  { empId: 'EMP-011', name: 'Mrs. Sunita Verma',  department: 'Science',            todayStatus: 'Present',  termAtt: 94, designation: 'Teacher'             },
  { empId: 'EMP-012', name: 'Mr. Arvind Sharma',  department: 'Social Studies',     todayStatus: 'Present',  termAtt: 90, designation: 'Senior Teacher'      },
  { empId: 'EMP-013', name: 'Mrs. Reena Gupta',   department: 'Computer Science',   todayStatus: 'Present',  termAtt: 88, designation: 'Teacher'             },
  { empId: 'EMP-014', name: 'Mr. Ramesh Kumar',   department: 'Social Studies',     todayStatus: 'On Leave', termAtt: 78, designation: 'Teacher'             },
  { empId: 'EMP-015', name: 'Mrs. Pooja Singh',   department: 'Arts',               todayStatus: 'Present',  termAtt: 95, designation: 'Teacher'             },
  { empId: 'EMP-016', name: 'Mr. Naveen Chopra',  department: 'Science',            todayStatus: 'Present',  termAtt: 92, designation: 'Teacher'             },
  { empId: 'EMP-017', name: 'Mrs. Geeta Tiwari',  department: 'Hindi',              todayStatus: 'Present',  termAtt: 91, designation: 'Teacher'             },
  { empId: 'EMP-018', name: 'Mr. Tarun Bhat',     department: 'Computer Science',   todayStatus: 'Absent',   termAtt: 87, designation: 'Teacher'             },
  { empId: 'EMP-019', name: 'Mrs. Shalini Reddy', department: 'Mathematics',        todayStatus: 'Present',  termAtt: 93, designation: 'Teacher'             },
  { empId: 'EMP-020', name: 'Mr. Kiran Pillai',   department: 'English',            todayStatus: 'Present',  termAtt: 90, designation: 'Teacher'             },
];

const HISTORY: HistoryDay[] = [
  { date: 'Apr 1',  day: 'Wed', studentPresent: 1175, studentAbsent: 73,  staffPresent: 19, staffAbsent: 1, studentPct: 94, staffPct: 95 },
  { date: 'Mar 31', day: 'Tue', studentPresent: 1162, studentAbsent: 86,  staffPresent: 18, staffAbsent: 2, studentPct: 93, staffPct: 90 },
  { date: 'Mar 30', day: 'Mon', studentPresent: 1148, studentAbsent: 100, staffPresent: 19, staffAbsent: 1, studentPct: 92, staffPct: 95 },
  { date: 'Mar 29', day: 'Sat', studentPresent: 860,  studentAbsent: 64,  staffPresent: 15, staffAbsent: 3, studentPct: 93, staffPct: 83 },
  { date: 'Mar 28', day: 'Fri', studentPresent: 1170, studentAbsent: 78,  staffPresent: 20, staffAbsent: 0, studentPct: 94, staffPct: 100},
  { date: 'Mar 27', day: 'Thu', studentPresent: 1155, studentAbsent: 93,  staffPresent: 18, staffAbsent: 2, studentPct: 93, staffPct: 90 },
  { date: 'Mar 26', day: 'Wed', studentPresent: 1168, studentAbsent: 80,  staffPresent: 19, staffAbsent: 1, studentPct: 94, staffPct: 95 },
  { date: 'Mar 25', day: 'Tue', studentPresent: 1140, studentAbsent: 108, staffPresent: 17, staffAbsent: 3, studentPct: 91, staffPct: 85 },
  { date: 'Mar 24', day: 'Mon', studentPresent: 1152, studentAbsent: 96,  staffPresent: 19, staffAbsent: 1, studentPct: 92, staffPct: 95 },
  { date: 'Mar 22', day: 'Sat', studentPresent: 855,  studentAbsent: 69,  staffPresent: 14, staffAbsent: 4, studentPct: 93, staffPct: 78 },
];

const TREND_DATA = [
  { month: 'Oct', students: 88, staff: 92 },
  { month: 'Nov', students: 91, staff: 95 },
  { month: 'Dec', students: 85, staff: 88 },
  { month: 'Jan', students: 93, staff: 96 },
  { month: 'Feb', students: 89, staff: 93 },
  { month: 'Mar', students: 94, staff: 95 },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const GRADE_COLORS: Record<Grade, string> = {
  'Grade 6': '#10B981', 'Grade 7': '#0EA5E9', 'Grade 8': '#8B5CF6',
  'Grade 9': '#F59E0B', 'Grade 10': '#1C4ED8', 'Grade 11': '#F97316', 'Grade 12': '#EF4444',
};

const STUDENT_STATUS_CFG = {
  Present: { bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20'  },
  Absent:  { bg: 'bg-error/8',    text: 'text-error',    border: 'border-error/20'    },
  Late:    { bg: 'bg-warning/8',  text: 'text-warning',  border: 'border-warning/20'  },
  Excused: { bg: 'bg-accent/8',   text: 'text-accent',   border: 'border-accent/20'   },
};

const STAFF_STATUS_CFG = {
  Present:   { bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20'  },
  Absent:    { bg: 'bg-error/8',    text: 'text-error',    border: 'border-error/20'    },
  'On Leave':{ bg: 'bg-warning/8', text: 'text-warning',   border: 'border-warning/20'  },
};

const ALL_GRADES: (Grade | 'All')[] = [
  'All', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function attColor(pct: number) {
  if (pct >= 90) return '#10B981';
  if (pct >= 80) return '#F59E0B';
  return '#EF4444';
}
function attTextClass(pct: number) {
  if (pct >= 90) return 'text-success';
  if (pct >= 80) return 'text-warning';
  return 'text-error';
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminAttendance() {
  const [activeTab,    setActiveTab]    = useState<ViewTab>('overview');
  const [gradeFilter,  setGradeFilter]  = useState<Grade | 'All'>('All');
  const [search,       setSearch]       = useState('');
  const [staffSearch,  setStaffSearch]  = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Present' | 'Absent' | 'Late' | 'Excused'>('All');

  // Today totals from CLASS_ATT
  const totalStudents  = CLASS_ATT.reduce((s, c) => s + c.total,   0);
  const totalPresent   = CLASS_ATT.reduce((s, c) => s + c.present, 0);
  const totalAbsent    = CLASS_ATT.reduce((s, c) => s + c.absent,  0);
  const totalLate      = CLASS_ATT.reduce((s, c) => s + c.late,    0);
  const todayPct       = Math.round((totalPresent / totalStudents) * 100);

  const totalStaff     = STAFF.length;
  const staffPresent   = STAFF.filter((s) => s.todayStatus === 'Present').length;
  const staffAbsent    = STAFF.filter((s) => s.todayStatus === 'Absent').length;
  const staffOnLeave   = STAFF.filter((s) => s.todayStatus === 'On Leave').length;
  const staffPct       = Math.round((staffPresent / totalStaff) * 100);

  // Low attendance students (below 75%)
  const lowAttCount = STUDENTS.filter((s) => s.termAtt < 75).length;

  // Filtered class rows
  const filteredClasses = useMemo(() =>
    gradeFilter === 'All' ? CLASS_ATT : CLASS_ATT.filter((c) => c.grade === gradeFilter),
    [gradeFilter]
  );

  // Filtered student rows
  const filteredStudents = useMemo(() => {
    return STUDENTS.filter((s) => {
      const q = search.toLowerCase();
      if (q && !s.name.toLowerCase().includes(q) && !s.rollNo.toLowerCase().includes(q)) return false;
      if (gradeFilter !== 'All' && s.grade !== gradeFilter) return false;
      if (statusFilter !== 'All' && s.todayStatus !== statusFilter) return false;
      return true;
    });
  }, [search, gradeFilter, statusFilter]);

  // Filtered staff rows
  const filteredStaff = useMemo(() => {
    return STAFF.filter((s) => {
      const q = staffSearch.toLowerCase();
      return !q || s.name.toLowerCase().includes(q) || s.department.toLowerCase().includes(q);
    });
  }, [staffSearch]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Attendance</h1>
          <p className="text-sm text-muted mt-0.5">Greenwood Academy · New Delhi · Wed, 1 Apr 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-border/60 text-xs font-700 text-foreground rounded-xl hover:bg-background transition-colors">
            <Icon name="ArrowDownTrayIcon" size={14} />
            Export Report
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary/90 transition-colors shadow-soft">
            <Icon name="PrinterIcon" size={14} />
            Print
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Students",  value: `${todayPct}%`,  icon: 'AcademicCapIcon',         color: '#1C4ED8', bg: 'bg-primary/8',  sub: `${totalPresent} of ${totalStudents} present` },
          { label: 'Students Absent',   value: totalAbsent,     icon: 'ExclamationTriangleIcon',  color: '#EF4444', bg: 'bg-error/8',    sub: `${totalLate} late arrivals`                  },
          { label: "Today's Staff",     value: `${staffPct}%`,  icon: 'UserGroupIcon',            color: '#10B981', bg: 'bg-success/8',  sub: `${staffPresent} of ${totalStaff} present`    },
          { label: 'Low Attendance',    value: lowAttCount,     icon: 'ClockIcon',                color: '#F59E0B', bg: 'bg-warning/8',  sub: 'Students below 75%'                          },
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

      {/* ── Today's school-wide at-a-glance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Student pie-style summary */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-4">Students Today</div>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E2E8F0" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1C4ED8" strokeWidth="3.2"
                  strokeDasharray={`${todayPct} ${100 - todayPct}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-base font-800 text-foreground">{todayPct}%</span>
              </div>
            </div>
            <div className="space-y-1.5 flex-1">
              {[
                { label: 'Present', value: totalPresent, color: '#1C4ED8' },
                { label: 'Absent',  value: totalAbsent,  color: '#EF4444' },
                { label: 'Late',    value: totalLate,    color: '#F59E0B' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted flex-1">{item.label}</span>
                  <span className="text-xs font-800 text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-2 bg-border/30 rounded-full overflow-hidden flex">
            <div className="h-full bg-primary transition-all"     style={{ width: `${(totalPresent / totalStudents) * 100}%` }} />
            <div className="h-full bg-warning transition-all"     style={{ width: `${(totalLate    / totalStudents) * 100}%` }} />
            <div className="h-full bg-error transition-all"       style={{ width: `${(totalAbsent  / totalStudents) * 100}%` }} />
          </div>
        </div>

        {/* Staff summary */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-4">Staff Today</div>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E2E8F0" strokeWidth="3.2" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10B981" strokeWidth="3.2"
                  strokeDasharray={`${staffPct} ${100 - staffPct}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-base font-800 text-foreground">{staffPct}%</span>
              </div>
            </div>
            <div className="space-y-1.5 flex-1">
              {[
                { label: 'Present',  value: staffPresent, color: '#10B981' },
                { label: 'Absent',   value: staffAbsent,  color: '#EF4444' },
                { label: 'On Leave', value: staffOnLeave, color: '#F59E0B' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted flex-1">{item.label}</span>
                  <span className="text-xs font-800 text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-2 bg-border/30 rounded-full overflow-hidden flex">
            <div className="h-full bg-success transition-all"     style={{ width: `${(staffPresent / totalStaff) * 100}%` }} />
            <div className="h-full bg-warning transition-all"     style={{ width: `${(staffOnLeave / totalStaff) * 100}%` }} />
            <div className="h-full bg-error transition-all"       style={{ width: `${(staffAbsent  / totalStaff) * 100}%` }} />
          </div>
        </div>

        {/* 6-month trend mini chart */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xs font-700 text-muted-light uppercase tracking-widest">Attendance Trend</div>
            <span className="text-2xs text-muted">Oct – Mar</span>
          </div>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="studentG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1C4ED8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1C4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, fontSize: 11 }}
                formatter={(v: number) => [`${v}%`]}
              />
              <Area type="monotone" dataKey="students" name="Students" stroke="#1C4ED8" fill="url(#studentG)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="staff"    name="Staff"    stroke="#10B981" fill="none"           strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-2xs text-muted">
              <span className="w-3 h-0.5 rounded bg-primary" /> Students
            </span>
            <span className="flex items-center gap-1.5 text-2xs text-muted">
              <span className="w-3 h-0.5 rounded bg-success" /> Staff
            </span>
          </div>
        </div>
      </div>

      {/* ── View tabs ── */}
      <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl overflow-x-auto">
        {([
          { id: 'overview',  label: 'By Class',     icon: 'TableCellsIcon'      },
          { id: 'students',  label: 'Students',     icon: 'AcademicCapIcon'     },
          { id: 'staff',     label: 'Staff',        icon: 'UserGroupIcon'       },
          { id: 'history',   label: 'History',      icon: 'CalendarDaysIcon'    },
        ] as const).map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-600 transition-all ${
              activeTab === tab.id
                ? 'bg-white text-primary shadow-soft border border-border/60'
                : 'text-muted hover:text-foreground'
            }`}>
            <Icon name={tab.icon as 'TableCellsIcon'} size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── BY CLASS view ── */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Grade filter */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5">
            {ALL_GRADES.map((g) => (
              <button key={g} onClick={() => setGradeFilter(g)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-700 border transition-all ${
                  gradeFilter === g
                    ? g === 'All'
                      ? 'bg-primary text-white border-primary'
                      : 'text-white border-transparent'
                    : 'bg-white text-muted border-border/60 hover:border-border'
                }`}
                style={gradeFilter === g && g !== 'All' ? { backgroundColor: GRADE_COLORS[g], borderColor: GRADE_COLORS[g] } : {}}>
                {g}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-background">
                    {['Class', 'Class Teacher', 'Total', 'Present', 'Absent', 'Late', 'Rate'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredClasses.map((row, idx) => {
                    const gc = GRADE_COLORS[row.grade];
                    return (
                      <tr key={`${row.grade}-${row.section}`}
                        className={`border-b border-border/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-background/30'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-800 text-white flex-shrink-0"
                              style={{ backgroundColor: gc }}>
                              {row.grade.replace('Grade ', '')}{row.section}
                            </div>
                            <span className="font-700 text-foreground">{row.grade} – {row.section}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted">{row.classTeacher}</td>
                        <td className="px-4 py-3 font-700 text-foreground">{row.total}</td>
                        <td className="px-4 py-3">
                          <span className="font-700 text-success">{row.present}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-700 ${row.absent > 3 ? 'text-error' : 'text-muted'}`}>{row.absent}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`font-700 ${row.late > 1 ? 'text-warning' : 'text-muted'}`}>{row.late}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-border/40">
                              <div className="h-full rounded-full transition-all" style={{ width: `${row.percent}%`, backgroundColor: attColor(row.percent) }} />
                            </div>
                            <span className={`font-800 ${attTextClass(row.percent)}`}>{row.percent}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-primary/4 border-t border-primary/20">
                    <td className="px-4 py-3 font-800 text-foreground text-xs" colSpan={2}>Total / School Average</td>
                    <td className="px-4 py-3 font-800 text-foreground">{CLASS_ATT.reduce((s, c) => s + c.total, 0)}</td>
                    <td className="px-4 py-3 font-800 text-success">{CLASS_ATT.reduce((s, c) => s + c.present, 0)}</td>
                    <td className="px-4 py-3 font-800 text-error">{CLASS_ATT.reduce((s, c) => s + c.absent, 0)}</td>
                    <td className="px-4 py-3 font-800 text-warning">{CLASS_ATT.reduce((s, c) => s + c.late, 0)}</td>
                    <td className="px-4 py-3">
                      <span className="font-800 text-primary">{todayPct}%</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Per-grade bar chart */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-700 text-sm text-foreground">Attendance Rate by Class</h3>
              <span className="text-2xs text-muted">Today</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={CLASS_ATT.map((c) => ({ name: `${c.grade.replace('Grade ', 'G')}${c.section}`, rate: c.percent, color: GRADE_COLORS[c.grade] }))} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, fontSize: 11 }}
                  formatter={(v: number) => [`${v}%`, 'Attendance']}
                />
                <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                  {CLASS_ATT.map((c, i) => (
                    <Cell key={i} fill={GRADE_COLORS[c.grade]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── STUDENTS view ── */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-light" />
            </div>
            <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl overflow-x-auto">
              {(['All', 'Present', 'Absent', 'Late', 'Excused'] as const).map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
                    statusFilter === s
                      ? s === 'All'
                        ? 'bg-white text-primary shadow-soft border border-border/60'
                        : `${STUDENT_STATUS_CFG[s]?.bg ?? ''} ${STUDENT_STATUS_CFG[s]?.text ?? ''} shadow-soft border ${STUDENT_STATUS_CFG[s]?.border ?? ''}`
                      : 'text-muted hover:text-foreground'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl overflow-x-auto">
              {ALL_GRADES.map((g) => (
                <button key={g} onClick={() => setGradeFilter(g)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
                    gradeFilter === g ? 'bg-white text-primary shadow-soft border border-border/60' : 'text-muted hover:text-foreground'
                  }`}>
                  {g === 'All' ? 'All Grades' : g.replace('Grade ', 'Gr. ')}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-background">
                    {['Student', 'Grade', "Today's Status", 'Term Att.', 'Absences', 'Last Absent'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-muted text-xs">No students match the filters</td></tr>
                  ) : filteredStudents.map((s, idx) => {
                    const gc  = GRADE_COLORS[s.grade];
                    const sc  = STUDENT_STATUS_CFG[s.todayStatus];
                    return (
                      <tr key={s.rollNo}
                        className={`border-b border-border/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-background/30'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-800 text-white flex-shrink-0"
                              style={{ backgroundColor: gc }}>
                              {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-700 text-foreground">{s.name}</div>
                              <div className="text-2xs text-muted-light">{s.rollNo}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-700 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: gc }}>
                            {s.grade.replace('Grade ', 'Gr.')} – {s.section}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                            {s.todayStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 rounded-full bg-border/40">
                              <div className="h-full rounded-full" style={{ width: `${s.termAtt}%`, backgroundColor: attColor(s.termAtt) }} />
                            </div>
                            <span className={`font-800 ${attTextClass(s.termAtt)}`}>{s.termAtt}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-700 text-foreground">{s.absenceDays}</td>
                        <td className="px-4 py-3 text-muted">{s.lastAbsent}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── STAFF view ── */}
      {activeTab === 'staff' && (
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
            <input type="text" value={staffSearch} onChange={(e) => setStaffSearch(e.target.value)}
              placeholder="Search staff..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border/60 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-light" />
          </div>

          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-background">
                    {['Staff Member', 'Department', 'Designation', "Today", 'Term Att.'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((s, idx) => {
                    const sc = STAFF_STATUS_CFG[s.todayStatus];
                    return (
                      <tr key={s.empId}
                        className={`border-b border-border/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-background/30'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-xs font-800 text-accent flex-shrink-0">
                              {s.name.replace('Mrs. ', '').replace('Mr. ', '').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <div className="font-700 text-foreground">{s.name}</div>
                              <div className="text-2xs text-muted-light">{s.empId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted">{s.department}</td>
                        <td className="px-4 py-3 text-muted">{s.designation}</td>
                        <td className="px-4 py-3">
                          <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                            {s.todayStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 rounded-full bg-border/40">
                              <div className="h-full rounded-full" style={{ width: `${s.termAtt}%`, backgroundColor: attColor(s.termAtt) }} />
                            </div>
                            <span className={`font-800 ${attTextClass(s.termAtt)}`}>{s.termAtt}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── HISTORY view ── */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* History chart */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-700 text-sm text-foreground">Daily Attendance (Last 10 Days)</h3>
              <span className="text-2xs text-muted">Students</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={[...HISTORY].reverse()} barSize={18} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, fontSize: 11 }}
                />
                <Bar dataKey="studentPresent" name="Present" fill="#1C4ED8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="studentAbsent"  name="Absent"  fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-2xs text-muted">
                <span className="w-3 h-2 rounded bg-primary" /> Present
              </span>
              <span className="flex items-center gap-1.5 text-2xs text-muted">
                <span className="w-3 h-2 rounded bg-error" /> Absent
              </span>
            </div>
          </div>

          {/* History table */}
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-background">
                    {['Date', 'Student Present', 'Student Absent', 'Student %', 'Staff Present', 'Staff %'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HISTORY.map((row, idx) => (
                    <tr key={row.date}
                      className={`border-b border-border/30 ${idx === 0 ? 'bg-primary/4' : idx % 2 === 0 ? 'bg-white' : 'bg-background/30'}`}>
                      <td className="px-4 py-3">
                        <div className="font-700 text-foreground">{row.date}</div>
                        <div className="text-2xs text-muted-light">{row.day}{idx === 0 && <span className="ml-1.5 text-2xs font-700 text-primary bg-primary/8 px-1.5 py-0.5 rounded-full">Today</span>}</div>
                      </td>
                      <td className="px-4 py-3 font-700 text-success">{row.studentPresent}</td>
                      <td className="px-4 py-3 font-700 text-error">{row.studentAbsent}</td>
                      <td className="px-4 py-3">
                        <span className={`font-800 ${attTextClass(row.studentPct)}`}>{row.studentPct}%</span>
                      </td>
                      <td className="px-4 py-3 font-700 text-foreground">{row.staffPresent}/{row.staffPresent + row.staffAbsent}</td>
                      <td className="px-4 py-3">
                        <span className={`font-800 ${attTextClass(row.staffPct)}`}>{row.staffPct}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
