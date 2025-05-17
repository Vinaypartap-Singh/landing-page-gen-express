import { z } from "zod";

//      templateName   String
//   metaTitle      String
//   headerTitle    String
//   outlineBtnText String
//   fillBtnText    String

export const CreateThemeValidation = z.object({
  templateName: z.string({
    message:
      "Templare name is required & must be different than other's to avoid your theme conflict",
  }),
  metaTitle: z.string({
    message: "Meta Title is required",
  }),
  headerTitle: z.string({
    message: "Header Title is required",
  }),
  outlineBtnText: z.string({
    message: "Outline Button Text is required",
  }),
  fillBtnText: z.string({
    message: "Outline Button Text is required",
  }),
  heroTitle: z.string({
    message: "Hero Section Title is required",
  }),
});

// Menu Items

export const CreateMenuItems = z.object({
  title: z.string({ message: "Menu name is required" }),
  url: z.string({ message: "Menu Item url is required" }),
});

//   imageUrl         String
//   title            String
//   description      String
//   btnText          String

export const ServiceItems = z.object({
  imageUrl: z.string({ message: "Image Url is required" }),
  title: z.string({ message: "Title is required" }),
  description: z.string({ message: "Description is required" }),
  btnText: z.string({ message: "Btn Text is required" }),
});

export const Footer = z.object({
  title: z.string({ message: "Title is required" }),
});

export const FooterOption = z.object({
  label: z.string({ message: "Label is required" }),
  link: z.string({ message: "Link is required" }),
});
