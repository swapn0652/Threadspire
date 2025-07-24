import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
export declare class RepliesController {
    private repliesService;
    constructor(repliesService: RepliesService);
    addReply(postId: string, req: any, dto: CreateReplyDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        content: string;
        upvotes: number;
        downvotes: number;
        postId: string;
    }>;
    getReplies(postId: string): Promise<({
        user: {
            name: string;
            username: string | null;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        content: string;
        upvotes: number;
        downvotes: number;
        postId: string;
    })[]>;
    deleteReply(replyId: string, req: any): Promise<{
        message: string;
    }>;
}
