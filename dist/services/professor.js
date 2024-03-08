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
exports.deleteConnect = exports.deleteAllConnect = exports.addConnect = exports.deleteCoach = exports.deleteAllCoach = exports.addCoach = exports.deleteCheck = exports.deleteAllCheck = exports.addCheck = exports.deleteAnnouncement = exports.addAnnouncement = exports.getConnectTaskSubmission = exports.scoreStudentsCheck = exports.scoreStudentsConnect = exports.getCheckTaskSubmission = exports.editHighScoreCheck = exports.editHighScoreConnect = exports.getConnectTask = exports.getCheckTask = exports.getCoachTask = exports.getConnect = exports.getCheck = exports.getCoach = exports.getClassStatistics = exports.getClass = void 0;
const user_1 = require("../models/user");
const announcement_1 = require("../models/classModel/announcement");
const class_1 = require("../models/classModel/class");
const professorClass_1 = require("../models/classModel/professorClass");
const notification_1 = require("./notification");
const studentClass_1 = require("../models/classModel/studentClass");
const storage_1 = require("firebase/storage");
const upload_1 = require("./upload");
// export const findAllProfessor = async (req: Request, res: Response) => {
//     try {
//         const professors = await Professor.find({});
//         res.status(200).json(professors);
//     } catch (error) {
//         res.status(500).json('No Professors found');
//     }
// };
// export const findProfessor = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const professor = await Professor.findById(id);
//         res.status(200).json(professor);
//     } catch (error) {
//         res.status(500).json("Professor can't be found");
//     }
// };
// export const updateProfessor = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const professor = await Professor.findByIdAndUpdate(id, req.body);
//         // cannot find any Professor in database
//         if (!professor) {
//             res.status(404).json({ message: `Can't find any product with ID ${id}` });
//         }
//         // to see the latest update in postman
//         const updatedProfessor = await Professor.findById(id);
//         res.status(200).json(updatedProfessor);
//     } catch (error: any) {
//         res.status(500).json({ message: error.message });
//     }
// };
// export const deleteProfessor = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const professor = await Professor.findByIdAndDelete(id, req.body);
//         // cannot find any Professor in database
//         if (!Professor) {
//             res.status(404).json({ message: `Can't find any product with ID ${id}` });
//         }
//         // to see the latest update in postman
//         const updatedProfessor = await Professor.findById(id);
//         res.status(200).json(updatedProfessor);
//     } catch (error: any) {
//         res.status(500).json({ message: error.message });
//     }
// };
// export const addProfessor = async (req: Request, res: Response) => {
//     try {
//         const professor = await Professor.create(req.body);
//         res.status(200).json(Professor);
//     } catch (error: any) {
//         res.status(500).json({ message: error.message });
//     }
// };
// THINGS THAT ONLY PROFESSOR CAN Create Update and Delete
// CLASS
const getClass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = [];
        const professorsClass = yield user_1.Professor.findOne({ _id: id }, 'professorHandledClass')
            .populate({
            path: 'professorHandledClass',
            populate: {
                path: 'class',
                populate: {
                    path: 'subject',
                },
            },
        })
            .exec();
        for (const classObj of (_a = professorsClass === null || professorsClass === void 0 ? void 0 : professorsClass.professorHandledClass[0]) === null || _a === void 0 ? void 0 : _a.class) {
            result.push(classObj);
        }
        return result;
    }
    catch (error) {
        return { 'message': ['No Class'] };
    }
});
exports.getClass = getClass;
const getClassStatistics = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = [];
        const professorsClass = yield class_1.Class.findById(classID)
            .populate({
            path: 'students',
            populate: {
                path: 'studentSubjects',
                populate: [
                    { path: 'studentCheckSubmission', populate: { path: 'task' } },
                    { path: 'studentConnectSubmission', populate: { path: 'task' } },
                ],
            },
        })
            .populate('connect')
            .populate('check');
        // for (const classObj of (professorsClass?.professorHandledClass[0] as any)?.class) {
        //     result.push(classObj);
        // }
        return professorsClass;
    }
    catch (error) {
        return { 'message': ['No Class'] };
    }
});
exports.getClassStatistics = getClassStatistics;
const getCoach = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield class_1.Coach.find({ class: classID }).sort({ createdAt: -1 });
        return result;
    }
    catch (error) {
        return { 'message': 'No Coach' };
    }
});
exports.getCoach = getCoach;
const getCheck = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield class_1.Check.find({ class: classID }).sort({ createdAt: -1 });
        return result;
    }
    catch (error) {
        return { 'message': 'No Check' };
    }
});
exports.getCheck = getCheck;
const getConnect = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield class_1.Connect.find({ class: classID }).sort({ createdAt: -1 });
        return result;
    }
    catch (error) {
        return { 'message': 'No Connect' };
    }
});
exports.getConnect = getConnect;
const getCoachTask = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield class_1.Coach.findById(classID).populate('attachment').exec();
        return result;
    }
    catch (error) {
        return { 'message': 'No Coach' };
    }
});
exports.getCoachTask = getCoachTask;
const getCheckTask = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield class_1.Check.findById(classID).populate('attachment').exec();
        return result;
    }
    catch (error) {
        return { 'message': 'No Check' };
    }
});
exports.getCheckTask = getCheckTask;
const getConnectTask = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield class_1.Connect.findById(classID).populate('postChoices').populate('class').exec();
        return result;
    }
    catch (error) {
        return { 'message': 'No Connect' };
    }
});
exports.getConnectTask = getConnectTask;
const editHighScoreConnect = (taskID, editedScoreInt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectTask = yield class_1.Connect.findOneAndUpdate({ _id: taskID }, { $set: { highestPossibleScore: editedScoreInt } }, { new: true });
        return { message: 'Task high score updated', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.editHighScoreConnect = editHighScoreConnect;
const editHighScoreCheck = (taskID, editedScoreInt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectTask = yield class_1.Check.findOneAndUpdate({ _id: taskID }, { $set: { highestPossibleScore: editedScoreInt } }, { new: true });
        return { message: 'Task high score updated', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.editHighScoreCheck = editHighScoreCheck;
const getCheckTaskSubmission = (taskID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentTurnedIn = [], studentGraded = [], studentAssigned = [];
        const task = yield class_1.Check.findById(taskID);
        if (!task) {
            return 'Class not found.';
        }
        const classID = task.class;
        const students = yield class_1.Class.findById(classID, 'students').populate('students');
        for (const student of students === null || students === void 0 ? void 0 : students.students) {
            const studentSubmission = yield studentClass_1.StudentCheckSubmission.findOne({ student, task: taskID }).populate('attachment').populate('student');
            if (studentSubmission) {
                if (studentSubmission.score) {
                    studentGraded.push([student, studentSubmission]);
                }
                else {
                    studentTurnedIn.push([student, studentSubmission]);
                }
            }
            else {
                studentAssigned.push([student]);
            }
        }
        return { studentTurnedIn, studentGraded, studentAssigned };
    }
    catch (error) {
        return { 'message': 'No Check' };
    }
});
exports.getCheckTaskSubmission = getCheckTaskSubmission;
const scoreStudentsConnect = (data, task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Object.entries(data).forEach(([student, score]) => __awaiter(void 0, void 0, void 0, function* () {
            let result = yield studentClass_1.StudentConnectSubmission.findOneAndUpdate({ student, task }, { score }, { upsert: true, new: true });
            console.log(result);
        }));
        return { message: 'Students score updated', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.scoreStudentsConnect = scoreStudentsConnect;
const scoreStudentsCheck = (data, task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Object.entries(data).forEach(([student, score]) => __awaiter(void 0, void 0, void 0, function* () {
            yield studentClass_1.StudentCheckSubmission.findOneAndUpdate({ student, task }, { score }, { upsert: true, new: true });
        }));
        return { message: 'Students score updated', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.scoreStudentsCheck = scoreStudentsCheck;
const getConnectTaskSubmission = (taskID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentTurnedIn = [], studentGraded = [], studentAssigned = [];
        const task = yield class_1.Connect.findById(taskID);
        if (!task) {
            return 'Class not found.';
        }
        const classID = task.class;
        const students = yield class_1.Class.findById(classID, 'students').populate('students');
        for (const student of students === null || students === void 0 ? void 0 : students.students) {
            const studentSubmission = yield studentClass_1.StudentConnectSubmission.findOne({ student, task: taskID }).populate('answer').populate('student');
            if (studentSubmission) {
                if (studentSubmission.score) {
                    studentGraded.push([student, studentSubmission]);
                }
                else {
                    studentTurnedIn.push([student, studentSubmission]);
                }
            }
            else {
                studentAssigned.push([student]);
            }
        }
        return { studentTurnedIn, studentGraded, studentAssigned };
    }
    catch (error) {
        return { 'message': 'No Connect' };
    }
});
exports.getConnectTaskSubmission = getConnectTaskSubmission;
// ANNOUNCEMENTS
const addAnnouncement = (header, announcement, professorID, classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newAnnouncement = yield new announcement_1.Announcement({
            header,
            announcement,
            professor: professorID,
        }).save();
        if (classID.toLowerCase() !== 'public') {
            let classScheme = yield class_1.Class.findById(classID);
            if (!classScheme) {
                return { message: 'Class not found', httpCode: 404 };
            }
            newAnnouncement.class = classScheme._id;
            classScheme.announcement.push(newAnnouncement._id);
            yield classScheme.save();
        }
        else {
            yield professorClass_1.ProfessorHandledClass.findOneAndUpdate({ professor: professorID }, { $push: { announcement: newAnnouncement._id } });
        }
        yield newAnnouncement.save();
        return { message: 'Announcement posted', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.addAnnouncement = addAnnouncement;
// TODO: temporary delete all announcement, add delete announcement that can be deleted by the professor that posted
const deleteAnnouncement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const announcement = yield announcement_1.Announcement.deleteMany({});
        res.status(200).json(announcement);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteAnnouncement = deleteAnnouncement;
const addCheck = (classID, postTitle, postDescription, dueDate, typeOfCheck, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newCheck = yield new class_1.Check({
            postTitle,
            postDescription,
            dueDate,
            typeOfCheck,
        }).save();
        if (files) {
            for (const file of files) {
                const storageRef = (0, storage_1.ref)(upload_1.storage, `files/${file.originalname}${new Date()}`);
                const metadata = {
                    contentType: file.mimetype,
                };
                const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metadata);
                const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                const fileType = file.mimetype.startsWith('image/') ? 'image' : 'docs';
                let newAttachment = yield new class_1.Attachement({ url: downloadURL, type: fileType }).save();
                newCheck.attachment.push(newAttachment._id);
            }
            yield newCheck.save();
        }
        let classScheme = yield class_1.Class.findById(classID);
        if (!classScheme) {
            return { message: 'Class not found', httpCode: 404 };
        }
        newCheck.class = classScheme._id;
        classScheme.check.push(newCheck._id);
        yield classScheme.save();
        yield newCheck.save();
        (0, notification_1.addTaskNotification)('Check', newCheck);
        return { message: 'Check posted', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.addCheck = addCheck;
const deleteAllCheck = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classClass = yield class_1.Class.findById(classID);
        if (classClass) {
            yield Promise.all(classClass.check.map((objID) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield class_1.Check.deleteOne({ _id: objID._id });
            })));
            classClass.check = [];
            yield classClass.save();
            return { message: 'Deleted all check', httpCode: 200 };
        }
        return { message: 'Deleted none', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.deleteAllCheck = deleteAllCheck;
const deleteCheck = (classID, checkID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classClass = yield class_1.Class.findById(classID);
        if (classClass) {
            yield class_1.Check.deleteOne({ _id: checkID });
            classClass.check = classClass.check.filter((check) => check._id.toString() !== checkID);
            yield classClass.save();
            return { message: 'Check deleted', httpCode: 200 };
        }
        return { message: 'Deleted none', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.deleteCheck = deleteCheck;
const addCoach = (classID, postTitle, postDescription, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newCoach = yield new class_1.Coach({
            postTitle,
            postDescription,
        }).save();
        if (files) {
            for (const file of files) {
                const storageRef = (0, storage_1.ref)(upload_1.storage, `files/${file.originalname}${new Date()}`);
                const metadata = {
                    contentType: file.mimetype,
                };
                const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, file.buffer, metadata);
                const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                const fileType = file.mimetype.startsWith('image/') ? 'image' : 'docs';
                let newAttachment = yield new class_1.Attachement({ url: downloadURL, type: fileType }).save();
                newCoach.attachment.push(newAttachment._id);
            }
            yield newCoach.save();
        }
        let classScheme = yield class_1.Class.findById(classID);
        if (!classScheme) {
            return { message: 'Class not found', httpCode: 404 };
        }
        newCoach.class = classScheme._id;
        classScheme.coach.push(newCoach._id);
        yield classScheme.save();
        yield newCoach.save();
        (0, notification_1.addTaskNotification)('Coach', newCoach);
        return { message: 'Coach posted', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.addCoach = addCoach;
const deleteAllCoach = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classClass = yield class_1.Class.findById(classID);
        if (classClass) {
            yield Promise.all(classClass.coach.map((objID) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield class_1.Coach.deleteOne({ _id: objID._id });
            })));
            classClass.coach = [];
            yield classClass.save();
            return { message: 'Deleted all coach', httpCode: 200 };
        }
        return { message: 'Deleted none', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.deleteAllCoach = deleteAllCoach;
const deleteCoach = (classID, coachID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classClass = yield class_1.Class.findById(classID);
        if (classClass) {
            yield class_1.Coach.deleteOne({ _id: coachID });
            classClass.coach = classClass.coach.filter((coach) => coach._id.toString() !== coachID);
            yield classClass.save();
            return { message: 'Coach deleted', httpCode: 200 };
        }
        return { message: 'Deleted none', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.deleteCoach = deleteCoach;
const addConnect = (classID, postTitle, postDescription, dueDate, choices) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newConnect = yield new class_1.Connect({
            postTitle,
            dueDate,
            postDescription,
        }).save();
        let classScheme = yield class_1.Class.findById(classID);
        if (!classScheme) {
            return { message: 'Class not found', httpCode: 404 };
        }
        newConnect.class = classScheme._id;
        yield Promise.all(choices.map((choice) => __awaiter(void 0, void 0, void 0, function* () {
            const connectChoice = yield new class_1.ConnectChoices({ choice }).save();
            newConnect.postChoices.push(connectChoice._id);
        })));
        classScheme.connect.push(newConnect._id);
        yield classScheme.save();
        yield newConnect.save();
        (0, notification_1.addTaskNotification)('Connect', newConnect);
        return { message: 'Connect posted', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.addConnect = addConnect;
const deleteAllConnect = (classID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classClass = yield class_1.Class.findById(classID);
        if (classClass) {
            yield Promise.all(classClass.connect.map((objID) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield class_1.Connect.deleteOne({ _id: objID._id });
            })));
            classClass.connect = [];
            yield classClass.save();
            return { message: 'Deleted all connect', httpCode: 200 };
        }
        return { message: 'Deleted none', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.deleteAllConnect = deleteAllConnect;
const deleteConnect = (classID, connectID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classClass = yield class_1.Class.findById(classID);
        if (classClass) {
            yield class_1.Connect.deleteOne({ _id: connectID });
            classClass.connect = classClass.connect.filter((connect) => connect._id.toString() !== connectID);
            yield classClass.save();
            return { message: 'Connect deleted', httpCode: 200 };
        }
        return { message: 'Deleted none', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.deleteConnect = deleteConnect;
