import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

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

    async getPostsInCell(cellId: string) {
        return this.prisma.post.findMany({
            where: { cellId },
            orderBy: { createdAt: 'desc' }
        })
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
