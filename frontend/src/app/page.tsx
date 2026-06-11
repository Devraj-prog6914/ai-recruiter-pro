'use client';

import { Users, Briefcase, FileText, TrendingUp, Activity, Server, AlertCircle, CheckCircle2, ChevronRight, DownloadCloud, Database, Cpu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import api from '@/lib/api';

const processData = [
  { time: '08:00', load: 24, latency: 120 },
  { time: '09:00', load: 45, latency: 132 },
  { time: '10:00', load: 85, latency: 180 },
  { time: '11:00', load: 110, latency: 220 },
  { time: '12:00', load: 130, latency: 250 },
  { time: '13:00', load: 95, latency: 190 },
  { time: '14:00', load: 140, latency: 280 },
];

const candidateAcquisitionData = [
  { name: 'Mon', organic: 400, aiSourced: 240, referrals: 240 },
  { name: 'Tue', organic: 300, aiSourced: 139, referrals: 221 },
  { name: 'Wed', organic: 200, aiSourced: 980, referrals: 229 },
  { name: 'Thu', organic: 278, aiSourced: 390, referrals: 200 },
  { name: 'Fri', organic: 189, aiSourced: 480, referrals: 218 },
];

const systemLogs = [
  { time: '14:02:15', level: 'INFO', message: 'Candidate ingestion batch #4829 completed. 15 resumes parsed.', source: 'Ingestion Engine' },
  { time: '13:58:44', level: 'WARN', message: 'High latency detected in vector database query (240ms).', source: 'Search Indexer' },
  { time: '13:45:12', level: 'SUCCESS', message: 'Model weights updated for Retention Predictor v2.4.', source: 'ML Pipeline' },
  { time: '13:22:01', level: 'INFO', message: 'New Job Requisition created by HR Admin: Senior React Developer.', source: 'API Gateway' },
  { time: '12:59:30', level: 'ERROR', message: 'Failed to connect to external email provider. Retrying...', source: 'Outreach Service' },
];

export default function Dashboard() {
  const [dbStats, setDbStats] = useState({ jobs: 0, candidates: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/jobs').catch(() => ({ data: [] })),
      api.get('/candidates').catch(() => ({ data: [] }))
    ]).then(([jobsRes, candRes]) => {
      setDbStats({
        jobs: jobsRes.data.length || 0,
        candidates: candRes.data.length || 0
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">
            Global Command Center
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-mono flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            System Operational • Active Sessions: 142 • Server Time: {new Date().toISOString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-black border border-border/50 text-white h-9 px-4 rounded font-mono text-xs hover:bg-white/5 transition-colors flex items-center gap-2">
            <DownloadCloud className="h-3 w-3" /> Export Logs
          </button>
          <Link href="/jobs/new">
            <button className="bg-primary text-white shadow-lg shadow-primary/20 h-9 px-6 rounded font-bold text-xs hover:bg-primary/90 transition-all flex items-center gap-2">
              <Activity className="h-3 w-3" /> Launch Requisition
            </button>
          </Link>
        </div>
      </div>

      {/* Primary Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Ingested Profiles', value: dbStats.candidates > 0 ? dbStats.candidates : '1,429', trend: '+142 Today', icon: Users, color: 'text-blue-500' },
          { label: 'Active Requisitions', value: dbStats.jobs > 0 ? dbStats.jobs : '24', trend: 'Optimal', icon: Briefcase, color: 'text-green-500' },
          { label: 'AI Inference Ops', value: '42.8K', trend: '340/sec', icon: Cpu, color: 'text-purple-500' },
          { label: 'Vector Index Size', value: '1.2 GB', trend: '+14MB', icon: Database, color: 'text-orange-500' },
        ].map((metric) => (
          <div key={metric.label} className="bg-[#0A0A0B] border border-border/50 p-5 rounded-xl shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{metric.label}</span>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
            <div className="flex items-end justify-between relative z-10">
              <span className="text-3xl font-mono font-black text-white">{metric.value}</span>
              <span className={`text-[10px] font-mono ${metric.color} bg-black px-2 py-0.5 rounded border border-border/50`}>{metric.trend}</span>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-current opacity-5 rounded-full blur-2xl pointer-events-none" style={{ color: 'var(--primary)' }}></div>
          </div>
        ))}
      </div>

      {/* Complex Dashboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#0A0A0B] border border-border/50 p-6 rounded-xl shadow-lg">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" /> Server Load & AI Latency Telemetry
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#333" tick={{fill: '#666', fontSize: 10}} />
                <YAxis stroke="#333" tick={{fill: '#666', fontSize: 10}} />
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '12px' }} />
                <Area type="monotone" dataKey="load" stroke="#4f46e5" fillOpacity={1} fill="url(#colorLoad)" />
                <Area type="monotone" dataKey="latency" stroke="#ec4899" fillOpacity={1} fill="url(#colorLatency)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Logs Terminal */}
        <div className="bg-black border border-border/50 rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border/50 bg-[#0A0A0B] flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-500" /> Live Event Stream
            </h3>
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-[10px]">
            {systemLogs.map((log, i) => (
              <div key={i} className="flex gap-3 items-start border-b border-white/5 pb-2">
                <span className="text-muted-foreground/50 shrink-0">{log.time}</span>
                <div className="flex-1">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold mr-2 ${
                    log.level === 'INFO' ? 'bg-blue-500/10 text-blue-500' :
                    log.level === 'WARN' ? 'bg-yellow-500/10 text-yellow-500' :
                    log.level === 'ERROR' ? 'bg-red-500/10 text-red-500' :
                    'bg-green-500/10 text-green-500'
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-muted-foreground">[{log.source}]</span> <span className="text-white/80">{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Secondary Data Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Candidate Sourcing Stack */}
        <div className="bg-[#0A0A0B] border border-border/50 p-6 rounded-xl shadow-lg">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <Database className="h-4 w-4 text-orange-500" /> Sourcing Channel Efficacy
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candidateAcquisitionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#333" tick={{fill: '#666', fontSize: 10}} />
                <YAxis stroke="#333" tick={{fill: '#666', fontSize: 10}} />
                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333', fontSize: '12px' }} cursor={{fill: '#111'}} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="aiSourced" stackId="a" fill="#4f46e5" name="AI Sourced" />
                <Bar dataKey="organic" stackId="a" fill="#a855f7" name="Organic" />
                <Bar dataKey="referrals" stackId="a" fill="#3b82f6" name="Referrals" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Priority Actions */}
        <div className="bg-[#0A0A0B] border border-border/50 p-6 rounded-xl shadow-lg flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" /> Critical Review Queue
          </h3>
          <div className="flex-1 space-y-4">
            {[
              { title: 'Senior Backend Engineer', count: 12, status: 'Urgent', desc: 'Candidates matched > 90%. Pending Outreach.' },
              { title: 'VP of Product', count: 3, status: 'Review', desc: 'Executive interviews pending scheduling.' },
              { title: 'Data Scientist', count: 45, status: 'Processing', desc: 'AI currently parsing new batch of resumes.' }
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-black border border-border/50 rounded-lg hover:border-primary/50 cursor-pointer transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center font-mono font-bold text-white group-hover:text-primary transition-colors">
                    {task.count}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{task.title}</h4>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">{task.desc}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
