import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { createAddressSchema } from "./address";

export const userSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid(),
  department_id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  avatar_url: z.string().nullable(),
  phone_number: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
  date_of_birth: z.date(),
  gender: z.string(),
  hire_date: z.date(),
  leave_date: z.date().nullable(),
  job_title: z.string(),
  employment_status: z.enum(["active", "on_hold", "terminated"]),
  employment_type: z.enum(["full_time", "part_time", "contractor"]),
  work_hours_per_week: z.number().int(),
  role: z.enum(["admin", "manager", "staff"]),
  salary_per_hour: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).merge(createAddressSchema);
