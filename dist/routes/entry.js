"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const entry_1 = require("../controller/entry");
const authentication_1 = require("../middleware/authentication");
const router = (0, express_1.Router)();
router.post('/login', entry_1.loginUserController);
router.post('/checkcurrentuser', authentication_1.authenticateToken, entry_1.checkCurrentUser);
// authenticate where only admins can register users
router.post('/signup', entry_1.registerUserController);
exports.default = router;
