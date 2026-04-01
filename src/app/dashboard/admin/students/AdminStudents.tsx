'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type Gender    = 'Male' | 'Female';
type FeeStatus = 'Paid' | 'Partial' | 'Due' | 'Overdue';
type Status    = 'Active' | 'Inactive' | 'Transferred' | 'Graduated';
type Grade     = 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

interface Student {
  id: number;
  rollNo: string;
  name: string;
  grade: Grade;
  section: string;
  gender: Gender;
  dob: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  admissionDate: string;
  attendance: number;   // percentage
  feeStatus: FeeStatus;
  feePaid: number;
  feeDue: number;
  status: Status;
  house: string;
  avatar: string;       // initials fallback
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STUDENTS: Student[] = [
  { id: 1,  rollNo: 'SR-1001', name: 'Aarav Sharma',     grade: 'Grade 10', section: 'A', gender: 'Male',   dob: '12 Jun 2010', phone: '9876543210', parentName: 'Rajesh Sharma',    parentPhone: '9811001100', address: '14, Lajpat Nagar, New Delhi', admissionDate: '5 Apr 2018',  attendance: 92, feeStatus: 'Paid',     feePaid: 48000, feeDue: 0,     status: 'Active',      house: 'Blue',   avatar: 'AS' },
  { id: 2,  rollNo: 'SR-1002', name: 'Priya Patel',      grade: 'Grade 10', section: 'A', gender: 'Female', dob: '3 Feb 2010',  phone: '9876543211', parentName: 'Nilesh Patel',     parentPhone: '9811001101', address: '22, Dwarka, New Delhi',       admissionDate: '8 Apr 2018',  attendance: 97, feeStatus: 'Paid',     feePaid: 48000, feeDue: 0,     status: 'Active',      house: 'Red',    avatar: 'PP' },
  { id: 3,  rollNo: 'SR-1003', name: 'Rohan Gupta',      grade: 'Grade 10', section: 'B', gender: 'Male',   dob: '22 Sep 2009', phone: '9876543212', parentName: 'Sunil Gupta',      parentPhone: '9811001102', address: '8, Rohini, New Delhi',        admissionDate: '10 Apr 2018', attendance: 78, feeStatus: 'Partial',  feePaid: 32000, feeDue: 16000, status: 'Active',      house: 'Green',  avatar: 'RG' },
  { id: 4,  rollNo: 'SR-1004', name: 'Anjali Singh',     grade: 'Grade 10', section: 'B', gender: 'Female', dob: '14 Nov 2009', phone: '9876543213', parentName: 'Vikram Singh',     parentPhone: '9811001103', address: '37, Janakpuri, New Delhi',    admissionDate: '12 Apr 2018', attendance: 88, feeStatus: 'Paid',     feePaid: 48000, feeDue: 0,     status: 'Active',      house: 'Yellow', avatar: 'AS' },
  { id: 5,  rollNo: 'SR-1005', name: 'Dev Rathore',      grade: 'Grade 11', section: 'A', gender: 'Male',   dob: '1 Mar 2009',  phone: '9876543214', parentName: 'Mohan Rathore',    parentPhone: '9811001104', address: '55, Vasant Kunj, New Delhi',  admissionDate: '4 Apr 2017',  attendance: 85, feeStatus: 'Due',      feePaid: 0,     feeDue: 52000, status: 'Active',      house: 'Blue',   avatar: 'DR' },
  { id: 6,  rollNo: 'SR-1006', name: 'Kavya Nair',       grade: 'Grade 9',  section: 'A', gender: 'Female', dob: '7 Jul 2011',  phone: '9876543215', parentName: 'Suresh Nair',      parentPhone: '9811001105', address: '9, Saket, New Delhi',         admissionDate: '6 Apr 2019',  attendance: 95, feeStatus: 'Paid',     feePaid: 44000, feeDue: 0,     status: 'Active',      house: 'Red',    avatar: 'KN' },
  { id: 7,  rollNo: 'SR-1007', name: 'Arjun Mehta',      grade: 'Grade 9',  section: 'B', gender: 'Male',   dob: '19 Oct 2011', phone: '9876543216', parentName: 'Amit Mehta',       parentPhone: '9811001106', address: '71, Pitampura, New Delhi',    admissionDate: '3 Apr 2019',  attendance: 82, feeStatus: 'Overdue',  feePaid: 22000, feeDue: 22000, status: 'Active',      house: 'Green',  avatar: 'AM' },
  { id: 8,  rollNo: 'SR-1008', name: 'Sneha Joshi',      grade: 'Grade 6',  section: 'A', gender: 'Female', dob: '11 Apr 2014', phone: '9876543217', parentName: 'Deepak Joshi',     parentPhone: '9811001107', address: '15, Mayur Vihar, New Delhi',  admissionDate: '31 Mar 2026', attendance: 100,feeStatus: 'Paid',     feePaid: 36000, feeDue: 0,     status: 'Active',      house: 'Yellow', avatar: 'SJ' },
  { id: 9,  rollNo: 'SR-1009', name: 'Vikram Yadav',     grade: 'Grade 12', section: 'A', gender: 'Male',   dob: '28 Jan 2008', phone: '9876543218', parentName: 'Ramesh Yadav',     parentPhone: '9811001108', address: '44, Noida Sector 12',         admissionDate: '7 Apr 2016',  attendance: 74, feeStatus: 'Partial',  feePaid: 42000, feeDue: 14000, status: 'Active',      house: 'Blue',   avatar: 'VY' },
  { id: 10, rollNo: 'SR-1010', name: 'Riya Kapoor',      grade: 'Grade 8',  section: 'B', gender: 'Female', dob: '23 Dec 2012', phone: '9876543219', parentName: 'Anil Kapoor',      parentPhone: '9811001109', address: '2, Greater Kailash, New Delhi',admissionDate: '5 Apr 2020',  attendance: 90, feeStatus: 'Paid',     feePaid: 40000, feeDue: 0,     status: 'Active',      house: 'Red',    avatar: 'RK' },
  { id: 11, rollNo: 'SR-1011', name: 'Karan Verma',      grade: 'Grade 7',  section: 'A', gender: 'Male',   dob: '8 Aug 2013',  phone: '9876543220', parentName: 'Manoj Verma',      parentPhone: '9811001110', address: '30, Shahdara, New Delhi',     admissionDate: '9 Apr 2021',  attendance: 88, feeStatus: 'Due',      feePaid: 0,     feeDue: 38000, status: 'Active',      house: 'Green',  avatar: 'KV' },
  { id: 12, rollNo: 'SR-1012', name: 'Meera Iyer',       grade: 'Grade 11', section: 'B', gender: 'Female', dob: '15 May 2009', phone: '9876543221', parentName: 'Suresh Iyer',      parentPhone: '9811001111', address: '18, Karol Bagh, New Delhi',   admissionDate: '6 Apr 2017',  attendance: 96, feeStatus: 'Paid',     feePaid: 52000, feeDue: 0,     status: 'Active',      house: 'Yellow', avatar: 'MI' },
  { id: 13, rollNo: 'SR-1013', name: 'Rahul Tiwari',     grade: 'Grade 9',  section: 'A', gender: 'Male',   dob: '4 Sep 2011',  phone: '9876543222', parentName: 'Satish Tiwari',    parentPhone: '9811001112', address: '67, Uttam Nagar, New Delhi',  admissionDate: '4 Apr 2019',  attendance: 69, feeStatus: 'Overdue',  feePaid: 12000, feeDue: 32000, status: 'Active',      house: 'Blue',   avatar: 'RT' },
  { id: 14, rollNo: 'SR-1014', name: 'Nisha Malhotra',   grade: 'Grade 8',  section: 'A', gender: 'Female', dob: '30 Oct 2012', phone: '9876543223', parentName: 'Rajiv Malhotra',   parentPhone: '9811001113', address: '5, South Ex, New Delhi',      admissionDate: '8 Apr 2020',  attendance: 93, feeStatus: 'Paid',     feePaid: 40000, feeDue: 0,     status: 'Active',      house: 'Red',    avatar: 'NM' },
  { id: 15, rollNo: 'SR-1015', name: 'Siddharth Bose',   grade: 'Grade 12', section: 'B', gender: 'Male',   dob: '16 Feb 2008', phone: '9876543224', parentName: 'Tapan Bose',       parentPhone: '9811001114', address: '3, Hauz Khas, New Delhi',     admissionDate: '5 Apr 2016',  attendance: 87, feeStatus: 'Paid',     feePaid: 56000, feeDue: 0,     status: 'Active',      house: 'Green',  avatar: 'SB' },
  { id: 16, rollNo: 'SR-1016', name: 'Tanvi Reddy',      grade: 'Grade 6',  section: 'B', gender: 'Female', dob: '20 Jun 2014', phone: '9876543225', parentName: 'Venkat Reddy',     parentPhone: '9811001115', address: '12, Malviya Nagar, New Delhi', admissionDate: '28 Mar 2026', attendance: 100,feeStatus: 'Paid',     feePaid: 36000, feeDue: 0,     status: 'Active',      house: 'Yellow', avatar: 'TR' },
  { id: 17, rollNo: 'SR-1017', name: 'Ishaan Chopra',    grade: 'Grade 10', section: 'A', gender: 'Male',   dob: '9 Nov 2009',  phone: '9876543226', parentName: 'Naveen Chopra',    parentPhone: '9811001116', address: '88, Shalimar Bagh, New Delhi', admissionDate: '10 Apr 2018', attendance: 91, feeStatus: 'Partial',  feePaid: 28000, feeDue: 20000, status: 'Active',      house: 'Blue',   avatar: 'IC' },
  { id: 18, rollNo: 'SR-1018', name: 'Pooja Desai',      grade: 'Grade 7',  section: 'B', gender: 'Female', dob: '25 Mar 2013', phone: '9876543227', parentName: 'Hemant Desai',     parentPhone: '9811001117', address: '61, Tilak Nagar, New Delhi',  admissionDate: '7 Apr 2021',  attendance: 84, feeStatus: 'Paid',     feePaid: 38000, feeDue: 0,     status: 'Active',      house: 'Red',    avatar: 'PD' },
  { id: 19, rollNo: 'SR-1019', name: 'Aditya Kumar',     grade: 'Grade 11', section: 'A', gender: 'Male',   dob: '13 Jul 2009', phone: '9876543228', parentName: 'Vijay Kumar',      parentPhone: '9811001118', address: '48, Naraina, New Delhi',      admissionDate: '5 Apr 2017',  attendance: 79, feeStatus: 'Due',      feePaid: 26000, feeDue: 26000, status: 'Active',      house: 'Green',  avatar: 'AK' },
  { id: 20, rollNo: 'SR-1020', name: 'Simran Kaur',      grade: 'Grade 12', section: 'A', gender: 'Female', dob: '17 Aug 2008', phone: '9876543229', parentName: 'Gurpreet Kaur',    parentPhone: '9811001119', address: '10, Punjabi Bagh, New Delhi',  admissionDate: '3 Apr 2016',  attendance: 94, feeStatus: 'Paid',     feePaid: 56000, feeDue: 0,     status: 'Active',      house: 'Yellow', avatar: 'SK' },
  { id: 21, rollNo: 'SR-1021', name: 'Harsh Agarwal',    grade: 'Grade 8',  section: 'A', gender: 'Male',   dob: '6 Dec 2012',  phone: '9876543230', parentName: 'Piyush Agarwal',   parentPhone: '9811001120', address: '35, Krishna Nagar, New Delhi', admissionDate: '4 Apr 2020',  attendance: 86, feeStatus: 'Paid',     feePaid: 40000, feeDue: 0,     status: 'Active',      house: 'Blue',   avatar: 'HA' },
  { id: 22, rollNo: 'SR-1022', name: 'Aditi Mishra',     grade: 'Grade 9',  section: 'B', gender: 'Female', dob: '28 Feb 2011', phone: '9876543231', parentName: 'Sanjay Mishra',    parentPhone: '9811001121', address: '27, Preet Vihar, New Delhi',  admissionDate: '8 Apr 2019',  attendance: 98, feeStatus: 'Paid',     feePaid: 44000, feeDue: 0,     status: 'Active',      house: 'Red',    avatar: 'AM' },
  { id: 23, rollNo: 'SR-1023', name: 'Nikhil Pandey',    grade: 'Grade 7',  section: 'A', gender: 'Male',   dob: '10 May 2013', phone: '9876543232', parentName: 'Ashok Pandey',     parentPhone: '9811001122', address: '19, Vikas Puri, New Delhi',   admissionDate: '6 Apr 2021',  attendance: 73, feeStatus: 'Overdue',  feePaid: 10000, feeDue: 28000, status: 'Active',      house: 'Green',  avatar: 'NP' },
  { id: 24, rollNo: 'SR-1024', name: 'Diya Sharma',      grade: 'Grade 6',  section: 'A', gender: 'Female', dob: '31 Jan 2014', phone: '9876543233', parentName: 'Pradeep Sharma',   parentPhone: '9811001123', address: '53, Alaknanda, New Delhi',    admissionDate: '1 Apr 2026',  attendance: 100,feeStatus: 'Paid',     feePaid: 36000, feeDue: 0,     status: 'Active',      house: 'Yellow', avatar: 'DS' },
  { id: 25, rollNo: 'SR-1025', name: 'Yash Saxena',      grade: 'Grade 10', section: 'B', gender: 'Male',   dob: '21 Apr 2010', phone: '9876543234', parentName: 'Dinesh Saxena',    parentPhone: '9811001124', address: '76, Patparganj, New Delhi',   admissionDate: '12 Apr 2018', attendance: 89, feeStatus: 'Paid',     feePaid: 48000, feeDue: 0,     status: 'Active',      house: 'Blue',   avatar: 'YS' },
  { id: 26, rollNo: 'SR-1026', name: 'Kritika Bhatt',    grade: 'Grade 11', section: 'B', gender: 'Female', dob: '5 Oct 2009',  phone: '9876543235', parentName: 'Mohan Bhatt',      parentPhone: '9811001125', address: '39, Kalkaji, New Delhi',      admissionDate: '7 Apr 2017',  attendance: 91, feeStatus: 'Partial',  feePaid: 39000, feeDue: 13000, status: 'Active',      house: 'Red',    avatar: 'KB' },
  { id: 27, rollNo: 'SR-1027', name: 'Sameer Khan',      grade: 'Grade 12', section: 'B', gender: 'Male',   dob: '14 Mar 2008', phone: '9876543236', parentName: 'Irfan Khan',       parentPhone: '9811001126', address: '8, Okhla, New Delhi',         admissionDate: '4 Apr 2016',  attendance: 83, feeStatus: 'Due',      feePaid: 30000, feeDue: 26000, status: 'Active',      house: 'Green',  avatar: 'SK' },
  { id: 28, rollNo: 'SR-1028', name: 'Poornima Rao',     grade: 'Grade 8',  section: 'B', gender: 'Female', dob: '17 Sep 2012', phone: '9876543237', parentName: 'Ravi Rao',         parentPhone: '9811001127', address: '24, Patel Nagar, New Delhi',  admissionDate: '9 Apr 2020',  attendance: 95, feeStatus: 'Paid',     feePaid: 40000, feeDue: 0,     status: 'Active',      house: 'Yellow', avatar: 'PR' },
  { id: 29, rollNo: 'SR-1029', name: 'Lakshya Dixit',    grade: 'Grade 9',  section: 'A', gender: 'Male',   dob: '2 Nov 2011',  phone: '9876543238', parentName: 'Pankaj Dixit',     parentPhone: '9811001128', address: '66, Rajouri Garden, New Delhi',admissionDate: '5 Apr 2019',  attendance: 88, feeStatus: 'Paid',     feePaid: 44000, feeDue: 0,     status: 'Active',      house: 'Blue',   avatar: 'LD' },
  { id: 30, rollNo: 'SR-1030', name: 'Ananya Tomar',     grade: 'Grade 7',  section: 'B', gender: 'Female', dob: '18 Jul 2013', phone: '9876543239', parentName: 'Vivek Tomar',      parentPhone: '9811001129', address: '11, Ashok Vihar, New Delhi',  admissionDate: '8 Apr 2021',  attendance: 90, feeStatus: 'Paid',     feePaid: 38000, feeDue: 0,     status: 'Active',      house: 'Red',    avatar: 'AT' },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const FEE_STATUS_CONFIG: Record<FeeStatus, { bg: string; text: string; border: string }> = {
  Paid:     { bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20'  },
  Partial:  { bg: 'bg-warning/8',  text: 'text-warning',  border: 'border-warning/20'  },
  Due:      { bg: 'bg-error/8',    text: 'text-error',    border: 'border-error/20'    },
  Overdue:  { bg: 'bg-error/15',   text: 'text-error',    border: 'border-error/30'    },
};

const STATUS_CONFIG: Record<Status, { bg: string; text: string }> = {
  Active:      { bg: 'bg-success/8',  text: 'text-success'  },
  Inactive:    { bg: 'bg-border/40',  text: 'text-muted'    },
  Transferred: { bg: 'bg-accent/8',   text: 'text-accent'   },
  Graduated:   { bg: 'bg-purple-50',  text: 'text-purple-600' },
};

const HOUSE_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  Blue:   { bg: 'bg-primary/8',  text: 'text-primary',    dot: '#1C4ED8' },
  Red:    { bg: 'bg-error/8',    text: 'text-error',      dot: '#EF4444' },
  Green:  { bg: 'bg-success/8',  text: 'text-success',    dot: '#10B981' },
  Yellow: { bg: 'bg-warning/8',  text: 'text-warning',    dot: '#F59E0B' },
};

const GRADE_COLORS: Record<Grade, string> = {
  'Grade 6':  '#10B981',
  'Grade 7':  '#0EA5E9',
  'Grade 8':  '#8B5CF6',
  'Grade 9':  '#F59E0B',
  'Grade 10': '#1C4ED8',
  'Grade 11': '#F97316',
  'Grade 12': '#EF4444',
};

const ALL_GRADES: (Grade | 'All')[] = [
  'All', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12',
];

type SortKey = 'name' | 'rollNo' | 'grade' | 'attendance' | 'feeStatus';
type SortDir = 'asc' | 'desc';

// ─── Student Detail Panel ────────────────────────────────────────────────────
function StudentDetail({ student, onClose }: { student: Student; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'fees' | 'attendance'>('overview');
  const fc = FEE_STATUS_CONFIG[student.feeStatus];
  const sc = STATUS_CONFIG[student.status];
  const hc = HOUSE_COLORS[student.house] ?? HOUSE_COLORS.Blue;
  const gc = GRADE_COLORS[student.grade];

  const attendanceBar = [88, 92, 78, 95, 85, student.attendance]; // last 6 months mock
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-border/40 bg-background">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-800 text-lg text-white flex-shrink-0"
              style={{ backgroundColor: gc }}>
              {student.avatar}
            </div>
            <div>
              <div className="font-display font-700 text-base text-foreground">{student.name}</div>
              <div className="text-xs text-muted mt-0.5">{student.rollNo}</div>
              <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                <span className="text-2xs font-700 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: gc }}>
                  {student.grade} – {student.section}
                </span>
                <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                  {student.status}
                </span>
                <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${hc.bg} ${hc.text}`}>
                  House {student.house}
                </span>
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
          {(['overview', 'fees', 'attendance'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-600 capitalize transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-muted hover:text-foreground'
              }`}>
              {tab}
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
                  { label: 'Date of Birth', value: student.dob,         icon: 'CalendarIcon'        },
                  { label: 'Gender',        value: student.gender,      icon: 'UserIcon'             },
                  { label: 'Phone',         value: student.phone,       icon: 'PhoneIcon'            },
                  { label: 'Admission',     value: student.admissionDate,icon: 'AcademicCapIcon'     },
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
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Address</div>
              <div className="p-3 rounded-xl bg-background border border-border/50 flex items-start gap-2">
                <Icon name="MapPinIcon" size={13} className="text-muted-light mt-0.5 flex-shrink-0" />
                <span className="text-xs text-foreground">{student.address}</span>
              </div>
            </div>

            <div>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Parent / Guardian</div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-background border border-border/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon name="UserIcon" size={11} className="text-muted-light" />
                    <span className="text-2xs text-muted-light">Name</span>
                  </div>
                  <div className="text-xs font-700 text-foreground">{student.parentName}</div>
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/50">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon name="PhoneIcon" size={11} className="text-muted-light" />
                    <span className="text-2xs text-muted-light">Phone</span>
                  </div>
                  <div className="text-xs font-700 text-foreground">{student.parentPhone}</div>
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

        {/* ── Fees tab ── */}
        {activeTab === 'fees' && (
          <>
            <div className={`p-4 rounded-2xl border ${fc.bg} ${fc.border}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest">Fee Status</div>
                <span className={`text-xs font-800 px-2.5 py-1 rounded-full border ${fc.bg} ${fc.text} ${fc.border}`}>
                  {student.feeStatus}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-2xs text-muted-light">Total Paid</div>
                  <div className="font-display text-lg font-800 text-success leading-tight mt-0.5">
                    ₹{student.feePaid.toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <div className="text-2xs text-muted-light">Outstanding Due</div>
                  <div className={`font-display text-lg font-800 leading-tight mt-0.5 ${student.feeDue > 0 ? 'text-error' : 'text-muted-light'}`}>
                    ₹{student.feeDue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
              {student.feeDue > 0 && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-2xs text-muted mb-1">
                    <span>Payment Progress</span>
                    <span>{Math.round((student.feePaid / (student.feePaid + student.feeDue)) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${Math.round((student.feePaid / (student.feePaid + student.feeDue)) * 100)}%` }} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-700 hover:bg-primary/90 transition-colors">
                <Icon name="BanknotesIcon" size={13} />
                Record Payment
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-border/60 text-xs font-700 text-muted hover:bg-background transition-colors">
                <Icon name="DocumentTextIcon" size={13} />
                Fee Receipt
              </button>
            </div>
          </>
        )}

        {/* ── Attendance tab ── */}
        {activeTab === 'attendance' && (
          <>
            <div className={`p-4 rounded-2xl border ${
              student.attendance >= 90 ? 'bg-success/8 border-success/20' :
              student.attendance >= 75 ? 'bg-warning/8 border-warning/20' :
              'bg-error/8 border-error/20'
            }`}>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-1">Overall Attendance</div>
              <div className={`font-display text-3xl font-800 leading-none ${
                student.attendance >= 90 ? 'text-success' :
                student.attendance >= 75 ? 'text-warning' : 'text-error'
              }`}>
                {student.attendance}%
              </div>
              <div className="text-2xs text-muted mt-1">
                {student.attendance < 75 ? '⚠ Below minimum 75% requirement' : 'Within acceptable range'}
              </div>
            </div>

            <div>
              <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Monthly Trend</div>
              <div className="flex items-end gap-1.5 h-24">
                {attendanceBar.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-2xs text-muted-light font-600">{val}%</div>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${(val / 100) * 64}px`,
                        backgroundColor: val >= 90 ? '#10B981' : val >= 75 ? '#F59E0B' : '#EF4444',
                        opacity: i === 5 ? 1 : 0.55,
                      }}
                    />
                    <div className="text-2xs text-muted-light">{months[i]}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-primary text-white text-xs font-700 hover:bg-primary/90 transition-colors">
              <Icon name="CalendarDaysIcon" size={13} />
              View Full Attendance Log
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminStudents() {
  const [search,      setSearch]      = useState('');
  const [activeGrade, setActiveGrade] = useState<Grade | 'All'>('All');
  const [genderFilter,setGenderFilter]= useState<Gender | 'All'>('All');
  const [feeFilter,   setFeeFilter]   = useState<FeeStatus | 'All'>('All');
  const [sortKey,     setSortKey]     = useState<SortKey>('rollNo');
  const [sortDir,     setSortDir]     = useState<SortDir>('asc');
  const [selected,    setSelected]    = useState<Student | null>(STUDENTS[0]);
  const [viewMode,    setViewMode]    = useState<'table' | 'grid'>('table');
  const [showAdd,     setShowAdd]     = useState(false);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  }

  const filtered = useMemo(() => {
    return STUDENTS
      .filter((s) => {
        const q = search.toLowerCase();
        if (q && !s.name.toLowerCase().includes(q) && !s.rollNo.toLowerCase().includes(q) && !s.parentName.toLowerCase().includes(q)) return false;
        if (activeGrade !== 'All' && s.grade !== activeGrade) return false;
        if (genderFilter !== 'All' && s.gender !== genderFilter) return false;
        if (feeFilter !== 'All' && s.feeStatus !== feeFilter) return false;
        return true;
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortKey === 'name')       cmp = a.name.localeCompare(b.name);
        else if (sortKey === 'rollNo') cmp = a.rollNo.localeCompare(b.rollNo);
        else if (sortKey === 'grade')  cmp = a.grade.localeCompare(b.grade) || a.section.localeCompare(b.section);
        else if (sortKey === 'attendance') cmp = a.attendance - b.attendance;
        else if (sortKey === 'feeStatus')  cmp = a.feeStatus.localeCompare(b.feeStatus);
        return sortDir === 'asc' ? cmp : -cmp;
      });
  }, [search, activeGrade, genderFilter, feeFilter, sortKey, sortDir]);

  // Stats
  const totalStudents = STUDENTS.length;
  const activeStudents = STUDENTS.filter((s) => s.status === 'Active').length;
  const feeDefaulters = STUDENTS.filter((s) => s.feeStatus === 'Due' || s.feeStatus === 'Overdue').length;
  const lowAttendance = STUDENTS.filter((s) => s.attendance < 75).length;
  const avgAttendance = Math.round(STUDENTS.reduce((sum, s) => sum + s.attendance, 0) / STUDENTS.length);

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
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Students</h1>
          <p className="text-sm text-muted mt-0.5">Greenwood Academy · New Delhi · Wed, 1 Apr 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary/90 transition-colors shadow-soft">
            <Icon name="PlusIcon" size={14} />
            Add Student
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
          { label: 'Total Students',   value: totalStudents,   icon: 'AcademicCapIcon',            color: '#1C4ED8', bg: 'bg-primary/8',  sub: `${activeStudents} active`         },
          { label: 'Avg. Attendance',  value: `${avgAttendance}%`, icon: 'CalendarDaysIcon',       color: '#10B981', bg: 'bg-success/8',  sub: 'This term'                        },
          { label: 'Fee Defaulters',   value: feeDefaulters,   icon: 'ExclamationTriangleIcon',    color: '#EF4444', bg: 'bg-error/8',    sub: 'Due or overdue'                   },
          { label: 'Low Attendance',   value: lowAttendance,   icon: 'ClockIcon',                  color: '#F59E0B', bg: 'bg-warning/8',  sub: 'Below 75%'                        },
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

      {/* ── Grade distribution strip ── */}
      <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
        <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Students by Grade</div>
        <div className="grid grid-cols-7 gap-2">
          {(['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] as Grade[]).map((g) => {
            const count = STUDENTS.filter((s) => s.grade === g).length;
            const col   = GRADE_COLORS[g];
            return (
              <button key={g}
                onClick={() => setActiveGrade(activeGrade === g ? 'All' : g)}
                className={`flex flex-col items-center p-2.5 rounded-xl border transition-all ${
                  activeGrade === g ? 'border-2 shadow-soft' : 'border-border/50 hover:border-border'
                }`}
                style={activeGrade === g ? { borderColor: col, backgroundColor: `${col}10` } : {}}>
                <div className="font-display text-xl font-800 leading-none" style={{ color: col }}>{count}</div>
                <div className="text-2xs text-muted mt-1 text-center">{g.replace('Grade ', 'Gr.')}</div>
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
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, roll no, parent..."
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

        {/* Fee filter */}
        <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl">
          {(['All', 'Paid', 'Partial', 'Due', 'Overdue'] as const).map((f) => (
            <button key={f} onClick={() => setFeeFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all ${
                feeFilter === f
                  ? f === 'All'
                    ? 'bg-white text-primary shadow-soft border border-border/60'
                    : `${FEE_STATUS_CONFIG[f as FeeStatus]?.bg ?? ''} ${FEE_STATUS_CONFIG[f as FeeStatus]?.text ?? ''} shadow-soft border ${FEE_STATUS_CONFIG[f as FeeStatus]?.border ?? ''}`
                  : 'text-muted hover:text-foreground'
              }`}>
              {f}
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

        {/* ── Student list ── */}
        <div className={`${selected ? 'lg:col-span-3' : 'lg:col-span-5'} space-y-3`}>
          <div className="flex items-center justify-between text-2xs text-muted-light">
            <span>{filtered.length} student{filtered.length !== 1 ? 's' : ''}</span>
            {filtered.length !== STUDENTS.length && (
              <button onClick={() => { setSearch(''); setActiveGrade('All'); setGenderFilter('All'); setFeeFilter('All'); }}
                className="text-primary font-700 hover:underline">Clear filters</button>
            )}
          </div>

          {/* TABLE VIEW */}
          {viewMode === 'table' && (
            <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-xs">
                  <thead>
                    <tr className="border-b border-border/40 bg-background">
                      {[
                        { label: 'Student',    key: 'name'        as SortKey },
                        { label: 'Grade',      key: 'grade'       as SortKey },
                        { label: 'Attendance', key: 'attendance'  as SortKey },
                        { label: 'Fee Status', key: 'feeStatus'   as SortKey },
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
                        <td colSpan={5} className="px-4 py-12 text-center text-muted text-xs">No students match your filters</td>
                      </tr>
                    ) : (
                      filtered.map((student, idx) => {
                        const gc = GRADE_COLORS[student.grade];
                        const fc = FEE_STATUS_CONFIG[student.feeStatus];
                        const isSelected = selected?.id === student.id;
                        return (
                          <tr key={student.id}
                            onClick={() => setSelected(isSelected ? null : student)}
                            className={`border-b border-border/30 cursor-pointer transition-colors ${
                              isSelected ? 'bg-primary/4' : idx % 2 === 0 ? 'bg-white hover:bg-background/60' : 'bg-background/30 hover:bg-background/60'
                            }`}>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-800 text-white flex-shrink-0"
                                  style={{ backgroundColor: gc }}>{student.avatar}</div>
                                <div>
                                  <div className="font-700 text-foreground">{student.name}</div>
                                  <div className="text-2xs text-muted-light">{student.rollNo}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-xs font-700 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: gc }}>
                                {student.grade.replace('Grade ', 'Gr.')} – {student.section}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 rounded-full bg-border/40 max-w-[60px]">
                                  <div className="h-full rounded-full transition-all"
                                    style={{
                                      width: `${student.attendance}%`,
                                      backgroundColor: student.attendance >= 90 ? '#10B981' : student.attendance >= 75 ? '#F59E0B' : '#EF4444',
                                    }} />
                                </div>
                                <span className={`font-700 ${student.attendance >= 90 ? 'text-success' : student.attendance >= 75 ? 'text-warning' : 'text-error'}`}>
                                  {student.attendance}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border ${fc.bg} ${fc.text} ${fc.border}`}>
                                {student.feeStatus}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={(e) => { e.stopPropagation(); setSelected(student); }}
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
                      })
                    )}
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
                  <Icon name="AcademicCapIcon" size={32} className="text-muted-light mb-3" />
                  <div className="font-700 text-foreground text-sm">No students found</div>
                  <div className="text-xs text-muted mt-1">Try adjusting your filters</div>
                </div>
              ) : (
                filtered.map((student) => {
                  const gc = GRADE_COLORS[student.grade];
                  const fc = FEE_STATUS_CONFIG[student.feeStatus];
                  const isSelected = selected?.id === student.id;
                  return (
                    <button key={student.id}
                      onClick={() => setSelected(isSelected ? null : student)}
                      className={`text-left p-4 rounded-2xl border transition-all hover:shadow-card ${
                        isSelected ? 'bg-primary/4 border-primary/30 shadow-soft' : 'bg-white border-border/60 shadow-soft'
                      }`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-800 text-white flex-shrink-0"
                          style={{ backgroundColor: gc }}>{student.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-700 text-sm text-foreground truncate">{student.name}</div>
                          <div className="text-2xs text-muted-light">{student.rollNo}</div>
                        </div>
                        <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border flex-shrink-0 ${fc.bg} ${fc.text} ${fc.border}`}>
                          {student.feeStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-700 px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: gc }}>
                          {student.grade.replace('Grade ', 'Gr.')} – {student.section}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 rounded-full bg-border/40">
                            <div className="h-full rounded-full"
                              style={{
                                width: `${student.attendance}%`,
                                backgroundColor: student.attendance >= 90 ? '#10B981' : student.attendance >= 75 ? '#F59E0B' : '#EF4444',
                              }} />
                          </div>
                          <span className={`text-2xs font-700 ${student.attendance >= 90 ? 'text-success' : student.attendance >= 75 ? 'text-warning' : 'text-error'}`}>
                            {student.attendance}%
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* ── Detail panel ── */}
        {selected && (
          <div className="lg:col-span-2 lg:sticky lg:top-0 lg:max-h-[calc(100vh-10rem)]">
            <StudentDetail student={selected} onClose={() => setSelected(null)} />
          </div>
        )}
      </div>

      {/* ── Add Student modal ── */}
      {showAdd && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
              <h2 className="font-display font-700 text-base text-foreground">Add New Student</h2>
              <button onClick={() => setShowAdd(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-background transition-all">
                <Icon name="XMarkIcon" size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name',       placeholder: 'e.g. Aryan Sharma',     type: 'text'  },
                  { label: 'Roll Number',     placeholder: 'e.g. SR-1249',          type: 'text'  },
                  { label: 'Date of Birth',   placeholder: '',                       type: 'date'  },
                  { label: 'Gender',          placeholder: 'Select gender',          type: 'text'  },
                  { label: 'Parent Name',     placeholder: 'e.g. Rajesh Sharma',    type: 'text'  },
                  { label: 'Parent Phone',    placeholder: 'e.g. 9876543210',       type: 'tel'   },
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
                  <label className="text-xs font-700 text-foreground">Grade</label>
                  <select className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all">
                    {ALL_GRADES.filter((g) => g !== 'All').map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-700 text-foreground">Section</label>
                  <select className="px-3 py-2.5 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all">
                    {['A', 'B', 'C'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
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
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
