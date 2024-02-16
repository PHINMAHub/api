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
exports.postAnnouncement = exports.getAllAnouncement = void 0;
const user_1 = require("../models/user");
const announcement_1 = require("../models/classModel/announcement");
const getAllAnouncement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.Student.find({}, 'studentSubjects')
            .populate({
            path: 'studentSubjects',
            populate: {
                path: 'class',
                populate: {
                    path: 'announcement',
                },
            },
        })
            .exec();
        return result;
    }
    catch (error) {
        return { 'message': 'No Announcement' };
    }
});
exports.getAllAnouncement = getAllAnouncement;
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
