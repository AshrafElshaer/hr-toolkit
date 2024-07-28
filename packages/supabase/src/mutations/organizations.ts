import type {
  Addresses,
  CreateAddress,
  Organization,
  SupabaseClient,
} from "../types";

type CreateOrganization = Organization["Insert"];

type UpdateOrganization = Organization["Update"];

export async function createOrganizationMutation(
  supabase: SupabaseClient,
  org: CreateOrganization,
) {
  const { data: orgCreated, error: orgError } = await supabase.from(
    "organizations",
  ).insert({
    name: org.name,
    type: org.type,
    employees_count: org.employees_count,
    contact_name: org.contact_name,
    contact_email: org.contact_email,
    contact_number: org.contact_number,
    payroll_pattern: org.payroll_pattern,
    payroll_start_day: org.payroll_start_day,
    time_zone: org.time_zone,
    owner_id: org.owner_id,
    address_1: org.address_1,
    address_2: org.address_2,
    city: org.city,
    state: org.state,
    country: org.country,
    zip_code: org.zip_code,
  })
    .select("*")
    .single();

  if (orgError || !orgCreated.id || !orgCreated.owner_id) {
    throw new Error(orgError?.message);
  }

  await supabase.from(
    "users",
  ).update({
    organization_id: orgCreated.id,
    user_role: "admin",
  })
    .eq("id", orgCreated.owner_id);

  await supabase.auth.updateUser({
    data: {
      organization_id: orgCreated.id,
    },
  });

  return orgCreated;
}

export default {
  create: createOrganizationMutation,
};
