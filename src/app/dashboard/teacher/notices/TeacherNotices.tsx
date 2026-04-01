'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type NoticeTag =
  | 'Event'
  | 'Exam'
  | 'Holiday'
  | 'Meeting'
  | 'Academic'
  | 'Sports'
  | 'General'
  | 'Alert'
  | 'Staff';
type Priority = 'high' | 'normal' | 'low';
type Audience = 'All Staff' | 'Math Dept.' | 'Grade 9 Teachers' | 'Grade 10 Teachers' | 'All Teachers';

interface Notice {
  id: number;
  title: string;
  body: string;
  tag: NoticeTag;
  priority: Priority;
  date: string;
  dateIso: string;
  author: string;
  authorRole: string;
  audience: Audience;
  pinned?: boolean;
  read?: boolean;
  attachments?: number;
  actionable?: boolean;
  actionLabel?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NOTICES: Notice[] = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting — April 5, 2026',
    body: 'A Parent-Teacher Meeting (PTM) is scheduled for Saturday, April 5, 2026 from 10:00 AM to 1:00 PM. All class teachers of Grade 9 and Grade 10 are required to be present at their assigned desks by 9:45 AM. Please carry the latest progress reports and attendance sheets for each student. Dress code is formal.',
    tag: 'Meeting',
    priority: 'high',
    date: 'Apr 1, 2026',
    dateIso: '2026-04-01',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'Grade 9 Teachers',
    pinned: true,
    read: false,
    attachments: 1,
    actionable: true,
    actionLabel: 'Confirm Attendance',
  },
  {
    id: 2,
    title: 'Term 3 Final Exam Invigilation Duty',
    body: 'Invigilation duty rosters for the Term 3 Final Examinations (April 20 – April 30, 2026) have been prepared. All teachers are requested to check their assigned duty slots on the attached roster. Any changes must be notified to the examination coordinator Mrs. Lata Bose by April 8. Please do not swap duties without prior written approval.',
    tag: 'Exam',
    priority: 'high',
    date: 'Mar 30, 2026',
    dateIso: '2026-03-30',
    author: 'Mrs. Lata Bose',
    authorRole: 'Exam Coordinator',
    audience: 'All Teachers',
    pinned: true,
    read: false,
    attachments: 2,
    actionable: false,
  },
  {
    id: 3,
    title: 'Mathematics Department Meeting — April 3',
    body: 'The Mathematics Department will hold its monthly review meeting on Friday, April 3, 2026 at 3:00 PM in Staff Room 1 (C-Wing). Agenda: (1) Term 3 syllabus completion status, (2) Remedial class planning, (3) Common question paper format for final exams. Attendance is mandatory for all Math faculty.',
    tag: 'Staff',
    priority: 'high',
    date: 'Mar 29, 2026',
    dateIso: '2026-03-29',
    author: 'Mr. Ramesh Iyer',
    authorRole: 'HOD – Mathematics',
    audience: 'Math Dept.',
    pinned: false,
    read: false,
    attachments: 0,
    actionable: true,
    actionLabel: 'View Agenda',
  },
  {
    id: 4,
    title: 'Annual Sports Day — Staff Responsibilities',
    body: 'The Annual Sports Day is scheduled for April 10, 2026. Teachers have been assigned specific duties including event management, student supervision, and first-aid coordination. Please check the duty list attached and confirm your availability with the Sports Head Mr. Suresh Rao by April 4. Reporting time for all assigned staff is 7:30 AM.',
    tag: 'Sports',
    priority: 'normal',
    date: 'Mar 28, 2026',
    dateIso: '2026-03-28',
    author: 'Mr. Suresh Rao',
    authorRole: 'Sports Head',
    audience: 'All Staff',
    pinned: false,
    read: false,
    attachments: 1,
    actionable: false,
  },
  {
    id: 5,
    title: 'Revised School Timings from April 7',
    body: 'Effective from Monday, April 7, 2026, school timings for Grade 9 and Grade 10 will change to 7:30 AM – 2:00 PM. Teachers handling these grades must adjust their arrival accordingly. The first period will begin at 7:45 AM. Detailed revised timetables will be circulated by the Academic Coordinator by April 4.',
    tag: 'Academic',
    priority: 'high',
    date: 'Mar 25, 2026',
    dateIso: '2026-03-25',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'Grade 10 Teachers',
    pinned: false,
    read: true,
    attachments: 0,
    actionable: false,
  },
  {
    id: 6,
    title: 'Grade Submission Deadline — Term 3 Unit Test',
    body: 'All teachers are reminded to submit the Term 3 Unit Test marks on the school portal by April 5, 2026. Marks should be entered for all students including absent ones (mark as AB). Late submissions will not be accepted after 11:59 PM on the deadline date. Contact the IT admin for portal access issues.',
    tag: 'Academic',
    priority: 'high',
    date: 'Mar 22, 2026',
    dateIso: '2026-03-22',
    author: 'Mrs. Lata Bose',
    authorRole: 'Exam Coordinator',
    audience: 'All Teachers',
    pinned: false,
    read: true,
    attachments: 0,
    actionable: true,
    actionLabel: 'Submit Marks',
  },
  {
    id: 7,
    title: 'School Closed — April 14 (Public Holiday)',
    body: 'School will remain closed on Tuesday, April 14, 2026 on account of Dr. B.R. Ambedkar Jayanti. All scheduled classes, tests, and activities for that day stand postponed. Teachers are requested to plan lesson continuity accordingly. Staff attendance on April 14 is not required.',
    tag: 'Holiday',
    priority: 'normal',
    date: 'Mar 20, 2026',
    dateIso: '2026-03-20',
    author: 'Admin Office',
    authorRole: 'Administration',
    audience: 'All Staff',
    pinned: false,
    read: true,
    attachments: 0,
    actionable: false,
  },
  {
    id: 8,
    title: 'Student Counselling Referral Process',
    body: 'Teachers who observe any student showing signs of academic stress, emotional distress, or behavioural changes are requested to use the new referral form to escalate the matter to the school counsellor. Forms are available in the staff room and on the school portal. Confidentiality will be maintained at all times.',
    tag: 'General',
    priority: 'normal',
    date: 'Mar 18, 2026',
    dateIso: '2026-03-18',
    author: 'Mrs. Kavita Menon',
    authorRole: 'School Counsellor',
    audience: 'All Teachers',
    pinned: false,
    read: true,
    attachments: 1,
    actionable: false,
  },
  {
    id: 9,
    title: 'Professional Development Workshop — April 12',
    body: 'A one-day Professional Development Workshop on "Classroom Management and Differentiated Instruction" will be held on April 12, 2026 (Saturday) from 9:00 AM to 4:00 PM in the Conference Hall. Attendance is mandatory for all teaching staff. Lunch and refreshments will be provided. Register via the staff portal by April 7.',
    tag: 'Staff',
    priority: 'normal',
    date: 'Mar 15, 2026',
    dateIso: '2026-03-15',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'All Teachers',
    pinned: false,
    read: true,
    attachments: 1,
    actionable: true,
    actionLabel: 'Register Now',
  },
  {
    id: 10,
    title: 'Mathematics Remedial Classes — Scheduling',
    body: 'Remedial Mathematics classes for students scoring below 60% in the Term 2 unit test have been scheduled every Tuesday and Thursday from 7:00 AM to 7:30 AM starting April 7. The assigned teacher for these sessions is Mr. Rajiv Mehta. Room C-204 has been allocated. Attendance registers must be maintained separately.',
    tag: 'Academic',
    priority: 'normal',
    date: 'Mar 14, 2026',
    dateIso: '2026-03-14',
    author: 'Mr. Ramesh Iyer',
    authorRole: 'HOD – Mathematics',
    audience: 'Math Dept.',
    pinned: false,
    read: true,
    attachments: 0,
    actionable: false,
  },
  {
    id: 11,
    title: 'Fire Safety Drill — April 2, 2026',
    body: 'A mandatory Fire Safety Drill will be conducted on Thursday, April 2, 2026 during Period 4 (10:30 AM). All teachers must guide their students to the designated assembly point in an orderly manner. Class registers must be carried during the drill. The drill is expected to last approximately 15 minutes.',
    tag: 'Alert',
    priority: 'high',
    date: 'Mar 12, 2026',
    dateIso: '2026-03-12',
    author: 'Admin Office',
    authorRole: 'Administration',
    audience: 'All Staff',
    pinned: false,
    read: true,
    attachments: 0,
    actionable: false,
  },
  {
    id: 12,
    title: 'Inter-House Debate Results — Congratulations!',
    body: 'The Mathematics department teacher Mr. Rajiv Mehta is congratulated for mentoring Aryan Sharma (Grade 10A) who won Best Speaker at the Inter-House Debate Competition 2026. The school management appreciates the teachers\' dedication in supporting students\' co-curricular growth.',
    tag: 'Event',
    priority: 'low',
    date: 'Mar 16, 2026',
    dateIso: '2026-03-16',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'All Staff',
    pinned: false,
    read: true,
    attachments: 0,
    actionable: false,
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const TAG_COLORS: Record<NoticeTag, { bg: string; text: string; border: string; dot: string }> = {
  Event:    { bg: 'bg-purple-50',    text: 'text-purple-600', border: 'border-purple-200',   dot: '#8B5CF6' },
  Exam:     { bg: 'bg-primary/8',    text: 'text-primary',    border: 'border-primary/20',   dot: '#1C4ED8' },
  Holiday:  { bg: 'bg-success/8',    text: 'text-success',    border: 'border-success/20',   dot: '#10B981' },
  Meeting:  { bg: 'bg-accent/8',     text: 'text-accent',     border: 'border-accent/20',    dot: '#0EA5E9' },
  Academic: { bg: 'bg-primary/8',    text: 'text-primary',    border: 'border-primary/20',   dot: '#1C4ED8' },
  Sports:   { bg: 'bg-orange-50',    text: 'text-orange-600', border: 'border-orange-200',   dot: '#F97316' },
  General:  { bg: 'bg-background',   text: 'text-muted',      border: 'border-border/40',    dot: '#94A3B8' },
  Alert:    { bg: 'bg-error/8',      text: 'text-error',      border: 'border-error/20',     dot: '#EF4444' },
  Staff:    { bg: 'bg-emerald-50',   text: 'text-emerald-600',border: 'border-emerald-200',  dot: '#10B981' },
};

const PRIORITY_COLORS: Record<Priority, { bg: string; text: string; label: string }> = {
  high:   { bg: 'bg-error/8',   text: 'text-error',   label: 'High'   },
  normal: { bg: 'bg-warning/8', text: 'text-warning', label: 'Normal' },
  low:    { bg: 'bg-success/8', text: 'text-success', label: 'Low'    },
};

const TAG_ICONS: Record<NoticeTag, string> = {
  Event:    'CalendarDaysIcon',
  Exam:     'ClipboardDocumentListIcon',
  Holiday:  'SunIcon',
  Meeting:  'UsersIcon',
  Academic: 'AcademicCapIcon',
  Sports:   'TrophyIcon',
  General:  'InformationCircleIcon',
  Alert:    'ExclamationTriangleIcon',
  Staff:    'BriefcaseIcon',
};

const ALL_TAGS: NoticeTag[] = [
  'Event', 'Exam', 'Holiday', 'Meeting', 'Academic', 'Sports', 'General', 'Alert', 'Staff',
];

// ─── Notice List Card ─────────────────────────────────────────────────────────
function NoticeListCard({
  notice,
  isSelected,
  onClick,
}: {
  notice: Notice;
  isSelected: boolean;
  onClick: () => void;
}) {
  const tc = TAG_COLORS[notice.tag];
  const pc = PRIORITY_COLORS[notice.priority];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border transition-all hover:shadow-card group ${
        isSelected
          ? 'bg-primary/4 border-primary/30 shadow-soft'
          : notice.read
          ? 'bg-white border-border/60 shadow-soft'
          : 'bg-white border-border/60 shadow-soft'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Unread dot */}
        <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
          <div
            className={`w-2 h-2 rounded-full mt-1 transition-all ${
              !notice.read ? 'bg-primary' : 'bg-transparent'
            }`}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Row 1: tag + priority + pinned */}
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className={`text-2xs font-700 px-2 py-0.5 rounded-full border ${tc.bg} ${tc.text} ${tc.border}`}>
              {notice.tag}
            </span>
            {notice.pinned && (
              <span className="text-2xs font-700 text-warning bg-warning/8 px-2 py-0.5 rounded-full border border-warning/20 flex items-center gap-1">
                <Icon name="BellAlertIcon" size={10} className="text-warning" />
                Pinned
              </span>
            )}
            {notice.priority === 'high' && (
              <span className={`text-2xs font-700 px-2 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>
                Urgent
              </span>
            )}
          </div>

          {/* Title */}
          <div className={`text-sm font-700 leading-snug mb-1 ${notice.read ? 'text-foreground' : 'text-foreground'}`}>
            {notice.title}
          </div>

          {/* Body preview */}
          <p className="text-xs text-muted line-clamp-2 mb-2">{notice.body}</p>

          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xs text-muted-light">{notice.date}</span>
            <span className="text-muted-light text-2xs">·</span>
            <span className="text-2xs text-muted">{notice.author}</span>
            {notice.attachments ? (
              <>
                <span className="text-muted-light text-2xs">·</span>
                <span className="flex items-center gap-0.5 text-2xs text-muted-light">
                  <Icon name="PaperClipIcon" size={10} className="text-muted-light" />
                  {notice.attachments}
                </span>
              </>
            ) : null}
            <span className="ml-auto text-2xs text-muted-light bg-background border border-border/40 px-2 py-0.5 rounded-full">
              {notice.audience}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Notice Detail Panel ──────────────────────────────────────────────────────
function NoticeDetail({ notice, onClose }: { notice: Notice; onClose: () => void }) {
  const tc = TAG_COLORS[notice.tag];
  const pc = PRIORITY_COLORS[notice.priority];

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className={`p-5 border-b border-border/40 ${tc.bg}`}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-2xs font-700 px-2.5 py-1 rounded-full border ${tc.bg} ${tc.text} ${tc.border} flex items-center gap-1.5`}>
              <Icon name={TAG_ICONS[notice.tag] as 'AcademicCapIcon'} size={11} />
              {notice.tag}
            </span>
            {notice.pinned && (
              <span className="text-2xs font-700 text-warning bg-warning/8 px-2.5 py-1 rounded-full border border-warning/20 flex items-center gap-1">
                <Icon name="BellAlertIcon" size={11} className="text-warning" />
                Pinned
              </span>
            )}
            <span className={`text-2xs font-700 px-2.5 py-1 rounded-full ${pc.bg} ${pc.text}`}>
              {pc.label} Priority
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-foreground hover:bg-border/40 transition-all flex-shrink-0 lg:hidden"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>
        <h2 className="font-display text-base font-700 text-foreground leading-snug">{notice.title}</h2>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Meta */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'From',     value: notice.author,     icon: 'UserCircleIcon'    },
            { label: 'Role',     value: notice.authorRole, icon: 'BriefcaseIcon'     },
            { label: 'Date',     value: notice.date,       icon: 'CalendarIcon'      },
            { label: 'Audience', value: notice.audience,   icon: 'UsersIcon'         },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-xl bg-background border border-border/50">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon name={item.icon as 'UserCircleIcon'} size={12} className="text-muted-light" />
                <span className="text-2xs text-muted-light">{item.label}</span>
              </div>
              <div className="text-xs font-700 text-foreground">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div>
          <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Notice</div>
          <div className="text-sm text-foreground leading-relaxed bg-background rounded-xl border border-border/50 p-4">
            {notice.body}
          </div>
        </div>

        {/* Attachments */}
        {notice.attachments ? (
          <div>
            <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Attachments</div>
            <div className="space-y-2">
              {Array.from({ length: notice.attachments }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-primary/4 border border-primary/20 cursor-pointer hover:bg-primary/8 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="DocumentTextIcon" size={15} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-700 text-primary truncate">
                      {notice.tag}_Notice_{notice.id}_Doc{i + 1}.pdf
                    </div>
                    <div className="text-2xs text-muted-light">PDF Document</div>
                  </div>
                  <Icon name="ArrowDownTrayIcon" size={14} className="text-primary flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Action */}
        {notice.actionable && notice.actionLabel && (
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-700 hover:bg-emerald-700 transition-colors shadow-soft">
            <Icon name="CheckCircleIcon" size={16} className="text-white" />
            {notice.actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TeacherNotices() {
  const [search,      setSearch]      = useState('');
  const [activeTag,   setActiveTag]   = useState<NoticeTag | 'All'>('All');
  const [activeAud,   setActiveAud]   = useState<Audience | 'All'>('All');
  const [showUnread,  setShowUnread]  = useState(false);
  const [selected,    setSelected]    = useState<Notice | null>(NOTICES[0]);
  const [readIds,     setReadIds]     = useState<Set<number>>(
    new Set(NOTICES.filter((n) => n.read).map((n) => n.id))
  );

  // Mark a notice as read when selected
  function handleSelect(n: Notice) {
    setSelected(n);
    setReadIds((prev) => new Set([...prev, n.id]));
  }

  const enriched = useMemo(
    () => NOTICES.map((n) => ({ ...n, read: readIds.has(n.id) })),
    [readIds]
  );

  const filtered = useMemo(() => {
    return enriched
      .filter((n) => {
        const q = search.toLowerCase();
        if (q && !n.title.toLowerCase().includes(q) && !n.body.toLowerCase().includes(q)) return false;
        if (activeTag !== 'All' && n.tag !== activeTag) return false;
        if (activeAud !== 'All' && n.audience !== activeAud) return false;
        if (showUnread && n.read) return false;
        return true;
      })
      .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return b.dateIso.localeCompare(a.dateIso);
      });
  }, [enriched, search, activeTag, activeAud, showUnread]);

  const unreadCount  = enriched.filter((n) => !n.read).length;
  const pinnedCount  = enriched.filter((n) => n.pinned).length;
  const urgentCount  = enriched.filter((n) => n.priority === 'high').length;
  const actionCount  = enriched.filter((n) => n.actionable).length;

  const AUDIENCES: (Audience | 'All')[] = [
    'All', 'All Staff', 'All Teachers', 'Math Dept.', 'Grade 9 Teachers', 'Grade 10 Teachers',
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Notices</h1>
          <p className="text-sm text-muted mt-0.5">Staff notices &amp; circulars · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-700 text-primary bg-primary/8 border border-primary/20 px-3 py-1.5 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Notices',  value: NOTICES.length, icon: 'BellIcon',                color: '#1C4ED8', bg: 'bg-primary/8',   sub: 'This term'       },
          { label: 'Unread',         value: unreadCount,    icon: 'EnvelopeOpenIcon',         color: '#EF4444', bg: 'bg-error/8',     sub: 'Awaiting review' },
          { label: 'Pinned',         value: pinnedCount,    icon: 'BellAlertIcon',            color: '#F59E0B', bg: 'bg-warning/8',   sub: 'Important'       },
          { label: 'Action Required',value: actionCount,    icon: 'CheckCircleIcon',          color: '#10B981', bg: 'bg-success/8',   sub: 'Need response'   },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'BellIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Icon name="MagnifyingGlassIcon" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notices..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border/60 bg-white text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>

        {/* Audience filter */}
        <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl overflow-x-auto">
          {AUDIENCES.map((aud) => (
            <button
              key={aud}
              onClick={() => setActiveAud(aud)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-600 transition-all whitespace-nowrap ${
                activeAud === aud
                  ? 'bg-white text-primary shadow-soft border border-border/60'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {aud}
            </button>
          ))}
        </div>

        {/* Unread toggle */}
        <button
          onClick={() => setShowUnread(!showUnread)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-700 border transition-all ${
            showUnread
              ? 'bg-primary/8 text-primary border-primary/30'
              : 'bg-white text-muted border-border/60 hover:border-primary/30 hover:text-primary'
          }`}
        >
          <Icon name="FunnelIcon" size={13} />
          Unread only
        </button>
      </div>

      {/* ── Tag filter ── */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5">
        <button
          onClick={() => setActiveTag('All')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-700 border transition-all ${
            activeTag === 'All'
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-muted border-border/60 hover:border-primary/40 hover:text-primary'
          }`}
        >
          All
        </button>
        {ALL_TAGS.map((tag) => {
          const tc  = TAG_COLORS[tag];
          const cnt = enriched.filter((n) => n.tag === tag).length;
          if (!cnt) return null;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 border transition-all ${
                activeTag === tag
                  ? `${tc.bg} ${tc.text} ${tc.border}`
                  : 'bg-white text-muted border-border/60 hover:border-border'
              }`}
            >
              <Icon name={TAG_ICONS[tag] as 'AcademicCapIcon'} size={11} />
              {tag}
              <span className={`text-2xs font-800 ${activeTag === tag ? tc.text : 'text-muted-light'}`}>
                {cnt}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Main split layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* List */}
        <div className="lg:col-span-2 space-y-2.5">
          <div className="flex items-center justify-between text-2xs text-muted-light mb-1">
            <span>{filtered.length} notice{filtered.length !== 1 ? 's' : ''}</span>
            {filtered.length !== NOTICES.length && (
              <button
                onClick={() => { setSearch(''); setActiveTag('All'); setActiveAud('All'); setShowUnread(false); }}
                className="text-primary font-700 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-border/60">
              <div className="w-12 h-12 rounded-2xl bg-background flex items-center justify-center mb-3">
                <Icon name="BellSlashIcon" size={22} className="text-muted-light" />
              </div>
              <div className="font-700 text-foreground text-sm">No notices found</div>
              <div className="text-xs text-muted mt-1">Try adjusting your filters</div>
            </div>
          ) : (
            filtered.map((notice) => (
              <NoticeListCard
                key={notice.id}
                notice={notice}
                isSelected={selected?.id === notice.id}
                onClick={() => handleSelect(notice)}
              />
            ))
          )}
        </div>

        {/* Detail panel — sticky */}
        <div className="lg:col-span-3 lg:sticky lg:top-0 lg:max-h-[calc(100vh-10rem)]">
          {selected ? (
            <NoticeDetail
              notice={{ ...selected, read: readIds.has(selected.id) }}
              onClose={() => setSelected(null)}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-border/60 shadow-soft h-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4">
                <Icon name="BellIcon" size={26} className="text-emerald-600" />
              </div>
              <div className="font-700 text-foreground">Select a notice</div>
              <div className="text-xs text-muted mt-1 max-w-[180px]">
                Choose any notice from the list to read it here
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
