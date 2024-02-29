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
const stream_chat_1 = require("stream-chat");
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
        let userID, userType, userFullName, username;
        if (checkerForInput.message['message'] === 'success') {
            const data = yield (0, entry_1.loginUsertoDatabase)(userIdentifier, password);
            let loginUpdate = data.message;
            if (loginUpdate['message'] === 'success') {
                const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
                const userData = yield (0, entry_1.getUserIDandType)(userIdentifier);
                if (userData) {
                    [userID, userType, userFullName, username] = userData;
                    const user = { userID, userName: userIdentifier, userType };
                    const accessToken = jsonwebtoken_1.default.sign(user, accessTokenSecret);
                    const serverClient = stream_chat_1.StreamChat.getInstance('2sgdxg7zqddx', 'c4vvskc6wjyduppj266hvhwfn7rqh7ctwhshzgr95n4qvw7q7mjkmsmzyd6826d4');
                    const chatToken = serverClient.createToken(username);
                    const userTypeHash = userType === 'admin' ? '3aDfR9oPq2sW5tZyX8vBu1mNc7LkIj6Hg4TfGhJdSe4RdFgBhNjVkLo0iUyHnJm' : userType === 'student' ? 'E2jF8sG5dH9tY3kL4zX7pQ6wR1oV0mCqB6nI8bT7yU5iA3gD2fS4hJ9uMlKoP1e' : 'r9LsT6kQ3jWfZ1pY4xN7hM2cV8gB5dI0eJ4uF2oD3iG5vX6mC1aS7tR9yU3lK8w';
                    loginUpdate = Object.assign(Object.assign({}, loginUpdate), { accessToken: accessToken, userType: userTypeHash, chatToken, userFullName, username });
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
    const { firstName, middleName, lastName, personalEmail, schoolEmail, personalNumber, schoolNumber, address, birthday, studentID, course, section, enrolled, username, password, userType, active, department } = req.body;
    const checkerForInput = yield checkEveryInputForSignup(username, personalEmail, schoolEmail, password);
    if (checkerForInput.message['message'] === 'success') {
        const data = yield (0, entry_1.registerUsertoDatabase)(firstName, middleName, lastName, username, personalEmail, schoolEmail, personalNumber, schoolNumber, address, birthday, password, userType, enrolled, course, section, studentID, department, active);
        res.status(data.httpCode).json({ message: data.message });
        return;
    }
    res.status(checkerForInput.code).json(checkerForInput.message);
    return;
});
exports.registerUserController = registerUserController;
const checkEveryInputForSignup = (username, personalEmail, schoolEmail, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkUsernameValidity(username)) {
        return new http_response_1.HttpResponse({ 'message': 'Username must only contains letters and numbers.' }, 200);
    }
    if (!checkEmailValidity(personalEmail)) {
        return new http_response_1.HttpResponse({ 'message': 'Invalid personal email.' }, 200);
    }
    if (!checkEmailValidity(schoolEmail)) {
        return new http_response_1.HttpResponse({ 'message': 'Invalid school email.' }, 200);
    }
    if (!checkPasswordValidity(password)) {
        return new http_response_1.HttpResponse({ 'message': 'Password must have at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.' }, 200);
    }
    if (!(yield (0, entry_1.checkUsernameAvailability)(username))) {
        return new http_response_1.HttpResponse({ 'message': 'This username is being used.' }, 200);
    }
    if (!(yield (0, entry_1.checkEmailAvailability)(personalEmail))) {
        return new http_response_1.HttpResponse({ 'message': 'This personal email address is being used.' }, 200);
    }
    if (!(yield (0, entry_1.checkEmailAvailability)(schoolEmail))) {
        return new http_response_1.HttpResponse({ 'message': 'This school email address is being used.' }, 200);
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
