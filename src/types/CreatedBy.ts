import { z } from "zod";
import { RoleEnumSchema } from "../enums/Role";
import { MemberTierEnumSchema } from "../enums/MemberTier";

export const CreatedBySchema = z.object({
  id: z.number().nonnegative(),
  firstName: z.string(),
  lastName: z.string(),
  avatar: z.string().url(),
  role: RoleEnumSchema,
  memberTier: z.union([z.null(), MemberTierEnumSchema]),
});
export type CreatedBy = z.infer<typeof CreatedBySchema>;
