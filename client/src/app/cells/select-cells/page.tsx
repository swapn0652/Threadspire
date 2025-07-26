'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '../../../../utils/axios';

interface Cell {
  id: string;
  name: string;
  title: string;
}

export default function SelectCellsPage() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { data: cells, isLoading } = useQuery<Cell[]>({
    queryKey: ['cells'],
    queryFn: async () => {
      const res = await api.get('/cells');
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (cellIds: string[]) => {
      return api.post(
        '/cells/join-cells',
        { cellIds },
      );
    },
    onSuccess: () => {
      toast.success('Interests saved!');
      router.replace('/');
    },
    onError: () => {
      toast.error('Failed to save interests');
    },
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredCells = cells?.filter((cell) =>
    cell.name.toLowerCase().includes(search.toLowerCase()) ||
    cell.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    console.log("selectedIds: ", selectedIds);
  }, [selectedIds])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-8 rounded-2xl shadow-lg border dark:border-zinc-800 bg-white dark:bg-neutral-950">
        <h1 className="text-2xl font-bold text-center mb-2 text-zinc-800 dark:text-white">
          What are you interested in?
        </h1>
        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mb-6">
          Select a few cells to personalize your feed
        </p>

        <input
          type="text"
          placeholder="Search cells..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
          {isLoading ? (
            <p className="text-zinc-500">Loading...</p>
          ) : (
            filteredCells?.map((cell) => (
              <button
                key={cell.id}
                type="button"
                onClick={() => toggleSelect(cell.id)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  selectedIds.includes(cell.id)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white border-zinc-300 dark:border-zinc-700'
                }`}
              >
                {cell.title}
              </button>
            ))
          )}
        </div>

        <button
          disabled={selectedIds.length < 2 || mutation.isPending}
          onClick={() => mutation.mutate(selectedIds)}
          className="mt-6 w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
