import React from "react";
import DepartmentsHeader from "./components/departments-header";
import { TableLoader } from "./components/table/table-loading";
import Main from "@/components/main";

export default function DepartmentsLoading() {
  return (
    <Main className="flex flex-col gap-4 items-center justify-start  ">
      <DepartmentsHeader />
      <TableLoader />
    </Main>
  );
}
