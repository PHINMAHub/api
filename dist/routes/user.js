"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../services/user");
const router = (0, express_1.Router)();
// JUST FOR CHECKING
router.get('/all', user_1.findAllUsers);
router.delete('/all', user_1.deleteAllUsers);
// router.get('/student', findAllStudent);
// router.get('/student/:id', findStudent);
// router.put('/student/:id', updateStudent);
// router.delete('/student/:id', deleteStudent);
// router.post('/student', registerUserController);
exports.default = router;
