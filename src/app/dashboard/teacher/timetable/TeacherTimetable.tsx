'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type SlotType = 'class' | 'free' | 'break' | 'lunch' | 'meeting';

interface TimeSlot {
  time: string;
  classId: string | null;  // null for free/break/lunch
  className: string;
  subject: string;
  room: string;
  type: SlotType;
}

type WeekTimetable = Record<string, TimeSlot[]>;

// ─── Data ─────────────────────────────────────────────────────────────────────
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SHORT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CLASS_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  '10a': { bg: 'bg-primary/8',    text: 'text-primary',    border: 'border-primary/25',   dot: '#1C4ED8' },
  '10b': { bg: 'bg-success/8',    text: 'text-success',    border: 'border-success/25',   dot: '#10B981' },
  '9a':  { bg: 'bg-purple-50',    text: 'text-purple-600', border: 'border-purple-200',   dot: '#8B5CF6' },
  '9b':  { bg: 'bg-warning/8',    text: 'text-warning',    border: 'border-warning/25',   dot: '#F59E0B' },
  free:  { bg: 'bg-background',   text: 'text-muted',      border: 'border-border/40',    dot: '#94A3B8' },
  break: { bg: 'bg-border-light', text: 'text-muted',      border: 'border-border/40',    dot: '#94A3B8' },
  lunch: { bg: 'bg-border-light', text: 'text-muted',      border: 'border-border/40',    dot: '#94A3B8' },
  meeting: { bg: 'bg-accent/8',   text: 'text-accent',     border: 'border-accent/25',    dot: '#0EA5E9' },
};

const CLASS_HEX: Record<string, string> = {
  '10a': '#1C4ED8', '10b': '#10B981', '9a': '#8B5CF6', '9b': '#F59E0B',
};

function slotColorKey(slot: TimeSlot): string {
  if (slot.type === 'break')   return 'break';
  if (slot.type === 'lunch')   return 'lunch';
  if (slot.type === 'free')    return 'free';
  if (slot.type === 'meeting') return 'meeting';
  return slot.classId ?? 'free';
}

const TIMETABLE: WeekTimetable = {
  Monday: [
    { time: '8:00 – 8:45',   classId: '10a', className: 'Grade 10A', subject: 'Mathematics', room: 'C-204',  type: 'class'   },
    { time: '8:45 – 9:30',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '9:30 – 10:15',  classId: '9a',  className: 'Grade 9A',  subject: 'Mathematics', room: 'C-301',  type: 'class'   },
    { time: '10:15 – 10:30', classId: null,  className: '',           subject: 'Break',       room: '',       type: 'break'   },
    { time: '10:30 – 11:15', classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '11:15 – 12:00', classId: '10b', className: 'Grade 10B', subject: 'Mathematics', room: 'C-205',  type: 'class'   },
    { time: '12:00 – 1:00',  classId: null,  className: '',           subject: 'Lunch',       room: '',       type: 'lunch'   },
    { time: '1:00 – 1:45',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '1:45 – 2:30',   classId: '9b',  className: 'Grade 9B',  subject: 'Mathematics', room: 'C-302',  type: 'class'   },
  ],
  Tuesday: [
    { time: '8:00 – 8:45',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '8:45 – 9:30',   classId: '10b', className: 'Grade 10B', subject: 'Mathematics', room: 'C-205',  type: 'class'   },
    { time: '9:30 – 10:15',  classId: '9a',  className: 'Grade 9A',  subject: 'Mathematics', room: 'C-301',  type: 'class'   },
    { time: '10:15 – 10:30', classId: null,  className: '',           subject: 'Break',       room: '',       type: 'break'   },
    { time: '10:30 – 11:15', classId: '10a', className: 'Grade 10A', subject: 'Mathematics', room: 'C-204',  type: 'class'   },
    { time: '11:15 – 12:00', classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '12:00 – 1:00',  classId: null,  className: '',           subject: 'Lunch',       room: '',       type: 'lunch'   },
    { time: '1:00 – 1:45',   classId: '9b',  className: 'Grade 9B',  subject: 'Mathematics', room: 'C-302',  type: 'class'   },
    { time: '1:45 – 2:30',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
  ],
  Wednesday: [
    { time: '8:00 – 8:45',   classId: '10a', className: 'Grade 10A', subject: 'Mathematics', room: 'C-204',  type: 'class'   },
    { time: '8:45 – 9:30',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '9:30 – 10:15',  classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '10:15 – 10:30', classId: null,  className: '',           subject: 'Break',       room: '',       type: 'break'   },
    { time: '10:30 – 11:15', classId: '9b',  className: 'Grade 9B',  subject: 'Mathematics', room: 'C-302',  type: 'class'   },
    { time: '11:15 – 12:00', classId: '10b', className: 'Grade 10B', subject: 'Mathematics', room: 'C-205',  type: 'class'   },
    { time: '12:00 – 1:00',  classId: null,  className: '',           subject: 'Lunch',       room: '',       type: 'lunch'   },
    { time: '1:00 – 1:45',   classId: null,  className: '',           subject: 'Dept. Meeting', room: 'Stf-1', type: 'meeting' },
    { time: '1:45 – 2:30',   classId: '9a',  className: 'Grade 9A',  subject: 'Mathematics', room: 'C-301',  type: 'class'   },
  ],
  Thursday: [
    { time: '8:00 – 8:45',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '8:45 – 9:30',   classId: '10b', className: 'Grade 10B', subject: 'Mathematics', room: 'C-205',  type: 'class'   },
    { time: '9:30 – 10:15',  classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '10:15 – 10:30', classId: null,  className: '',           subject: 'Break',       room: '',       type: 'break'   },
    { time: '10:30 – 11:15', classId: '9a',  className: 'Grade 9A',  subject: 'Mathematics', room: 'C-301',  type: 'class'   },
    { time: '11:15 – 12:00', classId: '10a', className: 'Grade 10A', subject: 'Mathematics', room: 'C-204',  type: 'class'   },
    { time: '12:00 – 1:00',  classId: null,  className: '',           subject: 'Lunch',       room: '',       type: 'lunch'   },
    { time: '1:00 – 1:45',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '1:45 – 2:30',   classId: '9b',  className: 'Grade 9B',  subject: 'Mathematics', room: 'C-302',  type: 'class'   },
  ],
  Friday: [
    { time: '8:00 – 8:45',   classId: '9b',  className: 'Grade 9B',  subject: 'Mathematics', room: 'C-302',  type: 'class'   },
    { time: '8:45 – 9:30',   classId: '9a',  className: 'Grade 9A',  subject: 'Mathematics', room: 'C-301',  type: 'class'   },
    { time: '9:30 – 10:15',  classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '10:15 – 10:30', classId: null,  className: '',           subject: 'Break',       room: '',       type: 'break'   },
    { time: '10:30 – 11:15', classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '11:15 – 12:00', classId: '10a', className: 'Grade 10A', subject: 'Mathematics', room: 'C-204',  type: 'class'   },
    { time: '12:00 – 1:00',  classId: null,  className: '',           subject: 'Lunch',       room: '',       type: 'lunch'   },
    { time: '1:00 – 1:45',   classId: '10b', className: 'Grade 10B', subject: 'Mathematics', room: 'C-205',  type: 'class'   },
    { time: '1:45 – 2:30',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
  ],
  Saturday: [
    { time: '8:00 – 8:45',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '8:45 – 9:30',   classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '9:30 – 10:15',  classId: '10b', className: 'Grade 10B', subject: 'Mathematics', room: 'C-205',  type: 'class'   },
    { time: '10:15 – 10:30', classId: null,  className: '',           subject: 'Break',       room: '',       type: 'break'   },
    { time: '10:30 – 11:15', classId: '9a',  className: 'Grade 9A',  subject: 'Mathematics', room: 'C-301',  type: 'class'   },
    { time: '11:15 – 12:00', classId: null,  className: '',           subject: 'Free Period', room: '',       type: 'free'    },
    { time: '12:00 – 12:30', classId: null,  className: '',           subject: 'Lunch',       room: '',       type: 'lunch'   },
  ],
};

// Time slots used as row headers for week view
const ALL_TIMES = [
  '8:00 – 8:45', '8:45 – 9:30', '9:30 – 10:15',
  '10:15 – 10:30', '10:30 – 11:15', '11:15 – 12:00',
  '12:00 – 1:00', '1:00 – 1:45', '1:45 – 2:30',
];

// Weekly summary per class
const CLASS_SUMMARY = [
  { id: '10a', name: 'Grade 10A', periods: 5, rooms: 'C-204', color: '#1C4ED8' },
  { id: '10b', name: 'Grade 10B', periods: 5, rooms: 'C-205', color: '#10B981' },
  { id: '9a',  name: 'Grade 9A',  periods: 5, rooms: 'C-301', color: '#8B5CF6' },
  { id: '9b',  name: 'Grade 9B',  periods: 5, rooms: 'C-302', color: '#F59E0B' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getSlotForDayTime(day: string, time: string): TimeSlot | undefined {
  return TIMETABLE[day]?.find((s) => s.time === time);
}

function getTodaysClasses() {
  // Today = Wednesday (Apr 1 2026)
  return TIMETABLE['Wednesday'].filter((s) => s.type === 'class');
}

// ─── Day View Slot Card ───────────────────────────────────────────────────────
function SlotCard({ slot, isNow }: { slot: TimeSlot; isNow?: boolean }) {
  const key = slotColorKey(slot);
  const c   = CLASS_COLORS[key] ?? CLASS_COLORS.free;
  const isBreakOrLunch = slot.type === 'break' || slot.type === 'lunch';

  if (isBreakOrLunch) {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-background border border-border/40">
        <div className="w-1 h-6 rounded-full bg-border" />
        <span className="text-2xs font-600 text-muted-light">{slot.subject}</span>
        <span className="text-2xs text-muted-light ml-auto">{slot.time}</span>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-card ${c.bg} ${c.border} ${isNow ? 'ring-2 ring-offset-1 shadow-card' : 'shadow-soft'}`}>
      {isNow && (
        <span className="absolute top-3 right-3 flex items-center gap-1 text-2xs font-700 text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />Now
        </span>
      )}

      {/* Color bar */}
      <div className="w-1 self-stretch rounded-full flex-shrink-0"
        style={{ backgroundColor: CLASS_HEX[slot.classId ?? ''] ?? '#94A3B8' }} />

      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Class avatar */}
        {slot.classId && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-800 text-white flex-shrink-0"
            style={{ backgroundColor: CLASS_HEX[slot.classId] }}>
            {slot.className.replace('Grade ', '').replace(' ', '')}
          </div>
        )}
        {slot.type === 'meeting' && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-accent/15 flex-shrink-0">
            <Icon name="UsersIcon" size={18} className="text-accent" />
          </div>
        )}
        {slot.type === 'free' && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-background border border-border/50 flex-shrink-0">
            <Icon name="ClockIcon" size={18} className="text-muted-light" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className={`font-700 text-sm ${slot.type === 'free' ? 'text-muted' : 'text-foreground'}`}>
            {slot.type === 'free' ? 'Free Period' : slot.type === 'meeting' ? slot.subject : slot.subject}
          </div>
          {slot.className && (
            <div className={`text-xs font-600 mt-0.5 ${c.text}`}>{slot.className}</div>
          )}
          {slot.room && (
            <div className="flex items-center gap-1 mt-1 text-2xs text-muted">
              <Icon name="MapPinIcon" size={11} className="text-muted-light" />
              {slot.room}
            </div>
          )}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="text-2xs font-700 text-foreground whitespace-nowrap">{slot.time.split('–')[0].trim()}</div>
        <div className="text-2xs text-muted-light whitespace-nowrap">– {slot.time.split('–')[1].trim()}</div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TeacherTimetable() {
  const [activeDay,  setActiveDay]  = useState('Wednesday'); // today
  const [activeView, setActiveView] = useState<'day' | 'week'>('day');

  const todaysClasses = getTodaysClasses();
  const daySlots      = TIMETABLE[activeDay] ?? [];
  const classSlots    = daySlots.filter((s) => s.type === 'class');
  const freeCount     = daySlots.filter((s) => s.type === 'free').length;

  // Next upcoming class today (Wednesday)
  const nextClass = todaysClasses[1] ?? null; // simulate: first is now, second is next

  // Weekly period counts per class
  const weeklyPeriods = Object.fromEntries(
    CLASS_SUMMARY.map((cls) => {
      const count = Object.values(TIMETABLE).flat().filter((s) => s.classId === cls.id).length;
      return [cls.id, count];
    })
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">My Timetable</h1>
          <p className="text-sm text-muted mt-0.5">Mathematics · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-background border border-border/60 rounded-xl self-start sm:self-auto">
          {(['day', 'week'] as const).map((v) => (
            <button key={v} onClick={() => setActiveView(v)}
              className={`px-4 py-2 rounded-lg text-xs font-600 capitalize transition-all ${
                activeView === v
                  ? 'bg-white text-primary shadow-soft border border-border/60'
                  : 'text-muted hover:text-foreground'
              }`}>
              {v === 'day' ? 'Day View' : 'Week View'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Classes Today',     value: todaysClasses.length, icon: 'AcademicCapIcon',            color: '#1C4ED8', bg: 'bg-primary/8',  sub: 'Wednesday'          },
          { label: 'Free Periods',      value: TIMETABLE['Wednesday'].filter((s) => s.type === 'free').length, icon: 'ClockIcon', color: '#10B981', bg: 'bg-success/8', sub: 'Today' },
          { label: 'Weekly Classes',    value: Object.values(TIMETABLE).flat().filter((s) => s.type === 'class').length, icon: 'CalendarDaysIcon', color: '#8B5CF6', bg: 'bg-purple-50', sub: 'This week' },
          { label: 'Classes Assigned',  value: CLASS_SUMMARY.length, icon: 'UsersIcon',                  color: '#F59E0B', bg: 'bg-warning/8',  sub: '4 classes total'    },
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

      {/* ── Today's quick strip (always visible) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Next class card */}
        {nextClass && (
          <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft"
            style={{ borderLeftWidth: 4, borderLeftColor: CLASS_HEX[nextClass.classId ?? ''] ?? '#1C4ED8' }}>
            <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Next Class Today</div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-900 text-white flex-shrink-0"
                style={{ backgroundColor: CLASS_HEX[nextClass.classId ?? ''] ?? '#1C4ED8' }}>
                {nextClass.className.replace('Grade ', '').replace(' ', '')}
              </div>
              <div>
                <div className="font-700 text-foreground">{nextClass.subject}</div>
                <div className="text-xs font-600 mt-0.5" style={{ color: CLASS_HEX[nextClass.classId ?? ''] }}>{nextClass.className}</div>
                <div className="flex items-center gap-1.5 mt-1 text-2xs text-muted">
                  <Icon name="ClockIcon" size={11} className="text-muted-light" />
                  {nextClass.time}
                  <span className="text-muted-light">·</span>
                  <Icon name="MapPinIcon" size={11} className="text-muted-light" />
                  {nextClass.room}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Today's class count per class */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
          <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Classes This Week</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CLASS_SUMMARY.map((cls) => (
              <div key={cls.id} className="p-3 rounded-xl border border-border/50 bg-background">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-800 text-white"
                    style={{ backgroundColor: cls.color }}>
                    {cls.name.replace('Grade ', '').replace(' ', '')}
                  </div>
                </div>
                <div className="font-display text-xl font-800 text-foreground leading-none">{weeklyPeriods[cls.id]}</div>
                <div className="text-2xs text-muted mt-0.5">periods · {cls.rooms}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DAY VIEW ── */}
      {activeView === 'day' && (
        <div className="space-y-4">

          {/* Day tabs */}
          <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl overflow-x-auto">
            {DAYS.map((day, i) => {
              const isToday = day === 'Wednesday';
              const dayClasses = (TIMETABLE[day] ?? []).filter((s) => s.type === 'class').length;
              return (
                <button key={day} onClick={() => setActiveDay(day)}
                  className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-lg text-2xs font-600 transition-all min-w-[52px] ${
                    activeDay === day
                      ? 'bg-white text-primary shadow-soft border border-border/60'
                      : 'text-muted hover:text-foreground'
                  }`}>
                  <span>{SHORT_DAYS[i]}</span>
                  {dayClasses > 0 && (
                    <span className={`mt-0.5 text-2xs font-700 ${activeDay === day ? 'text-primary' : 'text-muted-light'}`}>
                      {dayClasses}
                    </span>
                  )}
                  {isToday && <span className="mt-0.5 w-1 h-1 rounded-full bg-success" />}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Schedule list */}
            <div className="lg:col-span-3 space-y-2.5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-700 text-sm text-foreground">
                  {activeDay}
                  {activeDay === 'Wednesday' && (
                    <span className="ml-2 text-2xs font-600 text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">Today</span>
                  )}
                </h2>
                <span className="text-2xs text-muted">{classSlots.length} class{classSlots.length !== 1 ? 'es' : ''} · {freeCount} free</span>
              </div>

              {daySlots.map((slot, i) => (
                <SlotCard
                  key={i}
                  slot={slot}
                  isNow={activeDay === 'Wednesday' && slot.type === 'class' && slot.classId === '10a' && slot.time.startsWith('8:00')}
                />
              ))}
            </div>

            {/* Side panel */}
            <div className="lg:col-span-2 space-y-4">

              {/* Day summary */}
              <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Day Summary</div>
                <div className="space-y-2.5">
                  {[
                    { label: 'Teaching Periods', value: classSlots.length,  icon: 'AcademicCapIcon',   color: 'text-primary',  bg: 'bg-primary/8'  },
                    { label: 'Free Periods',      value: freeCount,          icon: 'ClockIcon',         color: 'text-success',  bg: 'bg-success/8'  },
                    { label: 'Total Students',    value: classSlots.reduce((sum, s) => {
                      const counts: Record<string, number> = { '10a': 10, '10b': 8, '9a': 7, '9b': 6 };
                      return sum + (counts[s.classId ?? ''] ?? 0);
                    }, 0), icon: 'UsersIcon', color: 'text-accent', bg: 'bg-accent/8' },
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
              </div>

              {/* Class legend */}
              <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
                <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-3">Classes Legend</div>
                <div className="space-y-2.5">
                  {CLASS_SUMMARY.map((cls) => {
                    const todayCount = (TIMETABLE[activeDay] ?? []).filter((s) => s.classId === cls.id).length;
                    return (
                      <div key={cls.id} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-800 text-white flex-shrink-0"
                          style={{ backgroundColor: cls.color }}>
                          {cls.name.replace('Grade ', '').replace(' ', '')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-700 text-foreground">{cls.name}</div>
                          <div className="text-2xs text-muted">Room {cls.rooms}</div>
                        </div>
                        <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${todayCount > 0 ? 'bg-primary/8 text-primary' : 'text-muted-light bg-background border border-border/40'}`}>
                          {todayCount > 0 ? `${todayCount}×` : '—'}
                        </span>
                      </div>
                    );
                  })}
                  <div className="flex items-center gap-2.5 pt-1 border-t border-border/40 mt-1">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-accent/10 flex-shrink-0">
                      <Icon name="UsersIcon" size={14} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-700 text-foreground">Meeting</div>
                      <div className="text-2xs text-muted">Staff / Dept.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── WEEK VIEW ── */}
      {activeView === 'week' && (
        <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] text-xs">
              <thead>
                <tr className="bg-background border-b border-border/40">
                  <th className="px-4 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider w-28 sticky left-0 bg-background z-10">Time</th>
                  {DAYS.map((day) => (
                    <th key={day} className={`px-3 py-3 text-center text-2xs font-700 uppercase tracking-wider ${day === 'Wednesday' ? 'text-primary' : 'text-muted-light'}`}>
                      {day.slice(0, 3)}
                      {day === 'Wednesday' && <div className="text-2xs text-success font-600 normal-case tracking-normal mt-0.5">Today</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_TIMES.map((time, rowIdx) => {
                  const isBreak = time === '10:15 – 10:30';
                  const isLunch = time === '12:00 – 1:00';
                  const rowBg   = rowIdx % 2 === 0 ? 'bg-white' : 'bg-background/40';

                  if (isBreak || isLunch) {
                    return (
                      <tr key={time} className="border-b border-border/30 bg-border-light/40">
                        <td className="px-4 py-2 text-2xs font-600 text-muted-light sticky left-0 bg-border-light/40 z-10 whitespace-nowrap">{time}</td>
                        <td colSpan={DAYS.length} className="px-3 py-2 text-center text-2xs text-muted-light font-600 tracking-widest uppercase">
                          {isBreak ? 'Short Break' : 'Lunch Break'}
                        </td>
                      </tr>
                    );
                  }

                  return (
                    <tr key={time} className={`border-b border-border/30 ${rowBg}`}>
                      <td className={`px-4 py-3 text-2xs font-600 text-muted sticky left-0 z-10 whitespace-nowrap ${rowBg}`}>{time}</td>
                      {DAYS.map((day) => {
                        const slot = getSlotForDayTime(day, time);
                        const isToday = day === 'Wednesday';

                        if (!slot || slot.type === 'free') {
                          return (
                            <td key={day} className={`px-2 py-2 text-center ${isToday ? 'bg-primary/2' : ''}`}>
                              <span className="text-2xs text-muted-light">—</span>
                            </td>
                          );
                        }

                        if (slot.type === 'meeting') {
                          return (
                            <td key={day} className={`px-2 py-2 ${isToday ? 'bg-primary/2' : ''}`}>
                              <div className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-accent/8 border border-accent/20 text-center">
                                <Icon name="UsersIcon" size={13} className="text-accent" />
                                <span className="text-2xs font-700 text-accent leading-tight">Dept. Mtg</span>
                              </div>
                            </td>
                          );
                        }

                        const color = CLASS_COLORS[slot.classId ?? 'free'];
                        const hex   = CLASS_HEX[slot.classId ?? ''] ?? '#94A3B8';
                        return (
                          <td key={day} className={`px-2 py-2 ${isToday ? 'bg-primary/2' : ''}`}>
                            <div className={`flex flex-col items-center gap-0.5 p-2 rounded-xl border text-center ${color.bg} ${color.border}`}>
                              <span className="text-xs font-800 leading-tight" style={{ color: hex }}>
                                {slot.className.replace('Grade ', '')}
                              </span>
                              <div className="flex items-center gap-1 text-2xs text-muted">
                                <Icon name="MapPinIcon" size={9} className="text-muted-light" />
                                {slot.room}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Week view legend */}
          <div className="flex flex-wrap gap-3 items-center px-5 py-3 border-t border-border/40 bg-background">
            <span className="text-2xs font-700 text-muted-light uppercase tracking-wider mr-1">Legend:</span>
            {CLASS_SUMMARY.map((cls) => (
              <span key={cls.id} className="flex items-center gap-1.5 text-2xs text-muted">
                <span className="w-3 h-3 rounded flex-shrink-0" style={{ backgroundColor: cls.color }} />
                {cls.name}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-2xs text-muted">
              <span className="w-3 h-3 rounded bg-accent/50 flex-shrink-0" />Meeting
            </span>
            <span className="flex items-center gap-1.5 text-2xs text-muted">
              <span className="text-muted-light">—</span> Free Period
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
