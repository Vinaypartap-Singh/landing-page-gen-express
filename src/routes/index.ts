import { Router } from "express";
import AuthHandler from "../controller/auth.controller";
import ThemeHandler from "../controller/theme.controller";

const RouteHandler: Router = Router();

RouteHandler.use("/api/auth", AuthHandler);
RouteHandler.use("/api/theme", ThemeHandler);

export default RouteHandler;
