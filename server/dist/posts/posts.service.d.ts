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
    getPostsInCell(cellId: string): Promise<{
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        cellId: string;
    }[]>;
    getPostById(postId: string): Promise<{
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        cellId: string;
    }>;
    deletePost(postId: string, requesterId: string): Promise<{
        message: string;
    }>;
}
