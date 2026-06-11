import { Router } from 'express';
import { createJobPost, getJobPosts, getJobPostById } from '../controllers/jobController';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, createJobPost);
router.get('/', auth, getJobPosts);
router.get('/:id', auth, getJobPostById);

export default router;
