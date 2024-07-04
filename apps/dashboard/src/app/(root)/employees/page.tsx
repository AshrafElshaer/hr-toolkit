import React, { Suspense } from "react";
import type { Metadata } from "next";

import EmployeesHeader from "./components/employees-header";
import EmployeeTable from "./components/table";

import { TableLoader } from "./components/table/table-loading";

export const metadata: Metadata = {
	title: "Employees",
	description: "Manage your employees",
};
async function EmployeesPage() {
	return (
		<main className="flex flex-col items-center justify-start h-full p-4 gap-4">
			<EmployeesHeader />
			<Suspense fallback={<TableLoader />}>
				<EmployeeTable />
			</Suspense>
		</main>
	);
}

export default EmployeesPage;
