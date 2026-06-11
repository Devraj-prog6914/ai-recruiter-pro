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
exports.getCandidateById = exports.getCandidates = exports.uploadResume = void 0;
const Candidate_1 = __importDefault(require("../models/Candidate"));
const aiService_1 = require("../services/aiService");
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const uploadResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const name = req.body.name || 'Unknown Candidate';
        const email = req.body.email || 'unknown@example.com';
        const phone = req.body.phone || '';
        // Parse PDF
        const pdfData = yield (0, pdf_parse_1.default)(req.file.buffer);
        const resumeText = pdfData.text;
        // AI Extraction
        const extractedData = yield (0, aiService_1.parseResumeText)(resumeText);
        const newCandidate = new Candidate_1.default(Object.assign({ name,
            email,
            phone,
            resumeText }, extractedData));
        yield newCandidate.save();
        res.status(201).json(newCandidate);
    }
    catch (error) {
        console.error('Error uploading resume:', error);
        res.status(500).json({ message: 'Server error parsing resume' });
    }
});
exports.uploadResume = uploadResume;
const getCandidates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = yield Candidate_1.default.find().sort({ createdAt: -1 });
        res.json(candidates);
    }
    catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getCandidates = getCandidates;
const getCandidateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidate = yield Candidate_1.default.findById(req.params.id);
        if (!candidate)
            return res.status(404).json({ message: 'Candidate not found' });
        res.json(candidate);
    }
    catch (error) {
        console.error('Error fetching candidate:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getCandidateById = getCandidateById;
