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
exports.getUserNotificationController = exports.getUserSubjectsController = exports.getUserProfileController = void 0;
const user_1 = require("../services/user");
const notification_1 = require("../services/notification");
const getUserProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, userType } = req.user || {};
        if (!userID) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (userID && userType) {
            const result = yield (0, user_1.getUserProfile)(userID, userType);
            return res.status(result.httpCode).json(result.message);
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getUserProfileController = getUserProfileController;
const getUserSubjectsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, userType } = req.user || {};
        if (!userID) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (userID && userType) {
            const result = yield (0, user_1.getUserSubject)(userID, userType);
            return res.status(result.httpCode).json(result.message);
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getUserSubjectsController = getUserSubjectsController;
const getUserNotificationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, userType } = req.user || {};
        if (!userID) {
            return res.status(400).json({ message: 'User ID not provided' });
        }
        if (userID && userType) {
            const result = yield (0, notification_1.getUserNotification)(userID);
            return res.status(result.httpCode).json(result.message);
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getUserNotificationController = getUserNotificationController;
