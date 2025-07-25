'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

export function CellCard({
  cell,
  joined,
  onJoin,
}: {
  cell: {
    id: string;
    name: string;
    title: string;
    description: string;
  };
  joined: boolean;
  onJoin?: () => void;
}) {
  return (
    <div className="border border-zinc-300 dark:border-zinc-700 rounded-xl p-4 space-y-2 bg-zinc-50 dark:bg-zinc-800 transition-colors">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{cell.title}</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">@{cell.name}</p>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{cell.description}</p>

      <div className="flex justify-end gap-2 pt-2">
        {!joined && (
          <button
            onClick={onJoin}
            className="px-4 py-1.5 text-sm bg-blue-700 hover:bg-blue-800 text-white rounded-md transition"
          >
            Join
          </button>
        )}
        <Link
          href={`/cell/${cell.id}`}
          className="px-4 py-1.5 text-sm border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700 transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
