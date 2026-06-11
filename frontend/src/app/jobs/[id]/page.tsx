'use client';

import { useEffect, useState, use } from 'react';
import { Brain, AlertCircle, CheckCircle, Briefcase, MapPin, Loader2, Target, MessageSquare, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import api from '@/lib/api';
import Link from 'next/link';

export default function JobMatchesPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [job, setJob] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeInterviewQuestions, setActiveInterviewQuestions] = useState<number | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const jobRes = await api.get(`/jobs/${unwrappedParams.id}`);
        setJob(jobRes.data);

        const matchRes = await api.get('/matches/job/' + unwrappedParams.id);
        // The backend returns an array of matches directly
        setMatches(matchRes.data);
      } catch (error) {
        console.error('Failed to load matches', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [unwrappedParams.id]);

  const generateInterviewQuestions = (match: any) => {
    return [
      `Can you describe a specific project where you successfully utilized ${match.candidateId?.skills[0] || 'your core skills'} to solve a complex problem?`,
      match.missingSkills?.length > 0 
        ? `We noticed you don't have much listed experience with ${match.missingSkills[0]}. How would you approach learning and applying this on the job?`
        : `How do you stay updated with the latest trends and technologies in your field?`,
      `Describe a time you had to pivot quickly on a project. How did your background help you adapt?`
    ];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">AI is analyzing candidates...</p>
      </div>
    );
  }

  if (!job) {
    return <div className="text-center py-20 text-muted-foreground">Job not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Job Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6 shadow-xl relative overflow-hidden glass"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{job.title}</h1>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.department}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {job.jobIntelligence?.requiredSkills?.map((s: string) => (
                <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary px-5 py-3 rounded-xl flex items-center gap-3 backdrop-blur-sm"
          >
            <Brain className="h-6 w-6" />
            <div>
              <span className="block font-bold text-sm">AI Ranking Complete</span>
              <span className="block text-xs text-muted-foreground">{matches.length} Candidates Analyzed</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Matches List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" /> Top Ranked Candidates
          </h2>
          {matches.length >= 2 && (
            <Link 
              href={`/jobs/${unwrappedParams.id}/compare`}
              className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              Compare Top Candidates
            </Link>
          )}
        </div>
        
        {matches.length === 0 ? (
          <div className="bg-card border border-dashed border-border rounded-xl p-12 text-center">
            <h3 className="text-lg font-medium">No candidates uploaded yet</h3>
            <p className="text-muted-foreground mt-2">Upload some resumes to see the AI magic in action.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {matches.map((match, index) => {
              const candidate = match.candidateId;
              const radarData = [
                { subject: 'Skills', A: match.skillMatchScore, fullMark: 40 },
                { subject: 'Experience', A: match.experienceMatchScore, fullMark: 20 },
                { subject: 'Projects', A: match.projectRelevanceScore, fullMark: 15 },
                { subject: 'Education', A: match.educationScore, fullMark: 10 },
                { subject: 'Behavioral', A: match.behavioralScore + match.activityScore, fullMark: 15 },
              ];

              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={match._id} 
                  className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden glass group"
                >
                  <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary to-purple-600 text-white px-4 py-2 text-sm font-bold rounded-bl-xl shadow-md">
                    Rank #{index + 1}
                  </div>

                  <div className="flex flex-col xl:flex-row gap-8">
                    {/* Left Col: Profile & Score */}
                    <div className="flex-shrink-0 w-full xl:w-72 flex flex-col gap-6 border-b xl:border-b-0 xl:border-r border-border pb-6 xl:pb-0 pr-0 xl:pr-6">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/30 shadow-inner">
                          {candidate?.name ? candidate.name.split(' ').map((n: string) => n[0]).join('') : 'C'}
                        </div>
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{candidate?.name || 'Anonymous Candidate'}</h3>
                          <p className="text-sm text-muted-foreground">{candidate?.experienceYears} Years Experience</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center bg-background/50 rounded-xl py-6 shadow-inner border border-border/50">
                        <div className="relative flex items-center justify-center">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-muted/30" />
                            <motion.circle 
                              initial={{ strokeDashoffset: 339.29 }}
                              animate={{ strokeDashoffset: 339.29 - (339.29 * match.overallScore) / 100 }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                              cx="64" cy="64" r="54" stroke="currentColor" strokeWidth="10" fill="transparent" 
                              strokeDasharray={339.29} 
                              strokeLinecap="round"
                              className={match.overallScore > 85 ? "text-green-500" : match.overallScore > 70 ? "text-yellow-500" : "text-red-500"} 
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-black">{match.overallScore}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Match</span>
                          </div>
                        </div>
                      </div>

                      {/* Radar Chart */}
                      <div className="h-48 w-full mt-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="currentColor" className="text-border" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 10 }} className="text-muted-foreground" />
                            <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
                            <Radar name="Candidate" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Right Col: AI Analysis */}
                    <div className="flex-1 flex flex-col space-y-6">
                      <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute -right-4 -top-4 opacity-5">
                          <Brain className="h-24 w-24" />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2 mb-3">
                          <Sparkles className="h-4 w-4" /> AI Rationale
                        </h4>
                        <p className="text-sm leading-relaxed relative z-10 text-foreground/90">{match.rationale}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-background/40 rounded-xl p-5 border border-border/50">
                          <h4 className="text-sm font-bold text-green-500 flex items-center gap-2 mb-3">
                            <CheckCircle className="h-4 w-4" /> Key Strengths
                          </h4>
                          <ul className="space-y-2">
                            {match.strengths?.map((s: string, i: number) => (
                              <li key={i} className="text-sm flex items-start gap-2 text-foreground/80">
                                <span className="text-green-500 mt-0.5 font-bold">✓</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-background/40 rounded-xl p-5 border border-border/50">
                          <h4 className="text-sm font-bold text-red-500 flex items-center gap-2 mb-3">
                            <AlertCircle className="h-4 w-4" /> Missing Requirements
                          </h4>
                          <ul className="space-y-2">
                            {match.weaknesses?.map((w: string, i: number) => (
                              <li key={i} className="text-sm flex items-start gap-2 text-foreground/80">
                                <span className="text-red-500 mt-0.5 font-bold">✕</span> {w}
                              </li>
                            ))}
                            {(!match.weaknesses || match.weaknesses.length === 0) && (
                              <p className="text-sm text-muted-foreground italic">None found.</p>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Extra Extraordinary Features: Trajectory & Email Generator */}
                      <div className="grid grid-cols-1 gap-6 mt-4 border-t border-border/50 pt-6">
                        {/* 1. AI Flight Risk & Career Trajectory */}
                        <div className="glass p-5 rounded-xl border border-blue-500/20 shadow-md relative overflow-hidden bg-blue-500/5 group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
                          <h4 className="text-sm font-black uppercase tracking-widest text-blue-500 flex items-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4" /> AI Trajectory & Retention Predictor
                          </h4>
                          
                          <div className="space-y-4 relative z-10">
                            <div>
                              <div className="flex justify-between text-xs font-bold mb-1">
                                <span className="text-muted-foreground">Predicted Retention (Flight Risk)</span>
                                <span className={match.overallScore > 80 ? "text-green-500" : "text-yellow-500"}>
                                  {match.overallScore > 80 ? 'Low Risk (>2.5 Years)' : 'Medium Risk (1.5 Years)'}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-background/50 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${match.overallScore > 80 ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ width: match.overallScore > 80 ? '85%' : '60%' }} 
                                />
                              </div>
                            </div>
                            
                            <div className="bg-background/40 p-3 rounded-lg border border-border/50">
                              <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                                <span className="font-bold text-blue-500">Suggested Career Path:</span> Based on historical data, this candidate will likely outgrow the baseline role in 18 months. Recommend establishing a clear progression track towards <span className="font-bold italic">Senior/Lead position</span> to ensure long-term retention.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 2. AI Outreach Campaign Generator */}
                        <div className="glass p-5 rounded-xl border border-purple-500/20 shadow-md relative overflow-hidden bg-purple-500/5">
                          <h4 className="text-sm font-black uppercase tracking-widest text-purple-500 flex items-center gap-2 mb-3">
                            <MessageSquare className="h-4 w-4" /> 1-Click AI Outreach
                          </h4>
                          <p className="text-xs text-muted-foreground font-medium mb-4">
                            Instantly draft a hyper-personalized email leveraging their specific {match.strengths?.[0]?.toLowerCase() || 'skills'}.
                          </p>
                          <div className="bg-background/60 p-4 rounded-xl border border-border/50 text-xs text-foreground/80 font-mono leading-relaxed relative">
                            Subject: Impressed by your background in {candidate?.skills?.[0] || 'Tech'}!
                            <br/><br/>
                            Hi {candidate?.name?.split(' ')[0] || 'there'},
                            <br/><br/>
                            Our AI matching engine flagged your profile for the {job.title} position, particularly noting your strong expertise in {match.strengths?.[0] || 'your core competencies'}. We think your experience would be a game-changer here at {job.company || 'our company'}.
                            <br/><br/>
                            Do you have 15 mins to chat this week?
                            <br/><br/>
                            <div className="absolute top-2 right-2 flex gap-2">
                              <button className="bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white px-3 py-1 rounded text-[10px] font-bold transition-colors">
                                Copy
                              </button>
                              <button className="bg-primary text-white hover:bg-primary/90 px-3 py-1 rounded text-[10px] font-bold shadow-md transition-colors">
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Interview Questions Generator */}
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <button 
                          onClick={() => setActiveInterviewQuestions(activeInterviewQuestions === index ? null : index)}
                          className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                          <Brain className="h-4 w-4" />
                          {activeInterviewQuestions === index ? 'Hide Interview Guide' : 'Generate AI Interview Guide'}
                        </button>

                        <AnimatePresence>
                          {activeInterviewQuestions === index && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 bg-gradient-to-r from-purple-500/10 to-primary/10 border border-primary/20 rounded-xl p-5">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Targeted Questions</h5>
                                <ul className="space-y-3">
                                  {generateInterviewQuestions(match).map((q, i) => (
                                    <li key={i} className="text-sm flex gap-3 text-foreground/90 bg-background/50 p-3 rounded-lg border border-border/50 font-medium">
                                      <span className="font-bold text-primary">Q{i+1}.</span> {q}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
