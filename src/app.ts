import express from "express";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoutes";
import teacherRouter from "./routes/teacherRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
//
import {specs, swaggerUi  } from './swagger-express/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1010;

// Middleware
app.use(express.json());

connectDB();
//
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Routes
app.use("/api/teachers", teacherRouter);
app.use("/api/students", studentRouter);




// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and running, feel free to visit at http://localhost:${PORT}`);
});

export default app;
