import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
export declare class RepliesController {
    private repliesService;
    constructor(repliesService: RepliesService);
    addReply(postId: string, req: any, dto: CreateReplyDto): Promise<{
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        userId: string;
        postId: string;
    }>;
    getReplies(postId: string): Promise<({
        user: {
            id: string;
            name: string;
            username: string;
        };
    } & {
        id: string;
        content: string;
        upvotes: number;
        downvotes: number;
        createdAt: Date;
        userId: string;
        postId: string;
    })[]>;
    deleteReply(replyId: string, req: any): Promise<{
        message: string;
    }>;
}
