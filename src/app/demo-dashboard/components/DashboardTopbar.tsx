'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Props {
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardTopbar({ setSidebarOpen }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { text: 'Priya Sharma marked absent today', time: '5 min ago', type: 'warning' },
    { text: 'New fee payment: Rahul Verma - ₹12,000', time: '22 min ago', type: 'success' },
    { text: 'Exam schedule published for Grade 10', time: '1 hr ago', type: 'info' },
    { text: 'Parent portal: 3 new messages', time: '2 hrs ago', type: 'info' },
  ];

  return (
    <header className="h-16 bg-white border-b border-border/60 flex items-center gap-4 px-4 sm:px-6 flex-shrink-0 relative z-10">
      {/* Hamburger */}
      <button
        className="lg:hidden p-2 rounded-xl text-muted hover:bg-border-light transition-colors"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Icon name="Bars3Icon" size={20} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
          <input
            type="text"
            placeholder="Search students, teachers, fees..."
            className="w-full pl-9 pr-4 py-2 bg-background border border-border/60 rounded-xl text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notification bell */}
        <div className="relative">
          <button
            className="relative p-2.5 rounded-xl text-muted hover:bg-border-light hover:text-primary transition-colors"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
          >
            <Icon name="BellIcon" size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full animate-pulse" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-border/60 shadow-card z-50">
              <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                <span className="text-sm font-700 text-foreground">Notifications</span>
                <span className="text-2xs bg-primary/10 text-primary font-700 px-2 py-0.5 rounded-full">{notifications.length} new</span>
              </div>
              <div className="divide-y divide-border/40 max-h-72 overflow-y-auto">
                {notifications.map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-background transition-colors cursor-pointer">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                        n.type === 'warning' ? 'bg-warning' : n.type === 'success' ? 'bg-success' : 'bg-accent'
                      }`} />
                      <div>
                        <p className="text-xs text-foreground leading-relaxed">{n.text}</p>
                        <p className="text-2xs text-muted-light mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-border/50">
                <button className="text-xs text-primary font-medium hover:underline w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border hidden sm:block" />

        {/* Admin profile */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center font-700 font-display text-primary text-sm">
            RS
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-600 text-foreground leading-tight">Rajesh Sharma</div>
            <div className="text-2xs text-muted">Admin</div>
          </div>
          <Icon name="ChevronDownIcon" size={14} className="text-muted-light hidden sm:block group-hover:text-primary transition-colors" />
        </div>
      </div>
    </header>
  );
}