"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.openConversation = exports.getUsers = void 0;
const message_1 = require("../models/message");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = req.params.userID;
        const users = yield (0, message_1.getAllChat)(userID);
        const chatUsers = [];
        let data = { message: "NO INBOX" };
        yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user["User1ID"] != userID) {
                data = yield (0, message_1.getLatestMessage)(user["User1ID"], userID);
            }
            else {
                data = yield (0, message_1.getLatestMessage)(user["User2ID"], userID);
            }
            chatUsers.push(Object.assign({ userID: userID }, data));
        })));
        res.status(200).json(data);
    }
    catch (_a) {
        res.status(500).json({ "message": "Internal Server Error" });
        return;
    }
});
exports.getUsers = getUsers;
const openConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderID, receiverID } = req.body;
        if (senderID == undefined || receiverID == undefined)
            return res.status(500).json({ "message": "Internal Server Error" });
        const chatID = yield (0, message_1.getChatID)(senderID, receiverID);
        if (chatID[0]["ChatID"] > 0) {
            let messages = yield (0, message_1.getPastMessages)(chatID[0]["ChatID"]);
            if (messages.length == 0) {
                messages = { "message": "NO MESSAGES" };
            }
            res.status(200).json(messages);
        }
        else {
            if (yield (0, message_1.createConversation)(senderID, receiverID)) {
                res.status(200).json({ "message": "success" });
            }
            else {
                res.status(500).json({ "message": "Internal Server Error" });
            }
            return;
        }
        return;
    }
    catch (_b) {
        res.status(500).json({ "message": "Internal Server Error" });
        return;
    }
});
exports.openConversation = openConversation;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderID, receiverID, message } = req.body;
        let chatID = yield (0, message_1.getChatID)(senderID, receiverID);
        if (chatID.length > 0) {
            (0, message_1.addMessagetoDatabase)(chatID, message, senderID);
        }
        else {
            let success = yield (0, message_1.createConversation)(senderID, receiverID);
            if (success[0]) {
                (0, message_1.addMessagetoDatabase)(success[1], message, senderID);
                res.status(200).json({ "message": "success" });
            }
            else {
                res.status(500).json({ "message": "Internal Server Error" });
            }
            return;
        }
    }
    catch (_c) {
        res.status(500).json({ "message": "Internal Server Error" });
        return;
    }
});
exports.sendMessage = sendMessage;
