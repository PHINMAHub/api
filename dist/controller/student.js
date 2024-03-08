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
exports.getConnectTaskController = exports.getCheckTaskController = exports.submitConnectController = exports.unSubmitCheckController = exports.submitCheckController = exports.getCoachController = exports.getCheckController = exports.getConnectController = exports.getAnnouncementController = void 0;
const student_1 = require("../services/student");
const getAnnouncementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const studentID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userID;
        const result = yield (0, student_1.getAnnouncement)(studentID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getAnnouncementController = getAnnouncementController;
const getConnectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const studentID = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userID;
        const result = yield (0, student_1.getConnect)(studentID);
        return res.status(200).json({ 'message': result });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getConnectController = getConnectController;
const getCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const studentID = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userID;
        const result = yield (0, student_1.getCheck)(studentID);
        return res.status(200).json({ 'message': result });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCheckController = getCheckController;
const getCoachController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const studentID = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userID;
        const result = yield (0, student_1.getCoach)(studentID);
        return res.status(200).json({ 'message': result });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCoachController = getCoachController;
const submitCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.user || {};
        const { taskID } = req.body;
        //@ts-ignore
        const result = yield (0, student_1.submitCheck)(taskID, userID, req.files);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.submitCheckController = submitCheckController;
const unSubmitCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.user || {};
        const { taskID } = req.body;
        const result = yield (0, student_1.unSubmitCheck)(taskID, userID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.unSubmitCheckController = unSubmitCheckController;
const submitConnectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const userID = (_e = req.user) === null || _e === void 0 ? void 0 : _e.userID;
        const { taskID, choiceID } = req.body;
        const result = yield (0, student_1.submitConnect)(taskID, userID, choiceID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.submitConnectController = submitConnectController;
const getCheckTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userID = (_f = req.user) === null || _f === void 0 ? void 0 : _f.userID;
        const taskID = req.query.taskID;
        if (taskID) {
            let result;
            result = yield (0, student_1.getCheckTask)(taskID, userID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_g) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCheckTaskController = getCheckTaskController;
const getConnectTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const userID = (_h = req.user) === null || _h === void 0 ? void 0 : _h.userID;
        const taskID = req.query.taskID;
        if (taskID) {
            let result;
            result = yield (0, student_1.getConnectTask)(taskID, userID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_j) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getConnectTaskController = getConnectTaskController;
