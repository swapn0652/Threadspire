import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';

@Module({
  providers: [RepliesService],
  controllers: [RepliesController]
})
export class RepliesModule {}
