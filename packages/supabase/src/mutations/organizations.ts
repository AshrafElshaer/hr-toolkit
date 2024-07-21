import type { Addresses, Organization, SupabaseClient } from "../types";

type CreateOrganization = Organization["Insert"];

type UpdateOrganization = Organization["Update"];
type CreateAddress = Addresses["Insert"];

export async function createOrganizationMutation(
  supabase: SupabaseClient,
  input: CreateOrganization,
  address: Omit<CreateAddress, "owner_id">,
) {
  const { data: orgCreated, error: orgError } = await supabase.from(
    "organizations",
  ).insert({
    name: input.name,
    type: input.type,
    employees_count: input.employees_count,
    contact_name: input.contact_name,
    contact_email: input.contact_email,
    contact_number: input.contact_number,
    payroll_pattern: input.payroll_pattern,
    payroll_start_day: input.payroll_start_day,
    owner_id: input.owner_id,
  })
    .select("*")
    .single();

  if (orgError || !orgCreated) {
    throw new Error(orgError?.message);
  }

  await supabase.auth.admin.updateUserById(orgCreated.owner_id, {
    role: "admin",
    user_metadata: {
      organization_id: orgCreated.id,
    },
  });

  const { data: addressCreated, error: addressError } = await supabase.from(
    "addresses",
  ).insert({
    owner_id: orgCreated.id,
    ...address,
  });
  if (addressError || !addressCreated) {
    throw new Error(addressError?.message);
  }

  return orgCreated;
}
