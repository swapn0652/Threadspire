import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import api from "../axios"
import { User, userSchema } from "../zod/user"

export function useMe() {
    return useQuery<User, AxiosError>({
        queryKey: ['me'],
        queryFn: async () => {
            const res = api.get('/auth/me');

            return userSchema.parse((await res).data);
        },
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}