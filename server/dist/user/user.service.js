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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateProfile(userId, dto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { name: dto.name },
            select: { id: true, email: true, name: true, spark: true },
        });
    }
    async getMe(userId) {
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
    async getMyPosts(userId, limit = 10, cursor) {
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
    async getMyReplies(userId, limit = 10, cursor) {
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
    async getUpvotedPosts(userId, limit = 10, cursor) {
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
    async getDownvotedPosts(userId, limit = 10, cursor) {
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map