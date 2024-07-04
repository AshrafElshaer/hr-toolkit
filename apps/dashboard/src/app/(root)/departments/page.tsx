import type { Metadata } from "next";
import { Suspense } from "react";

import DepartmentsHeader from "./components/departments-header";
import DepartmentTable from "./components/table";

import { TableLoader } from "./components/table/table-loading";


export const metadata: Metadata = {
	title: "Departments",
	description: "Manage your departments",
};

export default function DepartmentsPage() {
	return (
		<main className="flex flex-col items-center justify-start h-full p-4 ">
			<DepartmentsHeader />
			<Suspense fallback={<TableLoader />}>
				<DepartmentTable />
			</Suspense>
		</main>
	);
}


