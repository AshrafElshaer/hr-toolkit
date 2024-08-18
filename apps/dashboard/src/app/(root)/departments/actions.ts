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


export const updateDepartmentAction = authAction
.schema(departmentSchema)
.action(async ({ parsedInput ,ctx}) => {
        const {supabase} = ctx
        const {data,error} = await DepartmentMutations.update(supabase,{
            id:parsedInput.id as string,
            name:parsedInput.name,
            description:parsedInput.description,
            manager_id:parsedInput.manager_id,
            updated_at:new Date().toISOString()
        })

        if(error) throw new Error(error.message)

        revalidatePath("/departments")
        return data
    })

export const deleteDepartmentAction = authAction
.schema(departmentSchema.pick({
    id:true
}))
.action(
    async ({ parsedInput ,ctx}) =>{
        const {supabase} = ctx
        const {error} = await DepartmentMutations.delete(supabase,parsedInput.id as string)
        if(error) throw new Error(error.message)
        revalidatePath("/departments")
    }
)