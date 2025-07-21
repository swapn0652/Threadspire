import { PrismaService } from 'src/prisma/prisma.service';
import { VoteOnReplyDto } from './dto/vote-on-reply.dto';
export declare class ReplyVotesService {
    private prisma;
    constructor(prisma: PrismaService);
    voteOnReply(replyId: string, userId: string, dto: VoteOnReplyDto): Promise<{
        message: string;
    }>;
}
