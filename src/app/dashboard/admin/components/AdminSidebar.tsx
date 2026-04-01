'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '@/context/AuthContext';

const adminMenu = [
  { id: 'overview', label: 'Dashboard', icon: 'Squares2X2Icon', href: '/dashboard/admin' },
  { id: 'students', label: 'Students', icon: 'AcademicCapIcon', href: '/dashboard/admin/students', badge: '' },
  { id: 'teachers', label: 'Teachers', icon: 'UserGroupIcon', href: '/dashboard/admin/teachers' },
  { id: 'attendance', label: 'Attendance', icon: 'CalendarDaysIcon', href: '/dashboard/admin/attendance' },
  { id: 'fees', label: 'Fees', icon: 'BanknotesIcon', href: '/dashboard/admin/fees', badge: '3' },
  { id: 'exams', label: 'Exams', icon: 'ClipboardDocumentCheckIcon', href: '/dashboard/admin/exams' },
  { id: 'reports', label: 'Reports', icon: 'ChartBarIcon', href: '/dashboard/admin/reports' },
  { id: 'notices', label: 'Notices', icon: 'MegaphoneIcon', href: '/dashboard/admin/notices', badge: '2' },
  { id: 'settings', label: 'Settings', icon: 'Cog6ToothIcon', href: '/dashboard/admin/settings' },
];

interface Props { sidebarOpen: boolean; setSidebarOpen: (v: boolean) => void; }

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: Props) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-border/60 shadow-soft transition-transform duration-300 ease-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '240px', minWidth: '240px' }}
    >
      <div className="flex items-center justify-between px-5 h-16 border-b border-border/50 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-display font-700 text-base text-foreground tracking-tight">SchoolSync</span>
        </Link>
        <button className="lg:hidden p-1.5 rounded-lg text-muted hover:bg-border-light transition-colors" onClick={() => setSidebarOpen(false)}>
          <Icon name="XMarkIcon" size={18} />
        </button>
      </div>

      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-amber-50 rounded-xl">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Icon name="BuildingLibraryIcon" size={14} className="text-amber-600" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-700 text-foreground truncate">Greenwood Academy</div>
            <div className="text-2xs text-muted">New Delhi</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="text-2xs font-700 text-muted-light uppercase tracking-widest px-3 mb-2">Administration</div>
        <div className="flex flex-col gap-0.5">
          {adminMenu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} onClick={() => setSidebarOpen(false)} className={`sidebar-link w-full ${active ? 'active' : ''}`}>
                <Icon name={item.icon as 'Squares2X2Icon'} size={18} />
                {item.label}
                {item.badge && (
                  <span className={`ml-auto text-2xs font-700 px-1.5 py-0.5 rounded-full ${item.id === 'fees' ? 'bg-warning/15 text-warning' : 'bg-primary/15 text-primary'}`}>{item.badge}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-4 py-3 border-t border-border/50">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center font-700 font-display text-amber-700 text-sm flex-shrink-0">
            {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-700 text-foreground truncate">{user?.name}</div>
            <div className="text-2xs text-muted">Principal / Admin</div>
          </div>
        </div>
        <button onClick={() => logout()} className="sidebar-link w-full text-danger hover:bg-danger/8">
          <Icon name="ArrowRightOnRectangleIcon" size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
