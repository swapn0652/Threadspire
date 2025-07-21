import { PrismaService } from 'src/prisma/prisma.service';
export declare class RepliesService {
    private prisma;
    constructor(prisma: PrismaService);
    addReply(postId: string, userId: string, content: string): Promise<{
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        userId: string;
        postId: string;
    }>;
    getRepliesByPost(postId: string): Promise<({
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        userId: string;
        postId: string;
    })[]>;
    deleteReply(replyId: string, userId: string): Promise<{
        message: string;
    }>;
}
