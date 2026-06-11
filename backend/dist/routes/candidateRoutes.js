"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const candidateController_1 = require("../controllers/candidateController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post('/upload', auth_1.auth, upload.single('resume'), candidateController_1.uploadResume);
router.get('/', auth_1.auth, candidateController_1.getCandidates);
router.get('/:id', auth_1.auth, candidateController_1.getCandidateById);
exports.default = router;
