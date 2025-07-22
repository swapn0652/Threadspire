import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPost(userId: string, dto: CreatePostDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        cellId: string;
        content: string;
    }>;
    getPostsInCell(cellId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
        content: string;
        upvotes: number;
        downvotes: number;
    }[]>;
    getPostById(postId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        cellId: string;
        content: string;
        upvotes: number;
        downvotes: number;
    }>;
    deletePost(postId: string, requesterId: string): Promise<{
        message: string;
    }>;
}
