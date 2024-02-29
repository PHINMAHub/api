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
exports.deleteConnectController = exports.deleteAllConnectController = exports.deleteCoachController = exports.deleteAllCoachController = exports.deleteCheckController = exports.deleteAllCheckController = exports.addConnectController = exports.addCoachController = exports.addCheckController = exports.addAnnouncementController = exports.getConnectTaskSubmissionController = exports.getCheckTaskSubmissionController = exports.getConnectTaskController = exports.getCheckTaskController = exports.getCoachTaskController = exports.getConnectController = exports.getCheckController = exports.getCoachController = exports.getClassController = void 0;
const professor_1 = require("../services/professor");
const getClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, userType } = req.user || {};
        if (userID) {
            let result;
            result = yield (0, professor_1.getClass)(userID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Unauthorize' });
    }
    catch (_a) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getClassController = getClassController;
const getCoachController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getCoach)(classID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_b) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCoachController = getCoachController;
const getCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getCheck)(classID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_c) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCheckController = getCheckController;
const getConnectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getConnect)(classID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_d) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getConnectController = getConnectController;
const getCoachTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getCoachTask)(classID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_e) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCoachTaskController = getCoachTaskController;
const getCheckTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getCheckTask)(classID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_f) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCheckTaskController = getCheckTaskController;
const getConnectTaskController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getConnectTask)(classID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_g) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getConnectTaskController = getConnectTaskController;
const getCheckTaskSubmissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        const taskID = req.query.taskID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getCheckTaskSubmission)(classID, taskID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_h) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getCheckTaskSubmissionController = getCheckTaskSubmissionController;
const getConnectTaskSubmissionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = req.query.classID;
        const taskID = req.query.taskID;
        if (classID) {
            let result;
            result = yield (0, professor_1.getConnectTaskSubmission)(classID, taskID);
            return res.status(200).json({ 'message': result });
        }
        return res.status(401).json({ 'message': 'Class not found' });
    }
    catch (_j) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getConnectTaskSubmissionController = getConnectTaskSubmissionController;
const addAnnouncementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        const { header, announcement, classID } = req.body;
        if (!header) {
            return res.status(400).json({ 'message': 'Add Title' });
        }
        if (!announcement) {
            return res.status(400).json({ 'message': 'Add Description' });
        }
        const professorID = (_k = req.user) === null || _k === void 0 ? void 0 : _k.userID;
        const result = yield (0, professor_1.addAnnouncement)(header, announcement, professorID, classID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addAnnouncementController = addAnnouncementController;
// TODO: add delete and required checker
const addCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID, postTitle, postDescription, dueDate } = req.body;
        //@ts-ignore
        const result = yield (0, professor_1.addCheck)(classID, postTitle, postDescription, dueDate, req.files);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addCheckController = addCheckController;
const addCoachController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID, postTitle, postDescription } = req.body;
        //@ts-ignore
        const result = yield (0, professor_1.addCoach)(classID, postTitle, postDescription, req.files);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addCoachController = addCoachController;
const addConnectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID, postTitle, postDescription, dueDate, choices } = req.body;
        console.log(classID);
        if (choices) {
            let choicesArr = JSON.parse(choices);
            const result = yield (0, professor_1.addConnect)(classID, postTitle, postDescription, dueDate, choicesArr);
            return res.status(result.httpCode).json({ 'message': result.message });
        }
        return res.status(200).json({ 'message': 'Incomplete data' });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addConnectController = addConnectController;
const deleteAllCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID } = req.body;
        const result = yield (0, professor_1.deleteAllCheck)(classID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteAllCheckController = deleteAllCheckController;
const deleteCheckController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID, checkID } = req.body;
        const result = yield (0, professor_1.deleteCheck)(classID, checkID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteCheckController = deleteCheckController;
const deleteAllCoachController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID } = req.body;
        const result = yield (0, professor_1.deleteAllCheck)(classID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteAllCoachController = deleteAllCoachController;
const deleteCoachController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID, coachID } = req.body;
        const result = yield (0, professor_1.deleteCoach)(classID, coachID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteCoachController = deleteCoachController;
const deleteAllConnectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID } = req.body;
        const result = yield (0, professor_1.deleteAllConnect)(classID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteAllConnectController = deleteAllConnectController;
const deleteConnectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { classID, connectID } = req.body;
        const result = yield (0, professor_1.deleteConnect)(classID, connectID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteConnectController = deleteConnectController;
