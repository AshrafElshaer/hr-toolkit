import { InviteTeamMember } from "@/features/organization/team/components/invite";
import { MembersTable } from "@/features/organization/team/components/table";
import { columns } from "@/features/organization/team/components/table/columns";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationMembers } from "@toolkit/supabase/queries";
import { headers } from "next/headers";

export default async function OrganizationTeamPage() {
  const supabase = await createServerClient();
  const headerList = await headers();
  const organizationId = headerList.get("x-organization-id");

  console.log(organizationId);
  const { data: members } = await getOrganizationMembers(
    supabase,
    organizationId ?? "",
  );
  return (
    <main className="flex flex-col gap-4 flex-grow">
      <p className="text-muted-foreground font-semibold">
        Organization Team
        <br />
        Invite and manage team members within your organization.
      </p>
      <InviteTeamMember />

      <MembersTable columns={columns} data={members ?? []} />
    </main>
  );
}
