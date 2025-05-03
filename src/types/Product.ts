import { z } from "zod";
import { createPagingDataSchema, PagingData } from "./PagingData";

export const ProductSchema = z.object({
  id: z.number().nonnegative(),
  name: z.string(),
  price: z.number().positive(),
  imageUrl: z.union([
    z
      .string()
      .url()
      .default(
        "https://cdn.mohinhcaocap.com/wp-content/uploads/2024/11/29080836/66e68642ly1hv7mbc19t4j21900u046v.jpg"
      ),
    z.null(),
  ]), // default image url and can be null
  featured: z.boolean(),
  isActive: z.boolean(),
  avgRating: z.number().nonnegative().min(0).max(5),
  ratingCount: z.number().nonnegative(),
});

export type Product = z.infer<typeof ProductSchema>;
// PagingData is a generic type that takes a schema as a parameter
export const ProductPagingSchema = createPagingDataSchema(ProductSchema);
export type ProductPaging = PagingData<z.infer<typeof ProductSchema>>;
