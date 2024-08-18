import React from "react";
import { columns } from "./columns";
import { createServerClient } from "@/lib/supabase/server";
import { getDepartments } from "@hr-toolkit/supabase/departments-queries";

import type { DepartmentWithManager } from "@hr-toolkit/supabase/types";

import DepartmentsTable from "./data-table";

export default async function DepartmentsTableIndex() {
	const supabase = createServerClient();
	const { data } = await getDepartments(supabase);
	return (
		<DepartmentsTable
			data={data as unknown as DepartmentWithManager[]}
			columns={columns}
		/>
	);
}
