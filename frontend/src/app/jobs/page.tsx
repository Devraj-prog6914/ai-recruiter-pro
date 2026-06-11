'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Users, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch (error) {
        console.error('Failed to load jobs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading active jobs...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Jobs</h1>
          <p className="text-muted-foreground mt-1">Manage your active requisitions</p>
        </div>
        <Link href="/jobs/new" className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-all bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 h-10 py-2 px-6">
          <Sparkles className="h-4 w-4 mr-2" />
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center glass">
          <h3 className="text-lg font-medium">No jobs posted yet</h3>
          <p className="text-muted-foreground mt-2">Create your first job posting to let the AI start finding candidates.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden glass relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
          <ul className="divide-y divide-border pt-1">
            {jobs.map((job, index) => (
              <motion.li 
                key={job._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-secondary/30 transition-colors"
              >
                <Link href={`/jobs/${job._id}`} className="block p-6 group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <p className="text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors">{job.title}</p>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${job.status === 'Open' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-muted text-muted-foreground'}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.department}</span>
                        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</span>
                        <span className="flex items-center gap-2 text-primary font-medium bg-primary/5 px-2 py-1 rounded-md">
                          <Users className="h-4 w-4" /> Auto-Matching Active
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 bg-secondary/50 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
