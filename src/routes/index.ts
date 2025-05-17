import { Router } from "express";
import AuthHandler from "../controller/auth.controller";

const RouteHandler: Router = Router();

RouteHandler.use("/api/auth", AuthHandler);

export default RouteHandler;
