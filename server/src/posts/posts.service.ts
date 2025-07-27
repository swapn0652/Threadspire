import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async createPost(userId: string, dto: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                content: dto.content,
                cellId: dto.cellId,
                userId,
            },
            select: {
                id: true,
                content: true,
                cellId: true,
                userId: true,
                createdAt: true,
            }
        });
    }

    async getPostsInCell(
      cellId: string,
      params: { take: number; cursor?: string; sortBy?: 'top' | 'latest' },
    ) {
      const { take, cursor, sortBy = 'top' } = params;
      const orderBy =
        sortBy === 'latest'
          ? { createdAt: Prisma.SortOrder.desc }
          : { upvotes: Prisma.SortOrder.desc };

      const posts = await this.prisma.post.findMany({
        where: { cellId },
        take: take + 1,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy,
        include: {
           user: { select: { id: true, username: true, name: true } },
          votes: true,
          cell: { select: { id: true, name: true } }, 
        },
      });

      const hasNext = posts.length > take;
      const items = hasNext ? posts.slice(0, -1) : posts;

      return {
        items,
        nextCursor: hasNext ? posts[take].id : null,
      };
    }

    async getPostById(postId: string) {
        const post = await this.prisma.post.findUnique({ where: { id: postId }});
        if(!post)
            throw new NotFoundException('Post not found!');

        return post;
    }

    async deletePost(postId: string, requesterId: string) {
      const post = await this.prisma.post.findUnique({
        where: { id: postId },
      });

      if (!post) throw new NotFoundException('Post not found');

      const isAuthor = post.userId === requesterId;

      const isModerator = await this.prisma.cellModerator.findUnique({
        where: {
          userId_cellId: {
            userId: requesterId,
            cellId: post.cellId,
          },
        },
    });

    if (!isAuthor && !isModerator) {
      throw new ForbiddenException('Not authorized to delete this post');
    }

    await this.prisma.post.delete({ where: { id: postId } });

    return { message: 'Post deleted successfully!' };
  }
}
