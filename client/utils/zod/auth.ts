import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(2),
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(6)
})

export type SignUpInput = z.infer<typeof signUpSchema>;