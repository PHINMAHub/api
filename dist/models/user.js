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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.UserCredentials = void 0;
// requirements
const mongoose_1 = __importStar(require("mongoose"));
// Login Schema
const userCredentialSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username.'],
    },
    emailAddress: {
        type: String,
        required: [true, 'Please enter your email address.'],
    },
    passwordHash: {
        type: String,
        required: [true, 'Please enter your password.'],
    },
    userType: {
        type: String,
        required: [true, 'Please enter user type.'],
    },
    userInformation: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null,
    },
});
//Student schema
const studentSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
    },
    course: {
        type: String,
    },
    section: {
        type: String,
    },
    birthday: {
        type: Date,
        required: [true, 'Please enter your Birthday'],
    },
    enrolled: {
        type: Boolean,
        required: true,
    },
    userCredentials: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'userCredentialSchema',
        default: null,
    },
}, {
    timestamps: true,
});
exports.UserCredentials = mongoose_1.default.model('UserCredentials', userCredentialSchema);
exports.Student = mongoose_1.default.model('Student', studentSchema);
