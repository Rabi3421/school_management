'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const shortDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type Period = {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type?: 'break' | 'lunch' | 'regular';
};

type Timetable = {
  [day: string]: Period[];
};

const subjectColors: Record<string, { bg: string; text: string; dot: string }> = {
  Mathematics:        { bg: 'bg-primary/8',  text: 'text-primary',  dot: '#1C4ED8' },
  English:            { bg: 'bg-accent/8',   text: 'text-accent',   dot: '#0EA5E9' },
  Science:            { bg: 'bg-success/8',  text: 'text-success',  dot: '#10B981' },
  'Social Studies':   { bg: 'bg-purple-50',  text: 'text-purple-600', dot: '#8B5CF6' },
  Hindi:              { bg: 'bg-warning/8',  text: 'text-warning',  dot: '#F59E0B' },
  'Physical Education': { bg: 'bg-danger/8', text: 'text-danger',   dot: '#EF4444' },
  'Computer Science': { bg: 'bg-teal-50',    text: 'text-teal-600', dot: '#0D9488' },
  Art:                { bg: 'bg-pink-50',    text: 'text-pink-600', dot: '#EC4899' },
  Break:              { bg: 'bg-border-light', text: 'text-muted',  dot: '#94A3B8' },
  Lunch:              { bg: 'bg-border-light', text: 'text-muted',  dot: '#94A3B8' },
};

function getColor(subject: string) {
  return subjectColors[subject] ?? { bg: 'bg-primary/8', text: 'text-primary', dot: '#1C4ED8' };
}

const timetable: Timetable = {
  Monday: [
    { time: '8:00 – 8:45',   subject: 'Mathematics',        teacher: 'Mrs. Meera Iyer',    room: 'C-204' },
    { time: '8:45 – 9:30',   subject: 'English',            teacher: 'Mr. Anil Kapoor',    room: 'C-101' },
    { time: '9:30 – 10:15',  subject: 'Science',            teacher: 'Mrs. Priya Nair',    room: 'Lab-1' },
    { time: '10:15 – 10:30', subject: 'Break',              teacher: '',                   room: '',      type: 'break' },
    { time: '10:30 – 11:15', subject: 'Social Studies',     teacher: 'Mr. Ramesh Kumar',   room: 'C-205' },
    { time: '11:15 – 12:00', subject: 'Hindi',              teacher: 'Mrs. Sunita Devi',   room: 'C-203' },
    { time: '12:00 – 1:00',  subject: 'Lunch',              teacher: '',                   room: '',      type: 'lunch' },
    { time: '1:00 – 1:45',   subject: 'Computer Science',   teacher: 'Mr. Rajiv Sharma',   room: 'Lab-2' },
    { time: '1:45 – 2:30',   subject: 'Physical Education', teacher: 'Mr. Suresh Rao',     room: 'Ground' },
  ],
  Tuesday: [
    { time: '8:00 – 8:45',   subject: 'Science',            teacher: 'Mrs. Priya Nair',    room: 'Lab-1' },
    { time: '8:45 – 9:30',   subject: 'Mathematics',        teacher: 'Mrs. Meera Iyer',    room: 'C-204' },
    { time: '9:30 – 10:15',  subject: 'Hindi',              teacher: 'Mrs. Sunita Devi',   room: 'C-203' },
    { time: '10:15 – 10:30', subject: 'Break',              teacher: '',                   room: '',      type: 'break' },
    { time: '10:30 – 11:15', subject: 'English',            teacher: 'Mr. Anil Kapoor',    room: 'C-101' },
    { time: '11:15 – 12:00', subject: 'Art',                teacher: 'Ms. Kavya Menon',    room: 'Art-1' },
    { time: '12:00 – 1:00',  subject: 'Lunch',              teacher: '',                   room: '',      type: 'lunch' },
    { time: '1:00 – 1:45',   subject: 'Social Studies',     teacher: 'Mr. Ramesh Kumar',   room: 'C-205' },
    { time: '1:45 – 2:30',   subject: 'Mathematics',        teacher: 'Mrs. Meera Iyer',    room: 'C-204' },
  ],
  Wednesday: [
    { time: '8:00 – 8:45',   subject: 'English',            teacher: 'Mr. Anil Kapoor',    room: 'C-101' },
    { time: '8:45 – 9:30',   subject: 'Computer Science',   teacher: 'Mr. Rajiv Sharma',   room: 'Lab-2' },
    { time: '9:30 – 10:15',  subject: 'Mathematics',        teacher: 'Mrs. Meera Iyer',    room: 'C-204' },
    { time: '10:15 – 10:30', subject: 'Break',              teacher: '',                   room: '',      type: 'break' },
    { time: '10:30 – 11:15', subject: 'Science',            teacher: 'Mrs. Priya Nair',    room: 'Lab-1' },
    { time: '11:15 – 12:00', subject: 'Social Studies',     teacher: 'Mr. Ramesh Kumar',   room: 'C-205' },
    { time: '12:00 – 1:00',  subject: 'Lunch',              teacher: '',                   room: '',      type: 'lunch' },
    { time: '1:00 – 1:45',   subject: 'Hindi',              teacher: 'Mrs. Sunita Devi',   room: 'C-203' },
    { time: '1:45 – 2:30',   subject: 'Physical Education', teacher: 'Mr. Suresh Rao',     room: 'Ground' },
  ],
  Thursday: [
    { time: '8:00 – 8:45',   subject: 'Social Studies',     teacher: 'Mr. Ramesh Kumar',   room: 'C-205' },
    { time: '8:45 – 9:30',   subject: 'Hindi',              teacher: 'Mrs. Sunita Devi',   room: 'C-203' },
    { time: '9:30 – 10:15',  subject: 'English',            teacher: 'Mr. Anil Kapoor',    room: 'C-101' },
    { time: '10:15 – 10:30', subject: 'Break',              teacher: '',                   room: '',      type: 'break' },
    { time: '10:30 – 11:15', subject: 'Mathematics',        teacher: 'Mrs. Meera Iyer',    room: 'C-204' },
    { time: '11:15 – 12:00', subject: 'Science',            teacher: 'Mrs. Priya Nair',    room: 'Lab-1' },
    { time: '12:00 – 1:00',  subject: 'Lunch',              teacher: '',                   room: '',      type: 'lunch' },
    { time: '1:00 – 1:45',   subject: 'Art',                teacher: 'Ms. Kavya Menon',    room: 'Art-1' },
    { time: '1:45 – 2:30',   subject: 'Computer Science',   teacher: 'Mr. Rajiv Sharma',   room: 'Lab-2' },
  ],
  Friday: [
    { time: '8:00 – 8:45',   subject: 'Hindi',              teacher: 'Mrs. Sunita Devi',   room: 'C-203' },
    { time: '8:45 – 9:30',   subject: 'Science',            teacher: 'Mrs. Priya Nair',    room: 'Lab-1' },
    { time: '9:30 – 10:15',  subject: 'Social Studies',     teacher: 'Mr. Ramesh Kumar',   room: 'C-205' },
    { time: '10:15 – 10:30', subject: 'Break',              teacher: '',                   room: '',      type: 'break' },
    { time: '10:30 – 11:15', subject: 'English',            teacher: 'Mr. Anil Kapoor',    room: 'C-101' },
    { time: '11:15 – 12:00', subject: 'Mathematics',        teacher: 'Mrs. Meera Iyer',    room: 'C-204' },
    { time: '12:00 – 1:00',  subject: 'Lunch',              teacher: '',                   room: '',      type: 'lunch' },
    { time: '1:00 – 1:45',   subject: 'Physical Education', teacher: 'Mr. Suresh Rao',     room: 'Ground' },
    { time: '1:45 – 2:30',   subject: 'Computer Science',   teacher: 'Mr. Rajiv Sharma',   room: 'Lab-2' },
  ],
  Saturday: [
    { time: '8:00 – 8:45',   subject: 'Mathematics',        teacher: 'Mrs. Meera Iyer',    room: 'C-204' },
    { time: '8:45 – 9:30',   subject: 'English',            teacher: 'Mr. Anil Kapoor',    room: 'C-101' },
    { time: '9:30 – 10:15',  subject: 'Science',            teacher: 'Mrs. Priya Nair',    room: 'Lab-1' },
    { time: '10:15 – 10:30', subject: 'Break',              teacher: '',                   room: '',      type: 'break' },
    { time: '10:30 – 11:15', subject: 'Art',                teacher: 'Ms. Kavya Menon',    room: 'Art-1' },
    { time: '11:15 – 12:00', subject: 'Social Studies',     teacher: 'Mr. Ramesh Kumar',   room: 'C-205' },
  ],
};

// Today is Wednesday, 1 April 2026
const todayLabel = 'Wednesday';

const subjectSummary = [
  { subject: 'Mathematics',        periods: 6, teacher: 'Mrs. Meera Iyer',    color: '#1C4ED8', bg: 'bg-primary/8',  text: 'text-primary' },
  { subject: 'English',            periods: 5, teacher: 'Mr. Anil Kapoor',    color: '#0EA5E9', bg: 'bg-accent/8',   text: 'text-accent' },
  { subject: 'Science',            periods: 5, teacher: 'Mrs. Priya Nair',    color: '#10B981', bg: 'bg-success/8',  text: 'text-success' },
  { subject: 'Social Studies',     periods: 5, teacher: 'Mr. Ramesh Kumar',   color: '#8B5CF6', bg: 'bg-purple-50',  text: 'text-purple-600' },
  { subject: 'Hindi',              periods: 4, teacher: 'Mrs. Sunita Devi',   color: '#F59E0B', bg: 'bg-warning/8',  text: 'text-warning' },
  { subject: 'Physical Education', periods: 3, teacher: 'Mr. Suresh Rao',     color: '#EF4444', bg: 'bg-danger/8',   text: 'text-danger' },
  { subject: 'Computer Science',   periods: 4, teacher: 'Mr. Rajiv Sharma',   color: '#0D9488', bg: 'bg-teal-50',    text: 'text-teal-600' },
  { subject: 'Art',                periods: 3, teacher: 'Ms. Kavya Menon',    color: '#EC4899', bg: 'bg-pink-50',    text: 'text-pink-600' },
];

export default function StudentTimetable() {
  const [activeDay, setActiveDay] = useState(todayLabel);
  const [view, setView] = useState<'day' | 'week'>('day');

  const periods = timetable[activeDay] ?? [];
  const regularPeriods = periods.filter((p) => p.type !== 'break' && p.type !== 'lunch');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Timetable</h1>
          <p className="text-sm text-muted mt-0.5">
            Grade 10A · Greenwood Academy · Wed, 1 Apr 2026
          </p>
        </div>
        {/* View toggle */}
        <div className="flex items-center gap-1 p-1 bg-background border border-border/60 rounded-xl self-start sm:self-auto">
          {(['day', 'week'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-600 transition-all capitalize ${
                view === v
                  ? 'bg-white text-primary shadow-soft border border-border/60'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {v === 'day' ? 'Day View' : 'Week View'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Subjects',       value: '8',     sub: 'This term',      icon: 'BookOpenIcon',          color: '#1C4ED8', bg: 'bg-primary/8' },
          { label: "Today's Periods", value: String(timetable[todayLabel].filter((p) => !p.type).length), sub: 'Regular classes', icon: 'CalendarDaysIcon', color: '#10B981', bg: 'bg-success/8' },
          { label: 'School Hours',   value: '6.5h',  sub: '8:00 AM – 2:30 PM', icon: 'ClockIcon',          color: '#0EA5E9', bg: 'bg-accent/8' },
          { label: 'Working Days',   value: '6',     sub: 'Mon – Sat',      icon: 'TableCellsIcon',         color: '#8B5CF6', bg: 'bg-purple-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'CalendarDaysIcon'} size={18} style={{ color: s.color }} />
              </div>
              {s.label === "Today's Periods" && (
                <span className="text-2xs bg-success/10 text-success font-700 px-2 py-0.5 rounded-full">Today</span>
              )}
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Day tabs ── */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {days.map((day, i) => {
          const isToday = day === todayLabel;
          const isActive = day === activeDay;
          return (
            <button
              key={day}
              onClick={() => { setActiveDay(day); setView('day'); }}
              className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-2.5 rounded-xl text-xs font-600 transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-soft'
                  : isToday
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-white border border-border/60 text-muted hover:text-foreground hover:border-border'
              }`}
            >
              <span className="text-2xs font-500 opacity-70">{shortDay[i]}</span>
              <span>{day.slice(0, 3)}</span>
              {isToday && !isActive && (
                <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {view === 'day' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Period list ── */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div>
                <h3 className="font-display font-700 text-sm text-foreground">{activeDay}&apos;s Schedule</h3>
                <p className="text-2xs text-muted mt-0.5">{regularPeriods.length} classes · {periods.filter((p) => p.type === 'break').length} break · Lunch</p>
              </div>
              {activeDay === todayLabel && (
                <span className="inline-flex items-center gap-1.5 text-2xs bg-success/10 text-success font-700 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Today
                </span>
              )}
            </div>

            <div className="divide-y divide-border/40">
              {periods.map((p, i) => {
                const color = getColor(p.subject);
                const isBreakOrLunch = p.type === 'break' || p.type === 'lunch';
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${
                      isBreakOrLunch
                        ? 'bg-background/60'
                        : 'hover:bg-background/50'
                    }`}
                  >
                    {/* Period number / icon */}
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isBreakOrLunch ? 'bg-border-light' : color.bg}`}>
                      {isBreakOrLunch ? (
                        <Icon
                          name={p.type === 'lunch' ? 'SparklesIcon' : 'PauseCircleIcon'}
                          size={16}
                          className="text-muted"
                        />
                      ) : (
                        <span className={`text-xs font-800 ${color.text}`}>
                          {i + 1 - periods.slice(0, i).filter((x) => x.type === 'break' || x.type === 'lunch').length}
                        </span>
                      )}
                    </div>

                    {/* Time */}
                    <div className="w-28 flex-shrink-0">
                      <span className="text-xs font-600 text-foreground">{p.time}</span>
                    </div>

                    {/* Subject / label */}
                    {isBreakOrLunch ? (
                      <div className="flex-1">
                        <span className="text-xs font-600 text-muted capitalize">{p.subject}</span>
                      </div>
                    ) : (
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-700 text-foreground">{p.subject}</span>
                          <span className={`text-2xs font-600 px-1.5 py-0.5 rounded-md ${color.bg} ${color.text}`}>{p.room}</span>
                        </div>
                        <div className="text-2xs text-muted mt-0.5 truncate">{p.teacher}</div>
                      </div>
                    )}

                    {/* Room badge (right) — hidden on break/lunch */}
                    {!isBreakOrLunch && (
                      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                        <Icon name="MapPinIcon" size={12} className="text-muted-light" />
                        <span className="text-2xs text-muted">{p.room}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Side panel: subject legend + quick info ── */}
          <div className="space-y-5">
            {/* Today's next class */}
            {activeDay === todayLabel && (
              <div className="bg-primary rounded-2xl p-5 text-white shadow-soft">
                <div className="text-xs font-600 opacity-70 mb-1">Next Class</div>
                <div className="font-display text-lg font-800">Science</div>
                <div className="text-xs opacity-80 mt-0.5">10:30 – 11:15 · Lab-1</div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/20">
                  <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center">
                    <Icon name="UserIcon" size={12} className="text-white" />
                  </div>
                  <span className="text-xs opacity-90">Mrs. Priya Nair</span>
                </div>
              </div>
            )}

            {/* Subject summary */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <h3 className="font-display font-700 text-sm text-foreground mb-4">Subject Summary</h3>
              <div className="space-y-2.5">
                {subjectSummary.map((s) => (
                  <div key={s.subject} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-600 text-foreground truncate">{s.subject}</div>
                      <div className="text-2xs text-muted truncate">{s.teacher}</div>
                    </div>
                    <span className={`text-2xs font-700 px-2 py-0.5 rounded-full flex-shrink-0 ${s.bg} ${s.text}`}>
                      {s.periods} / wk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Week view ── */
        <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
            <h3 className="font-display font-700 text-sm text-foreground">Weekly Schedule</h3>
            <span className="text-2xs text-muted">Mon – Sat, Apr 2026</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-xs">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider w-28">Time</th>
                  {days.map((day) => (
                    <th key={day} className={`px-3 py-3 text-center text-2xs font-700 uppercase tracking-wider ${day === todayLabel ? 'text-primary' : 'text-muted-light'}`}>
                      <span className="block">{day.slice(0, 3)}</span>
                      {day === todayLabel && <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1" />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Build time slots from Monday's schedule as reference */}
                {timetable['Monday'].map((slot, rowIdx) => {
                  const isBreakRow = slot.type === 'break' || slot.type === 'lunch';
                  return (
                    <tr
                      key={rowIdx}
                      className={`border-b border-border/30 ${isBreakRow ? 'bg-background/60' : 'hover:bg-background/40 transition-colors'}`}
                    >
                      <td className="px-4 py-2.5 text-2xs font-500 text-muted whitespace-nowrap">{slot.time}</td>
                      {days.map((day) => {
                        const cell = timetable[day][rowIdx];
                        if (!cell) return <td key={day} className="px-3 py-2.5" />;
                        const isCellBreak = cell.type === 'break' || cell.type === 'lunch';
                        const color = getColor(cell.subject);
                        return (
                          <td key={day} className="px-2 py-2 text-center">
                            {isCellBreak ? (
                              <span className="text-2xs text-muted-light italic">{cell.subject}</span>
                            ) : (
                              <div className={`inline-flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg ${color.bg} w-full`}>
                                <span className={`text-2xs font-700 leading-tight ${color.text} text-center`}>{cell.subject}</span>
                                <span className="text-2xs text-muted-light leading-tight">{cell.room}</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Subject color legend ── */}
      <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
        <h3 className="font-display font-700 text-sm text-foreground mb-4">Subject Legend</h3>
        <div className="flex flex-wrap gap-2.5">
          {subjectSummary.map((s) => (
            <div key={s.subject} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${s.bg}`}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
              <span className={`text-xs font-600 ${s.text}`}>{s.subject}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
