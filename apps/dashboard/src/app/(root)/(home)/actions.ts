"use server";
import { revalidatePath ,revalidateTag} from "next/cache"
import {authAction} from "@/lib/safe-action"
import notesMutations from "@hr-toolkit/supabase/notes-mutations"
import { noteSchema ,updateNoteSchema} from "@/lib/validations/notes";
import {z} from "zod"




export const createNoteAction = authAction
.schema(noteSchema)
.action(async ({ctx:{supabase,user},parsedInput})=>{
    const {id,created_at,updated_at ,...newNote} = parsedInput
    const {data,error} = await notesMutations.create(supabase,{
        ...newNote,
        user_id:user.id
    })
    if(error) throw new Error(error.message)
    revalidatePath("/")
    return data.id
})



export const updateNoteAction = authAction
.schema(updateNoteSchema)
.action(
    async({ctx,parsedInput})=>{
        const {supabase, user} = ctx


        const {data,error} = await notesMutations.update(supabase,{
            ...parsedInput,
            user_id:user.id
        })
        if(error) throw new Error(error.message)

        revalidatePath("/")

        return data.id



    }
)

export const deleteNoteAction = authAction
.schema(z.object({
    id:z.string().uuid()
}))
.action(
    async({ctx:{supabase},parsedInput})=>{
        const {data,error} = await notesMutations.delete(supabase,parsedInput.id)
        if(error){
            throw new Error(error.message)
        }
        revalidatePath("/")
        return data
    }
)



