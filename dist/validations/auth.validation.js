"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserSchema = exports.UserRegisterSchema = void 0;
const zod_1 = require("zod");
exports.UserRegisterSchema = zod_1.z.object({
    username: zod_1.z
        .string({ message: "Username is required" })
        .min(10, "Username must be minimum 10 characters"),
    email: zod_1.z
        .string({ message: "Email is required" })
        .min(10, "Email is Required")
        .email("Enter correct email"),
    password: zod_1.z
        .string({ message: "Password is required" })
        .min(6, { message: "password must be 6 characters" }),
});
exports.LoginUserSchema = zod_1.z.object({
    email: zod_1.z.string().min(10, "Email is Required").email("Enter correct email"),
    password: zod_1.z
        .string({ message: "Password is required" })
        .min(6, { message: "password must be 6 characters" }),
});
