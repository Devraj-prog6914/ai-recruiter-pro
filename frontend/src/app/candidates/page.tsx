'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import api from '@/lib/api';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await api.get('/candidates');
        setCandidates(res.data);
      } catch (error) {
        console.error('Failed to load candidates', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 pb-1">
            Candidate Database
          </h1>
          <p className="text-muted-foreground mt-2 font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> {candidates.length} AI-Parsed Resumes
          </p>
        </div>
        <Link href="/candidates/new">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 h-11 px-6 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-primary/50 border-none"
          >
            <Plus className="h-4 w-4" /> Add Candidate
          </motion.button>
        </Link>
      </div>

      <motion.div variants={itemVariants} className="glass p-2 rounded-xl flex items-center gap-3 border border-border/50">
        <Search className="h-5 w-5 text-muted-foreground ml-3" />
        <input 
          type="text" 
          placeholder="Search candidates by name, skill, or experience..." 
          className="flex-1 bg-transparent border-none focus:ring-0 text-foreground font-medium placeholder:text-muted-foreground/70"
        />
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 glass rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : candidates.length === 0 ? (
        <motion.div variants={itemVariants} className="glass border-dashed border-2 border-border/50 rounded-2xl p-16 text-center shadow-xl">
          <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Candidates Found</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Upload PDF resumes to build your talent pool and let the AI parse their skills automatically.</p>
          <Link href="/candidates/new" className="text-primary font-bold hover:underline">Upload Resume</Link>
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate: any) => (
            <motion.div 
              key={candidate._id}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass p-6 rounded-2xl border border-border/50 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div className="flex items-center gap-4 mb-5">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary font-black border border-primary/20 text-xl shadow-inner">
                  {candidate.name ? candidate.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2) : 'C'}
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">{candidate.name || 'Anonymous'}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{candidate.experienceYears} Years Exp.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills?.slice(0, 4).map((skill: string) => (
                      <span key={skill} className="px-2 py-1 text-xs font-bold rounded-md bg-background/50 border border-border/50 text-foreground/80">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills?.length > 4 && (
                      <span className="px-2 py-1 text-xs font-bold rounded-md bg-background/50 border border-border/50 text-muted-foreground">
                        +{candidate.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Parsed by AI</span>
                  <button className="text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Full Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
