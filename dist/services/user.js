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
exports.findProfessorByID = exports.deleteAllUsers = exports.findAllUsers = void 0;
const user_1 = require("../models/user");
const announcement_1 = require("../models/classModel/announcement");
const class_1 = require("../models/classModel/class");
const professorClass_1 = require("../models/classModel/professorClass");
const studentClass_1 = require("../models/classModel/studentClass");
const subject_1 = require("../models/classModel/subject");
const inbox_1 = require("../models/inbox");
const message_1 = require("../models/message");
const findAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield user_1.Student.find({})
            .populate('userCredentials')
            .populate({
            path: 'studentSubjects',
            populate: {
                path: 'class',
            },
        })
            .exec();
        const professor = yield user_1.Professor.find({})
            .populate('userCredentials')
            .populate({
            path: 'professorHandledClass',
            populate: {
                path: 'class',
            },
        })
            .exec();
        const admin = yield user_1.Admin.find({}).populate('userCredentials').exec();
        const announcement = yield announcement_1.Announcement.find({});
        const check = yield class_1.Check.find({});
        const connect = yield class_1.Connect.find({});
        const coach = yield class_1.Coach.find({});
        const classes = yield class_1.Class.find({}).populate('professor').populate('subject').exec();
        const professorHandledClass = yield professorClass_1.ProfessorHandledClass.find({});
        const studentConnectSubmission = yield studentClass_1.StudentConnectSubmission.find({});
        const studentCheckSubmission = yield studentClass_1.StudentCheckSubmission.find({});
        const studentCoachView = yield studentClass_1.StudentCoachView.find({});
        const studentSubjects = yield studentClass_1.StudentSubjects.find({});
        const subject = yield subject_1.Subject.find({});
        const inbox = yield inbox_1.Inbox.find({});
        const message = yield message_1.Message.find({});
        res.status(200).json({ admin, students, professor, announcement, check, connect, coach, classes, professorHandledClass, studentConnectSubmission, studentCheckSubmission, studentCoachView, studentSubjects, subject, inbox, message });
    }
    catch (error) {
        res.status(500).json('No Students found');
    }
});
exports.findAllUsers = findAllUsers;
const deleteAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield user_1.Student.deleteMany({});
        const admin = yield user_1.Admin.deleteMany({});
        const professor = yield user_1.Professor.deleteMany({});
        const userCredentials = yield user_1.UserCredentials.deleteMany({});
        const announcement = yield announcement_1.Announcement.deleteMany({});
        const check = yield class_1.Check.deleteMany({});
        const connect = yield class_1.Connect.deleteMany({});
        const coach = yield class_1.Coach.deleteMany({});
        const classes = yield class_1.Class.deleteMany({});
        const professorHandledClass = yield professorClass_1.ProfessorHandledClass.deleteMany({});
        const studentConnectSubmission = yield studentClass_1.StudentConnectSubmission.deleteMany({});
        const studentCheckSubmission = yield studentClass_1.StudentCheckSubmission.deleteMany({});
        const studentCoachView = yield studentClass_1.StudentCoachView.deleteMany({});
        const studentSubjects = yield studentClass_1.StudentSubjects.deleteMany({});
        const subject = yield subject_1.Subject.deleteMany({});
        const inbox = yield inbox_1.Inbox.deleteMany({});
        const message = yield message_1.Message.deleteMany({});
        if (students.deletedCount + userCredentials.deletedCount + professor.deletedCount > 0) {
            return res.status(200).json({ message: 'All users deleted successfully' });
        }
        else {
            return res.status(404).json({ message: 'No users found to delete' });
        }
    }
    catch (error) {
        res.status(500).json('Error deleting All users');
    }
});
exports.deleteAllUsers = deleteAllUsers;
const findProfessorByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professor = yield user_1.Professor.findById(id);
        return professor;
    }
    catch (error) {
        return { 'message': 'No professor found', 'httpCode': 500 };
    }
});
exports.findProfessorByID = findProfessorByID;
