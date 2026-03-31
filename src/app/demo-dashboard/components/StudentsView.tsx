'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const allStudents = [
  { name: 'Priya Sharma', class: 'Grade 8A', roll: 'SR-0142', phone: '+91 98765 43210', attendance: '96%', fee: 'Paid', joined: 'Jun 2022' },
  { name: 'Rahul Verma', class: 'Grade 6B', roll: 'SR-0387', phone: '+91 87654 32109', attendance: '78%', fee: 'Pending', joined: 'Jun 2023' },
  { name: 'Ananya Singh', class: 'Grade 10A', roll: 'SR-0234', phone: '+91 76543 21098', attendance: '99%', fee: 'Paid', joined: 'Jun 2021' },
  { name: 'Karan Malhotra', class: 'Grade 7C', roll: 'SR-0521', phone: '+91 65432 10987', attendance: '65%', fee: 'Overdue', joined: 'Jun 2023' },
  { name: 'Pooja Reddy', class: 'Grade 9A', roll: 'SR-0098', phone: '+91 54321 09876', attendance: '91%', fee: 'Paid', joined: 'Jun 2022' },
  { name: 'Amit Tiwari', class: 'Grade 5B', roll: 'SR-0612', phone: '+91 43210 98765', attendance: '88%', fee: 'Partial', joined: 'Jun 2024' },
  { name: 'Divya Nair', class: 'Grade 11A', roll: 'SR-0711', phone: '+91 32109 87654', attendance: '94%', fee: 'Paid', joined: 'Jun 2021' },
  { name: 'Rohit Kumar', class: 'Grade 3A', roll: 'SR-0823', phone: '+91 21098 76543', attendance: '82%', fee: 'Paid', joined: 'Jun 2025' },
];

export default function StudentsView() {
  const [search, setSearch] = useState('');

  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase()) ||
    s.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Students</h1>
          <p className="text-sm text-muted mt-0.5">1,248 total students enrolled</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-600 text-muted border border-border/60 rounded-xl hover:border-primary/30 hover:text-primary transition-colors">
            <Icon name="ArrowDownTrayIcon" size={14} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-700 text-white bg-primary rounded-xl hover:bg-primary-dark transition-colors shadow-blue">
            <Icon name="PlusIcon" size={14} />
            Add Student
          </button>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-md">
          <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, class, or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-border/60 rounded-xl text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          {['All', 'Present', 'Absent', 'Fee Pending'].map((f) => (
            <button key={f} className={`px-3 py-2 text-xs font-600 rounded-xl border transition-colors ${
              f === 'All' ? 'bg-primary text-white border-primary' : 'text-muted border-border/60 hover:border-primary/30 hover:text-primary bg-white'
            }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Students', value: '1,248', color: 'text-primary', bg: 'bg-primary/8' },
          { label: 'Present Today', value: '1,175', color: 'text-success', bg: 'bg-success/8' },
          { label: 'Absent Today', value: '73', color: 'text-danger', bg: 'bg-danger/8' },
          { label: 'Fee Pending', value: '48', color: 'text-warning', bg: 'bg-warning/8' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl px-4 py-3 border border-border/30`}>
            <div className={`text-lg font-800 font-display ${s.color}`}>{s.value}</div>
            <div className="text-2xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-background">
                <th className="text-left px-5 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Student</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider hidden sm:table-cell">Roll No.</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Class</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider hidden md:table-cell">Phone</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Attendance</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Fee</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 text-2xs font-700 text-muted-light uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-sm text-muted">
                    No students found matching your search.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.roll} className="hover:bg-background/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-700 text-primary flex-shrink-0">
                          {s.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <span className="text-sm font-600 text-foreground whitespace-nowrap">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-muted hidden sm:table-cell">{s.roll}</td>
                    <td className="px-4 py-3.5 text-sm text-muted whitespace-nowrap">{s.class}</td>
                    <td className="px-4 py-3.5 text-sm text-muted hidden md:table-cell">{s.phone}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              parseInt(s.attendance) >= 90 ? 'bg-success' :
                              parseInt(s.attendance) >= 75 ? 'bg-warning' : 'bg-danger'
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
                    <td className="px-4 py-3.5 text-sm text-muted hidden lg:table-cell">{s.joined}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-muted hover:text-primary hover:bg-primary/8 rounded-lg transition-colors" aria-label="View student">
                          <Icon name="EyeIcon" size={14} />
                        </button>
                        <button className="p-1.5 text-muted hover:text-primary hover:bg-primary/8 rounded-lg transition-colors" aria-label="Edit student">
                          <Icon name="PencilSquareIcon" size={14} />
                        </button>
                        <button className="p-1.5 text-muted hover:text-danger hover:bg-danger/8 rounded-lg transition-colors" aria-label="Delete student">
                          <Icon name="TrashIcon" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3.5 border-t border-border/50">
          <span className="text-2xs text-muted">
            Showing {filtered.length} of 1,248 students
          </span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg text-muted hover:bg-border-light hover:text-primary transition-colors opacity-40" disabled aria-label="Previous page">
              <Icon name="ChevronLeftIcon" size={14} />
            </button>
            {[1, 2, 3, '...', 52].map((p, i) => (
              <button
                key={i}
                className={`w-7 h-7 rounded-lg text-xs font-600 transition-colors ${
                  p === 1 ? 'bg-primary text-white' : 'text-muted hover:bg-border-light hover:text-primary'
                }`}
              >
                {p}
              </button>
            ))}
            <button className="p-1.5 rounded-lg text-muted hover:bg-border-light hover:text-primary transition-colors" aria-label="Next page">
              <Icon name="ChevronRightIcon" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}