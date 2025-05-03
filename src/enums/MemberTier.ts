import * as z from "zod";

export const MemberTierEnumSchema = z.enum(["COMMON", "PREMIUM", "VIP"]);

export type MemberTier = z.infer<typeof MemberTierEnumSchema>;
