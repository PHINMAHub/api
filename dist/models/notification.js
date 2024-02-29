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
exports.NotificationHolder = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const notificationHolderSchema = new mongoose_1.Schema({
    header: {
        type: String,
        // required: [true, 'Please enter your header.'],
        default: null,
    },
    description: {
        type: String,
        // required: [true, 'Please enter the description.'],
        default: null,
    },
    link: {
        type: String,
        // required: [true, 'Please enter the link.'],
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
exports.NotificationHolder = mongoose_1.default.model('NotificationHolder', notificationHolderSchema);
