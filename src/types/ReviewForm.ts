import { z } from "zod";

export const ReviewFormSchema = z.object({
  comment: z.string().min(1, "Comment must be at least 12 characters").max(500),
  score: z.number().min(1, "Score must be at least 1").max(5, "Score must be at most 5"),
});

export type ReviewForm = z.infer<typeof ReviewFormSchema>;
