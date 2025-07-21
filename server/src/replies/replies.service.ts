import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RepliesService {
  constructor(private prisma: PrismaService) {}

  async addReply(postId: string, userId: string, content: string) {
    return this.prisma.reply.create({
      data: {
        postId,
        userId,
        content,
      },
    });
  }

  async getRepliesByPost(postId: string) {
    return this.prisma.reply.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  async deleteReply(replyId: string, userId: string) {
    const reply = await this.prisma.reply.findUnique({
      where: { id: replyId },
      include: {
        post: {
          include: {
            cell: {
              include: {
                moderators: true,
              },
            },
          },
        },
      },
    });

    if (!reply) throw new NotFoundException('Reply not found');

    const isMod = reply.post.cell.moderators.some(mod => mod.userId === userId);
    const isOwner = reply.userId === userId;

    if (!isMod && !isOwner) {
      throw new ForbiddenException('Not authorized to delete this reply');
    }

    await this.prisma.reply.delete({ where: { id: replyId } });

    return { message: 'Reply deleted successfully' };
  }
}
