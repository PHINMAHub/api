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
exports.addSubject = void 0;
const studentClass_1 = require("../models/classModel/studentClass");
const addSubject = (subjectCode, subjectDescription) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield new studentClass_1.Subject({
            subjectCode,
            subjectDescription,
        }).save();
        return { message: 'User saved to the database', httpCode: 200 };
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.addSubject = addSubject;
