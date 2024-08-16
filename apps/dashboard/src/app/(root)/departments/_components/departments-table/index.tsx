import React from "react";
import { createServerClient } from "@/lib/supabase/server";
import { getDepartments } from "@hr-toolkit/supabase/departments-queries";

export default async function DepartmentsTable() {
	const supabase = createServerClient();
	const { data } = await getDepartments(supabase);

	return <section>{JSON.stringify(data)}</section>;
}
