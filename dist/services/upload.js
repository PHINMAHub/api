"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
(0, app_1.initializeApp)(firebase_config_1.default.firebaseConfig);
exports.storage = (0, storage_1.getStorage)();
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
