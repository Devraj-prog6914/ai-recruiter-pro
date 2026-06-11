import mongoose, { Schema, Document } from 'mongoose';

export interface IMatchResult extends Document {
  jobPostId: mongoose.Types.ObjectId;
  candidateId: mongoose.Types.ObjectId;
  
  overallScore: number; // 0-100
  skillMatchScore: number;
  experienceMatchScore: number;
  projectRelevanceScore: number;
  educationScore: number;
  activityScore: number;
  behavioralScore: number;

  rationale: string;
  matchingSkills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  confidenceScore: number; // 0-100
  
  createdAt: Date;
}

const MatchResultSchema: Schema = new Schema({
  jobPostId: { type: Schema.Types.ObjectId, ref: 'JobPost', required: true },
  candidateId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
  
  overallScore: { type: Number, required: true },
  skillMatchScore: { type: Number, required: true },
  experienceMatchScore: { type: Number, required: true },
  projectRelevanceScore: { type: Number, required: true },
  educationScore: { type: Number, required: true },
  activityScore: { type: Number, required: true },
  behavioralScore: { type: Number, required: true },

  rationale: { type: String, required: true },
  matchingSkills: [{ type: String }],
  missingSkills: [{ type: String }],
  strengths: [{ type: String }],
  weaknesses: [{ type: String }],
  confidenceScore: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now },
});

// Ensure a candidate only has one match result per job post
MatchResultSchema.index({ jobPostId: 1, candidateId: 1 }, { unique: true });

export default mongoose.model<IMatchResult>('MatchResult', MatchResultSchema);
