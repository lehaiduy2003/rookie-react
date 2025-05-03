import * as z from "zod";
import { UserSchema } from "./User";
import { createPagingDataSchema, PagingData } from "./PagingData";

export const UserDetailSchema = UserSchema.extend({
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.union([z.string(), z.null()]),
  bio: z.union([z.string(), z.null()]),
  dob: z.union([
    z.coerce.date().refine((date) => date <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
    z.null(),
  ]),
  createdOn: z.coerce.date(),
  updatedOn: z.coerce.date(),
});
export type UserDetail = z.infer<typeof UserDetailSchema>;
// PagingData is a generic type that takes a schema as a parameter
export const UserDetailPagingSchema = createPagingDataSchema(UserDetailSchema);
export type UserDetailPaging = PagingData<z.infer<typeof UserDetailSchema>>;
