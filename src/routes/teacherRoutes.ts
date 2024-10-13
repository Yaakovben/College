import { Router } from "express";
import { addTeacher,signin,getMyStudents,addScore,updateTest} from "../controllers/teacherController";

const teacherRouter = Router();

// יצירת מורה
teacherRouter.post("/register",addTeacher);

// כניסת מורה
teacherRouter.post("/login",signin);

// הוספת ציון לתלמיד
teacherRouter.post('/:id',addScore)

// קבלת כל התלמידים
teacherRouter.get("/",getMyStudents);

// עדכון ציון לתלמיד
teacherRouter.put("/:id",updateTest);

// קבלת ממוצע של הכיתה
teacherRouter.get("/average",);

teacherRouter.get("/score/:id",);



export default teacherRouter;
