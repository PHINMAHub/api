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
exports.getUserIDByEmailAddress = exports.getUserIDByUsername = exports.checkEmailAvailability = exports.checkUsernameAvailability = exports.registerUsertoDatabase = exports.loginUsertoDatabase = void 0;
const http_response_1 = require("./http-response");
const loginUsertoDatabase = (userIdentifier, password, userIdentifierType) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     let [result] : any = await pool.query(`SELECT PasswordHash FROM user_login_data WHERE ${userIdentifierType} = ?;`, [userIdentifier])
    //     if(result.length > 0){
    //         result = result[0]["PasswordHash"]
    //         if(await bcrypt.compare(password, result)){
    //             return new HttpResponse({"message" : "success"}, 200);
    //         }
    //         return new HttpResponse({"message" : "Wrong Password."}, 200);
    //     }
    //     return new HttpResponse({"message" : "User not Found."}, 200);
    // } catch {
    return new http_response_1.HttpResponse({ 'message': 'Internal Server Error.' }, 500);
    // }
});
exports.loginUsertoDatabase = loginUsertoDatabase;
const registerUsertoDatabase = (username, emailAddress, password) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     const saltRounds = await bcrypt.genSalt();
    //     password = await bcrypt.hash(password, saltRounds)
    //     const [result] = await pool.query(`INSERT INTO user_login_data (username, emailAddress, PasswordHash, DateCreated) VALUES (?, ?, ?, now());`, [username, emailAddress, password])
    //     return true
    // } catch {
    //     return false
    // }
    return false;
});
exports.registerUsertoDatabase = registerUsertoDatabase;
const checkUsernameAvailability = (username) => __awaiter(void 0, void 0, void 0, function* () {
    // const [result] : Array<any> = await pool.query(`SELECT * FROM user_login_data WHERE Username = ?;`, username)
    // return result.length == 0
    return false;
});
exports.checkUsernameAvailability = checkUsernameAvailability;
const checkEmailAvailability = (emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
    // const [result] : Array<any> = await pool.query(`SELECT * FROM user_login_data WHERE emailAddress = ?;`, emailAddress)
    // return result.length == 0
    return false;
});
exports.checkEmailAvailability = checkEmailAvailability;
const getUserIDByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    // const [result] : Array<any> = await pool.query(`SELECT UserID FROM user_login_data WHERE Username = ?;`, username)
    // return result[0]["UserID"]
    return false;
});
exports.getUserIDByUsername = getUserIDByUsername;
const getUserIDByEmailAddress = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // const [result] : Array<any> = await pool.query(`SELECT UserID FROM user_login_data WHERE EmailAddress = ?;`, email)
    // return result[0]["UserID"]
    return false;
});
exports.getUserIDByEmailAddress = getUserIDByEmailAddress;
// export const addRefreshToken = async (refreshToken : String) => {
//     try{
//         const [result] : Array<any> = await pool.query(`INSERT INTO refresh_token (token) VALUES (?)`, refreshToken)
//         return true
//     } catch {
//         return false
//     }
// }
// export const checkRefreshToken = async (refreshToken : String) => {
//     const [result] : Array<any> = await pool.query(`SELECT * FROM refresh_token WHERE token = ?;`, refreshToken)
//     return result.length == 0
// }
// export const deleteRefreshToken = async (refreshToken : String) => {
//     // TODO: Delete token from db
//     try{
//         const [result] : Array<any> = await pool.query(`INSERT INTO refresh_token (token) VALUES (?)`, refreshToken)
//         return true
//     } catch {
//         return false
//     }
// }
