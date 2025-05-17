import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/db.config";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { handleCatchError, handleTryResponseHandler } from "../utils/helper";
import {
  LoginUserSchema,
  UserRegisterSchema,
} from "../validations/auth.validation";

const AuthHandler: Router = Router();

AuthHandler.post("/register", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = UserRegisterSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      return handleTryResponseHandler(res, 400, "User Already Exist");
    }

    const salt = bcrypt.genSaltSync(16);
    const hashedPassword = bcrypt.hashSync(payload.password, salt);

    await prisma.user.create({
      data: {
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
      },
    });

    return handleTryResponseHandler(
      res,
      200,
      "Your account has been created successfully. Login To Continue"
    );
  } catch (error) {
    return handleCatchError(error, res, "Error while creating account");
  }
});

AuthHandler.post("/login", async (req: Request, res: Response) => {
  try {
    const payload = LoginUserSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      return handleTryResponseHandler(
        res,
        400,
        "Unauthorized Access. User not Found"
      );
    }

    const checkPassword = bcrypt.compare(payload.password, user.password);

    if (!checkPassword) {
      return handleTryResponseHandler(res, 400, "Incorrect Email or Password.");
    }

    const jwt_payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(jwt_payload, process.env.JWT_TOKEN!, {
      expiresIn: "30d",
    });

    const responsePayload = {
      ...jwt_payload,
      token: `Bearer ${token}`,
    };

    return handleTryResponseHandler(res, 200, "Login Success", responsePayload);
  } catch (error) {
    return handleCatchError(error, res, "Error while creating account");
  }
});

AuthHandler.get("/user-info", AuthMiddleware, (req: Request, res: Response) => {
  try {
    const user = req.user;
    return handleTryResponseHandler(res, 200, "User Info", user);
  } catch (error) {
    return handleCatchError(error, res, "Error while getting user information");
  }
});

export default AuthHandler;
