import { Request, Response } from 'express';
import Candidate from '../models/Candidate';
import { AuthRequest } from '../middleware/auth';
import { parseResumeText } from '../services/aiService';
import pdfParse from 'pdf-parse';

import fs from 'fs';

export const uploadResume = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const name = req.body.name || 'Unknown Candidate';
    const email = req.body.email || 'unknown@example.com';
    const phone = req.body.phone || '';

    // Parse PDF from disk
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // AI Extraction
    const extractedData = await parseResumeText(resumeText);
    
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const resumeUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      resumeText,
      resumeUrl,
      ...extractedData
    });

    await newCandidate.save();

    res.status(201).json(newCandidate);
  } catch (error: any) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ message: 'Server error parsing resume' });
  }
};

export const getCandidates = async (req: AuthRequest, res: Response) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error: any) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCandidateById = async (req: AuthRequest, res: Response) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    res.json(candidate);
  } catch (error: any) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
