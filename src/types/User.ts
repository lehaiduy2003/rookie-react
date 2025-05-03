import * as z from "zod";
import { RoleEnumSchema } from "../enums/Role";
import { MemberTierEnumSchema } from "../enums/MemberTier";
import { createPagingDataSchema, PagingData } from "./PagingData";

const MemberTierEnum = z.union([z.null(), MemberTierEnumSchema]);

export type MemberTierEnum = z.infer<typeof MemberTierEnum>;

export const UserSchema = z.object({
  id: z.number().nonnegative(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.union([
    z.string().url().default("https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"),
    z.null(),
  ]), // default image url and can be null
  role: RoleEnumSchema,
  memberTier: MemberTierEnum, // for admin with null memberTier
  isActive: z.boolean().default(true),
  createdOn: z.coerce.date(),
  updatedOn: z.coerce.date(),
});
export type User = z.infer<typeof UserSchema>;
// PagingData is a generic type that takes a schema as a parameter
export const UserPagingSchema = createPagingDataSchema(UserSchema);
export type UserPaging = PagingData<z.infer<typeof UserSchema>>;
