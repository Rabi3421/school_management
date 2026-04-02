'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/context/AuthContext';

const menu = [
  { id: 'overview',     label: 'Overview',       icon: 'LayoutDashboard', href: '/dashboard/superadmin'              },
  { id: 'users',        label: 'Users',          icon: 'Users',           href: '/dashboard/superadmin/users'        },
  { id: 'credentials',  label: 'Credentials',    icon: 'KeyRound',        href: '/dashboard/superadmin/credentials'  },
  { id: 'schools',      label: 'Schools',        icon: 'Building2',       href: '/dashboard/superadmin/schools'      },
  { id: 'activity',     label: 'Activity Log',   icon: 'ScrollText',      href: '/dashboard/superadmin/activity'     },
  { id: 'settings',     label: 'System Settings',icon: 'Settings',        href: '/dashboard/superadmin/settings'     },
];

interface Props { sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void; }

export default function SuperAdminSidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col bg-[#0F0F1A] text-white transition-transform duration-300 ease-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '240px', minWidth: '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <AppLogo size={30} />
          <div>
            <div className="font-display font-700 text-sm text-white tracking-tight leading-none">SchoolSync</div>
            <div className="text-2xs text-white/40 uppercase tracking-widest mt-0.5">Super Admin</div>
          </div>
        </Link>
        <button className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white transition-colors" onClick={() => setSidebarOpen(false)}>
          <Icon name="X" size={18} />
        </button>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center flex-shrink-0">
            <Icon name="ShieldCheck" size={14} className="text-rose-400" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-700 text-white truncate">Platform Control</div>
            <div className="text-2xs text-rose-400">Full system access</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="text-2xs font-700 text-white/30 uppercase tracking-widest px-3 mb-2">System</div>
        <div className="flex flex-col gap-0.5">
          {menu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-700 transition-all ${
                  active
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon name={item.icon} size={17} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center font-700 font-display text-rose-400 text-sm flex-shrink-0">
            {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-700 text-white truncate">{user?.name}</div>
            <div className="text-2xs text-white/40 truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-700 text-white/50 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <Icon name="LogOut" size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
