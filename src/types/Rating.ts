import { z } from "zod";
import { CreatedBySchema } from "./CreatedBy";
import { createPagingDataSchema, PagingData } from "./PagingData";

export const RatingSchema = z.object({
  id: z.number().nonnegative(),
  score: z.number().nonnegative().min(0).max(5),
  comment: z.union([z.null(), z.string()]),
  createdOn: z.coerce.date(),
  updatedOn: z.coerce.date(),
  productId: z.number().nonnegative(),
  customer: CreatedBySchema,
});
export type Rating = z.infer<typeof RatingSchema>;
// PagingData is a generic type that takes a schema as a parameter
export const RatingPagingSchema = createPagingDataSchema(RatingSchema);
export type RatingPaging = PagingData<z.infer<typeof RatingSchema>>;
