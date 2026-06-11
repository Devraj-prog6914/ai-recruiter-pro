import mongoose, { Schema, Document } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  email: string;
  phone?: string;
  
  // Extracted Info
  skills: string[];
  experienceYears: number;
  education: string[];
  certifications: string[];
  projects: string[];
  workHistory: any[];
  
  // Links
  portfolioLink?: string;
  githubLink?: string;
  linkedinLink?: string;

  // The raw parsed text
  resumeText: string;
  
  createdAt: Date;
}

const CandidateSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  
  skills: [{ type: String }],
  experienceYears: { type: Number, default: 0 },
  education: [{ type: String }],
  certifications: [{ type: String }],
  projects: [{ type: String }],
  workHistory: [{ type: Schema.Types.Mixed }],
  
  portfolioLink: { type: String },
  githubLink: { type: String },
  linkedinLink: { type: String },
  
  resumeText: { type: String, required: true },
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICandidate>('Candidate', CandidateSchema);
