import { Request, Response, Router } from "express";
import { prisma } from "../db/db.config";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { handleCatchError, handleTryResponseHandler } from "../utils/helper";
import {
  CreateMenuItems,
  CreateThemeValidation,
  Footer,
  FooterOption,
  ServiceItems,
} from "../validations/theme.validation";

const ThemeHandler: Router = Router();

ThemeHandler.post(
  "/create/header",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const body = req.body;
      const payload = CreateThemeValidation.parse(body);

      if (!user) {
        return handleTryResponseHandler(res, 400, "Unauthorized Access");
      }

      const templateExist = await prisma.abstractTemplate.findUnique({
        where: {
          templateName: payload.templateName,
        },
      });

      if (templateExist) {
        return handleTryResponseHandler(
          res,
          200,
          "The theme with this name already exist. Try again with another name"
        );
      }

      const theme = await prisma.$transaction([
        prisma.abstractTemplate.create({
          data: {
            metaTitle: payload.metaTitle,
            templateName: payload.templateName,
            headerTitle: payload.headerTitle,
            heroTitle: payload.heroTitle,
            outlineBtnText: payload.outlineBtnText,
            fillBtnText: payload.fillBtnText,
            userId: user.id,
          },
        }),
        prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            templateName: payload.templateName,
          },
        }),
      ]);

      return handleTryResponseHandler(
        res,
        200,
        "Your theme options updated. Please add remaining details to publish the theme",
        theme
      );
    } catch (error) {
      return handleCatchError(
        error,
        res,
        "Unexpected error occured while creating header settings"
      );
    }
  }
);

ThemeHandler.post(
  "/create/menu",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const body = req.body;
      const payload = CreateMenuItems.parse(body);

      if (!user) {
        return handleTryResponseHandler(res, 400, "Unauthorized Access");
      }

      const templateExist = await prisma.abstractTemplate.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!templateExist) {
        return handleTryResponseHandler(
          res,
          200,
          "No Template Found. Try Again"
        );
      }

      const menuItems = await prisma.menuItems.create({
        data: {
          title: payload.title,
          url: payload.url,
          templateId: templateExist.id,
          userId: user.id,
        },
      });

      return handleTryResponseHandler(
        res,
        200,
        "Your theme options updated. Please add remaining details to publish the theme",
        menuItems
      );
    } catch (error) {
      return handleCatchError(
        error,
        res,
        "Unexpected error occured while creating header settings"
      );
    }
  }
);

ThemeHandler.post(
  "/create/services",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const body = req.body;
      const payload = ServiceItems.parse(body);

      if (!user) {
        return handleTryResponseHandler(res, 400, "Unauthorized Access");
      }

      const templateExist = await prisma.abstractTemplate.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!templateExist) {
        return handleTryResponseHandler(
          res,
          200,
          "No Template Found. Try Again"
        );
      }

      const serviceItems = await prisma.servicesData.create({
        data: {
          title: payload.title,
          description: payload.description,
          imageUrl: payload.imageUrl,
          btnText: payload.btnText,
          templateId: payload.id,
          userId: user.id,
        },
      });

      return handleTryResponseHandler(
        res,
        200,
        "Your theme options updated. Please add remaining details to publish the theme",
        serviceItems
      );
    } catch (error) {
      return handleCatchError(
        error,
        res,
        "Unexpected error occured while creating header settings"
      );
    }
  }
);

ThemeHandler.post(
  "/create/footer",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const body = req.body;
      const payload = Footer.parse(body);

      if (!user) {
        return handleTryResponseHandler(res, 400, "Unauthorized Access");
      }

      const templateExist = await prisma.abstractTemplate.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!templateExist) {
        return handleTryResponseHandler(
          res,
          200,
          "No Template Found. Try Again"
        );
      }

      const footer = await prisma.footer.create({
        data: {
          title: payload.title,
          templateId: templateExist.id,
          userId: user.id,
        },
      });

      return handleTryResponseHandler(
        res,
        200,
        "Your theme options updated. Please add remaining details to publish the theme",
        footer
      );
    } catch (error) {
      return handleCatchError(
        error,
        res,
        "Unexpected error occured while creating header settings"
      );
    }
  }
);

ThemeHandler.post(
  "/create/footer-options",
  AuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const body = req.body;
      const payload = FooterOption.parse(body);

      if (!user) {
        return handleTryResponseHandler(res, 400, "Unauthorized Access");
      }

      const templateExist = await prisma.abstractTemplate.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!templateExist) {
        return handleTryResponseHandler(
          res,
          200,
          "No Template Found. Try Again"
        );
      }

      const footer = await prisma.footer.findFirst({
        where: {
          templateId: payload.id,
        },
      });

      if (!footer) {
        return handleTryResponseHandler(res, 200, "Footer Option not found");
      }

      const footerOption = await prisma.footerOption.create({
        data: {
          label: payload.label,
          link: payload.link,
          footerId: footer.id,
          templateId: templateExist.id,
        },
      });

      return handleTryResponseHandler(
        res,
        200,
        "Your theme options updated. Please add remaining details to publish the theme",
        footerOption
      );
    } catch (error) {
      return handleCatchError(
        error,
        res,
        "Unexpected error occured while creating header settings"
      );
    }
  }
);

export default ThemeHandler;
