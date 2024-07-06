import { createServerClient } from "@hr-toolkit/supabase/server";
import { getEmployeeById } from "@hr-toolkit/supabase/user-queries";

import type { Metadata, ResolvingMetadata } from "next";

import EmployeeNavigation from "./employee-navigation";
import Main from "@/components/main";

type Props = {
  children: React.ReactNode;
  params: { organizationId: string; employeeId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const supabase = createServerClient();
  const employee = await getEmployeeById(supabase, params.employeeId);
  return {
    title: `${employee.first_name} ${employee.last_name}`,
  };
}

export default async function EmployeeDetailsLayout({
  children,
  params,
}: Props) {
  return (
    <Main className="flex flex-col gap-4">
      <EmployeeNavigation params={params} />
      {children}
    </Main>
  );
}
