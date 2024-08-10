"use server";
import { revalidatePath ,revalidateTag} from "next/cache"
import {authAction} from "@/lib/safe-action"
import notesMutations from "@hr-toolkit/supabase/notes-mutations"
import { noteSchema } from "@/lib/validations/notes";




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
    return data


})


