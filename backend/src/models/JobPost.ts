import mongoose, { Schema, Document } from 'mongoose';

export interface IJobPost extends Document {
  recruiterId: mongoose.Types.ObjectId;
  title: string;
  department?: string;
  location?: string;
  rawDescription: string;
  
  // AI Extracted Criteria
  requiredSkills: string[];
  preferredSkills: string[];
  experienceRequirements: string;
  educationRequirements: string;
  industryRequirements: string;
  softSkills: string[];

  status: 'open' | 'closed' | 'draft';
  createdAt: Date;
}

const JobPostSchema: Schema = new Schema({
  recruiterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  department: { type: String },
  location: { type: String },
  rawDescription: { type: String, required: true },
  
  requiredSkills: [{ type: String }],
  preferredSkills: [{ type: String }],
  experienceRequirements: { type: String },
  educationRequirements: { type: String },
  industryRequirements: { type: String },
  softSkills: [{ type: String }],

  status: { type: String, enum: ['open', 'closed', 'draft'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJobPost>('JobPost', JobPostSchema);
