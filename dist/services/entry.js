"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserIDandType = exports.checkEmailAvailability = exports.checkUsernameAvailability = exports.registerUsertoDatabase = exports.loginUsertoDatabase = void 0;
const http_response_1 = require("../models/http-response");
const user_1 = require("../models/user");
const bcrypt = __importStar(require("bcrypt"));
const professorClass_1 = require("../models/classModel/professorClass");
const studentClass_1 = require("../models/classModel/studentClass");
const loginUsertoDatabase = (userIdentifier, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield user_1.UserCredentials.findOne({
            $or: [{ username: { $regex: new RegExp(`^${userIdentifier}$`, 'i') } }, { personalEmail: { $regex: new RegExp(`^${userIdentifier}$`, 'i') } }, { schoolEmail: { $regex: new RegExp(`^${userIdentifier}$`, 'i') } }],
        });
        if (result) {
            if (yield bcrypt.compare(password, result.passwordHash)) {
                return new http_response_1.HttpResponse({ 'message': 'success' }, 200);
            }
            return new http_response_1.HttpResponse({ 'message': 'Wrong Password.' }, 200);
        }
        return new http_response_1.HttpResponse({ 'message': 'User not Found.' }, 200);
    }
    catch (_a) {
        return new http_response_1.HttpResponse({ 'message': 'Internal Server Error.' }, 500);
    }
});
exports.loginUsertoDatabase = loginUsertoDatabase;
const registerUsertoDatabase = (firstName, middleName, lastName, username, personalEmail, schoolEmail, personalNumber, schoolNumber, address, birthday, password, userType, enrolled, course, section, studentID, department, active) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = yield bcrypt.genSalt();
        password = yield bcrypt.hash(password, saltRounds);
        const userCredentialResult = yield new user_1.UserCredentials({
            username,
            personalEmail,
            schoolEmail,
            passwordHash: password,
            userType,
        }).save();
        let user, userTypeID = 0;
        if (userType.toLowerCase() === 'student') {
            const studentSubjects = yield new studentClass_1.StudentSubjects({}).save();
            user = new user_1.Student({
                firstName,
                middleName,
                lastName,
                personalNumber,
                schoolNumber,
                address,
                birthday,
                studentID,
                course,
                section,
                enrolled,
                userCredentials: userCredentialResult._id,
                studentSubjects: studentSubjects._id,
            });
            studentSubjects.student = user._id;
            yield studentSubjects.save();
            userCredentialResult.studentInformation = user._id;
        }
        else if (userType.toLowerCase() === 'professor') {
            const professorClass = yield new professorClass_1.ProfessorHandledClass({}).save();
            user = new user_1.Professor({
                firstName,
                middleName,
                lastName,
                personalNumber,
                schoolNumber,
                address,
                birthday,
                department,
                active,
                userCredentials: userCredentialResult._id,
                professorHandledClass: professorClass._id,
            });
            professorClass.professor = user._id;
            yield professorClass.save();
            userCredentialResult.studentInformation = user._id;
        }
        else if (userType.toLowerCase() === 'admin') {
            user = new user_1.Admin({
                firstName,
                middleName,
                lastName,
                personalNumber,
                schoolNumber,
                address,
                birthday,
                active,
                department,
                userCredentials: userCredentialResult._id,
            });
            userCredentialResult.studentInformation = user._id;
        }
        if (user) {
            yield userCredentialResult.save();
            yield user.save();
            return { message: 'User saved to the database', httpCode: 200 };
        }
        else {
            yield user_1.UserCredentials.deleteOne({ _id: userCredentialResult._id });
            return { message: 'Error on saving the user', httpCode: 500 };
        }
    }
    catch (error) {
        return { message: error, httpCode: 500 };
    }
});
exports.registerUsertoDatabase = registerUsertoDatabase;
const checkUsernameAvailability = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (yield user_1.UserCredentials.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } })) === null;
        return result;
    }
    catch (error) {
        return false;
    }
});
exports.checkUsernameAvailability = checkUsernameAvailability;
const checkEmailAvailability = (emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (yield user_1.UserCredentials.findOne({ emailAddress: { $regex: new RegExp(`^${emailAddress}$`, 'i') } })) === null;
        return result;
    }
    catch (error) {
        return false;
    }
});
exports.checkEmailAvailability = checkEmailAvailability;
const getUserIDandType = (userIdentifier) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield user_1.UserCredentials.findOne({ $or: [{ username: { $regex: new RegExp(userIdentifier, 'i') } }, { personalEmail: { $regex: new RegExp(userIdentifier, 'i') } }, { schoolEmail: { $regex: new RegExp(userIdentifier, 'i') } }] }).populate('studentInformation').populate('professorInformation').populate('adminInformation');
    if (result) {
        let userID = result.userType === 'student' ? result.studentInformation : result.userType === 'professor' ? result.professorInformation : result.adminInformation;
        const userType = result.userType;
        const userData = userType === 'student' ? result.studentInformation : userType === 'professor' ? result.professorInformation : result.adminInformation;
        const userFullName = `${userData === null || userData === void 0 ? void 0 : userData.firstName} ${(_b = userData === null || userData === void 0 ? void 0 : userData.middleName) !== null && _b !== void 0 ? _b : userData === null || userData === void 0 ? void 0 : userData.middleName} ${userData === null || userData === void 0 ? void 0 : userData.lastName}`;
        const username = result === null || result === void 0 ? void 0 : result.username;
        return [userID, userType, userFullName, username];
    }
    return null;
});
exports.getUserIDandType = getUserIDandType;
// export const getUserIDByUsername = async (username: String): Promise<boolean> => {
// const [result] : Array<any> = await pool.query(`SELECT UserID FROM user_login_data WHERE Username = ?;`, username)
// return result[0]["UserID"]
//     return false;
// };
// export const getUserIDByEmailAddress = async (email: String): Promise<boolean> => {
// const [result] : Array<any> = await pool.query(`SELECT UserID FROM user_login_data WHERE EmailAddress = ?;`, email)
// return result[0]["UserID"]
//     return false;
// };
// export const addRefreshToken = async (refreshToken : string) => {
//     try{
//         const [result] : Array<any> = await pool.query(`INSERT INTO refresh_token (token) VALUES (?)`, refreshToken)
//         return true
//     } catch {
//         return false
//     }
// }
// export const checkRefreshToken = async (refreshToken : string) => {
//     const [result] : Array<any> = await pool.query(`SELECT * FROM refresh_token WHERE token = ?;`, refreshToken)
//     return result.length == 0
// }
// export const deleteRefreshToken = async (refreshToken : string) => {
//     // TODO: Delete token from db
//     try{
//         const [result] : Array<any> = await pool.query(`INSERT INTO refresh_token (token) VALUES (?)`, refreshToken)
//         return true
//     } catch {
//         return false
//     }
// }
