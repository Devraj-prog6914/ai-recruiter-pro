'use client';

import { BarChart4, TrendingDown, Users, Target } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
            <BarChart4 className="h-6 w-6 text-primary" /> Predictive Analytics
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Global Workforce Intelligence & Forecasting
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { title: 'Predicted Turnover', value: '14.2%', desc: 'Next 6 months across engineering org', icon: TrendingDown, color: 'text-red-500' },
          { title: 'Time-to-Hire Forecast', value: '22 Days', desc: 'Average based on current pipeline velocity', icon: Target, color: 'text-blue-500' },
          { title: 'Talent Pool Growth', value: '+3.4%', desc: 'MoM active passive candidates', icon: Users, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A0A0B] border border-border/50 p-6 rounded-xl shadow-lg relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.title}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div className="relative z-10">
              <span className="text-3xl font-mono font-black text-white block mb-1">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0A0A0B] border border-border/50 p-6 rounded-xl shadow-lg h-96 flex flex-col items-center justify-center text-center">
        <BarChart4 className="h-16 w-16 text-muted-foreground/20 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">Complex Visualizations Loading</h3>
        <p className="text-sm text-muted-foreground max-w-md">The predictive models are currently calculating long-term retention curves and demographic distributions. This dashboard will populate once the data warehouse sync completes.</p>
      </div>
    </div>
  );
}
