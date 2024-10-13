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
exports.getUser = exports.getUsers = exports.addUser = void 0;
const userService_1 = require("../services/userService");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.createUser)(req.body);
        res.status(201).json({
            msg: `User ${req.body.username} created `,
            id: user
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.addUser = addUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsers)();
        res.status(201).json({
            msg: `this is all users`,
            users
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userService_1.getTheUser)(req.params.username);
        res.status(201).json({
            msg: `this is user`,
            user
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.getUser = getUser;
// Optionally, add DELETE and EDIT functions
