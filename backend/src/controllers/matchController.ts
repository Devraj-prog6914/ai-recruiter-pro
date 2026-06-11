import { Request, Response } from 'express';
import MatchResult from '../models/MatchResult';
import JobPost from '../models/JobPost';
import Candidate from '../models/Candidate';
import { AuthRequest } from '../middleware/auth';
import { calculateMatchScore } from '../services/aiService';

export const generateMatch = async (req: AuthRequest, res: Response) => {
  try {
    const { jobPostId, candidateId } = req.body;

    const job = await JobPost.findById(jobPostId);
    const candidate = await Candidate.findById(candidateId);

    if (!job || !candidate) {
      return res.status(404).json({ message: 'Job or Candidate not found' });
    }

    // Check if match already exists
    let match = await MatchResult.findOne({ jobPostId, candidateId });
    if (match) {
      return res.json(match);
    }

    // Generate score
    const scoreData = await calculateMatchScore(job, candidate);

    match = new MatchResult({
      jobPostId,
      candidateId,
      ...scoreData
    });

    await match.save();

    res.status(201).json(match);
  } catch (error: any) {
    console.error('Error generating match:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMatchesForJob = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.params;
    
    const job = await JobPost.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Auto-generate matches for all candidates that don't have one
    const allCandidates = await Candidate.find();
    for (const candidate of allCandidates) {
      const existing = await MatchResult.findOne({ jobPostId: jobId, candidateId: candidate._id });
      if (!existing) {
        const scoreData = await calculateMatchScore(job, candidate);
        await new MatchResult({
          jobPostId: jobId,
          candidateId: candidate._id,
          ...scoreData
        }).save();
      }
    }

    const matches = await MatchResult.find({ jobPostId: jobId })
      .populate('candidateId')
      .sort({ overallScore: -1 });
    
    res.json(matches);
  } catch (error: any) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
