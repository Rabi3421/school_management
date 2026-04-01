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
  | 'Staff'
  | 'Finance';

type Priority = 'high' | 'normal' | 'low';

type Audience =
  | 'All'
  | 'All Staff'
  | 'All Teachers'
  | 'All Students'
  | 'All Parents'
  | 'Math Dept.'
  | 'Science Dept.'
  | 'Grade 6'
  | 'Grade 7'
  | 'Grade 8'
  | 'Grade 9'
  | 'Grade 10'
  | 'Grade 11'
  | 'Grade 12';

type NoticeStatus = 'Published' | 'Draft' | 'Archived';

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
  status: NoticeStatus;
  pinned?: boolean;
  attachments?: number;
  views?: number;
  actionable?: boolean;
  actionLabel?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NOTICES: Notice[] = [
  {
    id: 1,
    title: 'Parent-Teacher Meeting — April 5, 2026',
    body: 'A Parent-Teacher Meeting (PTM) is scheduled for Saturday, April 5, 2026 from 10:00 AM to 1:00 PM. All class teachers of Grades 9 and 10 are required to be present at their assigned desks by 9:45 AM. Please carry the latest progress reports and attendance sheets for each student. Formal dress code is mandatory. Room assignments will be shared separately by the coordinator.',
    tag: 'Meeting',
    priority: 'high',
    date: 'Apr 1, 2026',
    dateIso: '2026-04-01',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'All Staff',
    status: 'Published',
    pinned: true,
    attachments: 1,
    views: 42,
    actionable: true,
    actionLabel: 'View Schedule',
  },
  {
    id: 2,
    title: 'Term 2 Final Examination Schedule Released',
    body: 'The final examination schedule for Term 2 (April 4–15, 2026) has been published. All students must report to school by 8:30 AM on exam days. No late entry will be permitted after 9:00 AM. Students are advised to carry their hall tickets and school ID on all examination days. Teachers are requested to ensure students are briefed about the seating arrangement.',
    tag: 'Exam',
    priority: 'high',
    date: 'Mar 31, 2026',
    dateIso: '2026-03-31',
    author: 'Mrs. Lata Bose',
    authorRole: 'Exam Coordinator',
    audience: 'All',
    status: 'Published',
    pinned: true,
    attachments: 2,
    views: 198,
    actionable: true,
    actionLabel: 'Download Schedule',
  },
  {
    id: 3,
    title: 'School Closed on April 14 — Dr. Ambedkar Jayanti',
    body: 'This is to inform all students, teachers, and staff that the school will remain closed on Tuesday, April 14, 2026 on account of Dr. B.R. Ambedkar Jayanti (National Holiday). All scheduled classes, exams, and activities for the day are hereby postponed. Revised schedule will be communicated by the respective class teachers.',
    tag: 'Holiday',
    priority: 'normal',
    date: 'Mar 30, 2026',
    dateIso: '2026-03-30',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'All',
    status: 'Published',
    pinned: false,
    views: 312,
  },
  {
    id: 4,
    title: 'Annual Sports Day — Registration Open',
    body: 'Registrations for the Annual Sports Day (April 22, 2026) are now open. Students interested in participating in track & field events, relay races, and team sports must register with their class teacher by April 8, 2026. The Physical Education department will conduct trials for shortlisting. All students from Grades 6–12 are encouraged to participate.',
    tag: 'Sports',
    priority: 'normal',
    date: 'Mar 28, 2026',
    dateIso: '2026-03-28',
    author: 'Mr. Deepak Nair',
    authorRole: 'Sports Coordinator',
    audience: 'All Students',
    status: 'Published',
    pinned: false,
    attachments: 1,
    views: 156,
    actionable: true,
    actionLabel: 'Register Now',
  },
  {
    id: 5,
    title: 'Fee Payment Deadline — April 10, 2026',
    body: 'This is a reminder that the last date for Term 2 fee payment is April 10, 2026. Students with pending fee dues are requested to clear outstanding payments at the school accounts office (Block A, Room 3) between 9:00 AM and 2:00 PM on working days. Online payment via the school portal is also available. Late payments will attract a penalty of ₹500 per week.',
    tag: 'Finance',
    priority: 'high',
    date: 'Mar 27, 2026',
    dateIso: '2026-03-27',
    author: 'Mrs. Rekha Arora',
    authorRole: 'Accounts Officer',
    audience: 'All Parents',
    status: 'Published',
    pinned: false,
    views: 84,
    actionable: true,
    actionLabel: 'Pay Now',
  },
  {
    id: 6,
    title: 'Staff Professional Development Workshop — April 3',
    body: 'A half-day Professional Development Workshop on "Inclusive Classroom Strategies" will be held on Friday, April 3, 2026 from 12:00 PM to 4:00 PM in the Conference Room. All teaching staff are expected to attend. Sessions will be conducted by external resource persons from the Delhi Education Society. Attendance will be recorded. Kindly note that afternoon classes on April 3 will be cancelled.',
    tag: 'Staff',
    priority: 'high',
    date: 'Mar 25, 2026',
    dateIso: '2026-03-25',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'All Teachers',
    status: 'Published',
    pinned: false,
    attachments: 1,
    views: 38,
  },
  {
    id: 7,
    title: 'Science Exhibition 2026 — Theme Announced',
    body: 'The theme for this year\'s Annual Science Exhibition has been announced: "Technology for Sustainable Tomorrow." Students from Grades 8–12 are invited to submit their project proposals by April 12, 2026. Projects should focus on renewable energy, waste management, or smart agriculture. Each class will select two teams of 3 students. Shortlisted projects will be exhibited on April 28, 2026.',
    tag: 'Academic',
    priority: 'normal',
    date: 'Mar 22, 2026',
    dateIso: '2026-03-22',
    author: 'Mrs. Priya Nair',
    authorRole: 'Science HoD',
    audience: 'Grade 8',
    status: 'Published',
    pinned: false,
    attachments: 1,
    views: 72,
    actionable: true,
    actionLabel: 'Submit Proposal',
  },
  {
    id: 8,
    title: 'Library Book Return Notice',
    body: 'All students who have borrowed books from the school library must return them by April 5, 2026. Books not returned by the due date will attract a fine of ₹20 per book per day. Students with outstanding fines must clear them at the library counter before the start of the new academic year. The library will remain closed from April 16–20 for annual inventory and maintenance.',
    tag: 'General',
    priority: 'low',
    date: 'Mar 20, 2026',
    dateIso: '2026-03-20',
    author: 'Mr. Suresh Iyer',
    authorRole: 'Librarian',
    audience: 'All Students',
    status: 'Published',
    pinned: false,
    views: 210,
  },
  {
    id: 9,
    title: 'Grade 12 Board Exam Admit Cards',
    body: 'Admit cards for CBSE Grade 12 Board Examinations (May 2026) have been received and will be distributed to students on April 2, 2026 during the first period. Students must verify all details on the admit card and report any discrepancies to the school office immediately. Lost admit cards will not be re-issued. Students are advised to keep their admit cards in a safe place.',
    tag: 'Exam',
    priority: 'high',
    date: 'Mar 18, 2026',
    dateIso: '2026-03-18',
    author: 'Mrs. Lata Bose',
    authorRole: 'Exam Coordinator',
    audience: 'Grade 12',
    status: 'Published',
    pinned: false,
    views: 88,
    actionable: true,
    actionLabel: 'Acknowledge Receipt',
  },
  {
    id: 10,
    title: 'Independence Week Cultural Programme — Participants Needed',
    body: 'The school will celebrate Independence Week (August 10–15, 2026) with a week-long cultural programme featuring dance, music, drama, and patriotic song competitions. Nominations for student participants must be submitted by the class teachers to the Cultural Committee by April 20, 2026. Practices will begin from May 1 onwards. All interested students may register with their class teacher.',
    tag: 'Event',
    priority: 'normal',
    date: 'Mar 15, 2026',
    dateIso: '2026-03-15',
    author: 'Mrs. Deepa Pillai',
    authorRole: 'Cultural Coordinator',
    audience: 'All',
    status: 'Published',
    pinned: false,
    attachments: 1,
    views: 134,
  },
  {
    id: 11,
    title: '[DRAFT] New Academic Calendar 2026–27',
    body: 'The proposed academic calendar for the year 2026–27 is under review by the management committee. Key dates include: Session opening April 1, 2026; Term 1 exams July 2026; Diwali break October 2026; Term 2 Final Exams March 2027. This notice will be published after formal approval.',
    tag: 'Academic',
    priority: 'normal',
    date: 'Mar 10, 2026',
    dateIso: '2026-03-10',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'All Staff',
    status: 'Draft',
    pinned: false,
    attachments: 1,
    views: 0,
  },
  {
    id: 12,
    title: 'CBSE Affiliation Renewal Update',
    body: 'The school has successfully submitted the CBSE affiliation renewal application for the academic year 2026–27. All required documents including building safety certificate, staff qualifications, and infrastructure reports have been submitted. The next inspection visit is expected in May 2026. Staff are advised to maintain all relevant records and be prepared for verification.',
    tag: 'General',
    priority: 'normal',
    date: 'Mar 5, 2026',
    dateIso: '2026-03-05',
    author: 'Mrs. Anita Sharma',
    authorRole: 'Principal',
    audience: 'All Staff',
    status: 'Archived',
    pinned: false,
    views: 29,
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────
const TAG_CONFIG: Record<NoticeTag, { bg: string; text: string }> = {
  Event:    { bg: 'bg-purple-50',    text: 'text-purple-700'  },
  Exam:     { bg: 'bg-error/8',      text: 'text-error'       },
  Holiday:  { bg: 'bg-success/8',    text: 'text-success'     },
  Meeting:  { bg: 'bg-primary/8',    text: 'text-primary'     },
  Academic: { bg: 'bg-accent/8',     text: 'text-accent'      },
  Sports:   { bg: 'bg-emerald-50',   text: 'text-emerald-700' },
  General:  { bg: 'bg-border/40',    text: 'text-muted'       },
  Alert:    { bg: 'bg-warning/8',    text: 'text-warning'     },
  Staff:    { bg: 'bg-blue-50',      text: 'text-blue-700'    },
  Finance:  { bg: 'bg-amber-50',     text: 'text-amber-700'   },
};

const PRIORITY_CONFIG: Record<Priority, { dot: string; label: string }> = {
  high:   { dot: 'bg-error',   label: 'High'   },
  normal: { dot: 'bg-primary', label: 'Normal' },
  low:    { dot: 'bg-muted',   label: 'Low'    },
};

const STATUS_CONFIG: Record<NoticeStatus, { bg: string; text: string; border: string }> = {
  Published: { bg: 'bg-success/8',  text: 'text-success',  border: 'border-success/20' },
  Draft:     { bg: 'bg-warning/8',  text: 'text-warning',  border: 'border-warning/20' },
  Archived:  { bg: 'bg-border/40',  text: 'text-muted',    border: 'border-border/60'  },
};

const ALL_TAGS: NoticeTag[]   = ['Event', 'Exam', 'Holiday', 'Meeting', 'Academic', 'Sports', 'General', 'Alert', 'Staff', 'Finance'];
const ALL_AUDIENCES: Audience[] = ['All', 'All Staff', 'All Teachers', 'All Students', 'All Parents', 'Math Dept.', 'Science Dept.', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

// ─── Compose form state ───────────────────────────────────────────────────────
interface ComposeState {
  title: string;
  body: string;
  tag: NoticeTag;
  priority: Priority;
  audience: Audience;
}

const DEFAULT_COMPOSE: ComposeState = {
  title: '', body: '', tag: 'General', priority: 'normal', audience: 'All',
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminNotices() {
  const [selectedNotice, setSelectedNotice]     = useState<Notice | null>(null);
  const [search, setSearch]                     = useState('');
  const [tagFilter, setTagFilter]               = useState<NoticeTag | 'All'>('All');
  const [audienceFilter, setAudienceFilter]     = useState<Audience | 'All'>('All');
  const [statusFilter, setStatusFilter]         = useState<NoticeStatus | 'All'>('All');
  const [showCompose, setShowCompose]           = useState(false);
  const [compose, setCompose]                   = useState<ComposeState>(DEFAULT_COMPOSE);
  const [composeSaveDraft, setComposeSaveDraft] = useState(false);

  // ── Filtered notices ─────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return NOTICES.filter(n => {
      const matchTag      = tagFilter === 'All' || n.tag === tagFilter;
      const matchAudience = audienceFilter === 'All' || n.audience === audienceFilter;
      const matchStatus   = statusFilter === 'All' || n.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch   = !q || n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q) || n.author.toLowerCase().includes(q);
      return matchTag && matchAudience && matchStatus && matchSearch;
    }).sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.dateIso.localeCompare(a.dateIso);
    });
  }, [tagFilter, audienceFilter, statusFilter, search]);

  const published = NOTICES.filter(n => n.status === 'Published').length;
  const drafts    = NOTICES.filter(n => n.status === 'Draft').length;
  const pinned    = NOTICES.filter(n => n.pinned).length;
  const highPri   = NOTICES.filter(n => n.priority === 'high' && n.status === 'Published').length;

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Notices & Announcements</h1>
          <p className="text-sm text-muted mt-0.5">Manage school-wide communications</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setCompose(DEFAULT_COMPOSE); setComposeSaveDraft(false); setShowCompose(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={15} />
            New Notice
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-background transition-colors shadow-soft">
            <Icon name="Download" size={15} />
            Export
          </button>
        </div>
      </div>

      {/* ── Stat Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: 'Megaphone',     label: 'Published',      value: String(published), sub: 'Active notices',       iconBg: 'bg-primary/10',  iconColor: 'text-primary' },
          { icon: 'AlertCircle',   label: 'High Priority',  value: String(highPri),   sub: 'Needs attention',      iconBg: 'bg-error/10',    iconColor: 'text-error'   },
          { icon: 'Pin',           label: 'Pinned',         value: String(pinned),    sub: 'Always on top',        iconBg: 'bg-warning/10',  iconColor: 'text-warning' },
          { icon: 'FileEdit',      label: 'Drafts',         value: String(drafts),    sub: 'Pending publication',  iconBg: 'bg-border/40',   iconColor: 'text-muted'   },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon name={s.icon} size={18} className={s.iconColor} />
            </div>
            <div>
              <p className="text-xs text-muted mb-0.5">{s.label}</p>
              <p className="font-display text-2xl font-800 text-foreground leading-none">{s.value}</p>
              <p className="text-2xs text-muted mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Split layout ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

        {/* ── Left: list + filters ───────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-3">

          {/* Search */}
          <div className="bg-white rounded-2xl border border-border/60 p-3 shadow-soft space-y-3">
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search notices…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Status filter */}
            <div className="flex gap-1.5 flex-wrap">
              {(['All', 'Published', 'Draft', 'Archived'] as const).map(s => (
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

            {/* Audience filter */}
            <div>
              <p className="text-2xs text-muted font-700 mb-1.5 uppercase tracking-wide">Audience</p>
              <div className="flex gap-1 flex-wrap">
                {(['All', 'All Staff', 'All Teachers', 'All Students', 'All Parents'] as const).map(a => (
                  <button
                    key={a}
                    onClick={() => setAudienceFilter(a)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-700 border transition-all ${
                      audienceFilter === a
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-background text-muted border-border/60 hover:text-foreground'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag filter */}
            <div>
              <p className="text-2xs text-muted font-700 mb-1.5 uppercase tracking-wide">Tag</p>
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setTagFilter('All')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-700 border transition-all ${
                    tagFilter === 'All'
                      ? 'bg-primary/10 text-primary border-primary/30'
                      : 'bg-background text-muted border-border/60 hover:text-foreground'
                  }`}
                >
                  All
                </button>
                {ALL_TAGS.map(t => {
                  const tc = TAG_CONFIG[t];
                  return (
                    <button
                      key={t}
                      onClick={() => setTagFilter(t)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-700 border transition-all ${
                        tagFilter === t
                          ? `${tc.bg} ${tc.text} border-current`
                          : 'bg-background text-muted border-border/60 hover:text-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Notice list */}
          <div className="space-y-2">
            {filtered.map(notice => {
              const tc = TAG_CONFIG[notice.tag];
              const pc = PRIORITY_CONFIG[notice.priority];
              const sc = STATUS_CONFIG[notice.status];
              const isSelected = selectedNotice?.id === notice.id;
              return (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNotice(isSelected ? null : notice)}
                  className={`bg-white rounded-2xl border shadow-soft p-4 cursor-pointer transition-all hover:border-primary/30 ${
                    isSelected ? 'border-primary/40 bg-primary/2' : 'border-border/60'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                      {notice.pinned && (
                        <Icon name="Pin" size={12} className="text-warning flex-shrink-0" />
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-2xs font-700 flex-shrink-0 ${tc.bg} ${tc.text}`}>
                        {notice.tag}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-700 border flex-shrink-0 ${sc.bg} ${sc.text} ${sc.border}`}>
                        {notice.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${pc.dot}`} />
                    </div>
                  </div>

                  <p className="text-sm font-700 text-foreground leading-snug line-clamp-2">{notice.title}</p>
                  <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">{notice.body}</p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xs text-muted">{notice.date}</span>
                      {notice.attachments && (
                        <span className="flex items-center gap-0.5 text-2xs text-muted">
                          <Icon name="Paperclip" size={10} />
                          {notice.attachments}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {notice.views !== undefined && (
                        <span className="flex items-center gap-0.5 text-2xs text-muted">
                          <Icon name="Eye" size={10} />
                          {notice.views}
                        </span>
                      )}
                      <span className="text-2xs text-muted px-1.5 py-0.5 bg-background rounded-md">
                        → {notice.audience}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-border/60 p-10 text-center shadow-soft">
                <p className="text-sm text-muted">No notices match your filters.</p>
              </div>
            )}
          </div>
          <p className="text-xs text-muted px-1">{filtered.length} of {NOTICES.length} notices</p>
        </div>

        {/* ── Right: detail panel ────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          {selectedNotice ? (
            <div className="bg-white rounded-2xl border border-border/60 shadow-soft lg:sticky lg:top-4 overflow-hidden">

              {/* Header */}
              <div className="px-6 pt-6 pb-5 border-b border-border/40">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedNotice.pinned && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-warning/8 border border-warning/20 text-warning text-2xs font-700 rounded-full">
                        <Icon name="Pin" size={10} />
                        Pinned
                      </span>
                    )}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-700 ${TAG_CONFIG[selectedNotice.tag].bg} ${TAG_CONFIG[selectedNotice.tag].text}`}>
                      {selectedNotice.tag}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-700 border ${STATUS_CONFIG[selectedNotice.status].bg} ${STATUS_CONFIG[selectedNotice.status].text} ${STATUS_CONFIG[selectedNotice.status].border}`}>
                      {selectedNotice.status}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-700 ${PRIORITY_CONFIG[selectedNotice.priority].label === 'High' ? 'text-error' : 'text-muted'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_CONFIG[selectedNotice.priority].dot}`} />
                      {PRIORITY_CONFIG[selectedNotice.priority].label} Priority
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedNotice(null)}
                    className="text-muted hover:text-foreground p-1 flex-shrink-0"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                <h2 className="font-display text-lg font-800 text-foreground leading-snug">
                  {selectedNotice.title}
                </h2>
              </div>

              <div className="p-6 space-y-5">
                {/* Meta grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Published On', value: selectedNotice.date,         icon: 'Calendar'  },
                    { label: 'Audience',      value: selectedNotice.audience,     icon: 'Users'     },
                    { label: 'Author',        value: selectedNotice.author,       icon: 'User'      },
                    { label: 'Views',         value: String(selectedNotice.views ?? 0), icon: 'Eye' },
                  ].map(m => (
                    <div key={m.label} className="bg-background rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon name={m.icon} size={11} className="text-muted" />
                        <p className="text-2xs text-muted">{m.label}</p>
                      </div>
                      <p className="text-xs font-700 text-foreground">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Author role */}
                <div className="flex items-center gap-3 bg-background rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-xs font-700 text-primary flex-shrink-0">
                    {selectedNotice.author.split(' ').filter((_, i) => i > 0).map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-700 text-foreground">{selectedNotice.author}</p>
                    <p className="text-2xs text-muted">{selectedNotice.authorRole}</p>
                  </div>
                </div>

                {/* Body */}
                <div>
                  <p className="text-xs font-700 text-muted uppercase tracking-wide mb-2">Notice Content</p>
                  <p className="text-sm text-foreground leading-relaxed">{selectedNotice.body}</p>
                </div>

                {/* Attachments */}
                {selectedNotice.attachments && (
                  <div>
                    <p className="text-xs font-700 text-muted uppercase tracking-wide mb-2">Attachments</p>
                    <div className="flex flex-col gap-1.5">
                      {Array.from({ length: selectedNotice.attachments }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-background border border-border/60 rounded-xl">
                          <Icon name="FileText" size={14} className="text-primary" />
                          <span className="text-xs font-700 text-foreground flex-1">
                            {selectedNotice.tag === 'Exam' ? 'Exam_Schedule_Term2.pdf' :
                             selectedNotice.tag === 'Meeting' ? 'PTM_RoomAssignment.pdf' :
                             selectedNotice.tag === 'Staff' ? 'Workshop_Agenda.pdf' :
                             `Attachment_${i + 1}.pdf`}
                          </span>
                          <button className="text-primary hover:text-primary/70 transition-colors">
                            <Icon name="Download" size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action button */}
                {selectedNotice.actionable && selectedNotice.actionLabel && (
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors">
                    <Icon name="ExternalLink" size={14} />
                    {selectedNotice.actionLabel}
                  </button>
                )}

                {/* Admin actions */}
                <div className="flex gap-2 pt-1 border-t border-border/40">
                  <button
                    onClick={() => {
                      setCompose({
                        title: selectedNotice.title,
                        body: selectedNotice.body,
                        tag: selectedNotice.tag,
                        priority: selectedNotice.priority,
                        audience: selectedNotice.audience,
                      });
                      setShowCompose(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    <Icon name="Edit" size={13} />
                    Edit
                  </button>
                  {selectedNotice.status === 'Draft' && (
                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-success/8 border border-success/20 text-success text-xs font-700 rounded-xl hover:bg-success/15 transition-colors">
                      <Icon name="Send" size={13} />
                      Publish
                    </button>
                  )}
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-background border border-border/60 text-foreground text-xs font-700 rounded-xl hover:bg-border/20 transition-colors">
                    <Icon name="Pin" size={13} />
                    {selectedNotice.pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button className="p-2 bg-background border border-border/60 text-muted hover:text-foreground rounded-xl transition-colors">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-12 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-3">
                <Icon name="Megaphone" size={26} className="text-primary/40" />
              </div>
              <p className="text-sm font-700 text-foreground">Select a notice</p>
              <p className="text-xs text-muted mt-1 max-w-xs">Click any notice from the list to read its full content and manage it</p>
              <button
                onClick={() => { setCompose(DEFAULT_COMPOSE); setShowCompose(true); }}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Icon name="Plus" size={14} />
                Compose New Notice
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          COMPOSE MODAL
      ════════════════════════════════════════════════════════════════════ */}
      {showCompose && (
        <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/40 sticky top-0 bg-white z-10">
              <div>
                <h3 className="font-display text-base font-800 text-foreground">
                  {compose.title ? 'Edit Notice' : 'Compose New Notice'}
                </h3>
                <p className="text-xs text-muted mt-0.5">Fill in the details below and publish or save as draft</p>
              </div>
              <button
                onClick={() => setShowCompose(false)}
                className="text-muted hover:text-foreground p-1"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">Notice Title *</label>
                <input
                  type="text"
                  placeholder="Enter a clear and descriptive title…"
                  value={compose.title}
                  onChange={e => setCompose(c => ({ ...c, title: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50"
                />
              </div>

              {/* Tag + Priority + Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Tag / Category</label>
                  <select
                    value={compose.tag}
                    onChange={e => setCompose(c => ({ ...c, tag: e.target.value as NoticeTag }))}
                    className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50"
                  >
                    {ALL_TAGS.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Priority</label>
                  <div className="flex gap-1.5">
                    {(['high', 'normal', 'low'] as Priority[]).map(p => (
                      <button
                        key={p}
                        onClick={() => setCompose(c => ({ ...c, priority: p }))}
                        className={`flex-1 py-2 rounded-xl text-xs font-700 border capitalize transition-all ${
                          compose.priority === p
                            ? p === 'high'   ? 'bg-error/10 text-error border-error/30'
                            : p === 'normal' ? 'bg-primary/10 text-primary border-primary/30'
                            :                  'bg-border/40 text-muted border-border/60'
                            : 'bg-background text-muted border-border/60 hover:text-foreground'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-700 text-foreground mb-1.5">Audience</label>
                  <select
                    value={compose.audience}
                    onChange={e => setCompose(c => ({ ...c, audience: e.target.value as Audience }))}
                    className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50"
                  >
                    {ALL_AUDIENCES.map(a => <option key={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">Notice Content *</label>
                <textarea
                  rows={8}
                  placeholder="Write the full notice content here…"
                  value={compose.body}
                  onChange={e => setCompose(c => ({ ...c, body: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 resize-none leading-relaxed"
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-xs font-700 text-foreground mb-1.5">Attachments (optional)</label>
                <div className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-border/60 rounded-xl bg-background cursor-pointer hover:border-primary/40 transition-colors">
                  <Icon name="Paperclip" size={14} className="text-muted" />
                  <span className="text-xs text-muted">Click to attach files (PDF, DOCX, images)</span>
                </div>
              </div>

              {/* Pin toggle */}
              <div className="flex items-center gap-3 p-3 bg-background rounded-xl">
                <div className="flex-1">
                  <p className="text-xs font-700 text-foreground">Pin this notice</p>
                  <p className="text-2xs text-muted">Pinned notices appear at the top of all lists</p>
                </div>
                <button className="w-10 h-6 rounded-full bg-border/40 relative transition-colors hover:bg-border/60">
                  <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform" />
                </button>
              </div>

              {/* Footer actions */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setComposeSaveDraft(true); setShowCompose(false); }}
                  className="flex-1 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => setShowCompose(false)}
                  className="flex-1 py-2 bg-primary text-white text-sm font-700 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Publish Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
