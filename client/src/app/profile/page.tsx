'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useInView } from 'react-intersection-observer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { PostCard } from '@/components/PostCard';
import { ReplyCard } from '@/components/ReplyCard';
import { cn } from '@/lib/utils';
import { useMe } from '../../../utils/hooks/useMe';
import {
  useMyPosts,
  useMyReplies,
  useUpvotedPosts,
  useDownvotedPosts,
} from '../../../utils/hooks/user';

// Define the tabs
const TAB_KEYS = ['posts', 'replies', 'upvoted', 'downvoted'] as const;
type TabKey = typeof TAB_KEYS[number];

export default function ProfilePage() {
  const { data: user, isLoading: userLoading } = useMe();
  const [tab, setTab] = useState<TabKey>('posts');

  const postQuery = useMyPosts();
  const replyQuery = useMyReplies();
  const upvoteQuery = useUpvotedPosts();
  const downvoteQuery = useDownvotedPosts();

  const queries = {
    posts: postQuery,
    replies: replyQuery,
    upvoted: upvoteQuery,
    downvoted: downvoteQuery,
  };

  const currentQuery = queries[tab];
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && currentQuery.hasNextPage && !currentQuery.isFetchingNextPage) {
      currentQuery.fetchNextPage();
    }
  }, [inView, currentQuery]);

  return (
    <div className="min-h-screen px-4 py-8 bg-white dark:bg-neutral-950 text-zinc-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        {userLoading || !user ? (
          <Skeleton className="w-full h-32 rounded-lg" />
        ) : (
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-zinc-500 dark:text-zinc-400">@{user.username}</p>
            <p className="text-sm mt-1">Spark: {user.spark}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Member since: {format(new Date(user.createdAt), 'MMMM yyyy')}
            </p>
          </div>
        )}

        <Tabs defaultValue="posts" value={tab} onValueChange={(val) => setTab(val as TabKey)}>
          <TabsList className="grid grid-cols-4 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="upvoted">Upvoted</TabsTrigger>
            <TabsTrigger value="downvoted">Downvoted</TabsTrigger>
          </TabsList>

          {TAB_KEYS.map((key) => {
            const query = queries[key];

            return (
              <TabsContent value={key} key={key} className="mt-6 space-y-4">
                {query.data?.pages.map((page, i) => (
                  <div key={i} className="space-y-4">
                    {(page.items || page).map((item: any) =>
                      key === 'replies' ? (
                        <ReplyCard key={item.id} reply={item} />
                      ) : (
                        <PostCard
                          key={item.id}
                          post={key === 'upvoted' || key === 'downvoted' ? item.post : item}
                          showCellName={true}
                        />
                      )
                    )}
                  </div>
                ))}

                <div ref={ref} />

                {query.isFetchingNextPage && (
                  <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Loading more...
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
