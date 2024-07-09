import Main from "@/components/main";
import React from "react";

import AdminView from "./_components/admin-view";
import { createServerClient } from "@hr-toolkit/supabase/server";
import { getUser } from "@hr-toolkit/supabase/user-queries";
type Props = {
	searchParams?: { [key: string]: string | undefined };
};
export default async function AttendancePage({ searchParams }: Props) {
	const supabase = createServerClient();
	const { user } = await getUser(supabase);
	return (
		<Main className="flex flex-col items-center justify-center" maxHeight>
			{user?.role === "employee" ? (
				// <EmployeeView searchParams={searchParams} />
				<div>Employee View</div>
			) : (
				<AdminView searchParams={searchParams} />
			)}
		</Main>
	);
}
