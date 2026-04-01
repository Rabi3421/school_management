'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const classData = [
  { name: 'Grade 10A', students: 38, avgAttend: 92, avgGrade: 81 },
  { name: 'Grade 10B', students: 36, avgAttend: 88, avgGrade: 76 },
  { name: 'Grade 9A', students: 40, avgAttend: 95, avgGrade: 84 },
  { name: 'Grade 9B', students: 37, avgAttend: 90, avgGrade: 79 },
];

const gradeBarData = [
  { class: '10A', avg: 81 }, { class: '10B', avg: 76 },
  { class: '9A', avg: 84 }, { class: '9B', avg: 79 },
];

const recentSubmissions = [
  { student: 'Ananya Singh', class: 'Grade 10A', task: 'Chapter 12 Probability', submitted: '31 Mar 2026', marks: null },
  { student: 'Rohit Gupta', class: 'Grade 9A', task: 'Statistics Exercise', submitted: '30 Mar 2026', marks: 18 },
  { student: 'Priya Sharma', class: 'Grade 10B', task: 'Algebra Worksheet', submitted: '30 Mar 2026', marks: 22 },
  { student: 'Karan Mehta', class: 'Grade 9B', task: 'Trigonometry Test', submitted: '29 Mar 2026', marks: 15 },
  { student: 'Sita Rao', class: 'Grade 10A', task: 'Chapter 12 Probability', submitted: '31 Mar 2026', marks: null },
];

const timetableToday = [
  { time: '8:00–8:45', class: 'Grade 10A', subject: 'Mathematics', room: 'C-204' },
  { time: '9:30–10:15', class: 'Grade 9A', subject: 'Mathematics', room: 'C-301' },
  { time: '11:15–12:00', class: 'Grade 10B', subject: 'Mathematics', room: 'C-204' },
  { time: '1:45–2:30', class: 'Grade 9B', subject: 'Mathematics', room: 'C-302' },
];

const ATTENDANCE = [
  { name: 'Ananya Singh', roll: 'SR-0234', status: 'present' as const },
  { name: 'Rahul Verma', roll: 'SR-0387', status: 'present' as const },
  { name: 'Priya Sharma', roll: 'SR-0142', status: 'absent' as const },
  { name: 'Karan Malhotra', roll: 'SR-0521', status: 'present' as const },
  { name: 'Pooja Reddy', roll: 'SR-0098', status: 'present' as const },
];

type AttStatus = 'present' | 'absent' | 'late';

export default function TeacherOverview() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<Record<string, AttStatus>>(
    Object.fromEntries(ATTENDANCE.map((s) => [s.roll, s.status]))
  );
  const [attSaved, setAttSaved] = useState(false);

  const toggleAtt = (roll: string) => {
    setAttendance((prev) => {
      const cycle: AttStatus[] = ['present', 'absent', 'late'];
      const next = cycle[(cycle.indexOf(prev[roll]) + 1) % cycle.length];
      return { ...prev, [roll]: next };
    });
    setAttSaved(false);
  };

  const presentCount = Object.values(attendance).filter((v) => v === 'present').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Teacher Dashboard</h1>
          <p className="text-sm text-muted mt-0.5">{user?.subject} · {user?.department} · Tue, 31 Mar 2026</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success text-xs font-600 rounded-lg self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          School in session
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'My Classes', value: '4', sub: '151 total students', icon: 'AcademicCapIcon', color: '#1C4ED8', bg: 'bg-primary/8' },
          { label: 'Today\'s Classes', value: '4', sub: 'Next: 9:30 AM', icon: 'CalendarDaysIcon', color: '#0EA5E9', bg: 'bg-accent/8' },
          { label: 'Pending Reviews', value: '8', sub: '5 not yet graded', icon: 'DocumentTextIcon', color: '#F59E0B', bg: 'bg-warning/8' },
          { label: 'Avg Class Score', value: '80%', sub: 'Term 2 overall', icon: 'ChartBarIcon', color: '#10B981', bg: 'bg-success/8' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
              <Icon name={s.icon as 'AcademicCapIcon'} size={18} style={{ color: s.color }} />
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class avg chart */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <h3 className="font-display font-700 text-sm text-foreground mb-4">Class Average Scores</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={gradeBarData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="class" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="avg" fill="#1C4ED8" radius={[6, 6, 0, 0]} name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick attendance */}
        <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-700 text-sm text-foreground">Quick Attendance — Grade 10A</h3>
            <span className="text-2xs text-muted">{presentCount}/{ATTENDANCE.length} present</span>
          </div>
          <div className="space-y-2 mb-4">
            {ATTENDANCE.map((s) => {
              const st = attendance[s.roll];
              return (
                <div key={s.roll} className="flex items-center justify-between p-2.5 rounded-xl bg-background border border-border/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center text-2xs font-700 text-primary">{s.name.split(' ').map((n) => n[0]).join('')}</div>
                    <div>
                      <div className="text-xs font-600 text-foreground">{s.name}</div>
                      <div className="text-2xs text-muted">{s.roll}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleAtt(s.roll)}
                    className={`text-2xs font-700 px-2.5 py-1 rounded-full transition-colors ${
                      st === 'present' ? 'bg-success/15 text-success' : st === 'absent' ? 'bg-danger/15 text-danger' : 'bg-warning/15 text-warning'
                    }`}
                  >
                    {st.charAt(0).toUpperCase() + st.slice(1)}
                  </button>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setAttSaved(true)}
            className={`w-full py-2 text-xs font-600 rounded-xl transition-colors ${attSaved ? 'bg-success/10 text-success' : 'bg-primary text-white hover:bg-primary/90'}`}
          >
            {attSaved ? '✓ Attendance Saved' : 'Save Attendance'}
          </button>
        </div>
      </div>

      {/* Today's timetable */}
      <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
        <h3 className="font-display font-700 text-sm text-foreground mb-4">Today&apos;s Schedule</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {timetableToday.map((p, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-background border border-border/50 hover:border-primary/20 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xs font-600 text-primary bg-primary/8 px-2 py-0.5 rounded-full">{p.time}</span>
              </div>
              <div className="font-700 text-sm text-foreground">{p.class}</div>
              <div className="text-2xs text-muted mt-0.5">{p.subject} · {p.room}</div>
            </div>
          ))}
        </div>
      </div>

      {/* My classes */}
      <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
        <h3 className="font-display font-700 text-sm text-foreground mb-4">My Classes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/50">
                {['Class', 'Students', 'Avg Attendance', 'Avg Grade', 'Action'].map((h) => (
                  <th key={h} className="text-left text-muted font-600 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {classData.map((c) => (
                <tr key={c.name} className="hover:bg-background transition-colors">
                  <td className="py-3 pr-4 font-700 text-foreground">{c.name}</td>
                  <td className="py-3 pr-4 text-muted">{c.students}</td>
                  <td className="py-3 pr-4">
                    <span className={`font-600 ${c.avgAttend >= 90 ? 'text-success' : 'text-warning'}`}>{c.avgAttend}%</span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`font-600 ${c.avgGrade >= 80 ? 'text-success' : 'text-muted'}`}>{c.avgGrade}%</span>
                  </td>
                  <td className="py-3">
                    <button className="text-primary font-600 hover:underline">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent submissions */}
      <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-700 text-sm text-foreground">Recent Submissions</h3>
          <span className="text-2xs bg-warning/10 text-warning font-700 px-2 py-0.5 rounded-full">2 ungraded</span>
        </div>
        <div className="space-y-2">
          {recentSubmissions.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
              <div>
                <div className="text-xs font-700 text-foreground">{r.student}</div>
                <div className="text-2xs text-muted">{r.class} · {r.task}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xs text-muted-light">{r.submitted}</span>
                {r.marks !== null ? (
                  <span className="text-2xs font-700 bg-success/10 text-success px-2 py-0.5 rounded-full">{r.marks}/25</span>
                ) : (
                  <button className="text-2xs font-600 bg-primary text-white px-2.5 py-1 rounded-lg hover:bg-primary/90 transition-colors">Grade</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
