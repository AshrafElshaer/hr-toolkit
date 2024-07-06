import type { Metadata } from "next";
import { Suspense } from "react";

import DepartmentsHeader from "./components/departments-header";
import DepartmentTable from "./components/table";

import { TableLoader } from "./components/table/table-loading";
import Main from "@/components/main";

export const metadata: Metadata = {
	title: "Departments",
	description: "Manage your departments",
};

export default function DepartmentsPage() {
	return (
		<Main className="flex flex-col gap-4 items-center justify-start  ">
			<DepartmentsHeader />
			<Suspense fallback={<TableLoader />}>
				<DepartmentTable />
			</Suspense>
		</Main>
	);
}
