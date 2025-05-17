"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helper_1 = require("../utils/helper");
const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === null || authHeader === undefined) {
        return (0, helper_1.handleTryResponseHandler)(res, 400, "Unauthorized Access");
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            return (0, helper_1.handleTryResponseHandler)(res, 400, "Unauthorized Access");
        }
        req.user = user;
        next();
    });
};
exports.AuthMiddleware = AuthMiddleware;
