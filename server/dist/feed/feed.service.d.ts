import { PrismaService } from 'src/prisma/prisma.service';
export declare class FeedService {
    private prisma;
    constructor(prisma: PrismaService);
    getFeedForUser(userId: string): Promise<({
        user: {
            name: string;
            username: string;
            id: string;
        };
        cell: {
            name: string;
            id: string;
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
        content: string;
        upvotes: number;
        downvotes: number;
    })[]>;
}
