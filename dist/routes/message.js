"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const message_1 = require("../controller/message");
const router = (0, express_1.Router)();
router.get("/getUsers/:userID", message_1.getUsers);
router.post("/send", auth_1.authenticateToken, message_1.sendMessage);
router.post("/open", message_1.openConversation);
module.exports = router;
