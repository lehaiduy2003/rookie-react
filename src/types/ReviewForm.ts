import { z } from "zod";

export const ratingFormSchema = z.object({
  comment: z.string().min(1, "Comment must be at least 12 characters").max(500),
  score: z.coerce.number().min(1, "Score must be at least 1").max(5, "Score must be at most 5"),
  productId: z.coerce.number().min(1, "Product ID must be at least 1"),
  customerId: z.coerce.number().min(1, "Customer ID must be at least 1"),
});

export type RatingForm = z.infer<typeof ratingFormSchema>;
