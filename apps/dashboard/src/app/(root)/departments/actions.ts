"use server"
import {authAction} from "@/lib/safe-action";
import{departmentSchema} from "@/lib/validations/departments";
import DepartmentMutations from "@hr-toolkit/supabase/departments-mutations";
import { revalidatePath } from "next/cache";


export const cerateDepartmentAction = authAction
    .schema(departmentSchema)
    .action(async ({ parsedInput ,ctx}) => {
        const {user,supabase} = ctx

        const {data,error} = await DepartmentMutations.create(supabase,{
            name:parsedInput.name,
            description:parsedInput.description,
            manager_id:parsedInput.manager_id,
            organization_id:user.organization_id as string
        })

        if(error) throw new Error(error.message)

        revalidatePath("/departments")
        return data
    })