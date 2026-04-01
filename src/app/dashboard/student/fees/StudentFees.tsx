'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// ─── Types ──────────────────────────────────────────────────────────────────────
type PaymentStatus = 'paid' | 'pending' | 'overdue' | 'partial';
type PaymentMethod = 'Online' | 'Cheque' | 'Cash' | 'UPI';

interface FeeInstallment {
  id: number;
  term: string;
  description: string;
  amount: number;
  paid: number;
  dueDate: string;
  paidOn?: string;
  status: PaymentStatus;
  receiptNo?: string;
}

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  method: PaymentMethod;
  receiptNo: string;
  status: 'success' | 'processing';
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const installments: FeeInstallment[] = [
  {
    id: 1,
    term: 'Term 1',
    description: 'Tuition + Activity + Library',
    amount: 12000,
    paid: 12000,
    dueDate: 'Apr 10, 2025',
    paidOn: 'Apr 8, 2025',
    status: 'paid',
    receiptNo: 'RCP-2025-001',
  },
  {
    id: 2,
    term: 'Term 2',
    description: 'Tuition + Sports + Lab',
    amount: 12000,
    paid: 12000,
    dueDate: 'Sep 10, 2025',
    paidOn: 'Sep 7, 2025',
    status: 'paid',
    receiptNo: 'RCP-2025-042',
  },
  {
    id: 3,
    term: 'Term 3',
    description: 'Tuition + Exam + Miscellaneous',
    amount: 12000,
    paid: 6000,
    dueDate: 'Jan 10, 2026',
    paidOn: 'Jan 9, 2026',
    status: 'partial',
    receiptNo: 'RCP-2026-011',
  },
  {
    id: 4,
    term: 'Annual Charges',
    description: 'Development Fund + Building Fund',
    amount: 8000,
    paid: 8000,
    dueDate: 'Apr 15, 2025',
    paidOn: 'Apr 12, 2025',
    status: 'paid',
    receiptNo: 'RCP-2025-003',
  },
  {
    id: 5,
    term: 'Transport (Annual)',
    description: 'School Bus — Route B · Full Year',
    amount: 6000,
    paid: 6000,
    dueDate: 'Apr 20, 2025',
    paidOn: 'Apr 18, 2025',
    status: 'paid',
    receiptNo: 'RCP-2025-007',
  },
  {
    id: 6,
    term: 'Term 3 Balance',
    description: 'Remaining balance from Term 3',
    amount: 6000,
    paid: 0,
    dueDate: 'Apr 10, 2026',
    status: 'pending',
  },
  {
    id: 7,
    term: 'Exam Fee',
    description: 'Board Practical + Theory Exam Fee',
    amount: 2500,
    paid: 0,
    dueDate: 'Mar 25, 2026',
    status: 'overdue',
  },
];

const transactions: Transaction[] = [
  { id: 1, date: 'Jan 9, 2026',  description: 'Term 3 Partial Payment',      amount: 6000,  method: 'UPI',    receiptNo: 'RCP-2026-011', status: 'success'    },
  { id: 2, date: 'Sep 7, 2025',  description: 'Term 2 Fee',                  amount: 12000, method: 'Online', receiptNo: 'RCP-2025-042', status: 'success'    },
  { id: 3, date: 'Apr 18, 2025', description: 'Transport Fee (Annual)',       amount: 6000,  method: 'Cheque', receiptNo: 'RCP-2025-007', status: 'success'    },
  { id: 4, date: 'Apr 12, 2025', description: 'Annual Development Fund',     amount: 8000,  method: 'Online', receiptNo: 'RCP-2025-003', status: 'success'    },
  { id: 5, date: 'Apr 8, 2025',  description: 'Term 1 Fee',                  amount: 12000, method: 'UPI',    receiptNo: 'RCP-2025-001', status: 'success'    },
];

const feeBreakdown = [
  { name: 'Tuition',     amount: 28000, color: '#1C4ED8' },
  { name: 'Transport',   amount: 6000,  color: '#10B981' },
  { name: 'Activity',    amount: 2000,  color: '#0EA5E9' },
  { name: 'Development', amount: 8000,  color: '#8B5CF6' },
  { name: 'Lab & Sports',amount: 2000,  color: '#F59E0B' },
  { name: 'Exam',        amount: 2500,  color: '#EF4444' },
];

const totalFee      = installments.reduce((s, i) => s + i.amount, 0);
const totalPaid     = installments.reduce((s, i) => s + i.paid, 0);
const totalPending  = totalFee - totalPaid;
const paidPct       = Math.round((totalPaid / totalFee) * 100);

const tabs = ['Summary', 'Installments', 'Transactions'] as const;
type TabType = typeof tabs[number];

// ─── Helpers ────────────────────────────────────────────────────────────────────
const statusMeta: Record<PaymentStatus, { label: string; bg: string; text: string; dot: string }> = {
  paid:    { label: 'Paid',    bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' },
  pending: { label: 'Pending', bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' },
  overdue: { label: 'Overdue', bg: 'bg-danger/10',  text: 'text-danger',  dot: 'bg-danger'  },
  partial: { label: 'Partial', bg: 'bg-accent/10',  text: 'text-accent',  dot: 'bg-accent'  },
};

const methodMeta: Record<PaymentMethod, { bg: string; text: string }> = {
  Online: { bg: 'bg-primary/8',  text: 'text-primary'    },
  UPI:    { bg: 'bg-success/8',  text: 'text-success'    },
  Cheque: { bg: 'bg-accent/8',   text: 'text-accent'     },
  Cash:   { bg: 'bg-warning/8',  text: 'text-warning'    },
};

function StatusBadge({ status }: { status: PaymentStatus }) {
  const m = statusMeta[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-2xs font-700 px-2.5 py-1 rounded-full ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

// ─── Component ──────────────────────────────────────────────────────────────────
export default function StudentFees() {
  const [activeTab, setActiveTab] = useState<TabType>('Summary');

  const dueSoon = installments.filter((i) => i.status === 'pending' || i.status === 'overdue');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-foreground">Fee Details</h1>
          <p className="text-sm text-muted mt-0.5">Grade 10A · Greenwood Academy · Academic Year 2025–26</p>
        </div>
        {totalPending > 0 ? (
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 bg-danger/10 text-danger text-xs font-600 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
            {fmt(totalPending)} outstanding
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 bg-success/10 text-success text-xs font-600 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            All fees cleared
          </span>
        )}
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Fee',    value: fmt(totalFee),     sub: 'Annual 2025–26',      icon: 'BanknotesIcon',         color: '#1C4ED8', bg: 'bg-primary/8'  },
          { label: 'Paid',         value: fmt(totalPaid),    sub: `${paidPct}% of total`, icon: 'CheckCircleIcon',      color: '#10B981', bg: 'bg-success/8'  },
          { label: 'Outstanding',  value: fmt(totalPending), sub: 'Balance due',          icon: 'ExclamationCircleIcon', color: '#EF4444', bg: 'bg-danger/8'   },
          { label: 'Next Due',     value: 'Apr 10',          sub: fmt(6000) + ' pending', icon: 'CalendarDaysIcon',     color: '#F59E0B', bg: 'bg-warning/8'  },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-border/60 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon as 'BanknotesIcon'} size={18} style={{ color: s.color }} />
              </div>
            </div>
            <div className="font-display text-xl font-800 text-foreground leading-none">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
            <div className="text-2xs text-muted-light mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 bg-background border border-border/60 rounded-xl w-full sm:w-fit overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-600 transition-all ${
              activeTab === t
                ? 'bg-white text-primary shadow-soft border border-border/60'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════ SUMMARY ══════════════════════════════ */}
      {activeTab === 'Summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Payment progress */}
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft flex flex-col gap-5">
              <h3 className="font-display font-700 text-sm text-foreground">Payment Progress</h3>

              {/* Ring */}
              <div className="flex items-center justify-center">
                <div className="relative w-36 h-36">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke={paidPct >= 90 ? '#10B981' : paidPct >= 60 ? '#F59E0B' : '#EF4444'}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40 * paidPct / 100} ${2 * Math.PI * 40}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl font-800 text-foreground">{paidPct}%</span>
                    <span className="text-2xs text-muted">Paid</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Total Annual Fee', value: fmt(totalFee),    color: 'bg-primary/20'  },
                  { label: 'Paid',             value: fmt(totalPaid),   color: 'bg-success'     },
                  { label: 'Outstanding',      value: fmt(totalPending),color: 'bg-danger'      },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${r.color}`} />
                      <span className="text-muted">{r.label}</span>
                    </div>
                    <span className="font-700 text-foreground">{r.value}</span>
                  </div>
                ))}
              </div>

              {/* Overall bar */}
              <div>
                <div className="flex justify-between text-2xs text-muted mb-1.5">
                  <span>Paid</span><span>{fmt(totalPaid)} of {fmt(totalFee)}</span>
                </div>
                <div className="h-2.5 bg-border-light rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-success transition-all duration-700"
                    style={{ width: `${paidPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Fee breakdown chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-700 text-sm text-foreground">Fee Breakdown</h3>
                <span className="text-2xs text-muted">2025–26</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={feeBreakdown} barSize={28} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false}
                    tickFormatter={(v: number) => `₹${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}
                    formatter={(v: number) => [fmt(v), 'Amount']}
                  />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {feeBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border/40">
                {feeBreakdown.map((f) => (
                  <div key={f.name} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />
                    <span className="text-2xs text-muted">{f.name}</span>
                    <span className="text-2xs font-600 text-foreground">{fmt(f.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Due soon alerts */}
          {dueSoon.length > 0 && (
            <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
              <h3 className="font-display font-700 text-sm text-foreground mb-4">Action Required</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dueSoon.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${
                      item.status === 'overdue'
                        ? 'bg-danger/5 border-danger/20'
                        : 'bg-warning/5 border-warning/20'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      item.status === 'overdue' ? 'bg-danger/15' : 'bg-warning/15'
                    }`}>
                      <Icon
                        name={item.status === 'overdue' ? 'ExclamationTriangleIcon' : 'ClockIcon'}
                        size={18}
                        className={item.status === 'overdue' ? 'text-danger' : 'text-warning'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-700 text-foreground">{item.term}</span>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-2xs text-muted mt-0.5">{item.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-2xs text-muted">Due: <span className="font-600 text-foreground">{item.dueDate}</span></span>
                        <span className="text-xs font-800 text-foreground">{fmt(item.amount - item.paid)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full sm:w-auto px-6 py-2.5 bg-primary text-white text-xs font-700 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Icon name="CreditCardIcon" size={14} />
                Pay Outstanding Fees
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════ INSTALLMENTS ═════════════════════════════ */}
      {activeTab === 'Installments' && (
        <div className="space-y-4">

          {/* Progress header */}
          <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-700 text-foreground">Annual Fee Clearance</span>
              <span className="text-xs font-700 text-foreground">{fmt(totalPaid)} <span className="text-muted font-500">of {fmt(totalFee)}</span></span>
            </div>
            <div className="h-2.5 bg-border-light rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-success transition-all duration-700" style={{ width: `${paidPct}%` }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-2xs text-muted">{paidPct}% paid</span>
              <span className="text-2xs text-danger font-600">{fmt(totalPending)} remaining</span>
            </div>
          </div>

          {/* Installment cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {installments.map((item) => {
              const remaining = item.amount - item.paid;
              const itemPct   = Math.round((item.paid / item.amount) * 100);
              const sm        = statusMeta[item.status];
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border shadow-soft p-4 flex flex-col gap-3 ${
                    item.status === 'overdue' ? 'border-danger/25' : item.status === 'pending' ? 'border-warning/25' : 'border-border/60'
                  }`}
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-700 text-foreground">{item.term}</div>
                      <div className="text-2xs text-muted mt-0.5">{item.description}</div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="h-1.5 bg-border-light rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.status === 'paid' ? 'bg-success' : item.status === 'overdue' ? 'bg-danger' : 'bg-warning'
                        }`}
                        style={{ width: `${itemPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Amounts */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-background rounded-xl p-2.5 border border-border/50">
                      <div className="text-2xs text-muted-light">Total</div>
                      <div className="text-xs font-700 text-foreground mt-0.5">{fmt(item.amount)}</div>
                    </div>
                    <div className={`rounded-xl p-2.5 border ${remaining > 0 ? 'bg-danger/5 border-danger/15' : 'bg-success/5 border-success/15'}`}>
                      <div className="text-2xs text-muted-light">{remaining > 0 ? 'Balance' : 'Paid'}</div>
                      <div className={`text-xs font-700 mt-0.5 ${remaining > 0 ? 'text-danger' : 'text-success'}`}>
                        {remaining > 0 ? fmt(remaining) : fmt(item.amount)}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-border/40">
                    <div className="text-2xs text-muted">
                      Due: <span className="font-600 text-foreground">{item.dueDate}</span>
                    </div>
                    {item.paidOn && (
                      <div className="text-2xs text-muted">
                        Paid: <span className="font-600 text-success">{item.paidOn}</span>
                      </div>
                    )}
                  </div>

                  {/* Receipt / Pay */}
                  {item.receiptNo ? (
                    <button className="w-full py-2 rounded-xl bg-background border border-border/60 text-2xs font-700 text-muted hover:text-primary hover:border-primary/30 transition-colors flex items-center justify-center gap-1.5">
                      <Icon name="DocumentArrowDownIcon" size={12} />
                      {item.receiptNo}
                    </button>
                  ) : (
                    <button className={`w-full py-2 rounded-xl text-2xs font-700 text-white transition-colors flex items-center justify-center gap-1.5 ${
                      item.status === 'overdue' ? 'bg-danger hover:bg-danger/90' : 'bg-primary hover:bg-primary/90'
                    }`}>
                      <Icon name="CreditCardIcon" size={12} />
                      {item.status === 'overdue' ? 'Pay Now (Overdue)' : 'Pay Now'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════════════════════ TRANSACTIONS ════════════════════════════ */}
      {activeTab === 'Transactions' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
              <div>
                <h3 className="font-display font-700 text-sm text-foreground">Payment History</h3>
                <p className="text-2xs text-muted mt-0.5">{transactions.length} transactions · 2025–26</p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border/60 rounded-xl text-2xs font-600 text-muted hover:text-primary hover:border-primary/30 transition-colors">
                <Icon name="ArrowDownTrayIcon" size={13} />
                Export
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-xs">
                <thead>
                  <tr className="border-b border-border/40 bg-background">
                    {['Date', 'Description', 'Method', 'Amount', 'Receipt', 'Status'].map((h) => (
                      <th key={h} className="px-5 py-3 text-left text-2xs font-700 text-muted-light uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const mm = methodMeta[tx.method];
                    return (
                      <tr key={tx.id} className="border-b border-border/30 hover:bg-background/50 transition-colors">
                        <td className="px-5 py-3.5 text-muted whitespace-nowrap">{tx.date}</td>
                        <td className="px-5 py-3.5 font-600 text-foreground">{tx.description}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-2xs font-600 px-2 py-0.5 rounded-md ${mm.bg} ${mm.text}`}>{tx.method}</span>
                        </td>
                        <td className="px-5 py-3.5 font-800 text-foreground">{fmt(tx.amount)}</td>
                        <td className="px-5 py-3.5">
                          <button className="flex items-center gap-1 text-primary hover:text-primary/70 transition-colors">
                            <Icon name="DocumentArrowDownIcon" size={13} />
                            <span className="text-2xs font-600">{tx.receiptNo}</span>
                          </button>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1.5 text-2xs font-700 px-2.5 py-1 rounded-full bg-success/10 text-success">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" />
                            Success
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total paid summary */}
          <div className="bg-primary rounded-2xl p-5 text-white shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon name="BanknotesIcon" size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-600 opacity-70">Total Paid This Year</div>
                  <div className="font-display text-2xl font-800 mt-0.5">{fmt(totalPaid)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-70">Across {transactions.length} payments</div>
                <div className="text-sm font-700 mt-0.5 opacity-90">{paidPct}% cleared</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
