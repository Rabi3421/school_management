'use client';

import React, { useState } from 'react';
import DashboardGuard from '../../components/DashboardGuard';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherTopbar from '../components/TeacherTopbar';
import TeacherClasses from './TeacherClasses';

export default function TeacherClassesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardGuard allowed={['teacher']}>
      <div className="flex h-screen bg-background overflow-hidden">
        <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TeacherTopbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto">
            <TeacherClasses />
          </main>
        </div>
      </div>
    </DashboardGuard>
  );
}
