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
exports.enrollStudentInClass = exports.deleteAllClass = exports.addClass = exports.deleteAllSubject = exports.checkSubjectAvailability = exports.getSubject = exports.addSubject = void 0;
const class_1 = require("../models/classModel/class");
const professorClass_1 = require("../models/classModel/professorClass");
const studentClass_1 = require("../models/classModel/studentClass");
const subject_1 = require("../models/classModel/subject");
const addSubject = (subjectCode, subjectDescription) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield new subject_1.Subject({
            subjectCode,
            subjectDescription,
        }).save();
        return { message: 'Subject saved to the database', httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.addSubject = addSubject;
const getSubject = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield subject_1.Subject.find({});
        return { message: subject, httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.getSubject = getSubject;
const checkSubjectAvailability = (subjectCode, subjectDescription) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield subject_1.Subject.find({ $or: [{ subjectCode: { $regex: new RegExp(`^${subjectCode}$`, 'i') } }, { subjectDescription: { $regex: new RegExp(`^${subjectDescription}$`, 'i') } }] });
        console.log(result);
        return result;
    }
    catch (error) {
        return false;
    }
});
exports.checkSubjectAvailability = checkSubjectAvailability;
const deleteAllSubject = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield subject_1.Subject.deleteMany({});
        if (subject.deletedCount > 0) {
            return { message: 'All subject deleted successfully', httpCode: 200 };
        }
        else {
            return { message: 'No subjects found to delete', httpCode: 200 };
        }
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.deleteAllSubject = deleteAllSubject;
const addClass = (professorID, block, subjectID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = yield new class_1.Class({
            professor: professorID,
            block: block,
            subject: subjectID,
        }).save();
        yield professorClass_1.ProfessorHandledClass.findOneAndUpdate({ professor: professorID }, { class: classID._id });
        return { message: 'Professor handling the class', httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.addClass = addClass;
const deleteAllClass = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield class_1.Class.deleteMany({});
        if (subject.deletedCount > 0) {
            return { message: 'All Class deleted successfully', httpCode: 200 };
        }
        else {
            return { message: 'No class found to delete', httpCode: 200 };
        }
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.deleteAllClass = deleteAllClass;
const enrollStudentInClass = (studentID, classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield studentClass_1.StudentSubjects.findOneAndUpdate({ student: studentID }, { $push: { class: classID } });
        yield class_1.Class.findByIdAndUpdate(classID, { $push: { students: studentID } });
        return { message: 'Student enrolled', httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.enrollStudentInClass = enrollStudentInClass;
