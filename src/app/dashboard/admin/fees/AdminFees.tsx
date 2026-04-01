'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
type PaymentStatus = 'Paid' | 'Partial' | 'Due' | 'Overdue';
type FeeCategory   = 'Tuition' | 'Transport' | 'Exam' | 'Sports' | 'Library' | 'Hostel';
type ViewTab       = 'overview' | 'collections' | 'defaulters' | 'transactions';
type Grade         = 'All' | 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

interface FeeRecord {
  id: number;
  rollNo: string;
  name: string;
  grade: string;
  section: string;
  parentName: string;
  phone: string;
  totalFee: number;
  paid: number;
  due: number;
  status: PaymentStatus;
  dueDate: string;
  lastPayment: string;
  lastAmount: number;
  category: FeeCategory;
}

interface Transaction {
  id: string;
  rollNo: string;
  studentName: string;
  grade: string;
  amount: number;
  mode: 'Cash' | 'Online' | 'Cheque' | 'DD';
  date: string;
  receiptNo: string;
  category: FeeCategory;
  receivedBy: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEE_RECORDS: FeeRecord[] = [
  { id: 1,  rollNo: 'SR-1001', name: 'Aarav Sharma',    grade: 'Grade 10', section: 'A', parentName: 'Rajesh Sharma',   phone: '9811001100', totalFee: 48000, paid: 48000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Jan 10', lastAmount: 16000, category: 'Tuition' },
  { id: 2,  rollNo: 'SR-1002', name: 'Priya Patel',     grade: 'Grade 10', section: 'A', parentName: 'Nilesh Patel',    phone: '9811001101', totalFee: 48000, paid: 48000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Feb 5',  lastAmount: 16000, category: 'Tuition' },
  { id: 3,  rollNo: 'SR-1003', name: 'Rohan Gupta',     grade: 'Grade 10', section: 'B', parentName: 'Sunil Gupta',     phone: '9811001102', totalFee: 48000, paid: 32000, due: 16000, status: 'Partial', dueDate: 'Apr 10', lastPayment: 'Feb 12', lastAmount: 16000, category: 'Tuition' },
  { id: 4,  rollNo: 'SR-1004', name: 'Anjali Singh',    grade: 'Grade 10', section: 'B', parentName: 'Vikram Singh',    phone: '9811001103', totalFee: 48000, paid: 48000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 2',  lastAmount: 16000, category: 'Tuition' },
  { id: 5,  rollNo: 'SR-1005', name: 'Dev Rathore',     grade: 'Grade 11', section: 'A', parentName: 'Mohan Rathore',   phone: '9811001104', totalFee: 52000, paid: 0,     due: 52000, status: 'Due',     dueDate: 'Apr 5',  lastPayment: '—',      lastAmount: 0,     category: 'Tuition' },
  { id: 6,  rollNo: 'SR-1006', name: 'Kavya Nair',      grade: 'Grade 9',  section: 'A', parentName: 'Suresh Nair',     phone: '9811001105', totalFee: 44000, paid: 44000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Jan 18', lastAmount: 14700, category: 'Tuition' },
  { id: 7,  rollNo: 'SR-1007', name: 'Arjun Mehta',     grade: 'Grade 9',  section: 'B', parentName: 'Amit Mehta',      phone: '9811001106', totalFee: 44000, paid: 22000, due: 22000, status: 'Overdue', dueDate: 'Mar 15', lastPayment: 'Dec 20', lastAmount: 14700, category: 'Tuition' },
  { id: 8,  rollNo: 'SR-1008', name: 'Sneha Joshi',     grade: 'Grade 6',  section: 'A', parentName: 'Deepak Joshi',    phone: '9811001107', totalFee: 36000, paid: 36000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 28', lastAmount: 12000, category: 'Tuition' },
  { id: 9,  rollNo: 'SR-1009', name: 'Vikram Yadav',    grade: 'Grade 12', section: 'A', parentName: 'Ramesh Yadav',    phone: '9811001108', totalFee: 56000, paid: 42000, due: 14000, status: 'Partial', dueDate: 'Apr 10', lastPayment: 'Feb 28', lastAmount: 18700, category: 'Tuition' },
  { id: 10, rollNo: 'SR-1010', name: 'Riya Kapoor',     grade: 'Grade 8',  section: 'B', parentName: 'Anil Kapoor',     phone: '9811001109', totalFee: 40000, paid: 40000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 10', lastAmount: 13300, category: 'Tuition' },
  { id: 11, rollNo: 'SR-1011', name: 'Karan Verma',     grade: 'Grade 7',  section: 'A', parentName: 'Manoj Verma',     phone: '9811001110', totalFee: 38000, paid: 0,     due: 38000, status: 'Due',     dueDate: 'Apr 5',  lastPayment: '—',      lastAmount: 0,     category: 'Tuition' },
  { id: 12, rollNo: 'SR-1012', name: 'Meera Iyer',      grade: 'Grade 11', section: 'B', parentName: 'Suresh Iyer',     phone: '9811001111', totalFee: 52000, paid: 52000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Jan 20', lastAmount: 17300, category: 'Tuition' },
  { id: 13, rollNo: 'SR-1013', name: 'Rahul Tiwari',    grade: 'Grade 9',  section: 'A', parentName: 'Satish Tiwari',   phone: '9811001112', totalFee: 44000, paid: 12000, due: 32000, status: 'Overdue', dueDate: 'Mar 1',  lastPayment: 'Nov 15', lastAmount: 12000, category: 'Tuition' },
  { id: 14, rollNo: 'SR-1014', name: 'Nisha Malhotra',  grade: 'Grade 8',  section: 'A', parentName: 'Rajiv Malhotra',  phone: '9811001113', totalFee: 40000, paid: 40000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Feb 22', lastAmount: 13300, category: 'Tuition' },
  { id: 15, rollNo: 'SR-1015', name: 'Siddharth Bose',  grade: 'Grade 12', section: 'B', parentName: 'Tapan Bose',      phone: '9811001114', totalFee: 56000, paid: 56000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 5',  lastAmount: 18700, category: 'Tuition' },
  { id: 16, rollNo: 'SR-1016', name: 'Tanvi Reddy',     grade: 'Grade 6',  section: 'B', parentName: 'Venkat Reddy',    phone: '9811001115', totalFee: 36000, paid: 36000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 25', lastAmount: 12000, category: 'Tuition' },
  { id: 17, rollNo: 'SR-1017', name: 'Ishaan Chopra',   grade: 'Grade 10', section: 'A', parentName: 'Naveen Chopra',   phone: '9811001116', totalFee: 48000, paid: 28000, due: 20000, status: 'Partial', dueDate: 'Apr 10', lastPayment: 'Feb 15', lastAmount: 14000, category: 'Tuition' },
  { id: 18, rollNo: 'SR-1018', name: 'Pooja Desai',     grade: 'Grade 7',  section: 'B', parentName: 'Hemant Desai',    phone: '9811001117', totalFee: 38000, paid: 38000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Jan 30', lastAmount: 12700, category: 'Tuition' },
  { id: 19, rollNo: 'SR-1019', name: 'Aditya Kumar',    grade: 'Grade 11', section: 'A', parentName: 'Vijay Kumar',     phone: '9811001118', totalFee: 52000, paid: 26000, due: 26000, status: 'Due',     dueDate: 'Apr 5',  lastPayment: 'Jan 8',  lastAmount: 13000, category: 'Tuition' },
  { id: 20, rollNo: 'SR-1020', name: 'Simran Kaur',     grade: 'Grade 12', section: 'A', parentName: 'Gurpreet Kaur',   phone: '9811001119', totalFee: 56000, paid: 56000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 18', lastAmount: 18700, category: 'Tuition' },
  { id: 21, rollNo: 'SR-1021', name: 'Harsh Agarwal',   grade: 'Grade 8',  section: 'A', parentName: 'Piyush Agarwal',  phone: '9811001120', totalFee: 40000, paid: 40000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Feb 8',  lastAmount: 13300, category: 'Tuition' },
  { id: 22, rollNo: 'SR-1022', name: 'Aditi Mishra',    grade: 'Grade 9',  section: 'B', parentName: 'Sanjay Mishra',   phone: '9811001121', totalFee: 44000, paid: 44000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Jan 25', lastAmount: 14700, category: 'Tuition' },
  { id: 23, rollNo: 'SR-1023', name: 'Nikhil Pandey',   grade: 'Grade 7',  section: 'A', parentName: 'Ashok Pandey',    phone: '9811001122', totalFee: 38000, paid: 10000, due: 28000, status: 'Overdue', dueDate: 'Mar 1',  lastPayment: 'Oct 30', lastAmount: 10000, category: 'Tuition' },
  { id: 24, rollNo: 'SR-1024', name: 'Diya Sharma',     grade: 'Grade 6',  section: 'A', parentName: 'Pradeep Sharma',  phone: '9811001123', totalFee: 36000, paid: 36000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 30', lastAmount: 12000, category: 'Tuition' },
  { id: 25, rollNo: 'SR-1025', name: 'Yash Saxena',     grade: 'Grade 10', section: 'B', parentName: 'Dinesh Saxena',   phone: '9811001124', totalFee: 48000, paid: 48000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 12', lastAmount: 16000, category: 'Tuition' },
  { id: 26, rollNo: 'SR-1026', name: 'Kritika Bhatt',   grade: 'Grade 11', section: 'B', parentName: 'Mohan Bhatt',     phone: '9811001125', totalFee: 52000, paid: 39000, due: 13000, status: 'Partial', dueDate: 'Apr 10', lastPayment: 'Mar 1',  lastAmount: 13000, category: 'Tuition' },
  { id: 27, rollNo: 'SR-1027', name: 'Sameer Khan',     grade: 'Grade 12', section: 'B', parentName: 'Irfan Khan',      phone: '9811001126', totalFee: 56000, paid: 30000, due: 26000, status: 'Due',     dueDate: 'Apr 5',  lastPayment: 'Jan 3',  lastAmount: 15000, category: 'Tuition' },
  { id: 28, rollNo: 'SR-1028', name: 'Poornima Rao',    grade: 'Grade 8',  section: 'B', parentName: 'Ravi Rao',        phone: '9811001127', totalFee: 40000, paid: 40000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Feb 18', lastAmount: 13300, category: 'Tuition' },
  { id: 29, rollNo: 'SR-1029', name: 'Lakshya Dixit',   grade: 'Grade 9',  section: 'A', parentName: 'Pankaj Dixit',    phone: '9811001128', totalFee: 44000, paid: 44000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Mar 20', lastAmount: 14700, category: 'Tuition' },
  { id: 30, rollNo: 'SR-1030', name: 'Ananya Tomar',    grade: 'Grade 7',  section: 'B', parentName: 'Vivek Tomar',     phone: '9811001129', totalFee: 38000, paid: 38000, due: 0,     status: 'Paid',    dueDate: 'Mar 31', lastPayment: 'Feb 26', lastAmount: 12700, category: 'Tuition' },
];

const TRANSACTIONS: Transaction[] = [
  { id: 'TXN-001', rollNo: 'SR-1024', studentName: 'Diya Sharma',    grade: 'Grade 6',  amount: 12000, mode: 'Online', date: 'Apr 1, 2026',  receiptNo: 'RCP-2026-401', category: 'Tuition',   receivedBy: 'Online Portal' },
  { id: 'TXN-002', rollNo: 'SR-1020', studentName: 'Simran Kaur',    grade: 'Grade 12', amount: 18700, mode: 'Online', date: 'Mar 18, 2026', receiptNo: 'RCP-2026-398', category: 'Tuition',   receivedBy: 'Online Portal' },
  { id: 'TXN-003', rollNo: 'SR-1025', studentName: 'Yash Saxena',    grade: 'Grade 10', amount: 16000, mode: 'Cash',   date: 'Mar 12, 2026', receiptNo: 'RCP-2026-393', category: 'Tuition',   receivedBy: 'Mrs. Rekha Arora' },
  { id: 'TXN-004', rollNo: 'SR-1016', studentName: 'Tanvi Reddy',    grade: 'Grade 6',  amount: 12000, mode: 'Online', date: 'Mar 25, 2026', receiptNo: 'RCP-2026-395', category: 'Tuition',   receivedBy: 'Online Portal' },
  { id: 'TXN-005', rollNo: 'SR-1028', studentName: 'Poornima Rao',   grade: 'Grade 8',  amount: 13300, mode: 'Cheque', date: 'Feb 18, 2026', receiptNo: 'RCP-2026-372', category: 'Tuition',   receivedBy: 'Mrs. Rekha Arora' },
  { id: 'TXN-006', rollNo: 'SR-1029', studentName: 'Lakshya Dixit',  grade: 'Grade 9',  amount: 14700, mode: 'Online', date: 'Mar 20, 2026', receiptNo: 'RCP-2026-394', category: 'Tuition',   receivedBy: 'Online Portal' },
  { id: 'TXN-007', rollNo: 'SR-1015', studentName: 'Siddharth Bose', grade: 'Grade 12', amount: 18700, mode: 'DD',     date: 'Mar 5, 2026',  receiptNo: 'RCP-2026-388', category: 'Tuition',   receivedBy: 'Mr. Pranav Das' },
  { id: 'TXN-008', rollNo: 'SR-1004', studentName: 'Anjali Singh',   grade: 'Grade 10', amount: 16000, mode: 'Cash',   date: 'Mar 2, 2026',  receiptNo: 'RCP-2026-386', category: 'Tuition',   receivedBy: 'Mrs. Rekha Arora' },
  { id: 'TXN-009', rollNo: 'SR-1010', studentName: 'Riya Kapoor',    grade: 'Grade 8',  amount: 13300, mode: 'Online', date: 'Mar 10, 2026', receiptNo: 'RCP-2026-390', category: 'Tuition',   receivedBy: 'Online Portal' },
  { id: 'TXN-010', rollNo: 'SR-1026', studentName: 'Kritika Bhatt',  grade: 'Grade 11', amount: 13000, mode: 'Online', date: 'Mar 1, 2026',  receiptNo: 'RCP-2026-385', category: 'Tuition',   receivedBy: 'Online Portal' },
  { id: 'TXN-011', rollNo: 'SR-1001', studentName: 'Aarav Sharma',   grade: 'Grade 10', amount: 16000, mode: 'Cash',   date: 'Jan 10, 2026', receiptNo: 'RCP-2026-310', category: 'Tuition',   receivedBy: 'Mrs. Rekha Arora' },
  { id: 'TXN-012', rollNo: 'SR-1030', studentName: 'Ananya Tomar',   grade: 'Grade 7',  amount: 12700, mode: 'Online', date: 'Feb 26, 2026', receiptNo: 'RCP-2026-378', category: 'Tuition',   receivedBy: 'Online Portal' },
];

const MONTHLY_COLLECTION = [
  { month: 'Oct', collected: 420000, target: 480000 },
  { month: 'Nov', collected: 395000, target: 480000 },
  { month: 'Dec', collected: 310000, target: 480000 },
  { month: 'Jan', collected: 452000, target: 480000 },
  { month: 'Feb', collected: 468000, target: 480000 },
  { month: 'Mar', collected: 475000, target: 480000 },
];

const GRADE_COLLECTION = [
  { grade: 'Gr.6',  collected: 108000, total: 108000, pct: 100 },
  { grade: 'Gr.7',  collected:  86000, total: 114000, pct:  75 },
  { grade: 'Gr.8',  collected: 133300, total: 160000, pct:  83 },
  { grade: 'Gr.9',  collected: 134700, total: 176000, pct:  77 },
  { grade: 'Gr.10', collected: 202000, total: 240000, pct:  84 },
  { grade: 'Gr.11', collected: 143000, total: 208000, pct:  69 },
  { grade: 'Gr.12', collected: 184000, total: 224000, pct:  82 },
];

const CATEGORY_BREAKDOWN = [
  { name: 'Tuition',   amount: 890000, color: '#6366f1', pct: 68 },
  { name: 'Transport', amount: 180000, color: '#f59e0b', pct: 14 },
  { name: 'Exam',      amount: 105000, color: '#10b981', pct:  8 },
  { name: 'Sports',    amount:  65000, color: '#3b82f6', pct:  5 },
  { name: 'Library',   amount:  39000, color: '#8b5cf6', pct:  3 },
  { name: 'Hostel',    amount:  26000, color: '#ec4899', pct:  2 },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<PaymentStatus, { bg: string; text: string; border: string; dot: string }> = {
  Paid:    { bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20', dot: 'bg-success'  },
  Partial: { bg: 'bg-warning/8',  text: 'text-warning',  border: 'border-warning/20', dot: 'bg-warning'  },
  Due:     { bg: 'bg-error/8',    text: 'text-error',    border: 'border-error/20',   dot: 'bg-error'    },
  Overdue: { bg: 'bg-error/15',   text: 'text-error',    border: 'border-error/30',   dot: 'bg-error'    },
};

const MODE_CONFIG: Record<string, { bg: string; text: string }> = {
  Cash:   { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  Online: { bg: 'bg-blue-50',    text: 'text-blue-700'    },
  Cheque: { bg: 'bg-purple-50',  text: 'text-purple-700'  },
  DD:     { bg: 'bg-orange-50',  text: 'text-orange-700'  },
};

const GRADES: Grade[] = ['All', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

function fmt(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}
function fmtFull(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({
  icon, label, value, sub, iconBg, iconColor, trend,
}: {
  icon: string; label: string; value: string; sub: string;
  iconBg: string; iconColor: string; trend?: { up: boolean; label: string };
}) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon name={icon} size={18} className={iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted mb-0.5">{label}</p>
        <p className="font-display text-2xl font-800 text-foreground leading-none">{value}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-2xs text-muted">{sub}</span>
          {trend && (
            <span className={`text-2xs font-700 flex items-center gap-0.5 ${trend.up ? 'text-success' : 'text-error'}`}>
              <Icon name={trend.up ? 'TrendingUp' : 'TrendingDown'} size={10} />
              {trend.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminFees() {
  const [activeTab, setActiveTab]         = useState<ViewTab>('overview');
  const [gradeFilter, setGradeFilter]     = useState<Grade>('All');
  const [statusFilter, setStatusFilter]   = useState<PaymentStatus | 'All'>('All');
  const [search, setSearch]               = useState('');
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null);
  const [showPayModal, setShowPayModal]   = useState(false);
  const [payAmount, setPayAmount]         = useState('');
  const [payMode, setPayMode]             = useState<'Cash' | 'Online' | 'Cheque' | 'DD'>('Cash');
  const [txnSearch, setTxnSearch]         = useState('');

  // ── Derived stats ────────────────────────────────────────────────────────
  const totalFee       = FEE_RECORDS.reduce((s, r) => s + r.totalFee, 0);
  const totalCollected = FEE_RECORDS.reduce((s, r) => s + r.paid, 0);
  const totalDue       = FEE_RECORDS.reduce((s, r) => s + r.due, 0);
  const paidCount      = FEE_RECORDS.filter(r => r.status === 'Paid').length;
  const overdueCount   = FEE_RECORDS.filter(r => r.status === 'Overdue').length;
  const partialCount   = FEE_RECORDS.filter(r => r.status === 'Partial').length;
  const dueCount       = FEE_RECORDS.filter(r => r.status === 'Due').length;
  const collectionPct  = Math.round((totalCollected / totalFee) * 100);

  // ── Filtered fee records ─────────────────────────────────────────────────
  const filteredRecords = useMemo(() => {
    return FEE_RECORDS.filter(r => {
      const matchGrade  = gradeFilter === 'All' || r.grade === gradeFilter;
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.rollNo.toLowerCase().includes(q) || r.parentName.toLowerCase().includes(q);
      return matchGrade && matchStatus && matchSearch;
    });
  }, [gradeFilter, statusFilter, search]);

  // ── Filtered transactions ────────────────────────────────────────────────
  const filteredTxns = useMemo(() => {
    const q = txnSearch.toLowerCase();
    return TRANSACTIONS.filter(t =>
      !q || t.studentName.toLowerCase().includes(q) || t.rollNo.toLowerCase().includes(q) || t.receiptNo.toLowerCase().includes(q)
    );
  }, [txnSearch]);

  // ── Defaulters list ──────────────────────────────────────────────────────
  const defaulters = useMemo(() =>
    FEE_RECORDS.filter(r => r.status === 'Overdue' || r.status === 'Due')
      .sort((a, b) => b.due - a.due),
    []
  );

  const TABS: { id: ViewTab; label: string; icon: string }[] = [
    { id: 'overview',     label: 'Overview',     icon: 'LayoutDashboard' },
    { id: 'collections',  label: 'Collections',  icon: 'IndianRupee'     },
    { id: 'defaulters',   label: 'Defaulters',   icon: 'AlertCircle'     },
    { id: 'transactions', label: 'Transactions', icon: 'Receipt'         },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Fee Management</h1>
          <p className="text-sm text-muted mt-0.5">Academic Year 2025–26 · Term 2</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPayModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={15} />
            Record Payment
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
          icon="IndianRupee"
          label="Total Collected"
          value={fmt(totalCollected)}
          sub={`${collectionPct}% of ₹${(totalFee / 100000).toFixed(1)}L target`}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          trend={{ up: true, label: '+4.2% vs last term' }}
        />
        <StatCard
          icon="AlertCircle"
          label="Total Pending"
          value={fmt(totalDue)}
          sub={`${dueCount + partialCount + overdueCount} students unpaid`}
          iconBg="bg-error/10"
          iconColor="text-error"
        />
        <StatCard
          icon="CheckCircle"
          label="Fully Paid"
          value={`${paidCount}`}
          sub={`of ${FEE_RECORDS.length} students`}
          iconBg="bg-success/10"
          iconColor="text-success"
          trend={{ up: true, label: `${Math.round((paidCount / FEE_RECORDS.length) * 100)}% clearance` }}
        />
        <StatCard
          icon="Clock"
          label="Overdue"
          value={`${overdueCount}`}
          sub="Crossed due date"
          iconBg="bg-warning/10"
          iconColor="text-warning"
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
          TAB: OVERVIEW
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="space-y-4">

          {/* Collection progress bar */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-700 text-foreground">Overall Collection Progress</p>
                <p className="text-xs text-muted">Term 2 · Apr 2025 – Mar 2026</p>
              </div>
              <span className="font-display text-2xl font-800 text-primary">{collectionPct}%</span>
            </div>
            <div className="w-full bg-border/30 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${collectionPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted">
              <span>Collected: {fmtFull(totalCollected)}</span>
              <span>Total Target: {fmtFull(totalFee)}</span>
            </div>
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Monthly collection trend */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-1">Monthly Collection Trend</p>
              <p className="text-xs text-muted mb-4">Collected vs target (Oct 2025 – Mar 2026)</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={MONTHLY_COLLECTION} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}K`} />
                  <Tooltip formatter={(v: number) => fmtFull(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="target"    stroke="#e2e8f0" strokeWidth={1.5} fill="none" strokeDasharray="4 4" name="Target" />
                  <Area type="monotone" dataKey="collected" stroke="#6366f1" strokeWidth={2}   fill="url(#colGrad)"               name="Collected" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category breakdown */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <p className="text-sm font-700 text-foreground mb-1">Fee Category Split</p>
              <p className="text-xs text-muted mb-4">This academic year</p>
              <div className="space-y-3">
                {CATEGORY_BREAKDOWN.map(cat => (
                  <div key={cat.name}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs text-foreground">{cat.name}</span>
                      <span className="text-xs font-700 text-foreground">{cat.pct}%</span>
                    </div>
                    <div className="w-full bg-border/30 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${cat.pct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                    <p className="text-2xs text-muted mt-0.5">{fmtFull(cat.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grade-wise collection */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <p className="text-sm font-700 text-foreground mb-1">Grade-wise Collection</p>
            <p className="text-xs text-muted mb-4">% of total fee collected per grade</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={GRADE_COLLECTION} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Bar dataKey="pct" radius={[6, 6, 0, 0]} name="Collection %" maxBarSize={40}>
                  {GRADE_COLLECTION.map((entry, i) => (
                    <Cell key={i} fill={entry.pct >= 90 ? '#10b981' : entry.pct >= 75 ? '#6366f1' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(
              [
                { status: 'Paid',    count: paidCount,    icon: 'CheckCircle2', color: 'text-success', bg: 'bg-success/8' },
                { status: 'Partial', count: partialCount, icon: 'CircleHalf',   color: 'text-warning', bg: 'bg-warning/8' },
                { status: 'Due',     count: dueCount,     icon: 'Clock',        color: 'text-error',   bg: 'bg-error/8'   },
                { status: 'Overdue', count: overdueCount, icon: 'AlertCircle',  color: 'text-error',   bg: 'bg-error/15'  },
              ] as { status: PaymentStatus; count: number; icon: string; color: string; bg: string }[]
            ).map(s => (
              <button
                key={s.status}
                onClick={() => { setActiveTab('collections'); setStatusFilter(s.status); }}
                className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft text-left hover:border-primary/30 transition-colors group"
              >
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-2`}>
                  <Icon name={s.icon} size={16} className={s.color} />
                </div>
                <p className="font-display text-2xl font-800 text-foreground">{s.count}</p>
                <p className="text-xs text-muted">{s.status} students</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: COLLECTIONS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'collections' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* ── List ───────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-3">

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-border/60 p-3 shadow-soft space-y-3">
              <div className="relative">
                <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Search student, roll no or parent…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {(['All', 'Paid', 'Partial', 'Due', 'Overdue'] as const).map(s => (
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

            {/* Table */}
            <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/60 bg-background">
                      <th className="text-left px-4 py-3 text-xs font-700 text-muted">Student</th>
                      <th className="text-left px-4 py-3 text-xs font-700 text-muted">Grade</th>
                      <th className="text-right px-4 py-3 text-xs font-700 text-muted">Total Fee</th>
                      <th className="text-right px-4 py-3 text-xs font-700 text-muted">Paid</th>
                      <th className="text-right px-4 py-3 text-xs font-700 text-muted">Due</th>
                      <th className="text-center px-4 py-3 text-xs font-700 text-muted">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {filteredRecords.map(r => {
                      const sc = STATUS_CONFIG[r.status];
                      const isSelected = selectedRecord?.id === r.id;
                      return (
                        <tr
                          key={r.id}
                          onClick={() => setSelectedRecord(isSelected ? null : r)}
                          className={`cursor-pointer transition-colors hover:bg-background/60 ${isSelected ? 'bg-primary/4' : ''}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-2xs font-700 text-primary flex-shrink-0">
                                {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <p className="font-700 text-foreground text-xs">{r.name}</p>
                                <p className="text-2xs text-muted">{r.rollNo}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-muted">{r.grade} – {r.section}</span>
                          </td>
                          <td className="px-4 py-3 text-right text-xs font-700 text-foreground">{fmtFull(r.totalFee)}</td>
                          <td className="px-4 py-3 text-right text-xs text-success font-700">{fmtFull(r.paid)}</td>
                          <td className="px-4 py-3 text-right text-xs text-error font-700">{r.due > 0 ? fmtFull(r.due) : '—'}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-700 border ${sc.bg} ${sc.text} ${sc.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredRecords.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">No records match your filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 border-t border-border/40 flex items-center justify-between">
                <p className="text-xs text-muted">{filteredRecords.length} of {FEE_RECORDS.length} students</p>
                <p className="text-xs font-700 text-foreground">
                  Showing Due: {fmtFull(filteredRecords.reduce((s, r) => s + r.due, 0))}
                </p>
              </div>
            </div>
          </div>

          {/* ── Detail panel ───────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {selectedRecord ? (
              <div className="bg-white rounded-2xl border border-border/60 shadow-soft lg:sticky lg:top-4 overflow-hidden">

                {/* Panel header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-700 text-primary">
                      {selectedRecord.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-700 text-sm text-foreground">{selectedRecord.name}</p>
                      <p className="text-2xs text-muted">{selectedRecord.rollNo} · {selectedRecord.grade} {selectedRecord.section}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedRecord(null)} className="text-muted hover:text-foreground p-1">
                    <Icon name="X" size={16} />
                  </button>
                </div>

                <div className="p-5 space-y-5">
                  {/* Payment summary */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-background rounded-xl p-3 text-center">
                      <p className="text-2xs text-muted mb-0.5">Total Fee</p>
                      <p className="font-display text-base font-800 text-foreground">{fmt(selectedRecord.totalFee)}</p>
                    </div>
                    <div className="bg-success/6 rounded-xl p-3 text-center">
                      <p className="text-2xs text-muted mb-0.5">Paid</p>
                      <p className="font-display text-base font-800 text-success">{fmt(selectedRecord.paid)}</p>
                    </div>
                    <div className={`rounded-xl p-3 text-center ${selectedRecord.due > 0 ? 'bg-error/6' : 'bg-success/6'}`}>
                      <p className="text-2xs text-muted mb-0.5">Pending</p>
                      <p className={`font-display text-base font-800 ${selectedRecord.due > 0 ? 'text-error' : 'text-success'}`}>
                        {selectedRecord.due > 0 ? fmt(selectedRecord.due) : 'Nil'}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">Payment progress</span>
                      <span className="font-700 text-foreground">{Math.round((selectedRecord.paid / selectedRecord.totalFee) * 100)}%</span>
                    </div>
                    <div className="w-full bg-border/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${Math.round((selectedRecord.paid / selectedRecord.totalFee) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Payment Status</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-700 border ${STATUS_CONFIG[selectedRecord.status].bg} ${STATUS_CONFIG[selectedRecord.status].text} ${STATUS_CONFIG[selectedRecord.status].border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[selectedRecord.status].dot}`} />
                      {selectedRecord.status}
                    </span>
                  </div>

                  {/* Info rows */}
                  {[
                    { label: 'Parent / Guardian', value: selectedRecord.parentName },
                    { label: 'Contact',           value: selectedRecord.phone       },
                    { label: 'Due Date',          value: selectedRecord.dueDate      },
                    { label: 'Last Payment',      value: selectedRecord.lastPayment !== '—' ? `${selectedRecord.lastPayment}  ·  ${fmtFull(selectedRecord.lastAmount)}` : '—' },
                  ].map(row => (
                    <div key={row.label} className="flex items-start justify-between gap-2">
                      <span className="text-xs text-muted flex-shrink-0">{row.label}</span>
                      <span className="text-xs font-700 text-foreground text-right">{row.value}</span>
                    </div>
                  ))}

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    {selectedRecord.due > 0 && (
                      <button
                        onClick={() => setShowPayModal(true)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary/90 transition-colors"
                      >
                        <Icon name="Plus" size={13} />
                        Record Payment
                      </button>
                    )}
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-background border border-border/60 text-xs font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
                      <Icon name="FileText" size={13} />
                      View Receipt
                    </button>
                    <button className="p-2 bg-background border border-border/60 rounded-xl text-muted hover:text-foreground transition-colors">
                      <Icon name="Send" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-10 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-3">
                  <Icon name="IndianRupee" size={22} className="text-primary/50" />
                </div>
                <p className="text-sm font-700 text-foreground">Select a student</p>
                <p className="text-xs text-muted mt-1">Click any row to view fee details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: DEFAULTERS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'defaulters' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-error/6 border border-error/20 rounded-2xl px-5 py-3">
            <Icon name="AlertTriangle" size={18} className="text-error flex-shrink-0" />
            <div>
              <p className="text-sm font-700 text-foreground">{defaulters.length} students have overdue or pending fees</p>
              <p className="text-xs text-muted">Total pending amount: {fmtFull(defaulters.reduce((s, r) => s + r.due, 0))}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-background">
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Grade</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Parent</th>
                    <th className="text-right px-4 py-3 text-xs font-700 text-muted">Due Amount</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Due Date</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {defaulters.map(r => {
                    const sc = STATUS_CONFIG[r.status];
                    return (
                      <tr key={r.id} className="hover:bg-background/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-error/10 flex items-center justify-center text-2xs font-700 text-error flex-shrink-0">
                              {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-700 text-foreground text-xs">{r.name}</p>
                              <p className="text-2xs text-muted">{r.rollNo}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted">{r.grade} – {r.section}</td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-foreground">{r.parentName}</p>
                          <p className="text-2xs text-muted">{r.phone}</p>
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-800 text-error">{fmtFull(r.due)}</td>
                        <td className="px-4 py-3 text-center text-xs text-muted">{r.dueDate}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-700 border ${sc.bg} ${sc.text} ${sc.border}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button className="px-2 py-1 bg-primary/10 text-primary text-2xs font-700 rounded-lg hover:bg-primary/20 transition-colors">
                              Remind
                            </button>
                            <button
                              onClick={() => { setSelectedRecord(r); setActiveTab('collections'); }}
                              className="px-2 py-1 bg-background border border-border/60 text-foreground text-2xs font-700 rounded-lg hover:bg-border/20 transition-colors"
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-border/40">
              <p className="text-xs text-muted">{defaulters.length} defaulter{defaulters.length !== 1 ? 's' : ''} · sorted by highest due amount</p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: TRANSACTIONS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'transactions' && (
        <div className="space-y-4">

          {/* Search */}
          <div className="bg-white rounded-2xl border border-border/60 p-3 shadow-soft">
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search by student, roll no or receipt…"
                value={txnSearch}
                onChange={e => setTxnSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Transaction table */}
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-background">
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Receipt</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Student</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Category</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Mode</th>
                    <th className="text-right px-4 py-3 text-xs font-700 text-muted">Amount</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-700 text-muted">Received By</th>
                    <th className="text-center px-4 py-3 text-xs font-700 text-muted">Print</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {filteredTxns.map(t => {
                    const mc = MODE_CONFIG[t.mode];
                    return (
                      <tr key={t.id} className="hover:bg-background/60 transition-colors">
                        <td className="px-4 py-3">
                          <p className="text-xs font-700 text-primary">{t.receiptNo}</p>
                          <p className="text-2xs text-muted">{t.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs font-700 text-foreground">{t.studentName}</p>
                          <p className="text-2xs text-muted">{t.rollNo} · {t.grade}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted">{t.category}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-2xs font-700 ${mc.bg} ${mc.text}`}>
                            {t.mode}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-xs font-800 text-foreground">{fmtFull(t.amount)}</td>
                        <td className="px-4 py-3 text-xs text-muted">{t.date}</td>
                        <td className="px-4 py-3 text-xs text-muted">{t.receivedBy}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="p-1.5 rounded-lg bg-background border border-border/60 text-muted hover:text-foreground transition-colors">
                            <Icon name="Printer" size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTxns.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted">No transactions match your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 border-t border-border/40 flex items-center justify-between">
              <p className="text-xs text-muted">{filteredTxns.length} transaction{filteredTxns.length !== 1 ? 's' : ''}</p>
              <p className="text-xs font-700 text-foreground">
                Total: {fmtFull(filteredTxns.reduce((s, t) => s + t.amount, 0))}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          RECORD PAYMENT MODAL
      ════════════════════════════════════════════════════════════════════ */}
      {showPayModal && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-md">
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
              <div>
                <h3 className="font-display text-base font-800 text-foreground">Record Payment</h3>
                {selectedRecord && (
                  <p className="text-xs text-muted mt-0.5">{selectedRecord.name} · {selectedRecord.rollNo}</p>
                )}
              </div>
              <button onClick={() => { setShowPayModal(false); setPayAmount(''); }} className="text-muted hover:text-foreground p-1">
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {/* Student selector if none selected */}
              {!selectedRecord && (
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Student Roll No.</label>
                  <input
                    type="text"
                    placeholder="e.g. SR-1003"
                    className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">Amount (₹)</label>
                <input
                  type="number"
                  placeholder={selectedRecord ? String(selectedRecord.due) : '0'}
                  value={payAmount}
                  onChange={e => setPayAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
                />
                {selectedRecord && selectedRecord.due > 0 && (
                  <p className="text-2xs text-muted mt-1">Pending: {fmtFull(selectedRecord.due)}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">Payment Mode</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Cash', 'Online', 'Cheque', 'DD'] as const).map(m => {
                    const mc = MODE_CONFIG[m];
                    return (
                      <button
                        key={m}
                        onClick={() => setPayMode(m)}
                        className={`py-2 rounded-xl text-xs font-700 border transition-all ${
                          payMode === m
                            ? `${mc.bg} ${mc.text} border-current`
                            : 'bg-background text-muted border-border/60 hover:text-foreground'
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">Fee Category</label>
                <select className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50">
                  {(['Tuition', 'Transport', 'Exam', 'Sports', 'Library', 'Hostel'] as FeeCategory[]).map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">Remarks (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Term 2 instalment"
                  className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => { setShowPayModal(false); setPayAmount(''); }}
                  className="flex-1 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-2 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors">
                  Save & Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
