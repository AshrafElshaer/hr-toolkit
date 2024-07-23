import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid().nullable(),
  organization_id: z.string().uuid(),
  address_1: z.string().min(6,{
    message: "Must be at least 2 characters long."
  }),
  address_2: z.string().nullable(),
  city: z.string().min(2,{
    message: "Must be at least 2 characters long."
  }),
  state: z.string().min(2,{
    message: "Must be at least 2 characters long."
  }),
  country: z.string().min(2,{
    message: "Must be at least 2 characters long."
  }),
  zip_code: z.string().min(5,{
    message: "Must be at least 2 characters long."
  }),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createAddressSchema = addressSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
