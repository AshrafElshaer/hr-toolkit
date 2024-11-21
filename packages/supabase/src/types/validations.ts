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
  created_at: z.string(),
  updated_at: z.string(),
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

interface JSONContent {
  [key: string]: unknown;
  type?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  marks?: {
    type: string;
    attrs?: Record<string, unknown>;
    [key: string]: unknown;
  }[];
  text?: string;
}

export const organizationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, { message: "Organization name is required" }),
  logo_url: z.string().url({ message: "Valid logo URL is required" }),
  domain: z
    .string()
    .regex(/^(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/, "Invalid domain format"),
  admin_id: z.string().uuid(),
  profile: z.custom<JSONContent>().optional(),
  description: z.string().min(10, { message: "Description is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  industry: z.string().min(2, { message: "Industry is required" }),
  created_at: z.string(),
  updated_at: z.string(),
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

export const departmentSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  name: z.string().min(2, {
    message: "Name need to be minimum 2 characters",
  }),
  created_at: z.string(),
  updated_at: z.string(),
});

export const departmentInsertSchema = departmentSchema.omit({
  id: true,
  organization_id: true,
  created_at: true,
  updated_at: true,
});

export const departmentUpdateSchema = departmentSchema.partial().required({
  id: true,
});
