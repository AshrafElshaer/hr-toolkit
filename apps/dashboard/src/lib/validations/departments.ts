import {z} from "zod"


export const departmentSchema = z.object({
    id: z.string().nullable(),
    organization_id: z.string().nullable(),
    manager_id: z.string().uuid(),
    name: z.string().min(2, {
        message: "Must be at least 3 characters",
    }),
    description: z.string().min(3, {
        message: "Must be at least 3 characters",
    }),
    employees_count: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
})


