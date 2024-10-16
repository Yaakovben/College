"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("./swagger-express/swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1010;
// Middleware
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.default)();
//
app.use('/api-docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.specs));
// Routes
app.use("/api/teachers", teacherRoutes_1.default);
app.use("/api/students", studentRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is up and running, feel free to visit at http://localhost:${PORT}`);
});
exports.default = app;
