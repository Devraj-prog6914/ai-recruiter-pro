'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, User, Mail, Phone, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/lib/api';

export default function AddCandidatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Clean up empty optional fields
    if (!formData.get('name')) formData.delete('name');
    if (!formData.get('email')) formData.delete('email');
    if (!formData.get('phone')) formData.delete('phone');

    try {
      await api.post('/candidates/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/candidates');
      }, 1500);
    } catch (error) {
      console.error('Failed to upload candidate', error);
      alert('Failed to upload candidate. Check backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Add Candidate</h1>
        <p className="text-muted-foreground mt-1">Upload a resume and our AI will automatically parse skills, experience, and build their profile.</p>
      </div>

      {success && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-4 rounded-xl flex items-center gap-3 glass"
        >
          <CheckCircle2 className="h-5 w-5" />
          <p className="font-medium">Candidate added successfully! AI has parsed the resume.</p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 shadow-xl space-y-6 relative overflow-hidden glass">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Full Name (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <input id="name" name="name" type="text" className="pl-10 w-full border border-border rounded-md bg-background/50 backdrop-blur-sm py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Will be extracted if left blank" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <input id="email" name="email" type="email" className="pl-10 w-full border border-border rounded-md bg-background/50 backdrop-blur-sm py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Will be extracted if left blank" />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium flex justify-between">
              <span>Resume PDF <span className="text-red-500">*</span></span>
              <span className="text-xs text-primary flex items-center gap-1 font-bold"><Sparkles className="h-3 w-3 animate-pulse"/> AI Parsed</span>
            </label>
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-border px-6 py-10 hover:bg-secondary/30 transition-colors bg-background/30 backdrop-blur-sm group relative overflow-hidden">
              <div className="text-center relative z-10">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                  <label htmlFor="resume" className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none hover:underline">
                    <span>Upload a file</span>
                    <input id="resume" name="resume" type="file" accept=".pdf" className="sr-only" required onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">PDF up to 10MB</p>
                {file && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center justify-center text-sm font-medium text-foreground bg-primary/10 border border-primary/20 py-2 px-4 rounded-full w-fit mx-auto"
                  >
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    {file.name}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={loading || !file}
            className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 h-10 py-2 px-6 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Extracting Details...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Upload & Parse
              </span>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
