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
exports.RepliesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RepliesService = class RepliesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addReply(postId, userId, content) {
        return this.prisma.reply.create({
            data: {
                postId,
                userId,
                content,
            },
        });
    }
    async getRepliesByPost(postId) {
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
    async deleteReply(replyId, userId) {
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
        if (!reply)
            throw new common_1.NotFoundException('Reply not found');
        const isMod = reply.post.cell.moderators.some(mod => mod.userId === userId);
        const isOwner = reply.userId === userId;
        if (!isMod && !isOwner) {
            throw new common_1.ForbiddenException('Not authorized to delete this reply');
        }
        await this.prisma.reply.delete({ where: { id: replyId } });
        return { message: 'Reply deleted successfully' };
    }
};
exports.RepliesService = RepliesService;
exports.RepliesService = RepliesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RepliesService);
//# sourceMappingURL=replies.service.js.map