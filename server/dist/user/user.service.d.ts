import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: string, dto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        id: string;
        spark: number;
    }>;
    getMe(userId: string): Promise<{
        email: string;
        name: string;
        username: string | null;
        id: string;
        spark: number;
        createdAt: Date;
    } | null>;
    getMyPosts(userId: string, limit?: number, cursor?: string): Promise<({
        user: {
            name: string;
            username: string | null;
            id: string;
        };
        cell: {
            name: string;
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
    getMyReplies(userId: string, limit?: number, cursor?: string): Promise<{
        items: ({
            post: {
                cell: {
                    name: string;
                };
                id: string;
                content: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            upvotes: number;
            downvotes: number;
            postId: string;
        })[];
        nextCursor: string | null;
    }>;
    getUpvotedPosts(userId: string, limit?: number, cursor?: string): Promise<{
        items: ({
            post: {
                user: {
                    name: string;
                    username: string | null;
                    id: string;
                };
                cell: {
                    name: string;
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
                    name: string;
                    username: string | null;
                    id: string;
                };
                cell: {
                    name: string;
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
