import { getTeam, getTeams, createTeam, updateTeam, deleteTeam } from '../controllers/team.controller.js';
import express from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';

// initialize express router
const router = express.Router()

// get all teams for a project
router.get('/project/:id', verifyToken, getTeams);

// get a team in a project
router.get('/:teamId/project/:projectId/', verifyToken, getTeam);

// create a team
router.post('/', verifyToken, createTeam);
// update a team
router.put('/:teamId/project/:projectId', verifyToken, updateTeam);

// delete a team
router.delete('/:teamId/project/:projectId', verifyToken, deleteTeam);

export default router;