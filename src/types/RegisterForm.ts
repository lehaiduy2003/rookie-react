import { z } from "zod";
import { LoginFormSchema } from "./LoginForm";

export const RegisterFormSchema = LoginFormSchema.extend({
  firstName: z.string().min(1, "first name must be at least 1 character").max(30),
  lastName: z.string().min(1).max(30),
  phoneNumber: z.string().min(8, "phone number must be at least 8 characters").max(15),
});

export type RegisterForm = z.infer<typeof RegisterFormSchema>;
