import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(2).max(50),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;
