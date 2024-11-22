import type { Tables } from "@toolkit/supabase/types";
import { Card } from "@toolkit/ui/card";
import { DeleteDepartment } from "./delete-department";
import { UpdateDepartment } from "./edit-department";

export function DepartmentCard({
  department,
}: { department: Tables<"departments"> }) {
  return (
    <Card className="bg-accent flex justify-between group">
      <h2 className="text-lg font-semibold">{department.name}</h2>
      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <UpdateDepartment department={department} />
        <DeleteDepartment department={department} />
      </div>
    </Card>
  );
}
