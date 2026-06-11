import { Request, Response } from 'express';
import JobPost from '../models/JobPost';
import { AuthRequest } from '../middleware/auth';
import { extractJobIntelligence } from '../services/aiService';

export const createJobPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, department, location, rawDescription } = req.body;
    const recruiterId = req.user?.id;

    if (!recruiterId) return res.status(401).json({ message: 'Unauthorized' });

    const intelligence = await extractJobIntelligence(rawDescription);

    const newJob = new JobPost({
      recruiterId,
      title,
      department,
      location,
      rawDescription,
      ...intelligence
    });

    await newJob.save();
    res.status(201).json(newJob);
  } catch (error: any) {
    console.error('Error creating job post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobPosts = async (req: AuthRequest, res: Response) => {
  try {
    const recruiterId = req.user?.id;
    const jobs = await JobPost.find({ recruiterId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getJobPostById = async (req: AuthRequest, res: Response) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error: any) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
