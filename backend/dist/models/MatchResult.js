"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const MatchResultSchema = new mongoose_1.Schema({
    jobPostId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'JobPost', required: true },
    candidateId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Candidate', required: true },
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
exports.default = mongoose_1.default.model('MatchResult', MatchResultSchema);
