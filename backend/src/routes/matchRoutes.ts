import { Router } from 'express';
import { generateMatch, getMatchesForJob } from '../controllers/matchController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/generate', auth, generateMatch);
router.get('/job/:jobId', auth, getMatchesForJob);

export default router;
