"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               profile:
 *                 type: object
 *                 properties:
 *                   bio:
 *                     type: string
 *                     description: A short biography of the user
 *                   socialLinks:
 *                     type: array
 *                     items:
 *                       type: string
 *                       description: A list of social media links
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/register", userController_1.addUser);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
userRouter.get("/", userController_1.getUsers);
/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
userRouter.get("/:username", userController_1.getUser);
exports.default = userRouter;
