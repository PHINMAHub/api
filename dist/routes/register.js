"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("../controller/register");
const router = (0, express_1.Router)();
router.post('/add/subject', register_1.addSubjectController);
exports.default = router;
