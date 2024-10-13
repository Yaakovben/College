"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.TestsSchema = new mongoose_1.Schema({
    subject: {
        type: String,
        required: [true, "subject is required"],
        minlength: [5, "way too short subject, please enter at least 5 chars"]
    },
    score: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const StudentSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "user name is required"],
        minlength: [5, "way too short name, please enter at least 5 chars"]
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "user password is required"],
        minlength: [5, "way too short password, please enter at least 5 chars"]
    },
    myclass: {
        type: String,
        required: [true, "user myclass is required"],
    },
    tests: {
        type: [exports.TestsSchema]
    },
    role: {
        type: String,
        default: "Student"
    }
});
exports.default = mongoose_1.default.model("Student", StudentSchema);
