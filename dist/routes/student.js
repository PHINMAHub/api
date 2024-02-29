"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const student_1 = require("../middleware/student");
const student_2 = require("../controller/student");
const professor_1 = require("../controller/professor");
const router = (0, express_1.Router)();
router.get('/feed', authentication_1.authenticateToken, student_1.studentOnly, student_2.getAnnouncementController);
router.get('/check', authentication_1.authenticateToken, student_1.studentOnly, student_2.getCheckController);
router.post('/check', authentication_1.authenticateToken, student_1.studentOnly, student_2.submitCheckController);
router.get('/check/task', authentication_1.authenticateToken, student_1.studentOnly, professor_1.getCheckTaskController);
router.get('/connect', authentication_1.authenticateToken, student_1.studentOnly, student_2.getConnectController);
router.post('/connect', authentication_1.authenticateToken, student_1.studentOnly, student_2.submitConnectController);
router.get('/connect/task', authentication_1.authenticateToken, student_1.studentOnly, professor_1.getConnectTaskController);
router.get('/coach', authentication_1.authenticateToken, student_1.studentOnly, student_2.getCoachController);
router.get('/coach/task', authentication_1.authenticateToken, student_1.studentOnly, professor_1.getCoachTaskController);
exports.default = router;
