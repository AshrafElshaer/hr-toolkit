import { createServerClient } from "@/lib/supabase/server";
import { z } from "zod";

const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export default async function OrganizationPage() {
  return (
    <main className="flex flex-col">
      <h1>Organization</h1>
    </main>
  );
}
