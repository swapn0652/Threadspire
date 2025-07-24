import { PrismaService } from 'src/prisma/prisma.service';
export declare class RepliesService {
    private prisma;
    constructor(prisma: PrismaService);
    addReply(postId: string, userId: string, content: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        content: string;
        upvotes: number;
        downvotes: number;
        postId: string;
    }>;
    getRepliesByPost(postId: string): Promise<({
        user: {
            name: string;
            username: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        content: string;
        upvotes: number;
        downvotes: number;
        postId: string;
    })[]>;
    deleteReply(replyId: string, userId: string): Promise<{
        message: string;
    }>;
}
