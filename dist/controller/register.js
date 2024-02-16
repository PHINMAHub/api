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
exports.addSubjectController = void 0;
const subject_1 = require("../services/subject");
const addSubjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subjectCode, subjectDescription } = req.body;
        // check auth and if not empty
        (0, subject_1.addSubject)(subjectCode, subjectDescription);
        return res.status(200).json({ 'message': 'Data' });
    }
    catch (_a) {
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
});
exports.addSubjectController = addSubjectController;
