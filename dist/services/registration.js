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
exports.getClassID = exports.getStudentID = exports.getSubjectID = exports.getProfessorID = exports.removeStudentInClass = exports.checkStudentInClass = exports.enrollStudentInClass = exports.deleteClass = exports.deleteAllClass = exports.addClass = exports.deleteAllSubject = exports.checkSubjectAvailability = exports.getSubject = exports.addSubject = void 0;
const class_1 = require("../models/classModel/class");
const professorClass_1 = require("../models/classModel/professorClass");
const studentClass_1 = require("../models/classModel/studentClass");
const subject_1 = require("../models/classModel/subject");
const user_1 = require("../models/user");
const entry_1 = require("../controller/entry");
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
        yield professorClass_1.ProfessorHandledClass.findOneAndUpdate({ professor: professorID }, { $push: { class: classID._id } });
        const subjectObj = yield subject_1.Subject.findById(subjectID);
        const professorObj = yield user_1.UserCredentials.findOne({ professorInformation: professorID });
        if (!subjectObj) {
            return { message: 'Subject not found.', httpCode: 404 };
        }
        if (!professorObj) {
            return { message: 'Professor not found.', httpCode: 404 };
        }
        const subjectCode = subjectObj.subjectCode;
        const professorUsername = professorObj.username;
        let str = `${subjectCode}${block}`;
        let modifiedID = str.replace(/ /g, '-').replace(/-/g, '');
        const channel = entry_1.serverClient.channel('messaging', modifiedID, {
            name: `${subjectCode}: ${block}`,
            members: [professorUsername],
            created_by_id: 'phubreal',
        });
        yield channel.create();
        return { message: 'Professor handling the class', httpCode: 200 };
    }
    catch (error) {
        console.log(error);
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
const deleteClass = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield class_1.Class.deleteOne({ _id: classID });
        if (subject.deletedCount > 0) {
            return { message: 'Class deleted successfully', httpCode: 200 };
        }
        else {
            return { message: 'No class found to delete', httpCode: 200 };
        }
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.deleteClass = deleteClass;
const enrollStudentInClass = (studentID, classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield studentClass_1.StudentSubjects.findOneAndUpdate({ student: studentID }, { $push: { class: classID } });
        yield class_1.Class.findByIdAndUpdate(classID, { $push: { students: studentID }, $inc: { totalStudents: 1 } });
        const classObj = yield class_1.Class.findById(classID);
        if (!classObj) {
            return { message: 'Class not found.', httpCode: 404 };
        }
        const subjectID = classObj.subject;
        const professorID = classObj.professor;
        const block = classObj.block;
        const subjectObj = yield subject_1.Subject.findById(subjectID);
        const professorObj = yield user_1.UserCredentials.findOne({ professorInformation: professorID });
        const studentObj = yield user_1.UserCredentials.findOne({ studentInformation: studentID });
        if (!subjectObj) {
            return { message: 'Subject not found.', httpCode: 404 };
        }
        if (!professorObj) {
            return { message: 'Professor not found.', httpCode: 404 };
        }
        if (!studentObj) {
            return { message: 'Student not found.', httpCode: 404 };
        }
        const subjectCode = subjectObj.subjectCode;
        const professorUsername = professorObj.username;
        const studentUsername = studentObj.username;
        let str = `${subjectCode}${block}`;
        let modifiedID = str.replace(/ /g, '-').replace(/-/g, '');
        const channel = entry_1.serverClient.channel('messaging', modifiedID);
        yield channel.addMembers([studentUsername]);
        const personalChannel = entry_1.serverClient.channel('messaging', {
            members: [professorUsername, studentUsername],
            created_by_id: 'phubreal',
        });
        yield personalChannel.create();
        return { message: 'Student enrolled', httpCode: 200 };
    }
    catch (error) {
        console.log(error);
        return { message: error, httpCode: 500 };
    }
});
exports.enrollStudentInClass = enrollStudentInClass;
const checkStudentInClass = (studentID, classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classResult = yield class_1.Class.findById(classID);
        let result = true;
        const studentObjectID = yield user_1.Student.findById(studentID);
        if (classResult && studentObjectID) {
            result = classResult.students.includes(studentObjectID._id);
        }
        return result;
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.checkStudentInClass = checkStudentInClass;
const removeStudentInClass = (studentID, classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield class_1.Class.updateOne({ _id: classID }, { $pull: { students: studentID } });
        yield studentClass_1.StudentSubjects.updateOne({ student: studentID }, { $pull: { class: classID } });
        if (result.modifiedCount === 1) {
            return { message: 'Student removed from class successfully.', success: true };
        }
        else {
            return { message: 'Student not found in class.', success: false };
        }
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.removeStudentInClass = removeStudentInClass;
const getProfessorID = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professor = yield user_1.Professor.find({ $or: [{ username: { $regex: new RegExp(query, 'i') } }, { firstName: { $regex: new RegExp(query, 'i') } }, { middleName: { $regex: new RegExp(query, 'i') } }, { lastName: { $regex: new RegExp(query, 'i') } }] })
            .populate('userCredentials')
            .exec();
        return { message: professor, httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.getProfessorID = getProfessorID;
const getSubjectID = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield subject_1.Subject.find({ $or: [{ subjectCode: { $regex: new RegExp(query, 'i') } }, { subjectDescription: { $regex: new RegExp(query, 'i') } }] });
        return { message: subject, httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.getSubjectID = getSubjectID;
const getStudentID = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield user_1.Student.find({ $or: [{ username: { $regex: new RegExp(query, 'i') } }, { firstName: { $regex: new RegExp(query, 'i') } }, { middleName: { $regex: new RegExp(query, 'i') } }, { lastName: { $regex: new RegExp(query, 'i') } }] })
            .populate('userCredentials')
            .exec();
        return { message: student, httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.getStudentID = getStudentID;
const getClassID = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const classID = await Class.find({
        //     $or: [{ 'professor.firstName': { $regex: new RegExp(query, 'i') } }, { 'professor.middleName': { $regex: new RegExp(query, 'i') } }, { 'professor.lastName': { $regex: new RegExp(query, 'i') } }, { 'subject.subjectDescription': { $regex: new RegExp(query, 'i') } }, { 'subject.subjectCode': { $regex: new RegExp(query, 'i') } }, { 'block': { $regex: new RegExp(query, 'i') } }],
        // })
        //     .populate('professor')
        //     .populate('subject');
        const regex = new RegExp(query, 'i');
        const professors = yield user_1.Professor.find({
            $or: [{ 'firstName': { $regex: regex } }, { 'middleName': { $regex: regex } }, { 'lastName': { $regex: regex } }],
        });
        const subjects = yield subject_1.Subject.find({
            $or: [{ 'subjectDescription': { $regex: regex } }, { 'subjectCode': { $regex: regex } }],
        });
        const q = {};
        if (professors.length > 0) {
            q['professor'] = { $in: professors.map((prof) => prof._id) };
        }
        if (subjects.length > 0) {
            q['subject'] = { $in: subjects.map((sub) => sub._id) };
        }
        var classID = yield class_1.Class.find(q).populate('professor').populate('subject');
        if (Object.keys(q).length === 0) {
            return { message: 'No class found.', httpCode: 404 };
        }
        else {
            return { message: classID, httpCode: 200 };
        }
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.getClassID = getClassID;
