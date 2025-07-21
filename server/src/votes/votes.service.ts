import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  async vote(postId: string, userId: string, dto: VoteDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) throw new NotFoundException('Post not found');

    const existingVote = await this.prisma.vote.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!existingVote) {
      await this.prisma.vote.create({
        data: {
          userId,
          postId,
          value: dto.value,
        },
      });

      await this.updateVoteCount(postId);
      return { message: 'Vote registered' };
    }

    if (existingVote.value === dto.value) {
      return { message: 'Same vote already exists' };
    }

    await this.prisma.vote.update({
      where: { userId_postId: { userId, postId } },
      data: { value: dto.value },
    });

    await this.updateVoteCount(postId);
    return { message: 'Vote updated' };
  }

  async removeVote(postId: string, userId: string) {
    const vote = await this.prisma.vote.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!vote) throw new NotFoundException('No vote to remove');

    await this.prisma.vote.delete({
      where: { userId_postId: { userId, postId } },
    });

    await this.updateVoteCount(postId);
    return { message: 'Vote removed' };
  }

  private async updateVoteCount(postId: string) {
    const [upvotes, downvotes] = await Promise.all([
      this.prisma.vote.count({ where: { postId, value: 1 } }),
      this.prisma.vote.count({ where: { postId, value: -1 } }),
    ]);

    await this.prisma.post.update({
      where: { id: postId },
      data: {
        upvotes,
        downvotes,
      },
    });
  }
}
