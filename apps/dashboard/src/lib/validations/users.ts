import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { createAddressSchema } from "./address";
import {
  EmploymentStatusEnum,
  EmploymentTypeEnum,
  UserRolesEnum,
} from "@hr-toolkit/supabase/types";

export const userSchema = z.object({
  id: z.string().uuid(),
  organization_id: z.string().uuid().nullable(),
  department_id: z.string().uuid().nullable(),
  email: z.string().email(),
  first_name: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
  last_name: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
  avatar_url: z.string().nullable(),
  phone_number: z.string().refine((value) => isValidPhoneNumber(value), {
    message: "Invalid phone number",
  }),
  date_of_birth: z.string(),
  gender: z.string().min(4, {
    message: "Must be at least 4 characters",
  }),
  hire_date: z.string(),
  leave_date: z.string().nullable(),
  job_title: z.string().min(3, {
    message: "Must be at least 3 characters",
  }),
  employment_status: z.nativeEnum(EmploymentStatusEnum).default("active"),
  employment_type: z.nativeEnum(EmploymentTypeEnum).default("full_time"),
  work_hours_per_week: z.number().int(),
  user_role: z.nativeEnum(UserRolesEnum),
  salary_per_hour: z.number().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createUserSchema = userSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
}).merge(createAddressSchema);
