import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateProfile(req: any, dto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        id: string;
        spark: number;
    }>;
    getMe(req: any): Promise<{
        email: string;
        name: string;
        username: string | null;
        id: string;
        spark: number;
        createdAt: Date;
    } | null>;
    getMyPosts(req: any, limit?: string, cursor?: string): Promise<({
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
    getMyReplies(req: any, limit?: string, cursor?: string): Promise<{
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
    getUpvotedPosts(req: any, limit?: string, cursor?: string): Promise<{
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
    getDownvotedPosts(req: any, limit?: string, cursor?: string): Promise<{
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
