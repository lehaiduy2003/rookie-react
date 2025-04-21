import * as z from "zod";

// Define a function that creates a schema for a paging data with a generic type
export const createPagingDataSchema = <T extends z.ZodType>(schema: T) => {
  return z.object({
    content: z.array(schema),
    totalPages: z.number(),
    totalElements: z.number(),
    size: z.number(),
    page: z.number(),
    empty: z.boolean(),
  });
};

// Define a generic type for PagingData
export type PagingData<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  page: number;
  empty: boolean;
};
