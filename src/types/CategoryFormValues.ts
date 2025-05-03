import { z } from "zod";

// Category form schema for validation
export const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  parentId: z.string(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
