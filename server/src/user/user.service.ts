import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async updateProfile(userId: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { name: dto.name },
      select: { id: true, email: true, name: true, spark: true },
    });
  }

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        spark: true,
        createdAt: true,
      },
    });
  }

  async getMyPosts(userId: string, limit = 10, cursor?: string) {
    const posts = await this.prisma.post.findMany({
      where: { userId },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'desc' },
      include: {
        cell: { select: { name: true, title: true } },
        user: { select: { id: true, name: true, username: true } },
      },
    });

    return posts;
  }


  async getMyReplies(userId: string, limit = 10, cursor?: string) {
    const replies = await this.prisma.reply.findMany({
      where: { userId },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          select: {
            id: true,
            content: true,
            cell: { select: { name: true } },
          },
        },
      },
    });

    const hasNext = replies.length > limit;
    const items = hasNext ? replies.slice(0, -1) : replies;

    return {
      items,
      nextCursor: hasNext ? replies[limit].id : null,
    };
  }

  async getUpvotedPosts(userId: string, limit = 10, cursor?: string) {
    const votes = await this.prisma.vote.findMany({
      where: { userId, value: 1 },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          include: {
            cell: { select: { name: true, title: true } },
            user: { select: { id: true, name: true, username: true } },
          },
        },
      },
    });

    const hasNext = votes.length > limit;
    const items = hasNext ? votes.slice(0, -1) : votes;

    return {
      items,
      nextCursor: hasNext ? votes[limit].id : null,
    };
  }


  async getDownvotedPosts(userId: string, limit = 10, cursor?: string) {
    const votes = await this.prisma.vote.findMany({
      where: { userId, value: -1 },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      orderBy: { createdAt: 'desc' },
      include: {
        post: {
          include: {
            cell: { select: { name: true, title: true } },
            user: { select: { id: true, name: true, username: true } },
          },
        },
      },
    });

    const hasNext = votes.length > limit;
    const items = hasNext ? votes.slice(0, -1) : votes;

    return {
      items,
      nextCursor: hasNext ? votes[limit].id : null,
    };
  }

}
