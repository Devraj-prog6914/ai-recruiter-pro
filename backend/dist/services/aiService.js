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
exports.calculateMatchScore = exports.parseResumeText = exports.extractJobIntelligence = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const extractJobIntelligence = (rawDescription) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Extracting job intelligence...');
    // A simple mock extractor for the PoC
    const text = rawDescription.toLowerCase();
    const requiredSkills = [];
    const preferredSkills = [];
    const softSkills = [];
    if (text.includes('react'))
        requiredSkills.push('React');
    if (text.includes('node') || text.includes('node.js'))
        requiredSkills.push('Node.js');
    if (text.includes('typescript'))
        requiredSkills.push('TypeScript');
    if (text.includes('next.js') || text.includes('nextjs'))
        requiredSkills.push('Next.js');
    if (text.includes('mongodb') || text.includes('mongo'))
        requiredSkills.push('MongoDB');
    if (text.includes('flutter'))
        requiredSkills.push('Flutter');
    if (text.includes('firebase'))
        requiredSkills.push('Firebase');
    if (text.includes('aws') || text.includes('cloud'))
        preferredSkills.push('AWS');
    if (text.includes('docker'))
        preferredSkills.push('Docker');
    if (text.includes('communication'))
        softSkills.push('Communication');
    if (text.includes('leadership'))
        softSkills.push('Leadership');
    if (text.includes('teamwork') || text.includes('team player'))
        softSkills.push('Teamwork');
    let experienceRequirements = 'Not specified';
    if (text.match(/\d+\+?\s+years/)) {
        const match = text.match(/\d+\+?\s+years/);
        if (match)
            experienceRequirements = match[0];
    }
    let educationRequirements = 'Bachelor\'s Degree in Computer Science or related field (inferred)';
    if (text.includes('master'))
        educationRequirements = 'Master\'s Degree preferred';
    return {
        requiredSkills: requiredSkills.length > 0 ? requiredSkills : ['JavaScript', 'HTML/CSS'],
        preferredSkills,
        experienceRequirements,
        educationRequirements,
        industryRequirements: 'Technology / Software',
        softSkills: softSkills.length > 0 ? softSkills : ['Problem Solving', 'Adaptability']
    };
});
exports.extractJobIntelligence = extractJobIntelligence;
const parseResumeText = (resumeText) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('Parsing resume text with AI...');
    const text = resumeText.toLowerCase();
    const skills = [];
    if (text.includes('react'))
        skills.push('React');
    if (text.includes('node'))
        skills.push('Node.js');
    if (text.includes('typescript'))
        skills.push('TypeScript');
    if (text.includes('next.js') || text.includes('nextjs'))
        skills.push('Next.js');
    if (text.includes('mongodb'))
        skills.push('MongoDB');
    if (text.includes('docker'))
        skills.push('Docker');
    if (text.includes('aws'))
        skills.push('AWS');
    if (text.includes('flutter'))
        skills.push('Flutter');
    if (text.includes('firebase'))
        skills.push('Firebase');
    // Very basic mock extraction for PoC
    return {
        skills: skills.length > 0 ? skills : ['JavaScript', 'HTML/CSS', 'Git'],
        experienceYears: text.includes('senior') ? 5 : (((_a = text.match(/(\d+)\s+years?/)) === null || _a === void 0 ? void 0 : _a[1]) ? parseInt((_b = text.match(/(\d+)\s+years?/)) === null || _b === void 0 ? void 0 : _b[1]) : 2),
        education: ['B.S. Computer Science'],
        certifications: text.includes('aws') ? ['AWS Certified Developer'] : [],
        projects: ['E-commerce Platform', 'Chat Application'],
        workHistory: [{ role: 'Software Engineer', company: 'Tech Corp', duration: '2020-Present' }]
    };
});
exports.parseResumeText = parseResumeText;
const calculateMatchScore = (jobIntelligence, candidateData) => __awaiter(void 0, void 0, void 0, function* () {
    let skillScore = 0;
    const matchingSkills = [];
    const missingSkills = [];
    if (jobIntelligence.requiredSkills && jobIntelligence.requiredSkills.length > 0) {
        for (const skill of jobIntelligence.requiredSkills) {
            if (candidateData.skills.includes(skill)) {
                matchingSkills.push(skill);
                skillScore += 100 / jobIntelligence.requiredSkills.length;
            }
            else {
                missingSkills.push(skill);
            }
        }
    }
    const finalSkillScore = (skillScore / 100) * 40;
    let expScore = 0;
    if (candidateData.experienceYears >= 2)
        expScore = 15;
    if (candidateData.experienceYears >= 5)
        expScore = 20;
    const projScore = candidateData.projects && candidateData.projects.length > 0 ? 15 : 0;
    const eduScore = candidateData.education && candidateData.education.length > 0 ? 10 : 0;
    const actScore = 8;
    const behScore = 4;
    const overallScore = Math.round(finalSkillScore + expScore + projScore + eduScore + actScore + behScore);
    const strengths = [];
    if (finalSkillScore > 30)
        strengths.push('Strong skill alignment');
    if (expScore === 20)
        strengths.push('Highly experienced');
    if (projScore > 0)
        strengths.push('Relevant projects');
    if (strengths.length === 0)
        strengths.push('Solid baseline profile');
    const weaknesses = [];
    if (missingSkills.length > 0)
        weaknesses.push(`Missing key skills: ${missingSkills.join(', ')}`);
    const rationale = `Candidate ranked with a score of ${overallScore} because of ${strengths.join(' and ')}. ${weaknesses.length > 0 ? 'Note: ' + weaknesses[0] : 'Meets all requirements.'}`;
    return {
        overallScore,
        skillMatchScore: Math.round(finalSkillScore),
        experienceMatchScore: expScore,
        projectRelevanceScore: projScore,
        educationScore: eduScore,
        activityScore: actScore,
        behavioralScore: behScore,
        rationale,
        matchingSkills,
        missingSkills,
        strengths,
        weaknesses,
        confidenceScore: 85 + Math.floor(Math.random() * 10)
    };
});
exports.calculateMatchScore = calculateMatchScore;
