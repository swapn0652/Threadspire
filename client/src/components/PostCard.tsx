'use client';

import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface Post {
  id: string;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  cell: {
    name: string;
  };
  user: {
    id: string;
    name: string;
    username: string;
  };
}

interface PostCardProps {
  post: Post;
  onUpvote?: () => void;
  onDownvote?: () => void;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
}

export function PostCard({
  post,
  onUpvote,
  onDownvote,
  hasUpvoted,
  hasDownvoted,
}: PostCardProps) {
  return (
    <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 space-y-2">
      {/* Cell name on top */}
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        # {post.cell.name}
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">@{post.user.username}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
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
    </div>
  );
}
