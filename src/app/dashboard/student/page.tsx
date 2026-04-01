'use client';

import React, { useState } from 'react';
import DashboardGuard from '../components/DashboardGuard';
import StudentSidebar from './components/StudentSidebar';
import StudentTopbar from './components/StudentTopbar';
import StudentOverview from './components/StudentOverview';

export default function StudentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardGuard allowed={['student', 'parent']}>
      <div className="flex h-screen bg-background overflow-hidden">
        <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && (
          <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <StudentTopbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto">
            <StudentOverview />
          </main>
        </div>
      </div>
    </DashboardGuard>
  );
}
