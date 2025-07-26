'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateCell, CreateCellSchema } from "../../../../utils/zod/cell";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCell } from "../../../../utils/hooks/useCreateCell";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function CreateCellsPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateCell>({
        resolver: zodResolver(CreateCellSchema),
    });

    const { mutate, isPending, isSuccess } = useCreateCell();

    const onSubmit = (data: CreateCell) => {
        mutate(data);
    }

    useEffect(() => {
        if(isSuccess) {
            toast.success('Cell created successfully!');
            router.push('/cells');
        }
    }, [isSuccess, router])

     return (
    <div className="min-h-screen px-4 py-8 bg-white dark:bg-neutral-950  text-zinc-900 dark:text-white">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Cell</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unique Name (used in URL)</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white"
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description')}
              className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white resize-none"
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
          >
            {isPending ? 'Creating...' : 'Create Cell'}
          </button>
        </form>
      </div>
    </div>
  );
}