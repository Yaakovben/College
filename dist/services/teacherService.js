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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheTest = exports.udateTheScore = exports.addTheScore = exports.getStudents = exports.login = exports.createTeacher = void 0;
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// יצירת מורה
const createTeacher = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, myclass, scores, students } = user;
        if (!username || !email || !password) {
            throw new Error("Email and name required");
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const dbTeacher = new teacherModel_1.default({
            username,
            email,
            password: hashedPassword,
            myclass,
            scores,
            students
        });
        const classes = yield classModel_1.default.find({ name: myclass });
        if (classes.length === 1) {
            throw new Error("Class is fully occupied 🫢");
        }
        const dbClass = new classModel_1.default({
            name: myclass
        });
        dbClass.save();
        const saving = yield dbTeacher.save();
        return saving.id;
    }
    catch (err) {
        throw err;
    }
});
exports.createTeacher = createTeacher;
// כניסת מורה
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req;
    try {
        const user = yield teacherModel_1.default.findOne({ username });
        if (!user) {
            throw new Error("'user undfind 🫢 ");
        }
        const PasswordIsCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!PasswordIsCorrect) {
            throw new Error("Worng password 🫢");
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.login = login;
// קבלת כל הסטודנטים של המורה
const getStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentModel_1.default.find({});
        if (students.length === 0) {
            throw new Error("There are no students in the system 🫢");
        }
        return students;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getStudents = getStudents;
// הוספת ציון לתלמיד
const addTheScore = (studentId, test) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject, score } = test;
        const student = yield studentModel_1.default.findById(studentId);
        if (!student) {
            throw new Error("The student Undfind 😔");
        }
        const newTest = {
            subject,
            score,
            createdAt: new Date(),
        };
        student.tests.push(newTest);
        const studentUpdated = yield student.save();
        return studentUpdated;
    }
    catch (err) {
        console.log(err);
        throw Error;
    }
});
exports.addTheScore = addTheScore;
//  עדכון ציון לתלמיד
const udateTheScore = (testId, postUpdated) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield studentModel_1.default.findByIdAndUpdate(testId, postUpdated, { new: true, runValidators: true });
        if (!updatedPost) {
            throw new Error("The Test Undfind 😔");
        }
        return updatedPost;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.udateTheScore = udateTheScore;
// קבלת ציון של מבחן 
const getTheTest = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const test = yield studentModel_1.default.findById(postId);
        if (!test) {
            throw Error("Test undfind 😔");
        }
        return test;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getTheTest = getTheTest;
