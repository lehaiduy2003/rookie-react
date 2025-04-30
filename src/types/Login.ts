import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(2).max(50),
  password: z.string().min(8, "password must be at least 8 characters").max(50),
});

export type Login = z.infer<typeof LoginSchema>;
