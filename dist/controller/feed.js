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
exports.postAnnoucementController = exports.getAnnouncementController = void 0;
const feed_1 = require("../services/feed");
const getAnnouncementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, userType } = req.user || {};
        if (userID) {
            let result;
            if (userType === 'student') {
                result = yield (0, feed_1.getAllStudentAnouncement)(userID);
            }
            else {
                result = yield (0, feed_1.getAllProfessorAnouncement)(userID);
            }
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    }
    catch (_a) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getAnnouncementController = getAnnouncementController;
const postAnnoucementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, userName, userType } = req.user || {};
        const { header, announcement, classID } = req.body;
        if (!userID) {
            return res.status(400).json({ message: 'Unauthorize' });
        }
        if (userType === 'Professor') {
            const announcementResult = yield (0, feed_1.postAnnouncement)(header, announcement, userID, classID);
            if (!announcementResult) {
                return res.status(500).json({ 'message': 'Internal Server Error' });
            }
            return res.status(200).json({ 'message': 'Announcement posted.' });
        }
        return res.status(401).json({ 'message': 'Unauthorized.' });
    }
    catch (_b) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.postAnnoucementController = postAnnoucementController;
