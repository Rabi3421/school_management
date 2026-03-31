'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'Squares2X2Icon' },
  { id: 'students', label: 'Students', icon: 'AcademicCapIcon' },
  { id: 'teachers', label: 'Teachers', icon: 'UserGroupIcon' },
  { id: 'attendance', label: 'Attendance', icon: 'CalendarDaysIcon' },
  { id: 'fees', label: 'Fees', icon: 'BanknotesIcon' },
  { id: 'exams', label: 'Exams', icon: 'ClipboardDocumentCheckIcon' },
  { id: 'notices', label: 'Notices', icon: 'MegaphoneIcon' },
  { id: 'settings', label: 'Settings', icon: 'Cog6ToothIcon' },
];

interface Props {
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardSidebar({ activeMenu, setActiveMenu, sidebarOpen, setSidebarOpen }: Props) {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col bg-white border-r border-border/60 shadow-soft transition-transform duration-300 ease-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '240px', minWidth: '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border/50 flex-shrink-0">
        <Link href="/homepage" className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-display font-700 text-base text-foreground tracking-tight">
            SchoolSync
          </span>
        </Link>
        <button
          className="lg:hidden p-1.5 rounded-lg text-muted hover:bg-border-light transition-colors"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <Icon name="XMarkIcon" size={18} />
        </button>
      </div>

      {/* School name tag */}
      <div className="px-4 py-3 border-b border-border/50">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-primary/6 rounded-xl">
          <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Icon name="BuildingLibraryIcon" size={14} className="text-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-700 text-foreground truncate">Sunrise Public School</div>
            <div className="text-2xs text-muted">Jaipur, Rajasthan</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="text-2xs font-700 text-muted-light uppercase tracking-widest px-3 mb-2">Main Menu</div>
        <div className="flex flex-col gap-0.5">
          {menuItems.slice(0, 6).map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
              className={`sidebar-link w-full text-left ${activeMenu === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon as 'Squares2X2Icon'} size={18} />
              {item.label}
              {item.id === 'fees' && (
                <span className="ml-auto text-2xs bg-warning/15 text-warning font-700 px-1.5 py-0.5 rounded-full">3</span>
              )}
              {item.id === 'notices' && (
                <span className="ml-auto text-2xs bg-primary/15 text-primary font-700 px-1.5 py-0.5 rounded-full">2</span>
              )}
            </button>
          ))}
        </div>

        <div className="text-2xs font-700 text-muted-light uppercase tracking-widest px-3 mb-2 mt-5">System</div>
        <div className="flex flex-col gap-0.5">
          {menuItems.slice(6).map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
              className={`sidebar-link w-full text-left ${activeMenu === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon as 'MegaphoneIcon'} size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Upgrade prompt */}
      <div className="px-4 pb-4">
        <div className="bg-primary/6 border border-primary/15 rounded-xl p-4">
          <div className="text-xs font-700 text-foreground mb-1">Free Trial Active</div>
          <div className="text-2xs text-muted mb-3">47 days remaining in your free trial</div>
          <div className="w-full h-1.5 bg-border rounded-full mb-3">
            <div className="h-full w-[33%] bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
          <a
            href="/homepage#pricing"
            className="block w-full text-center py-2 bg-primary text-white text-xs font-700 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Upgrade Plan
          </a>
        </div>
      </div>
    </aside>
  );
}