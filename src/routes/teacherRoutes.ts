import { Router } from "express";
import { addUser, getUser, getUsers } from "../controllers/userController";

const teacherRouter = Router();

// יצירת מורה
teacherRouter.post("/register",);

// כניסת מורה
teacherRouter.post("/login",);

// הוספת ציון לתלמיד
teacherRouter.post('/:id')

// קבלת כל התלמידים
teacherRouter.get("/",);

// עדכון ציון לתלמיד
teacherRouter.put("/:id",);

// קבלת ממוצע של הכיתה
teacherRouter.get("/average",);

teacherRouter.get("/score/:id",);



export default teacherRouter;
