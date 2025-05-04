import { z } from "zod";

export const filterSchema = z.object({
  minPrice: z.coerce.number().min(0, "Minimum price must be at least 0").optional(),
  maxPrice: z.coerce.number().min(0, "Maximum price must be at least 0").optional(),
  rating: z.coerce
    .number()
    .min(1, "rating must be at least 1")
    .max(5, "rating must be at most 5")
    .optional(),
  featured: z.boolean().optional(),
  category: z.string().optional(),
});

// Infer the type from schema
export type FilterFormValues = z.infer<typeof filterSchema>;
