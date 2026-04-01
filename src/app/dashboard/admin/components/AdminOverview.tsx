'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
  { label: 'Total Students', value: '1,248', change: '+24 this month', icon: 'AcademicCapIcon', color: '#1C4ED8', bg: 'bg-primary/8' },
  { label: 'Total Teachers', value: '64', change: '+2 this month', icon: 'UserGroupIcon', color: '#0EA5E9', bg: 'bg-accent/8' },
  { label: "Today's Attendance", value: '94.2%', change: '1,175 present', icon: 'CalendarDaysIcon', color: '#10B981', bg: 'bg-success/8' },
  { label: 'Pending Fees', value: '₹2.4L', change: '48 students due', icon: 'BanknotesIcon', color: '#F59E0B', bg: 'bg-warning/8' },
];

const attendanceData = [
  { month: 'Oct', present: 88, absent: 12 }, { month: 'Nov', present: 91, absent: 9 },
  { month: 'Dec', present: 85, absent: 15 }, { month: 'Jan', present: 93, absent: 7 },
  { month: 'Feb', present: 89, absent: 11 }, { month: 'Mar', present: 94, absent: 6 },
];

const feeData = [
  { month: 'Oct', collected: 8.2 }, { month: 'Nov', collected: 9.5 },
  { month: 'Dec', collected: 7.8 }, { month: 'Jan', collected: 11.2 },
  { month: 'Feb', collected: 10.4 }, { month: 'Mar', collected: 12.6 },
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

const teacherList = [
  { name: 'Mrs. Meera Iyer', subject: 'Mathematics', classes: 4, experience: '12 yrs', status: 'Active' },
  { name: 'Mr. Anil Kapoor', subject: 'English', classes: 3, experience: '8 yrs', status: 'Active' },
  { name: 'Mrs. Priya Nair', subject: 'Science', classes: 5, experience: '15 yrs', status: 'Active' },
  { name: 'Mr. Ramesh Kumar', subject: 'Social Studies', classes: 4, experience: '10 yrs', status: 'On Leave' },
];

const notices = [
  { title: 'Annual Sports Day — April 10, 2026', tag: 'Event', color: 'text-primary bg-primary/8' },
  { title: 'Term 3 Exam Schedule Released', tag: 'Exam', color: 'text-warning bg-warning/8' },
  { title: 'Parent-Teacher Meeting — April 5', tag: 'Meeting', color: 'text-accent bg-accent/8' },
  { title: 'School closed on April 14 (Holiday)', tag: 'Holiday', color: 'text-success bg-success/8' },
];

export default function AdminOverview() {
  const [noticeInput, setNoticeInput] = useState('');
  const [noticeTag, setNoticeTag] = useState('Event');
  const [publishedNotices, setPublishedNotices] = useState(notices);

  const publishNotice = () => {
    if (!noticeInput.trim()) return;
    setPublishedNotices((prev) => [
      { title: noticeInput, tag: noticeTag, color: 'text-primary bg-primary/8' },
      ...prev,
    ]);
    setNoticeInput('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted mt-0.5">Greenwood Academy · New Delhi · Tue, 31 Mar 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-600 rounded-xl hover:bg-primary/90 transition-colors">
            <Icon name="PlusIcon" size={14} />
            Add Student
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-border text-xs font-600 text-foreground rounded-xl hover:bg-background transition-colors">
            <Icon name="ArrowDownTrayIcon" size={14} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'AcademicCapIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.change}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Attendance Trend</h3>
            <span className="text-2xs text-muted">Oct 2025 – Mar 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={attendanceData}>
              <defs>
                <linearGradient id="attG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1C4ED8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1C4ED8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="present" stroke="#1C4ED8" strokeWidth={2} fill="url(#attG)" name="Present %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Fee Collection (₹L)</h3>
            <span className="text-2xs text-muted">Oct 2025 – Mar 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={feeData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`₹${v}L`, 'Collected']} />
              <Bar dataKey="collected" fill="#10B981" radius={[6, 6, 0, 0]} name="Collected (₹L)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent admissions */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Recent Admissions</h3>
            <button className="text-xs text-primary font-600 hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {recentAdmissions.map((a) => (
              <div key={a.roll} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center font-700 text-primary text-xs">
                    {a.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-xs font-700 text-foreground">{a.name}</div>
                    <div className="text-2xs text-muted">{a.class} · {a.roll}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xs font-600 px-2 py-0.5 rounded-full ${a.status === 'New' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'}`}>{a.status}</div>
                  <div className="text-2xs text-muted-light mt-0.5">{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Recent Fee Payments</h3>
            <button className="text-xs text-primary font-600 hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {recentPayments.map((p) => (
              <div key={p.name} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                <div>
                  <div className="text-xs font-700 text-foreground">{p.name}</div>
                  <div className="text-2xs text-muted">{p.type} · {p.time}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-700 text-foreground">{p.amount}</div>
                  <div className={`text-2xs font-600 ${p.status === 'Paid' ? 'text-success' : 'text-warning'}`}>{p.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teachers overview */}
      <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-700 text-sm text-foreground">Teacher Directory</h3>
          <button className="inline-flex items-center gap-1.5 text-xs font-600 text-primary hover:underline">View All 64</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50">
                {['Name', 'Subject', 'Classes', 'Experience', 'Status'].map((h) => (
                  <th key={h} className="text-left text-muted font-600 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {teacherList.map((t) => (
                <tr key={t.name} className="hover:bg-background transition-colors">
                  <td className="py-3 pr-4 font-700 text-foreground">{t.name}</td>
                  <td className="py-3 pr-4 text-muted">{t.subject}</td>
                  <td className="py-3 pr-4 text-muted">{t.classes}</td>
                  <td className="py-3 pr-4 text-muted">{t.experience}</td>
                  <td className="py-3">
                    <span className={`text-2xs font-600 px-2 py-0.5 rounded-full ${t.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Publish notice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft lg:col-span-1">
          <h3 className="font-display font-700 text-sm text-foreground mb-4">Publish Notice</h3>
          <div className="space-y-3">
            <select
              value={noticeTag}
              onChange={(e) => setNoticeTag(e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border/60 rounded-xl text-xs text-foreground focus:outline-none focus:border-primary/40"
            >
              {['Event', 'Exam', 'Meeting', 'Holiday', 'General'].map((t) => <option key={t}>{t}</option>)}
            </select>
            <textarea
              value={noticeInput}
              onChange={(e) => setNoticeInput(e.target.value)}
              rows={3}
              placeholder="Write notice here..."
              className="w-full px-3 py-2 bg-background border border-border/60 rounded-xl text-xs text-foreground placeholder:text-muted resize-none focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
            <button
              onClick={publishNotice}
              className="w-full py-2 bg-primary text-white text-xs font-600 rounded-xl hover:bg-primary/90 transition-colors"
            >
              Publish Notice
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft lg:col-span-2">
          <h3 className="font-display font-700 text-sm text-foreground mb-4">Notice Board</h3>
          <div className="space-y-2.5 max-h-64 overflow-y-auto">
            {publishedNotices.map((n, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className={`shrink-0 text-2xs font-700 px-2 py-0.5 rounded-full mt-0.5 ${n.color}`}>{n.tag}</span>
                <p className="text-xs text-foreground leading-snug">{n.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
