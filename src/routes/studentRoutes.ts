import { Router } from "express";
import {
addStudent,
  signin

} from "../controllers/studentController";

const studentRouter = Router();

// הרשמת תלמיד
studentRouter.post("/register",addStudent);
// כניסת תלמיד
studentRouter.post("/login",signin);
// קבלת ציון של מבחן
studentRouter.get("/score/:id",);


export default studentRouter;
