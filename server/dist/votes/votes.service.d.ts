import { PrismaService } from 'src/prisma/prisma.service';
import { VoteDto } from './dto/vote.dto';
export declare class VotesService {
    private prisma;
    constructor(prisma: PrismaService);
    vote(postId: string, userId: string, dto: VoteDto): Promise<{
        message: string;
    }>;
    removeVote(postId: string, userId: string): Promise<{
        message: string;
    }>;
    private updateVoteCount;
}
