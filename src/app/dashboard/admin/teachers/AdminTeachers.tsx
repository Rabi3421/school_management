'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type Gender      = 'Male' | 'Female';
type TeacherStatus = 'Active' | 'On Leave' | 'Resigned' | 'Retired';
type Department  = 'Mathematics' | 'English' | 'Science' | 'Social Studies' | 'Hindi' | 'Computer Science' | 'Physical Education' | 'Arts';

interface ClassAssigned {
  grade: string;
  section: string;
  room: string;
}

interface Teacher {
  id: number;
  empId: string;
  name: string;
  gender: Gender;
  dob: string;
  phone: string;
  email: string;
  address: string;
  department: Department;
  designation: string;
  qualification: string;
  experience: string;        // e.g. "12 yrs"
  joiningDate: string;
  status: TeacherStatus;
  attendance: number;        // percentage this term
  classesAssigned: ClassAssigned[];
  salary: number;
  avatar: string;            // initials
  isClassTeacher: boolean;
  classTeacherOf?: string;   // e.g. "Grade 10A"
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const TEACHERS: Teacher[] = [
  {
    id: 1, empId: 'EMP-001', name: 'Mrs. Anita Sharma', gender: 'Female', dob: '14 Mar 1975',
    phone: '9811100001', email: 'anita.sharma@greenwood.edu', address: '5, Lajpat Nagar, New Delhi',
    department: 'English', designation: 'Principal', qualification: 'M.A. English, B.Ed',
    experience: '22 yrs', joiningDate: '1 Jun 2004', status: 'Active', attendance: 98,
    classesAssigned: [],
    salary: 95000, avatar: 'AS', isClassTeacher: false,
  },
  {
    id: 2, empId: 'EMP-002', name: 'Mr. Ramesh Iyer', gender: 'Male', dob: '22 Jul 1978',
    phone: '9811100002', email: 'ramesh.iyer@greenwood.edu', address: '18, Vasant Vihar, New Delhi',
    department: 'Mathematics', designation: 'HOD – Mathematics', qualification: 'M.Sc. Mathematics, B.Ed',
    experience: '18 yrs', joiningDate: '5 Jul 2008', status: 'Active', attendance: 95,
    classesAssigned: [{ grade: 'Grade 10', section: 'A', room: 'C-204' }, { grade: 'Grade 10', section: 'B', room: 'C-205' }],
    salary: 72000, avatar: 'RI', isClassTeacher: true, classTeacherOf: 'Grade 10A',
  },
  {
    id: 3, empId: 'EMP-003', name: 'Mrs. Priya Nair', gender: 'Female', dob: '8 Nov 1980',
    phone: '9811100003', email: 'priya.nair@greenwood.edu', address: '33, Saket, New Delhi',
    department: 'Science', designation: 'Senior Teacher', qualification: 'M.Sc. Physics, B.Ed',
    experience: '15 yrs', joiningDate: '3 Apr 2011', status: 'Active', attendance: 97,
    classesAssigned: [{ grade: 'Grade 9', section: 'A', room: 'B-101' }, { grade: 'Grade 9', section: 'B', room: 'B-102' }, { grade: 'Grade 10', section: 'A', room: 'B-101' }],
    salary: 68000, avatar: 'PN', isClassTeacher: true, classTeacherOf: 'Grade 9A',
  },
  {
    id: 4, empId: 'EMP-004', name: 'Mr. Anil Kapoor', gender: 'Male', dob: '3 Feb 1982',
    phone: '9811100004', email: 'anil.kapoor@greenwood.edu', address: '47, Pitampura, New Delhi',
    department: 'English', designation: 'Teacher', qualification: 'M.A. English, B.Ed',
    experience: '10 yrs', joiningDate: '8 Aug 2016', status: 'Active', attendance: 91,
    classesAssigned: [{ grade: 'Grade 8', section: 'A', room: 'A-201' }, { grade: 'Grade 8', section: 'B', room: 'A-202' }],
    salary: 58000, avatar: 'AK', isClassTeacher: true, classTeacherOf: 'Grade 8A',
  },
  {
    id: 5, empId: 'EMP-005', name: 'Mrs. Kavita Menon', gender: 'Female', dob: '19 Sep 1979',
    phone: '9811100005', email: 'kavita.menon@greenwood.edu', address: '9, Dwarka, New Delhi',
    department: 'Social Studies', designation: 'School Counsellor', qualification: 'M.A. Psychology, B.Ed',
    experience: '16 yrs', joiningDate: '2 Jan 2010', status: 'Active', attendance: 96,
    classesAssigned: [],
    salary: 62000, avatar: 'KM', isClassTeacher: false,
  },
  {
    id: 6, empId: 'EMP-006', name: 'Mr. Suresh Rao', gender: 'Male', dob: '14 Jun 1984',
    phone: '9811100006', email: 'suresh.rao@greenwood.edu', address: '25, Rohini, New Delhi',
    department: 'Physical Education', designation: 'Sports Head', qualification: 'B.P.Ed, M.P.Ed',
    experience: '12 yrs', joiningDate: '10 Mar 2014', status: 'Active', attendance: 94,
    classesAssigned: [{ grade: 'All', section: 'Grades 6–10', room: 'Ground' }],
    salary: 52000, avatar: 'SR', isClassTeacher: false,
  },
  {
    id: 7, empId: 'EMP-007', name: 'Mrs. Lata Bose', gender: 'Female', dob: '1 Apr 1976',
    phone: '9811100007', email: 'lata.bose@greenwood.edu', address: '60, Karol Bagh, New Delhi',
    department: 'Mathematics', designation: 'Exam Coordinator', qualification: 'M.Sc. Maths, M.Ed',
    experience: '20 yrs', joiningDate: '5 Jun 2006', status: 'Active', attendance: 93,
    classesAssigned: [{ grade: 'Grade 11', section: 'A', room: 'C-301' }, { grade: 'Grade 11', section: 'B', room: 'C-302' }],
    salary: 74000, avatar: 'LB', isClassTeacher: true, classTeacherOf: 'Grade 11A',
  },
  {
    id: 8, empId: 'EMP-008', name: 'Mr. Rajiv Mehta', gender: 'Male', dob: '27 Dec 1986',
    phone: '9811100008', email: 'rajiv.mehta@greenwood.edu', address: '14, Mayur Vihar, New Delhi',
    department: 'Mathematics', designation: 'Teacher', qualification: 'B.Sc. Mathematics, B.Ed',
    experience: '8 yrs', joiningDate: '1 Jul 2018', status: 'Active', attendance: 89,
    classesAssigned: [{ grade: 'Grade 9', section: 'A', room: 'C-204' }, { grade: 'Grade 9', section: 'B', room: 'C-205' }],
    salary: 54000, avatar: 'RM', isClassTeacher: true, classTeacherOf: 'Grade 9B',
  },
  {
    id: 9, empId: 'EMP-009', name: 'Mrs. Deepa Pillai', gender: 'Female', dob: '5 Mar 1983',
    phone: '9811100009', email: 'deepa.pillai@greenwood.edu', address: '38, South Ex, New Delhi',
    department: 'Hindi', designation: 'Senior Teacher', qualification: 'M.A. Hindi, B.Ed',
    experience: '14 yrs', joiningDate: '4 Apr 2012', status: 'Active', attendance: 92,
    classesAssigned: [{ grade: 'Grade 7', section: 'A', room: 'A-101' }, { grade: 'Grade 7', section: 'B', room: 'A-102' }, { grade: 'Grade 6', section: 'A', room: 'A-103' }],
    salary: 60000, avatar: 'DP', isClassTeacher: true, classTeacherOf: 'Grade 7A',
  },
  {
    id: 10, empId: 'EMP-010', name: 'Mr. Dinesh Pillai', gender: 'Male', dob: '11 Oct 1980',
    phone: '9811100010', email: 'dinesh.pillai@greenwood.edu', address: '72, Uttam Nagar, New Delhi',
    department: 'English', designation: 'Librarian', qualification: 'M.L.I.Sc, B.Ed',
    experience: '17 yrs', joiningDate: '9 Jan 2009', status: 'Active', attendance: 96,
    classesAssigned: [],
    salary: 50000, avatar: 'DP', isClassTeacher: false,
  },
  {
    id: 11, empId: 'EMP-011', name: 'Mrs. Sunita Verma', gender: 'Female', dob: '22 May 1985',
    phone: '9811100011', email: 'sunita.verma@greenwood.edu', address: '19, Vikas Puri, New Delhi',
    department: 'Science', designation: 'Teacher', qualification: 'M.Sc. Chemistry, B.Ed',
    experience: '11 yrs', joiningDate: '6 Aug 2015', status: 'Active', attendance: 94,
    classesAssigned: [{ grade: 'Grade 6', section: 'A', room: 'B-201' }, { grade: 'Grade 6', section: 'B', room: 'B-202' }],
    salary: 56000, avatar: 'SV', isClassTeacher: true, classTeacherOf: 'Grade 6A',
  },
  {
    id: 12, empId: 'EMP-012', name: 'Mr. Arvind Sharma', gender: 'Male', dob: '30 Aug 1978',
    phone: '9811100012', email: 'arvind.sharma@greenwood.edu', address: '55, Janakpuri, New Delhi',
    department: 'Social Studies', designation: 'Senior Teacher', qualification: 'M.A. History, B.Ed',
    experience: '19 yrs', joiningDate: '3 Apr 2007', status: 'Active', attendance: 90,
    classesAssigned: [{ grade: 'Grade 11', section: 'A', room: 'D-101' }, { grade: 'Grade 12', section: 'A', room: 'D-102' }],
    salary: 66000, avatar: 'AS', isClassTeacher: true, classTeacherOf: 'Grade 12A',
  },
  {
    id: 13, empId: 'EMP-013', name: 'Mrs. Reena Gupta', gender: 'Female', dob: '13 Jan 1987',
    phone: '9811100013', email: 'reena.gupta@greenwood.edu', address: '8, Preet Vihar, New Delhi',
    department: 'Computer Science', designation: 'Teacher', qualification: 'M.C.A, B.Ed',
    experience: '9 yrs', joiningDate: '2 Jan 2017', status: 'Active', attendance: 88,
    classesAssigned: [{ grade: 'Grade 9', section: 'A', room: 'Lab-1' }, { grade: 'Grade 10', section: 'B', room: 'Lab-1' }],
    salary: 58000, avatar: 'RG', isClassTeacher: false,
  },
  {
    id: 14, empId: 'EMP-014', name: 'Mr. Ramesh Kumar', gender: 'Male', dob: '16 Jul 1981',
    phone: '9811100014', email: 'ramesh.kumar@greenwood.edu', address: '44, Ashok Vihar, New Delhi',
    department: 'Social Studies', designation: 'Teacher', qualification: 'M.A. Geography, B.Ed',
    experience: '13 yrs', joiningDate: '7 Apr 2013', status: 'On Leave', attendance: 78,
    classesAssigned: [{ grade: 'Grade 8', section: 'A', room: 'D-201' }, { grade: 'Grade 8', section: 'B', room: 'D-202' }],
    salary: 60000, avatar: 'RK', isClassTeacher: false,
  },
  {
    id: 15, empId: 'EMP-015', name: 'Mrs. Pooja Singh', gender: 'Female', dob: '4 Jun 1990',
    phone: '9811100015', email: 'pooja.singh@greenwood.edu', address: '31, Rajouri Garden, New Delhi',
    department: 'Arts', designation: 'Teacher', qualification: 'M.F.A, B.Ed',
    experience: '5 yrs', joiningDate: '9 Aug 2021', status: 'Active', attendance: 95,
    classesAssigned: [{ grade: 'Grade 6', section: 'A', room: 'Art-1' }, { grade: 'Grade 7', section: 'A', room: 'Art-1' }],
    salary: 46000, avatar: 'PS', isClassTeacher: false,
  },
  {
    id: 16, empId: 'EMP-016', name: 'Mr. Naveen Chopra', gender: 'Male', dob: '28 Feb 1983',
    phone: '9811100016', email: 'naveen.chopra@greenwood.edu', address: '67, Shalimar Bagh, New Delhi',
    department: 'Science', designation: 'Teacher', qualification: 'M.Sc. Biology, B.Ed',
    experience: '14 yrs', joiningDate: '5 Jan 2012', status: 'Active', attendance: 92,
    classesAssigned: [{ grade: 'Grade 11', section: 'B', room: 'B-301' }, { grade: 'Grade 12', section: 'A', room: 'B-302' }],
    salary: 64000, avatar: 'NC', isClassTeacher: true, classTeacherOf: 'Grade 11B',
  },
  {
    id: 17, empId: 'EMP-017', name: 'Mrs. Geeta Tiwari', gender: 'Female', dob: '7 Sep 1988',
    phone: '9811100017', email: 'geeta.tiwari@greenwood.edu', address: '10, Punjabi Bagh, New Delhi',
    department: 'Hindi', designation: 'Teacher', qualification: 'M.A. Hindi, B.Ed',
    experience: '7 yrs', joiningDate: '3 Jul 2019', status: 'Active', attendance: 91,
    classesAssigned: [{ grade: 'Grade 8', section: 'A', room: 'A-301' }, { grade: 'Grade 9', section: 'B', room: 'A-302' }],
    salary: 50000, avatar: 'GT', isClassTeacher: true, classTeacherOf: 'Grade 8B',
  },
  {
    id: 18, empId: 'EMP-018', name: 'Mr. Tarun Bhat', gender: 'Male', dob: '12 Apr 1992',
    phone: '9811100018', email: 'tarun.bhat@greenwood.edu', address: '23, Greater Kailash, New Delhi',
    department: 'Computer Science', designation: 'Teacher', qualification: 'B.Tech, B.Ed',
    experience: '4 yrs', joiningDate: '8 Apr 2022', status: 'Active', attendance: 87,
    classesAssigned: [{ grade: 'Grade 11', section: 'A', room: 'Lab-2' }, { grade: 'Grade 12', section: 'B', room: 'Lab-2' }],
    salary: 48000, avatar: 'TB', isClassTeacher: false,
  },
  {
    id: 19, empId: 'EMP-019', name: 'Mrs. Shalini Reddy', gender: 'Female', dob: '20 Nov 1984',
    phone: '9811100019', email: 'shalini.reddy@greenwood.edu', address: '49, Malviya Nagar, New Delhi',
    department: 'Mathematics', designation: 'Teacher', qualification: 'M.Sc. Maths, B.Ed',
    experience: '12 yrs', joiningDate: '6 Aug 2014', status: 'Active', attendance: 93,
    classesAssigned: [{ grade: 'Grade 12', section: 'A', room: 'C-401' }, { grade: 'Grade 12', section: 'B', room: 'C-402' }],
    salary: 62000, avatar: 'SR', isClassTeacher: true, classTeacherOf: 'Grade 12B',
  },
  {
    id: 20, empId: 'EMP-020', name: 'Mr. Kiran Pillai', gender: 'Male', dob: '3 Jan 1989',
    phone: '9811100020', email: 'kiran.pillai@greenwood.edu', address: '36, Hauz Khas, New Delhi',
    department: 'English', designation: 'Teacher', qualification: 'M.A. English, B.Ed',
    experience: '6 yrs', joiningDate: '5 Apr 2020', status: 'Active', attendance: 90,
    classesAssigned: [{ grade: 'Grade 6', section: 'B', room: 'A-401' }, { grade: 'Grade 7', section: 'B', room: 'A-402' }],
    salary: 50000, avatar: 'KP', isClassTeacher: true, classTeacherOf: 'Grade 6B',
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<TeacherStatus, { bg: string; text: string; border: string; dot: string }> = {
  Active:   { bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20',  dot: '#10B981' },
  'On Leave': { bg: 'bg-warning/8', text: 'text-warning', border: 'border-warning/20',  dot: '#F59E0B' },
  Resigned: { bg: 'bg-error/8',    text: 'text-error',    border: 'border-error/20',    dot: '#EF4444' },
  Retired:  { bg: 'bg-border/40',  text: 'text-muted',    border: 'border-border/60',   dot: '#94A3B8' },
};

const DEPT_COLORS: Record<Department, { bg: string; text: string; hex: string }> = {
  'Mathematics':        { bg: 'bg-primary/8',   text: 'text-primary',    hex: '#1C4ED8' },
  'English':            { bg: 'bg-accent/8',    text: 'text-accent',     hex: '#0EA5E9' },
  'Science':            { bg: 'bg-success/8',   text: 'text-success',    hex: '#10B981' },
  'Social Studies':     { bg: 'bg-warning/8',   text: 'text-warning',    hex: '#F59E0B' },
  'Hindi':              { bg: 'bg-orange-50',   text: 'text-orange-600', hex: '#F97316' },
  'Computer Science':   { bg: 'bg-purple-50',   text: 'text-purple-600', hex: '#8B5CF6' },
  'Physical Education': { bg: 'bg-teal-50',     text: 'text-teal-600',   hex: '#0D9488' },
  'Arts':               { bg: 'bg-pink-50',     text: 'text-pink-600',   hex: '#EC4899' },
};

const ALL_DEPTS: (Department | 'All')[] = [
  'All', 'Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science', 'Physical Education', 'Arts',
];

type SortKey = 'name' | 'empId' | 'department' | 'attendance' | 'experience';
type SortDir = 'asc' | 'desc';

// ─── Teacher Detail Panel ─────────────────────────────────────────────────────
function TeacherDetail({ teacher, onClose }: { teacher: Teacher; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'performance'>('overview');
  const sc  = STATUS_CONFIG[teacher.status];
  const dc  = DEPT_COLORS[teacher.department];

  const attendanceBars = [92, 95, 88, 96, 91, teacher.attendance];
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-border/40 bg-background">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-800 text-lg text-white flex-shrink-0"
              style={{ backgroundColor: dc.hex }}>
              {teacher.avatar}
            </div>
            <div>
              <div className="font-display font-700 text-base text-foreground">{teacher.name}</div>
              <div className="text-xs text-muted mt-0.5">{teacher.empId} · {teacher.designation}</div>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border ${dc.bg} ${dc.text}`}>
                  {teacher.department}
                </span>
                <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                  {teacher.status}
                </span>
                {teacher.isClassTeacher && (
                  <span className="text-2xs font-700 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    CT – {teacher.classTeacherOf}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-border/40 transition-all flex-shrink-0 lg:hidden">
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 p-1 bg-white border border-border/60 rounded-xl">
          {(['overview', 'classes', 'performance'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-600 capitalize transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-muted hover:text-foreground'
              }`}>
              {tab === 'classes' ? 'Classes' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {/* ── Overview tab ── */}
        {activeTab === 'overview' && (
          <>
            <div>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Personal Details</div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Date of Birth',  value: teacher.dob,           icon: 'CalendarIcon'    },
                  { label: 'Gender',         value: teacher.gender,        icon: 'UserIcon'         },
                  { label: 'Phone',          value: teacher.phone,         icon: 'PhoneIcon'        },
                  { label: 'Joining Date',   value: teacher.joiningDate,   icon: 'BriefcaseIcon'    },
                  { label: 'Qualification',  value: teacher.qualification, icon: 'AcademicCapIcon'  },
                  { label: 'Experience',     value: teacher.experience,    icon: 'ClockIcon'        },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-background border border-border/50">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon name={item.icon as 'CalendarIcon'} size={11} className="text-muted-light" />
                      <span className="text-2xs text-muted-light">{item.label}</span>
                    </div>
                    <div className="text-xs font-700 text-foreground">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Contact</div>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-background border border-border/50 flex items-center gap-2">
                  <Icon name="EnvelopeIcon" size={13} className="text-muted-light flex-shrink-0" />
                  <span className="text-xs text-foreground">{teacher.email}</span>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/50 flex items-start gap-2">
                  <Icon name="MapPinIcon" size={13} className="text-muted-light mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-foreground">{teacher.address}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Salary</div>
              <div className="p-4 rounded-xl bg-primary/4 border border-primary/20 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="BanknotesIcon" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-display text-xl font-800 text-foreground">
                    ₹{teacher.salary.toLocaleString('en-IN')}
                  </div>
                  <div className="text-2xs text-muted">Monthly gross salary</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-700 hover:bg-primary/90 transition-colors">
                <Icon name="PencilSquareIcon" size={13} />
                Edit Profile
              </button>
              <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/60 text-xs font-700 text-muted hover:text-error hover:border-error/30 hover:bg-error/4 transition-colors">
                <Icon name="TrashIcon" size={13} />
              </button>
            </div>
          </>
        )}

        {/* ── Classes tab ── */}
        {activeTab === 'classes' && (
          <>
            {teacher.classesAssigned.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center mb-3">
                  <Icon name="AcademicCapIcon" size={22} className="text-muted-light" />
                </div>
                <div className="text-sm font-700 text-foreground">No classes assigned</div>
                <div className="text-xs text-muted mt-1">This staff member doesn't teach classes</div>
              </div>
            ) : (
              <>
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-1">
                  {teacher.classesAssigned.length} class{teacher.classesAssigned.length !== 1 ? 'es' : ''} assigned
                </div>
                <div className="space-y-2.5">
                  {teacher.classesAssigned.map((cls, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border ${dc.bg} border-${dc.hex}/20`}
                      style={{ borderColor: `${dc.hex}25` }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-800 text-white flex-shrink-0"
                        style={{ backgroundColor: dc.hex }}>
                        {cls.grade.replace('Grade ', '')}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-700 text-foreground">
                          {cls.grade}{cls.section !== 'Grades 6–10' ? ` – ${cls.section}` : ''}
                        </div>
                        <div className="text-2xs text-muted flex items-center gap-1 mt-0.5">
                          <Icon name="MapPinIcon" size={10} className="text-muted-light" />
                          Room {cls.room}
                        </div>
                      </div>
                      {teacher.isClassTeacher && teacher.classTeacherOf === `${cls.grade}${cls.section}` && (
                        <span className="text-2xs font-700 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
                          Class Teacher
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-700 hover:bg-primary/90 transition-colors mt-2">
              <Icon name="PlusIcon" size={13} />
              Assign Class
            </button>
          </>
        )}

        {/* ── Performance tab ── */}
        {activeTab === 'performance' && (
          <>
            <div className={`p-4 rounded-2xl border ${
              teacher.attendance >= 95 ? 'bg-success/8 border-success/20' :
              teacher.attendance >= 85 ? 'bg-warning/8 border-warning/20' :
              'bg-error/8 border-error/20'
            }`}>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-1">Attendance This Term</div>
              <div className={`font-display text-3xl font-800 leading-none ${
                teacher.attendance >= 95 ? 'text-success' :
                teacher.attendance >= 85 ? 'text-warning' : 'text-error'
              }`}>
                {teacher.attendance}%
              </div>
              <div className="text-2xs text-muted mt-1">
                {teacher.attendance >= 95 ? 'Excellent punctuality' : teacher.attendance >= 85 ? 'Good — within standard' : 'Below department average'}
              </div>
            </div>

            <div>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Monthly Attendance</div>
              <div className="flex items-end gap-1.5 h-24">
                {attendanceBars.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-2xs text-muted-light font-600">{val}%</div>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${(val / 100) * 64}px`,
                        backgroundColor: val >= 95 ? '#10B981' : val >= 85 ? '#F59E0B' : '#EF4444',
                        opacity: i === 5 ? 1 : 0.55,
                      }}
                    />
                    <div className="text-2xs text-muted-light">{months[i]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Classes Assigned', value: teacher.classesAssigned.length || '—', icon: 'AcademicCapIcon',  color: 'text-primary',   bg: 'bg-primary/8'  },
                { label: 'Experience',        value: teacher.experience,                    icon: 'ClockIcon',        color: 'text-accent',    bg: 'bg-accent/8'   },
                { label: 'Department',        value: teacher.department,                    icon: 'BuildingLibraryIcon', color: dc.text,         bg: dc.bg           },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={item.icon as 'AcademicCapIcon'} size={14} className={item.color} />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xs text-muted">{item.label}</div>
                    <div className="text-sm font-800 text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminTeachers() {
  const [search,       setSearch]       = useState('');
  const [activeDept,   setActiveDept]   = useState<Department | 'All'>('All');
  const [genderFilter, setGenderFilter] = useState<Gender | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<TeacherStatus | 'All'>('All');
  const [sortKey,      setSortKey]      = useState<SortKey>('empId');
  const [sortDir,      setSortDir]      = useState<SortDir>('asc');
  const [selected,     setSelected]     = useState<Teacher | null>(TEACHERS[1]);
  const [viewMode,     setViewMode]     = useState<'table' | 'grid'>('table');
  const [showAdd,      setShowAdd]      = useState(false);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  const filtered = useMemo(() => {
    return TEACHERS
      .filter((t) => {
        const q = search.toLowerCase();
        if (q && !t.name.toLowerCase().includes(q) && !t.empId.toLowerCase().includes(q) && !t.department.toLowerCase().includes(q)) return false;
        if (activeDept   !== 'All' && t.department !== activeDept)  return false;
        if (genderFilter !== 'All' && t.gender      !== genderFilter) return false;
        if (statusFilter !== 'All' && t.status      !== statusFilter) return false;
        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === 'name')         cmp = a.name.localeCompare(b.name);
        else if (sortKey === 'empId')   cmp = a.empId.localeCompare(b.empId);
        else if (sortKey === 'department') cmp = a.department.localeCompare(b.department);
        else if (sortKey === 'attendance') cmp = a.attendance - b.attendance;
        else if (sortKey === 'experience') cmp = parseInt(a.experience) - parseInt(b.experience);
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [search, activeDept, genderFilter, statusFilter, sortKey, sortDir]);

  // Stats
  const totalTeachers   = TEACHERS.length;
  const activeTeachers  = TEACHERS.filter((t) => t.status === 'Active').length;
  const onLeave         = TEACHERS.filter((t) => t.status === 'On Leave').length;
  const classTeachers   = TEACHERS.filter((t) => t.isClassTeacher).length;
  const avgAttendance   = Math.round(TEACHERS.reduce((s, t) => s + t.attendance, 0) / TEACHERS.length);

  // Dept breakdown
  const deptCounts = Object.fromEntries(
    (['Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 'Computer Science', 'Physical Education', 'Arts'] as Department[])
      .map((d) => [d, TEACHERS.filter((t) => t.department === d).length])
  );

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <Icon name="ChevronUpDownIcon" size={12} className="text-muted-light" />;
    return sortDir === 'asc'
      ? <Icon name="ChevronUpIcon" size={12} className="text-primary" />
      : <Icon name="ChevronDownIcon" size={12} className="text-primary" />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Teachers</h1>
          <p className="text-sm text-muted mt-0.5">Greenwood Academy · New Delhi · Wed, 1 Apr 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary/90 transition-colors shadow-soft">
            <Icon name="PlusIcon" size={14} />
            Add Teacher
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-border/60 text-xs font-700 text-foreground rounded-xl hover:bg-background transition-colors">
            <Icon name="ArrowDownTrayIcon" size={14} />
            Export
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Teachers',   value: totalTeachers,  icon: 'UserGroupIcon',    color: '#1C4ED8', bg: 'bg-primary/8',  sub: `${activeTeachers} active`      },
          { label: 'Avg. Attendance',  value: `${avgAttendance}%`, icon: 'CalendarDaysIcon', color: '#10B981', bg: 'bg-success/8', sub: 'This term'                  },
          { label: 'On Leave',         value: onLeave,        icon: 'ClockIcon',        color: '#F59E0B', bg: 'bg-warning/8',  sub: 'Currently absent'               },
          { label: 'Class Teachers',   value: classTeachers,  icon: 'AcademicCapIcon',  color: '#0EA5E9', bg: 'bg-accent/8',   sub: 'Homeroom assigned'              },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'UserGroupIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Department distribution strip ── */}
      <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
        <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Teachers by Department</div>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
          {(Object.keys(deptCounts) as Department[]).map((dept) => {
            const dc  = DEPT_COLORS[dept];
            const cnt = deptCounts[dept];
            return (
              <button key={dept}
                onClick={() => setActiveDept(activeDept === dept ? 'All' : dept)}
                className={`flex flex-col items-center p-2.5 rounded-xl border transition-all ${
                  activeDept === dept ? 'border-2 shadow-soft' : 'border-border/50 hover:border-border'
                }`}
                style={activeDept === dept ? { borderColor: dc.hex, backgroundColor: `${dc.hex}10` } : {}}>
                <div className="font-display text-xl font-800 leading-none" style={{ color: dc.hex }}>{cnt}</div>
                <div className="text-2xs text-muted mt-1 text-center leading-tight">
                  {dept === 'Physical Education' ? 'P.Ed' : dept === 'Computer Science' ? 'CS' : dept === 'Social Studies' ? 'Soc.' : dept.slice(0, 4) + '.'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, department..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border/60 bg-white text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all" />
        </div>

        {/* Gender filter */}
        <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl">
          {(['All', 'Male', 'Female'] as const).map((g) => (
            <button key={g} onClick={() => setGenderFilter(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
                genderFilter === g ? 'bg-white text-primary shadow-soft border border-border/60' : 'text-muted hover:text-foreground'
              }`}>
              {g}
            </button>
          ))}
        </div>

        {/* Status filter */}
        <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl">
          {(['All', 'Active', 'On Leave', 'Resigned', 'Retired'] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all whitespace-nowrap ${
                statusFilter === s
                  ? s === 'All'
                    ? 'bg-white text-primary shadow-soft border border-border/60'
                    : `${STATUS_CONFIG[s as TeacherStatus]?.bg ?? ''} ${STATUS_CONFIG[s as TeacherStatus]?.text ?? ''} shadow-soft border ${STATUS_CONFIG[s as TeacherStatus]?.border ?? ''}`
                  : 'text-muted hover:text-foreground'
              }`}>
              {s}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl ml-auto">
          {([{ v: 'table', icon: 'Bars3Icon' }, { v: 'grid', icon: 'Squares2X2Icon' }] as const).map(({ v, icon }) => (
            <button key={v} onClick={() => setViewMode(v as 'table' | 'grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === v ? 'bg-white text-primary shadow-soft border border-border/60' : 'text-muted hover:text-foreground'
              }`}>
              <Icon name={icon as 'Bars3Icon'} size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Main split layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Teacher list ── */}
        <div className={`${selected ? 'lg:col-span-3' : 'lg:col-span-5'} space-y-3`}>
          <div className="flex items-center justify-between text-2xs text-muted-light">
            <span>{filtered.length} teacher{filtered.length !== 1 ? 's' : ''}</span>
            {filtered.length !== TEACHERS.length && (
              <button onClick={() => { setSearch(''); setActiveDept('All'); setGenderFilter('All'); setStatusFilter('All'); }}
                className="text-primary font-700 hover:underline">Clear filters</button>
            )}
          </div>

          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-xs">
                  <thead>
                    <tr className="border-b border-border/40 bg-background">
                      {[
                        { label: 'Teacher',    key: 'name'        as SortKey },
                        { label: 'Department', key: 'department'  as SortKey },
                        { label: 'Attendance', key: 'attendance'  as SortKey },
                        { label: 'Status',     key: 'empId'       as SortKey },
                      ].map(({ label, key }) => (
                        <th key={key} onClick={() => handleSort(key)}
                          className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none">
                          <div className="flex items-center gap-1.5">
                            {label}
                            <SortIcon col={key} />
                          </div>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-right text-2xs font-700 text-muted-light uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-muted text-xs">No teachers match your filters</td>
                      </tr>
                    ) : filtered.map((teacher, idx) => {
                      const dc = DEPT_COLORS[teacher.department];
                      const sc = STATUS_CONFIG[teacher.status];
                      const isSelected = selected?.id === teacher.id;
                      return (
                        <tr key={teacher.id}
                          onClick={() => setSelected(isSelected ? null : teacher)}
                          className={`border-b border-border/30 cursor-pointer transition-colors ${
                            isSelected ? 'bg-primary/4' : idx % 2 === 0 ? 'bg-white hover:bg-background/60' : 'bg-background/30 hover:bg-background/60'
                          }`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-800 text-white flex-shrink-0"
                                style={{ backgroundColor: dc.hex }}>{teacher.avatar}</div>
                              <div>
                                <div className="font-700 text-foreground">{teacher.name}</div>
                                <div className="text-2xs text-muted-light">{teacher.empId} · {teacher.experience}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${dc.bg} ${dc.text}`}>
                              {teacher.department}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 rounded-full bg-border/40 max-w-[60px]">
                                <div className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${teacher.attendance}%`,
                                    backgroundColor: teacher.attendance >= 95 ? '#10B981' : teacher.attendance >= 85 ? '#F59E0B' : '#EF4444',
                                  }} />
                              </div>
                              <span className={`font-700 ${teacher.attendance >= 95 ? 'text-success' : teacher.attendance >= 85 ? 'text-warning' : 'text-error'}`}>
                                {teacher.attendance}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border ${sc.bg} ${sc.text} ${sc.border}`}>
                                {teacher.status}
                              </span>
                              {teacher.isClassTeacher && (
                                <span className="text-2xs font-700 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">CT</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={(e) => { e.stopPropagation(); setSelected(teacher); }}
                                className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/8 transition-colors">
                                <Icon name="EyeIcon" size={14} />
                              </button>
                              <button onClick={(e) => e.stopPropagation()}
                                className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-background transition-colors">
                                <Icon name="PencilSquareIcon" size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filtered.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-border/60 text-center">
                  <Icon name="UserGroupIcon" size={32} className="text-muted-light mb-3" />
                  <div className="font-700 text-foreground text-sm">No teachers found</div>
                  <div className="text-xs text-muted mt-1">Try adjusting your filters</div>
                </div>
              ) : filtered.map((teacher) => {
                const dc = DEPT_COLORS[teacher.department];
                const sc = STATUS_CONFIG[teacher.status];
                const isSelected = selected?.id === teacher.id;
                return (
                  <button key={teacher.id}
                    onClick={() => setSelected(isSelected ? null : teacher)}
                    className={`text-left p-4 rounded-2xl border transition-all hover:shadow-card ${
                      isSelected ? 'bg-primary/4 border-primary/30 shadow-soft' : 'bg-white border-border/60 shadow-soft'
                    }`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-800 text-white flex-shrink-0"
                        style={{ backgroundColor: dc.hex }}>{teacher.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-700 text-sm text-foreground truncate">{teacher.name}</div>
                        <div className="text-2xs text-muted-light">{teacher.empId} · {teacher.designation}</div>
                      </div>
                      <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border flex-shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>
                        {teacher.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${dc.bg} ${dc.text}`}>
                        {teacher.department}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 rounded-full bg-border/40">
                          <div className="h-full rounded-full"
                            style={{
                              width: `${teacher.attendance}%`,
                              backgroundColor: teacher.attendance >= 95 ? '#10B981' : teacher.attendance >= 85 ? '#F59E0B' : '#EF4444',
                            }} />
                        </div>
                        <span className={`text-2xs font-700 ${teacher.attendance >= 95 ? 'text-success' : teacher.attendance >= 85 ? 'text-warning' : 'text-error'}`}>
                          {teacher.attendance}%
                        </span>
                      </div>
                    </div>
                    {teacher.isClassTeacher && (
                      <div className="mt-2 text-2xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg font-600">
                        Class Teacher — {teacher.classTeacherOf}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Detail panel ── */}
        {selected && (
          <div className="lg:col-span-2 lg:sticky lg:top-0 lg:max-h-[calc(100vh-10rem)]">
            <TeacherDetail teacher={selected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>

      {/* ── Add Teacher modal ── */}
      {showAdd && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
              <h2 className="font-display font-700 text-base text-foreground">Add New Teacher</h2>
              <button onClick={() => setShowAdd(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-background transition-all">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name',     placeholder: 'e.g. Mrs. Priya Sharma', type: 'text' },
                  { label: 'Employee ID',   placeholder: 'e.g. EMP-021',           type: 'text' },
                  { label: 'Date of Birth', placeholder: '',                        type: 'date' },
                  { label: 'Phone',         placeholder: 'e.g. 9811100021',        type: 'tel'  },
                  { label: 'Email',         placeholder: 'name@greenwood.edu',      type: 'email'},
                  { label: 'Joining Date',  placeholder: '',                        type: 'date' },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1.5">
                    <label className="text-xs font-700 text-foreground">{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-light" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-700 text-foreground">Department</label>
                  <select className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all">
                    {ALL_DEPTS.filter((d) => d !== 'All').map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-700 text-foreground">Gender</label>
                  <select className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all">
                    {['Male', 'Female'].map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-700 text-foreground">Designation</label>
                <input type="text" placeholder="e.g. Senior Teacher, HOD"
                  className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-light" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-700 text-foreground">Qualification</label>
                <input type="text" placeholder="e.g. M.Sc. Mathematics, B.Ed"
                  className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-light" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-700 text-foreground">Address</label>
                <textarea rows={2} placeholder="Full address"
                  className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-none transition-all placeholder:text-muted-light" />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-border/40 bg-background">
              <button onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-xl border border-border/60 text-sm font-700 text-muted hover:bg-background transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowAdd(false)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-700 hover:bg-primary/90 transition-colors shadow-soft">
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
