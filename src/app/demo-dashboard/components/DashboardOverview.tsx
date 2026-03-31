'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  {
    label: 'Total Students',
    value: '1,248',
    change: '+24 this month',
    changeType: 'positive',
    icon: 'AcademicCapIcon',
    color: '#1C4ED8',
    bg: 'bg-primary/8',
  },
  {
    label: 'Total Teachers',
    value: '64',
    change: '+2 this month',
    changeType: 'positive',
    icon: 'UserGroupIcon',
    color: '#0EA5E9',
    bg: 'bg-accent/8',
  },
  {
    label: "Today\'s Attendance",
    value: '94.2%',
    change: '1,175 present',
    changeType: 'positive',
    icon: 'CalendarDaysIcon',
    color: '#10B981',
    bg: 'bg-success/8',
  },
  {
    label: 'Pending Fees',
    value: '₹2.4L',
    change: '48 students due',
    changeType: 'warning',
    icon: 'BanknotesIcon',
    color: '#F59E0B',
    bg: 'bg-warning/8',
  },
];

const attendanceData = [
  { month: 'Oct', present: 88, absent: 12 },
  { month: 'Nov', present: 91, absent: 9 },
  { month: 'Dec', present: 85, absent: 15 },
  { month: 'Jan', present: 93, absent: 7 },
  { month: 'Feb', present: 89, absent: 11 },
  { month: 'Mar', present: 94, absent: 6 },
];

const feeData = [
  { month: 'Oct', collected: 8.2, pending: 1.8 },
  { month: 'Nov', collected: 9.5, pending: 1.2 },
  { month: 'Dec', collected: 7.8, pending: 2.4 },
  { month: 'Jan', collected: 11.2, pending: 1.6 },
  { month: 'Feb', collected: 10.4, pending: 1.9 },
  { month: 'Mar', collected: 12.6, pending: 2.4 },
];

const recentAdmissions = [
  { name: 'Kavya Patel', class: 'Grade 6A', date: '31 Mar 2026', roll: 'SR-1249', status: 'New' },
  { name: 'Arjun Mehra', class: 'Grade 9B', date: '30 Mar 2026', roll: 'SR-1248', status: 'New' },
  { name: 'Sneha Joshi', class: 'Grade 4C', date: '28 Mar 2026', roll: 'SR-1247', status: 'New' },
  { name: 'Dev Rathore', class: 'Grade 11A', date: '27 Mar 2026', roll: 'SR-1246', status: 'Transferred' },
];

const recentPayments = [
  { name: 'Priya Sharma', amount: '₹12,000', type: 'Annual Fee', time: '2 hrs ago', status: 'Paid' },
  { name: 'Rohan Gupta', amount: '₹6,500', type: 'Term 2 Fee', time: '4 hrs ago', status: 'Paid' },
  { name: 'Anjali Singh', amount: '₹3,200', type: 'Exam Fee', time: '6 hrs ago', status: 'Paid' },
  { name: 'Vikram Yadav', amount: '₹8,000', type: 'Annual Fee', time: 'Yesterday', status: 'Partial' },
];

const studentList = [
  { name: 'Priya Sharma', class: 'Grade 8A', roll: 'SR-0142', attendance: '96%', fee: 'Paid', attendanceColor: 'success' },
  { name: 'Rahul Verma', class: 'Grade 6B', roll: 'SR-0387', attendance: '78%', fee: 'Pending', attendanceColor: 'warning' },
  { name: 'Ananya Singh', class: 'Grade 10A', roll: 'SR-0234', attendance: '99%', fee: 'Paid', attendanceColor: 'success' },
  { name: 'Karan Malhotra', class: 'Grade 7C', roll: 'SR-0521', attendance: '65%', fee: 'Overdue', attendanceColor: 'danger' },
  { name: 'Pooja Reddy', class: 'Grade 9A', roll: 'SR-0098', attendance: '91%', fee: 'Paid', attendanceColor: 'success' },
  { name: 'Amit Tiwari', class: 'Grade 5B', roll: 'SR-0612', attendance: '88%', fee: 'Partial', attendanceColor: 'info' },
];

const notices = [
  { title: 'Annual Sports Day — April 10, 2026', tag: 'Event', color: 'text-primary bg-primary/8' },
  { title: 'Term 3 Exam Schedule Released', tag: 'Exam', color: 'text-warning bg-warning/8' },
  { title: 'Parent-Teacher Meeting — April 5', tag: 'Meeting', color: 'text-accent bg-accent/8' },
  { title: 'School closed on April 14 (Holiday)', tag: 'Holiday', color: 'text-success bg-success/8' },
];

export default function DashboardOverview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted mt-0.5">Tuesday, 31 March 2026 — Sunrise Public School</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary-dark transition-colors shadow-blue">
          <Icon name="ArrowDownTrayIcon" size={14} />
          Export Report
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-border/60 p-4 sm:p-5 shadow-soft card-lift">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <Icon name={stat.icon as 'AcademicCapIcon'} size={20} style={{ color: stat.color }} />
              </div>
              <Icon name="EllipsisHorizontalIcon" size={16} className="text-muted-light" />
            </div>
            <div className="text-xl sm:text-2xl font-800 font-display text-foreground mb-1">{stat.value}</div>
            <div className="text-xs text-muted mb-1.5">{stat.label}</div>
            <div className={`flex items-center gap-1 text-2xs font-600 ${
              stat.changeType === 'positive' ? 'text-success' : 'text-warning'
            }`}>
              <Icon
                name={stat.changeType === 'positive' ? 'ArrowTrendingUpIcon' : 'ExclamationCircleIcon'}
                size={11}
              />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Attendance chart */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-sm font-700 text-foreground">Attendance Overview</h3>
              <p className="text-2xs text-muted mt-0.5">Last 6 months (%)</p>
            </div>
            <div className="flex gap-3 text-2xs font-600">
              <span className="flex items-center gap-1 text-primary"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Present</span>
              <span className="flex items-center gap-1 text-danger"><span className="w-2 h-2 rounded-full bg-danger inline-block" />Absent</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={attendanceData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1C4ED8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1C4ED8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="absentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '12px' }}
                cursor={{ stroke: '#E2E8F0' }}
              />
              <Area type="monotone" dataKey="present" stroke="#1C4ED8" strokeWidth={2} fill="url(#presentGrad)" dot={{ fill: '#1C4ED8', r: 3 }} />
              <Area type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2} fill="url(#absentGrad)" dot={{ fill: '#EF4444', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fee collection chart */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-display text-sm font-700 text-foreground">Fee Collection</h3>
              <p className="text-2xs text-muted mt-0.5">Last 6 months (₹ Lakhs)</p>
            </div>
            <div className="flex gap-3 text-2xs font-600">
              <span className="flex items-center gap-1 text-primary"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Collected</span>
              <span className="flex items-center gap-1 text-warning"><span className="w-2 h-2 rounded-full bg-warning inline-block" />Pending</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={feeData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barCategoryGap="35%">
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '12px' }}
                cursor={{ fill: 'rgba(28,78,216,0.04)' }}
              />
              <Bar dataKey="collected" fill="#1C4ED8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#FDE68A" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity + Student table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5">
        {/* Recent admissions */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-700 text-foreground">Recent Admissions</h3>
            <button className="text-2xs text-primary font-600 hover:underline">View all</button>
          </div>
          <div className="flex flex-col gap-3">
            {recentAdmissions.map((a) => (
              <div key={a.roll} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-700 text-primary flex-shrink-0">
                  {a.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-600 text-foreground truncate">{a.name}</div>
                  <div className="text-2xs text-muted">{a.class} · {a.roll}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={a.status === 'New' ? 'badge-success' : 'badge-info'}>{a.status}</span>
                  <div className="text-2xs text-muted-light mt-0.5">{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-700 text-foreground">Recent Payments</h3>
            <button className="text-2xs text-primary font-600 hover:underline">View all</button>
          </div>
          <div className="flex flex-col gap-3">
            {recentPayments.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="BanknotesIcon" size={14} className="text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-600 text-foreground truncate">{p.name}</div>
                  <div className="text-2xs text-muted">{p.type} · {p.time}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-700 text-foreground">{p.amount}</div>
                  <span className={p.status === 'Paid' ? 'badge-success' : p.status === 'Partial' ? 'badge-warning' : 'badge-danger'}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notice panel */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-700 text-foreground">Latest Notices</h3>
            <button className="text-2xs text-primary font-600 hover:underline">Post notice</button>
          </div>
          <div className="flex flex-col gap-3">
            {notices.map((n) => (
              <div key={n.title} className="flex items-start gap-3 p-3 bg-background rounded-xl border border-border/40 hover:border-primary/20 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-600 text-foreground leading-relaxed">{n.title}</div>
                </div>
                <span className={`text-2xs font-700 px-2 py-0.5 rounded-full flex-shrink-0 ${n.color}`}>
                  {n.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student list table */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <div>
            <h3 className="font-display text-sm font-700 text-foreground">Student List</h3>
            <p className="text-2xs text-muted mt-0.5">Showing 6 of 1,248 students</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-600 text-muted border border-border/60 rounded-xl hover:border-primary/30 hover:text-primary transition-colors">
              <Icon name="FunnelIcon" size={12} />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-600 text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors">
              <Icon name="PlusIcon" size={12} />
              Add Student
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-background">
                <th className="text-left px-5 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Student</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Class</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider hidden sm:table-cell">Roll No.</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Attendance</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Fee Status</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider hidden md:table-cell">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {studentList.map((s) => (
                <tr key={s.roll} className="hover:bg-background/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-700 text-primary flex-shrink-0">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-600 text-foreground">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted">{s.class}</td>
                  <td className="px-4 py-3.5 text-sm text-muted hidden sm:table-cell">{s.roll}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            s.attendanceColor === 'success' ? 'bg-success' :
                            s.attendanceColor === 'warning' ? 'bg-warning' :
                            s.attendanceColor === 'danger' ? 'bg-danger' : 'bg-accent'
                          }`}
                          style={{ width: s.attendance }}
                        />
                      </div>
                      <span className="text-xs font-600 text-foreground">{s.attendance}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={
                      s.fee === 'Paid' ? 'badge-success' :
                      s.fee === 'Pending' ? 'badge-warning' :
                      s.fee === 'Overdue' ? 'badge-danger' : 'badge-info'
                    }>
                      {s.fee}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 text-muted hover:text-primary hover:bg-primary/8 rounded-lg transition-colors">
                        <Icon name="EyeIcon" size={14} />
                      </button>
                      <button className="p-1.5 text-muted hover:text-primary hover:bg-primary/8 rounded-lg transition-colors">
                        <Icon name="PencilSquareIcon" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/50">
          <span className="text-2xs text-muted">Showing 1–6 of 1,248 students</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-muted hover:bg-border-light hover:text-primary transition-colors disabled:opacity-40" disabled>
              <Icon name="ChevronLeftIcon" size={14} />
            </button>
            {[1,2,3].map(p => (
              <button key={p} className={`w-7 h-7 rounded-lg text-xs font-600 transition-colors ${p === 1 ? 'bg-primary text-white' : 'text-muted hover:bg-border-light hover:text-primary'}`}>
                {p}
              </button>
            ))}
            <button className="p-1.5 rounded-lg text-muted hover:bg-border-light hover:text-primary transition-colors">
              <Icon name="ChevronRightIcon" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}