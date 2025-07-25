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
