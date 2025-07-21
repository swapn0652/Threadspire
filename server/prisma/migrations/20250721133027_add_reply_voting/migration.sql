-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "downvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ReplyVote" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,

    CONSTRAINT "ReplyVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReplyVote_userId_replyId_key" ON "ReplyVote"("userId", "replyId");

-- AddForeignKey
ALTER TABLE "ReplyVote" ADD CONSTRAINT "ReplyVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplyVote" ADD CONSTRAINT "ReplyVote_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
