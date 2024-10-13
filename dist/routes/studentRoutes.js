"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const studentRouter = (0, express_1.Router)();
// הרשמת תלמיד
studentRouter.post("/register", studentController_1.addStudent);
// כניסת תלמיד
studentRouter.post("/login", studentController_1.signin);
// קבלת ציון של מבחן
studentRouter.get("/score/:id");
exports.default = studentRouter;
