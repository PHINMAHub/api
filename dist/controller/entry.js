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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserController = exports.loginUserController = exports.checkCurrentUser = void 0;
const entry_1 = require("../services/entry");
const http_response_1 = require("../models/http-response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Check Current User
const checkCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ 'message': 'valid' });
    }
    catch (_a) {
        res.status(500).json({ 'message': 'Internal Server Error' });
        return;
    }
});
exports.checkCurrentUser = checkCurrentUser;
// Logins
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdentifier = req.body.userIdentifier;
        const password = req.body.password;
        const userIdentifierType = yield checkInputType(userIdentifier);
        const checkerForInput = yield checkEveryInputForLogin(userIdentifier, password, userIdentifierType);
        let userID, userType;
        if (checkerForInput.message['message'] === 'success') {
            const data = yield (0, entry_1.loginUsertoDatabase)(userIdentifier, password);
            let loginUpdate = data.message;
            if (data.message['message'] === 'success') {
                const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
                const userData = yield (0, entry_1.getUserIDandType)(userIdentifier);
                console.log(userData);
                if (userData) {
                    [userID, userType] = userData;
                    const user = { userID, userName: userIdentifier, userType };
                    const accessToken = jsonwebtoken_1.default.sign(user, accessTokenSecret);
                    loginUpdate = Object.assign(Object.assign({}, loginUpdate), { accessToken: accessToken });
                }
                else {
                    data.code = 400;
                    loginUpdate = { message: 'User not found.' };
                }
            }
            res.status(data.code).json(loginUpdate);
            return;
        }
        res.status(checkerForInput.code).json(checkerForInput.message);
        return;
    }
    catch (_b) {
        res.status(500).json({ 'message': 'Internal Server Error' });
        return;
    }
});
exports.loginUserController = loginUserController;
const checkInputType = (userIdentifier) => __awaiter(void 0, void 0, void 0, function* () {
    return userIdentifier.includes('@') ? 'EmailAddress' : 'Username';
});
const checkEveryInputForLogin = (userIdentifier, password, userIdentifierType) => __awaiter(void 0, void 0, void 0, function* () {
    if (userIdentifierType === 'Username') {
        if (!checkUsernameValidity(userIdentifier)) {
            return new http_response_1.HttpResponse({ 'message': 'Invalid Username' }, 200);
        }
    }
    else {
        if (!checkEmailValidity(userIdentifier)) {
            return new http_response_1.HttpResponse({ 'message': 'Invalid Email.' }, 200);
        }
    }
    if (!checkPasswordValidity(password)) {
        return new http_response_1.HttpResponse({ 'message': 'Invalid Password.' }, 200);
    }
    return new http_response_1.HttpResponse({ 'message': 'success' }, 200);
});
// Registrations
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName, course, section, birthday, enrolled, username, emailAddress, confirmationEmailAddress, password, confirmationPassword, userType } = req.body;
    const checkerForInput = yield checkEveryInputForSignup(username, emailAddress, confirmationEmailAddress, password, confirmationPassword);
    if (checkerForInput.message['message'] === 'success') {
        const data = yield (0, entry_1.registerUsertoDatabase)(firstName, middleName, lastName, course, section, birthday, enrolled, username, emailAddress, password, userType);
        if (!data) {
            res.status(500).json({ 'message': 'Internal Server Error' });
            return;
        }
    }
    res.status(checkerForInput.code).json(checkerForInput.message);
    return;
});
exports.registerUserController = registerUserController;
const checkEveryInputForSignup = (username, emailAddress, confirmationEmailAddress, password, confirmationPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkUsernameValidity(username)) {
        return new http_response_1.HttpResponse({ 'message': 'Username must only contains letters and numbers.' }, 200);
    }
    if (!checkEmailValidity(emailAddress)) {
        return new http_response_1.HttpResponse({ 'message': 'Invalid Email.' }, 200);
    }
    if (!checkPasswordValidity(password)) {
        return new http_response_1.HttpResponse({ 'message': 'Password must have at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.' }, 200);
    }
    if (!(yield (0, entry_1.checkUsernameAvailability)(username))) {
        return new http_response_1.HttpResponse({ 'message': 'This username is being used.' }, 200);
    }
    if (!(yield (0, entry_1.checkEmailAvailability)(emailAddress))) {
        return new http_response_1.HttpResponse({ 'message': 'This email address is being used.' }, 200);
    }
    if (emailAddress !== confirmationEmailAddress) {
        return new http_response_1.HttpResponse({ 'message': "Those email address didn't match. Try again." }, 200);
    }
    if (password !== confirmationPassword) {
        return new http_response_1.HttpResponse({ 'message': "Those password didn't match. Try again." }, 200);
    }
    return new http_response_1.HttpResponse({ 'message': 'success' }, 200);
});
const checkUsernameValidity = (username) => {
    // TODO: max 25 characters
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
};
const checkEmailValidity = (emailAddress) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return regex.test(emailAddress);
};
const checkPasswordValidity = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)./;
    // least one lowercase letter, one uppercase letter, one numeric digit, and one special character
    return regex.test(password);
};
