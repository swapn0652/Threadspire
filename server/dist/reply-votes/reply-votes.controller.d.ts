import { ReplyVotesService } from './reply-votes.service';
import { VoteOnReplyDto } from './dto/vote-on-reply.dto';
export declare class ReplyVotesController {
    private replyVotesService;
    constructor(replyVotesService: ReplyVotesService);
    voteOnReply(replyId: string, req: any, dto: VoteOnReplyDto): Promise<{
        message: string;
    }>;
}
