import express, { Express, Request, Response, Router } from 'express';

import { authenticateToken } from '../middleware/authentication';
import { studentOnly } from '../middleware/student';
import { getAnnouncementController, getCheckController, getCoachController, getConnectController, submitCheckController, submitConnectController } from '../controller/student';
import { getCheckTaskController, getCoachTaskController, getConnectTaskController } from '../controller/professor';

const router = Router();

router.get('/feed', authenticateToken, studentOnly, getAnnouncementController);
router.get('/check', authenticateToken, studentOnly, getCheckController);
router.post('/check', authenticateToken, studentOnly, submitCheckController);
router.get('/check/task', authenticateToken, studentOnly, getCheckTaskController);
router.get('/connect', authenticateToken, studentOnly, getConnectController);
router.post('/connect', authenticateToken, studentOnly, submitConnectController);
router.get('/connect/task', authenticateToken, studentOnly, getConnectTaskController);
router.get('/coach', authenticateToken, studentOnly, getCoachController);
router.get('/coach/task', authenticateToken, studentOnly, getCoachTaskController);

export default router;
