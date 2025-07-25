import { z } from 'zod';

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
    email: z.string().optional(),
    spark: z.number(),
    createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid Date Format"
    })
})

export type User = z.infer<typeof userSchema>;