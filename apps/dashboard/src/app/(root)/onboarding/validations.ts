import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

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
  contact_number: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  payroll_pattern: z.enum(["weekly", "bi-weekly", "monthly"]),
  payroll_start_day: z.number().int().min(1).max(31),
});
