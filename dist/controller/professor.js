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
exports.addAnnouncementController = void 0;
const professor_1 = require("../services/professor");
const addAnnouncementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { header, announcement, classID } = req.body;
        const professorID = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userID;
        const result = yield (0, professor_1.addAnnouncement)(header, announcement, professorID, classID);
        return res.status(result.httpCode).json({ 'message': result.message });
    }
    catch (error) {
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addAnnouncementController = addAnnouncementController;
