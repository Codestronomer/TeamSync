import express from "express";
import { getUser, newProfile, getUsers } from "../controllers/user.controller.js";
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/profile', newProfile);

// Route to get user by id
router.get('/:id', verifyToken, getUser);

// Get users from db
router.get('/', verifyToken, getUsers)

const userRouter = router;

export default userRouter;

