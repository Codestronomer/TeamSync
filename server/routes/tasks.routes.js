import express from 'express';
import { } from '../controllers/tasks.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

// initialize express router
const router = express.Router();

router.get('/:teamId', verifyToken)