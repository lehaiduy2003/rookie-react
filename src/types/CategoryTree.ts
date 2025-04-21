import * as z from "zod";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const CategoryTreeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.number().nonnegative(),
    name: z.string().min(1), // Ensure name is not empty
    description: z.string(),
    subCategories: z.array(CategoryTreeSchema),
  })
);

export type CategoryTree = z.infer<typeof CategoryTreeSchema>;
