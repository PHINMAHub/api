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
exports.FeedAnnouncement = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Login Schema
const feedAnnouncementSchema = new mongoose_1.Schema({
    header: {
        type: String,
        required: [true, 'Please enter your header.'],
        validate: {
            validator: function (input) {
                return input.length <= 15;
            },
            message: (props) => `${props.value} exceeds the maximum length of 15 characters.`,
        },
    },
    announcement: {
        type: String,
        required: [true, 'Please enter the announcement.'],
        unique: true,
    },
    subject: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, 'Please enter the subject code.'],
    },
    professor: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Professor',
        default: null,
    },
}, { timestamps: true });
exports.FeedAnnouncement = mongoose_1.default.model('FeedAnnouncement', feedAnnouncementSchema);
