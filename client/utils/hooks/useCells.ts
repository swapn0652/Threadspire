import { useQuery } from "@tanstack/react-query";
import api from "../axios";
import { GetAllCellsSchema } from "../zod/cell";

export function useCells() {
  return useQuery({
    queryKey: ['cells'],
    queryFn: async () => {
      const { data } = await api.get('/cells');

      const parsed = GetAllCellsSchema.safeParse(data); // ✅ use safeParse

      if (!parsed.success) {
        console.error(parsed.error);
        throw new Error('Invalid cells data received from server');
      }

      return parsed.data;
    }
  });
}
