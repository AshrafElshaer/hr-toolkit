import Editor from "@/components/editors/advanced";
import { createServerClient } from "@/lib/supabase/server";
import { getOrganizationByDomain } from "@toolkit/supabase/queries";
import { Separator } from "@toolkit/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    domain: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { domain } = await params;
  const supabase = await createServerClient();
  const { data: organization } = await getOrganizationByDomain(
    supabase,
    domain,
  );

  if (!organization) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-4 items-start px-4 py-12 max-w-3xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between w-full">
        <Link
          href={`https://${domain}`}
          target="_blank"
          className="flex items-center gap-4"
        >
          <Image
            src={organization.logo_url ?? ""}
            alt={organization.name ?? ""}
            width={40}
            height={40}
          />

          <h1 className="text-2xl font-bold">{organization?.name}</h1>
        </Link>

        <div className="space-y-2">
          <h3 className="text-secondary-foreground">Industry</h3>
          <p className="font-semibold">{organization?.industry}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-secondary-foreground">Location</h3>
          <p className="font-semibold">{organization?.location}</p>
        </div>
      </div>

      <div className="space-y-2 w-full">
        <h3 className="text-secondary-foreground">Description</h3>
        <p className="font-semibold">{organization?.description}</p>
      </div>

      <Editor
        initialValue={
          typeof organization.profile === "string"
            ? JSON.parse(organization.profile)
            : undefined
        }
        editable={false}
      />
    </main>
  );
}
