import React from "react";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { getDepartments } from "@hr-toolkit/supabase/departments-queries";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hr-toolkit/ui/select";

type Props = {
  value: string;
  onChange: (value: string) => void;
  isOpen?: boolean;
};

export default function DepartmentSelector({
  onChange,
  value,
  isOpen = true,
}: Props) {
  const supabase = createClient();
  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments(supabase),
    enabled: isOpen,
  });
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a department" />
      </SelectTrigger>
      <SelectContent>
        {departments?.map((department) => (
          <SelectItem key={department.id} value={department.id}>
            {department.name}
            {department?.description ? ` - ${department.description}` : ""}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
