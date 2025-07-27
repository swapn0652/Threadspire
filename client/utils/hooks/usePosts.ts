import { useInfiniteQuery } from '@tanstack/react-query';
import { postListSchema } from '../zod/post';
import type { Post } from '../zod/post';
import api from '../axios';

type FetchParams = {
  cellId: string;
  sortBy?: 'top' | 'latest';
  take?: number;
};

export function usePostsInCell({ cellId, sortBy = 'top', take = 10 }: FetchParams) {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ['posts-in-cell', cellId, sortBy],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const cursor = pageParam as string | undefined;

      const res = await api.get(`/cells/${cellId}/posts`, {
        params: {
          sortBy,
          take,
          cursor,
        },
      });

      return postListSchema.parse(res.data.items);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.length) return undefined;
      return lastPage[lastPage.length - 1].id;
    },
  });
}
