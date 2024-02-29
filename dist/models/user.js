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
exports.Admin = exports.Professor = exports.Student = exports.UserCredentials = void 0;
// requirements
const mongoose_1 = __importStar(require("mongoose"));
// Login Schema
const userCredentialSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username.'],
        unique: true,
    },
    personalEmail: {
        type: String,
        required: [true, 'Please enter your personal Email.'],
        unique: true,
    },
    schoolEmail: {
        type: String,
        required: [true, 'Please enter your school email address.'],
        unique: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'Please enter your password.'],
    },
    userType: {
        type: String,
        required: [true, 'Please enter user type.'],
    },
    studentInformation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Student',
        default: null,
    },
    professorInformation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Professor',
        default: null,
    },
    adminInformation: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Admin',
        default: null,
    },
    inbox: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Inbox',
            default: null,
        },
    ],
    notification: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'NotificationHolder',
            default: null,
        },
    ],
});
exports.UserCredentials = mongoose_1.default.model('UserCredentials', userCredentialSchema);
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
    personalNumber: {
        type: String,
        required: [true, 'Please enter your personal number'],
        unique: true,
    },
    schoolNumber: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
    },
    birthday: {
        type: Date,
        required: [true, 'Please enter your Birthday'],
    },
    studentID: {
        type: String,
        required: [true, 'Please enter your student id number'],
        unique: true,
    },
    course: {
        type: String,
        required: [true, 'Please enter your course'],
    },
    section: {
        type: String,
        required: [true, 'Please enter your section'],
    },
    year: {
        type: String,
        required: [true, 'Please enter your year'],
    },
    enrolled: {
        type: Boolean,
        required: [true, 'Please enter your enrolled status'],
    },
    userCredentials: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserCredentials',
        default: null,
    },
    studentSubjects: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'StudentSubjects',
        default: null,
    },
}, {
    timestamps: true,
});
//Professor schema
const professorSchema = new mongoose_1.Schema({
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
    department: {
        type: String,
        required: [true, 'Please enter your department'],
    },
    major: {
        type: String,
        required: [true, 'Please enter your major'],
    },
    personalNumber: {
        type: String,
        required: [true, 'Please enter your personal number'],
        unique: true,
    },
    schoolNumber: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
    },
    birthday: {
        type: Date,
        required: [true, 'Please enter your Birthday'],
    },
    active: {
        type: Boolean,
        default: true,
        required: [true, 'Please enter your status'],
    },
    userCredentials: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserCredentials',
        default: null,
    },
    professorHandledClass: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ProfessorHandledClass',
        default: null,
    },
}, {
    timestamps: true,
});
const adminSchema = new mongoose_1.Schema({
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
    personalNumber: {
        type: String,
        required: [true, 'Please enter your personal number'],
        unique: true,
    },
    schoolNumber: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
    },
    birthday: {
        type: Date,
        required: [true, 'Please enter your Birthday'],
    },
    active: {
        type: Boolean,
        default: true,
        required: [true, 'Please enter your status'],
    },
    department: {
        type: String,
        required: [true, 'Please enter your department'],
    },
    userCredentials: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserCredentials',
        default: null,
    },
}, {
    timestamps: true,
});
exports.Student = mongoose_1.default.model('Student', studentSchema);
exports.Professor = mongoose_1.default.model('Professor', professorSchema);
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
