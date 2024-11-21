import { DepartmentForm } from "@/features/departments/components/new-department";
import { createServerClient } from "@/lib/supabase/server";
import { getDepartmentsByOrganizationId } from "@toolkit/supabase/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function DepartmentsPage() {
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");
  const supabase = await createServerClient();

  if (!organizationId) {
    redirect("/organization");
  }

  const { data, error } = await getDepartmentsByOrganizationId(
    supabase,
    organizationId,
  );
  return (
    <div className="flex flex-col gap-4">
      <DepartmentForm />
      {data?.map((department) => (
        <div key={department.id}>{department.name}</div>
      ))}
    </div>
  );
}
