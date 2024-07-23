import { createServerClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@hr-toolkit/supabase/user-queries";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function OnboardingLayout({
	children,
}: { children: ReactNode }) {
	const supabase = createServerClient();
	const { user } = await getCurrentUser(supabase);

	if (user?.organization_id) {
		redirect("/");
	}
	return <>{children}</>;
}
