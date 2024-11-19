import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import { useSupabase } from "@/hooks/use-supabase";
import { createServerClient } from "@/lib/supabase/server";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationById } from "@toolkit/supabase/queries";
import { Icons } from "@toolkit/ui/icons";
import { useSidebar } from "@toolkit/ui/sidebar";
import { Skeleton } from "@toolkit/ui/skeleton";
import Image from "next/image";

export function OrganizationLogo() {
  const supabase = useSupabase();

  const { data: organization, isLoading } = useQuery({
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

  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex aspect-square size-9 bg-secondary border items-center justify-center rounded-lg relative">
        {isLoading ? (
          <Skeleton className="absolute inset-0" />
        ) : (
          <Image
            src={organization?.logo_url ?? ""}
            alt={organization?.name ?? "Organization Logo"}
            className="object-cover"
            fill
          />
        )}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        {isLoading ? (
          <>
            <Skeleton className="h-3 mb-1 w-2/3" />
            <Skeleton className="h-2 w-1/3" />
          </>
        ) : (
          <>
            <span className="truncate font-semibold">{organization?.name}</span>
            <span className="truncate text-xs">org plan</span>
          </>
        )}
      </div>
    </div>
  );
}
