import { Router } from "express";
import { addTeacher,signin} from "../controllers/teacherController";

const teacherRouter = Router();

// יצירת מורה
teacherRouter.post("/register",addTeacher);

// כניסת מורה
teacherRouter.post("/login",signin);

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
