import { Input } from "@hr-toolkit/ui/input";
import type { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import React from "react";

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
}

function DepartmentFilters<TData>({ table }: DataTableFiltersProps<TData>) {
  return (
    <div className="flex items-center">
      <Input
        placeholder="Filter Departments by name"
        startIcon={Search}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="w-full sm:max-w-xs "
      />
    </div>
  );
}

export default DepartmentFilters;
