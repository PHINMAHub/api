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
exports.Class = exports.Connect = exports.ConnectChoices = exports.Coach = exports.Check = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const checkSchema = new mongoose_1.Schema({
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ConnectChoices',
        default: null,
    },
    postTitle: {
        type: String,
        required: [true, 'Please enter the title.'],
    },
    postDescription: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    attachment: [
        {
            type: Buffer,
        },
    ],
    respondents: {
        type: Number,
        default: 0,
    },
    studentSubmission: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'StudentCheckSubmission',
            default: null,
        },
    ],
}, {
    timestamps: true,
});
exports.Check = mongoose_1.default.model('Check', checkSchema);
const coachSchema = new mongoose_1.Schema({
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ConnectChoices',
        default: null,
    },
    postTitle: {
        type: String,
        required: [true, 'Please enter the title.'],
    },
    postDescription: {
        type: String,
    },
    attachment: [
        {
            type: Buffer,
        },
    ],
    view: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.Coach = mongoose_1.default.model('Coach', coachSchema);
const connectChoicesSchema = new mongoose_1.Schema({
    choice: {
        type: String,
        required: [true, 'Please enter the choice.'],
    },
});
exports.ConnectChoices = mongoose_1.default.model('ConnectChoices', connectChoicesSchema);
const connectSchema = new mongoose_1.Schema({
    class: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ConnectChoices',
        default: null,
    },
    postTitle: {
        type: String,
        required: [true, 'Please enter the title.'],
    },
    postDescription: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    respondents: {
        type: Number,
        default: 0,
    },
    postChoices: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ConnectChoices',
            default: null,
        },
    ],
    studentSubmission: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'StudentConnectSubmission',
            default: null,
        },
    ],
}, {
    timestamps: true,
});
exports.Connect = mongoose_1.default.model('Connect', connectSchema);
const classSchema = new mongoose_1.Schema({
    students: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Student',
            default: null,
        },
    ],
    professor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Professor',
        required: [true, 'Please enter the professor.'],
        default: null,
    },
    block: {
        type: String,
        required: [true, 'Please enter the block.'],
    },
    subject: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, 'Please enter the subject.'],
    },
    connect: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Connect',
            default: null,
        },
    ],
    check: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Check',
            default: null,
        },
    ],
    coach: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Coach',
            default: null,
        },
    ],
    announcement: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Announcement',
            default: null,
        },
    ],
});
exports.Class = mongoose_1.default.model('Class', classSchema);
