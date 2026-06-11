'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, Settings, UserPlus, BrainCircuit, Activity, Database, BarChart4, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const MAIN_NAV = [
  { name: 'Command Center', href: '/', icon: Home },
  { name: 'Job Requisitions', href: '/jobs', icon: Briefcase },
  { name: 'Candidate Database', href: '/candidates', icon: Users },
  { name: 'Ingest Candidate', href: '/candidates/new', icon: UserPlus },
];

const AI_NAV = [
  { name: 'Match Engine', href: '/match-engine', icon: BrainCircuit },
  { name: 'Predictive Analytics', href: '/analytics', icon: BarChart4 },
];

const SYS_NAV = [
  { name: 'System Settings', href: '/settings', icon: Settings },
  { name: 'Audit Logs', href: '/audit-logs', icon: ShieldAlert },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-72 bg-[#0A0A0B] border-r border-border h-full relative z-20 shadow-2xl">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-border bg-[#050505]">
        <div className="h-8 w-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
          <Cpu className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-widest uppercase text-white">Nexal AI</h1>
          <p className="text-[10px] text-primary font-mono tracking-widest">Enterprise Edition</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
        
        {/* Core Operations */}
        <div>
          <h3 className="px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Core Operations</h3>
          <ul className="space-y-1">
            {MAIN_NAV.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2.5 text-sm font-bold rounded-lg transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={`mr-3 h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Intelligence Layer */}
        <div>
          <h3 className="px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <SparklesIcon /> Intelligence Layer
          </h3>
          <ul className="space-y-1">
            {AI_NAV.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-all">
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* System Administration */}
        <div>
          <h3 className="px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">System Administration</h3>
          <ul className="space-y-1">
            {SYS_NAV.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-all">
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* System Status Widget */}
      <div className="p-4 mx-4 mb-4 rounded-xl bg-black border border-border/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl"></div>
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">System Status</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-muted-foreground flex items-center gap-1"><Database className="h-3 w-3"/> DB Cluster</span>
              <span className="text-green-500 font-bold">Online</span>
            </div>
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden"><div className="h-full bg-green-500 w-full" /></div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1">
              <span className="text-muted-foreground flex items-center gap-1"><Activity className="h-3 w-3"/> AI Inference API</span>
              <span className="text-primary font-bold">14ms ping</span>
            </div>
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden"><div className="h-full bg-primary w-full" /></div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-[#050505]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 p-[2px]">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-xs font-bold">AD</div>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">Global Admin</p>
            <p className="text-xs text-muted-foreground mt-1">Enterprise Org</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}
