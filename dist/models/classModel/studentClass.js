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
exports.StudentSubjects = exports.StudentCoachView = exports.StudentCheckSubmission = exports.StudentConnectSubmission = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const studentCheckSubmissionSchema = new mongoose_1.Schema({
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        default: null,
    },
    attachment: [
        {
            type: Buffer,
        },
    ],
    score: {
        type: Number,
        default: 0,
    },
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Class',
        default: null,
    },
}, {
    timestamps: true,
});
const studentConnectSubmissionSchema = new mongoose_1.Schema({
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        default: null,
    },
    answer: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ConnectChoices',
            default: null,
        },
    ],
    score: {
        type: Number,
        default: 0,
    },
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Class',
        default: null,
    },
}, {
    timestamps: true,
});
const studentCoachViewSchema = new mongoose_1.Schema({
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        default: null,
    },
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Class',
        default: null,
    },
}, {
    timestamps: true,
});
exports.StudentConnectSubmission = mongoose_1.default.model('StudentConnectSubmission', studentConnectSubmissionSchema);
exports.StudentCheckSubmission = mongoose_1.default.model('StudentCheckSubmission', studentCheckSubmissionSchema);
exports.StudentCoachView = mongoose_1.default.model('StudentCoachView', studentCoachViewSchema);
const studentSubjectsSchema = new mongoose_1.Schema({
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Student',
        default: null,
    },
    class: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Class',
            default: null,
        },
    ],
    studentCheckSubmission: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'StudentCheckSubmission',
            default: null,
        },
    ],
    studentConnectSubmission: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'StudentConnectSubmission',
            default: null,
        },
    ],
    studentCoachView: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'StudentCoachView',
            default: null,
        },
    ],
});
exports.StudentSubjects = mongoose_1.default.model('StudentSubjects', studentSubjectsSchema);
