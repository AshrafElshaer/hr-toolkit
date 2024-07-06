import React from "react";
import AttendanceFilter from "./_components/attendance-filter";
import { InfoLoading } from "./_components/loading/info";
import Main from "@/components/main";

export default function EmployeeAttendanceLoading() {
  return (
    <Main className="flex flex-col gap-4 justify-start  ">
      <AttendanceFilter />
      <InfoLoading />
      <div>Loading table...</div>
    </Main>
  );
}
