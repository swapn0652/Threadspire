import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPost(userId: string, dto: CreatePostDto): Promise<{
        id: string;
        content: string;
        createdAt: Date;
        userId: string;
        cellId: string;
    }>;
    getPostsInCell(cellId: string, params: {
        take: number;
        cursor?: string;
        sortBy?: 'top' | 'latest';
    }): Promise<{
        items: ({
            user: {
                id: string;
                name: string;
                username: string | null;
            };
            cell: {
                id: string;
                name: string;
            };
            votes: {
                id: string;
                createdAt: Date;
                userId: string;
                value: number;
                postId: string;
            }[];
        } & {
            id: string;
            content: string;
            upvotes: number;
            downvotes: number;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            cellId: string;
        })[];
        nextCursor: string | null;
    }>;
    getPostById(postId: string): Promise<{
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
    }>;
    deletePost(postId: string, requesterId: string): Promise<{
        message: string;
    }>;
}
