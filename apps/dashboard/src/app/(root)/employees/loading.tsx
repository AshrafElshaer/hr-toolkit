import React from "react";
import EmployeesHeader from "./components/employees-header";
import { TableLoader } from "./components/table/table-loading";
import Main from "@/components/main";

function EmployeesLoading() {
	return (
		<Main className="flex flex-col items-center justify-start gap-4">
			<EmployeesHeader />
			<TableLoader />
		</Main>
	);
}

export default EmployeesLoading;
