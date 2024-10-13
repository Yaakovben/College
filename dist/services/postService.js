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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTheComment = exports.udateThePost = exports.deleteThePost = exports.getThePost = exports.getAllPosts = exports.createNewPost = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const createNewPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield teacherModel_1.default.findById(post.author);
        if (!userId) {
            throw Error();
        }
        const { content, author, title, comments } = post;
        const dbPost = new studentModel_1.default({
            content,
            author,
            title,
            comments
        });
        userId.posts.push(dbPost);
        const saving = yield dbPost.save();
        return saving.title;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.createNewPost = createNewPost;
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield studentModel_1.default.find({}).populate("author");
        if (posts.length === 0) {
            throw new Error("There are no Posts in the system");
        }
        return posts;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getAllPosts = getAllPosts;
const getThePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield studentModel_1.default.findById(postId);
        console.log(post);
        if (!post) {
            console.log("kkkk");
            throw Error("Post undfind 😔");
        }
        return post;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getThePost = getThePost;
const deleteThePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletePost = yield studentModel_1.default.findByIdAndDelete(postId);
        if (!deletePost) {
            throw new Error("The post Undfind 😔");
        }
        return deletePost;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.deleteThePost = deleteThePost;
const udateThePost = (postId, postUpdated) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPost = yield studentModel_1.default.findByIdAndUpdate(postId, postUpdated, { new: true, runValidators: true });
        if (!updatedPost) {
            throw new Error("The post Undfind 😔");
        }
        return updatedPost;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.udateThePost = udateThePost;
const addTheComment = (postId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, author, createdAt } = comment;
        const post = yield studentModel_1.default.findById(postId);
        if (!post) {
            throw new Error("The post Undfind 😔");
        }
        console.log(455554);
        const newComment = {
            content: content,
            author: new mongoose_1.default.Types.ObjectId(author),
            createdAt: new Date()
        };
        post.comments.push(newComment);
        const postUpdated = yield post.save();
        return postUpdated;
    }
    catch (err) {
        console.log(err);
        throw Error;
    }
});
exports.addTheComment = addTheComment;
