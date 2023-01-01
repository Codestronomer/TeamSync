import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getProject, createProject } from '../controllers/project.controller.js';

const router = express.Router()

router.get('/:id', verifyToken, getProject);
router.post('/', verifyToken, createProject);

export default router;