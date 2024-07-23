import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().uuid(),
  owner_id: z.string().uuid().nullable(),
  organization_id: z.string().uuid(),
  address_1: z.string(),
  address_2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip_code: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const createAddressSchema = addressSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
