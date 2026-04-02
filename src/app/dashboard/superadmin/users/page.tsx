'use client';

import React, { useState } from 'react';
import DashboardGuard from '../../components/DashboardGuard';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import SuperAdminTopbar from '../components/SuperAdminTopbar';
import SuperAdminUsers from './SuperAdminUsers';

export default function SuperAdminUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <DashboardGuard allowed={['superadmin']}>
      <div className="flex h-screen bg-background overflow-hidden">
        <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && (
          <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <SuperAdminTopbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto">
            <SuperAdminUsers />
          </main>
        </div>
      </div>
    </DashboardGuard>
  );
}
