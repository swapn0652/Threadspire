import { Module } from '@nestjs/common';
import { ReplyVotesService } from './reply-votes.service';
import { ReplyVotesController } from './reply-votes.controller';

@Module({
  providers: [ReplyVotesService],
  controllers: [ReplyVotesController]
})
export class ReplyVotesModule {}
