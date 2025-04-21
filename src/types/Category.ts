import * as z from "zod";

export const CategorySchema = z.object({
  id: z.number().nonnegative(),
  name: z.string().min(1), // Ensure name is not empty
  description: z.union([z.null(), z.string()]),
  parentId: z.union([z.null(), z.number().nonnegative()]),
});
export type Category = z.infer<typeof CategorySchema>;
