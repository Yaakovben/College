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
exports.addScore = exports.getMyStudents = exports.signin = exports.addTeacher = void 0;
const teacherService_1 = require("../services/teacherService");
const addTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield (0, teacherService_1.createTeacher)(req.body);
        res.status(201).json({
            msg: `teacher ${req.body.username} created `,
            id: teacher
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.addTeacher = addTeacher;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield (0, teacherService_1.login)(req.body);
        res.status(201).json({
            msg: `teacher ${req.body.username} created `,
            id: teacher
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.signin = signin;
const getMyStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield (0, teacherService_1.getStudents)();
        res.status(201).json({
            msg: `teacher ${req.body.username} created `,
            id: teacher
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.getMyStudents = getMyStudents;
const addScore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentUpdated = yield (0, teacherService_1.addTheScore)(req.params.id, req.body);
        res.status(201).json({
            msg: `The score added successfully 👌`,
            post: studentUpdated
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.addScore = addScore;
