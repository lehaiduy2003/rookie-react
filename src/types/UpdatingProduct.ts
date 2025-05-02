import { z } from "zod";

export const ProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0, "Quantity must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  imageUrl: z.string().optional(),
  featured: z.boolean(),
  isActive: z.boolean(),
});

export type ProductForm = z.infer<typeof ProductFormSchema>;
