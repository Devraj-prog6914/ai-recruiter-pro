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
exports.getJobPostById = exports.getJobPosts = exports.createJobPost = void 0;
const JobPost_1 = __importDefault(require("../models/JobPost"));
const aiService_1 = require("../services/aiService");
const createJobPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, department, location, rawDescription } = req.body;
        const recruiterId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!recruiterId)
            return res.status(401).json({ message: 'Unauthorized' });
        const intelligence = yield (0, aiService_1.extractJobIntelligence)(rawDescription);
        const newJob = new JobPost_1.default(Object.assign({ recruiterId,
            title,
            department,
            location,
            rawDescription }, intelligence));
        yield newJob.save();
        res.status(201).json(newJob);
    }
    catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createJobPost = createJobPost;
const getJobPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const recruiterId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const jobs = yield JobPost_1.default.find({ recruiterId }).sort({ createdAt: -1 });
        res.json(jobs);
    }
    catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getJobPosts = getJobPosts;
const getJobPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const job = yield JobPost_1.default.findById(req.params.id);
        if (!job)
            return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    }
    catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getJobPostById = getJobPostById;
