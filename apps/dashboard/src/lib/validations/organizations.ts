import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { createAddressSchema } from "./address";

export const organizationSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["private", "public", "non-profit"]),
  employees_count: z.number().int(),
  contact_name: z.string(),
  contact_email: z.string().email(),
  contact_number: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
  payroll_pattern: z.enum(["weekly", "biweekly", "monthly"]),
  payroll_start_day: z.number().int(),
  registration_number: z.string(),
  tax_id: z.string(),
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
