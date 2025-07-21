import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReplyVotesService } from './reply-votes.service';
import { VoteOnReplyDto } from './dto/vote-on-reply.dto';

@Controller('reply-votes')
export class ReplyVotesController {
  constructor(private replyVotesService: ReplyVotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':replyId')
  voteOnReply(
    @Param('replyId') replyId: string,
    @Req() req,
    @Body() dto: VoteOnReplyDto
  ) {
    const userId = req.user.userId;
    return this.replyVotesService.voteOnReply(replyId, userId, dto);
  }
}
