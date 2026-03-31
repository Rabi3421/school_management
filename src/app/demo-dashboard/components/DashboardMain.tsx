'use client';

import React from 'react';
import DashboardOverview from './DashboardOverview';
import StudentsView from './StudentsView';
import Icon from '@/components/ui/AppIcon';

interface Props {
  activeMenu: string;
}

const placeholderViews: Record<string, { title: string; icon: string; description: string }> = {
  teachers: { title: 'Teachers', icon: 'UserGroupIcon', description: 'Manage teacher profiles, subjects, and timetables' },
  attendance: { title: 'Attendance', icon: 'CalendarDaysIcon', description: 'Mark and view daily attendance records' },
  fees: { title: 'Fee Management', icon: 'BanknotesIcon', description: 'Collect fees, generate receipts, and track dues' },
  exams: { title: 'Exams & Results', icon: 'ClipboardDocumentCheckIcon', description: 'Schedule exams and publish result cards' },
  notices: { title: 'Notices & Announcements', icon: 'MegaphoneIcon', description: 'Broadcast notices to parents and staff' },
  settings: { title: 'Settings', icon: 'Cog6ToothIcon', description: 'Configure your school profile and preferences' },
};

export default function DashboardMain({ activeMenu }: Props) {
  if (activeMenu === 'dashboard') return <DashboardOverview />;
  if (activeMenu === 'students') return <StudentsView />;

  const view = placeholderViews[activeMenu];
  if (!view) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-3xl bg-primary/8 flex items-center justify-center mb-5">
          <Icon name={view.icon as 'UserGroupIcon'} size={36} className="text-primary" />
        </div>
        <h2 className="font-display text-2xl font-700 text-foreground mb-2">{view.title}</h2>
        <p className="text-muted text-base max-w-sm mb-8">{view.description}</p>
        <div className="px-5 py-2.5 bg-primary/8 border border-primary/15 rounded-xl text-sm font-medium text-primary">
          This section is available in the full version
        </div>
      </div>
    </div>
  );
}