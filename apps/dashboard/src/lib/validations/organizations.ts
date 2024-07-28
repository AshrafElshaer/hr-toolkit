import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { createAddressSchema } from "./address";
import {
  OrganizationTypeEnum,
  PayrollPatternEnum,
} from "@hr-toolkit/supabase/types";

export const organizationSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid(),
  name: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
  type: z.nativeEnum(OrganizationTypeEnum).default("private"),
  employees_count: z.number().int(),
  logo_url: z.string().nullable(),
  time_zone: z.string(),
  website: z.string().nullable(),
  contact_name: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
  contact_email: z.string().email(),
  contact_number: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  payroll_pattern: z.nativeEnum(PayrollPatternEnum).default("monthly"),
  payroll_start_day: z.number().int().min(1).max(31),
  address_1: z.string().min(5,{
    message: "Must be at least 5 characters",
  }),
  address_2: z.string().nullable(),
  city: z.string().min(3, { message: "Must be at least 3 characters" }),
  state: z.string().min(2, { message: "Must be at least 2 characters" }),
  country: z.string().min(2, { message: "Must be at least 2 characters" }),
  zip_code: z.string().min(4, { message: "Must be at least 4 characters" }),
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
