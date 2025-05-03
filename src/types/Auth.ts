import { z } from "zod";
import { UserDetailSchema } from "./UserDetail";

export const AuthSchema = z.object({
  userDetails: UserDetailSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type Auth = z.infer<typeof AuthSchema>;
