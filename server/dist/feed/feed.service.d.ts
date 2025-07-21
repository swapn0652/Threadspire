import { PrismaService } from 'src/prisma/prisma.service';
export declare class FeedService {
    private prisma;
    constructor(prisma: PrismaService);
    getFeedForUser(userId: string): Promise<({
        user: {
            id: string;
            name: string;
            username: string;
        };
        cell: {
            id: string;
            name: string;
            title: string;
        };
    } & {
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
    })[]>;
}
