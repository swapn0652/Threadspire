import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateProfile(req: any, dto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        spark: number;
    }>;
    getMe(req: any): Promise<{
        id: string;
        email: string;
        username: string | null;
        name: string;
        spark: number;
        createdAt: Date;
    } | null>;
    getMyPosts(req: any, limit?: string, cursor?: string): Promise<({
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
    getMyReplies(req: any, limit?: string, cursor?: string): Promise<{
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
    getUpvotedPosts(req: any, limit?: string, cursor?: string): Promise<{
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
    getDownvotedPosts(req: any, limit?: string, cursor?: string): Promise<{
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
