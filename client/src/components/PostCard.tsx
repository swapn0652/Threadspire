'use client';

import { ArrowBigDown, ArrowBigUp, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Post {
  id: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  cell: {
    name: string;
    id: string;
  };
  user: {
    id: string;
    name: string;
    username: string;
  };
  votes?: { userId: string; value: number }[];
}

interface PostCardProps {
  post: Post;
  showCellName?: boolean;
  showMenu?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onJoinThread?: () => void;
  onUpvote?: () => void;
  onDownvote?: () => void;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
}

export function PostCard({
  post,
  showCellName = false,
  showMenu = false,
  onEdit,
  onDelete,
  onJoinThread,
  onUpvote,
  onDownvote,
  hasUpvoted,
  hasDownvoted,
}: PostCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 space-y-2 dark:bg-zinc-900 bg-zinc-50">
      {showCellName && (
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          # {post.cell.name}
        </p>
      )}

      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-sm">@{post.user.username}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </p>
        </div>

        {showMenu && (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800">
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-28 rounded-md shadow bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 z-50">
                <ul className="text-sm">
                  {onEdit && <li onClick={onEdit} className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer">Edit</li>}
                  {onDelete && <li onClick={onDelete} className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-800 text-red-600 dark:text-red-400 cursor-pointer">Delete</li>}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="flex justify-between items-center mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex gap-3">
          <button
            onClick={onUpvote}
            className={cn('flex items-center gap-1', {
              'text-blue-600': hasUpvoted,
            })}
          >
            <ArrowBigUp className="w-4 h-4" />
            {post.upvotes}
          </button>

          <button
            onClick={onDownvote}
            className={cn('flex items-center gap-1', {
              'text-red-600': hasDownvoted,
            })}
          >
            <ArrowBigDown className="w-4 h-4" />
            {post.downvotes}
          </button>
        </div>

        {onJoinThread && (
          <button onClick={onJoinThread} className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            Join the thread 🔥
          </button>
        )}
      </div>
    </div>
  );
}
