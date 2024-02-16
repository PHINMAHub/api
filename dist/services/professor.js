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
exports.deleteAnnouncement = exports.addAnnouncement = void 0;
const announcement_1 = require("../models/classModel/announcement");
const class_1 = require("../models/classModel/class");
const professorClass_1 = require("../models/classModel/professorClass");
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
