import { z } from "zod";

export const CustomerFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CustomerForm = z.infer<typeof CustomerFormSchema>;
