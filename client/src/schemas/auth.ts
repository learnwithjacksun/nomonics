import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const verifyEmailSchema = z.object({
  code: z.string().min(6, "Code must be 6 characters long"),
});

type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;
type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;

export { loginSchema, registerSchema, verifyEmailSchema, type LoginSchema, type RegisterSchema, type VerifyEmailSchema };
