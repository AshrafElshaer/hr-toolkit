import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import { useSupabase } from "@/hooks/use-supabase";
import { createServerClient } from "@/lib/supabase/server";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationById } from "@toolkit/supabase/queries";
import { Icons } from "@toolkit/ui/icons";
import { useSidebar } from "@toolkit/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
  const supabase = useSupabase();

  const { data: organization } = useQuery({
    queryKey: ["organization"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return null;
      }
      const { data: organization } = await getOrganizationById(
        supabase,
        user?.user_metadata?.organization_id,
      );
      return organization;
    },
  });

  if (!organization) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
        <Icons.Logo className="size-8" />
        <Image
          src={organization.logo_url}
          alt={organization.name}
          width={40}
          height={40}
        />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{organization.name}</span>
        <span className="truncate text-xs">org plan</span>
      </div>
    </div>
  );
}
