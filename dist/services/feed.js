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
exports.postAnnouncement = exports.getAllProfessorAnouncement = exports.getAllStudentAnouncement = void 0;
const user_1 = require("../models/user");
const announcement_1 = require("../models/classModel/announcement");
const getAllStudentAnouncement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const professorID = [];
        const announcementID = [];
        const studentResult = yield user_1.Student.findOne({ _id: id }, 'studentSubjects/class')
            .populate({
            path: 'studentSubjects',
            populate: {
                path: 'class',
            },
        })
            .exec();
        for (const classObj of (_a = studentResult === null || studentResult === void 0 ? void 0 : studentResult.studentSubjects[0]) === null || _a === void 0 ? void 0 : _a.class) {
            announcementID.push(...classObj.announcement);
            const professorIDString = classObj.professor.toString();
            if (!professorID.includes(professorIDString)) {
                professorID.push(professorIDString);
            }
        }
        for (const professor of professorID) {
            const professorResult = yield user_1.Professor.findOne({ _id: professor }).populate('professorHandledClass');
            announcementID.push(...(professorResult === null || professorResult === void 0 ? void 0 : professorResult.professorHandledClass[0]).announcement);
        }
        const result = yield announcement_1.Announcement.find({ _id: { $in: announcementID } })
            .populate('professor')
            .populate({
            path: 'class',
            populate: {
                path: 'subject',
            },
        })
            .sort({ createdAt: -1 });
        return result;
    }
    catch (error) {
        return { 'message': 'No Announcement' };
    }
});
exports.getAllStudentAnouncement = getAllStudentAnouncement;
const getAllProfessorAnouncement = (professorID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield announcement_1.Announcement.find({ professor: professorID, class: null }).populate('professor').sort({ createdAt: -1 });
        return result;
    }
    catch (error) {
        return { 'message': 'No Announcement' };
    }
});
exports.getAllProfessorAnouncement = getAllProfessorAnouncement;
const postAnnouncement = (header, announcement, professor, classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new announcement_1.Announcement({
            header,
            announcement,
            professor,
            classID,
        }).save();
        return { message: 'Announcement saved to the database', httpCode: 200 };
    }
    catch (error) {
        return { message: "Announcement can't be found", httpCode: 500 };
    }
});
exports.postAnnouncement = postAnnouncement;
