import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VoteDto } from './dto/vote.dto';
import { VotesService } from './votes.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('votes')
export class VotesController {
  constructor(private votesService: VotesService) {}

  @Post(':postId')
  vote(@Param('postId') postId: string, @Req() req, @Body() dto: VoteDto) {
    return this.votesService.vote(postId, req.user.userId, dto);
  }

  @Delete(':postId')
  removeVote(@Param('postId') postId: string, @Req() req) {
    return this.votesService.removeVote(postId, req.user.userId);
  }
}
