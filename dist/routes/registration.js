"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registration_1 = require("../controller/registration");
const router = (0, express_1.Router)();
// add authentication admins only
router.post('/add/subject', registration_1.addSubjectController);
router.delete('/delete/subject', registration_1.deleteAllSubjectController);
router.get('/subject', registration_1.getSubjectController);
router.post('/add/class', registration_1.addClassController);
router.get('/delete/class', registration_1.deleteAllClassController);
router.post('/enroll/student/class', registration_1.enrollStudentInClassController);
router.post('/remove/student/class', registration_1.removeStudentInClassController);
exports.default = router;
