'use client';

import { useEffect, useState, use } from 'react';
import { Brain, ArrowLeft, Target, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import api from '@/lib/api';
import Link from 'next/link';

export default function CandidateComparePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [job, setJob] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, matchRes] = await Promise.all([
          api.get(`/jobs/${unwrappedParams.id}`),
          api.get(`/matches/job/${unwrappedParams.id}`)
        ]);
        
        setJob(jobRes.data);
        // Take top 2 or 3 candidates to compare
        setMatches(matchRes.data.slice(0, 2));
      } catch (error) {
        console.error('Failed to load data for comparison', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading Comparison Engine...</p>
      </div>
    );
  }

  if (matches.length < 2) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold">Not enough data</h2>
        <p className="text-muted-foreground">You need at least 2 candidates applied to this job to use the comparison feature.</p>
        <Link href={`/jobs/${unwrappedParams.id}`} className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Job
        </Link>
      </div>
    );
  }

  const candidateA = matches[0];
  const candidateB = matches[1];

  const radarData = [
    { subject: 'Skills', A: candidateA.skillMatchScore, B: candidateB.skillMatchScore, fullMark: 40 },
    { subject: 'Experience', A: candidateA.experienceMatchScore, B: candidateB.experienceMatchScore, fullMark: 20 },
    { subject: 'Projects', A: candidateA.projectRelevanceScore, B: candidateB.projectRelevanceScore, fullMark: 15 },
    { subject: 'Education', A: candidateA.educationScore, B: candidateB.educationScore, fullMark: 10 },
    { subject: 'Behavioral', A: candidateA.behavioralScore + candidateA.activityScore, B: candidateB.behavioralScore + candidateB.activityScore, fullMark: 15 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/jobs/${unwrappedParams.id}`} className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Matches
          </Link>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Candidate Comparison
          </h1>
          <p className="text-muted-foreground mt-1">Side-by-side AI analysis for {job.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[candidateA, candidateB].map((match, i) => (
          <motion.div 
            key={match._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className={`bg-card border-2 rounded-2xl p-8 shadow-xl relative overflow-hidden glass ${i === 0 ? 'border-primary/50' : 'border-purple-500/50'}`}
          >
            <div className={`absolute top-0 left-0 w-full h-2 ${i === 0 ? 'bg-primary' : 'bg-purple-500'}`}></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className={`h-16 w-16 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-lg ${i === 0 ? 'bg-primary' : 'bg-purple-500'}`}>
                {match.candidateId?.name ? match.candidateId.name[0] : 'C'}
              </div>
              <div>
                <h3 className="text-2xl font-bold">{match.candidateId?.name || 'Candidate ' + (i+1)}</h3>
                <p className="text-muted-foreground font-medium">{match.overallScore}% AI Match Score</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Key Strengths</h4>
                <ul className="space-y-2">
                  {match.strengths.map((s: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-green-500 font-bold">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Missing Requirements</h4>
                <ul className="space-y-2">
                  {match.weaknesses.map((w: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-red-500 font-bold">✕</span> {w}
                    </li>
                  ))}
                  {match.weaknesses.length === 0 && <span className="text-sm italic text-muted-foreground">None</span>}
                </ul>
              </div>

              <div className="bg-background/50 rounded-xl p-5 border border-border mt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 mb-2">
                  <Brain className="h-4 w-4" /> AI Recommendation
                </h4>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {i === 0 
                    ? "This candidate has the highest overall semantic alignment with the job description. Highly recommended for immediate interview."
                    : "Strong secondary candidate. May require additional training in certain areas but shows excellent potential."}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-2xl p-8 shadow-xl glass mt-8"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Skill Capability Overlap</h2>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="currentColor" className="text-border" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12 }} className="text-muted-foreground" />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
              <Radar name={candidateA.candidateId?.name || "Candidate 1"} dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.4} strokeWidth={2} />
              <Radar name={candidateB.candidateId?.name || "Candidate 2"} dataKey="B" stroke="#a855f7" fill="#a855f7" fillOpacity={0.4} strokeWidth={2} />
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
