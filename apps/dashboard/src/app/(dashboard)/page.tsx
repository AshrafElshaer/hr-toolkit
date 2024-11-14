"use client";


import { createBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@toolkit/ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function Page() {
  const supabase = createBrowserClient();
  const router = useRouter();
  const pathname = usePathname();

 

  return (
    <div>
  
      <Button
        onClick={() =>
          supabase.auth
            .signOut()
            .then(() => router.push(`/auth?redirect_url=${pathname}`))
        }
      >
        Sign Out
      </Button>
    </div>
  );
}
