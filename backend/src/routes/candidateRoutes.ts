import { Router } from 'express';
import multer from 'multer';
import { uploadResume, getCandidates, getCandidateById } from '../controllers/candidateController';
import { auth } from '../middleware/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', auth, upload.single('resume'), uploadResume);
router.get('/', auth, getCandidates);
router.get('/:id', auth, getCandidateById);

export default router;
