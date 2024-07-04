import React from "react";
import DepartmentsHeader from "./components/departments-header";
import { TableLoader } from "./components/table/table-loading";

export default function DepartmentsLoading() {
	return (
		<main className="flex flex-col gap-4 items-center justify-start h-full p-4 ">
			<DepartmentsHeader />
			<TableLoader />
		</main>
	);
}
