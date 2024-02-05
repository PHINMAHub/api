"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_1 = require("../controller/student");
const entry_1 = require("../controller/entry");
const router = (0, express_1.Router)();
router.get('/student', student_1.findAllStudent);
router.get('/student/:id', student_1.findStudent);
router.put('/student/:id', student_1.updateStudent);
router.delete('/student/:id', student_1.deleteStudent);
router.post('/student', entry_1.registerUserController);
exports.default = router;
