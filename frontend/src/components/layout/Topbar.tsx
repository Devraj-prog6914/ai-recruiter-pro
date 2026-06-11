'use client';

import { Bell, Search, ChevronRight, HelpCircle, Server, Command } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Topbar() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="bg-[#0A0A0B] border-b border-border h-16 flex items-center justify-between px-6 shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        {/* Breadcrumbs */}
        <nav className="hidden md:flex items-center text-xs font-mono font-medium text-muted-foreground">
          <span className="hover:text-white cursor-pointer transition-colors">Nexal AI</span>
          <ChevronRight className="h-3 w-3 mx-2 opacity-50" />
          {pathSegments.length === 0 ? (
            <span className="text-white font-bold">Command Center</span>
          ) : (
            pathSegments.map((segment, index) => (
              <span key={segment} className="flex items-center">
                <span className={index === pathSegments.length - 1 ? 'text-white font-bold' : 'hover:text-white cursor-pointer transition-colors'}>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </span>
                {index < pathSegments.length - 1 && <ChevronRight className="h-3 w-3 mx-2 opacity-50" />}
              </span>
            ))
          )}
        </nav>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Environment Flag */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Production Env</span>
        </div>

        {/* Global Search */}
        <div className="relative w-64 hidden sm:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search Global Database..." 
            className="w-full bg-black border border-border/50 rounded-lg pl-10 pr-12 py-2 text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-muted-foreground"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground">
            <kbd className="hidden lg:inline-flex items-center justify-center rounded border border-border/50 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="h-3 w-3 mr-0.5"/> K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 border-l border-border pl-6">
          <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors group">
            <Server className="h-5 w-5" />
          </button>
          <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors group">
            <HelpCircle className="h-5 w-5" />
          </button>
          <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-white transition-colors group">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
