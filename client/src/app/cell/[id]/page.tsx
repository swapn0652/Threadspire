'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PostCard } from '@/components/PostCard';
import { usePostsInCell } from '../../../../utils/hooks/usePosts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const SORT_OPTIONS = ['top', 'latest'] as const;

export default function CellPage() {
  const { id: cellId } = useParams() as { id: string };
  const [sortBy, setSortBy] = useState<'top' | 'latest'>('top');
  const { data: session } = useSession();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePostsInCell({ cellId, sortBy });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const posts = data?.pages.flat() ?? [];
  const currentUserId = (session?.user as any)?.id;
  const cellName = posts[0]?.cell.name;

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {cellName && (
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          # {cellName}
        </h1>
      )}

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option}
              size="sm"
              className={cn(
                'rounded-full px-4 py-1 text-sm font-medium border transition-none',
                sortBy === option
                  ? 'bg-blue-700 text-white dark:bg-blue-600 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                  : 'bg-transparent text-zinc-600 dark:text-zinc-300 border-transparent hover:bg-transparent dark:hover:bg-transparent'
              )}
              onClick={() => setSortBy(option)}
            >
              {option === 'top' ? 'Top Posts' : 'Latest Posts'}
            </Button>
          ))}
        </div>

        <Button
          size="sm"
          className={cn(
            'transition-none',
            'bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900',
            'hover:bg-zinc-800 dark:hover:bg-zinc-200'
          )}
        >
          Start a Thread
        </Button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => {
          const vote = post.votes?.find((v) => v.userId === currentUserId);
          return (
            <PostCard
              key={post.id}
              post={post}
              showMenu={post.user.id === currentUserId}
              onUpvote={() => {}}
              onDownvote={() => {}}
              hasUpvoted={vote?.value === 1}
              hasDownvoted={vote?.value === -1}
              onJoinThread={() => {}}
            />
          );
        })}
      </div>

      {/* Infinite Scroll Load More Trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="h-10 mt-4 flex justify-center items-center">
          {isFetchingNextPage && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Loading more...
            </p>
          )}
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          No posts yet. Be the first to start a thread.
        </p>
      )}
    </div>
  );
}
