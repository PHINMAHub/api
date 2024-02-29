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
exports.submitConnect = exports.submitCheck = exports.getCoach = exports.getConnect = exports.getCheck = exports.getAnnouncement = void 0;
const user_1 = require("../models/user");
const studentClass_1 = require("../models/classModel/studentClass");
const class_1 = require("../models/classModel/class");
// export const findAllStudent = async (req: Request, res: Response) => {
//     try {
//         const students = await Student.find({});
//         res.status(200).json(students);
//     } catch (error) {
//         res.status(500).json('No Students found');
//     }
// };
// export const findStudent = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const student = await Student.findById(id);
//         res.status(200).json(student);
//     } catch (error) {
//         res.status(500).json("Student can't be found");
//     }
// };
// export const updateStudent = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const student = await Student.findByIdAndUpdate(id, req.body);
//         // cannot find any student in database
//         if (!student) {
//             res.status(404).json({ message: `Can't find any product with ID ${id}` });
//         }
//         // to see the latest update in postman
//         const updatedStudent = await Student.findById(id);
//         res.status(200).json(updatedStudent);
//     } catch (error: any) {
//         res.status(500).json({ message: error.message });
//     }
// };
// export const deleteStudent = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const student = await Student.findByIdAndDelete(id, req.body);
//         // cannot find any student in database
//         if (!student) {
//             res.status(404).json({ message: `Can't find any product with ID ${id}` });
//         }
//         // to see the latest update in postman
//         const updatedStudent = await Student.findById(id);
//         res.status(200).json(updatedStudent);
//     } catch (error: any) {
//         res.status(500).json({ message: error.message });
//     }
// };
// export const addStudent = async (req: Request, res: Response) => {
//     try {
//         const student = await Student.create(req.body);
//         res.status(200).json(student);
//     } catch (error: any) {
//         console.log(error.message);
//         res.status(500).json({ message: error.message });
//     }
// };
// ALL THINGS THAT STUDENT CAN DO IN THIS WEBSITE
const getAnnouncement = (studentID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.Student.find({}, 'studentSubjects')
            .populate({
            path: 'studentSubjects',
            populate: {
                path: 'class',
                populate: {
                    path: 'professor',
                    populate: {
                        path: 'professorHandledClass',
                        populate: [
                            {
                                path: 'class',
                                populate: {
                                    path: 'announcement',
                                },
                            },
                            {
                                path: 'announcement',
                            },
                        ],
                    },
                },
            },
        })
            .exec();
        const announcements = [];
        return { message: result, httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.getAnnouncement = getAnnouncement;
const getCheck = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noDueDate = [], thisWeek = [], nextWeek = [], later = [], missing = [];
        const classesObj = yield studentClass_1.StudentSubjects.findOne({ student: userID });
        for (const classObj of classesObj === null || classesObj === void 0 ? void 0 : classesObj.class) {
            const checks = yield class_1.Check.find({ class: classObj }).sort({ dueDate: 1 });
            for (const check of checks) {
                if (!check.studentSubmission.includes(userID)) {
                    if (check.dueDate) {
                        const date = new Date(check.dueDate);
                        const currentDate = new Date();
                        if (date < currentDate) {
                            missing.push(check);
                            continue;
                        }
                        const difference = date.getTime() - currentDate.getTime();
                        const differenceInWeeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
                        if (differenceInWeeks === 0) {
                            thisWeek.push(check);
                        }
                        else if (differenceInWeeks === 1) {
                            nextWeek.push(check);
                        }
                        else {
                            later.push(check);
                        }
                    }
                    else {
                        noDueDate.push(check);
                    }
                }
            }
        }
        return { noDueDate, thisWeek, nextWeek, later, missing };
    }
    catch (error) {
        return { 'message': 'No Check' };
    }
});
exports.getCheck = getCheck;
const getConnect = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thisWeek = [], nextWeek = [], later = [], missing = [];
        const classesObj = yield studentClass_1.StudentSubjects.findOne({ student: userID });
        for (const classObj of classesObj === null || classesObj === void 0 ? void 0 : classesObj.class) {
            const connects = yield class_1.Connect.find({ class: classObj }).populate('postChoices').sort({ dueDate: 1 });
            for (const connect of connects) {
                if (!connect.studentSubmission.includes(userID)) {
                    if (connect.dueDate) {
                        const date = new Date(connect.dueDate);
                        const currentDate = new Date();
                        if (date < currentDate) {
                            missing.push(connect);
                            continue;
                        }
                        const difference = date.getTime() - currentDate.getTime();
                        const differenceInWeeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
                        if (differenceInWeeks === 0) {
                            thisWeek.push(connect);
                        }
                        else if (differenceInWeeks === 1) {
                            nextWeek.push(connect);
                        }
                        else {
                            later.push(connect);
                        }
                    }
                }
            }
        }
        return { thisWeek, nextWeek, later, missing };
    }
    catch (error) {
        return { 'message': 'No Connect' };
    }
});
exports.getConnect = getConnect;
const getCoach = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const coachTask = [];
        const classesObj = yield studentClass_1.StudentSubjects.findOne({ student: userID });
        for (const classObj of classesObj === null || classesObj === void 0 ? void 0 : classesObj.class) {
            const coachs = yield class_1.Coach.find({ class: classObj })
                .populate({ path: 'class', populate: { path: 'subject' } })
                .sort({ createdAt: -1 });
            coachTask.push(...coachs);
        }
        return { coachTask };
    }
    catch (error) {
        return { 'message': 'No Coach' };
    }
});
exports.getCoach = getCoach;
const submitCheck = (taskID, userID, files) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newStudentCheckSubmission = yield new studentClass_1.StudentCheckSubmission({
            student: userID,
            task: taskID,
        }).save();
        if (files) {
            for (const file of files) {
                const imagePath = file.path;
                newStudentCheckSubmission.attachment.push(imagePath);
            }
            yield newStudentCheckSubmission.save();
        }
        let studentSubjectsSchema = yield studentClass_1.StudentSubjects.findOne({ student: userID });
        if (!studentSubjectsSchema) {
            return { message: 'Student not found', httpCode: 404 };
        }
        studentSubjectsSchema.studentCheckSubmission.push(newStudentCheckSubmission._id);
        yield studentSubjectsSchema.save();
        return { message: 'Check submitted', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.submitCheck = submitCheck;
const submitConnect = (taskID, userID, answerID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentConnectSubmissionSchema = yield new studentClass_1.StudentConnectSubmission({
            student: userID,
            answer: answerID,
            task: taskID,
        }).save();
        let studentSubjectsSchema = yield studentClass_1.StudentSubjects.findOne({ student: userID });
        if (!studentSubjectsSchema) {
            return { message: 'Student not found', httpCode: 404 };
        }
        studentSubjectsSchema.studentConnectSubmission.push(studentConnectSubmissionSchema._id);
        yield studentSubjectsSchema.save();
        return { message: 'Connect submitted', httpCode: 200 };
    }
    catch (error) {
        return { message: error.message, httpCode: 500 };
    }
});
exports.submitConnect = submitConnect;
