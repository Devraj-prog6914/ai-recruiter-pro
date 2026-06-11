'use client';

import { BrainCircuit, Cpu, Settings2, Activity, ShieldCheck, Database, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MatchEnginePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" /> AI Match Engine Core
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Model Version: GPT-4.5-Turbo-Embeddings | Status: Online
          </p>
        </div>
        <button className="bg-primary text-white shadow-lg shadow-primary/20 h-9 px-6 rounded font-bold text-xs hover:bg-primary/90 transition-all flex items-center gap-2">
          <Settings2 className="h-3 w-3" /> Re-train Models
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A0A0B] border border-border/50 p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white mb-6">Algorithm Tuning</h2>
            
            <div className="space-y-8 relative z-10">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground uppercase tracking-wider">Semantic Similarity Threshold</span>
                  <span className="text-primary font-mono">0.82</span>
                </div>
                <input type="range" className="w-full accent-primary" defaultValue="82" />
                <p className="text-[10px] text-muted-foreground mt-2">Adjusts how closely candidate skills must match job requirements in vector space.</p>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground uppercase tracking-wider">Experience Weighting</span>
                  <span className="text-primary font-mono">40%</span>
                </div>
                <input type="range" className="w-full accent-primary" defaultValue="40" />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-muted-foreground uppercase tracking-wider">Flight Risk Sensitivity</span>
                  <span className="text-primary font-mono">High</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-black border border-border/50 py-2 rounded text-xs font-bold text-muted-foreground hover:bg-white/5">Low</button>
                  <button className="flex-1 bg-black border border-border/50 py-2 rounded text-xs font-bold text-muted-foreground hover:bg-white/5">Medium</button>
                  <button className="flex-1 bg-primary/10 border border-primary/50 py-2 rounded text-xs font-bold text-primary">High</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0A0A0B] border border-border/50 p-6 rounded-xl shadow-lg">
            <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Live Inference Stream</h2>
            <div className="space-y-3 font-mono text-[10px]">
              {[
                { type: 'VECTOR_EMBED', target: 'Candidate_9281', ms: 12 },
                { type: 'COSINE_SIM', target: 'Req_092', ms: 4 },
                { type: 'LLM_RATIONALE', target: 'Match_911', ms: 412 },
                { type: 'TRAJECTORY_PREDICT', target: 'Candidate_882', ms: 89 },
                { type: 'VECTOR_EMBED', target: 'Candidate_9282', ms: 14 },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div>
                    <span className="text-purple-500 font-bold">{log.type}</span>
                    <span className="text-muted-foreground ml-2">{log.target}</span>
                  </div>
                  <span className="text-green-500">{log.ms}ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
