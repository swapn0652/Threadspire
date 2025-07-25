'use client';

export function ReplyCard({ reply }: { reply: any }) {
  return (
    <div className="border dark:border-zinc-700 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">{reply?.content}</p>
      <p className="text-xs text-zinc-400">on: {reply?.post?.content}</p>
    </div>
  );
}
