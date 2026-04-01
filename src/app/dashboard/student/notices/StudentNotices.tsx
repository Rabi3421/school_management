'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ──────────────────────────────────────────────────────────────────────
type NoticeTag = 'Event' | 'Exam' | 'Holiday' | 'Meeting' | 'Academic' | 'Sports' | 'General' | 'Alert';
type Priority  = 'high' | 'normal' | 'low';

interface Notice {
  id: number;
  title: string;
  body: string;
  tag: NoticeTag;
  priority: Priority;
  date: string;           // display date
  dateIso: string;        // for sorting
  author: string;
  authorRole: string;
  pinned?: boolean;
  read?: boolean;
  attachments?: number;
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const notices: Notice[] = [
  {
    id: 1,
    title: 'Annual Sports Day — April 10, 2026',
    body: 'The Annual Sports Day will be held on Friday, April 10, 2026 at the school ground from 8:00 AM to 4:00 PM. Students are requested to wear their house colour T-shirts. Parents are warmly invited. All students must report to their respective house captains by 7:45 AM.',
    tag: 'Sports',
    priority: 'high',
    date: 'Apr 1, 2026',
    dateIso: '2026-04-01',
    author: 'Mr. Suresh Rao',
    authorRole: 'Sports Head',
    pinned: true,
    read: false,
    attachments: 1,
  },
  {
    id: 2,
    title: 'Term 3 Final Exam Schedule Released',
    body: 'The Term 3 Final Examination schedule has been released for Grade 10. Exams will be held from April 20 to April 30, 2026. Students are advised to check the detailed subject-wise timetable attached below. Admit cards will be distributed on April 15. No student will be permitted to sit for exams without a valid admit card.',
    tag: 'Exam',
    priority: 'high',
    date: 'Mar 30, 2026',
    dateIso: '2026-03-30',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    pinned: true,
    read: false,
    attachments: 2,
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting — April 5, 2026',
    body: 'A Parent-Teacher Meeting (PTM) is scheduled for Saturday, April 5, 2026 from 10:00 AM to 1:00 PM. Parents of Grade 9 and Grade 10 students are requested to attend. Individual appointment slots can be booked via the school portal. Please bring the student\'s progress report.',
    tag: 'Meeting',
    priority: 'high',
    date: 'Mar 28, 2026',
    dateIso: '2026-03-28',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    pinned: false,
    read: false,
    attachments: 0,
  },
  {
    id: 4,
    title: 'School Closed — April 14 (Dr. Ambedkar Jayanti)',
    body: 'School will remain closed on Tuesday, April 14, 2026 on account of Dr. B.R. Ambedkar Jayanti, a national public holiday. Regular classes will resume on Wednesday, April 15, 2026. All scheduled tests and activities for April 14 stand postponed and will be rescheduled.',
    tag: 'Holiday',
    priority: 'normal',
    date: 'Mar 27, 2026',
    dateIso: '2026-03-27',
    author: 'Admin Office',
    authorRole: 'Administration',
    pinned: false,
    read: true,
    attachments: 0,
  },
  {
    id: 5,
    title: 'Revised School Timings from April 7',
    body: 'Effective from Monday, April 7, 2026, the school timing for Grade 9 and Grade 10 will be changed to 7:30 AM – 2:00 PM due to the upcoming board examination season. The afternoon shift students will be unaffected. Parents are requested to adjust transportation accordingly.',
    tag: 'Academic',
    priority: 'high',
    date: 'Mar 25, 2026',
    dateIso: '2026-03-25',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    pinned: false,
    read: true,
    attachments: 0,
  },
  {
    id: 6,
    title: 'Science Olympiad Registration Open',
    body: 'Registrations are now open for the National Science Olympiad 2026 (Class 10 category). Interested students must submit their forms to the Science department by April 8, 2026. The exam will be held on May 5, 2026. Study material and past papers are available in the library.',
    tag: 'Academic',
    priority: 'normal',
    date: 'Mar 22, 2026',
    dateIso: '2026-03-22',
    author: 'Mrs. Priya Nair',
    authorRole: 'Science Dept.',
    pinned: false,
    read: true,
    attachments: 1,
  },
  {
    id: 7,
    title: 'Library Books Return Reminder',
    body: 'All students who have issued library books for the current term are reminded to return them by April 12, 2026. A fine of ₹5 per day will be levied on overdue books. Students with outstanding dues will not be issued their admit cards.',
    tag: 'General',
    priority: 'normal',
    date: 'Mar 20, 2026',
    dateIso: '2026-03-20',
    author: 'Mr. Dinesh Pillai',
    authorRole: 'Librarian',
    pinned: false,
    read: true,
    attachments: 0,
  },
  {
    id: 8,
    title: 'Fee Payment Deadline — Term 3 Balance',
    body: 'Students with pending Term 3 fee balance are requested to clear dues by April 10, 2026 to avoid a late fee surcharge. Online payment via the school portal is available 24/7. Parents may also visit the accounts office between 9:00 AM and 12:00 PM on weekdays.',
    tag: 'Alert',
    priority: 'high',
    date: 'Mar 18, 2026',
    dateIso: '2026-03-18',
    author: 'Accounts Office',
    authorRole: 'Administration',
    pinned: false,
    read: true,
    attachments: 0,
  },
  {
    id: 9,
    title: 'Inter-House Debate Competition Results',
    body: 'Congratulations to House Blue for winning the Inter-House Debate Competition 2026 held on March 15. The motion was "Technology does more harm than good." Special recognition to Aryan Sharma (Grade 10A) for Best Speaker. The full results and scorecards have been posted on the notice board.',
    tag: 'Event',
    priority: 'low',
    date: 'Mar 16, 2026',
    dateIso: '2026-03-16',
    author: 'Mr. Anil Kapoor',
    authorRole: 'English Dept.',
    pinned: false,
    read: true,
    attachments: 0,
  },
  {
    id: 10,
    title: 'Mathematics Remedial Classes — April 7 Onwards',
    body: 'Remedial classes for Mathematics (Chapter 11 – 14) will be conducted every Tuesday and Thursday from 7:00 AM to 7:30 AM starting April 7. Attendance is mandatory for students who scored below 60% in the Term 2 unit test. The venue is Room C-204.',
    tag: 'Academic',
    priority: 'normal',
    date: 'Mar 14, 2026',
    dateIso: '2026-03-14',
    author: 'Mrs. Meera Iyer',
    authorRole: 'Mathematics Dept.',
    pinned: false,
    read: true,
    attachments: 0,
  },
];

// ─── Config ─────────────────────────────────────────────────────────────────────
const tagMeta: Record<NoticeTag, { bg: string; text: string; icon: string }> = {
  Event:    { bg: 'bg-primary/8',   text: 'text-primary',     icon: 'CalendarDaysIcon'         },
  Exam:     { bg: 'bg-warning/10',  text: 'text-warning',     icon: 'PencilSquareIcon'         },
  Holiday:  { bg: 'bg-success/10',  text: 'text-success',     icon: 'SunIcon'                  },
  Meeting:  { bg: 'bg-accent/10',   text: 'text-accent',      icon: 'UserGroupIcon'            },
  Academic: { bg: 'bg-purple-50',   text: 'text-purple-600',  icon: 'AcademicCapIcon'          },
  Sports:   { bg: 'bg-danger/8',    text: 'text-danger',      icon: 'TrophyIcon'               },
  General:  { bg: 'bg-border-light',text: 'text-muted',       icon: 'InformationCircleIcon'    },
  Alert:    { bg: 'bg-danger/10',   text: 'text-danger',      icon: 'ExclamationTriangleIcon'  },
};

const priorityMeta: Record<Priority, { dot: string }> = {
  high:   { dot: 'bg-danger'   },
  normal: { dot: 'bg-warning'  },
  low:    { dot: 'bg-success'  },
};

const allTags: ('All' | NoticeTag)[] = ['All', 'Exam', 'Event', 'Holiday', 'Meeting', 'Academic', 'Sports', 'Alert', 'General'];

// ─── Sub-components ──────────────────────────────────────────────────────────────
function TagBadge({ tag }: { tag: NoticeTag }) {
  const m = tagMeta[tag];
  return (
    <span className={`inline-flex items-center gap-1.5 text-2xs font-700 px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      <Icon name={m.icon as 'CalendarDaysIcon'} size={11} />
      {tag}
    </span>
  );
}

function AuthorAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2);
  return (
    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-2xs font-800 text-primary flex-shrink-0">
      {initials}
    </div>
  );
}

interface NoticeCardProps {
  notice: Notice;
  selected: boolean;
  onSelect: (n: Notice) => void;
}

function NoticeCard({ notice: n, selected, onSelect }: NoticeCardProps) {
  const tm = tagMeta[n.tag];
  const pm = priorityMeta[n.priority];

  return (
    <div
      onClick={() => onSelect(n)}
      className={`bg-white rounded-2xl border shadow-soft p-4 cursor-pointer transition-all hover:shadow-card group ${
        selected
          ? 'border-primary/40 ring-2 ring-primary/15'
          : n.read
          ? 'border-border/60 hover:border-border'
          : 'border-primary/25 hover:border-primary/40'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Unread dot / pinned indicator */}
        <div className="flex flex-col items-center gap-1.5 pt-1 flex-shrink-0">
          {n.pinned && <Icon name="MapPinIcon" size={13} className="text-primary" />}
          {!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}
          {n.read && !n.pinned && <span className="w-2 h-2 rounded-full bg-border" />}
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className={`text-xs font-700 leading-snug line-clamp-2 ${n.read ? 'text-foreground' : 'text-foreground'}`}>
              {n.title}
            </h4>
            <TagBadge tag={n.tag} />
          </div>

          {/* Preview */}
          <p className="text-2xs text-muted leading-relaxed line-clamp-2 mb-3">{n.body}</p>

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <AuthorAvatar name={n.author} />
              <div>
                <div className="text-2xs font-600 text-foreground leading-tight">{n.author}</div>
                <div className="text-2xs text-muted-light leading-tight">{n.authorRole}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {n.attachments ? (
                <div className="flex items-center gap-1 text-2xs text-muted">
                  <Icon name="PaperClipIcon" size={11} className="text-muted-light" />
                  {n.attachments}
                </div>
              ) : null}
              <span className={`w-1.5 h-1.5 rounded-full ${pm.dot}`} />
              <span className="text-2xs text-muted-light">{n.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ notice: n, onClose }: { notice: Notice; onClose: () => void }) {
  const tm = tagMeta[n.tag];
  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/50 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tm.bg}`}>
            <Icon name={tm.icon as 'CalendarDaysIcon'} size={20} className={tm.text} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <TagBadge tag={n.tag} />
              {n.pinned && (
                <span className="inline-flex items-center gap-1 text-2xs font-600 px-2 py-0.5 rounded-full bg-primary/8 text-primary">
                  <Icon name="MapPinIcon" size={10} /> Pinned
                </span>
              )}
              {!n.read && (
                <span className="inline-flex items-center gap-1 text-2xs font-700 px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  New
                </span>
              )}
            </div>
            <h3 className="font-display text-sm font-700 text-foreground leading-snug">{n.title}</h3>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-muted hover:bg-border-light transition-colors flex-shrink-0">
          <Icon name="XMarkIcon" size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Author + date meta */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background rounded-xl border border-border/50 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Icon name="UserIcon" size={11} className="text-muted-light" />
              <span className="text-2xs text-muted-light">Posted by</span>
            </div>
            <div className="flex items-center gap-2">
              <AuthorAvatar name={n.author} />
              <div>
                <div className="text-xs font-700 text-foreground">{n.author}</div>
                <div className="text-2xs text-muted">{n.authorRole}</div>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-xl border border-border/50 p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Icon name="CalendarDaysIcon" size={11} className="text-muted-light" />
              <span className="text-2xs text-muted-light">Date posted</span>
            </div>
            <div className="text-xs font-700 text-foreground">{n.date}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${priorityMeta[n.priority].dot}`} />
              <span className="text-2xs text-muted capitalize">{n.priority} priority</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div>
          <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Notice Details</div>
          <div className="bg-background border border-border/50 rounded-xl p-4">
            <p className="text-xs text-foreground leading-relaxed">{n.body}</p>
          </div>
        </div>

        {/* Attachments */}
        {n.attachments ? (
          <div>
            <div className="text-2xs font-700 text-muted-light uppercase tracking-widest mb-2">Attachments</div>
            <div className="space-y-2">
              {Array.from({ length: n.attachments }).map((_, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-background hover:border-primary/30 hover:bg-primary/4 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="DocumentArrowDownIcon" size={15} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-xs font-600 text-foreground truncate">
                      {n.tag}-Notice-Attachment-{i + 1}.pdf
                    </div>
                    <div className="text-2xs text-muted-light">PDF Document</div>
                  </div>
                  <Icon name="ArrowDownTrayIcon" size={14} className="text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Priority alert for high-priority */}
        {n.priority === 'high' && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-danger/6 border border-danger/20">
            <Icon name="ExclamationTriangleIcon" size={15} className="text-danger flex-shrink-0 mt-0.5" />
            <p className="text-2xs text-foreground leading-relaxed">
              This is a <span className="font-700 text-danger">high-priority</span> notice. Please read carefully and take required action promptly.
            </p>
          </div>
        )}

        {/* Acknowledge button */}
        <button className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-700 hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
          <Icon name="CheckCircleIcon" size={14} />
          Mark as Read
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────────
export default function StudentNotices() {
  const [activeTag, setActiveTag]       = useState<'All' | NoticeTag>('All');
  const [search, setSearch]             = useState('');
  const [selected, setSelected]         = useState<Notice | null>(notices[0]);
  const [showUnreadOnly, setShowUnread] = useState(false);

  const filtered = useMemo(() => {
    let list = [...notices].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.dateIso.localeCompare(a.dateIso);
    });
    if (activeTag !== 'All') list = list.filter((n) => n.tag === activeTag);
    if (showUnreadOnly)       list = list.filter((n) => !n.read);
    if (search.trim())        list = list.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.body.toLowerCase().includes(search.toLowerCase()) ||
      n.tag.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [activeTag, search, showUnreadOnly]);

  const unreadCount = notices.filter((n) => !n.read).length;
  const pinnedCount = notices.filter((n) => n.pinned).length;

  const tagCounts = useMemo(() => {
    const map: Partial<Record<'All' | NoticeTag, number>> = { All: notices.length };
    notices.forEach((n) => { map[n.tag] = (map[n.tag] ?? 0) + 1; });
    return map;
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Notices &amp; Announcements</h1>
          <p className="text-sm text-muted mt-0.5">Grade 10A · Greenwood Academy · Wed, 1 Apr 2026</p>
        </div>
        {unreadCount > 0 && (
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 bg-primary/10 text-primary text-xs font-600 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {unreadCount} unread
          </span>
        )}
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Notices',  value: notices.length,                                 sub: 'This term',        icon: 'MegaphoneIcon',          color: '#1C4ED8', bg: 'bg-primary/8'  },
          { label: 'Unread',         value: unreadCount,                                    sub: 'Action needed',    icon: 'BellAlertIcon',          color: '#EF4444', bg: 'bg-danger/8'   },
          { label: 'Pinned',         value: pinnedCount,                                    sub: 'Important items',  icon: 'MapPinIcon',             color: '#8B5CF6', bg: 'bg-purple-50'  },
          { label: 'Upcoming Events',value: notices.filter((n) => n.tag === 'Event' || n.tag === 'Exam').length, sub: 'Events & exams', icon: 'CalendarDaysIcon', color: '#F59E0B', bg: 'bg-warning/8'  },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'MegaphoneIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Filters row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Tag filter pills — scrollable */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide flex-1">
          {allTags.map((tag) => {
            const isActive = activeTag === tag;
            const tm = tag !== 'All' ? tagMeta[tag] : null;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-2xs font-700 border transition-all ${
                  isActive
                    ? tag === 'All'
                      ? 'bg-primary text-white border-primary shadow-soft'
                      : `${tm!.bg} ${tm!.text} border-current/20`
                    : 'bg-white border-border/60 text-muted hover:text-foreground hover:border-border'
                }`}
              >
                {tag !== 'All' && <Icon name={tagMeta[tag].icon as 'CalendarDaysIcon'} size={11} />}
                {tag}
                <span className={`text-2xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-inherit' : 'bg-border-light text-muted-light'}`}>
                  {tagCounts[tag] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Unread toggle */}
          <button
            onClick={() => setShowUnread(!showUnreadOnly)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-2xs font-600 border transition-all ${
              showUnreadOnly
                ? 'bg-primary/10 text-primary border-primary/20'
                : 'bg-white border-border/60 text-muted hover:text-foreground'
            }`}
          >
            <Icon name="BellAlertIcon" size={13} />
            Unread only
          </button>

          {/* Search */}
          <div className="relative">
            <Icon name="MagnifyingGlassIcon" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
            <input
              type="text"
              placeholder="Search notices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 w-44 sm:w-52 bg-white border border-border/60 rounded-xl text-2xs text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Main split layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Left: notice list */}
        <div className="lg:col-span-3 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border/60 p-12 flex flex-col items-center gap-3 text-center shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-border-light flex items-center justify-center">
                <Icon name="MegaphoneIcon" size={24} className="text-muted-light" />
              </div>
              <div className="text-sm font-600 text-muted">No notices found</div>
              <div className="text-xs text-muted-light">Try a different filter or search query</div>
            </div>
          ) : (
            filtered.map((n) => (
              <NoticeCard
                key={n.id}
                notice={n}
                selected={selected?.id === n.id}
                onSelect={setSelected}
              />
            ))
          )}
        </div>

        {/* Right: detail panel */}
        <div className="lg:col-span-2 lg:sticky lg:top-0 lg:max-h-[calc(100vh-10rem)]">
          {selected ? (
            <DetailPanel notice={selected} onClose={() => setSelected(null)} />
          ) : (
            <div className="bg-white rounded-2xl border border-border/60 p-12 flex flex-col items-center gap-3 text-center shadow-soft h-64">
              <div className="w-12 h-12 rounded-2xl bg-border-light flex items-center justify-center">
                <Icon name="CursorArrowRaysIcon" size={24} className="text-muted-light" />
              </div>
              <div className="text-sm font-600 text-muted">Select a notice</div>
              <div className="text-xs text-muted-light">Click any notice to read the full details</div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
