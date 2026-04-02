'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

// ─── Types ────────────────────────────────────────────────────────────────────
type SchoolStatus = 'active' | 'suspended' | 'trial';
type BoardType = 'CBSE' | 'ICSE' | 'State Board' | 'IB' | 'Cambridge';

interface School {
  id: number;
  name: string;
  code: string;
  city: string;
  state: string;
  board: BoardType;
  status: SchoolStatus;
  principal: string;
  principalEmail: string;
  students: number;
  teachers: number;
  established: string;
  subscription: 'basic' | 'pro' | 'enterprise';
  lastActive: string;
  email: string;
  phone: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const SCHOOLS: School[] = [
  {
    id: 1,
    name: 'Greenwood Academy',
    code: 'GWA-001',
    city: 'Mumbai',
    state: 'Maharashtra',
    board: 'CBSE',
    status: 'active',
    principal: 'Anita Sharma',
    principalEmail: 'principal@demo.com',
    students: 620,
    teachers: 38,
    established: 'Mar 1, 2024',
    subscription: 'enterprise',
    lastActive: 'Just now',
    email: 'info@greenwood.edu.in',
    phone: '+91 22 4001 9900',
  },
  {
    id: 2,
    name: 'Sunrise International School',
    code: 'SIS-002',
    city: 'Pune',
    state: 'Maharashtra',
    board: 'ICSE',
    status: 'active',
    principal: 'Ramesh Pillai',
    principalEmail: 'principal@sunrise.edu',
    students: 480,
    teachers: 30,
    established: 'Jun 15, 2024',
    subscription: 'pro',
    lastActive: '2 hours ago',
    email: 'admin@sunrise.edu',
    phone: '+91 20 2601 4400',
  },
  {
    id: 3,
    name: 'Lotus Public School',
    code: 'LPS-003',
    city: 'Bangalore',
    state: 'Karnataka',
    board: 'State Board',
    status: 'trial',
    principal: 'Nandita Rao',
    principalEmail: 'nandita.r@lotus.school',
    students: 120,
    teachers: 14,
    established: 'Feb 1, 2026',
    subscription: 'basic',
    lastActive: 'Yesterday',
    email: 'contact@lotus.school',
    phone: '+91 80 3901 5500',
  },
  {
    id: 4,
    name: 'Springfield High School',
    code: 'SHS-004',
    city: 'Delhi',
    state: 'Delhi',
    board: 'Cambridge',
    status: 'suspended',
    principal: 'Arvind Mehta',
    principalEmail: 'arvind.m@springfield.edu',
    students: 310,
    teachers: 22,
    established: 'Sep 1, 2024',
    subscription: 'pro',
    lastActive: '18 days ago',
    email: 'info@springfield.edu',
    phone: '+91 11 4501 6600',
  },
];

const STATUS_CONFIG: Record<SchoolStatus, { bg: string; text: string; dot: string; label: string }> = {
  active:    { bg: 'bg-success/8',   text: 'text-success',    dot: 'bg-success',    label: 'Active'    },
  suspended: { bg: 'bg-danger/8',    text: 'text-danger',     dot: 'bg-danger',     label: 'Suspended' },
  trial:     { bg: 'bg-warning/10',  text: 'text-warning',    dot: 'bg-warning',    label: 'Trial'     },
};

const SUB_CONFIG: Record<string, { bg: string; text: string }> = {
  basic:      { bg: 'bg-border/40',   text: 'text-muted'        },
  pro:        { bg: 'bg-primary/8',   text: 'text-primary'      },
  enterprise: { bg: 'bg-rose-50',     text: 'text-rose-600'     },
};

const BOARDS: BoardType[] = ['CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'];

const EMPTY_FORM = {
  name: '', code: '', city: '', state: '', board: 'CBSE' as BoardType,
  status: 'active' as SchoolStatus, principal: '', principalEmail: '',
  email: '', phone: '', subscription: 'basic' as School['subscription'],
};

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function SchoolDetailPanel({ school, onClose, onEdit, onToggleStatus }: {
  school: School;
  onClose: () => void;
  onEdit: () => void;
  onToggleStatus: () => void;
}) {
  const st = STATUS_CONFIG[school.status];
  const sb = SUB_CONFIG[school.subscription];
  return (
    <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-border/60 shadow-card max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-start justify-between px-6 pt-5 pb-4 border-b border-border/40 rounded-t-3xl sm:rounded-t-2xl">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center flex-shrink-0">
              <Icon name="School" size={22} className="text-rose-500" />
            </div>
            <div>
              <h3 className="font-display text-base font-800 text-foreground leading-tight">{school.name}</h3>
              <p className="text-xs text-muted mt-0.5">{school.code} · {school.city}, {school.state}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground p-1 flex-shrink-0"><Icon name="X" size={16} /></button>
        </div>

        <div className="p-6 space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-700 ${st.bg} ${st.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />{st.label}
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-700 capitalize ${sb.bg} ${sb.text}`}>{school.subscription}</span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-700 bg-border/30 text-muted">{school.board}</span>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: 'GraduationCap', label: 'Students', value: school.students },
              { icon: 'BookOpen',      label: 'Teachers',  value: school.teachers },
              { icon: 'Calendar',      label: 'Est.',      value: school.established.split(',')[0] },
            ].map(s => (
              <div key={s.label} className="bg-background rounded-xl border border-border/60 p-3 text-center">
                <Icon name={s.icon} size={16} className="text-muted mx-auto mb-1" />
                <div className="font-display text-lg font-800 text-foreground">{s.value}</div>
                <div className="text-2xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div className="bg-background rounded-xl border border-border/60 p-4 space-y-2.5">
            <div className="text-xs font-700 text-muted uppercase tracking-wide">Contact Information</div>
            {[
              { icon: 'Mail',  label: 'Email',  val: school.email },
              { icon: 'Phone', label: 'Phone',  val: school.phone },
              { icon: 'User',  label: 'Principal', val: `${school.principal} (${school.principalEmail})` },
            ].map(r => (
              <div key={r.label} className="flex items-center gap-2.5 text-sm">
                <Icon name={r.icon} size={14} className="text-muted flex-shrink-0" />
                <span className="text-muted min-w-[60px] text-xs">{r.label}</span>
                <span className="text-foreground font-700 text-xs truncate">{r.val}</span>
              </div>
            ))}
          </div>

          {/* Last active */}
          <div className="flex items-center gap-2 text-xs text-muted">
            <Icon name="Clock" size={13} />
            Last active: <span className="text-foreground font-700">{school.lastActive}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={onEdit}
              className="flex-1 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Pencil" size={14} />Edit School
            </button>
            <button
              onClick={onToggleStatus}
              className={`flex-1 py-2.5 text-sm font-700 rounded-xl transition-colors border flex items-center justify-center gap-2 ${
                school.status === 'active'
                  ? 'border-danger/30 bg-danger/5 text-danger hover:bg-danger/10'
                  : 'border-success/30 bg-success/5 text-success hover:bg-success/10'
              }`}
            >
              <Icon name={school.status === 'active' ? 'PauseCircle' : 'PlayCircle'} size={14} />
              {school.status === 'active' ? 'Suspend' : 'Activate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Add/Edit Modal ───────────────────────────────────────────────────────────
function SchoolFormModal({ mode, initial, onClose, onSave }: {
  mode: 'add' | 'edit';
  initial: typeof EMPTY_FORM;
  onClose: () => void;
  onSave: (data: typeof EMPTY_FORM) => void;
}) {
  const [form, setForm] = useState({ ...initial });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl border border-border/60 shadow-card max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/40 rounded-t-3xl sm:rounded-t-2xl">
          <div>
            <h3 className="font-display text-base font-800 text-foreground">{mode === 'add' ? 'Add New School' : 'Edit School'}</h3>
            <p className="text-xs text-muted mt-0.5">{mode === 'add' ? 'Register a new school on the platform' : 'Update school details'}</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-foreground p-1"><Icon name="X" size={16} /></button>
        </div>

        <div className="p-6 space-y-4">
          {/* School name & code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">School Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="e.g. Greenwood Academy"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">School Code *</label>
              <input value={form.code} onChange={e => set('code', e.target.value.toUpperCase())}
                placeholder="e.g. GWA-001"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">City *</label>
              <input value={form.city} onChange={e => set('city', e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">State *</label>
              <input value={form.state} onChange={e => set('state', e.target.value)}
                placeholder="e.g. Maharashtra"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
          </div>

          {/* Board & Subscription */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Board *</label>
              <select value={form.board} onChange={e => set('board', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400">
                {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Subscription Plan *</label>
              <select value={form.subscription} onChange={e => set('subscription', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400">
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Principal name & email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Principal Name *</label>
              <input value={form.principal} onChange={e => set('principal', e.target.value)}
                placeholder="e.g. Anita Sharma"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Principal Email *</label>
              <input value={form.principalEmail} onChange={e => set('principalEmail', e.target.value)}
                type="email" placeholder="principal@school.in"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
          </div>

          {/* Contact email & phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">School Email</label>
              <input value={form.email} onChange={e => set('email', e.target.value)}
                type="email" placeholder="info@school.edu.in"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
            <div>
              <label className="block text-xs font-700 text-foreground mb-1.5">Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)}
                placeholder="+91 22 4001 9900"
                className="w-full px-3 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-700 text-foreground mb-1.5">Initial Status</label>
            <div className="flex gap-2">
              {(['active', 'trial', 'suspended'] as SchoolStatus[]).map(s => (
                <button key={s} onClick={() => set('status', s)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-700 capitalize transition-all ${
                    form.status === s
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-background text-muted border-border/60 hover:text-foreground'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-2">
          <button onClick={onClose}
            className="flex-1 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">
            Cancel
          </button>
          <button onClick={() => onSave(form)}
            className="flex-1 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors">
            {mode === 'add' ? 'Add School' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────
function DeleteModal({ school, onClose, onConfirm }: { school: School; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-border/60 shadow-card w-full max-w-sm p-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-danger/8 flex items-center justify-center mx-auto mb-4">
          <Icon name="Trash2" size={24} className="text-danger" />
        </div>
        <h3 className="font-display text-base font-800 text-foreground mb-2">Remove School?</h3>
        <p className="text-sm text-muted mb-1">This will permanently remove <strong className="text-foreground">{school.name}</strong> and all associated data.</p>
        <p className="text-xs text-danger font-700 mb-5">⚠ This action cannot be undone.</p>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 bg-background border border-border/60 text-sm font-700 text-foreground rounded-xl hover:bg-border/20 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 bg-danger text-white text-sm font-700 rounded-xl hover:bg-red-700 transition-colors">Remove</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SuperAdminSchools() {
  const [schools, setSchools] = useState<School[]>(SCHOOLS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<SchoolStatus | 'all'>('all');
  const [boardFilter, setBoardFilter] = useState<BoardType | 'all'>('all');
  const [viewSchool, setViewSchool] = useState<School | null>(null);
  const [modal, setModal] = useState<'add' | 'edit' | 'delete' | null>(null);
  const [editTarget, setEditTarget] = useState<School | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<School | null>(null);

  const filtered = useMemo(() => {
    return schools.filter(s => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchBoard  = boardFilter === 'all' || s.board === boardFilter;
      return matchSearch && matchStatus && matchBoard;
    });
  }, [schools, search, statusFilter, boardFilter]);

  const openEdit = (s: School) => {
    setEditTarget(s);
    setModal('edit');
    setViewSchool(null);
  };
  const openDelete = (s: School) => {
    setDeleteTarget(s);
    setModal('delete');
    setViewSchool(null);
  };
  const toggleStatus = (s: School) => {
    setSchools(prev => prev.map(sc =>
      sc.id === s.id
        ? { ...sc, status: sc.status === 'active' ? 'suspended' : 'active' }
        : sc
    ));
    setViewSchool(null);
  };

  // Summary numbers
  const total      = schools.length;
  const active     = schools.filter(s => s.status === 'active').length;
  const suspended  = schools.filter(s => s.status === 'suspended').length;
  const trial      = schools.filter(s => s.status === 'trial').length;
  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
  const totalTeachers = schools.reduce((sum, s) => sum + s.teachers, 0);

  return (
    <div className="p-4 lg:p-6 space-y-5">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-800 text-foreground">Schools</h1>
          <p className="text-sm text-muted mt-0.5">Manage all registered schools and their configurations</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setModal('add'); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-rose-500 text-white text-sm font-700 rounded-xl hover:bg-rose-600 transition-colors shadow-soft self-start sm:self-auto"
        >
          <Icon name="Plus" size={15} />
          Add School
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Schools',  value: total,         icon: 'Building2',       bg: 'bg-rose-50',     color: 'text-rose-500'   },
          { label: 'Active',         value: active,        icon: 'CheckCircle2',    bg: 'bg-success/8',   color: 'text-success'    },
          { label: 'Trial',          value: trial,         icon: 'Clock',           bg: 'bg-warning/10',  color: 'text-warning'    },
          { label: 'Suspended',      value: suspended,     icon: 'PauseCircle',     bg: 'bg-danger/8',    color: 'text-danger'     },
          { label: 'Total Students', value: totalStudents, icon: 'GraduationCap',   bg: 'bg-primary/8',   color: 'text-primary'    },
          { label: 'Total Teachers', value: totalTeachers, icon: 'BookOpen',        bg: 'bg-emerald-50',  color: 'text-emerald-600'},
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
              <Icon name={s.icon} size={16} className={s.color} />
            </div>
            <div>
              <div className="font-display text-lg font-800 text-foreground leading-tight">{s.value}</div>
              <div className="text-2xs text-muted leading-tight">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search schools by name, city or code..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(['all', 'active', 'trial', 'suspended'] as const).map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-700 capitalize transition-all ${
                  statusFilter === f
                    ? 'bg-rose-500 text-white'
                    : 'bg-background border border-border/60 text-muted hover:text-foreground'
                }`}>
                {f === 'all' ? 'All Status' : f}
              </button>
            ))}
          </div>

          {/* Board filter */}
          <select value={boardFilter} onChange={e => setBoardFilter(e.target.value as BoardType | 'all')}
            className="px-3 py-2.5 rounded-xl border border-border/60 bg-background text-xs font-700 text-foreground focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400">
            <option value="all">All Boards</option>
            {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/40 bg-background/60">
                <th className="text-left px-5 py-3.5 text-xs font-700 text-muted uppercase tracking-wide">School</th>
                <th className="text-left px-4 py-3.5 text-xs font-700 text-muted uppercase tracking-wide hidden sm:table-cell">Location</th>
                <th className="text-left px-4 py-3.5 text-xs font-700 text-muted uppercase tracking-wide hidden md:table-cell">Board</th>
                <th className="text-left px-4 py-3.5 text-xs font-700 text-muted uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3.5 text-xs font-700 text-muted uppercase tracking-wide hidden lg:table-cell">Enrollment</th>
                <th className="text-left px-4 py-3.5 text-xs font-700 text-muted uppercase tracking-wide hidden lg:table-cell">Plan</th>
                <th className="text-left px-4 py-3.5 text-xs font-700 text-muted uppercase tracking-wide hidden xl:table-cell">Last Active</th>
                <th className="text-right px-5 py-3.5 text-xs font-700 text-muted uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted text-sm">
                    <Icon name="Building2" size={32} className="mx-auto mb-2 text-border" />
                    No schools found
                  </td>
                </tr>
              )}
              {filtered.map(s => {
                const st = STATUS_CONFIG[s.status];
                const sb = SUB_CONFIG[s.subscription];
                return (
                  <tr key={s.id} className="hover:bg-background/40 transition-colors group">
                    {/* School */}
                    <td className="px-5 py-4">
                      <button className="flex items-center gap-3 text-left group/link" onClick={() => setViewSchool(s)}>
                        <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                          <Icon name="School" size={16} className="text-rose-500" />
                        </div>
                        <div>
                          <div className="font-700 text-sm text-foreground group-hover/link:text-rose-600 transition-colors">{s.name}</div>
                          <div className="text-2xs text-muted">{s.code}</div>
                        </div>
                      </button>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <div className="text-sm text-foreground font-700">{s.city}</div>
                      <div className="text-2xs text-muted">{s.state}</div>
                    </td>

                    {/* Board */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-700 bg-border/30 text-muted">{s.board}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-700 w-fit ${st.bg} ${st.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />{st.label}
                      </span>
                    </td>

                    {/* Enrollment */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="text-sm text-foreground font-700">{s.students} <span className="text-muted font-400">students</span></div>
                      <div className="text-2xs text-muted">{s.teachers} teachers</div>
                    </td>

                    {/* Plan */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-700 capitalize ${sb.bg} ${sb.text}`}>{s.subscription}</span>
                    </td>

                    {/* Last active */}
                    <td className="px-4 py-4 hidden xl:table-cell text-xs text-muted">{s.lastActive}</td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewSchool(s)}
                          title="View details"
                          className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-primary/8 transition-colors"
                        >
                          <Icon name="Eye" size={14} />
                        </button>
                        <button
                          onClick={() => openEdit(s)}
                          title="Edit school"
                          className="p-1.5 rounded-lg text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Icon name="Pencil" size={14} />
                        </button>
                        <button
                          onClick={() => toggleStatus(s)}
                          title={s.status === 'active' ? 'Suspend' : 'Activate'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            s.status === 'active'
                              ? 'text-muted hover:text-warning hover:bg-warning/10'
                              : 'text-muted hover:text-success hover:bg-success/8'
                          }`}
                        >
                          <Icon name={s.status === 'active' ? 'PauseCircle' : 'PlayCircle'} size={14} />
                        </button>
                        <button
                          onClick={() => openDelete(s)}
                          title="Delete school"
                          className="p-1.5 rounded-lg text-muted hover:text-danger hover:bg-danger/8 transition-colors"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="px-5 py-3 border-t border-border/30 flex items-center justify-between bg-background/40">
          <span className="text-xs text-muted">{filtered.length} of {schools.length} school{schools.length !== 1 ? 's' : ''}</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-border/60 text-xs font-700 text-muted hover:text-foreground transition-colors disabled:opacity-40" disabled>
              Previous
            </button>
            <span className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-700">1</span>
            <button className="px-3 py-1.5 rounded-lg border border-border/60 text-xs font-700 text-muted hover:text-foreground transition-colors disabled:opacity-40" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {viewSchool && (
        <SchoolDetailPanel
          school={viewSchool}
          onClose={() => setViewSchool(null)}
          onEdit={() => openEdit(viewSchool)}
          onToggleStatus={() => toggleStatus(viewSchool)}
        />
      )}

      {(modal === 'add' || modal === 'edit') && (
        <SchoolFormModal
          mode={modal}
          initial={
            modal === 'edit' && editTarget
              ? {
                  name: editTarget.name, code: editTarget.code, city: editTarget.city,
                  state: editTarget.state, board: editTarget.board, status: editTarget.status,
                  principal: editTarget.principal, principalEmail: editTarget.principalEmail,
                  email: editTarget.email, phone: editTarget.phone, subscription: editTarget.subscription,
                }
              : EMPTY_FORM
          }
          onClose={() => { setModal(null); setEditTarget(null); }}
          onSave={(data) => {
            if (modal === 'add') {
              const newSchool: School = {
                ...data,
                id: Date.now(),
                students: 0,
                teachers: 0,
                established: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                lastActive: 'Never',
              };
              setSchools(prev => [newSchool, ...prev]);
            } else if (editTarget) {
              setSchools(prev => prev.map(s => s.id === editTarget.id ? { ...s, ...data } : s));
            }
            setModal(null);
            setEditTarget(null);
          }}
        />
      )}

      {modal === 'delete' && deleteTarget && (
        <DeleteModal
          school={deleteTarget}
          onClose={() => { setModal(null); setDeleteTarget(null); }}
          onConfirm={() => {
            setSchools(prev => prev.filter(s => s.id !== deleteTarget.id));
            setModal(null);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
