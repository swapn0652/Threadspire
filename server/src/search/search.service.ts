import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async globalSearch(query: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        content: { contains: query, mode: 'insensitive' },
      },
      include: {
        user: { select: { id: true, name: true, username: true } },
        cell: { select: { id: true, name: true, title: true } },
      },
    });

    const cells = await this.prisma.cell.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { title: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    const users = await this.prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { username: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });

    return {
      posts,
      cells,
      users,
    };
  }
}
