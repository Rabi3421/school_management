'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/context/AuthContext';

interface Props { setSidebarOpen: (v: boolean) => void; }

export default function StudentTopbar({ setSidebarOpen }: Props) {
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { text: 'Mathematics test results published', time: '10 min ago', type: 'success' },
    { text: 'Assignment due: Science project — Today', time: '1 hr ago', type: 'warning' },
    { text: 'Parent-Teacher Meeting on April 5', time: '2 hrs ago', type: 'info' },
  ];

  return (
    <header className="h-16 bg-white border-b border-border/60 flex items-center gap-4 px-4 sm:px-6 flex-shrink-0 relative z-10">
      <button className="lg:hidden p-2 rounded-xl text-muted hover:bg-border-light transition-colors" onClick={() => setSidebarOpen(true)}>
        <Icon name="Bars3Icon" size={20} />
      </button>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light pointer-events-none" />
          <input
            type="text"
            placeholder="Search subjects, assignments..."
            className="w-full pl-9 pr-4 py-2 bg-background border border-border/60 rounded-xl text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="relative">
          <button className="relative p-2.5 rounded-xl text-muted hover:bg-border-light hover:text-primary transition-colors" onClick={() => setNotifOpen(!notifOpen)}>
            <Icon name="BellIcon" size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full animate-pulse" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-border/60 shadow-card z-50">
              <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                <span className="text-sm font-700 text-foreground">Notifications</span>
                <span className="text-2xs bg-primary/10 text-primary font-700 px-2 py-0.5 rounded-full">{notifications.length} new</span>
              </div>
              <div className="divide-y divide-border/40">
                {notifications.map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-background transition-colors cursor-pointer">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'warning' ? 'bg-warning' : n.type === 'success' ? 'bg-success' : 'bg-accent'}`} />
                      <div>
                        <p className="text-xs text-foreground leading-relaxed">{n.text}</p>
                        <p className="text-2xs text-muted-light mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-px h-6 bg-border hidden sm:block" />
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center font-700 font-display text-primary text-sm">
            {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-600 text-foreground leading-tight">{user?.name}</div>
            <div className="text-2xs text-muted capitalize">{user?.grade ? `Grade ${user.grade}${user.section ?? ''}` : 'Student'}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
