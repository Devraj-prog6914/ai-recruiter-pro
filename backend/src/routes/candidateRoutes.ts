import { Router } from 'express';
import multer from 'multer';
import { uploadResume, getCandidates, getCandidateById } from '../controllers/candidateController';
import { auth } from '../middleware/auth';

const router = Router();
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
  }
});
const upload = multer({ storage });

router.post('/upload', auth, upload.single('resume'), uploadResume);
router.get('/', auth, getCandidates);
router.get('/:id', auth, getCandidateById);

export default router;
