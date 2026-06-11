"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchesForJob = exports.generateMatch = void 0;
const MatchResult_1 = __importDefault(require("../models/MatchResult"));
const JobPost_1 = __importDefault(require("../models/JobPost"));
const Candidate_1 = __importDefault(require("../models/Candidate"));
const aiService_1 = require("../services/aiService");
const generateMatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobPostId, candidateId } = req.body;
        const job = yield JobPost_1.default.findById(jobPostId);
        const candidate = yield Candidate_1.default.findById(candidateId);
        if (!job || !candidate) {
            return res.status(404).json({ message: 'Job or Candidate not found' });
        }
        // Check if match already exists
        let match = yield MatchResult_1.default.findOne({ jobPostId, candidateId });
        if (match) {
            return res.json(match);
        }
        // Generate score
        const scoreData = yield (0, aiService_1.calculateMatchScore)(job, candidate);
        match = new MatchResult_1.default(Object.assign({ jobPostId,
            candidateId }, scoreData));
        yield match.save();
        res.status(201).json(match);
    }
    catch (error) {
        console.error('Error generating match:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.generateMatch = generateMatch;
const getMatchesForJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId } = req.params;
        const job = yield JobPost_1.default.findById(jobId);
        if (!job)
            return res.status(404).json({ message: 'Job not found' });
        // Auto-generate matches for all candidates that don't have one
        const allCandidates = yield Candidate_1.default.find();
        for (const candidate of allCandidates) {
            const existing = yield MatchResult_1.default.findOne({ jobPostId: jobId, candidateId: candidate._id });
            if (!existing) {
                const scoreData = yield (0, aiService_1.calculateMatchScore)(job, candidate);
                yield new MatchResult_1.default(Object.assign({ jobPostId: jobId, candidateId: candidate._id }, scoreData)).save();
            }
        }
        const matches = yield MatchResult_1.default.find({ jobPostId: jobId })
            .populate('candidateId')
            .sort({ overallScore: -1 });
        res.json(matches);
    }
    catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getMatchesForJob = getMatchesForJob;
