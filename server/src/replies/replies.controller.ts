// src/replies/replies.controller.ts
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RepliesService } from './replies.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller()
export class RepliesController {
  constructor(private repliesService: RepliesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('posts/:postId/replies')
  addReply(
    @Param('postId') postId: string,
    @Req() req,
    @Body() dto: CreateReplyDto,
  ) {
    return this.repliesService.addReply(postId, req.user.userId, dto.content);
  }

  @Get('posts/:postId/replies')
  getReplies(@Param('postId') postId: string) {
    return this.repliesService.getRepliesByPost(postId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('replies/:replyId')
  deleteReply(@Param('replyId') replyId: string, @Req() req) {
    return this.repliesService.deleteReply(replyId, req.user.userId);
  }
}
