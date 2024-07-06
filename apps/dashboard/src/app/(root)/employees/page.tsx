import React, { Suspense } from "react";
import type { Metadata } from "next";

import EmployeesHeader from "./components/employees-header";
import EmployeeTable from "./components/table";

import { TableLoader } from "./components/table/table-loading";
import Main from "@/components/main";

export const metadata: Metadata = {
  title: "Employees",
  description: "Manage your employees",
};
async function EmployeesPage() {
  return (
    <Main className="flex flex-col items-center justify-start gap-4">
      <EmployeesHeader />
      <Suspense fallback={<TableLoader />}>
        <EmployeeTable />
      </Suspense>
    </Main>
  );
}

export default EmployeesPage;
