import { useQuery } from '@tanstack/react-query';
import api from '../axios';

export function useJoinedCells() {
  return useQuery({
    queryKey: ['joined-cells'],
    queryFn: async () => {
      const { data } = await api.get('/cells/joined-cells');
      return data as { id: string }[];
    },
  });
}
