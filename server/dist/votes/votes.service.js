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
exports.VotesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VotesService = class VotesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async vote(postId, userId, dto) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        const existingVote = await this.prisma.vote.findUnique({
            where: { userId_postId: { userId, postId } },
        });
        if (!existingVote) {
            await this.prisma.vote.create({
                data: {
                    userId,
                    postId,
                    value: dto.value,
                },
            });
            await this.updateVoteCount(postId);
            return { message: 'Vote registered' };
        }
        if (existingVote.value === dto.value) {
            return { message: 'Same vote already exists' };
        }
        await this.prisma.vote.update({
            where: { userId_postId: { userId, postId } },
            data: { value: dto.value },
        });
        await this.updateVoteCount(postId);
        return { message: 'Vote updated' };
    }
    async removeVote(postId, userId) {
        const vote = await this.prisma.vote.findUnique({
            where: { userId_postId: { userId, postId } },
        });
        if (!vote)
            throw new common_1.NotFoundException('No vote to remove');
        await this.prisma.vote.delete({
            where: { userId_postId: { userId, postId } },
        });
        await this.updateVoteCount(postId);
        return { message: 'Vote removed' };
    }
    async updateVoteCount(postId) {
        const [upvotes, downvotes] = await Promise.all([
            this.prisma.vote.count({ where: { postId, value: 1 } }),
            this.prisma.vote.count({ where: { postId, value: -1 } }),
        ]);
        await this.prisma.post.update({
            where: { id: postId },
            data: {
                upvotes,
                downvotes,
            },
        });
    }
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VotesService);
//# sourceMappingURL=votes.service.js.map