import type { CreateAddress, SupabaseClient, User } from "../types";

type CreateUser = User["Insert"];

interface CreateOrganizationOwner
  extends
    Omit<CreateUser, "id">,
    Omit<CreateAddress, "organization_id"| "user_id"> {}

export async function createOrganizationOwner(
  supabase: SupabaseClient,
  user: CreateOrganizationOwner,
) {
  if (!user.organization_id || !user.id) {
    throw new Error("Organization ID is required");
  }

  const { data: newDepartment, error: departmentError } = await supabase.from(
    "departments",
  ).insert({
    name: "Exec",
    description: "Executive Department",
    organization_id: user.organization_id,
    manager_id: user.id,
    employees_count: 1,
  }).select("id").single();

  if (departmentError || !newDepartment.id) {

    throw new Error(departmentError?.message || "Failed to create department");
  }

  const { data: newUser, error: newUserError } = await supabase.from("users")
    .update({
      department_id: newDepartment.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      salary_per_hour: user.salary_per_hour,
      work_hours_per_week: user.work_hours_per_week,
      date_of_birth: user.date_of_birth,
      hire_date: user.hire_date,
      leave_date: user.leave_date,
      employment_status: user.employment_status,
      employment_type: user.employment_type,
      gender: user.gender,
      job_title: user.job_title,
      organization_id: user.organization_id,
    }).eq("id", user.id).select("*").single();

  if (newUserError || !newUser.id) {
    throw new Error(newUserError?.message || "Failed to create user");
  }

  const { data: newAddress, error: newAddressError } = await supabase.from(
    "addresses",
  ).insert({
    address_1: user.address_1,
    address_2: user.address_2,
    city: user.city,
    state: user.state,
    country: user.country,
    zip_code: user.zip_code,
    user_id: newUser.id,

    organization_id: user.organization_id,
  }).select("id").single();

  if (newAddressError || !newAddress.id) {
    throw new Error(newAddressError?.message || "Failed to create address");
  }

  return newUser;
}

export default {
  createOwner: createOrganizationOwner,
};
