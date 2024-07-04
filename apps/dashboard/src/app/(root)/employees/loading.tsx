import React from "react";
import EmployeesHeader from "./components/employees-header";
import { TableLoader } from "./components/table/table-loading";

function EmployeesLoading() {
	return (
		<main className="flex flex-col items-center justify-start h-full p-4 gap-4">
			<EmployeesHeader />
			<TableLoader />
		</main>
	);
}

export default EmployeesLoading;
