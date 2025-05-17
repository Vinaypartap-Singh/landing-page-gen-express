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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_config_1 = require("../db/db.config");
const auth_middleware_1 = require("../middleware/auth.middleware");
const helper_1 = require("../utils/helper");
const auth_validation_1 = require("../validations/auth.validation");
const AuthHandler = (0, express_1.Router)();
AuthHandler.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        const payload = auth_validation_1.UserRegisterSchema.parse(body);
        const existingUser = yield db_config_1.prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (existingUser) {
            return (0, helper_1.handleTryResponseHandler)(res, 400, "User Already Exist");
        }
        const salt = bcryptjs_1.default.genSaltSync(16);
        const hashedPassword = bcryptjs_1.default.hashSync(payload.password, salt);
        yield db_config_1.prisma.user.create({
            data: {
                username: payload.username,
                email: payload.email,
                password: hashedPassword,
            },
        });
        return (0, helper_1.handleTryResponseHandler)(res, 200, "Your account has been created successfully. Login To Continue");
    }
    catch (error) {
        return (0, helper_1.handleCatchError)(error, res, "Error while creating account");
    }
}));
AuthHandler.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = auth_validation_1.LoginUserSchema.parse(req.body);
        const user = yield db_config_1.prisma.user.findUnique({
            where: {
                email: payload.email,
            },
        });
        if (!user) {
            return (0, helper_1.handleTryResponseHandler)(res, 400, "Unauthorized Access. User not Found");
        }
        const checkPassword = bcryptjs_1.default.compare(payload.password, user.password);
        if (!checkPassword) {
            return (0, helper_1.handleTryResponseHandler)(res, 400, "Incorrect Email or Password.");
        }
        const jwt_payload = {
            id: user.id,
            username: user.username,
            email: user.email,
        };
        const token = jsonwebtoken_1.default.sign(jwt_payload, process.env.JWT_TOKEN, {
            expiresIn: "30d",
        });
        const responsePayload = Object.assign(Object.assign({}, jwt_payload), { token: `Bearer ${token}` });
        return (0, helper_1.handleTryResponseHandler)(res, 200, "Login Success", responsePayload);
    }
    catch (error) {
        return (0, helper_1.handleCatchError)(error, res, "Error while creating account");
    }
}));
AuthHandler.get("/user-info", auth_middleware_1.AuthMiddleware, (req, res) => {
    try {
        const user = req.user;
        return (0, helper_1.handleTryResponseHandler)(res, 200, "User Info", user);
    }
    catch (error) {
        return (0, helper_1.handleCatchError)(error, res, "Error while getting user information");
    }
});
exports.default = AuthHandler;
