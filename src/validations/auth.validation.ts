import { z } from "zod";

export const UserRegisterSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(10, "Username must be minimum 10 characters"),
  email: z
    .string({ message: "Email is required" })
    .min(10, "Email is Required")
    .email("Enter correct email"),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "password must be 6 characters" }),
});

export const LoginUserSchema = z.object({
  email: z.string().min(10, "Email is Required").email("Enter correct email"),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "password must be 6 characters" }),
});
