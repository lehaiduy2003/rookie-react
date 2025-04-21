import { z } from "zod";
import { CategorySchema } from "./Category";
import { RatingSchema } from "./Rating";
import { CreatedBySchema } from "./CreatedBy";
import { ProductSchema } from "./Product";

export const ProductDetailSchema = ProductSchema.extend({
  description: z.string(),
  category: CategorySchema,
  quantity: z.number().nonnegative(),
  ratingCount: z.number().nonnegative(),
  createdOn: z.coerce.date(),
  updatedOn: z.coerce.date(),
  ratings: z.array(RatingSchema),
  createdBy: CreatedBySchema,
});
export type ProductDetail = z.infer<typeof ProductDetailSchema>;
