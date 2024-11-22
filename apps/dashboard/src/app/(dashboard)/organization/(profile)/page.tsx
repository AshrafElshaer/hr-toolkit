import { ProfileForm } from "@/features/organization/components/profile/profile-form";
import { UploadLogo } from "@/features/organization/components/profile/upload-logo";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationById } from "@toolkit/supabase/queries";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { z } from "zod";

export default async function OrganizationPage() {
  const supabase = await createServerClient();
  const headersList = await headers();
  const organizationId = headersList.get("x-organization-id");

  const { data: organization } = await getOrganizationById(
    supabase,
    organizationId ?? "",
  );
  if (!organization) return notFound();
  return (
    <main className="flex flex-col gap-4">
      <p className="text-muted-foreground font-semibold">
        Organization Profile
        <br />
        View and manage all organization details displayed on the profile page.
      </p>

      <ProfileForm organization={organization} />
    </main>
  );
}
