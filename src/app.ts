import express from "express";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoutes";
import teacherRouter from "./routes/teacherRoutes";

import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import {specs, swaggerUi  } from './swagger-express/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1010;

// Middleware
app.use(express.json());
app.use(cookieParser());

connectDB();
//
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Routes
app.use("/api/teachers", teacherRouter);
app.use("/api/students", studentRouter);






app.listen(PORT, () => {
  console.log(`Server is up and running, feel free to visit at http://localhost:${PORT}`);
});

export default app;
