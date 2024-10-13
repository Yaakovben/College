import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addComment,
} from "../controllers/postController";

const studentRouter = Router();

// הרשמת תלמיד
studentRouter.post("/register",);
// כניסת תלמיד
studentRouter.post("/login",);
// קבלת ציון של מבחן
studentRouter.get("/score/:id",);


export default studentRouter;
