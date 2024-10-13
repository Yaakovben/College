"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const teacherRouter = (0, express_1.Router)();
// יצירת מורה
teacherRouter.post("/register", teacherController_1.addTeacher);
// כניסת מורה
teacherRouter.post("/login", teacherController_1.signin);
// הוספת ציון לתלמיד
teacherRouter.post('/:id', teacherController_1.addScore);
// קבלת כל התלמידים
teacherRouter.get("/", teacherController_1.getMyStudents);
// עדכון ציון לתלמיד
teacherRouter.put("/:id", teacherController_1.updateTest);
// קבלת ממוצע של הכיתה
teacherRouter.get("/average");
teacherRouter.get("/score/:id");
exports.default = teacherRouter;
