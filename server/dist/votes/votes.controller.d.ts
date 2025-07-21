import { VoteDto } from './dto/vote.dto';
import { VotesService } from './votes.service';
export declare class VotesController {
    private votesService;
    constructor(votesService: VotesService);
    vote(postId: string, req: any, dto: VoteDto): Promise<{
        message: string;
    }>;
    removeVote(postId: string, req: any): Promise<{
        message: string;
    }>;
}
