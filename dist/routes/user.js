"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../services/user");
const authentication_1 = require("../middleware/authentication");
const user_2 = require("../controller/user");
const router = (0, express_1.Router)();
// JUST FOR CHECKING
router.get('/all', user_1.findAllUsers);
router.delete('/all', user_1.deleteAllUsers);
router.get('/profile', authentication_1.authenticateToken, user_2.getUserProfileController);
router.get('/course', authentication_1.authenticateToken, user_2.getUserSubjectsController);
router.get('/notification', authentication_1.authenticateToken, user_2.getUserNotificationController);
exports.default = router;
