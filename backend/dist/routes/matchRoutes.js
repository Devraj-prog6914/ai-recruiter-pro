"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matchController_1 = require("../controllers/matchController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/generate', auth_1.auth, matchController_1.generateMatch);
router.get('/job/:jobId', auth_1.auth, matchController_1.getMatchesForJob);
exports.default = router;
