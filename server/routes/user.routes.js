import express from "express";
import { getUser, newProfile } from "../controllers/user.controller.js";
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/profile', newProfile);

// Route to get user by id
router.get('/:id', verifyToken, getUser);

const userRouter = router;

export default userRouter;

