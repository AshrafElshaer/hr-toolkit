import React, { Suspense } from "react";

import DepartmentsTable from "./_components/departments-table";
import type { Metadata } from "next";
import DepartmentsTableLoading from "./_components/departments-table/table.loading";

export const metadata: Metadata = {
	title: "Departments",
	description: "Manage your departments",
};

export default async function DepartmentsPage() {
	return (
		<Suspense fallback={<DepartmentsTableLoading />}>
			<DepartmentsTable />
		</Suspense>
	);
}
