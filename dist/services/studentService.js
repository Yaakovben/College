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
exports.login = exports.createStudent = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const classModel_1 = __importDefault(require("../models/classModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// יצירת סטודנט
const createStudent = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, myclass, tests } = user;
        if (!username || !email || !password) {
            throw new Error("Email and name required");
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const dbTeacher = new studentModel_1.default({
            username,
            email,
            password: hashedPassword,
            myclass,
            tests
        });
        const classes = yield classModel_1.default.find({ name: myclass });
        if (classes.length === 0) {
            throw new Error("There is no such class 🫢");
        }
        const saving = yield dbTeacher.save();
        return saving.id;
    }
    catch (err) {
        throw err;
    }
});
exports.createStudent = createStudent;
// כניסת סטודנט
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req;
    try {
        const user = yield studentModel_1.default.findOne({ username });
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
