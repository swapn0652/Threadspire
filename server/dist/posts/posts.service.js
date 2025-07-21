"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPost(userId, dto) {
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
    async getPostsInCell(cellId) {
        return this.prisma.post.findMany({
            where: { cellId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async getPostById(postId) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post not found!');
        return post;
    }
    async deletePost(postId, requesterId) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
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
            throw new common_1.ForbiddenException('Not authorized to delete this post');
        }
        await this.prisma.post.delete({ where: { id: postId } });
        return { message: 'Post deleted successfully!' };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map