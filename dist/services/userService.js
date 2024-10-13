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
exports.getTheUser = exports.getAllUsers = exports.createTeacher = void 0;
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const createTeacher = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, myclass, scores, students } = user;
        if (!username || !email) {
            throw Error("Email and name required");
        }
        const dbTeacher = new teacherModel_1.default({
            username,
            email,
            password,
            myclass,
            scores,
            students
        });
        const saving = yield dbTeacher.save();
        return saving.id;
    }
    catch (err) {
        throw err;
    }
});
exports.createTeacher = createTeacher;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield teacherModel_1.default.find({});
        if (users.length === 0) {
            throw new Error("There are no users in the system");
        }
        return users;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getAllUsers = getAllUsers;
const getTheUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield teacherModel_1.default.findById(userId);
        console.log(user);
        if (!user) {
            throw new Error("User undfind 😔");
        }
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getTheUser = getTheUser;
