import express from "express";
import { getProfile, newProfile } from "../controllers/profile.controller.js";

const router = express.Router()

router.post('/profile', newProfile);
router.get('/profile', getProfile);

const profileRouter = router;

export default profileRouter;

