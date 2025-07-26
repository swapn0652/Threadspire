import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCell } from "../zod/cell";
import api from "../axios";

export function useCreateCell() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: CreateCell) => {
            const res = await api.post("/cells", input);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cells'] });
        }
    })
}