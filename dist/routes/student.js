"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const student_1 = require("../middleware/student");
const student_2 = require("../controller/student");
const router = (0, express_1.Router)();
router.get('/feed', authentication_1.authenticateToken, student_1.studentOnly, student_2.getAnnouncementController);
exports.default = router;
