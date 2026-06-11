'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Building, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const department = formData.get('department') as string;
    const location = formData.get('location') as string;
    const rawDescription = formData.get('description') as string;

    try {
      await api.post('/jobs', {
        title,
        department,
        location,
        rawDescription
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/jobs');
      }, 1500);
    } catch (error) {
      console.error('Failed to create job', error);
      alert('Failed to post job. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Post New Job</h1>
        <p className="text-muted-foreground mt-1">Our AI will automatically extract required skills, experience, and generate matching criteria from your description.</p>
      </div>

      {success && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-xl flex items-center gap-3 glass"
        >
          <CheckCircle2 className="h-5 w-5" />
          <p className="font-medium">Job posted successfully! AI has generated the matching criteria.</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-xl space-y-6 relative overflow-hidden glass">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Job Title</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </div>
              <input required id="title" name="title" type="text" className="pl-10 w-full border border-border rounded-md bg-background/50 backdrop-blur-sm py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g. Senior Frontend Engineer" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="department" className="text-sm font-medium">Department</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-4 w-4 text-muted-foreground" />
              </div>
              <input id="department" name="department" type="text" className="pl-10 w-full border border-border rounded-md bg-background/50 backdrop-blur-sm py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g. Engineering" />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="location" className="text-sm font-medium">Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <input id="location" name="location" type="text" className="pl-10 w-full border border-border rounded-md bg-background/50 backdrop-blur-sm py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="e.g. Remote, San Francisco" />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label htmlFor="description" className="text-sm font-medium flex justify-between">
              <span>Job Description</span>
              <span className="text-xs text-primary flex items-center gap-1 font-bold"><Sparkles className="h-3 w-3 animate-pulse"/> AI Analyzed</span>
            </label>
            <textarea 
              required 
              id="description" 
              name="description"
              rows={12} 
              className="w-full border border-border rounded-md bg-background/50 backdrop-blur-sm p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
              placeholder="Paste the full job description here. Our AI will extract requirements automatically..."
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 h-10 py-2 px-6 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analyzing with AI...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Post & Analyze Job
              </span>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
