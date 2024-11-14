import { z } from "zod";
import type { Tables } from "./database";

type User = Tables<"users">;

export const userSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().min(2, { message: "First name is required" }),
  last_name: z.string().min(2, { message: "Last name is required" }),
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

type Organization = Tables<"organizations">;

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, { message: "Organization name is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  logo_url: z.string().url({ message: "Valid logo URL is required" }),
  website: z.string().url({ message: "Valid website URL is required" }),
  admin_id: z.string().uuid(),
  location: z.string().min(2, { message: "Location is required" }),
  industry: z.string().min(2, { message: "Industry is required" }),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const organizationInsertSchema = organizationSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  admin_id: true,
  logo_url: true,
});

export const organizationUpdateSchema = organizationSchema.partial().required({
  id: true,
});
