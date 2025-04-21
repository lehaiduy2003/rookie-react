import * as z from "zod";
import { UserSchema } from "./User";

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
