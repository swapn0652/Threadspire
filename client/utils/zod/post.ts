import { z } from 'zod';

export const postSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
  user: z.object({
    id: z.string(),
    username: z.string(),
    name: z.string(),
  }),
  votes: z.array(
    z.object({
      userId: z.string(),
      value: z.number(),
    })
  ),
  cell: z.object({
    id: z.string(),       
    name: z.string(),
  }),
});

export const postListSchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;
