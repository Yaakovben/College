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
exports.signin = exports.addStudent = void 0;
const studentService_1 = require("../services/studentService");
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield (0, studentService_1.createStudent)(req.body);
        res.status(201).json({
            msg: `Student ${req.body.username} created `,
            id: teacher
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.addStudent = addStudent;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield (0, studentService_1.login)(req.body);
        res.status(201).json({
            msg: `Student ${req.body.username} created `,
            id: student
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.signin = signin;
