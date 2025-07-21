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
exports.ReplyVotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReplyVotesService = class ReplyVotesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async voteOnReply(replyId, userId, dto) {
        const reply = await this.prisma.reply.findUnique({ where: { id: replyId } });
        if (!reply)
            throw new common_1.NotFoundException('Reply not found');
        const existingVote = await this.prisma.replyVote.findUnique({
            where: { userId_replyId: { userId, replyId } },
        });
        if (existingVote) {
            if (existingVote.value === dto.value) {
                return { message: 'Vote already exists with same value' };
            }
            await this.prisma.replyVote.update({
                where: { userId_replyId: { userId, replyId } },
                data: { value: dto.value },
            });
            await this.prisma.reply.update({
                where: { id: replyId },
                data: {
                    upvotes: { increment: dto.value === 1 ? 1 : -1 },
                    downvotes: { increment: dto.value === -1 ? 1 : -1 },
                },
            });
            return { message: 'Vote updated' };
        }
        await this.prisma.replyVote.create({
            data: {
                userId,
                replyId,
                value: dto.value,
            },
        });
        await this.prisma.reply.update({
            where: { id: replyId },
            data: {
                upvotes: dto.value === 1 ? { increment: 1 } : undefined,
                downvotes: dto.value === -1 ? { increment: 1 } : undefined,
            },
        });
        return { message: 'Vote recorded' };
    }
};
exports.ReplyVotesService = ReplyVotesService;
exports.ReplyVotesService = ReplyVotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReplyVotesService);
//# sourceMappingURL=reply-votes.service.js.map