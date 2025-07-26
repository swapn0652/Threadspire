import { z } from 'zod';

export const CellSchema = z.object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    description: z.string(),
    createdAt: z.coerce.date(),
    createdById: z.string()
});

export const GetAllCellsSchema = z.array(CellSchema);

export type Cell = z.infer<typeof CellSchema>;

export const CreateCellSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, _ and - allowed'),
    description: z.string().max(300, 'Max 300 characters').optional()
})

export type CreateCell = z.infer<typeof CreateCellSchema>;