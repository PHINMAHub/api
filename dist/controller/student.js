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
exports.addStudent = exports.deleteStudent = exports.updateStudent = exports.findStudent = exports.findAllStudent = void 0;
const user_1 = require("../models/user");
const findAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield user_1.Student.find({});
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json('No Students found');
    }
});
exports.findAllStudent = findAllStudent;
const findStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield user_1.Student.findById(id);
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json("Student can't be found");
    }
});
exports.findStudent = findStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield user_1.Student.findByIdAndUpdate(id, req.body);
        // cannot find any student in database
        if (!student) {
            res.status(404).json({ message: `Can't find any product with ID ${id}` });
        }
        // to see the latest update in postman
        const updatedStudent = yield user_1.Student.findById(id);
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield user_1.Student.findByIdAndDelete(id, req.body);
        // cannot find any student in database
        if (!student) {
            res.status(404).json({ message: `Can't find any product with ID ${id}` });
        }
        // to see the latest update in postman
        const updatedStudent = yield user_1.Student.findById(id);
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteStudent = deleteStudent;
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield user_1.Student.create(req.body);
        res.status(200).json(student);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.addStudent = addStudent;
