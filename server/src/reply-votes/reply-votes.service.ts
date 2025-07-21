import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoteOnReplyDto } from './dto/vote-on-reply.dto';

@Injectable()
export class ReplyVotesService {
  constructor(private prisma: PrismaService) {}

  async voteOnReply(replyId: string, userId: string, dto: VoteOnReplyDto) {
    const reply = await this.prisma.reply.findUnique({ where: { id: replyId } });
    if (!reply) throw new NotFoundException('Reply not found');

    const existingVote = await this.prisma.replyVote.findUnique({
      where: { userId_replyId: { userId, replyId } },
    });

    if (existingVote) {
      if (existingVote.value === dto.value) {
        return { message: 'Vote already exists with same value' };
      }

      await this.prisma.replyVote.update({
        where: { userId_replyId: { userId, replyId } },
        data: { value: dto.value },
      });
      
      await this.prisma.reply.update({
        where: { id: replyId },
        data: {
          upvotes: { increment: dto.value === 1 ? 1 : -1 },
          downvotes: { increment: dto.value === -1 ? 1 : -1 },
        },
      });

      return { message: 'Vote updated' };
    }

    await this.prisma.replyVote.create({
      data: {
        userId,
        replyId,
        value: dto.value,
      },
    });

    await this.prisma.reply.update({
      where: { id: replyId },
      data: {
        upvotes: dto.value === 1 ? { increment: 1 } : undefined,
        downvotes: dto.value === -1 ? { increment: 1 } : undefined,
      },
    });

    return { message: 'Vote recorded' };
  }
}
