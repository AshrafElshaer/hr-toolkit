import { z } from "zod";


export const addressSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  organization_id: z.string().uuid(),
  address_1: z.string().min(5, {
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

export const createAddressSchema = addressSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  user_id: true,
  organization_id: true,
});
