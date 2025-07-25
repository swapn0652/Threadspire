import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: string, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        spark: number;
    }>;
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        username: string | null;
        name: string;
        spark: number;
        createdAt: Date;
    } | null>;
    getMyPosts(userId: string, limit?: number, cursor?: string): Promise<({
        user: {
            id: string;
            username: string | null;
            name: string;
        };
        cell: {
            name: string;
            title: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        upvotes: number;
        downvotes: number;
        userId: string;
        cellId: string;
    })[]>;
    getMyReplies(userId: string, limit?: number, cursor?: string): Promise<{
        items: ({
            post: {
                id: string;
                content: string;
                cell: {
                    name: string;
                };
            };
        } & {
            id: string;
            createdAt: Date;
            content: string;
            upvotes: number;
            downvotes: number;
            userId: string;
            postId: string;
        })[];
        nextCursor: string | null;
    }>;
    getUpvotedPosts(userId: string, limit?: number, cursor?: string): Promise<{
        items: ({
            post: {
                user: {
                    id: string;
                    username: string | null;
                    name: string;
                };
                cell: {
                    name: string;
                    title: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                upvotes: number;
                downvotes: number;
                userId: string;
                cellId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
            value: number;
        })[];
        nextCursor: string | null;
    }>;
    getDownvotedPosts(userId: string, limit?: number, cursor?: string): Promise<{
        items: ({
            post: {
                user: {
                    id: string;
                    username: string | null;
                    name: string;
                };
                cell: {
                    name: string;
                    title: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                upvotes: number;
                downvotes: number;
                userId: string;
                cellId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            postId: string;
            value: number;
        })[];
        nextCursor: string | null;
    }>;
}
