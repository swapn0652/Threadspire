import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async getFeed(userId?: string) {
    if (!userId) {
      return this.getTrendingFeed();
    }

    const memberships = await this.prisma.cellMembership.findMany({
      where: { userId },
      select: { cellId: true },
    });

    const cellIds = memberships.map((m) => m.cellId);

    if (cellIds.length === 0) {
      return this.getTrendingFeed();
    }

    const personalizedFeed = await this.prisma.post.findMany({
      where: {
        cellId: { in: cellIds },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, username: true } },
        cell: { select: { id: true, name: true, title: true } },
      },
      take: 10,
    });

    if (cellIds.length < 3) {
      const trending = await this.getTrendingFeed(5);
      const allPosts = [...personalizedFeed, ...trending];
      const seen = new Set();
      const merged = allPosts.filter((post) => {
        if (seen.has(post.id)) return false;
        seen.add(post.id);
        return true;
      });

      return merged;
    }

    return personalizedFeed;
  }

  async getTrendingFeed(limit = 10) {
    return this.prisma.post.findMany({
      orderBy: [
        { upvotes: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit,
      include: {
        user: { select: { id: true, name: true, username: true } },
        cell: { select: { id: true, name: true, title: true } },
      },
    });
  }
}
