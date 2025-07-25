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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FeedService = class FeedService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFeed(userId) {
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
                if (seen.has(post.id))
                    return false;
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
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FeedService);
//# sourceMappingURL=feed.service.js.map