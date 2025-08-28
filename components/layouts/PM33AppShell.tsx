import { ReactNode } from 'react';
import { PM33TopNav } from './PM33TopNav';
import { PM33LeftSidebar } from './PM33LeftSidebar';
import { PM33RightSidebar } from './PM33RightSidebar';

interface PM33AppShellProps {
  children: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
}

export function PM33AppShell({
  children,
  leftSidebar,
  rightSidebar,
  showLeftSidebar = true,
  showRightSidebar = true
}: PM33AppShellProps) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Navigation - Always Present */}
      <PM33TopNav />
      
      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Conditional */}
        {showLeftSidebar && (
          <aside className="w-72 border-r border-white/10 bg-black/20 backdrop-blur-xl p-4 overflow-y-auto">
            {leftSidebar || <PM33LeftSidebar />}
          </aside>
        )}
        
        {/* Center Content - Always Present */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
        
        {/* Right Sidebar - Conditional */}
        {showRightSidebar && (
          <aside className="w-80 border-l border-white/10 bg-black/20 backdrop-blur-xl p-4 overflow-y-auto">
            {rightSidebar || <PM33RightSidebar />}
          </aside>
        )}
      </div>
    </div>
  );
}