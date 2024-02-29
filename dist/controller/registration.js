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
exports.removeStudentInClassController = exports.enrollStudentInClassController = exports.deleteAllClassController = exports.addClassController = exports.deleteAllSubjectController = exports.getSubjectController = exports.addSubjectController = void 0;
const registration_1 = require("../services/registration");
const addSubjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjectCode, subjectDescription } = req.body;
        // check auth and if not empty
        if (!(yield (0, registration_1.checkSubjectAvailability)(subjectCode, subjectDescription))) {
            return res.status(200).json({ 'message': 'Subject is in the database.' });
        }
        const result = yield (0, registration_1.addSubject)(subjectCode, subjectDescription);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (_a) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addSubjectController = addSubjectController;
const getSubjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check auth
        const result = yield (0, registration_1.getSubject)();
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (_b) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.getSubjectController = getSubjectController;
const deleteAllSubjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check auth
        const result = yield (0, registration_1.deleteAllSubject)();
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (_c) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteAllSubjectController = deleteAllSubjectController;
const addClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { professorID, block, subjectID } = req.body;
        // check auth and if not empty
        const result = yield (0, registration_1.addClass)(professorID, block, subjectID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (_d) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addClassController = addClassController;
const deleteAllClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check auth
        const result = yield (0, registration_1.deleteAllClass)();
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (_e) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.deleteAllClassController = deleteAllClassController;
const enrollStudentInClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID, classID } = req.body;
        // TODO: enroll student once
        const studentInClass = yield (0, registration_1.checkStudentInClass)(studentID, classID);
        if (!studentInClass) {
            const result = yield (0, registration_1.enrollStudentInClass)(studentID, classID);
            return res.status(result.httpCode).json({ 'message': result.message });
        }
        return res.status(200).json({ 'message': "Student is already enrolled" });
    }
    catch (_f) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.enrollStudentInClassController = enrollStudentInClassController;
const removeStudentInClassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID, classID } = req.body;
        const result = yield (0, registration_1.removeStudentInClass)(studentID, classID);
        return res.status(200).json({ 'message': result.message });
    }
    catch (_g) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.removeStudentInClassController = removeStudentInClassController;
