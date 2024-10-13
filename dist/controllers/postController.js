"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.updatePost = exports.deletePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const studentService_1 = require("../services/studentService");
// Create a new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPost = yield (0, studentService_1.createNewPost)(req.body);
        res.status(201).json({
            msg: `Post successfully created`,
            Title: newPost
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.createPost = createPost;
// Get all posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, studentService_1.getAllPosts)();
        res.status(201).json({
            msg: `This is all posts`,
            posts
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.getPosts = getPosts;
// Get a single post by ID
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield (0, studentService_1.getThePost)(req.params.id);
        res.status(201).json({
            msg: `this is post`,
            post
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.getPost = getPost;
// Delete a post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postDelete = yield (0, studentService_1.deleteThePost)(req.params.id);
        res.status(201).json({
            msg: `Post successfully deleted `,
            postDeleet: postDelete
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.deletePost = deletePost;
// Update a post
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postUpdate = yield (0, studentService_1.udateThePost)(req.params.id, req.body);
        res.status(201).json({
            msg: `Post successfully updated `,
            postUpdate: postUpdate
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.updatePost = updatePost;
// Add a comment to a post
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postUpdated = yield (0, studentService_1.addTheComment)(req.params.id, req.body);
        res.status(201).json({
            msg: `The comment added successfully`,
            post: postUpdated
        });
    }
    catch (err) {
        res.status(401).json(err.message);
    }
});
exports.addComment = addComment;
