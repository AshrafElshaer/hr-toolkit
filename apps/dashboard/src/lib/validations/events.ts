import {z} from "zod"
import {EventTypeEnum} from "@hr-toolkit/supabase/types"


export const eventsSchema = z.object({
    id: z.string().nullable(),
    organizer_id: z.string().nullable(),
    organization_id: z.string().nullable(),
    department_id: z.string().nullable(),
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    type: z.nativeEnum(EventTypeEnum).default("meeting"),
    location: z.string().min(1, { message: "Location is required" }),
    start_time: z.string(),
    end_time: z.string(),
    date:z.string()
})

export const createEventSchema = eventsSchema.omit({id: true , organization_id:true})
export const updateEventSchema = eventsSchema.partial()
