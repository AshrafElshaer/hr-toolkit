import { z } from "zod";
import type { Tables } from "./database";

type User = Tables<"users">;

export const userSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  avatar_url: z.string().optional(),
  timezone: z.string(),
  user_role: z.enum(["admin", "member"]),
  email: z.string().email({ message: "Invalid email address" }),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const userInsertSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const userUpdateSchema = userSchema.partial().required({
  id: true,
});
