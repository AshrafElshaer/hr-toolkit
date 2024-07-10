import {
  createNewDepartment,
  editDepartment,
} from "@/app/(root)/departments/actions";
import type { DepartmentColumn } from "@/app/(root)/departments/components/table/columns";
import type { departmentSchema } from "@/app/(root)/departments/validation";
import type { z } from "zod";
import { queryClient } from "@/lib/react-query";
import { createClient } from "@hr-toolkit/supabase/client";
import { getDepartments } from "@hr-toolkit/supabase/departments-queries";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
  initialData?: DepartmentColumn[];
};

export function useDepartments({
  initialData,
}: Props) {
  const supabase = createClient();
  const { data: departments, error, isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments(supabase),
    initialData,
  });

  const {
    mutateAsync: createDepartment,
    isPending: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof departmentSchema>) => {
      const { data: newDepartment, serverError } = await createNewDepartment(
        values,
      );
      if (serverError) {
        throw Error(serverError);
      }
      return newDepartment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });

  const {
    mutateAsync: updateDepartment,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: async (values: z.infer<typeof departmentSchema>) => {
      const { data, serverError } = await editDepartment(values);
      if (serverError) {
        throw Error(serverError);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });

  return {
    departments,
    isLoading,
    error,

    createDepartment,
    isCreating,
    createError,

    updateDepartment,
    isUpdating,
    updateError,
  };
}
