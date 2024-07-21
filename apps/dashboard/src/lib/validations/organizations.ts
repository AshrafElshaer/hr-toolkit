import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
export const createOrganizationSchema = z.object({
  name: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  type: z.enum(["private", "public", "non-profit"]),
  employees_count: z.number().int().default(0),
  contact_name: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  contact_email: z.string().email(),
  contact_number: z.string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  payroll_pattern: z.enum(["weekly", "biweekly", "monthly"]),
  payroll_start_day: z.number().int().min(1).max(31),
  address_1: z.string().min(2, {}),
  address_2: z.string().nullable(),
  city: z.string().min(2, {}),
  state: z.string().min(2, {}),
  zip_code: z.string().min(2, {}),
  country: z.string().min(2, {}),
});
