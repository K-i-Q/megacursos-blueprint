import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { MobileDrawer } from './MobileDrawer';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Mobile Drawer */}
      <MobileDrawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen} />

      {/* Topbar */}
      <Topbar onMenuClick={() => setMobileDrawerOpen(true)} sidebarOpen={sidebarOpen} />

      {/* Main Content */}
      <main
        className={cn(
          'min-h-screen pt-16 pb-20 lg:pb-6 transition-all duration-300',
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20'
        )}
      >
        <div className="p-4 lg:p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav onMoreClick={() => setMobileDrawerOpen(true)} />
    </div>
  );
}
