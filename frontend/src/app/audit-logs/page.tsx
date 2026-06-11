'use client';

import { ShieldAlert, Download, Filter } from 'lucide-react';

const mockLogs = [
  { id: 'LOG-9921', time: '2026-06-11 13:42:01', user: 'admin@ai-recruiter.com', action: 'CREATE_JOB', resource: 'Req-042', status: 'SUCCESS' },
  { id: 'LOG-9920', time: '2026-06-11 13:41:15', user: 'system', action: 'VECTOR_INDEX_UPDATE', resource: 'Database', status: 'SUCCESS' },
  { id: 'LOG-9919', time: '2026-06-11 13:30:05', user: 'admin@ai-recruiter.com', action: 'UPDATE_SETTINGS', resource: 'AI_Match_Engine', status: 'SUCCESS' },
  { id: 'LOG-9918', time: '2026-06-11 12:15:00', user: 'system', action: 'API_AUTH_ATTEMPT', resource: 'External_Gateway', status: 'FAILED' },
  { id: 'LOG-9917', time: '2026-06-11 10:05:22', user: 'hr@techcorp.com', action: 'EXPORT_CANDIDATE', resource: 'Candidate-881', status: 'SUCCESS' },
  { id: 'LOG-9916', time: '2026-06-10 18:00:00', user: 'system', action: 'BACKUP_DB', resource: 'Cluster-Primary', status: 'SUCCESS' },
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-primary" /> Security Audit Logs
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Immutable system and user activity ledger
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-black border border-border/50 text-white h-9 px-4 rounded font-mono text-xs hover:bg-white/5 transition-colors flex items-center gap-2">
            <Filter className="h-3 w-3" /> Filter
          </button>
          <button className="bg-black border border-border/50 text-white h-9 px-4 rounded font-mono text-xs hover:bg-white/5 transition-colors flex items-center gap-2">
            <Download className="h-3 w-3" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-[#0A0A0B] border border-border/50 rounded-xl shadow-lg flex-1 overflow-hidden flex flex-col mt-4">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-black sticky top-0 border-b border-border/50 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-black">Log ID</th>
                <th className="px-6 py-4 font-black">Timestamp</th>
                <th className="px-6 py-4 font-black">Identity</th>
                <th className="px-6 py-4 font-black">Action</th>
                <th className="px-6 py-4 font-black">Resource</th>
                <th className="px-6 py-4 font-black">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {mockLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-muted-foreground">{log.id}</td>
                  <td className="px-6 py-4 text-white/80">{log.time}</td>
                  <td className="px-6 py-4 text-primary">{log.user}</td>
                  <td className="px-6 py-4 font-bold">{log.action}</td>
                  <td className="px-6 py-4 text-muted-foreground">{log.resource}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest ${
                      log.status === 'SUCCESS' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
