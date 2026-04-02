'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/context/AuthContext';

interface Props { setSidebarOpen: (v: boolean) => void; }

export default function SuperAdminTopbar({ setSidebarOpen }: Props) {
  const { user } = useAuth();

  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-6 bg-white border-b border-border/60 flex-shrink-0 shadow-soft z-10">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl text-muted hover:bg-background transition-colors"
        >
          <Icon name="Menu" size={18} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center">
            <Icon name="ShieldCheck" size={13} className="text-rose-600" />
          </div>
          <span className="text-sm font-700 text-foreground">Super Admin Console</span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-100 rounded-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-700 text-rose-600">Full Access</span>
        </div>
        <button className="p-2 rounded-xl text-muted hover:bg-background hover:text-foreground transition-colors relative">
          <Icon name="Bell" size={17} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </button>
        <div className="w-8 h-8 rounded-xl bg-rose-100 flex items-center justify-center font-700 font-display text-rose-600 text-xs flex-shrink-0">
          {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
      </div>
    </header>
  );
}
