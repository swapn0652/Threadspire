'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useCells } from '../../../utils/hooks/useCells';
import { CellCard } from '@/components/CellCard';
import { useJoinedCells } from '../../../utils/hooks/useJoinedCells';

export default function CellsPage() {
  const { data, isLoading } = useCells();
  const [search, setSearch] = useState('');
  const { data: joinedCells = [] } = useJoinedCells();

  const joinedIds = new Set(joinedCells.map(c => c.id));

  const filteredCells = data?.filter((cell) =>
    cell.name.toLowerCase().includes(search.toLowerCase()) ||
    cell.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-6 bg-white dark:bg-neutral-950  text-zinc-900 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Explore Cells</h1>

        <input
          type="text"
          placeholder="Search cells..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-black dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCells?.map((cell) => (
              <CellCard
                key={cell.id}
                cell={cell}
                joined={joinedIds.has(cell.id)}
                onJoin={() => console.log('Join', cell.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
