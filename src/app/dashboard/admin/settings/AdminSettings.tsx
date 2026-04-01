'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type SettingsTab =
  | 'school'
  | 'academic'
  | 'notifications'
  | 'roles'
  | 'security'
  | 'appearance';

interface TabDef {
  id: SettingsTab;
  label: string;
  icon: string;
  desc: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────
const TABS: TabDef[] = [
  { id: 'school',        label: 'School Profile',     icon: 'Building2',     desc: 'Name, address, contact details' },
  { id: 'academic',      label: 'Academic Year',      icon: 'CalendarDays',  desc: 'Sessions, terms, holidays'      },
  { id: 'notifications', label: 'Notifications',      icon: 'Bell',          desc: 'Email, SMS, push preferences'   },
  { id: 'roles',         label: 'Roles & Access',     icon: 'ShieldCheck',   desc: 'Permissions, staff roles'       },
  { id: 'security',      label: 'Security',           icon: 'Lock',          desc: 'Password policy, 2FA, sessions' },
  { id: 'appearance',    label: 'Appearance',         icon: 'Palette',       desc: 'Theme, logo, branding'          },
];

// ─── Reusable sub-components ─────────────────────────────────────────────────
function SectionCard({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
      <div className="px-5 py-4 border-b border-border/40">
        <p className="text-sm font-700 text-foreground">{title}</p>
        {desc && <p className="text-xs text-muted mt-0.5">{desc}</p>}
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}

function FieldRow({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
      <div className="sm:w-44 flex-shrink-0 pt-0.5">
        <p className="text-xs font-700 text-foreground">{label}</p>
        {hint && <p className="text-2xs text-muted mt-0.5 leading-snug">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Input({ value, placeholder, type = 'text' }: { value: string; placeholder?: string; type?: string }) {
  const [val, setVal] = useState(value);
  return (
    <input
      type={type}
      value={val}
      onChange={e => setVal(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
    />
  );
}

function Textarea({ value, rows = 3 }: { value: string; rows?: number }) {
  const [val, setVal] = useState(value);
  return (
    <textarea
      rows={rows}
      value={val}
      onChange={e => setVal(e.target.value)}
      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none leading-relaxed"
    />
  );
}

function Select({ value, options }: { value: string; options: string[] }) {
  const [val, setVal] = useState(value);
  return (
    <select
      value={val}
      onChange={e => setVal(e.target.value)}
      className="w-full px-3 py-2 text-sm bg-background border border-border/60 rounded-xl text-foreground focus:outline-none focus:border-primary/50 transition-colors"
    >
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

function Toggle({ defaultOn = false, label, desc }: { defaultOn?: boolean; label: string; desc?: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <p className="text-sm text-foreground font-700">{label}</p>
        {desc && <p className="text-xs text-muted mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => setOn(v => !v)}
        className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${on ? 'bg-primary' : 'bg-border/60'}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${on ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

function SaveBar({ section }: { section: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex items-center justify-end gap-2 pt-1">
      <button className="px-4 py-2 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
        Reset
      </button>
      <button
        onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
        className={`flex items-center gap-2 px-5 py-2 text-sm font-700 rounded-xl transition-all ${
          saved
            ? 'bg-success/10 text-success border border-success/20'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        {saved ? <><Icon name="Check" size={14} />Saved!</> : <>Save {section}</>}
      </button>
    </div>
  );
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function SchoolProfile() {
  return (
    <div className="space-y-5">
      <SectionCard title="Basic Information" desc="Core details displayed across the platform and on official documents">
        <FieldRow label="School Name" hint="Official registered name">
          <Input value="Greenwood Academy" />
        </FieldRow>
        <FieldRow label="Tagline / Motto" hint="Shown under the school name">
          <Input value="Nurturing Excellence Since 1995" />
        </FieldRow>
        <FieldRow label="Affiliation Board">
          <Select value="CBSE" options={['CBSE', 'ICSE', 'IB', 'State Board', 'IGCSE']} />
        </FieldRow>
        <FieldRow label="Affiliation No.">
          <Input value="531-0024-A" />
        </FieldRow>
        <FieldRow label="School Type">
          <Select value="Co-educational" options={['Co-educational', "Boys' School", "Girls' School"]} />
        </FieldRow>
        <FieldRow label="Grade Range">
          <div className="flex gap-2">
            <Select value="Grade 6" options={['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6']} />
            <span className="text-sm text-muted self-center">to</span>
            <Select value="Grade 12" options={['Grade 10','Grade 11','Grade 12']} />
          </div>
        </FieldRow>
        <SaveBar section="Profile" />
      </SectionCard>

      <SectionCard title="Contact & Address" desc="Displayed on the public website and official correspondence">
        <FieldRow label="Email Address">
          <Input value="admin@greenwoodacademy.edu.in" type="email" />
        </FieldRow>
        <FieldRow label="Phone">
          <Input value="+91 98765 43210" type="tel" />
        </FieldRow>
        <FieldRow label="Website">
          <Input value="https://greenwoodacademy.edu.in" />
        </FieldRow>
        <FieldRow label="Address">
          <Textarea value="Plot 14, Sector 21, Dwarka, New Delhi — 110077" rows={2} />
        </FieldRow>
        <FieldRow label="City / State">
          <div className="flex gap-2">
            <Input value="New Delhi" />
            <Input value="Delhi" />
          </div>
        </FieldRow>
        <FieldRow label="PIN Code">
          <Input value="110077" />
        </FieldRow>
        <SaveBar section="Contact" />
      </SectionCard>

      <SectionCard title="School Logo & Branding" desc="Upload your school logo. Recommended size: 200×200px PNG with transparent background.">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-border/60 bg-background flex flex-col items-center justify-center text-muted cursor-pointer hover:border-primary/40 transition-colors">
            <Icon name="ImagePlus" size={22} className="mb-1" />
            <span className="text-2xs">Upload</span>
          </div>
          <div>
            <p className="text-xs font-700 text-foreground mb-1">Current Logo</p>
            <p className="text-xs text-muted">logo_greenwood.png · 48 KB</p>
            <div className="flex gap-2 mt-2">
              <button className="text-xs font-700 text-primary hover:text-primary/70 transition-colors">Replace</button>
              <span className="text-border/60">·</span>
              <button className="text-xs font-700 text-error hover:text-error/70 transition-colors">Remove</button>
            </div>
          </div>
        </div>
        <SaveBar section="Logo" />
      </SectionCard>
    </div>
  );
}

function AcademicYear() {
  const terms = [
    { name: 'Term 1', start: 'Apr 1, 2026', end: 'Sep 30, 2026', exams: 'Jul 15 – Jul 25, 2026',  status: 'Active'   },
    { name: 'Term 2', start: 'Oct 1, 2026', end: 'Mar 31, 2027', exams: 'Mar 1 – Mar 15, 2027',   status: 'Upcoming' },
  ];
  const holidays = [
    { name: "Republic Day",           date: 'Jan 26, 2026', type: 'National'   },
    { name: "Holi",                   date: 'Mar 14, 2026', type: 'Festival'   },
    { name: "Dr. Ambedkar Jayanti",   date: 'Apr 14, 2026', type: 'National'   },
    { name: "Summer Vacation Start",  date: 'May 25, 2026', type: 'School'     },
    { name: "Independence Day",       date: 'Aug 15, 2026', type: 'National'   },
    { name: "Gandhi Jayanti",         date: 'Oct 2, 2026',  type: 'National'   },
    { name: "Diwali Break",           date: 'Oct 20–24, 2026', type: 'Festival' },
    { name: "Winter Vacation Start",  date: 'Dec 25, 2026', type: 'School'     },
  ];

  const typeColor: Record<string, string> = {
    National: 'bg-primary/8 text-primary',
    Festival: 'bg-purple-50 text-purple-700',
    School:   'bg-amber-50 text-amber-700',
  };

  return (
    <div className="space-y-5">
      <SectionCard title="Current Academic Session" desc="The session is used to scope all student records, fees, and reports">
        <FieldRow label="Session Name">
          <Input value="2026–27" />
        </FieldRow>
        <FieldRow label="Session Start">
          <Input value="2026-04-01" type="date" />
        </FieldRow>
        <FieldRow label="Session End">
          <Input value="2027-03-31" type="date" />
        </FieldRow>
        <FieldRow label="Working Days / Week">
          <Select value="5 days (Mon – Fri)" options={['5 days (Mon – Fri)', '6 days (Mon – Sat)']} />
        </FieldRow>
        <FieldRow label="School Hours">
          <div className="flex gap-2">
            <Input value="08:00 AM" type="time" />
            <span className="text-sm text-muted self-center">to</span>
            <Input value="02:30 PM" type="time" />
          </div>
        </FieldRow>
        <SaveBar section="Session" />
      </SectionCard>

      <SectionCard title="Terms / Semesters" desc="Define the academic terms and their examination windows">
        <div className="space-y-3">
          {terms.map(t => (
            <div key={t.name} className="flex items-start justify-between gap-3 p-3 bg-background rounded-xl border border-border/60">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <Icon name="BookOpen" size={15} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-700 text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.start} – {t.end}</p>
                  <p className="text-2xs text-muted mt-0.5">Exams: {t.exams}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-2xs font-700 ${
                  t.status === 'Active' ? 'bg-success/8 text-success' : 'bg-border/40 text-muted'
                }`}>
                  {t.status}
                </span>
                <button className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-border/20 transition-colors">
                  <Icon name="Edit" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm font-700 text-primary hover:text-primary/70 transition-colors">
          <Icon name="Plus" size={14} />
          Add Term
        </button>
      </SectionCard>

      <SectionCard title="Public Holidays & School Closures" desc="These days are excluded from attendance calculations">
        <div className="divide-y divide-border/40">
          {holidays.map(h => (
            <div key={h.name} className="flex items-center justify-between py-2.5 gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className={`px-2 py-0.5 rounded-full text-2xs font-700 flex-shrink-0 ${typeColor[h.type]}`}>
                  {h.type}
                </span>
                <span className="text-sm text-foreground font-700 truncate">{h.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-muted">{h.date}</span>
                <button className="p-1 text-muted hover:text-error rounded transition-colors">
                  <Icon name="Trash2" size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm font-700 text-primary hover:text-primary/70 transition-colors pt-1">
          <Icon name="Plus" size={14} />
          Add Holiday
        </button>
      </SectionCard>
    </div>
  );
}

function Notifications() {
  return (
    <div className="space-y-5">
      <SectionCard title="Email Notifications" desc="Control which events trigger email notifications to parents, teachers, and staff">
        <div className="space-y-3">
          {[
            { label: 'New notice published',              desc: 'Notify all relevant audiences when a notice is published',          defaultOn: true  },
            { label: 'Attendance marked',                 desc: 'Daily attendance summary email to parents',                         defaultOn: true  },
            { label: 'Fee payment reminder',              desc: 'Send reminders 7 days and 1 day before due date',                   defaultOn: true  },
            { label: 'Exam schedule released',            desc: 'Notify students and parents when a new exam is scheduled',          defaultOn: true  },
            { label: 'Result published',                  desc: 'Email results to students and parents after marksheet approval',    defaultOn: false },
            { label: 'Assignment created',                desc: 'Notify students when a new assignment is added',                    defaultOn: true  },
            { label: 'Low attendance alert',              desc: 'Alert parents when attendance falls below the threshold',           defaultOn: true  },
          ].map(item => (
            <Toggle key={item.label} label={item.label} desc={item.desc} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="Email Settings" />
      </SectionCard>

      <SectionCard title="SMS Notifications" desc="SMS credits are consumed per message. Current balance: 4,820 credits">
        <FieldRow label="SMS Provider">
          <Select value="Textlocal" options={['Textlocal', 'MSG91', 'Twilio', 'Fast2SMS', 'Custom']} />
        </FieldRow>
        <FieldRow label="Sender ID">
          <Input value="GRNWOD" />
        </FieldRow>
        <div className="space-y-3 pt-1">
          {[
            { label: 'Fee due reminder via SMS',    desc: 'SMS 3 days before due date',           defaultOn: true  },
            { label: 'Exam result via SMS',         desc: 'Send grade summary after result day',  defaultOn: false },
            { label: 'Absent day alert via SMS',    desc: 'SMS to parent on same-day absence',    defaultOn: true  },
          ].map(item => (
            <Toggle key={item.label} label={item.label} desc={item.desc} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="SMS Settings" />
      </SectionCard>

      <SectionCard title="In-App & Push Notifications" desc="Control dashboard bell notifications and mobile push alerts">
        <div className="space-y-3">
          {[
            { label: 'New notice in dashboard',          defaultOn: true  },
            { label: 'Assignment submission alerts',     defaultOn: true  },
            { label: 'Payment received confirmation',    defaultOn: true  },
            { label: 'Teacher login/logout activity',    defaultOn: false },
            { label: 'System maintenance alerts',        defaultOn: true  },
          ].map(item => (
            <Toggle key={item.label} label={item.label} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="Push Settings" />
      </SectionCard>
    </div>
  );
}

function RolesAccess() {
  const roles = [
    { name: 'Principal',         perms: ['All permissions'],                                                           count: 1,  color: 'bg-amber-100 text-amber-700'    },
    { name: 'Vice Principal',    perms: ['View all', 'Edit academics', 'Manage notices'],                              count: 1,  color: 'bg-purple-50 text-purple-700'   },
    { name: 'Head of Dept.',     perms: ['View dept.', 'Manage teachers', 'View reports'],                             count: 8,  color: 'bg-primary/8 text-primary'      },
    { name: 'Class Teacher',     perms: ['Mark attendance', 'View own class', 'Grade assignments'],                    count: 24, color: 'bg-accent/8 text-accent'        },
    { name: 'Subject Teacher',   perms: ['View own classes', 'Assign work', 'Grade assignments'],                      count: 45, color: 'bg-success/8 text-success'      },
    { name: 'Accounts Staff',    perms: ['View fees', 'Record payments', 'Generate fee reports'],                      count: 3,  color: 'bg-warning/8 text-warning'      },
    { name: 'Admin Staff',       perms: ['Manage notices', 'View attendance', 'View reports'],                         count: 5,  color: 'bg-border/40 text-muted'        },
    { name: 'Student',           perms: ['View own data only'],                                                        count: 620, color: 'bg-border/40 text-muted'       },
    { name: 'Parent',            perms: ['View child data', 'Pay fees', 'View notices'],                               count: 580, color: 'bg-border/40 text-muted'       },
  ];

  return (
    <div className="space-y-5">
      <SectionCard title="Roles Overview" desc="Each role has a fixed set of permissions. Custom roles can be added for special assignments.">
        <div className="space-y-2">
          {roles.map(r => (
            <div key={r.name} className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border/60">
              <div className={`px-2.5 py-1 rounded-lg text-xs font-700 flex-shrink-0 ${r.color}`}>
                {r.name}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-1">
                  {r.perms.map(p => (
                    <span key={p} className="text-2xs text-muted bg-border/30 rounded px-1.5 py-0.5">{p}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-muted">{r.count} {r.count === 1 ? 'user' : 'users'}</span>
                <button className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-border/20 transition-colors">
                  <Icon name="Edit" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm font-700 text-primary hover:text-primary/70 transition-colors">
          <Icon name="Plus" size={14} />
          Add Custom Role
        </button>
      </SectionCard>

      <SectionCard title="Admin Access Log" desc="Recent logins and permission changes by admin-level users">
        <div className="divide-y divide-border/40">
          {[
            { user: 'Mrs. Anita Sharma',  action: 'Published exam schedule',         time: 'Today, 10:32 AM',   icon: 'FileText'  },
            { user: 'Mrs. Rekha Arora',   action: 'Recorded 3 fee payments',          time: 'Today, 9:15 AM',    icon: 'IndianRupee' },
            { user: 'Mr. Suresh Kumar',   action: 'Updated teacher role permissions', time: 'Yesterday, 4:00 PM', icon: 'ShieldCheck' },
            { user: 'Mrs. Anita Sharma',  action: 'Created new notice (PTM)',          time: 'Mar 31, 3:20 PM',   icon: 'Megaphone' },
            { user: 'Mrs. Lata Bose',     action: 'Exported attendance report',        time: 'Mar 30, 11:45 AM',  icon: 'Download'  },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                <Icon name={log.icon} size={13} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-700 text-foreground truncate">{log.action}</p>
                <p className="text-2xs text-muted">{log.user}</p>
              </div>
              <span className="text-2xs text-muted flex-shrink-0">{log.time}</span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function Security() {
  return (
    <div className="space-y-5">
      <SectionCard title="Password Policy" desc="Applies to all staff and admin accounts across the platform">
        <FieldRow label="Minimum Length">
          <Select value="8 characters" options={['6 characters', '8 characters', '10 characters', '12 characters']} />
        </FieldRow>
        <FieldRow label="Password Expiry">
          <Select value="90 days" options={['Never', '30 days', '60 days', '90 days', '180 days']} />
        </FieldRow>
        <div className="space-y-3 pt-1">
          {[
            { label: 'Require uppercase letter',               defaultOn: true  },
            { label: 'Require number',                         defaultOn: true  },
            { label: 'Require special character (!@#…)',       defaultOn: false },
            { label: 'Prevent reuse of last 3 passwords',     defaultOn: true  },
          ].map(item => (
            <Toggle key={item.label} label={item.label} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="Password Policy" />
      </SectionCard>

      <SectionCard title="Two-Factor Authentication" desc="Add an extra layer of security for admin and staff accounts">
        <div className="space-y-3">
          {[
            { label: 'Require 2FA for Principal',      desc: 'All principal logins must verify via OTP',    defaultOn: true  },
            { label: 'Require 2FA for Admin Staff',    desc: 'All admin-role logins must verify via OTP',   defaultOn: false },
            { label: 'Allow 2FA via email OTP',        desc: 'Send one-time code to registered email',      defaultOn: true  },
            { label: 'Allow 2FA via SMS OTP',          desc: 'Send one-time code to registered phone',      defaultOn: false },
          ].map(item => (
            <Toggle key={item.label} label={item.label} desc={item.desc} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="2FA Settings" />
      </SectionCard>

      <SectionCard title="Session Management" desc="Control how long users remain logged in across devices">
        <FieldRow label="Session Timeout">
          <Select value="8 hours" options={['1 hour', '4 hours', '8 hours', '24 hours', 'Never']} />
        </FieldRow>
        <FieldRow label="Max Active Sessions">
          <Select value="3 devices" options={['1 device', '2 devices', '3 devices', '5 devices', 'Unlimited']} />
        </FieldRow>
        <div className="space-y-3 pt-1">
          {[
            { label: 'Auto-logout on idle (15 min)',    defaultOn: true  },
            { label: 'Log all login attempts',          defaultOn: true  },
            { label: 'Block login after 5 failures',   defaultOn: true  },
          ].map(item => (
            <Toggle key={item.label} label={item.label} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="Session Settings" />
      </SectionCard>

      <SectionCard title="Data & Privacy" desc="Control data retention and DPDP Act compliance settings">
        <FieldRow label="Data Retention Period">
          <Select value="5 years" options={['1 year', '3 years', '5 years', '7 years', 'Indefinite']} />
        </FieldRow>
        <div className="space-y-3 pt-1">
          {[
            { label: 'Enable audit trail for all changes',    defaultOn: true  },
            { label: 'Allow data export by students/parents', defaultOn: false },
            { label: 'Anonymise data after retention period', defaultOn: true  },
          ].map(item => (
            <Toggle key={item.label} label={item.label} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="Privacy Settings" />
      </SectionCard>
    </div>
  );
}

function Appearance() {
  const [accentColor, setAccentColor] = useState('#6366F1');
  const colors = ['#6366F1', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-5">
      <SectionCard title="Theme & Colors" desc="Customise the dashboard accent colour and overall look">
        <FieldRow label="Accent Color" hint="Used for buttons, links, and active states">
          <div className="flex items-center gap-2 flex-wrap">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setAccentColor(c)}
                className={`w-8 h-8 rounded-xl transition-all ${accentColor === c ? 'ring-2 ring-offset-2 ring-foreground/30 scale-110' : 'hover:scale-105'}`}
                style={{ backgroundColor: c }}
              />
            ))}
            <div className="relative">
              <input
                type="color"
                value={accentColor}
                onChange={e => setAccentColor(e.target.value)}
                className="w-8 h-8 rounded-xl cursor-pointer border border-border/60 overflow-hidden"
              />
            </div>
          </div>
        </FieldRow>
        <FieldRow label="Default Theme">
          <div className="flex gap-2">
            {[
              { label: 'Light',  icon: 'Sun'  },
              { label: 'Dark',   icon: 'Moon' },
              { label: 'System', icon: 'Monitor' },
            ].map(t => (
              <button
                key={t.label}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-700 border transition-all ${
                  t.label === 'Light'
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-background text-muted border-border/60 hover:text-foreground'
                }`}
              >
                <Icon name={t.icon} size={14} />
                {t.label}
              </button>
            ))}
          </div>
        </FieldRow>
        <SaveBar section="Theme" />
      </SectionCard>

      <SectionCard title="Dashboard Layout" desc="Customise the default layout for the principal's dashboard">
        <div className="space-y-3">
          {[
            { label: 'Show quick stats row on dashboard home',       defaultOn: true  },
            { label: 'Show recent activity feed on dashboard',       defaultOn: true  },
            { label: 'Show pending actions panel',                   defaultOn: true  },
            { label: 'Collapse sidebar by default on mobile',        defaultOn: true  },
            { label: 'Show student photo in rosters',                defaultOn: false },
          ].map(item => (
            <Toggle key={item.label} label={item.label} defaultOn={item.defaultOn} />
          ))}
        </div>
        <SaveBar section="Layout" />
      </SectionCard>

      <SectionCard title="Date, Time & Language" desc="Localisation settings for how dates and numbers are displayed">
        <FieldRow label="Date Format">
          <Select value="DD MMM YYYY (e.g., 01 Apr 2026)" options={['DD MMM YYYY (e.g., 01 Apr 2026)', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY']} />
        </FieldRow>
        <FieldRow label="Time Format">
          <Select value="12-hour (AM/PM)" options={['12-hour (AM/PM)', '24-hour']} />
        </FieldRow>
        <FieldRow label="Language">
          <Select value="English (India)" options={['English (India)', 'English (UK)', 'English (US)', 'Hindi', 'Bengali', 'Tamil']} />
        </FieldRow>
        <FieldRow label="Currency">
          <Select value="INR (₹)" options={['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)']} />
        </FieldRow>
        <SaveBar section="Localisation" />
      </SectionCard>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('school');
  const activeTabDef = TABS.find(t => t.id === activeTab)!;

  const panels: Record<SettingsTab, React.ReactNode> = {
    school:        <SchoolProfile />,
    academic:      <AcademicYear />,
    notifications: <Notifications />,
    roles:         <RolesAccess />,
    security:      <Security />,
    appearance:    <Appearance />,
  };

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Settings</h1>
          <p className="text-sm text-muted mt-0.5">Configure school preferences, security, and integrations</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-xl">
          <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Icon name="Building2" size={13} className="text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-700 text-foreground">Greenwood Academy</p>
            <p className="text-2xs text-muted">CBSE · New Delhi</p>
          </div>
        </div>
      </div>

      {/* ── Two-column layout: sidebar nav + content ─────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-5">

        {/* ── Left nav ─────────────────────────────────────────────────── */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-2 lg:sticky lg:top-4">
            <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all w-full flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-primary/8 text-primary border border-primary/20'
                      : 'text-muted hover:text-foreground hover:bg-background'
                  }`}
                >
                  <Icon name={tab.icon} size={16} className="flex-shrink-0" />
                  <div className="min-w-0 hidden lg:block">
                    <p className="text-xs font-700 truncate">{tab.label}</p>
                  </div>
                  <span className="text-xs font-700 truncate lg:hidden">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right content ────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-1">
          {/* Active section header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
              <Icon name={activeTabDef.icon} size={15} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-800 text-foreground font-display">{activeTabDef.label}</p>
              <p className="text-xs text-muted">{activeTabDef.desc}</p>
            </div>
          </div>
          {panels[activeTab]}
        </div>
      </div>

    </div>
  );
}
