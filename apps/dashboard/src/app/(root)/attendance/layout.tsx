import { createServerClient } from "@hr-toolkit/supabase/server";
import { getUser } from "@hr-toolkit/supabase/user-queries";
import type { ReactNode } from "react";

export default async function AttendancesPageLayout({
	children,
	adminView,
	employeeView,
}: {
	children: ReactNode;
	adminView: ReactNode;
	employeeView: ReactNode;
}) {
	const supabase = createServerClient();
	const { user } = await getUser(supabase);

	if (user?.role === "employee") {
		return <>{employeeView}</>;
	}

	return <>{adminView}</>;
}
