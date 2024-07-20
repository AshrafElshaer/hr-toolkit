import { z } from "zod";

export const createOrganizationSchema = z.object({
    name: z.string().min(2, {
        message: "Must be at least 2 characters.",
    }),
    type: z.enum(["private", "public", "non-profit"]),
    

});
