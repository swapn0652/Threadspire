import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  identifier: z.string().min(3).refine((val) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isUsername = /^[a-zA-Z0-9_]+$/.test(val);
    return isEmail || isUsername;
  }, {
    message: "Enter a valid email or username"
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const UsernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),
});

export type UsernameInput = z.infer<typeof UsernameSchema>;