"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const professor_1 = require("../middleware/professor");
const professor_2 = require("../controller/professor");
const professor_3 = require("../services/professor");
const upload_1 = require("../services/upload");
const router = (0, express_1.Router)();
router.get('/class', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getClassController);
router.get('/class/statistics', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getClassStatisticsController);
router.post('/announcement', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.addAnnouncementController);
router.delete('/delete', professor_3.deleteAnnouncement);
router.post('/check', authentication_1.authenticateToken, professor_1.professorOnly, upload_1.upload.array('file'), professor_2.addCheckController);
router.get('/check', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getCheckController);
router.get('/check/task', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getCheckTaskController);
router.put('/check/task/editHighScore', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.editHighScoreCheckController);
router.get('/check/task/submission', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getCheckTaskSubmissionController);
router.put('/check/task/score', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.scoreStudentsCheckController);
router.delete('/check/all/delete', professor_2.deleteAllCheckController);
router.delete('/check/delete', professor_2.deleteCheckController);
router.post('/coach', authentication_1.authenticateToken, professor_1.professorOnly, upload_1.upload.array('file'), professor_2.addCoachController);
router.get('/coach', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getCoachController);
router.get('/coach/task', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getCoachTaskController);
router.delete('/coach/all/delete', professor_2.deleteAllCoachController);
router.delete('/coach/delete', professor_2.deleteCoachController);
router.post('/connect', authentication_1.authenticateToken, professor_1.professorOnly, upload_1.upload.array('file'), professor_2.addConnectController);
router.get('/connect', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getConnectController);
router.get('/connect/task', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getConnectTaskController);
router.put('/connect/task/editHighScore', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.editHighScoreConnectController);
router.get('/connect/task/submission', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.getConnectTaskSubmissionController);
router.put('/connect/task/score', authentication_1.authenticateToken, professor_1.professorOnly, professor_2.scoreStudentsConnectController);
router.delete('/connect/all/delete', professor_2.deleteAllConnectController);
router.delete('/connect/delete', professor_2.deleteConnectController);
exports.default = router;
