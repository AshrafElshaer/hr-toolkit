import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { createAddressSchema } from "./address";

export const organizationSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(),
  name: z.string().min(2, {
    message: "Must be at least 2 characters long.",
  }),
  type: z.enum(["private", "public", "non-profit"]),
  employees_count: z.number().int(),
  contact_name: z.string().min(2, {
    message: "Must be at least 2 characters long.",
  }),
  contact_email: z.string().email({
    message: "Invalid email address.",
  }),
  contact_number: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
  payroll_pattern: z.enum(["weekly", "biweekly", "monthly"]),
  payroll_start_day: z.number().int(),
  registration_number: z.string().regex(/^\d{9}$/, {
    message: "Invalid registration number.",
  }),
  tax_id: z.string().regex(/^\d{9}$/, {
    message: "Invalid tax id.",
  }),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createOrganizationSchema = organizationSchema.merge(
  createAddressSchema,
).omit({
  id: true,
  created_at: true,
  updated_at: true,
  owner_id: true,
  organization_id: true,
});
