import * as z from "zod";
export const RoleEnumSchema = z.enum(["ADMIN", "CUSTOMER", "VENDOR"]);

export type Role = z.infer<typeof RoleEnumSchema>;
