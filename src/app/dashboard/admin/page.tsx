'use client';

import React, { useState } from 'react';
import DashboardGuard from '../components/DashboardGuard';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import AdminOverview from './components/AdminOverview';

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardGuard allowed={['principal']}>
      <div className="flex h-screen bg-background overflow-hidden">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {sidebarOpen && (
          <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AdminTopbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto">
            <AdminOverview />
          </main>
        </div>
      </div>
    </DashboardGuard>
  );
}
